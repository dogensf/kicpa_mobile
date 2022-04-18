package adminwork.kicpa.cmm.board.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("commonBoardDAO")
public class CommonBoardDAO extends EgovAbstractDAO{

	public EgovMap selectBoardMaster(Map<String, Object> map) throws Exception {
        return (EgovMap) select("KicpaCommBoardDAO.selectBoardMaster",map);
	}

	public List<EgovMap> selectCommonBoardList(Map<String, Object> map) throws Exception {
        return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonBoardList",map);
	}

	public int selectCommonBoardListCnt(Map<String, Object> map) throws Exception {
		return (int) select("KicpaCommBoardDAO.selectCommonBoardListCnt",map);
	}

	public List<EgovMap> selectCommonCafeBoardList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonCafeBoardList",map);
	}

	public int selectCommonCafeBoardListCnt(Map<String, Object> map) throws Exception {
		return (int) select("KicpaCommBoardDAO.selectCommonCafeBoardListCnt",map);
	}

	public EgovMap selectCommonBoardDetail(Map<String, Object> map) throws Exception {
		return (EgovMap) select("KicpaCommBoardDAO.selectCommonBoardDetail",map);
	}
	public EgovMap selectCommonCafeBoardDetail(Map<String, Object> map) throws Exception {
		return (EgovMap) select("KicpaCommBoardDAO.selectCommonCafeBoardDetail",map);
	}

	public List<EgovMap> selectCommonBoardFileList(Map<String, Object> map) throws Exception {
        return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonBoardFileList",map);
	}
	public List<EgovMap> selectCommonCafeBoardFileList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonCafeBoardFileList",map);
	}
	public List<EgovMap> selectCommonBoardGroupList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonBoardGroupList",map);
	}
	public List<EgovMap> selectCommonCafeBoardGroupList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonCafeBoardGroupList",map);
	}

	public int updateCommonBoardReadCnt(Map<String, Object> map) throws Exception {
		return update("KicpaCommBoardDAO.updateCommonBoardReadCnt",map);
	}
	public int updateCommonCafeBoardReadCnt(Map<String, Object> map) throws Exception {
		return update("KicpaCommBoardDAO.updateCommonCafeBoardReadCnt",map);
	}

	public List<EgovMap> selectCommonBoardIdArrList(Map<String, Object> map) throws Exception {
		return (List<EgovMap>) list("KicpaCommBoardDAO.selectCommonBoardIdArrList",map);
	}

	public int selectCommonBoardIdArrListCnt(Map<String, Object> map) throws Exception {
		return (int) select("KicpaCommBoardDAO.selectCommonBoardIdArrListCnt",map);
	}

	public int insertCommonBoard(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonBoard",map);
	}

	public int insertCommonCafeBoard(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonCafeBoard",map);
	}

	public int insertCommonBoardCnnt(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonBoardCnnt",map);
	}

	public int insertCommonCafeBoardCnnt(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonCafeBoardCnnt",map);
	}

	public int insertCommonBoardFile(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonBoardFile",map);
	}

	public int insertCommonCafeBoardFile(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonCafeBoardFile",map);
	}

	public String selectCommonBoardKey(Map<String, Object> map) throws Exception {
		return (String) select("KicpaCommBoardDAO.selectCommonBoardKey",map);
	}

	public int mergeCommonBoardKey(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.mergeCommonBoardKey",map);
	}

	public int mergeCommonBoardUserHistory(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.mergeCommonBoardUserHistory",map);
	}

	public int insertCommonBoardUserActionHistory(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonBoardUserActionHistory",map);
	}
	public int insertCommonBoardExtn(Map<String, Object> map) throws Exception {
		return (int) update("KicpaCommBoardDAO.insertCommonBoardExtn",map);
	}

	public EgovMap selectCommonBoardFileDetail(Map<String, Object> map) throws Exception {
		return (EgovMap) select("KicpaCommBoardDAO.selectCommonBoardFileDetail",map);
	}
	public EgovMap selectCommonCateBoardFileDetail(Map<String, Object> map) throws Exception {
		return (EgovMap) select("KicpaCommBoardDAO.selectCommonCateBoardFileDetail",map);
	}

	public int updateCommonBoardFileDownCnt(Map<String, Object> map) throws Exception {
		return update("KicpaCommBoardDAO.updateCommonBoardFileDownCnt",map);
	}

	public int updateCommonCafeBoardFileDownCnt(Map<String, Object> map) throws Exception {
		return update("KicpaCommBoardDAO.updateCommonCafeBoardFileDownCnt",map);
	}

	public int updateCommonBoardDelete(Map<String, Object> map) throws Exception {
		return update("KicpaCommBoardDAO.updateCommonBoardDelete",map);
	}
	public int updateCommonCafeBoardDelete(Map<String, Object> map) throws Exception {
		return update("KicpaCommBoardDAO.updateCommonCafeBoardDelete",map);
	}


}

