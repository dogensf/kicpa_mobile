package adminwork.kicpa.myp.service;

import java.util.List;
import java.util.Map;

public interface MypPassService {

    //약관동의 저장(임시 테이블)
    public void mypCpaPassRegisterAgreeSave(Map<String, Object> map) throws Exception;

    //합격자기본정보 저장(임시 테이블)
    public void mypCpaPassRegisterPassInfoSave(Map<String, Object> map) throws Exception;

    //자택&직장주소 저장(임시 테이블)
    public void mypCpaPassRegisterAdressInfoSave(Map<String, Object> map) throws Exception;

    //연락처 저장(임시 테이블)
    public void mypCpaPassRegisterContactInfoSave(Map<String, Object> map) throws Exception;

    //학력사항 삭제(임시 테이블)
    public void mypCpaPassRegisterAcdmcrInfoDelete(Map<String, Object> map) throws Exception;

    //학력사항 저장(임시 테이블)
    public void mypCpaPassRegisterAcdmcrInfoSave(Map<String, Object> map) throws Exception;

    //합격자정보 조회(임시 테이블)
    public List<?> selectCpaPassRegistReviewInfoList(Map<String, Object> map) throws Exception;

    //학력 조회(임시 테이블)
    public List<?> selectCpaPassRegistReviewAcdmcrInfoList(Map<String, Object> map) throws Exception;

    //제출 flag 저장(임시 테이블)
    public void mypCpaPassRegisterRegFlagSave(Map<String, Object> map) throws Exception;



    //합격자 합격정보 조회(실 테이블)
    public List<?> selectMypCpaPsexamInfo(Map<String, Object> map) throws Exception;

    //합격자기본정보 & 연락처 저장(실 테이블)
    public void cpaPassRegistPassInfoSave(Map<String, Object> map) throws Exception;

    //주소저장 (실 테이블)
    public void cpaPassRegistAdressInfoSave(Map<String, Object> map) throws Exception;

    //직장정보저장 (실 테이블)
    public void cpaPassRegistOficeInfoSave(Map<String, Object> map) throws Exception;

    //이력서저장 (실 테이블)
    public void cpaPassRegistRsumInfoSave(Map<String, Object> map) throws Exception;

    //학력사항저장 (실 테이블)
    public void cpaPassRegistAcdmcrInfoSave(Map<String, Object> map) throws Exception;

    //수정모드 실테이블 저장
    //합격자기본정보 저장
    public void mypCpaPassRegisterPassInfoUpdate(Map<String, Object> map) throws Exception;

    //자택&직장주소 저장
    public void mypCpaPassRegisterAdressInfoUpdate(Map<String, Object> map) throws Exception;

    //직장정보 저장
    public void mypCpaPassRegisterOficeInfoUpdate(Map<String, Object> map) throws Exception;

    //우편물수령지 저장
    public void mypCpaPassRegisterPostSndngYnUpdate(Map<String, Object> map) throws Exception;

    //연락처 저장
    public void mypCpaPassRegisterContactInfoUpdate(Map<String, Object> map) throws Exception;

    //학력 저장
    public void mypCpaPassRegisterAcdmcrInfoUpdate(Map<String, Object> map) throws Exception;

    //학력 삭제
    public void mypCpaPassRegisterAcdmcrDelete(Map<String, Object> map) throws Exception;
}
