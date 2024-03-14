<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-13
  Time: 오후 4:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<script src="/js/kicpa/memberEvent/memberEventReg.js"></script>

<script>

    function fncLocation(){
        //location.href="/kicpa/main/main.do";
        $('#appExit').addClass("show");

    }

</script>

<form>


    <section class="head-main">
        <h1>회원경조사 등록 / 수정</h1>
        <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
    </section>
    <section class="content">


    </section>
</form>