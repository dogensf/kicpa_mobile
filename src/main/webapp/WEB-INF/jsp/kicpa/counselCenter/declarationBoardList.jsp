<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){

	if(${isLogin} == true){

		$(".btn-write").show();

		$(".btn-write").on("click",function(){

			window.open("/kicpa/counselCenter/declarationStep1.do", "boardForm")

		});
	}

	counselCenter.declarationInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="searchKeyword" value="">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<input type="hidden" name="returnUrl" id="returnUrl" value="">
</form>
<section class="head-sub">
	<button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>실명신고</h3>
</section>
<section class="content">
	<div id="tabMain1" class="tab-main-content show">
	    <div id="tabSub1" class="tab-sub-content show">
	        <div class="board-top">
	            <div class="total-num">
	                <span>결과</span>
	                <span class="find" id="totalCnt">24건</span>
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