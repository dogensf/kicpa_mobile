package adminwork.kicpa.cmm.comm.web;


import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import nice.intc.module.IntcClient;
import nice.intc.module.model.IntcResultReqInfo;
import nice.intc.module.model.IntcResultResInfo;
import nice.intc.module.model.IntcUrlReqInfo;
import nice.intc.module.model.IntcUrlResInfo;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;


@Controller
@RequestMapping(value="/kicpa/common")
public class KicpaCommController {

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;



    private static String accessToken;
    private static String refreshToken;
    private static long expiryTime;
    private static final ObjectMapper mapper = new ObjectMapper();




    //본인인증 신규 모듈 (SDK 방식)
    @RequestMapping(value = "/cpaMemNiceCheck.do")
    @ResponseBody
    public IntcUrlResInfo cpaMemNiceCheck(@RequestBody Map<String, Object> paramMap, HttpSession session) throws Exception{

        //ModelAndView resultJs = new ModelAndView("jsonView");

        NiceID.Check.CPClient niceCheck = new NiceID.Check.CPClient();

        String sSiteCode = "G2760";			// NICE로부터 부여받은 사이트 코드

        // 요청번호 생성
        String sRequestNumber = niceCheck.getRequestNO(sSiteCode);
        session.setAttribute("REQ_SEQ", sRequestNumber);	// 해킹등의 방지를 위하여 세션에 요청번호를 넣는다.

        // SDK 방식 - IntcUrlReqInfo 설정
        IntcUrlReqInfo intcUrlReqInfo = new IntcUrlReqInfo();

        // 필수 항목
        intcUrlReqInfo.setApiDomain("https://auth.niceid.co.kr");
        intcUrlReqInfo.setClientId("NIaa776f44-53f5-4564-a881-47572bd9936a");
        intcUrlReqInfo.setClientSecret("Yjg0ZTc1Y2MtMDlkNy00OGRmLWE3MzctYmY3Nzc1OWUyZDFhNjZDQzVGNDc5NEEyOEM0MkVBODcwRjlF");
        intcUrlReqInfo.setResultUrl(paramMap.get("movePage").toString());
        intcUrlReqInfo.setSvcTypes(Arrays.asList("M"));  // M:휴대폰 F:금융인증서 U:공동인증서 I:아이핀

        // 선택 항목
        //intcUrlReqInfo.setCloseUrl("https://your-domain/close");
        intcUrlReqInfo.setRequestNo(sRequestNumber);
        //intcUrlReqInfo.setMethodType(IntcCodeUtil.METHOD_TYPE.GET);
        //intcUrlReqInfo.setExpMods(Collections.singletonList("closeButtonOn"));
        intcUrlReqInfo.setConnectTimeout(3000);
        intcUrlReqInfo.setReadTimeout(7000);

        // IntcClient로 인증 URL 요청
        IntcClient intcClient = new IntcClient();
        IntcUrlResInfo intcUrlResInfo = intcClient.getAuthUrl(intcUrlReqInfo);

        // 세션에 intcUrlResInfo 저장 (다른 컨트롤러에서 사용)
        session.setAttribute("intcUrlResInfo", intcUrlResInfo);

        //  인증할 표준창 URL 응답 처리
        if ("0000".equals(intcUrlResInfo.getReturnCode())) {
            System.out.println("응답코드:"+intcUrlResInfo.getReturnCode());
            System.out.println("응답메세지:"+intcUrlResInfo.getResultMessage());
            /*System.out.println("요청고유번호:"+intcUrlResInfo.getRequestNo());
            System.out.println("트랜잭션아이디:"+intcUrlResInfo.getTransactionId());
            System.out.println("인증요청 URL:"+intcUrlResInfo.getAuthUrl());*/
        } else {
            System.out.println("응답코드:"+intcUrlResInfo.getReturnCode());
            System.out.println("응답메세지:"+intcUrlResInfo.getResultMessage());
        }

        return intcUrlResInfo;
    }

