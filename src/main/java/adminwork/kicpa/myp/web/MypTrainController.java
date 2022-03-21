package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypTrainService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value="/kicpa/myp")
public class MypTrainController {


	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypTrainService")
	private MypTrainService mypTrainService;

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

			paramMap.put("pin",paramMap.get("pin"));

			//합격자 정보(성명, 연락처) 가져오기(실제 테이블)
			List<?> cpaTrainRealRegInfo = myPageService.selectCpaPassInfoList(paramMap);
			Map<String, Object> cpaMemTrainRealRegInfo = new HashMap<>();
			if(cpaTrainRealRegInfo.size()>0){
				cpaMemTrainRealRegInfo.putAll((Map<String, Object>)cpaTrainRealRegInfo.get(0));
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


}
