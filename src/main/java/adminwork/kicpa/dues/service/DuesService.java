package adminwork.kicpa.dues.service;

import java.util.List;
import java.util.Map;

public interface  DuesService {

		
	public List<Dues> selectTempDuesList(DuesVO vo) throws Exception;
	
	public Dues selectDues(DuesVO vo) throws Exception;
	
	public void deleteTempDues(DuesVO vo) throws Exception;	
	
	public Map<String, Object>  selectDuesList(DuesVO vo) throws Exception;
	
	public String selectEtcTypeCode(DuesVO vo) throws Exception;	
	
	public String registerTempGiro(GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception;
	
	public List<GiroNtic> registerGiro(GiroRegVO giroRegVO,List<GiroNtic> giroNtics , List<GiroVO> giroVOList) throws Exception;
	
	
	
	public Dues selectDuesResultInfo(DuesVO vo) throws Exception;
	
	public List<Dues> selectDuesResultList(DuesVO vo) throws Exception;
	
}
