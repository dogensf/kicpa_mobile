package adminwork.kicpa.faq.web;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.faq.service.Faq;
import adminwork.kicpa.faq.service.FaqService;
import adminwork.kicpa.faq.service.FaqVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
public class FaqController {
	
	@Resource(name = "FaqService")
	private FaqService faqService;
	
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

	@RequestMapping(value = "/kicpa/faq/faqList.do")
	public String faq(String Pin, @ModelAttribute("searchVO") FaqVO faqVO,ModelMap model, HttpServletRequest request)
	  throws Exception{				
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			if(Pin != null && user.getId() != Pin) {
				System.out.println("pin========="+Pin);
				model.addAttribute("id", Pin);
				model.addAttribute("url", "/kicpa/faq/faqList.do");
				return "uat/uia/LoginSso";
			}
			System.out.println("==================id :: "+ user.getId());
			PaginationInfo paginationInfo = new PaginationInfo();
	
			paginationInfo.setCurrentPageNo(faqVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(faqVO.getPageUnit());
			paginationInfo.setPageSize(faqVO.getPageSize());
			
			faqVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			faqVO.setLastIndex(paginationInfo.getLastRecordIndex());
			faqVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
	
			Map<String, Object> map = faqService.selectFaqLists(faqVO);
			int totCnt = Integer.parseInt((String) map.get("resultCnt"));
			paginationInfo.setTotalRecordCount(totCnt);
			
			model.addAttribute("resultList", map.get("resultList"));
			model.addAttribute("resultCnt", map.get("resultCnt"));
			model.addAttribute("searchVO", faqVO);
			model.addAttribute("paginationInfo", paginationInfo);
			model.addAttribute("ccode",cmmUseService.getCsCmmCodeAll());
		
		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/faq/faqList.do");
			return "uat/uia/LoginSso";
			
		}
		return "kicpa/faq/faqList";
	}
	
	@RequestMapping(value = "/kicpa/faq/faqDetail.do")
	public String faqDetail(@ModelAttribute("searchVO") FaqVO faqVO,ModelMap model, HttpServletRequest request)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			/*LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			faqVO.setReg_id(user.getId());*/
			
			faqService.updateRdcnt(faqVO);			
			Faq result = faqService.selectFaq(faqVO);
			model.addAttribute("result", result);
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}
		
		
		return "kicpa/faq/fqaDetail";
	}
	
	
	
}
