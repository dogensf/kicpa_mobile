package fcm;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * FCM HTTP v1 발송 유틸.
 *
 * 앱 개발사 제공 원본(FcmSender.java, Java 11+/15+ 문법)을
 * 이 프로젝트의 컴파일 타깃(Java 8)에 맞게 포팅한 것.
 * 원본과 동일하게 클래스패스 루트의 service-account.json 으로 인증한다.
 *
 * 사용 예: FcmSender.sendNotification("kicpamobile", token, "제목", "내용");
 */
public final class FcmSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(FcmSender.class);

    private static final String SCOPE = "https://www.googleapis.com/auth/firebase.messaging";

    private static final int CONNECT_TIMEOUT_MS = 10 * 1000;
    private static final int READ_TIMEOUT_MS = 30 * 1000;

    /**
     * GoogleCredentials는 Thread Safe하게 재사용한다.
     * (원본은 static 초기화지만, JSON 미배치 시 클래스 로딩 자체가 깨지는 것을 피하려 지연 초기화로 변경)
     */
    private static volatile GoogleCredentials credentials;

    private FcmSender() {}

    private static GoogleCredentials loadCredentials() {
        GoogleCredentials result = credentials;
        if (result == null) {
            synchronized (FcmSender.class) {
                result = credentials;
                if (result == null) {
                    ClassLoader cl = FcmSender.class.getClassLoader();
                    InputStream in = cl.getResourceAsStream("service-account.json");
                    if (in == null) {
                        throw new IllegalStateException(
                                "service-account.json not found on classpath (src/main/resources/service-account.json)");
                    }
                    try {
                        result = GoogleCredentials.fromStream(in).createScoped(SCOPE);
                    } catch (IOException e) {
                        throw new RuntimeException("failed to load service-account.json", e);
                    } finally {
                        try { in.close(); } catch (IOException ignore) {}
                    }
                    credentials = result;
                }
            }
        }
        return result;
    }

    /**
     * GoogleCredentials가 내부적으로 Token을 캐시하고 만료 시 자동 Refresh 한다.
     */
    private static String accessToken() throws IOException {
        GoogleCredentials creds = loadCredentials();
        synchronized (creds) {
            creds.refreshIfExpired();
            AccessToken token = creds.getAccessToken();
            return token.getTokenValue();
        }
    }

    /** HTTP 상태코드 + 응답본문. (원본의 java.net.http.HttpResponse 대체) */
    public static final class Response {
        private final int statusCode;
        private final String body;

        Response(int statusCode, String body) {
            this.statusCode = statusCode;
            this.body = body;
        }

        public int statusCode() { return statusCode; }
        public String body() { return body; }
        public boolean isSuccess() { return statusCode >= 200 && statusCode < 300; }

        @Override
        public String toString() { return statusCode + " " + body; }
    }

    /**
     * 단말 토큰 1:1 발송.
     * 404/400 + "UNREGISTERED"/"INVALID_ARGUMENT" 응답은 폐기된 토큰이므로
     * 호출부에서 해당 토큰을 DB에서 정리하는 데 statusCode를 활용할 것.
     */
    public static Response sendNotification(String projectId, String fcmToken, String title, String body) throws IOException {

        String json =
                "{"
                + "\"message\":{"
                + "\"token\":\"" + escapeJson(fcmToken) + "\","
                + "\"notification\":{"
                + "\"title\":\"" + escapeJson(title) + "\","
                + "\"body\":\"" + escapeJson(body) + "\""
                + "},"
                + "\"android\":{"
                + "\"priority\":\"high\""
                + "}"
                + "}"
                + "}";

        return post(projectId, json);
    }

    /**
     * 토픽 발송. 예: FcmSender.sendTopic("kicpamobile", "all", "공지", "오늘 18시부터 점검입니다.");
     * 주의: 기존 배포된 앱은 topic 구독이 동작하지 않음(앱 개발사 가이드) — 토큰 발송을 기본으로 사용할 것.
     */
    public static Response sendTopic(String projectId, String topic, String title, String body) throws IOException {

        String json =
                "{"
                + "\"message\":{"
                + "\"topic\":\"" + escapeJson(topic) + "\","
                + "\"notification\":{"
                + "\"title\":\"" + escapeJson(title) + "\","
                + "\"body\":\"" + escapeJson(body) + "\""
                + "}"
                + "}"
                + "}";

        return post(projectId, json);
    }

    private static Response post(String projectId, String json) throws IOException {

        URL url = new URL("https://fcm.googleapis.com/v1/projects/" + projectId + "/messages:send");

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        try {
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setConnectTimeout(CONNECT_TIMEOUT_MS);
            conn.setReadTimeout(READ_TIMEOUT_MS);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken());
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

            OutputStream os = conn.getOutputStream();
            try {
                os.write(json.getBytes(StandardCharsets.UTF_8));
            } finally {
                os.close();
            }

            int code = conn.getResponseCode();
            InputStream is = (code >= 200 && code < 300) ? conn.getInputStream() : conn.getErrorStream();
            String responseBody = readAll(is);

            if (code >= 200 && code < 300) {
                LOGGER.debug("FCM send success: {}", responseBody);
            } else {
                LOGGER.error("FCM send error [{}]: {}", code, responseBody);
            }
            return new Response(code, responseBody);
        } finally {
            conn.disconnect();
        }
    }

    private static String readAll(InputStream is) throws IOException {
        if (is == null) {
            return "";
        }
        try {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            byte[] chunk = new byte[4096];
            int n;
            while ((n = is.read(chunk)) != -1) {
                buffer.write(chunk, 0, n);
            }
            return new String(buffer.toByteArray(), StandardCharsets.UTF_8);
        } finally {
            try { is.close(); } catch (IOException ignore) {}
        }
    }

    /**
     * JSON 문자열용 최소 escape
     */
    private static String escapeJson(String s) {
        if (s == null) {
            return "";
        }
        return s
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "")
                .replace("\n", "\\n")
                .replace("\t", "\\t");
    }
}
