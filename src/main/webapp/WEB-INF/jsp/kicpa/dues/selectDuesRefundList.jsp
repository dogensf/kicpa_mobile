<%--
  Class Name :
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
<title>회비관리_회비환불</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
</head>
<script>
//<!--

$('#appLoadingIndicator2', parent.document).hide();

$(function(){
	$("#cbx_chkAll").click(function() {
		if($("#cbx_chkAll").is(":checked")) $("input[name=ref_id]").prop("checked", true);
		else $("input[name=ref_id]").prop("checked", false);
	});

	$(document).on("click" ,"input[name=ref_id]",function() {
		var total = $("input[name=ref_id]").length;
		var checked = $("input[name=ref_id]:checked").length;	
		if(total != checked) $("#cbx_chkAll").prop("checked", false);
		else $("#cbx_chkAll").prop("checked", true); 
	});
	
	$("#btSubmit").click(function(){
		/* var scriptTag2 =/[~^&()|<>?]/; 
		var regExp_tel1 = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; 
		var checkText = "";

		var thisVal = $('#category').val();
		if(thisVal == ''){ 
			alert("카테고리를 선택해주세요.");
			$('#category').focus();
			return false;
		}
		thisVal = $('#job').val();
		if(thisVal == ''){ 
			alert("해당업무를 선택해주세요.");
			$('#job').focus();
			return;
		}
		
		thisVal = $('#qna_sj').val();
		if(thisVal.length == 0){ 
			alert("문의 제목을 입력해주세요."); 
			$('#qna_sj').focus();
			return;
		}else if(scriptTag2.test(thisVal) == true){ 
			alert("스크립트 태그는 들어갈 수 없습니다.");
			$('#qna_sj').focus();
			return;
		}else if (thisVal.length > 200){ 
			alert("200글자 이내로 입력해주세요.");
			$('#qna_sj').focus();
			return;
		} */
		
		if($('#phone').val() == ''){
			alert('연락처를 입력하세요.');
			$('#phone').focus();
			return false;
		}
		if($('#ref_sj').val() == ''){
			alert('건명을 입력하세요.');
			$('#ref_sj').focus();
			return false;
		}
		if($('#ref_cn').val() == ''){
			alert('사유를  입력하세요.');
			$('#ref_cn').focus();
			return false;
		}
		if($('#ref_amt').val() == ''){
			alert('환급금액을  입력하세요.');
			$('#ref_amt').focus();
			return false;
		}
		if($('#ref_bank').val() == ''){
			alert('입금은행을  입력하세요.');
			$('#ref_bank').focus();
			return false;
		}
		if($('#ref_account').val() == ''){
			alert('입금게좌을  입력하세요.');
			$('#ref_account').focus();
			return false;
		}
		if($('#ref_depositor').val() == ''){
			alert('예금주를  입력하세요.');
			$('#ref_depositor').focus();
			return false;
		}
		
		if (confirm('저장 하시겠습니까?')) {
			var url;
            if($('#ref_id').val()==''){
            	url = "<c:url value='/kicpa/dues/inserDuesRef.do'/>";
            }else{
            	url = "<c:url value='/kicpa/dues/updateDuesRef.do'/>";
            }
            var form = $('#refReg')[0];
        	var form = new FormData(form);
            $.ajax({
    			url: url,
    			type: 'post',
    			data: form,   			
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
    				fn_select_List(1);
    			},
    			error: function(xhr, status, error) {
    				
    			},
    			fail: function() {
    				
    			}
    		}); 
            //document.refReg.submit();
            /*  var form = $('#qnaReg')[0]
			 var formData = new FormData(form);
			fn_ajax_form_call("<c:url value='/kicpa/qna/insertQna.do'/>", formData, function(result){

				if(result.resultCd == '200'){
					//location.href="<c:url value='/kicpa/qna/qnaResult.do'/>";
					parent.OpenPage('/kicpacs/kicpa/qna/qnaResult.do');
				} else {
					alert('저장실패! 다시 시도해 주시기 바랍니다.');
				}

			});
			*/	            
        }

		
	});
});
function modalReset(){
	$('#phone').val('');
	$('#ref_sj').val('');
	$('#ref_cn').val('');
	$('#ref_amt').val('');
	$('#ref_bank').val('');
	$('#ref_account').val('');
	$('#ref_depositor').val('');
	$('#ref_status').val('');
	$('#ref_id').val('');
	
	
	
}
function press(event) {
    if (event.keyCode==13) {
        fn_select_List('1');
    }
}


