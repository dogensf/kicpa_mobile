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


                $("#resultTbody").caa("height",140*1);

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

        function giroReport(){
            $('.kicpa-modal').show();
        }
    </script>
</head>
<body>
<div class="wrap">
      <div class="container">
        <section class="head-main">
          <h1>회비관리</h1>
          <button class="btn-login" type="button">
            로그인
          </button>
          <button class="btn-menu" type="button">
            카테고리
          </button>
        </section>

          <section class="content">
              <div class="tab-main">
                  <a class="tab-link active" href="<c:url value='/kicpa/dues/selectDuesList.do'/>">
                      <span>회비조회 및 납부</span>
                  </a>
                  <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesResult.do'/>">
                      <span>납부결과 및 조회</span>
                  </a>
                  <a class="tab-link" href="#tabMain2">
                      <span>환급신청 및 조회</span>
                  </a>
              </div>

              <div id="tabMain1" class="tab-main-content show">
                <div class="blue-box">
                  <div class="guest-private">
                    <p>
                      <b>전자납부번호</b>
                      <span>1234-12345-1234</span>
                    </p>
                    <p>
                      <b>고객번호</b>
                      <span>1234567</span>
                    </p>
                  </div>

                  <div class="internal-revenue">
                    <b>전자납부번호</b>
                    <p>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                      <span>6</span>
                      <span>7</span>
                    </p>
                  </div>
                </div>

                <div class="dues-wrap">
                  <div class="inp-box">
                    <label class="label" for="input">납기기준월</label>
                    <input type="date" id="input" name="input" data-placeholder="선택하세요." required />
                  </div>
  
                  <div class="board-top">
                    <div class="total-num">
                        <span>결과</span>
                        <span class="find">24건</span>
                    </div>
                  </div>

                  <div class="board-list">
                    <ul class="between-list line">
                        <li>
                          <div class="inp-check">
                            <input type="checkbox" name="bk-item" id="ch01" />
                            <label for="ch01">연회비 및 부조회비연회비 및 부조회비</label>
                          </div>

                          <div class="detail">
                            <p class="total">
                              <b>고지금액</b>
                              <span>200,000</span>
                            </p>
                            <p>
                              <b>고객조회번호</b>
                              <span>0000711461</span>
                            </p>
                            <p>
                              <b>납입기일</b>
                              <span>2022.01.20</span>
                            </p>
                          </div>
                        </li>
                    </ul>
                  </div>

                  <div class="btn-bottom">
                    <button class="btn-primary" type="button" disabled>300,000원 결제</button>
                  </div>

                </div>
              <!-- //탭1 -->
          </section>

      </div>
    </div>

