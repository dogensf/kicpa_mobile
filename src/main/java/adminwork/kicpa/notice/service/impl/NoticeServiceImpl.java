package adminwork.kicpa.notice.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.notice.service.NoticeService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("noticeService")
public class NoticeServiceImpl extends EgovAbstractServiceImpl implements NoticeService{

	@Resource(name="noticeDAO")
	private NoticeDAO noticeDAO;

	@Override
	public List<EgovMap> selectNewsList(Map<String, Object> map) throws Exception {
		return noticeDAO.selectNewsList(map);
	}

	@Override
	public int selectNewsListCnt(Map<String, Object> map) throws Exception {
		return noticeDAO.selectNewsListCnt(map);
	}


}
