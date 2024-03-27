package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.MyPageService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("myPageService")
public class MyPageServiceImpl extends EgovAbstractServiceImpl implements MyPageService {

	@Resource(name="MyPageDAO")
	private MyPageDAO myPageDAO;

	@Override
	public List<?> selectCpaPassInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaPassInfoList(map);
	}

	@Override
	public List<?> selectCpaPassRegistAeresInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaPassRegistAeresInfoList(map);
	}

	@Override
	public List<?> selectCpaPassRegistOfcInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaPassRegistOfcInfoList(map);
	}

	@Override
	public List<?> selectCpaPassRegistAcdmcrInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaPassRegistAcdmcrInfoList(map);
	}

	@Override
	public List<?> selectCpaMberPhotoInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaMberPhotoInfoList(map);
	}

	@Override
	public List<?> selectCpaTrainRegistInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaTrainRegistInfoList(map);
	}

	@Override
	public List<?> selectCpaTrainApntcBrfInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaTrainApntcBrfInfoList(map);
	}

	@Override
	public List<?> selectCpaTrainTrnngResultInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaTrainTrnngResultInfoList(map);
	}

	@Override
	public List<?> selectCpaMemberRegistInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaMemberRegistInfoList(map);
	}

	@Override
	public String selectCpaMemberDiInfo(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaMemberDiInfo(map);
	}

	@Override
	public List<?> selectCpaMemberSearchChk(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaMemberSearchChk(map);
	}

	@Override
	public List<?> selectCpaTaxAcutInfoList(Map<String, Object> map) throws Exception {
		String verNum = myPageDAO.selectTaxVersion();

		if("1".equals(verNum)){
			return myPageDAO.selectCpaTaxAcutInfoList(map);
		}
		else{
			return myPageDAO.selectCpaTaxAcutInfoListVer2(map);
		}
	}


	@Override
	public List<?> selectCpaTrainRegistReviewInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaTrainRegistReviewInfoList(map);
	}

	@Override
	public List<?> selectCpaAudTrainRegistReviewInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaAudTrainRegistReviewInfoList(map);
	}

	@Override
	public List<?> selectCpaMemberRegistReviewInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaMemberRegistReviewInfoList(map);
	}

	@Override
	public List<?> selectCpaPassDiCheckList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaPassDiCheckList(map);
	}





	@Override
	public List<?> selectSendMemList(Map<String, Object> map) throws Exception {
		// TODO Auto-generated method stub
		return myPageDAO.selectSendMemList(map);
	}

	@Override
	public void eapQueryMain09Proc(Map<String, Object> map) throws Exception {
		// TODO Auto-generated method stub
		myPageDAO.eapQueryMain09Proc(map);
	}


	@Override
	public List<?> boardInfoSendMailProc(Map<String, Object> map) throws Exception {
		return myPageDAO.boardInfoSendMailProc(map);
	}

	@Override
	public List<?> boardInfoSendAtfFlowerProc(Map<String, Object> map) throws Exception {
		return myPageDAO.boardInfoSendAtfFlowerProc(map);
	}

	@Override
	public List<EgovMap> selectCpaSearchPopList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaSearchPopList(map);
	}

	@Override
	public List<?> webCpaCheckProc(Map<String, Object> map) throws Exception {
		return myPageDAO.webCpaCheckProc(map);
	}
}
