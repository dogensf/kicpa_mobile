package adminwork.kicpa.qna.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("QnaDAO")
public class QnaDAO extends EgovComAbstractDAO2{

	public void insertQna(Map<String,Object> map) throws Exception {
    	update("QnaDAO.insertQna", map);
    }

/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<EgovMap> selectQnaList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("QnaDAO.selectQnaList", map);
    }

    /**
     * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public int selectQnaListCnt(Map<String,Object> map) throws Exception {
		return (Integer)select("QnaDAO.selectQnaListCnt", map);
    }


    /**
     * 게시물 한 건에 대하여 상세 내용을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public EgovMap selectQna(Map<String,Object> map) throws Exception {
		return (EgovMap)select("QnaDAO.selectQna", map);
    }
    public List<EgovMap> selectCsCodeGroup2List(Map<String,Object> map) throws Exception {
    	return (List<EgovMap>) list("QnaDAO.selectCsCodeGroup2List", map);
    }
    public List<EgovMap> selectCsCodeGroup1List() throws Exception {
    	return (List<EgovMap>) list("QnaDAO.selectCsCodeGroup1List");
    }

}
