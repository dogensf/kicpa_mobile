package adminwork.kicpa.notice.web;


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
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.notice.service.NoticeService;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/notice")
public class NoticeController {


	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;

	@Resource(name = "noticeService")
	NoticeService noticeService;

	@RequestMapping(value = "/boardList.do")
	public String boardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/notice/boardList";
	}



	@RequestMapping(value="/getNewsList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 10);
	        List<EgovMap> list = noticeService.selectNewsList(map);

	        int totalCnt = noticeService.selectNewsListCnt(map);

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



}
