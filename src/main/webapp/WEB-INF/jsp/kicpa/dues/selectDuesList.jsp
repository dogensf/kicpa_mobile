<%--
  Class Name : MOBILE selectDuesList.jsp
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
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<c:set var="ImgUrl" value="/images/"/>

    <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
    <script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
    <%-- <script src="<c:url value='/js/html2canvas.js'/>"></script>
	<script src="<c:url value='/js/html2canvas.min.js'/>"></script> --%>
    <style>
        .TABLE{border-collapse:collapse;}
        .TABLE thead{float:left; width:588px;}
        .TABLE tbody{overflow-y:auto; overflow-x:hidden; float:left; width:588px; height:<c:choose><c:when test="${fn:length(detail) eq 0}">302</c:when><c:when test="${fn:length(detail) eq 1}">302</c:when><c:otherwise>${fn:length(detail) * 151}</c:otherwise></c:choose>px;}
        .TABLE tbody tr{display:table; }
        .TABLE td{width:588px}
    </style>
    <script type="text/javascript">
        <c:if test="${!empty errMsg}">
        alert('${errMsg}');
        </c:if>
        
        
        var win=null;
        function printIt(printThis)  {
          win = window.open();
          self.focus();
          win.document.open();
          win.document.write('<'+'html'+'><'+'head'+'><'+'style'+'>');
          win.document.write('body, td { font-family: Verdana; font-size: 10pt;height:100%;}');
          win.document.write('<'+'/'+'style'+'><'+'/'+'head'+'><'+'body'+'>');
          win.document.write('<link rel="stylesheet" type="text/css" href="../../css/base.css" />');  
          win.document.write(printThis);
          win.document.write('<'+'/'+'body'+'><'+'/'+'html'+'>');
          win.document.close();
          win.print();
          win.close();
          
          
        }


        //이미지(png)로 다운로드
        function downImg(){
        	$("#printArea").css("height","200%");        	
        	$('.wide').css("height","100%");
        	
            html2canvas($("#printArea")[0]).then(function(canvas){
                var myImage = canvas.toDataURL();
                downloadURI(myImage, "고지서.png") 
            });
        }

        function downloadURI(uri, name){
            var link = document.createElement("a")
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            $('.wide').css("height","700px");
            $("#printArea").css("height","460px");
        }
        
        

        $(document).ready(function(e) {
            $('#appLoadingIndicator2', parent.document).hide();

            $("#searchYYYY").change(function(){
                fn_select_duesList();
            });

            $(".postChk").change(function(){

                var sendData;
                if($(this).is(":checked")){
                    sendData= {"giro_cd":$(this).val(),
                        "post_send_yn" : "Y"
                    }

                }else{
                    sendData= {"giro_cd":$(this).val(),
                        "post_send_yn" : "N"
                    }

                }

               /*  $.ajax({
                    url: "<c:url value='/kicpa/dues/updatePostSendYn.do'/>",
                    type: 'get',
                    data: sendData,
                    dataType: 'json',
                    async: false,
                    timeout: 10000,
                    beforeSend: function() {
                    },
                    complete: function() {

                    },
                    success: function(result) {

                    },
                    error: function(xhr, status, error) {

                    },
                    fail: function() {

                    }
                });
 */

               // $("#resultTbody").caa("height",140*1);

            });


            $("#aa").click(function(){
                alert($(this).val());
                /* if (confirm('지로를 우편으로 수령 하시겠습니까?')) {
                    var url;
                     if($('#ref_id').val()==''){
                        url = "<c:url value='/kicpa/dues/inserDuesRef.do'/>";
            }else{
            	url = "<c:url value='/kicpa/dues/updateDuesRef.do'/>";
            }
            var form = $('#refReg')[0];
        	var form = new FormData(form);



        } */
            });

            $('.dudtInAmtCk').click(function(){
                //장기체납자 연회비,직무회비 일 경우
                if($(this).attr('reqcd') == '35230080'){
                    if($(this).is(':checked')){
                        alert('장기체납자 연회비,직무회비 일 경우 단건으로 결제가 가능합니다.');
                        $('.dudtInAmtCk').each(function(){
                            if($(this).attr('reqcd') != '35230080'){
                                $(this).prop('checked',false);
                                $(this).attr("disabled", true);
                            }
                        });
                    }else{
                        $('.dudtInAmtCk').each(function(){
                            if($(this).attr('reqcd') != '35230080'){
                                $(this).prop('checked',false);
                                $(this).attr("disabled", false);
                            }
                        });
                    }

                }

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
                if(sumDudtamt != '0' ){
                	$('#paymentBtn').css("background","#EB640F");
                	$('#paymentBtn').css("color","#fff");
                }else{
                	$('#paymentBtn').css("background","#fff");
                	$('#paymentBtn').css("color","#EB640F");
                }
                $('#paymentBtn').html(sumDudtamt +' 원 결제');

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





        function giroReport(){
            $('.kicpa-modal').show();
        }
    	function fncLocation(){
    		//location.href='<c:url value='/kicpa/main/main.do'/>';
    		$('#appExit').addClass("show");
    	}
    </script>
</head>
<body>
    <div class="wrap">
      <div class="container">
        <section class="head-main">
          <h1>회비납부/조회</h1>
          <%
	        LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
	        if(loginVO == null){
	        %>
	        <button class="btn-login" onclick="location.href='<c:url value='/uat/uia/LoginUsr.do'/>';" type="button">
	     	 로그인
	    	</button>
		  	<%
	        }else{
		  	%>
		  	<button class="btn-login" onclick="location.href='<c:url value='/uat/uia/actionLogout.do'/>';" type="button">
	     	 로그아웃
	    	</button>
		  	<%
		  	}
	        %>
          <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
        </section>

          <section class="content">
              <form name="frm" action ="<c:url value='/kicpa/dues/selectDuesList.do'/>" method="post">
		            <input type="hidden" name="giro_cd" id="giroCd">
		            <input type="hidden" name="dudt_in_amt_" id="dudtInAmt_">
		            <input type="hidden" name="dudt_in_amt" id="dudtInAmt" value="0">
		            <input type="hidden" name="epay_no" id="epayNo" value="${detail[0].epay_no}">
		            <input type="hidden" name="cust_inqr_no" id="custInqrNo" value="${detail[0].cust_inqr_no}">
		            <input type="hidden" name="cstmr_flag" id="cstmr_flag" value="${detail[0].cstmr_flag}">
		            <input type="hidden" name="cstmr_cd" id="cstmrCd" value="${detail[0].cstmr_cd}">
		            <input type="hidden" name="cstmr_nm" id="cstmrNm" value="${detail[0].cstmr_nm}">
		       </form>
              <div class="tab-main">
                  <a class="tab-link active" href="<c:url value='/kicpa/dues/selectDuesList.do'/>">
                      <span>회비납부/조회</span>
                  </a>
                  <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesList.do?path=result'/>">
                  <%-- <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesResult.do'/>"> --%>
                      <span>납부결과 조회</span>
                  </a>
                  <!-- <a class="tab-link" href="#tabMain2">
                      <span>환급신청 및 조회</span>
                  </a> -->
              </div>

              <div id="tabMain1" class="tab-main-content show">
                <div class="blue-box">
                  <ul class="guest-private">
                    <li>
                      <b>회원명</b>
                      <span>${searchVO.name}</span>
                    </li>
                    <li>
                      <b>전자납부번호</b>
	                      <span>
	                      	${fn:substring(detail[0].epay_no,0,1)}
		                    ${fn:substring(detail[0].epay_no,1,2)}
		                    ${fn:substring(detail[0].epay_no,2,3)}
		                    ${fn:substring(detail[0].epay_no,3,4)}
		                    -
		                    ${fn:substring(detail[0].epay_no,4,5)}
		                    ${fn:substring(detail[0].epay_no,5,6)}
		                    ${fn:substring(detail[0].epay_no,6,7)}
		                    ${fn:substring(detail[0].epay_no,7,8)}
		                    ${fn:substring(detail[0].epay_no,8,9)}
		                    -
		                    ${fn:substring(detail[0].epay_no,9,10)}
		                    ${fn:substring(detail[0].epay_no,10,11)}
		                    ${fn:substring(detail[0].epay_no,11,12)}
		                    ${fn:substring(detail[0].epay_no,12,13)}
		                  </span>
                    </li>
                    <li>
                      <b>지로번호</b>
                      <span>7613018</span>
                    </li>
                  </ul>
                  <p class="text-guide">
                    회비납부 방식이 금융결제원 온라인 지로 방식으로  변경되었음을 알려드립니다. 현재 화면에서 고지된  회비 목록 중 선하여 납부하거나, 인터넷 지로 또는 은행 사이트에서도 납부 할 수 있습니다.
                  </p>

                </div>

                <div class="dues-wrap">

                  <div class="dues-list">
                    <div class="title-box">
                      <h3>납부내역 조회</h3>
                      <button type="button" class="btn-full" onclick="javascript:location.href='<c:url value='/kicpa/dues/selectDuesResultPop.do'/>'">전체보기</button>
                    </div>

                    <ul>
                    <c:if test="${empty result}">
                    	<li>
                    		<span class="day">납부내역이 존재하지 않습니다.</span>
                    	</li>
                    </c:if>
                    <c:forEach var="rt" items="${result}" varStatus="status" end="2">
                    	<li>
	                        <span class="day">${rt.pay_de}</span>
	                        <div>
	                          <span class="ctg-name"><c:out value='${fn:replace(rt.rqest_nm,"지로","")}'/></span>
	                           <fmt:formatNumber type="number" maxFractionDigits="3" value="${rt.dudt_in_amt}" var="d_amt_" />	                                    
	                          <span class="price"><c:out value='${d_amt_}'/> 원</span>
	                        </div>
	                      </li>	                    
	                </c:forEach>
                    </ul>
                  </div>

                  <div class="board-list">
                    <div class="title-box">
                      <h3>미납회비 조회</h3>
                    </div>

                    <ul class="between-list line">
                    	<c:if test="${empty detail}">
	                    	<li>
	                    		<div class="detail">
	                            <p class="total">
	                              <b>&nbsp;&nbsp;미납회비가 없습니다.</b>
	                            </p>
	                            </div>
	                    		
	                    	</li>
	                    </c:if>
                    	<c:forEach var="drt" items="${detail}" varStatus="status">
	                        <li>
	                          <div class="inp-check">
	                            <input type="checkbox"  id="du${status.count}" value="${drt.giro_cd}" amt="${drt.dudt_in_amt}" reqcd="${drt.rqest_cd }" class="dudtInAmtCk"/>
	                            <label for="du${status.count}"><c:out value='${fn:replace(drt.rqest_nm,"지로","")}'/></label>
	                          </div>
	
	                          <div class="detail">
	                            <p class="total">
	                              <b>고지금액</b>
	                              	<fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />                                    
	                              <span><c:out value='${d_amt}'/></span>
	                            </p>
	                            <p>
	                              <b>전자납부번호</b>
	                              <span>${fn:substring(detail[0].epay_no,0,1)}
                                            ${fn:substring(detail[0].epay_no,1,2)}
                                            ${fn:substring(detail[0].epay_no,2,3)}
                                            ${fn:substring(detail[0].epay_no,3,4)}
                                        -
                                            ${fn:substring(detail[0].epay_no,4,5)}
                                            ${fn:substring(detail[0].epay_no,5,6)}
                                            ${fn:substring(detail[0].epay_no,6,7)}
                                            ${fn:substring(detail[0].epay_no,7,8)}
                                            ${fn:substring(detail[0].epay_no,8,9)}
                                        -
                                            ${fn:substring(detail[0].epay_no,9,10)}
                                            ${fn:substring(detail[0].epay_no,10,11)}
                                            ${fn:substring(detail[0].epay_no,11,12)}
                                            ${fn:substring(detail[0].epay_no,12,13)}</span>
	                            </p>
	                            <p>
	                              <b>납입기일</b>
	                              <fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>
	                              <span><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></span>
	                            </p>
	                          </div>
	                        </li>
                        </c:forEach>
                        
                    </ul>
                  </div>

                  <div class="btn-bottom">
                    <button class="btn-primary" id="paymentBtn" type="button" <c:if test="${empty detail}">disabled</c:if>>0 원 결제</button>
                  </div>
				</div>
                </div>
              <!-- //탭1 -->
          </section>

      </div>
    </div>
  </body>

</body>
</html>