package adminwork.kicpa.main.web;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.main.service.Main;
import adminwork.kicpa.main.service.MainService;
import adminwork.kicpa.main.service.Scalendar;
import adminwork.kicpa.notice.service.NoticeService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/main")
public class MainController {

	@Resource(name = "mainService")
	private MainService mainService;
	
	@Resource(name = "commonBoardService")
	private CommonBoardService commonBoardService;

	@Resource(name = "jobAdvertisementService")
	private JobAdvertisementService jobAdvertisementService;

	@Resource(name = "noticeService")
	NoticeService noticeService;


	@RequestMapping(value = "/main.do")
	public String main(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		
		return "kicpa/main/mainChk";
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		
			Cookie[] cookies = request.getCookies();		
			if(cookies != null) {
	
					for(Cookie c : cookies) {
						  if("loginIng".equals(c.getName())){
							  if("" != c.getValue() && null != c.getValue()) {	
								  System.out.println("0.loginIng::::::: "+ c.getValue());
								  if (!isAuthenticated) {
									  System.out.println("1.loginIng::::::: "+ c.getValue());
									  for(Cookie c2 : cookies) {
										  if("returnUrl".equals(c2.getName())){
											  if("" != c2.getValue() && null != c2.getValue()) {
												  Cookie cookie = new Cookie("returnUrl", "");		
												  	cookie.setPath("/");												  
													cookie.setMaxAge(0);
													response.addCookie(cookie);				  
											  }
										  }		  
										}
									  
									  return "redirect:/uat/uia/actionSecurityLoginMain.do";
								  
								  }
						  }		  
						}
					}
			}
		
		
		List<EgovMap> boardList = null;
		int totalCnt;


        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
        map.put("pageSize", 3);

        map.put("boardId", "noti");
        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
        }else {
        	boardList = commonBoardService.selectCommonBoardList(boardMaster);
        }

        List<EgovMap> jobBoardList = jobAdvertisementService.selectBoardList(map);

        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
        jobBoardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//        StringUtil.checkMapReplaceHtml(boardDetail);

        model.addAttribute("jobBoardList", jobBoardList);


