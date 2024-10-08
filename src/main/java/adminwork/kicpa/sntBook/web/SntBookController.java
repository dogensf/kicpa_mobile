package adminwork.kicpa.sntBook.web;


import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.HttpUtil;
import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.sntBook.service.SntBookService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/sntBook")
public class SntBookController {

	@Resource(name = "sntBookService")
	private SntBookService sntBookService;

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;



	@RequestMapping(value = "/sntBookCategory.do")
	public String sntBookCategory(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/sntBookCategory";
	}
	@RequestMapping(value = "/companySearch.do")
	public String companySearch(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/companySearch";
	}

	@RequestMapping(value = "/bookFormatList.do")
	public String bookFormatList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		if(!isAuthenticated) {
			model.addAttribute("returnUrl", "/kicpa/sntBook/bookFormatList.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/bookFormatList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
		}
		return "kicpa/sntBook/bookFormatList";

	}
	@RequestMapping(value = "/bookList.do")
	public String bookList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/bookList";
	}

	@RequestMapping(value = "/kifrsBookList.do")
	public String kifrsBookList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		return "kicpa/sntBook/kifrsBookList";
	}

	@RequestMapping(value = "/taxBookList.do")
	public String taxBookList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/taxBookList";
	}
	@RequestMapping(value = "/cartOrderCoperation.do")
	public String cartOrderCoperation(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		EgovMap bookDetail = sntBookService.selectBookDetail(map);
		model.addAttribute("bookDetail", bookDetail);
		return "kicpa/sntBook/cartOrderCoperation";
	}

	@RequestMapping(value = "/specialLectureList.do")
	public String specialLectureList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "실무특강 리스트");

		model.addAttribute("gbn", StringUtil.isNullToString(map.get("gbn"), "LISTPAGE2"));
		if(isAuthenticated) {
			return "kicpa/sntBook/specialLectureList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/sntBook/specialLectureList.do?gbn="+StringUtil.isNullToString(map.get("gbn"), "LISTPAGE2"));
			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/specialLectureList.do?gbn="+StringUtil.isNullToString(map.get("gbn"), "LISTPAGE2"));
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/offlineEduList.do")
	public String offlineEduList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "집합연수");
		model.addAttribute("accEduUse", StringUtil.isNullToString(map.get("accEduUse"), "1"));
		if(isAuthenticated) {
			return "kicpa/sntBook/offlineEduList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/sntBook/offlineEduList.do?accEduUse="+StringUtil.isNullToString(map.get("accEduUse"), "1"));
			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/offlineEduList.do?accEduUse="+StringUtil.isNullToString(map.get("accEduUse"), "1"));
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/offlineEduAppList.do")
	public String offlineEduAppList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/offlineEduAppList";
	}

	@RequestMapping(value = "/specialLectureDetail.do")
	public String specialLectureDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		EgovMap detail = sntBookService.selectEduMasterListDetail(map);
		sntBookService.updateOfflineEduReadCnt(map);
		model.addAttribute("detail", detail);
		return "kicpa/sntBook/specialLectureDetail";
	}

	@RequestMapping(value = "/cartList.do")
	public String cartList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		HttpSession session = request.getSession();
		List<EgovMap> list = (List<EgovMap>) session.getAttribute("cartList");
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("cartList", list);
		model.addAttribute("title", "장바구니/구매");
		if(isAuthenticated) {
			return "kicpa/sntBook/cartList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/sntBook/cartList.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/cartList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}

	}

	@RequestMapping(value = "/bookBuyHistoryList.do")
	public String bookBuyHistoryList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{


		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);

		model.addAttribute("title", "장바구니/구매");
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			map.put("pslId", user.getUniqId());
			List<EgovMap> list = sntBookService.selectBookBuyHistoryList(map);
			model.addAttribute("buyHistoryList", list);
			return "kicpa/sntBook/bookBuyHistoryList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/sntBook/bookBuyHistoryList.do");
			Cookie cookie = new Cookie("returnUrl","/kicpa/sntBook/bookBuyHistoryList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}


	}

	@RequestMapping(value = "/bookBuyHistoryDetail.do")
	public String bookBuyHistoryDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		EgovMap detail = new EgovMap();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			map.put("pslId", user.getUniqId());
			detail = sntBookService.selectBookBuyHistoryOrderMaster(map);
		}
		model.addAttribute("detail", detail);
		return "kicpa/sntBook/bookBuyHistoryDetail";
	}

	@RequestMapping(value = "/offlineEduDetail.do")
	public String offlineEduDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				EgovMap detail = sntBookService.selectOfflineEduDetail(map);
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				model.addAttribute("loginVO", user);
				model.addAttribute("detail", detail);
				return "kicpa/sntBook/offlineEduDetail";
			}else {
				model.addAttribute("returnUrl", "/kicpa/sntBook/offlineEduDetail.do?idNum="+map.get("idNum"));
				Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/offlineEduDetail.do?idNum="+map.get("idNum"));
				cookie.setPath("/");
				cookie.setMaxAge(60*60);
				response.addCookie(cookie);
				return "kicpa/common/authLogin";
			}



	}
	@RequestMapping(value = "/cartOrderForm.do")
	public String cartOrderForm(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		HttpSession session = request.getSession();
		@SuppressWarnings("unchecked")
		List<EgovMap> orderList=   (List<EgovMap>) session.getAttribute("orderList");


		if(isAuthenticated || "Y".equals(map.get("gamYn"))) {

			if(orderList != null && !orderList.isEmpty()) {

				long totalPay = 0;
				for(EgovMap m : orderList) {
					
					totalPay += Long.parseLong(StringUtil.isNullToString(m.get("saleAmt"),"0"));
				}

				if(isAuthenticated) {
					LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
					model.addAttribute("loginVO", user);
				}
				model.addAttribute("totalPay", totalPay);
				model.addAttribute("mid",propertyService.getString("inicisMid"));
				return "kicpa/sntBook/cartOrderForm";
			}else {
				return "kicpa/main/main";
			}
		}else {
			model.addAttribute("returnUrl", "/kicpa/sntBook/cartList.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/cartList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}


//		model.addAttribute("oid", "kicpaorkr3_"+System.currentTimeMillis())
	}

	@RequestMapping(value = "/offlineEduForm.do")
	public String offlineEduForm(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			EgovMap detail = sntBookService.selectOfflineEduDetail(map);
			if(detail != null) {
				model.addAttribute("totalPay", StringUtil.isNullToString(detail.get("eduMny")).replace(",", "") );
				model.addAttribute("detail", detail);
				model.addAttribute("mid",propertyService.getString("inicisMid"));
				model.addAttribute("loginVO", user);
				return "kicpa/sntBook/offlineEduForm";
			}else {
				return "kicpa/sntBook/offlineEduList";
			}
		}else {
			model.addAttribute("returnUrl", "/kicpa/sntBook/offlineEduList.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/offlineEduList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}


//		model.addAttribute("oid", "kicpaorkr3_"+System.currentTimeMillis())
	}

	@RequestMapping(value = "/bookDetail.do")
	public String boardDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		try {
			EgovMap bookDetail = sntBookService.selectBookDetail(map);
			model.addAttribute("bookDetail", bookDetail);
		}catch (Exception e) {
			e.printStackTrace();
		}

		return "kicpa/sntBook/bookDetail";
	}



	@RequestMapping(value="/getBookList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        List<EgovMap> list = sntBookService.selectBookList(map);

	        int totalCnt = sntBookService.selectBookListCnt(map);
	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("bookList", list);
			modelAndView.addObject("totalCnt", totalCnt);

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	@RequestMapping(value="/getBookFormatList.do")
	public ModelAndView getBookFormatList(@RequestBody Map<String,Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {
				List<EgovMap> list = sntBookService.selectBookFormatList(map);

				int totalCnt = sntBookService.selectBookFormatListCnt(map);
				 list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("bookFormatList", list);
				modelAndView.addObject("totalCnt", totalCnt);
				modelAndView.addObject("isLogin", true);
    		}else {
    			modelAndView.addObject("returnUrl", "/kicpa/sntBook/bookFormatList.do");
    			Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/bookFormatList.do");
    			cookie.setPath("/");
    			cookie.setMaxAge(60*60);
    			response.addCookie(cookie);
    			modelAndView.addObject("isLogin", false);
    		}
		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/getSpecialLectureList.do")
	public ModelAndView getSpecialLectureList(@RequestBody Map<String,Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");


			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

			if(isAuthenticated) {

				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("eduCode", user.getUniqId());
				map.put("schtype", StringUtil.isNullToString(map.get("schtype"), "use"));
				map.put("schword", StringUtil.isNullToString(map.get("schword"), "1"));



				sntBookService.procedureEduMasterList(map);
	//			List<EgovMap> list = sntBookService.selectBookFormatList(map);
	//
	//			int totalCnt = sntBookService.selectBookFormatListCnt(map);

				List<HashMap<String,Object>> list = (List<HashMap<String,Object>>) map.get("result");
				list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("list", list);
				modelAndView.addObject("gbn", map.get("gbn"));
				modelAndView.addObject("isLogin", true);
			}else {
				modelAndView.addObject("returnUrl", "/kicpa/sntBook/specialLectureList.do?gbn="+StringUtil.isNullToString(map.get("gbn"), "LISTPAGE2"));
				modelAndView.addObject("gbn", map.get("gbn"));
				Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/specialLectureList.do?gbn="+StringUtil.isNullToString(map.get("gbn"), "LISTPAGE2"));
    			cookie.setPath("/");
    			cookie.setMaxAge(60*60);
    			response.addCookie(cookie);
				modelAndView.addObject("isLogin", false);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/getOfflineEduList.do")
	public ModelAndView getOfflineEduList(@RequestBody Map<String,Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

			if(isAuthenticated) {

				List<EgovMap> list = sntBookService.selectOfflineEduList(map);

				list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
				modelAndView.addObject("list", list);
				modelAndView.addObject("isLogin", true);
			}else {
				modelAndView.addObject("returnUrl", "/kicpa/sntBook/offlineEduList.do");
				Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/offlineEduList.do");
    			cookie.setPath("/");
    			cookie.setMaxAge(60*60);
    			response.addCookie(cookie);
				modelAndView.addObject("isLogin", false);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/getOfflineEduCheck.do")
	public ModelAndView getOfflineEduChecks(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				EgovMap detail = sntBookService.selectOfflineEduDetail(map);
				if(detail != null) {
					LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
					map.put("pslId", user.getUniqId()) ;

					sntBookService.eapQueryMain07Proc(map);
					int totalCnt =  sntBookService.selectMemberChcekCnt(map);
					String applyYn = sntBookService.selectCheckApplyYn(map);
					String iciGamNum = sntBookService.selectChecCpaInfo(map);
					int appCnt = sntBookService.selectEduAppCheck(map);
					modelAndView.addObject("totalCnt", totalCnt);
					modelAndView.addObject("applyYn", applyYn);
					modelAndView.addObject("iciGamNum", iciGamNum);
					modelAndView.addObject("appCnt", appCnt);

					if(Integer.parseInt(StringUtil.isNullToString(detail.get("billCount")))  < Integer.parseInt(StringUtil.isNullToString(detail.get("eduCount"))) ) {
						if(!"cks6451".equals(user.getId()) && !"1".equals(map.get("v_result")) && "3".equals(user.getUserTy())  ) {
							modelAndView.addObject("isCpy", false);
						}else {
							modelAndView.addObject("isCpy", true);
						}

						modelAndView.addObject("isEnable", true);
					}else {
						modelAndView.addObject("isEnable", false);
					}
				}else {
					modelAndView.addObject("isEnable", false);
				}
				modelAndView.addObject("isLogin", true);
			}else {
				modelAndView.addObject("isEnable", false);
				modelAndView.addObject("isLogin", false);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/getOfflineEduAppList.do")
	public ModelAndView getOfflineEduAppList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			List<EgovMap> list = null;
			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				map.put("pslId", user.getUniqId());
				list = sntBookService.selectOfflineEduAppList(map);

				list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			}
			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}
	@RequestMapping(value="/getCorporationList.do")
	public ModelAndView getCorporationList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			List<EgovMap> list = sntBookService.selectCorporationList(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/getTaxDetail.do")
	public ModelAndView getTaxDetail(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			EgovMap taxDetail = sntBookService.selectTaxDetail(map);

			modelAndView.addObject("taxDetail", taxDetail);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/insertCart.do")
	public ModelAndView insertCart(@RequestBody Map<String,Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");

			HttpSession session = request.getSession();
			EgovMap deliveryMap	 = null;
			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {

//			EgovMap userInfo =  (EgovMap) session.getAttribute("loginSession");
//			HashMap mapresult =  (HashMap) session.getAttribute("mapresult");

				if(map.get("ibmBookCode") instanceof String ) {
					List list = new ArrayList<String>();
					list.add((String)map.get("ibmBookCode"));
					map.put("ibmBookCode",list);
				}

				List<EgovMap> list = null ;

				if("6".equals(map.get("bookDiv"))) {
					list = sntBookService.selectBookFormatOrderList(map);

					//배송란
					deliveryMap = new EgovMap();
					deliveryMap.put("ibmBookCode", "999999");
					deliveryMap.put("ibmNum", "999999");
					deliveryMap.put("ibmBookName", "배송료");
					deliveryMap.put("ibmDeliverySep", (Object) null);
					deliveryMap.put("downDate", (Object) null);
					deliveryMap.put("bookDiv", "9");
					deliveryMap.put("CNT", "1");
					deliveryMap.put("ibmPrice1", "5000");
					deliveryMap.put("ibmPrice2", "5000");
					deliveryMap.put("amt", "5000");
					deliveryMap.put("saleAmt", "5000");

				}else {
					list = sntBookService.selectCartInputBookList(map);
				}

				List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");

				if(cartList != null && !cartList.isEmpty() ) {

					for(EgovMap x : cartList ) {
						boolean flag = false;
						EgovMap tempMap = null;
						for(EgovMap y : list ) {
							//같은상품이 존재하면 수량을 하나 올리고 조회내역에서 삭제
							if(x.get("ibmBookCode").equals(y.get("ibmBookCode")) ) {
								x.put("cnt", Integer.parseInt(StringUtil.isNullToString(x.get("cnt"),"0"))+1);
								flag = true;
								tempMap = y;
							}
						}


						//장바구니에 배송비가 있다면 셋팅된 데이터를 초기화
						if("999999".equals(x.get("ibmBookCode"))) {
							deliveryMap = null;
						}

						if(flag) {
							list.remove(tempMap);
						}
					}

					//배송비 정보가 있다면 add
					if(deliveryMap != null && !deliveryMap.isEmpty()) {
						list.add(deliveryMap);
					}

					cartList.addAll(list);
					session.setAttribute("cartList", cartList);
				}else {
					if(deliveryMap != null && !deliveryMap.isEmpty()) {
						list.add(deliveryMap);
					}

					session.setAttribute("cartList", list);
				}


				modelAndView.addObject("isLogin", true);
			}else {
				modelAndView.addObject("isLogin", false);
				Cookie cookie = new Cookie("returnUrl", "/kicpa/sntBook/insertCart.do");
    			cookie.setPath("/");
    			cookie.setMaxAge(60*60);
    			response.addCookie(cookie);
			}

//			map.put("pslId", "5650320120323");
//			List<EgovMap> list = sntBookService.selectOfflineEduAppList(map);
//
//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/getOrderCorporation.do")
	public ModelAndView getOrderCorporation(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");

			HttpSession session = request.getSession();
//			EgovMap userInfo =  (EgovMap) session.getAttribute("loginSession");
//			HashMap mapresult =  (HashMap) session.getAttribute("mapresult");

			if(map.get("ibmBookCode") instanceof String ) {
				List list = new ArrayList<String>();
				list.add((String)map.get("ibmBookCode"));
				map.put("ibmBookCode",list);
			}

			List<EgovMap> list = sntBookService.selectCartInputBookList(map);

//			List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");


			for(EgovMap y : list ) {
				y.put("ibmPrice", StringUtil.isNullToString(y.get("ibmPrice2"),"0"));
				y.put("saleAmt",(Long.parseLong(StringUtil.isNullToString(y.get("ibmPrice2"),"0").replaceAll(",", "") ) * Integer.parseInt(StringUtil.isNullToString(map.get("cnt")))));
			}


			//배송란
//			EgovMap tempMap = new EgovMap();
//			tempMap.put("ibmBookCode", "999999");
//			tempMap.put("ibmNum", "999999");
//			tempMap.put("ibmBookName", "배송료");
//			tempMap.put("ibmDeliverySep", (Object) null);
//			tempMap.put("downDate", (Object) null);
//			tempMap.put("bookDiv", "9");
//			tempMap.put("CNT", "1");
//			tempMap.put("ibmPrice1", "5000");
//			tempMap.put("ibmPrice2", "5000");
//			tempMap.put("amt", "5000");
//			tempMap.put("saleAmt", "5000");
//			list.add(tempMap);
			session.setAttribute("cartList", list);
			session.setAttribute("orderList", list);



		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/updateCart.do")
	public ModelAndView updateCart(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");

			HttpSession session = request.getSession();

			List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");

			if(cartList != null && !cartList.isEmpty() ) {
				int cnt = 0;
				EgovMap temp = null;
				for(EgovMap m : cartList) {
					if(map.get("ibmBookCode").equals(m.get("ibmBookCode")) ) {
						if("PLUS".equals(map.get("gbn"))) {
							cnt = Integer.parseInt(StringUtil.isNullToString(m.get("cnt"),"0"))+1;
							m.put("cnt", cnt);
							modelAndView.addObject("cnt", cnt);
							break;
						}else if("MINUS".equals(map.get("gbn"))) {
							cnt = Integer.parseInt(StringUtil.isNullToString(m.get("cnt"),"0"))-1;
							m.put("cnt", cnt);
							modelAndView.addObject("cnt", cnt);
							break;
						}else if("DELETE".equals(map.get("gbn"))) {
							temp = m;
							System.out.println(m);
							break;
						}
					}

				}

				if("DELETE".equals(map.get("gbn")) && temp != null ) {
					cartList.remove(temp);
				}

				Optional<EgovMap> bookDivSixMap = cartList.stream().filter(x -> "6".equals(x.get("bookDiv")) ).findFirst();
				Optional<EgovMap> deliveryMap = cartList.stream().filter(x -> "999999".equals(x.get("ibmBookCode")) ).findFirst();
				//배송비 붙는 상품이 없고 장바구니에 배송비가 있다면 배송비를 삭제
				if(!bookDivSixMap.isPresent() && deliveryMap.isPresent()) {
					modelAndView.addObject("deliveryFlag",true);
					cartList.remove(deliveryMap.get());
				}else {
					modelAndView.addObject("deliveryFlag",false);
				}

				if(cartList.size() == 0) {
					session.removeAttribute("cartList");
				}

				modelAndView.addObject("gbn", map.get("gbn"));
				modelAndView.addObject("ibmBookCode", map.get("ibmBookCode"));
			}


		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/insertSpecialLecture.do")
	public ModelAndView insertSpecialLecture(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{


			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

				modelAndView.setViewName("jsonView");
				map.put("gbn", "INS");
				map.put("emaPslId", user.getUniqId()); //세선정보에서 불러오는거 현재 로그인이 없으므로 고정
				map.put("emaKname",  user.getUniqId()); //세선정보에서 불러오는거 현재 로그인이 없으므로 고정
				map.put("emaAttend", "0");
			    map.put("emaIp", request.getHeader("NS-CLIENT-IP"));

				sntBookService.procedureEduAppAndModify(map);

				modelAndView.addObject("resultCode", map.get("resultCode"));

			}
//			List<EgovMap> list = sntBookService.selectBookFormatList(map);
//
//			int totalCnt = sntBookService.selectBookFormatListCnt(map);

//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/orderCartForm.do")
	public ModelAndView orderCartForm(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			HttpSession session = request.getSession();
			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(!"".equals(StringUtil.isNullToString(map.get("ibmBookCode")))) {

				List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");

				if(cartList != null && !cartList.isEmpty() ) {
					List<EgovMap> orderList = new ArrayList<EgovMap>();
					for(EgovMap y : cartList ) {
						String ibmBookCode = StringUtil.isNullToString(y.get("ibmBookCode"));
						if(StringUtil.isNullToString(map.get("ibmBookCode")).indexOf(ibmBookCode) > -1) {

							if(isAuthenticated) {
								y.put("ibmPrice", StringUtil.isNullToString(y.get("ibmPrice1"),"0"));
								y.put("saleAmt",(Long.parseLong(StringUtil.isNullToString(y.get("ibmPrice1"),"0").replaceAll(",", "") ) * Integer.parseInt(StringUtil.isNullToString(y.get("cnt")))));

							}else{
								y.put("ibmPrice", StringUtil.isNullToString(y.get("ibmPrice2"),"0"));
								y.put("saleAmt",(Long.parseLong(StringUtil.isNullToString(y.get("ibmPrice2"),"0").replaceAll(",", "") ) * Integer.parseInt(StringUtil.isNullToString(y.get("cnt")))));
							}

							Optional<EgovMap> bookDivSixMap = cartList.stream().filter(x -> "6".equals(x.get("bookDiv")) ).findFirst();
							Optional<EgovMap> deliveryMap = cartList.stream().filter(x -> "999999".equals(x.get("ibmBookCode")) ).findFirst();
//							if() {
//
//							}

							orderList.add(y);
						}
					}

					Optional<EgovMap> bookDivSixMap = orderList.stream().filter(x -> "6".equals(x.get("bookDiv")) ).findFirst();
					Optional<EgovMap> deliveryMap = cartList.stream().filter(x -> "999999".equals(x.get("ibmBookCode")) ).findFirst();


					if(bookDivSixMap.isPresent()) {
						orderList.add(deliveryMap.get());
					}

					if(orderList.size() == 0) {
						modelAndView.addObject("result", "0003");
					}else {
						modelAndView.addObject("result", "0000");
						session.setAttribute("orderList", orderList);
					}

				}else {
					modelAndView.addObject("result", "0001");
				}
			}else {
				modelAndView.addObject("result", "0002");
			}
		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}



	@RequestMapping(value="/orderFormCheck.do")
	public ModelAndView orderFormCheckdo(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");
			HttpSession session = request.getSession();
//			List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");
			List<EgovMap> orderList=   (List<EgovMap>) session.getAttribute("orderList");
			if(orderList != null && !orderList.isEmpty()) {
				long totalPay = 0;
				for(EgovMap m : orderList) {
					totalPay += Long.parseLong(StringUtil.isNullToString(m.get("saleAmt")));
				}

				System.out.println(map);
				if(totalPay != Long.parseLong( StringUtil.isNullToString(map.get("P_AMT")))) {
					modelAndView.addObject("result", "0002");
				}else {
					modelAndView.addObject("result", "0000");
					modelAndView.addObject("oid",  propertyService.getString("inicisMid")+"_"+System.currentTimeMillis());
					session.setAttribute("orderFrom", map);
				}

			}else {
				modelAndView.addObject("result", "0001");
			}


		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/orderOfflineEduFormCheck.do")
	public ModelAndView orderOfflineEduFormCheck(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");
			HttpSession session = request.getSession();
//			List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");
			EgovMap detail = sntBookService.selectOfflineEduDetail(map);
			if(detail != null && !detail.isEmpty()) {
				long totalPay = Long.parseLong(StringUtil.isNullToString(detail.get("eduMny")).replace(",", ""));

				if(totalPay != Long.parseLong( StringUtil.isNullToString(map.get("P_AMT")))) {
					modelAndView.addObject("result", "0002");
				}else {
					modelAndView.addObject("result", "0000");
					modelAndView.addObject("oid",  propertyService.getString("inicisMid")+"_"+System.currentTimeMillis());
					session.setAttribute("orderFrom", map);
				}

			}else {
				modelAndView.addObject("result", "0001");
			}


		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/orderReponse.do")
	public void orderReponse(@RequestParam Map<String,Object> map, HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		Map<String,String> inicisMap = null;
		try{
			HttpSession session = request.getSession();

			Map<String, Object> orderFrom = (Map<String, Object>) session.getAttribute("orderFrom");
			List<EgovMap> orderList=   (List<EgovMap>) session.getAttribute("orderList");

			if(orderFrom != null) {


				//세션에 있는 form정보를 병합
				orderFrom.forEach((key,value)-> map.merge(key, value, (v1,v2)->v2));

				if("00".equals(map.get("P_STATUS"))) {

					Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
					if(isAuthenticated) {
						LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
						map.put("userId", user.getId());
						map.put("userName", user.getName());
						map.put("rvName", user.getName());
	//				map.put("rvAddress", StringUtil.isNullToString(user.getAima_add1(),"") + " " + StringUtil.isNullToString(user.getAima_add2()) );
						map.put("pslId",user.getUniqId());

					}else {
						map.put("userId", "Guest");
						map.put("pslId", map.get("gamId"));
					}

					inicisMap =HttpUtil.inicisRequest(StringUtil.isNullToString(map.get("P_REQ_URL")), StringUtil.isNullToString(map.get("P_TID")), propertyService.getString("inicisMid"));

					map.put("orderList", orderList);

					if("BANK".equals(inicisMap.get("P_TYPE"))) {
						map.put("recBank", inicisMap.get("P_FN_CD1"));
					}
					map.put("pgSno", inicisMap.get("P_TID"));
					map.put("pgCdAprvno", inicisMap.get("P_AUTH_NO"));
					map.put("pgPayDate", inicisMap.get("P_AUTH_DT"));
					map.put("payTotalAmt",inicisMap.get("P_AMT"));
					map.put("ip",request.getRemoteAddr());


	//				orderMap.put("v_bill_yn", "0");

					if(!"".equals(StringUtil.isNullToString(map.get("telNo1"))) && !"".equals(StringUtil.isNullToString(map.get("telNo2"))) && !"".equals(StringUtil.isNullToString(map.get("telNo3"))) ) {
						map.put("telNo", StringUtil.isNullToString(map.get("telNo1"))+"-"+StringUtil.isNullToString(map.get("telNo2"))+"-" +StringUtil.isNullToString(map.get("telNo3")));
					}

					if(!"".equals(StringUtil.isNullToString(map.get("hpNo1"))) && !"".equals(StringUtil.isNullToString(map.get("hpNo2"))) && !"".equals(StringUtil.isNullToString(map.get("hpNo3"))) ) {
						map.put("hpNo", StringUtil.isNullToString(map.get("hpNo1"))+"-"+StringUtil.isNullToString(map.get("hpNo2"))+"-" +StringUtil.isNullToString(map.get("hpNo3")));
					}

					map.put("inicisMap", inicisMap);
					sntBookService.insertOrder(map,request);

					response.setCharacterEncoding("UTF-8");
		    		response.setContentType("text/html; charset=UTF-8");
			        PrintWriter printWriter = response.getWriter();

			        String script= "<script>";
			        script += "alert('구매완료되었습니다.');";
			        script += "location.href='/kicpa/sntBook/bookBuyHistoryList.do'";

	//		        script += "opener.location.reload();";
	//		        script += "window.close();";
			        script += "</script>";

			        printWriter.println(script);

			        //구매폼 , 구매목록 세션에서 삭제
			        session.removeAttribute("orderFrom");
			        session.removeAttribute("orderList");

			        List<EgovMap> cartList = (List<EgovMap>) session.getAttribute("cartList");
			        // 장바구니 삭제
			        for(EgovMap y : orderList ) {
						boolean flag = false;
						EgovMap tempMap = null;
							for(EgovMap x : cartList ) {
							//같은상품이 존재하면 수량을 하나 올리고 조회내역에서 삭제
							if(x.get("ibmBookCode").equals(y.get("ibmBookCode")) && !"999999".equals(y.get("ibmBookCode"))) {
								flag = true;
								tempMap = x;
							}
						}
						if(flag) {
							cartList.remove(tempMap);
						}
					}
					if(cartList.size() == 1) {
						session.removeAttribute("cartList");
					}else {
						session.setAttribute("cartList", cartList);
					}





				}else {

					response.setCharacterEncoding("UTF-8");
		    		response.setContentType("text/html; charset=UTF-8");
			        PrintWriter printWriter = response.getWriter();

			        String script= "<script>";
			        script += "alert('구매에 실패하였습니다.\n' "+map.get("P_RMESG1")+");";
			        script += "location.href='/kicpa/sntBook/bookBuyHistoryList.do'";

	//		        script += "opener.location.reload();";
	//		        script += "window.close();";
			        script += "</script>";

			        printWriter.println(script);
					modelAndView.addObject("msg", map.get("P_RMESG1"));
				}
			}else {
				response.setCharacterEncoding("UTF-8");
	    		response.setContentType("text/html; charset=UTF-8");
		        PrintWriter printWriter = response.getWriter();

		        String script= "<script>";
		        script += "alert('로그인을 해주세요.');";
		        script += "location.href='/uat/uia/LoginUsr.do'";

//		        script += "opener.location.reload();";
//		        script += "window.close();";
		        script += "</script>";

		        printWriter.println(script);
			}
		}catch (Exception e) {

			e.printStackTrace();
		}

	}


//
	@RequestMapping(value = "/offlineEduFileDownload.do")
	public void fileDownload(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			EgovMap fileDetail =  sntBookService.selectOfflineEduFileDetail(map);
			String path = propertyService.getString("Globals.fileStorePath")+File.separator+ "upload"+File.separator+fileDetail.get("filePath")+File.separator +fileDetail.get("fileNm");
			fileUtil.downFile(response,  path, String.valueOf(fileDetail.get("fileNm")));

		}catch (Exception e) {
			e.printStackTrace();
		}

	}


	@RequestMapping(value="/orderOfflineEduReponse.do")
	public void orderOfflineEduReponse(@RequestParam Map<String,Object> map, HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		Map<String,String> inicisMap = null;
		try{
			HttpSession session = request.getSession();
			Map<String, Object> orderFrom = (Map<String, Object>) session.getAttribute("orderFrom");

			if(orderFrom != null) {

				//세션에 있는 form정보를 병합
				orderFrom.forEach((key,value)-> map.merge(key, value, (v1,v2)->v2));


				if("00".equals(map.get("P_STATUS"))) {

					Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
					if(isAuthenticated) {
						LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
						map.put("userId", user.getId());
						map.put("userName", user.getName());
						map.put("rvName", user.getName());
	//				map.put("rvAddress", StringUtil.isNullToString(user.getAima_add1(),"") + " " + StringUtil.isNullToString(user.getAima_add2()) );
						map.put("pslId",user.getUniqId());

					}else {
						map.put("userId", "Guest");
						map.put("pslId", map.get("gamId"));
					}

					inicisMap =HttpUtil.inicisRequest(StringUtil.isNullToString(map.get("P_REQ_URL")), StringUtil.isNullToString(map.get("P_TID")), propertyService.getString("inicisMid"));


					if("BANK".equals(inicisMap.get("P_TYPE"))) {
						map.put("recBank", inicisMap.get("P_FN_CD1"));
					}
					map.put("pgSno", inicisMap.get("P_TID"));
					map.put("pgCdAprvno", inicisMap.get("P_AUTH_NO"));
					map.put("pgPayDate", inicisMap.get("P_AUTH_DT"));
					map.put("payTotalAmt",inicisMap.get("P_AMT"));
					map.put("ip",request.getRemoteAddr());


	//				orderMap.put("v_bill_yn", "0");

					if(!"".equals(StringUtil.isNullToString(map.get("telNo1"))) && !"".equals(StringUtil.isNullToString(map.get("telNo2"))) && !"".equals(StringUtil.isNullToString(map.get("telNo3"))) ) {
						map.put("telNo", StringUtil.isNullToString(map.get("telNo1"))+"-"+StringUtil.isNullToString(map.get("telNo2"))+"-" +StringUtil.isNullToString(map.get("telNo3")));
					}

					if(!"".equals(StringUtil.isNullToString(map.get("hpNo1"))) && !"".equals(StringUtil.isNullToString(map.get("hpNo2"))) && !"".equals(StringUtil.isNullToString(map.get("hpNo3"))) ) {
						map.put("hpNo", StringUtil.isNullToString(map.get("hpNo1"))+"-"+StringUtil.isNullToString(map.get("hpNo2"))+"-" +StringUtil.isNullToString(map.get("hpNo3")));
					}

					map.put("inicisMap", inicisMap);
					sntBookService.insertOrderEdu(map, request);

					response.setCharacterEncoding("UTF-8");
		    		response.setContentType("text/html; charset=UTF-8");
			        PrintWriter printWriter = response.getWriter();

			        String script= "<script>";
			        script += "alert('수강신청 되었습니다.');";
			        script += "location.href='/kicpa/sntBook/offlineEduList.do?accEduUse=2'";

	//		        script += "opener.location.reload();";
	//		        script += "window.close();";
			        script += "</script>";

			        printWriter.println(script);




				}else {

					response.setCharacterEncoding("UTF-8");
		    		response.setContentType("text/html; charset=UTF-8");
			        PrintWriter printWriter = response.getWriter();

			        String script= "<script>";
			        script += "alert('수강신청에 실패하였습니다.\n' "+map.get("P_RMESG1")+");";
			        script += "location.href='/kicpa/sntBook/offlineEduList.do'";

	//		        script += "opener.location.reload();";
	//		        script += "window.close();";
			        script += "</script>";

			        printWriter.println(script);
					modelAndView.addObject("msg", map.get("P_RMESG1"));
				}
			}else {
				response.setCharacterEncoding("UTF-8");
	    		response.setContentType("text/html; charset=UTF-8");
		        PrintWriter printWriter = response.getWriter();

		        String script= "<script>";
		        script += "alert('로그인을 해주세요.');";
		        script += "location.href='/uat/uia/LoginUsr.do'";

//		        script += "opener.location.reload();";
//		        script += "window.close();";
		        script += "</script>";

		        printWriter.println(script);
			}
		}catch (Exception e) {

			e.printStackTrace();
		}

	}




}
