package adminwork.kicpa.notice.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("noticeDAO")
public class NoticeDAO extends EgovAbstractDAO{

	/**
	 * 주요기사 목록
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public List<EgovMap> selectNewsList(Map<String,Object> map) throws Exception {
        return (List<EgovMap>) list("NoticeDAO.selectNewsList",map);
	}

	/**
	 * 주요기사 목록 개수
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int selectNewsListCnt(Map<String,Object> map) throws Exception {
		return (int) select("NoticeDAO.selectNewsListCnt",map);
	}

}
