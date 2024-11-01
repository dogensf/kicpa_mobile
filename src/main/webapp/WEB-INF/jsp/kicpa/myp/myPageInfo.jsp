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
	
	function isBrowserCheck(){ 
		const agt = navigator.userAgent.toLowerCase(); 
		if (agt.indexOf("chrome") != -1) return 'Chrome'; 
		if (agt.indexOf("opera") != -1) return 'Opera'; 
		if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
		if (agt.indexOf("webtv") != -1) return 'WebTV'; 
		if (agt.indexOf("beonex") != -1) return 'Beonex'; 
		if (agt.indexOf("chimera") != -1) return 'Chimera'; 
		if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
		if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
		if (agt.indexOf("firefox") != -1) return 'Firefox'; 
		if (agt.indexOf("safari") != -1) return 'Safari'; 
		if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
		if (agt.indexOf("netscape") != -1) return 'Netscape'; 
		if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
		if (agt.indexOf("iPhone") != -1) return 'iPhone'; 
		
		if (agt.indexOf("msie") != -1) { 
	    	let rv = -1; 
			if (navigator.appName == 'Microsoft Internet Explorer') { 
				let ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
			if (re.exec(ua) != null) 
				rv = parseFloat(RegExp.$1); 
			} 
			return 'Internet Explorer '+rv; 
		} 
	}
	
	function fncLocation(){
		myPageInfo.myPageInfo_backMove();
	}
</script>
<body>
<div class="wrap">
	<form name="myPageForm_nice" id="myPageInfo_nice" method="post">
		<input type="hidden" name="m" value="checkplusService">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->
		<input type="hidden" name="EncodeData" value="">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
	</form>

	<div class="container">
		<section class="head-sub">
			<button class="btn-back" type="button" onclick="javascript:fncLocation();">
				<span>이전</span>
			</button>
			<h3>개인정보</h3>
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
					<div class="inp-box" style="display: none;">
						<div class="inp-check">
							<input type="checkbox" name="cpaConfirmPass" id="myPage_cpaConfirmPass"/>
							<label for="myPage_cpaConfirmPass"></label>
						</div>
					</div>
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
			<input type="hidden" id="myPageInfo_cpaMemberMemFlag" value="${cpaMemberInfoList[0].mberFlag}"/>

		</section>
	</div>
</div>
</body>
</html>