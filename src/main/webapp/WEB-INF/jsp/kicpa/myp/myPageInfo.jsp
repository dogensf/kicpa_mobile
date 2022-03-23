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
<script src="/js/kicpa/myp/myPageInfo.js"></script>
<script>
	$(document).ready(function(){
		myPageInfo.myPageInfoInit();
	});
</script>
<body>
<div class="wrap">
	<form name="myPageForm_nice" id="myPageInfo_nice" method="post">
		<input type="hidden" name="m" value="checkplusService">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->
		<input type="hidden" name="EncodeData" value="">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
	</form>

	<div class="container">
		<section class="head-sub">
			<button class="btn-back" type="button" onclick="myPageInfo.myPageInfo_backMove();">
				<span>이전</span>
			</button>
			<h3>개인정보</h3>
			<div>
				<input type="checkbox" name="cpaConfirmPass" id="myPage_cpaConfirmPass" style="display: none;"/>
			</div>
		</section>
		<section class="content">
			<!-- 프로필영역 -->
			<div class="profile-box">
				<button class="photo-box" type="button" id="myPage_cpaPictInfo">
					<!-- <img src="../images/thumb-profile.png" alt="프로필사진" /> -->
				</button>
			</div>

			<ul class="list-wrap">
				<li>
					<h4>기본정보</h4>
					<button class="m-link" type="button" onClick="javascript:myPageInfo.myPage_memberInfoUpdateBtn('mypCpaPassReg_nameInfo','M', ${myPageInfoPin});">
						<span>성명</span>
						<span style="float: right; margin-right: 26px; font-size: 1.3rem; letter-spacing: normal;">EDIT</span>
					</button>
					<button class="m-link" type="button" onClick="javascript:myPageInfo.myPage_memberInfoUpdateBtn('mypCpaPassReg_adresInfo','M', ${myPageInfoPin});">
						<span>자택&직장주소</span>
						<span style="float: right; margin-right: 26px; font-size: 1.3rem; letter-spacing: normal;">EDIT</span>
					</button>
					<button class="m-link" type="button" onClick="javascript:myPageInfo.myPage_memberInfoUpdateBtn('mypCpaPassReg_contactInfo','M', ${myPageInfoPin});">
						<span>연락처</span>
						<span style="float: right; margin-right: 26px; font-size: 1.3rem; letter-spacing: normal;">EDIT</span>
					</button>
					<button class="m-link" type="button" onClick="javascript:myPageInfo.myPage_memberInfoUpdateBtn('mypCpaPassReg_acdmcrInfo','M', ${myPageInfoPin});">
						<span>학력사항</span>
						<span style="float: right; margin-right: 26px; font-size: 1.3rem; letter-spacing: normal;">EDIT</span>
					</button>
					<button class="m-link" type="button" id="myPage_cpaNmstOthbcInfo" style="border-bottom: 1px solid #E5E5E7;">
						<span>정보공개설정</span>
						<span style="float: right; margin-right: 26px; font-size: 1.3rem; letter-spacing: normal;">EDIT</span>
					</button>
				</li>
			</ul>

			<div id="tabMain1" class="tab-main-content show">
				<div class="mypage-wrap">
					<div class="application-status">
						<div class="guide-ment">

					<span style="font-size: 1.3rem;">
						※ 이외 공인회계사 정보 변경이 필요한 경우 <br />
						통합플랫폼 마이페이지를 활용하여 주시기 바랍니다.
					</span>
						</div>

					</div>
				</div>
			</div><!-- //탭1 -->
			<input type="hidden" id="myPageInfo_pin" value="${myPageInfoPin}"/>
			<input type="hidden" id="myPageInfo_myPageInfoDi" value="${diCheckList[0].immDi}"/>
			<input type="hidden" id="myPageInfo_cpaTrainInfoListCnt" value="${cpaTrainInfoListCnt}"/>
			<input type="hidden" id="myPageInfo_cpaMemberInfoListCnt" value="${cpaMemberInfoListCnt}"/>

		</section>
	</div>
</div>
</body>
</html>