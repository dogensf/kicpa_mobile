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

    <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
    <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
	<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
	<%-- <script src="<c:url value='/js/html2canvas.js'/>"></script>
	<script src="<c:url value='/js/html2canvas.min.js'/>"></script> --%>
<script>
var win=null;
function printIt(printThis)  {
  win = window.open();
  self.focus();
  win.document.open();
  win.document.write('<'+'html'+'><'+'head'+'><'+'style'+'>');
  win.document.write('body, td { font-family: Verdana; font-size: 10pt;}');
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
    html2canvas($("#printArea")[0]).then(function(canvas){
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "영수증.png") 
    });
}

function downloadURI(uri, name){
    var link = document.createElement("a")
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}


    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
    });

    $(function() {
        $("#datepicker1").datepicker({
            onSelect:function(dateText, inst) {
                console.log(dateText);
            },
            showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
            buttonImage: "../../image/img_cal2.png", // 버튼 이미지
            buttonImageOnly: false, // 버튼에 있는 이미지만 표시한다.
            changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
            changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
            minDate: '-80y', // 현재날짜로부터 100년이전까지 년을 표시한다.
            nextText: '다음 달', // next 아이콘의 툴팁.
            prevText: '이전 달', // prev 아이콘의 툴팁.
            numberOfMonths: [1,1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.
            //stepMonths: 3, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가.
            yearRange: 'c-50:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
            showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다.
            currentText: '오늘 날짜' , // 오늘 날짜로 이동하는 버튼 패널
            closeText: '닫기',  // 닫기 버튼 패널
            dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
            showAnim: "slide", //애니메이션을 적용한다.
            showMonthAfterYear: true , // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
            dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], // 요일의 한글 형식.
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.

        });
        
        $("#datepicker2").datepicker({
            onSelect:function(dateText, inst) {
                console.log(dateText);
            },
            showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
            buttonImage: "../../image/img_cal2.png", // 버튼 이미지
            buttonImageOnly: false, // 버튼에 있는 이미지만 표시한다.
            changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
            changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
            minDate: '-80y', // 현재날짜로부터 100년이전까지 년을 표시한다.
            nextText: '다음 달', // next 아이콘의 툴팁.
            prevText: '이전 달', // prev 아이콘의 툴팁.
            numberOfMonths: [1,1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.
            //stepMonths: 3, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가.
            yearRange: 'c-50:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
            showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다.
            currentText: '오늘 날짜' , // 오늘 날짜로 이동하는 버튼 패널
            closeText: '닫기',  // 닫기 버튼 패널
            dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
            showAnim: "slide", //애니메이션을 적용한다.
            showMonthAfterYear: true , // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
            dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], // 요일의 한글 형식.
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
        });
        
        $('#datepicker1').datepicker("option", "maxDate", $("#datepicker2").val());
        $('#datepicker1').datepicker("option", "onClose", function ( selectedDate ) {
            $("#datepicker2").datepicker( "option", "minDate", selectedDate );
        });

        $('#datepicker2').datepicker("option", "minDate", $("#datepicker1").val());
        $('#datepicker2').datepicker("option", "onClose", function ( selectedDate ) {
            $("#datepicker1").datepicker( "option", "maxDate", selectedDate );
        });
        
        <c:if test="${empty searchVO.searchBgnDe || empty searchVO.searchEndDe}">
        $("#datepicker1").datepicker('setDate', new Date());
        $("#datepicker2").datepicker('setDate', new Date());
        </c:if>
        
        $('.line-compact-button').click(function(){
        	$('.line-compact-button').each(function(){
        		$(this).removeClass('active');       	
        		
        	});
        	$(this).addClass('active');
        	
        	var myDate = new Date();        	
        	var month = (("00"+(myDate.getMonth() + 1)).slice(-2));
        	var day   = (("00"+ myDate.getDate()).slice(-2));
       	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + day  ;
       	    $("#datepicker1").val(datePlusMinus(prettyDate, - $(this).attr('month'), 'm'));
        	
        	
        	var myDate = new Date();
       	    var month = (("00"+(myDate.getMonth() + 1)).slice(-2));
       	    var day   = (("00"+ myDate.getDate()).slice(-2));
       	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + day  ;
       	    $("#datepicker2").val(prettyDate);
        	
        	
        });
        
        
    });

    function datePlusMinus(sDate, nNum, type) {
        var yy = parseInt(sDate.substr(0, 4), 10);
        var mm = parseInt(sDate.substr(5, 2), 10);
        var dd = parseInt(sDate.substr(8), 10);
        
        var dt;
        if (type == "d") {
            dt = new Date(yy, mm - 1, dd + nNum);
        } else if (type == "m") {
            dt = new Date(yy, mm - 1, dd + (nNum * 31));
        } else if (type == "y") {
            dt = new Date(yy + nNum, mm - 1, dd);
        }
        
        yy = dt.getFullYear();
        mm = dt.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        dd = dt.getDate();
        dd = (dd < 10) ? '0' + dd : dd;
        
        return '' + yy + '-' + mm + '-' + dd;
    }
    
    function fn_select_List(pageNo) {
        document.frm.pageIndex.value = pageNo;
        document.frm.action = "<c:url value='/kicpa/dues/selectDuesResult.do'/>";
        document.frm.submit();  
    }
    
    function f_datepicker(obj) {
    	if($(obj).datepicker( "widget" ).is(":visible")){
    		$( obj ).datepicker().datepicker("hide");
    	}else{
    		$( obj ).datepicker().datepicker("show");	
    	}
    	 
   }
    
   function rcptReport(rcptNm,rcptPrice,rcptDt,rcptNo) {
    	$('#rcptNm').html(rcptNm);
    	$('#rcptPrice').html(rcptPrice+' 원');
    	$('#rcptDt').html(rcptDt);
    	$('#rcptNo').html(rcptNo);
    	$('.kicpa-modal').show();
    	
    	 
   }
    
   
