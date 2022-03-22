package adminwork.kicpa.qna.service;

import java.util.Map;

public interface QnaService {

	
	public void insertQna(QnaVO vo) throws Exception;

	public Map<String, Object> selectQnaLists(QnaVO vo)throws Exception;
		
	public Qna selectQna(QnaVO vo)throws Exception;
}
