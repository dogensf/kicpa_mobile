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
import net.sf.json.JSONArray;
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
		
		//홈버튼 생성
		List<BottomsVO> bottom = apiService.selectBottomList(vo);
		for(int i=0; i < bottom.size(); i++) {
			/*if(bottom.get(i).getUrl().contains("http")){
				bottom.get(i).setUrl("javascript:window.bridge.newWebView('kicpaHome','"+bottom.get(i).getUrl()+"','')");
				
			}else {*/
				bottom.get(i).setUrl(bottom.get(i).getUrl());				
			//}
		}
		
		model.addAttribute("bottomList", bottom);
		
		//기본 즐겨 찾기 생성
		List<FavoritesVO> Mfavor = apiService.selectMyFavorList(vo);		
		for(int i=0; i < Mfavor.size(); i++) {
			if(Mfavor.get(i).getUrl().contains("http")){
				Mfavor.get(i).setUrl("window.bridge.newWebView('kicpaFavor','"+Mfavor.get(i).getUrl()+"','')");
				
			}else {
				Mfavor.get(i).setUrl("location.href='"+Mfavor.get(i).getUrl()+"'");				
			}
		}
		model.addAttribute("myFavorites", Mfavor);
		
		//favoritesList
		List<FavoritesVO> Hfavor = apiService.selectFavorListHead(vo);
		List<FavoritesVO> Lfavor = apiService.selectFavorList(vo);
		JSONArray fArr = new JSONArray();
		JSONObject favor = new JSONObject();
		JSONArray mArr = new JSONArray();
		JSONObject mlist = new JSONObject();
		
		for(FavoritesVO hfm:Hfavor) {
			favor = new JSONObject();
			
			mArr = new JSONArray();
			for(FavoritesVO lfm:Lfavor) {
				mlist = new JSONObject();
				if(hfm.getName().equals(lfm.getUpperName())) {
					mlist.put("name", lfm.getName());
					mlist.put("img",lfm.getImg());
					if(lfm.getUrl().contains("http")){						
						mlist.put("url", "window.bridge.newWebView('kicpafav','"+lfm.getUrl()+"','')");
					}else {
						mlist.put("url", "location.href='"+lfm.getUrl()+"'");
					}
					mArr.add(mlist);
				}			
			}	
			favor.put("name", hfm.getName());
			favor.put("list", mArr);
			fArr.add(favor);
		}
		model.addAttribute("favoritesList", fArr);	
			
		
		
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
								url = "javascript:window.bridge.newWebView('kicpa','"+dm2.getChkURL()+"','')";
							}else if(dm2.getProgrmStrePath().equals("open")) {
								url = "javascript:window.open('"+dm2.getChkURL()+"')";
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
							url = "javascript:window.bridge.newWebView('kicpa','"+dm.getChkURL()+"','')";
						}else if(dm.getProgrmStrePath().equals("open")) {
							url = "javascript:window.open('"+dm.getChkURL()+"')";
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
