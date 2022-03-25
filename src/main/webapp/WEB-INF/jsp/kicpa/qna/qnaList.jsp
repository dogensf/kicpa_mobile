<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/qna/qna.js"></script>
<script>
$(document).ready(function(){


	if(${isLogin}){

		$(".btn-write").show();

		$(".btn-write").on("click",function(){
			window.open("/kicpa/qna/qnaForm.do", "boardForm")
		});

	}

	qna.listInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<input type="hidden" name="searchKeyword" value="">

	<section class="head-sub">
	    <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>문의 접수</h3>
	</section>
	<section class="content">
		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="search" readonly="readonly" name="readInput" id="readInput" placeholder="검색하세요." />
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
	<!-- 	              <li> -->
	<!-- 	                  <a href="#"> -->
	<!-- 	                      <div class="title-zone"> -->
	<!-- 	                          <p>다산회계법인 4본부 경력회계사님을 모십니다.</p> -->
	<!-- 	                          <div class="other"> -->
	<!-- 	                              <span class="state">회계사</span> -->
	<!-- 	                          </div> -->
	<!-- 	                      </div> -->
	<!-- 	                      <div class="info-zone"> -->
	<!-- 	                          <span>2021.12.14</span> -->
	<!-- 	                          <span>다산회계법인</span> -->
	<!-- 	                          <span>서울 강남구</span> -->
	<!-- 	                          <span>160</span> -->
	<!-- 	                      </div> -->
	<!-- 	                  </a> -->
	<!-- 	              </li> -->
		          </ul>
		      </div>
		  </div><!-- tabSub1 -->
		</div><!-- tabMain1 -->
		<jsp:include page="/include/includeLoign.jsp"/>
	</section>
</form>