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
})

function fncLocation(){
	window.close();
}
</script>
<form id="boardForm" name="boardForm">
</form>

<section class="head-sub line">
       <button class="btn-back" type="button" onclick="fncLocation();">
           <span>이전</span>
       </button>
       <h3>내용</h3>
</section>
<section class="content">
    <div class="board-detail">
        <div class="inner">
            <h4><c:out value="${ㅊ.faqSj}"/></h4>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">부서정보</button>
                <div class="cont">
                    <table class="table-row">
                        <caption>부서정보</caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>카테고리</th>
                            <td><c:out value="${result.faqCate }"/></td>
                        </tr>
                        <tr>
                            <th>해당업무</th>
                            <td><c:out value="${result.faqJob }"/></td>
                        </tr>
                        <tr>
                            <th>담당부서</th>
                            <td><c:out value="${result.faqPart }"/></td>
                        </tr>
                        <tr>
                            <th>담당자</th>
                            <td><c:out value="${result.faqManager }"/></td>
                        </tr>
                    </table>
                </div>
            </div>


<!--             <div class="togl-box"> -->
<%--             	<c:choose> --%>
<%-- 	               	<c:when test="${boardDetail.fileList ne null and fn:length(boardDetail.fileList) ne 0}"> --%>

<!-- 		                <button class="btn-board-togl active" type="button">첨부파일</button> -->
<!-- 		                <div class="cont"> -->
<%-- 		                		<c:forEach items="${boardDetail.fileList}" var="item" varStatus="index"> --%>
<!-- 				                    <div class="file-box"> -->
<%-- 				                        <p class="file-name">${item.fileNm}</p> --%>
<!-- 				                        <button class="btn-round-sm" type="button">내려받기</button> -->
<!-- 				                    </div> -->
<%-- 		                		</c:forEach> --%>

<!-- 		                </div> -->
<%-- 	               	</c:when> --%>
<%-- 	               	<c:otherwise> --%>
<!-- 	               		<button class="btn-board-togl" disabled type="button">첨부파일</button> -->
<%-- 	               	</c:otherwise> --%>
<%--             	</c:choose> --%>
<!--             </div> -->

            <div class="cont-line">
                <h5>내용</h5>
                <div class="textline">
					${result.faqCn }
                </div>
            </div>

        </div>
    </div>
</section>
