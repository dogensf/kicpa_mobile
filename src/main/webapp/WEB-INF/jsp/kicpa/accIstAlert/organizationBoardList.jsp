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
	<input type="hidden" name="boardId" id="boardId" value="acc1401">
	<input type="hidden" name="searchKeyword" value="">
</form>
<section class="head-sub">
  	<button class="btn-back" type="button">
        <span>이전</span>
    </button>
    <h3>타기관 제정</h3>
</section>
<section class="content">

	<div class="tab-main">
	    <a class="tab-link active" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1401')">
	        <span>분/반기재무재표 검토준칙</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1402')">
	        <span>내부회계관리제도에 대한 모범규준 /적용의견서/적용해설서</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1403')">
	        <span>회계감사에 관한 실무의견서</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1404')">
	        <span>외부평가업무가이드라인</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1405')">
	        <span>공공감사기준</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1406')">
	        <span>공공기관의 회계감사 및 결산감사에 관한 규칙</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1407')">
	        <span>지방자치단체 재무보고서 검토기준</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="accIstAlert.menuChange(this,'acc1408')">
	        <span>지방자치단체 회계기준에 관한 규칙</span>
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