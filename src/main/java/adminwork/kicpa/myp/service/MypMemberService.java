package adminwork.kicpa.myp.service;

import egovframework.rte.psl.dataaccess.util.EgovMap;

import java.util.List;
import java.util.Map;

public interface MypMemberService {

    //등록취소후 재등록하는경우 기존 회원정보 확인(실제테이블)
    public List<?> selectCpaCanclInfoList(Map<String, Object> map) throws Exception;

    //회원등록 승인 안된 정보 조회(임시 테이블)
    public String selectMypCpaMemberRegisterRegFlagInfo(Map<String, Object> map) throws Exception;

    //반려후 재등록 하는 경우 반려한정보에서 회비 납부 번호 가져오기(임시 테이블)
    public String selectMypCpaMemberRegisterSbscrbMypSnInfo(Map<String, Object> map) throws Exception;

    //가입 감사인 검색(팝업)
    public List<EgovMap> selectCpaAuditPopupSearchList(Map<String, Object> map) throws Exception;

    //약관동의 저장(임시 테이블)
    public int mypCpaMemberRegisterAgreeInfoSave(Map<String, Object> map) throws Exception;

    //부조회원 구분 & 사업자등록번호 저장(임시 테이블)
    public void mypCpaMemberRegisterAidMberInfoSave(Map<String, Object> map) throws Exception;

    //회원등록구분 저장(임시 테이블)
    public void mypCpaMemberRegisterCpaCareerInfoSave(Map<String, Object> map) throws Exception;

    //정보공개설정 저장(임시 테이블)
    public void mypCpaMemberRegisterNmstOthbcInfoSave(Map<String, Object> map) throws Exception;

    //첨부파일 (첨부서류) 저장(임시 테이블)
    public void mypCpaMemberRegisterAtchFileIdSave(Map<String, Object> map) throws Exception;

    //반려상태 첨부파일 (첨부서류) 저장(임시 테이블)
    public void mypCpaMemberRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception;

    //사이버연수 (실제 테이블)
    public List<?> selectCpaMemberRegistTrnngSmInfoList(Map<String, Object> map) throws Exception;

    //사이버연수 시행연도(실제 테이블)
    public List<?> selectCpaMemberRegistTrnngSmYearList(Map<String, Object> map) throws Exception;

    //정보공개설정 조회(실제 테이블)
    public List<?> selectCpaMemberRegNmstOthbcInfoList(Map<String, Object> map) throws Exception;

    //정보공개설정 저장(실 테이블)
    public void mypCpaMemberRegisterNmstOthbcInfoUpdate(Map<String, Object> map) throws Exception;

    //납부한 등록회비 조회(실 테이블)
    public List<?> selectCpaMemberRegistSbscrbMasterInfoList(Map<String, Object> map) throws Exception;

    //납부완료 내용 임시테이블에 저장(임시 테이블)
    public void cpaMemberRegistSbscrbMasterFlagSave(Map<String, Object> map) throws Exception;

    //정보공개설정 조회(임시테이블)
    public List<?> selectCpaMemberRegistNmstOthbcInfoList(Map<String, Object> map) throws Exception;

    //납부한 등록회비 정보(실 테이블)
    public List<?> selectCpaMemberRegAidDuesInfoList(Map<String, Object> map) throws Exception;

    //등록비 납부 조회
    public List<?> selectCpaMemberSbscrbMasterInfoList(Map<String, Object> map) throws Exception;

    //제출flag 저장(임시 테이블)
    public void mypCpaMemberRegisterRegFlagSave(Map<String, Object> map) throws Exception;
}
