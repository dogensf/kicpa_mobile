<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/notice/notice.js"></script>
<script>
$(document).ready(function(){
// 	board.boardListInit();
	notice.boardListInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="boardId" id="boardId" value="${boardId }">

	<section class="head-sub">
	  	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>알림마당</h3>
	</section>
	<section class="content">
		<div class="tab-main">
			<c:choose>
				<c:when test="${boardId eq 'noti' }">
				    <a class="tab-link active" href="javascript:void(0);" onclick="notice.menuChange(this,'noti')">
				        <span>공지사항</span>
				    </a>
				    <a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'NEWS')">
				        <span>주요기사(Daily Newsclips)</span>
				    </a>
				    <a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'intl04/intl05/intl06/intl07/intl08/rpnofin05')">
				        <span>국제동향</span>
				    </a>
				</c:when>
				<c:when test="${boardId eq 'NEWS' }">
				 	<a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'noti')">
				        <span>공지사항</span>
				    </a>
				    <a class="tab-link active" href="javascript:void(0);" onclick="notice.menuChange(this,'NEWS')">
				        <span>주요기사(Daily Newsclips)</span>
				    </a>
				    <a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'intl04/intl05/intl06/intl07/intl08/rpnofin05')">
				        <span>국제동향</span>
				    </a>
				</c:when>
				<c:when test="${boardId eq 'intl04/intl05/intl06/intl07/intl08/rpnofin05' }">
					<a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'noti')">
				        <span>공지사항</span>
				    </a>
				    <a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'NEWS')">
				        <span>주요기사(Daily Newsclips)</span>
				    </a>
				    <a class="tab-link active" href="javascript:void(0);" onclick="notice.menuChange(this,'intl04/intl05/intl06/intl07/intl08/rpnofin05')">
				        <span>국제동향</span>
				    </a>
				</c:when>
				<c:otherwise>
					<a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'noti')">
				        <span>공지사항</span>
				    </a>
				    <a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'NEWS')">
				        <span>주요기사(Daily Newsclips)</span>
				    </a>
				    <a class="tab-link" href="javascript:void(0);" onclick="notice.menuChange(this,'intl04/intl05/intl06/intl07/intl08/rpnofin05')">
				        <span>국제동향</span>
				    </a>
				</c:otherwise>
			</c:choose>
		</div>

		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="text" readonly="readonly" name="searchKeyword" placeholder="검색하세요." />
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
	</section>
</form>