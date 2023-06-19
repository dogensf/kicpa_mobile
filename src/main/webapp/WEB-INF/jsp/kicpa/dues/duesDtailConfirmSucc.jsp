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
            window.opener.selectDuesList_duesDetailConfirmSuccMove('${sDupInfo}');
            self.close();
        });
    </script>
</head>
<body>
<p><p><p><p>
    본인인증이 완료 되었습니다.<br>
<table border=1 style="display: none;">
    <tr>
        <td>복호화한 시간</td>
        <td>${ sCipherTime } (YYMMDDHHMMSS)</td>
    </tr>
    <tr>
        <td>요청 번호</td>
        <td>${ sRequestNumber }</td>
    </tr>
    <tr>
        <td>NICE응답 번호</td>
        <td>${ sResponseNumber }</td>
    </tr>
    <tr>
        <td>인증수단</td>
        <td>${ sAuthType }</td>
    </tr>
    <tr>
        <td>성명</td>
        <td>${ sName }</td>
    </tr>
    <tr>
        <td>중복가입 확인값(DI)</td>
        <td>${ sDupInfo }</td>
    </tr>
    <tr>
        <td>연계정보 확인값(CI)</td>
        <td>${ sConnInfo }</td>
    </tr>
    <tr>
        <td>생년월일(YYYYMMDD)</td>
        <td>${ sBirthDate }</td>
    </tr>
    <tr>
        <td>성별</td>
        <td>${ sGender }</td>
    </tr>
    <tr>
        <td>내/외국인정보</td>
        <td>${ sNationalInfo }</td>
    </tr>
    </tr>
    <td>휴대폰번호</td>
    <td>${ sMobileNo }</td>
    </tr>
    <tr>
        <td>통신사</td>
        <td>${ sMobileCo }</td>
    </tr>
    <tr>
        <td colspan="2">인증 후 결과값은 내부 설정에 따른 값만 리턴받으실 수 있습니다. <br>
            일부 결과값이 null로 리턴되는 경우 관리담당자 또는 계약부서(02-2122-4615)로 문의바랍니다.</td>
    </tr>
</table><br><br>
${ sMessage }<br>
</body>
</html>
