package adminwork.kicpa.qna.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import adminwork.kicpa.qna.service.Qna;
import adminwork.kicpa.qna.service.QnaVO;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("QnaDAO")
public class QnaDAO extends EgovAbstractDAO{

	public void insertQna(QnaVO vo) throws Exception {
    	update("QnaDAO.insertQna", vo);
    }

/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<Qna> selectQnaList(QnaVO vo) throws Exception {
		return (List<Qna>) list("QnaDAO.selectQnaList", vo);
    }

    /**
     * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public int selectQnaListCnt(QnaVO vo) throws Exception {
		return (Integer)select("QnaDAO.selectQnaListCnt", vo);
    }

    
   

    /**
     * 게시물 한 건에 대하여 상세 내용을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public Qna selectQna(QnaVO vo) throws Exception {
		return (Qna)select("QnaDAO.selectQna", vo);
    }
	
}
