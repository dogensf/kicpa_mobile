package adminwork.kicpa.myp.web;


import java.io.BufferedInputStream;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import adminwork.com.cmm.LoginVO;
import adminwork.kicpa.myp.service.MyPageService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping(value="/kicpa/myp")
public class MyPageController {

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

	@RequestMapping(value = "/myPage.do")
	public String myPage(String Pin, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("pin",user.getUniqId());

			String myPageRegFlag ="N";			//합격자 등록여부

			String trainFlag ="N";		//수습 화면 구분	N- 등록안내화면, Y-승인 진행 화면, F-반려화면, E-수습정보화면, D-수습정보 안보이게, H-수습공인회계사 정보 숨김(외감포함)
			String audTrainFlag ="N";	//외감 화면 구분	N- 등록안내화면, Y-승인 진행 화면, F-반려화면, E-외감정보화면,
			String cpaMemFlag ="N";		//회원 화면 구분	N- 등록안내화면, Y-승인 진행 화면, F-반려화면, E-회원정보화면

			String cpaAidFlag="N";		//등록회비 납부여부

			//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
			List<?> cpaPassRealInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemPassRealInfo = new HashMap<>();
			if(cpaPassRealInfo.size()>0){
				cpaMemPassRealInfo.putAll((Map<String, Object>)cpaPassRealInfo.get(0));
			}

			if("Y".equals(cpaMemPassRealInfo.get("regFlag"))){
				myPageRegFlag ="Y";
				//회원 사진 정보(실제테이블)
				List<?> cpaPhotoRealInfoList = myPageService.selectCpaMberPhotoInfoList(paramMap);

				//사진정보
				Map<String, Object> cpaMemPictInfo = new HashMap<>();
				if(cpaPhotoRealInfoList.size()>0){
					cpaMemPictInfo.putAll((Map<String, Object>)cpaPhotoRealInfoList.get(0));
					byte imageContent[] = blobToBytes((Blob) cpaMemPictInfo.get("photo"));

					String memPict = "";

					if(imageContent.length > 0 && imageContent != null){ //데이터가 들어 있는 경우
						//바이트를 base64인코딩 실시
						String base64Encode = byteToBase64(imageContent);
						base64Encode = "data:image/jpg;base64," + base64Encode;
						memPict = base64Encode;
					}
					else {
						memPict = "";
					}
					model.addAttribute("memPict", memPict);
				}


				//수습정보 확인(실제 테이블)
				List<?> cpaTrainRegReal = myPageService.selectCpaTrainRegistInfoList(paramMap);
				Map<String, Object> cpaTrainRegRealInfo = new HashMap<>();

				//수습정보 가져오기(임시테이블)
				List<?> cpaTrainReg = myPageService.selectCpaTrainRegistReviewInfoList(paramMap);
				Map<String, Object> cpaTrainRegInfo = new HashMap<>();
				if(cpaTrainReg.size()>0){
					cpaTrainRegInfo.putAll((Map<String, Object>)cpaTrainReg.get(0));
				}
				else{
					cpaTrainRegInfo.put("regFlag","N");
				}

				//수습 정보가 있을 경우(수습 등록 완료)
				if(cpaTrainRegReal.size()>0) {
					cpaTrainRegRealInfo.putAll((Map<String, Object>)cpaTrainRegReal.get(0));

					//실제 등록취소후 새로 수습정보 입력했을 경우(승인진행 보여주기)
					int appProgressDays = 0;
					int leftDays = 0;
					long totalCount = 0;
					long passCount = 0;
					long leftCount = 0;
					int totalDays = 0;
					int passDays = 0;

					String appProgressDaysYn = "Y";
					if("A1010040".equals(cpaTrainRegRealInfo.get("apntcCl"))){
						if("Y".equals(cpaTrainRegInfo.get("regFlag"))){
							trainFlag="Y";
						}
						else if("F".equals(cpaTrainRegInfo.get("regFlag"))){
							trainFlag="F";
						}
						appProgressDaysYn = "N";
					}
					else{
						trainFlag="E";
					}

					Calendar cal = Calendar.getInstance();
					cal.setTime( new Date(System.currentTimeMillis()));
					String today = new SimpleDateFormat("yyyy-MM-dd").format( cal.getTime()); // 오늘날짜

					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

					Date todayDate = new Date(dateFormat.parse(today).getTime());

					//기본실무 진행률 계산
					if(!"N".equals(appProgressDaysYn)){

						Date appRegistEndDate = new Date();

						Date appRegistDate = new Date(dateFormat.parse(cpaTrainRegRealInfo.get("appRegistDe").toString()).getTime());
						if(!"".equals(cpaTrainRegRealInfo.get("appRegistEndDe")) && cpaTrainRegRealInfo.get("appRegistEndDe") != null){
							appRegistEndDate = new Date(dateFormat.parse(cpaTrainRegRealInfo.get("appRegistEndDe").toString()).getTime());
						}
						else{
							if(!"".equals(cpaTrainRegRealInfo.get("appEndDe")) && cpaTrainRegRealInfo.get("appEndDe") != null){
								appRegistEndDate = new Date(dateFormat.parse(cpaTrainRegRealInfo.get("appEndDe").toString()).getTime());
							}

						}

						totalCount = appRegistEndDate.getTime() - appRegistDate.getTime();
						passCount = todayDate.getTime() - appRegistDate.getTime();
						leftCount = appRegistEndDate.getTime() - todayDate.getTime();

						totalDays = (int) (totalCount / ( 24*60*60*1000));				//총기간
						passDays = (int) (passCount / ( 24*60*60*1000));				//지나간 일수
						leftDays = (int) (leftCount / ( 24*60*60*1000));				//남은 일수

						appProgressDays = (int)((double) passDays / (double) totalDays * 100.0);		//수습 기본실무 진행률

						if(appProgressDays >=100){
							appProgressDays = 100;
						}
						if(appProgressDays < 0){
							appProgressDays = 0;
						}
					}

					paramMap.put("appCpaNo",cpaTrainRegRealInfo.get("appCpaNo"));
					//기본실무 종료했을 경우 남은 일수 0
					if(!"".equals(cpaTrainRegRealInfo.get("appEndDe")) && cpaTrainRegRealInfo.get("appEndDe") != null){
						leftDays = 0;
					}

					model.addAttribute("cpaTrainRegReal", cpaTrainRegReal);
					model.addAttribute("appProgressDays", appProgressDays);
					model.addAttribute("leftDays", leftDays);

					//외감 정보가 있을경우
					if(!"".equals(cpaTrainRegRealInfo.get("audRegistDe")) && cpaTrainRegRealInfo.get("audRegistDe") != null){
						trainFlag ="D";
						audTrainFlag="E";

						//외감실무 진행률 계산
						Date audRegistDate = new Date(dateFormat.parse(cpaTrainRegRealInfo.get("audRegistDe").toString()).getTime());
						Date audRegistEndDate = new Date();
						if(!"".equals(cpaTrainRegRealInfo.get("audRegistEndDe")) && cpaTrainRegRealInfo.get("audRegistEndDe") != null){
							audRegistEndDate = new Date(dateFormat.parse(cpaTrainRegRealInfo.get("audRegistEndDe").toString()).getTime());
						}
						else{
							if(!"".equals(cpaTrainRegRealInfo.get("audEndDe")) && cpaTrainRegRealInfo.get("audEndDe") != null){
								audRegistEndDate = new Date(dateFormat.parse(cpaTrainRegRealInfo.get("audEndDe").toString()).getTime());
							}
						}

						totalCount = audRegistEndDate.getTime() - audRegistDate.getTime();
						passCount = todayDate.getTime() - audRegistDate.getTime();

						totalDays = (int) (totalCount / ( 24*60*60*1000));				//총기간
						passDays = (int) (passCount / ( 24*60*60*1000));				//지나간 일수

						int audProgressDays = (int)((double) passDays / (double) totalDays * 100.0);		//외감 실무 진행률

						if(audProgressDays >=100){
							audProgressDays = 100;
						}
						if(audProgressDays < 0){
							audProgressDays = 0;
						}

						if(!"".equals(cpaTrainRegRealInfo.get("audEndDe")) && cpaTrainRegRealInfo.get("audEndDe") != null){
							audProgressDays = 100;
						}

						model.addAttribute("audProgressDays", audProgressDays);
					}
					else{
						//외감 정보조회(임시테이블)
						List<?> cpaAudTrainReg = myPageService.selectCpaAudTrainRegistReviewInfoList(paramMap);
						Map<String, Object> cpaAudTrainRegInfo = new HashMap<>();
						if(cpaAudTrainReg.size()>0){
							cpaAudTrainRegInfo.putAll((Map<String, Object>)cpaAudTrainReg.get(0));
						}
						else{
							cpaAudTrainRegInfo.put("regFlag","N");
							audTrainFlag="N";
						}


						model.addAttribute("cpaAudTrainRegInfo", cpaAudTrainRegInfo);

						//외감 regFlag에 따라 화면 정보 보여주기
						if("Y".equals(cpaAudTrainRegInfo.get("regFlag"))){
							audTrainFlag="Y";
						}
						else if("F".equals(cpaAudTrainRegInfo.get("regFlag"))){
							audTrainFlag="F";
						}
					}
				}
				//수습 정보가 없을경우 (수습 미등록)
				else{

					if("Y".equals(cpaTrainRegInfo.get("regFlag"))){
						trainFlag="Y";
					}
					else if("F".equals(cpaTrainRegInfo.get("regFlag"))){
						trainFlag="F";
					}
					model.addAttribute("cpaTrainRegInfo", cpaTrainRegInfo);
				}


				//회원정보 조회(실제테이블)
				List<?> cpaMemberRegReal = myPageService.selectCpaMemberRegistInfoList(paramMap);
				Map<String, Object> cpaMemberRegRealInfo = new HashMap<>();

				//회원정보 있을경우
				if(cpaMemberRegReal.size()>0){
					cpaMemFlag = "E";
					cpaMemberRegRealInfo.putAll((Map<String, Object>)cpaMemberRegReal.get(0));
					model.addAttribute("cpaMemberRegReal", cpaMemberRegReal);

					if(cpaTrainRegReal.size() < 1 || cpaTrainRegReal == null) {
						trainFlag = "H";
					}
				}
				else{
					//회원 정보조회(임시테이블)
					List<?> cpaMemberReg = new ArrayList<HashMap>();
					cpaMemberReg = myPageService.selectCpaMemberRegistReviewInfoList(paramMap);		//회원 임시테이블정보
					Map<String, Object> cpaMemberRegInfo = new HashMap<>();

					if(cpaMemberReg.size()>0){
						cpaMemberRegInfo.putAll((Map<String, Object>)cpaMemberReg.get(0));

						if(!"".equals(cpaMemberRegInfo.get("sbscrbYn")) && cpaMemberRegInfo.get("sbscrbYn") != null){
							cpaAidFlag = cpaMemberRegInfo.get("sbscrbYn").toString();
						}
					}
					else{
						cpaMemberRegInfo.put("regFlag","N");
						cpaMemFlag="N";
					}


					model.addAttribute("cpaMemberRegInfo", cpaMemberRegInfo);

					//회원 regFlag에 따라 화면 정보 보여주기 (수습정보가 있을경우)
					if("Y".equals(cpaMemberRegInfo.get("regFlag")) && cpaTrainRegReal != null && cpaTrainRegReal.size() > 0){
						cpaMemFlag="Y";


					}
					else if("F".equals(cpaMemberRegInfo.get("regFlag"))){
						cpaMemFlag="F";
					}
				}

				//세무사 세무대리 정보
				List<?> cpaTaxAcutInfoList = myPageService.selectCpaTaxAcutInfoList(paramMap);
				Map<String, Object> cpaTaxAcutInfo = new HashMap<>();

				//세무사 세무대리 정보 있을경우
				if(cpaTaxAcutInfoList.size()>0){
					cpaTaxAcutInfo.putAll((Map<String, Object>)cpaTaxAcutInfoList.get(0));
					model.addAttribute("cpaTaxAcutInfoList", cpaTaxAcutInfoList);
				}
			}


			model.addAttribute("myPageRegFlag", myPageRegFlag);
			model.addAttribute("trainFlag", trainFlag);
			model.addAttribute("audTrainFlag", audTrainFlag);
			model.addAttribute("cpaMemFlag", cpaMemFlag);
			model.addAttribute("cpaAidFlag", cpaAidFlag);


			model.addAttribute("myPagePin", user.getUniqId());
			model.addAttribute("cpaPassRealInfo", cpaPassRealInfo);


		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/myp/myPage.do");
			model.addAttribute("title", "마이페이지");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/myp/myPage.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*5);
			response.addCookie(cookie);
			
