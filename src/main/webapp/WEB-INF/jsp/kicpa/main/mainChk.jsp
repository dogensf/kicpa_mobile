<%--
  Class Name : index.jsp
  Description : 최초화면으로 메인화면으로 이동한다.(system)
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javaScript">
	$(document).ready(function(){	
		if (window['bridge'] )  {
			window.bridge.userDataGet('loginIng', 'setLoginIng');
		}
		
		document.location.href='/kicpa/main/main1.do';     
	});
	
	function setCookieChk (name, value, expires) {
	    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
	}
	
	function setLoginIng(token){
		if(token != null && token !=""){
			alert("--------"+token);	
		}		 
		 expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30);
		 setCookieChk("loginIng", token, expdate);
	}
	
	
	
</script>
