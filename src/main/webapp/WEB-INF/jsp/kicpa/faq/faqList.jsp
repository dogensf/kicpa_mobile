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
<title>FAQ</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
</head>
<script>
<!--

$('#appLoadingIndicator2', parent.document).hide();

$(function(){
	$('#faq_job').change(function(){
		document.frm.pageIndex.value = '1';
	    document.frm.action = "<c:url value='/kicpa/faq/faqList.do'/>";
	    document.frm.submit();
	});
});

function press(event) {
    if (event.keyCode==13) {
        fn_select_List('1');
    }
}


function fn_select_List(pageNo) {
    document.frm.pageIndex.value = pageNo;
    document.frm.action = "<c:url value='/kicpa/faq/faqList.do'/>";
    document.frm.submit();  
}
function fn_select_List_cate(cate) {
    document.frm.faq_cate.value = cate;
    document.frm.pageIndex.value = '1';
    document.frm.action = "<c:url value='/kicpa/faq/faqList.do'/>";
    document.frm.submit();  
}
//-->
</script>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">회원상담
      	<div class="menu">
          <ul>
            <li><a href="<c:url value='/kicpa/faq/faqList.do'/>" class="active">FAQ</a></li>            
            <li><a href="<c:url value='/kicpa/qna/reqQna.do'/>">문의 접수</a></li>
            <li><a href="<c:url value='/kicpa/qna/qnaResult.do'/>">문의 처리 결과</a></li>
          </ul>
        </div>
      </h1>
		<form name="frm" action ="<c:url value='/kicpa/faq/faqList.do'/>" method="post">
			<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>"/>
			<input name="faq_cate"  type="hidden" value="<c:out value='${searchVO.faq_cate}'/>"/>
		      <div class="faq-menus">
		        <ul>
		          <li><a href="javascript:fn_select_List_cate('');" <c:if test="${searchVO.faq_cate == '' || empty searchVO.faq_cate}">class="active"</c:if>>전체</a></li>
		          <li><a href="javascript:fn_select_List_cate('공인회계사');" <c:if test="${searchVO.faq_cate == '공인회계사'}">class="active"</c:if>>공인회계사</a></li>
		          <li><a href="javascript:fn_select_List_cate('감사인');" <c:if test="${searchVO.faq_cate == '감사인'}">class="active"</c:if>>감사인</a></li>
		          <li><a href="javascript:fn_select_List_cate('세무사(세무대리)');" <c:if test="${searchVO.faq_cate == '세무사(세무대리)'}">class="active"</c:if>>세무사(세무대리)</a></li>
		          <li><a href="javascript:fn_select_List_cate('수습공인회계사');" <c:if test="${searchVO.faq_cate == '수습공인회계사'}">class="active"</c:if>>수습공인회계사</a></li>
		          <li><a href="javascript:fn_select_List_cate('회비');" <c:if test="${searchVO.faq_cate == '회비'}">class="active"</c:if>>회비</a></li>
		          <li><a href="javascript:fn_select_List_cate('연수');" <c:if test="${searchVO.faq_cate == '연수'}">class="active"</c:if>>연수</a></li>
		          <li><a href="javascript:fn_select_List_cate('수임신고');" <c:if test="${searchVO.faq_cate == '수임신고'}">class="active"</c:if>>수임신고</a></li>
		          <%-- <li><a href="javascript:fn_select_List_cate('8. 제증명');" <c:if test="${searchVO.faq_cate == '8. 제증명'}">class="active"</c:if>>제증명</a></li> --%>
		          <li><a href="javascript:fn_select_List_cate('출판물');" <c:if test="${searchVO.faq_cate == '출판물'}">class="active"</c:if>>출판물</a></li>
		          <li><a href="javascript:fn_select_List_cate('기타');" <c:if test="${searchVO.faq_cate == '기타'}">class="active"</c:if>>기타</a></li>
		        </ul>
		      </div>
		
		      <div style="height: 49px;"></div>
		
		      <div class="search-form2">
		        <div class="form-inner">
		          <dl>
		            <dd>
		              <span class="compact-select" style="width: 150px;">
		                <select name="searchCnd" id="searchCnd">
		                  <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>전체</option>
		                  <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>제목명</option>
		                  <option value="2" <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if>>담당자</option>
		                  <option value="3" <c:if test="${searchVO.searchCnd == '3'}">selected="selected"</c:if>>담당부서</option>	
		                </select>
		              </span>
		            </dd>
		            <dd><span class="compact-input" style="width: 600px;"><input type="text" autocomplete="OFF" name="searchWrd" id="searchWrd" placeholder="검색어 입력" value="<c:out value="${searchVO.searchWrd}"/>"  onkeypress="press(event);"></span></dd>
		          </dl>
		          <button class="search">조회</button>
		        </div>
		      </div>
		
	      <div style="height: 58px;"></div>
	
	      <div class="basic-table-sort">
	        <dl>
	          <dt>해당업무</dt>
	          <dd class="faq-select">
	            <span class="compact-round-select">
	              <select name="faq_job" id="faq_job">
	              	<option value="">전체</option>
	              	<c:forEach var="code" items="${ccode}" varStatus="v">
	               		<c:if test="${fn:contains(code.level1, searchVO.faq_cate) }">
	               			<option value="${code.level2 }" <c:if test="${searchVO.faq_job == code.level2}">selected="selected"</c:if>>${code.level2 }</option>		
	               		</c:if>               		
	               	</c:forEach>
	                <!-- <option value="0">전업</option> -->
	              </select>
	            </span>
	          </dd>
	        </dl>
	      </div>
		</form>
      <div class="basic-table">
        <table class="tb-bg">
          <colgroup>
            <col style="width: 40px;" />
            <col style="width: 150px;" />
            <col style="width: 120px;" />
            <col style="width: auto;" />
            <col style="width: 100px;" />
            <col style="width: 120px;" />
            <col style="width: 80px;" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>카테고리</th>
              <th>해당업무</th>
              <th>제목</th>
              <th>작성일</th>
              <th>담당부서</th>
              <th>조회수</th>
            </tr>
          </thead>  
          <tbody>
	          <c:forEach var="result" items="${resultList}" varStatus="status">
	          	<tr>
	              <td><c:out value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}"/></td>
	              <td><c:out value="${result.faq_cate}"/></td>
	              <td><c:out value="${result.faq_job}"/></td>
	              <td style="text-align:left"><a href="<c:url value='/kicpa/faq/faqDetail.do?faq_id=${result.faq_id}&pageIndex=${searchVO.pageIndex}'/>"><c:out value="${result.faq_sj}"/></a></td>
	              <td><c:out value="${result.reg_dt}"/></td>
	              <td><c:out value="${result.faq_part}"/></td>
	              <td><c:out value="${result.rdcnt}"/></td>
	            </tr>
	          </c:forEach>
            <c:if test="${fn:length(resultList) == 0}">
          		<tr>
          		 	<td colspan="8" ><spring:message code="common.nodata.msg" /></td>
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

    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>