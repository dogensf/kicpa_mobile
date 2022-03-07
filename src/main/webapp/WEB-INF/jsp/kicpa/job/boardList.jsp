<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/job/job.js"></script>
<script>
$(document).ready(function(){
	job.init();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="ijCoSep" id="ijCoSep" value="1">
	<input type="hidden" name="boardId" id="boardId" value="${param.boardId }">
	<input type="hidden" name="ijJobSep" id="ijJobSep" value="1">
	<input type="hidden" name="loginYn" id="loginYn" value="">
	<input type="hidden" name="searchKeyword" value="">

	<section class="head-sub">
	    <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>구인정보</h3>
	</section>
	<section class="content">

		<div class="tab-main">
		    <a class="tab-link active" href="javascript:void(0);" onclick="job.menuChange(this,1)">
		        <span>공인회계사</span>
		    </a>
		    <a class="tab-link" href="javascript:void(0);" onclick="job.menuChange(this,'')">
		        <span>일반</span>
		    </a>
		    <a class="tab-link" href="javascript:void(0);" onclick="job.menuChange(this,'jobInfoKicpa')" >
		        <span>공인회계사회</span>
		    </a>
		</div>
		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="text" readonly="readonly" name="readInput" id="readInput" placeholder="검색하세요." />
		    </div>

		    <div class="tab-sub">
		        <ul>
		        	<c:if test="${codeList ne null and fn:length(codeList) ne 0 }">
		        		<c:forEach items="${codeList }" var="code"  varStatus="index" >
		        			<c:if test="${code.code ne 8}">
			        			<c:choose>
			        				<c:when test="${index.index eq 0}">
		        						 <li class="active">
							                <a href="javascript:void(0);" onclick="job.ijCoSepChange(this,'${code.code}');">${code.codeName}</a>
							            </li>
			        				</c:when>
			        				<c:otherwise>
		        						<li>
						               		<a href="javascript:void(0);" onclick="job.ijCoSepChange(this,'${code.code}');">${code.codeName}</a>
							            </li>
			        				</c:otherwise>
			        			</c:choose>
		        			</c:if>
		        		</c:forEach>

		        	</c:if>
		        </ul>
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