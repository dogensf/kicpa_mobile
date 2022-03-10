package adminwork.kicpa.sntBook.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("sntBookDAO")
public class SntBookDAO extends EgovAbstractDAO{

	public List<EgovMap> selectBookList(Map<String,Object> map) throws Exception {
        return (List<EgovMap>) list("SntBookDAO.selectBookList",map);
	}

	public int selectBookListCnt(Map<String,Object> map) throws Exception {
		return (int) select("SntBookDAO.selectBookListCnt",map);
	}

	public List<EgovMap> selectBookFormatList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("SntBookDAO.selectBookFormatList",map);
	}

	public int selectBookFormatListCnt(Map<String,Object> map) throws Exception {
		return (int) select("SntBookDAO.selectBookFormatListCnt",map);
	}

	public EgovMap selectBookDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("SntBookDAO.selectBookDetail",map);
	}

	public void procedureEduMasterList(Map<String,Object> map) throws Exception {
		list("SntBookDAO.procedureEduMasterList",map);
	}

	public void procedureEduAppAndModify(Map<String,Object> map) throws Exception {
		update("SntBookDAO.procedureEduAppAndModify",map);
	}

	public EgovMap selectEduMasterListDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("SntBookDAO.selectEduMasterListDetail",map);
	}

	public List<EgovMap> selectOfflineEduList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("SntBookDAO.selectOfflineEduList",map);
	}

	public EgovMap selectOfflineEduDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("SntBookDAO.selectOfflineEduDetail",map);
	}

	public int updateOfflineEduReadCnt(Map<String,Object> map) throws Exception {
		return update("SntBookDAO.updateOfflineEduReadCnt",map);
	}

	public List<EgovMap> selectOfflineEduAppList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("SntBookDAO.selectOfflineEduAppList",map);
	}

	public List<EgovMap> selectCartInputBookList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("SntBookDAO.selectCartInputBookList",map);
	}

	public List<EgovMap> selectBookBuyHistoryList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("SntBookDAO.selectBookBuyHistoryList",map);
	}

	public EgovMap selectBookBuyHistoryOrderMaster(Map<String,Object> map) throws Exception {
		return (EgovMap) select("SntBookDAO.selectBookBuyHistoryOrderMaster",map);
	}
	public List<EgovMap> selectBookBuyHistoryOrderDetailList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("SntBookDAO.selectBookBuyHistoryOrderDetailList",map);
	}

	public int insertOrder(Map<String,Object> map) throws Exception {
		return update("SntBookDAO.insertOrder",map);
	}
	public int insertOrderItem(Map<String,Object> map) throws Exception {
		return update("SntBookDAO.insertOrderItem",map);
	}
}
