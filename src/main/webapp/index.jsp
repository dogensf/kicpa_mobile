<%--
  Class Name : index.jsp
  Description : 최초화면으로 메인화면으로 이동한다.(system)
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javaScript">
if (window['bridge'] )  {
	window.bridge.userDataGet('loginIng', 'setLoginIng');
	
}
	function setCookie (name, value, expires) {
	    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
	}
	
	function setLoginIng(token){
		//alert("--------"+token);
		 expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30);
		setCookie("loginIng", token, expdate);
	}
	
	document.location.href='/kicpa/main/main.do';     
	
</script>
