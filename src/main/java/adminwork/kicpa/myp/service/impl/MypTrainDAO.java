package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypTrainDAO")
public class MypTrainDAO extends EgovComAbstractDAO2 {


    public List<EgovMap> selectAuditPopupSearchList(Map<String, Object> map) throws Exception {
        return (List<EgovMap>) list("MypTrainDAO.selectAuditPopupSearchList", (Object) map);
    }

    public String selectMypCpaTrainRegisterRegFlagInfo(Map<String, Object> map) throws Exception {
        return (String) select("MypTrainDAO.selectMypCpaTrainRegisterRegFlagInfo", (Object) map);
    }

    public List<?> selectCpaTrainRegistMemPictInfo(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypTrainDAO.selectCpaTrainRegistMemPictInfo", (Object) map);
    }

    public Long mypCpaTrainRegisterAgreeSave(Map<String, Object> map) throws Exception {
        return (Long)insert("MypTrainDAO.mypCpaTrainRegisterAgreeSave", (Object) map);
    }

    public void mypCpaTrainRegisterPictInfoSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterPictInfoSave", (Object) map);
    }

    public void mypCpaTrainRegisterFlagFPictInfoSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterFlagFPictInfoSave", (Object) map);
    }

    public void mypCpaTrainRegisterGrdtSatausInfoSave(Map<String, Object> map) throws Exception {
        insert("MypTrainDAO.mypCpaTrainRegisterGrdtSatausInfoSave", (Object) map);
    }

    public void mypCpaTrainRegisterApntcCpaHistInfoSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterApntcCpaHistInfoSave", (Object) map);
    }

    public void mypCpaTrainRegisterAtchFileIdSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterAtchFileIdSave", (Object) map);
    }

    public void mypCpaTrainRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterFlagFAtchFileSave", (Object) map);
    }

    public void mypCpaTrainRegisterRegFlagSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterRegFlagSave", (Object) map);
    }

    public int selectApntcCpaHistGuideCpaCehck(Map<String, Object> map) throws Exception {
        return (int) select("MypTrainDAO.selectApntcCpaHistGuideCpaCehck", (Object) map);
    }

    public void updateCpaPassMemPict(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.updateCpaPassMemPict", (Object) map);
    }

    public void insertCpaPassMemPict(Map<String, Object> map) throws Exception {
        insert("MypTrainDAO.insertCpaPassMemPict", (Object) map);
    }

    public List<?> selectCpaPassRegistMberPhotoInfo(Map<String, Object> map) throws Exception {
        return (List<?>) list("MypTrainDAO.selectCpaPassRegistMberPhotoInfo", (Object) map);
    }
}
