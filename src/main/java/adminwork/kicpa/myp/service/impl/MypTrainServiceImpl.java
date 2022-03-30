package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypTrainService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("mypTrainService")
public class MypTrainServiceImpl extends EgovAbstractServiceImpl implements MypTrainService {

	@Resource(name="MypTrainDAO")
	private MypTrainDAO mypTrainDAO;


	@Override
	public String selectMypCpaTrainRegisterRegFlagInfo(Map<String, Object> map) throws Exception {
		return mypTrainDAO.selectMypCpaTrainRegisterRegFlagInfo(map);
	}

	@Override
	public List<?> selectCpaTrainRegistMemPictInfo(Map<String, Object> map) throws Exception {
		return mypTrainDAO.selectCpaTrainRegistMemPictInfo(map);
	}

	@Override
	public Long mypCpaTrainRegisterAgreeSave(Map<String, Object> map) throws Exception {
		return mypTrainDAO.mypCpaTrainRegisterAgreeSave(map);
	}

	@Override
	public void mypCpaTrainRegisterPictInfoSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterPictInfoSave(map);
	}

	@Override
	public void mypCpaTrainRegisterFlagFPictInfoSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterFlagFPictInfoSave(map);
	}

	@Override
	public void mypCpaTrainRegisterGrdtSatausInfoSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterGrdtSatausInfoSave(map);
	}

	@Override
	public void mypCpaTrainRegisterApntcCpaHistInfoSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterApntcCpaHistInfoSave(map);
	}

	@Override
	public void mypCpaTrainRegisterAtchFileIdSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterAtchFileIdSave(map);
	}

	@Override
	public void mypCpaTrainRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterFlagFAtchFileSave(map);
	}

	@Override
	public void mypCpaTrainRegisterRegFlagSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterRegFlagSave(map);
	}

	@Override
	public int selectApntcCpaHistGuideCpaCehck(Map<String, Object> map) throws Exception {
		return mypTrainDAO.selectApntcCpaHistGuideCpaCehck(map);
	}

	@Override
	public void updateCpaPassMemPict(Map<String, Object> map) throws Exception {
		mypTrainDAO.updateCpaPassMemPict(map);
	}

	@Override
	public void insertCpaPassMemPict(Map<String, Object> map) throws Exception {
		mypTrainDAO.insertCpaPassMemPict(map);
	}

	@Override
	public List<?> selectCpaPassRegistMberPhotoInfo(Map<String, Object> map) throws Exception {
		return mypTrainDAO.selectCpaPassRegistMberPhotoInfo(map);
	}
}
