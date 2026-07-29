package adminwork.kicpa.noti.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("NotiDAO")
public class NotiDAO extends EgovAbstractDAO {

	/** 알림 등록 클레임 — 이미 등록된 (boardId, bltnNo)면 0 반환 */
	public int insertNotiIfNew(Map<String, Object> map) throws Exception {
		return update("NotiDAO.insertNotiIfNew", map);
	}

	@SuppressWarnings("unchecked")
	public List<EgovMap> selectNewBoardList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("NotiDAO.selectNewBoardList", map);
	}

	@SuppressWarnings("unchecked")
	public List<String> selectPushTokenList(Map<String, Object> map) throws Exception {
		return (List<String>) list("NotiDAO.selectPushTokenList", map);
	}

	public void deleteToken(Map<String, Object> map) throws Exception {
		delete("NotiDAO.deleteToken", map);
	}

	public void updateNotiSendResult(Map<String, Object> map) throws Exception {
		update("NotiDAO.updateNotiSendResult", map);
	}

	@SuppressWarnings("unchecked")
	public List<EgovMap> selectNotiList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("NotiDAO.selectNotiList", map);
	}

	public int selectNotiListCnt(Map<String, Object> map) throws Exception {
		return (Integer) select("NotiDAO.selectNotiListCnt", map);
	}

	public EgovMap selectPushSetting(Map<String, Object> map) throws Exception {
		return (EgovMap) select("NotiDAO.selectPushSetting", map);
	}

	public void updatePushSetting(Map<String, Object> map) throws Exception {
		update("NotiDAO.updatePushSetting", map);
	}
}
