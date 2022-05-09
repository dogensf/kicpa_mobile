<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.lectureInit();
});

function fncLocation(){
	//location.href="/kicpa/main/main.do";
	location.href="/kicpa/sntBook/sntBookCategory.do";
}

</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="gbn" id="gbn" value="${gbn }">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<input type="hidden" name="returnUrl" id="returnUrl" value="">

	<section class="head-sub">
	    <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>실무특강 리스트</h3>
	</section>
	<section class="content">


		<div class="tab-main">
		    <a class="tab-link <c:if test="${gbn eq 'LISTPAGE2'}">active</c:if>" href="javascript:void(0);" onclick="sntBook.specialLectureChange(this,'LISTPAGE2');">
		        <span>수강신청</span>
		    </a>
		    <a class="tab-link <c:if test="${gbn eq 'LISTPAGE3'}">active</c:if>" href="javascript:void(0);" onclick="sntBook.specialLectureChange(this,'LISTPAGE3');">
		        <span>신청내역</span>
		    </a>
		</div>
		<div id="tabMain1" class="tab-main-content show">
			<div class="blue-box" style="display: none;">
				<div class="application-sum">
					<span>(입금대기) 합계금액</span>
					<em class="sum"></em>
				</div>
			</div>
		    <div id="tabSub1" class="tab-sub-content show">
		        <div class="board-top">
		            <div class="total-num">
		                <span>결과</span>
		                <span class="find" id="totalCnt">24건</span>
		            </div>
		            <button class="btn-round-sm" type="button">안내 </button>
		        </div>

		        <!-- 게시판 목록 -->
		      <div class="board-list">
		          <ul>
		          </ul>
		      </div>
		  </div><!-- tabSub1 -->
		</div><!-- tabMain1 -->
		<jsp:include page="/include/includeLoign.jsp"/>
		 <!-- 페이지 하단 버튼 -->
	    <div class="sticky-bottom">
	        <button class="btn-sticky" id="appBtn" disabled type="button">선택 신청하기</button>
	    </div>
	</section>
</form>