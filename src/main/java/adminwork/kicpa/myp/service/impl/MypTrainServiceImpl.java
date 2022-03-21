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
	public void mypCpaTrainRegisterPictInfoSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterPictInfoSave(map);
	}

	@Override
	public void mypCpaTrainRegisterFlagFPictInfoSave(Map<String, Object> map) throws Exception {
		mypTrainDAO.mypCpaTrainRegisterFlagFPictInfoSave(map);
	}

	@Override
	public void updateCpaPassMemPict(Map<String, Object> map) throws Exception {
		mypTrainDAO.updateCpaPassMemPict(map);
	}

	@Override
	public void insertCpaPassMemPict(Map<String, Object> map) throws Exception {
		mypTrainDAO.insertCpaPassMemPict(map);
	}
}
