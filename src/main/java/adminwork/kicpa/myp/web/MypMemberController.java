package adminwork.kicpa.myp.web;


import adminwork.com.cmm.LoginVO;
import adminwork.kicpa.myp.service.MyPageService;
import adminwork.kicpa.myp.service.MypMemberService;
import adminwork.kicpa.myp.service.MypPassService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.sql.Blob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value="/kicpa/myp")
public class MypMemberController {

	@Resource(name = "myPageService")
	private MyPageService myPageService;

	@Resource(name = "mypMemberService")
	private MypMemberService mypMemberService;


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

	@RequestMapping(value = "/mypCpaMemberReg.do")
	public String mypCpaMemberReg(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
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

			model.addAttribute("mypCpaMemberRegPin", paramMap.get("pin"));
			model.addAttribute("cpaPassRealInfo", cpaPassRealInfo);
			model.addAttribute("mypCpaMemberRegSaveMode", paramMap);


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaMemberReg.do");
			return "uat/uia/LoginUsr";

		}

		return "kicpa/myp/mypCpaMemberReg";
	}

	@RequestMapping(value = "/mypCpaTrnngSmInfo.do")
	public String mypCpaTrnngSmInfo(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		System.out.println("isAuthenticated========="+isAuthenticated);

		if (isAuthenticated) {
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			System.out.println("========="+user.getUniqId());

			List<?> cpaMemberRegTrnngSmInfo = mypMemberService.selectCpaMemberRegistTrnngSmInfoList(paramMap);			//사이버연수
			List<?> cpaMemberRegTrnngSmYearList = mypMemberService.selectCpaMemberRegistTrnngSmYearList(paramMap);			//사이버연수 시행년도

			model.addAttribute("cpaMemberRegTrnngSmInfo", cpaMemberRegTrnngSmInfo);
			model.addAttribute("cpaMemberRegTrnngSmInfoSize", cpaMemberRegTrnngSmInfo.size());
			model.addAttribute("cpaMemberRegTrnngSmYearList", cpaMemberRegTrnngSmYearList);

			model.addAttribute("mypCpaTrnngSmInfoPin", paramMap.get("pin"));


		}else {
			System.out.println("pin========="+paramMap.get("pin"));
			model.addAttribute("id", paramMap.get("pin"));
			model.addAttribute("url", "/kicpa/myp/mypCpaTrnngSmInfo.do");
			return "uat/uia/LoginUsr";

		}



		return "kicpa/myp/mypCpaTrnngSmInfo";
	}

	//사이버연수 정보 조회(실제 테이블)
	@RequestMapping(value="/selectCpaMemTrnngSmYear.do")
	public ModelAndView selectCpaMemTrnngSmYear(@RequestParam Map<String, Object> paramMap) throws Exception{

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			List<?> cpaMemTrnngSmInfo = mypMemberService.selectCpaMemberRegistTrnngSmInfoList(paramMap);

			modelAndView.addObject("cpaMemTrnngSmInfo", cpaMemTrnngSmInfo);
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//수정할 데이터 조회(수정모드)
	@RequestMapping(value="/selectMypCpaMemberRegUpdateInfoList.do")
	public ModelAndView selectMypCpaMemberRegUpdateInfoList(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			//정보공개설정 수정
			if("mypCpaMemberReg_nmstOthbcInfo".equals(paramMap.get("movePage"))){
				List<?> cpaMemberNmstOthbcInfo = mypMemberService.selectCpaMemberRegNmstOthbcInfoList(paramMap);		//정보공개설정
				modelAndView.addObject("cpaMemberNmstOthbcInfo", cpaMemberNmstOthbcInfo);
				modelAndView.addObject("cpaMemberNmstOthbcInfoSize", cpaMemberNmstOthbcInfo.size());
			}


			modelAndView.addObject("message", "");
			modelAndView.addObject("code", "200");
		}catch (Exception e) {
			modelAndView.addObject("message", "저장에 실패했습니다.");
			modelAndView.addObject("code", "400");
		}

		return modelAndView;
	}

	//정보공개설정 저장
	@RequestMapping(value="/mypCpaMemberRegNmstOthbcInfoSave.do")
	public ModelAndView mypCpaMemberRegNmstOthbcInfoSave(@RequestParam Map<String, Object> paramMap) throws Exception{

		//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("jsonView");

		try {

			if("".equals(paramMap.get("ofcAdresYn")) || (paramMap.get("ofcAdresYn") == null)){
				modelAndView.addObject("message", "사무소 주소를 선택하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("ofcNameYn")) || (paramMap.get("ofcNameYn") == null)){
				modelAndView.addObject("message", "사무소 명을 선택하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("emailYn")) || (paramMap.get("emailYn") == null)){
				modelAndView.addObject("message", "전자메일을 선택하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("ofcTelYn")) || (paramMap.get("ofcTelYn") == null)){
				modelAndView.addObject("message", "사무소 전화를 선택하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("photoYn")) || (paramMap.get("photoYn") == null)){
				modelAndView.addObject("message", "사진을 선택하세요.");
				return modelAndView;
			}
			else if("".equals(paramMap.get("ofcFaxYn")) || (paramMap.get("ofcFaxYn") == null)){
				modelAndView.addObject("message", "사무소 팩스를 선택하세요.");
				return modelAndView;
			}

			paramMap.put("userId", paramMap.get("pin"));

			if("U".equals(paramMap.get("saveMode"))){
				mypMemberService.mypCpaMemberRegisterNmstOthbcInfoUpdate(paramMap);		//실제테이블(이름) 업데이트
			}
			else{
				mypMemberService.mypCpaMemberRegisterNmstOthbcInfoSave(paramMap);		//임시테이블 저장
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
