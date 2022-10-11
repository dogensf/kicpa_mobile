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
<script src="/js/kicpa/myp/mypCpaMemberReg.js?ver=1"></script>
<script>
	$(document).ready(function(){
		mypMemberReg.mypMemberRegInit();
	});
	function fncLocation(){
		mypMemberReg.mypMemberReg_backMove();
	}
</script>

<style type="text/css" >

	.wrap-loading{ /*화면 전체를 어둡게 합니다.*/
		position: fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background: rgba(0,0,0,0.2); /*not in ie */
		filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr='#20000000', endColorstr='#20000000');    /* ie */
	}

	.wrap-loading div{ /*로딩 이미지*/
		position: fixed;
		top:40%;
		left:40%;
	}

	.display-none{ /*감추기*/
		display:none;
	}
</style>
<body id="mypCpaMemberReg_body">
<div class="wrap">

	<!-- 약관동의 -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_agreeInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="javascript:fncLocation();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>공인회계사등록</span>
				<h4>약관동의</h4>
				<p>
					원활한 회원서비스 사용을 위해 아래의 개인정보 수집 및 이용동의 (필수), 개인정보 처리 위탁 동의 (필수)를 읽고 동의하여 주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>1</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaMemberReg_agreeForm">
					<div class="inp-box">
						<label class="label essen">성명</label>
						<input type="text" name="koreanNm" value="${mypCpaMemberRegKoreanNm}" readonly />
					</div>

					<div class="inp-box">
						<label class="label essen">생년월일</label>
						<input type="text" name="brthdy" value="${mypCpaMemberRegBrthdy}" readonly />
					</div>

					<!-- 약관모두동의 -->
					<div class="inp-box">
						<div class="label essen">약관동의</div>
						<div class="inp-all-check">
							<input type="checkbox" id="mypCpaMemberReg_allAgree" />
							<label for="mypCpaMemberReg_allAgree">모두 동의합니다.</label>
						</div>
					</div>

					<!-- 약관1 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaMemberReg_check" type="checkbox" name="agreeInfoYn1" id="mypCpaMemberReg_agreement1" value="Y"/>
							<label for="mypCpaMemberReg_agreement1">개인정보 수집 및 이용동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 공인회계사의 지도·감독에 관한 사무를 수행하기 위하여 공인회계사  및 수습공인회계사에 대한 개인정보를 아래와 같이 수집하고 있으며, 제공받은 개인정보는  공인회계사 및 수습공인회계사의 사이버교육 제공 등 다양한 서비스제공과 기타 통신연락 수단으로 이용됩니다.<br>
							- 수집 및 이용항목 : 성명, 주민등록번호, 소속, 주소, 전자메일, 전화번호, 휴대폰번호
						</div>
					</div>

					<!-- 약관2 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaMemberReg_check" type="checkbox" name="agreeInfoYn2" id="mypCpaMemberReg_agreement2" value="Y"/>
							<label for="mypCpaMemberReg_agreement2">개인정보 처리 위탁 동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 수습공인회계사의 수습연수와 공인회계사의 연수를 위해 사이버교육 시스템을 구축하여 운영하고 있습니다. 이와 관련하여 한국공인회계사회는 사이버연수 전문업체에 사이버교육을 위탁 운영하고 있으며, 수습공인회계사와 공인회계사의 사이버  교육 서비스 제공을 위하여 아래의 개인정보를 한국공인회계사회가 사이버교육을 위탁 운영하는 업체에 제공하는 것에 대해 동의를 요청합니다.
						</div>
					</div>

					<div class="inp-messeage">
						개인정보 수집 및 이용, 개인정보 처리 위탁에 대한 안내 모두 동의해주세요.
					</div>
				</form>
			</div>
		</section>

		<!-- 마이페이지로 이동 버튼-->
		<div class="btn-page-bottom">
			<button class="btn-text-blue" type="button" onclick="mypMemberReg.mypMemberReg_backMove();">마이페이지로 이동</button>
		</div>

		<!-- 시작하기 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaMemberReg_agreeInfoSaveBtn">시작하기</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 부조회원 구분 & 사업자등록번호 -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_cpaCareerInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypMemberReg.mypMemberReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>공인회계사등록</span>
				<h4>부조회원 구분 &<br>사업자등록번호</h4>
				<p>
					필수항목을 등록해주세요.
				</p>
				<div class="step-by">
					<b>2</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaMemberReg_aidMberInfoForm">

					<div class="inp-box">
						<label class="label essen" for="mypCpaMember_aidMberFlag">부조회원 구분</label>

						<select name="aidMberFlag" id="mypCpaMember_aidMberFlag">
							<option value="">선택하세요.</option>
							<option value="R">정회원</option>
							<option value="A">준회원</option>
						</select>
					</div>

					<div class="inp-box">
						<label class="label" for="mypCpaMember_bizrNo">사업자등록번호</label>
						<input type="text" id="mypCpaMember_bizrNo" name="bizrNo" placeholder="“-” 제외 사업자번호를 등록하세요." maxlength="12" oninput="mypMemberReg.inputBizrNumber(this);"/>
					</div>

				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_agreeInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaMemberReg_aidMberInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 회원등록구분 -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_aidMberInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypMemberReg.mypMemberReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>공인회계사등록</span>
				<h4>회원등록구분</h4>
				<p>
					필수항목을 등록해주세요.
				</p>
				<div class="step-by">
					<b>3</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaMemberReg_cpaCareerInfoForm">

					<div class="inp-box">
						<label class="label essen" for="mypCpaMember_registDe">공인회계사 등록예정일</label>
						<input type="date" id="mypCpaMember_registDe" name="registDe" data-placeholder="공인회계사 등록예정일 날짜를 입력하세요." max="9999-12-31" required />
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaMember_mberFlag">회원구분</label>

						<select name="mberFlag" id="mypCpaMember_mberFlag">
							<option value="">회원 구분을 선택하세요.</option>
							<option value="A2020030">개업</option>
							<option value="A2020010">전업</option>
							<option value="A2020050">휴업</option>
						</select>
					</div>

					<div style="display: none;" class="inp-box mypCpaMemberReg_auditReg">
						<label class="label essen" for="mypCpaMember_auditNm">가입예정 감사인</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaMember_auditNm" name="auditNm" placeholder="감사인 등록" title="감사인명" disabled/>
							<input type="text" style="width: 100%;" id="mypCpaMember_auditAdres" name="auditAdres" placeholder="감사인 주소등록" title="감사인주소" disabled/>
							<input type="hidden" name="auditId" id="mypCpaMember_auditId" disabled/>
						</div>
					</div>

					<div style="display: none;" class="inp-box mypCpaMemberReg_auditReg">
						<label class="label essen" for="mypCpaMember_auditOfcps">감사인 구성구분</label>

						<select name="auditOfcps" id="mypCpaMember_auditOfcps" disabled>
							<%--<option value="">구성구분을 선택하세요.</option>
							<option value="A3020010">대표이사</option>
							<option value="A3020020">이사</option>
							<option value="A3020030">사원</option>--%>
							<option value="A3020040">구성원</option>
							<%--<option value="A3020050">주무공인회계사</option>--%>
						</select>
					</div>

					<div style="display: none;" class="inp-box mypCpaMemberReg_closedClReg">
						<label class="label essen" for="mypCpaMember_closedClNm">회원(휴업)분류</label>
						<input type="text" id="mypCpaMember_closedClNm" name="closedClNm" placeholder="회원(휴업)분류를 선택하세요." readonly/>
						<input type="hidden" name="closedCl" id="mypCpaMember_closedCl"/>
					</div>

				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_cpaCareerInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaMemberReg_cpaCareerInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

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
						<label class="label essen">정보공개 여부 설정</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="psnlInfoYn" value="Y" id="mypCpaMember_psnlInfoY" checked/>
						<label for="mypCpaMember_psnlInfoY" style="margin-right: 10px;">공개</label>
						<input type="radio" name="psnlInfoYn" value="N" id="mypCpaMember_psnlInfoN"/>
						<label for="mypCpaMember_psnlInfoN">비공개</label>
					</div>

					<div class="inp-box" style="margin-top: 40px;">
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
			<button class="btn-text-back mypCpaMember_preBtn" onclick="mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_aidMberInfo')" type="button">이전페이지로 이동</button>
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

	<!-- 첨부파일(첨부서류) -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_atchFileInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypMemberReg.mypMemberReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>공인회계사등록</span>
				<h4>첨부파일 (첨부서류)</h4>
				<p>공인회계사 등록에 필요한 첨부파일을 등록하세요.</p>
				<div class="step-by">
					<b>5</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaMemberReg_atchFileInfoForm">

					<div class="inp-box">
						<div class="label essen">공인회계사 합격증 사본</div>
						<input class="mypCpaMemberReg_fileChange" type="file" id="mypCpaMember_passCrtiFileId" name="passCrtiFileId" readonly/>
						<label for="mypCpaMember_passCrtiFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="passCrtiFileIdSet" id="mypCpaMember_passCrtiFileIdSet"/>
						<button type="button" class="regFlagFPassCrtiFileIdDelHide" onclick="mypMemberReg.mypCpaMember_atchFileInfoRemove('regFlagFPassCrtiFileIdDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label essen">이력서</div>
						<input class="mypCpaMemberReg_fileChange" type="file" id="mypCpaMember_rsumFileId" name="rsumFileId" readonly/>
						<label for="mypCpaMember_rsumFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="rsumFileIdSet" id="mypCpaMember_rsumFileIdSet"/>
						<input type="hidden" name="eventnSet" id="mypCpaMember_rsumFileIdEventnSet"/>
						<button type="button" class="regFlagFRsumFileIdDelHide" onclick="mypMemberReg.mypCpaMember_atchFileInfoRemove('regFlagFRsumFileIdDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label">실무수습종료증명서</div>
						<input class="mypCpaMemberReg_fileChange" type="file" id="mypCpaMember_apntcEndFileId" name="apntcEndFileId" readonly/>
						<label for="mypCpaMember_apntcEndFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="apntcEndFileIdSet" id="mypCpaMember_apntcEndFileIdSet"/>
						<button type="button" class="regFlagFApntcEndFileIdDelHide" onclick="mypMemberReg.mypCpaMember_atchFileInfoRemove('regFlagFApntcEndFileIdDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label">기타</div>
						<input class="mypCpaMemberReg_fileChange" type="file" id="mypCpaMember_atchFileId" name="atchFileId" readonly/>
						<label for="mypCpaMember_atchFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="atchFileIdSet" id="mypCpaMember_atchFileInfoAtchFileId1Set"/>
						<button type="button" class="regFlagFEmplCrtiDelHide" onclick="mypMemberReg.mypCpaMember_atchFileInfoRemove('regFlagFAtchFileIdDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_nmstOthbcInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaMemberReg_atchFileInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 등록회비 납부 -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_aidDuesInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}'">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>공인회계사등록</span>
				<h4>등록 회비 납부</h4>
				<p>
					납부하실 금액은 아래와 같습니다.
				</p>
				<div class="step-by">
					<b>6</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<ul class="pay-list">
					<li>
						<span>일반회계 입회금</span>
						<b id="mypCpaMember_gnrlEntrncAmt"></b>
					</li>
					<li>
						<span>일반회계 연회비</span>
						<b id="mypCpaMember_yearDuesAmt"></b>
					</li>
					<li>
						<span>회관회계 입회금</span>
						<b id="mypCpaMember_cmitEntrncAmt"></b>
					</li>
					<li>
						<span>공제회 부조회계 입회금</span>
						<b id="mypCpaMember_asstnEntrncAmt"></b>
					</li>
					<li>
						<span>공제회 부조회계 연회비</span>
						<b id="mypCpaMember_asstnYyAmt"></b>
					</li>
					<li class="total">
						<span>총액</span>
						<b id="mypCpaMember_totAmt"></b>
					</li>
				</ul>

				<div class="pay-guide mypCpaMember_aidDuesN" style="display: none;">
					<button type="button" class="btn-round" id="mypCpaMember_setDuesCreate" style="width: 100%;">
                        납부하기
                    </button>
					<p>
						납부하지 않으셔도 다음단계로 이동이 가능합니다.<br />
						승인을 받으시려면 꼭 납부하시기 바랍니다.
					</p>
				</div>

				<div class="pay-guide mypCpaMember_aidDuesY" style="display: none;">
					<p>
						등록회비를 이미 납부하셨습니다.
					</p>
				</div>
			</div>

			<form id="mypCpaMember_aidDuesInfoForm">
				<input type="hidden" name="appCpaNo" id="mypCpaMember_aidDuesAppCpaNo" value="${mypCpaMemberRegAppCpaNo}"/>
				<input type="hidden" name="name" id="mypCpaMember_aidDuesName"  value="${mypCpaMemberRegKoreanNm}"/>
			</form>

		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaMember_preBtn" onclick="mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_atchFileInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaMember_nextBtn" type="button" id="mypCpaMemberReg_aidDuesInfoSaveBtn">다음</button>
			<button class="btn-sticky mypCpaMember_mypBtn" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}'">확인</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 검토 및 제출 -->
	<div class="container myPageMemInfoTabMove" id="mypCpaMemberReg_reviewInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}'">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>공인회계사등록</span>
				<h4>검토 및 제출</h4>
				<p>
					등록하신 정보가 맞는지 확인하시고<br />
					제출 버튼을 눌러주세요.
				</p>
				<div class="step-by">
					<b>7</b> / <em>7</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<div style="display:flex;">
					<p class="submit-txt" id="mypCpaMember_cpaRegForm" style="width: 50%; border-bottom: 0; margin-bottom: 35px;">
						공인회계사<br />
						등록신청서
					</p>
					<p class="submit-txt" id="mypCpaMember_cpaMemRegForm" style="width: 50%; border-bottom: 0; margin-bottom: 35px;">
						입회신청서
					</p>
				</div>
				<div style="display:flex;">
					<p class="submit-txt" id="mypCpaMember_cpaMemFlagRegForm" style="width: 50%;">
						개업 휴업신청서
					</p>
					<p class="submit-txt" id="mypCpaMember_mypCpaAidRegForm" style="width: 50%;">
						공제회 부조사업<br>회원가입 신청서
					</p>
				</div>

				<div class="cont-line">
					<h4>부조회원 구분 & 사업자등록번호</h4>
					<ul class="breakdown-list">
						<li>
							<span>부조회원 구분</span>
							<p id="mypCpaMemberReviewInfo_aidMberFlag"></p>
						</li>
						<li>
							<span>사업자등록번호</span>
							<p id="mypCpaMemberReviewInfo_bizrNo"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>회원등록구분</h4>
					<ul class="breakdown-list">
						<li>
							<span>공인회계사 등록예정일</span>
							<p id="mypCpaMemberReviewInfo_registDe"></p>
						</li>
						<li>
							<span>회원구분</span>
							<p id="mypCpaMemberReviewInfo_mberFlag"></p>
						</li>
						<li>
							<span>감사예정 감사인</span>
							<p id="mypCpaMemberReviewInfo_audit"></p>
						</li>
						<li>
							<span>감사인 구성구분</span>
							<p id="mypCpaMemberReviewInfo_auditOfcps"></p>
						</li>
						<li id="mypCpaMemberReviewInfo_closedClNmHide" style="display:none;">
							<span>회원(휴업)분류</span>
							<p id="mypCpaMemberReviewInfo_closedClNm"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>정보공개설정</h4>
					<ul class="breakdown-list">
						<li>
							<span>정보공개 여부 설정</span>
							<p id="mypCpaMemberReviewInfo_psnlInfoYn"></p>
						</li>
						<li>
							<span>사무소 주소</span>
							<p id="mypCpaMemberReviewInfo_ofcAdresYn"></p>
						</li>
						<li>
							<span>사무소명</span>
							<p id="mypCpaMemberReviewInfo_ofcNameYn"></p>
						</li>
						<li>
							<span>전자메일</span>
							<p id="mypCpaMemberReviewInfo_emailYn"></p>
						</li>
						<li>
							<span>사무소 전회</span>
							<p id="mypCpaMemberReviewInfo_ofcTelYn"></p>
						</li>
						<li>
							<span>사진</span>
							<p id="mypCpaMemberReviewInfo_photoYn"></p>
						</li>
						<li>
							<span>사무소 팩스</span>
							<p id="mypCpaMemberReviewInfo_ofcFaxYn"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>첨부파일 (첨부서류)</h4>
					<ul class="breakdown-list">
						<li>
							<span>공인회계사 합격증 사본</span>
							<p id="mypCpaMemberReviewInfo_passCrtiFileId"></p>
						</li>
						<li>
							<span>이력서</span>
							<p id="mypCpaMemberReviewInfo_rsumFileId"></p>
						</li>
						<li>
							<span>실무수습종료증명서</span>
							<p id="mypCpaMemberReviewInfo_apntcEndFileId"></p>
						</li>
						<li>
							<span>기타</span>
							<p id="mypCpaMemberReviewInfo_atchFileId"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>등록 회비 납부</h4>
					<ul class="breakdown-list">
						<li>
							<span id="mypCpaMemberReviewInfo_etc1"></span>
							<p id="mypCpaMemberReviewInfo_etc2"></p>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaMember_preBtn" onclick="mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_aidDuesInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!--페이지하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaMember_submitBtn" type="button" id="mypCpaMember_reviewInfoSaveBtn">제출</button>
			<button class="btn-sticky mypCpaMember_mypBtn" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}'">확인</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<div class="wrap-loading display-none">

		<div><img src="<c:url value='/images/loadingbar.gif'/>" /></div>

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

<!-- 하단 레이어 팝업(회원정보 저장) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaMemberReg_saveRegPop">
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

			<button class="btn-text-blue" type="button" id="mypCpaMemberReg_saveRegPopCanclBtn">제출취소</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaMemberReg_saveRegPopBtn">제출</button>
			</div>
		</div>
	</div>
</div>

<input type="hidden" id="mypCpaMemberReg_saveData"/>
</body>
</html>