<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/taxNews/taxNews.js"></script>
<script>
$(document).ready(function(){
	board.boardListInit();
// 	taxNews.init();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="boardId" id="boardId" value="${boardId }">
	<input type="hidden" name="loginYn" id="loginYn" value="N">

	<section class="head-sub">
		 <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>세무속보</h3>
	</section>
	<section class="content">
		<div class="tab-main">
		    <a class="tab-link <c:if test="${boardId eq 'taxinfo02' }">active</c:if>" href="javascript:void(0);" onclick="taxNews.menuChange(this,'taxinfo02')">
		        <span>세무안내</span>
		    </a>
		    <a class="tab-link <c:if test="${boardId eq 'taxinfo06' }">active</c:if>" href="javascript:void(0);" onclick="taxNews.menuChange(this,'taxinfo06')">
		        <span>세무자료,실무가이드</span>
		    </a>

		    <a class="tab-link <c:if test="${boardId eq 'taxinfo09' }">active</c:if>" href="javascript:void(0);" onclick="taxNews.menuChange(this,'taxinfo09')">
		        <span>Tax Letter</span>
		    </a>
		</div>

		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="text" name="searchKeyword" readonly="readonly" placeholder="검색하세요." />
	        	<button class="btn-del" type="button"><span>삭제</span></button>
		    </div>

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
</form>