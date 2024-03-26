<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!-- 하단 레이어 팝업 / 활성화시 show -->
<div class="layer-popup-wrap" id="searchPop">
    <div class="layer-container">
        <div class="title-box">
            <h2>검색</h2>
        </div>

        <div class="layer-content">
            <form id="boardSearchForm" name="boardSearchForm" onsubmit="return false;">
                <fieldset>
                    <div class="inp-box first-row" style="display: none;">
	                    <label class="label" for="slt01"></label>

	                      <!-- 1. select class="select" : 옵션값이 선택되었을 때 select 클래스 추가-->
	                      <!-- 2. select class="readonly" : readonly 일경우 readonly 클래스 추가-->
	                    <select class="select" id="slt01" name="name">
	                        <option value="">전체</option>
	                    </select>
                    </div>

                    <div class="inp-box">
                        <label class="label" for="search">검색어</label>
                        <input type="search" class="search" name="searchKeyword" placeholder="제목을 입력하세요." />
                    </div>
                </fieldset>
            </form>
        </div>

        <div class="layer-bottom">
            <div class="btn-bottom">
                <button class="btn-round btn-close" type="button">취소</button>
                <button class="btn-round fill btn-send" type="button">검색</button>
            </div>
        </div>
    </div>
</div>
   <div class="layer-popup-wrap">
	<div class="layer-container">
      		<div class="title-box">
           	<h2>수습공인회계사 등록신청</h2>
       	</div>
      		<div class="layer-content">
           	<div class="gray-box">
              		수습공인회계사 등록신청입니다.<br />수강료를 입금하시면 수강신청이 완료됩니다.
           	</div>
       	</div>

       	<div class="layer-bottom">

           	<button class="btn-text-blue" type="button">마이페이지로 이동</button>

           	<div class="btn-bottom">
               	<button class="btn-round fill" type="button">수습공인회계사 등록신청 시작</button>
           	</div>

           	<div class="today-check">
               	<input type="checkbox" name="viewck" id="viewck" />
               	<label for="viewck">더 이상 보지 않음</label>
           	</div>
       	</div>
   	</div>
</div>

   <!-- 하단 레이어 팝업 / 활성화시 show -->
<div class="layer-popup-wrap" id="nonLoginBookCartPopup">
    <div class="layer-container">
        <div class="title-box">
            <h2>구매하기</h2>
        </div>


        <div class="layer-bottom">

            <em class="text-gray">회계법인으로 구매</em>

            <div class="layer-bottom">
                <div class="btn-bottom">
                    <button class="btn-round btn-send" type="button">회계법인</button>
                    <button class="btn-round fill btn-close" type="button">종료</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="layer-popup-wrap" id="eduCartPopup">
    <div class="layer-container">
        <div class="title-box">
            <h2>입금대기</h2>
        </div>

        <div class="layer-content">
            <div class="gray-box">
                   입금대기는 수강신청이 되지 않은 상태입니다.<br />
                   수강료를 입금하시면 수강신청이 완료됩니다.<br />
                <span>국민은행 011-25-0016-100</span>
            </div>
            <p class="notice">
                  ※ 다만, 선택하신 수강신청과목에 대하여 총 수강료를 한번에 본인명의로 입금해 주셔야 하며, 수강신청 후 2일이내에 입금내역이
                  확인되지 않는 경우 수강신청은 자동 취소됨을 알려드리오니 이 점 양지하여 주시기 바랍니다.
            </p>
        </div>

        <div class="layer-bottom">
            <div class="layer-bottom">
                <div class="btn-bottom">
                    <button class="btn-round btn-send" type="button">장바구니로 이동</button>
                    <button class="btn-round fill btn-close" type="button">종료</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="layer-popup-wrap" id="bookCartPopup">
    <div class="layer-container">
        <div class="title-box">
            <h2>안내</h2>
        </div>

        <div class="layer-content">
            <p class="notice">
                	장바구니에 등록했습니다.
            </p>
        </div>

        <div class="layer-bottom">
            <div class="layer-bottom">
                <div class="btn-bottom">
                    <button class="btn-round btn-send" type="button">장바구니로 이동</button>
                    <button class="btn-round fill btn-close" type="button">종료</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="layer-popup-wrap" id="checkplusPopup">
	<form id="checkPlusForm" name="checkPlusForm" method="post">
		<input type="hidden" name="m" value="checkplusService">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->
		<input type="hidden" name="EncodeData" value="">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
	</form>
    <div class="layer-container">
        <div class="title-box">
            <h2>구매하기</h2>
        </div>

        <div class="layer-content">
            <p class="notice">
                	개인으로 구매
            </p>
        </div>

        <div class="layer-bottom">
            <div class="layer-bottom">
                <div class="btn-bottom">
                    <button class="btn-round btn-send" type="button">본인인증</button>
                    <button class="btn-round fill btn-close" type="button">종료</button>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="layer-popup-wrap" id="informationPopup">
    <div class="layer-container">
        <div class="title-box">
            <h2>안내</h2>
        </div>

        <div class="layer-content">
            <div class="gray-box">

            </div>
        </div>

        <div class="layer-bottom">
            <div class="layer-bottom">
                <div class="btn-bottom">
                    <button class="btn-round fill btn-close" type="button">종료</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 하단 레이어 팝업 / 활성화시 show -->
<div class="layer-popup-wrap" id="cpaSearchPop">
    <div class="layer-container">
        <div class="title-box">
            <h2>검색</h2>
        </div>

        <div class="layer-content">
            <form id="cpaSearchForm" name="cpaSearchForm" onsubmit="return false;">
                <fieldset>
                    <div class="inp-box first-row" style="display: none;">
                        <label class="label"></label>

                        <!-- 1. select class="select" : 옵션값이 선택되었을 때 select 클래스 추가-->
                        <!-- 2. select class="readonly" : readonly 일경우 readonly 클래스 추가-->
                        <select class="select" name="name">
                            <option value="">전체</option>
                        </select>
                    </div>

                    <div class="inp-box" style="display: flex;">
                        <input type="search" class="search" name="searchKeyword1" placeholder="대상자명" style="padding: 0; margin-right: 20px;"/>
                        <input type="search" class="search" name="searchKeyword2" placeholder="등록번호" style="padding: 0;" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
                    </div>
                </fieldset>
            </form>
        </div>

        <div class="layer-bottom">
            <div class="btn-bottom">
                <button class="btn-round btn-close" type="button">취소</button>
                <button class="btn-round fill btn-send" type="button">검색</button>
            </div>
        </div>
    </div>
</div>
