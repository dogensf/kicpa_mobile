<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>
$(document).ready(function(){
	sntBook.cartInit();

});

function fncLocation(){
	//location.href="/kicpa/main/main.do";
	location.href="/kicpa/sntBook/sntBookCategory.do";
}

</script>
<form id="cartForm" name="cartForm" onsubmit="return false;">
	<input type="hidden" name="loginYn" id="loginYn" value="Y">
	<section class="head-sub">
	  	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>장바구니/구매</h3>
	</section>
	<section class="content">
		<div class="tab-main">
            <a class="tab-link active" href="javascript:void(0);">
                <span>장바구니</span>
            </a>
            <a class="tab-link" href="/kicpa/sntBook/bookBuyHistoryList.do">
                <span>구매내역</span>
            </a>
        </div>
	    <div id="tabMain1" class="tab-main-content show">
	        <ul class="basket-list">
	        	<c:choose>
	        		<c:when test="${cartList ne null and fn:length(cartList) > 0 }">
	        			<c:forEach items="${cartList }" var="cartItem" varStatus="index">
	        			<c:choose>
		        			<c:when test="${cartItem.ibmBookCode ne '999999'}">
					            <li class="book_div_${cartItem.bookDiv}">
					                <div class="btn-zone">
					                    <div class="inp-check">
					                        <input type="checkbox" name="ibmBookCode" id="ibmBookCode${index.index}" value="${cartItem.ibmBookCode}" />
					                        <label for="ibmBookCode${index.index }">선택</label>
					                    </div>
					                    <button class="btn-del-ico" type="button"><span>삭제</span></button>
					                </div>
					                <div class="prd-zone">
					                    <div class="product">
					                        <p class="name"><c:out value="${cartItem.ibmBookName}"/>${cartItem.ibmBookCode }</p>
					                        <span><c:out value="${cartItem.ibmPrice2}"/>원 / <i><c:out value="${cartItem.ibmPrice1}"/>원</i></span>
					                    </div>
					                    <div class="quantity-num">
					                        <button class="btn-minus-ico" type="button" ><span>빼기</span></button>
					                        <em>${cartItem.cnt}</em>
					                        <button class="btn-plus-ico" type="button"><span>더하기</span></button>
					                    </div>
					                </div>
					            </li>
				            </c:when>
				            <c:otherwise>
				            	<c:set var="deliveryPrice" value="${cartItem }" />
				            </c:otherwise>
		        			</c:choose>
		        		</c:forEach>
		        		<c:if test="${deliveryPrice ne null }">
			            	<li class="delivery-zone">
				                <div class="prd-zone">
				                    <div class="product">
				                        <p class="name"><c:out value="${deliveryPrice.ibmBookName}"/></p>
				                        <span><i><c:out value="${deliveryPrice.ibmPrice1}"/>원</i></span>
				                    </div>
				                </div>
			            	</li>
		        		</c:if>	
	        		</c:when>
	        		<c:otherwise>
	        		<li class="delivery-zone">
			                <div class="prd-zone">
			                    <div class="product">
			                        <p class="name">장바구니에 담긴 상품이 없습니다.</p>
			                    </div>
			                </div>
		            	</li>
	        		</c:otherwise>
	        	</c:choose>
	        	
	        </ul>
	    </div>
		<jsp:include page="/include/includeLoign.jsp"/>
	    <!-- 페이지 하단 버튼 -->
	    <div class="sticky-bottom">
	        <button class="btn-sticky" id="totalBtn" disabled type="button">합계금액 0원</button>
	    </div>
	</section>
</form>