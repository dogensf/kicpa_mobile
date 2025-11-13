package adminwork.kicpa.dues.service.impl;

import java.sql.Types;
import java.util.*;

import adminwork.kicpa.dues.service.*;
import egovframework.rte.fdl.cmmn.exception.EgovBizException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;

import javax.annotation.Resource;

@Repository("DuesDAO")
public class DuesDAO extends EgovComAbstractDAO2{

    @Resource(name="jdbcTemplateKipadm")
    private JdbcTemplate jdbcTemplate;
	
    // 납부번호 발생조회
    public Long selectDuesPayNo() throws Exception {
        return (Long)select("DuesDAO.selectDuesPayNo");
    }
	
	public void insertGiroApiLog(GiroApiLog giroApiLog) throws Exception {
	        insert("DuesDAO.insertGiroApiLog",giroApiLog);
	}
	
    public void insertGiroApiLogAll(List<GiroApiLog> giroApiLogs) throws Exception {
        ArrayList<GiroApiLog> giroApiLogList = new ArrayList<>();

        for (GiroApiLog giroApiLog : giroApiLogs) {
            giroApiLogList.add(giroApiLog);
            if(giroApiLogList.size() >= 100) {
                insert("DuesDAO.insertGiroApiLogAll",giroApiLogList);
                giroApiLogList.clear();
            }
        }

        if(giroApiLogList.size() > 0) {
            insert("DuesDAO.insertGiroApiLogAll",giroApiLogList);
        }
    }
	
	public GiroApi selectGiroApi() throws Exception {
        return (GiroApi) select("DuesDAO.selectGiroApi");
    }
	
    public int updateGiroApi(GiroApi giroApi) throws Exception {
        return update("DuesDAO.updateGiroApi",giroApi);
    }
        
    public void insertGiroNtic(DuesVO vo) throws Exception {

        update("DuesDAO.updateGiroNticCanCl" , vo);

        insert("DuesDAO.insertGiroNtic",vo);
    }
    
    public int updateGiroNtic(Dues vo) throws Exception {
        return update("DuesDAO.updateGiroNtic" , vo);
    }
    
    public int updateGiroMasterCallback(DuesVO vo) throws Exception {
        return update("DuesDAO.updateGiroMasterCallback" , vo);
    }
    
    public int updateGiroNticSubCallback(DuesVO vo) throws Exception {
        return update("DuesDAO.updateGiroNticSubCallback" , vo);
    }
    
    public int updateGiroNticCallback(DuesVO vo) throws Exception {
        return update("DuesDAO.updateGiroNticCallback" , vo);
    }
    
