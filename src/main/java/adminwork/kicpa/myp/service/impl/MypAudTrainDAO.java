package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypAudTrainDAO")
public class MypAudTrainDAO extends EgovComAbstractDAO2 {


    public String selectMypCpaAudTrainRegisterRegFlagInfo(Map<String, Object> map) throws Exception {
        return (String) select("MypAudTrainDAO.selectMypCpaAudTrainRegisterRegFlagInfo", (Object) map);
    }

    public int mypCpaAudTrainRegisterAgreeSave(Map<String, Object> map) throws Exception {
        return (int)insert("MypAudTrainDAO.mypCpaAudTrainRegisterAgreeSave", (Object) map);
    }

    public void mypCpaAudTrainRegisterApntcCpaHistInfoSave(Map<String, Object> map) throws Exception {
        update("MypAudTrainDAO.mypCpaAudTrainRegisterApntcCpaHistInfoSave", (Object) map);
    }

    public void mypCpaAudTrainRegisterAtchFileIdSave(Map<String, Object> map) throws Exception {
        update("MypAudTrainDAO.mypCpaAudTrainRegisterAtchFileIdSave", (Object) map);
    }

    public void mypCpaAudTrainRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception {
        update("MypAudTrainDAO.mypCpaAudTrainRegisterFlagFAtchFileSave", (Object) map);
    }

    public void mypCpaAudTrainRegisterRegFlagSave(Map<String, Object> map) throws Exception {
        update("MypAudTrainDAO.mypCpaAudTrainRegisterRegFlagSave", (Object) map);
    }
}
