package adminwork.kicpa.myp.service.impl;


import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("MypMemberDAO")
public class MypMemberDAO extends EgovAbstractDAO{


    public void mypCpaMemberRegisterNmstOthbcInfoSave(Map<String, Object> map) throws Exception {
        insert("MypMemberDAO.mypCpaMemberRegisterNmstOthbcInfoSave", (Object) map);
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
}
