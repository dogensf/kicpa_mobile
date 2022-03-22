package adminwork.kicpa.faq.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface FaqService {

	public void selectFaqLists(Map<String,Object> map)throws Exception;

	public EgovMap selectFaq(Map<String,Object> map)throws Exception;

	public void updateRdcnt(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectCsCodeGroupList() throws Exception;


}
