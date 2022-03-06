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
			window.open("/kicpa/counselCenter/boardForm.do?boardId="+$("#boardForm input[name='boardId']").val() , "boardForm")
		});
	}
	board.boardListInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="boardId" id="boardId" value="nonextaudit01">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">

	<section class="head-sub">
	 	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>회계기준 회원상담 (비외감대상)</h3>
	</section>
	<section class="content">
		<div class="tab-main">
			<a class="tab-link active" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'nonextaudit01')">
		        <span>공동주택</span>
		    </a>
			<a class="tab-link" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'nonextaudit02')">
		        <span>주택정비조합</span>
		    </a>
			<a class="tab-link" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'nonextaudit04')">
		        <span>비영리공익법인</span>
		    </a>
			<a class="tab-link" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'nonextaudit05')">
		        <span>대규모점포</span>
		    </a>
		</div>


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
		<jsp:include page="/include/includeLoign.jsp"/>
	</section>
</form>