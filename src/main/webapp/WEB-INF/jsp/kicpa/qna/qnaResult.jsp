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
<title>문의 처리 결과</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/"/>css/base.css" />
<link rel="stylesheet" type="text/css" href="<c:url value="/"/>css/kicpa.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script>
<!--
function press(event) {
    if (event.keyCode==13) {
        fn_select_List('1');
    }
}

function fn_add() {
    document.frm.action = "<c:url value='/kicpa/qna/reqQna.do'/>";
    document.frm.submit();
}

function fn_select_List(pageNo) {
    document.frm.pageIndex.value = pageNo;
    document.frm.action = "<c:url value='/kicpa/qna/qnaResult.do'/>";
    document.frm.submit();  
}


$(function(){
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var dateString = year + '-' + month  + '-' + day;
	
	$('#category').change(function(){			
		$("#job option").remove();
		var comVar = '';
		$("#job").append("<option value=''>전체</option>");
		<c:forEach var="code" items="${ccode}" varStatus="v">
			if(this.value == '${code.level1}' && comVar != '${code.level2}'){
				$("#job").append("<option value='${code.level2}'>${code.level2}</option>");
			}
			comVar = '${code.level2}';
		</c:forEach>
	});
	
	$('#appLoadingIndicator2', parent.document).hide();
	
	
});
//-->
</script>
</head>

