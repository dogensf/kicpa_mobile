<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-13
  Time: 오후 3:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<script src="/js/kicpa/memberEvent/memberEventLogin.js"></script>

<script>

    function fncLocation(){
        //location.href="/kicpa/main/main.do";
        $('#appExit').addClass("show");

    }

</script>

<form>


    <section class="head-main">
        <h1>회원경조사 로그인 / 본인인증</h1>
        <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
    </section>
    <section class="content memberEventLogin">
        <div class="login-box box">
            <div class="text">본회 홈페이지 회원인 경우 아래 <b>로그인</b> 버튼을 클릭하시기 바랍니다.</div>
            <button class="login">로그인</button>
        </div>
        <div class="verify-box box">
            <div class="text">본회 홈페이지 회원이 아닌 경우 아래 <b>본인인증</b> 버튼을 클릭하시기 바랍니다.</div>
            <button class="login">본인인증</button>
        </div>
    </section>
</form>