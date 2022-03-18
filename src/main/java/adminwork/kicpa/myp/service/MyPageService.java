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

    //회원정보 (실제 테이블)
    public List<?> selectCpaMemberRegistInfoList(Map<String, Object> map) throws Exception;

    //세무사 세무대리 정보 (실제 테이블)
    public List<?> selectCpaTaxAcutInfoList(Map<String, Object> map) throws Exception;

    //DI 값 확인
    public List<?> selectCpaPassDiCheckList(Map<String, Object> map) throws Exception;
}
