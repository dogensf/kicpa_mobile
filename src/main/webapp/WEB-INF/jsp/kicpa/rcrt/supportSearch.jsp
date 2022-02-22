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
      <p>아직 작성하지 않으신 분들은 지원서를 먼저 등록하세요.</p>
      <a href="<c:url value='/kicpa/rcrt/support.do'/>">지원서 등록</a>
    </div>

    <div class="recruitment-content">
      <h2>임시저장 이력서 불러오기</h2>
      
      <div class="responsive-form-box" style="width: 450px;">
        <ul>
          <li class="block">
            <div class="input-group required active">
              <label for="a1">성명</label>
              <span class="input">
                <input type="text" id="a1" placeholder="이름을 입력하세요." />
              </span>
            </div>
            <div class="messages">
              <p class="required-message">성명을 등록하세요.</p>
            </div>
          </li>
          <li class="block">
            <div class="input-group required">
              <label for="a2">이메일 주소</label>
              <span class="input"><input type="text" id="a2" placeholder="이메일 주소를 등록하세요." /></span>
            </div>
            <div class="messages">
              <p class="required-message">이메일 주소를 등록하세요.</p>
            </div>
          </li>
          <li class="block">
            <div class="input-group required error">
              <label for="a3">비밀번호</label>
              <span class="input"><input type="text" id="a3" placeholder="비밀번호를 입력하세요." /></span>
            </div>
            <div class="messages">
              <p class="required-message">비밀번호를 입력하세요.</p>
              <p class="message">비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하세요.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="recruitment-buttons">
        <a href="javascript:$('.recruitment-layer').show();" style="width: 300px;">조회</a>
      </div>
    </div>
    
    
    <div class="recruitment-layer">
      <div class="inner">
        <h1>지원상태</h1>
        
        <div class="content">
          <table>
            <colgroup>
              <col style="width: 42px;" />
              <col style="width: 165px;" />
              <col style="width: 190px;" />
              <col style="width: 203px;" />
            </colgroup>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>등록일자</th>
                <th>지원상태</th>
                <th>지원결과</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="4" class="scroll-box">
                  <table>
                    <colgroup>
                      <col style="width: 42px;" />
                      <col style="width: 165px;" />
                      <col style="width: 190px;" />
                      <col style="width: 203px;" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td><span class="checkbox-type1 green"><input type="checkbox" id="s1" /><label for="s1">&nbsp;</label></span></td>
                        <td>yyyy-dd-mm</td>
                        <td>미제출</td>
                        <td>-</td>
                      </tr>
                      <tr class="active">
                        <td><span class="checkbox-type1 green"><input type="checkbox" id="s2" /><label for="s2">&nbsp;</label></span></td>
                        <td>yyyy-dd-mm</td>
                        <td>제출</td>
                        <td>합격</td>
                      </tr>
                      <tr>
                        <td><span class="checkbox-type1 green"><input type="checkbox" id="s3" /><label for="s3">&nbsp;</label></span></td>
                        <td>yyyy-dd-mm</td>
                        <td>제출</td>
                        <td>불합격</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="buttons">
          <div class="button full short" style="width: 226px;">
            <a href="javascript:$('.recruitment-layer').hide();" class="button">불러오기</a>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</body>
</html>