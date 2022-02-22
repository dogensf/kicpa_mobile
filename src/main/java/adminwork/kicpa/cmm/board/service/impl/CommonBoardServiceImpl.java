package adminwork.kicpa.cmm.board.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("commonBoardService")
public class CommonBoardServiceImpl extends EgovAbstractServiceImpl implements CommonBoardService{

	@Resource(name="commonBoardDAO")
	private CommonBoardDAO commonBoardDAO;

	@Override
	public EgovMap selectBoardMaster(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectBoardMaster(map);
	}

	@Override
	public List<EgovMap> selectCommonBoardList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardList(map);
	}

	@Override
	public int selectCommonBoardListCnt(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardListCnt(map);
	}

	@Override
	public List<EgovMap> selectCommonCafeBoardList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonCafeBoardList(map);
	}

	@Override
	public int selectCommonCafeBoardListCnt(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonCafeBoardListCnt(map);
	}

	@Override
	public EgovMap selectCommonBoardDetail(Map<String, Object> map) throws Exception {
		
		EgovMap boardDetail = null;
		
		boardDetail = commonBoardDAO.selectCommonBoardDetail(map);
		if(boardDetail != null && !boardDetail.isEmpty()) {
			map.put("bltnGn", boardDetail.get("bltnGn"));
			boardDetail.put("fileList", commonBoardDAO.selectCommonBoardFileList(map));
			boardDetail.put("boardGroupList", commonBoardDAO.selectCommonBoardGroupList(map));
		}
		
		return boardDetail;
	}

	@Override
	public EgovMap selectCommonCafeBoardDetail(Map<String, Object> map) throws Exception {
		EgovMap boardDetail = null;
		
		boardDetail = commonBoardDAO.selectCommonCafeBoardDetail(map);
		
		if(boardDetail != null && !boardDetail.isEmpty()) {
			boardDetail.put("fileList", commonBoardDAO.selectCommonCafeBoardFileList(map));
			boardDetail.put("boardGroupList", commonBoardDAO.selectCommonCafeBoardGroupList(map));
		}
		
		return boardDetail;
	}

	@Override
	public List<EgovMap> selectCommonBoardFileList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardFileList(map);
	}

	@Override
	public List<EgovMap> selectCommonCafeBoardFileList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonCafeBoardFileList(map);
	}

	@Override
	public List<EgovMap> selectCommonBoardGroupList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardGroupList(map);
	}

	@Override
	public List<EgovMap> selectCommonCafeBoardGroupList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonCafeBoardGroupList(map);
	}

	@Override
	public void updateCommonBoardReadCnt(Map<String, Object> map) throws Exception {
		try {
			commonBoardDAO.updateCommonBoardReadCnt(map);
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void updateCommonCafeBoardReadCnt(Map<String, Object> map) throws Exception {
		try {
			commonBoardDAO.updateCommonBoardReadCnt(map);
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public List<EgovMap> selectCommonBoardIdArrList(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardIdArrList(map);
	}

	@Override
	public int selectCommonBoardIdArrListCnt(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardIdArrListCnt(map);
	}



	
	
}
