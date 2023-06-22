package adminwork.kicpa.myp.service;

import java.util.List;
import java.util.Map;

public interface MyPageService {

    //합격자 정보 (실제 테이블)
    public List<?> selectCpaPassInfoList(Map<String, Object> map) throws Exception;

    //주소 (실제 테이블)
    public List<?> selectCpaPassRegistAeresInfoList(Map<String, Object> map) throws Exception;

    //직장 정보 (실제 테이블)
    public List<?> selectCpaPassRegistOfcInfoList(Map<String, Object> map) throws Exception;

    //합격자 학력 (실제 테이블)
    public List<?> selectCpaPassRegistAcdmcrInfoList(Map<String, Object> map) throws Exception;

    //회원 사진 (실제 테이블)
    public List<?> selectCpaMberPhotoInfoList(Map<String, Object> map) throws Exception;

    //수습이력정보 (실제 테이블)
    public List<?> selectCpaTrainRegistInfoList(Map<String, Object> map) throws Exception;

    //수습 상황보고서 (실제 테이블)
    public List<?> selectCpaTrainApntcBrfInfoList(Map<String, Object> map) throws Exception;

    //수습 연수결과 (실제 테이블)
    public List<?> selectCpaTrainTrnngResultInfoList(Map<String, Object> map) throws Exception;

    //회원정보 (실제 테이블)
    public List<?> selectCpaMemberRegistInfoList(Map<String, Object> map) throws Exception;

    //세무사 세무대리 정보 (실제 테이블)
    public List<?> selectCpaTaxAcutInfoList(Map<String, Object> map) throws Exception;


    //기본실무수습정보 (임시테이블)
    public List<?> selectCpaTrainRegistReviewInfoList(Map<String, Object> map) throws Exception;

    //외감실무수습정보 (임시테이블)
    public List<?> selectCpaAudTrainRegistReviewInfoList(Map<String, Object> map) throws Exception;

    //회원정보 (임시테이블)
    public List<?> selectCpaMemberRegistReviewInfoList(Map<String, Object> map) throws Exception;

    //DI 값 확인
    public List<?> selectCpaPassDiCheckList(Map<String, Object> map) throws Exception;



    //메일 발송 대상 조회
    public List<?> selectSendMemList(Map<String, Object> map) throws Exception;

    //메일 발송 프로시저
    public void eapQueryMain09Proc(Map<String, Object> map) throws Exception;
}
