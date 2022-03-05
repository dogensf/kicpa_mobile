package adminwork.kicpa.memberEvent.web;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.cmm.board.service.CommonBoardService;
import adminwork.kicpa.cmm.comm.service.KicpaCommService;
import adminwork.kicpa.job.service.JobAdvertisementService;
import adminwork.kicpa.sntBook.service.SntBookService;
import adminwork.kicpa.taxNews.service.TaxNewsService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping(value="/kicpa/memberEvent")
public class MemberEventController {

	@Resource(name = "kicpaCommService")
	private KicpaCommService kicpaCommService;

	@Resource(name = "commonBoardService")
	CommonBoardService commonBoardService;


	@RequestMapping(value = "/boardList.do")
	public String boardList(@RequestParam Map<String,Object> map,HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		model.addAttribute("isLogin", isAuthenticated);
		model.addAttribute("title", "회원경조사");
		if(isAuthenticated) {
			return "kicpa/memberEvent/boardList";
		}else {
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
			return "kicpa/common/authLogin";
		}

	}


	@RequestMapping(value="/insertMemberEvent.do")
	public ModelAndView getOfflineEduAppList(@RequestParam Map<String,Object> map, HttpServletRequest request,MultipartHttpServletRequest multipart) throws Exception{
		ModelAndView modelAndView = new ModelAndView();

		try{
			modelAndView.setViewName("jsonView");

			Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
			if(isAuthenticated) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();


				map.put("actionCd", "01" );
				map.put("entityName", "BULLETIN.BLTN_GN" );
				map.put("userPass", "5650320120323");
				map.put("userNick", user.getName());
				map.put("userId", user.getId());
				map.put("cateId", "2");
				map.put("userIp", request.getRemoteAddr());
				map.put("bltnTopTag", "N");
				map.put("bltnSecretYn", "N");
				map.put("bltnPermitYn", "Y");
				map.put("bltnEndYmd", "2900-01-01");
				map.put("extStr2", StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")));
				map.put("extStr1", "회원서비스센터");
				map.put("bltnSubj", "[회계사번호] 이름 회계사님 " +StringUtil.isNullToString(map.get("relation"))+"별세" );

				String bltnCntt = "이름(회계번호, 회계법인) 회원의 "+StringUtil.isNullToString(map.get("relation"))+"께서 작고하셨음을 알려드립니다.\n";
				bltnCntt += "○ 작고일 : " + StringUtil.isNullToString(map.get("deaDate")) + "\n";
				bltnCntt += "○ 빈  소 : " + StringUtil.isNullToString(map.get("mortuary")) + "\n";
				bltnCntt += "☎ "+StringUtil.isNullToString(map.get("phoneNumber1"))+"-"+StringUtil.isNullToString(map.get("phoneNumber2"))+"-" +StringUtil.isNullToString(map.get("phoneNumber3")) + "\n";
				bltnCntt += "○ 발인일 : " + StringUtil.isNullToString(map.get("burialDt")) + "\n";
				map.put("bltnCntt", bltnCntt );


				List<HashMap<String,Object>> fileList = null;

				if(fileList != null && !fileList.isEmpty() ) {
					map.put("bltnIcon", "B");
					map.put("bltnFileCnt", fileList.size());
				}else {
					map.put("bltnIcon", "A");
					map.put("bltnFileCnt", 0);
				}


				commonBoardService.insertCommonBoard(map);

			}


//			list.forEach(x -> StringUtil.checkMapReplaceHtml(x));
//			modelAndView.addObject("list", list);

		}catch (Exception e) {
			e.printStackTrace();
		}

		return modelAndView;
	}

}
