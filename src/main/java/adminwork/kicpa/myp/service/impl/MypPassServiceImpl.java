package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypPassService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("mypPassService")
public class MypPassServiceImpl extends EgovAbstractServiceImpl implements MypPassService {

	@Resource(name="MypPassDAO")
	private MypPassDAO mypPassDAO;

	@Override
	public void mypCpaPassRegisterPassInfoSave(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterPassInfoSave(map);
	}

	@Override
	public void mypCpaPassRegisterAdressInfoSave(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterAdressInfoSave(map);
	}

	@Override
	public void mypCpaPassRegisterContactInfoSave(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterContactInfoSave(map);
	}

	@Override
	public void mypCpaPassRegisterAcdmcrInfoDelete(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterAcdmcrInfoDelete(map);
	}

	@Override
	public void mypCpaPassRegisterAcdmcrInfoSave(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterAcdmcrInfoSave(map);
	}


	@Override
	public void mypCpaPassRegisterPassInfoUpdate(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterPassInfoUpdate(map);
	}

	@Override
	public void mypCpaPassRegisterAdressInfoUpdate(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterAdressInfoUpdate(map);
	}

	@Override
	public void mypCpaPassRegisterOficeInfoUpdate(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterOficeInfoUpdate(map);
	}

	@Override
	public void mypCpaPassRegisterPostSndngYnUpdate(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterPostSndngYnUpdate(map);
	}

	@Override
	public void mypCpaPassRegisterContactInfoUpdate(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterContactInfoUpdate(map);
	}

	@Override
	public void mypCpaPassRegisterAcdmcrInfoUpdate(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterAcdmcrInfoUpdate(map);
	}

	@Override
	public void mypCpaPassRegisterAcdmcrDelete(Map<String, Object> map) throws Exception {
		mypPassDAO.mypCpaPassRegisterAcdmcrDelete(map);
	}
}
