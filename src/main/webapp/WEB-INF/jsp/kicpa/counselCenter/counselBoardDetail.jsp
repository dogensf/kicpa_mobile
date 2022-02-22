<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){



});
</script>
<form id="boardForm" name="boardForm" onsubmit="return false;">
	<input type="hidden" name="bltnNo" value="${param.bltnNo }">


	<section class="head-sub line">
	       <button class="btn-back" type="button">
	           <span>이전</span>
	       </button>
	       <h3>내용</h3>
	</section>
	<section class="content">
	    <div class="board-detail">
	        <div class="inner">
	            <h4><c:out value="${boardDetail.bltnSubj}"/></h4>

	            <div class="togl-box">
	                <div class="cont">
	                    <table class="table-row">
	<%--                         <caption>구인정보</caption> --%>
	                        <colgroup>
	                            <col width="40%">
	                            <col width="60%">
	                        </colgroup>
	                        <tr>
	                            <th>질문일</th>
	                        	<td><c:out value="${boardDetail.regDatim }"/></td>
	                        </tr>
	                        <tr>
	                            <th>질문자</th>
	                            <td><c:out value="${boardDetail.userNick }"/></td>
	                        </tr>
	                        <tr>
	                            <th>연락처</th>
	                            <td><c:out value="${boardDetail.userTelNo }"/></td>
	                        </tr>
	                        <tr>
	                            <th>조회수</th>
	                            <td><c:out value="${boardDetail.bltnReadCnt }"/></td>
	                        </tr>
	                    </table>
	                </div>
	            </div>

	            <div class="cont-line">
	                <h5>내용</h5>
	                <div class="textline">
						${boardDetail.bltnCntt}
	                </div>
	            </div>

	        </div>
	    </div>


	    <c:if test="${boardDetail.replyDetail ne null}">

		    <div class="board-detail">
		        <div class="inner">
	                <h5>답변</h5>
		            <div class="togl-box">
		                <div class="cont">
		                    <table class="table-row">
		<%--                         <caption>구인정보</caption> --%>
		                        <colgroup>
		                            <col width="40%">
		                            <col width="60%">
		                        </colgroup>
		                        <tr>
		                            <th>답변일</th>
		                        	<td><c:out value="${boardDetail.replyDetail.regDatim }"/></td>
		                        </tr>
		                        <tr>
		                            <th>답변자</th>
		                            <td><c:out value="${boardDetail.replyDetail.userNick }"/></td>
		                        </tr>
		                    </table>
		                </div>
		            </div>

		            <div class="cont-line">
		                <h5>내용</h5>
		                <div class="textline">
							${boardDetail.replyDetail.bltnCntt}
		                </div>
		            </div>

	                <div class="cont">
						<h5>의견달기</h5>
						<div class="textarea-wrap">
							<textarea id="memoCntt" name="memoCntt" placeholder="최대 글자수 150자" maxlength="150"></textarea>
	                   	</div>
	                   	<div class="b-area">
	                  		<button type="button" onclick="counselCenter.memoCheckValidation();" class="btn-round-sm">등록</button>
	                   	</div>
	               	</div>

	     		   	<c:if test="${boardDetail.memoList ne null and fn:length(boardDetail.memoList) >= 0 }">
		               	<div class="cont-line">
		          		   	<ul class="comment-list">
								<c:forEach items="${boardDetail.memoList }" var="memo" varStatus="index">
			            	    	<li>
			                     	   	<div class="info">
			                 	    		<b class="name"><c:out value="${memo.userNick }"/> </b>
			                      	       	<span class="day"><c:out value="${memo.regDatim }"/></span>
			                       	   	</div>
			                       	   	<p class="comment">
			                           		${memo.memoCntt}
			                           	</p>
			                       	</li>
			                    </c:forEach>
		                   	</ul>
		               	</div>
	              	</c:if>
		        </div>
		    </div>
	    </c:if>
	</section>
</form>
