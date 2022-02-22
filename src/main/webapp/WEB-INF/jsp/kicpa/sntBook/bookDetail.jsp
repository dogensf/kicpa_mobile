<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.bookDetailInit();
});

function fncLocation(){

	if($("#type").val() == 'kifrsBookList'){
		location.href="/kicpa/sntBook/kifrsBookList.do";
	}else{
		location.href="/kicpa/sntBook/bookList.do";
	}
}
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="ibmBookCode" id="ibmBookCode" value="${param.ibmBookCode }">
	<input type="hidden" name="type" id="type" value="${param.type }">
</form>

<section class="head-sub line">
       <button class="btn-back" type="button" onclick="fncLocation();">
           <span>이전</span>
       </button>
       <h3>상세</h3>
</section>
<section class="content">
    <div class="board-detail">
        <div class="inner">
            <h4><c:out value="${bookDetail.ibmBookName}"/></h4>

            <div class="togl-box">
                <div class="cont">
                    <table class="table-row">
                        <caption></caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>가격</th>
                            <td><c:out value="${bookDetail.ibmPrice2 }"/>원 (회원할인가:<c:out value="${boardDetail.ibmPrice1 }"/> )</td>
                        </tr>
                        <tr>
                            <th>페이지수</th>
                            <td><c:out value="${bookDetail.ibmPage }"/>P 내외</td>
                        </tr>
                        <tr>
                            <th>규격</th>
                            <td><c:out value="${bookDetail.ibmStandard }"/></td>
                        </tr>
                        <tr>
                            <th>발간년월</th>
                            <td><c:out value="${bookDetail.ibmYm }"/>
	                            <c:choose>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '9' }"> 품절</c:when>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '0' }"> 발간</c:when>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '1' }"> 발간예정</c:when>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '2' }"> 초 발간예정</c:when>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '3' }"> 중순 발간예정</c:when>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '4' }"> 말 발간예정</c:when>
	                            	<c:when test="${bookDetail.ibmPublishSep eq '5' }"> 발간예정</c:when>
	                            </c:choose>

                            </td>
                        </tr>
                    </table>
                </div>
            </div>



            <div class="cont-line">
                <h5>개요</h5>
                <div class="textline">
                	<c:out value="${bookDetail.ibmContent}" escapeXml="false"/>
                </div>
            </div>

        </div>
    </div>
	   	<div class="sticky-bottom">
    		<c:choose>
	    		<c:when test="${bookDetail.ibmPublishSep eq '9' }">
			        <button class="btn-sticky" disabled="disabled"  type="button">구매하기</button>
		   		</c:when>
		   		<c:otherwise>
		   			<button class="btn-sticky" type="button">구매하기</button>
		   		</c:otherwise>
    		</c:choose>
	    </div>
</section>
