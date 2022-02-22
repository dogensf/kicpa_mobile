package adminwork.kicpa.taxNews.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("taxNewsService")
public class TaxNewsServiceImpl extends EgovAbstractServiceImpl implements TaxNewsService{

	@Resource(name="taxNewsDAO")
	private TaxNewsDAO taxNewsDAO;


}
