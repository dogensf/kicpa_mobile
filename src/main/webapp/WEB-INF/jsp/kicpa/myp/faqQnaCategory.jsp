<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<script>
function fncLocation(){
	//location.href="/kicpa/main/main.do";
<c:choose>
	<c:when test="${views eq 'home'}">
		location.href="javascript:windows.history.back();";
	</c:when>
	<c:otherwise>
		location.href="/kicpa/main/main.do";
	</c:otherwise>
</c:choose>
	
}



</script>
<section class="head-sub">
    <button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>회원상담</h3>
</section>

<section class="content">

    <ul class="list-wrap">
        <li>
          <h4></h4>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/faq/faqList.do';">
            <span>FAQ</span>
          </button>     
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/qna/qnaList.do';">
            <span>문의접수</span>
          </button>
          
        </li>
    </ul>
</section>