<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/memberEvent/memberEvent.js"></script>
<script>
$(document).ready(function(){
	memberEvent.regInit();
// 	memberEvent.init();
});


function fncLocation(){
	window.close();
}
</script>

<form id="boardForm" name="boardForm" enctype="multipart/form-data" onsubmit="return false;">
	<input type="hidden" name="boardId" id="boardId" value="mstate">

	<section class="head-sub">
	     <button class="btn-back" type="button" onclick="fncLocation();">
	         <span>이전</span>
	     </button>
	     <h3>등록</h3>
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
                     <label class="label essen" for="regUserName">작성자</label>
                     <input type="text" id="regUserName" name="regUserName" disabled="disabled" placeholder="입력하세요." value="${loginVO.name }"/>
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="regUserAgency">소속</label>
                     <input type="text" id="regUserAgency" name="regUserAgency" disabled="disabled" placeholder="입력하세요." />
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="extStr0">이메일</label>
                     <input type="text" id="extStr0" name="extStr0" placeholder="이메일을 입력해주세요." />
                 </div>

                 <div class="inp-box">
                     <label class="label essen" for="relation">고인관계</label>
                     <input type="text" id="relation" name="relation" placeholder="예) 부친,모친,빙부,빙모,본인" />
                 </div>


<!--                  <div class="inp-box"> -->
<!--                      <label class="label" for="slt01">고인관계</label> -->

<!--                      1. select class="select" : 옵션값이 선택되었을 때 select 클래스 추가 -->
<!--                      2. select class="readonly" : readonly 일경우 readonly 클래스 추가 -->
<!--                      <select class="" id="slt01" name="name"> -->
<!--                          <option value="">선택</option> -->
<!--                          <option value="">부친</option> -->
<!--                          <option value="">모친</option> -->
<!--                          <option value="">빙부</option> -->
<!--                          <option value="">빙모</option> -->
<!--                          <option value="">본인</option> -->
<!--                      </select> -->
<!--                  </div> -->

                 <div class="inp-box">
                     <label class="label essen" for="deaDate">작고일</label>
                     <input type="date" id="deaDate" name="deaDate" data-placeholder="날짜를 선택하세요." required />
                 </div>
                 <div class="inp-box">
                     <label class="label essen" for="mortuary">빈소</label>
                     <input type="text" id="mortuary" name="mortuary" placeholder="예) 서울대병원 장례식장 3호실" />
                 </div>

                 <!-- 인풋 disabled -->
<!--                  <div class="inp-box"> -->
<!--                      <label class="label essen" for="input">인풋 disabled</label> -->
<!--                      <input type="text" id="input" disabled name="input" placeholder="입력하세요." /> -->
<!--                  </div> -->

                 <!-- 전화번호 -->
                 <div class="inp-box">
                     <label class="label essen" for="etc">문의전화</label>
                     <div class="phone">
                         <input type="text" id="phoneNumber1" name="phoneNumber1" maxlength="3" placeholder="010" />
                         <input type="text" id="phoneNumber2" name="phoneNumber2" maxlength="4" />
                         <input type="text" id="phoneNumber3" name="phoneNumber3" maxlength="4" />
                     </div>
                 </div>

                 <!-- 달력 -->
                 <div class="inp-box">
                     <label class="label essen" for="burialDt">발인일</label>
                     <input type="date" id="burialDt" name="burialDt" data-placeholder="날짜를 선택하세요." required />
                 </div>

               	<div class="inp-box">
                     <label class="label" for="remark">비고</label>
                     <input type="text" id="remark" name="remark" placeholder="입력하세요." />
                 </div>


                 <!-- 파일첨부 -->
                 <div class="inp-box">
                     <div class="label">파일첨부</div>
                     <input type="file" id="file" name="file" />
                     <label for="file">파일을 등록해 주세요</label>
                 </div>


<!--                  <div class="b-area"> -->
<!--                      <button type="button" class="btn-round-sm">등록</button> -->
<!--                  </div> -->


                 <!-- 드롭박스 -->
                 <!-- <div class="inp-box">
                     <label class="label essen">기관명</label>

                     <div class="select-box value">
                         <button type="button" class="btn-select" disabled><span>선택</span></button>
                         <div class="option-list">
                             <ul>
                                 <li><button type="button">2022</button></li>
                                 <li><button class="active" type="button">선택된값</button></li>
                                 <li><button type="button">2020</button></li>
                                 <li><button type="button">2019</button></li>
                             </ul>
                         </div>
                     </div>
                 </div> -->
             </fieldset>
	     </div>
	     <div class="sticky-bottom">
			<button class="btn-sticky" onclick="memberEvent.insertValicationCheck();" type="button">등록</button>
		 </div>
	 </section>
</form>