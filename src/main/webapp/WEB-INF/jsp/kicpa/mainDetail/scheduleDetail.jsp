<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/faq/faq.js"></script>
<script>
$(document).ready(function(){
	$('.sels').change(function(){
		dtForm.submit();
	});
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
	
}

</script>

<div class="wrap">
   <div class="container">
       <section class="head-sub">
           <button class="btn-back" type="button" onclick="fncLocation();">
               <span>이전</span>
           </button>
           <h3>회계감사 · 세무 · 업무 캘린더</h3>
       </section>

       <section class="content">
           <div class="board-detail">
               <div class="todopage-wrap">
<form id="dtForm" name="dtForm" action="/kicpa/main/scheduleDetail.do">
                   <div class="inp-box multi">
                   
                       <select class="sels" id="slt01" name="month">
                           <option>전체</option>
                           <option>3월</option>
                       </select>
                       <select class="sels" id="slt02" name="type">
                           <option value="">전체</option>
                           <option value="01" <c:if test="${type eq '01' }">selected</c:if>>회계감사</option>
                           <option value="02" <c:if test="${type eq '02' }">selected</c:if>>세무</option>
                           <option value="03" <c:if test="${type eq '03' }">selected</c:if>>업무</option>
                       </select>
                    
                   </div>
</form>   
                   <div class="board-top">
                       <div class="total-num">
                           <span>결과</span>
                           <span class="find">24건</span>
                       </div>
                   </div>

                   <ul class="schedule-list">
                       <li <c:if test="${!empty type && type ne '01' }">style="display:none"</c:if> id="li01">
                           <div class="title-box">
                               <h4>회계감사</h4>
                           </div>

                           <div class="togl-box">
                               <button class="btn-board-togl active" type="button">3. 17 (목)</button>
                               
                               <div class="cont">
                                   <div>
                                       <table class="table-col blue">
                                           <colgroup>
                                               <col width="50%" />
                                               <col width="50%" />
                                           </colgroup>
                                           <thead>
                                               <tr>
                                                   <th>항목</th>
                                                   <th>비고</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td>10월말 결산법인 분기보고서 제출</td>
                                                   <td>증권선물위 전자신고</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                                   <div>
                                       <table class="table-col blue">
                                           <colgroup>
                                               <col width="50%" />
                                               <col width="50%" />
                                           </colgroup>
                                           <thead>
                                               <tr>
                                                   <th>항목</th>
                                                   <th>비고</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td>10월말 결산법인 분기보고서 제출</td>
                                                   <td>증권선물위 전자신고</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </li>

                       <li <c:if test="${!empty type && type ne '02' }">style="display:none"</c:if> id="li02">
                           <div class="title-box">
                               <h4>세무</h4>
                           </div>

                           <div class="togl-box">
                               <button class="btn-board-togl" type="button">3. 17 (목)</button>
                               
                               <div class="cont">
                                   <div>
                                       <table class="table-col blue">
                                           <colgroup>
                                               <col width="50%" />
                                               <col width="50%" />
                                           </colgroup>
                                           <thead>
                                               <tr>
                                                   <th>항목</th>
                                                   <th>비고</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td>10월말 결산법인 분기보고서 제출</td>
                                                   <td>증권선물위 전자신고</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </li>
                       <li <c:if test="${!empty type && type ne '03' }">style="display:none"</c:if> id="li03">
                           <div class="title-box">
                               <h4>업무</h4>
                           </div>

                           <div class="togl-box">
                               <button class="btn-board-togl" type="button">3. 17 (목)</button>
                               
                               <div class="cont">
                                   <div>
                                       <table class="table-col blue">
                                           <colgroup>
                                               <col width="50%" />
                                               <col width="50%" />
                                           </colgroup>
                                           <thead>
                                               <tr>
                                                   <th>항목</th>
                                                   <th>비고</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td>10월말 결산법인 분기보고서 제출</td>
                                                   <td>증권선물위 전자신고</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </li>
                   </ul>
               </div>
           </div>

       </section>
       
       <!-- 사이드 버튼 -->
       <aside class="fix-side">
           <span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
        </aside>
    </div>
</div>