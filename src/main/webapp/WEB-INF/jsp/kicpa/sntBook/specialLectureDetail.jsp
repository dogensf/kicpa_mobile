<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.lectureDetailInit();
});

function fncLocation(){
	location.href="/kicpa/sntBook/specialLectureList.do";
}
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	<input type="hidden" name="emaEduCode" id="emaEduCode" value="${param.eduCode }">
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
            <h4><c:out value="${detail.eduName}"/></h4>

            <div class="togl-box">
                <div class="cont">
                    <table class="table-row">
                        <caption></caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>일시</th>
                            <td><c:out value="${detail.dateStr }"/> <c:out value="${detail.timeStr }"/></td>
                        </tr>
                        <tr>
                            <th>강사</th>
                            <td><c:out value="${detail.teach }"/></td>
                        </tr>
                        <tr>
                            <th>수강료</th>
                            <td><c:out value="${detail.cost }"/>원</td>
                        </tr>
                        <tr>
                            <th>신청</th>
                            <td>
							<c:choose>
								<c:when test="${detail.attend eq '0' }"> 입금대기</c:when>
								<c:when test="${detail.attend eq '1' }"> 신청완료</c:when>
								<c:when test="${detail.cnt - detail.regCnt <= 0 }">마감</c:when>
							</c:choose>

							</td>
                        </tr>
                    </table>
                </div>
            </div>



            <div class="cont-line">
                <h5>개요</h5>
                <div class="textline">
                	<c:out value="${detail.detail}" escapeXml="false"/>
                </div>
            </div>

        </div>
    </div>
    <c:if test="${detail.cnt - detail.regCnt > 0 }">
	 	<div class="sticky-bottom">
	        <button class="btn-sticky" id="appBtn" type="button">신청하기</button>
	    </div>
    </c:if>
</section>
