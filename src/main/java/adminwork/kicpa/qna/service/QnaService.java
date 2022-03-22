package adminwork.kicpa.qna.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface QnaService {


	public void insertQna(Map<String,Object> map) throws Exception;

	public void selectQnaLists(Map<String,Object> map)throws Exception;

	public EgovMap selectQna(Map<String,Object> map)throws Exception;

    public List<EgovMap> selectCsCodeGroup2List(Map<String,Object> map) throws Exception;

    public List<EgovMap> selectCsCodeGroup1List() throws Exception;
}