<%-- <div class="kicpa-layer-content bg2">
    <div class="mypage">
        <h1 class="my-page-title2">
            회비납부/조회
            <div class="menu">
                <ul>
                    <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>" class="active">회비 내역 조회</a></li>
                    <c:if test="${sessionScope.auth eq 'Y' }">
                        <li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>">신규등록회비 납부</a></li>
                    </c:if>
                    <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>">납부결과 조회</a></li>
                    <li><a href="<c:url value='/kicpa/dues/selectDuesRefund.do'/>">환급신청</a></li>
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
                                <col style="width: 150px;" />
                                <col />
                            </colgroup>
                            <tbody>
                            <tr class="user-number">
                                <th>고객명</th>
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
                            <tr class="digital-number">
                                <th>지로번호</th>
                                <td>7613018</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div style="height: 10px;"></div>


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

        <div style="height: 13px;"></div>

        <div class="my-page-table2" style="position: relative;min-height:450px;">
            <div class="result-title" >
            <p style="font-size:7px;">
                </br>
				&nbsp;&nbsp;회비납부 방식이 금융결제원 온라인 지로 방식으로 변경되었음을 알려드립니다. 현재 화면에서 고지된 회비 목록 중 선택하여 납부하거나, </br>
				&nbsp;&nbsp;인터넷 지로 또는 은행 사이트에서도 납부 할 수 있습니다. </br>
				&nbsp;※ 지로용지로 납부하고자 하는 회원분께서는 아래에 고지된 회비별로 "오프라인 지로받기"를 선택해주시기 바랍니다.</br>

                <!-- <button type="button" onclick="javascript:$('.image-view-layer').show();">회비고지서 확인</button> -->
                <button type="button" onclick="javascript:giroReport();" style="position:absolute;right:0px;top:10px;">회비고지서 확인</button>
                </p>
            </div>
            <div style="height: 14px;"></div>

            
            
            <table class="tb-bg TABLE" style="width:50%; position: absolute; width: 49%; min-height: <c:choose><c:when test="${fn:length(detail) eq 0}">320</c:when><c:when test="${fn:length(detail) eq 1}">320</c:when><c:otherwise>${(fn:length(detail) * 160)}</c:otherwise></c:choose>px; top: 73px; left: 0px; ">
                <colgroup>
                    <col style="width: 588px;"/>
                </colgroup>
                <thead style="border-bottom:1px solid #686363">
                <tr >
                    <th class="left title" style="border-bottom:0px solid #DCDCDC">
                        납부내역 조회
                    </th>

                </tr>
                </thead>
                <tbody id="resultTbody">
                <c:forEach var="rt" items="${result}" varStatus="status">
                    <tr style="border-bottom:1px solid #DCDCDC">
                        <td class="bg-content">
                            <div class="dl-list">
                                <dl>
                                    <dt> ${rt.pay_de}  </dt>

                                    <dd><c:out value='${fn:replace(rt.rqest_nm,"지로","")}'/></dd>
                                </dl>
                                <dl class="price">
                                    <dt></dt>
                                    <fmt:formatNumber type="number" maxFractionDigits="3" value="${rt.dudt_in_amt}" var="d_amt_" />
                                    <dd  style="color: #1983f7; !important;"><c:out value='${d_amt_}'/>    원</dd>
                                </dl>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>

            <div style="height: 14px;"></div>

            <table class="tb-bg" style="width:50%; margin-left: 50%;;">
                <colgroup>
                    <col />
                    <col style="width: 120px;" />
                    <col style="width: 200px;" />
                    <col style="width: 80px;" />
                </colgroup>
                <thead style="border-bottom:1px solid #686363">
                <tr>
                    <th colspan="4" class="left title" style="border-bottom:0px solid #DCDCDC">미납회비 조회</th>
                    
                </tr>
                </thead>
                
            </table>
            
            <c:forEach var="drt" items="${detail}" varStatus="status">


                <table class="tb-bg" style="width:50%; margin-left: 50%;">
                    <colgroup>
                        <col style="width: 100px;" />
                        <col style="width: 170px;" />
                        <col style="width: 250px;" />
                        <col style="width: 80px;" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4" class="left title"><span class="check"><input type="checkbox" id="du${status.count}" value="${drt.giro_cd}" amt="${drt.dudt_in_amt}" reqcd="${drt.rqest_cd }" class="dudtInAmtCk"/><label for="du${status.count}"><c:out value='${fn:replace(drt.rqest_nm,"지로","")}'/></label></span></th>
                        <th class="right">
                            <!-- <button type="button" class="more">더보기</button> -->
                        </th>
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
                                    <dt>전자납부번호</dt>
                                    <dd> ${fn:substring(detail[0].epay_no,0,1)}
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
                                            ${fn:substring(detail[0].epay_no,12,13)}</dd>
                                </dl>
                                <dl>
                                    <dt>납입기일</dt>
                                    <fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>
                                    <dd><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></dd>
                                </dl>
                            </div>
                            <div class="offline-jiro-check">
                                <span class="line-checkbox inline"><input class="postChk" type="checkbox" id="oj${status.count}" value="${drt.giro_cd}" <c:if test="${drt.post_send_yn eq 'Y' }">checked</c:if>/><label  for="oj${status.count}">오프라인 지로받기</label></span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </c:forEach>
            
            <c:if test="${fn:length(detail) eq 0}">
                <table class="tb-bg" style="width:50%; margin-left: 50%;">
                    <colgroup>
                        <col />
                        <col style="width: 120px;" />
                        <col style="width: 200px;" />
                        <col style="width: 80px;" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4" class="left title"><label for="testt">미납내역 정보가 없습니다.</label></th>
                        
                    </tr>
                    </thead>
                    
                </table>
            </c:if>
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
                <button id="paymentBtn" type="button">0 원 결제</button>
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



