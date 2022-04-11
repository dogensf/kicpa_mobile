package adminwork.kicpa.qna.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.qna.service.QnaService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
public class QnaController {

	@Resource(name = "QnaService")
	private QnaService qnaService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "FileMngService")
	private FileMngService fileMngService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;



    /**
	 * XSS 방지 처리.
	 *
	 * @param data
	 * @return
	 */
	protected String unscript(String data) {
		if (data == null || data.trim().equals("")) {
			return "";
		}

		String ret = data;

		ret = ret.replaceAll("<(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;script");
		ret = ret.replaceAll("</(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;/script");

		ret = ret.replaceAll("<(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;object");
		ret = ret.replaceAll("</(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;/object");

		ret = ret.replaceAll("<(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;applet");
		ret = ret.replaceAll("</(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;/applet");

		ret = ret.replaceAll("<(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");
		ret = ret.replaceAll("</(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");

		ret = ret.replaceAll("<(F|f)(O|o)(R|r)(M|m)", "&lt;form");
		ret = ret.replaceAll("</(F|f)(O|o)(R|r)(M|m)", "&lt;form");

		return ret;
	}

//
//	@RequestMapping(value = "/kicpa/qna/reqQna.do")
//	public String reqQna(String Pin,@RequestBody Map<String,Object> map, ModelMap model, HttpServletRequest request)
//	  throws Exception{
//
//		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
//
//		if (isAuthenticated) {
//			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
//			if(Pin != null && user.getId() != Pin) {
//				System.out.println("pin========="+Pin);
//				model.addAttribute("id", Pin);
//				model.addAttribute("url", "/kicpa/qna/reqQna.do");
//				return "uat/uia/LoginSso";
//			}
//
//			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
//			qnaVO.setPin(user.getId());
//			model.addAttribute("ccode",cmmUseService.getCsCmmCodeAll());
//		    model.addAttribute("qnaVO",qnaVO);
//		    return "kicpa/qna/reqQna";
//		}else {
//			System.out.println("pin========="+Pin);
//			model.addAttribute("id", Pin);
//			model.addAttribute("url", "/kicpa/qna/reqQna.do");
//			return "redirect:/uat/uia/LoginUsr.do";
//		}
//
//
//
//
//	}

	@RequestMapping(value = "/kicpa/qna/insertQna.do")
	public ModelAndView insertQna(@RequestBody Map<String,Object> map, ModelMap model, HttpServletRequest request)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());

			map.put("pin", user.getUniqId());
			qnaService.insertQna(map);
			//modelAndView.addObject("resultCd", "200");

		}
		return modelAndView;

	}


	@RequestMapping(value = "/kicpa/qna/qnaList.do")
	public String qnaResult(@RequestParam Map<String,Object> map, ModelMap model, HttpServletRequest request)
	  throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
//			if(Pin != null && user.getId() != Pin) {
//				System.out.println("pin========="+Pin);
//				model.addAttribute("id", Pin);
//				model.addAttribute("url", "/kicpa/qna/qnaResult.do");
//				return "uat/uia/LoginSso";
//			}
//			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
//			PaginationInfo paginationInfo = new PaginationInfo();
//
//			paginationInfo.setCurrentPageNo(qnaVO.getPageIndex());
//			paginationInfo.setRecordCountPerPage(qnaVO.getPageUnit());
//			paginationInfo.setPageSize(qnaVO.getPageSize());
//
//
//			qnaVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
//			qnaVO.setLastIndex(paginationInfo.getLastRecordIndex());
//			qnaVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
//
//
//			qnaVO.setPin(user.getId());
//			Map<String, Object> map = qnaService.selectQnaLists(qnaVO);
//			int totCnt = Integer.parseInt((String) map.get("resultCnt"));
//			paginationInfo.setTotalRecordCount(totCnt);
//
//			model.addAttribute("resultList", map.get("resultList"));
//			model.addAttribute("resultCnt", map.get("resultCnt"));
//			model.addAttribute("searchVO", qnaVO);
//			model.addAttribute("paginationInfo", paginationInfo);
			model.addAttribute("isLogin",isAuthenticated);
			return "kicpa/qna/qnaList";
		}else {
//			System.out.println("pin========="+Pin);
//			model.addAttribute("id", Pin);
			model.addAttribute("returnUrl", "/kicpa/qna/qnaList.do");
			return "redirect:/uat/uia/LoginUsr.do";
		}

	}
	@RequestMapping(value = "/kicpa/qna/qnaForm.do")
	public String qnaForm(@RequestParam Map<String,Object> map, ModelMap model, HttpServletRequest request)
			throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			model.addAttribute("isLogin",isAuthenticated);
			model.addAttribute("ccode",qnaService.selectCsCodeGroup1List());
			return "kicpa/qna/qnaForm";
		}else {
//			System.out.println("pin========="+Pin);
//			model.addAttribute("id", Pin);
			model.addAttribute("returnUrl", "/kicpa/qna/qnaList.do");
			return "redirect:/uat/uia/LoginUsr.do";
		}

	}

	@RequestMapping(value = "/kicpa/qna/qnaDetail.do")
	public String qnaResultDetail(@RequestParam Map<String,Object> map, ModelMap model, HttpServletRequest request)
	  throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

			map.put("pin", user.getUniqId());
			EgovMap result = qnaService.selectQna(map);
			model.addAttribute("result", result);
			return "kicpa/qna/qnaDetail";
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}

	}

	@RequestMapping(value="/kicpa/qna/getQnaList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");

	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    		if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("userId", user.getId());
				map.put("pin", user.getUniqId());
		        map.put("pageIndex", Integer.parseInt(StringUtil.isNullToString(map.get("pageIndex"), "1")));
		        map.put("pageSize", 10);
		        qnaService.selectQnaLists(map);
		        List<EgovMap> faqList = (List<EgovMap>) map.get("resultList");
		        String totalCnt = (String) map.get("resultCnt");
		        faqList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("boardList", faqList);
				modelAndView.addObject("totalCnt", totalCnt);
				modelAndView.addObject("pageIndex", map.get("pageIndex"));
				modelAndView.addObject("isLogin", true);
    		}else {
    			modelAndView.addObject("returnUrl", "/kicpa/qna/qnaList.do");
    			modelAndView.addObject("isLogin", false);
    		}
    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }


	@RequestMapping(value="/kicpa/qna/getQnaSearchType1.do")
	public ModelAndView getQnaSearchType1(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			modelAndView.addObject("ccode",qnaService.selectCsCodeGroup1List());
		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}
	@RequestMapping(value="/kicpa/qna/getQnaSearchType2.do")
	public ModelAndView getQnaSearchType2(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			modelAndView.addObject("ccode",qnaService.selectCsCodeGroup2List(map));
		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}




}
