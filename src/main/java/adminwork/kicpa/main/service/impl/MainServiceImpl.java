package adminwork.kicpa.main.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.main.service.MainService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("mainService")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService{

	@Resource(name="mainDAO")
	private MainDAO mainDAO;


}
