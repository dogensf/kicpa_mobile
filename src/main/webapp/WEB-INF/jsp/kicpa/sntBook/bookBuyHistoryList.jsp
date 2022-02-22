<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){

});
</script>

<section class="head-sub">
  	<button class="btn-back" type="button">
        <span>이전</span>
    </button>
    <h3>장바구니/구매</h3>
</section>
<section class="content">
	<div class="tab-main">
           <a class="tab-link" href="/kicpa/sntBook/cartList.do">
               <span>장바구니</span>
           </a>
           <a class="tab-link active" href="javascript:void(0);">
               <span>구매내역</span>
           </a>
       </div>
    <div id="tabMain1" class="tab-main-content show">
       <div class="board-top">
           <div class="total-num">
               <span>결과</span>
               <span class="find" id="totalCnt">${fn:length(buyHistoryList)}건</span>
           </div>
       </div>

		<div class="board-list">
        	<ul>
        		<c:if test="${buyHistoryList ne null and fn:length(buyHistoryList) > 0 }">
        			<c:forEach items="${buyHistoryList}" var="item" varStatus="index">
						<li>
							<a href="/kicpa/sntBook/bookBuyHistoryDetail.do?ordNo=${item.ordNo}" target="_blank">
						 		<div class="title-zone">
						 			<p><c:out value="${item.bookName }"/> </p>

									<c:choose>
							 			<c:when test="${item.canDate ne null and item.canDate ne '' }">
								 	      	<div class="other">
								 	        	<span class="state">취소</span>
								 	        </div>
							 	        </c:when>
							 			<c:when test="${item.payCode eq '1' }">
								 	      	<div class="other">
								 	        	<span class="state">신용카드</span>
								 	        </div>
							 	        </c:when>
							 	        <c:otherwise>
								 	      	<div class="other">
								 	        	<span class="state">이체</span>
								 	        </div>
							 	        </c:otherwise>
									</c:choose>
						 	    </div>
						     	<div class="info-zone">
						            <span><c:out value="${item.ordDate }"/></span>
						        </div>
					        </a>
						</li>
        			</c:forEach>
				</c:if>
       	   </ul>
      	</div>
    </div>

</section>
