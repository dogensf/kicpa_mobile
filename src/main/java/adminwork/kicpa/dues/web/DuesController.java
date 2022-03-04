package adminwork.kicpa.dues.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.dues.service.DeusApiService;
import adminwork.kicpa.dues.service.Dues;
import adminwork.kicpa.dues.service.DuesService;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.dues.service.GiroNtic;
import adminwork.kicpa.dues.service.GiroRegVO;
import adminwork.kicpa.dues.service.GiroVO;
import adminwork.let.utl.fcc.service.DateUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

@Controller
public class DuesController {
	
	@Resource(name = "DuesService")
	private  DuesService duesService;
	
	@Resource(name = "DuesApiService")
	private  DeusApiService duesApiService;
	
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

	@RequestMapping(value = "/kicpa/dues/selectDuesList.do")
	public String selectDuesList(String Pin,@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request,HttpServletResponse response)
	  throws Exception{		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);
		
		/*if(Pin != null && user.getId() != Pin) {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/dues/selectDuesList.do");
			return "uat/uia/LoginUsr";
		}*/		
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			System.out.println("========="+user.getId());	
			vo.setCust_inqr_no(user.getId());
			boolean success = true;
			// 합산지로 있는지 체크해서 삭제  TEMP --> PAY_YN = 'N' 취소 처리
			/*List<Dues> tempList = duesService.selectTempDuesList(vo);
			//합산지로 처리한 데이터가 있으면 일단 삭제하고 처리 한다.
			if(tempList.size() > 0) {
				success = false;
				success = duesApiService.cancelNoticeGiro(tempList);
			}
			
			// 지로 수납 조회 
			if(success) {
				Map<String, Object> map = duesService.selectDuesList(vo);			
				model.addAttribute("master", map.get("master"));
				model.addAttribute("detail", map.get("detail"));				
				model.addAttribute("searchVO", vo);			
			}else {
				List<DuesVO> tt = new ArrayList<>();
				model.addAttribute("master", tt);
				model.addAttribute("detail", tt);				
				model.addAttribute("errMsg", "이전 합산지로 정보가 존재합니다. 관리자에게 문의 하세요.");
				model.addAttribute("searchVO", vo);
				
			}*/
		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/dues/selectDuesList.do");
			return "uat/uia/LoginUsr";
			
		}
		
		return "kicpa/dues/selectDuesList";
	}
	
	@RequestMapping(value = "/kicpa/dues/setDuesPayment.do")
	public String setDuesPayment(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request, RedirectAttributes rttr)
	  throws Exception{
		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}*/
		/*Dues rtt = new Dues();
		rtt.setLinkUrl("http://www.naver.com");
		model.addAttribute("rt", rtt);
		return "kicpa/dues/paymentLink";*/
		
		
		boolean success = true;
		Dues giroInfo = new Dues();
		String giroCd = "";		
		String[] giroCds = vo.getGiro_cd().split(",");
		
		//합산지로 일 경우 지로 정보 등록후 결제처리 
		if(giroCds.length > 1) {		
			List<Dues> infoList = new ArrayList<Dues>();
			vo.setPay_yymm_seq(DateUtil.getToday().substring(0,6));
			String etcTypeCode = duesService.selectEtcTypeCode(vo);
			
			
			List<GiroNtic> giroNtics = new ArrayList<>();
	        GiroRegVO giroRegVO = new GiroRegVO();
	        	giroRegVO.setRqestDe(DateUtil.getToday());
	        	giroRegVO.setEtcTypeCode(etcTypeCode);
	        	giroRegVO.setEmpPin(vo.getCust_inqr_no());
	        List<GiroVO> giroList = new ArrayList<GiroVO>();
	        	GiroVO giro = new GiroVO();
		        	giro.setSubGiroCd(vo.getGiro_cd());
		        
			        giro.setCustInqrNo(vo.getCust_inqr_no());
		            giro.setNticDe(DateUtil.getToday());
		            giro.setNticAmt(vo.getDudt_in_amt());
		            
		            //회원 정보에서 가져올데이터 
		            giro.setCstmrFlag(vo.getCstmr_flag());
		            giro.setCstmrCd(vo.getCstmr_cd());
		            giro.setCstmrNm(vo.getCstmr_nm());
		            //
		            
		            giro.setRqestCd("35230990");
		            giro.setRqestDe(DateUtil.getToday());
		            giro.setProcessFlag("0");
		            giro.setSuccesAmt(0L);
		            giro.setFrstRegistId(vo.getCust_inqr_no());
		            giro.setLastUpdtId(vo.getCust_inqr_no());
		            giro.setEpayNo(vo.getEpay_no());
		            giro.setNotiDlDt(DateUtil.getToday());
	            giroList.add(giro);
	        
	            giroCd = duesService.registerTempGiro(giroRegVO, giroNtics, giroList);
	            
	            vo.setGiro_cd(giroCd);
	            giroInfo = duesService.selectDues(vo);
	            infoList.add(giroInfo);
	            success = duesApiService.createNoticeGiro(infoList);
	            
	            //지로생성이 실패 했다면 생성한 지로 삭제 처리 
	            if(!success) {
	            	//duesService.deleteTempDues(vo);
	            	rttr.addFlashAttribute("errMsg", "(-1)결제시 오류가 발생했습니다. 잠시후 다시 시도해 주시기 바랍니다.");
	            	return "redirect:/kicpa/dues/selectDuesList.do";
	            }
			
		}else {
			giroCd = vo.getGiro_cd();
		}
		
		//지로 코드가 있다면 결제 진행
		if(giroCd != "" && giroCd != null && success) {
			giroInfo = new Dues();
			vo.setGiro_cd(giroCd);
			giroInfo = duesService.selectDues(vo);
			
			Dues rt = duesApiService.createNoticeGiroLink(giroInfo);
			model.addAttribute("rt", rt);
			if(rt.getLinkUrl() != null && rt.getLinkUrl() != "") {
				return "kicpa/dues/paymentLink";
			}else {
				//duesService.deleteTempDues(vo);
            	rttr.addFlashAttribute("errMsg", "(-2)결제시 오류가 발생했습니다. 잠시후 다시 시도해 주시기 바랍니다.");
            	return "redirect:/kicpa/dues/selectDuesList.do";
			}
			
			
		}
		
		Map<String, Object> map = duesService.selectDuesList(vo);
		
		model.addAttribute("master", map.get("master"));
		model.addAttribute("detail", map.get("detail"));
		model.addAttribute("searchVO", vo);
		
		//return "redirect:/kicpa/dues/selectDuesList.do";		
		return "redirect:/kicpa/dues/selectDuesResult.do";
	}
	
	@RequestMapping(value = "/kicpa/dues/selectPaymentResult.do")
	public String selectPaymentResult(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request, RedirectAttributes rttr)
	  throws Exception{
		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}*/
		
		boolean success = true;
		Dues giroInfo = new Dues();
		success = duesApiService.giroPayments(vo);
		
		//return "redirect:/kicpa/dues/selectDuesList.do";		
		return "redirect:/kicpa/dues/selectDuesResult.do";
	}
	
	
	
	
	@RequestMapping(value = "/kicpa/dues/selectDuesNewList.do")
	public String selectDuesNewList(ModelMap model, HttpServletRequest request)
	  throws Exception{
		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}*/
		

		
		
		
		
		return "kicpa/dues/selectDuesNewList";
	}
	
	@RequestMapping(value = "/kicpa/dues/selectDuesResult.do")
	public String selectDuesResult(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request)
	  throws Exception{
		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			if(vo.getSearchBgnDe() == null || vo.getSearchBgnDe() == "") {
				vo.setSearchBgnDe(DateUtil.getCurrentDate(""));
				vo.setSearchEndDe("");
			}
		/*	Dues info = duesService.selectDuesResultInfo(vo);
			List<Dues> list = duesService.selectDuesResultList(vo);
			model.addAttribute("info",info);
			model.addAttribute("list",list);
			model.addAttribute("searchVO", vo);*/
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}
		
		//날짜가 없을 경우 현재 날짜로 셋팅한다.
		
		
		return "kicpa/dues/selectDuesResult";
	}
	
	
	
}
