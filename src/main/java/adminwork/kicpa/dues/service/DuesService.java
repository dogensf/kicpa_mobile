package adminwork.kicpa.dues.service;

import java.util.List;
import java.util.Map;

public interface  DuesService {

	public long selectDuesPayNo() throws Exception;
		
	public List<Dues> selectTempDuesList(DuesVO vo) throws Exception;
	
	public Dues selectDues(DuesVO vo) throws Exception;
	
	public void deleteTempDues(DuesVO vo) throws Exception;	
	
	public Map<String, Object>  selectDuesList(DuesVO vo) throws Exception;
	
	public String selectEtcTypeCode(DuesVO vo) throws Exception;	
	
	public String registerTempGiro(GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception;
	
	public List<GiroNtic> registerGiro(GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception;
	
	
	
	public List<NewDues> checkDuesNewList(List<NewDues> volist) throws Exception;
	
	public List<NewDues> selectDuesNewSearch(NewDues vo) throws Exception;
	
    // 신규납부 입금 저장
    public NewDues saveNewDuesPay(NewDues newDues) throws Exception;
    
    // 입회비 / 지로  정보 생성
    //public String saveNewDuesPays(List<NewDues> newDuesList,GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception;
    public Dues saveNewDuesPays(List<NewDues> newDuesList,GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception;
	
	public Dues selectDuesResultInfo(DuesVO vo) throws Exception;
	
	public List<Dues> selectDuesResultListAll(DuesVO vo) throws Exception;
	
	public List<Dues> selectDuesResultList(DuesVO vo) throws Exception;
	
	
	public int updateGiroNtic(Dues vo) throws Exception;
	
	public int updateGiroNticCallback(DuesVO vo) throws Exception;
	public int updateGiroNticCallbackCancel(DuesVO vo) throws Exception;
	
	
	public void updatePostSendYn(DuesVO vo) throws Exception;
	
	
	public void insertDuesRef(DuesRefVO vo) throws Exception;
	
	public void updateDuesRef(DuesRefVO vo) throws Exception;
	
	public void deleteDuesRef(DuesRefVO vo) throws Exception;	
	
	public DuesRef selectDuesRefInfo(DuesRefVO vo) throws Exception;
	
	public Map<String, Object> selectDuesRefList(DuesRefVO vo) throws Exception;
	
	
	public void insertGiroApiLog(GiroApiLog giroApiLog) throws Exception;

	public void updateSingleGiroMasterSub(Dues vo) throws Exception;

	//선택한 회비 조회
	public String selectGiroRqestCdNm(Map<String, Object> map) throws Exception;

	//추가회비 프로시저
	public List<?> callGiroInterestProc(Map<String, Object> map) throws Exception;
}
