package adminwork.com.cmm.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 이니시스 결제 서명 유틸리티
 */
public class SignatureUtil {
    
    /**
     * 타임스탬프 생성 (yyyyMMddHHmmss 형식)
     * @return 현재 시간의 타임스탬프
     */
    public static String getTimestamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(new Date());
    }
}
