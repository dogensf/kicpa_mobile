package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypPassService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("mypMemberService")
public class MypMemberServiceImpl extends EgovAbstractServiceImpl implements MypMemberService {

	@Resource(name="MypMemberDAO")
	private MypMemberDAO mypMemberDAO;

	@Override
	public void mypCpaMemberRegisterNmstOthbcInfoSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoSave(map);
	}

	@Override
	public List<?> selectCpaMemberRegistTrnngSmInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberRegistTrnngSmInfoList(map);
	}

	@Override
	public List<?> selectCpaMemberRegistTrnngSmYearList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberRegistTrnngSmYearList(map);
	}

	@Override
	public List<?> selectCpaMemberRegNmstOthbcInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberRegNmstOthbcInfoList(map);
	}

	@Override
	public void mypCpaMemberRegisterNmstOthbcInfoUpdate(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoUpdate(map);
	}
}
