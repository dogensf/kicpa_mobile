<%--
  Class Name : selectDuesList.jsp
  Description : 회비 조회
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
<title>회비관리_신규등록회비납부</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
</head>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">
        회비관리
        <div class="menu">
          <ul>            
            <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>">회비 조회 / 납부</a></li>            
            <li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>" class="active">신규등록회비 납부</a></li>
            <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>">납부결과 조회</a></li>
          </ul>
        </div>
      </h1>

      <h2 class="my-page-sub-title">신규등록회비 납부</h2>

      <div class="basic-table-sort">
        <dl>
          <dt>total</dt>
          <dd class="count">100개</dd>
          <dd class="button">
            <button type="button" class="line-button inline">엑셀등록</button>
          </dd>
          <dd class="button">
            <button type="button" class="line-button full inline">엑셀양식 다운로드</button>
          </dd>
        </dl>
        <div class="util-buttons">
          <button type="button" class="line-button inline">추가</button>
          <button type="button" class="line-button inline">삭제</button>
        </div>
      </div>
      <div class="basic-table">
        <table class="tb-bg">
          <colgroup>
            <col style="width: 40px;" />
            <col style="width: 40px;" />
            <col style="width: 230px;" />
            <col style="width: 237px;" />
            <col style="width: 301px;" />
            <col style="width: auto;" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th><span class="line-checkbox solo"><input type="checkbox" id="all"><label for="all">&nbsp;</label></span></th>
              <th>수습회계사 번호</th>
              <th>이름</th>
              <th>등록날짜</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td><span class="line-checkbox solo"><input type="checkbox" id="a1"><label for="a1">&nbsp;</label></span></td>
              <td><span class="compact-input"><input type="text" placeholder="번호를 입력하세요"></span></td>
              <td><span class="compact-input"><input type="text" placeholder="이름을 등록하세요"></span></td>
              <td><span class="compact-input cal"><input type="text" placeholder="선택하세요"><button type="button">calendar</button></span></td>
              <td></td>
            </tr>
            <tr>
              <td>99</td>
              <td><span class="line-checkbox solo"><input type="checkbox" id="a2"><label for="a2">&nbsp;</label></span></td>
              <td>xxxxxxx</td>
              <td>홍길동</td>
              <td>yyyy-dd-mm</td>
              <td>365,000원</td>
            </tr>
            <tr>
              <td>99</td>
              <td><span class="line-checkbox solo"><input type="checkbox" id="a3"><label for="a3">&nbsp;</label></span></td>
              <td>xxxxxxx</td>
              <td>홍길동</td>
              <td>yyyy-dd-mm</td>
              <td><span class="status-text success">납부완료 상태</span></td>
            </tr>
            <tr>
              <td>99</td>
              <td><span class="line-checkbox solo"><input type="checkbox" id="a4"><label for="a4">&nbsp;</label></span></td>
              <td>xxxxxxx</td>
              <td>홍길동</td>
              <td>yyyy-dd-mm</td>
              <td><span class="status-text error">이름 번호 불일치</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="result-box">
        <div class="info-text">
          <strong>KICPA 한국공인회계사회</strong>
          <p>
            (03736) 서울특별시 서대문구 충정로7길 12 (충정로 2가)<br />
            사업자등록번호 102-82-02601
          </p>
        </div>
        <div class="payment">
          <span>결제금액</span>
          <button type="button">3,909,000원 결제</button>
        </div>
      </div>
    </div>

<div class="kicpa-modal">
    <div class="modal-inner">
      <div class="modal-title">수습회계사 추가</div>
      <div class="modal-form">
        <div class="modal-form-inner">
          <span class="modal-input" style="width: 450px;"><input type="text" placeholder="회원명, 수습회계사 번호"></span>
        </div>
        <button type="button">검색</button>
      </div>
      <div class="modal-result">
        <table>
          <colgroup>
            <col style="width: 200px;" />
            <col style="width:;" />
          </colgroup>
          <thead>
            <tr>
              <th>회원명</th>
              <th>기관수습회계사 번호명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2" class="result-td">
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-buttons">
          <button type="button" class="small-round-button type4">선택</button>
          <button type="button" onclick="javascript:$('.kicpa-modal').hide();" class="small-round-button type2">취소</button>
      </div>
    </div>
  </div> 


    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>