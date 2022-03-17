package adminwork.kicpa.counselCenter.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface  CounselCenterService {


	/**
	 * 신고목록조회
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectDeclarationBoardList(Map<String,Object> map) throws Exception;
	/**
	 * 신고목록 개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectDeclarationBoardListCnt(Map<String,Object> map) throws Exception;

	/**
	 * 신고상세
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectDeclarationBoardDetail(Map<String,Object> map) throws Exception;
	/**
	 * 신고 파일목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectDeclarationBoardFileList(Map<String,Object> map) throws Exception;

	/**
	 * 회원세무상담 목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectMemberCounselBoardList(Map<String,Object> map) throws Exception;

	/**
	 * 회원세무상담 목록 개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectMemberCounselBoardListCnt(Map<String,Object> map) throws Exception;

	/**
	 * 회원세무상담 상세
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectMemberCounselBoardDetail(Map<String,Object> map) throws Exception;

	/**
	 * 조회수 업데이트
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void updateDeclarationBoardReadCnt(Map<String,Object> map) throws Exception;

	/**
	 * 조회수 업데이트
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void updateMemberCounselBoardReadCnt(Map<String,Object> map) throws Exception;

	/**
	 * 회원세무상담 의견등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void insertMemberCounselBoardMemo(Map<String,Object> map) throws Exception;

	/**
	 * 회원세무상담 의견목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectMemberCounselBoardMemoList(Map<String,Object> map) throws Exception;

	/**
	 * 회원전문 세무상담 등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void insertMemberCounselBoard(Map<String,Object> map) throws Exception;

	/**
	 * 신고 등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void insertDeclarationBoard(Map<String,Object> map) throws Exception;

	/**
	 * 파일다운로드 정보 조회
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectDeclarationBoardFile(Map<String,Object> map) throws Exception;

}
