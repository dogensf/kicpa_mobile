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
<title>문의 처리 결과 상세보기</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
</head>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2"><a href="<c:url value='/kicpa/qna/qnaResult.do?pageIndex='/>${searchVO.pageIndex}">목록으로</a></h1>

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
              <td><c:out value="${result.category }"/></td>
              <th>해당업무</th>
              <td><c:out value="${result.job }"/></td>
            </tr>
            <tr>
              <th>담당부서</th>
              <td><c:out value="${result.depart }"/></td>
              <th>민원처리상태</th>
              <td ><c:out value="${result.status }"/></td>
              <%-- <th>담당자</th>
              <td><c:out value="${result.manager }"/></td> --%>
            </tr>            
            <tr>
              <td colspan="4" class="none" style="height: 20px;"></td>
            </tr>
            <tr>
              <th>제목</th>
              <td colspan="3"><c:out value="${result.qna_sj}"/></td>
            </tr>
            <tr>
              <td colspan="4" class="none" style="height: 20px;"></td>
            </tr>
            <tr>
              <th>내용</th>
              <td colspan="3">
              	<span class="textarea white">
                  <textarea name="qna_cn" id="qna_cn" cols="30" rows="10" readonly><c:out value="${result.qna_cn}" escapeXml="false"/></textarea>
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="none" style="height: 20px;"></td>
            </tr>
            <c:if test="${!empty result.atch_file_id}">
            <tr>
              <th rowspan="2">첨부파일</th>
              <td colspan="3">
              	<c:import url="/cmm/fms/selectKicpaFileInfs.do" charEncoding="utf-8">
                    <c:param name="param_atchFileId" value="${result.atch_file_id}" />
                </c:import>
                <!-- <span class="file">aaaaaa.png</span> <button type="button" class="line-button inline">다운로드</button> <button type="button" class="line-button inline">미리보기</button></br>
                <span class="file">aaaaaa.png</span> <button type="button" class="line-button inline">다운로드</button> <button type="button" class="line-button inline">미리보기</button> -->
              </td>
            </tr>
            </c:if>
            <!-- <tr>
              <td colspan="3">
                <span class="file">aaaaaa.png</span> <button type="button" class="line-button inline">다운로드</button> <button type="button" class="line-button inline">미리보기</button>
              </td>
            </tr> -->
            <c:if test="${!empty result.answer_ty}">
	            <tr>
	              <th>답변유형</th>
	              <td colspan="3">
	                <div class="answer-types">
	                  <span class="check nan">
	                    <input type="checkbox" id="a-1" <c:if test="${result.answer_ty eq '1'}">checked</c:if> disabled>
	                    <label for="a-1">온라인 대응</label>
	                  </span>
	                  <span class="check nan">
	                    <input type="checkbox" id="a-2" <c:if test="${result.answer_ty eq '2'}">checked</c:if> disabled>
	                    <label for="a-2">유선대응</label>
	                  </span>
	                  <span class="check nan">
	                    <input type="checkbox" id="a-3" <c:if test="${result.answer_ty eq '3'}">checked</c:if> disabled>
	                    <label for="a-3">원격지원</label>
	                  </span>
	                </div>
	              </td>
	            </tr>
	         
	            <tr>
	              <th>답변내용</th>
	              <td colspan="3">
	              	<c:out value="${result.answer_cn}"/>
	              </td>
	            </tr>
	           <!--  <tr>
	              <th>답변내용 평가</th>
	              <td colspan="3">
	                <div class="rating">
	                  <ul>
	                    <li class="star"><span class="star-active" style="width: 100%;"></span></li>
	                    <li class="star"><span class="star-active" style="width: 50%;"></span></li>
	                  </ul>
	                  <span class="point">(5.0/5.0)</span>
	                </div>
	                <button type="button" class="line-button inline">저장</button>
	              </td>
	            </tr> -->
	          </c:if>  
          </tbody>
        </table>
      </div>
        ※ 회원 업무 관련 문의는 회원서비스센터 (02-3149-0171), 시스템 관련 문의는 지식관리센터 (02-3149-0225) 으로 문의주시기 바랍니다.
      <div class="table-buttons">
        <div class="center">
          <a href="<c:url value='/kicpa/qna/qnaResult.do?pageIndex='/>${searchVO.pageIndex}" class="round-button type2">목록으로</a>
        </div>
      </div>
    </div>

    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>