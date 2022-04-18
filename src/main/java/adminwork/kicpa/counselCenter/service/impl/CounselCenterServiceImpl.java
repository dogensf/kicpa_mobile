package adminwork.kicpa.counselCenter.service.impl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.counselCenter.service.CounselCenterService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("counselCenterService")
public class CounselCenterServiceImpl extends EgovAbstractServiceImpl implements CounselCenterService{

	@Resource(name="counselCenterDAO")
	private CounselCenterDAO counselCenterDAO;

	@Override
	public List<EgovMap> selectDeclarationBoardList(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectDeclarationBoardList(map);
	}

	@Override
	public int selectDeclarationBoardListCnt(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectDeclarationBoardListCnt(map);
	}

	@Override
	public EgovMap selectDeclarationBoardDetail(Map<String, Object> map) throws Exception {

		EgovMap egovMap = null;

		try {
			egovMap = counselCenterDAO.selectDeclarationBoardDetail(map);

			if(egovMap != null && !egovMap.isEmpty()) {
				egovMap.put("fileList", counselCenterDAO.selectDeclarationBoardFileList(map));
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

		return egovMap;
	}

	@Override
	public List<EgovMap> selectDeclarationBoardFileList(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectDeclarationBoardFileList(map);
	}

	@Override
	public List<EgovMap> selectMemberCounselBoardList(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectMemberCounselBoardList(map);
	}

	@Override
	public int selectMemberCounselBoardListCnt(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectMemberCounselBoardListCnt(map);
	}

	@Override
	public EgovMap selectMemberCounselBoardDetail(Map<String, Object> map) throws Exception {

		EgovMap egovMap = null;

		try {

			egovMap = counselCenterDAO.selectMemberCounselBoardDetail(map);

			if(egovMap != null && !egovMap.isEmpty()) {
				egovMap.put("replyDetail", counselCenterDAO.selectMemberCounselBoardReply(map));
				egovMap.put("memoList", counselCenterDAO.selectMemberCounselBoardMemoList(map));
			}


		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return egovMap;
	}

	@Override
	public void updateDeclarationBoardReadCnt(Map<String, Object> map) throws Exception {
		counselCenterDAO.updateDeclarationBoardReadCnt(map);

	}

	@Override
	public void updateMemberCounselBoardReadCnt(Map<String, Object> map) throws Exception {
		counselCenterDAO.updateMemberCounselBoardReadCnt(map);

	}

	@Override
	public void insertMemberCounselBoardMemo(Map<String, Object> map) throws Exception {
		try {

			map.put("memoSeq", System.currentTimeMillis());
			counselCenterDAO.insertMemberCounselBoardMemo(map);

		}catch (Exception e) {
			e.printStackTrace();
			throw e;

		}
	}

	@Override
	public List<EgovMap> selectMemberCounselBoardMemoList(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectMemberCounselBoardMemoList(map);
	}

	@Override
	public void insertMemberCounselBoard(Map<String, Object> map) throws Exception {
		try {
			map.put("bltnNo", System.currentTimeMillis());
			counselCenterDAO.insertMemberCounselBoard(map);
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

	@Override
	public void insertDeclarationBoard(Map<String, Object> map) throws Exception {
		try {

			List<HashMap<String,Object>> fileList = (List<HashMap<String, Object>>) map.get("fileList");

			counselCenterDAO.insertDeclarationBoard(map);


			if(fileList != null && !fileList.isEmpty()) {
				for(HashMap<String,Object> fileMap : fileList ) {
					fileMap.put("arIdNum", map.get("arIdNum"));
					counselCenterDAO.insertDeclarationBoardFile(fileMap);
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public EgovMap selectDeclarationBoardFile(Map<String, Object> map) throws Exception {
		return counselCenterDAO.selectDeclarationBoardFile(map);
	}

	@Override
	public void updateMemberCounselBoardDelete(Map<String, Object> map) throws Exception {
		try {
			counselCenterDAO.updateMemberCounselBoardDelete(map);
		}catch (Exception e) {
			e.printStackTrace();
		}

	}


}
