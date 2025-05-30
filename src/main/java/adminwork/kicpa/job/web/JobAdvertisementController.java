package adminwork.kicpa.job.web;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/job")
public class JobAdvertisementController {

	@Resource(name = "jobAdvertisementService")
	private JobAdvertisementService jobAdvertisementService;

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;


	@RequestMapping(value = "/boardList.do")
	public String boardList(@RequestParam Map<String,Object> map,@RequestParam(name = "boardId",required=false) String boardId,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		map.put("codeId", "COMP_TYP");
		List<EgovMap> codeList = kicpaCommService.selectCodebaseList(map);

		map.put("codeId", "EMP_NEW_TYP");
		List<EgovMap> codeList2 = kicpaCommService.selectCodebaseList(map);

		model.addAttribute("codeList",codeList);
		model.addAttribute("codeList2",codeList2);
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(!isAuthenticated) {
			if("jobInfoKicpa".equals(boardId)) {
				Cookie cookie = new Cookie("returnUrl", "/kicpa/job/boardList.do?boardId=jobInfoKicpa");
    			cookie.setPath("/");
    			cookie.setMaxAge(60*60);
    			response.addCookie(cookie);
			}
		}
		return "kicpa/job/boardList";
	}

	@RequestMapping(value = "/boardDetail.do")
	public String boardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		try {
			jobAdvertisementService.updateBoardReadcount(map);
			EgovMap boardDetail = jobAdvertisementService.selectBoardDetail(map);

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				model.addAttribute("loginVO", user);
			}

//			StringUtil.checkMapReplaceHtml(boardDetail);
			model.addAttribute("boardDetail",boardDetail);
		}catch (Exception e) {
			e.printStackTrace();
		}

		return "kicpa/job/boardDetail";
	}



	@RequestMapping(value="/getBoardList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 10);

			List<EgovMap> list = new ArrayList<>();
			int totalCnt = 0;

			/*공인회계사, 일반*/
	        if(!"8".equals(map.get("ijJobSep"))){

				list = jobAdvertisementService.selectBoardList(map);

				totalCnt = jobAdvertisementService.selectBoardListCnt(map);
			}
	        /*수습CPA*/
	        else{

				list = jobAdvertisementService.selectBoardList2(map);

				totalCnt = jobAdvertisementService.selectBoardListCnt2(map);
			}


	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//	        StringUtil.checkMapReplaceHtml(boardDetail);

			modelAndView.addObject("boardList", list);
			modelAndView.addObject("totalCnt", totalCnt);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	@RequestMapping(value="/getSearchTypeList.do")
	public ModelAndView getCodeList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");

			String codeTag2 = StringUtil.isNullToString(map.get("codeTag2"));

			List<EgovMap> empCodeList = null;
			List<EgovMap> hireCodeList = null;
			List<EgovMap> distCodeList = null;
			List<EgovMap> compCodeList = null;

			if(!"수습CPA".equals(codeTag2)) {
				map.put("codeId", "EMP_TYP"); // 채용구분 일반
				empCodeList = kicpaCommService.selectCodebaseList(map);
				map.put("codeTag2", null);


				if("".equals(codeTag2)) {
					map.put("codeId", "HIRE_TYP"); // 채용구분
					hireCodeList = kicpaCommService.selectCodebaseList(map);
				}
			}
			else{
				map.put("codeId", "COMP_TYP"); // 회사구분
				compCodeList = kicpaCommService.selectCodebaseList(map);
				map.put("codeTag2", null);
			}
			map.put("codeId", "DIST_CLS");  //근무지역
			distCodeList = kicpaCommService.selectCodebaseList(map);
//			map.put("codeId", "EMP_TYP"); //채용구분 CPA
//			map.put("codeTag2", "CPA");
//			List<EgovMap> empCpaCodeList = kicpaCommService.selectCodebaseList(map);

			modelAndView.addObject("hireCodeList",hireCodeList);
			modelAndView.addObject("distCodeList",distCodeList);
			modelAndView.addObject("empCodeList",empCodeList);
			modelAndView.addObject("compCodeList",compCodeList);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/getMemberPollList.do")
	public ModelAndView getMemberPollList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			List<EgovMap> list = jobAdvertisementService.selectMemberPollList(map);

			int totalCnt = jobAdvertisementService.selectMemberPollListCnt(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));

			modelAndView.addObject("boardList", list);
			modelAndView.addObject("totalCnt", totalCnt);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}






}
