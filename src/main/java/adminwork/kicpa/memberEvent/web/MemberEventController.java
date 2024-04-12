package adminwork.kicpa.memberEvent.web;


import java.sql.Blob;
import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypMemberService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.ibm.icu.text.SimpleDateFormat;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;



@Controller
@RequestMapping(value="/kicpa/memberEvent")
public class MemberEventController {

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;

	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypMemberService")
	private MypMemberService mypMemberService;


	@RequestMapping(value = "/boardList.do")
	public String boardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("views", map.get("views"));
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회원경조사");
		if(isAuthenticated) {
			return "kicpa/memberEvent/boardList";
		}else {
			model.addAttribute("returnUrl", "/kicpa/memberEvent/boardList.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/memberEvent/boardList.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*5);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}

	}
	@RequestMapping(value = "/regMemberEvent.do")
	public String regMemberEvent(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			model.addAttribute("loginVO", user);
			return "kicpa/memberEvent/regMemberEvent";
		}else {
			model.addAttribute("returnUrl", "/kicpa/memberEvent/boardList.do");
			return "kicpa/common/authLogin";
		}

	}

	//경조사 화면 변경
	@RequestMapping(value = "/memberEventList.do")
	public String memberEventListMove(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("views", map.get("views"));
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회원경조사");

		model.addAttribute("di", map.get("di"));
		model.addAttribute("name", map.get("name"));

		return "kicpa/memberEvent/memberEventList";
	}

