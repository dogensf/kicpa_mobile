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
            // DI 일치 여부는 서버에서 판정(authMatch). 민감값(CI/DI)은 화면에 내려보내지 않는다.
            if ('${authMatch}' == 'Y') {
                window.opener.selectDuesList_duesDetailConfirmSuccMove();
            } else {
                alert('회원정보가 일치하지 않습니다.');
            }
            self.close();
        });
    </script>
</head>
<body>
<p><p><p><p>
    본인인증이 완료 되었습니다.<br>
${ sMessage }<br>
</body>
</html>
