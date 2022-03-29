<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<% pageContext.setAttribute("newLineChar", "\n"); %>
<script src="/js/kicpa/job/job.js"></script>
<script>
$(document).ready(function(){
	job.detailInit();
});

function fncLocation(){
	window.close();
}
</script>
<form id="boardForm" name="boardForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">
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
            <h4><c:out value="${boardDetail.ijWtitle}"/></h4>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">구인정보</button>
                <div class="cont">
                    <table class="table-row">
                        <caption>구인정보</caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>등록일</th>
                            <td><c:out value="${boardDetail.ijWdate }"/></td>
                        </tr>
                        <tr>
                            <th>회사구분</th>
                            <td><c:out value="${boardDetail.ijCoSep }"/></td>
                        </tr>
                        <tr>
                            <th>회사명</th>
                            <td><c:out value="${boardDetail.ijCoName }"/></td>
                        </tr>
                        <tr>
                            <th>담당자</th>
                            <td><c:out value="${boardDetail.ijDamdang }"/></td>
                        </tr>
                        <tr>
                            <th>직위</th>
                            <td><c:out value="${boardDetail.ijDepart }"/></td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td><c:out value="${boardDetail.ijTel }"/></td>
                        </tr>
                        <tr>
                            <th>팩스</th>
                            <td><c:out value="${boardDetail.ijFax }"/></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><c:out value="${boardDetail.ijEmail }"/></td>
                        </tr>
                        <tr>
                            <th>홈페이지</th>
                            <td><c:out value="${boardDetail.ijHomep }"/></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="togl-box">
                <button class="btn-board-togl active" type="button">채용조건</button>

                <div class="cont">
                    <table class="table-row">
                        <caption>채용조건</caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <tr>
                            <th>채용인원</th>
                            <td><c:out value="${boardDetail.ijEmploy}"/></td>
                        </tr>
                        <tr>
                            <th>고용형태</th>
                            <td><c:out value="${boardDetail.ijEmpSep}"/></td>
                        </tr>
                        <tr>
                            <th>근무지역</th>
                            <td><c:out value="${boardDetail.sidoArea}"/> <c:out value="${boardDetail.gugunArea}"/></td>
                        </tr>
                        <tr>
                            <th>경력</th>
                            <td><c:out value="${boardDetail.ijCareer}"/></td>
                        </tr>
                        <tr>
                            <th>급여조건</th>
                            <td><c:out value="${boardDetail.ijCoSep}"/></td>
                        </tr>
                        <tr>
                            <th>학력</th>
                            <td><c:out value="${boardDetail.ijLastschool}"/></td>
                        </tr>
                        <tr>
                            <th>마감일</th>
                            <td><c:out value="${boardDetail.ijJobTerm}"/></td>
                        </tr>
                        <tr>
                            <th>AT자격증우대</th>
                            <td><c:out value="${boardDetail.ijAt}"/></td>
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
					<c:out value="${fn:replace(boardDetail.ijContent, newLineChar, '<br/>')}" escapeXml="false" />
                </div>
            </div>

        </div>
    </div>
</section>
