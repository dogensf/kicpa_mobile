<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/faq/faq.js"></script>
<script>
$(document).ready(function(){
	faq.listInit();
});

function fncLocation(){
	//location.href="/kicpa/main/main.do";
	location.href="/kicpa/myp/faqQnaCategory.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<input type="hidden" name="searchKeyword" value="">
	<input type="hidden" name="faqCate" value="">
	<input type="hidden" name="returnUrl" id="returnUrl" value="">

	<section class="head-sub">
	    <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>FAQ</h3>
	</section>
	<section class="content">
		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="search" readonly="readonly" name="readInput" id="readInput" placeholder="검색하세요." />
		        <button class="btn-del" type="button"><span>삭제</span></button>
		    </div>

		    <div class="tab-sub">
		        <ul>
		   	  		<li class="active"><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'');">전체</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'공인회계사');">공인회계사</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'감사인');">감사인</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'세무사(세무대리)');">세무사(세무대리)</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'수습공인회계사');">수습공인회계사</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'회비');">회비</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'연수');">연수</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'수임신고');">수임신고</a></li>
		          	<%-- <li><a href="javascript:fn_select_List_cate('8. 제증명');" <c:if test="${searchVO.faq_cate == '8. 제증명'}">class="active"</c:if>>제증명</a></li> --%>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'출판물');">출판물</a></li>
		          	<li><a href="javascript:void(0);" onclick="faq.fn_select_List_cate(this,'기타');">기타</a></li>
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