<%--
  Class Name : resume.jsp
  Description : 지원서 
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
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2"><a href="<c:url value='/kicpa/faq/faqList.do?pageIndex=${searchVO.pageIndex}'/>">목록으로</a></h1>

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
              <th>제목<em class="require">*</em></th>
              <td colspan="3"><c:out value="${result.faq_sj}" /></td>
            </tr>
            <tr>
              <td colspan="4" class="none" style="height: 20px;"></td>
            </tr>
            <tr>
              <th>카테고리<em class="require">*</em></th>
              <td><c:out value="${result.faq_cate}" /></td>
              <th>해당업무<em class="require">*</em></th>
              <td><c:out value="${result.faq_job}" /></td>
            </tr>
            <tr>
              <th>담당부서<em class="require">*</em></th>
              <td><c:out value="${result.faq_part}" /></td>
              <th>담당자<em class="require">*</em></th>
              <td><c:out value="${result.faq_manager}" /></td>
            </tr>
            <tr>
              <td colspan="4" class="none" style="height: 20px;"></td>
            </tr>
            <tr>
              <th>내용<em class="require">*</em></th>
              <td colspan="3">
				<c:out value="${result.faq_cn}" escapeXml="true" />
              </td>
            </tr>
            <tr>
              <td colspan="4" class="none" style="height: 20px;"></td>
            </tr>
            <tr>
              <th>첨부파일<em class="require">*</em></th>
              <td colspan="3">
              	<c:import url="/cmm/fms/selectKicpaFileInfs.do" charEncoding="utf-8">
	               <c:param name="param_atchFileId" value="${result.atch_file_id}" />
	            </c:import>
              
                <!-- <span class="file">aaaaaa.png</span> <button type="button" class="line-button inline">다운로드</button> <button type="button" class="line-button inline">미리보기</button> -->
              </td>
            </tr>
            <!-- <tr>
              <td colspan="3">
                <span class="file">aaaaaa.png</span> <button type="button" class="line-button inline">다운로드</button> <button type="button" class="line-button inline">미리보기</button>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>

      <div class="table-buttons">
        <div class="left">
        	<c:if test="${!empty result.pre_id }">
        	<a href="<c:url value='/kicpa/faq/faqDetail.do?faq_id=${result.pre_id}&pageIndex=${searchVO.pageIndex}'/>" class="round-button type2">이전</a>
        	</c:if>
        </div>
        <div class="right">
        	<a href="<c:url value='/kicpa/faq/faqList.do?pageIndex=${searchVO.pageIndex}'/>" class="round-button type2">목록으로</a>
        	<c:if test="${!empty result.next_id }">
        	<a href="<c:url value='/kicpa/faq/faqDetail.do?faq_id=${result.next_id}&pageIndex=${searchVO.pageIndex}'/>" class="round-button type2">다음</a>
        	</c:if>
        </div>
      </div>
    </div>

    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>