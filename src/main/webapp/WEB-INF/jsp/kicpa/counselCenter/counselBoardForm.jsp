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

<form id="boardForm" name="boardForm" onsubmit="return false;">
	<input type="hidden" name="cateId" id="cateId" value="${param.cateId }">
	<section class="head-sub">
	     <button class="btn-back" type="button" onclick="fncLocation();">
	         <span>이전</span>
	     </button>
	     <h3>글쓰기</h3>
	 </section>

	 <section class="content">
	     <div class="pd-wrap">
             <fieldset>
                 <!-- 인풋 필수 -->
                 <div class="inp-box">
                     <label class="label essen" for="regUserName">성명</label>
                     <input type="text" id="regUserName" name="regUserName" disabled="disabled" placeholder="" value="${loginVO.name }" />
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="bltnSubj">제목</label>
                     <input type="text" id="bltnSubj" name="bltnSubj" placeholder="제목을 압력하세요" />
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="userEmail">이메일</label>
                     <input type="text" id="userEmail" name="userEmail" placeholder="이메일을 입력하세요." />
                 </div>


                 <!-- 전화번호 -->
                 <div class="inp-box">
                     <label class="label essen" for="etc">전화번호</label>
                     <div class="phone">
                         <input type="text" id="phoneNumber1" name="phoneNumber1" maxlength="3" placeholder="010" />
                         <input type="text" id="phoneNumber2" name="phoneNumber2" maxlength="4" />
                         <input type="text" id="phoneNumber3" name="phoneNumber3" maxlength="4" />
                     </div>
                 </div>

				 <div class="inp-box">
                 	<label class="label essen">내용</label>
	                <div class="textarea-wrap">
    	     	   		<textarea id="bltnCntt" name="bltnCntt"></textarea>
        	        </div>
				 </div>


             </fieldset>
	     </div>
	     <div class="sticky-bottom">
			<button class="btn-sticky" onclick="counselCenter.counselBoardValicationCheck();" type="button">등록</button>
		 </div>
	 </section>
</form>