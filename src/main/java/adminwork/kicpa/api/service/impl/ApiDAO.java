package adminwork.kicpa.api.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import adminwork.kicpa.api.service.ApiVO;
import adminwork.kicpa.api.service.BottomsVO;
import adminwork.kicpa.api.service.FavoritesVO;
import adminwork.kicpa.api.service.MenuVO;
import adminwork.kicpa.api.service.Menus;
import adminwork.kicpa.api.service.VersVO;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("ApiDAO")
public class ApiDAO extends EgovAbstractDAO{

	
	public VersVO selectVer(ApiVO vo) throws Exception{
		return (VersVO) select("apiDAO.selectVer",vo);
	}
	
	@SuppressWarnings("unchecked")
	public List<BottomsVO> selectBottomList(ApiVO vo) throws Exception{
		return (List<BottomsVO>) list("apiDAO.selectBottomList",vo);
	}
	
	
	
	@SuppressWarnings("unchecked")
	public List<FavoritesVO> selectFavorList(ApiVO vo) throws Exception{
		return (List<FavoritesVO>) list("apiDAO.selectFavorList",vo);
	}
	
	
	
	/**
	 * MainMenu Head Menu 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Menus> selectMainMenuHead(MenuVO vo) throws Exception{
		return (List<Menus>) list("apiDAO.selectMainMenuHead", vo);
	}

	/**
	 * MainMenu Left Menu 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Menus> selectMainMenuLeft(MenuVO vo) throws Exception{
		return (List<Menus>) list("apiDAO.selectMainMenuLeft", vo);
	}
}
