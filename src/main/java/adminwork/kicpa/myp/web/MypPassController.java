package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypPassService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequestMapping(value="/kicpa/myp")
public class MypPassController {

	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypPassService")
	private MypPassService mypPassService;


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

	@RequestMapping(value = "/mypCpaPassReg.do")
	public String mypCpaPassReg(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
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

			if(!"".equals(paramMap.get("movePage")) && paramMap.get("movePage") != null && !"null".equals(paramMap.get("movePage"))){
				paramMap.put("saveMode","U");
			}
			else{
				paramMap.put("saveMode","I");
				paramMap.put("movePage","");
			}


			model.addAttribute("mypCpaPassRegPin", paramMap.get("pin"));
			model.addAttribute("mypCpaPassRegSaveMode", paramMap);
			model.addAttribute("cpaPassRealInfo", cpaPassRealInfo);


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaPassReg.do");
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/mypCpaPassReg";
	}

	//주소팝업 이동
	@RequestMapping(value = "/mypAdresPop.do")
	public String mypAdresPop(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request)
			throws Exception{


		model.addAttribute("flag", paramMap.get("flag").toString());

		return "kicpa/myp/mypAdresPopup";
	}

	//수정할 데이터 조회(수정모드)
	@RequestMapping(value="/selectMypCpaPassRegUpdateInfoList.do")
	public ModelAndView selectMypCpaPassRegUpdateInfoList(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			//이름 수정 or 연락처 수정
			if("mypCpaPassReg_nameInfo".equals(paramMap.get("movePage")) || "mypCpaPassReg_contactInfo".equals(paramMap.get("movePage"))){
				//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
				List<?> cpaPassRegRealInfo = myPageService.selectCpaPassInfoList(paramMap);
				modelAndView.addObject("cpaPassRegRealInfo", cpaPassRegRealInfo);
			}
			//자택,직장주소 수정
			else if("mypCpaPassReg_adresInfo".equals(paramMap.get("movePage"))){
				//자택 주소 정보(실제 테이블)
				paramMap.put("trgCl","PERSONAL");
				paramMap.put("adrCl","HOUSE");
				List<?> cpaPassRegHusAeresRealInfo = myPageService.selectCpaPassRegistAeresInfoList(paramMap);

				//직장 주소 정보(실제 테이블)
				paramMap.put("adrCl","OFICE");
				List<?> cpaPassRegOfcAeresRealInfo = myPageService.selectCpaPassRegistAeresInfoList(paramMap);

				//직장 정보 (실제테이블)
				List<?> cpaPassRegOfcRealInfo = myPageService.selectCpaPassRegistOfcInfoList(paramMap);

				//우편물 수령지 (실제테이블)
				List<?> cpaPassRegRealInfo = myPageService.selectCpaPassInfoList(paramMap);

				modelAndView.addObject("cpaPassRegHusAeresRealInfo", cpaPassRegHusAeresRealInfo);
				modelAndView.addObject("cpaPassRegOfcAeresRealInfo", cpaPassRegOfcAeresRealInfo);
				modelAndView.addObject("cpaPassRegOfcAeresRealInfoSize", cpaPassRegOfcAeresRealInfo.size());
				modelAndView.addObject("cpaPassRegOfcRealInfo", cpaPassRegOfcRealInfo);
				modelAndView.addObject("cpaPassRegOfcRealInfoSize", cpaPassRegOfcRealInfo.size());
				modelAndView.addObject("cpaPassRegRealInfo", cpaPassRegRealInfo);
			}
			//학력 수정
			else if("mypCpaPassReg_acdmcrInfo".equals(paramMap.get("movePage"))){
				//합격자 학력 가져오기(실제 테이블)
				List<?> cpaPassRegAcdmcrRealInfo = myPageService.selectCpaPassRegistAcdmcrInfoList(paramMap);
				modelAndView.addObject("cpaPassRegAcdmcrRealInfo", cpaPassRegAcdmcrRealInfo);
				modelAndView.addObject("cpaPassRegAcdmcrRealInfoSize", cpaPassRegAcdmcrRealInfo.size());
			}


			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//약관동의 저장
	@RequestMapping(value="/mypCpaPassRegAgreeSave.do")
	public ModelAndView mypCpaPassRegAgreeSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if(!"Y".equals(paramMap.get("agreeInfo1Yn")) || !"Y".equals(paramMap.get("agreeInfo2Yn"))){
				modelAndView.addObject("message", "개인정보 수집 및 이용, 개인정보 처리 위탁 동의에 대한 안내 모두 동의해주세요");
				return modelAndView;
			}

			paramMap.put("userId", paramMap.get("pin"));
			paramMap.put("brthdy", paramMap.get("brthdy").toString().replaceAll("-",""));
			mypPassService.mypCpaPassRegisterAgreeSave(paramMap);

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//합격자기본정보 저장
	@RequestMapping(value="/mypCpaPassRegPassInfoSave.do")
	public ModelAndView mypCpaPassRegPassInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			paramMap.put("userId", paramMap.get("pin"));

			if("U".equals(paramMap.get("saveMode"))){
				mypPassService.mypCpaPassRegisterPassInfoUpdate(paramMap);		//실제테이블(이름) 업데이트
			}
			else{
				mypPassService.mypCpaPassRegisterPassInfoSave(paramMap);		//임시테이블 저장
			}

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//자택&직장주소 저장
	@RequestMapping(value="/mypCpaPassRegAdressInfoSave.do")
	public ModelAndView mypCpaPassRegAdressInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("husZipCd")) || paramMap.get("husZipCd") == null){
				modelAndView.addObject("message", "자택우편번호를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("husAdres")) || paramMap.get("husAdres") == null){
				modelAndView.addObject("message", "자택주소를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("husAdresDetail")) || paramMap.get("husAdresDetail") == null){
				modelAndView.addObject("message", "자택상세주소를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("postSndngYn")) || paramMap.get("postSndngYn") == null){
				modelAndView.addObject("message", "우편물 수령여부를 선택해주세요.");
				return modelAndView;
			}


			if("Y".equals(paramMap.get("ofcRegYn"))){
				if("".equals(paramMap.get("ofcZipCd")) || paramMap.get("ofcZipCd") == null){
					modelAndView.addObject("message", "직장우편번호를 입력하세요.");
					return modelAndView;
				}
				else if("".equals(paramMap.get("ofcAdres")) || paramMap.get("ofcAdres") == null){
					modelAndView.addObject("message", "직장주소를 입력하세요.");
					return modelAndView;
				}
				else if("".equals(paramMap.get("ofcAdresDetail")) || paramMap.get("ofcAdresDetail") == null){
					modelAndView.addObject("message", "직장상세주소를 입력하세요.");
					return modelAndView;
				}
				//직장번호 앞자리, 중간자리, 뒷자리중 한개라도 데이터가 있을경우 3개 다 입력하는 알럿
				if((!"".equals(paramMap.get("ofcTelNo1")) && paramMap.get("ofcTelNo1") != null)
						|| (!"".equals(paramMap.get("ofcTelNo2")) && paramMap.get("ofcTelNo2") != null)
						|| (!"".equals(paramMap.get("ofcTelNo3")) && paramMap.get("ofcTelNo3") != null)){

					if(("".equals(paramMap.get("ofcTelNo1")) || paramMap.get("ofcTelNo1") == null)
							|| ("".equals(paramMap.get("ofcTelNo2")) || paramMap.get("ofcTelNo2") == null)
							|| ("".equals(paramMap.get("ofcTelNo3")) || paramMap.get("ofcTelNo3") == null)){
						modelAndView.addObject("message", "직장 전화번호를 3칸 다 입력하세요.");
						return modelAndView;
					}
				}
				//FAX 앞자리, 중간자리, 뒷자리중 한개라도 데이터가 있을경우 3개 다 입력하는 알럿
				if((!"".equals(paramMap.get("ofcFaxNo1")) && paramMap.get("ofcFaxNo1") != null)
						|| (!"".equals(paramMap.get("ofcFaxNo2")) && paramMap.get("ofcFaxNo2") != null)
						|| (!"".equals(paramMap.get("ofcFaxNo3")) && paramMap.get("ofcFaxNo3") != null)){

					if(("".equals(paramMap.get("ofcFaxNo1")) || paramMap.get("ofcFaxNo1") == null)
							|| ("".equals(paramMap.get("ofcFaxNo2")) || paramMap.get("ofcFaxNo2") == null)
							|| ("".equals(paramMap.get("ofcFaxNo3")) || paramMap.get("ofcFaxNo3") == null)){
						modelAndView.addObject("message", "FAX를 3칸 다 입력하세요.");
						return modelAndView;
					}
				}

			}
			else{		//직장정보등록 체크 안되어있을시
				paramMap.put("ofcZipCd", "");					//직장우편번호
				paramMap.put("ofcAdres", "");					//직장주소
				paramMap.put("ofcAdresDetail", ""); 			//직장상세주소
				paramMap.put("ofcLegalCd", ""); 				//직장법정동코드
				paramMap.put("ofcTelNo", "");					//직장전화번호
				paramMap.put("ofcFaxNo", "");					//팩스번호
				paramMap.put("oficeNm", ""); 					//직장명
				paramMap.put("rspOfc", "");						//직책
				paramMap.put("sectionNm", "");					//부서(국/실)
				paramMap.put("deptNm", ""); 					//하위부서(과)

				paramMap.put("ofcTelNo1", "");
				paramMap.put("ofcFaxNo1", "");
			}

			//오늘날짜
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Calendar c1 = Calendar.getInstance();
			String registDe = today.format(c1.getTime());

			paramMap.put("userId", paramMap.get("pin"));

			if(!"".equals(paramMap.get("ofcTelNo1")) && paramMap.get("ofcTelNo1") != null){
				paramMap.put("ofcTelNo",paramMap.get("ofcTelNo1")+"-"+paramMap.get("ofcTelNo2")+"-"+paramMap.get("ofcTelNo3"));
			}
			if(!"".equals(paramMap.get("ofcFaxNo1")) && paramMap.get("ofcFaxNo1") != null){
				paramMap.put("ofcFaxNo",paramMap.get("ofcFaxNo1")+"-"+paramMap.get("ofcFaxNo2")+"-"+paramMap.get("ofcFaxNo3"));
			}

			if("U".equals(paramMap.get("saveMode"))){
				//자택주소저장(실제테이블)
				paramMap.put("adrCl", "HOUSE");
				paramMap.put("adrTrgCl", "PERSONAL");
				paramMap.put("registDe", registDe);
				paramMap.put("registCl", "U");
				mypPassService.mypCpaPassRegisterAdressInfoUpdate(paramMap);

				//직장주소저장(실제테이블)
				paramMap.put("adrCl", "OFICE");
				paramMap.put("trgCl", "PERSONAL");
				List<?> cpaPassOfcAeresRealInfo = myPageService.selectCpaPassRegistAeresInfoList(paramMap);

				if("Y".equals(paramMap.get("ofcRegYn")) || (cpaPassOfcAeresRealInfo.size() >0 && cpaPassOfcAeresRealInfo != null)){
					mypPassService.mypCpaPassRegisterAdressInfoUpdate(paramMap);
				}

				//직장정보저장(실제테이블)
				List<?> cpaPassOfcRealInfo = myPageService.selectCpaPassRegistOfcInfoList(paramMap);
				if("Y".equals(paramMap.get("ofcRegYn")) || (cpaPassOfcRealInfo.size() >0 && cpaPassOfcRealInfo != null)){
					mypPassService.mypCpaPassRegisterOficeInfoUpdate(paramMap);
				}

				//우편물수령지 저장
				mypPassService.mypCpaPassRegisterPostSndngYnUpdate(paramMap);
			}
			else{
				mypPassService.mypCpaPassRegisterAdressInfoSave(paramMap);		//임시테이블 저장
			}


			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//연락처 저장
	@RequestMapping(value="/mypCpaPassRegContactInfoSave.do")
	public ModelAndView mypCpaPassRegContactInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("moblPhonNo1")) || paramMap.get("moblPhonNo1") == null){
				modelAndView.addObject("message", "휴대전화를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("moblPhonNo2")) || paramMap.get("moblPhonNo2") == null){
				modelAndView.addObject("message", "휴대전화를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("moblPhonNo3")) || paramMap.get("moblPhonNo3") == null){
				modelAndView.addObject("message", "휴대전화를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("subEmail")) || paramMap.get("subEmail") == null){
				modelAndView.addObject("message", "개인 Email를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("emailSndngYn")) || paramMap.get("emailSndngYn") == null){
				modelAndView.addObject("message", "메일 수신여부를 선택해주세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("smsSndngYn")) || paramMap.get("smsSndngYn") == null){
				modelAndView.addObject("message", "문자 수신여부를 선택해주세요.");
				return modelAndView;
			}
			//자택전화 앞자리, 중간자리, 뒷자리중 한개라도 데이터가 있을경우 3개 다 입력하는 알럿
			else if((!"".equals(paramMap.get("husTelNo1")) && paramMap.get("husTelNo1") != null)
					|| (!"".equals(paramMap.get("husTelNo2")) && paramMap.get("husTelNo2") != null)
					|| (!"".equals(paramMap.get("husTelNo3")) && paramMap.get("husTelNo3") != null)){

				if(("".equals(paramMap.get("husTelNo1")) || paramMap.get("husTelNo1") == null)
						|| ("".equals(paramMap.get("husTelNo2")) || paramMap.get("husTelNo2") == null)
						|| ("".equals(paramMap.get("husTelNo3")) || paramMap.get("husTelNo3") == null)){
					modelAndView.addObject("message", "자택전화를 3칸 다 입력하세요.");
					return modelAndView;
				}
			}

			paramMap.put("userId", paramMap.get("pin"));

			if(!"".equals(paramMap.get("moblPhonNo1")) && paramMap.get("moblPhonNo1") != null){
				paramMap.put("moblPhonNo",paramMap.get("moblPhonNo1")+"-"+paramMap.get("moblPhonNo2")+"-"+paramMap.get("moblPhonNo3"));
			}
			if(!"".equals(paramMap.get("husTelNo1")) && paramMap.get("husTelNo1") != null){
				paramMap.put("husTelNo",paramMap.get("husTelNo1")+"-"+paramMap.get("husTelNo2")+"-"+paramMap.get("husTelNo3"));
			}

			//연락처 저장
			if("U".equals(paramMap.get("saveMode"))){
				mypPassService.mypCpaPassRegisterContactInfoUpdate(paramMap);		//실제테이블 업데이트
			}
			else{
				mypPassService.mypCpaPassRegisterContactInfoSave(paramMap);	//임시테이블 저장
			}

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//학력사항 저장
	@RequestMapping(value="/mypCpaPassRegAcdmcrInfoSave.do")
	public ModelAndView mypCpaPassRegAcdmcrInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		paramMap.put("userId", paramMap.get("pin"));
		paramMap.put("deleteYn", "N");

		String json = paramMap.get("list").toString();

		ObjectMapper mapper = new ObjectMapper();
		List<Map<String, Object>> list = mapper.readValue(json, new TypeReference<ArrayList<Map<String, Object>>>(){});
		List<Map<String, Object>> listDel = null;

		if("U".equals(paramMap.get("saveMode"))){

			String jsonDel = paramMap.get("listDel").toString();
			listDel = mapper.readValue(jsonDel, new TypeReference<ArrayList<Map<String, Object>>>(){});

		}

		try {

			for(int i=0; i < list.size(); i++) {

				if("".equals(list.get(i).get("schulCl")) || list.get(i).get("schulCl") == null){
					modelAndView.addObject("message", "학력을 선택해주세요.");
					return modelAndView;
				}
				else if("".equals(list.get(i).get("degree").toString()) || list.get(i).get("degree").toString() == null){
					modelAndView.addObject("message", "학위를 선택해주세요.");
					return modelAndView;
				}
				else if("".equals(list.get(i).get("schulNm").toString()) || list.get(i).get("schulNm").toString() == null){
					modelAndView.addObject("message", "학교명을 입력하세요.");
					return modelAndView;
				}
				else if("".equals(list.get(i).get("grdtnYear").toString()) || list.get(i).get("grdtnYear").toString() == null){
					modelAndView.addObject("message", "졸업년도를 선택해주세요.");
					return modelAndView;
				}
				else if("".equals(list.get(i).get("major").toString()) || list.get(i).get("major").toString() == null){
					modelAndView.addObject("message", "전공을 입력하세요.");
					return modelAndView;
				}

			}

			//학력 수정
			if("U".equals(paramMap.get("saveMode"))){
				for(int i=0; i < list.size(); i++){

					paramMap.put("acdmcrSn", list.get(i).get("acdmcrSn").toString());
					paramMap.put("schulCl", list.get(i).get("schulCl").toString());
					paramMap.put("degree", list.get(i).get("degree").toString());
					paramMap.put("schulNm", list.get(i).get("schulNm").toString());
					paramMap.put("grdtnYear", list.get(i).get("grdtnYear").toString());
					paramMap.put("major", list.get(i).get("major").toString());

					mypPassService.mypCpaPassRegisterAcdmcrInfoUpdate(paramMap);		//실제테이블 업데이트
				}

				//학력 삭제
				for(int i=0; i < listDel.size(); i++){

					paramMap.put("acdmcrSnDel", listDel.get(i).get("acdmcrSnDel").toString());

					mypPassService.mypCpaPassRegisterAcdmcrDelete(paramMap);		//실제테이블 업데이트
				}
			}
			else{
				//기존 학력 데이터 삭제
				mypPassService.mypCpaPassRegisterAcdmcrInfoDelete(paramMap);

				//학력 저장
				for(int i=0; i < list.size(); i++){

					paramMap.put("acdmcrSn", "");
					paramMap.put("schulCl", list.get(i).get("schulCl").toString());
					paramMap.put("degree", list.get(i).get("degree").toString());
					paramMap.put("schulNm", list.get(i).get("schulNm").toString());
					paramMap.put("grdtnYear", list.get(i).get("grdtnYear").toString());
					paramMap.put("major", list.get(i).get("major").toString());

					mypPassService.mypCpaPassRegisterAcdmcrInfoSave(paramMap);
				}
			}

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//검토 및 제출 데이터 조회
	@RequestMapping(value="/selectMypCpaPassRegReviewInfo.do")
	public ModelAndView selectMypCpaPassRegReviewInfo(@RequestParam Map<String, Object> paramMap) throws Exception{

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		List<?> cpaRegReviewInfoList = new ArrayList<HashMap>();
		List<?> cpaRegReviewAcdmcrInfoList = new ArrayList<HashMap>();

		cpaRegReviewInfoList = mypPassService.selectCpaPassRegistReviewInfoList(paramMap);					//기본정보
		cpaRegReviewAcdmcrInfoList = mypPassService.selectCpaPassRegistReviewAcdmcrInfoList(paramMap);		//학력사항

		modelAndView.addObject("cpaRegReviewInfoList", cpaRegReviewInfoList);
		modelAndView.addObject("cpaRegReviewInfoListSize", cpaRegReviewInfoList.size());
		modelAndView.addObject("cpaRegReviewAcdmcrInfoList", cpaRegReviewAcdmcrInfoList);
		modelAndView.addObject("cpaRegReviewAcdmcrInfoListSize", cpaRegReviewAcdmcrInfoList.size());

		return modelAndView;
	}

	//제출 (실제테이블 저장)
	@RequestMapping(value="/mypCpaPassRegSubmit.do")
	public ModelAndView mypCpaPassRegSubmit(@RequestParam Map<String, Object> paramMap,ModelMap model, HttpServletRequest request) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		//오늘날짜
		SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String registDe = today.format(c1.getTime());

		List<?> cpaRegReviewInfoList = new ArrayList<HashMap>();

		cpaRegReviewInfoList = mypPassService.selectCpaPassRegistReviewInfoList(paramMap);					//기본정보

		Map<String, Object> cpaRegReviewInfoSave = new HashMap<>();
		cpaRegReviewInfoSave.putAll((Map<String, Object>)cpaRegReviewInfoList.get(0));

		cpaRegReviewInfoSave.put("regFlag","Y");
		cpaRegReviewInfoSave.put("userId", paramMap.get("pin"));

		//합격자기본정보 & 연락처 저장
		mypPassService.cpaPassRegistPassInfoSave(cpaRegReviewInfoSave);

		//자택주소저장
		cpaRegReviewInfoSave.put("adrCl", "HOUSE");
		cpaRegReviewInfoSave.put("adrTrgCl", "PERSONAL");
		cpaRegReviewInfoSave.put("registDe", registDe);
		cpaRegReviewInfoSave.put("registCl", "U");
		mypPassService.cpaPassRegistAdressInfoSave(cpaRegReviewInfoSave);

		//직장주소저장
		if(!"".equals(cpaRegReviewInfoSave.get("ofcZipCd")) && cpaRegReviewInfoSave.get("ofcZipCd") != null) {
			cpaRegReviewInfoSave.put("adrCl", "OFICE");
			mypPassService.cpaPassRegistAdressInfoSave(cpaRegReviewInfoSave);
		}

		//직장정보저장
		if((!"".equals(cpaRegReviewInfoSave.get("ofcTelNo")) && cpaRegReviewInfoSave.get("ofcTelNo") != null) ||
				!"".equals(cpaRegReviewInfoSave.get("ofcFaxNo")) && cpaRegReviewInfoSave.get("ofcFaxNo") != null ||
				!"".equals(cpaRegReviewInfoSave.get("oficeNm")) && cpaRegReviewInfoSave.get("oficeNm") != null ||
				!"".equals(cpaRegReviewInfoSave.get("rspOfc")) && cpaRegReviewInfoSave.get("rspOfc") != null ||
				!"".equals(cpaRegReviewInfoSave.get("sectionNm")) && cpaRegReviewInfoSave.get("sectionNm") != null ||
				!"".equals(cpaRegReviewInfoSave.get("deptNm")) && cpaRegReviewInfoSave.get("deptNm") != null) {
			cpaRegReviewInfoSave.put("ofcCl", "PERSONAL");
			mypPassService.cpaPassRegistOficeInfoSave(cpaRegReviewInfoSave);
		}

		//학력사항저장
		List<?> cpaRegReviewAcdmcrInfoList = new ArrayList<HashMap>();
		cpaRegReviewAcdmcrInfoList = mypPassService.selectCpaPassRegistReviewAcdmcrInfoList(paramMap);

		Map<String, Object> cpaRegReviewAcdmcrInfoSave = new HashMap<>();
		cpaRegReviewAcdmcrInfoSave.put("acdmcrSn", "");
		cpaRegReviewAcdmcrInfoSave.put("userId", paramMap.get("pin"));
		cpaRegReviewAcdmcrInfoSave.put("deleteYn", "N");
		for(int i=0; i<cpaRegReviewAcdmcrInfoList.size(); i++){
			cpaRegReviewAcdmcrInfoSave.putAll((Map<String, Object>)cpaRegReviewAcdmcrInfoList.get(i));
			mypPassService.cpaPassRegistAcdmcrInfoSave(cpaRegReviewAcdmcrInfoSave);
		}

		//제출 flag 저장
		paramMap.put("regFlag","Y");
		paramMap.put("userId", paramMap.get("pin"));
		mypPassService.mypCpaPassRegisterRegFlagSave(paramMap);

		return modelAndView;
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
