package adminwork.kicpa.dues.service;

import java.util.List;

public interface DeusApiService {
	
    // 지로토큰 조회 및 생성
    public String createGiroApiToken() throws Exception;
	
    // 지로고지링크생성
    public Dues createNoticeGiroLink(Dues vo) throws Exception;
    
    // 지로납부결과 실시간 조회
    public boolean giroPayments(DuesVO vo) throws Exception;
    
    
    /**
     * 지로 생성 취소 
     * @param vo
     * @return
     * @throws Exception
     */
    public boolean cancelNoticeGiro(List<Dues> vo) throws Exception;
    
    /**
     * 지로 생성
     * @param vo
     * @return
     * @throws Exception
     */
    
    public boolean createNoticeGiro(List<Dues> vo) throws Exception;
    
    
    

}
