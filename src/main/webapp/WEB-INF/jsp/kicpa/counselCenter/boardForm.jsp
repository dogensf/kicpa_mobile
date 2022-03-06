<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){
	counselCenter.regInit();
});


function fncLocation(){
	window.close();
}

</script>

<form id="boardForm" name="boardForm" enctype="multipart/form-data" onsubmit="return false;">
	<input type="hidden" name="boardId" id="boardId" value="${param.boardId}">

	<section class="head-sub">
	     <button class="btn-back" type="button" onclick="fncLocation();">
	         <span>이전</span>
	     </button>
	     <h3>글쓰기</h3>
	 </section>

	 <section class="content">
	     <div class="pd-wrap">
             <fieldset>
                 <!-- 인풋 기본 -->
<!--                  <div class="inp-box"> -->
<!--                      <label class="label" for="input">인풋</label> -->
<!--                      <input type="text" id="input" name="input" placeholder="입력하세요." /> -->
<!--                  </div> -->

                 <!-- 인풋 필수 -->
                 <div class="inp-box">
                     <label class="label essen" for="regUserName">성명</label>
                     <input type="text" id="regUserName" name="regUserName" disabled="disabled" placeholder="" value="${loginVO.name }" />
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="bltnSubj">제목</label>
                     <input type="text" id="bltnSubj" name="bltnSubj" placeholder="제목을 압력하세요" />
                 </div>

                 <c:if test="${param.boardId eq 'sugt01' or param.boardId eq 'sugt02' or param.boardId eq 'sugt03' }">
	                 <div class="inp-box">
	                     <label class="label essen" for="extStr0">이메일</label>
	                     <input type="text" id="extStr0" name="extStr0" placeholder="이메일을 입력하세요." />
	                 </div>

	                 <div class="inp-box">
                           <div class="label essen">비공개 여부</div>
                           <div class="inp-all-check">
                               <input type="checkbox" name="bltnSecretYn" id="bltnSecretYn" value="Y">
                               <label for="bltnSecretYn">비공개적용</label>
                           </div>
                       </div>
                 </c:if>

                 <!-- 전화번호 -->

                 <c:if test="${param.boardId eq 'nonextaudit01' or param.boardId eq 'nonextaudit02' or param.boardId eq 'nonextaudit04' or param.boardId eq 'nonextaudit05' }">
	                 <div class="inp-box">
	                     <label class="label essen" for="etc">전화번호</label>
	                     <div class="phone">
	                         <input type="text" id="phoneNumber1" name="phoneNumber1" maxlength="3" placeholder="010" />
	                         <input type="text" id="phoneNumber2" name="phoneNumber2" maxlength="4" />
	                         <input type="text" id="phoneNumber3" name="phoneNumber3" maxlength="4" />
	                     </div>
	                 </div>

                 </c:if>
				 <div class="inp-box">
                 	<label class="label essen">내용</label>
	                <div class="textarea-wrap">
    	     	   		<textarea id="bltnCntt" name="bltnCntt"></textarea>
        	        </div>
				 </div>

                 <!-- 파일첨부 -->
                 <div class="inp-box">
                     <div class="label">파일첨부</div>
                     <input type="file" id="file" name="file" />
                     <label for="file">파일을 등록해 주세요</label>
                 </div>


             </fieldset>
	     </div>
	     <div class="sticky-bottom">
			<button class="btn-sticky" onclick="counselCenter.insertValicationCheck();" type="button">등록</button>
		 </div>
	 </section>
</form>