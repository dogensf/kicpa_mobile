package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypMemberDAO")
public class MypMemberDAO extends EgovComAbstractDAO2 {


    public List<?> selectCpaCanclInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaCanclInfoList", (Object) map);
    }

    public String selectMypCpaMemberRegisterRegFlagInfo(Map<String, Object> map) throws Exception {
        return (String) select("MypMemberDAO.selectMypCpaMemberRegisterRegFlagInfo", (Object) map);
    }

    public String selectMypCpaMemberRegisterSbscrbMypSnInfo(Map<String, Object> map) throws Exception {
        return (String) select("MypMemberDAO.selectMypCpaMemberRegisterSbscrbMypSnInfo", (Object) map);
    }

    public List<EgovMap> selectCpaAuditPopupSearchList(Map<String, Object> map) throws Exception {
        return (List<EgovMap>) list("MypMemberDAO.selectCpaAuditPopupSearchList", (Object) map);
    }

    public int mypCpaMemberRegisterAgreeInfoSave(Map<String, Object> map) throws Exception {
        return (int)insert("MypMemberDAO.mypCpaMemberRegisterAgreeInfoSave", (Object) map);
    }

    public void mypCpaMemberRegisterAidMberInfoSave(Map<String, Object> map) throws Exception {
        update("MypMemberDAO.mypCpaMemberRegisterAidMberInfoSave", (Object) map);
    }

    public void mypCpaMemberRegisterCpaCareerInfoSave(Map<String, Object> map) throws Exception {
        update("MypMemberDAO.mypCpaMemberRegisterCpaCareerInfoSave", (Object) map);
    }

    public void mypCpaMemberRegisterNmstOthbcInfoSave(Map<String, Object> map) throws Exception {
        insert("MypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoSave", (Object) map);
    }

    public void mypCpaMemberRegisterAtchFileIdSave(Map<String, Object> map) throws Exception {
        update("MypMemberDAO.mypCpaMemberRegisterAtchFileIdSave", (Object) map);
    }

    public void mypCpaMemberRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception {
        update("MypMemberDAO.mypCpaMemberRegisterFlagFAtchFileSave", (Object) map);
    }

    public List<?> selectCpaMemberRegistTrnngSmInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberRegistTrnngSmInfoList", (Object) map);
    }

    public List<?> selectCpaMemberRegistTrnngSmYearList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberRegistTrnngSmYearList", (Object) map);
    }

    public List<?> selectCpaMemberRegNmstOthbcInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberRegNmstOthbcInfoList", (Object) map);
    }

    public void mypCpaMemberRegisterNmstOthbcInfoUpdate(Map<String, Object> map) throws Exception {
        insert("MypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoUpdate", (Object) map);
    }

    public void mypCpaMemberRegisterNmstOthbcInfoUpdatePortal(Map<String, Object> map) throws Exception {
        insert("MypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoUpdatePortal", (Object) map);
    }

    public List<?> selectCpaMemberRegistSbscrbMasterInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberRegistSbscrbMasterInfoList", (Object) map);
    }

    public void cpaMemberRegistSbscrbMasterFlagSave(Map<String, Object> map) throws Exception {
        update("MypMemberDAO.cpaMemberRegistSbscrbMasterFlagSave", (Object) map);
    }

    public List<?> selectCpaMemberRegistNmstOthbcInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberRegistNmstOthbcInfoList", (Object) map);
    }

    public List<?> selectCpaMemberRegAidDuesInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberRegAidDuesInfoList", (Object) map);
    }

    public List<?> selectCpaMemberSbscrbMasterInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectCpaMemberSbscrbMasterInfoList", (Object) map);
    }

    public void mypCpaMemberRegisterRegFlagSave(Map<String, Object> map) throws Exception {
        update("MypMemberDAO.mypCpaMemberRegisterRegFlagSave", (Object) map);
    }

    public List<?> selectMemEventSendMemList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectMemEventSendMemList", (Object) map);
    }

    public List<?> selectMemSendMessageInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypMemberDAO.selectMemSendMessageInfoList", (Object) map);
    }

    public void cpaMemMessageSend(Map<String, Object> map) throws Exception {
        insert("MypMemberDAO.cpaMemMessageSend", (Object) map);
    }
}
