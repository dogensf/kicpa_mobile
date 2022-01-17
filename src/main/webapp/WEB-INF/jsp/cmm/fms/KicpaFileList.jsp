<%--
  Class Name : FileList.jsp
  Description : 파일 목록화면(include)
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript">
<!--
    function fn_downFile(atchFileId, fileSn){
        window.open("<c:url value='/cmm/fms/FileDown.do?atchFileId="+atchFileId+"&fileSn="+fileSn+"'/>");
    }   
    
    function fn_deleteFile(atchFileId, fileSn) {
        forms = document.getElementsByTagName("form");

        for (var i = 0; i < forms.length; i++) {
            if (typeof(forms[i].atchFileId) != "undefined" &&
                    typeof(forms[i].fileSn) != "undefined" &&
                    typeof(forms[i].fileListCnt) != "undefined") {
                form = forms[i];
            }
        }
        //form = document.forms[0];
        form.atchFileId.value = atchFileId;
        form.fileSn.value = fileSn;
        form.action = "<c:url value='/cmm/fms/deleteFileInfs.do'/>";
        form.submit();
    }
    
    function fn_check_file(flag) {
        if (flag=="Y") {
            document.getElementById('file_upload_posbl').style.display = "block";
            document.getElementById('file_upload_imposbl').style.display = "none";          
        } else {
            document.getElementById('file_upload_posbl').style.display = "none";
            document.getElementById('file_upload_imposbl').style.display = "block";
        }
    }
//-->    
</script>

<input type="hidden" name="atchFileId" value="${atchFileId}">
<input type="hidden" name="fileSn" >
<input type="hidden" name="fileListCnt" value="${fileListCnt}">
<c:forEach var="fileVO" items="${fileList}" varStatus="status">
	<span class="file"><c:out value="${fileVO.orignlFileNm}"/>&nbsp;[<c:out value="${fileVO.fileMg}"/>&nbsp;byte]</span> <button type="button" onclick="javascript:fn_downFile('<c:out value="${fileVO.atchFileId}"/>','<c:out value="${fileVO.fileSn}"/>')" class="line-button inline">다운로드</button></br> 
	<!-- <button type="button" class="line-button inline">미리보기</button> -->
	

   <%-- <c:choose>
       <c:when test="${updateFlag=='Y'}">
           <c:out value="${fileVO.orignlFileNm}"/>&nbsp;[<c:out value="${fileVO.fileMg}"/>&nbsp;byte]
           <img  alt="파일 삭제" src="<c:url value='/images/btn/bu5_close.gif'/>" 
                width="19" height="18" onClick="fn_deleteFile('<c:out value="${fileVO.atchFileId}"/>','<c:out value="${fileVO.fileSn}"/>');" />
       </c:when>
       <c:otherwise>
           <a href="#LINK" onclick="javascript:fn_downFile('<c:out value="${fileVO.atchFileId}"/>','<c:out value="${fileVO.fileSn}"/>')">
           <c:out value="${fileVO.orignlFileNm}"/>&nbsp;[<c:out value="${fileVO.fileMg}"/>&nbsp;byte]
           </a>        
       </c:otherwise>
   </c:choose> --%>
</c:forEach>
<c:if test="${fn:length(fileList) == 0}">
</c:if>
      