<%--
  Class Name : memberSearch.jsp
  Description : 회원검색 (임직원 전용)
  Modification Information

        수정일             수정자                   수정내용
    -------    --------    ---------------------------
    2026.07.30   LSY          최초 생성

--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<script src="/js/kicpa/memberSearch/memberSearch.js"></script>
<script>
$(document).ready(function(){
	memberSearch.init();
});

function fncLocation(){
	location.href = "/kicpa/myp/faqQnaCategory.do";
}
</script>

<form id="memberSearchForm" name="memberSearchForm" onsubmit="return false;">

	<section class="head-sub">
	    <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>회원검색</h3>
	</section>
	<section class="content">
		<!-- 성명 검색 (완전일치) -->
		<div class="search-box" style="display: flex;">
			<input class="search" type="search" name="searchKeyword" id="searchKeyword" placeholder="성명을 입력하세요." />
			<button class="btn-del" type="button" id="btnClear"><span>삭제</span></button>
		</div>
		<div class="btn-area">
			<button type="button" class="btn-primary" id="btnSearch">검색</button>
		</div>

		<div class="board-top">
			<div class="total-num">
				<span>결과</span>
				<span class="find" id="totalCnt">0건</span>
			</div>
		</div>

		<!-- 검색 결과 그리드 -->
		<table class="table-col blue">
			<thead>
				<tr>
					<th>자격구분</th>
					<th>등록번호</th>
					<th>성명</th>
					<th>소속</th>
				</tr>
			</thead>
			<tbody id="memberSearchGrid">
				<tr class="emptyRow">
					<td colspan="4">성명을 입력하고 검색하세요.</td>
				</tr>
			</tbody>
		</table>
	</section>
</form>
