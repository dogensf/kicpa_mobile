package adminwork.kicpa.qna.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.com.cmm.service.FileVO;
import adminwork.kicpa.qna.service.Qna;
import adminwork.kicpa.qna.service.QnaService;
import adminwork.kicpa.qna.service.QnaVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

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

	
	@RequestMapping(value = "/kicpa/qna/reqQna.do")
	public String reqQna(String Pin,@ModelAttribute("searchVO") QnaVO qnaVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			if(Pin != null && user.getId() != Pin) {
				System.out.println("pin========="+Pin);
				model.addAttribute("id", Pin);
				model.addAttribute("url", "/kicpa/qna/reqQna.do");
				return "uat/uia/LoginSso";
			}
			
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
			qnaVO.setPin(user.getId());			
			model.addAttribute("ccode",cmmUseService.getCsCmmCodeAll());
		    model.addAttribute("qnaVO",qnaVO);
		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/qna/reqQna.do");
			return "uat/uia/LoginSso";
		}
		
		
		
		return "kicpa/qna/reqQna";
	}
	
	@RequestMapping(value = "/kicpa/qna/insertQna.do")
	public String insertQna(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") QnaVO qnaVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		//ModelAndView modelAndView = new ModelAndView();
        //modelAndView.setViewName("jsonView");  
        
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
			List<FileVO> result = null;
			String atchFileId = "";

			qnaVO.setPin(user.getId());		
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			if (!files.isEmpty()) {
				result = fileUtil.parseFileInf(files, "qna_", 0, "", "");
				atchFileId = fileMngService.insertFileInfs(result);
			}
			qnaVO.setAtch_file_id(atchFileId);
			qnaService.insertQna(qnaVO);
			//modelAndView.addObject("resultCd", "200");		
	         
		}else {
			//modelAndView.addObject("resultCd", "500");		
			return "redirect:/uat/uia/LoginUsr.do";
		}
		//return modelAndView;
		
		return "redirect:/kicpa/qna/qnaResult.do";
	}
	
	
	@RequestMapping(value = "/kicpa/qna/qnaResult.do")
	public String qnaResult(String Pin,@ModelAttribute("searchVO") QnaVO qnaVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			if(Pin != null && user.getId() != Pin) {
				System.out.println("pin========="+Pin);
				model.addAttribute("id", Pin);
				model.addAttribute("url", "/kicpa/qna/qnaResult.do");
				return "uat/uia/LoginSso";
			}
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
			PaginationInfo paginationInfo = new PaginationInfo();

			paginationInfo.setCurrentPageNo(qnaVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(qnaVO.getPageUnit());
			paginationInfo.setPageSize(qnaVO.getPageSize());
			
			
			qnaVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			qnaVO.setLastIndex(paginationInfo.getLastRecordIndex());
			qnaVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
			
			
			qnaVO.setPin(user.getId());
			Map<String, Object> map = qnaService.selectQnaLists(qnaVO);
			int totCnt = Integer.parseInt((String) map.get("resultCnt"));
			paginationInfo.setTotalRecordCount(totCnt);
			
			model.addAttribute("resultList", map.get("resultList"));
			model.addAttribute("resultCnt", map.get("resultCnt"));
			model.addAttribute("searchVO", qnaVO);
			model.addAttribute("paginationInfo", paginationInfo);
			model.addAttribute("ccode",cmmUseService.getCsCmmCodeAll());
		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/qna/qnaResult.do");
			return "uat/uia/LoginSso";
		}
		
		
		
		
		return "kicpa/qna/qnaResult";
	}
	
	@RequestMapping(value = "/kicpa/qna/qnaResultDetail.do")
	public String qnaResultDetail(@ModelAttribute("searchVO") QnaVO qnaVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			
			qnaVO.setPin(user.getId());
			Qna result = qnaService.selectQna(qnaVO);		
			model.addAttribute("result", result);
			model.addAttribute("searchVO", qnaVO);		
			model.addAttribute("ccode",cmmUseService.getCsCmmCodeAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}
		
		
		
		
		return "kicpa/qna/qnaResultDetail";
	}
	
	
	
}
