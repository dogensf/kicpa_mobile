<%--
  Class Name : selectDuesList.jsp
  Description : 회비 조회
  Modification Information
 
        수정일             수정자                   수정내용
    -------    --------    ---------------------------     
    2021.11.01   KIK          최초 생성
    
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ImgUrl" value="/images/"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회비관리_회비조회납부</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script type="text/javascript">
<c:if test="${!empty errMsg}">
	alert('${errMsg}');
</c:if>

$(document).ready(function() {
	
	$('#appLoadingIndicator2', parent.document).hide();
	
	$("#searchYYYY").change(function(){
		 fn_select_duesList();
	});
	
	$('.dudtInAmtCk').click(function(){
	
		var girocd = '';
		var dudtamt ='';
		var sumDudtamt =0;
	    $('.dudtInAmtCk').each(function(){
	    	if($(this).is(':checked')){
	    		girocd  += $(this).val()+',';
	    		dudtamt += $(this).attr('amt')+',';
	    		sumDudtamt =Number(sumDudtamt) + Number($(this).attr('amt'));	    		
	    	}	    	
	    });
	    girocd = girocd.slice(0,-1);
	    dudtamt = dudtamt.slice(0,-1);
	    $('#giroCd').val(girocd);
	    $('#dudtInAmt_').val(dudtamt);
	    $('#dudtInAmt').val(sumDudtamt);
	    	sumDudtamt= sumDudtamt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	    $('#paymentBtn').html(sumDudtamt +' 원 결제');
	    e.preventDefault();
	});
	$("#paymentBtn").click(function(){
		if($("#dudtInAmt").val() == 0){
			alert("결제금액을 확인해 주세요.")
			return;
		}
		document.frm.action = "<c:url value='/kicpa/dues/setDuesPayment.do'/>";
        document.frm.submit();
		
	});
	
});	

<!--
    function press(event) {
        if (event.keyCode==13) {
            fn_select_duesList();
        }
    }

    function fn_addNotice() {
        document.frm.action = "<c:url value='/cop/bbs${prefix}/addBoardArticle.do'/>";
        document.frm.submit();
    }
    
    function fn_select_duesList() {
        document.frm.action = "<c:url value='/kicpa/dues/selectDuesList.do'/>";
        document.frm.submit();  
    }

