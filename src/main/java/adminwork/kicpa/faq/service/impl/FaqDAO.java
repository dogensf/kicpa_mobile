package adminwork.kicpa.faq.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import adminwork.kicpa.faq.service.Faq;
import adminwork.kicpa.faq.service.FaqVO;

@Repository("FaqDAO")
public class FaqDAO extends EgovComAbstractDAO2{

	
	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<Faq> selectFaqList(FaqVO vo) throws Exception {
		return (List<Faq>) list("FaqDAO.selectFaqList", vo);
    }

    /**
     * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public int selectFaqListCnt(FaqVO vo) throws Exception {
		return (Integer)select("FaqDAO.selectFaqListCnt", vo);
    }
    
    /**
     * 게시물 한 건에 대하여 상세 내용을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public Faq selectFaq(FaqVO vo) throws Exception {
		return (Faq)select("FaqDAO.selectFaq", vo);
    }

    
    public void updateRdcnt(FaqVO vo) throws Exception {
    	update("FaqDAO.updateRdcnt", vo);
    }


}
