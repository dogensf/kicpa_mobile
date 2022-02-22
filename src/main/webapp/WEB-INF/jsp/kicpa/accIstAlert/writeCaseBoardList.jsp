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
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="boardId" id="boardId" value="acc1201">
	<input type="hidden" name="searchKeyword" value="">
</form>
<section class="head-sub">
	<button class="btn-back" type="button">
        <span>이전</span>
    </button>
    <h3>작성사례 등</h3>
</section>
<section class="content">

	<div class="tab-main">
	    <a class="tab-link active" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1201')">
	        <span>감사보고서 작성사례</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1202')">
	        <span>감사조서 서식 예시</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1203')">
	        <span>금융거래조회서</span>
	    </a>
	</div>

	<div id="tabMain1" class="tab-main-content show">
	    <div class="search-box">
	        <input class="search" type="text" readonly="readonly" placeholder="검색하세요." />
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