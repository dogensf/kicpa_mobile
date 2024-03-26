<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-13
  Time: 오후 3:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ImgUrl" value="/images/"/>

<link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
<link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<script src="/js/kicpa/memberEvent/memberEventLogin.js?ver=1"></script>

<script>

    if (window['bridge'] )  {
        window.bridge.displayBottom(true);
    }

    $(document).ready(function(){

        memberEventLogin.memberEventLoginInit();

    });

    function fncLocation(){
        //location.href="/kicpa/main/main.do";
        location.href="/kicpa/memberEvent/memberEventList.do";

    }

</script>
<body>
<div class="wrap">

    <form name="memberEventLoginForm_nice" id="memberEventLogin_nice" method="post">

        <input type="hidden" name="m" value="checkplusService">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->
        <input type="hidden" name="EncodeData" value="">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->

    </form>

    <div class="container">
        <section class="head-sub head-main">
            <button class="btn-back" type="button" onclick="javascript:fncLocation();">
                <span>이전</span>
            </button>
            <h3>회원경조사 로그인 / 본인인증</h3>
            <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
        </section>

        <section class="content memberEventLogin">
            <div class="login-box box">
                <div class="text">본회 홈페이지 회원인 경우 아래 <b>로그인</b> 버튼을 클릭하시기 바랍니다.</div>
                <button class="login" type="button" id="memberEventLogin_loginBtn">로그인</button>
            </div>
            <div class="verify-box box">
                <div class="text">본회 홈페이지 회원이 아닌 경우 아래 <b>본인인증</b> 버튼을 클릭하시기 바랍니다.</div>
                <button class="login" type="button" id="memberEventLogin_confirm">본인인증</button>
            </div>

            <input type="hidden" id="memberEventLogin_di"/>
            <input type="hidden" id="memberEventLogin_name"/>

            <jsp:include page="/include/includeLoign.jsp"/>
        </section>
    </div>
</div>
</body>