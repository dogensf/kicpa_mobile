package adminwork.kicpa.main.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.main.service.Main;
import adminwork.kicpa.main.service.MainService;
import adminwork.kicpa.main.service.Scalendar;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("mainService")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService{

	@Resource(name="mainDAO")
	private MainDAO mainDAO;


	public Scalendar selectCalCnt(Scalendar vo)throws Exception{
		return mainDAO.selectCalCnt(vo);
	}
	
	public List<Scalendar> selectCalList(Scalendar vo)throws Exception{
		return mainDAO.selectCalList(vo);
	}
	
	public void setFcmToken(Main vo)throws Exception{
		mainDAO.setFcmToken(vo);
	}
}
