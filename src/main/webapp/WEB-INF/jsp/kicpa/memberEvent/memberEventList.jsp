<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-13
  Time: 오후 1:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import ="adminwork.com.cmm.LoginVO" %>

<script src="/js/kicpa/memberEvent/memberEventList.js?ver=1"></script>

<script>
    if (window['bridge'] )  {
        window.bridge.displayBottom(true);
    }

    $(document).ready(function(){

        $(".btn-write").show();

        $(".btn-write").on("click",function(){

            var di = sessionStorage.getItem("di");
            var name = sessionStorage.getItem("sName");

            location.href="/kicpa/memberEvent/memberEventRegMove.do?boardId="+$("#boardForm input[name='boardId']").val()+"&di="+di+"&name="+name;
            //window.open("/kicpa/memberEvent/memberEventRegMove.do?boardId="+$("#boardForm input[name='boardId']").val()+"&di="+di+"&name="+name , "boardForm")
        });

        memberEventList.memberEventListInit();

    });

    function fncLocation(){
        //location.href="/kicpa/main/main.do";
        $('#appExit').addClass("show");

    }

</script>

<form id="boardForm" name="boardForm">
    <input type="hidden" name="pageIndex" id="pageIndex" value="1">
    <input type="hidden" name="boardId" id="boardId" value="mstate">
    <input type="hidden" name="loginYn" id="loginYn" value="Y">
    <input type="hidden" name="returnUrl" id="returnUrl" value="">
    <input type="hidden" name="boardInfo" id="boardInfo" value="memEvent">

    <!-- <section class="head-sub">
        <button class="btn-back" type="button" onclick="fncLocation();">
            <span>이전</span>
        </button>
        <h3>회원경조사</h3>
    </section> -->
    <section class="head-main">
        <h1>회원경조사</h1>
        <%
            LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
            if(loginVO == null){
        %>
        <button class="btn-login" onclick="location.href='<c:url value='/uat/uia/LoginUsr.do'/>';" type="button">
            로그인
        </button>
        <%
        }else{
        %>
        <button class="btn-login" onclick="javascript:logOut();" type="button">
            로그아웃
        </button>
        <%
            }
        %>
        <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
    </section>
    <section class="content memberEventList">
        <div id="tabMain1" class="tab-main-content show">
            <div class="search-box">
                <input class="search" type="text" readonly="readonly" name="searchKeyword" placeholder="검색하세요." />
                <button class="btn-del" type="button"><span>삭제</span></button>
            </div>

            <div id="tabSub1" class="tab-sub-content show">
                <div class="board-top">
                    <div class="total-num">
                        <span>결과</span>
                        <span class="find" id="totalCnt"></span>
                    </div>
                </div>

                <!-- 게시판 목록 -->
                <div class="board-list">
                    <ul>
                    </ul>
                </div>

            </div><!-- tabSub1 -->
        </div><!-- tabMain1 -->

        <jsp:include page="/include/includeLoign.jsp"/>
    </section>
</form>