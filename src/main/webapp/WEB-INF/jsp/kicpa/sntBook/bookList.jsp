<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.bookInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="type" id="type" value="bookList">
	<input type="hidden" name="bookDiv" id="bookDiv" value="2">
</form>
<section class="head-sub">
  	<button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>도서자료 리스트</h3>
</section>
<section class="content">

	<div class="tab-main">
	    <a class="tab-link active" href="javascript:void(0);">
	        <span>출판도서구매</span>
	    </a>
	    <a class="tab-link" href="/kicpa/sntBook/bookFormatList.do">
	        <span>감사조서 서식 구매등</span>
	    </a>

	</div>

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
</section>