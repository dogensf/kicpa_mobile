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
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="<c:url value="/css/mobile/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/mobile/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>

<script type="text/javascript">
<c:if test="${!empty errMsg}">
	alert('${errMsg}');
</c:if>

$(document).ready(function(e) {


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

        $.ajax({
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

        //sumDudtamt= sumDudtamt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        sumDudtamt= sumDudtamt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        $('#paymentBtn').html(sumDudtamt +' 원 납부');


    });


    $("#paymentBtn").click(function(){
        if($("#dudtInAmt").val() == 0){
            alert("납부할금액을 확인해 주세요.")
            return;
        }
        document.frm.action = "<c:url value='/bridge/kicpa/setBrigeDuesPayment.do'/>";
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

</script>
 <style>
        .TABLE{border-collapse:collapse;}
        .TABLE thead{float:left; width:97%;}
        .TABLE tbody{overflow-y:auto; overflow-x:hidden; float:left;  width:97%; height:150px;}
        .TABLE tbody tr{display:table; }
        .TABLE td{width:97%;}
    </style>
</head>
<body>
  <div class="wrap">
    <div class="membership-fee">
      <div class="membership-fee-menu">
        <ul>
          <li><a href="<c:url value='/bridge/kicpa/duespayments.do'/>" class="active">회비 조회 / 납부</a></li>
          <li><a href="<c:url value='/bridge/kicpa/duespaymentresult.do'/>">납부결과 조회</a></li>          
        </ul>
      </div>

      <div class="membership-fee-title">
        회비 조회 / 납부
      </div>

      <div class="membership-fee-jiro">
        <table>
          <tbody>
            <tr>
              <td colspan="2" class="outer-td">
                <table>
                  <colgroup>
                    <col style="width: 110px;" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>회원명</th>
                      <td>${searchVO.name}</td>
                    </tr>
                    <tr class="digital-number">
                        <th>전자납부번호</th>
                        <td>
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
                        </td>
                    </tr>
                    <tr>
                      <th>지로번호</th>
                      <td>7613018</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
        </table>
      </div>



		<form name="frm" action ="<c:url value='/bridge/kicpa/duespayments.do'/>" method="post">
      		<input type="hidden" name="giro_cd" id="giroCd">
      		<input type="hidden" name="dudt_in_amt_" id="dudtInAmt_">
      		<input type="hidden" name="dudt_in_amt" id="dudtInAmt" value="0">
      		<input type="hidden" name="epay_no" id="epayNo" value="${detail[0].epay_no}">
      		<input type="hidden" name="cust_inqr_no" id="custInqrNo" value="${detail[0].cust_inqr_no}">
      		<input type="hidden" name="cstmr_flag" id="cstmr_flag" value="${detail[0].cstmr_flag}">
      		<input type="hidden" name="cstmr_cd" id="cstmrCd" value="${detail[0].cstmr_cd}">
      		<input type="hidden" name="cstmr_nm" id="cstmrNm" value="${detail[0].cstmr_nm}">
        
        </form>

      <div class="membership-fee-result-title">
      	<p style="font-size:6px;">

                &nbsp;&nbsp;회비납부 방식이 금융결제원 온라인 지로 방식으로 변경되었음을 알려드립니다. 현재 화면에서 고지된 회비 목록 중 선택하여 납부하거나, </br>
                &nbsp;&nbsp;인터넷 지로 또는 은행 사이트에서도 납부 할 수 있습니다. </br>
                &nbsp;※ 지로용지로 납부하고자 하는 회원분께서는 아래에 고지된 회비별로 "오프라인 지로받기"를 선택해주시기 바랍니다.</br>
            회칙 제28조 제6항 제3호의 규정에 따라 “총회소집 공고일(개회 2주전) 현재 개인연간회비를 3년 이상 납부하지 않은 회원”은 총회 의결권이 제한됩니다.</br>

                <!-- <button type="button" onclick="javascript:$('.image-view-layer').show();">회비고지서 확인</button> -->
                <!-- <button type="button" onclick="javascript:giroReport();" style="position:absolute;right:0px;top:10px;">회비고지서 확인</button> -->
                </p>
        
      </div>
      
      <div class="membership-fee-result-table">
      	<%-- <table class="TABLE">
	          <colgroup>
	              <col style="width:97%"/>
	          </colgroup>
	          <thead >
		          <tr >
		              <th>
		                  납부내역 조회 
		              </th>
		          </tr>
	          </thead>
	          
	          <tbody id="resultTbody">
	          <c:forEach var="rt" items="${result}" varStatus="status">
	              <tr style="border-bottom:1px solid #DCDCDC; width:97%"">
	                  <td>
	                      <div class="dl-list">
	                          <dl>
	                              <dt>납입일 : ${rt.pay_de}  </dt>	
	                              <dd><c:out value='${fn:replace(rt.rqest_nm,"지로","")}'/></dd>
	                          </dl>
	                          <dl class="price">
	                              <fmt:formatNumber type="number" maxFractionDigits="3" value="${rt.dudt_in_amt}" var="d_amt_" />
	                              <dd>고지금액 : <c:out value='${d_amt_}'/>    원</dd>
	                          </dl>
	                      </div>
	                  </td>
	              </tr>
	          </c:forEach>
	          </tbody>
	      </table> --%>
	      
      	<c:forEach var="drt" items="${detail}" varStatus="status">	
	        <table>
	          <colgroup>
	            <col />
	          </colgroup>
	          <thead>
	            <tr>
	              <th>
	                <div class="title-td">
	                  <span class="check secondary"><input type="checkbox" id="du${status.count}" value="${drt.giro_cd}" amt="${drt.dudt_in_amt}" class="dudtInAmtCk" style="margin-right:5px;"/><label for="du${status.count}"><c:out value='${drt.rqest_nm}'/></label></span>
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
	                  	<tr class="point">
	                      <th>고지금액</th>
	                      <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
	                      <td style="color: #EB640F !important;"><c:out value='${d_amt}'/> 원</td>
	                    </tr>
	                    <tr>
	                      <th>전자납부번호</th>
	                      <td> ${fn:substring(detail[0].epay_no,0,1)}
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
                                  ${fn:substring(detail[0].epay_no,12,13)}</td>
	                    </tr>
	                    <tr>
	                      <th>납입기일</th>
	                      <fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>									
	                      <td><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></td>
	                    </tr>                    
	                  </tbody>
	                </table>
	              </td>
	            </tr>
	          </tbody>
	          <tfoot>
	            <tr>
	              <td>
	              </td>
	            </tr>
	          </tfoot>
	        </table>
        </c:forEach>
      </div>

      <div class="membership-fee-result-price">
        <strong>납부할금액</strong>
        <button id="paymentBtn"type="button">0 원 납부</button>
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