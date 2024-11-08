package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.service.FileMngService2;
import adminwork.com.cmm.service.FileMngUtil;
import adminwork.com.cmm.service.FileVO;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypAudTrainService;
import adminwork.kicpa.myp.service.MypPassService;
import adminwork.kicpa.myp.service.MypTrainService;
import adminwork.let.utl.sim.service.FileScrty;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
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
public class MypAudTrainController {


	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypAudTrainService")
	private MypAudTrainService mypAudTrainService;

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

	@RequestMapping(value = "/mypCpaAudTrainReg.do")
	public String mypCpaMemberReg(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
			List<?> cpaAudTrainRealRegInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemAudTrainRealInfo = new HashMap<>();
			if(cpaAudTrainRealRegInfo.size()>0){
				cpaMemAudTrainRealInfo.putAll((Map<String, Object>)cpaAudTrainRealRegInfo.get(0));
			}

			//등록구분 확인
			List<?> regFlagInfo = myPageService.selectCpaAudTrainRegistReviewInfoList(paramMap);
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
			}
			else{
				paramMap.put("saveMode","I");
				paramMap.put("movePage","");
			}

			model.addAttribute("mypCpaAudTrainRegPin", user.getUniqId());
			model.addAttribute("mypCpaAudTrainRegKoreanNm", cpaMemAudTrainRealInfo.get("koreanNm"));
			model.addAttribute("mypCpaAudTrainRegBrthdy", cpaMemAudTrainRealInfo.get("brthdy"));
			model.addAttribute("mypCpaAudTrainRegSaveMode", paramMap);

		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaAudTrainReg.do");
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/mypCpaAudTrainReg";
	}

	//약관동의 저장
	@RequestMapping(value="/mypCpaAudTrainRegAgreeSave.do")
	public ModelAndView mypCpaAudTrainRegAgreeSave(@RequestParam Map<String, Object> paramMap) throws Exception{

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

			String selectApntcSn = mypAudTrainService.selectMypCpaAudTrainRegisterRegFlagInfo(paramMap);
			if(selectApntcSn == null){
				selectApntcSn = "";
			}

			paramMap.put("apntcSn", selectApntcSn);

			paramMap.put("userId", paramMap.get("pin"));
			paramMap.put("brthdy", paramMap.get("brthdy").toString().replaceAll("-",""));
			int apntcSn = mypAudTrainService.mypCpaAudTrainRegisterAgreeSave(paramMap);

			if(!"".equals(selectApntcSn)){
				apntcSn = Integer.parseInt(selectApntcSn);
			}

			modelAndView.addObject("apntcSn", apntcSn);
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//이력정보(외감) 저장
	@RequestMapping(value="/mypCpaAudTrainRegApntcCpaHistInfoSave.do")
	public ModelAndView mypCpaAudTrainRegApntcCpaHistInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("audRegistDe")) || (paramMap.get("audRegistDe") == null)){
				modelAndView.addObject("message", "외감실무수습 시작일을 선택하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("guideCpaNm")) || (paramMap.get("guideCpaNm") == null)){
				modelAndView.addObject("message", "지도공인회계사명을 입력하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("guideCpaNo")) || (paramMap.get("guideCpaNo") == null)){
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

			int guideCpaCnt = mypTrainService.selectApntcCpaHistGuideCpaCehck(paramMap);

			if(guideCpaCnt<1){
				modelAndView.addObject("message", "지도공인회계사 성명 혹은 번호가\n일치하지 않습니다.");
				return modelAndView;
			}

			paramMap.put("audRegistDe",paramMap.get("audRegistDe").toString().replaceAll("-",""));
			paramMap.put("apntcCl", "A1010020");
			paramMap.put("userId", paramMap.get("pin"));
			mypAudTrainService.mypCpaAudTrainRegisterApntcCpaHistInfoSave(paramMap);

			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//첨부파일 (첨부서류) 저장
	@RequestMapping(value="/mypCpaAudTrainRegAtchFileInfoSave.do")
	public ModelAndView mypCpaAudTrainRegAtchFileInfoSave(final MultipartHttpServletRequest multiRequest) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		Map<String, Object> paramMap = new HashMap<>();

		paramMap.put("pin", multiRequest.getParameter("pin"));
		paramMap.put("apntcSn", multiRequest.getParameter("apntcSn"));
		paramMap.put("userId", paramMap.get("pin"));

		String regFlag = "";

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		if(!"".equals(multiRequest.getParameter("emplCrtiFileIdSet")) && multiRequest.getParameter("emplCrtiFileIdSet") != null){
			paramMap.put("emplCrtiFileId", multiRequest.getParameter("emplCrtiFileIdSet"));
		}
		if(!"".equals(multiRequest.getParameter("eventnSet")) && multiRequest.getParameter("eventnSet") != null){
			regFlag = "F";
		}
		if(!"".equals(multiRequest.getParameter("atchFileIdSet")) && multiRequest.getParameter("atchFileIdSet") != null){
			paramMap.put("atchFileId", multiRequest.getParameter("atchFileIdSet"));
		}

		try {

			String atchFileId = "";

			List<FileVO> result = null;
			int fileKeyParam = 0;
			final Map<String, MultipartFile> files = multiRequest.getFileMap();

			//vaildation 체크
			Iterator fileNameIter = multiRequest.getFileNames();
			while (fileNameIter.hasNext()) {
				String key = (String) fileNameIter.next();
				MultipartFile file = multiRequest.getFile(key);

				if(file.isEmpty()){

					if("emplCrtiFileId".equals(key)){
						modelAndView.addObject("message", "재직증명서를 선택해주세요.");
						return modelAndView;
					}
					else if("rsumFileId".equals(key)){
						modelAndView.addObject("message", "이력서를 선택해주세요.");
						return modelAndView;
					}
				}
			}
			//

			Map<String, Object> cpaPassExamInfo = new HashMap<>();
			//합격자 정보가져오기(파일경로 지정)
			List<?> cpaPassExamInfoList = mypPassService.selectMypCpaPsexamInfo(paramMap);
			cpaPassExamInfo.putAll((Map<String, Object>)cpaPassExamInfoList.get(0));

			Iterator<Map.Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			while (itr.hasNext()) {
				atchFileId = "";
				if ("".equals(atchFileId)) {
					String rsumPath = "opt/file/NEW" + cpaPassExamInfo.get("psexamYear") + "/" + paramMap.get("pin") + "/ETC";

					result = fileUtil.parseAtchFileInf(files, rsumPath, fileKeyParam, atchFileId, rsumPath);

					String fileKey = "KicpaDImgFileKey"; // 16자리 키


					if(!"".equals(result.get(0).fileExtsn) && result.get(0).fileExtsn != null){

						fileMngService2.insertFileInfs(result);

						Iterator<?> iter = result.iterator();
						FileVO vo = (FileVO) iter.next();

						String key = itr.next().getKey();

						if("emplCrtiFileId".equals(key)){
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
				//반려상태일 경우 이전 이력서 저장
				mypAudTrainService.mypCpaAudTrainRegisterFlagFAtchFileSave(paramMap);
			}
			else{
				mypAudTrainService.mypCpaAudTrainRegisterAtchFileIdSave(paramMap);
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
	@RequestMapping(value="/selectMypCpaAudTrainRegReviewInfo.do")
	public ModelAndView selectMypCpaAudTrainRegReviewInfo(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		List<?> cpaAudTrainRegReviewInfoList = new ArrayList<HashMap>();

		cpaAudTrainRegReviewInfoList = myPageService.selectCpaAudTrainRegistReviewInfoList(paramMap);	// 외감수습 임시테이블정보

		modelAndView.addObject("cpaAudTrainRegReviewInfoList", cpaAudTrainRegReviewInfoList);
		modelAndView.addObject("cpaAudTrainRegReviewInfoListSize", cpaAudTrainRegReviewInfoList.size());

		return modelAndView;
	}

	//제출
	@RequestMapping(value="/mypCpaAudTrainRegSubmit.do")
	public ModelAndView mypCpaAudTrainRegSubmit(@RequestParam Map<String, Object> paramMap) throws Exception{

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

		mypAudTrainService.mypCpaAudTrainRegisterRegFlagSave(paramMap);

		return modelAndView;
	}

}
