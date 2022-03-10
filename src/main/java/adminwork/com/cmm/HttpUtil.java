package adminwork.com.cmm;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Date;
import java.util.Map;

import javax.json.Json;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ibm.icu.text.SimpleDateFormat;
import com.inicis.std.util.ParseUtil;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;


public class HttpUtil {

    public static void TestcallApi(JsonObject params, String type){

        HttpURLConnection conn = null;
        JSONObject responseJson = null;

        try {
            //URL 설정
            URL url = new URL("https://testapi.giro.or.kr/oauth/2.0/token");

            conn = (HttpURLConnection) url.openConnection();

            // type의 경우 POST, GET, PUT, DELETE 가능
            conn.setRequestMethod(type);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Transfer-Encoding", "chunked");
            conn.setRequestProperty("Connection", "keep-alive");
            conn.setDoOutput(true);


            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            // JSON 형식의 데이터 셋팅
            JsonObject commands = new JsonObject();
            JsonArray jsonArray = new JsonArray();

            params.addProperty("key", 1);
            params.addProperty("age", 20);
            params.addProperty("userNm", "홍길동");

            commands.add("userInfo", params);
             // JSON 형식의 데이터 셋팅 끝

            // 데이터를 STRING으로 변경
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(commands);

            bw.write(commands.toString());
            bw.flush();
            bw.close();

            // 보내고 결과값 받기
            int responseCode = conn.getResponseCode();
            if (responseCode == 200) {
                 BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder sb = new StringBuilder();
                String line = "";
                while ((line = br.readLine()) != null) {
                    sb.append(line);
                }
                JSONParser parser = new JSONParser();

                try {
					responseJson = (JSONObject)parser.parse(sb.toString());
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
                responseJson.put("result", sb.toString()) ;
                // 응답 데이터
                System.out.println("responseJson :: " + responseJson);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            System.out.println("not JSON Format response");
            e.printStackTrace();
        }
    }


    public static Map<String,String> inicisRequest(String reqUrl , String tid, String mid) throws Exception{

    	HttpURLConnection conn = null;

    	String param = "P_TID=" +  tid + "&P_MID=" +mid;
    	Map<String, String> map = null;
		try {
			URL url = new URL(reqUrl);
			conn = (HttpURLConnection) url.openConnection();
			System.out.println(reqUrl);
			System.out.println(tid);
			System.out.println(mid);
	        conn.setRequestMethod("POST");
	        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	        conn.setRequestProperty("Content-Length", String.valueOf(param.getBytes("EUC-KR").length));
	        conn.setDoOutput(true);

	        conn.getOutputStream().write(param.getBytes("EUC-KR"));

	        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

	        String inputLine = "";
	        String returnTxt = "";
	        while((inputLine = in.readLine()) != null) { // response 출력
	        	returnTxt +=inputLine;
	        }
	        map = ParseUtil.parseStringToMap(returnTxt);
	        System.out.println("결재 데이터 : " +map);

		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

		return map;
    }

    public static Map<String,String> inicisCancel(String reqUrl , String ip, Map<String,String> inicisMap ) throws Exception{

    	HttpURLConnection conn = null;

    	Map<String, String> map = null;
    	try {
    		MessageDigest md = MessageDigest.getInstance("SHA-512");
		    Date date_now = new Date(System.currentTimeMillis()); // 현재시간을 가져와 Date형으로 저장한다//년월일시분초 14자리 포멧
		    SimpleDateFormat fourteen_format = new SimpleDateFormat("yyyyMMddHHmmss");
		    String timestamp=fourteen_format.format(date_now);

			String data_hash="ItEQKi3rY7uvDS8l"+"Refund"+inicisMap.get("P_TYPE")+timestamp+ip+inicisMap.get("P_MID")+inicisMap.get("P_TID");
			md.update(data_hash.getBytes());
			String hex = String.format("%0128x", new BigInteger(1, md.digest()));


			JSONObject param = new JSONObject();

			param.put("type", "Refund");
			param.put("paymethod", inicisMap.get("P_TYPE"));
			param.put("timestamp", timestamp);
			param.put("clientIp", ip);
			param.put("mid", inicisMap.get("P_MID"));
			param.put("tid", inicisMap.get("P_TID"));
			param.put("hashData", hex);
			param.put("msg", "거래취소요청");


    		URL url = new URL(reqUrl);
    		conn = (HttpURLConnection) url.openConnection();
    		System.out.println(reqUrl);
    		conn.setRequestMethod("POST");
    		conn.setRequestProperty("Content-Type",  "application/json");
    		conn.setRequestProperty("Content-Length", String.valueOf(param.toString().getBytes("EUC-KR").length));
    		conn.setDoOutput(true);

    		conn.getOutputStream().write(param.toString().getBytes("EUC-KR"));

    		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

    		String inputLine = "";
    		String returnTxt = "";
    		while((inputLine = in.readLine()) != null) { // response 출력
    			returnTxt +=inputLine;
    		}

    		map = ParseUtil.parseStringToMap(returnTxt);

    	} catch (Exception e) {
    		e.printStackTrace();
    		throw e;
    	}

    	return map;
    }






    /**
     * REST API 호출
     *
     * @param paramUrl
     * @param jsonObject void
     */
    private void JiroRestCall(String paramUrl,JSONObject jsonObject){
    	try {
            URL url = new URL("https://testapi.giro.or.kr"+paramUrl);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("X-Auth-Token", "");
            conn.setRequestProperty("X-Data-Type", "application/json");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

            conn.setDoOutput(true);

            OutputStreamWriter osw = new OutputStreamWriter(conn.getOutputStream(),"UTF-8");
            osw.write(jsonObject.toString());
            osw.flush();
            osw.close();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
            if (conn.getResponseCode() != 200) {
                System.out.println("Failed: HTTP error code : " + conn.getResponseCode());
            	throw new RuntimeException("Failed: HTTP error code : " + conn.getResponseCode());
            } else {
                System.out.println("발송 성공");
            }

            String line = null;
            while((line = br.readLine()) != null){
                System.out.println(line);
            }
            br.close();
            conn.disconnect();
        } catch (IOException e) {
            System.out.println("RestCall Fail : " + e.getMessage());
        }
    }









    /*UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(baseUrl)
    .queryParam("client_id", "a53bee4b-e9bd-425a-ba89-da38dc27d7d4")
    .queryParam("client_secret", "8f8f9bfb-7428-431f-800d-389a97ad73df")
    .queryParam("scope", "bill")
    .queryParam("grant_type", "client_credentials")
    .build(false);  // 인코딩 하지않음

HttpHeaders headers = new HttpHeaders();
//headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
headers.set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
headers.set("client_id", "a53bee4b-e9bd-425a-ba89-da38dc27d7d4");
headers.set("client_secret", "8f8f9bfb-7428-431f-800d-389a97ad73df");
headers.set("scope", "bill pay");
headers.set("grant_type", "client_credentials");
// headers.setContentType(new MediaType("application", "x-www-form-urlencoded", Charset.forName("UTF-8")));
//headers.set("KEY", "VALUE");
HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
factory.setConnectTimeout(25000); // api 호출 타임아웃
factory.setReadTimeout(25000);   // api 읽기 타임아웃

RestTemplate template = new RestTemplate(factory);
MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();

parameters.add("client_id", "a53bee4b-e9bd-425a-ba89-da38dc27d7d4");
parameters.add("client_secret", "8f8f9bfb-7428-431f-800d-389a97ad73df");
parameters.add("scope", "bill");
parameters.add("grant_type", "client_credentials");
// 방법 1
//ResponseEntity<String> response = template.exchange(uriComponents.toUriString(), HttpMethod.POST, new HttpEntity<String>(headers), String.class);
ResponseEntity<String> response = template.postForEntity(baseUrl, parameters, String.class);

JSONParser jsonParser = new JSONParser(); */
//JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody().toString());

//JSONArray docuArray = (JSONArray) jsonObject.get("documents");
//documents만 뽑아오고

//JSONObject docuObject = (JSONObject) docuArray.get(0);
//배열 i번째 요소 불러오고

//System.out.println(jsonObject.get("access_token").toString());

// 방법 2
//ResponseEntity<TrackingInfoDto> response = template.getForEntity(uriComponents.toUriString(), TrackingInfoDto.class);

// 방법 3
//TrackingInfoDto response = template.getForObject(uriComponents.toUriString(), TrackingInfoDto.class);
}
