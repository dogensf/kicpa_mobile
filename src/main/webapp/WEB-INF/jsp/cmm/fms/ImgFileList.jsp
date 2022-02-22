<%--
  Class Name : ImgFileList.jsp
  Description : 이미지 파일 조회화면(include)
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
    <table>
        <c:forEach var="fileVO" items="${fileList}" varStatus="status">
          <tr>
            <td></td>
          </tr>                     
          <tr>
           <td>
                <img src='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${fileVO.atchFileId}"/>&fileSn=<c:out value="${fileVO.fileSn}"/>'  width="640" alt="파일보기링크" />
           </td>
          </tr>
          <tr>
            <td></td>
          </tr>  
        </c:forEach>
      </table>
