package adminwork.kicpa.faq.service;

import java.util.Map;

public interface FaqService {
	
	public Map<String, Object> selectFaqLists(FaqVO vo)throws Exception;
	
	public Faq selectFaq(FaqVO vo)throws Exception;
	
	public void updateRdcnt(FaqVO vo) throws Exception;
	
	
	
	

}
