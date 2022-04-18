<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/qna/qna.js"></script>
<script>
$(document).ready(function(){
	qna.initForm();
});


function fncLocation(){
	window.close();
}
</script>

<form id="boardForm" name="boardForm" onsubmit="return false;">
	<input type="hidden" name="boardId" id="boardId" value="mstate">

	<section class="head-sub">
	     <button class="btn-back" type="button" onclick="fncLocation();">
	         <span>이전</span>
	     </button>
	     <h3>문의접수 등록하기</h3>
	 </section>

	 <section class="content">
	     <div class="pd-wrap">
             <fieldset>
                 <!-- 드롭박스 -->
                 <div class="inp-box">
                     <label class="label essen">카테고리</label>
                      <select class="" id="category" name="category">
                     	<option value="">선택하세요</option>
                     	<c:forEach items="${ccode }" var="code" varStatus="index">
	                     	<option value="${code.code }">${code.codeName }</option>
                     	</c:forEach>
                     </select>
                 </div>
                 <div class="inp-box">
                     <label class="label essen">해당업무</label>
                   	 <select class="" id="searchType2" name="job">
                     	<option value="">선택하세요</option>
                     </select>
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="qnaSj">제목</label>
                     <input type="text" id="qnaSj" name="qnaSj" placeholder="제목을 입력해주세요." />
                 </div>
				 <div class="inp-box">
				  <label class="label essen" for="qnaCn">내용</label>
	                 <div class="textarea-wrap">
	                     <textarea name="qnaCn" id="qnaCn"placeholder="최대 글자수 000"></textarea>
	                 </div>
				 </div>


             </fieldset>
	     </div>
	     <div class="sticky-bottom">
			<button class="btn-sticky" onclick="qna.validation();" type="button">등록</button>
		 </div>
	 </section>
</form>