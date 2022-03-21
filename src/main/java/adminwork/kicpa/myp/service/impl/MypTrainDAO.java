package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypTrainDAO")
public class MypTrainDAO extends EgovComAbstractDAO2 {


    public void mypCpaTrainRegisterPictInfoSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterPictInfoSave", (Object) map);
    }

    public void mypCpaTrainRegisterFlagFPictInfoSave(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.mypCpaTrainRegisterFlagFPictInfoSave", (Object) map);
    }

    public void updateCpaPassMemPict(Map<String, Object> map) throws Exception {
        update("MypTrainDAO.updateCpaPassMemPict", (Object) map);
    }

    public void insertCpaPassMemPict(Map<String, Object> map) throws Exception {
        insert("MypTrainDAO.insertCpaPassMemPict", (Object) map);
    }
}
