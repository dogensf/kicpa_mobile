package adminwork.kicpa.job.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("jobAdvertisementDAO")
public class JobAdvertisementDAO extends EgovAbstractDAO{
	/**
	 * 구인정보 목록조회
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectBoardList(Map<String,Object> map) throws Exception {
        return (List<EgovMap>) list("JobAdvertisementDAO.selectBoardList",map);
	}
	/**
	 * 구인정보 목록개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectBoardListCnt(Map<String,Object> map) throws Exception {
		return (int) select("JobAdvertisementDAO.selectBoardListCnt",map);
	}
	/**
	 * 구인정보 첨부파일목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectBoardFileList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("JobAdvertisementDAO.selectBoardFileList",map);
	}

	/**
	 * 인력풀
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectMemberPollList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("JobAdvertisementDAO.selectMemberPollList",map);
	}
	
	/**
	 * 인력풀 목록개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectMemberPollListCnt(Map<String,Object> map) throws Exception {
		return (int) select("JobAdvertisementDAO.selectMemberPollListCnt",map);
	}
	
	/**
	 * 구인상세
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public EgovMap selectBoardDetail(Map<String,Object> map) throws Exception {
		return (EgovMap) select("JobAdvertisementDAO.selectBoardDetail",map);
	}
	
	/**
	 * 조회수 업데이트
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int updateBoardReadcount(Map<String,Object> map) throws Exception {
		return update("JobAdvertisementDAO.updateBoardReadcount",map);
	}
}
