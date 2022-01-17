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

    <div class="recruitment-print">
      <h2>이력서</h2>
      <div class="basic-info">
        <div class="left-info">
          <strong class="name">홍길동</strong>
          <span class="date">1990.01.01</span>
          <div class="pic">
            <img src="" alt="">
          </div>
        </div>
        <div class="right-info">
          <table>
            <tbody>
              <tr>
                <th>지원구분</th>
                <td>xxx부분</td>
                <th>현연봉</th>
                <td>9999</td>
                <th>희망연봉</th>
                <td>9999</td>
              </tr>
              <tr>
                <th>한자</th>
                <td colspan="2">洪吉同</td>
                <th>영어</th>
                <td colspan="2">Hong Gil Dong</td>
              </tr>
              <tr>
                <th>주소</th>
                <td colspan="5">
                  06294<br/>
                  서울특별시 강남구 언주로30길 56(도곡동, 타워팰리스)<br/>
                  타워팰리스 XXXX동 XXXX호 
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td colspan="5">
                  aaaaa@gmail.com
                </td>
              </tr>
              <tr>
                <th class="two">휴대폰<br/>전화번호</th>
                <td colspan="2">010-0000-0000</td>
                <th class="two">자택<br/>전화번호</th>
                <td colspan="2">02-000-0000</td>
              </tr>
              <tr>
                <th>취미</th>
                <td colspan="2">블라블라</td>
                <th>특기</th>
                <td colspan="2">블라 블라</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="basic-info2">
        <div class="title">병역사항</div>
        <table>
          <thead>
            <tr>
              <th>군필여부</th>
              <th>병과</th>
              <th>계급</th>
              <th>복무기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>만기제대</td>
              <td>포병</td>
              <td>병장</td>
              <td>yyyy-dd-mm ~ yyyy-dd-mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">학력사항</div>
        <table>
          <thead>
            <tr>
              <th>학력선택</th>
              <th>재학상태</th>
              <th>학교</th>
              <th>학과</th>
              <th>입학년월</th>
              <th>졸업년월</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>고등학교</td>
              <td>졸업</td>
              <td>xxxx 고등학교</td>
              <td></td>
              <td>yyyy-mm</td>
              <td>yyyy-mm</td>
            </tr>
            <tr>
              <td>대학교</td>
              <td>졸업</td>
              <td>xxxx 대학교</td>
              <td>xxxx학과</td>
              <td>yyyy-mm</td>
              <td>yyyy-mm</td>
            </tr>
            <tr>
              <td>대학원(석학)</td>
              <td>졸업</td>
              <td>xxxx 대학교</td>
              <td>xxx학과</td>
              <td>yyyy-mm</td>
              <td>yyyy-mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">경력사항 (경력신입) <span>MM년 MM개월</span></div>
        <table>
          <thead>
            <tr>
              <th>근무기간</th>
              <th>직장명</th>
              <th>최종직위</th>
              <th>담당업무</th>
              <th>이직사유</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>yyyy-mm ~ yyyy-mm</td>
              <td>xxxx 전자</td>
              <td>사원</td>
              <td>회계</td>
              <td>이직</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">어학</div>
        <table>
          <thead>
            <tr>
              <th>시험종류</th>
              <th>점수/등급</th>
              <th>취득일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TOEIC</td>
              <td>760 / B</td>
              <td>yyyy-dd-mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">자격(면허)</div>
        <table>
          <thead>
            <tr>
              <th>종류</th>
              <th>자격(면허)번호</th>
              <th>발행처</th>
              <th>취득일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>운전면허증</td>
              <td>xxxx-xx-xx-xx</td>
              <td>도로교통공단</td>
              <td>yyyy-dd-mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">상훈</div>
        <table>
          <tbody>
            <tr>
              <td class="solo">상훈 대상자</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">보훈</div>
        <table>
          <tbody>
            <tr>
              <td class="solo">보훈 대상자</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">장애</div>
        <table>
          <thead>
            <tr>
              <th>장애등급</th>
              <th>장애종류</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1급1호</td>
              <td>시력 0.02</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">직무에 대한 이해 및 응시취지</div>
        <table>
          <tbody>
            <tr>
              <td class="long">할지니, 노년에게서 이상을 너의 가지에 구하지 듣는다. 무엇을 그들은 커다란 끓는 않는 위하여 같이, 운다. 불어 무엇이 가지에 지혜는 품었기 때문이다. 우리의 뜨고, 인생의 이것이다. 장식하는 심장의 천하를 꽃이 청춘 말이다. 하였으며, 두손을 찬미를 사는가 구할 있음으로써 것이다. 심장의 아니더면, 가는 미인을 우리 그림자는 것이다. 듣기만 만물은 너의 온갖 뼈 대한 실로 듣는다. 보내는 구하기 자신과 피는 굳세게 어디 이상 무엇을 그들은 위하여서. 가치를 심장의 살 뜨거운지라, 있는가? 기쁘며, 것은 새 피어나는 것은 품었기 현저하게 있다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="basic-info2">
        <div class="title">자기소개서</div>
        <table>
          <tbody>
            <tr>
              <td class="long">끓는 넣는 튼튼하며, 못할 것이다. 꽃이 굳세게 든 어디 그들의 칼이다. 웅대한 평화스러운 뭇 자신과 운다. 이상은 위하여, 얼음과 옷을 오아이스도 커다란 생명을 아니다. 오직 되려니와, 피가 예수는 인간에 시들어 뜨거운지라, 부패뿐이다. 피고, 무엇이 사람은 청춘 기관과 뜨고, 위하여 것이다. 끓는 기관과 청춘은 있으며, 그들의 살 대중을 얼마나 것이다. 그들의 동산에는 아니한 청춘 아름답고 속에서 있으며, 주는 내려온 듣는다. 작고 광야에서 그와 이 보이는 천자만홍이 청춘의 인간은 있다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>