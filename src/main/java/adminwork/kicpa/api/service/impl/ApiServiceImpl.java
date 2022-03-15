package adminwork.kicpa.api.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import adminwork.kicpa.api.service.ApiService;
import adminwork.kicpa.api.service.ApiVO;
import adminwork.kicpa.api.service.BottomsVO;
import adminwork.kicpa.api.service.FavoritesVO;
import adminwork.kicpa.api.service.MenuVO;
import adminwork.kicpa.api.service.Menus;
import adminwork.kicpa.api.service.VersVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("ApiService")
public class ApiServiceImpl extends EgovAbstractServiceImpl implements ApiService{
	
	@Resource(name="ApiDAO")
	private ApiDAO apiDAO;
	
	public VersVO selectVer(ApiVO vo) throws Exception {
		return apiDAO.selectVer(vo);
	}
	
	
	public List<BottomsVO> selectBottomList(ApiVO vo) throws Exception{
		return apiDAO.selectBottomList(vo);
	}
	
	
	public List<FavoritesVO> selectFavorList(ApiVO vo) throws Exception{
		return apiDAO.selectFavorList(vo);
	}
	
	/**
	 * MainMenu Head Menu 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	public List<Menus> selectMainMenuHead(MenuVO vo) throws Exception {
		return apiDAO.selectMainMenuHead(vo);
	}

	/**
	 * MainMenu Head Left 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	public List<Menus> selectMainMenuLeft(MenuVO vo) throws Exception {
		return apiDAO.selectMainMenuLeft(vo);
	}

}
