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

import nice.intc.module.IntcClient;
import nice.intc.module.model.IntcResultReqInfo;
import nice.intc.module.model.IntcResultResInfo;
import nice.intc.module.model.IntcUrlResInfo;



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

	//경조사 본인인증 신규 모듈 성공 화면 이동
	@RequestMapping(value = "/memberEventConfirmSucc.do")
	public String memberEventConfirmSuccNew(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpSession session, ModelMap model) throws Exception{

		// 세션에서 intcUrlResInfo 가져오기
		IntcUrlResInfo intcUrlResInfo = (IntcUrlResInfo) session.getAttribute("intcUrlResInfo");

		// 1. 인증결과 받아오기 위한 요청값 세팅
		IntcResultReqInfo intcResultReqInfo = new IntcResultReqInfo();
		// 표준창에서 리턴한 web_transaction_id
		String webTransactionId = request.getParameter("web_transaction_id");
		// 필수항목
		intcResultReqInfo.setApiDomain("https://auth.niceid.co.kr");
		intcResultReqInfo.setClientId("NIaa776f44-53f5-4564-a881-47572bd9936a");
		intcResultReqInfo.setClientSecret("Yjg0ZTc1Y2MtMDlkNy00OGRmLWE3MzctYmY3Nzc1OWUyZDFhNjZDQzVGNDc5NEEyOEM0MkVBODcwRjlF");
		intcResultReqInfo.setWebTransactionId(webTransactionId);
		intcResultReqInfo.setRequestNo(intcUrlResInfo.getRequestNo());
		intcResultReqInfo.setTransactionId(intcUrlResInfo.getTransactionId());
		// 선택항목
		intcResultReqInfo.setConnectTimeout(3000);
		intcResultReqInfo.setReadTimeout(7000);

		// 2. 인증결과 요청
		IntcClient intcClient = new IntcClient();
		IntcResultResInfo intcResultResInfo = intcClient.getAuthResult(intcResultReqInfo);

		// 3. 인증결과 처리
		//    인증결과 DI를 게시글 작성자 식별값으로 사용한다 (CI는 비교/조회에 사용하지 않는다).
		//    DI/이름 외 민감 식별값은 클라이언트로 내려보내지 않는다.
		String authMatch = "N";
		if ("0000".equals(intcResultResInfo.getReturnCode())) {

			authMatch = "Y";
			model.addAttribute("authResultDataName", intcResultResInfo.getAuthResultData().getName());   /*인증결과-이름*/
			model.addAttribute("authResultDataDI", intcResultResInfo.getAuthResultData().getDi());       /*인증결과-DI*/

		}

		model.addAttribute("authMatch", authMatch);
		model.addAttribute("returnCode",intcResultResInfo.getReturnCode());
		model.addAttribute("resultMessage",intcResultResInfo.getResultMessage());
		model.addAttribute("sMessage",intcResultResInfo.getResultMessage());

		System.out.println("응답코드:"+intcResultResInfo.getReturnCode());
		System.out.println("응답메세지:"+intcResultResInfo.getResultMessage());

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
