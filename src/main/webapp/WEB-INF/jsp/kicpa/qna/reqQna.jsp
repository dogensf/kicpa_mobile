<%--
  Class Name : regQna.jsp
  Description : 문의접수등록
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
<title>문의 등록하기</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/KicpaMultiFile.js'/>" ></script>
<script type="text/javascript" src="<c:url value='/js/KicpaCommon.js'/>" ></script>
</head>
<script>
	$(function(){
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month  + '-' + day;
		$('#regdt').html(dateString);
		
		$('#category').change(function(){			
			$("#job option").remove();
			var comVar = '';
			$("#job").append("<option value=''>-</option>");
			<c:forEach var="code" items="${ccode}" varStatus="v">
				if(this.value == '${code.level1}' && comVar != '${code.level2}'){
					$("#job").append("<option value='${code.level2}'>${code.level2}</option>");
				}
				comVar = '${code.level2}';
			</c:forEach>
		});
		
		$('#job').change(function(){
			$("#depart").val('');
			$("#manager").val('');
			$("#manager_email").val('');
			
			$("#depart_").html('');
			//$("#manager_").html('');
			//$("#manager_email_").html('');
			var comVar = '';
			<c:forEach var="code" items="${ccode}" varStatus="v">
				if(this.value == '${code.level2}' && comVar != '${code.level2}'){					
					$("#depart").val('${code.part}');
					$("#manager").val('${code.manager}');
					$("#manager_email").val('${code.manager_email}');
					
					$("#depart_").html('${code.part}');
					//$("#manager_").html('${code.manager}');
					//$("#manager_email_").html('${code.manager_email}');
					manager_email
				}
				comVar = '${code.level2}';
			</c:forEach>
		});
		
		$("#qna_cn").keyup(function(e) {
		    console.log("키업!");
			var content = $(this).val();
			$("#textLengthCheck").html("(" + content.length + "/ 4000 byte)"); //실시간 글자수 카운팅
			if (content.length > 4000) {
				alert("최대 4000 byte 입력 가능합니다.");
				$(this).val(content.substring(0, 4000));
				$('#textLengthCheck').html("(4000 / 최대 4000 byte)");
			}
		});
		
		$("#btSubmit").click(function(){
			var scriptTag2 =/[~^&()|<>?]/; 
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
			}
			
			if (confirm('<spring:message code="common.regist.msg" />')) {
	            //document.board.onsubmit();
	            document.qnaReg.action = "<c:url value='/kicpa/qna/insertQna.do'/>";
	            document.qnaReg.submit();
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
		
		
		$("#btCancel").click(function(){
			location.href="<c:url value='/kicpa/qna/qnaResult.do'/>";
		});
		
	});
</script>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">회원상담
      	<div class="menu">
          <ul>
            <li><a href="<c:url value='/kicpa/faq/faqList.do'/>" >FAQ</a></li>            
            <li><a href="<c:url value='/kicpa/qna/reqQna.do'/>" class="active">문의 접수</a></li>
            <li><a href="<c:url value='/kicpa/qna/qnaResult.do'/>" >문의 처리 결과</a></li>
          </ul>
        </div>
      </h1>
	  <form name="qnaReg" id="qnaReg" method="post" enctype="multipart/form-data" >
	      <div class="basic-detail-view-table">
	        <table>
	          <colgroup>
	            <col style="width:160px;" />
	            <col style="width:440px;" />
	            <col style="width:160px;" />
	            <col style="width:440px;" />
	          </colgroup>
	          <tbody>
	            <tr>
	              <th>카테고리</th>
	              <td>
	                <span class="compact-select">
	                  <select name="category" id="category">
	                  	<option value="">-</option>
	                  	<c:set var="comVar" value="1"/>
	                  	<c:forEach var="code" items="${ccode}" varStatus="v">
	                  		<c:if test="${comVar != code.level1}">
	                  			<option value="${code.level1 }">${code.level1 }</option>		
	                  		</c:if>
	                  		<c:set var="comVar" value="${code.level1}"/>
	                  	</c:forEach>
	                    
	                  </select>
	                </span>
	              </td>
	              <th>해당업무</th>
	              <td>
	                <span class="compact-select">
	                  <select name="job" id="job">
	                    <option value="">-</option>
	                  </select>
	                </span>
	              </td>
	            </tr>
	            <tr>
	              <th>작성자 이메일</th>
	              <td>
	              	<span class="compact-input"><input type="text" name="reg_email" id="reg_email" value="" placeholder="xxxxx@gmail.com"></span>
	              	<input type="hidden" name="pin" id="pin" value="${qnaVO.pin }">
	              </td>
	              <th>작성일</th>
	              <td><span id="regdt">yyyy-dd-mm</span></td>
	            </tr>
	            <tr>
	              <td colspan="4" class="none" style="height: 20px;"></td>
	            </tr>
	            <tr>
	              <th>담당부서</th>
	              <td><span id="depart_">담당부서명</span>
	              	<input type="hidden" name="depart" id="depart" value="" readonly>
	              	<input type="hidden" name="manager" id="manager" value="" readonly>
	              	<input type="hidden" name="manager_email" id="manager_email" value="">
	              </td>
	              <th>민원처리상태</th>
	              <td>접수</td>
	              <!-- <th>담당자</th>
	              <td><span id="manager_">담당자명</span>
	              	 
	              </td> -->
	            </tr>
	            <!-- <tr>
	              <th>담당자 이메일</th>
	              <td><span id="manager_email_">xxx@gmail.com</span>
	              	 
	              </td>
	              <th>민원처리상태</th>
	              <td>접수</td>
	            </tr> -->
	            <tr>
	              <td colspan="4" class="none" style="height: 20px;"></td>
	            </tr>
	            <tr>
	              <th>제목<em class="require">*</em></th>
	              <td colspan="3">
	                <span class="compact-input"><input type="text" name="qna_sj" id="qna_sj" placeholder="" maxlength="200"></span>
	              </td>
	            </tr>
	            <tr>
	              <td colspan="4" class="none" style="height: 20px;"></td>
	            </tr>
	            <tr>
	              <th>내용<em class="require">*</em></th>
	              <td colspan="3">
	                <p class="tip">내용은 4000byte까지 입력 가능합니다.<span id="textLengthCheck">(0/4000 byte)</span></p>
	                <span class="textarea white">
	                  <textarea name="qna_cn" id="qna_cn" cols="30" rows="10"></textarea>
	                </span>
	              </td>
	            </tr>
	            <tr>
	              <td colspan="4" class="none" style="height: 20px;"></td>
	            </tr>
	            <tr>
	              <th>첨부파일</th>
	              <td colspan="3">
	                <span class="compact-input inline" style="width:350px;">
	                <!-- <input type="text" placeholder=""></span> 
	                <button type="button" class="line-button inline">다운로드</button> 
	                <button type="button" class="line-button inline">미리보기</button> -->
	                <input name="file_1"  id="egovComFileUploader" type="file" />
	                </span> 
                                                <div id="egovComFileList"></div>
                      <script type="text/javascript">
                            var maxFileNum = 3;
                            if(maxFileNum==null || maxFileNum==""){
                                maxFileNum = 3;
                            } 
                            var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), maxFileNum );
                            multi_selector.addElement( document.getElementById( 'egovComFileUploader' ) );         
                      </script>
	              </td>
	              
	            </tr>                      
	          </tbody>
	        </table>
	      </div>
	   </form>
      <div class="table-buttons">
        <div class="center">
          <a href="javascript:void(0);" id="btCancel" class="round-button type3">취소</a>
          <a href="javascript:void(0);" id="btSubmit" class="round-button type2">등록</a>
        </div>
      </div>
    </div>

    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>