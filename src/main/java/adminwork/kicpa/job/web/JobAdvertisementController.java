package adminwork.kicpa.job.web;


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
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/job")
public class JobAdvertisementController {

	@Resource(name = "jobAdvertisementService")
	private JobAdvertisementService jobAdvertisementService;

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;


	@RequestMapping(value = "/boardList.do")
	public String boardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		map.put("codeId", "COMP_TYP");
		List<EgovMap> codeList = kicpaCommService.selectCodebaseList(map);

		model.addAttribute("codeList",codeList);
		return "kicpa/job/boardList";
	}

	@RequestMapping(value = "/boardDetail.do")
	public String boardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		try {
			jobAdvertisementService.updateBoardReadcount(map);
			EgovMap boardDetail = jobAdvertisementService.selectBoardDetail(map);
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
	        List<EgovMap> list = jobAdvertisementService.selectBoardList(map);

	        int totalCnt = jobAdvertisementService.selectBoardListCnt(map);


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

			List<EgovMap> hireCodeList = null;
			map.put("codeId", "EMP_TYP"); // 채용구분 일반
			List<EgovMap> empCodeList = kicpaCommService.selectCodebaseList(map);
			map.put("codeTag2", null);


			if("".equals(codeTag2)) {
				map.put("codeId", "HIRE_TYP"); // 채용구분
				hireCodeList = kicpaCommService.selectCodebaseList(map);
			}
			map.put("codeId", "DIST_CLS");  //근무지역
			List<EgovMap> distCodeList = kicpaCommService.selectCodebaseList(map);
//			map.put("codeId", "EMP_TYP"); //채용구분 CPA
//			map.put("codeTag2", "CPA");
//			List<EgovMap> empCpaCodeList = kicpaCommService.selectCodebaseList(map);

			modelAndView.addObject("hireCodeList",hireCodeList);
			modelAndView.addObject("distCodeList",distCodeList);
			modelAndView.addObject("empCodeList",empCodeList);

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
