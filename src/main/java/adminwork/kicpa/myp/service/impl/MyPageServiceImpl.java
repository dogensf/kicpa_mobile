package adminwork.kicpa.myp.service.impl;


import adminwork.kicpa.myp.service.MyPageService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
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
	public List<?> selectCpaTaxAcutInfoList(Map<String, Object> map) throws Exception {
		return myPageDAO.selectCpaTaxAcutInfoList(map);
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
}
