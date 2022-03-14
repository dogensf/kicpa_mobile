<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/accIstAlert/accIstAlert.js"></script>
<script>
$(document).ready(function(){
	board.boardListInit();
// 	taxNews.init();
});

function fncLocation(){
	location.href="/kicpa/accIstAlert/accIstAlertCategory.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="boardId" id="boardId" value="ethstd01/ethstd02/ethstd03">

	<section class="head-sub">
	 	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>윤리기준</h3>
	</section>
	<section class="content">


		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="text" readonly="readonly" name="searchKeyword" placeholder="검색하세요." />
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