    public int updateGiroNticCallbackCancel(DuesVO vo) throws Exception {
        return update("DuesDAO.updateGiroNticCallbackCancel" , vo);
    }
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectTempDuesList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectTempDuesList", vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectNewDuesList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectNewDuesList", vo);
	}
	
	public Dues selectDues(DuesVO vo) throws Exception{
		return (Dues) select("DuesDAO.selectDues",vo);
	}	
	
	public Dues selectGiroCode(DuesVO vo) throws Exception{
		return (Dues) select("DuesDAO.selectGiroCode",vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectNewDuesInfos(Dues vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectNewDuesInfos",vo);
	}
	
	public void setNewDuesInfos(Dues vo) throws Exception{
		update("DuesDAO.setNewDuesInfos",vo);
	}	
	
	public void transferNewDues(Dues vo) throws Exception{
		insert("DuesDAO.transferNewDues",vo);
	}
	
	public void deleteTempDues(DuesVO vo) throws Exception{
		//delete("DuesDAO.deleteGiroMaster",vo);
		update("DuesDAO.deleteGiroNtic",vo);
	}	
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesMasterList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectDuesMasterList", vo);
	}

	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesDetailList(DuesVO vo) throws Exception{		
		return (List<Dues>) list("DuesDAO.selectDuesDetailList", vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesBillList(List<Dues> vos) throws Exception{
		
		ArrayList<Dues> rts = new ArrayList<>();
		for(Dues rt : vos) {
			rts.add(rt);
		}		
		
		return (List<Dues>) list("DuesDAO.selectDuesBillList", rts);
	}
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesBillSum(List<Dues> vos) throws Exception{
		
		ArrayList<Dues> rts = new ArrayList<>();
		for(Dues rt : vos) {
			rts.add(rt);
		}		
		
		return (List<Dues>) list("DuesDAO.selectDuesBillSum", rts);
	}

	
	public String selectEtcTypeCode(DuesVO vo) throws Exception{
		return (String) select("DuesDAO.selectEtcTypeCode",vo); 
	}
	
	
	public void insertGiroBass(HashMap vo) throws Exception {
        insert("DuesDAO.insertGiroBass",vo);
    }
	
    public List<String> selectGiroCd(int size) throws Exception{
        return (List<String>) list("DuesDAO.selectGiroCd", size);
    }
    
    public void insertGiroAll(Long giroJobCd,List<String>  giroCdList,List<GiroVO> giroVOList) throws Exception {
        int count = 0;
        int detailCount = 0;
        int seq = 0;

        List<GiroVO> insGiroList = new ArrayList<GiroVO>();
        List<GiroDetail> insGiroDetailList = new ArrayList<GiroDetail>();
        for (GiroVO giroVO : giroVOList) {
        	
        	
        	
            String giroCd = giroCdList.get(seq);

            giroVO.setGiroJobCd(giroJobCd);
            giroVO.setGiroCd(giroCd);

            insGiroList.add(giroVO);

            List<GiroDetail> giroDetails = giroVO.getDetailList();
            giroDetails.stream().forEach(g -> g.setGiroCd(giroCd));
            insGiroDetailList.addAll(giroDetails);

            seq++;

            if(insGiroList.size() >= 100) {
                insert("DuesDAO.insertGiroAll" , insGiroList);
                insGiroList.clear();
            }

            if(insGiroDetailList.size() >= 100) {
                insert("DuesDAO.insertGiroDetailAll" , insGiroDetailList);
                insGiroDetailList.clear();
            }
            
            String[] giroCds = giroVO.getSubGiroCd().split(",");
            if(giroCds.length > 1) {
            	for(String cd : giroCds) {
            		Dues vo = new Dues();
            		vo.setGiro_cd(cd);
            		vo.setSup_giro_cd(giroCd);
            		//2022-04-03 합산 지로시 MASTER sup_giro_cd 를 결제휴 callback 에서 처리하도록 함.
            		//update("DuesDAO.updateGiroMasterSup",vo);
            	}
            }
            
        }

        if(insGiroList.size() > 0) {
            insert("DuesDAO.insertGiroAll" , insGiroList);
        }

        if(insGiroDetailList.size() > 0) {
            insert("DuesDAO.insertGiroDetailAll" , insGiroDetailList);
        }

    }
    
    public void insertGiroDetail( List<GiroDetail> vo)throws Exception {
    	insert("DuesDAO.insertGiroDetailAll" , vo);
    }
    
    public void insertGiroNticList(List<GiroNtic> giroNtics) throws Exception {

        List<GiroNtic> giroNticList = new ArrayList<GiroNtic>();
        for (GiroNtic giroNtic : giroNtics) {
            giroNticList.add(giroNtic);

            if(giroNticList.size() >= 100) {
                update("DuesDAO.updateGiroNticCanClAll" , giroNticList);
                giroNticList.clear();
            }
        }

        if(giroNticList.size() > 0) {
            update("DuesDAO.updateGiroNticCanClAll" , giroNticList);
            giroNticList.clear();
        }

        for (GiroNtic giroNtic : giroNtics) {
            giroNticList.add(giroNtic);

            if(giroNticList.size() >= 100) {
                insert("DuesDAO.insertGiroNticAll",giroNticList);
                giroNticList.clear();
            }
        }

        if(giroNticList.size() > 0) {
            insert("DuesDAO.insertGiroNticAll",giroNticList);
            giroNticList.clear();
        }

    }
    
    
    public NewDues checkDuesNewInfo(NewDues vo) throws Exception{
		return (NewDues) select("DuesDAO.checkDuesNewInfo",vo);
	}	
    
    @SuppressWarnings("unchecked")
	public List<NewDues> selectDuesNewSearch(NewDues vo) throws Exception{
		return (List<NewDues>) list("DuesDAO.checkDuesNewInfo", vo);
	}
 
    public NewDues insertNewDuesTemp(NewDues newDues) throws Exception {
        insert("DuesDAO.insertNewDuesTemp",newDues);
        return newDues;
    }
    
    public NewDues insertNewDues(NewDues newDues) throws Exception {
        insert("DuesDAO.insertNewDues",newDues);
        return newDues;
    }
    
    
    
    
        
	public Dues selectDuesResultInfo(DuesVO vo) throws Exception{
		return (Dues) select("DuesDAO.selectDuesResultInfo",vo);
	}	

	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesResultListAll(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectDuesResultListAll", vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesResultList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectDuesResultList", vo);
	}
	
	public void updatePostSendYn(DuesVO vo) throws Exception{
		update("DuesDAO.updatePostSendYn",vo);
	}
	
	public void insertDuesRef(DuesRefVO vo) throws Exception{
		insert("DuesDAO.insertDuesRef",vo);
	}
	
	public void updateDuesRef(DuesRefVO vo) throws Exception{
		insert("DuesDAO.updateDuesRef",vo);
	}
	
	public void deleteDuesRef(DuesRefVO vo) throws Exception{
		delete("DuesDAO.deleteDuesRef",vo);
	}
	
	public DuesRef selectDuesRefInfo(DuesRefVO vo) throws Exception{
		return (DuesRef)select("DuesDAO.selectDuesRefInfo", vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<DuesRef> selectDuesRefList(DuesRefVO vo) throws Exception{
		return (List<DuesRef>) list("DuesDAO.selectDuesRefList", vo);
	}
	
	public int selectDuesRefListCnt(DuesRefVO vo) throws Exception{
		return (Integer)select("DuesDAO.selectDuesRefListCnt", vo);
	}


    public void updateSingleGiroMasterSub(Dues vo) throws Exception{
        update("DuesDAO.updateSingleGiroMasterSub",vo);
    }

    public String selectGiroRqestCdNm(Map<String, Object> map) throws Exception {
        return (String) select("DuesDAO.selectGiroRqestCdNm", (Object) map);
    }

    public List<?> callGiroInterestProc(Map<String, Object> map) throws Exception {
        return (List<?>) list("DuesDAO.callGiroInterestProc", (Object) map);
    }

    public String canPayDuesNew(String pin) {
        final HashMap<String, Object> paramMap = new HashMap<>();

        paramMap.put("v_pin", pin);

        final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("KIPADM")
                .withProcedureName("SBSCRB_03_PROC")
                .withoutProcedureColumnMetaDataAccess()
                .declareParameters(
                        new SqlParameter("v_pin", Types.VARCHAR),
                        new SqlOutParameter("v_result", Types.INTEGER),
                        new SqlOutParameter("v_sqlerrm", Types.VARCHAR)
                );

        Map<String, Object> resultMap = simpleJdbcCall.execute(paramMap);

        return Objects.isNull(resultMap.get("v_result")) ? "" : String.valueOf(resultMap.get("v_result"));
    }

    public Map<String, Object> getDuesNewList(String pin) {
        final HashMap<String, Object> paramMap = new HashMap<>();

        paramMap.put("v_pin", pin);

        final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("KIPADM")
                .withProcedureName("SBSCRB_02_PROC")
                .withoutProcedureColumnMetaDataAccess()
                .useInParameterNames("v_pin")
                .declareParameters(
                        new SqlParameter("v_pin", Types.VARCHAR),
                        new SqlOutParameter("r_cursor", Types.REF_CURSOR, new BeanPropertyRowMapper<NewDuesDetail>(NewDuesDetail.class)),
                        new SqlOutParameter("v_pay_status", Types.VARCHAR),
                        new SqlOutParameter("v_result", Types.INTEGER),
                        new SqlOutParameter("v_sqlerrm", Types.VARCHAR)
                );

        Map<String, Object> resultMap = simpleJdbcCall.execute(paramMap);

        String resultCode = Objects.isNull(resultMap.get("v_result")) ? "" : String.valueOf(resultMap.get("v_result"));
        if(!"1".equals(resultCode)) {
            resultMap.put("r_cursor", Collections.emptyList());
            return resultMap;
        }

        return resultMap;
    }

    public NewDuesDto callDuesNewParameter(String pin) throws EgovBizException {
        final HashMap<String, Object> paramMap = new HashMap<>();

        paramMap.put("v_pin", pin);

        final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("KIPADM")
                .withProcedureName("SBSCRB_07_PROC")
                .withoutProcedureColumnMetaDataAccess()
                .useInParameterNames("v_pin")
                .declareParameters(
                        new SqlParameter("v_pin", Types.VARCHAR),
                        new SqlOutParameter("v_mber_flag", Types.VARCHAR),
                        new SqlOutParameter("v_audit_cd", Types.VARCHAR),
                        new SqlOutParameter("v_audit_nm", Types.VARCHAR),
                        new SqlOutParameter("v_reg_de", Types.VARCHAR),
                        new SqlOutParameter("v_result", Types.INTEGER),
                        new SqlOutParameter("v_sqlerrm", Types.VARCHAR)
                );

        Map<String, Object> resultMap = simpleJdbcCall.execute(paramMap);
        String resultCode = Objects.isNull(resultMap.get("v_result")) ? "" : String.valueOf(resultMap.get("v_result"));

        if(!"1".equals(resultCode)) {
            throw new EgovBizException(resultMap.get("v_result_text").toString());
        }


        String mber_flag = Objects.isNull(resultMap.get("v_mber_flag")) ? "" : String.valueOf(resultMap.get("v_mber_flag"));
        String audit_cd = Objects.isNull(resultMap.get("v_audit_cd")) ? "" : String.valueOf(resultMap.get("v_audit_cd"));
        String audit_nm = Objects.isNull(resultMap.get("v_audit_nm")) ? "" : String.valueOf(resultMap.get("v_audit_nm"));
        String reg_de = Objects.isNull(resultMap.get("v_reg_de")) ? "" : String.valueOf(resultMap.get("v_reg_de"));


        return new NewDuesDto(pin, mber_flag, audit_cd, audit_nm, reg_de);
    }
}
