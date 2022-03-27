package adminwork.kicpa.sntBook.service.impl;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.let.utl.fcc.service.DateUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("sntBookService")
public class SntBookServiceImpl extends EgovAbstractServiceImpl implements SntBookService{

	@Resource(name="sntBookDAO")
	private SntBookDAO sntBookDAO;

	@Resource(name="sntBookKipAdmDAO")
	private SntBookKipAdmDAO sntBookKipAdmDAO;

	@Override
	public List<EgovMap> selectBookList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookList(map);
	}

	@Override
	public int selectBookListCnt(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookListCnt(map);
	}

	@Override
	public List<EgovMap> selectBookFormatList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookFormatList(map);
	}

	@Override
	public int selectBookFormatListCnt(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookFormatListCnt(map);
	}

	@Override
	public EgovMap selectBookDetail(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookDetail(map);
	}

	@Override
	public void procedureEduMasterList(Map<String, Object> map) throws Exception {
		sntBookDAO.procedureEduMasterList(map);
	}

	@Override
	public EgovMap selectEduMasterListDetail(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectEduMasterListDetail(map);
	}

	@Override
	public List<EgovMap> selectOfflineEduList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectOfflineEduList(map);
	}

	@Override
	public EgovMap selectOfflineEduDetail(Map<String, Object> map) throws Exception {

		EgovMap detail  = null;

		try {
			detail = sntBookDAO.selectOfflineEduDetail(map);
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

		return detail;
	}

	@Override
	public List<EgovMap> selectOfflineEduAppList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectOfflineEduAppList(map);
	}

	@Override
	public void updateOfflineEduReadCnt(Map<String, Object> map) throws Exception {
		sntBookDAO.updateOfflineEduReadCnt(map);
	}

	@Override
	public List<EgovMap> selectCartInputBookList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectCartInputBookList(map);
	}

	@Override
	public List<EgovMap> selectBookBuyHistoryList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookBuyHistoryList(map);
	}

	@Override
	public EgovMap selectBookBuyHistoryOrderMaster(Map<String, Object> map) throws Exception {

		EgovMap detail  = null;

		detail = sntBookDAO.selectBookBuyHistoryOrderMaster(map);

		if(detail != null && !detail.isEmpty()) {
			detail.put("detailList", sntBookDAO.selectBookBuyHistoryOrderDetailList(map));

		}

		return detail;
	}

	@Override
	public void procedureEduAppAndModify(Map<String, Object> map) throws Exception {

		try {

			if(map.get("emaEduCode") != null  && !"".equals(StringUtil.isNullToString(map.get("emaEduCode")))) {
				if(map.get("emaEduCode") instanceof String ) {
					sntBookDAO.procedureEduAppAndModify(map);
				}else {
					List<String> emaEduCodeList = (ArrayList<String>) map.get("emaEduCode");
					for(String emaEduCode : emaEduCodeList ) {
						map.put("emaEduCode", emaEduCode);
						sntBookDAO.procedureEduAppAndModify(map);

						if(!"1".equals(map.get("resultCode"))) {
							break;
						}
					}
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void insertOrder(Map<String, Object> map) throws Exception {
		try {
			List<EgovMap> orderList = (List<EgovMap>) map.get("orderList");



			if(orderList != null && !orderList.isEmpty()) {


				if("2".equals(map.get("payCode")) && StringUtil.isNullToString(map.get("mtrcCompanyId")).length() > 8  ) {
					String billseqNum = sntBookKipAdmDAO.selectTaxbillSeq(map);
					map.put("billseqNum", billseqNum);
					sntBookKipAdmDAO.insertTaxBill(map);
				}
				map.put("ordNo", System.currentTimeMillis());
				sntBookDAO.insertOrder(map);

				String rowId = "";
				String sysDate = StringUtil.isNullToString(DateUtil.getCurrentDate("yyyy-MM-dd"));
				String sep = "1";
				String sepCode = "11118010";
				String amt = StringUtil.isNullToString((String) map.get("payTotalAmt"));
				String etc = "이니시스PG 미수금[" + StringUtil.isNullToString((String) map.get("userName")) + " "
						+ StringUtil.isNullToString((String) map.get("userId")) + "]";
				String compCd = "4000001";
				String compNm = "이니시스";
				String mngCd1 = "4000001";
				String mngNm1 = "이니시스";
				setSlipMap(map, rowId, sysDate, sep, sepCode, amt, etc, compCd, compNm, mngCd1, mngNm1, StringUtil.isNullToString(map.get("pslId")));
				EgovMap result = sntBookKipAdmDAO.procErpSlipInsertProc(map);
				if(result != null && "1".equals(result.get("vResult"))) {
					for(EgovMap egovMap : orderList ) {
						String bookDiv = StringUtil.isNullToString(egovMap.get("bookDiv"));
						String acgs_acc_code1,sbam_new_code = "";
						map.put("bookDiv" , egovMap.get("bookDiv"));
						map.put("bookCode" , egovMap.get("ibmBookCode"));
						map.put("bookName" , egovMap.get("ibmBookName"));
						map.put("bookCnt" , egovMap.get("cnt"));
						map.put("bookAmt" , StringUtil.isNullToString(egovMap.get("ibmPrice")).replace(",", ""));
						map.put("saleAmt" , egovMap.get("saleAmt"));
						map.put("bgnDate" , egovMap.get("bgnDate"));
						map.put("endDate" , egovMap.get("endDate"));
						map.put("downDate" , egovMap.get("downDate"));
						map.put("certiCode" , null);
						map.put("certiName" , null);
						sntBookDAO.insertOrderItem(map);
						if("2".equals(map.get("payCode")) && StringUtil.isNullToString(map.get("mtrcCompanyId")).length() > 8  ) {
							sntBookKipAdmDAO.insertTaxBillItem(map);
						}



						if("2".equals(bookDiv)) {
							sntBookKipAdmDAO.webSbmnumProc(map);
							sntBookKipAdmDAO.webSbmnum2Proc(map);
							acgs_acc_code1 = StringUtil.isNullToString(map.get("sbamNewCode"));
							sbam_new_code = StringUtil.isNullToString(map.get("sbmAccCode1"));
						}else {
							if ("1".equals(bookDiv)) {
								acgs_acc_code1 = "41001110";
							} else if ("3".equals(bookDiv)) {
								acgs_acc_code1 = "41001301";
								sbam_new_code = "41306000";
							} else if ("4".equals(bookDiv)) {
								acgs_acc_code1 = "41004200";
								sbam_new_code = "41201040";
							} else if ("5".equals(bookDiv)) {
								acgs_acc_code1 = "41004200";
								sbam_new_code = "41201040";
							} else if ("6".equals(bookDiv)) {
								acgs_acc_code1 = "41001420";
								sbam_new_code = "41307030";
							} else if ("7".equals(bookDiv)) {
								acgs_acc_code1 = "41001430";
								sbam_new_code = "41307010";
							} else if ("8".equals(bookDiv)) {
								acgs_acc_code1 = "41004500";
								sbam_new_code = "41201070";
							} else if ("9".equals(bookDiv)) {
								acgs_acc_code1 = "41001230";
								sbam_new_code = "41305230";
							}
						}

						String book_name = StringUtil.isNullToString(map.get("ibmBookName"));
						if (book_name.length() > 23) {
							book_name = book_name.substring(0, 23);
						}

						sep = "2";
						sysDate = StringUtil.isNullToString(DateUtil.getCurrentDate("yyyy-MM-dd"));
						amt = StringUtil.isNullToString(map.get("saleAmt"));
						etc = book_name + "[" + StringUtil.isNullToString((String) map.get("userName")) + " "
								+ StringUtil.isNullToString((String) map.get("userId")) + "]";
						compCd = "";
						compNm = "";
						mngCd1 = "";
						mngNm1 = "";
						this.setSlipMap(map, rowId, sysDate, sep, sbam_new_code, amt, etc, compCd, compNm, mngCd1,
								mngNm1, StringUtil.isNullToString(map.get("pslId")));
						result = sntBookKipAdmDAO.procErpSlipInsertProc(map);

						if(result != null && !"1".equals(result.get("vResult"))) {
							throw new Exception("전표 데이터(대변) 생성 중 오류");

						}

					}
				}

				sntBookKipAdmDAO.intOrdBookEachProc(map);

			}
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

	@Override
	public List<EgovMap> selectCorporationList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectCorporationList(map);
	}

	@Override
	public List<EgovMap> selectBookFormatOrderList(Map<String, Object> map) throws Exception {
		return sntBookDAO.selectBookFormatOrderList(map);
	}

	@Override
	public EgovMap selectTaxDetail(Map<String, Object> map) throws Exception {
		return sntBookKipAdmDAO.selectTaxDetail(map);
	}

	public void setSlipMap(Map<String, Object> slipMap, String rowId, String sysDate, String sep,
			String sepCode, String amt, String etc, String compCd, String compNm, String mngCd1, String mngNm1,
			String pslId) {
		slipMap.put("v_slip_num", rowId);
		slipMap.put("v_slip_date", sysDate);
		slipMap.put("v_emp_id", "000000");
		slipMap.put("v_drcr", sep);
		slipMap.put("v_acc_code", sepCode.trim());
		slipMap.put("v_amt", Integer.parseInt(amt));
		slipMap.put("v_summary", etc);
		slipMap.put("v_account_sep", "1050");
		slipMap.put("v_cd_partner", compCd);
		slipMap.put("v_nm_partner", compNm);
		slipMap.put("v_pay_date", "");
		slipMap.put("v_cd_mngd1", mngCd1);
		slipMap.put("v_nm_mngd1", mngNm1);
		slipMap.put("v_cd_mngd2", "");
		slipMap.put("v_nm_mngd2", pslId);
		slipMap.put("v_cd_mngd3", "");
		slipMap.put("v_nm_mngd3", "");
		slipMap.put("v_cd_mngd4", "");
		slipMap.put("v_nm_mngd4", "");
		slipMap.put("v_cd_mngd5", "");
		slipMap.put("v_nm_mngd5", "");
		slipMap.put("v_cd_mngd6", "");
		slipMap.put("v_nm_mngd6", "");
		slipMap.put("v_cd_mngd7", "");
		slipMap.put("v_nm_mngd7", "");
		slipMap.put("v_cd_mngd8", "");
		slipMap.put("v_nm_mngd8", "");
		slipMap.put("r_slip_num", "");
		slipMap.put("v_result", 0);
	}


}
