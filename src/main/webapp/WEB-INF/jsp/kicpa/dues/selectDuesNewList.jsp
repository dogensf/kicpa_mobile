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
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ImgUrl" value="/images/"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회비관리_신규등록회비납부</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js"></script>
<style>
	/* 로딩*/
	#loading {
		height: 100%;
		left: 0px;
		position: fixed;
		_position:absolute; 
		top: 0px;
		width: 100%;
		filter:alpha(opacity=50);
		-moz-opacity:0.5;
		opacity : 0.5;
	}

	.loading {
		background-color: white;
		z-index: 199;
	}
	
	#loading_img{
		position:absolute; 
		top:50%;
		left:50%;
		height:35px;
		margin-top:-75px;	//	이미지크기
		margin-left:-75px;	//	이미지크기
		z-index: 200;
	}
</style>

<script type="text/javascript">
var popupX = (window.screen.width / 2) - (700 / 2);
var popupY= (window.screen.height /3) - (500 / 2);

var uri = '${rt.linkUrl}';
var popupName = "회비 결제";
var options = 'status=no, height=700, width=700, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY;	 

var openDialog = function(uri, name, options, closeCallback) {
     var win = window.open(uri, name, options);
     var interval = window.setInterval(function() {
         try {
             if (win == null || win.closed) {
                 window.clearInterval(interval);
                 closeCallback(win);
             }
             win.focus();
         }
         catch (e) {
         }
     }, 500);
     return win ;
 };


let errorCheck='N';
var formData  = [];
var searchVal;
var sumAmt=0;
var totCnt=0;
var rownum=0;

$(document).ready(function(){
	var loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="<c:url value='/image/loading.gif'/>" />')
					.appendTo(document.body).hide();

	$(window)
	.ajaxStart(function(){
		loading.show();
	})
	.ajaxStop(function(){
		loading.hide();
	});
	
	$("#cbx_chkAll").click(function() {
		if($("#cbx_chkAll").is(":checked")) $("input[name=chk]").prop("checked", true);
		else $("input[name=chk]").prop("checked", false);
	});

	$(document).on("click" ,"input[name=chk]",function() {
		var total = $("input[name=chk]").length;
		var checked = $("input[name=chk]:checked").length;	
		if(total != checked) $("#cbx_chkAll").prop("checked", false);
		else $("#cbx_chkAll").prop("checked", true); 
	});
	
	
	$("#duesNewSearchBtn").click(function(){
		searchVal = '';
		if($('#appCpaNo_se').val() == ''){
			alert('수습회계사 번호를 입력하세요.');
			$('#appCpaNo_se').focus();
			return false;
		}
		
		if($('#name_se').val() == ''){
			alert('이름을 입력하세요.');
			$('#name_se').focus();
			return false;
		}
				
		var form = $('#duesNewSearchForm')[0];
   		var form_ = new FormData(form);
   		   		
   		$.ajax({
   			url: "<c:url value='/kicpa/dues/selectDuesNewSearch.do'/>",
   			type: 'post',
   			data: form_,   			
   			cache: false,
   			contentType: false,
   			processData: false,
   			dataType: 'json',
   			async: false,
   			timeout: 10000,
   			beforeSend: function() {
   				$('#searchBody').html("");
   			},
   			complete: function() {
   				
   			},
   			success: function(result) {
   				if(result.resultList != null && result.resultList.length > 0 ){
   					searchVal = result.resultList;
   					
   					var rt = result.resultList;
   	   				for(var i=0;i < rt.length; i++){
   	   					var html  = "";
   	   						html += "<tr>";
   	   						html += "    <td style=\"text-align: center;\">"+rt[i].appCpaNo+"</td>";
   	   						html += "    <td style=\"text-align: center;\">"+rt[i].name+"</td>";
   	   						html += "</tr>";
   	   						
   	   					$('#searchBody').append(html);
   	   				}			
   				}else{
   					alert("검색정보가 없습니다.");
   				}
   				
   				
   				
   				
   			},
   			error: function(xhr, status, error) {
   				
   			},
   			fail: function() {
   				
   			}
   		}); 
	});
	
	
	
});



