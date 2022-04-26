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
		var token="";
		$(document).ready(function(){
			$('#checkId').trigger('click');
			<%-- window.bridge.userDataSave('JSESSIONID', '<%=session.getId() %>'); --%>
			fnInit();
			document.cookie = "loginIng=" + escape ('') + "; path=/; expires=0";
			if (window['bridge'] )  {				
				window.bridge.userDataSave('loginIng', '');
				window.bridge.userDataRemove('loginIng');
				window.bridge.getFcmToken('function(d) {setToken(d);window.token = d;}');
				
			}
		});

		
		
		
		function actionLogin() {
			
		    if (document.loginForm.id.value =="") {
		        alert("사용자 ID를 입력하시기 바랍니다.");
		        return false;
		    } else if (document.loginForm.password.value =="") {
		        alert("비밀번호를 입력하시기 바랍니다.");
		        return false;
		    } else {
		        document.loginForm.action="<c:url value='/uat/uia/actionSecurityLogin.do'/>";
		        //document.loginForm.j_username.value = document.loginForm.userSe.value + document.loginForm.username.value;
		        //document.loginForm.action="<c:url value='/j_spring_security_check'/>";
		        document.loginForm.submit();
		    }
		}

		function setToken(tokens){			
			$('#token').val(tokens);
			
		}

		function setCookie (name, value, expires) {
		    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
		}

		function getCookie(Name) {
		    var search = Name + "="
		    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
		        offset = document.cookie.indexOf(search)
		        if (offset != -1) { // 쿠키가 존재하면
		            offset += search.length
		            // set index of beginning of value
		            end = document.cookie.indexOf(";", offset)
		            // 쿠키 값의 마지막 위치 인덱스 번호 설정
		            if (end == -1)
		                end = document.cookie.length
		            return unescape(document.cookie.substring(offset, end))
		        }
		    }
		    return "";
		}

		function saveid(form) {
		    var expdate = new Date();
		    // 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
		    if (form.checkId.checked)
		        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
		    else
		        expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제조건
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
		    $('#checkId').trigger('click');

		}
        function fncLocation(){
            location.href="/kicpa/main/main.do";
            //location.href="javascript:history.back(-1);";
        }

		//-->
		</script>
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body>
		<!--begin::Main-->
	 		<div class="wrap">
            <div class="container">
                <section class="head-sub">
                    <button class="btn-back" type="button" onClick="javascript:fncLocation();">
                        <span>이전</span>
                    </button>
                    <h3>로그인</h3>
                </section>

                <section class="content">
                    <div class="login-wrap">
                        <form id="loginForm" name="loginForm" method="post">
                            <div class="login-box">
                                <!-- 아이디 -->
                                <div class="inp-box">
                                    <input type="text" id="id" name="id" placeholder="아이디" />
                                </div>
                                <!-- 비밀번호 -->
                                <div class="inp-box">
                                    <input type="password" id="password" name="password" placeholder="비밀번호" />
                                </div>
                                <div class="inp-box">
                                	<input type="hidden" id="token" name="token" value="" />
                                    <input type="checkbox" checked  id="checkId" name="checkId" value="Y" />                                    
                                    <label for="checkId">로그인 상태 유지</label>
                                </div>
                            </div>
                            <div class="btn-area">
                                <button type="button" class="btn-primary" onclick="javascript:actionLogin()" >로그인</button>
                            </div>
                            <input type="hidden" name="message" value="${message}" />
							<input type="hidden" name="userSe"  value="USR"/>
							<input name="j_username" type="hidden"/>
                        </form>
                    </div>
                </section>

                <footer>
                    <address>
                      <span>
                        서울특별시 서대문구 충정로7길 12 (충정로 2가) 한국공인회계사회
                      </span>
                      <span>TEL : 02-3149-0100</span>
                      <span class="between-line">
                        <a href="#">개인정보처리방침</a>
                        <a href="#">이용약관</a>
                      </span>
                      <span>COPYRIGHT (C) KICPA, ALL RIGHTS RESERVED.</span>
                    </address>
                  </footer>
            </div>
        </div>
	</body>
	<!--end::Body-->
</html>