	//경조사 등록화면 이동
	@RequestMapping(value = "/memberEventRegMove.do")
	public String memberEventRegMove(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if(isAuthenticated) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

			//pin으로 cpa 정보 조회
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("pin",user.getUniqId());
			List<?> cpaMemInfo = myPageService.selectCpaMemberRegistInfoList(paramMap);

			model.addAttribute("loginVO", user);
			model.addAttribute("name", user.getName());
			model.addAttribute("cpaMemInfo", cpaMemInfo);
			return "kicpa/memberEvent/memberEventReg";
		}
		else if(!"".equals(map.get("di")) && map.get("di") != null){

			String cpaPinInfo = myPageService.selectCpaMemberDiInfo(map);

			//pin으로 cpa 정보 조회
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("pin",cpaPinInfo);
			List<?> cpaMemInfo = myPageService.selectCpaMemberRegistInfoList(paramMap);

			model.addAttribute("di", map.get("di"));
			model.addAttribute("name", map.get("name"));
			model.addAttribute("cpaMemInfo", cpaMemInfo);

			return "kicpa/memberEvent/memberEventReg";
		}
		else {
			model.addAttribute("returnUrl", "/kicpa/memberEvent/memberEventList.do");
			return "kicpa/memberEvent/memberEventLogin";
		}

	}

	//회원 조회 팝업
	@RequestMapping(value = "/cpaSearchPop.do")
	public String cpaSearchPop(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/memberEvent/cpaSearchPop";
	}

	//회원 조회 팝업
	@RequestMapping(value = "/cpaSearchPop2.do")
	public String cpaSearchPop2(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/memberEvent/cpaSearchPop2";
	}

	//회원조회
	@RequestMapping(value="/getCpaSearchPopList.do")
	public ModelAndView getCpaSearchPopList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try{
			Map<String, Object> webCpaCheckInfo = new HashMap<>();

			webCpaCheckInfo.put("v_id", map.get("searchKeyword2"));
			webCpaCheckInfo.put("v_name", map.get("searchKeyword1"));

			myPageService.webCpaCheckProc(webCpaCheckInfo);

			modelAndView.addObject("webCpaCheckInfo", webCpaCheckInfo);
			modelAndView.addObject("webCpaCheckInfoSize", webCpaCheckInfo.size());

			/*List<EgovMap> list = myPageService.selectCpaSearchPopList(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("list", list);*/

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	@RequestMapping(value = "/memberEventLoginMove.do")
	public String memberEventLoginMove(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{


		model.addAttribute("url", "/kicpa/memberEvent/memberEventList.do");
		Cookie cookie = new Cookie("returnUrl", "/kicpa/memberEvent/memberEventList.do");
		cookie.setPath("/");
		cookie.setMaxAge(60*5);
		response.addCookie(cookie);


		return "uat/uia/LoginUsr";
	}

	//등록번호와 성명 일치여부 확인
	@RequestMapping(value="/cpaMemSearch.do")
	public ModelAndView cpaMemSearch(@RequestBody Map<String,Object> paramMap, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try{

			List<?> cpaMemChk = myPageService.selectCpaMemberSearchChk(paramMap);

			modelAndView.addObject("cpaMemChk", cpaMemChk);
			modelAndView.addObject("cpaMemChkSize", cpaMemChk.size());

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	//경조사 등록
	@RequestMapping(value="/memberEventRegSave.do")
	public ModelAndView memberEventRegSave(@RequestParam Map<String,Object> map, HttpServletRequest request,MultipartHttpServletRequest multipart) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated || (!"".equals(map.get("immDi")) && map.get("immDi") != null)) {
				HttpSession session = request.getSession();

				LoginVO user = new LoginVO();

				if(isAuthenticated){
					user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

					map.put("userPass", user.getUniqId());
					map.put("userNick", user.getName());
					map.put("userId", user.getId());
				}
				else{
					map.put("userPass", map.get("immDi"));
					map.put("userNick", map.get("diName"));
					map.put("userId", "");
				}

				String cpaId = (String) session.getAttribute("cpaId");
				String auditNm = (String) session.getAttribute("auditNm");
				String status = (String) session.getAttribute("status");;

				//게시 종료 일자 = 오늘부터 1개월
				java.text.SimpleDateFormat currentDe = new java.text.SimpleDateFormat("yyyyMMdd");
				Calendar cal = Calendar.getInstance();

				cal.add(Calendar.MONTH, 1);

				map.put("actionCd", "01" );
				map.put("entityName", "BULLETIN.BLTN_GN" );
				map.put("cateId", "2");
				map.put("userIp", request.getRemoteAddr());
				map.put("bltnTopTag", "N");
				map.put("bltnSecretYn", "N");
				map.put("bltnPermitYn", "Y");
				map.put("bltnEndYmd", currentDe.format(cal.getTime()));
				//map.put("extStr2", StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")));
				//map.put("extStr1", "회원서비스센터");
				map.put("bltnSubj", StringUtil.isNullToString(map.get("regTitle")));

				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Date d = format.parse(StringUtil.isNullToString(map.get("deaDate")));
				SimpleDateFormat format2 = new SimpleDateFormat("yyyy.MM.dd (E요일)");
				String deaDateFormat = format2.format(d);

				d = format.parse(StringUtil.isNullToString(map.get("burialDt")));
				format2 = new SimpleDateFormat("yyyy.MM.dd (E요일)");
				String burialDtFormat = format2.format(d);

				//빈소 연락처
				String mortuaryNum = StringUtil.isNullToString(map.get("phoneNumber"));

//
				//map.put("extStr0", StringUtil.isNullToString(map.get("cpaNmId")) );										//이메일
				//map.put("extStr1", StringUtil.isNullToString(map.get("regUserAgency")) );									//담당부서
				//map.put("extStr2", StringUtil.isNullToString(map.get("relation")));										//부서번호

				map.put("extStr3", StringUtil.isNullToString(map.get("koreanNm")) );										//성명
				map.put("extStr4", StringUtil.isNullToString(map.get("regUserAgency")) );									//소속
				map.put("extStr5", StringUtil.isNullToString(map.get("relation")));											//고인관계
				map.put("extStr6", StringUtil.isNullToString(deaDateFormat));												//작고일
				map.put("extStr7", StringUtil.isNullToString(map.get("mortuary")));											//빈소
				map.put("extStr8", mortuaryNum);																			//빈소 연락처
				map.put("extStr9", StringUtil.isNullToString(burialDtFormat));												//발인일

				map.put("extStr10", StringUtil.isNullToString(map.get("cpaId")) );											//등록번호
				map.put("extStr11", StringUtil.isNullToString(map.get("children")) );										//자녀성명
				map.put("extStr12", StringUtil.isNullToString(map.get("flowerYn")).equals("Y") ? "Y" : "N");				//조화신청
				map.put("extStr13", StringUtil.isNullToString(map.get("mailYn")).equals("Y") ? "Y" : "N" );					//회계법인 이메일통지
				map.put("extStr14", StringUtil.isNullToString(map.get("homepageYn")).equals("Y") ? "Y" : "N");				//홈페이지 표시여부
				//map.put("extStr15", "N");																					//통지여부

				if(!"".equals(map.get("immDi")) && map.get("immDi") != null){
					map.put("extStr16", StringUtil.isNullToString(map.get("immDi")));										//본인인증 DI값
					map.put("extStr17", StringUtil.isNullToString(map.get("diName")));										//본인인증 성명
				}
				else{
					map.put("extStr16", user.getId());																		//본인인증 DI값(userId)
					map.put("extStr17", user.getName());																	//본인인증 성명(userNm)
				}

				String bltnCntt = "";
				bltnCntt += "<p class=\"0\" style=\"line-height:200%;text-align:center;word-break:keep-all;mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;letter-spacing:1.2pt;\" align=\"center\"><u><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:24.0pt;\">부    고</span></u></p>\n";
				bltnCntt += "<p></p><p></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">성명(등록번호) </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("cpaNmId"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">소속  </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("regUserAgency"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">고인관계 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("relation"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">작고일 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+deaDateFormat+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">빈소  </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("mortuary"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">빈소 연락처 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+mortuaryNum+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">발인일 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+burialDtFormat+"</span></p>\n";
				map.put("bltnCntt", bltnCntt );



				map.put("bltnIcon", "A");
				map.put("bltnFileCnt", 0);


				commonBoardService.insertCommonBoard(map);

				//메일 발송
				Map<String, Object> paramMap = new HashMap<>();
				if(isAuthenticated){
					paramMap.put("pin", user.getUniqId());
				}
				paramMap.put("grpCd", "GQ2001");
				/*List<?> sendMemList = myPageService.selectSendMemList(paramMap);	//발송대상자(GQ2001)
				//List<?> cpaList = myPageService.selectCpaMemberRegistInfoList(paramMap);	//작성자 CPA_ID
				//paramMap.putAll((Map<String, Object>) cpaList.get(0));

				//오늘날짜
				java.text.SimpleDateFormat today = new java.text.SimpleDateFormat("yyyy년 MM월 dd일");
				Calendar c1 = Calendar.getInstance();
				String todayDe = today.format(c1.getTime());

				for (int i = 0; i < sendMemList.size(); i++) {
					Map<String, Object> sendMemInfo = new HashMap<>();
					sendMemInfo.putAll((Map<String, Object>) sendMemList.get(i));

					//메일 발송 프로시저
					Map<String, Object> eMailInfo = new HashMap<>();
					eMailInfo.put("v_mail_from","member@kicpa.or.kr");
					eMailInfo.put("v_recname",user.getName());
					eMailInfo.put("v_userid","member");
					eMailInfo.put("v_templateid","164757960756849218179111");
					eMailInfo.put("v_title","회원 경조사 게시글이 신규 등록되었습니다.");
					eMailInfo.put("v_reserve_date","");
					eMailInfo.put("v_emp_id",user.getUniqId());
					eMailInfo.put("v_field1",sendMemInfo.get("optn2"));
					eMailInfo.put("v_field2","회원 경조사 게시글이 신규 등록되었습니다.");
					eMailInfo.put("v_field3","다음과 같이 회원경조사 게시글이 신규 등록 되었습니다.");
					eMailInfo.put("v_field4","");
					eMailInfo.put("v_field5","등록일 : " + todayDe);
					eMailInfo.put("v_field6","제목 : " + StringUtil.isNullToString(map.get("regTitle")));
					eMailInfo.put("v_field7","");
					eMailInfo.put("v_field8","감사합니다.");
					eMailInfo.put("v_field9","");
					eMailInfo.put("v_field10","");

					myPageService.eapQueryMain09Proc(eMailInfo);
				}*/


				//문자발송
				Map<String, Object> sendSmsInfo = new HashMap<>();
				List<?> sendMesList = mypMemberService.selectMemEventSendMemList(paramMap);		//대상자 조회

				sendSmsInfo.put("msgCl", "N0021023");      //회원경조사 등록 알림톡
				if(isAuthenticated){
					sendSmsInfo.put("userId", user.getUniqId());
				}
				List<?> sendSmsInfoList = mypMemberService.selectMemSendMessageInfoList(sendSmsInfo);      //알림톡 내용
				sendSmsInfo.putAll((Map<String, Object>)sendSmsInfoList.get(0));

				String orgContents = sendSmsInfo.get("msgBody").toString();
				String contents = "";

				sendSmsInfo.put("nationCode", "82");   //국가코드

				for (int i = 0; i < sendMesList.size(); i++) {
					Map<String, Object> sendSmsDestInfo = new HashMap<>();
					sendSmsDestInfo.putAll((Map<String, Object>) sendMesList.get(i));

					contents = orgContents;

					contents = contents.replaceAll("\\{담당자}", sendSmsDestInfo.get("imlKname").toString() + " 담당자");
					contents = contents.replaceAll("\\{게시글제목}", StringUtil.isNullToString(map.get("regTitle")));

					sendSmsInfo.put("msgBody", contents);

					sendSmsInfo.put("destPhone", sendSmsDestInfo.get("imbHp"));

					mypMemberService.cpaMemMessageSend(sendSmsInfo);      //알림톡 전송

				}

			}


//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	//경조사 삭제
	@RequestMapping(value="/memberEventRegDelete.do")
	public ModelAndView memberEventRegDelete(@RequestParam Map<String,Object> map, HttpServletRequest request,MultipartHttpServletRequest multipart) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try{

			commonBoardService.deleteCommonBoard(map);


		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	//경조사 본인인증 후 화면 이동
	@RequestMapping(value = "/memberEventConfirmSucc.do")
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

		return "kicpa/memberEvent/memberEventConfirmSucc";
	}


	@RequestMapping(value="/insertMemberEvent.do")
	public ModelAndView getOfflineEduAppList(@RequestParam Map<String,Object> map, HttpServletRequest request,MultipartHttpServletRequest multipart) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				HttpSession session = request.getSession();
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				String cpaId = (String) session.getAttribute("cpaId");
				String auditNm = (String) session.getAttribute("auditNm");
				String status = (String) session.getAttribute("status");;

				//게시 종료 일자 = 오늘부터 1개월
				java.text.SimpleDateFormat currentDe = new java.text.SimpleDateFormat("yyyyMMdd");
				Calendar cal = Calendar.getInstance();

				cal.add(Calendar.MONTH, 1);

				map.put("actionCd", "01" );
				map.put("entityName", "BULLETIN.BLTN_GN" );
				map.put("userPass", user.getUniqId());
				map.put("userNick", user.getName());
				map.put("userId", user.getId());
				map.put("cateId", "2");
				map.put("userIp", request.getRemoteAddr());
				map.put("bltnTopTag", "N");
				map.put("bltnSecretYn", "N");
				map.put("bltnPermitYn", "Y");
				map.put("bltnEndYmd", currentDe.format(cal.getTime()));
				map.put("extStr2", StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")));
				map.put("extStr1", "회원서비스센터");
				map.put("bltnSubj", StringUtil.isNullToString(map.get("regTitle")));

				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Date d = format.parse(StringUtil.isNullToString(map.get("deaDate")));
				SimpleDateFormat format2 = new SimpleDateFormat("yyyy.MM.dd (E요일)");
				String deaDateFormat = format2.format(d);

				d = format.parse(StringUtil.isNullToString(map.get("burialDt")));
				format2 = new SimpleDateFormat("yyyy.MM.dd (E요일)");
				String burialDtFormat = format2.format(d);

				//빈소 연락처
				String mortuaryNum = StringUtil.isNullToString(map.get("phoneNumber1")) + "-" +StringUtil.isNullToString(map.get("phoneNumber2")) + "-" +StringUtil.isNullToString(map.get("phoneNumber3"));

//
				map.put("extStr3", StringUtil.isNullToString(map.get("cpaNmId")) );											//성명(등록번호)
				map.put("extStr4", StringUtil.isNullToString(map.get("regUserAgency")) );									//소속
				map.put("extStr5", StringUtil.isNullToString(map.get("relation")));											//고인관계
				map.put("extStr6", StringUtil.isNullToString(deaDateFormat));												//작고일
				map.put("extStr7", StringUtil.isNullToString(map.get("mortuary")));											//빈소
				map.put("extStr8", mortuaryNum);																			//빈소 연락처
				map.put("extStr9", StringUtil.isNullToString(burialDtFormat));												//발인일

				String bltnCntt = "";
				bltnCntt += "<p class=\"0\" style=\"line-height:200%;text-align:center;word-break:keep-all;mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;letter-spacing:1.2pt;\" align=\"center\"><u><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:24.0pt;\">부    고</span></u></p>\n";
				bltnCntt += "<p></p><p></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">성명(등록번호) </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("cpaNmId"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">소속  </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("regUserAgency"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">고인관계 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("relation"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">작고일 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+deaDateFormat+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">빈소  </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("mortuary"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">빈소 연락처 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+mortuaryNum+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: left; line-height: 200%; margin-left: 30px;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">발인일 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+burialDtFormat+"</span></p>\n";
				map.put("bltnCntt", bltnCntt );





				map.put("bltnIcon", "A");
				map.put("bltnFileCnt", 0);


				commonBoardService.insertCommonBoard(map);

				//메일 발송
				Map<String, Object> paramMap = new HashMap<>();
				paramMap.put("pin", user.getUniqId());
				paramMap.put("grpCd", "GQ2001");
				List<?> sendMemList = myPageService.selectSendMemList(paramMap);	//발송대상자(GQ2001)
				//List<?> cpaList = myPageService.selectCpaMemberRegistInfoList(paramMap);	//작성자 CPA_ID
				//paramMap.putAll((Map<String, Object>) cpaList.get(0));

				//오늘날짜
				java.text.SimpleDateFormat today = new java.text.SimpleDateFormat("yyyy년 MM월 dd일");
				Calendar c1 = Calendar.getInstance();
				String todayDe = today.format(c1.getTime());

				for (int i = 0; i < sendMemList.size(); i++) {
					Map<String, Object> sendMemInfo = new HashMap<>();
					sendMemInfo.putAll((Map<String, Object>) sendMemList.get(i));

					//메일 발송 프로시저
					Map<String, Object> eMailInfo = new HashMap<>();
					eMailInfo.put("v_mail_from","member@kicpa.or.kr");
					eMailInfo.put("v_recname",user.getName());
					eMailInfo.put("v_userid","member");
					eMailInfo.put("v_templateid","164757960756849218179111");
					eMailInfo.put("v_title","회원 경조사 게시글이 신규 등록되었습니다.");
					eMailInfo.put("v_reserve_date","");
					eMailInfo.put("v_emp_id",user.getUniqId());
					eMailInfo.put("v_field1",sendMemInfo.get("optn2"));
					eMailInfo.put("v_field2","회원 경조사 게시글이 신규 등록되었습니다.");
					eMailInfo.put("v_field3","다음과 같이 회원경조사 게시글이 신규 등록 되었습니다.");
					eMailInfo.put("v_field4","");
					eMailInfo.put("v_field5","등록일 : " + todayDe);
					eMailInfo.put("v_field6","제목 : " + StringUtil.isNullToString(map.get("regTitle")));
					eMailInfo.put("v_field7","");
					eMailInfo.put("v_field8","감사합니다.");
					eMailInfo.put("v_field9","");
					eMailInfo.put("v_field10","");

					myPageService.eapQueryMain09Proc(eMailInfo);
				}


				//문자발송
				Map<String, Object> sendSmsInfo = new HashMap<>();
				List<?> sendMesList = mypMemberService.selectMemEventSendMemList(paramMap);		//대상자 조회

				sendSmsInfo.put("msgCl", "N0021023");      //회원경조사 등록 알림톡
				sendSmsInfo.put("userId", user.getUniqId());
				List<?> sendSmsInfoList = mypMemberService.selectMemSendMessageInfoList(sendSmsInfo);      //알림톡 내용
				sendSmsInfo.putAll((Map<String, Object>)sendSmsInfoList.get(0));

				String orgContents = sendSmsInfo.get("msgBody").toString();
				String contents = "";

				sendSmsInfo.put("nationCode", "82");   //국가코드
				sendSmsInfo.put("userId", user.getUniqId());

				for (int i = 0; i < sendMesList.size(); i++) {
					Map<String, Object> sendSmsDestInfo = new HashMap<>();
					sendSmsDestInfo.putAll((Map<String, Object>) sendMesList.get(i));

					contents = orgContents;

					contents = contents.replaceAll("\\{담당자}", sendSmsDestInfo.get("imlKname").toString() + " 담당자");
					contents = contents.replaceAll("\\{게시글제목}", StringUtil.isNullToString(map.get("regTitle")));

					sendSmsInfo.put("msgBody", contents);

					sendSmsInfo.put("destPhone", sendSmsDestInfo.get("imbHp"));

					mypMemberService.cpaMemMessageSend(sendSmsInfo);      //알림톡 전송

				}

			}


//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

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

}
