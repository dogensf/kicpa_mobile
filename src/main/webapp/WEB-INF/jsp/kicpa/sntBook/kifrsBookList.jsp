<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.kifrsBookInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="ibmNum" id="ibmNum" value="189,190,191,192,193,194,195,196,197,198">
	<section class="head-sub">
   		<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>K-IFRS 실무사례와 해설 시리즈 구매</h3>
	</section>
	<section class="content">

		<div id="tabMain1" class="tab-main-content show">
		    <div id="tabSub1" class="tab-sub-content show">
		        <div class="board-top">
		            <div class="total-num">
		                <span>결과</span>
		                <span class="find" id="totalCnt"> - 건</span>
		            </div>
		        </div>

		        <!-- 게시판 목록 -->
		      <div class="board-list">
		           <ul class="sale">
		          </ul>
		      </div>
		  </div><!-- tabSub1 -->
		</div><!-- tabMain1 -->
		<div class="sticky-bottom">
	        <button class="btn-sticky" type="button" id="goCartBtn" onclick="sntBook.cartValidation();">선택 구매하기</button>
	    </div>
	</section>
</form>