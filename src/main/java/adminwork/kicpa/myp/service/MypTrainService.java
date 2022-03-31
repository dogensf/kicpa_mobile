package adminwork.kicpa.myp.service;

import egovframework.rte.psl.dataaccess.util.EgovMap;

import java.util.List;
import java.util.Map;

public interface MypTrainService {

    //실무수습기관 검색(팝업)
    public List<EgovMap> selectAuditPopupSearchList(Map<String, Object> map) throws Exception;

    //실무수습 승인 안된 정보 조회(임시 테이블)
    public String selectMypCpaTrainRegisterRegFlagInfo(Map<String, Object> map) throws Exception;

    //회원 사진 조회(임시테이블)
    public List<?> selectCpaTrainRegistMemPictInfo(Map<String, Object> map) throws Exception;

    //실무수습 서약서 저장(임시 테이블)
    public Long mypCpaTrainRegisterAgreeSave(Map<String, Object> map) throws Exception;

    //사진 저장(임시 테이블)
    public void mypCpaTrainRegisterPictInfoSave(Map<String, Object> map) throws Exception;

    //반려상태 사진 저장(임시 테이블)
    public void mypCpaTrainRegisterFlagFPictInfoSave(Map<String, Object> map) throws Exception;

    //수습공인회계사 등록 재학여부 저장(임시 테이블)
    public void mypCpaTrainRegisterGrdtSatausInfoSave(Map<String, Object> map) throws Exception;

    //이력정보 저장(임시 테이블)
    public void mypCpaTrainRegisterApntcCpaHistInfoSave(Map<String, Object> map) throws Exception;

    //첨부파일 저장(임시 테이블)
    public void mypCpaTrainRegisterAtchFileIdSave(Map<String, Object> map) throws Exception;

    //반려상태 첨부파일 저장(임시 테이블)
    public void mypCpaTrainRegisterFlagFAtchFileSave(Map<String, Object> map) throws Exception;

    //제출flag 저장(임시 테이블)
    public void mypCpaTrainRegisterRegFlagSave(Map<String, Object> map) throws Exception;

    //입력한 지도공인회계사 정보가 있는지 확인(이력정보 저장 전)
    public int selectApntcCpaHistGuideCpaCehck(Map<String, Object> map) throws Exception;

    //사진 수정(실제 테이블)(기존사진 lastYn -> 'Y' 변경)
    public void updateCpaPassMemPict(Map<String, Object> map) throws Exception;

    //신규사진 저장(실제 테이블)
    public void insertCpaPassMemPict(Map<String, Object> map) throws Exception;

    //회원 사진 (실제 테이블)
    public List<?> selectCpaPassRegistMberPhotoInfo(Map<String, Object> map) throws Exception;

}
