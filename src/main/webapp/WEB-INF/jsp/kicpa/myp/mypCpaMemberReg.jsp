<%--
  Class Name : myPage.jsp
  Description : 마이페이지
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
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ImgUrl" value="/images/"/>

    <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
    <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
	<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<script src="/js/KicpaCommon.js"></script>
<script src="/js/kicpa/myp/mypCpaMemberReg.js"></script>
<script>
	$(document).ready(function(){
		mypMemberReg.mypMemberRegInit();
	});
</script>
<body id="mypCpaMemberReg_body">
<div class="wrap">

	<!-- 정보공개설정 -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_nmstOthbcInfo">
		<section class="head-pop">
			<h3 class="mypCpaMemberReg_titleNm">등록</h3>
			<button class="btn-close" type="button" onclick="mypMemberReg.mypMemberReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box mypCpaMemberReg_titleYn">
				<span>공인회계사등록</span>
				<h4>정보공개설정</h4>
				<p>
					정보공개를 설정해주세요.
				</p>
				<div class="step-by">
					<b>4</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaMemberReg_nmstOthbcInfoForm">
					<div class="inp-box">
						<label class="label essen">사무소 주소</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="ofcAdresYn" value="Y" id="mypCpaMember_ofcAdresY" checked/>
						<label for="mypCpaMember_ofcAdresY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="ofcAdresYn" value="N" id="mypCpaMember_ofcAdresN"/>
						<label for="mypCpaMember_ofcAdresN">비공개</label>
					</div>

					<div class="inp-box" style="margin-top: 40px;">
						<label class="label essen">사무소명</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="ofcNameYn" value="Y" id="mypCpaMember_ofcNameY" checked/>
						<label for="mypCpaMember_ofcNameY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="ofcNameYn" value="N" id="mypCpaMember_ofcNameN"/>
						<label for="mypCpaMember_ofcNameN">비공개</label>
					</div>

					<div class="inp-box" style="margin-top: 40px;">
						<label class="label essen">전자메일</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="emailYn" value="Y" id="mypCpaMember_emailY" checked/>
						<label for="mypCpaMember_emailY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="emailYn" value="N" id="mypCpaMember_emailN"/>
						<label for="mypCpaMember_emailN">비공개</label>
					</div>

					<div class="inp-box" style="margin-top: 40px;">
						<label class="label essen">사무소 전화</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="ofcTelYn" value="Y" id="mypCpaMember_ofcTelY" checked/>
						<label for="mypCpaMember_ofcTelY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="ofcTelYn" value="N" id="mypCpaMember_ofcTelN"/>
						<label for="mypCpaMember_ofcTelN">비공개</label>
					</div>

					<div class="inp-box" style="margin-top: 40px;">
						<label class="label essen">사진</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="photoYn" value="Y" id="mypCpaMember_photoY" checked/>
						<label for="mypCpaMember_photoY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="photoYn" value="N" id="mypCpaMember_photoN"/>
						<label for="mypCpaMember_photoN">비공개</label>
					</div>

					<div class="inp-box" style="margin-top: 40px;">
						<label class="label essen">사무소 팩스</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="ofcFaxYn" value="Y" id="mypCpaMember_ofcFaxY" checked/>
						<label for="mypCpaMember_ofcFaxY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="ofcFaxYn" value="N" id="mypCpaMember_ofcFaxN"/>
						<label for="mypCpaMember_ofcFaxN">비공개</label>
					</div>
				</form>
			</div>
		</section>

		<!-- 개인정보화면 이동(수정모드) -->
		<div class="btn-page-bottom">
			<button class="btn-text-blue mypCpaMember_backBtn" onclick="mypMemberReg.mypMemberReg_backMove();" type="button">취소</button>
		</div>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaMember_preBtn" onclick="mypMemberReg.mypMemberReg_tabMove('')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaMember_nextBtn" type="button" id="mypCpaMember_nmstOthbcInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>


	<input type="hidden" name="pin" id="mypCpaMemberReg_pin" value="${mypCpaMemberRegPin}"/>
	<input type="hidden" name="cpaSn" id="mypCpaMemberReg_cpaSn" value="${mypCpaMemberRegCpaSn}"/>
	<input type="hidden" name="canclCl" id="mypCpaMemberReg_canclCl" value="${cpaMemberCanclInfo[0].canclCl}"/>
	<input type="hidden" id="mypCpaMemberReg_saveMode" value="${mypCpaMemberRegSaveMode.saveMode}"/>
	<input type="hidden" id="mypCpaMemberReg_movePage" value="${mypCpaMemberRegSaveMode.movePage}"/>
	<input type="hidden" id="mypCpaMemberReg_regFlag" value="${mypCpaMemberRegSaveMode.regFlag}"/>

</div>

<!-- 하단 레이어 팝업 / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaMemberReg_savePop">
	<div class="layer-container">
		<div class="title-box">
			<h2>제출</h2>
		</div>

		<div class="layer-content" style="text-align: center;">
			<div class="gray-box">
				수정/저장 하시겠습니까?
			</div>
		</div>

		<div class="layer-bottom" style="text-align: center;">

			<button class="btn-text-blue" type="button" id="mypCpaMemberReg_savePopCanclBtn">아니오</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaMemberReg_savePopBtn">예</button>
			</div>
		</div>
	</div>
</div>

<input type="hidden" id="mypCpaMemberReg_saveData"/>
</body>
</html>