//-->
</script>
</head>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">
        회비관리
        <div class="menu">
          <ul>
            <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>" class="active">회비 조회 / 납부</a></li>            
            <li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>">신규등록회비 납부</a></li>
            <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>">납부결과 조회</a></li>
          </ul>
        </div>
      </h1>

      <!-- <h2 class="my-page-sub-title">회비 조회 / 납부</h2> -->
		<div class="my-page-table2">
		        <table class="tb-bg">
		          <colgroup>
		            <col />
		            <col style="width: 120px;" />
		            <col style="width: 200px;" />
		            <col style="width: 80px;" />
		          </colgroup>
		          <thead>
		            <tr>
		              <th colspan="4" class="left title">회비 조회 / 납부</th>
		            </tr>
		          </thead>
		          <tbody>
		            <tr>
		              <td colspan="4"  class="content">
		                <table class="jiro-table">
		                  <colgroup>
		                    <col style="width: 110px;" />
		                    <col />
		                  </colgroup>
		                  <tbody>
		                    <tr class="digital-number">
		                      <th>전자납부번호</th>
		                      <td>${fn:substring(detail[0].epay_no,0,4)}-${fn:substring(detail[0].epay_no,4,8)}-${fn:substring(detail[0].epay_no,8,12)}</td>
		                    </tr>
		                    <tr class="user-number">
		                      <th>고객번호</th>
		                      <td>${detail[0].cust_inqr_no}</td>
		                    </tr>
		                    <tr>
		                      <td colspan="2" class="jiro-number">
		                        <strong>지로번호</strong>
		                        <ul>
		                          <li>7</li>
		                          <li>6</li>
		                          <li>1</li>
		                          <li>3</li>
		                          <li>0</li>
		                          <li>1</li>
		                          <li>8</li>		                          
		                        </ul>
		                      </td>
		                    </tr>
		                  </tbody>
		                </table>
		              </td>
		            </tr>
		          </tbody>
		        </table>
		      </div>
		
	  <div style="height: 10px;"></div>
	  
      <div class="search-form">
        <div class="form-inner">
          <form name="frm" action ="<c:url value='/kicpa/dues/selectDuesList.do'/>" method="post">
          		<input type="hidden" name="giro_cd" id="giroCd">
          		<input type="hidden" name="dudt_in_amt_" id="dudtInAmt_">
          		<input type="hidden" name="dudt_in_amt" id="dudtInAmt" value="0">
          		<input type="hidden" name="epay_no" id="epayNo" value="${detail[0].epay_no}">
          		<input type="hidden" name="cust_inqr_no" id="custInqrNo" value="${detail[0].cust_inqr_no}">
          		<input type="hidden" name="cstmr_flag" id="cstmr_flag" value="${detail[0].cstmr_flag}">
          		<input type="hidden" name="cstmr_cd" id="cstmrCd" value="${detail[0].cstmr_cd}">
          		<input type="hidden" name="cstmr_nm" id="cstmrNm" value="${detail[0].cstmr_nm}">
	          <dl>
	            <dt>납기기준월</dt>
	            <dd>
	              <span class="compact-select" style="width: 150px;">
	                <select name="searchYYYY" id="searchYYYY">
	                  <option value="">전체</option>
	                  <option value="2022"<c:if test="${searchVO.searchYYYY eq '2022' }">selected</c:if>>2022</option>
	                  <option value="2021"<c:if test="${searchVO.searchYYYY eq '2021' }">selected</c:if>>2021</option>
	                  <option value="2020"<c:if test="${searchVO.searchYYYY eq '2020' }">selected</c:if>>2020</option>
	                  <option value="2019"<c:if test="${searchVO.searchYYYY eq '2019' }">selected</c:if>>2019</option>
	                </select>
	              </span>
	            </dd>
	          </dl>
          </form>
        </div>
        
      </div>

      <div style="height: 13px;"></div>

      <div class="my-page-table2">
      	<%-- <table class="tb_bg">
          <colgroup>
            <col />
            <col style="width: 120px;" />
            <col style="width: 200px;" />
            <col style="width: 80px;" />
          </colgroup>
          <thead>
            <tr>
              <th class="left title">고지 내역</th>
              <!-- <th><button type="button" class="excel-button">EXCEL<br/>DOWNLOAD</button></th> -->
              <th></th>
              <th></th>
              <th><button type="button" class="toggle active">toggle</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4"  class="content">
                <div class="basic-table2">
                  <table>
                    <colgroup>	                      
                      <col style="width: 40px;"/>
                      <col style="width: 250px;"/> 	
                      <col />
                      <col />
                      <col />
                      <col />	                                  
                    </colgroup>
                    <thead>
                      <tr>
                      	<th></th>
                      	<th>고지구분</th>
                        <th>회계연도</th>
                        <th>고지금액</th>
                        <th>고객조회번호</th>
                        <th>납입기일</th>	                                        
                      </tr>
                    </thead>
                    <tbody>
                      <c:forEach var="drt" items="${detail}" varStatus="status">	                      	 
		                      <tr>			                      	
		                      	<td><span class="check"><input type="checkbox" id="du${status.count}" value="${drt.giro_cd}" amt="${drt.dudt_in_amt}" class="dudtInAmtCk"/><label for="du${status.count}"></label></span></td>
		                      	<td><c:out value='${drt.rqest_nm}'/></td>
		                        <td><c:out value='${fn:substring(drt.ntic_de,0,4)}'/></td>
		                        <td class="noti ">
		                        	<fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
              						<c:out value='${d_amt}'/> 원			                        	
		                        </td>
		                        <td></td>
		                        <td>
		                        	<fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/>
		                        	<c:out value='${drt.dudt}'/>
		                        </td>			                                                
		                      </tr>  
	                      
                      </c:forEach>                    
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table> --%>
	    <div class="result-title">
	    <c:choose>
	    	<c:when test="${empty detail}">
	    		<strong>결과 <span>0 회</span></strong>
	    	</c:when>
	    	<c:otherwise>
	    		<strong>결과 <span>${fn:length(detail)} 회</span></strong>	
	    	</c:otherwise>
	    </c:choose>
        
        <button type="button" onclick="javascript:$('.image-view-layer').show();">회비고지서 확인</button>
      </div>
      <div style="height: 15px;"></div>    
	        
       <c:forEach var="drt" items="${detail}" varStatus="status">	 
       	<table class="tb-bg">
          <colgroup>
            <col />
            <col style="width: 120px;" />
            <col style="width: 200px;" />
            <col style="width: 80px;" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="3" class="left title"><span class="check"><input type="checkbox" id="du${status.count}" value="${drt.giro_cd}" amt="${drt.dudt_in_amt}" class="dudtInAmtCk"/><label for="du${status.count}"><c:out value='${drt.rqest_nm}'/></label></span></th>
              <th class="right"><button type="button" class="more">더보기</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4"  class="bg-content">
                <div class="dl-list">
                  <dl class="price">
                    <dt>고지금액</dt>
                    <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
                    <dd><c:out value='${d_amt}'/> 원</dd>
                  </dl>
                  <dl>
                    <dt>고객조회번호</dt>
                    <dd><c:out value='${drt.cust_inqr_no}'/></dd>
                  </dl>
                  <dl>
                    <dt>납입기일</dt>
                    <fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>									
                    <dd><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></dd>
                  </dl>
                </div>
                <div class="offline-jiro-check">
                  <span class="line-checkbox inline"><input type="checkbox" id="oj1" /><label for="oj1">오프라인 지로받기</label></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
       
       </c:forEach>
      
      
						      	
      </div>

      <div class="result-box" style="margin-top:30px;">
        <div class="info-text">
          <strong>KICPA 한국공인회계사회</strong>
          <p>
            (03736) 서울특별시 서대문구 충정로7길 12 (충정로 2가)<br />
            사업자등록번호 102-82-02601
          </p>
        </div>
        <div class="payment">
          <span>결제금액</span>
          <button id="paymentBtn"type="button">0 원 결제</button>
        </div>
      </div>
    </div>

	<div class="image-view-layer" style="display:none">
	      <div class="inner">
	        <h1>회비고지서</h1>
	        <div class="imgs">
	          <div class="img">
	            <img src="" alt="">
	          </div>
	          <div class="img">
	            <img src="" alt="">
	          </div>
	        </div>
	        <div class="buttons">
	          <div class="button full short" style="width: 226px;">
	            <a href="" class="button">고지서 다운로드</a>
	          </div>
	          <div class="button line short" style="width: 226px;">
	            <a href="javascript:$('.image-view-layer').hide();" class="button">종료</a>
	          </div>
	        </div>
	      </div>
	    </div>


    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>