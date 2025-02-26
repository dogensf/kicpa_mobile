package adminwork.kicpa.job.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface  JobAdvertisementService {

		
	public List<EgovMap> selectBoardList(Map<String,Object> map) throws Exception;
	
	public int selectBoardListCnt(Map<String,Object> map) throws Exception;

	public List<EgovMap> selectBoardList2(Map<String,Object> map) throws Exception;

	public int selectBoardListCnt2(Map<String,Object> map) throws Exception;
	
	public List<EgovMap> selectBoardFileList(Map<String,Object> map) throws Exception;
	
	public EgovMap selectBoardDetail(Map<String,Object> map) throws Exception;
	
	public void updateBoardReadcount(Map<String,Object> map) throws Exception;
	
	/**
	 * 인력풀
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectMemberPollList(Map<String,Object> map) throws Exception;
	
	/**
	 * 인력풀 목록개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectMemberPollListCnt(Map<String,Object> map) throws Exception;
}
