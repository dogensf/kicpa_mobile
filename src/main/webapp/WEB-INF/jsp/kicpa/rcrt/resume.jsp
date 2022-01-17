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
<title>지원서 작성하기</title>

<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
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
      <h2>지원서 작성하기</h2>
      
      <div class="recruitment-form-title">
        지원사항
        <span class="required">필수입력 </span>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required active">
                  <label for="a1">지원구분</label>
                  <span class="select">
                    <select name="" id="">
                      <option value="0">선택하세요</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">지원구분을 선택 하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a2">현연봉</label>
                  <span class="input"><input type="text" id="a2" placeholder="백만단위로 작성하세요 예 ) 2300" /></span>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a3">희망연봉</label>
                  <span class="input"><input type="text" id="a3" placeholder="백만단위로 작성하세요 예 ) 2300" /></span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        기본 인적사항
        <span class="required">필수입력 </span>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <div class="input-group required">
              <label>사진첨부</label>
              <div class="recruitment-pic">
                <div class="left">
                  <div class="pic-area">

                  </div>
                  <label for="file_selection" class="file_selection">
                    사진선택
                    <input id="file_selection" type="file" name="file" accept="image/*" />
                  </label>
                </div>
                <div class="right">
                  <ul>
                    <li>- 최근 3개월 이내</li>
                    <li>- 권장이미지 : 94.4PX  x 113.3 PX </li>
                    <li>- 2M 이하</li>
                    <li>- GIF, PNG, JPG (JPEG) </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="messages">
              <p class="required-message">사진을 등록해 주세요.</p>
            </div>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a4">성명</label>
                  <span class="input"><input type="text" id="a4" placeholder="성명를 등록하세요." /></span>
                </div>
                <div class="messages">
                  <p class="required-message">성명을 선택 하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a5">성명(한자)</label>
                  <span class="input"><input type="text" id="a5" placeholder="한자를 등록하세요." /></span>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a6">성명(영어)</label>
                  <span class="input"><input type="text" id="a6" placeholder="영어를 등록하세요." /></span>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a7">생년월일</label>
                  <span class="input cal">
                    <input type="text" id="a7" placeholder="날짜를 입력하세요.">
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">생년월일을 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <div class="input-group required">
              <label for="a8">주소</label>
              <div class="addr">
                <span class="input readonly mix">
                  <input type="text" id="a8-1" placeholder="" readonly>
                  <button type="button">검색</button>
                </span>
                <span class="input readonly">
                  <input type="text" id="a8-2" placeholder="주소를 입력하세요." readonly>
                </span>
                <span class="input">
                  <input type="text" id="a8-3" placeholder="상세주소를 입력하세요.">
                </span>
              </div>
            </div>
            <div class="messages">
              <p class="required-message">주소를 입력하세요.</p>
            </div>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a9">휴대폰 번호</label>
                  <span class="input"><input type="text" id="a9" placeholder="휴대폰 번호를 등록하세요." /></span>
                </div>
                <div class="messages">
                  <p class="required-message">휴대폰번호를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a10">자택 번호</label>
                  <span class="input"><input type="text" id="a10" placeholder="자택 번호를 등록하세요." /></span>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a11">Email</label>
                  <span class="input"><input type="text" id="a11" placeholder="Email를 등록하세요." /></span>
                </div>
                <div class="messages">
                  <p class="required-message">Email를 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group">
                  <label for="a12">취미</label>
                  <span class="input"><input type="text" id="a12" placeholder="취미를 등록하세요." /></span>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a13">특기</label>
                  <span class="input"><input type="text" id="a13" placeholder="특기를 등록하세요." /></span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        병역사항
        <span class="required">필수입력 </span>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a14">군필여부</label>
                  <span class="select">
                    <select name="" id="a14">
                      <option value="0">선택하세요.</option>
                      <option value="1">해당사항 없음</option>
                      <option value="2">면제</option>
                      <option value="3">만기제대</option>
                      <option value="4">병역특례복무만료</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">군필여부를 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a15">면제사유</label>
                  <span class="input"><input type="text" id="a15" placeholder="면제사유를 입력하세요." /></span>
                </div>
                <div class="messages">
                  <p class="required-message">면제사유를 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a16">병과</label>
                  <span class="input"><input type="text" id="a16" placeholder="병과를 입력하세요." /></span>
                </div>
                <div class="messages">
                  <p class="required-message">병과를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a17">계급</label>
                  <span class="input"><input type="text" id="a17" placeholder="계급을 입력하세요." /></span>
                </div>
                <div class="messages">
                  <p class="required-message">계급을 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a18">복무기간</label>
                  <span class="input cal">
                    <input type="text" id="a18" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">복무기간을 모두 입력하세요.</p>
                </div>
              </li>
              <li class="cal-middle-icon">~</li>
              <li class="short">
                <div class="input-group">
                  <label class="hidden">&nbsp;</label>
                  <span class="input cal">
                    <input type="text" id="a19" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        학력사항
        <span class="required">필수입력 </span>
        <p>학력은 <em>고등학교부터</em> 순차적으로 기재하여 주시기 바랍니다.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a20">학력선택</label>
                  <span class="select">
                    <select name="" id="a20">
                      <option value="0">선택하세요</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학력을 선택하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a21">재학상태</label>
                  <span class="select">
                    <select name="" id="a21">
                      <option value="0">선택하세요</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">재학을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a22">학교</label>
                  <span class="input">
                    <input type="text" id="a22" placeholder="학교를 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학교를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a23">학과</label>
                  <span class="input">
                    <input type="text" id="a23" placeholder="학과를 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학과를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a24">학점</label>
                  <span class="input">
                    <input type="text" id="a24" placeholder="학점을 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학점을 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a25">입학년월</label>
                  <span class="input cal">
                    <input type="text" id="a25" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">입학년월를 입력하세요.</p>
                </div>
              </li>
              <li class="cal-middle-icon">~</li>
              <li class="short">
                <div class="input-group">
                  <label for="a26">졸업년월</label>
                  <span class="input cal">
                    <input type="text" id="a26" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">졸업년월를 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          
          
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a20">학력선택</label>
                  <span class="select">
                    <select name="" id="a20">
                      <option value="0">선택하세요</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학력을 선택하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a21">재학상태</label>
                  <span class="select">
                    <select name="" id="a21">
                      <option value="0">선택하세요</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">재학을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a22">학교</label>
                  <span class="input">
                    <input type="text" id="a22" placeholder="학교를 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학교를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a23">학과</label>
                  <span class="input">
                    <input type="text" id="a23" placeholder="학과를 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학과를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a24">학점</label>
                  <span class="input">
                    <input type="text" id="a24" placeholder="학점을 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">학점을 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a25">입학년월</label>
                  <span class="input cal">
                    <input type="text" id="a25" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">입학년월를 입력하세요.</p>
                </div>
              </li>
              <li class="cal-middle-icon">~</li>
              <li class="short">
                <div class="input-group">
                  <label for="a26">졸업년월</label>
                  <span class="input cal">
                    <input type="text" id="a26" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">졸업년월를 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          
          
          <li class="block">
            <button type="button" class="round-add">추가</button>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        경력사항
        <span class="required">필수입력 </span>
        <p>신입입사인 경우는 <em>신입</em>을 경력입사인 경우는 <em>경력</em>을 선택하세요.<br/>경력이 있는데 신입으로 입사인 경우 <em>경력있는 신입</em>을 선택하세요.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a27">입학구분년월</label>
                  <span class="select">
                    <select name="" id="a27">
                      <option value="0">선택하세요.</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">경력을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a28">근무기간</label>
                  <span class="input cal">
                    <input type="text" id="a28" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">근무기간을 입력하세요.</p>
                </div>
              </li>
              <li class="cal-middle-icon">~</li>
              <li class="short">
                <div class="input-group">
                  <label class="hidden">&nbsp;</label>
                  <span class="input cal">
                    <input type="text" id="a29" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a30">직장명</label>
                  <span class="input">
                    <input type="text" id="a30" placeholder="직장명을 입력하세요.">
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">직장명을 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a31">최종직위</label>
                  <span class="input">
                    <input type="text" id="a31" placeholder="최종직위을 입력하세요.">
                  </span>
                </div>
              </li>
              <li class="short">
                <div class="input-group">
                  <label for="a32">담당업무</label>
                  <span class="input">
                    <input type="text" id="a32" placeholder="담당업무을 입력하세요.">
                  </span>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <div class="input-group">
              <label for="a33">이직사유</label>
              <span class="input">
                <input type="text" id="a33" placeholder="이직사유를 입력하세요.">
              </span>
            </div>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group">
                  <label for="a34">총경력</label>
                  <span class="input">
                    <input type="text" id="a34" placeholder="총경력을 입력하세요.">
                  </span>
                </div>
              </li>
            </ul>
          </li>
          <li class="block"><button type="button" class="round-add">추가</button></li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        어학
        <span class="required">필수입력 </span>
        <p>취득하신 어학시험이 있으시면 <em>등록</em>을 없으시면 <em>없음</em>을 선택하세요.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a35">구분</label>
                  <span class="select">
                    <select name="" id="a35">
                      <option value="0">선택하세요.</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">어학구분을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a36">시험종류</label>
                  <span class="input">
                    <input type="text" id="a36" placeholder="시험종류를 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">시험종류를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a37">점수/등급</label>
                  <span class="input">
                    <input type="text" id="a37" placeholder="점수/등급을 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">점수/등급을 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a38">취득일</label>
                  <span class="input cal">
                    <input type="text" id="a38" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">calendar</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">취득일을 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block"><button type="button" class="round-add">추가</button></li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        자격(면허)
        <span class="required">필수입력 </span>
        <p>취득하신 자격(면허) 있으시면 <em>등록</em>을 없으시면 <em>없음</em>을 선택하세요.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a39">구분</label>
                  <span class="select">
                    <select name="" id="a39">
                      <option value="0">선택하세요.</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">자격구분을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a40">종류</label>
                  <span class="input">
                    <input type="text" id="a40" placeholder="시험종류를 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">시험종류를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a41">자격(면허)번호</label>
                  <span class="input">
                    <input type="text" id="a41" placeholder="자격(면허)번호를 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">자격(면허)번호를 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a42">발행처</label>
                  <span class="input">
                    <input type="text" id="a42" placeholder="발행처를 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">발행처를 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a43">취득일</label>
                  <span class="input cal">
                    <input type="text" id="a43" placeholder="YYYY–MM-DD" />
                    <button type="button" class="calendar-button">cal</button>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">취득일을 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block"><button type="button" class="round-add">추가</button></li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        상훈
        <span class="required">필수입력 </span>
        <p>상훈이 있으시면 <em>해당</em>을, 없으시면 <em>해당없음</em>을 선택하세요.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a44">상훈</label>
                  <span class="select">
                    <select name="" id="a44">
                      <option value="0">선택하세요.</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">상훈을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        보훈
        <span class="required">필수입력 </span>
        <p>보훈이 있으시면 <em>해당</em>을, 없으시면 <em>해당없음</em>을 선택하세요.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group required">
                  <label for="a45">보훈</label>
                  <span class="select">
                    <select name="" id="a45">
                      <option value="0">선택하세요.</option>
                    </select>
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">보훈을 선택하세요.</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        장애
        <span class="required">필수입력 </span>
        <p>장애가 있으시면 <em>해당</em>을, 없으시면 <em>해당없음</em>을 선택하세요.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <ul>
              <li class="middle">
                <div class="input-group">
                  <label for="a46">장애여부</label>
                  <span class="select">
                    <select name="" id="a46">
                      <option value="0">해당없음</option>
                      <option value="1">해당</option>
                    </select>
                  </span>
                </div>
              </li>
            </ul>
          </li>
          <li class="block">
            <ul>
              <li class="short">
                <div class="input-group required">
                  <label for="a47">장애등급</label>
                  <span class="input">
                    <input type="text" id="a47" placeholder="장애등급을 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">장애등급을 입력하세요.</p>
                </div>
              </li>
              <li class="short">
                <div class="input-group required">
                  <label for="a48">장애종류</label>
                  <span class="input">
                    <input type="text" id="a48" placeholder="장애종류를 입력하세요." />
                  </span>
                </div>
                <div class="messages">
                  <p class="required-message">장애종류를 입력하세요.</p>
                </div>
              </li>
            </ul>
          </li>
          <li class="block"><button type="button" class="round-add">추가</button></li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        직무에 대한 이해 및 응시취지<i>*</i>
        <span class="required">필수입력 </span>
        <p>신의 지식․경험․경력 등과 응시직위와의 관련성을 중심으로 응시직위에 대한 소견, 응시취지, 직무수행 방향 및 비전 등을 간단하게 기재하여 주십시오.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <span class="textarea white">
              <textarea name="" id="a49" cols="30" rows="10" placeholder="신의 지식․경험․경력 등과 응시직위와의 관련성을 중심으로 응시직위에 대한 소견, 응시취지, 직무수행 방향 및 비전 등을 간단하게 기재하여 주십시오."></textarea>
            </span>
          </li>
        </ul>
      </div>

      <div class="recruitment-form-title">
        자기소개서<i>*</i>
        <span class="required">필수입력 </span>
        <p>성장과정, 성격의 장단점, 지원동기, 지원부문과 관련된 주요경력 및 경험, 희망업무, 포부, 특기사항 등을 간략하게 기재하여 주십시오.</p>
      </div>
      <div class="responsive-form-box expansion">
        <ul>
          <li class="block">
            <span class="textarea white">
              <textarea name="" id="a50" cols="30" rows="10" placeholder="성장과정, 성격의 장단점, 지원동기, 지원부문과 관련된 주요경력 및 경험, 희망업무, 포부, 특기사항 등을 간략하게 기재하여 주십시오."></textarea>
            </span>
          </li>
        </ul>
      </div>

      <div class="recruitment-buttons multiple">
        <a href="javascript:$('.recruitment-save-layer').show();" style="width: 210px;">임시저장</a>
        <a href="" style="width: 210px;">취소</a>
        <a href="" style="width: 210px;">등록하기</a>
      </div>
    </div>
    
    <div class="recruitment-save-layer">
      <div class="inner">
        <h1> 임시저장상태입니다.</h1>
        
        <div class="text">
          지원하기 버튼을 클릭하셔야<br/>입사지원서를 최종제출하오니 꼭 제출하시기 바랍니다. 
        </div>

        <div class="buttons">
          <div class="button full short" style="width: 226px;">
            <a href="javascript:$('.recruitment-save-layer').hide();" class="button">확인</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>