package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypPassDAO")
public class MypPassDAO extends EgovComAbstractDAO2 {


    public void mypCpaPassRegisterAgreeSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.mypCpaPassRegisterAgreeSave", map);
    }

    public void mypCpaPassRegisterPassInfoSave(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterPassInfoSave", (Object) map);
    }

    public void mypCpaPassRegisterAdressInfoSave(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterAdressInfoSave", (Object) map);
    }

    public void mypCpaPassRegisterContactInfoSave(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterContactInfoSave", (Object) map);
    }

    public void mypCpaPassRegisterAcdmcrInfoDelete(Map<String, Object> map) throws Exception {
        delete("MypPassDAO.mypCpaPassRegisterAcdmcrInfoDelete", (Object) map);
    }

    public void mypCpaPassRegisterAcdmcrInfoSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.mypCpaPassRegisterAcdmcrInfoSave", (Object) map);
    }

    public List<?> selectCpaPassRegistReviewInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypPassDAO.selectCpaPassRegistReviewInfoList", (Object) map);
    }

    public List<?> selectCpaPassRegistReviewAcdmcrInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypPassDAO.selectCpaPassRegistReviewAcdmcrInfoList", (Object) map);
    }

    public void mypCpaPassRegisterRegFlagSave(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterRegFlagSave", (Object) map);
    }



    public List<?> selectMypCpaPsexamInfo(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypPassDAO.selectMypCpaPsexamInfo", (Object) map);
    }

    public void cpaPassRegistPassInfoSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.cpaPassRegistPassInfoSave", (Object) map);
    }

    public void cpaPassRegistAdressInfoSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.cpaPassRegistAdressInfoSave", (Object) map);
    }

    public void cpaPassRegistOficeInfoSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.cpaPassRegistOficeInfoSave", (Object) map);
    }

    public void cpaPassRegistRsumInfoSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.cpaPassRegistRsumInfoSave", (Object) map);
    }

    public void cpaPassRegistAcdmcrInfoSave(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.cpaPassRegistAcdmcrInfoSave", (Object) map);
    }


    public void mypCpaPassRegisterPassInfoUpdate(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterPassInfoUpdate", (Object) map);
    }

    public void mypCpaPassRegisterAdressInfoUpdate(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterAdressInfoUpdate", (Object) map);
    }

    public void mypCpaPassRegisterOficeInfoUpdate(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterOficeInfoUpdate", (Object) map);
    }

    public void mypCpaPassRegisterPostSndngYnUpdate(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterPostSndngYnUpdate", (Object) map);
    }

    public void mypCpaPassRegisterContactInfoUpdate(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterContactInfoUpdate", (Object) map);
    }

    public void mypCpaPassRegisterAcdmcrInfoUpdate(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterAcdmcrInfoUpdate", (Object) map);
    }

    public void mypCpaPassRegisterAcdmcrDelete(Map<String, Object> map) throws Exception {
        update("MypPassDAO.mypCpaPassRegisterAcdmcrDelete", (Object) map);
    }

    public void cpaPassClosedClSave(Map<String, Object> map) throws Exception {
        update("MypPassDAO.cpaPassClosedClSave",map);
    }

    public void cpaMemberCpaHistInsert(Map<String, Object> map) throws Exception {
        insert("MypPassDAO.cpaMemberCpaHistInsert", (Object) map);
    }
}
