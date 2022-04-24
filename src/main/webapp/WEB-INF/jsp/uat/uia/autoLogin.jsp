<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
	<!--begin::Head-->
	<head>
		<meta charset="utf-8">
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Pragma" content="no-cache">
        <title> </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <meta name="description" content="">
        <meta name="keyword" content="">
        <meta property="og:title" content="">
        <meta property="og:image" content="">
        <meta property="og:description" content="">
        <meta property="og:url" content="">
        <meta name="format-detection" content="telephone=no">
        <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="/js/jquery-ui.min.js"></script>


		<script type="text/javascript">
		
		$(document).ready(function(){
			 document.loginForm.action="<c:url value='/uat/uia/actionSecurityLogin.do'/>";
		     document.loginForm.submit();
		});

		//-->
		</script>
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body>
		<form id="loginForm" name="loginForm" method="post">
                <!-- 아이디 -->
                    <input type="hidden" id="id" name="id" placeholder="아이디" />
                <!-- 비밀번호 -->
                    <input type="hidden" id="password" name="password" placeholder="비밀번호" />
                	<input type="hidden" id="token" name="token" value="" />
                    <input type="checkbox" checked  id="checkId" name="checkId" value="N" />                                    
	            <input type="hidden" name="message" value="${message}" />
				<input type="hidden" name="userSe"  value="USR"/>
				<input name="j_username" type="hidden"/>
                 </form>
	</body>
	<!--end::Body-->
</html>