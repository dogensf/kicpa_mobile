package adminwork.kicpa.api.service;

import java.util.List;

public interface ApiService {
	
	public VersVO selectVer(ApiVO vo) throws Exception;
	
	public List<BottomsVO> selectBottomList(ApiVO vo) throws Exception;
	
	public List<FavoritesVO> selectFavorList(ApiVO vo) throws Exception;
	
	/*### 메뉴관련 프로세스 ###*/
	/**
	 * MainMenu Head Menu 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	List<Menus> selectMainMenuHead(MenuVO vo) throws Exception;

	/**
	 * MainMenu Head Left 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	List<Menus> selectMainMenuLeft(MenuVO vo) throws Exception;
	
	
}
