package adminwork.kicpa.cmm.comm.web;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Controller
@RequestMapping(value="/kicpa/common")
public class KicpaCommController {


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
	        String sReturnUrl = "http://localhost:8080/kicpa/common/getCheckplusSuccess.do";      // 성공시 이동될 URL
	        String sErrorUrl = "http://localhost:8080/kicpa/common/getCheckplusFail.do";          // 실패시 이동될 URL

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


	@RequestMapping(value="/getCheckplusSuccess.do")
    public void getCheckplusSuccess(HttpServletRequest request,HttpServletResponse response) throws Exception{

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

//	            sRequestNumber  = (String)mapresult.get("REQ_SEQ");
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

	            session.setAttribute("mapresult" , mapresult);

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
