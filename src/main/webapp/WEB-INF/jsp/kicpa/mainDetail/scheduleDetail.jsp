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
                           		<option value="01" <c:if test="${nowMM eq '01' }">selected</c:if> >1월</option>
				              	<option value="02" <c:if test="${nowMM eq '02' }">selected</c:if> >2월</option>
				              	<option value="03" <c:if test="${nowMM eq '03' }">selected</c:if> >3월</option>
				              	<option value="04" <c:if test="${nowMM eq '04' }">selected</c:if> >4월</option>
				              	<option value="05" <c:if test="${nowMM eq '05' }">selected</c:if> >5월</option>
				              	<option value="06" <c:if test="${nowMM eq '06' }">selected</c:if> >6월</option>
				              	<option value="07" <c:if test="${nowMM eq '07' }">selected</c:if> >7월</option>
				              	<option value="08" <c:if test="${nowMM eq '08' }">selected</c:if> >8월</option>
				              	<option value="09" <c:if test="${nowMM eq '09' }">selected</c:if> >9월</option>
				              	<option value="10" <c:if test="${nowMM eq '10' }">selected</c:if> >10월</option>
				              	<option value="11" <c:if test="${nowMM eq '11' }">selected</c:if> >11월</option>
				              	<option value="12" <c:if test="${nowMM eq '12' }">selected</c:if> >12월</option>
                       </select>
                       <select class="sels" id="slt02" name="type">
                           <option value="">전체</option>
                           <option value="회계감사" <c:if test="${type eq '회계감사' }">selected</c:if>>회계감사</option>
                           <option value="세무" <c:if test="${type eq '세무' }">selected</c:if>>세무</option>
                           <option value="업무" <c:if test="${type eq '업무' }">selected</c:if>>업무</option>
                       </select>
                    
                   </div>
</form>   
                   <div class="board-top">
                       <div class="total-num">
                           <span>결과</span>
                           <span class="find">${fn:length(list)} 건</span>
                       </div>
                   </div>

                   <ul class="schedule-list">
                       <li <c:if test="${!empty type && type ne '회계감사' }">style="display:none"</c:if> id="li01">
                           <div class="title-box">
                               <h4>회계감사</h4>
                           </div>

                           <div class="togl-box">
                           		<c:forEach items="${list }" var="rt" varStatus="index">
                           	   		<c:if test="${rt.schTy eq '회계감사'  }">
                           	   				<button class="btn-board-togl " onClick="javascript:$(this).toggleClass('active');" type="button">${rt.dtLabel}</button>                               
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
			                                                   <td>${rt.subject}</td>
			                                                   <td>${rt.contents}</td>
			                                               </tr>
			                                           </tbody>
			                                       </table>
			                                   </div>
			                               </div>
                           	   		</c:if>
                           	   </c:forEach>
                           
                           
                               <%-- <button class="btn-board-togl active" onClick="javascript:$(this).toggleClass('active');" type="button">3. 17 (목)</button>
                               
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
                                                   <td>2월말 경산법인 감사계약 수임신고 (감사위원회 의무설치)</td>
                                                   <td>증권선물위 전자신고</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div> --%>
                               
                           </div>
                       </li>

                       <li <c:if test="${!empty type && type ne '세무' }">style="display:none"</c:if> id="li02">
                           <div class="title-box">
                               <h4>세무</h4>
                           </div>

                           <div class="togl-box">
                           	   <c:forEach items="${list }" var="rt" varStatus="index">
                           	   		<c:if test="${rt.schTy eq '세무'  }">
                           	   				<button class="btn-board-togl " onClick="javascript:$(this).toggleClass('active');" type="button">${rt.dtLabel}</button>                               
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
			                                                   <td>${rt.subject}</td>
			                                                   <td>${rt.contents}</td>
			                                               </tr>
			                                           </tbody>
			                                       </table>
			                                   </div>
			                               </div>
                           	   		</c:if>
                           	   </c:forEach>
                               
                               
                               <%-- <button class="btn-board-togl " onClick="javascript:$(this).toggleClass('active');" type="button">3. 10 (목)</button>
                               
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
                                                   <td>증권거래세 신고납부(전자등록기관, 한국예탁결제원 및 금융투자업자)</td>
                                                   <td>9월말 결산법인</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div> --%>
                               
                           </div>
                       </li>
                       <li <c:if test="${!empty type && type ne '업무' }">style="display:none"</c:if> id="li03">
                           <div class="title-box">
                               <h4>업무</h4>
                           </div>

                           <div class="togl-box">
                           		<c:forEach items="${list }" var="rt" varStatus="index">
                           	   		<c:if test="${rt.schTy eq '업무'  }">
                           	   				<button class="btn-board-togl " onClick="javascript:$(this).toggleClass('active');" type="button">${rt.dtLabel}</button>                               
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
			                                                   <td>${rt.subject}</td>
			                                                   <td>${rt.contents}</td>
			                                               </tr>
			                                           </tbody>
			                                       </table>
			                                   </div>
			                               </div>
                           	   		</c:if>
                           	   </c:forEach>
                           
                               <%-- <button class="btn-board-togl active" onClick="javascript:$(this).toggleClass('active');" type="button">3. 25 (금)</button>
                               
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
                                                   <td>등록갱신대상자 갱신신청서 제출 (공인회계사)</td>
                                                   <td>2017년 4월 중 등록(갱신)한공인회계사</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div>
                               
                               <button class="btn-board-togl "  onClick="javascript:$(this).toggleClass('active');"type="button">3. 28 (금)</button>
                               
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
                                                   <td>등록갱신대상자 갱신신청서 제출 (세무사/세무대리업무 등록자)</td>
                                                   <td>2017년 5월 중 등록(갱신)한세무사/세무대리업무 등록자</td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div> --%>
                               
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