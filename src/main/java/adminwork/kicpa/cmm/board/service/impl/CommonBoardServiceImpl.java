package adminwork.kicpa.cmm.board.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.com.cmm.StringUtil;
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

	@Override
	public void insertCommonBoard(Map<String, Object> map) throws Exception {

		try {
			List<HashMap<String,Object>> fileList = (List<HashMap<String, Object>>) map.get("fileList");

			EgovMap boardMaster = commonBoardDAO.selectBoardMaster(map);

			String key = commonBoardDAO.selectCommonBoardKey(map);

			if("".equals(StringUtil.isNullToString(key))) {
				key = "1";
			}

			if("Y".equals(map.get("bltnTopTag"))) {
				map.put("bltnGn", (Long.parseLong(key) +9000000000L ) );
			}else if("T".equals(map.get("bltnTopTag"))) {
				map.put("bltnGn", (Long.parseLong(key) +9900000000L ) );
			}else {
				map.put("bltnGn", (Long.parseLong(key)));
			}

			commonBoardDAO.mergeCommonBoardKey(map);



			String bltnNo = "1" + System.currentTimeMillis();
			map.put("bltnNo", bltnNo);
			if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
				commonBoardDAO.insertCommonCafeBoard(map);
				commonBoardDAO.insertCommonCafeBoardCnnt(map);

			}else {
				commonBoardDAO.insertCommonBoard(map);
				commonBoardDAO.insertCommonBoardCnnt(map);
			}

			if("Y".equals(boardMaster.get("funcYns9")) || "Y".equals(boardMaster.get("funcYns8"))) {
				commonBoardDAO.insertCommonBoardExtn(map);
			}


			if(fileList != null && !fileList.isEmpty()) {

				for(HashMap<String,Object> fileMap : fileList) {
					if("Y".equals(map.get("owntblYn")) && "CAFE".equals(map.get("owntblFix"))) {
						commonBoardDAO.insertCommonCafeBoardFile(map);
					}else {
						commonBoardDAO.insertCommonBoardFile(map);
					}
				}

			}

			commonBoardDAO.mergeCommonBoardUserHistory(map);
			commonBoardDAO.insertCommonBoardUserActionHistory(map);


		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}


	}

	@Override
	public EgovMap selectCommonBoardFileDetail(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonBoardFileDetail(map);
	}

	@Override
	public EgovMap selectCommonCateBoardFileDetail(Map<String, Object> map) throws Exception {
		return commonBoardDAO.selectCommonCateBoardFileDetail(map);
	}

	@Override
	public int updateCommonBoardFileDownCnt(Map<String, Object> map) throws Exception {
		return commonBoardDAO.updateCommonBoardFileDownCnt(map);
	}

	@Override
	public int updateCommonCafeBoardFileDownCnt(Map<String, Object> map) throws Exception {
		return commonBoardDAO.updateCommonCafeBoardFileDownCnt(map);
	}





}
