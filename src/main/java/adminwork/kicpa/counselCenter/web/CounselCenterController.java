package adminwork.kicpa.counselCenter.web;


import java.io.File;
import java.util.HashMap;
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
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.counselCenter.service.CounselCenterService;
import egovframework.rte.fdl.property.EgovPropertyService;
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

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;


	
	@RequestMapping(value = "/counselCenterCategory.do")
	public String counselCenterCategory(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/counselCenter/counselCenterCategory";
	}
	
	@RequestMapping(value = "/declarationBoardList.do")
	public String declarationBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "실명신고");
		if(isAuthenticated) {
			return "kicpa/counselCenter/declarationBoardList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/counselCenter/declarationBoardList.do");
			return "kicpa/common/authLogin";
		}
	}

	@RequestMapping(value = "/declarationPrize.do")
	public String declarationPrize(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/counselCenter/declarationPrize";
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
			model.addAttribute("returnUrl", "/kicpa/counselCenter/counselBoardList.do");
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/declarationStep1.do")
	public String declarationStep1(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			model.addAttribute("gubun", "nonAnonymous");
			return "kicpa/counselCenter/declarationStep1";
		}else {
			model.addAttribute("returnUrl", "/kicpa/counselCenter/declarationStep1.do");
			return "kicpa/common/authLogin";
		}

	}
	@RequestMapping(value = "/declarationStep2.do")
	public String declarationStep2(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			model.addAttribute("gubun", "nonAnonymous");
			return "kicpa/counselCenter/declarationStep2";
		}else {
			model.addAttribute("returnUrl", "/kicpa/counselCenter/declarationStep1.do");
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/anonDeclarationStep1.do")
	public String anonDeclarationStep1(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/counselCenter/anonDeclarationStep1";
	}
	@RequestMapping(value = "/anonDeclarationStep2.do")
	public String anonDeclarationStep2(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		model.addAttribute("gubun", "anonymous");
		return "kicpa/counselCenter/anonDeclarationStep2";
	}

	@RequestMapping(value = "/kifrsBoardList.do")
	public String kifrsBoardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회계기준 회원상담 (K-IFRS상담)");
		if(isAuthenticated) {
			return "kicpa/counselCenter/kifrsBoardList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/counselCenter/kifrsBoardList.do");
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
			model.addAttribute("returnUrl", "/kicpa/counselCenter/nonExtBoardList.do");
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
			model.addAttribute("returnUrl", "/kicpa/counselCenter/smpBoardList.do");
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
			model.addAttribute("returnUrl", "/kicpa/counselCenter/suggestBoardList.do");
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/boardForm.do")
	public String boardForm(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			model.addAttribute("loginVO", user);
			return "kicpa/counselCenter/boardForm";
		}else {
			if("kifrs".equals(StringUtil.isNullToString(map.get("boardId")))) {
				model.addAttribute("returnUrl", "/kicpa/counselCenter/kifrsBoardList.do");
			}else if("nonextaudit01".equals(StringUtil.isNullToString(map.get("boardId")))) {
				model.addAttribute("returnUrl", "/kicpa/counselCenter/nonExtBoardList.do");
			}else if("smpadt".equals(StringUtil.isNullToString(map.get("boardId")))) {
				model.addAttribute("returnUrl", "/kicpa/counselCenter/smpBoardList.do");
			}else if("sugt01".equals(StringUtil.isNullToString(map.get("boardId")))) {
				model.addAttribute("returnUrl", "/kicpa/counselCenter/suggestBoardList.do");
			}else {
				model.addAttribute("returnUrl", "/kicpa/main/main.do");
			}

			return "kicpa/common/authLogin";
		}


	}

	@RequestMapping(value = "/counselBoardForm.do")
	public String counselBoardForm(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			model.addAttribute("loginVO", user);
			return "kicpa/counselCenter/counselBoardForm";
		}else {
			model.addAttribute("returnUrl", "/kicpa/counselCenter/counselBoardList.do");
			return "kicpa/common/authLogin";
		}


	}


	@RequestMapping(value = "/counselBoardDetail.do")
	public String counselBoardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		EgovMap boardDetail = null;

		boardDetail = counselCenterService.selectMemberCounselBoardDetail(map);
		counselCenterService.updateMemberCounselBoardReadCnt(map);

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			model.addAttribute("loginVO", user);
		}


