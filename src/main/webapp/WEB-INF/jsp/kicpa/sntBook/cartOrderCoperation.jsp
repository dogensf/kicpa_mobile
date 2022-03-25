<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>

$(document).ready(function(){
	sntBook.cartOrderCoperationInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>
<form name="orderForm" id="orderForm" >
	<input type="hidden" id="ibmBookCode" name="ibmBookCode" value="${param.ibmBookCode}">
	<section class="head-pop">
		<h3>구매</h3>
		<button class="btn-close" type="button" onclick="fncLocation();">
		    <span>닫기</span>
		</button>
	</section>

	<section class="content">

		<div class="step-box">
		    <span>회계법인으로 구매</span>
	        <h4>출판도서 회계법인신청</h4>
	      	<br/>
	        <div class="step-by">
	            <b>1</b> / <em>2</em>
	        </div>
	    </div>

		<fieldset>
		   	<div class="add-box">
		        <div class="form">
			   		<div class="inp-box">
				        <label class="label essen" for="cnt">신청수량(수량변경가능)</label>
				        <input type="text" id="cnt" name="cnt" placeholder=""  value="1" />
				    </div>
			   		<div class="inp-box">
				        <label class="label essen" for="price">가격</label>
				        <input type="text" id="price" placeholder="" disabled="disabled" value="${bookDetail.ibmPrice2 }" />
				    </div>
			   		<div class="inp-box">
				        <label class="label essen" for="totPrice">합계금액</label>
				        <input type="text"  id="totPrice" placeholder="" disabled="disabled" value="${bookDetail.ibmPrice2 }" />
				    </div>
				</div>
			</div>
		</fieldset>
	</section>

	<!-- 이전페이지로 이동 -->
	<div class="btn-page-bottom">
	    <button class="btn-text-back" onclick="javascript:location.href='/kicpa/sntBook/bookList.do'" type="button">이전페이지로 이동</button>
	</div>

	<!-- 페이지하단 버튼 -->
	<div class="sticky-bottom">
	    <button class="btn-sticky" id="orderBtn" type="button">구매</button>
	</div>

</form>