<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-15
  Time: 오후 4:39
  To change this template use File | Settings | File Templates.
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
    <title>MYPAGE</title>
    <!-- css :: Start -->
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/jquery-ui.min.css"/>" />
    <!-- css :: End -->

    <!-- script :: Start -->
    <script src="<c:url value='/'/>js/jquery.min.js"></script>
    <script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
    <!-- script :: End -->


    <script>
        $(document).ready(function() {
            window.opener.memberEventLogin.memberEvent_confirmSuccMove('', '${authResultDataName}');
            window.close();
        });

    </script>
</head>
<body>
<p><p><p><p>
    본인인증이 완료 되었습니다.<br>
${ sMessage }<br>
</body>
</html>