<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">문의 처리 결과
      	<div class="menu">
          <ul>
            <li><a href="<c:url value='/kicpa/faq/faqList.do'/>" >FAQ</a></li>            
            <li><a href="<c:url value='/kicpa/qna/reqQna.do'/>">문의 접수</a></li>
            <li><a href="<c:url value='/kicpa/qna/qnaResult.do'/>" class="active">문의 처리 결과</a></li>
          </ul>
        </div>
      </h1>
		<form name="frm" action ="<c:url value='/kicpa/qna/qnaResult.do'/>" method="post">
			<input type="hidden" name="pageIndex" value="1">
		      <div class="search-form">
		        <div class="form-inner">
		          <dl class="short">
		            <dt>카테고리</dt>
		            <dd>
		              <span class="compact-select" style="width: 150px;">
		                <select name="category" id="category">
		                  <option value="">전체</option>
		                  <c:set var="comVar" value="1"/>
		                  	<c:forEach var="code" items="${ccode}" varStatus="v">
		                  		<c:if test="${comVar != code.level1}">
		                  			<option value="${code.level1 }" <c:if test="${searchVO.category == code.level1}">selected="selected"</c:if>>${code.level1 }</option>		
		                  		</c:if>
		                  		<c:set var="comVar" value="${code.level1}"/>
		                  	</c:forEach>
		                </select>
		              </span>
		            </dd>
		          </dl>
		          <dl class="short">
		            <dt>해당업무</dt>
		            <dd>
		              <span class="compact-select" style="width: 180px;">
		                <select name="job" id="job">
		                  <option value="">전체</option>
		                  <c:forEach var="code" items="${ccode}" varStatus="v">
		                  		<c:if test="${code.level1 eq searchVO.category}">
		                  			<option value="${code.level2 }" <c:if test="${searchVO.job == code.level2}">selected="selected"</c:if>>${code.level2 }</option>		
		                  		</c:if>
		                  		<c:set var="comVar" value="${code.level1}"/>
		                  	</c:forEach>
		                </select>
		              </span>
		            </dd>
		          </dl>
		          <dl class="short">
		            <dt>민원처리상태</dt>
		            <dd>
		              <span class="compact-select" style="width: 70px;">
		                <select name="status" id="status">
		                  <option value=""     <c:if test="${searchVO.status == ''}">selected="selected"</c:if>>전체</option>
		                  <option value="접수"  <c:if test="${searchVO.status == '접수'}">selected="selected"</c:if>>접수</option>
		                  <option value="진행중" <c:if test="${searchVO.status == '진행중'}">selected="selected"</c:if>>진행중</option>
		                  <option value="완료"  <c:if test="${searchVO.status == '완료'}">selected="selected"</c:if>>완료</option>
		                </select>
		              </span>
		            </dd>
		          </dl>
		          <dl class="last">
		            <dd>
		              <span class="compact-select" style="width: 120px;">
		                <select name="searchCnd" id="searchCnd">
		                  <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>제목</option>
		                  <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>담당자</option>
		                  <option value="2" <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if>>부서</option>
		                </select>
		              </span>
		            </dd>
		            <dd><span class="compact-input" style="width: 160px;"><input type="text" name="searchWrd" value="${searchVO.searchWrd}" placeholder="" onkeypress="press(event);"></span></dd>
		          </dl>
		        </div>
		        <button class="search">조회</button>
		      </div>
		</form>
      <div style="height: 40px;"></div>

      <div class="basic-table">
        <table class="tb-bg">
          <colgroup>
            <col />
            <col />
            <col />
            <col style="width: 250px;"  />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>카테고리</th>
              <th>해당업무</th>              
              <th>제목</th>
              <th>작성자 이메일</th>
              <th>작성일</th>
              <th>담당자</th>
              <th>담당부서</th>
              <th>민원처리상태</th>
            </tr>
          </thead>
          <tbody>
          	
          	<c:forEach var="result" items="${resultList}" varStatus="status">
          		<tr>
	              <td><c:out value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}"/></td>
	              <td><c:out value="${result.category}"/></td>
	              <td><c:out value="${result.job}"/></td>	              
	              <td><a href="<c:url value='/kicpa/qna/qnaResultDetail.do?qna_id=${result.qna_id}&pageIndex=${searchVO.pageIndex}'/>"><c:out value="${result.qna_sj}"/></a></td>
	              <td><c:out value="${result.reg_email}"/></td>
	              <td><c:out value="${result.reg_dt}"/></td>
	              <td><c:out value="${result.manager}"/></td>
	              <td><c:out value="${result.depart}"/></td>
	              <td>
	              	<c:choose>
	              		<c:when test="${result.status eq '접수'}">
	              			<span class="status-text error">접수</span>
	              		</c:when>
	              		<c:when test="${result.status eq '진행중'}">
	              			<span class="status-text ing">진행중</span>
	              		</c:when>
	              		<c:when test="${result.status eq '완료'}">
	              			<span class="status-text success">완료</span>
	              		</c:when>
	              	</c:choose>
	              	
	              </td>
	            </tr>
          	</c:forEach>
            <c:if test="${fn:length(resultList) == 0}">
          		<tr>
          		 	<td colspan="10" ><spring:message code="common.nodata.msg" /></td>
          		</tr> 	
          	</c:if>
           <!--  <tr>
              <td>999</td>
              <td>카테고리1</td>
              <td>xxxxx</td>
              <td>홍길동</td>
              <td>내용 내용 내용 내용 내용</td>
              <td>aaaaa@gmail.com</td>
              <td>yyyy-dd-mm</td>
              <td>홍길동</td>
              <td>부서명</td>
              <td><span class="status-text success">완료</span></td>
            </tr>
            <tr>
              <td>999</td>
              <td>카테고리1</td>
              <td>xxxxx</td>
              <td>홍길동</td>
              <td>내용 내용 내용 내용 내용</td>
              <td>aaaaa@gmail.com</td>
              <td>yyyy-dd-mm</td>
              <td>홍길동</td>
              <td>부서명</td>
              <td><span class="status-text error">접수</span></td>
            </tr>
            <tr>
              <td>999</td>
              <td>카테고리1</td>
              <td>xxxxx</td>
              <td>홍길동</td>
              <td>내용 내용 내용 내용 내용</td>
              <td>aaaaa@gmail.com</td>
              <td>yyyy-dd-mm</td>
              <td>홍길동</td>
              <td>부서명</td>
              <td></td>
            </tr> -->
          </tbody>
        </table>
      </div>
      
      <div class="paging bg">        
        <ul>
          <ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_select_List" />
        </ul>        
      </div>

      <!-- <div class="paging">
        <button type="button" class="prev">prev</button>
        <ul>
          <li><button type="button" class="active">1</button></li>
          <li><button type="button">2</button></li>
          <li><button type="button">3</button></li>
          <li><button type="button">4</button></li>
          <li><button type="button">5</button></li>
          <li><button type="button">6</button></li>
          <li><button type="button">7</button></li>
          <li><button type="button">8</button></li>
          <li><button type="button">9</button></li>
          <li><button type="button">10</button></li>
        </ul>
        <button type="button" class="next">next</button>
      </div> -->
    </div>

    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>