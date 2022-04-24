<%--
  Class Name : EgovIncHeader.jsp
  Description : 화면상단 Header (include)
  Modification Information

      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2011.08.31   JJY       경량환경 버전 생성

    author   : 실행환경개발팀 JJY
    since    : 2011.08.31
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<%@ page import ="javax.servlet.http.Cookie" %>
<%@ page import ="javax.servlet.http.HttpServletResponse" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<section class="head-main">
    <h1>
      <img src="/images/kicpa/logo.png" alt="KICPA">
    </h1>
    <%
	    Cookie cookie = new Cookie("returnUrl", "/kicpa/main/main.do");
		cookie.setPath("/");
		cookie.setMaxAge(60*15);
		response.addCookie(cookie);
    
    
        LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
        if(loginVO == null){
        %>
        <button class="btn-login" onclick="javascript:location.href='<c:url value='/uat/uia/LoginUsr.do'/>';" type="button">
     	 로그인
    	</button>
	  	<%
        }else{
	  	%>
	  	<button class="btn-login" onclick="javascript:logOut();" type="button">
     	 로그아웃
    	</button>

	  	<%
	  	}
        %>
    
    

    <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">
      	카테고리
    </button>
</section> 