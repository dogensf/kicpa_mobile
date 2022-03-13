package adminwork.kicpa.memberEvent.web;


import java.util.Date;
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

import com.ibm.icu.text.SimpleDateFormat;

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

				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Date d = format.parse(StringUtil.isNullToString(map.get("deaDate")));
				SimpleDateFormat format2 = new SimpleDateFormat("yyyy년 MM월 dd일 ( E 요 일 )");
				String deaDateFormat = format2.format(d);

				d = format.parse(StringUtil.isNullToString(map.get("burialDt")));
				format2 = new SimpleDateFormat("yyyy년 MM월 dd일 ( E 요 일 )");
				String burialDtFormat = format2.format(d);
//

				String bltnCntt = "";
				bltnCntt += "<p class=\"0\" style=\"line-height:200%;text-align:center;word-break:keep-all;mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;letter-spacing:1.2pt;\" align=\"center\"><u><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:24.0pt;\">부    고</span></u></p>\n";
				bltnCntt += "<p></p><p></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: center; line-height: 200%;\" align=\"center\"><span lang=\"EN-US\" style=\"mso-fareast-font-family:궁서체;letter-spacing:0.3pt;font-size:15.0pt;\">      </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:0.3pt;font-size:15.0pt;\">"+user.getName()+"</span><span lang=\"EN-US\" style=\"mso-fareast-font-family:궁서체;letter-spacing:0.1pt;font-size:15.0pt;\"> </span><span lang=\"EN-US\" style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:0.1pt;mso-text-raise:0pt;font-size:15.0pt;\">("+"회원번호"+", </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:0.1pt;font-size:15.0pt;\">"+"회계법인명"+"</span><span lang=\"EN-US\" style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:0.1pt;mso-text-raise:0pt;font-size:15.0pt;\">)</span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:0.1pt;font-size:15.0pt;\">회원의 </span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: center; line-height: 200%;\" align=\"center\"><span lang=\"EN-US\" style=\"mso-fareast-font-family:궁서체;letter-spacing:0.1pt;font-size:15.0pt;\">      </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:0.1pt;font-size:15.0pt;\">"+StringUtil.isNullToString(map.get("relation"))+"께서 </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:0.3pt;font-size:15.0pt;\">작고하셨음을 알려드립니다</span><span lang=\"EN-US\" style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:0.3pt;mso-text-raise:0pt;font-size:15.0pt;\">.</span></p>\n";
				bltnCntt += "<p></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: center; line-height: 200%;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">작고일 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+deaDateFormat+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: center; line-height: 200%;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">빈  소  </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+StringUtil.isNullToString(map.get("mortuary"))+"</span></p>\n";
				bltnCntt += "<p class=\"0\" style=\"text-align: center; line-height: 200%;\" align=\"center\"><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;mso-hansi-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">○ </span><span style=\"font-family:궁서체;mso-fareast-font-family:궁서체;letter-spacing:1.2pt;font-size:14.0pt;\">발인일 </span><span style=\"mso-fareast-font-family:궁서체;font-family:궁서체;mso-ascii-font-family:궁서체;mso-font-width:100%;letter-spacing:1.2pt;mso-text-raise:0pt;font-size:14.0pt;\">: "+burialDtFormat+"</span></p>\n";
				map.put("bltnCntt", bltnCntt );





				map.put("bltnIcon", "A");
				map.put("bltnFileCnt", 0);


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