</script>
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
                  <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesList.do'/>">
                      <span>회비조회 및 납부</span>
                  </a>
                  <a class="tab-link active" href="<c:url value='/kicpa/dues/selectDuesResult.do'/>">
                      <span>납부결과 및 조회</span>
                  </a>
                  <a class="tab-link" href="#tabMain2">
                      <span>환급신청 및 조회</span>
                  </a>
              </div>

              <div id="tabMain1" class="tab-main-content show">

                <div class="dues-wrap">
                  <div class="inp-box">
                    <label class="label" for="input">납기기준월</label>
                    <input type="date" id="input" name="input" data-placeholder="선택하세요." required />
                  </div>
                  <div class="period-set">
                    <button class="btn-round-m active" type="button">1개월</button>
                    <button class="btn-round-m" type="button">3개월</button>
                    <button class="btn-round-m" type="button">6개월</button>
                    <button class="btn-round-m" type="button">12개월</button>
                  </div>
  
                  <div class="board-top">
                    <div class="total-num">
                        <span>결과</span>
                        <span class="find">24건</span>
                    </div>
                  </div>

                  <div class="board-list">
                    <ul class="between-list">
                        <li>
                          <div class="title">
                            <h4>연회비 및 부조회비</h4>
                            <b>300,000</b>
                          </div>

                          <div class="detail">
                            <p >
                              <b>고지금액</b>
                              <span>200,000</span>
                            </p>
                            <p>
                              <b>고객조회번호</b>
                              <span>0000711461</span>
                            </p>
                          </div>
                          
                          <div class="btn-area">
                            <button class="btn-round" type="button">300,000원 결제</button>
                          </div>
                        </li>
                    </ul>
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
            <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>" >회비 내역 조회</a></li>
            <c:if test="${sessionScope.auth eq 'Y' }">            
            	<li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>">신규등록회비 납부</a></li>
            </c:if>
            <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>" class="active">납부결과 조회</a></li>
          	<li><a href="<c:url value='/kicpa/dues/selectDuesRefund.do'/>">환급신청</a></li>
          </ul>
        </div>
      </h1>

      <h2 class="my-page-sub-title">납부결과조회</h2>

      <div class="search-form">
        <div class="form-inner">
        <form name="frm" action ="<c:url value='/kicpa/dues/selectDuesResult.do'/>" method="post">
			<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>"/>
	          <dl>
	            <dt>납부일</dt>
	            <dd>
	              <span class="compact-input inline cal" style="width: 150px;">
	                <input type="text" name="searchBgnDe" value="${searchVO.searchBgnDe}" id="datepicker1" placeholder="선택하세요" readonly>
	                <button type="button" onclick="javascript:f_datepicker(this);" >calendar</button>
	              </span>
	              <em class="middle-icon">~</em>
	              <span class="compact-input inline cal" style="width: 150px;">
	                <input type="text" name="searchEndDe" value="${searchVO.searchEndDe}" id="datepicker2"placeholder="선택하세요" readonly>
	                <button type="button" onclick="javascript:f_datepicker(this);" >calendar</button>
	              </span>
	            </dd>
	            <dd class="buttons">
	              <button type="button" class="line-compact-button" month="3">3개월</button>
	              <button type="button" class="line-compact-button" month="6">6개월</button>
	              <button type="button" class="line-compact-button" month="12">12개월</button>
	              <button type="button" class="line-compact-button" month="24">24개월</button>
	            </dd>
	          </dl>
	     </form>     
        </div>
        <button type="button" class="search" onclick="javascript:fn_select_List(1);">검색</button>
      </div>

      <div style="height: 20px;"></div>
	 <div class="my-page-table2">
			<c:forEach var="drt" items="${list}" varStatus="status">	 
	       	<table class="tb-bg">
	          <colgroup>
	            <col />
	            <col style="width: 120px;" />
	            <col style="width: 200px;" />
	            <col style="width: 80px;" />
	          </colgroup>
	          <thead>
	            <tr>
	              <th colspan="3" class="left title"><c:out value='${drt.rqest_nm}'/></th>
	              <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
	              <th class="right" style="text-align:center;"><c:out value='${d_amt}'/> 원</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td colspan="4"  class="bg-content">
	                <div class="dl-list">
	                  <dl class="price">
	                    <dt>납부번호</dt>                    
	                    <dd><c:out value='${drt.epay_no}'/></dd>
	                  </dl>
	                  <dl>
	                    <dt>납부일</dt>
	                    <fmt:parseDate value="${drt.pay_de}" var="Ddudt" pattern="yyyyMMdd"/>									
	                    <dd><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></dd>
	                    <dd>${drt.pay_de}</dd>
	                  </dl>
	                  <dl>
	                    <dt>납부방법</dt>
	                    <dd>${drt.paytype}</dd>
	                  </dl>                 
	                </div>
	                <div class="offline-jiro-check">
	                  <span class="line-checkbox inline"><button type="button" class="search77" onclick="javascript:rcptReport('${drt.rqest_nm}','<c:out value='${d_amt}'/>','${drt.pay_de}','<c:out value='${drt.epay_no}'/>');">영수증 보기</button></span>
	                </div>
	              </td>
	            </tr>
	          </tbody>
	        </table>
	      </c:forEach>
		<c:if test="${empty list }">
			<table class="tb-bg">
		          <colgroup>
		            <col />
		            <col style="width: 120px;" />
		            <col style="width: 200px;" />
		            <col style="width: 80px;" />
		          </colgroup>
		          <thead>
		            <tr>
		              <th colspan="4" class="left title">  납부 결과 0 건.         </th>	 
		            </tr>
		          </thead>
		          <tbody>		            
		          </tbody>
		        </table>
		</c:if>
	</div>
    </div>
    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
  
  <div class="kicpa-modal" style="display: none;">
    <div class="modal-inner wide">
      <div class="modal-title">영수증</div>
      <div class="modal-receipt-box" id="printArea">
        <table>
          <colgroup>
            <col style="width:15%" />
            <col style="width:35%" />
            <col style="width:15%" />
            <col style="width:35%" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">영수증</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>납부자</th>
              <td colspan="3" id="rcptName">${user.name }(${user.id })</td>
            </tr>
            <tr>
              <th>납부내용</th>
              <td colspan="3" id="rcptNm">연간회비<br/>부조회비<br/>복지회비<br/>직무회비</td>
            </tr>
            <tr>
              <th>금액</th>
              <td id="rcptPrice">780,000원</td>
              <th>납부일</th>
              <td id="rcptDt">2021년 00년 00일</td>
            </tr>
            <tr class="final">
              <th>&nbsp;</th>
              <td>
              <c:set var="today" value="<%=new java.util.Date()%>" />
				<!-- 현재날짜 -->
			  	<c:set var="date"><fmt:formatDate value="${today}" pattern="yyyy.MM.dd hh:mm" /></c:set> 
				<!-- 현재년도 -->
				<c:set var="year"><fmt:formatDate value="${today}" pattern="yyyy" /></c:set> 
				<!-- 현재월 -->
				<c:set var="month"><fmt:formatDate value="${today}" pattern="MM" /></c:set>
				<!-- 현재일 -->
				<c:set var="day"><fmt:formatDate value="${today}" pattern="dd" /></c:set> 
                위 금액의 납부를 확인합니다.<br/>
                ${year }년 ${month }월 ${day }일
              </td>
              <th>&nbsp;</th>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th>&nbsp;</th>
              <td>&nbsp;</td>
              <td colspan="2" class="in">한국공인회계사회 (직인)<img id="kicpaStamp" style="position: absolute; bottom:270px; right: 270px; width: 75px; height: 75px;" src="<c:url value='/images/kicpa_appv_ko_20170807.gif'/>" alt=""></td>
            </tr>
            <tr>
              <th>납부번호</th>
              <td id="rcptNo">2121-000000</td>
              <th>발행일시</th>              	
              <td>${date }</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td colspan="4" class="modal-receipt-tip">*이 영수증은 세금계산서, 현금영수증 등 세법상 거래 적격 증명으로 사용할 수 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-buttons no-line">
          <!-- <button type="button" onClick="javascript:printIt(document.getElementById('printArea').innerHTML)" class="small-round-button type4">영수증 다운로드</button> -->
          <button type="button" onClick="javascript:downImg();" class="small-round-button type4">영수증 다운로드</button>
          
          <button type="button" onClick="javascript:$('.kicpa-modal').hide();" class="small-round-button type2">종료</button>
      </div>
    </div>
  </div> --%>
  
</body>
</html>