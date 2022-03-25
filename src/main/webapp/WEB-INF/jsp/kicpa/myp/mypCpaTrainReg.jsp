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
<script src="/js/kicpa/myp/mypCpaTrainReg.js"></script>
<script>
	$(document).ready(function(){
		mypCpaTrainReg.mypCpaTrainRegInit();
	});
</script>
<body id="mypCpaTrainReg_body">
<div class="wrap">

	<div class="container myPageMemInfoTabMove" id="mypCpaTrainReg_pictInfo">
		<section class="head-pop">
			<h3 class="mypCpaTrainReg_titleNm">등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box mypCpaTrainReg_titleYn">
				<span>수습회계사 등록</span>
				<h4>사진등록</h4>
				<p>
					사진을 등록해 주세요. 등록하신 사진은<br />마이페이지에서 수정이 가능합니다.
				</p>
				<div class="step-by">
					<b>2</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaTrainReg_pictInfoForm">
					<div class="profile-image-add">
						<b>사진등록</b>

						<div class="img-box" id="mypCpaTrainReg_cpaPict">
							<!-- <img src="../images/thumb-profile.png" alt="프로필 이미지" /> -->
							<c:if test="${memPict !='' && memPict != null}">
								<img id="mypCpaTrainReg_pictSelect" src='${memPict}' alt=""/>
							</c:if>
							<c:if test="${memPict =='' || memPict == null}">
								<img id="mypCpaTrainReg_pictSelect" alt="">
							</c:if>
						</div>

						<div class="guide">권장 이미지 : 94.4PX  X  113.3PX </div>
					</div>

					<div class="application-status">
						<div>
							<button class="btn-primary" type="button" style="margin:auto; margin-top: 30px; height: 40px; font-size: 1.5rem; width: 80px;" onclick="jQuery('#mypCpaTrainReg_file_selection').click();">사진선택</button>
							<input id="mypCpaTrainReg_file_selection" type="file" name="pictFileId" accept="image/*" style="display: none;"/>
						</div>
					</div>
				</form>
			</div>
		</section>

		<!-- 개인정보화면 이동(수정모드) -->
		<div class="btn-page-bottom">
			<button class="btn-text-blue mypCpaTrain_backBtn" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove()" type="button">취소</button>
		</div>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaTrain_preBtn" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaTrain_nextBtn" type="button" id="mypCpaTrainReg_pictInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>
</div>


<!-- 하단 레이어 팝업(수습정보 저장) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaTrainReg_savePop">
	<div class="layer-container">
		<div class="title-box">
			<h2>제출</h2>
		</div>

		<div class="layer-content" style="text-align: center;">
			<div class="gray-box">
				해당 내용으로 제출 하시겠습니까?
			</div>
		</div>

		<div class="layer-bottom" style="text-align: center;">

			<button class="btn-text-blue" type="button" id="mypCpaTrainReg_savePopCanclBtn">제출취소</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaTrainReg_savePopBtn">제출</button>
			</div>
		</div>
	</div>
</div>

<input type="hidden" name="pin" id="mypCpaTrainReg_pin" value="${mypCpaTrainRegPin}"/>
<input type="hidden" name="apntcSn" id="mypCpaTrainReg_apntcSn"/>
<input type="hidden" id="mypCpaTrainReg_saveMode" value="${mypCpaTrainRegSaveMode.saveMode}"/>
<input type="hidden" id="mypCpaTrainReg_movePage" value="${mypCpaTrainRegSaveMode.movePage}"/>
<input type="hidden" id="mypCpaTrainReg_regFlag" value="${mypCpaTrainRegSaveMode.regFlag}"/>
<input type="hidden" id="mypCpaTrainReg_saveData"/>
</body>
</html>