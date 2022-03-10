package adminwork.kicpa.sntBook.service.impl;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("sntBookService")
public class SntBookServiceImpl extends EgovAbstractServiceImpl implements SntBookService{

	@Resource(name="sntBookDAO")
	private SntBookDAO sntBookDAO;

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
				map.put("ordNo", System.currentTimeMillis());
				sntBookDAO.insertOrder(map);
				for(EgovMap egovMap : orderList ) {

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
				}

			}
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}


}
