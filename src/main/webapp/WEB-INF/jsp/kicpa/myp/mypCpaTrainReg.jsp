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
<script src="/js/kicpa/myp/mypCpaTrainReg.js?ver=4"></script>
<script>
	$(document).ready(function(){
		mypCpaTrainReg.mypCpaTrainRegInit();
	});
	
	function fncLocation(){
		mypCpaTrainReg.mypCpaTrainReg_backMove();
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
<body id="mypCpaTrainReg_body">
<div class="wrap">

	<!-- 약관동의 -->
	<div class="container myPageTrainInfoTabMove" id="mypCpaTrainReg_agreeInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="javascript:fncLocation();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>수습회계사등록</span>
				<h4>기본실무수습등록 약관동의</h4>
				<p>
					원활한 회원서비스 사용을 위해 아래의 개인정보 수집 및 이용동의 (필수), 개인정보 처리 위탁 동의 (필수), 실무수습 서약서(필수)를 읽고 동의하여 주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>1</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaTrainReg_agreeForm">
					<div class="inp-box">
						<label class="label essen">성명</label>
						<input type="text" name="koreanNm" value="${mypCpaTrainRegKoreanNm}" readonly />
					</div>

					<div class="inp-box">
						<label class="label essen">생년월일</label>
						<input type="text" name="brthdy" value="${mypCpaTrainRegBrthdy}" readonly />
					</div>

					<!-- 약관모두동의 -->
					<div class="inp-box">
						<div class="label essen">약관동의</div>
						<div class="inp-all-check">
							<input type="checkbox" id="mypCpaTrainReg_allAgree" />
							<label for="mypCpaTrainReg_allAgree">모두 동의합니다.</label>
						</div>
					</div>

					<!-- 약관1 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaTrainReg_check" type="checkbox" name="agreeInfoYn1" id="mypCpaTrainReg_agreement1" value="Y"/>
							<label for="mypCpaTrainReg_agreement1">개인정보 수집 및 이용동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 공인회계사의 지도·감독에 관한 사무를 수행하기 위하여 공인회계사  및 수습공인회계사에 대한 개인정보를 아래와 같이 수집하고 있으며, 제공받은 개인정보는  공인회계사 및 수습공인회계사의 사이버교육 제공 등 다양한 서비스제공과 기타 통신연락 수단으로 이용됩니다.<br>
							- 수집 및 이용항목 : 성명, 주민등록번호, 소속, 주소, 전자메일, 전화번호, 휴대폰번호
						</div>
					</div>

					<!-- 약관2 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaTrainReg_check" type="checkbox" name="agreeInfoYn2" id="mypCpaTrainReg_agreement2" value="Y"/>
							<label for="mypCpaTrainReg_agreement2">개인정보 처리 위탁 동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 수습공인회계사의 수습연수와 공인회계사의 연수를 위해 사이버교육 시스템을 구축하여 운영하고 있습니다. 이와 관련하여 한국공인회계사회는 사이버연수 전문업체에 사이버교육을 위탁 운영하고 있으며, 수습공인회계사와 공인회계사의 사이버  교육 서비스 제공을 위하여 아래의 개인정보를 한국공인회계사회가 사이버교육을 위탁 운영하는 업체에 제공하는 것에 대해 동의를 요청합니다.
						</div>
					</div>

					<!-- 약관3 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaTrainReg_check" type="checkbox" name="agreeInfoYn3" id="mypCpaTrainReg_agreement3" value="Y"/>
							<label for="mypCpaTrainReg_agreement3">기본실무수습 서약서 (필수)</label>
						</div>

						<div class="terms_box">
							본인은 공인회계사로서의 인격과 전문가적 능력 함양을 위한 실무수습을 수행하는 경우 관련 법령, 「실무수습에 관한 규정」 및 「회계연수원 운영규칙」 등을 준수하고, 실무수습 종료시까지 성실한 자세로 실무수습에 임할 것이며, 만일 이를 이행하지 못하였을 때에는 관련법규에 따른 조치를 감수하겠음을 서약합니다.
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
			<button class="btn-text-blue" type="button" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove();">마이페이지로 이동</button>
		</div>

		<!-- 시작하기 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaTrainReg_agreeSaveBtn">시작하기</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 사진등록 -->
	<div class="container myPageTrainInfoTabMove" id="mypCpaTrainReg_pictInfo">
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
			<button class="btn-text-back mypCpaTrain_preBtn" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_agreeInfo')" type="button">이전페이지로 이동</button>
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

	<!-- 수습공인회계사 등록 재학여부 -->
	<div class="container myPageTrainInfoTabMove" id="mypCpaTrainReg_grdtSatausInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>수습회계사등록</span>
				<h4>수습공인회계사 등록 재학여부</h4>
				<p>실무수습등록일 현재 대학 및 대학원에 재학중인 경우 실무수습 등록을 할 수 없습니다.<br>
					&lt; 관련규정 : 실무수습규정 제6조제1항제2호 &gt;<br><br>

					현재 대학 및 대학원에 재학하고 있는 경우 아래 사항을 정확하게 입력하여 주시기 바랍니다. 제출된 서류와 입력사항이
					일치하지 않는 경우 실무수습등록일 거부될 수 있습니다.
				</p>
				<div class="step-by">
					<b>3</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaTrainReg_grdtSatausInfoForm">

					<div class="inp-box">
						<label class="label">예외사유</label>
						<div class="terms_box">
							가. 졸업예정학기의 말일(매년 2월말 또는 8월말)로부터 소급하여 3개월 이내에 속하는 경우<br>
							나. 졸업에 필요한 학점을 모두 이수한 경우<br>
							다. 졸업예정학기를 야간 또는 온라인으로 수강하는 경우(이 경우 수강신청필증과 단과대학장 이상의 확인서 등 그 사실을 확인할 수 있는 서류를 제출하여야 한다)<br>
							라. 졸업예정학기를 학칙에 따라 취업으로 인한 결석을 사유로 공결로 인정받은 경우(이 경우 단과대학장 이상의 확인서 등 그 사실을 확인할 수 있는서류를 제출하여야 한다<br>
							마. 방학기간 중에는 등록 가능함 (현재 규정개정 중, 금융위 승인 대기중)
						</div>
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaTrainReg_grdtSatausInfoGrdtSataus">대학 및 대학원 재학여부</label>

						<select name="grdtSataus" id="mypCpaTrainReg_grdtSatausInfoGrdtSataus">
							<option selected value=''>선택하세요</option>
							<option value="00000010">졸업 또는 미재학</option>
							<option value="00000020">재학중</option>
						</select>
					</div>

					<div class="inp-box mypCpaTrainReg_grdtSatausInfoTrigger" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_grdtSatausInfoGrdtDe">졸업예정일</label>
						<input type="date" id="mypCpaTrainReg_grdtSatausInfoGrdtDe" name="grdtDe" data-placeholder="졸업예정년월을 선택하세요." max="9999-12-31" required />
					</div>

					<div class="inp-box mypCpaTrainReg_grdtSatausInfoTrigger" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_grdtSatausInfoStartDe">방학기간 시작일</label>
						<input type="date" id="mypCpaTrainReg_grdtSatausInfoStartDe" name="vacationStrDe" data-placeholder="년월일을 선택하세요." max="9999-12-31" required />
					</div>

					<div class="inp-box mypCpaTrainReg_grdtSatausInfoTrigger" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_grdtSatausInfoEndDe">방학기간 종료일</label>
						<input type="date" id="mypCpaTrainReg_grdtSatausInfoEndDe" name="vacationEndDe" data-placeholder="년월일을 선택하세요." max="9999-12-31" required />
					</div>


				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_pictInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaTrainReg_grdtSatausInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 이력정보 -->
	<div class="container myPageTrainInfoTabMove" id="mypCpaTrainReg_apntcCpaHistInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>수습회계사등록</span>
				<h4>이력정보</h4>
				<p>이력정보를 등록하세요.</p>
				<div class="step-by">
					<b>4</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaTrainReg_apntcCpaHistInfoForm">

					<div class="inp-box">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoAppRegistDe">실무수습 개시일</label>
						<input type="date" id="mypCpaTrainReg_apntcCpaHistInfoAppRegistDe" name="appRegistDe" data-placeholder="날짜를 입력하세요." max="9999-12-31" required />
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoGuideCpa">지도공인회계사</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaTrainReg_apntcCpaHistInfoGuideCpa" name="guideCpaNm" placeholder="회계사 성명등록" title="회계사 성명등록"/>
							<input type="text" style="width: 100%;" id="mypCpaTrainReg_apntcCpaHistInfoGuideCpaId" name="guideCpaNo" placeholder="회계사 번호등록" title="회계사 번호등록"/>
						</div>
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoAppInsttNm">실무수습기관</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttNm" name="appInsttNm" placeholder="실무수습기관 등록" title="실무수습기관 등록" readonly/>
							<input type="text" style="width: 100%;" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttCd" name="appInsttCd" placeholder="실무수습기관 번호등록" title="실무수습기관 번호등록" readonly/>
							<input type="hidden" name="audGrpCl" id="mypCpaTrainReg_apntcCpaHistInfoAudGrpCl"/>
						</div>
					</div>

					<div class="inp-box mypTrainAppInsttEtcYn" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc">수습기관명</label>
						<input type="text" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc" name="appInsttEtc" placeholder="수습기관명을 입력하세요."/>
					</div>

					<div class="inp-box mypTrainAppInsttEtcYn" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcDept">부서명</label>
						<input type="text" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcDept" name="appInsttEtcDept" placeholder="부서명을 입력하세요."/>
					</div>

					<div class="inp-box mypTrainAppInsttEtcYn" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcTask">담당업무</label>
						<input type="text" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcTask" name="appInsttEtcTask" placeholder="담당업무를 입력하세요."/>
					</div>

					<div class="inp-box">
						<label class="label" for="mypCpaTrainReg_apntcCpaHistInfoEmployCl">고용형태</label>

						<select name="employCl" id="mypCpaTrainReg_apntcCpaHistInfoEmployCl">
							<option selected value=''>선택하세요</option>
							<option value="A1130010">정규직</option>
							<option value="A1130020">파트타임</option>
							<option value="A1130030">인턴쉽</option>
						</select>
					</div>

					<div class="inp-box mypCpaTrainReg_employClInfoTrigger" style="display: none;">
						<label class="label essen" for="mypCpaTrainReg_apntcCpaHistInfoCtrtEndDe">계약종료예정일</label>
						<input type="date" id="mypCpaTrainReg_apntcCpaHistInfoCtrtEndDe" name="ctrtEndDe" data-placeholder="날짜를 입력하세요." max="9999-12-31" required />
					</div>

				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_grdtSatausInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaTrainReg_apntcCpaHistInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 첨부파일(첨부서류) -->
	<div class="container myPageTrainInfoTabMove" id="mypCpaTrainReg_atchFileInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>수습회계사등록</span>
				<h4>첨부파일 (첨부서류)</h4>
				<p>수습회계사 등록에 필요한 첨부파일을 등록하세요.</p>
				<div class="step-by">
					<b>5</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaTrainReg_atchFileInfoForm">

					<input type="hidden" name="atchFileId1FlagYn" id="mypCpaTrainReg_atchFileId1FlagYn"/>

					<div class="inp-box mypCpaTrainReg_atchFileInfoAtchFileAdd1">
						<div class="label essen">최종학교졸업증명서 혹은 졸업예정증명서</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoAtchFileId1" name="atchFileId1" readonly/>
						<label class="select" for="mypCpaTrainReg_atchFileInfoAtchFileId1">파일을 등록해 주세요</label>
						<input type="hidden" name="atchFileId1Set" id="mypCpaTrainReg_atchFileInfoAtchFileId1Set"/>
						<button type="button" class="regFlagFDelHide1" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFDelHide1')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box mypCpaTrainReg_atchFileInfoAtchFileAdd1">
						<div class="label">실무수습계획서 (본회 홈페이지 자료실-공시·자료실-서식자료-수습공인회계 관련 참고)</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoAtchFileId2" name="atchFileId2" readonly/>
						<label for="mypCpaTrainReg_atchFileInfoAtchFileId2">파일을 등록해 주세요</label>
						<input type="hidden" name="atchFileId2Set" id="mypCpaTrainReg_atchFileInfoAtchFileId2Set"/>
						<button type="button" class="regFlagFDelHide2" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFDelHide2')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box mypCpaTrainReg_atchFileInfoAtchFileAdd1">
						<div class="label">학사일정 (재학중인 경우 첨부파일 등록)</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoAtchFileId3" name="atchFileId3" readonly/>
						<label for="mypCpaTrainReg_atchFileInfoAtchFileId3">파일을 등록해 주세요</label>
						<input type="hidden" name="atchFileId3Set" id="mypCpaTrainReg_atchFileInfoAtchFileId3Set"/>
						<button type="button" class="regFlagFDelHide3" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFDelHide3')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box mypCpaTrainReg_atchFileInfoAtchFileAdd1">
						<div class="label">기타</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoAtchFileId4" name="atchFileId4" readonly/>
						<label for="mypCpaTrainReg_atchFileInfoAtchFileId4">파일을 등록해 주세요</label>
						<input type="hidden" name="atchFileId4Set" id="mypCpaTrainReg_atchFileInfoAtchFileId4Set"/>
						<button type="button" class="regFlagFDelHide4" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFDelHide4')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label essen">합격증서 사본 (또는 금융감독원의 '시험합격사실확인서' https://cpa.fss.or.kr )</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoPassCrtiFileId" name="passCrtiFileId" readonly/>
						<label for="mypCpaTrainReg_atchFileInfoPassCrtiFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="passCrtiFileIdSet" id="mypCpaTrainReg_atchFileInfoPassCrtiFileIdSet"/>
						<button type="button" class="regFlagFPassCrtiDelHide" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFPassCrtiDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label essen">재직증명서</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoEmplCrtiFileId" name="emplCrtiFileId" readonly/>
						<label for="mypCpaTrainReg_atchFileInfoEmplCrtiFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="emplCrtiFileIdSet" id="mypCpaTrainReg_atchFileInfoEmplCrtiFileIdSet"/>
						<button type="button" class="regFlagFEmplCrtiDelHide" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFEmplCrtiDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

					<div class="inp-box">
						<div class="label essen">이력서</div>
						<input class="mypCpaTrainReg_fileChange" type="file" id="mypCpaTrainReg_atchFileInfoRsumFileId" name="rsumFileId" readonly/>
						<label for="mypCpaTrainReg_atchFileInfoRsumFileId">파일을 등록해 주세요</label>
						<input type="hidden" name="rsumFileIdSet" id="mypCpaTrainReg_atchFileInfoRsumFileIdSet"/>
						<input type="hidden" name="eventnSet" id="mypCpaTrainReg_atchFileInfoEventnSet"/>
						<button type="button" class="regFlagFRsumFileDelHide" onclick="mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('regFlagFRsumFileDelHide')" style="display:none; position: absolute; right: 0; border: 1px solid #0070C0; border-radius: 1.6rem; height: 2.4rem; padding: 0 2.2rem; font-size: 1.4rem; font-weight: 400; line-height: 2rem; color: #0070C0;">삭제</button>
					</div>

				</form>
			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_apntcCpaHistInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaTrainReg_atchFileInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 검토 및 제출 -->
	<div class="container myPageTrainInfoTabMove" id="mypCpaTrainReg_reviewInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypCpaTrainReg.mypCpaTrainReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>수습회계사등록</span>
				<h4>수습회계사 등록 검토<br>및 제출 항목 안내</h4>
				<p>
					등록하신 정보가 맞는지 확인하시고<br />
					제출 버튼을 눌러주세요.
				</p>
				<div class="step-by">
					<b>6</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<p class="submit-txt" id="mypCpaTrainReg_trainRegForm">
					수습공인회계사<br />
					등록신청서
				</p>

				<div class="cont-line">
					<h4>사진등록</h4>
					<ul class="breakdown-list">
						<li>
							<span>사진등록</span>
							<p id="mypCpaTrainRegReviewInfo_pictFileNm"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>수습공인회계사 등록 재학여부</h4>
					<ul class="breakdown-list">
						<li>
							<span>대학 및 대학원 재학여부</span>
							<p id="mypCpaTrainRegReviewInfo_grdtStaus"></p>
						</li>
						<li>
							<span>졸업예정일</span>
							<p id="mypCpaTrainRegReviewInfo_grdtDe"></p>
						</li>
						<li>
							<span>방학기간</span>
							<p id="mypCpaTrainRegReviewInfo_vacationDe"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>이력정보</h4>
					<ul class="breakdown-list">
						<li>
							<span>실무수습 개시일</span>
							<p id="mypCpaTrainRegReviewInfo_appRegistDe"></p>
						</li>
						<li>
							<span>지도공인회게사</span>
							<p id="mypCpaTrainRegReviewInfo_guideCpa"></p>
						</li>
						<li>
							<span>실무수습기관</span>
							<p id="mypCpaTrainRegReviewInfo_appInstt"></p>
						</li>
						<li>
							<span>수습기관명</span>
							<p id="mypCpaTrainRegReviewInfo_appInsttEtc"></p>
						</li>
						<li>
							<span>부서명</span>
							<p id="mypCpaTrainRegReviewInfo_appInsttEtcDept"></p>
						</li>
						<li>
							<span>담당업무</span>
							<p id="mypCpaTrainRegReviewInfo_appInsttEtcTask"></p>
						</li>
						<li>
							<span>고용형태</span>
							<p id="mypCpaTrainRegReviewInfo_employCl"></p>
						</li>
						<li>
							<span>계약종료예정일</span>
							<p id="mypCpaTrainRegReviewInfo_ctrtEndDe"></p>
						</li>
					</ul>
				</div>

				<div class="cont-line">
					<h4>첨부파일 (첨부서류)</h4>
					<ul class="breakdown-list">
						<li>
							<span>최종학교졸업증명서 혹은 졸업예정증명서</span>
							<p id="mypCpaTrainRegReviewInfo_atchFileId1"></p>
						</li>
						<li class="mypTrainReview_atchFileId2">
							<span>실무수습계획서</span>
							<p id="mypCpaTrainRegReviewInfo_atchFileId2"></p>
						</li>
						<li class="mypTrainReview_atchFileId3">
							<span>학사일정</span>
							<p id="mypCpaTrainRegReviewInfo_atchFileId3"></p>
						</li>
						<li class="mypTrainReview_atchFileId4">
							<span>기타</span>
							<p id="mypCpaTrainRegReviewInfo_atchFileId4"></p>
						</li>
						<li>
							<span>합격증서 사본</span>
							<p id="mypCpaTrainRegReviewInfo_passCrtiFileId"></p>
						</li>
						<li>
							<span>재직증명서</span>
							<p id="mypCpaTrainRegReviewInfo_emplCrtiFileId"></p>
						</li>
						<li>
							<span>이력서</span>
							<p id="mypCpaTrainRegReviewInfo_rsumFileId"></p>
						</li>
					</ul>
				</div>

			</div>


		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaTrain_preBtn" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_atchFileInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!--페이지하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaTrain_submitBtn" type="button" id="mypCpaTrainReg_reviewInfoSaveBtn">제출</button>
			<button class="btn-sticky mypCpaTrain_mypBtn" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaTrainRegPin}'">확인</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<div class="wrap-loading display-none">

		<div><img src="<c:url value='/images/loadingbar.gif'/>" /></div>

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

<!-- 하단 레이어 팝업(합격자정보 저장) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaTrainReg_saveRegPop">
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

			<button class="btn-text-blue" type="button" id="mypCpaTrainReg_saveRegPopCanclBtn">제출취소</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaTrainReg_saveRegPopBtn">제출</button>
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