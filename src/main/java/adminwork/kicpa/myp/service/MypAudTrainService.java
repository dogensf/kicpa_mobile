package adminwork.kicpa.myp.service;

import java.util.List;
import java.util.Map;

public interface MypAudTrainService {

    //외감실무수습 승인 안된 정보 조회(임시 테이블)
    public String selectMypCpaAudTrainRegisterRegFlagInfo(Map<String, Object> map) throws Exception;

    //외감실무수습 서약서 저장(임시 테이블)
    public int mypCpaAudTrainRegisterAgreeSave(Map<String, Object> map) throws Exception;

    //이력정보(외감) 저장(임시 테이블)
    public void mypCpaAudTrainRegisterApntcCpaHistInfoSave(Map<String, Object> map) throws Exception;

    //첨부파일 (첨부서류) 저장(임시 테이블)
    public void mypCpaAudTrainRegisterAtchFileIdSave(Map<String, Object> map) throws Exception;

    //반려상태 첨부파일 (첨부서류) 저장(임시 테이블)
    public void mypCpaAudTrainRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception;

    //제출flag 저장(임시 테이블)
    public void mypCpaAudTrainRegisterRegFlagSave(Map<String, Object> map) throws Exception;
}
