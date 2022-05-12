package adminwork.let.uat.uia.web;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.saltware.enpass.client.EnpassClient;

import adminwork.com.cmm.EgovMessageSource;
import adminwork.com.cmm.LoginVO;
import adminwork.let.uat.uap.service.EgovLoginPolicyService;
import adminwork.let.uat.uia.service.LoginService;
import adminwork.let.utl.sim.service.ClntInfo;
import egovframework.rte.fdl.cmmn.trace.LeaveaTrace;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;


/**
 * 일반 로그인, 인증서 로그인을 처리하는 컨트롤러 클래스
 * @author 공통서비스 개발팀 박지욱
 * @since 2009.03.06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.06  박지욱          최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
@Controller
public class LoginController {

	/** EgovLoginService */
	@Resource(name = "loginService")
	private LoginService loginService;

	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	/** EgovLoginPolicyService */
	@Resource(name = "egovLoginPolicyService")
	EgovLoginPolicyService egovLoginPolicyService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** TRACE */
	@Resource(name = "leaveaTrace")
	LeaveaTrace leaveaTrace;

	/**
	 * 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/LoginUsr.do")
	public String loginUsrVie(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		/*HttpSession session = request.getSession();
		System.out.println("=========="+request.getParameter("returnUrl"));
		if(!"".equals(StringUtil.isNullToString(request.getParameter("returnUrl"))) ) {
			session.setAttribute("returnUrl", request.getParameter("returnUrl"));
		}*/
		
		//System.out.println("1=========="+session.getAttribute("returnUrl"));
		return "uat/uia/LoginUsr";
	}
	
	/**
	 * 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/authLogin.do")
	public String authLogin(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		model.addAttribute("title", "회계연수원");
		/*HttpSession session = request.getSession();
		System.out.println("=========="+request.getParameter("returnUrl"));
		if(!"".equals(StringUtil.isNullToString(request.getParameter("returnUrl"))) ) {
			session.setAttribute("returnUrl", request.getParameter("returnUrl"));
		}*/
		
		//System.out.println("1=========="+session.getAttribute("returnUrl"));
		return "kicpa/common/authLogin";
	}
	
	/**
	 * 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/egovLoginUsr.do")
	public String loginUsrView(@ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return "uat/uia/EgovLoginUsr";
	}

	
	/**
	 * sso 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	
	@RequestMapping(value = "/uat/uia/actionSsoLogin.do")
	public String actionSsoLogin(HttpServletResponse response, HttpServletRequest request, ModelMap model, HttpSession session) throws Exception {

		// 접속IP
		String userIp = ClntInfo.getClntIP(request);
		
		Properties props = System.getProperties();
		
		EnpassClient client = new EnpassClient( request, response);
		
		System.out.println( "java version=" + props.getProperty("java.runtime.version"));		

		
		client.doLogin();
		Enumeration en = session.getAttributeNames();
		String key;
		String ssoId = null;		
		HashMap ssoMap = null;
		String userTpId = null;
		ssoId = (String)session.getAttribute("_enpass_id_");
		ssoMap = (HashMap)session.getAttribute("_enpass_attr_");
		if( ssoId!=null) {
			System.out.println("SSO SUCCESS.");
			System.out.println("<br/>");
			System.out.println("SSO ID : " + ssoId);
			System.out.println("<br/>");
			Object[] keys = ssoMap.keySet().toArray();
			  String userId = "";
			  if (ssoMap != null) {
		            userId = (String) ssoMap.get("immVnum");
		            System.out.println("userId=" + userId);
		         }
			  
			model.addAttribute("id", userId);
			return "uat/uia/LoginSso";
		} else {
			System.out.println("SSO FAILED");
			// SSO 실패시 LOGOUT으로 판단하고 세션 삭제
			model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
			return "uat/uia/LoginUsr";
		}		
	}
	
	
	/**
	 * 일반(스프링 시큐리티) 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionSecurityLogin.do")
	public String actionSecurityLogin(@ModelAttribute("loginVO") LoginVO loginVO, HttpServletResponse response, HttpServletRequest request, ModelMap model) throws Exception {

		// 접속IP
		String userIp = ClntInfo.getClntIP(request);
		

			
			
			// 0. kicpa 로그인 처리
						/*LoginVO kicpaVO = loginService.kicpaLogin(loginVO);
						LoginVO kicpaVO = new LoginVO();
						kicpaVO.setAima_psl_id(loginVO.getId());*/
						boolean mainLogin = false;
						LoginVO resultVO = new LoginVO();
						Cookie[] cookies = request.getCookies();
						if(null != cookies) {
							for(Cookie c : cookies) {
								  if("loginIng".equals(c.getName().toString())){
									  if("" != c.getValue() && null != c.getValue()) {				  
										  mainLogin = true;
										  loginVO.setId(c.getValue().toString().replace("%3A", ":"));
										  System.out.println("2---------------------.loginIng::::::: "+ c.getValue());
									  }
								  }		  
								}
						}
						
						if(mainLogin) {
							resultVO = loginService.actionLoginMain(loginVO);
						}else {
							resultVO = loginService.actionLogin(loginVO);
						}
						
		
					
						
						//if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("") && loginPolicyYn) {
						if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("")) {
							
							if("Y".equals(loginVO.getCheckId())) {
								
								
								Cookie cookie = new Cookie("loginIng", loginVO.getToken()+loginVO.getId());
								cookie.setPath("/");
								cookie.setMaxAge(60*60*24*30);
								response.addCookie(cookie);
							}
							
							/*if(("").equals(resultVO.getAuthor()) || null == resultVO.getAuthor()) {
								loginService.setUserAuthorCode(resultVO);
							}*/
							// 2. spring security 연동
							request.getSession().setAttribute("LoginVO", resultVO);

							UsernamePasswordAuthenticationFilter springSecurity = null;

							ApplicationContext act = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getSession().getServletContext());
										
							Map<String, UsernamePasswordAuthenticationFilter> beans = act.getBeansOfType(UsernamePasswordAuthenticationFilter.class);
							
							if (beans.size() > 0) {
								
								springSecurity = (UsernamePasswordAuthenticationFilter) beans.values().toArray()[0];
								springSecurity.setUsernameParameter("egov_security_username");
								springSecurity.setPasswordParameter("egov_security_password");
								springSecurity.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(request.getServletContext().getContextPath() +"/egov_security_login", "POST"));
								
							} else {
								throw new IllegalStateException("No AuthenticationProcessingFilter");
							}
							System.out.println("resultVO.getUserSe()=="+resultVO.getUserSe());
							System.out.println("resultVO.getId()=="+resultVO.getId());
							System.out.println("resultVO.getUniqId()=="+resultVO.getUniqId());
										
							springSecurity.doFilter(new RequestWrapperForSecurity(request, resultVO.getId(), resultVO.getUniqId()), response, null);
							System.out.println("loginVO.getUrl()=="+loginVO.getUrl());
							/*if(loginVO.getUrl() != null && loginVO.getUrl() != "") {
								request.getSession().setAttribute("returnUrl", loginVO.getUrl());
								return "forward:/uat/uia/actionRedirect.do?url="+loginVO.getUrl(); // 성공 시 페이지.. (redirect 불가)
							}*/
							return "forward:/uat/uia/actionMain.do"; // 성공 시 페이지.. (redirect 불가)
						} else {

							model.addAttribute("message", "로그인에 실패했습니다.\n ID와 PASSWORD를 다시 체크 하시기 바랍니다.");
							return "uat/uia/LoginUsr";
						}
		
		
	}
	
	
	
	/**
	 * 일반(스프링 시큐리티) 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionSecurityLoginMain.do")
	public String actionSecurityLoginMain(@ModelAttribute("loginVO") LoginVO loginVO, HttpServletResponse response, HttpServletRequest request, ModelMap model) throws Exception {
		Cookie[] cookies = request.getCookies();
		for(Cookie c : cookies) {
		  if("loginIng".equals(c.getName())){
			  if("" != c.getValue() && null != c.getValue()) {				  
				  loginVO.setId(c.getValue().toString().replace("%3A", ":"));
				  System.out.println("2.loginIng::::::: "+ c.getValue());
			  }
		  }		  
		}
		
		LoginVO resultVO = new LoginVO();
		
		resultVO = loginService.actionLoginMain(loginVO);
	
		
		//if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("") && loginPolicyYn) {
		if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("")) {
			
			// 2. spring security 연동
			request.getSession().setAttribute("LoginVO", resultVO);

			UsernamePasswordAuthenticationFilter springSecurity = null;

			ApplicationContext act = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getSession().getServletContext());
						
			Map<String, UsernamePasswordAuthenticationFilter> beans = act.getBeansOfType(UsernamePasswordAuthenticationFilter.class);
			
			if (beans.size() > 0) {
				
				springSecurity = (UsernamePasswordAuthenticationFilter) beans.values().toArray()[0];
				springSecurity.setUsernameParameter("egov_security_username");
				springSecurity.setPasswordParameter("egov_security_password");
				springSecurity.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(request.getServletContext().getContextPath() +"/egov_security_login", "POST"));
				
			} else {
				throw new IllegalStateException("No AuthenticationProcessingFilter");
			}
			System.out.println("resultVO.getUserSe()=="+resultVO.getUserSe());
			System.out.println("resultVO.getId()=="+resultVO.getId());
			System.out.println("resultVO.getUniqId()=="+resultVO.getUniqId());
						
			springSecurity.doFilter(new RequestWrapperForSecurity(request, resultVO.getId(), resultVO.getUniqId()), response, null);
			
			
			return "forward:/uat/uia/actionMain.do"; // 성공 시 페이지.. (redirect 불가)
		} else {			
			return "redirect:/kicpa/main/main2.do";
		}
	}

	/**
	 * sso 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionSsoLogin2.do")
	public String actionSsoLogin2(HttpServletResponse response, HttpServletRequest request, ModelMap model, HttpSession session) throws Exception {

		// 접속IP
		String userIp = ClntInfo.getClntIP(request);

		Properties props = System.getProperties();

		EnpassClient client;
		//try {
		client = new EnpassClient(request, response);
		client.doLogin();

		Enumeration<String> en = session.getAttributeNames();
		String key;
		while( en.hasMoreElements()) {
			key = (String)en.nextElement();
			//LOGGER.debug( key +"=" + session.getAttribute(key));
		}

		@SuppressWarnings("rawtypes")
		Map ssoMap = (HashMap) session.getAttribute("_enpass_attr_");
		//	LOGGER.debug("_enpass_attr_ : {}", ssoMap);

		if (ssoMap != null) {
			String userId = (String) ssoMap.get("immVnum");
			//	LOGGER.debug("userId=" + userId);

			return "redirect:/uat/uia/actionSecurityLogin.do?id="+userId; // 성공 시 페이지.. (redirect 불가)
		} else {
			return "uat/uia/LoginUsr";
		}

	}
	
	
	
	
	/**
	 * 로그인 후 메인화면으로 들어간다
	 * @param
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionMain.do")
	public String actionMain(HttpServletResponse response, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		// 1. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
			return "uat/uia/LoginUsr";
		}
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		LoginVO rt = loginService.kicpaInfo(user);

		if(rt == null){
			session.setAttribute("cpaId", "");//회계사 번호
			session.setAttribute("auditNm", ""); //법인명
			session.setAttribute("status", "");//휴페업 및 법인명
		}
		else{
			session.setAttribute("cpaId", rt.getCpa_id());//회계사 번호
			session.setAttribute("auditNm", rt.getAudit_nm()); //법인명
			session.setAttribute("status", rt.getStatus());//휴페업 및 법인명
		}
		
		Cookie[] cookies = request.getCookies();
		for(Cookie c : cookies) {
		  if("returnUrl".equals(c.getName())){
			  if("" != c.getValue() && null != c.getValue()) {
				  String rtUrl = c.getValue();
				  Cookie cookie = new Cookie("returnUrl", "");				
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				  return "redirect:" + rtUrl;
			  }		
		  }
		}
		
		/*if(session.getAttribute("returnUrl") != null  && session.getAttribute("returnUrl") != "") {
			String rtUrl = session.getAttribute("returnUrl").toString();
			session.removeAttribute("returnUrl");
			return "redirect:" + rtUrl;
		}*/
		
		return "uat/uia/movePage";
		//return "redirect:/kicpa/main/main.do";
		
		

	}

	/**
	 * 로그아웃한다.
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionLogout.do")
	public String actionLogout(HttpServletResponse response,HttpServletRequest request, ModelMap model) throws Exception {
		request.getSession().setAttribute("LoginVO", null);
		
		Cookie cookie = new Cookie("loginIng", "");		
		cookie.setPath("/");
		cookie.setMaxAge(0);
		response.addCookie(cookie);	
		
		Cookie cookie2 = new Cookie("returnUrl", "");		
		cookie2.setPath("/");
		cookie2.setMaxAge(0);
		response.addCookie(cookie2);	
			
		return "redirect:/egov_security_logout";
	}
	
	/**
	 * 로그인 후 메인화면으로 들어간다
	 * @param
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionMain2.do")
	public String actionMain2(HttpServletResponse response, HttpServletRequest request, ModelMap model) throws Exception {
	
		Cookie cookie = new Cookie("loginIng", "");
		cookie.setPath("/");
		cookie.setMaxAge(0);
		response.addCookie(cookie);	
		
		Cookie cookie2 = new Cookie("returnUrl", "");		
		cookie2.setPath("/");
		cookie2.setMaxAge(0);
		response.addCookie(cookie2);
		
		return "redirect:/kicpa/main/main2.do";
		
	}
}

class RequestWrapperForSecurity extends HttpServletRequestWrapper {
	private String username = null;
	private String password = null;

	public RequestWrapperForSecurity(HttpServletRequest request, String username, String password) {
		super(request);

		this.username = username;
		this.password = password;
	}
	
	@Override
	public String getServletPath() {		
		return ((HttpServletRequest) super.getRequest()).getContextPath() + "/egov_security_login";
	}

	@Override
	public String getRequestURI() {		
		return ((HttpServletRequest) super.getRequest()).getContextPath() + "/egov_security_login";
	}

	@Override
	public String getParameter(String name) {
		if (name.equals("egov_security_username")) {
			return username;
		}

		if (name.equals("egov_security_password")) {
			return password;
		}

		return super.getParameter(name);
	}
}