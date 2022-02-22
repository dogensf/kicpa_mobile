package adminwork.kicpa.counselCenter.web;


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
import adminwork.kicpa.counselCenter.service.CounselCenterService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/counselCenter")
public class CounselCenterController {

	@Resource(name = "counselCenterService")
	private CounselCenterService counselCenterService;

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;


	@RequestMapping(value = "/declarationBoardList.do")
	public String declarationBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/declarationBoardList";
	}

	@RequestMapping(value = "/counselBoardList.do")
	public String counselBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		map.put("codeId", "TAX_CONST_CATE");
		List<EgovMap> codeList = kicpaCommService.selectCodebaseList(map);

		model.addAttribute("codeList",codeList);

		return "kicpa/counselCenter/counselBoardList";
	}

	@RequestMapping(value = "/kifrsBoardList.do")
	public String kifrsBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/kifrsBoardList";
	}

	@RequestMapping(value = "/nonExtBoardList.do")
	public String nonExtBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/nonExtBoardList";
	}

	@RequestMapping(value = "/smpBoardList.do")
	public String smpBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/smpBoardList";
	}

	@RequestMapping(value = "/suggestBoardList.do")
	public String suggestBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/suggestBoardList";
	}


	@RequestMapping(value = "/counselBoardDetail.do")
	public String counselBoardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		EgovMap boardDetail = null;

		boardDetail = counselCenterService.selectMemberCounselBoardDetail(map);
		counselCenterService.updateMemberCounselBoardReadCnt(map);

//		StringUtil.checkMapReplaceHtml(boardDetail);
		model.addAttribute("boardDetail", boardDetail);

		return "kicpa/counselCenter/counselBoardDetail";
	}

	@RequestMapping(value = "/declarationBoardDetail.do")
	public String boardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		EgovMap boardDetail = null;

		boardDetail = counselCenterService.selectDeclarationBoardDetail(map);
		counselCenterService.updateDeclarationBoardReadCnt(map);
//		StringUtil.checkMapReplaceHtml(boardDetail);
        model.addAttribute("boardDetail", boardDetail);

		return "kicpa/counselCenter/declarationBoardDetail";
	}


	@RequestMapping(value="/getDeclarationBoardList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 10);
	        List<EgovMap> list = counselCenterService.selectDeclarationBoardList(map);

	        int totalCnt = counselCenterService.selectDeclarationBoardListCnt(map);
	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("boardList", list);
			modelAndView.addObject("totalCnt", totalCnt);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	@RequestMapping(value="/getCounselBoardList.do")
	public ModelAndView getCounselBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
			map.put("pageSize", 10);
			List<EgovMap> list = counselCenterService.selectMemberCounselBoardList(map);

			int totalCnt = counselCenterService.selectMemberCounselBoardListCnt(map);
			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("boardList", list);
			modelAndView.addObject("totalCnt", totalCnt);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/insertMemberCounselBoardMemo.do")
	public ModelAndView insertMemberCounselBoardMemo(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			map.put("memoCntt",StringUtil.isNullToString(map.get("memoCntt")).replaceAll("\n", "<br>"));
			map.put("userId", "cks6451");
			map.put("userNick", "관리자");
			counselCenterService.insertMemberCounselBoardMemo(map);
			List<EgovMap> memoList = counselCenterService.selectMemberCounselBoardMemoList(map);
			memoList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("memoList", memoList);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


}
