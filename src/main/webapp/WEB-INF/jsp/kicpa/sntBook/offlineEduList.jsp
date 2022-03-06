<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.offlineEduInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="accEduUse" id="accEduUse" value="1">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
</form>
<section class="head-sub">
  	<button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>집합연수</h3>
</section>
<section class="content">

	<div class="tab-main">
	    <a class="tab-link active" href="javascript:void(0);" onclick="sntBook.offlineEduMainTabs(this,1)">
	        <span>집합연수 리스트</span>
	    </a>
	    <a class="tab-link" href="javascript:void(0);" onclick="sntBook.offlineEduMainTabs(this,2)">
	        <span>신청여부 리스트</span>
	    </a>

	</div>


	<div id="tabMain1" class="tab-main-content show">
		<div class="tab-sub">
		        <ul>
					<li class="active">
	            	    <a href="javascript:void(0);" onclick="sntBook.offlineEduSubTabs(this,1)">회원연수</a>
	            	</li>
					<li>
	            	    <a href="javascript:void(0);" onclick="sntBook.offlineEduSubTabs(this,2)">일반인 연수(사무직원 포함)</a>
	            	</li>
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
	          </ul>
	      </div>
	  </div><!-- tabSub1 -->
	</div><!-- tabMain1 -->
	<jsp:include page="/include/includeLoign.jsp"/>
</section>