function commaCheck(num){
	 var len, point, str; 
	    num = num + ""; 
	    point = num.length % 3 ;
	    len = num.length; 
	    str = num.substring(0, point); 
	    while (point < len) { 
	        if (str != "") str += ","; 
	        str += num.substring(point, point + 3); 
	        point += 3; 
	    } 
	    return str;
}

function readExcel() {
    /* let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            console.log('SheetName: ' + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            console.log(JSON.stringify(rows));
        })
    };
    reader.readAsBinaryString(input.files[0]); */
	var fileCheck = document.getElementById("duesExcelList").value;
    if(!fileCheck){
        alert("파일을 첨부해 주세요");
        return false;
    }   
    
    var rtFunc = function(result) {
    	formData  = [];
    	var rt = result.resultList;	    	
    	$('#duesNewBody').html("");
    	totCnt = 0;
    	sumAmt = 0;
    	for(var i = 0; i < rt.length; i++){
    		var totalAmt = 0;
    		var keys = {};
    		keys.pin 		= rt[i].pin;
    		keys.registFlag = "1" ;
    		keys.acntCd     = "11103010";
    		keys.acnutNo    = "011250010713";
    		keys.cpaId 		=  rt[i].cpaId;
    		keys.calcFlag 	=  rt[i].calcFlag;
    		//일반입회금    		
    		keys.gnrlEntrncAmt =  rt[i].gnrlEntrncAmt;
    		if(rt[i].gnrlEntrncAmt > 0 ){
    			totalAmt += rt[i].gnrlEntrncAmt;
    		}
    		//일반연회비
    		// 하반기 체크
    		var secondHalYn = "N" // 하반기여부
    	    if(new Date(rt[i].registPreDe) instanceof Date) {
    	        if(rt[i].registPreDe.substr(0,4)+"0401" <= rt[i].registPreDe.replace(/-/gi,'')
    	            && rt[i].registPreDe.replace(/-/gi,'') < rt[i].registPreDe.substr(0,4)+"1001") 
    	        {
    	            secondHalYn = "N";
    	        }else {
    	            secondHalYn = "Y";
    	        }    	        
    	    }    	
    		var payAmt = 0;
    		if( rt[i].calcFlag == "Y") {
    			//엑셀 업로드는 개업만
                //if(registFlag == "1") { // 개업 
                    payAmt = 300000;                    
                    if(secondHalYn == "Y") { // 하반기 여부
                        payAmt -= 150000;
                    }
                //}else if(registFlag == "2") { //휴업
                //    payAmt = 50000;
                //}

                var preGnrlYyAmt = 0; 
                	if(rt[i].preGnrlYyAmt > 0){ preGnrlYyAmt = rt[i].preGnrlYyAmt;} // 기수납금
                if(preGnrlYyAmt > 0) {
                    payAmt -= preGnrlYyAmt;
                }

                if(rt[i].ageDiscountYn == "Y") { // 만60세 이상 할인체크
                    payAmt -= 50000;
                }

                if(payAmt < 0) {
                    payAmt = 0;
                }
            }
    		keys.gnrlYyAmt =  payAmt;
    		if(payAmt > 0 ){
    			totalAmt += payAmt; 
    		}
    		//회관회계 입회금    		
    		keys.cmitEntrncAmt =  rt[i].cmitEntrncAmt;
    		if(rt[i].cmitEntrncAmt > 0 ){
    			totalAmt += rt[i].cmitEntrncAmt; 
    		}
    		//공제회 부조회계 입회금
    		keys.asstnEntrncAmt =  rt[i].asstnEntrncAmt;
    		if(rt[i].asstnEntrncAmt > 0 ){
    			totalAmt += rt[i].asstnEntrncAmt; 
    		}
    		//공제회 부조회계 연회비
    		var payAmt = 0;
    		if(rt[i].calcFlag == "Y") {
                 payAmt = 150000;

                 var preAsstnYyAmt = 0; 
                	 if(rt[i].preAsstnYyAmt > 0) { preAsstnYyAmt =rt[i].preAsstnYyAmt;} // 기수납금
                 if(preAsstnYyAmt > 0) {
                     payAmt -= preAsstnYyAmt;
                 }
             }
             if(payAmt < 0) {
                 payAmt = 0;
             }
             keys.asstnYyAmt =  payAmt;
            if(payAmt > 0 ){
    			totalAmt += payAmt; 
    		}
            
            
            var html = "";
            rownum ++;
	    	html +="<tr id=\""+rt[i].pin+"\">";
	    	html +="    <td>"+ rownum +"</td>";
	    	html +="    <td><span class=\"line-checkbox solo\"><input name=\"chk\" type=\"checkbox\" id=\"ncc"+rownum+"\" value=\""+rt[i].pin+"\"><label for=\"ncc"+rownum+"\">&nbsp;</label></span></td>";
	    	html +="    <td>"+rt[i].appCpaNo +"</td>";
	    	html +="    <td>"+rt[i].name +"</td>";            
	    	html +="    <td>"+rt[i].registPreDe +"</td>";             
	    	html +="    <td>"+ commaCheck(totalAmt) +" 원</td>";
	    	if(rt[i].status == 'E'){
	    		html +="<td><span class=\"status-text error\">"+rt[i].notice+"</span></td>";	
	    		errorCheck='Y';
	    	}else{
	    		html +="<td><span class=\"status-text success\">"+rt[i].notice+"</span></td>";
	    	}			    	
	    	html +="  </tr>";
	    	
	    	$('#duesNewBody').append(html);
	    	formData.push(keys);
            if(totalAmt > 0 ){
            	sumAmt += totalAmt;
            }
    	}
    	totCnt = result.resultCount;
    	$('.count').html(totCnt + "개");
    	$('#newDuesBtn').html(commaCheck(sumAmt) + " 원 결제");
    	if(errorCheck =='Y'){
    		alert("엑셀데이터 불일치건 발생 . 확인후 다시 시도해 주시기 바랍니다.");    	
    		$('#newDuesBtn').attr("onClick","javascript:alert('엑셀데이터 불일치건 발생 . 확인후 다시 시도해 주시기 바랍니다.');");
    	}else{
    		$('#newDuesBtn').attr("onClick","javascript:setDuesCreate();");    		
    	}
    	
    	//alert(JSON.stringify(formData));
    		
	};

   	if (confirm('등록 하시겠습니까?')) {
   		var form = $('#duesExcelForm')[0];
   		var formData_ = new FormData(form);
   		   		
   		$.ajax({
   			url: "<c:url value='/kicpa/dues/chekDuesNewListAjax.do'/>",
   			type: 'POST',
   			data: formData_,
   			enctype: 'multipart/form-data',
   			cache: false,
   			contentType: false,
   			processData: false,
   			dataType: 'json',
   			async: false,
   			timeout: 10000,
   			beforeSend: function() {
   				
   			},
   			complete: function() {
   				
   			},
   			success: function(result) {
   				
   				rtFunc(result);
   			},
   			error: function(xhr, status, error) {
   				
   			},
   			fail: function() {
   				
   			}
   		});
   		
   		
   		
   	   
   		
   	}
    
}