function fn_select_List(pageNo) {
    document.frm.pageIndex.value = pageNo;
    document.frm.action = "<c:url value='/kicpa/dues/selectDuesRefund.do'/>";
    document.frm.submit();  
}
function fn_select_List_cate(cate) {
    document.frm.faq_cate.value = cate;
    document.frm.pageIndex.value = '1';
    document.frm.action = "<c:url value='/kicpa/dues/selectDuesRefund.do'/>";
    document.frm.submit();  
}

function fn_select_duesRef(id){
	modalReset();
	$('#key').val(id);
	var form = $('#frm')[0];
	var form_ = new FormData(form);
		   		
		$.ajax({
			url: "<c:url value='/kicpa/dues/duesRefDetail.do'/>",
			type: 'post',
			data: form_,   			
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
				
				if(result.rt != null){
					var rt = result.rt;
					$('#phone').val(rt.phone);
					$('#ref_sj').val(rt.ref_sj);
					$('#ref_cn').val(rt.ref_cn);
					$('#ref_amt').val(rt.ref_amt);
					$('#ref_bank').val(rt.ref_bank);
					$('#ref_account').val(rt.ref_account);
					$('#ref_depositor').val(rt.ref_depositor);
					$('#ref_status').val(rt.ref_status);
					$('#ref_id').val(rt.ref_id);
					
					$('.kicpa-modal').show();
				}else{
					alert("검색정보가 없습니다.");
				}
				
				
				
				
			},
			error: function(xhr, status, error) {
				
			},
			fail: function() {
				
			}
		}); 
}

function fn_select_delDues(){
	if (confirm('삭제 하시겠습니까?')) {
		var form = $('#delFrm')[0];
		var form_ = new FormData(form);
			   		
			$.ajax({
				url: "<c:url value='/kicpa/dues/deleteDuesRef.do'/>",
				type: 'post',
				data: form_,   			
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
					fn_select_List(1);
					
				},
				error: function(xhr, status, error) {
					
				},
				fail: function() {
					
				}
			}); 
	}	
	
}
//-->
</script>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">회비납부/조회
      	<div class="menu">
          <ul>            
            <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>" >회비 내역 조회</a></li>
            <c:if test="${sessionScope.auth eq 'Y' }">            
            	<li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>">신규등록회비 납부</a></li>
            </c:if>
            <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>" >납부결과 조회</a></li>
          	<%-- <li><a href="<c:url value='/kicpa/dues/selectDuesRefund.do'/>" class="active">환급신청</a></li> --%>
          </ul>
        </div>
      </h1>
		<form name="frm" id="frm" action ="<c:url value='/kicpa/dues/selectDuesRefund.do'/>" method="post">
			<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>"/>
			<input name="ref_id" id="key" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>"/>
		      <div class="search-form2">
		        <div class="form-inner">
		          <dl>
		            <dd>		              
		            </dd>
		            <dd>
		            </dd>
		          </dl>
		          <button type="button" class="search" onclick="javascript:$('.kicpa-modal').show();">환급신청</button>
		          <button type="button" class="search" style="background:#544a3f" onclick="fn_select_delDues();">삭제</button>
		        </div>
		      </div>
		
	      <div style="height: 58px;"></div>
	      
		</form>
      <div class="basic-table">
        <table class="tb-bg">
          <colgroup>
          	<col style="width: 4%;" />
          	<col style="width: 4%;" />
            <col style="width: 10%;" />
            <col style="width: auto" />
            <col style="width: 10%" />
            <col style="width: 5%" />            
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th><span class="line-checkbox solo"><input type="checkbox" id="cbx_chkAll"><label for="cbx_chkAll">&nbsp;</label></span></th>
              <th>등록날짜</th>
              <th>건 명</th>
              <th>상태</th>
              <th>조회</th>              
            </tr>
          </thead>  
          <tbody>
          	<form name="delFrm" id="delFrm" action ="<c:url value='/kicpa/dues/selectDuesRefund.do'/>" method="post">
	          <c:forEach var="result" items="${resultList}" varStatus="status">
	          	<tr>
	              <td><c:out value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}"/></td>
	              <td><span class="line-checkbox solo"><input type="checkbox" name="ref_id" value="${result.ref_id}" id="a${status.count }"><label for="a${status.count }">&nbsp;</label></span></td>
	              <td><c:out value="${result.reg_dt}"/></td>
	              <td style="text-align:left"><c:out value="${result.ref_sj}"/></td>
	              <td><c:out value="${result.ref_status}"/></td>
	              <td><a href="javascript:fn_select_duesRef('${result.ref_id}');">조회</a></td>
	             
	            </tr>
	          </c:forEach>
	        </form>  
            <c:if test="${fn:length(resultList) == 0}">
          		<tr>
          		 	<td colspan="6" ><spring:message code="common.nodata.msg" /></td>
          		</tr> 	
          	</c:if>
          </tbody>
        </table>
      </div>
 
      <div class="paging bg">        
        <ul>
          <ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_select_List" />
        </ul>        
      </div>
    </div>
