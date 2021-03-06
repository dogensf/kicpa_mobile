
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
		<link rel="canonical" href="https://keenthemes.com/metronic" />
		<!--begin::Fonts-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		<!--end::Fonts-->
		<!--begin::Global Theme Styles(used by all pages)-->
		<!-- <link href="/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/style.bundle.css" rel="stylesheet" type="text/css" /> -->
		<!--end::Global Theme Styles-->
		<!--begin::Layout Themes(used by all pages)-->
		<!-- <link href="/assets/css/themes/layout/header/base/light.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/themes/layout/header/menu/light.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/themes/layout/brand/dark.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/themes/layout/aside/dark.css" rel="stylesheet" type="text/css" />
		end::Layout Themes
		<link rel="shortcut icon" href="assets/media/logos/favicon.ico" />


        <link href="/assets/css/custom/fonts.css" rel="stylesheet">
		<link href="/assets/css/custom/common.css" rel="stylesheet">
		<link href="/assets/css/custom/input.css" rel="stylesheet">
        <link href="/assets/css/custom/button.css" rel="stylesheet">
        <link href="/assets/css/custom/login.css" rel="stylesheet">
        ???????????????
		<link href="/assets/css/custom/applicant-registration.css" rel="stylesheet">
 -->



		<script type="text/javascript">		
		<!--
		<c:if test="${!empty sessionScope.returnUrl}">
			document.location.href="/kicpacs${sessionScope.returnUrl}";
		</c:if>
		function actionLogin() {
		
		    if (document.loginForm.id.value =="") {
		        alert("???????????? ???????????????");
		        return false;
		    } else if (document.loginForm.password.value =="") {
		        alert("??????????????? ???????????????");
		        return false;
		    } else {
		        document.loginForm.action="<c:url value='/uat/uia/actionSecurityLogin.do'/>";
		        //document.loginForm.j_username.value = document.loginForm.userSe.value + document.loginForm.username.value;
		        //document.loginForm.action="<c:url value='/j_spring_security_check'/>";
		        document.loginForm.submit();
		    }
		}
		
		
		
		function setCookie (name, value, expires) {
		    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
		}
		
		function getCookie(Name) {
		    var search = Name + "="
		    if (document.cookie.length > 0) { // ????????? ???????????? ?????????
		        offset = document.cookie.indexOf(search)
		        if (offset != -1) { // ????????? ????????????
		            offset += search.length
		            // set index of beginning of value
		            end = document.cookie.indexOf(";", offset)
		            // ?????? ?????? ????????? ?????? ????????? ?????? ??????
		            if (end == -1)
		                end = document.cookie.length
		            return unescape(document.cookie.substring(offset, end))
		        }
		    }
		    return "";
		}
		
		function saveid(form) {
		    var expdate = new Date();
		    // ??????????????? 30????????? ???????????? ???. ????????? ??????????????? * 30?????? ????????? ???????????? ???
		    if (form.checkId.checked)
		        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30???
		    else
		        expdate.setTime(expdate.getTime() - 1); // ?????? ????????????
		    setCookie("saveid", form.id.value, expdate);
		}
		
		function getid(form) {
		    form.checkId.checked = ((form.id.value = getCookie("saveid")) != "");
		}
		
		function fnInit() {
		    var message = document.loginForm.message.value;
		    if (message != "") {
		        alert(message);
		    }
			//$('#id').focus();

		    getid(document.loginForm);

		}
		document.addEventListener("DOMContentLoaded", function(){
			fnInit();
		});


		//-->
		</script>
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
		<!--begin::Main-->
		<div class="login-wrap">
			<div class="d-flex justify-content-center align-items-center flex-column vw-100 vh-100">
				<div>
					<div class="login-top pb-5">
						<div class="logo-wrap border-bottom-sm mb-5">
							<img src="assets/images/main-logo.png">
						</div>
						<p class="pl-7">The KOREAN INSTITUTE OF<br>CERTIFIED PUBLIC ACCOUNTANTS</p>
					</div>
					<div class="login-body pt-20">
						<form:form id="loginForm" name="loginForm" method="post">
							<div class="form-group position-relative">
								<input type="text" class="pl-4 form-control rounded-pill h-40px" id="id" name="id" value=""  maxlength="15">
								<label class="position-absolute">?????????</label>
							</div>
							<div class="form-group position-relative mt-16">
								<input type="password" class="form-control rounded-pill h-40px"  maxlength="25" title="??????????????? ???????????????." id="password" name="password"  value=""
									   onkeydown="javascript:if (event.keyCode == 13) { actionLogin(); }">
								<label class="position-absolute">????????????</label>
							</div>
							<div class="form-group">
								<label class="checkbox checkbox-circle checkbox-outline justify-content-center">
									<input type="checkbox"  id="checkId" name="checkId">
									<span class="mr-3 ml-10"></span>
									????????? ????????????
								</label>
							</div>
							<div class="form-group">
								<button class="btn btn-blue h-50px w-100 rounded-pill" onclick="javascript:actionLogin()">?????????</button>
							</div>
							<div class="login-info p-5">
								<p>1. ??? ???????????? KICPA mobile ??????????????????.</p>
								<p>2. ??? ????????? ?????? ????????? ???????????? ????????? ???????????????.</p>
								<p class="m-0">3. ?????? ????????? ????????? ??? ????????? ???????????? ????????? ????????????.</p>
							</div>
							<input type="hidden" name="message" value="${message}" />
							<input type="hidden" name="userSe"  value="USR"/>
							<input name="j_username" type="hidden"/>
						</form:form>
					</div>
				</div>
			</div>
		</div>




		

		<!--end::Global Theme Bundle-->
	</body>
	<!--end::Body-->
</html>