function newDuesAdd(){
	var rt = searchVal;	    	
	
	for(var i = 0; i < rt.length; i++){
		var totalAmt = 0;
		var keys = {};
		keys.pin 		= rt[i].pin;
		//중복 체크
		for (let j = 0; j < formData.length; j++) {			
			if(formData[j].pin == rt[i].pin){
				alert("이미 추가된 정보 입니다.");
				return false;
			}
		}
		
		
		keys.cpaId 		=  rt[i].cpaId;
		keys.registFlag = "1";
		keys.acntCd     = "11103010";
		keys.acnutNo    = "011250010713";
		keys.calcFlag 	=  rt[i].calcFlag;
		//일반입회금    		
		keys.gnrlEntrncAmt =  rt[i].gnrlEntrncAmt;
		if(rt[i].gnrlEntrncAmt > 0 ){
			totalAmt += rt[i].gnrlEntrncAmt;
		}
		//일반연회비
		// 하반기 체크
		var secondHalYn = "N" // 하반기여부
	    if(new Date(rt[i].registPreDe) instanceof Date) {
	        if(rt[i].registPreDe.substr(0,4)+"0401" <= rt[i].registPreDe.replace(/-/gi,'')
	            && rt[i].registPreDe.replace(/-/gi,'') < rt[i].registPreDe.substr(0,4)+"1001") 
	        {
	            secondHalYn = "N";
	        }else {
	            secondHalYn = "Y";
	        }    	        
	    }    	
		var payAmt = 0;
		if( rt[i].calcFlag == "Y") {
			//엑셀 업로드는 개업만
            //if(registFlag == "1") { // 개업 
                payAmt = 300000;                    
                if(secondHalYn == "Y") { // 하반기 여부
                    payAmt -= 150000;
                }
            //}else if(registFlag == "2") { //휴업
            //    payAmt = 50000;
            //}

            var preGnrlYyAmt = 0; 
            	if(rt[i].preGnrlYyAmt > 0){ preGnrlYyAmt = rt[i].preGnrlYyAmt;} // 기수납금
            if(preGnrlYyAmt > 0) {
                payAmt -= preGnrlYyAmt;
            }

            if(rt[i].ageDiscountYn == "Y") { // 만60세 이상 할인체크
                payAmt -= 50000;
            }

            if(payAmt < 0) {
                payAmt = 0;
            }
        }
		keys.gnrlYyAmt =  payAmt;
		if(payAmt > 0 ){
			totalAmt += payAmt; 
		}
		//회관회계 입회금    		
		keys.cmitEntrncAmt =  rt[i].cmitEntrncAmt;
		if(rt[i].cmitEntrncAmt > 0 ){
			totalAmt += rt[i].cmitEntrncAmt; 
		}
		//공제회 부조회계 입회금
		keys.asstnEntrncAmt =  rt[i].asstnEntrncAmt;
		if(rt[i].asstnEntrncAmt > 0 ){
			totalAmt += rt[i].asstnEntrncAmt; 
		}
		//공제회 부조회계 연회비
		var payAmt = 0;
		if(rt[i].calcFlag == "Y") {
             payAmt = 150000;

             var preAsstnYyAmt = 0; 
            	 if(rt[i].preAsstnYyAmt > 0) { preAsstnYyAmt =rt[i].preAsstnYyAmt;} // 기수납금
             if(preAsstnYyAmt > 0) {
                 payAmt -= preAsstnYyAmt;
             }
         }
         if(payAmt < 0) {
             payAmt = 0;
         }
         keys.asstnYyAmt =  payAmt;
        if(payAmt > 0 ){
			totalAmt += payAmt; 
		}
        
        
        var html = "";
        rownum ++;
    	html +="<tr id=\""+rt[i].pin+"\">";
    	html +="    <td>"+ rownum +"</td>";
    	html +="    <td><span class=\"line-checkbox solo\"><input name=\"chk\" type=\"checkbox\" id=\"ncc"+rownum+"\" value=\""+rt[i].pin+"\"><label for=\"ncc"+rownum+"\">&nbsp;</label></span></td>";
    	html +="    <td>"+rt[i].appCpaNo +"</td>";
    	html +="    <td>"+rt[i].name +"</td>";            
    	html +="    <td>"+rt[i].registPreDe +"</td>";             
    	html +="    <td>"+ commaCheck(totalAmt) +" 원</td>";
    	if(rt[i].status == 'E'){
    		html +="<td><span class=\"status-text error\">"+rt[i].notice+"</span></td>";	
    		errorCheck='Y';
    	}else{
    		html +="<td><span class=\"status-text success\">정상 조회</span></td>";
    	}			    	
    	html +="  </tr>";
    	
    	$('#duesNewBody').append(html);
    	formData.push(keys);
        if(totalAmt > 0 ){
        	sumAmt += totalAmt;
        }
        totCnt ++;
	}
	
	$('.count').html(totCnt + "개");
	$('#newDuesBtn').html(commaCheck(sumAmt) + " 원 결제");
	$('.kicpa-modal').hide();
	modalReset();
	
}


