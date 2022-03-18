<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){
	counselCenter.declarationDetailInit();
});
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="arIdNum" value="${param.arIdNum }">
	<input type="hidden" name="seqNum">
</form>

<section class="head-sub line">
       <button class="btn-back" type="button">
           <span>이전</span>
       </button>
       <h3>내용</h3>
</section>
<section class="content">
    <div class="board-detail">
        <div class="inner">
            <h4><c:out value="${boardDetail.arWtitle}"/></h4>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">신고문의</button>
                <div class="cont">
                    <table class="table-row">
<%--                         <caption>구인정보</caption> --%>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>성명</th>
                        	<td><c:out value="${boardDetail.arWname }"/></td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td><c:out value="${boardDetail.arBirthYmd }"/></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><c:out value="${boardDetail.arEmail }"/></td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td><c:out value="${boardDetail.arTel }"/></td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <c:choose>
	                            <c:when test="${boardDetail.arZip ne null and boardDetail.arZip ne '' } ">

	                            	<td>(<c:out value="${boardDetail.arZip }"/>) <c:out value="${boardDetail.arAdd1}"/> <c:out value="${boardDetail.arAdd2}"/> <c:out value="${boardDetail.arAdd3}"/></td>
	                            </c:when>
	                            <c:otherwise>
	                            	<td></td>
	                            </c:otherwise>
                            </c:choose>
                        </tr>
                        <tr>
                            <th>등록일</th>
                            <td><c:out value="${boardDetail.arRegDate }"/></td>
                        </tr>
                    </table>
                </div>
            </div>

             <div class="togl-box">
                <button class="btn-board-togl active" type="button">신고문의</button>
                <div class="cont">
                    <table class="table-row">
<%--                         <caption>구인정보</caption> --%>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>법인명(회사명)</th>
                            <td><c:out value="${boardDetail.arConame }"/></td>
                        </tr>
                        <tr>
                            <th>점포명</th>
                            <td>
	                            <c:if test="${boardDetail.arReport1 eq '1' }">
	                            	- 내부회계관리제도 위배<br/>
	                            </c:if>
	                            <c:if test="${boardDetail.arReport2 eq '1' }">
	                            	- 회계감사기준 위반<br/>
	                            </c:if>
	                            <c:if test="${boardDetail.arReport3 eq '1' }">
	                            	- 회계처리기준 위반<br/>
	                            </c:if>
	                            <c:if test="${boardDetail.arReport0 eq '1' }">
	                            	- 기타 : <c:out value="${boardDetail.arReportEtc }"/><br/>
	                            </c:if>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="togl-box">
            	<c:choose>
	               	<c:when test="${boardDetail.fileList ne null and fn:length(boardDetail.fileList) ne 0}">

		                <button class="btn-board-togl active" type="button">첨부파일</button>
		                <div class="cont">
		                		<c:forEach items="${boardDetail.fileList}" var="item" varStatus="index">
				                    <div class="file-box">
				                        <p class="file-name">${item.filename}</p>
				                        <button class="btn-round-sm" onclick="counselCenter.fileDownload('${item.seqNum}')" type="button">내려받기</button>
				                    </div>
		                		</c:forEach>
		                </div>
	               	</c:when>
	               	<c:otherwise>
	               		<button class="btn-board-togl" disabled type="button">첨부파일</button>
	               	</c:otherwise>
            	</c:choose>
            </div>

            <div class="cont-line">
                <h5>내용</h5>
                <div class="textline">
					${boardDetail.arContent}
                </div>
            </div>

        </div>
    </div>
</section>
