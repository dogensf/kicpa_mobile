package adminwork.kicpa.dues.web;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import adminwork.kicpa.myp.service.MyPageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import adminwork.com.cmm.ExcelUtil;
import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.service.CmmUseService;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.dues.service.DeusApiService;
import adminwork.kicpa.dues.service.Dues;
import adminwork.kicpa.dues.service.DuesRef;
import adminwork.kicpa.dues.service.DuesRefVO;
import adminwork.kicpa.dues.service.DuesService;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.dues.service.GiroApiLog;
import adminwork.kicpa.dues.service.GiroCallback;
import adminwork.kicpa.dues.service.GiroNtic;
import adminwork.kicpa.dues.service.GiroRegVO;
import adminwork.kicpa.dues.service.GiroVO;
import adminwork.kicpa.dues.service.NewDues;
import adminwork.let.utl.fcc.service.DateUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

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
    
    @Resource(name = "ExcelUtil")
	private ExcelUtil excelUtil;

	@Resource(name = "myPageService")
	private MyPageService myPageService;
     

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
	public String selectDuesList(String path,String Auth, DuesVO vo,ModelMap model, HttpServletRequest request,HttpServletResponse response,HttpSession session)
	  throws Exception{	
		if("result".equals(path)){
			return "forward:/kicpa/dues/selectDuesResult.do";
		}
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("Auth========="+Auth);
		if(Auth != null) {
			session.setAttribute("auth", Auth);
		}		
		model.addAttribute("auth", Auth);
		String Pin = "";
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			Pin = user.getUniqId();
			/*if(Pin != null && user.getUniqId() != Pin) {
				System.out.println("pin========="+Pin);
				
				model.addAttribute("id", Pin);
				model.addAttribute("url", "/kicpa/dues/selectDuesList.do");
				return "uat/uia/LoginSso";
			}*/
			
			System.out.println("giroPin========="+user.getUniqId());
			vo.setCust_inqr_no(user.getUniqId());
			vo.setName(user.getName());
			vo.setSearchCnd("Main");
			boolean success = true;
			// 합산지로 있는지 체크해서 삭제  TEMP --> PAY_YN = 'N' 취소 처리
			List<Dues> tempList = duesService.selectTempDuesList(vo);
			//합산지로 처리한 데이터가 있으면 일단 삭제하고 처리 한다.
			if(tempList.size() > 0) {
				success = false;
				success = duesApiService.cancelNoticeGiro(tempList);
			}
			
			// 지로 수납 조회 
			if(success) {
				Map<String, Object> map = duesService.selectDuesList(vo);			
				List<Dues> list = duesService.selectDuesResultListAll(vo);
				model.addAttribute("master", map.get("master"));
				model.addAttribute("detail", map.get("detail"));
				model.addAttribute("bill", map.get("bill"));
				model.addAttribute("billSum", map.get("billSum"));				
				model.addAttribute("result", list);
				model.addAttribute("searchVO", vo);

				Map<String, Object> paramMap = new HashMap<>();
				paramMap.put("pin",user.getUniqId());

				//di 정보
				List<?> diCheckList = myPageService.selectCpaPassDiCheckList(paramMap);
				model.addAttribute("diCheckList", diCheckList);
			}else {
				List<DuesVO> tt = new ArrayList<>();
				model.addAttribute("master", tt);
				model.addAttribute("detail", tt);		
				model.addAttribute("bill", tt);
				model.addAttribute("billSum", tt);				
				model.addAttribute("result", tt);
				model.addAttribute("errMsg", "이전 합산지로 정보가 존재합니다. 관리자에게 문의 하세요.");
				model.addAttribute("searchVO", vo);
				
			}
			
			
		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			Cookie cookie = new Cookie("returnUrl", "/kicpa/dues/selectDuesList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*15);
			response.addCookie(cookie);
			model.addAttribute("returnUrl", "/kicpa/dues/selectDuesList.do");
			model.addAttribute("title", "회비납부/조회");
			return "kicpa/common/authLogin";
			
		}
		
		return "kicpa/dues/selectDuesList";
	}

	@RequestMapping(value = "/kicpa/dues/selectDuesList2.do")
	public String selectDuesList2(String path,String Auth, DuesVO vo,ModelMap model, HttpServletRequest request,HttpServletResponse response,HttpSession session)
			throws Exception{
		if("result".equals(path)){
			return "forward:/kicpa/dues/selectDuesResult.do";
		}
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("Auth========="+Auth);
		if(Auth != null) {
			session.setAttribute("auth", Auth);
		}
		model.addAttribute("auth", Auth);
		String Pin = "";
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			Pin = user.getUniqId();
			/*if(Pin != null && user.getUniqId() != Pin) {
				System.out.println("pin========="+Pin);

				model.addAttribute("id", Pin);
				model.addAttribute("url", "/kicpa/dues/selectDuesList2.do");
				return "uat/uia/LoginSso";
			}*/

			System.out.println("giroPin========="+user.getUniqId());
			vo.setCust_inqr_no(user.getUniqId());
			vo.setName(user.getName());
			vo.setSearchCnd("Main");
			boolean success = true;
			// 합산지로 있는지 체크해서 삭제  TEMP --> PAY_YN = 'N' 취소 처리
			List<Dues> tempList = duesService.selectTempDuesList(vo);
			//합산지로 처리한 데이터가 있으면 일단 삭제하고 처리 한다.
			if(tempList.size() > 0) {
				success = false;
				success = duesApiService.cancelNoticeGiro(tempList);
			}

			// 지로 수납 조회
			if(success) {
				Map<String, Object> map = duesService.selectDuesList(vo);
				List<Dues> list = duesService.selectDuesResultListAll(vo);
				model.addAttribute("master", map.get("master"));
				model.addAttribute("detail", map.get("detail"));
				model.addAttribute("bill", map.get("bill"));
				model.addAttribute("billSum", map.get("billSum"));
				model.addAttribute("result", list);
				model.addAttribute("searchVO", vo);

				Map<String, Object> paramMap = new HashMap<>();
				paramMap.put("pin",user.getUniqId());

				//di 정보
				List<?> diCheckList = myPageService.selectCpaPassDiCheckList(paramMap);
				model.addAttribute("diCheckList", diCheckList);
			}else {
				List<DuesVO> tt = new ArrayList<>();
				model.addAttribute("master", tt);
				model.addAttribute("detail", tt);
				model.addAttribute("bill", tt);
				model.addAttribute("billSum", tt);
				model.addAttribute("result", tt);
				model.addAttribute("errMsg", "이전 합산지로 정보가 존재합니다. 관리자에게 문의 하세요.");
				model.addAttribute("searchVO", vo);

			}


		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			Cookie cookie = new Cookie("returnUrl", "/kicpa/dues/selectDuesList2.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*15);
			response.addCookie(cookie);
			model.addAttribute("returnUrl", "/kicpa/dues/selectDuesList2.do");
			model.addAttribute("title", "회비납부/조회");
			return "kicpa/common/authLogin";

		}

		return "kicpa/dues/selectDuesList2";
	}
	
	@RequestMapping(value = "/kicpa/dues/setDuesPayment.do")
	public String setDuesPayment(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request, RedirectAttributes rttr)
	  throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
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
		
		vo.setCust_inqr_no(user.getUniqId());
		vo.setEpay_no(user.getGiroPin());
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
	        	giroRegVO.setEtcInfoTtl("통합 지로");
	        	giroRegVO.setEtcInfoCnte("통합 지로");
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

			// 단일지로 선택후 결제시 master sub_giro_cd 원래 코드로 정정
			duesService.updateSingleGiroMasterSub(vo);

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
            	rttr.addFlashAttribute("errMsg", "(-2)결제시 오류가 발생했습니다. 잠시후 다시 시도해 주시기 바랍니다. \n 사유:" + rt.getRsp_msg());
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
	public String selectPaymentResult(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request,HttpServletResponse response, RedirectAttributes rttr)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			model.addAttribute("title", "회비납부/결과조회");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/dues/selectPaymentResult.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*5);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		vo.setCust_inqr_no(user.getUniqId());
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
	
	@RequestMapping(value="/kicpa/dues/chekDuesNewListAjax.do")
    public ModelAndView chekDuesNewListAjax(final MultipartHttpServletRequest multiRequest,HttpServletRequest request) throws Exception{
        
		CommonsMultipartFile files = (CommonsMultipartFile) multiRequest.getFile("duesExcelList"); 
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        List<NewDues> excelList = new ArrayList();
        excelList = excelUtil.duesExcelReadSetValue(files, 0, 1, 0);
        
        List<NewDues> resultList = duesService.checkDuesNewList(excelList);

        
        modelAndView.addObject("resultCount", resultList.size());
        modelAndView.addObject("resultList", resultList);
         
        return modelAndView;
    }
	
	@RequestMapping(value="/kicpa/dues/selectDuesNewSearch.do")
    public ModelAndView selectDuesNewSearch(NewDues vo, HttpServletRequest request) throws Exception{
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		List<NewDues> resultList = new ArrayList();
		resultList = duesService.selectDuesNewSearch(vo);

        modelAndView.addObject("resultCount", resultList.size());
        modelAndView.addObject("resultList", resultList);
         
        return modelAndView;
    }
	
	@RequestMapping(value="/kicpa/dues/createNewDeus.do")
    public ModelAndView createNewDeus(@RequestBody List<NewDues> list,HttpServletRequest request) throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
        
		/*for(NewDues vo : list) {
			System.out.println("-----pin :: " + vo.getPin());
			System.out.println("-----getId :: " + user.getUniqId());
			
			 vo.setPayNo(payNo);
			 vo.setPayStatus("W");	//납부상태 W:대기
			 vo.setPayIdFlag("A");	//납부자구분 A:감사인
			 vo.setPayId(user.getUniqId());		//납부자(감사인코드)
			 vo.setGiroYn("Y");		//지로입금여부			 
			 NewDues rtnNewDues = duesService.saveNewDuesPay(vo);
			 vo.setSbscrbSn(rtnNewDues.getSbscrbSn());
			 
		}*/
		try {
			//지로 생성
			boolean success = true;
			Dues giroInfo = new Dues();
			String giroCd = "";
			
			DuesVO vo = new DuesVO();
			vo.setEpay_no(user.getGiroPin());
			vo.setCust_inqr_no(user.getUniqId());
			vo.setCstmr_cd(user.getUniqId());
			vo.setCstmr_nm(user.getName());
			
			//입회비 지로 정보 등록후 결제처리
			List<Dues> infoList = new ArrayList<Dues>();
			vo.setPay_yymm_seq(DateUtil.getToday().substring(0,6));
			//String etcTypeCode = duesService.selectEtcTypeCode(vo);
			long totAmt = 0;
			for(NewDues amt : list) {
				totAmt +=(amt.getGnrlYyAmt()+amt.getGnrlEntrncAmt()+amt.getAsstnYyAmt() +amt.getAsstnEntrncAmt()+ amt.getCmitEntrncAmt());
			}
			System.out.println("-----------totAmt ="+totAmt);
			
			vo.setDudt_in_amt(totAmt);
			
			List<GiroNtic> giroNtics = new ArrayList<>();
	        GiroRegVO giroRegVO = new GiroRegVO();
	        	giroRegVO.setRqestDe(DateUtil.getToday());
	        	giroRegVO.setEtcTypeCode("11");
	        	giroRegVO.setEmpPin(user.getUniqId());
	        	giroRegVO.setEtcInfoTtl("입회비");
	        	giroRegVO.setEtcInfoCnte("입회비");
	        List<GiroVO> giroList = new ArrayList<GiroVO>();
	        	GiroVO giro = new GiroVO();
		        	giro.setSubGiroCd("");
		        
			        giro.setCustInqrNo(user.getUniqId());
		            giro.setNticDe(DateUtil.getToday());
		            giro.setNticAmt(vo.getDudt_in_amt());
		            
		            //회원 정보에서 가져올데이터 
		            giro.setCstmrFlag("35210010");
		            giro.setCstmrCd(vo.getCstmr_cd());
		            giro.setCstmrNm(vo.getCstmr_nm());
		            //
		            giro.setRqestCd("35230110");
		            giro.setRqestDe(DateUtil.getToday());
		            giro.setProcessFlag("0");
		            giro.setSuccesAmt(0L);
		            giro.setFrstRegistId(vo.getCust_inqr_no());
		            giro.setLastUpdtId(vo.getCust_inqr_no());
		            giro.setEpayNo(vo.getEpay_no());
		            giro.setNotiDlDt(DateUtil.getToday());
	            giroList.add(giro);
	        
	            //giroCd = duesService.registerTempGiro(giroRegVO, giroNtics, giroList);

	    		//입회비 / 지로 통합 생성 
	            //giroCd = duesService.saveNewDuesPays(list, giroRegVO, giroNtics, giroList);
	            Dues rt = duesService.saveNewDuesPays(list, giroRegVO, giroNtics, giroList);
	           /* System.out.println("-----giroCd :: " + giroCd);
	            vo.setGiro_cd(giroCd);
	            giroInfo = duesService.selectDues(vo);
	            infoList.add(giroInfo);
	            success = duesApiService.createNoticeGiro(infoList);
	            
	            giroInfo = new Dues();
				vo.setGiro_cd(giroCd);
				giroInfo = duesService.selectDues(vo);
				
				Dues rt = duesApiService.createNoticeGiroLink(giroInfo);*/
				modelAndView.addObject("rt", rt);				 
			//납부 생성
			//List<NewDues> rtnList = duesService.saveNewDuesPays(list);
	            
	            //지로생성이 실패 했다면 생성한 지로 삭제 처리 
	            if(!success) {
	            	//duesService.deleteTempDues(vo);
	            	modelAndView.addObject("message", "(-1)결제시 오류가 발생했습니다. 잠시후 다시 시도해 주시기 바랍니다.");
	            	modelAndView.addObject("rtnUrl", "redirect:/kicpa/dues/selectDuesList.do");
	            	
	            }
		}catch(Exception e) {
			
				e.printStackTrace();
		}
		
		modelAndView.addObject("message", "정상적으로 처리 되었습니다.");
		
		/*List<NewDues> resultList = new ArrayList();
		resultList = duesService.selectDuesNewSearch(vo);

        modelAndView.addObject("resultCount", resultList.size());
        modelAndView.addObject("resultList", resultList);
*/         
        return modelAndView;
    }
	
	
	
	
	@RequestMapping(value = "/kicpa/dues/selectDuesResult.do")
	public String selectDuesResult(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletResponse response, HttpServletRequest request)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			model.addAttribute("title", "납부결과 및 조회");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/dues/selectDuesResult.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*5);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		//날짜가 없을 경우 현재 날짜로 셋팅한다.
		/*if(vo.getSearchBgnDe() == null || vo.getSearchBgnDe() == "") {
			vo.setSearchBgnDe(DateUtil.getCurrentDateymd(""));
			vo.setSearchEndDe(DateUtil.getCurrentDateymd(""));
		}*/
		vo.setCust_inqr_no(user.getUniqId());		
		Dues info = duesService.selectDuesResultInfo(vo);
		List<Dues> list = duesService.selectDuesResultList(vo);
		model.addAttribute("info",info);
		model.addAttribute("list",list);
		model.addAttribute("searchVO", vo);
		model.addAttribute("user", user);
		
		return "kicpa/dues/selectDuesResult";
	}
	
	@RequestMapping(value = "/kicpa/dues/selectDuesResultPop.do")
	public String selectDuesResultPop(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletResponse response, HttpServletRequest request)
	  throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			model.addAttribute("title", "납부결과 및 조회");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/dues/selectDuesResultPop.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*15);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		vo.setCust_inqr_no(user.getUniqId());		
		Dues info = duesService.selectDuesResultInfo(vo);
		List<Dues> list = duesService.selectDuesResultListAll(vo);
		//List<Dues> list = duesService.selectDuesResultList(vo);
		model.addAttribute("info",info);
		model.addAttribute("list",list);
		model.addAttribute("searchVO", vo);
		model.addAttribute("user", user);
		
		return "kicpa/dues/selectDuesResultPop";
	}

	//세부내역 확인 팝업
	@RequestMapping(value = "/kicpa/dues/selectDuesListDetailPop.do")
	public ModelAndView selectDuesListDetailPop(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletResponse response, HttpServletRequest request)
			throws Exception{

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		try{
			System.out.println("giroPin========="+user.getGiroPin());
			vo.setCust_inqr_no(user.getUniqId());
			vo.setName(user.getName());
			boolean success = true;
			// 합산지로 있는지 체크해서 삭제  TEMP --> PAY_YN = 'N' 취소 처리
			List<Dues> tempList = duesService.selectTempDuesList(vo);
			//합산지로 처리한 데이터가 있으면 일단 삭제하고 처리 한다.
			if(tempList.size() > 0) {
				success = false;
				success = duesApiService.cancelNoticeGiro(tempList);
			}

			// 지로 수납 조회
			if(success) {
				Map<String, Object> map = duesService.selectDuesList(vo);
				List<Dues> list = duesService.selectDuesResultListAll(vo);
				modelAndView.addObject("master", map.get("master"));
				modelAndView.addObject("detail", map.get("detail"));
				modelAndView.addObject("bill", map.get("bill"));
				modelAndView.addObject("billSum", map.get("billSum"));
				modelAndView.addObject("result", list);
				modelAndView.addObject("searchVO", vo);
			}else {
				List<DuesVO> tt = new ArrayList<>();
				modelAndView.addObject("master", tt);
				modelAndView.addObject("detail", tt);
				modelAndView.addObject("bill", tt);
				modelAndView.addObject("billSum", tt);
				modelAndView.addObject("result", tt);
				modelAndView.addObject("errMsg", "이전 합산지로 정보가 존재합니다. 관리자에게 문의 하세요.");
				model.addAttribute("searchVO", vo);

			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}
	
	/**
	 * giro Result to CallBack
	 * @param vo
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/callback/kicpa/giroSucResult.do")

	public ModelAndView giroSucResult(@RequestBody Map<String, Object> paramMap,@ModelAttribute GiroCallback vo,ModelMap model, HttpServletRequest request, HttpServletResponse response)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		GiroApiLog giroApiLog = new GiroApiLog();
		try {			
			modelAndView.setViewName("jsonView");
			List<NewDues> resultList = new ArrayList();

			System.out.println("paramMap----"+paramMap.toString());

			DuesVO param = new DuesVO();

			//정상 수납일 경우
			if("giro-inqr-link-pay".equals(paramMap.get("return_type").toString()) && "A0000".equals(paramMap.get("rsp_code").toString())){
				param.setOrg_tran_id(paramMap.get("org_tran_id").toString());
				int succ = duesService.updateGiroNticCallback(param);
			}

			//취소일경우
			if("giro-link-cancel".equals(paramMap.get("return_type").toString()) && null != paramMap.get("org_tran_id").toString()){
				param.setOrg_tran_id(paramMap.get("org_tran_id").toString());
				int succ = duesService.updateGiroNticCallbackCancel(param);
			}
			
	        modelAndView.addObject("rsp_code", "A0000");
	        modelAndView.addObject("org_tran_id", paramMap.get("org_tran_id").toString());
	         
	        giroApiLog.setLog("giroCallback : "+ paramMap.toString());
	        duesService.insertGiroApiLog(giroApiLog);
		}catch(Exception e) {
			giroApiLog.setLog("giroCallbackError :  =>  message : " + e.getMessage());
			duesService.insertGiroApiLog(giroApiLog);
		}
		return modelAndView;
		
    }
	
	/**
	 * giro updatePostSendYn
	 * @param vo
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/kicpa/dues/updatePostSendYn.do")
	public ModelAndView updatePostSendYn(DuesVO vo,ModelMap model, HttpServletRequest request)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		
		duesService.updatePostSendYn(vo);
         
        return modelAndView;
    }
	
	
	
	
	@RequestMapping(value = "/kicpa/dues/selectDuesRefund.do")
	public String duesRefList(String Pin, @ModelAttribute("searchVO") DuesRefVO duesRefVO,ModelMap model, HttpServletRequest request)
	  throws Exception{				
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			if(Pin != null && user.getUniqId() != Pin) {
				System.out.println("pin========="+Pin);
				model.addAttribute("id", Pin);
				model.addAttribute("url", "/kicpa/dues/selectDuesRefList.do");
				return "uat/uia/LoginSso";
			}
			System.out.println("==================id :: "+ user.getUniqId());
			PaginationInfo paginationInfo = new PaginationInfo();
			
			duesRefVO.setPin(user.getUniqId());
			
			paginationInfo.setCurrentPageNo(duesRefVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(duesRefVO.getPageUnit());
			paginationInfo.setPageSize(duesRefVO.getPageSize());
			
			duesRefVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			duesRefVO.setLastIndex(paginationInfo.getLastRecordIndex());
			duesRefVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
	
			Map<String, Object> map = duesService.selectDuesRefList(duesRefVO);
			int totCnt = Integer.parseInt((String) map.get("resultCnt"));
			paginationInfo.setTotalRecordCount(totCnt);
			
			model.addAttribute("resultList", map.get("resultList"));
			model.addAttribute("resultCnt", map.get("resultCnt"));
			model.addAttribute("searchVO", duesRefVO);
			model.addAttribute("paginationInfo", paginationInfo);
			model.addAttribute("user", user);
			
			
		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/faq/faqList.do");
			return "uat/uia/LoginSso";
			
		}
		return "kicpa/dues/selectDuesRefundList";
	}
	
	@RequestMapping(value = "/kicpa/dues/duesRefDetail.do")
	public ModelAndView duesRefDetail(@ModelAttribute("searchVO") DuesRefVO duesRefVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

			duesRefVO.setPin(user.getUniqId());
			DuesRef result = duesService.selectDuesRefInfo(duesRefVO);
			modelAndView.addObject("rt", result);
		}else {
			modelAndView.addObject("msg", "로그인이 필요 합니다.");
		}
		
		modelAndView.addObject("msg", "");
	    	         
	    return modelAndView;
	}
	
	@RequestMapping(value = "/kicpa/dues/inserDuesRef.do")
	public ModelAndView inserDuesRef(@ModelAttribute("searchVO") DuesRefVO duesRefVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			
			duesRefVO.setReg_id(user.getUniqId());
			duesService.insertDuesRef(duesRefVO);
			
		}else {
			modelAndView.addObject("msg", "로그인이 필요 합니다.");
		}
		
		modelAndView.addObject("msg", "신청되었습니다.");
	    	         
	    return modelAndView;
	}
	
	@RequestMapping(value = "/kicpa/dues/updateDuesRef.do")
	public ModelAndView updateDuesRef(@ModelAttribute("searchVO") DuesRefVO duesRefVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			duesRefVO.setUpdt_id(user.getUniqId());
				
			duesService.updateDuesRef(duesRefVO);
			
		}else {
			modelAndView.addObject("msg", "로그인이 필요 합니다.");
		}
		
		modelAndView.addObject("msg", "수정 되었습니다.");
	    	         
	    return modelAndView;
	}
	
	@RequestMapping(value = "/kicpa/dues/deleteDuesRef.do")
	public ModelAndView deleteDuesRef(@ModelAttribute("searchVO") DuesRefVO duesRefVO, ModelMap model, HttpServletRequest request)
	  throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			/*LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			faqVO.setReg_id(user.getUniqId());*/
				
			duesService.deleteDuesRef(duesRefVO);
			
		}else {
			modelAndView.addObject("msg", "로그인이 필요 합니다.");
		}
		
		modelAndView.addObject("msg", "삭제 되었습니다.");
	    	         
	    return modelAndView;
	}
	
	

	@RequestMapping(value = "/bridge/kicpa/duespayments.do")
	public String duespayments(String pin,@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request,HttpServletResponse response)
	  throws Exception{		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();	
			if(pin != null && user.getUniqId() != pin) {
				System.out.println("pin========="+pin);
				model.addAttribute("id", pin);
				model.addAttribute("url", "/bridge/kicpa/duespayments.do");
				return "uat/uia/LoginSso";
			}
			
			System.out.println("========="+user.getUniqId());
			vo.setCust_inqr_no(user.getUniqId());
			vo.setName(user.getName());
			boolean success = true;
			// 합산지로 있는지 체크해서 삭제  TEMP --> PAY_YN = 'N' 취소 처리
			List<Dues> tempList = duesService.selectTempDuesList(vo);
			//합산지로 처리한 데이터가 있으면 일단 삭제하고 처리 한다.
			if(tempList.size() > 0) {
				success = false;
				success = duesApiService.cancelNoticeGiro(tempList);
			}
			
			// 지로 수납 조회 
			if(success) {
				Map<String, Object> map = duesService.selectDuesList(vo);		
				List<Dues> list = duesService.selectDuesResultListAll(vo);				
				model.addAttribute("master", map.get("master"));
				model.addAttribute("detail", map.get("detail"));	
				model.addAttribute("result", list);
				model.addAttribute("searchVO", vo);			
			}else {
				List<DuesVO> tt = new ArrayList<>();
				model.addAttribute("master", tt);
				model.addAttribute("detail", tt);	
				model.addAttribute("result", tt);
				model.addAttribute("errMsg", "이전 합산지로 정보가 존재합니다. 관리자에게 문의 하세요.");
				model.addAttribute("searchVO", vo);
				
			}
		}else {
			System.out.println("pin========="+pin);
			model.addAttribute("id", pin);
			model.addAttribute("url", "/bridge/kicpa/duespayments.do");
			return "uat/uia/LoginSso";
			
		}
		
		return "kicpa/dues/duespayments";
	}
	
	
	@RequestMapping(value = "/bridge/kicpa/setBrigeDuesPayment.do")
	public String setBrigeDuesPayment(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request, RedirectAttributes rttr)
	  throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
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
		
		vo.setCust_inqr_no(user.getUniqId());
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
	        	giroRegVO.setEtcInfoTtl("통합 지로");
	        	giroRegVO.setEtcInfoCnte("통합 지로");
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
	            	return "redirect:/bridge/kicpa/duespayments.do";
	            }
			
		}else {
			giroCd = vo.getGiro_cd();

			// 단일지로 선택후 결제시 master sub_giro_cd 원래 코드로 정정
			duesService.updateSingleGiroMasterSub(vo);

		}
		
		//지로 코드가 있다면 결제 진행
		if(giroCd != "" && giroCd != null && success) {
			giroInfo = new Dues();
			vo.setGiro_cd(giroCd);
			giroInfo = duesService.selectDues(vo);
			
			Dues rt = duesApiService.createNoticeGiroLink(giroInfo);
			model.addAttribute("rt", rt);
			if(rt.getLinkUrl() != null && rt.getLinkUrl() != "") {
				return "kicpa/dues/paymentLinkMobile";
			}else {
				//duesService.deleteTempDues(vo);
            	rttr.addFlashAttribute("errMsg", "(-2)결제시 오류가 발생했습니다. 잠시후 다시 시도해 주시기 바랍니다.");
            	return "redirect:/bridge/kicpa/duespayments.do";
			}
			
			
		}
		
		Map<String, Object> map = duesService.selectDuesList(vo);
		
		model.addAttribute("master", map.get("master"));
		model.addAttribute("detail", map.get("detail"));
		model.addAttribute("searchVO", vo);
		
		//return "redirect:/kicpa/dues/selectDuesList.do";		
		return "redirect:/bridge/kicpa/duespayments.do";
	}
	
	@RequestMapping(value = "/bridge/kicpa/paymentResultMobile.do")
	public String paymentResultMobile(@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request, RedirectAttributes rttr)
	  throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}*/
		vo.setCust_inqr_no(user.getUniqId());
		boolean success = true;
		Dues giroInfo = new Dues();
		success = duesApiService.giroPayments(vo);
		
		return "redirect:/bridge/kicpa/duespaymentresult.do";
	}
	
	@RequestMapping(value = "/bridge/kicpa/duespaymentresult.do")
	public String duespaymentresult(String pin,@ModelAttribute("searchVO") DuesVO vo,ModelMap model, HttpServletRequest request,HttpServletResponse response)
	  throws Exception{		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}*/
		
		//날짜가 없을 경우 현재 날짜로 셋팅한다.
		if(vo.getSearchBgnDe() == null || vo.getSearchBgnDe() == "") {
			vo.setSearchBgnDe(DateUtil.getCurrentDate(""));
			vo.setSearchEndDe(DateUtil.getCurrentDate(""));
		}
		vo.setCust_inqr_no(user.getUniqId());
		Dues info = duesService.selectDuesResultInfo(vo);
		List<Dues> list = duesService.selectDuesResultList(vo);
		model.addAttribute("info",info);
		model.addAttribute("list",list);
		model.addAttribute("searchVO", vo);
		
		return "kicpa/dues/duespaymentresult";
	}

	//추가회비 프로시저
	@RequestMapping(value = "/kicpa/dues/callGiroInterestProc.do")
	public ModelAndView callGiroInterestProc(@RequestParam Map<String, Object> paramMap)
			throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		//오늘날짜(납부일자)
		SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String registDe = today.format(c1.getTime());

		//숫자 3자리마다 , 표시
		DecimalFormat decFormat = new DecimalFormat("###,###");

		//변수 초기화
		Map<String, Object> giroInterestProcResult = new HashMap<>();
		String v_amt = "";

		String[] giroCds = paramMap.get("giro_cd").toString().split(",");

		//선택한 회비가 있는 경우
		if(giroCds.length > 0) {

			for(int i=0; i<giroCds.length; i++){
				//선택한 회비 조회
				paramMap.put("giro_cd", giroCds[i]);
				String giroRqestCdNm = duesService.selectGiroRqestCdNm(paramMap);

				giroInterestProcResult.put("v_giro_cd", paramMap.get("giro_cd"));
				giroInterestProcResult.put("v_pay_de", registDe);
				giroInterestProcResult.put("v_amt", "");

				duesService.callGiroInterestProc(giroInterestProcResult);       //(프로시저 호출)

				if(!"0".equals(giroInterestProcResult.get("v_amt").toString()) && !"".equals(giroInterestProcResult.get("v_amt").toString()) && giroInterestProcResult.get("v_amt") != null){
					v_amt = v_amt + "-" + giroRqestCdNm + " : " + decFormat.format(giroInterestProcResult.get("v_amt")) + "원\n";
				}
			}
		}

		modelAndView.addObject("v_amt", v_amt);

		return modelAndView;
	}

	//세부내역 확인 본인인증 후 화면 이동
	@RequestMapping(value = "/dues/selectDuesListConfirmSucc.do")
	public String mypCpaConfirmSucc(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpSession session, ModelMap model) throws Exception{

		NiceID.Check.CPClient niceCheck = new  NiceID.Check.CPClient();

		String sEncodeData = requestReplace(request.getParameter("EncodeData"), "encodeData");

		String sSiteCode = "G2760"; 				// NICE로부터 부여받은 사이트 코드
		String sSitePassword = "OGVOHRYMMD4N";		// NICE로부터 부여받은 사이트 패스워드

		String sCipherTime = "";			// 복호화한 시간
		String sRequestNumber = "";			// 요청 번호
		String sResponseNumber = "";		// 인증 고유번호
		String sAuthType = "";				// 인증 수단
		String sName = "";					// 성명
		String sDupInfo = "";				// 중복가입 확인값 (DI_64 byte)
		String sConnInfo = "";				// 연계정보 확인값 (CI_88 byte)
		String sBirthDate = "";				// 생년월일(YYYYMMDD)
		String sGender = "";				// 성별
		String sNationalInfo = "";			// 내/외국인정보 (개발가이드 참조)
		String sMobileNo = "";				// 휴대폰번호
		String sMobileCo = "";				// 통신사
		String sMessage = "";
		String sPlainData = "";

		int iReturn = niceCheck.fnDecode(sSiteCode, sSitePassword, sEncodeData);

		if( iReturn == 0 )
		{
			sPlainData = niceCheck.getPlainData();
			sCipherTime = niceCheck.getCipherDateTime();

			// 데이타를 추출합니다.
			java.util.HashMap mapresult = niceCheck.fnParse(sPlainData);

			sRequestNumber  = (String)mapresult.get("REQ_SEQ");
			sResponseNumber = (String)mapresult.get("RES_SEQ");
			sAuthType		= (String)mapresult.get("AUTH_TYPE");
			sName			= (String)mapresult.get("NAME");
			//sName			= (String)mapresult.get("UTF8_NAME"); //charset utf8 사용시 주석 해제 후 사용
			sBirthDate		= (String)mapresult.get("BIRTHDATE");
			sGender			= (String)mapresult.get("GENDER");
			sNationalInfo  	= (String)mapresult.get("NATIONALINFO");
			sDupInfo		= (String)mapresult.get("DI");
			sConnInfo		= (String)mapresult.get("CI");
			sMobileNo		= (String)mapresult.get("MOBILE_NO");
			sMobileCo		= (String)mapresult.get("MOBILE_CO");

			model.addAttribute("sCipherTime",sCipherTime);
			model.addAttribute("sRequestNumber",sRequestNumber);
			model.addAttribute("sResponseNumber",sResponseNumber);
			model.addAttribute("sAuthType",sAuthType);
			model.addAttribute("sName",sName);
			model.addAttribute("sBirthDate",sBirthDate);
			model.addAttribute("sGender",sGender);
			model.addAttribute("sNationalInfo",sNationalInfo);
			model.addAttribute("sDupInfo",sDupInfo);
			model.addAttribute("sConnInfo",sConnInfo);
			model.addAttribute("sMobileNo",sMobileNo);
			model.addAttribute("sMobileCo",sMobileCo);

			String session_sRequestNumber = (String)session.getAttribute("REQ_SEQ");
			if(!sRequestNumber.equals(session_sRequestNumber))
			{
				sMessage = "세션값 불일치 오류입니다.";
				sResponseNumber = "";
				sAuthType = "";
			}
		}
		else if( iReturn == -1)
		{
			sMessage = "복호화 시스템 오류입니다.";
		}
		else if( iReturn == -4)
		{
			sMessage = "복호화 처리 오류입니다.";
		}
		else if( iReturn == -5)
		{
			sMessage = "복호화 해쉬 오류입니다.";
		}
		else if( iReturn == -6)
		{
			sMessage = "복호화 데이터 오류입니다.";
		}
		else if( iReturn == -9)
		{
			sMessage = "입력 데이터 오류입니다.";
		}
		else if( iReturn == -12)
		{
			sMessage = "사이트 패스워드 오류입니다.";
		}
		else
		{
			sMessage = "알수 없는 에러 입니다. iReturn : " + iReturn;
		}

		model.addAttribute("sMessage",sMessage);

		return "kicpa/dues/duesDtailConfirmSucc";
	}

	public String requestReplace (String paramValue, String gubun) {

		String result = "";

		if (paramValue != null) {

			paramValue = paramValue.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

			paramValue = paramValue.replaceAll("\\*", "");
			paramValue = paramValue.replaceAll("\\?", "");
			paramValue = paramValue.replaceAll("\\[", "");
			paramValue = paramValue.replaceAll("\\{", "");
			paramValue = paramValue.replaceAll("\\(", "");
			paramValue = paramValue.replaceAll("\\)", "");
			paramValue = paramValue.replaceAll("\\^", "");
			paramValue = paramValue.replaceAll("\\$", "");
			paramValue = paramValue.replaceAll("'", "");
			paramValue = paramValue.replaceAll("@", "");
			paramValue = paramValue.replaceAll("%", "");
			paramValue = paramValue.replaceAll(";", "");
			paramValue = paramValue.replaceAll(":", "");
			paramValue = paramValue.replaceAll("-", "");
			paramValue = paramValue.replaceAll("#", "");
			paramValue = paramValue.replaceAll("--", "");
			paramValue = paramValue.replaceAll("-", "");
			paramValue = paramValue.replaceAll(",", "");

			if(gubun != "encodeData"){
				paramValue = paramValue.replaceAll("\\+", "");
				paramValue = paramValue.replaceAll("/", "");
				paramValue = paramValue.replaceAll("=", "");
			}

			result = paramValue;

		}
		return result;
	}
	
}
