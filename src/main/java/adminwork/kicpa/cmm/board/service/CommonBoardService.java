package adminwork.kicpa.cmm.board.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface  CommonBoardService {

	public EgovMap selectBoardMaster(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonBoardList(Map<String, Object> map) throws Exception;

	public int selectCommonBoardListCnt(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonCafeBoardList(Map<String, Object> map) throws Exception;

	public int selectCommonCafeBoardListCnt(Map<String, Object> map) throws Exception;

	public EgovMap selectCommonBoardDetail(Map<String, Object> map) throws Exception;

	public EgovMap selectCommonCafeBoardDetail(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonBoardFileList(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonCafeBoardFileList(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonBoardGroupList(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonCafeBoardGroupList(Map<String, Object> map) throws Exception;

	public void updateCommonBoardReadCnt(Map<String, Object> map) throws Exception;

	public void updateCommonCafeBoardReadCnt(Map<String, Object> map) throws Exception;

	public List<EgovMap> selectCommonBoardIdArrList(Map<String, Object> map) throws Exception;

	public int selectCommonBoardIdArrListCnt(Map<String, Object> map) throws Exception;

	public void insertCommonBoard(Map<String, Object> map) throws Exception;
}