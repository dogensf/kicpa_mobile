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

			window.open("/kicpa/counselCenter/boardForm.do?boardId="+$("#boardForm input[name='boardId']").val() , "boardForm")

		});
	}


	$("button.btn-round-sm").on("click",function(){

		if($("#boardId").val() == 'kifrs'){

			var text = {}

			text.gray = "";
			text.gray += "IFRS실무적용과 관련한 다양한 사례는 'IFRS 실무사례(월간공인회계사 기고문)'를 참고하시기 바랍니다.<br/><br/>";
			text.gray += '<div  style="text-align: center;"><a style="text-decoration:underline;" href="/kicpa/accIstAlert/ifrsBoardList.do">IFRS 실무사례</a></div>';
			fn_portal_pop("informationPopup",text)
		}

	})


	board.boardListInit();
});

function fncLocation(){
	//location.href="/kicpa/main/main.do";
	location.href="/kicpa/counselCenter/counselCenterCategory.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="boardId" id="boardId" value="kifrs">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<input type="hidden" name="returnUrl" id="returnUrl" value="">

	<section class="head-sub">
	  	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>회계기준 회원상담 (K-IFRS상담)</h3>
	</section>
	<section class="content">
		<div class="tab-main">
			<a class="tab-link active" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'kifrs')">
		        <span>상담글</span>
		    </a>
			<a class="tab-link" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'kifrsReview')">
		        <span>의견검토</span>
		    </a>
			<a class="tab-link" href="javascript:void(0);" onclick="counselCenter.kifrsTab(this,'kifrsCase')">
		        <span>상담사례</span>
		    </a>
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