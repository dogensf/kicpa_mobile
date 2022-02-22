package adminwork.kicpa.sntBook.web;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.ArrayUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/sntBook")
public class SntBookController {

	@Resource(name = "sntBookService")
	private SntBookService sntBookService;

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;


	@RequestMapping(value = "/bookFormatList.do")
	public String bookFormatList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

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

	@RequestMapping(value = "/specialLectureList.do")
	public String specialLectureList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/specialLectureList";
	}

	@RequestMapping(value = "/offlineEduList.do")
	public String offlineEduList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/sntBook/offlineEduList";
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
		System.out.println(list);
		model.addAttribute("cartList", list);
		return "kicpa/sntBook/cartList";
	}

	@RequestMapping(value = "/bookBuyHistoryList.do")
	public String bookBuyHistoryList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		map.put("pslId", "5650320120323");
		List<EgovMap> list = sntBookService.selectBookBuyHistoryList(map);
		model.addAttribute("buyHistoryList", list);
		return "kicpa/sntBook/bookBuyHistoryList";
	}

	@RequestMapping(value = "/bookBuyHistoryDetail.do")
	public String bookBuyHistoryDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		map.put("pslId", "5650320120323");
		EgovMap detail = sntBookService.selectBookBuyHistoryOrderMaster(map);
		model.addAttribute("detail", detail);
		return "kicpa/sntBook/bookBuyHistoryDetail";
	}

	@RequestMapping(value = "/offlineEduDetail.do")
	public String offlineEduDetail(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		try {
			EgovMap detail = sntBookService.selectOfflineEduDetail(map);
			model.addAttribute("detail", detail);
		}catch (Exception e) {
			e.printStackTrace();
		}

		return "kicpa/sntBook/offlineEduDetail";
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
	public ModelAndView getBookFormatList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			List<EgovMap> list = sntBookService.selectBookFormatList(map);

			int totalCnt = sntBookService.selectBookFormatListCnt(map);
			 list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("bookFormatList", list);
			modelAndView.addObject("totalCnt", totalCnt);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/getSpecialLectureList.do")
	public ModelAndView getSpecialLectureList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			map.put("eduCode", "5650320120323"); //세선정보에서 불러오는거 현재 로그인이 없으므로 고정
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

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/getOfflineEduList.do")
	public ModelAndView getOfflineEduList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");
			List<EgovMap> list = sntBookService.selectOfflineEduList(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("list", list);

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
			map.put("pslId", "5650320120323");
			List<EgovMap> list = sntBookService.selectOfflineEduAppList(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value="/insertCart.do")
	public ModelAndView insertCart(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			modelAndView.setViewName("jsonView");

			HttpSession session = request.getSession();

			if(map.get("ibmBookCode") instanceof String ) {
				List list = new ArrayList<String>();
				list.add((String)map.get("ibmBookCode"));
				map.put("ibmBookCode",list);
			}

			List<EgovMap> list = sntBookService.selectCartInputBookList(map);

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
					if(flag) {
						list.remove(tempMap);
					}
				}
				if(list != null && !list.isEmpty()) {
					cartList.addAll(list);
					session.setAttribute("cartList", cartList);
				}

			}else {
				//배송란
				EgovMap tempMap = new EgovMap();
				tempMap.put("ibmBookCode", "999999");
				tempMap.put("ibmNum", "999999");
				tempMap.put("ibmBookName", "배송료");
				tempMap.put("ibmDeliverySep", (Object) null);
				tempMap.put("downDate", (Object) null);
				tempMap.put("bookDiv", "9");
				tempMap.put("CNT", "1");
				tempMap.put("ibmPrice1", "5000");
				tempMap.put("ibmPrice2", "5000");
				tempMap.put("amt", "5000");
				tempMap.put("saleAmt", "5000");
				list.add(tempMap);
				session.setAttribute("cartList", list);

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
							break;
						}
					}

				}

				if("DELETE".equals(map.get("gbn")) && temp != null ) {
					cartList.remove(temp);
				}

				if(cartList.size() == 1) {
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
			modelAndView.setViewName("jsonView");
			map.put("gbn", "INS");
			map.put("emaPslId", "5650320120323"); //세선정보에서 불러오는거 현재 로그인이 없으므로 고정
			map.put("emaKname", "5650320120323"); //세선정보에서 불러오는거 현재 로그인이 없으므로 고정
			map.put("emaAttend", "0");
		    map.put("emaIp", request.getHeader("NS-CLIENT-IP"));

			sntBookService.procedureEduAppAndModify(map);

			modelAndView.addObject("resultCode", map.get("resultCode"));
//			List<EgovMap> list = sntBookService.selectBookFormatList(map);
//
//			int totalCnt = sntBookService.selectBookFormatListCnt(map);

//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}







}
