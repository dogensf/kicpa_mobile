package adminwork.kicpa.sntBook.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("sntBookKipAdmDAO")
public class SntBookKipAdmDAO extends EgovComAbstractDAO2{


	public EgovMap procErpSlipInsertProc(Map<String,Object> map) throws Exception {
		return (EgovMap) select("SntBookKipadmDAO.procErpSlipInsertProc",map);
	}

	public void webSbmnumProc(Map<String,Object> map) throws Exception {
		update("SntBookKipadmDAO.webSbmnumProc",map);
	}
	public void webSbmnum2Proc(Map<String,Object> map) throws Exception {
		update("SntBookKipadmDAO.webSbmnum2Proc",map);
	}
	public void eapQueryMain07Proc(Map<String,Object> map) throws Exception {
		select("SntBookKipadmDAO.eapQueryMain07Proc",map);
	}
	public void intOrdBookEachProc(Map<String,Object> map) throws Exception {
		update("SntBookKipadmDAO.intOrdBookEachProc",map);
	}



	public int insertTaxBill(Map<String,Object> map) throws Exception {
		return update("SntBookKipadmDAO.insertTaxBill",map);
	}
	public int insertTaxBillItem(Map<String,Object> map) throws Exception {
		return update("SntBookKipadmDAO.insertTaxBillItem",map);
	}
	public String selectTaxbillSeq(Map<String,Object> map) throws Exception {
		return (String) select("SntBookKipadmDAO.selectTaxbillSeq",map);
	}
	public EgovMap selectTaxDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("SntBookKipadmDAO.selectTaxDetail",map);
	}
}
