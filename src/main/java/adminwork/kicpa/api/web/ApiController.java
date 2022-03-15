package adminwork.kicpa.api.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.api.service.ApiService;
import adminwork.kicpa.api.service.ApiVO;
import adminwork.kicpa.api.service.BottomsVO;
import adminwork.kicpa.api.service.FavoritesVO;
import adminwork.kicpa.api.service.MenuVO;
import adminwork.kicpa.api.service.Menus;
import adminwork.kicpa.api.service.VersVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONObject;

@Controller
public class ApiController {
	

	@Resource(name = "ApiService")
	private ApiService apiService;
	
	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;
	
	@Resource(name = "FileMngService")
	private FileMngService fileMngService;
	
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;
	
    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;    
    
    

	@RequestMapping(value = "/api/getAppInfo.do")
	public String mains(HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		
		ApiVO vo = new ApiVO();
		
		//버젼 생성
		VersVO ver = apiService.selectVer(vo);
		model.addAttribute("ver", ver);
		
		//기본 즐겨 찾기 생성
		List<BottomsVO> bottom = apiService.selectBottomList(vo);
		model.addAttribute("bottomList", bottom);
		
		//기본 즐겨 찾기 생성
		List<FavoritesVO> favor = apiService.selectFavorList(vo);
		model.addAttribute("myFavorites", favor);
		//favoritesList
		
		
		//categoryList - 생성		
		MenuVO vos = new MenuVO();
		List<Menus> hmenu = apiService.selectMainMenuHead(vos);
		List<Menus> menu = apiService.selectMainMenuLeft(vos);
		
		JSONObject cate = new JSONObject();
		JSONObject lv1 = new JSONObject();
		JSONObject lv2 = new JSONObject();
		for(Menus hm : hmenu) {
			lv1 = new JSONObject();
			for(Menus dm : menu) {
				lv2 = new JSONObject();
				if(hm.getMenuNo() == dm.getUpperMenuId()) {
					for(Menus dm2: menu) {
						if(dm.getMenuNo() == dm2.getUpperMenuId()) {
							String url = "";
							if(dm2.getChkURL().contains("http")){
								url = "window.bridge.openWeb('"+dm2.getChkURL()+"')";
							}else {
								url = "location.href='"+dm2.getChkURL()+"'";
							}
							lv2.put(dm2.getMenuNm(), url);
						}
					}
					if(!lv2.isEmpty()) {
						lv1.put(dm.getMenuNm(), lv2);
					}else {
						String url = "";
						if(dm.getChkURL().contains("http")){
							url = "window.bridge.openWeb('"+dm.getChkURL()+"')";
						}else {
							url = "location.href='"+dm.getChkURL()+"'";
						}
						lv1.put(dm.getMenuNm(), url);
					}
										
				}
			}
			cate.put(hm.getMenuNm(),lv1);
		}
		model.addAttribute("categoryList", cate);
		
		
		return "jsonView";
	}
    
}
