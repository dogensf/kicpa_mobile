<%--
  Class Name : paymentLink.jsp
  Description : LINK 결제 페이지
  Modification Information
 
        수정일             수정자                   수정내용
    -------    --------    ---------------------------     
    2021.11.01   KIK          최초 생성
    
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ImgUrl" value="/images/"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회비관리_회비결제</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script type="text/javascript">

	var popupX = (window.screen.width / 2) - (700 / 2);
	var popupY= (window.screen.height /3) - (500 / 2);

	var uri = '${rt.linkUrl}';
	var popupName = "회비 결제";
	var options = 'status=no, height=700, width=700, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY;	 

	var openDialog = function(uri, name, options, closeCallback) {
	        var win = window.open(uri, name, options);
	        var interval = window.setInterval(function() {
	            try {
	                if (win == null || win.closed) {
	                    window.clearInterval(interval);
	                    closeCallback(win);
	                }
	                win.focus();
	            }
	            catch (e) {
	            }
	        }, 500);
	        return win ;
	    };
	function popOpen() {
	    openDialog(uri, popupName, options, function(win) {
	    	alert("팝업 닫힘");
	    });
	}


$(document).ready(function() {
/* 	var popup = window.open("${rt.linkUrl}","회비 결제", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=700, height=700, left=0, top=0" );
	popup.onbeforeunload = function() {
		alert("팝업 닫힘");
	}; */
});	


</script>
</head>
<body onload="popOpen();">
  <form name="frm" method="post" action="/kicpa/dues/selectPaymentResult.do">  	
  	<input type="hidden" name="org_tran_id" value="${rt.org_tran_id}">  
  </form>
</body>
</html>