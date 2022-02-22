package adminwork.kicpa.dues.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import adminwork.kicpa.dues.service.Dues;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.dues.service.GiroApi;
import adminwork.kicpa.dues.service.GiroApiLog;
import adminwork.kicpa.dues.service.GiroDetail;
import adminwork.kicpa.dues.service.GiroNtic;
import adminwork.kicpa.dues.service.GiroVO;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("DuesDAO")
public class DuesDAO extends EgovAbstractDAO{
	
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
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectTempDuesList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectTempDuesList", vo);
	}
	
	public Dues selectDues(DuesVO vo) throws Exception{
		return (Dues) select("DuesDAO.selectDues",vo);
	}	
	
	public void deleteTempDues(DuesVO vo) throws Exception{
		delete("DuesDAO.deleteGiroMaster",vo);
		delete("DuesDAO.deleteGiroNtic",vo);
	}	
	
	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesMasterList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectDuesMasterList", vo);
	}

	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesDetailList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectDuesDetailList", vo);
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
                insert("DuessDAO.insertGiroDetailAll" , insGiroDetailList);
                insGiroDetailList.clear();
            }
        }

        if(insGiroList.size() > 0) {
            insert("DuesDAO.insertGiroAll" , insGiroList);
        }

        if(insGiroDetailList.size() > 0) {
            insert("DuesDAO.insertGiroDetailAll" , insGiroDetailList);
        }

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
    
    
    
    
    
	public Dues selectDuesResultInfo(DuesVO vo) throws Exception{
		return (Dues) select("DuesDAO.selectDuesResultInfo",vo);
	}	
    
	@SuppressWarnings("unchecked")
	public List<Dues> selectDuesResultList(DuesVO vo) throws Exception{
		return (List<Dues>) list("DuesDAO.selectDuesResultList", vo);
	}

}
