package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.dues.service.DuesVO;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedInputStream;
import java.sql.Blob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

			//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
			List<?> cpaPassRealInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemPassRealInfo = new HashMap<>();
			if(cpaPassRealInfo.size()>0){
				cpaMemPassRealInfo.putAll((Map<String, Object>)cpaPassRealInfo.get(0));
			}

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



				//회원정보 조회(실제테이블)
				List<?> cpaMemberRegReal = myPageService.selectCpaMemberRegistInfoList(paramMap);
				Map<String, Object> cpaMemberRegRealInfo = new HashMap<>();

				//회원정보 있을경우
				if(cpaMemberRegReal.size()>0){
					cpaMemberRegRealInfo.putAll((Map<String, Object>)cpaMemberRegReal.get(0));
					model.addAttribute("cpaMemberRegReal", cpaMemberRegReal);
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

			model.addAttribute("myPagePin", user.getUniqId());
			model.addAttribute("cpaPassRealInfo", cpaPassRealInfo);


		}else {
			System.out.println("pin========="+Pin);
			model.addAttribute("id", Pin);
			model.addAttribute("url", "/kicpa/myp/myPage.do");
			return "uat/uia/LoginUsr";

		}

		/*Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("pin",Pin);

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



			//회원정보 조회(실제테이블)
			List<?> cpaMemberRegReal = myPageService.selectCpaMemberRegistInfoList(paramMap);
			Map<String, Object> cpaMemberRegRealInfo = new HashMap<>();

			//회원정보 있을경우
			if(cpaMemberRegReal.size()>0){
				cpaMemberRegRealInfo.putAll((Map<String, Object>)cpaMemberRegReal.get(0));
				model.addAttribute("cpaMemberRegReal", cpaMemberRegReal);
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

		model.addAttribute("myPagePin", Pin);
		model.addAttribute("cpaPassRealInfo", cpaPassRealInfo);*/

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
				model.addAttribute("cpaTrainInfoList", cpaTrainInfoList);


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
