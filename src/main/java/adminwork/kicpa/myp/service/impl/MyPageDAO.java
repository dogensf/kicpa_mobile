package adminwork.kicpa.myp.service.impl;


import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MyPageDAO")
public class MyPageDAO extends EgovComAbstractDAO2 {

    public List<?> selectCpaPassInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaPassInfoList", (Object) map);
    }

    public List<?> selectCpaPassRegistAeresInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaPassRegistAeresInfoList", (Object) map);
    }

    public List<?> selectCpaPassRegistOfcInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaPassRegistOfcInfoList", (Object) map);
    }

    public List<?> selectCpaPassRegistAcdmcrInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaPassRegistAcdmcrInfoList", (Object) map);
    }

    public List<?> selectCpaMberPhotoInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaMberPhotoInfoList", (Object) map);
    }

    public List<?> selectCpaTrainRegistInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTrainRegistInfoList", (Object) map);
    }

    public List<?> selectCpaTrainApntcBrfInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTrainApntcBrfInfoList", (Object) map);
    }

    public List<?> selectCpaTrainTrnngResultInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTrainTrnngResultInfoList", (Object) map);
    }

    public List<?> selectCpaMemberRegistInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaMemberRegistInfoList", (Object) map);
    }

    public List<?> selectCpaTaxAcutInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTaxAcutInfoList", (Object) map);
    }

    public List<?> selectCpaTaxAcutInfoListVer2(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTaxAcutInfoListVer2", (Object) map);
    }


    public List<?> selectCpaTrainRegistReviewInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTrainRegistReviewInfoList", (Object) map);
    }

    public List<?> selectCpaAudTrainRegistReviewInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaAudTrainRegistReviewInfoList", (Object) map);
    }

    public List<?> selectCpaMemberRegistReviewInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaMemberRegistReviewInfoList", (Object) map);
    }

    public List<?> selectCpaPassDiCheckList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaPassDiCheckList", (Object) map);
    }




    public List<?> selectSendMemList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectSendMemList", (Object) map);
    }

    public void eapQueryMain09Proc(Map<String, Object> map) throws Exception {
        insert("MyPageDAO.eapQueryMain09Proc", (Object) map);
    }

    public String selectTaxVersion() throws Exception {
        return (String) select("MyPageDAO.selectTaxVersion");
    }



    public List<?> boardInfoSendMailProc(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.boardInfoSendMailProc",map);
    }

    public List<?> boardInfoSendAtfFlowerProc(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.boardInfoSendAtfFlowerProc",map);
    }
}
