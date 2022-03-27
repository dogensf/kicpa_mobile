package adminwork.kicpa.sntBook.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface  SntBookService {

	public List<EgovMap> selectBookList(Map<String,Object> map) throws Exception;

	public int selectBookListCnt(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectBookFormatList(Map<String,Object> map) throws Exception;

	public int selectBookFormatListCnt(Map<String,Object> map) throws Exception;

	public EgovMap selectBookDetail(Map<String,Object> map) throws Exception;

	public void procedureEduMasterList(Map<String,Object> map) throws Exception;

	public EgovMap selectEduMasterListDetail(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectOfflineEduList(Map<String,Object> map) throws Exception;

	public EgovMap selectOfflineEduDetail(Map<String,Object> map) throws Exception;

	public void updateOfflineEduReadCnt(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectOfflineEduAppList(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectCartInputBookList(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectBookBuyHistoryList(Map<String,Object> map) throws Exception;

	public EgovMap selectBookBuyHistoryOrderMaster(Map<String,Object> map) throws Exception;

	public void procedureEduAppAndModify(Map<String,Object> map) throws Exception;

	public void insertOrder(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectCorporationList(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectBookFormatOrderList(Map<String,Object> map) throws Exception;

	public EgovMap selectTaxDetail(Map<String,Object> map) throws Exception;


}
