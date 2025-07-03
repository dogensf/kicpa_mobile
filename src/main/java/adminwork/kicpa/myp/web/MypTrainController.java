package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.com.cmm.service.FileMngService;
import adminwork.com.cmm.service.FileMngService2;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.com.cmm.service.FileVO;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypPassService;
import adminwork.kicpa.myp.service.MypTrainService;
import adminwork.let.utl.sim.service.FileScrty;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
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
public class MypTrainController {


	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypTrainService")
	private MypTrainService mypTrainService;

	@Resource(name = "mypPassService")
	private MypPassService mypPassService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "FileMngService2")
	private FileMngService2 fileMngService2;

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

	@RequestMapping(value = "/mypCpaTrainReg.do")
	public String mypCpaMemberReg(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
			List<?> cpaTrainRealRegInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemTrainRealRegInfo = new HashMap<>();
			if(cpaTrainRealRegInfo.size()>0){
				cpaMemTrainRealRegInfo.putAll((Map<String, Object>)cpaTrainRealRegInfo.get(0));
			}

			//등록구분 확인
			List<?> regFlagInfo = myPageService.selectCpaTrainRegistReviewInfoList(paramMap);
			Map<String, Object> mypRegFlagInfo = new HashMap<>();
			if(regFlagInfo.size() < 1){
				paramMap.put("regFlag", "N");
			}
			else{
				mypRegFlagInfo.putAll((Map<String, Object>)regFlagInfo.get(0));
				paramMap.put("regFlag", mypRegFlagInfo.get("regFlag"));

				if("F".equals(mypRegFlagInfo.get("regFlag")) || "U".equals(mypRegFlagInfo.get("saveMode"))){
					List<?> memPictInfo = null;
					//사진정보
					if("U".equals(mypRegFlagInfo.get("saveMode"))){		//수정모드
						memPictInfo = mypTrainService.selectCpaPassRegistMberPhotoInfo(paramMap);
					}
					else{												//반려상태
						memPictInfo = mypTrainService.selectCpaTrainRegistMemPictInfo(paramMap);
					}
					Map<String, Object> cpaMemPictInfo = new HashMap<>();
					if(memPictInfo.size()>0){
						cpaMemPictInfo.putAll((Map<String, Object>)memPictInfo.get(0));

						if(!"".equals(cpaMemPictInfo.get("photo")) && cpaMemPictInfo.get("photo") != null){
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
					}
				}
			}

			if(!"".equals(paramMap.get("movePage")) && paramMap.get("movePage") != null && !"null".equals(paramMap.get("movePage"))){
				paramMap.put("saveMode","U");
			}
			else{
				paramMap.put("saveMode","I");
				paramMap.put("movePage","");
			}

			model.addAttribute("mypCpaTrainRegPin", paramMap.get("pin"));
			model.addAttribute("mypCpaTrainRegKoreanNm", cpaMemTrainRealRegInfo.get("koreanNm"));
			model.addAttribute("mypCpaTrainRegBrthdy", cpaMemTrainRealRegInfo.get("brthdy"));
			model.addAttribute("mypCpaTrainRegSaveMode", paramMap);


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaTrainReg.do");
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/mypCpaTrainReg";
	}

	@RequestMapping(value = "/mypCpaTrainInfoMove.do")
	public String mypCpaTrainInfoMove(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			//수습정보 조회
			List<?> cpaTrainRegReal = myPageService.selectCpaTrainRegistInfoList(paramMap);
			Map<String, Object> cpaTrainRegRealInfo = new HashMap<>();
			cpaTrainRegRealInfo.putAll((Map<String, Object>)cpaTrainRegReal.get(0));

			//상황보고서 정보 조회(실제 테이블)
			paramMap.put("appCpaNo",cpaTrainRegRealInfo.get("appCpaNo"));
			List<?> cpaApntcBrfRealInfo = myPageService.selectCpaTrainApntcBrfInfoList(paramMap);
			//연수결과 조회(실제 테이블)
			paramMap.put("complYn", "T");       // 이수여부 != 'T' 조회
			List<?> cpaTrnngResultRealInfo = myPageService.selectCpaTrainTrnngResultInfoList(paramMap);


			model.addAttribute("mypCpaTrainInfoPin", paramMap.get("pin"));
			model.addAttribute("cpaApntcBrfRealInfo", cpaApntcBrfRealInfo);
			model.addAttribute("cpaApntcBrfRealInfoSize", cpaApntcBrfRealInfo.size());
			model.addAttribute("cpaTrnngResultRealInfo", cpaTrnngResultRealInfo);
			model.addAttribute("cpaTrnngResultRealInfoSize", cpaTrnngResultRealInfo.size());
			model.addAttribute("mypCpaTrainInfoMoveFlag", paramMap.get("moveFlag"));

		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaTrainInfoMove.do");
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/mypCpaTrainInfo";
	}

	//실무수습기관 검색팝업
	@RequestMapping(value = "/auditSearch.do")
	public String auditSearch(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{

		return "kicpa/myp/auditSearch";
	}

	@RequestMapping(value="/getAuditList.do")
	public ModelAndView getAuditList(@RequestBody Map<String,Object> map, HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			List<EgovMap> list = mypTrainService.selectAuditPopupSearchList(map);

			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

	//약관동의 저장
	@RequestMapping(value="//mypCpaTrainRegAgreeSave.do")
	public ModelAndView mypCpaTrainRegAgreeSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if(!"Y".equals(paramMap.get("agreeInfoYn1"))){
				modelAndView.addObject("message", "체크박스를 선택하세요.");
				return modelAndView;
			}
			else if(!"Y".equals(paramMap.get("agreeInfoYn2"))){
				modelAndView.addObject("message", "체크박스를 선택하세요.");
				return modelAndView;
			}
			else if(!"Y".equals(paramMap.get("agreeInfoYn3"))){
				modelAndView.addObject("message", "체크박스를 선택하세요.");
				return modelAndView;
			}

			String selectApntcSn = mypTrainService.selectMypCpaTrainRegisterRegFlagInfo(paramMap);
			if(selectApntcSn == null){
				selectApntcSn = "";
			}

			paramMap.put("apntcSn", selectApntcSn);

			paramMap.put("userId", paramMap.get("pin"));
			paramMap.put("brthdy", paramMap.get("brthdy").toString().replaceAll("-",""));
			Long apntcSn = mypTrainService.mypCpaTrainRegisterAgreeSave(paramMap);

			if(!"".equals(selectApntcSn)){
				apntcSn = Long.parseLong(selectApntcSn);
			}

			modelAndView.addObject("apntcSn", apntcSn);
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//사진 저장
	@RequestMapping(value="/mypCpaTrainRegPictInfoSave.do")
	public ModelAndView mypCpaTrainRegPictInfoSave(MultipartHttpServletRequest multiRequest) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Map<String, Object> paramMap = new HashMap<>();

		paramMap.put("pin", multiRequest.getParameter("pin"));
		paramMap.put("apntcSn", multiRequest.getParameter("apntcSn"));
		paramMap.put("saveMode", multiRequest.getParameter("saveMode"));
		paramMap.put("regFlag", multiRequest.getParameter("regFlag"));
		paramMap.put("userId", paramMap.get("pin"));

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			long filesSize = 0;
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			filesSize = files.get("pictFileId").getSize();

			if((files.isEmpty() || filesSize == 0) && !"F".equals(paramMap.get("regFlag"))) {
				modelAndView.addObject("message", "사진을 선택해주세요.");
				return modelAndView;
			}

			if(!files.isEmpty() && filesSize != 0){
				List<MultipartFile> mf = multiRequest.getFiles("pictFileId");

				paramMap.put("pictFileId", mf.get(0).getBytes());

				if("U".equals(paramMap.get("saveMode"))){
					mypTrainService.updateCpaPassMemPict(paramMap);			//기존사진 lastYn -> 'Y' 변경
					paramMap.put("lastYn","N");
					mypTrainService.insertCpaPassMemPict(paramMap);			//신규사진 저장
				}
				else{
					paramMap.put("photoNm", mf.get(0).getOriginalFilename());
					mypTrainService.mypCpaTrainRegisterPictInfoSave(paramMap);
				}
			}
			else{
				if("F".equals(paramMap.get("regFlag"))){
					mypTrainService.mypCpaTrainRegisterFlagFPictInfoSave(paramMap);
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

	//수습공인회계사 등록 재학여부 저장
	@RequestMapping(value="/mypCpaTrainRegGrdtSatausInfoSave.do")
	public ModelAndView mypCpaTrainRegGrdtSatausInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("grdtSataus")) || (paramMap.get("grdtSataus") == null)){
				modelAndView.addObject("message", "대학 및 대학원 재학여부를 선택하세요.");
				return modelAndView;
			}
			else{
				if("00000020".equals(paramMap.get("grdtSataus"))){
					if("".equals(paramMap.get("grdtDe")) || (paramMap.get("grdtDe") == null)){
						modelAndView.addObject("message", "졸업예정일을 선택하세요.");
						return modelAndView;
					}
					else if("".equals(paramMap.get("vacationStrDe")) || (paramMap.get("vacationStrDe") == null)){
						modelAndView.addObject("message", "방학시작일을 선택하세요.");
						return modelAndView;
					}
					else if("".equals(paramMap.get("vacationEndDe")) || (paramMap.get("vacationEndDe") == null)){
						modelAndView.addObject("message", "방학종료일을 선택하세요.");
						return modelAndView;
					}
					paramMap.put("grdtDe",paramMap.get("grdtDe").toString().replaceAll("-",""));
					paramMap.put("vacationStrDe",paramMap.get("vacationStrDe").toString().replaceAll("-",""));
					paramMap.put("vacationEndDe",paramMap.get("vacationEndDe").toString().replaceAll("-",""));

					if(Integer.parseInt(paramMap.get("vacationStrDe").toString()) > Integer.parseInt(paramMap.get("vacationEndDe").toString())){
						modelAndView.addObject("message", "방학종료일은 방학시작일 이후 날짜를 선택해주세요.");
						return modelAndView;
					}
				}
			}

			paramMap.put("userId", paramMap.get("pin"));
			mypTrainService.mypCpaTrainRegisterGrdtSatausInfoSave(paramMap);

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//이력정보 저장
	@RequestMapping(value="/mypCpaTrainRegApntcCpaHistInfoSave.do")
	public ModelAndView mypCpaTrainRegApntcCpaHistInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("appRegistDe")) || (paramMap.get("appRegistDe") == null)){
				modelAndView.addObject("message", "실무수습 개시일을 선택하세요.");
				return modelAndView;
			}
			else if(("".equals(paramMap.get("guideCpaNm")) || (paramMap.get("guideCpaNm") == null)) && !"S0003".equals(paramMap.get("appInsttCd"))){
				modelAndView.addObject("message", "지도공인회계사명을 입력하세요.");
				return modelAndView;
			}
			else if(("".equals(paramMap.get("guideCpaNo")) || (paramMap.get("guideCpaNo") == null)) && !"S0003".equals(paramMap.get("appInsttCd"))){
				modelAndView.addObject("message", "지도공인회계사번호를 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("appInsttCd")) || (paramMap.get("appInsttCd") == null)){
				modelAndView.addObject("message", "실무수습기관을 선택하세요.");
				return modelAndView;
			}
			else if("A3019999".equals(paramMap.get("audGrpCl"))){

				if("".equals(paramMap.get("appInsttEtc")) || (paramMap.get("appInsttEtc") == null)){
					modelAndView.addObject("message", "실제 실무수습기관명을 입력하세요.");
					return modelAndView;
				}
			}

			if("A1130020".equals(paramMap.get("employCl")) || "A1130030".equals(paramMap.get("employCl"))){
				if("".equals(paramMap.get("ctrtEndDe")) || (paramMap.get("ctrtEndDe") == null)){
					modelAndView.addObject("message", "계약종료예정일을 선택하세요.");
					return modelAndView;
				}
			}

			if(!"S0003".equals(paramMap.get("appInsttCd"))){
				int guideCpaCnt = mypTrainService.selectApntcCpaHistGuideCpaCehck(paramMap);

				if(guideCpaCnt<1){
					modelAndView.addObject("message", "지도공인회계사 성명 혹은 번호가\n일치하지 않습니다.");
					return modelAndView;
				}
			}

			paramMap.put("appRegistDe",paramMap.get("appRegistDe").toString().replaceAll("-",""));
			paramMap.put("apntcCl", "A1010020");
			paramMap.put("ctrtEndDe", StringUtil.isNullToString(paramMap.get("ctrtEndDe")).replaceAll("-",""));
			paramMap.put("userId", paramMap.get("pin"));
			mypTrainService.mypCpaTrainRegisterApntcCpaHistInfoSave(paramMap);

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//첨부파일 저장
	@RequestMapping(value="/mypCpaTrainRegAtchFileInfoSave.do")
	public ModelAndView mypCpaTrainRegAtchFileInfoSave(final MultipartHttpServletRequest multiRequest) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		Map<String, Object> paramMap = new HashMap<>();

		paramMap.put("pin", multiRequest.getParameter("pin"));
		paramMap.put("apntcSn", multiRequest.getParameter("apntcSn"));
		paramMap.put("userId", paramMap.get("pin"));

		String regFlag = "";

		String atchFileId1FlagYn = multiRequest.getParameter("atchFileId1FlagYn");

		int oldAtchFileCnt = 0;
		int oldPassCrtiFileCnt = 0;
		int oldEmplCrtiFileCnt = 0;
		int oldEventnCnt = 0;

		if(!"".equals(multiRequest.getParameter("atchFileId1Set")) && multiRequest.getParameter("atchFileId1Set") != null){
			oldAtchFileCnt++;
			paramMap.put("atchFileId1", multiRequest.getParameter("atchFileId1Set"));
		}
		if(!"".equals(multiRequest.getParameter("atchFileId2Set")) && multiRequest.getParameter("atchFileId2Set") != null){
			oldAtchFileCnt++;
			paramMap.put("atchFileId2", multiRequest.getParameter("atchFileId2Set"));
		}
		if(!"".equals(multiRequest.getParameter("atchFileId3Set")) && multiRequest.getParameter("atchFileId3Set") != null){
			oldAtchFileCnt++;
			paramMap.put("atchFileId3", multiRequest.getParameter("atchFileId3Set"));
		}
		if(!"".equals(multiRequest.getParameter("atchFileId4Set")) && multiRequest.getParameter("atchFileId4Set") != null){
			oldAtchFileCnt++;
			paramMap.put("atchFileId4", multiRequest.getParameter("atchFileId4Set"));
		}
		if(!"".equals(multiRequest.getParameter("passCrtiFileIdSet")) && multiRequest.getParameter("passCrtiFileIdSet") != null){
			oldPassCrtiFileCnt++;
			paramMap.put("passCrtiFileId", multiRequest.getParameter("passCrtiFileIdSet"));
		}
		if(!"".equals(multiRequest.getParameter("emplCrtiFileIdSet")) && multiRequest.getParameter("emplCrtiFileIdSet") != null){
			oldEmplCrtiFileCnt++;
			paramMap.put("emplCrtiFileId", multiRequest.getParameter("emplCrtiFileIdSet"));
		}
		if(!"".equals(multiRequest.getParameter("eventnSet")) && multiRequest.getParameter("eventnSet") != null){
			oldEventnCnt++;
			regFlag = "F";
		}

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			String atchFileId = "";

			List<FileVO> result = null;
			int fileKeyParam = 0;
			final Map<String, MultipartFile> files = multiRequest.getFileMap();

			int atchFileCnt = 0;

			//vaildation 체크
			Iterator fileNameIter = multiRequest.getFileNames();
			while (fileNameIter.hasNext()) {
				String key = (String) fileNameIter.next();
				MultipartFile file = multiRequest.getFile(key);

				if(file.isEmpty()){

					if("atchFileId1".equals(key)){
						modelAndView.addObject("message", "최종학교졸업증명서 혹은 졸업예정증명서를 선택해주세요.");
						return modelAndView;
					}
					else if("passCrtiFileId".equals(key) && oldPassCrtiFileCnt == 0){
						modelAndView.addObject("message", "합격증서 사본을 선택해주세요.");
						return modelAndView;
					}
					else if("emplCrtiFileId".equals(key) && oldEmplCrtiFileCnt == 0){
						modelAndView.addObject("message", "재직증명서를 선택해주세요.");
						return modelAndView;
					}
					else if("rsumFileId".equals(key) && oldEventnCnt == 0){
						modelAndView.addObject("message", "이력서를 선택해주세요.");
						return modelAndView;
					}
					/*else if("Y".equals(atchFileId1FlagYn)){
						if("atchFileId1".equals(key) || "atchFileId2".equals(key) || "atchFileId3".equals(key) || "atchFileId4".equals(key)){
							atchFileCnt++;
							if(atchFileCnt == 4 && oldAtchFileCnt == 0){
								modelAndView.addObject("message", "최종학교졸업증명서 및 졸업예정증명서를 1개 이상 선택해주세요.");
								return modelAndView;
							}
						}
					}*/
				}
			}
			/*if("N".equals(atchFileId1FlagYn)){
				paramMap.put("atchFileId1", "");
				paramMap.put("atchFileId2", "");
				paramMap.put("atchFileId3", "");
				paramMap.put("atchFileId4", "");
			}*/

			Map<String, Object> cpaPassExamInfo = new HashMap<>();
			//합격자 정보가져오기(파일경로 지정)
			List<?> cpaPassExamInfoList = mypPassService.selectMypCpaPsexamInfo(paramMap);
			cpaPassExamInfo.putAll((Map<String, Object>)cpaPassExamInfoList.get(0));


			Iterator<Map.Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			while (itr.hasNext()) {
				atchFileId = "";
				if ("".equals(atchFileId)) {
					String storePath = "/opt/file";
					String rsumPath = "opt/file/NEW" + cpaPassExamInfo.get("psexamYear") + "/" + paramMap.get("pin") + "/ETC";

					result = fileUtil.parseAtchFileInf(files, rsumPath, fileKeyParam, atchFileId, rsumPath);

					String fileKey = "KicpaDImgFileKey"; // 16자리 키

					if(!"".equals(result.get(0).fileExtsn) && result.get(0).fileExtsn != null){

						fileMngService2.insertFileInfs(result);

						Iterator<?> iter = result.iterator();
						FileVO vo = (FileVO) iter.next();
						String key = itr.next().getKey();

						if("atchFileId1".equals(key)){
							paramMap.put("atchFileId1", vo.getAtchFileId());
						}
						else if("atchFileId2".equals(key)){
							paramMap.put("atchFileId2", vo.getAtchFileId());
						}
						else if("atchFileId3".equals(key)){
							paramMap.put("atchFileId3", vo.getAtchFileId());
						}
						else if("atchFileId4".equals(key)){
							paramMap.put("atchFileId4", vo.getAtchFileId());
						}
						else if("passCrtiFileId".equals(key)){
							paramMap.put("passCrtiFileId", vo.getAtchFileId());

							String source = rsumPath + "/" + vo.getStreFileNm();
							String target = rsumPath + "/" + vo.getStreFileNm();
							FileScrty.encryptImg(fileKey, source, target);
						}
						else if("emplCrtiFileId".equals(key)){
							paramMap.put("emplCrtiFileId", vo.getAtchFileId());
						}
						else if("rsumFileId".equals(key)){

							if(!"F".equals(regFlag)){
								List<MultipartFile> mf = multiRequest.getFiles("rsumFileId");

								paramMap.put("rsumFileId", Base64.getEncoder().encode(mf.get(0).getBytes()));
								paramMap.put("rsumFileNm", mf.get(0).getOriginalFilename());
								paramMap.put("eventn", FilenameUtils.getExtension(mf.get(0).getOriginalFilename()));

								String source = rsumPath + "/" + vo.getStreFileNm();
								String target = rsumPath + "/" + vo.getStreFileNm();
								FileScrty.encryptImg(fileKey, source, target);
							}
						}
					}
					else{
						itr.next();
					}
					fileKeyParam++;
				}
			}

			if("F".equals(regFlag)){
				//반려상태일 경우 이전 이력서 저장
				mypTrainService.mypCpaTrainRegisterFlagFAtchFileSave(paramMap);
			}
			else{
				mypTrainService.mypCpaTrainRegisterAtchFileIdSave(paramMap);
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
	@RequestMapping(value="/selectMypCpaTrainRegReviewInfo.do")
	public ModelAndView selectMypCpaTrainRegReviewInfo(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		List<?> cpaTrainRegReviewInfoList = new ArrayList<HashMap>();

		cpaTrainRegReviewInfoList = myPageService.selectCpaTrainRegistReviewInfoList(paramMap);	//수습 임시테이블정보

		modelAndView.addObject("cpaTrainRegReviewInfoList", cpaTrainRegReviewInfoList);
		modelAndView.addObject("cpaTrainRegReviewInfoListSize", cpaTrainRegReviewInfoList.size());

		return modelAndView;
	}

	//제출
	@RequestMapping(value="/mypCpaTrainRegSubmit.do")
	public ModelAndView mypCpaTrainRegSubmit(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		//오늘날짜
		SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String opetrDe = today.format(c1.getTime());

		paramMap.put("opetrDe", opetrDe);
		paramMap.put("regFlag","Y");
		paramMap.put("userId", paramMap.get("pin"));

		mypTrainService.mypCpaTrainRegisterRegFlagSave(paramMap);

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
