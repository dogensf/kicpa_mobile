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
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Service("FaqService")
public class FaqServiceImpl extends EgovAbstractServiceImpl implements FaqService {

	@Resource(name="FaqDAO")
	private FaqDAO faqDAO;

	public void selectFaqLists(Map<String,Object> map)throws Exception{

		List<EgovMap> list = faqDAO.selectFaqList(map);
		int cnt = faqDAO.selectFaqListCnt(map);
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
	}

	public EgovMap selectFaq(Map<String,Object> map)throws Exception{
		return faqDAO.selectFaq(map);
	}

	public void updateRdcnt(Map<String,Object> map) throws Exception {
		faqDAO.updateRdcnt(map);
	}

	@Override
	public List<EgovMap> selectCsCodeGroupList() throws Exception {
		return faqDAO.selectCsCodeGroupList();
	}




}
