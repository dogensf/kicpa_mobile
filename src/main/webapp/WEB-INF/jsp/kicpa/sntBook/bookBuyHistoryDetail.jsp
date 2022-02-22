<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.detailInit();
});

function fncLocation(){
	window.close();
}
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="ordNo" value="${param.ordNo }">
</form>

<section class="head-sub line">
       <button class="btn-back" type="button" onclick="fncLocation();">
           <span>이전</span>
       </button>
       <h3>구매내역 상세</h3>
</section>
<section class="content">
    <div class="board-detail">
        <div class="inner">

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">결제정보</button>
                <div class="cont">
                    <table class="table-row">
<%--                         <caption>구인정보</caption> --%>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
	                        <tr>
	                            <th>송금은행명</th>
	                            <td><c:out value="${detail.recBank}"/></td>
	                        </tr>
	                        <tr>
	                            <th>구매일자</th>
	                            <td><c:out value="${detail.recDate }"/></td>
	                        </tr>
	                        <tr>
	                            <th>결제금액</th>
	                            <td><c:out value="${detail.payTotalAmt }"/>원</td>
	                        </tr>
	                        <tr>
	                            <th>결제방법</th>
	                            <td><c:out value="${detail.payCodeNm }"/></td>
	                        </tr>
	                        <tr>
	                            <th>세금계산서 발행</th>
	                            <td><c:out value="${detail.billYnNm }"/></td>
	                        </tr>
                    </table>
                </div>
            </div>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">도서명·파일명</button>
                <div class="cont">
                    <table class="table-row">
<%--                         <caption>구인정보</caption> --%>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>

                        <c:forEach items="${detail.detailList}" var="item" varStatus="status" >


	                        <tr>
	                            <th>도서명·파일명</th>
	                            <!-- BOOK_DIV 6일때 파일다운로드 기능 -->
								<c:choose>
									<c:when test="${item.bookDiv eq '6' }">
			                            <td><c:out value="${item.bookName}"/> 파일다운로드기능 추가해야됨</td>
		                            </c:when>
		                            <c:otherwise>
			                            <td><c:out value="${item.bookName}"/></td>
		                            </c:otherwise>
								</c:choose>
	                        </tr>
	                        <tr>
	                            <th>수량</th>
	                            <td><c:out value="${item.bookCnt }"/></td>
	                        </tr>
	                        <tr>
	                            <th>가격</th>
	                            <td><c:out value="${item.saleAmt }"/>원</td>
	                        </tr>
                        </c:forEach>
                    </table>
                </div>
            </div>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">수령정보</button>
                <div class="cont">
                    <table class="table-row">
<%--                         <caption>구인정보</caption> --%>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
	                        <tr>
	                            <th>받는분 이름</th>
	                            <td><c:out value="${detail.rvName }"/></td>
	                        </tr>
	                        <tr>
	                            <th>회사명</th>
	                            <td><c:out value="${detail.rvCpyName }"/></td>
	                        </tr>
	                        <tr>
	                            <th>받는곳 주소</th>
	                            <td><c:out value="${detail.rvPostNo }"/> <c:out value="${detail.rvAddress }"/></td>
	                        </tr>
	                        <tr>
	                            <th>증정자(회사)</th>
	                            <td><c:out value="${detail.GAM_NM }"/></td>
	                        </tr>
	                        <tr>
	                            <th>받는곳 연락처</th>
	                            <td><c:out value="${detail.TEL_NO }"/></td>
	                        </tr>
                    </table>
                </div>
            </div>


        </div>
    </div>
</section>
