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
<link href="<c:url value='/'/>css/kicpa/myp/mypCpaTrainRegMove.css" rel="stylesheet" type="text/css" />
<!-- css :: End -->

<!-- script :: Start -->
<script src="<c:url value='/'/>js/jquery.min.js"></script>
<script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
<script src="<c:url value='/'/>js/kicpa/stringHelper.js?ver=2"></script>
<script src="<c:url value='/'/>js/kicpa/myp/mypCpaTrainRegMove.js?ver=2"></script>
<script src="<c:url value='/'/>js/KicpaCommon.js?ver=2"></script>
<!-- script :: End -->
</head>
<body>
<div class="kicpa-layer-content">
    <div class="application">
        <h1>수습공인회계사 등록신청</h1>
        <h2>수습공인회계사 등록신청을 이어서 신청하시겠습니까? <br/>지금 신청하지 않으셔도 마이페이지에서 신청이 가능합니다. </h2>
        <div class="application-menu">
            <ul>
                <li>
                    <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaTrainReg.do?pin=${mypCpaPin}">
                        <strong>수습공인회계사 등록신청 시작</strong>
                        수습공인회계사 등록신청을<br/>진행하겠습니다.
                    </a>
                </li>
                <li>
                    <a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaPin}">
                        <strong>마이페이지 이동</strong>
                        아니오 <br/>나중에 신청을 진행하겠습니다.
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <button type="button" class="close" onclick="javascript:parent.ClosePage()">close</button>
</div>
</body>
</html>
