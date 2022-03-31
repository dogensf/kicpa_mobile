package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.MypAudTrainService;
import adminwork.kicpa.myp.service.MypTrainService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("mypAudTrainService")
public class MypAudTrainServiceImpl extends EgovAbstractServiceImpl implements MypAudTrainService {

	@Resource(name="MypAudTrainDAO")
	private MypAudTrainDAO mypAudTrainDAO;

	@Override
	public String selectMypCpaAudTrainRegisterRegFlagInfo(Map<String, Object> map) throws Exception {
		return mypAudTrainDAO.selectMypCpaAudTrainRegisterRegFlagInfo(map);
	}

	@Override
	public int mypCpaAudTrainRegisterAgreeSave(Map<String, Object> map) throws Exception {
		return mypAudTrainDAO.mypCpaAudTrainRegisterAgreeSave(map);
	}

	@Override
	public void mypCpaAudTrainRegisterApntcCpaHistInfoSave(Map<String, Object> map) throws Exception {
		mypAudTrainDAO.mypCpaAudTrainRegisterApntcCpaHistInfoSave(map);
	}

	@Override
	public void mypCpaAudTrainRegisterAtchFileIdSave(Map<String, Object> map) throws Exception {
		mypAudTrainDAO.mypCpaAudTrainRegisterAtchFileIdSave(map);
	}

	@Override
	public void mypCpaAudTrainRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception {
		mypAudTrainDAO.mypCpaAudTrainRegisterFlagFAtchFileSave(map);
	}

	@Override
	public void mypCpaAudTrainRegisterRegFlagSave(Map<String, Object> map) throws Exception {
		mypAudTrainDAO.mypCpaAudTrainRegisterRegFlagSave(map);
	}

}
