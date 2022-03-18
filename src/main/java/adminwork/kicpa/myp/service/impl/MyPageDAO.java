package adminwork.kicpa.myp.service.impl;


import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MyPageDAO")
public class MyPageDAO extends EgovAbstractDAO{

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

    public List<?> selectCpaMemberRegistInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaMemberRegistInfoList", (Object) map);
    }

    public List<?> selectCpaTaxAcutInfoList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaTaxAcutInfoList", (Object) map);
    }

    public List<?> selectCpaPassDiCheckList(Map<String, Object> map) throws Exception {
        return (List<?>) list("MyPageDAO.selectCpaPassDiCheckList", (Object) map);
    }

}
