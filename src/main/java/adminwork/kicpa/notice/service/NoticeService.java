package adminwork.kicpa.notice.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface  NoticeService {

	/**
	 * 주요기사 목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectNewsList(Map<String,Object> map) throws Exception;

	/**
	 * 주요기사 목록 개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectNewsListCnt(Map<String,Object> map) throws Exception;
}