<style>
.modal-table table tbody th{
	background: #FAFAFA;
	font-size: 15px;
	color: #003473;
	font-weight: 500;
	text-align: center;
	border: 1px solid #DCDCDC;
}
.modal-table table tbody td{
	padding: 5px 10px;
	border: 1px solid #DCDCDC;
	line-height: 100%;
	font-size: 16px;
	background: #fff;
}
</style>
<div class="kicpa-modal" style="display:none;">
    <div class="modal-inner">
      <div class="modal-title" style="padding:33px 0px 10px 0px;">환급 신청</div>      
      
        <form name="refReg" id="refReg" method="post" >
	      <div class="modal-result modal-table">
	        <table class="">
	          <colgroup>
	            <col style="width:20%;" />
	            <col style="width:440px;" />
	            <col style="width:160px;" />
	            <col style="width:440px;" />
	          </colgroup>
	          <tbody>
	            <tr>
	              <th>회원번호<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input" id="t_pin" style="border:0px;">${user.id}</span>
	                <input type="hidden" name="ref_id" id="ref_id" >	                
	                <input type="hidden" name="ref_status" id="ref_status" >
	                <input type="hidden" name="pin" id="pin" value="${user.id}">
	              </td>
	            </tr>
	            <tr>
	              <th>성명<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input" id="t_name" style="border:0px;">${user.name}</span>
	                <input type="hidden" name="name" id="name" value="${user.name}">
	              </td>
	            </tr>
	            <tr>
	              <th>연락처<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="phone" id="phone" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr>
	            <tr>
	              <th>건명<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="ref_sj" id="ref_sj" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr> 
	            <tr>
	              <th>사유<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="ref_cn" id="ref_cn" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr>   
	            <tr>
	              <th>환급금액<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="ref_amt" id="ref_amt" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr>
	            
	            <tr>
	              <th>입금은행<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="ref_bank" id="ref_bank" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr>       
	            <tr>
	              <th>계좌번호<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="ref_account" id="ref_account" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr>       
	            <tr>
	              <th>예금주<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="ref_depositor" id="ref_depositor" placeholder="" maxlength="200" autoComplete="off"></span>
	              </td>
	            </tr>        
	          </tbody>
	        </table>
	      </div>
	   </form>
      
      <div class="modal-buttons">
          <button type="button" class="small-round-button type4" id="btSubmit" >등록 / 수정</button>
          <button type="button" onclick="javascript:$('.kicpa-modal').hide();modalReset();" class="small-round-button type2">취소</button>
      </div>
    </div>
  </div> 
    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>