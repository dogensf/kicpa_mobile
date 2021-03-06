package adminwork.kicpa.counselCenter.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("counselCenterDAO")
public class CounselCenterDAO extends EgovAbstractDAO{

	/**
	 * 신고목록조회
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectDeclarationBoardList(Map<String,Object> map) throws Exception {
        return (List<EgovMap>) list("CounselCenterDAO.selectDeclarationBoardList",map);
	}
	/**
	 * 신고목록 개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectDeclarationBoardListCnt(Map<String,Object> map) throws Exception {
		return (int) select("CounselCenterDAO.selectDeclarationBoardListCnt",map);
	}

	/**
	 * 신고상세
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectDeclarationBoardDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("CounselCenterDAO.selectDeclarationBoardDetail",map);
	}
	/**
	 * 신고 파일목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectDeclarationBoardFileList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("CounselCenterDAO.selectDeclarationBoardFileList",map);
	}
	/**
	 * 조회수 업데이트
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int updateDeclarationBoardReadCnt(Map<String,Object> map) throws Exception {
		return update("CounselCenterDAO.updateDeclarationBoardReadCnt",map);
	}

	/**
	 * 회원세무상담 목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectMemberCounselBoardList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("CounselCenterDAO.selectMemberCounselBoardList",map);
	}

	/**
	 * 회원세무상담 목록 개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectMemberCounselBoardListCnt(Map<String,Object> map) throws Exception {
		return (int) select("CounselCenterDAO.selectMemberCounselBoardListCnt",map);
	}

	/**
	 * 회원세무상담 상세
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectMemberCounselBoardDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("CounselCenterDAO.selectMemberCounselBoardDetail",map);
	}

	/**
	 * 회원세무상담 상세 답변글
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectMemberCounselBoardReply(Map<String,Object> map) throws Exception {
		return (EgovMap) select("CounselCenterDAO.selectMemberCounselBoardReply",map);
	}

	/**
	 * 회원세무상담 의견목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectMemberCounselBoardMemoList(Map<String,Object> map) throws Exception {
		return  (List<EgovMap>) list("CounselCenterDAO.selectMemberCounselBoardMemoList",map);
	}

	/**
	 * 회원세무상담 의견등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int insertMemberCounselBoardMemo(Map<String,Object> map) throws Exception {
		return  update("CounselCenterDAO.insertMemberCounselBoardMemo",map);
	}

	/**
	 * 조회수 업데이트
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int updateMemberCounselBoardReadCnt(Map<String,Object> map) throws Exception {
		return update("CounselCenterDAO.updateMemberCounselBoardReadCnt",map);
	}

	/**
	 * 회원전문 세무상담 등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int insertMemberCounselBoard(Map<String,Object> map) throws Exception {
		return update("CounselCenterDAO.insertMemberCounselBoard",map);
	}

	/**
	 * 신고 등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int insertDeclarationBoard(Map<String,Object> map) throws Exception {
		return (int) insert("CounselCenterDAO.insertDeclarationBoard",map);
	}
	/**
	 * 신고 첨부파일 등록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int insertDeclarationBoardFile(Map<String,Object> map) throws Exception {
		return update("CounselCenterDAO.insertDeclarationBoardFile",map);
	}
	public int updateMemberCounselBoardDelete(Map<String,Object> map) throws Exception {
		return update("CounselCenterDAO.updateMemberCounselBoardDelete",map);
	}

	/**
	 * 파일다운로드 정보 조회
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectDeclarationBoardFile(Map<String,Object> map) throws Exception {
		return (EgovMap) select("CounselCenterDAO.selectDeclarationBoardFile",map);
	}

}
