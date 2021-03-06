package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.FileMngService2;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.com.cmm.service.FileVO;
import adminwork.kicpa.dues.service.*;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypPassService;
import adminwork.let.utl.fcc.service.DateUtil;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequestMapping(value="/kicpa/myp")
public class MypMemberController {

	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypMemberService")
	private MypMemberService mypMemberService;

	@Resource(name = "mypPassService")
	private MypPassService mypPassService;

	@Resource(name = "DuesService")
	private DuesService duesService;

	@Resource(name = "DuesApiService")
	private  DeusApiService duesApiService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "FileMngService2")
	private FileMngService2 fileMngService2;

	/**
	 * XSS ?????? ??????.
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

	@RequestMapping(value = "/mypCpaMemberReg.do")
	public String mypCpaMemberReg(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			//????????? ??????(??????, ?????????) ????????????(?????? ?????????)
			List<?> cpaPassRealInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemPassRealInfo = new HashMap<>();
			if(cpaPassRealInfo.size()>0){
				cpaMemPassRealInfo.putAll((Map<String, Object>)cpaPassRealInfo.get(0));
			}

			//??????????????? ????????????????????? ?????? ???????????? ??????(???????????????)
			List<?> cpaMemberCanclInfo = mypMemberService.selectCpaCanclInfoList(paramMap);

			//???????????? ????????????(?????? ?????????)-???????????? ????????? ??????
			List<?> cpaMemberTrainRealInfo = myPageService.selectCpaTrainRegistInfoList(paramMap);
			Map<String, Object> cpaMemMemberTrainRealInfo = new HashMap<>();
			if(cpaMemberTrainRealInfo.size()>0){
				cpaMemMemberTrainRealInfo.putAll((Map<String, Object>)cpaMemberTrainRealInfo.get(0));
			}

			//???????????? ??????
			List<?> regFlagInfo = myPageService.selectCpaMemberRegistReviewInfoList(paramMap);
			Map<String, Object> mypRegFlagInfo = new HashMap<>();
			if(regFlagInfo.size() < 1){
				paramMap.put("regFlag", "N");
			}
			else{
				mypRegFlagInfo.putAll((Map<String, Object>)regFlagInfo.get(0));
				paramMap.put("regFlag", mypRegFlagInfo.get("regFlag"));
			}

			if(!"".equals(paramMap.get("movePage")) && paramMap.get("movePage") != null && !"null".equals(paramMap.get("movePage"))){
				paramMap.put("saveMode","U");
				model.addAttribute("mypCpaMemberRegCpaSn", mypRegFlagInfo.get("cpaSn"));
			}
			else{
				paramMap.put("saveMode","I");
				paramMap.put("movePage","");
			}

			model.addAttribute("mypCpaMemberRegPin", user.getUniqId());
			model.addAttribute("mypCpaMemberRegKoreanNm", cpaMemPassRealInfo.get("koreanNm"));
			model.addAttribute("mypCpaMemberRegBrthdy", cpaMemPassRealInfo.get("brthdy"));
			model.addAttribute("mypCpaMemberRegAppCpaNo", cpaMemMemberTrainRealInfo.get("appCpaNo"));
			model.addAttribute("mypCpaMemberRegSaveMode", paramMap);
			model.addAttribute("cpaMemberCanclInfo", cpaMemberCanclInfo);


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaMemberReg.do");
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/mypCpaMemberReg";
	}

	//???????????? ????????? ????????????
	@RequestMapping(value = "/cpaAuditPop.do")
	public String cpaAuditPop(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/myp/cpaAuditPop";
	}

	@RequestMapping(value="/getCpaAuditPopList.do")
	public ModelAndView getCpaAuditPopList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			List<EgovMap> list = mypMemberService.selectCpaAuditPopupSearchList(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	//??????(??????)?????? ??????
	@RequestMapping(value = "/cpaClosedPop.do")
	public String cpaClosePop(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/myp/cpaClosedPop";
	}

	@RequestMapping(value = "/mypCpaTrnngSmInfo.do")
	public String mypCpaTrnngSmInfo(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			List<?> cpaMemberRegTrnngSmInfo = mypMemberService.selectCpaMemberRegistTrnngSmInfoList(paramMap);			//???????????????
			List<?> cpaMemberRegTrnngSmYearList = mypMemberService.selectCpaMemberRegistTrnngSmYearList(paramMap);			//??????????????? ????????????

			model.addAttribute("cpaMemberRegTrnngSmInfo", cpaMemberRegTrnngSmInfo);
			model.addAttribute("cpaMemberRegTrnngSmInfoSize", cpaMemberRegTrnngSmInfo.size());
			model.addAttribute("cpaMemberRegTrnngSmYearList", cpaMemberRegTrnngSmYearList);

			model.addAttribute("mypCpaTrnngSmInfoPin", paramMap.get("pin"));

			model.addAttribute("userId", user.getId());


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaTrnngSmInfo.do");
			return "uat/uia/LoginUsr";

		}



		return "kicpa/myp/mypCpaTrnngSmInfo";
	}

	//??????????????? ?????? ??????(?????? ?????????)
	@RequestMapping(value="/selectCpaMemTrnngSmYear.do")
	public ModelAndView selectCpaMemTrnngSmYear(@RequestParam Map<String, Object> paramMap) throws Exception{

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			List<?> cpaMemTrnngSmInfo = mypMemberService.selectCpaMemberRegistTrnngSmInfoList(paramMap);

			modelAndView.addObject("cpaMemTrnngSmInfo", cpaMemTrnngSmInfo);
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//????????? ????????? ??????(????????????)
	@RequestMapping(value="/selectMypCpaMemberRegUpdateInfoList.do")
	public ModelAndView selectMypCpaMemberRegUpdateInfoList(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			//?????????????????? ??????
			if("mypCpaMemberReg_nmstOthbcInfo".equals(paramMap.get("movePage"))){
				List<?> cpaMemberNmstOthbcInfo = mypMemberService.selectCpaMemberRegNmstOthbcInfoList(paramMap);		//??????????????????
				modelAndView.addObject("cpaMemberNmstOthbcInfo", cpaMemberNmstOthbcInfo);
				modelAndView.addObject("cpaMemberNmstOthbcInfoSize", cpaMemberNmstOthbcInfo.size());
			}


			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//???????????? ??????
	@RequestMapping(value="/mypCpaMemberRegAgreeInfoSave.do")
	public ModelAndView mypCpaMemberRegAgreeInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if(!"Y".equals(paramMap.get("agreeInfoYn1"))){
				modelAndView.addObject("message", "??????????????? ???????????????.");
				return modelAndView;
			}
			else if(!"Y".equals(paramMap.get("agreeInfoYn2"))){
				modelAndView.addObject("message", "??????????????? ???????????????.");
				return modelAndView;
			}

			String selectCpaSn = mypMemberService.selectMypCpaMemberRegisterRegFlagInfo(paramMap);
			if(selectCpaSn == null){
				selectCpaSn = "";
			}

			paramMap.put("cpaSn", selectCpaSn);

			paramMap.put("userId", paramMap.get("pin"));
			paramMap.put("brthdy", paramMap.get("brthdy").toString().replaceAll("-",""));

			if("F".equals(paramMap.get("regFlag"))){		//????????? ????????? ?????? ?????? ????????????????????? ?????? ?????? ?????? ????????????
				String sbscrbMypSn = mypMemberService.selectMypCpaMemberRegisterSbscrbMypSnInfo(paramMap);

				if(!"".equals(sbscrbMypSn) && sbscrbMypSn != null){
					paramMap.put("sbscrbMypSn", sbscrbMypSn);
					paramMap.put("sbscrbYn", "Y");
				}
			}

			int cpaSn = mypMemberService.mypCpaMemberRegisterAgreeInfoSave(paramMap);

			if(!"".equals(selectCpaSn)){
				cpaSn = Integer.parseInt(selectCpaSn);
			}

			modelAndView.addObject("cpaSn", cpaSn);
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//???????????? ?????? & ????????????????????? ??????
	@RequestMapping(value="/mypCpaMemberRegAidMberInfoSave.do")
	public ModelAndView mypCpaMemberRegAidMberInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if(("".equals(paramMap.get("aidMberFlag")) || paramMap.get("aidMberFlag") == null) && ("".equals(paramMap.get("canclCl")) || paramMap.get("canclCl") == null)){
				modelAndView.addObject("message", "???????????? ????????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("bizrNo")) || paramMap.get("bizrNo") == null){
				paramMap.put("bizrNo","");
			}

			paramMap.put("bizrNo", paramMap.get("bizrNo").toString().replaceAll("-",""));
			paramMap.put("userId", paramMap.get("pin"));

			mypMemberService.mypCpaMemberRegisterAidMberInfoSave(paramMap);

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//?????????????????? ??????
	@RequestMapping(value="/mypCpaMemberRegCpaCareerInfoSave.do")
	public ModelAndView mypCpaMemberRegCpaCareerInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("registDe")) || (paramMap.get("registDe") == null)){
				modelAndView.addObject("message", "??????????????? ?????????????????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("mberFlag")) || (paramMap.get("mberFlag") == null)){
				modelAndView.addObject("message", "??????????????? ???????????????.");
				return modelAndView;
			}
			else if("A2020010".equals(paramMap.get("mberFlag"))){		//????????? ??????
				if("".equals(paramMap.get("auditId")) || (paramMap.get("auditId") == null)) {
					modelAndView.addObject("message", "?????? ???????????? ???????????????.");
					return modelAndView;
				}
				/*else if("".equals(paramMap.get("auditOfcps")) || (paramMap.get("auditOfcps") == null)) {
					modelAndView.addObject("message", "???????????????????????? ???????????????.");
					return modelAndView;
				}*/
			}
			else if("A2020050".equals(paramMap.get("mberFlag"))){		//????????? ??????
				if("".equals(paramMap.get("closedCl")) || (paramMap.get("closedCl") == null)) {
					modelAndView.addObject("message", "??????(??????)????????? ???????????????.");
					return modelAndView;
				}
			}

			if(!"A2020010".equals(paramMap.get("mberFlag"))){
				paramMap.put("auditNm", "");
				paramMap.put("auditId", "");
				paramMap.put("auditOfcps", "");
			}
			if(!"A2020050".equals(paramMap.get("mberFlag"))){
				paramMap.put("closedCl", "A2179801");			//???????????? -??????
				paramMap.put("closedClNm", "");
			}

			paramMap.put("registDe",paramMap.get("registDe").toString().replaceAll("-",""));
			paramMap.put("userId", paramMap.get("pin"));
			mypMemberService.mypCpaMemberRegisterCpaCareerInfoSave(paramMap);

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//?????????????????? ??????
	@RequestMapping(value="/mypCpaMemberRegNmstOthbcInfoSave.do")
	public ModelAndView mypCpaMemberRegNmstOthbcInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("ofcAdresYn")) || (paramMap.get("ofcAdresYn") == null)){
				modelAndView.addObject("message", "????????? ????????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("ofcNameYn")) || (paramMap.get("ofcNameYn") == null)){
				modelAndView.addObject("message", "????????? ?????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("emailYn")) || (paramMap.get("emailYn") == null)){
				modelAndView.addObject("message", "??????????????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("ofcTelYn")) || (paramMap.get("ofcTelYn") == null)){
				modelAndView.addObject("message", "????????? ????????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("photoYn")) || (paramMap.get("photoYn") == null)){
				modelAndView.addObject("message", "????????? ???????????????.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("ofcFaxYn")) || (paramMap.get("ofcFaxYn") == null)){
				modelAndView.addObject("message", "????????? ????????? ???????????????.");
				return modelAndView;
			}

			paramMap.put("userId", paramMap.get("pin"));

			if("U".equals(paramMap.get("saveMode"))){
				mypMemberService.mypCpaMemberRegisterNmstOthbcInfoUpdate(paramMap);		//???????????????(??????) ????????????

				String imiy_add_yn = "0";
				String imiy_off_name_yn = "0";
				String imiy_tel_yn = "0";
				String imiy_fax_yn = "0";
				String imiy_email_yn = "0";
				String imiy_picture_yn = "0";

				Map<String, Object> nmstOthbcPortal = new HashMap<>();

				if("Y".equals(paramMap.get("ofcAdresYn"))){
					imiy_add_yn = "1";
				}
				if("Y".equals(paramMap.get("ofcNameYn"))){
					imiy_off_name_yn = "1";
				}
				if("Y".equals(paramMap.get("ofcTelYn"))){
					imiy_tel_yn = "1";
				}
				if("Y".equals(paramMap.get("ofcFaxYn"))){
					imiy_fax_yn = "1";
				}
				if("Y".equals(paramMap.get("emailYn"))){
					imiy_email_yn = "1";
				}
				if("Y".equals(paramMap.get("photoYn"))){
					imiy_picture_yn = "1";
				}

				nmstOthbcPortal.put("pin", paramMap.get("pin"));
				nmstOthbcPortal.put("ofcAdresYn", imiy_add_yn);
				nmstOthbcPortal.put("ofcNameYn", imiy_off_name_yn);
				nmstOthbcPortal.put("ofcTelYn", imiy_tel_yn);
				nmstOthbcPortal.put("ofcFaxYn", imiy_fax_yn);
				nmstOthbcPortal.put("emailYn", imiy_email_yn);
				nmstOthbcPortal.put("photoYn", imiy_picture_yn);

				mypMemberService.mypCpaMemberRegisterNmstOthbcInfoUpdatePortal(nmstOthbcPortal);                  //portal db ??????
			}
			else{
				mypMemberService.mypCpaMemberRegisterNmstOthbcInfoSave(paramMap);		//??????????????? ??????
			}

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//???????????? (????????????) ??????
	@RequestMapping(value="/mypCpaMemberRegAtchFileInfoSave.do")
	public ModelAndView mypCpaMemberRegAtchFileInfoSave(final MultipartHttpServletRequest multiRequest) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		Map<String, Object> paramMap = new HashMap<>();

		paramMap.put("pin", multiRequest.getParameter("pin"));
		paramMap.put("cpaSn", multiRequest.getParameter("cpaSn"));
		paramMap.put("userId", paramMap.get("pin"));

		String regFlag = "";

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		if(!"".equals(multiRequest.getParameter("passCrtiFileIdSet")) && multiRequest.getParameter("passCrtiFileIdSet") != null){
			paramMap.put("passCrtiFileId", multiRequest.getParameter("passCrtiFileIdSet"));
		}
		if(!"".equals(multiRequest.getParameter("eventnSet")) && multiRequest.getParameter("eventnSet") != null){
			regFlag = "F";
		}
		if(!"".equals(multiRequest.getParameter("apntcEndFileIdSet")) && multiRequest.getParameter("apntcEndFileIdSet") != null){
			paramMap.put("apntcEndFileId", multiRequest.getParameter("apntcEndFileIdSet"));
		}
		if(!"".equals(multiRequest.getParameter("atchFileIdSet")) && multiRequest.getParameter("atchFileIdSet") != null){
			paramMap.put("atchFileId", multiRequest.getParameter("atchFileIdSet"));
		}

		try {

			String atchFileId = "";

			List<FileVO> result = null;
			int fileKeyParam = 0;
			final Map<String, MultipartFile> files = multiRequest.getFileMap();

			//vaildation ??????
			Iterator fileNameIter = multiRequest.getFileNames();
			while (fileNameIter.hasNext()) {
				String key = (String) fileNameIter.next();
				MultipartFile file = multiRequest.getFile(key);

				if(file.isEmpty()){

					if("passCrtiFileId".equals(key)){
						modelAndView.addObject("message", "??????????????? ????????? ????????? ??????????????????.");
						return modelAndView;
					}
					else if("rsumFileId".equals(key)){
						modelAndView.addObject("message", "???????????? ??????????????????.");
						return modelAndView;
					}
					/*else if("apntcEndFileId".equals(key)){
						modelAndView.addObject("message", "?????????????????????????????? ??????????????????.");
						return modelAndView;
					}*/
				}
			}
			//

			Map<String, Object> cpaPassExamInfo = new HashMap<>();
			//????????? ??????????????????(???????????? ??????)
			List<?> cpaPassExamInfoList = mypPassService.selectMypCpaPsexamInfo(paramMap);
			cpaPassExamInfo.putAll((Map<String, Object>)cpaPassExamInfoList.get(0));

			Iterator<Map.Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			while (itr.hasNext()) {
				atchFileId = "";
				if ("".equals(atchFileId)) {
					String rsumPath = "opt/file/"+cpaPassExamInfo.get("psexamYear") + "/" + paramMap.get("pin") + "/ETC";

					result = fileUtil.parseAtchFileInf(files, rsumPath, fileKeyParam, atchFileId, rsumPath);

					if(!"".equals(result.get(0).fileExtsn) && result.get(0).fileExtsn != null){

						fileMngService2.insertFileInfs(result);

						Iterator<?> iter = result.iterator();
						FileVO vo = (FileVO) iter.next();

						String key = itr.next().getKey();

						if("passCrtiFileId".equals(key)){
							paramMap.put("passCrtiFileId", vo.getAtchFileId());
						}
						else if("rsumFileId".equals(key)){
							if(!"F".equals(regFlag)){
								List<MultipartFile> mf = multiRequest.getFiles("rsumFileId");

								paramMap.put("rsumFileId", mf.get(0).getBytes());
								paramMap.put("rsumFileNm", mf.get(0).getOriginalFilename());
								paramMap.put("eventn", FilenameUtils.getExtension(mf.get(0).getOriginalFilename()));
							}
						}
						else if("apntcEndFileId".equals(key)){
							paramMap.put("apntcEndFileId", vo.getAtchFileId());
						}
						else if("atchFileId".equals(key)){
							paramMap.put("atchFileId", vo.getAtchFileId());
						}
					}
					else{
						itr.next();
					}

					fileKeyParam++;
				}
			}

			if("F".equals(regFlag)){
				//??????????????? ?????? ?????? ????????? ??????
				mypMemberService.mypCpaMemberRegisterFlagFAtchFileSave(paramMap);
			}
			else{
				mypMemberService.mypCpaMemberRegisterAtchFileIdSave(paramMap);
			}


			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "????????? ??????????????????.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//?????? ?????? ?????? ?????? ??????
	@RequestMapping(value="/selectYearDuesSearch.do")
	public ModelAndView selectYearDuesSearch(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		NewDues vo = new NewDues();
		vo.setAppCpaNo(paramMap.get("appCpaNo").toString());
		vo.setName((paramMap.get("name").toString()));

		List<NewDues> resultList = new ArrayList();
		resultList = duesService.selectDuesNewSearch(vo);

		List<?> cpaMemberRegReviewInfoList = myPageService.selectCpaMemberRegistReviewInfoList(paramMap);		//?????? ?????????????????????

		modelAndView.addObject("resultCount", resultList.size());
		modelAndView.addObject("resultList", resultList);

		modelAndView.addObject("cpaMemberRegReviewInfoList", cpaMemberRegReviewInfoList);

		return modelAndView;
	}

	//?????? ?????? ????????? ??????
	@RequestMapping(value="/selectmypCpaMemberRegInfo.do")
	public ModelAndView selectmypCpaMemberRegInfo(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		List<?> cpaMemberAidDuesInfoList = mypMemberService.selectCpaMemberRegistSbscrbMasterInfoList(paramMap);		//????????? ?????? ??????

		//???????????? ?????? ?????????????????? ??????
		Map<String, Object> cpaMemberYearDues = new HashMap<>();
		cpaMemberYearDues.putAll((Map<String, Object>)cpaMemberAidDuesInfoList.get(0));

		cpaMemberYearDues.put("cpaSn", paramMap.get("cpaSn"));
		cpaMemberYearDues.put("sbscrbYn", "Y");
		cpaMemberYearDues.put("userId", paramMap.get("pin"));

		mypMemberService.cpaMemberRegistSbscrbMasterFlagSave(cpaMemberYearDues);

		modelAndView.addObject("cpaMemberAidDuesInfoList", cpaMemberAidDuesInfoList);
		modelAndView.addObject("cpaMemberAidDuesInfoListSize", cpaMemberAidDuesInfoList.size());

		return modelAndView;
	}

	//?????? ?????? ????????????
	@RequestMapping(value="/createNewYearDeus.do")
	public ModelAndView createNewYearDeus(@RequestBody List<NewDues> list,HttpServletRequest request) throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {
			//?????? ??????
			boolean success = true;
			Dues giroInfo = new Dues();
			String giroCd = "";

			DuesVO vo = new DuesVO();
			vo.setEpay_no(user.getId());
			vo.setCust_inqr_no(user.getId());
			vo.setCstmr_cd(user.getId());
			vo.setCstmr_nm(user.getName());

			//????????? ?????? ?????? ????????? ????????????
			List<Dues> infoList = new ArrayList<Dues>();
			vo.setPay_yymm_seq(DateUtil.getToday().substring(0,6));
			//String etcTypeCode = duesService.selectEtcTypeCode(vo);
			long totAmt = 0;
			for(NewDues amt : list) {
				totAmt +=(amt.getGnrlYyAmt()+amt.getGnrlEntrncAmt()+amt.getAsstnYyAmt() +amt.getAsstnEntrncAmt()+ amt.getCmitEntrncAmt());
			}
			System.out.println("-----------totAmt ="+totAmt);

			vo.setDudt_in_amt(totAmt);

			List<GiroNtic> giroNtics = new ArrayList<>();
			GiroRegVO giroRegVO = new GiroRegVO();
			giroRegVO.setRqestDe(DateUtil.getToday());
			giroRegVO.setEtcTypeCode("11");
			giroRegVO.setEmpPin(user.getId());
			giroRegVO.setEtcInfoTtl("?????????");
			giroRegVO.setEtcInfoCnte("?????????");
			List<GiroVO> giroList = new ArrayList<GiroVO>();
			GiroVO giro = new GiroVO();
			giro.setSubGiroCd("");

			giro.setCustInqrNo(user.getId());
			giro.setNticDe(DateUtil.getToday());
			giro.setNticAmt(vo.getDudt_in_amt());

			//?????? ???????????? ??????????????????
			giro.setCstmrFlag("35210020");
			giro.setCstmrCd(vo.getCstmr_cd());
			giro.setCstmrNm(vo.getCstmr_nm());
			//

			giro.setRqestCd("35230110");
			giro.setRqestDe(DateUtil.getToday());
			giro.setProcessFlag("0");
			giro.setSuccesAmt(0L);
			giro.setFrstRegistId(vo.getCust_inqr_no());
			giro.setLastUpdtId(vo.getCust_inqr_no());
			giro.setEpayNo(vo.getEpay_no());
			giro.setNotiDlDt(DateUtil.getToday());
			giroList.add(giro);

			//????????? / ?????? ?????? ??????
			Dues rt = duesService.saveNewDuesPays(list, giroRegVO, giroNtics, giroList);
			modelAndView.addObject("rt", rt);
			//?????? ??????
			//List<NewDues> rtnList = duesService.saveNewDuesPays(list);

			//??????????????? ?????? ????????? ????????? ?????? ?????? ??????
			if(!success) {
				//duesService.deleteTempDues(vo);
				modelAndView.addObject("message", "(-1)????????? ????????? ??????????????????. ????????? ?????? ????????? ????????? ????????????.");
				modelAndView.addObject("rtnUrl", "redirect:/kicpa/dues/selectDuesList.do");

			}
		}catch(Exception e) {

			e.printStackTrace();
		}

		modelAndView.addObject("message", "??????????????? ?????? ???????????????.");

		return modelAndView;
	}

	//?????? ?????? ????????? ??????
	@RequestMapping(value = "/kicpa/myp/selectYearDeusPaymentResult.do")
	public ModelAndView selectPaymentResult(@ModelAttribute("searchVO") DuesVO vo, ModelMap model, HttpServletRequest request, RedirectAttributes rttr)
			throws Exception{
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");
		/*Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			//model.addAttribute("cmmCodeList", cmmUseService.getCmmCodeDetailAll());
		}else {
			return "redirect:/uat/uia/LoginUsr.do";
		}*/
		vo.setCust_inqr_no(user.getId());
		boolean success = true;
		Dues giroInfo = new Dues();
		success = duesApiService.giroPayments(vo);

		//?????? ????????? ????????? ??????
		if(success){

			Map<String, Object> sendSmsInfo = new HashMap<>();

			sendSmsInfo.put("msgCl", "N0021013");      //?????????????????? ?????? ?????????
			sendSmsInfo.put("pin", user.getId());
			sendSmsInfo.put("userId", user.getId());
			sendSmsInfo.put("orgTranId", vo.getOrg_tran_id());
			List<?> sendSmsInfoList = mypMemberService.selectMemSendMessageInfoList(sendSmsInfo);      //????????? ??????
			sendSmsInfo.putAll((Map<String, Object>)sendSmsInfoList.get(0));

			String contents = sendSmsInfo.get("msgBody").toString();

			contents = contents.replaceAll("\\{?????????}", sendSmsInfo.get("destName").toString());
			contents = contents.replaceAll("\\{????????????}", sendSmsInfo.get("payDe").toString());
			contents = contents.replaceAll("\\{????????????}", sendSmsInfo.get("dudtInAmt").toString());

			sendSmsInfo.put("msgBody", contents);
			sendSmsInfo.put("nationCode", "82");   //????????????
			sendSmsInfo.put("userId", user.getId());

			mypMemberService.cpaMemMessageSend(sendSmsInfo);      //????????? ??????
		}

		//return "redirect:/kicpa/dues/selectDuesList.do";
		return modelAndView;
	}

	//?????? ??? ?????? ????????? ??????
	@RequestMapping(value="/selectmypCpaMemberRegReviewInfo.do")
	public ModelAndView selectmypCpaMemberRegReviewInfo(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		//???????????? ??????
		NewDues vo = new NewDues();
		vo.setAppCpaNo(paramMap.get("appCpaNo").toString());
		vo.setName((paramMap.get("name").toString()));

		List<NewDues> resultList = new ArrayList();
		resultList = duesService.selectDuesNewSearch(vo);

		//???????????? ??????
		List<?> cpaMemberRegReviewInfoList = myPageService.selectCpaMemberRegistReviewInfoList(paramMap);		//?????? ?????????????????????
		Map<String, Object> cpaMemberRegReviewInfo = new HashMap<>();
		cpaMemberRegReviewInfo.putAll((Map<String, Object>)cpaMemberRegReviewInfoList.get(0));

		List<?> cpaMemberAidDuesInfoList = mypMemberService.selectCpaMemberRegAidDuesInfoList(cpaMemberRegReviewInfo);		//????????? ???????????? ??????

		List<?> cpaMemberRegNmstOthbcInfoList = mypMemberService.selectCpaMemberRegistNmstOthbcInfoList(paramMap);		//??????????????????


		modelAndView.addObject("cpaMemberAidDuesInfoList", cpaMemberAidDuesInfoList);
		modelAndView.addObject("cpaMemberAidDuesInfoListSize", cpaMemberAidDuesInfoList.size());

		modelAndView.addObject("resultCount", resultList.size());
		modelAndView.addObject("resultList", resultList);

		modelAndView.addObject("cpaMemberRegReviewInfoList", cpaMemberRegReviewInfoList);
		modelAndView.addObject("cpaMemberRegReviewInfoListSize", cpaMemberRegReviewInfoList.size());
		modelAndView.addObject("cpaMemberRegNmstOthbcInfoList", cpaMemberRegNmstOthbcInfoList);
		modelAndView.addObject("cpaMemberRegNmstOthbcInfoListSize", cpaMemberRegNmstOthbcInfoList.size());


		return modelAndView;
	}

	//??????
	@RequestMapping(value="/mypCpaMemberSubmit.do")
	public ModelAndView mypCpaMemberSubmit(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");


		//???????????? ?????? ??????
		List<?> cpaMemberInfoList = myPageService.selectCpaMemberRegistReviewInfoList(paramMap);		//?????? ?????????????????????
		Map<String, Object> cpaMemberInfo = new HashMap<>();
		cpaMemberInfo.putAll((Map<String, Object>)cpaMemberInfoList.get(0));

		if("".equals(cpaMemberInfo.get("sbscrbMypSn")) || cpaMemberInfo.get("sbscrbMypSn") == null){

			List<?> cpaMemberSbscrbMasterList = mypMemberService.selectCpaMemberSbscrbMasterInfoList(paramMap);

			if(cpaMemberSbscrbMasterList.size() > 0 && cpaMemberSbscrbMasterList != null){
				Map<String, Object> cpaMemberSbscrbMaster = new HashMap<>();
				cpaMemberSbscrbMaster.putAll((Map<String, Object>)cpaMemberSbscrbMasterList.get(0));

				paramMap.put("sbscrbMypSn", cpaMemberSbscrbMaster.get("sbscrbSn"));
				paramMap.put("sbscrbYn", "Y");
			}

		}

		//????????????
		SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String opetrDe = today.format(c1.getTime());

		paramMap.put("opetrDe", opetrDe);
		paramMap.put("regFlag","Y");
		paramMap.put("userId", paramMap.get("pin"));

		mypMemberService.mypCpaMemberRegisterRegFlagSave(paramMap);

		return modelAndView;
	}
}
