package adminwork.kicpa.noti.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.EgovProperties;
import adminwork.kicpa.noti.service.NotiService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import fcm.FcmSender;

@Service("NotiService")
public class NotiServiceImpl extends EgovAbstractServiceImpl implements NotiService {

	private static final Logger LOGGER = LoggerFactory.getLogger(NotiServiceImpl.class);

	private static final String DEFAULT_PROJECT_ID = "kicpamobile";
	private static final String DEFAULT_BOARD_IDS = "noti";

	/** 발송은 순차 단일 스레드로 처리 (WAS 종료를 막지 않도록 데몬 스레드) */
	private static final ExecutorService PUSH_EXECUTOR = Executors.newSingleThreadExecutor(new ThreadFactory() {
		public Thread newThread(Runnable r) {
			Thread t = new Thread(r, "fcm-push-sender");
			t.setDaemon(true);
			return t;
		}
	});

	@Resource(name = "NotiDAO")
	private NotiDAO notiDAO;

	/** EgovProperties는 키 부재/오류 시 "99"를 반환하므로 그 경우 기본값으로 대체 */
	private static String getGlobalsProperty(String key, String defaultValue) {
		String value = EgovProperties.getProperty(key);
		if (value == null || "".equals(value) || "99".equals(value)) {
			return defaultValue;
		}
		return value;
	}

	/**
	 * 알림 기능 전체 마스터 스위치.
	 * N이면 알림함 기록·FCM 발송·게시글 폴링이 전부 비활성 — LETTAPPNOTI DDL 미적용 DB에 배포해도 무해.
	 */
	private static boolean isNotiEnabled() {
		return "Y".equals(getGlobalsProperty("Globals.noti.enabled", "N"));
	}

	@Override
	public void registerAndPush(String boardId, String bltnNo, String title, String body, String linkUrl) throws Exception {
		if (!isNotiEnabled()) {
			return;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardId", boardId);
		map.put("bltnNo", bltnNo);
		map.put("title", title);
		map.put("body", body);
		map.put("linkUrl", linkUrl);
		int claimed = notiDAO.insertNotiIfNew(map);
		if (claimed > 0) {
			pushToAllAsync(boardId, bltnNo, title, body);
		}
	}

	private void pushToAllAsync(final String boardId, final String bltnNo, final String title, final String body) {
		if (!"Y".equals(getGlobalsProperty("Globals.push.enabled", "N"))) {
			LOGGER.info("푸시 발송 비활성(Globals.push.enabled != Y) — 알림함 기록만 저장: {}", title);
			return;
		}
		PUSH_EXECUTOR.submit(new Runnable() {
			public void run() {
				sendToAllTokens(boardId, bltnNo, title, body);
			}
		});
	}

	private void sendToAllTokens(String boardId, String bltnNo, String title, String body) {
		String projectId = getGlobalsProperty("Globals.fcm.projectId", DEFAULT_PROJECT_ID);
		int sendCnt = 0;
		int failCnt = 0;
		try {
			List<String> tokens = notiDAO.selectPushTokenList();
			for (String token : tokens) {
				try {
					FcmSender.Response res = FcmSender.sendNotification(projectId, token, title, body);
					if (res.isSuccess()) {
						sendCnt++;
					} else {
						failCnt++;
						//폐기 토큰 정리 — 반드시 UNREGISTERED 응답만 삭제.
						//(단순 404는 프로젝트ID 오설정 등에서도 발생하며, TOKEN은 자동로그인 자격이기도 하므로 광범위 삭제 금지)
						if (res.body() != null && res.body().contains("UNREGISTERED")) {
							Map<String, Object> delMap = new HashMap<String, Object>();
							delMap.put("token", token);
							notiDAO.deleteToken(delMap);
						}
					}
				} catch (IllegalStateException e) {
					LOGGER.error("FCM 서비스계정(service-account.json) 미배치 — 발송 중단", e);
					return;
				} catch (Exception e) {
					failCnt++;
					LOGGER.warn("FCM 발송 실패 (token 1건): {}", e.getMessage());
				}
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("boardId", boardId);
			map.put("bltnNo", bltnNo);
			map.put("sendCnt", sendCnt);
			map.put("failCnt", failCnt);
			notiDAO.updateNotiSendResult(map);
			LOGGER.info("FCM 발송 완료 [{}] 성공 {}건 / 실패 {}건", new Object[] { title, sendCnt, failCnt });
		} catch (Exception e) {
			LOGGER.error("FCM 발송 처리 오류 [" + title + "]", e);
		}
	}

	@Override
	public void pollNewBoardPosts() {
		if (!isNotiEnabled()) {
			return;
		}
		try {
			String boardIdsProp = getGlobalsProperty("Globals.push.boardIds", DEFAULT_BOARD_IDS);
			List<String> boardIds = new ArrayList<String>();
			for (String id : boardIdsProp.split(",")) {
				if (!"".equals(id.trim())) {
					boardIds.add(id.trim());
				}
			}
			if (boardIds.isEmpty()) {
				return;
			}
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("boardIds", boardIds);
			List<EgovMap> newPosts = notiDAO.selectNewBoardList(param);
			for (EgovMap post : newPosts) {
				//게시글 1건 실패(이중화 동시 클레임 등)가 나머지 처리를 막지 않도록 건별 격리
				try {
					String boardId = StringUtil.isNullToString(post.get("boardId"));
					String bltnNo = StringUtil.isNullToString(post.get("bltnNo"));
					String boardNm = StringUtil.isNullToString(post.get("boardNm"), boardId);
					String subject = StringUtil.isNullToString(post.get("bltnSubj"));
					String linkUrl = "/kicpa/commonBoard/boardDetail.do?boardId=" + boardId + "&bltnNo=" + bltnNo;
					registerAndPush(boardId, bltnNo, boardNm, subject, linkUrl);
				} catch (Exception e) {
					LOGGER.warn("게시글 알림 등록 실패 (1건 스킵): {}", e.getMessage());
				}
			}
		} catch (Exception e) {
			LOGGER.error("신규 게시글 알림 폴링 오류", e);
		}
	}

	@Override
	public void selectNotiLists(Map<String, Object> map) throws Exception {
		List<EgovMap> list = notiDAO.selectNotiList(map);
		int cnt = notiDAO.selectNotiListCnt(map);
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
	}

	@Override
	public String selectPushSetting(Map<String, Object> map) throws Exception {
		return notiDAO.selectPushSetting(map);
	}

	@Override
	public void updatePushSetting(Map<String, Object> map) throws Exception {
		notiDAO.updatePushSetting(map);
	}
}
