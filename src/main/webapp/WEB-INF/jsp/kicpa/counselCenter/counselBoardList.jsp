<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){
	counselCenter.counselInit();
});
</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="cateId" id="cateId" value="2">
	<input type="hidden" name="searchKeyword" value="">
</form>
<section class="head-sub">
	<button class="btn-back" type="button">
        <span>이전</span>
    </button>
    <h3>회원전문 세무상담</h3>
</section>
<section class="content">

	<c:if test="${codeList ne null and fn:length(codeList) ne 0 }">
		<div class="tab-main">
	   		<c:forEach items="${codeList }" var="code"  varStatus="index" >
	   			<c:if test="${code.code ne 1}">
	    			<c:choose>
	    				<c:when test="${index.index eq 1}">
		   					<a class="tab-link active" href="javascript:void(0);" onclick="counselCenter.categoryTab(this,${code.code})">
						        <span>${code.codeName}</span>
						    </a>
	    				</c:when>
	    				<c:otherwise>
	    					<a class="tab-link" href="javascript:void(0);"  onclick="counselCenter.categoryTab(this,${code.code})">
						        <span>${code.codeName}</span>
						    </a>
	    				</c:otherwise>
	    			</c:choose>
	   			</c:if>
	   		</c:forEach>
   		</div>
   	</c:if>


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