package adminwork.kicpa.memberSearch.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import adminwork.com.cmm.LoginVO;
import adminwork.com.cmm.StringUtil;
import adminwork.kicpa.myp.service.MyPageService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

/**
 * 회원검색 (임직원 전용).
 * 성명 완전일치 검색 — 자격구분(cpa_cl: 1=KICPA, 그 외=외국공인회계사) | 등록번호 | 성명 | 소속.
 */
@Controller
@RequestMapping(value = "/kicpa/memberSearch")
public class MemberSearchController {

	@Resource(name = "myPageService")
	private MyPageService myPageService;

	/** 임직원 여부 (프린시펄 userTy 기준 — 세션 attr LoginVO 아님) */
	private boolean isEmployee() {
		if (!EgovUserDetailsHelper.isAuthenticated()) {
			return false;
		}
		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		return user != null && "임직원".equals(user.getUserTy());
	}

	/** 회원검색 화면 */
	@RequestMapping(value = "/memberSearch.do")
	public String memberSearch(@RequestParam Map<String, Object> map, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			model.addAttribute("returnUrl", "/kicpa/memberSearch/memberSearch.do");
			Cookie cookie = new Cookie("returnUrl", "/kicpa/memberSearch/memberSearch.do");
			cookie.setPath("/");
			cookie.setMaxAge(60 * 60);
			response.addCookie(cookie);
			return "kicpa/common/authLogin";
		}
		if (!isEmployee()) {
			//임직원 외 접근 차단 — 회원상담 화면으로 회귀
			return "redirect:/kicpa/myp/faqQnaCategory.do";
		}
		model.addAttribute("title", "회원검색");
		return "kicpa/memberSearch/memberSearch";
	}

	/** 회원검색 목록 JSON (성명 완전일치) */
	@RequestMapping(value = "/getMemberSearchList.do")
	public ModelAndView getMemberSearchList(@RequestBody Map<String, Object> map) throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		try {
			modelAndView.setViewName("jsonView");

			//임직원 전용 — 화면 게이트와 별개로 데이터 API도 하드 차단
			if (!isEmployee()) {
				modelAndView.addObject("authYn", "N");
				modelAndView.addObject("totalCnt", 0);
				return modelAndView;
			}

			String searchKeyword = StringUtil.isNullToString(map.get("searchKeyword")).trim();
			if ("".equals(searchKeyword)) {
				modelAndView.addObject("authYn", "Y");
				modelAndView.addObject("totalCnt", 0);
				return modelAndView;
			}
			map.put("searchKeyword", searchKeyword);

			//고객사 제공 프로시저 호출 — 커서 결과는 map의 resultList 키로 반환됨
			myPageService.mblMemSearchProc(map);

			//프로시저는 0건과 오류 모두 v_result=9 — 메시지가 ORA-면 오류로 구분
			String resultText = StringUtil.isNullToString(map.get("resultText"));
			if (resultText.indexOf("ORA-") > -1) {
				System.out.println("mbl_mem_search_proc error: " + resultText);
				modelAndView.addObject("errorYn", "Y");
				modelAndView.addObject("totalCnt", 0);
				return modelAndView;
			}

			@SuppressWarnings("unchecked")
			List<HashMap<String, Object>> resultList = (List<HashMap<String, Object>>) map.get("resultList");
			if (resultList == null) {
				resultList = new ArrayList<HashMap<String, Object>>();
			}
			resultList.forEach(x -> StringUtil.checkMapReplaceHtml(x));

			modelAndView.addObject("authYn", "Y");
			modelAndView.addObject("resultList", resultList);
			modelAndView.addObject("totalCnt", resultList.size());
		} catch (Exception e) {
			e.printStackTrace();
			//오류를 '0건'으로 오인하지 않도록 명시 플래그
			modelAndView.addObject("errorYn", "Y");
			modelAndView.addObject("totalCnt", 0);
		}
		return modelAndView;
	}
}
