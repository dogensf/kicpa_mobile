<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<script>
$(document).ready(function(){
	alert("${token}");
	$('#cyberKicpa')[0].submit();
});

</script>
<form id="cyberKicpa" method="post" action="https://cyber.kicpa.or.kr/login/login" enctype="application/x-www-form-urlencoded" accept-charset="utf-8">
	<input type="hidden" name="token" value="${token}">
	<input type="hidden" name="login_id" value="token">
	<input type="hidden" name="login_pwd" value="token">
</form>
