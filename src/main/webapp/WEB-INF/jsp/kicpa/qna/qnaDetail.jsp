<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script>
$(document).ready(function(){

	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});

});
</script>
<form id="boardForm" name="boardForm" onsubmit="return false;">


	<section class="head-sub line">
	       <button class="btn-back" type="button">
	           <span>이전</span>
	       </button>
	       <h3>문의처리 결과</h3>
	</section>
	<section class="content">
	    <div class="board-detail">
	        <div class="inner">
	            <h4><c:out value="${result.qnaSj}"/></h4>

	            <div class="togl-box">
	            	<button class="btn-board-togl active" type="button">민원구분</button>
	                <div class="cont">
	                    <table class="table-row">
	<%--                         <caption>구인정보</caption> --%>
	                        <colgroup>
	                            <col width="40%">
	                            <col width="60%">
	                        </colgroup>
	                        <tr>
	                            <th>등록일</th>
	                        	<td><c:out value="${result.regDt }"/></td>
	                        </tr>
	                        <tr>
	                            <th>카테고리</th>
	                            <td><c:out value="${result.category }"/></td>
	                        </tr>
	                        <tr>
	                            <th>해당업무</th>
	                            <td><c:out value="${result.job }"/></td>
	                        </tr>
	                    </table>
	                </div>
	            </div>

	            <div class="cont-line">
	                <h5>내용</h5>
	                <div class="textline">
						${result.qnaCn }
	                </div>
	            </div>

	        </div>
	    </div>


	    <c:if test="${result.answerTy  ne null and result.answerTy ne ''}">

		    <div class="board-detail">
		        <div class="inner">
	                <h5>답변</h5>
		            <div class="togl-box">
		            	<button class="btn-board-togl active" type="button">업무정보</button>
		                <div class="cont">
		                    <table class="table-row">
		                        <colgroup>
		                            <col width="40%">
		                            <col width="60%">
		                        </colgroup>
		                        <tr>
		                            <th>답변유형</th>
		                        	<td><c:out value="${result.answerTy }"/></td>
		                        </tr>
		                        <tr>
		                            <th>담당부서</th>
		                            <td></td>
		                        </tr>
		                        <tr>
		                            <th>담당부서</th>
		                            <td></td>
		                        </tr>
		                    </table>
		                </div>
		            </div>

		            <div class="cont-line">
		                <h5>내용</h5>
		                <div class="textline">
							${result.answerCn}
		                </div>
		            </div>


		        </div>
		    </div>
	    </c:if>
	</section>
</form>
