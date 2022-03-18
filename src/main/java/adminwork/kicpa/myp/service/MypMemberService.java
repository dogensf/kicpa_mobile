package adminwork.kicpa.myp.service;

import java.util.List;
import java.util.Map;

public interface MypMemberService {

    //정보공개설정 저장(임시 테이블)
    public void mypCpaMemberRegisterNmstOthbcInfoSave(Map<String, Object> map) throws Exception;

    //사이버연수 (실제 테이블)
    public List<?> selectCpaMemberRegistTrnngSmInfoList(Map<String, Object> map) throws Exception;

    //사이버연수 시행연도(실제 테이블)
    public List<?> selectCpaMemberRegistTrnngSmYearList(Map<String, Object> map) throws Exception;

    //정보공개설정 조회(실제 테이블)
    public List<?> selectCpaMemberRegNmstOthbcInfoList(Map<String, Object> map) throws Exception;

    //정보공개설정 저장(실 테이블)
    public void mypCpaMemberRegisterNmstOthbcInfoUpdate(Map<String, Object> map) throws Exception;
}