    //본인인증 토큰 발급
    private static void fetchToken(String reqNo) throws Exception {
        System.out.println("fetchToken() 실행--- reqNo ====> " + reqNo);
        //운영
        String body = "grant_type=client_credentials&request_no="+ reqNo;

        //API 버전
        String version = "v1.0";

        //운영
        String tokenUrl = "https://auth.niceid.co.kr/ido/intc/"+version+"/auth/token";
        String clientId = "NIaa776f44-53f5-4564-a881-47572bd9936a";
        String clientSecret = "Yjg0ZTc1Y2MtMDlkNy00OGRmLWE3MzctYmY3Nzc1OWUyZDFhNjZDQzVGNDc5NEEyOEM0MkVBODcwRjlF";

        String auth = clientId + ":" + clientSecret;
        String encodedAuth = Base64.getUrlEncoder().withoutPadding().encodeToString(auth.getBytes());  // Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
        String authorization = "Basic " + encodedAuth;

        System.out.println("authorization: " + authorization);

        CloseableHttpClient httpClient = HttpClients.createDefault();
        try {
            HttpPost httpPost = new HttpPost(tokenUrl);
            httpPost.setHeader("Authorization", authorization);
            httpPost.setEntity(new StringEntity(body, StandardCharsets.UTF_8));

            CloseableHttpResponse response = httpClient.execute(httpPost);
            try {
                String responseBody = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);

                System.out.println("Token Response: " + responseBody);

                JsonNode node = mapper.readTree(responseBody);
                accessToken = node.get("access_token").asText();
                refreshToken = node.get("refresh_token").asText();
                int expiresIn = node.get("expires_in").asInt(); // 초 단위
                expiryTime = System.currentTimeMillis() + ((expiresIn - 10) * 1000L);

                System.out.println("New Token Issued: " + accessToken);
            } finally {
                response.close();
            }
        } finally {
            httpClient.close();
        }
    }

    // 유효한 토큰 가져오기
    private static String getValidToken(String reqNo) throws Exception {
        if (accessToken == null || System.currentTimeMillis() >= expiryTime) {
            fetchToken(reqNo);
        }
        return accessToken;
    }

	@RequestMapping(value="/getCheckplusEncData.do")
    public ModelAndView getCheckplusEncData(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

    	try{

    		HttpSession session = request.getSession();

	        modelAndView.setViewName("jsonView");

	        NiceID.Check.CPClient niceCheck = new  NiceID.Check.CPClient();

	        String sSiteCode = "G2760";// NICE로부터 부여받은 사이트 코드
	        String sSitePassword = "OGVOHRYMMD4N";		// NICE로부터 부여받은 사이트 패스워드

	        String sRequestNumber = "REQ0000000001";        	// 요청 번호, 이는 성공/실패후에 같은 값으로 되돌려주게 되므로
	                                                        	// 업체에서 적절하게 변경하여 쓰거나, 아래와 같이 생성한다.
	        sRequestNumber = niceCheck.getRequestNO(sSiteCode);
	        session.setAttribute("REQ_SEQ" , sRequestNumber);

	       	String sAuthType = "";      	// 없으면 기본 선택화면, M(휴대폰), X(인증서공통), U(공동인증서), F(금융인증서), S(PASS인증서), C(신용카드)
	    	String customize 	= "Mobile";		//없으면 기본 웹페이지 / Mobile : 모바일페이지

	        // CheckPlus(본인인증) 처리 후, 결과 데이타를 리턴 받기위해 다음예제와 같이 http부터 입력합니다.
	    	//리턴url은 인증 전 인증페이지를 호출하기 전 url과 동일해야 합니다. ex) 인증 전 url : http://www.~ 리턴 url : http://www.~
			String sReturnUrl = "";      // 성공시 이동될 URL
			String sErrorUrl = "";          // 실패시 이동될 URL
			if(!"".equals(map.get("movePage")) && map.get("movePage") != null){
				sReturnUrl = map.get("movePage").toString();      // 성공시 이동될 URL
				sErrorUrl = map.get("movePage").toString();          // 실패시 이동될 URL
			}
			else{
				sReturnUrl = "https://mkip.kicpa.or.kr/kicpa/common/getCheckplusSuccess.do";      // 성공시 이동될 URL
				sErrorUrl = "https://mkip.kicpa.or.kr/kicpa/common/getCheckplusFail.do";          // 실패시 이동될 URL
			}

	        // 입력될 plain 데이타를 만든다.
	        String sPlainData = "7:REQ_SEQ" + sRequestNumber.getBytes().length + ":" + sRequestNumber +
	                            "8:SITECODE" + sSiteCode.getBytes().length + ":" + sSiteCode +
	                            "9:AUTH_TYPE" + sAuthType.getBytes().length + ":" + sAuthType +
	                            "7:RTN_URL" + sReturnUrl.getBytes().length + ":" + sReturnUrl +
	                            "7:ERR_URL" + sErrorUrl.getBytes().length + ":" + sErrorUrl +
	                            "9:CUSTOMIZE" + customize.getBytes().length + ":" + customize;

	        String sMessage = "";
	        String sEncData = "";

	        int iReturn = niceCheck.fnEncode(sSiteCode, sSitePassword, sPlainData);
	        if( iReturn == 0 )
	        {
	            sEncData = niceCheck.getCipherData();
	        }
	        else if( iReturn == -1)
	        {
	            sMessage = "암호화 시스템 에러입니다.";
	        }
	        else if( iReturn == -2)
	        {
	            sMessage = "암호화 처리오류입니다.";
	        }
	        else if( iReturn == -3)
	        {
	            sMessage = "암호화 데이터 오류입니다.";
	        }
	        else if( iReturn == -9)
	        {
	            sMessage = "입력 데이터 오류입니다.";
	        }
	        else
	        {
	            sMessage = "알수 없는 에러 입니다. iReturn : " + iReturn;
	        }



			modelAndView.addObject("sMessage", sMessage);
			modelAndView.addObject("sEncData", sEncData);

    	}catch (Exception e) {
    		e.printStackTrace();
		}

        return modelAndView;
    }

	@RequestMapping(value="/setLocation.do")
	public ModelAndView setLocation(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{

			HttpSession session = request.getSession();

			modelAndView.setViewName("jsonView");
			
			System.out.println("--------"+map.get("returnUrl"));

			if(!"".equals(StringUtil.isNullToString(map.get("returnUrl"))) ) {
				session.setAttribute("returnUrl", map.get("returnUrl"));
			}


		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}


	@RequestMapping(value="/getCheckplusSuccess.do")
    public void getCheckplusSuccess(HttpServletRequest request,HttpServletResponse response) throws Exception{

    	try{
    		Map<String,Object> map = new HashMap<String,Object>();

    		response.setCharacterEncoding("UTF-8");
    		response.setContentType("text/html; charset=UTF-8");

    		HttpSession session = request.getSession();


	        NiceID.Check.CPClient niceCheck = new  NiceID.Check.CPClient();

	        String sEncodeData = requestReplace(request.getParameter("EncodeData"), "encodeData");

	        String sSiteCode = "G2760";// NICE로부터 부여받은 사이트 코드
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
//	            sResponseNumber = (String)mapresult.get("RES_SEQ");
//	            sAuthType		= (String)mapresult.get("AUTH_TYPE");
//	            sName			= (String)mapresult.get("NAME");
//	    		//sName			= (String)mapresult.get("UTF8_NAME"); //charset utf8 사용시 주석 해제 후 사용
//	            sBirthDate		= (String)mapresult.get("BIRTHDATE");
//	            sGender			= (String)mapresult.get("GENDER");
//	            sNationalInfo  	= (String)mapresult.get("NATIONALINFO");
//	            sDupInfo		= (String)mapresult.get("DI");
//	            sConnInfo		= (String)mapresult.get("CI");
//	            sMobileNo		= (String)mapresult.get("MOBILE_NO");
//	            sMobileCo		= (String)mapresult.get("MOBILE_CO");
//	            System.out.println("mapresult : " + mapresult);



	            String session_sRequestNumber = (String)session.getAttribute("REQ_SEQ");
	            session.removeAttribute("REQ_SEQ");
	            System.out.println("sRequestNumber : " + sRequestNumber + " : " + session_sRequestNumber ) ;
	            if(!sRequestNumber.equals(session_sRequestNumber))
	            {
	                sMessage = "세션값 불일치 오류입니다.";
	                sResponseNumber = "";
	                sAuthType = "";
	            }else {
	            	map.put("immDi", mapresult.get("DI"));
	            	map.put("immJupin", mapresult.get("BIRTHDATE"));
	            	map.put("immJupinSep", "4");

	            	kicpaCommService.selectImmnum(map);
	            	map.get("immnum");
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

	        PrintWriter printWriter = response.getWriter();

	        String script= "<script>";
	        script += "alert('본인인증 되었습니다.');";
	        script += "opener.location.reload();";
	        script += "window.close();";
	        script += "</script>";

	        printWriter.println(script);
//	        printWriter.flush();


	        System.out.println("sMessage : " + sMessage);

    	}catch (Exception e) {
    		e.printStackTrace();
		}

    }


	@RequestMapping(value="/getCheckplusFail.do")
	public void getCheckplusFail(HttpServletRequest request,HttpServletResponse response) throws Exception{

		try{
			response.setCharacterEncoding("UTF-8");
    		response.setContentType("text/html; charset=UTF-8");

			HttpSession session = request.getSession();

			NiceID.Check.CPClient niceCheck = new  NiceID.Check.CPClient();

		    String sEncodeData = requestReplace(request.getParameter("EncodeData"), "encodeData");

	        String sSiteCode = "G2760";// NICE로부터 부여받은 사이트 코드
	        String sSitePassword = "OGVOHRYMMD4N";		// NICE로부터 부여받은 사이트 패스워드

		    String sCipherTime = "";			// 복호화한 시간
		    String sRequestNumber = "";			// 요청 번호
		    String sErrorCode = "";				// 인증 결과코드
		    String sAuthType = "";				// 인증 수단
		    String sMessage = "";
		    String sPlainData = "";

		    int iReturn = niceCheck.fnDecode(sSiteCode, sSitePassword, sEncodeData);

		    if( iReturn == 0 )
		    {
		        sPlainData = niceCheck.getPlainData();
		        sCipherTime = niceCheck.getCipherDateTime();

		        // 데이타를 추출합니다.
		        java.util.HashMap mapresult = niceCheck.fnParse(sPlainData);

		        sRequestNumber 	= (String)mapresult.get("REQ_SEQ");
		        sErrorCode 		= (String)mapresult.get("ERR_CODE");
		        sAuthType 		= (String)mapresult.get("AUTH_TYPE");
		    }
		    else if( iReturn == -1)
		    {
		        sMessage = "복호화 시스템 에러입니다.";
		    }
		    else if( iReturn == -4)
		    {
		        sMessage = "복호화 처리오류입니다.";
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


	        PrintWriter printWriter = response.getWriter();

	        String script= "<script>";
	        script += "alert('본인인증에  실패하였습니다.');";
	        script += "opener.location.reload();";
	        script += "window.close();";
	        script += "</script>";

	        printWriter.println(script);

			System.out.println("sMessage : " + sMessage);

		}catch (Exception e) {
			e.printStackTrace();
		}

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
