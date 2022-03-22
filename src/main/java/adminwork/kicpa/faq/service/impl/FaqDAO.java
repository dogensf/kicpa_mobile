package adminwork.kicpa.faq.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import adminwork.com.cmm.service.impl.EgovComAbstractDAO2;
import adminwork.kicpa.faq.service.Faq;
import adminwork.kicpa.faq.service.FaqVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

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
    public List<EgovMap> selectFaqList(Map<String,Object> map) throws Exception {
		return (List<EgovMap>) list("FaqDAO.selectFaqList", map);
    }

    /**
     * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public int selectFaqListCnt(Map<String,Object> map) throws Exception {
		return (Integer)select("FaqDAO.selectFaqListCnt", map);
    }

    /**
     * 게시물 한 건에 대하여 상세 내용을 조회 한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public EgovMap selectFaq(Map<String,Object> map) throws Exception {
		return (EgovMap)select("FaqDAO.selectFaq", map);
    }

    public List<EgovMap> selectCsCodeGroupList() throws Exception {
    	return (List<EgovMap>) list("FaqDAO.selectCsCodeGroupList");
    }


    public void updateRdcnt(Map<String,Object> map) throws Exception {
    	update("FaqDAO.updateRdcnt", map);
    }


}
