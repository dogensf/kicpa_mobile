package adminwork.kicpa.introduction.web;


import java.io.File;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;



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
		return "kicpa/introduction/boardList";
	}
	@RequestMapping(value = "/vision.do")
	public String vision(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/introduction/vision";
	}
	@RequestMapping(value = "/greetings.do")
	public String greetings(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/introduction/greetings";
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
