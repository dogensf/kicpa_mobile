package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.CpaMyp;
import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypPassService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("mypMemberService")
public class MypMemberServiceImpl extends EgovAbstractServiceImpl implements MypMemberService {

	@Resource(name="MypMemberDAO")
	private MypMemberDAO mypMemberDAO;

	@Override
	public List<?> selectCpaCanclInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaCanclInfoList(map);
	}

	@Override
	public String selectMypCpaMemberRegisterRegFlagInfo(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectMypCpaMemberRegisterRegFlagInfo(map);
	}

	@Override
	public String selectMypCpaMemberRegisterSbscrbMypSnInfo(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectMypCpaMemberRegisterSbscrbMypSnInfo(map);
	}

	@Override
	public List<EgovMap> selectCpaAuditPopupSearchList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaAuditPopupSearchList(map);
	}

	@Override
	public int mypCpaMemberRegisterAgreeInfoSave(Map<String, Object> map) throws Exception {
		return mypMemberDAO.mypCpaMemberRegisterAgreeInfoSave(map);
	}

	@Override
	public void mypCpaMemberRegisterAidMberInfoSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterAidMberInfoSave(map);
	}

	@Override
	public void mypCpaMemberRegisterCpaCareerInfoSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterCpaCareerInfoSave(map);
	}

	@Override
	public void mypCpaMemberRegisterNmstOthbcInfoSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoSave(map);
	}

	@Override
	public void mypCpaMemberRegisterAtchFileIdSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterAtchFileIdSave(map);
	}

	@Override
	public void mypCpaMemberRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterFlagFAtchFileSave(map);
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

	@Override
	public void mypCpaMemberRegisterNmstOthbcInfoUpdatePortal(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoUpdatePortal(map);
	}

	@Override
	public List<?> selectCpaMemberRegistSbscrbMasterInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberRegistSbscrbMasterInfoList(map);
	}

	@Override
	public void cpaMemberRegistSbscrbMasterFlagSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.cpaMemberRegistSbscrbMasterFlagSave(map);
	}

	@Override
	public List<?> selectCpaMemberRegistNmstOthbcInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberRegistNmstOthbcInfoList(map);
	}

	@Override
	public List<?> selectCpaMemberRegAidDuesInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberRegAidDuesInfoList(map);
	}

	@Override
	public List<?> selectCpaMemberSbscrbMasterInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectCpaMemberSbscrbMasterInfoList(map);
	}

	@Override
	public void mypCpaMemberRegisterRegFlagSave(Map<String, Object> map) throws Exception {
		mypMemberDAO.mypCpaMemberRegisterRegFlagSave(map);
	}

    @Override
    public String mypCpaMemberRegisterSave(Map<String, Object> map) throws Exception {

        String message = "";

        //오늘날짜
        SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
        Calendar c1 = Calendar.getInstance();
        String opetrDe = today.format(c1.getTime());

        map.put("opetrDe", opetrDe);
        map.put("regFlag","Y");
        map.put("userId", map.get("pin"));

        mypMemberDAO.mypCpaMemberRegisterRegFlagSave(map);


        //입회비 납부 버튼 클릭시 프로시저 호출
        if("Y".equals(map.get("payYn"))){

            //저장된 회원등록정보 조회
            List<CpaMyp> cpaMypInfo = mypMemberDAO.selectCpaMemberRegInfo(map);

            Map<String, Object> sbscrbProcResult = new HashMap<>();

            sbscrbProcResult.put("v_pin", cpaMypInfo.get(0).getPin());
            sbscrbProcResult.put("v_mber_flag", cpaMypInfo.get(0).getMberFlag());
            sbscrbProcResult.put("v_audit_cd", cpaMypInfo.get(0).getAuditId());
            sbscrbProcResult.put("v_reg_de", cpaMypInfo.get(0).getRegistDe());

            mypMemberDAO.callSbscrb01Proc(sbscrbProcResult);       //(프로시저 호출)

            if(!"1".equals(sbscrbProcResult.get("v_result"))){

                if(!"".equals(sbscrbProcResult.get("v_sqlerrm")) && sbscrbProcResult.get("v_sqlerrm") != null){
                    message = sbscrbProcResult.get("v_sqlerrm").toString();
                }

            }

        }

        return message;
    }

	@Override
	public List<?> selectMemEventSendMemList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectMemEventSendMemList(map);
	}

	@Override
	public List<?> selectSendMessageExceptInfo(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectSendMessageExceptInfo(map);
	}

	@Override
	public List<?> selectMemSendMessageInfoList(Map<String, Object> map) throws Exception {
		return mypMemberDAO.selectMemSendMessageInfoList(map);
	}

	@Override
	public void cpaMemMessageSend(Map<String, Object> map) throws Exception {
		mypMemberDAO.cpaMemMessageSend(map);
	}
}