		model.addAttribute("boardList", boardList);
		model.addAttribute("boardMaster", boardMaster);
		model.addAttribute("isLogin", isAuthenticated);

		
		SimpleDateFormat sdf1 = new SimpleDateFormat("MM");		
		Date now = new Date(); 
		String nowMM = sdf1.format(now);
		Scalendar vo = new Scalendar();
		vo.setYmd(nowMM);
		Scalendar cals = mainService.selectCalCnt(vo);
		if(cals == null) {
			cals = new Scalendar();
			cals.setCnt01(0);
			cals.setCnt02(0);
			cals.setCnt03(0);
		}
		model.addAttribute("sumCal",cals);
		model.addAttribute("nowMM",nowMM);
		
		
		return "kicpa/main/main";*/
	}
	
	@RequestMapping(value = "/main1.do")
	public String main1(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		
		Cookie[] cookies = request.getCookies();		
		if(cookies != null) {	
				for(Cookie c : cookies) {
					  if("loginIng".equals(c.getName().toString())){
						  if("" != c.getValue() && null != c.getValue()) {	
							  System.out.println("0.loginIng::::::: "+ c.getValue());
							  if (!isAuthenticated) {
								  System.out.println("1.loginIng::::::: "+ c.getValue());
								  Cookie cookie = new Cookie("returnUrl", "");		
								  	cookie.setPath("/");												  
									cookie.setMaxAge(0);
									response.addCookie(cookie);	
								  
								  return "/uat/uia/autoLogin";
							  
							  }
					  }		  
					}
				}
		}
	
		String userId="test";
		if (isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			userId = user.getId();
		}
		
		List<EgovMap> boardList = null;
		int totalCnt;


        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
        map.put("pageSize", 3);

        map.put("boardId", "noti");
        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
        }else {
        	boardList = commonBoardService.selectCommonBoardList(boardMaster);
        }

        List<EgovMap> jobBoardList = jobAdvertisementService.selectBoardList(map);

        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
        jobBoardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//        StringUtil.checkMapReplaceHtml(boardDetail);

        model.addAttribute("jobBoardList", jobBoardList);


		model.addAttribute("boardList", boardList);
		model.addAttribute("boardMaster", boardMaster);
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("userId", userId);
		

		
		SimpleDateFormat sdf1 = new SimpleDateFormat("MM");		
		Date now = new Date(); 
		String nowMM = sdf1.format(now);
		Scalendar vo = new Scalendar();
		vo.setYmd(nowMM);
		Scalendar cals = mainService.selectCalCnt(vo);
		if(cals == null) {
			cals = new Scalendar();
			cals.setCnt01(0);
			cals.setCnt02(0);
			cals.setCnt03(0);
		}
		model.addAttribute("sumCal",cals);
		model.addAttribute("nowMM",nowMM);
		
		
		return "kicpa/main/main";
	}
	
	@RequestMapping(value = "/main2.do")
	public String main2(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		List<EgovMap> boardList = null;
		int totalCnt;


        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
        map.put("pageSize", 3);

        map.put("boardId", "noti");
        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
        }else {
        	boardList = commonBoardService.selectCommonBoardList(boardMaster);
        }

        List<EgovMap> jobBoardList = jobAdvertisementService.selectBoardList(map);

        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
        jobBoardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//        StringUtil.checkMapReplaceHtml(boardDetail);

        model.addAttribute("jobBoardList", jobBoardList);


		model.addAttribute("boardList", boardList);
		model.addAttribute("boardMaster", boardMaster);
		model.addAttribute("isLogin", isAuthenticated);

		
		SimpleDateFormat sdf1 = new SimpleDateFormat("MM");		
		Date now = new Date(); 
		String nowMM = sdf1.format(now);
		Scalendar vo = new Scalendar();
		vo.setYmd(nowMM);
		Scalendar cals = mainService.selectCalCnt(vo);
		if(cals == null) {
			cals = new Scalendar();
			cals.setCnt01(0);
			cals.setCnt02(0);
			cals.setCnt03(0);
		}
		model.addAttribute("sumCal",cals);
		model.addAttribute("nowMM",nowMM);
		
		
		return "kicpa/main/main";
	}


	@RequestMapping(value="/getJobBoardList.do")
    public ModelAndView getBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 3);
	        List<EgovMap> list = jobAdvertisementService.selectBoardList(map);



	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//	        StringUtil.checkMapReplaceHtml(boardDetail);

			modelAndView.addObject("boardList", list);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }


	@RequestMapping(value="/getNewsList.do")
    public ModelAndView getNewsList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{
	        modelAndView.setViewName("jsonView");
	        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
	        map.put("pageSize", 3);
	        List<EgovMap> list = noticeService.selectNewsList(map);


	        list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//	        StringUtil.checkMapReplaceHtml(boardDetail);

			modelAndView.addObject("boardList", list);
			modelAndView.addObject("pageIndex", map.get("pageIndex"));

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	// boardId가 다수일때
		@RequestMapping(value="/getCommonBoardArrList.do")
	    public ModelAndView getBoardArrList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
			ModelAndView modelAndView = new ModelAndView();

	    	try{
	    		modelAndView.setViewName("jsonView");

	    		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {

		    		List<EgovMap> boardList = null;
		    		int totalCnt;


			        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
			        map.put("pageSize", 3);

			        map.put("boardIds", StringUtil.isNullToString(map.get("boardId"),"").split("/"));


			        boardList = commonBoardService.selectCommonBoardIdArrList(map);
			        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));

					modelAndView.addObject("boardList", boardList);
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


		@RequestMapping(value="/getCommonBoardList.do")
	    public ModelAndView getCommonBoardList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
			ModelAndView modelAndView = new ModelAndView();

	    	try{
	    		modelAndView.setViewName("jsonView");

	    		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    		if(!"Y".equals(map.get("loginYn")) || isAuthenticated) {

	    			if(isAuthenticated) {
	    				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	    				map.put("userId", user.getId());
	    			}

		    		List<EgovMap> boardList = null;


			        map.put("pageIndex", StringUtil.isNullToString(map.get("pageIndex"), "1"));
			        map.put("pageSize", 3);

			        Map<String,Object> boardMaster = commonBoardService.selectBoardMaster(map);

			        //param를 boardmaster맵으로 merge
			        map.forEach((key,value)-> boardMaster.merge(key, value, (v1,v2)->v2));

			        if("Y".equals(boardMaster.get("owntblYn")) && "CAFE".equals(boardMaster.get("owntblFix"))) {
			        	boardList = commonBoardService.selectCommonCafeBoardList(boardMaster);
			        }else {
			        	boardList = commonBoardService.selectCommonBoardList(boardMaster);

			        }

			        boardList.forEach(x -> StringUtil.checkMapReplaceHtml(x));
					modelAndView.addObject("boardList", boardList);
					modelAndView.addObject("boardMaster", boardMaster);
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


		@RequestMapping(value = "/scheduleDetail.do")
		public String scheduleDetail(@RequestParam("type") String type,@RequestParam("month") String month, HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
			
			String typeNm = "";
			if( "01".equals(type)) {
				typeNm = "회계감사";
			}else if("02".equals(type)) {
				typeNm = "세무";
			}else if("03".equals(type)) {
				typeNm = "업무";
			}

			Scalendar vo = new Scalendar();
			vo.setSchTy(type);
			vo.setYmd(month);
			
			
			model.addAttribute("list",mainService.selectCalList(vo));
			model.addAttribute("type", type);
			model.addAttribute("nowMM", month);
			

			return "kicpa/mainDetail/scheduleDetail";
		}
		
		@RequestMapping(value="/getCalendarInfo.do")
	    public ModelAndView getCalendarInfo(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
			ModelAndView modelAndView = new ModelAndView();

	    	try{
		        modelAndView.setViewName("jsonView");
		        Scalendar vo = new Scalendar();
				vo.setYmd(String.valueOf(map.get("yyyymm")));
				
				
				modelAndView.addObject("sumCal",mainService.selectCalCnt(vo));
				
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}

	        return modelAndView;
	    }
		
		
		@RequestMapping(value = "/setFcmToken.do")
	    public ModelAndView setFcmToken(@RequestBody Map<String,Object> map, HttpServletResponse response, HttpServletRequest request) throws Exception{
			ModelAndView modelAndView = new ModelAndView();
			
	    	try{
	    		
	    		Cookie cookie = new Cookie("token", map.get("token").toString());
				cookie.setPath("/");
				cookie.setMaxAge(60*60*24*7);
				response.addCookie(cookie);
	    		
		        modelAndView.setViewName("jsonView");
		        Main vo = new Main();
				vo.setToken(map.get("token").toString());
					Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    			if(isAuthenticated) {
	    				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	    				vo.setUserid(user.getId());
	    			}else {
		    			vo.setUserid(null);
		    		}
	    		mainService.setFcmToken(vo);
	    		
				
				
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}

	        return modelAndView;
	    }
		
		
		@RequestMapping(value="/getCyberToken.do")
	    public String getCyberToken(@RequestParam("userId") String userId,  HttpServletRequest request,HttpServletResponse res,ModelMap model) throws Exception{
			ModelAndView modelAndView = new ModelAndView();
			String Token="";
	    	try{
	    		
	    		String client_id = "a2ljcGFfYXBw";
	            String client_secret = "152556ec74c53f201e0d926adf3fdcc09a9cb31488e71bc0dd5ca4f55d7af1f9";
	            String scope = "all";
	            String return_type = "json";
	            String callback_data = "intent://kicpaapp";
	            
	            try {
	                String user_id = URLEncoder.encode(userId, "UTF-8");
	                String apiURL = "https://cyber.kicpa.or.kr/resource/token";
	                URL url = new URL(apiURL);
	                HttpURLConnection con = (HttpURLConnection)url.openConnection();
	                con.setRequestMethod("POST");
	                con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	                // post request
	                String postParams = "client_id="+client_id;
	                postParams += "&client_secret=" + client_secret;
	                postParams += "&scope=" + scope;
	                postParams += "&return_type=" + return_type;
	                postParams += "&callback_data=" + callback_data;
	                postParams += "&user_id=" + user_id;
	                con.setDoOutput(true);
	                DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	                wr.writeBytes(postParams);
	                wr.flush();
	                wr.close();
	                int responseCode = con.getResponseCode();
	                BufferedReader br;
	                if(responseCode==200) { // 정상 호출
	                    br = new BufferedReader(new InputStreamReader(con.getInputStream()));
	                } else {  // 에러 발생
	                    br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
	                }
	                String inputLine;
	                StringBuffer response = new StringBuffer();
	                while ((inputLine = br.readLine()) != null) {	                	
	                    response.append(inputLine);
	                }
	                br.close();
	                System.out.println(response.toString());
	                JSONParser parser = new JSONParser();
	                JSONObject rt = (JSONObject) parser.parse(response.toString());
	                System.out.println("--------:: "+ rt.get("token"));
	                Token = rt.get("token").toString();
	                
	            } catch (Exception e) {
	                System.out.println(e);
	            }

	    		
	    		
	    		model.addAttribute("token",Token);
				model.addAttribute("login_id", Token);
				model.addAttribute("login_pw", Token);
				
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}

	    	return "kicpa/mainDetail/cyberKicpa";
	    }
		
		
}