function newDuesDel(){
	var checked = $("input[name=chk]:checked").length;	
	if(checked == 0){
		alert("삭제할 대상을 선택해 주세요.");
		return false;	
	}
	var pin;
	if (confirm('삭제 하시겠습니까?')) {
		$("input[name=chk]:checked").each(function(){
			pin = $(this).val();
			for (let j = 0; j < formData.length; j++) {			
				if(formData[j].pin == pin){
					var minusAmt = formData[j].gnrlEntrncAmt + formData[j].gnrlYyAmt + formData[j].cmitEntrncAmt + formData[j].asstnEntrncAmt + formData[j].asstnYyAmt;				
					sumAmt = sumAmt - minusAmt;
					totCnt --;
					formData.splice(j,1);
					$('#'+pin).remove();
				}
			}
			
		});
		//alert(formData.length);
		//alert(JSON.stringify(formData));
			
		$('.count').html(totCnt + "개");
		$('#newDuesBtn').html(commaCheck(sumAmt) + " 원 결제");	
	}
	
}

function modalReset(){
	
	var html  = "";
	html += "<tr>";
	html += "     <td colspan=\"2\" class=\"result-td\">   검색 정보를 입력 하세요. </td>";	
	html += "</tr>";
	$('#searchBody').html(html);
	$('#appCpaNo_se').val("");
	$('#name_se').val("");	
}

