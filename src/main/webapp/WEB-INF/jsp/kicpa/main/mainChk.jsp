<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

	<script type="text/javascript">
	$(document).ready(function(){	
		if (window['bridge'])  {			
			window.bridge.userDataGet('loginIng', 'window.setLoginIngs');
		}else{
			 
			location.href="<c:url value='/kicpa/main/main1.do'/>";
		}
		
		     
	});
	
	function setLoginIngs(tokens){
		if(null != tokens  && "" != tokens){			
			 var expdate = new Date();
			 expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30);
			 setCookieChks("loginIng", tokens, expdate);
		}else{
			
			location.href="<c:url value='/kicpa/main/main1.do'/>";
		}
		
	}
	
	function setCookieChks(name, value, expires) {		
	    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();	    
	    location.href="<c:url value='/kicpa/main/main1.do'/>";
	}
	
	
	
	
	
</script>
