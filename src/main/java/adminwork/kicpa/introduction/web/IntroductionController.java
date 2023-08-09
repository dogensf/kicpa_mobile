package adminwork.kicpa.introduction.web;


import java.io.File;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;



@Controller
@RequestMapping(value="/kicpa/introduction")
public class IntroductionController {

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;


	@RequestMapping(value = "/boardList.do")
	public String boardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		
		if(isAuthenticated) {
			return "kicpa/introduction/boardList";
		}else {
			model.addAttribute("title", "회무보고");
			
			Cookie cookie = new Cookie("returnUrl", "/kicpa/introduction/boardList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}
		
		
		
	}
	@RequestMapping(value = "/vision.do")
	public String vision(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/introduction/vision";
	}
	@RequestMapping(value = "/greetings.do")
	public String greetings(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/introduction/greetings";
	}

	@RequestMapping(value = "/missionVision.do")
	public String missionVision(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/introduction/missionVision";
	}


	@RequestMapping(value="/ciFileDownload.do")
	public void boardFileDownload(@RequestParam Map<String,Object> map, HttpServletRequest request,HttpServletResponse response) throws Exception{

		try{

//			String path = "https://www.kicpa.or.kr"+File.separator+"upload"+File.separator+"board"+File.separator+"attach"+File.separator+fileDetail.get("boardId")+File.separator+fileDetail.get("fileMask");
			String path = propertyService.getString("Globals.fileStorePath")+File.separator+"attach"+File.separator+File.separator+map.get("fileName");
			fileUtil.downFile(response,path , String.valueOf(map.get("fileName")));

//	        StringUtil.checkMapReplaceHtml(boardDetail);


		}catch (Exception e) {
			e.printStackTrace();
		}

	}

}
