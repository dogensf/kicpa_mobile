package adminwork.kicpa.noti.service;

import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 앱 푸시 알림 서비스.
 * 알림함(LETTAPPNOTI) 기록과 FCM 발송, 유형별 수신동의(LETTAPPTOKEN.PUSH_EVENT_YN/PUSH_BOARD_YN) 관리를 담당한다.
 */
public interface NotiService {

	/**
	 * 알림을 알림함에 기록하고(중복이면 무시) 신규 기록시에만 전체 토큰 대상 FCM 발송.
	 * 발송은 별도 스레드에서 비동기로 수행되며, Globals.push.enabled=Y 일 때만 실제 발송한다.
	 */
	void registerAndPush(String boardId, String bltnNo, String title, String body, String linkUrl) throws Exception;

	/**
	 * 대상 게시판(Globals.push.boardIds)의 신규 게시글을 감시해 알림 등록+발송. 스케줄러에서 호출.
	 */
	void pollNewBoardPosts();

	/**
	 * 알림함 목록 조회. map에 resultList/resultCnt 를 담아 반환.
	 */
	void selectNotiLists(Map<String, Object> map) throws Exception;

	/**
	 * 기기(토큰)별 유형별 수신동의 조회 (pushEventYn/pushBoardYn, 미등록·미설정은 N).
	 */
	EgovMap selectPushSetting(Map<String, Object> map) throws Exception;

	/**
	 * 기기(토큰)별 유형별 수신동의 저장 (map: token, pushType=EVENT|BOARD, pushYn=Y|N).
	 */
	void updatePushSetting(Map<String, Object> map) throws Exception;
}
