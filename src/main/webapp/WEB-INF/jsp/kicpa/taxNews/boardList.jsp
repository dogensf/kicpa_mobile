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
	<input type="hidden" name="boardId" id="boardId" value="taxinfo02">

	<section class="head-sub">
		 <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>세무속보</h3>
	</section>
	<section class="content">
		<div class="tab-main">
		    <a class="tab-link active" href="javascript:void(0);" onclick="taxNews.menuChange(this,'taxinfo02')">
		        <span>세무안내</span>
		    </a>
		    <a class="tab-link" href="javascript:void(0);" onclick="taxNews.menuChange(this,'taxinfo06')">
		        <span>세무자료,실무가이드</span>
		    </a>

		    <a class="tab-link" href="javascript:void(0);" onclick="taxNews.menuChange(this,'taxinfo09')">
		        <span>실무쟁점,예규판례등</span>
		    </a>
		</div>

		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="text" name="searchKeyword" placeholder="검색하세요." />
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
	</section>
</form>