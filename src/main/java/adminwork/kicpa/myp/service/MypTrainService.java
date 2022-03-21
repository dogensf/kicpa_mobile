package adminwork.kicpa.myp.service;

import java.util.List;
import java.util.Map;

public interface MypTrainService {

    //사진 저장(임시 테이블)
    public void mypCpaTrainRegisterPictInfoSave(Map<String, Object> map) throws Exception;

    //반려상태 사진 저장(임시 테이블)
    public void mypCpaTrainRegisterFlagFPictInfoSave(Map<String, Object> map) throws Exception;

    //사진 수정(실제 테이블)(기존사진 lastYn -> 'Y' 변경)
    public void updateCpaPassMemPict(Map<String, Object> map) throws Exception;

    //신규사진 저장(실제 테이블)
    public void insertCpaPassMemPict(Map<String, Object> map) throws Exception;

}
