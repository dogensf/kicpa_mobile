package adminwork.kicpa.counselCenter.web;


import java.util.HashMap;
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
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
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
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "실명신고");
		if(isAuthenticated) {
			return "kicpa/counselCenter/declarationBoardList";
		}else {
			return "kicpa/common/authLogin";
		}
	}

	@RequestMapping(value = "/counselBoardList.do")
	public String counselBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("title", "회원전문 세무상담");
		if(isAuthenticated) {
			map.put("codeId", "TAX_CONST_CATE");
			List<EgovMap> codeList = kicpaCommService.selectCodebaseList(map);

			model.addAttribute("isLogin", isAuthenticated);
			model.addAttribute("codeList",codeList);

			return "kicpa/counselCenter/counselBoardList";
		}else {
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/kifrsBoardList.do")
	public String kifrsBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회계기준 회원상담 (K-IFRS상담)");
		if(isAuthenticated) {
			return "kicpa/counselCenter/kifrsBoardList";
		}else {
			return "kicpa/common/authLogin";
		}


	}

	@RequestMapping(value = "/nonExtBoardList.do")
	public String nonExtBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회계기준 회원상담 (비외감대상)");
		if(isAuthenticated) {
			return "kicpa/counselCenter/nonExtBoardList";
		}else {
			return "kicpa/common/authLogin";
		}


	}

	@RequestMapping(value = "/smpBoardList.do")
	public String smpBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회계기준 회원상담 (SMP감사품질)");
		if(isAuthenticated) {
			return "kicpa/counselCenter/smpBoardList";
		}else {
			return "kicpa/common/authLogin";
		}



	}

	@RequestMapping(value = "/suggestBoardList.do")
	public String suggestBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "건의사항");

		if(isAuthenticated) {
			return "kicpa/counselCenter/suggestBoardList";
		}else {
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/boardForm.do")
	public String boardForm(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/boardForm";
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

	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    		if(isAuthenticated) {

		        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
		        map.put("pageSize", 10);
		        List<EgovMap> list = counselCenterService.selectDeclarationBoardList(map);

		        int totalCnt = counselCenterService.selectDeclarationBoardListCnt(map);
		        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("boardList", list);
				modelAndView.addObject("totalCnt", totalCnt);
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

	@RequestMapping(value="/getCounselBoardList.do")
	public ModelAndView getCounselBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    		if(isAuthenticated) {
				map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
				map.put("pageSize", 10);
				List<EgovMap> list = counselCenterService.selectMemberCounselBoardList(map);

				int totalCnt = counselCenterService.selectMemberCounselBoardListCnt(map);
				list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("boardList", list);
				modelAndView.addObject("totalCnt", totalCnt);
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



	@RequestMapping(value="/insertBoard.do")
	public ModelAndView getOfflineEduAppList(@RequestParam Map<String,Object> map, HttpServletRequest request,MultipartHttpServletRequest multipart) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			map.put("actionCd", "01" );
			map.put("entityName", "BULLETIN.BLTN_GN" );
			map.put("userPass", "5650320120323");
			map.put("userNick", "최경수");
			map.put("userId", "cks6451");
			map.put("userIp", request.getRemoteAddr());
			map.put("bltnTopTag", "N");


			map.put("bltnSecretYn", StringUtil.isNullToString(map.get("bltnSecretYn"),"N") );
			map.put("bltnPermitYn", "Y");

			if(!"".equals(StringUtil.isNullToString(map.get("phoneNumber1"))) && !"".equals(StringUtil.isNullToString(map.get("phoneNumber2"))) && !"".equals(StringUtil.isNullToString(map.get("phoneNumber3"))) ) {
				map.put("extStr6", StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")));
			}
			map.put("extStr7",null); // kp:cpaId userId="${_enview_info_.userId}"/>


			List<HashMap<String,Object>> fileList = null;


			if("Y".equals(map.get("bltnSecretYn"))) {
				map.put("bltnIcon", "D");
			}else if(fileList != null && !fileList.isEmpty() ) {
				map.put("bltnIcon", "B");
				map.put("bltnFileCnt", fileList.size());
			}else {
				map.put("bltnIcon", "A");
				map.put("bltnFileCnt", 0);
			}


			commonBoardService.insertCommonBoard(map);

//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}



}