			return "kicpa/common/authLogin";

		}

		return "kicpa/myp/myPage";
	}

	@RequestMapping(value = "/myPageInfo.do")
	public String myPageInfo(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
			List<?> cpaPassRealInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemPassRealInfo = new HashMap<>();
			if(cpaPassRealInfo.size()>0){
				cpaMemPassRealInfo.putAll((Map<String, Object>)cpaPassRealInfo.get(0));
			}

			//회원기본정보 입력 완료했을 경우
			if("Y".equals(cpaMemPassRealInfo.get("regFlag"))){

				//회원 사진 정보(실제테이블)
				List<?> cpaPhotoRealInfoList = myPageService.selectCpaMberPhotoInfoList(paramMap);

				//사진정보
				Map<String, Object> cpaMemPictInfo = new HashMap<>();
				if(cpaPhotoRealInfoList.size()>0){
					cpaMemPictInfo.putAll((Map<String, Object>)cpaPhotoRealInfoList.get(0));
					byte imageContent[] = blobToBytes((Blob) cpaMemPictInfo.get("photo"));

					String memPict = "";

					if(imageContent.length > 0 && imageContent != null){ //데이터가 들어 있는 경우
						//바이트를 base64인코딩 실시
						String base64Encode = byteToBase64(imageContent);
						base64Encode = "data:image/jpg;base64," + base64Encode;
						memPict = base64Encode;
					}
					else {
						memPict = "";
					}
					model.addAttribute("memPict", memPict);
				}

				//수습정보 확인(실제 테이블)
				List<?> cpaTrainInfoList = myPageService.selectCpaTrainRegistInfoList(paramMap);
				model.addAttribute("cpaTrainInfoListCnt", cpaTrainInfoList.size());

				//회원정보 조회(실제테이블)
				List<?> cpaMemberInfoList = myPageService.selectCpaMemberRegistInfoList(paramMap);
				model.addAttribute("cpaMemberInfoList", cpaMemberInfoList);
				model.addAttribute("cpaMemberInfoListCnt", cpaMemberInfoList.size());


				//di 정보
				List<?> diCheckList = myPageService.selectCpaPassDiCheckList(paramMap);
				model.addAttribute("diCheckList", diCheckList);
			}

			model.addAttribute("myPageInfoPin", paramMap.get("pin"));
			model.addAttribute("cpaPassRealInfo", cpaPassRealInfo);


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/myPageInfo.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/myp/myPageInfo.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*5);
			response.addCookie(cookie);
			
			
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/myPageInfo";
	}

	//마이페이지 본인인증 후 화면 이동
	@RequestMapping(value = "/mypCpaConfirmSucc.do")
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

			model.addAttribute("movePage",paramMap.get("movePage"));
			model.addAttribute("moveFlag",paramMap.get("moveFlag"));
			model.addAttribute("pin",paramMap.get("pin"));

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

		return "kicpa/myp/mypCpaConfirmSucc";
	}

	//경조사 메일발송 프로시저
	@RequestMapping(value="/boardInfoSendMail.do")
	public ModelAndView boardInfoSendMail(@RequestBody Map<String,Object> paramMap, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try{
			Map<String, Object> boardSendMailInfo = new HashMap<>();

			boardSendMailInfo.put("v_bltn_no", paramMap.get("bltnNo"));

			myPageService.boardInfoSendMailProc(boardSendMailInfo);       //(프로시저 호출)

			modelAndView.addObject("boardSendMailInfo", boardSendMailInfo);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	//경조사 화환발송 프로시저
	@RequestMapping(value="/boardInfoSendAtfFlower.do")
	public ModelAndView boardInfoSendAtfFlower(@RequestBody Map<String,Object> paramMap, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try{
			Map<String, Object> boardSendAtfFlowerInfo = new HashMap<>();

			boardSendAtfFlowerInfo.put("v_bltn_no", paramMap.get("bltnNo"));

			myPageService.boardInfoSendAtfFlowerProc(boardSendAtfFlowerInfo);       //(프로시저 호출)

			modelAndView.addObject("boardSendAtfFlowerInfo", boardSendAtfFlowerInfo);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
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

	//blob 사진 정보
	private static byte[] blobToBytes(Blob blob) {
		BufferedInputStream is = null;
		byte[] bytes = null;
		try {
			is = new BufferedInputStream(blob.getBinaryStream());
			bytes = new byte[(int) blob.length()];
			int len = bytes.length;
			int offset = 0;
			int read = 0;

			while (offset < len
					&& (read = is.read(bytes, offset, len - offset)) >= 0) {
				offset += read;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return bytes;
	}

	private static String byteToBase64(byte[] arr) {
		String result = "";
		try {
			result = Base64Utils.encodeToString(arr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
