<%--
  Class Name : support.jsp
  Description : 지원하기 
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
<title>KICPA 지원서</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/base.css'/>" />
<link rel="stylesheet" type="text/css" href="<c:url value='/css/kicpa.css'/>" />
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

    <div class="recruitment-noti">
      <p>작성중이던 지원서가 있으신가요?</p>
      <a href="<c:url value='/kicpa/rcrt/supportSearch.do'/>">임시저장 이력서 불러오기</a>
    </div>

    <div class="recruitment-content">
      <h2>지원서 등록</h2>
      
      <div class="responsive-form-box">
        <ul>
          <li>
            <div class="input-group required active">
              <label for="a1">성명</label>
              <span class="input">
                <input type="text" id="a1" placeholder="이름을 입력하세요." />
              </span>
            </div>
            <div class="messages">
              <p class="required-message">성명을 등록하세요.</p>
              <p class="message">입력하신 이름과 생년월일로 지원서를 등록합니다.</p>
            </div>
          </li>
          <li>
            <div class="input-group required">
              <label for="a2">이메일 주소</label>
              <span class="input"><input type="text" id="a2" placeholder="이메일 주소를 등록하세요." /></span>
            </div>
            <div class="messages">
              <p class="required-message">이메일 주소를 등록하세요.</p>
            </div>
          </li>
          <li>
            <div class="input-group required error">
              <label for="a3">비밀번호</label>
              <span class="input"><input type="text" id="a3" placeholder="비밀번호를 입력하세요." /></span>
            </div>
            <div class="messages">
              <p class="required-message">비밀번호를 입력하세요.</p>
              <p class="message">비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하세요.</p>
            </div>
          </li>
          <li>
            <div class="input-group required">
              <label for="a4">비밀번호 확인</label>
              <span class="input"><input type="text" id="a4" placeholder="비밀번호를 한번더 입력하세요." /></span>
            </div>
            <div class="messages">
              <p class="required-message">비밀번호를 한번 더 입력하세요.</p>
            </div>
          </li>
          <li class="block">
            <div class="input-group required">
              <label for="a5"> 지원자의 개인정보 수집 및 이용 제공 동의서 </label>
              <span class="textarea white">
                <textarea name="" id="" cols="30" rows="6"></textarea>
              </span>
            </div>
            <span class="checkbox-type1 green">
              <input type="checkbox" id="agreement">
              <label for="agreement">약관에 동의합니다.</label>
            </span>
            <div class="messages">
              <p class="required-message">약관동의를 선택해 주세요.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="recruitment-buttons">
        <a href="<c:url value='/kicpa/rcrt/resume.do'/>" style="width: 300px;">등록하기</a>
      </div>
    </div>
  </div>
</body>
</html>