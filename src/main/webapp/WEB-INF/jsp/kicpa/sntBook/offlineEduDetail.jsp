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
	<input type="hidden" name="idNum" id="idNum" value="${param.idNum }">
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
            <h4><c:out value="${detail.wtitle}"/></h4>

            <div class="togl-box">
            	<button class="btn-board-togl" type="button">부서정보</button>
                <div class="cont">
                    <table class="table-row">
                        <caption></caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>교육기간</th>
                            <td><c:out value="${detail.eduTerm}"/></td>
                        </tr>
                        <tr>
                            <th>교육시간</th>
                            <td><c:out value="${detail.eduTime}"/></td>
                        </tr>
                        <tr>
                            <th>규격</th>
                            <td><c:out value="${detail.eduWh }"/></td>
                        </tr>
                        <tr>
                            <th>발간년월</th>
                            <td><c:out value="${detail.eduMny }"/>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="togl-box">
            	<button class="btn-board-togl" type="button">강사소개</button>
                <div class="cont">
                    <table class="table-row">
                        <caption></caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>강사명</th>
                            <td><c:out value="${detail.teacher}"/></td>
                        </tr>
                        <tr>
                            <th>소속</th>
                            <td><c:out value="${detail.sosok}"/></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="togl-box">
            	<c:choose>
	               	<c:when test="${detail.filename ne null and detail.filename ne ''}">

		                <button class="btn-board-togl" type="button">첨부파일</button>
		                <div class="cont">
		                    <div class="file-box">
		                        <p class="file-name">${detail.filename}</p>
		                        <button class="btn-round-sm" type="button">내려받기</button>
		                    </div>
		                </div>
	               	</c:when>
	               	<c:otherwise>
	               		<button class="btn-board-togl" disabled type="button">첨부파일</button>
	               	</c:otherwise>
            	</c:choose>
            </div>

            <div class="togl-box">
            	<button class="btn-board-togl" type="button">문의처</button>
                <div class="cont">
                    <table class="table-row">
                        <caption></caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>담당자</th>
                            <td><c:out value="${detail.damdang}"/></td>
                        </tr>
                        <c:if test="${detail.damdang eq '최원혁'}">
	                   	    <tr>
	                            <th>전화번호</th>
	                            <td>(02) 3149-0304</td>
	                        </tr>
                            <tr>
	                            <th>팩스번호</th>
	                            <td>(02) 3149-0330</td>
                        	</tr>

                        </c:if>
                        <c:if test="${detail.damdang eq '김재준'}">
						    <tr>
	                            <th>전화번호</th>
	                            <td>(02) 3149-0325</td>
	                        </tr>
                            <tr>
	                            <th>팩스번호</th>
	                            <td>(02) 3149-0320</td>
                        	</tr>

                        </c:if>
                    </table>
                </div>
            </div>



            <div class="cont-line">
                <h5>교육내용</h5>
                <div class="textline">
                	<c:out value="${detail.eduCnt}" escapeXml="false"/>
                </div>
            </div>

        </div>
   	</div>
   	<c:if test="${detail.supotEdu ne '마감' }">
	   	<div class="sticky-bottom">
	        <button class="btn-sticky" id="appBtn"  type="button">수강신청</button>
	    </div>
   	</c:if>
</section>
