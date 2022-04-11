package adminwork.kicpa.main.service.impl;


import java.util.List;

import org.springframework.stereotype.Repository;

import adminwork.kicpa.main.service.Scalendar;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("mainDAO")
public class MainDAO extends EgovAbstractDAO{

	
	public Scalendar selectCalCnt(Scalendar vo) throws Exception{
		return (Scalendar) select("mainDAO.selectCalCnt",vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<Scalendar> selectCalList(Scalendar vo)throws Exception{
		return (List<Scalendar>) list("mainDAO.selectCalList", vo);
	}
}
