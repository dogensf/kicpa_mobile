
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
	<!--begin::Head-->
	<head><base href="../../../">
		<meta charset="utf-8" />
		<title>KICPA</title>
		<meta name="description" content="Multi column form examples" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		
		<script type="text/javascript">	
		<!--
		
		function fnInit() {
		
		        document.loginForm.action="<c:url value='/uat/uia/actionSecurityLogin.do'/>";
		        //document.loginForm.j_username.value = document.loginForm.userSe.value + document.loginForm.username.value;
		        //document.loginForm.action="<c:url value='/j_spring_security_check'/>";
		        document.loginForm.submit();
		
		}
		
		
		document.addEventListener("DOMContentLoaded", function(){
			fnInit();
		});


		//-->
		</script>
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body>
	
	
						<form:form id="loginForm" name="loginForm" method="post">
							
								<input type="hidden" class="pl-4 form-control rounded-pill h-40px" id="id" name="id" value="${id}"  maxlength="15">
								<input type="hidden" class="form-control rounded-pill h-40px"  maxlength="25" title="비밀번호를 입력하세요." id="password" name="password"  value=""
									   onkeydown="javascript:if (event.keyCode == 13) { actionLogin(); }">
							<input type="hidden" name="message" value="${message}" />
							<input type="hidden" name="userSe"  value="USR"/>
							<input type="hidden" name="url"  value="${url}"/>
							<input name="j_username" type="hidden"/>
						</form:form>
					

	</body>
	<!--end::Body-->
</html>