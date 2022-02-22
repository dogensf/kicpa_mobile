<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script>
$(document).ready(function(){
	board.detailInit();
});

function fncLocation(){
	window.close();
}
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="boardId" value="${param.boardId }">
	<input type="hidden" name="bltnNo" value="${param.bltnNo }">
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
            <h4><c:out value="${boardDetail.bltnSubj}"/> </h4>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">부서정보</button>
                <div class="cont">
                    <table class="table-row">
<%--                         <caption>구인정보</caption> --%>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <c:if test="${boardMaster.funcYns8 eq 'Y'}">
	                        <tr>
	                            <th>카테고리</th>
	                            <td><c:out value="${boardDetail.cateNm }"/></td>
	                        </tr>
                        </c:if>
                        <c:if test="${boardMaster.extTitle1 eq null}">
                        	<tr>
	                            <th>작성자</th>
	                            <td>
	                            	<c:if test="${boardMaster.funcYns6 eq 'N'}">
										<c:choose>
											<c:when test="${boardDetail.bltnTopTag ne 'N' }">
												관리자
											</c:when>
											<c:otherwise>
												${boardDetail.userNick }
											</c:otherwise>
										</c:choose>
	                            	</c:if>
	                            </td>
	                        </tr>

                        </c:if>

                        <c:if test="${boardMaster.funcYns9 eq 'Y'}">
	                        <c:if test="${boardMaster.extTitle1 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle1}"/></th>
		                            <td><c:out value="${boardDetail.extStr1 }"/></td>
		                        </tr>
	                        </c:if>
	                        <c:if test="${boardMaster.extTitle0 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle0}"/></th>
		                            <td><c:out value="${boardDetail.extStr0 }"/></td>
		                        </tr>
	                        </c:if>
	                        <c:if test="${boardMaster.extTitle2 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle2}"/></th>
		                            <td><c:out value="${boardDetail.extStr2 }"/></td>
		                        </tr>
	                        </c:if>
                        </c:if>

                        <tr>
                            <th>등록일</th>
                            <td><c:out value="${boardDetail.regDatim }"/></td>
                        </tr>
                        <tr>
                            <th>조회수</th>
                            <td><c:out value="${boardDetail.bltnReadCnt }"/></td>
                        </tr>
						<!-- 확장필드 -->
					 	<c:if test="${boardMaster.funcYns8 eq 'Y'}">
						 	<c:if test="${boardMaster.extTitle3 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle3}"/></th>
		                            <td><c:out value="${boardDetail.extStr3 }"/></td>
		                        </tr>
	                        </c:if>
						 	<c:if test="${boardMaster.extTitle4 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle4}"/></th>
		                            <td><c:out value="${boardDetail.extStr4 }"/></td>
		                        </tr>
	                        </c:if>
						 	<c:if test="${boardMaster.extTitle5 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle5}"/></th>
		                            <td><c:out value="${boardDetail.extStr5 }"/></td>
		                        </tr>
	                        </c:if>
						 	<c:if test="${boardMaster.extTitle6 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle6}"/></th>
		                            <td><c:out value="${boardDetail.extStr6 }"/></td>
		                        </tr>
	                        </c:if>
						 	<c:if test="${boardMaster.extTitle7 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle7}"/></th>
		                            <td><c:out value="${boardDetail.extStr7 }"/></td>
		                        </tr>
	                        </c:if>
						 	<c:if test="${boardMaster.extTitle8 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle8}"/></th>
		                            <td><c:out value="${boardDetail.extStr8 }"/></td>
		                        </tr>
	                        </c:if>
						 	<c:if test="${boardMaster.extTitle9 ne null}">
		                        <tr>
		                            <th><c:out value="${boardMaster.extTitle9}"/></th>
		                            <td><c:out value="${boardDetail.extStr9 }"/></td>
		                        </tr>
	                        </c:if>
					 	</c:if>
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
				                        <p class="file-name">${item.fileNm}</p>
				                        <button class="btn-round-sm" type="button">내려받기</button>
				                    </div>
		                		</c:forEach>

		<!--                     <div class="file-box"> -->
		<!--                         <p class="file-name">이력서이력서이력서이력서.doc</p> -->
		<!--                         <button class="btn-round-sm" type="button">내려받기</button> -->
		<!--                     </div> -->

		<!--                     첨부파일 여러개일 경우 예 -->
		<!--                     <div class="file-box"> -->
		<!--                         <p class="file-name">첨부파일 여러개일 경우 예.doc</p> -->
		<!--                         <button class="btn-round-sm" type="button">내려받기</button> -->
		<!--                     </div> -->
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
					${boardDetail.bltnCntt}
                </div>
            </div>

        </div>
    </div>
</section>
