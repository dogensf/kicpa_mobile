<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<%@ page import ="javax.servlet.http.Cookie" %>
<%@ page import ="javax.servlet.http.HttpServletResponse" %>
<script>
    $(document).ready(function(){
        window.bridge.displayBottom(true);
    });


function fncLocation(){
/* 	//location.href="/kicpa/main/main.do";
<c:choose>
	<c:when test="${views eq 'home'}">
		location.href="javascript:windows.history.back();";
	</c:when>
	<c:otherwise>
		location.href="/kicpa/main/main.do";
	</c:otherwise>
</c:choose> */

	$('#appExit').addClass("show");

}



</script>


<div class="container">
      <section class="head-main line">
        <h1>회원상담</h1>
        <%
		    Cookie cookie = new Cookie("returnUrl", "/kicpa/myp/faqQnaCategory.do");
			cookie.setPath("/");
			cookie.setMaxAge(60*15);
			response.addCookie(cookie);
        
        	
	        LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
	        if(loginVO == null){
	        %>
	        <button class="btn-login" onclick="location.href='<c:url value='/uat/uia/LoginUsr.do'/>';" type="button">
	     	 로그인
	    	</button>
		  	<%
	        }else{
		  	%>
		  	<button class="btn-login" onclick="javascript:logOut();" type="button">
	     	 로그아웃
	    	</button>
	            
		  	<%
		  	}
	        %>

          <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">
            카테고리
          </button>
      </section>

      <section class="content">
        <ul class="list-wrap main">
            <li>
              <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/faq/faqList.do';">
                <span>FAQ</span>
              </button>
              <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/qna/qnaList.do';">
                <span>문의접수</span>
              </button>
            </li>
        </ul>
      </section>

    </div>

