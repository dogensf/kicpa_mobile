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


/*     $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
    }); */

    $(function() {
    	 /*    $("#datepicker1").datepicker({
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
        </c:if> */
        
        $('.btn-round-m').click(function(){
        	$('.btn-round-m').each(function(){
        		$(this).removeClass('active');
        	});
        	$(this).addClass('active');
        	
        	var myDate = new Date();        	
        	var month = (("00"+(myDate.getMonth() + 1)).slice(-2));
        	var day   = (("00"+ myDate.getDate()).slice(-2));
       	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + day  ;
       	 
       	    $("#searchBgnDe").val(datePlusMinus(prettyDate, - $(this).attr('month'), 'm'));
        	$("#month").val($(this).attr('month'));
        	
        	var myDate = new Date();
       	    var month = (("00"+(myDate.getMonth() + 1)).slice(-2));
       	    var day   = (("00"+ myDate.getDate()).slice(-2));
       	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + day  ;
       	    $("#searchEndDe").val(prettyDate);
        	
       	 $("#ndts").html("납부일 : "+ datePlusMinus(prettyDate, - $(this).attr('month'), 'm') +' ~ ' +  prettyDate);
       	 
       	document.frm.action = "<c:url value='/kicpa/dues/selectDuesList.do?path=result'/>";
        document.frm.submit();  
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
	function fncLocation(){
		location.href='<c:url value='/kicpa/dues/selectDuesList.do'/>';
	}
   
</script>
<body>
<div class="wrap">
      <div class="container">
        <section class="head-main">
          <h1>납부결과 조회</h1>
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

          <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">
            카테고리
          </button>
        </section>

          <section class="content">
              <div class="tab-main">
                  <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesList.do'/>">
                      <span>회비조회및납부</span>
                  </a>
                  <a class="tab-link active" href="<c:url value='/kicpa/dues/selectDuesList.do?path=result'/>">
                  <%-- <a class="tab-link active" href="<c:url value='/kicpa/dues/selectDuesResult.do'/>"> --%>
                      <span>납부결과 조회</span>
                  </a>
                  <!-- <a class="tab-link" href="#tabMain2">
                      <span>환급신청 및 조회</span>
                  </a> -->
              </div>

              <div id="tabMain1" class="tab-main-content show">

                <div class="dues-wrap">
                	<form name="frm" action ="<c:url value='/kicpa/dues/selectDuesResult.do'/>" method="post">
		                  <div class="inp-box">
		                    <label class="label" for="input" id="ndts">납부일 : ${searchVO.searchBgnDe} ~ ${searchVO.searchEndDe}</label>
		                    <!-- <input type="date" id="input_" value="1" name="input" data-placeholder="선택하세요." required readonly/> -->
		                    <input type="hidden" name="searchBgnDe" id="searchBgnDe" value="${searchVO.searchBgnDe}">
		                    <input type="hidden" name="searchEndDe" id="searchEndDe" value="${searchVO.searchEndDe}" >
		                    <input type="hidden" name="month" id="month" value="${searchVO.month}" >
		                    
		                  </div>
		                  <div class="period-set" style="width:100%">
		                    <button class="btn-round-m <c:if test="${searchVO.month eq '1'}">active</c:if>" type="button"  month="1">1개월</button>
		                    <button class="btn-round-m <c:if test="${searchVO.month eq '3'}">active</c:if>" type="button"  month="3">3개월</button>
		                    <button class="btn-round-m <c:if test="${searchVO.month eq '6'}">active</c:if>" type="button"  month="6">6개월</button>
		                    <button class="btn-round-m <c:if test="${searchVO.month eq '12'}">active</c:if>" type="button"  month="12">12개월</button>
		                  </div>
  					</form>
                  <div class="board-top">
                    <div class="total-num">
                        <span>결과</span>
                        <span class="find">${fn:length(list)} 건</span>
                    </div>
                  </div>

                  <div class="board-list">
                    <ul class="between-list">                    
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