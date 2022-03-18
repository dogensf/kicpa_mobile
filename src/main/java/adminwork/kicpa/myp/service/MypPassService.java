package adminwork.kicpa.myp.service;

import java.util.List;
import java.util.Map;

public interface MypPassService {

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
