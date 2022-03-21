package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypPassDAO")
public class MypPassDAO extends EgovComAbstractDAO2 {


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
}
