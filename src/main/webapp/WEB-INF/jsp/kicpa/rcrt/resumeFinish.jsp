<%--
  Class Name : resume.jsp
  Description : 지원서 
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
<title>지원서 작성 완료</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
</head>
<body>
  <div class="kicpa-layer-content bg">
    <div class="recruitment-header">
        <h1>
          <a href="">
            <span>KICPA 한국공인회계사회<br/>홈페이지 이동</span>
          </a>
        </h1>
    </div>

    <div class="recruitment-content">
      <div class="recruitment-success">
        <h2 class="message">입사지원서가 <br/>성공적으로 등록했습니다.</h2>
        <p class="noti">귀하의 이력서가 등록되었습니다.</p>
        <dl class="date">
          <dt>이력서 등록일</dt>
          <dd>YYYY-MM-DD</dd>
        </dl>
        <a href="" class="link">이력서 보기</a>
        <p class="saying">이것은 날카로우나 가지에 이것이다.<br/>끓는 황금시대를 모래뿐일 보이는 오직 얼음에 얼음 힘차게 그리하였는가?</p>
      </div>
    </div>
  </div>
</body>
</html>