//		StringUtil.checkMapReplaceHtml(boardDetail);
		model.addAttribute("boardDetail", boardDetail);

		return "kicpa/counselCenter/counselBoardDetail";
	}

	@RequestMapping(value = "/declarationBoardDetail.do")
	public String boardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		EgovMap boardDetail = null;
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			map.put("userId", user.getId());
			boardDetail = counselCenterService.selectDeclarationBoardDetail(map);
			counselCenterService.updateDeclarationBoardReadCnt(map);
		}

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
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("userId", user.getId());
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
    			modelAndView.addObject("returnUrl", "/kicpa/counselCenter/declarationBoardList.do");
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
    			modelAndView.addObject("returnUrl", "/kicpa/counselCenter/counselBoardList.do");
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
			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("memoCntt",StringUtil.isNullToString(map.get("memoCntt")).replaceAll("\n", "<br>"));
				map.put("userNick", user.getName());
				map.put("userId", user.getId());
				counselCenterService.insertMemberCounselBoardMemo(map);

			}
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

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("actionCd", "01" );
				map.put("entityName", "BULLETIN.BLTN_GN" );
				map.put("userPass", user.getUniqId());
				map.put("userNick", user.getName());
				map.put("userId", user.getId());
				map.put("userIp", request.getRemoteAddr());
				map.put("bltnTopTag", "N");


				map.put("bltnSecretYn", StringUtil.isNullToString(map.get("bltnSecretYn"),"N") );
				map.put("bltnPermitYn", "Y");

				if(!"".equals(StringUtil.isNullToString(map.get("phoneNumber1"))) && !"".equals(StringUtil.isNullToString(map.get("phoneNumber2"))) && !"".equals(StringUtil.isNullToString(map.get("phoneNumber3"))) ) {
					map.put("extStr6", StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")));
				}
				map.put("extStr7",null); // kp:cpaId userId="${_enview_info_.userId}"/>


//				List<HashMap<String,Object>> fileList = null;


				if("Y".equals(map.get("bltnSecretYn"))) {
					map.put("bltnIcon", "D");
//				}else if(fileList != null && !fileList.isEmpty() ) {
//					map.put("bltnIcon", "B");
//					map.put("bltnFileCnt", fileList.size());
				}else {
					map.put("bltnIcon", "A");
					map.put("bltnFileCnt", 0);
				}


				commonBoardService.insertCommonBoard(map);

			}

//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/insertMemberCounselBoard.do")
	public ModelAndView insertMemberCounselBoard(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("userNick", user.getName());
				map.put("userId", user.getId());
				System.out.println(map);
				if(!"".equals(StringUtil.isNullToString(map.get("phoneNumber1"))) && !"".equals(StringUtil.isNullToString(map.get("phoneNumber2"))) && !"".equals(StringUtil.isNullToString(map.get("phoneNumber3"))) ) {
					map.put("userTelNo", StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")));
				}

				counselCenterService.insertMemberCounselBoard(map);

			}


		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}



	@RequestMapping(value="/insertDeclarationBoard.do")
	public ModelAndView insertDeclarationBoard(@RequestParam Map<String,Object> map, HttpServletRequest request,MultipartHttpServletRequest multipart) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if("nonAnonymous".equals(map.get("gubun"))) {
				if(isAuthenticated) {
					LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
					map.put("userId", user.getId());
					map.put("arWname", user.getName());
				}
			}else {
				map.put("userId", "-");
			}


			map.put("arReport0", StringUtil.isNullToString(map.get("arReport0"),"0"));
			map.put("arReport1", StringUtil.isNullToString(map.get("arReport1"),"0"));
			map.put("arReport2", StringUtil.isNullToString(map.get("arReport2"),"0"));
			map.put("arReport3", StringUtil.isNullToString(map.get("arReport3"),"0"));
			map.put("arTelSmsYn", StringUtil.isNullToString(map.get("arTelSmsYn"),"0"));
			map.put("arIp", request.getRemoteAddr());


			if(!"".equals(StringUtil.isNullToString(map.get("phone1"))) && !"".equals(StringUtil.isNullToString(map.get("phone2"))) && !"".equals(StringUtil.isNullToString(map.get("phone3"))) ) {
				map.put("arTel", StringUtil.isNullToString(map.get("phone1"))+"-"+StringUtil.isNullToString(map.get("phone2"))+"-" +StringUtil.isNullToString(map.get("phone3")));
			}


			List<HashMap<String,Object>> fileList =fileUtil.parseFileInfMap(request,multipart, "upload"+File.separator+"accreport"+File.separator);
			map.put("fileList", fileList);

			System.out.println(fileList);
			counselCenterService.insertDeclarationBoard(map);

			modelAndView.addObject("isLogin", isAuthenticated);

//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value = "/fileDownload.do")
	public void fileDownload(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			EgovMap fileDetail =  counselCenterService.selectDeclarationBoardFile(map);

			String path = propertyService.getString("Globals.fileStorePath")+File.separator+ "upload"+File.separator+"accreport"+File.separator+fileDetail.get("hostFilename");
			fileUtil.downFile(response,  path, String.valueOf(fileDetail.get("filename")));

		}catch (Exception e) {
			e.printStackTrace();
		}

	}



	@RequestMapping(value = "/rewardInfo.do")
	public String setInfo(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{


		return "kicpa/counselCenter/rewardInfo";
	}



}
