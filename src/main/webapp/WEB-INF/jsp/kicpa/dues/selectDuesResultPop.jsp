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
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<c:set var="ImgUrl" value="/images/"/>

   <%--  <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
    <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
	<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script> --%>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
	<%-- <script src="<c:url value='/js/html2canvas.js'/>"></script>
	<script src="<c:url value='/js/html2canvas.min.js'/>"></script> --%>
<script>


function fncLocation(){
		location.href="/kicpa/dues/selectDuesList.do";
}
    
   
</script>
<body>
<div class="wrap">
      <div class="container">
        <section class="head-sub">
		 	 <button class="btn-back" type="button" onclick="fncLocation();">
		        <span>이전</span>
		    </button> 
		    <h3>납부화면 조회</h3>
		</section>

          <section class="content">
             

              <div id="tabMain1" class="tab-main-content show">

                <div class="dues-wrap">
                  
  
                  <div class="board-top">
                    <div class="total-num">
                        <span>결과</span>
                        <span class="find">${fn:length(list)} 건</span>
                    </div>
                  </div>

                  <div class="board-list">
                    <ul class="between-list">   
                    <c:if test="${fn:length(list) eq 0}">
	                    <li>
	                    	<div class="title">
                            <h4>납부결과가 없습니다.</h4>
                            <b></b>
                          </div>
	                    </li>
                    </c:if>                 
                    <c:forEach var="drt" items="${list}" varStatus="status">
                        <li>
                          <div class="title">
                            <h4><c:out value='${drt.rqest_nm}'/></h4>
                            <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />	              
                            <b><c:out value='${d_amt}'/></b>
                          </div>

                          <div class="detail">
                            <p >
                              <b>납부번호</b>
                              <span><c:out value='${drt.epay_no}'/></span>
                            </p>
                            <p >
                              <b>납부일</b>
                              <span><c:out value='${drt.pay_de}'/></span>
                            </p>                            
                            <p>
                              <b>납부방법</b>
                              <span>${drt.paytype}</span>
                            </p>
                          </div>
                        </li>
                    </c:forEach>    
                    </ul>
                  </div>
                </div>
              <!-- //탭1 -->
              </div>
          </section>

      </div>
    </div>
  
  
</body>
</html>