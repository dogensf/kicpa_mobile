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
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script type="text/javascript">

$(document).ready(function() {
	
	window.open('${rt.linkUrl}')
});	


</script>
<style>

.btn {
			background-color: #87CEEB;
			padding: 15px 30px;
			margin: 2px;
			border: none;
			color: black;
			text-align: center;
			text-decoration: none;
			font-size: 16px;
			display: inline-block;
			cursor: pointer;
			-webkit-transition-duration: 0.4s;
			transition-duration: 0.4s;
			width:100%;
		}
		.btn1:hover, .btn2:hover, .btn3:hover, .btn4:hover {
			background-color: #4169E1;
			color: white;
		}
</style>
</head>
<body>
<button type="button" class="btn btn1" onclick="$('#frm').submit();">납부 후 완료버튼</button>

  <form name="frm" method="post" action="/kicpa/dues/selectPaymentResult.do">
  	<input type="hidden" name="org_tran_id" value="${rt.org_tran_id}">  
  </form>
</body>
</html>