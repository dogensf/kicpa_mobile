package adminwork.kicpa.job.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("jobAdvertisementService")
public class JobAdvertisementServiceImpl extends EgovAbstractServiceImpl implements JobAdvertisementService{

	@Resource(name="jobAdvertisementDAO")
	private JobAdvertisementDAO jobAdvertisementDAO;

	@Override
	public List<EgovMap> selectBoardList(Map<String,Object> map) throws Exception {
		return jobAdvertisementDAO.selectBoardList(map);
	}

	@Override
	public int selectBoardListCnt(Map<String,Object> map) throws Exception {
		return jobAdvertisementDAO.selectBoardListCnt(map);
	}

	@Override
	public List<EgovMap> selectBoardFileList(Map<String, Object> map) throws Exception {
		return jobAdvertisementDAO.selectBoardFileList(map);
	}

	@Override
	public EgovMap selectBoardDetail(Map<String, Object> map) throws Exception {
		
		EgovMap egovMap = jobAdvertisementDAO.selectBoardDetail(map);
		
		
		if(egovMap != null && !egovMap.isEmpty()) {
			egovMap.put("fileList", jobAdvertisementDAO.selectBoardFileList(map));
		}
		
		return egovMap;
	}

	@Override
	public void updateBoardReadcount(Map<String, Object> map) throws Exception {
		try {
			jobAdvertisementDAO.updateBoardReadcount(map);
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public List<EgovMap> selectMemberPollList(Map<String, Object> map) throws Exception {
		return jobAdvertisementDAO.selectMemberPollList(map);
	}

	@Override
	public int selectMemberPollListCnt(Map<String, Object> map) throws Exception {
		return jobAdvertisementDAO.selectMemberPollListCnt(map);
	}
	
}
