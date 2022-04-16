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

			window.open("/kicpa/counselCenter/counselBoardForm.do?cateId="+$("#boardForm input[name='cateId']").val() , "boardForm")

		});
	}

	$("button.btn-round-sm").on("click",function(){
		var text = {}

		text.gray = "";
		text.gray += "본 회원전문세무상담은 회원만을 위한 세무지식 공유의 장으로 정확한 상담을 위해 질문 시 사실관계, 관련 법조문, 참고예규 및 질문자의 의견(갑설, 을설)을 명확하게 기술해주시기 바라며, 너무 포괄적인 질문, 정확한 계산을 요하는 질문, 사실판단과 해결방안을 요구하는 질문, ";
		text.gray += "세무분야가 아닌 질문 등은 답변이 불가능하오니 이점 양해해주시기 바랍니다.<br/><br/>";
		text.gray += "본 게시판의 설치목적에 위배되는 게시물은 운영자가 임의로 삭제합니다.";

		fn_portal_pop("informationPopup",text)

	})


	counselCenter.counselInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="cateId" id="cateId" value="2">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<input type="hidden" name="returnUrl" id="returnUrl" value="">

	<section class="head-sub">
		<button class="btn-back" type="button" onclick="fncLocation();">
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
		        <input class="search" type="text" readonly="readonly" name="searchKeyword" placeholder="검색하세요." />
		         <button class="btn-del" type="button"><span>삭제</span></button>
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
	</section>
</form>