function setDuesCreate(){
	if (confirm('신규등록 회비를 납부 하시겠습니까?')) {

		
		$.ajax({
   			url: "<c:url value='/kicpa/dues/createNewDeus.do'/>",
   			type: 'POST',
   			data: JSON.stringify(formData) ,
   			contentType: 'application/json',
   			cache: false,   			
   			processData: false,
   			dataType: 'json',
   			async: false,
   			timeout: 10000,
   			beforeSend: function() {
   				
   			},
   			complete: function() {
   				
   			},
   			success: function(result) {
   				//
   				$('#org_tran_id').val(result.rt.org_tran_id);
   				//
   				if(result.rt.linkUrl != ''){
   					//납부 URL 발생시 결제 진행팝업 
   					openDialog(result.rt.linkUrl, popupName, options, function(win) {
   	   			    	//alert("팝업 닫힘");
   	   			    	document.frm.submit();
   	   			    });	
   				}else{
   					alert("결제 URL 생성 오류!");
   				}
   			},
   			error: function(xhr, status, error) {
   				alert("오류 발생!");
   			},
   			fail: function() {
   			}
   		});
	}
}

</script>
</head>
<body>
 <form name="frm" method="post" action="<c:url value='/kicpa/dues/selectPaymentResult.do'/>">  	
  	<input type="hidden" name="org_tran_id" id="org_tran_id" value="">  
  </form>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">
         회비납부/조회
        <div class="menu">
          <ul>             
            <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>">회비 내역 조회</a></li>         
            <c:if test="${sessionScope.auth eq 'Y' }">   
            	<li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>" class="active">신규등록회비 납부</a></li>
            </c:if>	
            <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>">납부결과 조회</a></li>
            <%-- <li><a href="<c:url value='/kicpa/dues/selectDuesRefund.do'/>">환급신청</a></li> --%>
          </ul>
        </div>
      </h1>

      <h2 class="my-page-sub-title">신규등록회비 납부</h2>

      <div class="basic-table-sort">
        <dl>
          <dt>total</dt>
          <dd class="count">0 개</dd>
          <dd class="button" style="width:200px;">
          	<form id="duesExcelForm" method="post" enctype="multipart/form-data">
          		<input type="file" name="duesExcelList" id="duesExcelList"> 
          	</form>
          </dd>
          <dd class="button">          	
            <button type="button" class="line-button full inline" onClick="javascript:readExcel();">엑셀등록</button>
          </dd>
          <dd class="button">
            <a href="<c:url value="/js/kicpa_dues_excel_exam.xlsx"/>" style="line-height:0px;" download="kicpa_회비엑셀양식.xlsx"><button type="button" class="line-button inline">엑셀양식 다운로드</button></a>
          </dd>
        </dl>
        <div class="util-buttons">
          <button type="button" class="line-button inline" onclick="javascript:$('.kicpa-modal').show();modalReset();">추가</button>
          <button type="button" class="line-button inline" onclick="javascript:newDuesDel();">삭제</button>
        </div>
      </div>
      <div class="basic-table">
        <table class="tb-bg">
          <colgroup>
            <col style="width: 4%;" />
            <col style="width: 4%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: auto;" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th><span class="line-checkbox solo"><input type="checkbox" id="cbx_chkAll"><label for="cbx_chkAll">&nbsp;</label></span></th>
              <th>수습회계사 번호</th>
              <th>성명</th>             
              <th>등록예정일</th>              
              <th>금액</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody id="duesNewBody">           
            <c:forEach var="result" items="${resultList}" varStatus="status">
             	<tr>
	              <td>${status.count }</td>
	              <td><span class="line-checkbox solo"><input type="checkbox" id="a2"><label for="a2">&nbsp;</label></span></td>
	              <td>${result.pin }</td>
	              <td>${result.name }</td>             
	              <td>${result.registPreDe }</td>             
	              <td> 0 원</td>
	              <c:choose>
	              	<c:when test="${result.status eq 'E' }">
	              		<td><span class="status-text error">${result.notice}</span></td>	
	              	</c:when>
	              	<c:otherwise>
	              		<td><span class="status-text success">${result.notice }</span></td>
	              	</c:otherwise>
	              </c:choose>
	              
	            </tr>
            </c:forEach>
          
          </tbody>
        </table>
      </div>
      <div class="result-box">
        <div class="info-text">
          <strong>KICPA 한국공인회계사회</strong>
          <p>
            (03736) 서울특별시 서대문구 충정로7길 12 (충정로 2가)<br />
            사업자등록번호 102-82-02601
          </p>
        </div>
        <div class="payment">
          <span>결제금액</span>
          <button type="button" id="newDuesBtn" onClick="">0 원 결제</button>
        </div>
      </div>
    </div>

