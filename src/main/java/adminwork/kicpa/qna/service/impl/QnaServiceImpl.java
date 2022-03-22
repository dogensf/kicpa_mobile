package adminwork.kicpa.qna.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.qna.service.Qna;
import adminwork.kicpa.qna.service.QnaService;
import adminwork.kicpa.qna.service.QnaVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;


@Service("QnaService")
public class QnaServiceImpl extends EgovAbstractServiceImpl implements QnaService {

	@Resource(name="QnaDAO")
	private QnaDAO qnaDAO;
	
    @Resource(name = "QnaManageIdGnrService")
    private EgovIdGnrService idgenService;

	
	public void insertQna(QnaVO vo) throws Exception {
		String qaid = idgenService.getNextStringId();
		vo.setQna_id(qaid);
		qnaDAO.insertQna(vo);
	}

	public Map<String, Object> selectQnaLists(QnaVO vo)throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();

		List<Qna> result = qnaDAO.selectQnaList(vo);
		int cnt = qnaDAO.selectQnaListCnt(vo);
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}
	
	
	
	
	public Qna selectQna(QnaVO vo)throws Exception{		
		return qnaDAO.selectQna(vo);		
	}
}
