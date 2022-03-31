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
<script src="/js/kicpa/myp/mypCpaAudTrainReg.js"></script>
<script>
	$(document).ready(function(){
		mypCpaAudTrainReg.mypCpaAudTrainRegInit();
	});
</script>
<body id="mypCpaAudTrainReg_body">
<div class="wrap">

	<!-- 약관동의 -->
	<div class="container mypCpaAudTrainTabMove" id="mypCpaAudTrainReg_agreeInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>외감등록</span>
				<h4>외부감사실무수습등록<br>약관동의</h4>
				<p>
					원활한 회원서비스 사용을 위해 아래의 개인정보 수집 및 이용동의 (필수), 개인정보 처리 위탁 동의 (필수), 실무수습 서약서(필수)를 읽고 동의하여 주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>1</b> / <em>4</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaAudTrainReg_agreeForm">
					<div class="inp-box">
						<label class="label essen">성명</label>
						<input type="text" name="koreanNm" value="${mypCpaAudTrainRegKoreanNm}" readonly />
					</div>

					<div class="inp-box">
						<label class="label essen">생년월일</label>
						<input type="text" name="brthdy" value="${mypCpaAudTrainRegBrthdy}" readonly />
					</div>

					<!-- 약관모두동의 -->
					<div class="inp-box">
						<div class="label essen">약관동의</div>
						<div class="inp-all-check">
							<input type="checkbox" id="mypCpaAudTrainReg_allAgree" />
							<label for="mypCpaAudTrainReg_allAgree">모두 동의합니다.</label>
						</div>
					</div>

					<!-- 약관1 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaAudTrainReg_check" type="checkbox" name="agreeInfoYn1" id="mypCpaAudTrainReg_agreement1" value="Y"/>
							<label for="mypCpaAudTrainReg_agreement1">개인정보 수집 및 이용동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 공인회계사의 지도·감독에 관한 사무를 수행하기 위하여 공인회계사  및 수습공인회계사에 대한 개인정보를 아래와 같이 수집하고 있으며, 제공받은 개인정보는  공인회계사 및 수습공인회계사의 사이버교육 제공 등 다양한 서비스제공과 기타 통신연락 수단으로 이용됩니다.<br>
							- 수집 및 이용항목 : 성명, 주민등록번호, 소속, 주소, 전자메일, 전화번호, 휴대폰번호
						</div>
					</div>

					<!-- 약관2 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaAudTrainReg_check" type="checkbox" name="agreeInfoYn2" id="mypCpaAudTrainReg_agreement2" value="Y"/>
							<label for="mypCpaAudTrainReg_agreement2">개인정보 처리 위탁 동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 수습공인회계사의 수습연수와 공인회계사의 연수를 위해 사이버교육 시스템을 구축하여 운영하고 있습니다. 이와 관련하여 한국공인회계사회는 사이버연수 전문업체에 사이버교육을 위탁 운영하고 있으며, 수습공인회계사와 공인회계사의 사이버  교육 서비스 제공을 위하여 아래의 개인정보를 한국공인회계사회가 사이버교육을 위탁 운영하는 업체에 제공하는 것에 대해 동의를 요청합니다.
						</div>
					</div>

					<!-- 약관3 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaAudTrainReg_check" type="checkbox" name="agreeInfoYn3" id="mypCpaAudTrainReg_agreement3" value="Y"/>
							<label for="mypCpaAudTrainReg_agreement3">외감실무수습 서약서 (필수)</label>
						</div>

						<div class="terms_box">
							상기 본인은 수습공인회계사등록에 따른 실무수습에 있어 이 실무수습이 공인회계사로서의 인격과 전문가적 능력을 함양함에 있음을 명심하여 공인회계사법‧동법에 의한 명령‧실무수습에관한규정 및 회계연수원운영규정을 성실히 준수하고 실무수습기관에서의 실무수습 및 회계연수원의 연수기간 중 근면하고 성실한 자세로서 실무수습에 임할 것이며, 만일 이를 이행하지 못하였을 때에는 관련법규에 따른 조치를 감수하겠음을 이에 서약합니다.
						</div>
					</div>

					<div class="inp-messeage">
						개인정보 수집 및 이용, 개인정보 처리 위탁 동의, 기본실무수습 서약서에 대한 안내 모두 동의해주세요.
					</div>
				</form>
			</div>
		</section>

		<!-- 마이페이지로 이동 버튼-->
		<div class="btn-page-bottom">
			<button class="btn-text-blue" type="button" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_backMove();">마이페이지로 이동</button>
		</div>

		<!-- 시작하기 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaAudTrainReg_agreeSaveBtn">시작하기</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 이력정보 -->
	<div class="container mypCpaAudTrainTabMove" id="mypCpaAudTrainReg_apntcCpaHistInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>외감등록</span>
				<h4>이력정보 (외감)</h4>
				<p>이력정보를 등록하세요.</p>
				<div class="step-by">
					<b>2</b> / <em>4</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaAudTrainReg_apntcCpaHistInfoForm">

					<div class="inp-box">
						<label class="label essen" for="mypCpaAudTrainReg_audRegistDe">외감실무수습 시작일</label>
						<input type="date" id="mypCpaAudTrainReg_audRegistDe" name="audRegistDe" data-placeholder="날짜를 입력하세요." max="9999-12-31" required />
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaAudTrainReg_guideCpa">지도공인회계사</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaAudTrainReg_guideCpa" name="guideCpaNm" placeholder="회계사 성명등록" title="회계사 성명등록"/>
							<input type="text" style="width: 100%;" id="mypCpaAudTrainReg_guideCpaId" name="guideCpaNo" placeholder="회계사 번호등록" title="회계사 번호등록"/>
						</div>
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaAudTrainReg_appInsttNm">실무수습기관</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaAudTrainReg_appInsttNm" name="appInsttNm" placeholder="실무수습기관 등록" title="실무수습기관 등록" readonly/>
							<input type="text" style="width: 100%;" id="mypCpaAudTrainReg_appInsttCd" name="appInsttCd" placeholder="실무수습기관 번호등록" title="실무수습기관 번호등록" readonly/>
							<input type="hidden" name="audGrpCl" id="mypCpaAudTrainReg_audGrpCl"/>
						</div>
					</div>

					<div class="inp-box mypTrainAppInsttEtcYn" style="display: none;">
						<label class="label essen" for="mypCpaAudTrainReg_appInsttEtc">실제 실무수습기관명</label>
						<input type="text" id="mypCpaAudTrainReg_appInsttEtc" name="appInsttEtc" placeholder="실제 실무수습기관명(회사명)을 등록하세요."/>
					</div>

				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_agreeInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaAudTrainReg_apntcCpaHistInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 첨부파일(첨부서류) -->
	<div class="container mypCpaAudTrainTabMove" id="mypCpaAudTrainReg_atchFileInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>외감등록</span>
				<h4>첨부파일 (첨부서류)</h4>
				<p>외감 등록에 필요한 첨부파일을 등록하세요.</p>
				<div class="step-by">
					<b>3</b> / <em>4</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaAudTrainReg_atchFileInfoForm">

					<input type="hidden" name="atchFileId1FlagYn" id="mypCpaAudTrainReg_atchFileId1FlagYn"/>

					<div class="inp-box">
						<div class="label essen">재직증명서</div>
						<input class="mypCpaAudTrainReg_fileChange" type="file" id="mypCpaAudTrainReg_emplCrtiFileId" name="emplCrtiFileId" readonly/>
						<label for="mypCpaAudTrainReg_emplCrtiFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="emplCrtiFileIdSet" id="mypCpaAudTrainReg_emplCrtiFileIdSet"/>
						<button type="button" class="regFlagFEmplDelHide" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_atchFileInfoRemove('regFlagFEmplDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label essen">이력서</div>
						<input class="mypCpaAudTrainReg_fileChange" type="file" id="mypCpaAudTrainReg_rsumFileId" name="rsumFileId" readonly/>
						<label for="mypCpaAudTrainReg_rsumFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="rsumFileIdSet" id="mypCpaAudTrainReg_rsumFileIdSet"/>
						<input type="hidden" name="eventnSet" id="mypCpaAudTrainReg_rsumFileEventnSet"/>
						<button type="button" class="regFlagFRsumDelHide" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_atchFileInfoRemove('regFlagFRsumDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label essen">기타</div>
						<input class="mypCpaAudTrainReg_fileChange" type="file" id="mypCpaAudTrainReg_atchFileId" name="atchFileId" readonly/>
						<label for="mypCpaAudTrainReg_atchFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="atchFileIdSet" id="mypCpaAudTrainReg_atchFileIdSet"/>
						<button type="button" class="regFlagFAtchDelHide" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_atchFileInfoRemove('regFlagFAtchDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>
				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_apntcCpaHistInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaAudTrainReg_atchFileInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 검토 및 제출 -->
	<div class="container mypCpaAudTrainTabMove" id="mypCpaAudTrainReg_reviewInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>외감등록</span>
				<h4>검토 및 제출</h4>
				<p>
					등록하신 정보가 맞는지 확인하시고<br />
					제출 버튼을 눌러주세요.
				</p>
				<div class="step-by">
					<b>4</b> / <em>4</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<p class="submit-txt" id="mypCpaAudTrainReg_audTrainRegForm">
					외부감사실무수습<br />
					등록신청서
				</p>

				<div class="cont-line">
					<h4>이력정보 (외감)</h4>
					<ul class="breakdown-list">
						<li>
							<span>외감실무수습 시작일</span>
							<p id="mypCpaAudTrainRegReviewInfo_audRegistDe"></p>
						</li>
						<li>
							<span>지도공인회게사</span>
							<p id="mypCpaAudTrainRegReviewInfo_guideCpa"></p>
						</li>
						<li>
							<span>실무수습기관</span>
							<p id="mypCpaAudTrainRegReviewInfo_appInstt"></p>
						</li>
						<li>
							<span>실제 실무수습기관명</span>
							<p id="mypCpaAudTrainRegReviewInfo_appInsttEtc"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>첨부파일 (첨부서류)</h4>
					<ul class="breakdown-list">
						<li>
							<span>재직증명서</span>
							<p id="mypCpaAudTrainRegReviewInfo_emplCrtiFileId"></p>
						</li>
						<li>
							<span>이력서</span>
							<p id="mypCpaAudTrainRegReviewInfo_rsumFileId"></p>
						</li>
						<li>
							<span>기타</span>
							<p id="mypCpaAudTrainRegReviewInfo_atchFileId"></p>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaTrain_preBtn" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_atchFileInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!--페이지하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaTrain_submitBtn" type="button" id="mypCpaAudTrainReg_reviewInfoSaveBtn">제출</button>
			<button class="btn-sticky mypCpaTrain_mypBtn" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaAudTrainRegPin}'">확인</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

</div>

<!-- 하단 레이어 팝업(합격자정보 저장) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaAudTrainReg_saveRegPop">
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

			<button class="btn-text-blue" type="button" id="mypCpaAudTrainReg_saveRegPopCanclBtn">제출취소</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaAudTrainReg_saveRegPopBtn">제출</button>
			</div>
		</div>
	</div>
</div>

<input type="hidden" name="pin" id="mypCpaAudTrainReg_pin" value="${mypCpaAudTrainRegPin}"/>
<input type="hidden" name="apntcSn" id="mypCpaAudTrainReg_apntcSn" value="${mypCpaAudTrainRegApntcSn}"/>
<input type="hidden" id="mypCpaAudTrainReg_saveMode" value="${mypCpaAudTrainRegSaveMode.saveMode}"/>
<input type="hidden" id="mypCpaAudTrainReg_movePage" value="${mypCpaAudTrainRegSaveMode.movePage}"/>
<input type="hidden" id="mypCpaAudTrainReg_regFlag" value="${mypCpaAudTrainRegSaveMode.regFlag}"/>
<input type="hidden" id="mypCpaAudTrainReg_saveData"/>

</body>
</html>