<div class="kicpa-modal" style="display:none;">
    <div class="modal-inner">
      <div class="modal-title">수습회계사 추가</div>
      <form id="duesNewSearchForm" method="post">
	      <div class="modal-form">
	        <div class="modal-form-inner">
	           	수습회계사 번호 : 
	          <span class="modal-input" style="width: 200px;">
	          	<input name="appCpaNo" id="appCpaNo_se" type="text" value="" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" placeholder="수습회계사 번호(숫자만 입력.)" style="width: 200px;">          	
	          </span>
	          &nbsp;&nbsp;&nbsp;
	          	회원명 :
	          <span class="modal-input" style="width: 200px;">         	
	          	 <input name="name" id="name_se" type="text" value="" placeholder="회원명" style="width: 200px;">	          	 
	          </span>
	        </div>
	        <button type="button" id="duesNewSearchBtn">검색</button>
	      </div>
      </form>
      <div class="modal-result">
        <table>
          <colgroup>
            <col style="width: 200px;" />
            <col style="width:;" />
          </colgroup>
          <thead>
            <tr>
              <th>기관수습회계사 번호명</th>
              <th>회원명</th>              
            </tr>
          </thead>
          <tbody id="searchBody">
            <tr>
              <td colspan="2" class="result-td">
                검색 정보를 입력 하세요.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-buttons">
          <button type="button" class="small-round-button type4" onclick="javascript:newDuesAdd();">추가</button>
          <button type="button" onclick="javascript:$('.kicpa-modal').hide();modalReset();" class="small-round-button type2">취소</button>
      </div>
    </div>
  </div> 


    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>