<!-- 영수증 팝업 -->

<div class="kicpa-modal" style="display:none;">
    <div class="modal-inner wide" >
        <div class="modal-title">회비고지서</div>
        <div class="modal-bill" id="printArea">
            <div class="modal-bill-title">
                <img src="<c:url value='/image/img_bill-logo.png'/>" alt="KICPA"><em>한국공인회계사회 회비고지서</em>
            </div>
            <div class="modal-bill-info1">
                <div class="left">
                    <strong class="date">${fn:substring(billSum[0].due_de,0,4)}.${fn:substring(billSum[0].due_de,4,6)}</strong>
                    <!-- <div class="txt">
                        기준납기 2021. 7. 31<br/>
                        작성일
                    </div> -->
                </div>
                <div class="right">
                    <span class="number">${fn:substring(detail[0].epay_no,0,1)}
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
                                    </span><strong class="name">${searchVO.name}</strong>회원님
                </div>
            </div>
            <div class="modal-bill-info2">
                <table>
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>회비구분</th>
                        <th>납기경과</th>
                        <th>연체이자</th>
                        <th>지연가산</th>
                        <th>당월납기</th>
                        <th>합계</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:set var="pass_sum" value="0"/>
                    <c:set var="add_sum" value="0"/>
                    <c:set var="delay_sum"  value="0"/>
                    <c:set var="cur_sum" value="0"/>
                    
                    
                    <c:forEach var="bs" items="${billSum}" varStatus="status">
                    	<tr>
	                        <td>${bs.dues_cl_nm }</td>
	                        <c:set var="pass_sum" value="${pass_sum + bs.pass_amt}"/>
	                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bs.pass_amt}" var="pass_amt_" />	                        
	                        <td>${pass_amt_}</td>
	                        <c:set var="add_sum" value="${add_sum + bs.add_amt}"/>
	                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bs.add_amt}" var="add_amt_" />	                        
	                        <td>${add_amt_}</td>
	                        <c:set var="delay_sum" value="${delay_sum + bs.delay_amt}"/>
	                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bs.delay_amt}" var="delay_amt_" />	                        
	                        <td>${delay_amt_}</td>
	                        <c:set var="cur_sum" value="${cur_sum + bs.cur_amt}"/>
	                      	<fmt:formatNumber type="number" maxFractionDigits="3" value="${bs.cur_amt}" var="cur_amt_" />	                        
	                        <td>${cur_amt_}</td>
	                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bs.pass_amt +  bs.cur_amt}" var="sum_" />
	                        <td>${sum_}</td>
	                    </tr>                    
                    </c:forEach>                 
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>합계</td>
                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${pass_sum}" var="pass_sum_" />
                        <td>${pass_sum_ }</td>
                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${add_sum}" var="add_sum_" />
                        <td>${add_sum_ }</td>
                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${delay_sum}" var="delay_sum_" />
                        <td>${delay_sum_ }</td>
                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${cur_sum}" var="cur_sum_" />
                        <td>${cur_sum_ }</td>
                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${pass_sum+cur_sum}" var="tot_sum_" />
                        <td><strong>${tot_sum_ }</strong></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div class="modal-bill-info3">
                <div class="way">
                    <dl>
                        <!-- <dt>납기일</dt>
                        <dd class="date">2021. 7. 31 까지</dd> -->
                        <dt></dt>
                        <dd class="date"></dd>
                        <dd>
                            각 건별 납기일 이후 납부시<br/>연 6% 연체이자(일할 계산)가 납부월 다음달 청구됩니다.
                        </dd>
                    </dl>
                    <dl>
                        <dt>납부방법</dt>
                        <dd>
                            온라인납부 KICPA전자민원시스템>로그인>회비납부<br/>
                            인터넷지로납부 인터넷 지로납부 지로번호 000000000
                        </dd>
                    </dl>
                </div>
                <div class="price">
                    <span>납부하실 금액은</span>
                    <div>총<strong>${tot_sum_ }원</strong></div>입니다.
                </div>
            </div>
            <div class="modal-bill-info4">
                <strong class="title">한 국 공 인 회 계 사 회 장</strong>
                <!-- DECODE(A.DUES_CL,'00170002','연화비','00170003','부조회비','00170004','복지회비','00170005','세무자료','00170006','도서자료','00170007','특별회비','56030010','직무회비','56030040','직무회비','00170001','직무회비','기타') -->
                <c:forEach var="bs" items="${billSum}" varStatus="status">
                	<c:if test="${bs.dues_cl eq '00170002' }">
                		<div class="bill-group">
		                    <strong class="tb-title">연회비</strong>
		                    <div class="bill-group-tb">
		                        <table>
		                            <colgroup>
		                                <col />
		                                <col />
		                                <col />
		                                <col />
		                            </colgroup>
		                            <thead>
		                            <tr>
		                                <th>연도</th>
		                                <th>연회비</th>
		                                <th>추가회비</th>
		                                <th>납기</th>
		                            </tr>
		                            </thead>
		                            <tbody>
		                            <c:set var="pass_sum" value="0"/>
				                    <c:set var="add_sum" value="0"/>
				                    <c:set var="delay_sum"  value="0"/>
				                    <c:set var="cur_sum" value="0"/>
				                    <c:set var="dues_sum" value="0"/>
		                            <c:forEach var="bi" items="${bill}" varStatus="status">
					                		<!-- 연회비 -->
					                		<c:if test="${bi.dues_cl eq '00170002' }">
					                			<tr>
					                                <td>${fn:substring(bi.due_de,0,4)}</td>					                        				                        
							                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
							                      	<fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />	                        
							                        <td>${dues_amt_}</td>	
							                        <c:set var="add_sum" value="${add_sum + bi.add_amt}"/>
							                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.add_amt}" var="add_amt_" />	                        
							                        <td>${add_amt_}</td>					                       
							                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
					                            </tr>		
					                		</c:if>			                		
					                </c:forEach>                           
		                            </tbody>
		                            <tfoot>
		                            <tr>
		                                <td>합계</td>
		                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
				                        <td>${dues_sum_ }</td>
		                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${add_sum}" var="add_sum_" />
				                        <td>${add_sum_ }</td>		                        
		                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum + add_sum}" var="tot_sum_" />
		                                <td><strong>${tot_sum_}</strong></td>
		                            </tr>
		                            </tfoot>
		                        </table>
		                    </div>
		                </div>
                	</c:if>
                	<c:if test="${bs.dues_cl eq '00170003' }">
                		<div class="bill-group">
		                    <strong class="tb-title">부조회비</strong>
		                    <div class="bill-group-tb">
		                        <table>
		                            <colgroup>
		                                <col />
		                                <col />
		                                <col />
		                                <col />
		                            </colgroup>
		                            <thead>
		                            <tr>
		                                <th>연도</th>
		                                <th>연회비</th>
		                                <th>추가회비</th>
		                                <th>납기</th>
		                            </tr>
		                            </thead>
		                            <tbody>
		                            <c:set var="pass_sum" value="0"/>
				                    <c:set var="add_sum" value="0"/>
				                    <c:set var="delay_sum"  value="0"/>
				                    <c:set var="cur_sum" value="0"/>
				                    <c:set var="dues_sum" value="0"/>
		                            <c:forEach var="bi" items="${bill}" varStatus="status">
					                		<!-- 부조회비 -->
					                		<c:if test="${bi.dues_cl eq '00170003' }">
					                			<tr>
					                                <td>${fn:substring(bi.due_de,0,4)}</td>
							                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
							                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />	                        
							                        <td>${dues_amt_}</td>					                        
							                        <c:set var="add_sum" value="${add_sum + bi.add_amt}"/>
							                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.add_amt}" var="add_amt_" />	                        
							                        <td>${add_amt_}</td>					                        
							                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
					                            </tr>		
					                		</c:if>			                		
					                </c:forEach>                           
		                            </tbody>
		                            <tfoot>
		                            <tr>
		                                <td>합계</td>
		                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
				                        <td>${dues_sum_ }</td>
				                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${add_sum}" var="add_sum_" />
				                        <td>${add_sum_ }</td>
		                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum + add_sum}" var="tot_sum_" />
		                                <td><strong>${tot_sum_ }</strong></td>
		                            </tr>
		                            </tfoot>
		                        </table>
		                    </div>
		                </div>
                	</c:if>
                	<c:if test="${bs.dues_cl eq '00170004' }">
                		<div class="bill-group">
		                    <strong class="tb-title">복지회비</strong>
		                    <div class="bill-group-tb">
		                        <table>
		                            <colgroup>
		                                <col />
		                                <col />
		                                <col />
		                                <col />
		                            </colgroup>
		                            <thead>
		                            <tr>
		                                <th>해당년월</th>
		                                <th>복지회비</th>
		                                <th>납부방법 : 월납</th>                                
		                            </tr>
		                            </thead>
		                            <tbody>
		                            <c:set var="pass_sum" value="0"/>
				                    <c:set var="add_sum" value="0"/>
				                    <c:set var="delay_sum"  value="0"/>
				                    <c:set var="cur_sum" value="0"/>
				                    <c:set var="dues_sum" value="0"/>		                    
		                            <c:forEach var="bi" items="${bill}" varStatus="status">
					                		<!-- 복지회비 -->
					                		<c:if test="${bi.dues_cl eq '00170004' }">
					                			<tr>
					                                <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}</td>
							                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
							                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />	                        
							                        <td>${dues_amt_}</td>
					                            </tr>		
					                		</c:if>			                		
					                </c:forEach>                           
		                            </tbody>
		                            <tfoot>
		                            <tr>
		                                <td>합계</td>
		                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
				                        <td><strong>${dues_sum_ }</strong></td>
				                        
		                            </tr>
		                            </tfoot>
		                        </table>
		                    </div>
		                </div>
                	</c:if>
                	<c:if test="${bs.dues_cl eq '56030010' || bs.dues_cl eq '56030040' || bs.dues_cl eq '00170001' }">
                		<div class="bill-group">
		                    <strong class="tb-title">직무회비</strong>
		                    <div class="bill-group-tb">
		                        <table>
		                            <colgroup>
		                                <col />
		                                <col />
		                                <col />
		                                <col />
		                            </colgroup>
		                            <thead>
		                            <tr>
		                                <th>업무구분</th>
		                                <th>회사명</th>
		                                <th>접수일(결산종료일)</th>
		                                <th>회비구분</th>
		                                <th>차수</th>
		                                <th>회비</th>
		                                <th>납기</th>
		                            </tr>
		                            </thead>
		                            <tbody>
		                            <c:set var="pass_sum" value="0"/>
				                    <c:set var="add_sum" value="0"/>
				                    <c:set var="delay_sum"  value="0"/>
				                    <c:set var="cur_sum" value="0"/>
				                    <c:set var="dues_sum" value="0"/>
		                            <c:forEach var="bi" items="${bill}" varStatus="status">
					                		<!-- 직무회비 -->
					                		<c:if test="${bi.dues_cl eq '56030010' || bi.dues_cl eq '56030040' || bi.dues_cl eq '00170001' }">
					                			<tr>
					                				<td>${bi.duty_dues_cl}</td>
					                				<td>${bi.cmpy_nm}</td>
					                				<td>
					                					<c:choose>
					                						<c:when test="${fn:length(bi.rcept_de) eq 8 }">
					                							${fn:substring(bi.rcept_de,0,4)}.${fn:substring(bi.rcept_de,4,6)}.${fn:substring(bi.rcept_de,6,8)}
					                						</c:when>
					                						<c:when test="${fn:length(bi.rcept_de) eq 6 }">
					                							${fn:substring(bi.rcept_de,0,4)}.${fn:substring(bi.rcept_de,4,6)}
					                						</c:when>
					                						<c:otherwise>
					                							${bi.rcept_de}
					                						</c:otherwise>					                						
					                					</c:choose>
					                					
					                				</td>
					                				<td>${bi.duty_flag}</td>
					                                <td>${bi.odr}차</td>
							                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt + bi.add_amt + bi.delay_amt}"/>
							                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt + bi.add_amt + bi.delay_amt}" var="dues_amt_" />	                        
							                        <td>${dues_amt_}</td>
							                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
					                            </tr>		
					                		</c:if>			                		
					                </c:forEach>                           
		                            </tbody>
		                            <tfoot>
		                            <tr>
		                                <td>합계</td>                                
				                        <td></td>
				                        <td></td>
				                        <td></td>
				                        <td></td>
				                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
		                                <td><strong>${dues_sum_ }</strong></td>
		                                <td></td>
		                            </tr>
		                            </tfoot>
		                        </table>
		                    </div>
		                </div>
                	</c:if>
                	<c:if test="${bs.dues_cl eq '00170005' || bs.dues_cl eq '00170006' || bs.dues_cl eq '00170007' }">
                		<div class="bill-group">
		                    <strong class="tb-title">감리업무수수료</strong>
		                    <div class="bill-group-tb">
		                        <table>
		                            <colgroup>
		                                <col />
		                                <col />
		                                <col />
		                                <col />
		                            </colgroup>
		                            <thead>
		                            <tr>
		                                <th>업무구분</th>
		                                <th>회사명</th>
		                                <th>접수일(결산종료일)</th>
		                                <th>회비구분</th>
		                                <th>차수</th>
		                                <th>회비</th>
		                                <th>납기</th>
		                            </tr>
		                            </thead>
		                            <tbody>
		                            <c:set var="pass_sum" value="0"/>
				                    <c:set var="add_sum" value="0"/>
				                    <c:set var="delay_sum"  value="0"/>
				                    <c:set var="cur_sum" value="0"/>
				                    <c:set var="dues_sum" value="0"/>
		                            <c:forEach var="bi" items="${bill}" varStatus="status">
					                		<!-- 감리업무수수료 -->
					                		<c:if test="${bi.dues_cl eq '00170005' || bi.dues_cl eq '00170006' || bi.dues_cl eq '00170007' }">
					                			<tr>
					                				<td>${bi.duty_dues_cl}</td>
					                				<td>${bi.cmpy_nm}</td>
					                				<td>${bi.rcept_de}</td>
					                				<td>${bi.duty_flag}</td>
					                                <td>${bi.odr}차</td>
							                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
							                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />	                        
							                        <td>${dues_amt_}</td>
							                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
					                            </tr>		
					                		</c:if>			                		
					                </c:forEach>                           
		                            </tbody>
		                            <tfoot>
		                            <tr>
		                                <td>합계</td>
		                                
				                        <td></td>
				                        <td></td>
				                        <td></td>
				                        <td></td>
				                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
		                                <td><strong>${dues_sum_ }</strong></td>
		                                <td></td>
		                            </tr>
		                            </tfoot>
		                        </table>
		                    </div>
		                </div>
                	</c:if>
                
                </c:forEach>
                
            </div>
        </div>
        <div class="modal-buttons no-line">
            <button type="button" onClick="javascript:downImg();" class="small-round-button type4">고지서 다운로드</button>
            <button type="button" onClick="javascript:$('.kicpa-modal').hide();"class="small-round-button type2">종료</button>
        </div>
    </div>
</div> --%>

<!--     <button type="button" class="close">close</button>
  </div> -->


</body>
</html>