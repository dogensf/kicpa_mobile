package adminwork.kicpa.qna.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.qna.service.QnaService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Service("QnaService")
public class QnaServiceImpl extends EgovAbstractServiceImpl implements QnaService {

	@Resource(name="QnaDAO")
	private QnaDAO qnaDAO;

    @Resource(name = "QnaManageIdGnrService")
    private EgovIdGnrService idgenService;


	public void insertQna(Map<String,Object> map) throws Exception {
		String qaid = idgenService.getNextStringId();
		map.put("qnaId",qaid);
		qnaDAO.insertQna(map);
	}

	public void selectQnaLists(Map<String,Object> map)throws Exception{

		List<EgovMap> result = qnaDAO.selectQnaList(map);
		int cnt = qnaDAO.selectQnaListCnt(map);
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

	}


	public EgovMap selectQna(Map<String,Object> map)throws Exception{
		return qnaDAO.selectQna(map);
	}

	@Override
	public List<EgovMap> selectCsCodeGroup2List(Map<String, Object> map) throws Exception {
		return qnaDAO.selectCsCodeGroup2List(map);
	}

	@Override
	public List<EgovMap> selectCsCodeGroup1List() throws Exception {
		return qnaDAO.selectCsCodeGroup1List();
	}
}
