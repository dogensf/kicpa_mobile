<%--
  Class Name : selectDuesResult.jsp
  Description : 회비관리_납부결과조회
  Modification Information
 
        수정일             수정자                   수정내용
    -------    --------    ---------------------------     
    2021.11.01   KIK          최초 생성
    
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ImgUrl" value="/images/"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회비관리_납부결과조회</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="<c:url value="/css/mobile/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/mobile/kicpa.css"/>" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<script>
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

   
    
    function fn_select_List(m) {    	
    	
   	    
   	 var d = new Date();     
   	 var month = '' + (d.getMonth() + 1); 
   	 var day = '' + d.getDate(); 
   	 var year = d.getFullYear();
     
     if (month.length < 2) month = '0' + month; 
     if (day.length < 2) day = '0' + day;
     prettyDate = [year, month, day].join('-');
     
     $("#datepicker2").val(prettyDate);
   	 var nD = new Date();
   	 var mD = nD.getTime() - ((m*30) * 24 * 60 * 60 * 1000);
   	 
   	 nD.setTime(mD);
   	 month = '' + (nD.getMonth() + 1); 
  	 day = '' + nD.getDate(); 
  	 year = nD.getFullYear();
    
    if (month.length < 2) month = '0' + month; 
    if (day.length < 2) day = '0' + day;
    prettyDate = [year, month, day].join('-');
   	$("#datepicker1").val(prettyDate);
    	
    	
    	var myDate = new Date();
   	    var month = (("00"+myDate.getMonth() + 1).slice(-2));
   	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + (("00"+myDate.getDate() + 1).slice(-2))  ;
   	    
   	    
   	    
        document.frm.pageIndex.value = 1;
        document.frm.month.value = m;
        document.frm.action = "<c:url value='/bridge/kicpa/duespaymentresult.do'/>";
        document.frm.submit();  
    }
</script>
</head>
<body>

<div class="wrap">
   <div class="membership-fee">
     <div class="membership-fee-menu">
       <ul>
          <li><a href="<c:url value='/bridge/kicpa/duespayments.do'/>">회비 조회 / 납부</a></li>
          <li><a href="<c:url value='/bridge/kicpa/duespaymentresult.do'/>" class="active">납부결과 조회</a></li>       
       </ul>
     </div>

     <div class="membership-fee-title">
       납부결과 조회
     </div>

      <div class="search-form">
       <!-- <div class="form-inner">
         <strong class="title">납기기준월</strong>
         <div class="field">
             <span class="compact-input cal"><input type="text" placeholder="YYYY-MM"><button type="button">calendar</button></span>
         </div>
       </div> -->
     </div>

     <div class="search-form-month">
     	<form name="frm" action ="<c:url value='/kicpa/dues/selectDuesResult.do'/>" method="post">
			<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
			<input type="hidden" name="month" value="1"/>
			<input type="hidden" name="searchBgnDe" value="${searchVO.searchBgnDe}" id="datepicker1" />
			<input type="hidden" name="searchEndDe" value="${searchVO.searchEndDe}" id="datepicker2" />
        </form>
        <button type="button" <c:if test="${searchVO.month eq 1}">class="active"</c:if> onclick="javascript:fn_select_List(1);">1개월</button>
       <button type="button" <c:if test="${searchVO.month eq 3}">class="active"</c:if> onclick="javascript:fn_select_List(3);">3개월</button>
       <button type="button" <c:if test="${searchVO.month eq 6}">class="active"</c:if> onclick="javascript:fn_select_List(6);">6개월</button>
       <button type="button" <c:if test="${searchVO.month eq 12}">class="active"</c:if> onclick="javascript:fn_select_List(12);">12개월</button>
     </div>

     <div class="membership-fee-result-title">
       <!-- <div class="result-number">결과 <strong>1건</strong></div> -->
       <!-- <button type="button" class="round-button default">회비고지서 확인</button> -->
     </div>

     <div class="membership-fee-result-table">
     	<c:forEach var="drt" items="${list}" varStatus="status">	 
	       <table>
	          <colgroup>
	            <col />
	          </colgroup>
	          <thead>
	            <tr>
	              <th>
	                <div class="title-td">
	                  <strong class="title"><c:out value='${drt.rqest_nm}'/></strong>
	                  <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
	                  <span class="price"><c:out value='${d_amt}'/> 원</span>
	                </div>
	              </th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td class="in-table">
	                <table>
	                  <colgroup>
	                    <col style="width: 50%;" />
	                    <col style="width: 50%;" />
	                  </colgroup>
	                  <tbody>
	                    <tr>
	                      <th>납부번호</th>
	                      <td><c:out value='${drt.epay_no}'/></td>
	                    </tr>
	                    <tr>
	                      <th>납부일</th>
	                      <%-- <fmt:parseDate value="${drt.pay_de}" var="Ddudt" pattern="yyyyMMdd"/>									
	                      <td><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></td> --%>
	                      <td>${drt.pay_de}</td>
	                    </tr>
	                    <tr>
	                      <th>납부방법</th>
	                      <td>전자납부</td>
	                    </tr>
	                  </tbody>
	                </table>
	              </td>
	            </tr>
	          </tbody>
	          <tfoot>
	            <!-- <tr>
	              <td>
	                <button type="button" class="text-button">영수증 보기</button>
	              </td>
	            </tr> -->
	          </tfoot>
	        </table>
	    </c:forEach>    
	    <c:if test="${empty list }">
			<table>
		          <colgroup>
		            <col />
		          </colgroup>
		          <thead>
		            <tr>
		              <th> 
		              	<div class="title-td"> 
		              		납부 결과 0 건.       
		              	</div>	  
		              </th>
		            </tr>
		          </thead>
		          <tbody>		            
		          </tbody>
		        </table>
		</c:if>
     </div>

     
   </div>

   <div class="footer">
     <strong>KICPA 한국공인회계사회</strong>
     <p>
       (03736) 서울특별시 서대문구 충정로7길 12 (충정로 2가)<br/>
       사업자등록번호 102-82-02601
     </p>
   </div>
 </div>

</body>
</html>