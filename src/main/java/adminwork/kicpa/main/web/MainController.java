package adminwork.kicpa.main.web;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
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
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.notice.service.NoticeService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/main")
public class MainController {

	@Resource(name = "commonBoardService")
	private CommonBoardService commonBoardService;

	@Resource(name = "jobAdvertisementService")
	private JobAdvertisementService jobAdvertisementService;

	@Resource(name = "noticeService")
	NoticeService noticeService;


	@RequestMapping(value = "/main.do")
	public String main(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		List<EgovMap> boardList = null;
		int totalCnt;


        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
        map.put("pageSize", 3);

        map.put("boardId", "noti");
        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
        }else {
        	boardList = commonBoardService.selectCommonBoardList(boardMaster);
        }

        List<EgovMap> jobBoardList = jobAdvertisementService.selectBoardList(map);

        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
        jobBoardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//        StringUtil.checkMapReplaceHtml(boardDetail);

        model.addAttribute("jobBoardList", jobBoardList);


		model.addAttribute("boardList", boardList);
		model.addAttribute("boardMaster", boardMaster);
		model.addAttribute("isLogin", isAuthenticated);

		return "kicpa/main/main";
	}


	@RequestMapping(value="/getJobBoardList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 3);
	        List<EgovMap> list = jobAdvertisementService.selectBoardList(map);



	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//	        StringUtil.checkMapReplaceHtml(boardDetail);

			modelAndView.addObject("boardList", list);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }


	@RequestMapping(value="/getNewsList.do")
    public ModelAndView getNewsList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 3);
	        List<EgovMap> list = noticeService.selectNewsList(map);


	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//	        StringUtil.checkMapReplaceHtml(boardDetail);

			modelAndView.addObject("boardList", list);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	// boardId가 다수일때
		@RequestMapping(value="/getCommonBoardArrList.do")
	    public ModelAndView getBoardArrList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
			ModelAndView modelAndView = new ModelAndView();

	    	try{
	    		modelAndView.setViewName("jsonView");

	    		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {

		    		List<EgovMap> boardList = null;
		    		int totalCnt;


			        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
			        map.put("pageSize", 3);

			        map.put("boardIds", StringUtil.isNullToString(map.get("boardId"),"").split("/"));


			        boardList = commonBoardService.selectCommonBoardIdArrList(map);
			        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));

					modelAndView.addObject("boardList", boardList);
					modelAndView.addObject("pageIndex", map.get("pageIndex"));
					modelAndView.addObject("isLogin", true);

	     		}else {
	    			modelAndView.addObject("isLogin", false);
	    		}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}

	        return modelAndView;
	    }


		@RequestMapping(value="/getCommonBoardList.do")
	    public ModelAndView getCommonBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
			ModelAndView modelAndView = new ModelAndView();

	    	try{
	    		modelAndView.setViewName("jsonView");

	    		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {

	    			if(isAuthenticated) {
	    				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	    				map.put("userId", user.getId());
	    			}

		    		List<EgovMap> boardList = null;


			        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
			        map.put("pageSize", 3);

			        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

			        //param를 boardmaster맵으로 merge
			        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

			        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
			        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
			        }else {
			        	boardList = commonBoardService.selectCommonBoardList(boardMaster);

			        }

			        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
					modelAndView.addObject("boardList", boardList);
					modelAndView.addObject("boardMaster", boardMaster);
					modelAndView.addObject("pageIndex", map.get("pageIndex"));
					modelAndView.addObject("isLogin", true);

	    		}else {
	    			modelAndView.addObject("isLogin", false);
	    		}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}

	        return modelAndView;
	    }


		@RequestMapping(value = "/scheduleDetail.do")
		public String scheduleDetail(@RequestParam("type") String type,@RequestParam("month") String month, HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
			


			model.addAttribute("type", type);
			model.addAttribute("month", month);
			

			return "kicpa/mainDetail/scheduleDetail";
		}
		
}
