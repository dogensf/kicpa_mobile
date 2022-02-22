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
<title>내 공문함</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
</head>
<script>
<!--
$('#appLoadingIndicator2', parent.document).hide();

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});

$(function() {
    $("#searchBgnDe").datepicker({
        onSelect:function(dateText, inst) {
            console.log(dateText);
        }
    });
    $("#searchEndDe").datepicker({
        onSelect:function(dateText, inst) {
            console.log(dateText);
        }
    });

});

function press(event) {
    if (event.keyCode==13) {
        fn_select_List('1');
    }
}


function fn_select_List(pageNo) {
    document.frm.pageIndex.value = pageNo;
    document.frm.action = "<c:url value='/kicpa/ofnt/ofntList.do'/>";
    document.frm.submit();  
}
//-->
</script>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">내 공문함</h1>
	<form name="frm" action ="<c:url value='/kicpa/ofnt/ofntList.do'/>" method="post">
	<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>"/>
      <div class="search-form">
        <div class="form-inner">
          <dl>
            <dt>등록일자</dt>
            <dd>
              <span class="compact-input inline cal" style="width: 150px;">
                <input type="text" name="searchBgnDe" id="searchBgnDe" placeholder="선택하세요">
                <button type="button">calendar</button>
              </span>
              <em class="middle-icon">~</em>
              <span class="compact-input inline cal" style="width: 150px;">
                <input type="text" name="searchEndDe" id="searchEndDe" placeholder="선택하세요">
                <button type="button">calendar</button>
              </span>
            </dd>
          </dl>
          <dl class="last">
            <dd>
              <span class="compact-select" style="width: 150px;">
                <select name="searchCnd" id="searchCnd">
                  <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>전체</option>
                  <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>제목</option>
                  <option value="2" <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if>>담당자</option>
                  <%-- <option value="3" <c:if test="${searchVO.searchCnd == '3'}">selected="selected"</c:if>>담당부서</option> --%>
                </select>
              </span>
            </dd>
            <dd><span class="compact-input" style="width: 270px;"><input name="searchWrd" id="searchWrd" placeholder="검색어 입력" value="<c:out value="${searchVO.searchWrd}"/>"  onkeypress="press(event);"></span></dd>
          </dl>
        </div>
        <button type="button" class="search" onclick="" >조회</button>
      </div>
	</form>
      <div style="height: 40px;"></div>

      <div class="basic-table">
        <table class="tb-bg">
          <colgroup>
            <col style="width: 40px;" />
            <%-- <col style="width: 40px;" /> --%>
            <col style="width: 230px;" />
            <col style="width: 237px;" />
            <col style="width: 301px;" />
            <col style="width: auto;" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <!-- <th><span class="line-checkbox solo"><input type="checkbox" id="all"><label for="all">&nbsp;</label></span></th> -->
              <th>공문번호</th>
              <th>제목</th>
              <th>발송일자</th>
              <th>발송자</th>
              <th>열람여부</th>
            </tr>
          </thead>
          <tbody>
            
            <c:forEach var="result" items="${resultList}" varStatus="status">
	          	<tr>
	              <td><c:out value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}"/></td>
	              <!-- <td><span class="line-checkbox solo"><input type="checkbox" id="a2"><label for="a2">&nbsp;</label></span></td> -->
	              <td><c:out value="${result.ofnt_no}"/></td>
	              <%-- <td><c:out value="${result.ofnt_sj}"/></td> --%>
	              <td><a href="<c:url value='/kicpa/ofnt/ofntDetail.do?ofnt_id=${result.ofnt_id}&pageIndex=${searchVO.pageIndex}'/>"><c:out value="${result.ofnt_sj}"/></a></td>
	              <td><c:out value="${result.reg_dt}"/></td>
	              <td><c:out value="${result.sender_nm}"/></td>	              
	              <td>
	              	<c:choose>
	              		<c:when test="${result.confirm_yn eq 'Y'}">
	              			<span class="status-text success">열람 ( ${result.confirm_dt} )</span>
	              		</c:when>
	              		<c:otherwise>
	              				<span class="status-text error">미열람</span>	
	              		</c:otherwise>
	              	</c:choose>
	              	
	              
	              </td>
	            </tr>	            
	          </c:forEach>
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

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>