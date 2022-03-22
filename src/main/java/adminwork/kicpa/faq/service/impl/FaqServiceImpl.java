package adminwork.kicpa.faq.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.faq.service.Faq;
import adminwork.kicpa.faq.service.FaqService;
import adminwork.kicpa.faq.service.FaqVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


@Service("FaqService")
public class FaqServiceImpl extends EgovAbstractServiceImpl implements FaqService {

	@Resource(name="FaqDAO")
	private FaqDAO faqDAO;
	
	public Map<String, Object> selectFaqLists(FaqVO vo)throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();

		List<Faq> result = faqDAO.selectFaqList(vo);
		int cnt = faqDAO.selectFaqListCnt(vo);
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	public Faq selectFaq(FaqVO vo)throws Exception{		
		return faqDAO.selectFaq(vo);		
	}
	
	public void updateRdcnt(FaqVO vo) throws Exception {
		faqDAO.updateRdcnt(vo);
	}
	
	
	
	
}
