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
<script src="/js/kicpa/myp/mypCpaPassReg.js"></script>
<script>
	$(document).ready(function(){
		mypPassReg.mypPassRegInit();
	});
	
	function fncLocation(){
		mypPassReg.mypPassReg_backMove();
	}
</script>
<body id="mypCpaPassReg_body">
<div class="wrap">

	<!-- 약관동의 -->
	<div class="container myPageInfoTabMove" id="mypCpaPassReg_agreeInfo">
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="javascript:fncLocation();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>합격자등록</span>
				<h4>약관동의</h4>
				<p>
					원활한 회원서비스 사용을 위해 아래의 개인정보 수집 및 이용동의 (필수), 개인정보 처리 위탁 동의 (필수)를 읽고 동의하여 주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>1</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaPassReg_agreeForm">
					<div class="inp-box">
						<label class="label essen">성명</label>
						<input type="text" name="koreanNm" value="${cpaPassRealInfo[0].koreanNm}" readonly />
					</div>

					<div class="inp-box">
						<label class="label essen">생년월일</label>
						<input type="text" name="brthdy" value="${cpaPassRealInfo[0].brthdy}" readonly />
					</div>

					<!-- 약관모두동의 -->
					<div class="inp-box">
						<div class="label essen">약관동의</div>
						<div class="inp-all-check">
							<input type="checkbox" id="mypCpaPassReg_allAgree" />
							<label for="mypCpaPassReg_allAgree">모두 동의합니다.</label>
						</div>
					</div>

					<!-- 약관1 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaPassReg_check" type="checkbox" name="agreeInfo1Yn" id="mypCpaPassReg_agreement" value="Y"/>
							<label for="mypCpaPassReg_agreement">개인정보 수집 및 이용동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 공인회계사의 지도·감독에 관한 사무를 수행하기 위하여 공인회계사  및 수습공인회계사에 대한 개인정보를 아래와 같이 수집하고 있으며, 제공받은 개인정보는  공인회계사 및 수습공인회계사의 사이버교육 제공 등 다양한 서비스제공과 기타 통신연락 수단으로 이용됩니다.<br>
							- 수집 및 이용항목 : 성명, 주민등록번호, 소속, 주소, 전자메일, 전화번호, 휴대폰번호
						</div>
					</div>

					<!-- 약관2 -->
					<div class="inp-box">
						<div class="inp-check">
							<input class="mypCpaPassReg_check" type="checkbox" name="agreeInfo2Yn" id="mypCpaPassReg_agreement2" value="Y"/>
							<label for="mypCpaPassReg_agreement2">개인정보 처리 위탁 동의 (필수)</label>
						</div>

						<div class="terms_box">
							한국공인회계사회는 수습공인회계사의 수습연수와 공인회계사의 연수를 위해 사이버교육 시스템을 구축하여 운영하고 있습니다. 이와 관련하여 한국공인회계사회는 사이버연수 전문업체에 사이버교육을 위탁 운영하고 있으며, 수습공인회계사와 공인회계사의 사이버  교육 서비스 제공을 위하여 아래의 개인정보를 한국공인회계사회가 사이버교육을 위탁 운영하는 업체에 제공하는 것에 대해 동의를 요청합니다.
						</div>
					</div>

					<div class="inp-messeage">
						개인정보 수집 및 이용, 개인정보 처리 위탁 동의에 대한 안내 모두 동의해주세요.
					</div>
				</form>
			</div>
		</section>

		<!-- 마이페이지로 이동 버튼-->
		<div class="btn-page-bottom">
			<button class="btn-text-blue" type="button" onclick="mypPassReg.mypPassReg_backMove();">마이페이지로 이동</button>
		</div>

		<!-- 시작하기 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaPassReg_agreeSaveBtn">시작하기</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 기본정보 (성명) -->
	<div class="container myPageInfoTabMove" id="mypCpaPassReg_nameInfo">
		<section class="head-pop">
			<h3 class="mypCpaPassReg_titleNm">등록</h3>
			<button class="btn-close" type="button" onclick="mypPassReg.mypPassReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box mypCpaPassReg_titleYn">
				<span>합격자등록</span>
				<h4>합격자 기본정보</h4>
				<p>
					* 필수항목은 반드시 기재해주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>2</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaPassReg_passInfoForm">
					<div class="inp-box">
						<label class="label essen" for="mypCpaPassReg_koreanNm">성명(한글)</label>
						<input type="text" id="mypCpaPassReg_koreanNm" name="koreanNm" value="${cpaPassRealInfo[0].koreanNm}" readonly />
					</div>

					<div class="inp-box">
						<label class="label" for="mypCpaPassReg_chcrtNm">성명(한자)</label>
						<input type="text" id="mypCpaPassReg_chcrtNm" name="chcrtNm" placeholder="성명(한자)를 입력하세요."/>
					</div>

					<div class="inp-box">
						<label class="label" for="mypCpaPassReg_engNm">성명(영어)</label>
						<input type="text" id="mypCpaPassReg_engNm" name="engNm" placeholder="성명(영어)를 입력하세요."/>
					</div>
				</form>
			</div>
		</section>


		<!-- 개인정보화면 이동(수정모드) -->
		<div class="btn-page-bottom">
			<button class="btn-text-blue mypCpaPassReg_backBtn" onclick="mypPassReg.mypPassReg_backMove();" type="button">취소</button>
		</div>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaPassReg_preBtn" onclick="mypPassReg.mypPassReg_tabMove('mypCpaPassReg_agreeInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaPassReg_nextBtn" type="button" id="mypCpaPassReg_nameInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 자택&직장주소 -->
	<div class="container myPageInfoTabMove" id="mypCpaPassReg_adresInfo">
		<section class="head-pop">
			<h3 class="mypCpaPassReg_titleNm">등록</h3>
			<button class="btn-close" type="button" onclick="mypPassReg.mypPassReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box mypCpaPassReg_titleYn">
				<span>합격자등록</span>
				<h4>자택&직장주소</h4>
				<p>
					* 필수항목은 반드시 기재해주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>3</b> / <em>6</em>
				</div>
			</div>

			<form id="mypCpaPassReg_adressInfoForm">
				<fieldset>
					<!-- 자택정보 -->
					<div class="add-box">
						<div class="title">
							<span style="font-size: 1.7rem; font-weight: 600;">자택정보</span>
						</div>

						<div class="form">
							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_houseInfoZipCd">우편번호</label>
								<input type="text" id="mypCpaPassReg_houseInfoZipCd" name="husZipCd" onclick="mypPassReg.mypAdresGoPopup('H');" placeholder="우편번호를 입력하세요."/>
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_houseInfoAdres">주소</label>
								<input type="text" id="mypCpaPassReg_houseInfoAdres" name="husAdres" onclick="mypPassReg.mypAdresGoPopup('H');" placeholder="주소를 입력하세요."/>
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_houseInfoAdresDt">상세주소</label>
								<input type="text" id="mypCpaPassReg_houseInfoAdresDt" name="husAdresDetail" placeholder="상세주소를 입력하세요."/>
								<input type="hidden" name="husLegalCd" id="mypCpaPassReg_houseInfoLegalCd"/>
								<input type="hidden" name="husBdNm" id="mypCpaPassReg_houseInfoBdNm"/>
								<input type="hidden" name="husBdMgtSn" id="mypCpaPassReg_houseInfoBdMgtSn"/>
							</div>

							<div class="inp-box">
								<label class="label essen">우편물 수령여부</label>
							</div>
							<div class="inp-check">
								<input type="radio" name="postSndngYn" value="H" id="mypCpaPassReg_postSndngH" checked/>
								<label for="mypCpaPassReg_postSndngH" style="margin-right: 10px;">자택</label>
								<input class="mypCpaPassReg_postOfficeHidden" type="radio" name="postSndngYn" value="O" id="mypCpaPassReg_postSndngO" style="display: none;"/>
								<label class="mypCpaPassReg_postOfficeHidden" for="mypCpaPassReg_postSndngO" style="display: none;">직장</label>
							</div>
						</div>
					</div>

					<!-- 직장정보 -->
					<div class="add-box">
						<div class="title">
							<span style="font-size: 1.7rem; font-weight: 600;">직장정보</span>
							<%--<div class="b-area">
								<button type="button" class="btn-round-sm" style="width: 9.5rem;">직장정보삭제</button>
							</div>--%>
						</div>

						<div class="form">
							<div class="inp-check" style="margin-bottom: 20px;">
								<input type="checkbox" name="ofcRegYn" id="mypCpaPassReg_ofcRegYn" value="Y" <c:if test="${cpaMemFlagInfo[0].mberFlag eq 'A2020010' && cpaMemFlagInfo[0].audGrpCl eq 'A3010010'}">onclick='return false;' </c:if>/>
								<label for="mypCpaPassReg_ofcRegYn">직장정보 등록 체크</label>
							</div>

							<div id="mypCpaPassReg_ofcInfoReg">
								<div class="inp-box">
									<label class="label essen" for="mypCpaPassReg_officeInfoZipCd">직장 우편번호</label>
									<input type="text" id="mypCpaPassReg_officeInfoZipCd" <c:if test="${cpaMemFlagInfo[0].mberFlag ne 'A2020010' || cpaMemFlagInfo[0].audGrpCl ne 'A3010010'}">onclick="mypPassReg.mypAdresGoPopup('O');"</c:if> name="ofcZipCd" placeholder="직장 우편번호를 입력하세요." <c:if test="${cpaMemFlagInfo[0].mberFlag eq 'A2020010' && cpaMemFlagInfo[0].audGrpCl eq 'A3010010'}">style="background-color: #fafafa;" readonly</c:if>/>
								</div>

								<div class="inp-box">
									<label class="label essen" for="mypCpaPassReg_officeInfoAdres">직장 주소</label>
									<input type="text" id="mypCpaPassReg_officeInfoAdres" <c:if test="${cpaMemFlagInfo[0].mberFlag ne 'A2020010' || cpaMemFlagInfo[0].audGrpCl ne 'A3010010'}">onclick="mypPassReg.mypAdresGoPopup('O');"</c:if> name="ofcAdres" placeholder="직장 주소를 입력하세요." <c:if test="${cpaMemFlagInfo[0].mberFlag eq 'A2020010' && cpaMemFlagInfo[0].audGrpCl eq 'A3010010'}">style="background-color: #fafafa;" readonly</c:if>/>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoAdresDt">직장 상세주소</label>
									<input type="text" id="mypCpaPassReg_officeInfoAdresDt" name="ofcAdresDetail" placeholder="직장 상세주소를 입력하세요." <c:if test="${cpaMemFlagInfo[0].mberFlag eq 'A2020010' && cpaMemFlagInfo[0].audGrpCl eq 'A3010010'}">style="background-color: #fafafa;" readonly</c:if>/>
									<input type="hidden" name="ofcLegalCd" id="mypCpaPassReg_officeInfoLegalCd"/>
									<input type="hidden" name="ofcBdNm" id="mypCpaPassReg_officeInfoBdNm"/>
									<input type="hidden" name="ofcBdMgtSn" id="mypCpaPassReg_officeInfoBdMgtSn"/>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoTelNo1">직장 전화번호</label>
									<div class="phone" style="display: flex;">
										<input type="text" style="width: 100%;" id="mypCpaPassReg_officeInfoTelNo1" name="ofcTelNo1" maxlength="4" placeholder="XXX" title="직장 전화번호 첫째자리"/>
										<input type="text" style="width: 100%;" id="mypCpaPassReg_officeInfoTelNo2" name="ofcTelNo2" maxlength="4" placeholder="XXXX" title="직장 전화번호 중간자리"/>
										<input type="text" style="width: 100%;" id="mypCpaPassReg_officeInfoTelNo3" name="ofcTelNo3" maxlength="4" placeholder="XXXX" title="직장 전화번호 끝자리"/>
									</div>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoFax1">FAX</label>
									<div class="phone" style="display: flex;">
										<input type="text" style="width: 100%;" id="mypCpaPassReg_officeInfoFax1" name="ofcFaxNo1" maxlength="4" placeholder="XXX" title="FAX 첫째자리"/>
										<input type="text" style="width: 100%;" id="mypCpaPassReg_officeInfoFax2" name="ofcFaxNo2" maxlength="4" placeholder="XXXX" title="FAX 중간자리"/>
										<input type="text" style="width: 100%;" id="mypCpaPassReg_officeInfoFax3" name="ofcFaxNo3" maxlength="4" placeholder="XXXX" title="FAX 끝자리"/>
									</div>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoOficeNm">직장명</label>
									<input type="text" id="mypCpaPassReg_officeInfoOficeNm" name="oficeNm" placeholder="직장명을 입력하세요." <c:if test="${cpaMemFlagInfo[0].mberFlag eq 'A2020010' && cpaMemFlagInfo[0].audGrpCl eq 'A3010010'}">style="background-color: #fafafa;" readonly</c:if>/>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoRspOfc">직책</label>
									<input type="text" id="mypCpaPassReg_officeInfoRspOfc" name="rspOfc" placeholder="직책을 입력하세요."/>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoSectionNm">부서(국/실)</label>
									<input type="text" id="mypCpaPassReg_officeInfoSectionNm" name="sectionNm" placeholder="부서(국/실)을 입력하세요."/>
								</div>

								<div class="inp-box">
									<label class="label" for="mypCpaPassReg_officeInfoDeptNm">하위부서(과)</label>
									<input type="text" id="mypCpaPassReg_officeInfoDeptNm" name="deptNm" placeholder="하위부서(과)를 입력하세요."/>
								</div>

								<div class="inp-box cpaRegMemFlag" style="display: none;">
									<label class="label" for="mypCpaPassReg_closedClNm">회원(휴업) 분류</label>
									<input type="text" id="mypCpaPassReg_closedClNm" name="closedClNm" placeholder="회원(휴업)분류를 등록하세요."/>
									<input type="hidden" id="mypCpaPassReg_closedCl" name="closedCl"/>
								</div>
							</div>
						</div>
					</div>

				</fieldset>
			</form>

		</section>

		<!-- 개인정보화면 이동(수정모드) -->
		<div class="btn-page-bottom mypCpaPassReg_backBtn">
			<button class="btn-text-blue" onclick="mypPassReg.mypPassReg_backMove();" type="button">취소</button>
		</div>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom mypCpaPassReg_preBtn">
			<button class="btn-text-back" onclick="mypPassReg.mypPassReg_tabMove('mypCpaPassReg_nameInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaPassReg_nextBtn" type="button" id="mypCpaPassReg_adressInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 연락처 -->
	<div class="container myPageInfoTabMove" id="mypCpaPassReg_contactInfo">
		<section class="head-pop">
			<h3 class="mypCpaPassReg_titleNm">등록</h3>
			<button class="btn-close" type="button" onclick="mypPassReg.mypPassReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box mypCpaPassReg_titleYn">
				<span>합격자등록</span>
				<h4>연락처</h4>
				<p>
					* 필수항목은 반드시 기재해주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>4</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">
				<form id="mypCpaPassReg_contactInfoForm">
					<div class="inp-box">
						<label class="label essen" for="mypCpaPassReg_contactInfoPhonNo1">휴대전화</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaPassReg_contactInfoPhonNo1" name="moblPhonNo1" maxlength="4" placeholder="XXX" title="휴대전화 첫째자리"/>
							<input type="text" style="width: 100%;" id="mypCpaPassReg_contactInfoPhonNo2" name="moblPhonNo2" maxlength="4" placeholder="XXXX" title="휴대전화 중간자리"/>
							<input type="text" style="width: 100%;" id="mypCpaPassReg_contactInfoPhonNo3" name="moblPhonNo3" maxlength="4" placeholder="XXXX" title="휴대전화 끝자리"/>
						</div>
					</div>

					<div class="inp-box">
						<label class="label" for="mypCpaPassReg_contactInfoHouseTel1">자택전화</label>
						<div class="phone" style="display: flex;">
							<input type="text" style="width: 100%;" id="mypCpaPassReg_contactInfoHouseTel1" name="husTelNo1" maxlength="4" placeholder="XXX" title="자택전화 첫째자리"/>
							<input type="text" style="width: 100%;" id="mypCpaPassReg_contactInfoHouseTel2" name="husTelNo2" maxlength="4" placeholder="XXXX" title="자택전화 중간자리"/>
							<input type="text" style="width: 100%;" id="mypCpaPassReg_contactInfoHouseTel3" name="husTelNo3" maxlength="4" placeholder="XXXX" title="자택전화 끝자리"/>
						</div>
					</div>

					<div class="inp-box">
						<label class="label essen" for="mypCpaPassReg_contactInfoMainEmail">기본메일</label>
						<input type="text" id="mypCpaPassReg_contactInfoMainEmail" name="mainEmail" placeholder="기본메일을 입력하세요."/>
					</div>

					<div class="inp-box">
						<label class="label" for="mypCpaPassReg_contactInfoSubEmail">보조메일</label>
						<input type="text" id="mypCpaPassReg_contactInfoSubEmail" name="subEmail" placeholder="보조메일을 입력하세요."/>
					</div>

					<div class="inp-box">
						<label class="label essen">메일 수신여부</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="emailSndngYn" value="Y" id="mypCpaPassReg_contactInfoEmailSndngY" checked/>
						<label for="mypCpaPassReg_contactInfoEmailSndngY" style="margin-right: 10px;">수신</label>
						<input type="radio" name="emailSndngYn" value="N" id="mypCpaPassReg_contactInfoEmailSndngN"/>
						<label for="mypCpaPassReg_contactInfoEmailSndngN">미수신</label>
					</div>

					<div class="inp-box" style="margin-top: 15px;">
						<label class="label essen">문자 수신여부</label>
					</div>
					<div class="inp-check">
						<input type="radio" name="smsSndngYn" value="Y" id="mypCpaPassReg_contactInfoSmsSndngY" checked/>
						<label for="mypCpaPassReg_contactInfoSmsSndngY" style="margin-right: 10px;">수신</label>
						<input type="radio" name="smsSndngYn" value="N" id="mypCpaPassReg_contactInfoSmsSndngN"/>
						<label for="mypCpaPassReg_contactInfoSmsSndngN">미수신</label>
					</div>
				</form>
			</div>
		</section>

		<!-- 개인정보화면 이동(수정모드) -->
		<div class="btn-page-bottom">
			<button class="btn-text-blue mypCpaPassReg_backBtn" onclick="mypPassReg.mypPassReg_backMove();" type="button">취소</button>
		</div>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaPassReg_preBtn" onclick="mypPassReg.mypPassReg_tabMove('mypCpaPassReg_adresInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaPassReg_nextBtn" type="button" id="mypCpaPassReg_contactInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 학력사항 -->
	<div class="container myPageInfoTabMove" id="mypCpaPassReg_acdmcrInfo">
		<section class="head-pop">
			<h3 class="mypCpaPassReg_titleNm">등록</h3>
			<button class="btn-close" type="button" onclick="mypPassReg.mypPassReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box mypCpaPassReg_titleYn">
				<span>합격자등록</span>
				<h4>학력사항</h4>
				<p>
					* 필수항목은 반드시 기재해주시기 바랍니다.
				</p>
				<div class="step-by">
					<b>5</b> / <em>6</em>
				</div>
			</div>

			<form>
				<fieldset>
					<!-- 고등학교 등록 -->
					<div class="add-box">
						<div class="title">
							<span style="font-size: 1.7rem; font-weight: 600;">고등학교 등록</span>
						</div>

						<div class="form">
							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoSchulCl">학력</label>
								<select class="select" id="mypCpaPassReg_acdmcrInfoSchulCl" name="schulCl">
									<option value="A2230010" selected>고등학교</option>
								</select>
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoDegree">학위</label>
								<select class="select" id="mypCpaPassReg_acdmcrInfoDegree" name="degree">
									<option value="A9030010" selected>졸업</option>
								</select>
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoSchulNm">학교명</label>
								<input type="text" id="mypCpaPassReg_acdmcrInfoSchulNm" name="schulNm" placeholder="전체명으로 입력하세요. 예) 서울고등학교"/>
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoGrdtnYear">졸업년도</label>
								<input type="text" id="mypCpaPassReg_acdmcrInfoGrdtnYear" name="grdtnYear" maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="졸업년도를 선택하세요." required />
							</div>

							<div class="inp-box" style="display: none;">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoMajor">전공</label>
								<input type="text" id="mypCpaPassReg_acdmcrInfoMajor" value="-" name="major" placeholder="전공을 입력하세요. 예) 경영학부 회계전공"/>
							</div>

							<input type="hidden" name="acdmcrSn" id="mypCpaPassReg_acdmcrInfoAcdmcrSn"/>
						</div>
					</div>

					<!-- 대학교 등록 -->
					<div class="add-box">
						<div class="title">
							<span style="font-size: 1.7rem; font-weight: 600;">대학교 등록</span>
						</div>

						<div class="form">
							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoSchulCl2">학력</label>
								<select class="select" id="mypCpaPassReg_acdmcrInfoSchulCl2" name="schulCl">
									<option value="A2230030" selected>대학교</option>
								</select>
							</div>

							<div class="inp-box">
								<label class="label" for="mypCpaPassReg_acdmcrInfoDegree2">학위</label>
								<select class="select" id="mypCpaPassReg_acdmcrInfoDegree2" name="degree">
									<option selected value=''>선택하세요</option>
									<option value="A9030010">졸업</option>
									<option value="A9030020">학사</option>
									<option value="A9030030">석사</option>
									<option value="A9030040">박사</option>
									<option value="A9030050">수료</option>
								</select>
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoSchulNm2">학교명</label>
								<input type="text" id="mypCpaPassReg_acdmcrInfoSchulNm2" name="schulNm" placeholder="전체명으로 입력하세요. 예) 서울고등학교"/>
							</div>

							<div class="inp-box">
								<label class="label" for="mypCpaPassReg_acdmcrInfoGrdtnYear2">졸업년도</label>
								<input type="text" id="mypCpaPassReg_acdmcrInfoGrdtnYear2" name="grdtnYear" maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="졸업년도를 선택하세요." required />
							</div>

							<div class="inp-box">
								<label class="label essen" for="mypCpaPassReg_acdmcrInfoMajor2">전공</label>
								<input type="text" id="mypCpaPassReg_acdmcrInfoMajor2" name="major" placeholder="전공을 입력하세요. 예) 경영학부 회계전공"/>
							</div>

							<input type="hidden" name="acdmcrSn" id="mypCpaPassReg_acdmcrInfoAcdmcrSn2"/>
						</div>
					</div>

					<div id="mypCpaPassReg_acdmcrInfoAdd">

					</div>

					<div id="mypCpaPassReg_acdmcrInfoDel">

					</div>

					<div class="btn-line-plus">
						<button type="button" id="mypCpaPassReg_acdmcrInfoAddBtn"><span>학력추가</span></button>
					</div>

				</fieldset>
			</form>

		</section>

		<!-- 개인정보화면 이동(수정모드) -->
		<div class="btn-page-bottom">
			<button class="btn-text-blue mypCpaPassReg_backBtn" onclick="mypPassReg.mypPassReg_backMove();" type="button">취소</button>
		</div>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaPassReg_preBtn" onclick="mypPassReg.mypPassReg_tabMove('mypCpaPassReg_contactInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지 하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky mypCpaPassReg_nextBtn" type="button" id="mypCpaPassReg_acdmcrInfoSaveBtn">다음</button>
		</div>

		<!-- 사이드 버튼 -->
		<aside class="fix-side">
			<span onclick="window.scrollTo(0,0);" class="btn-top">TOP</span>
		</aside>
	</div>

	<!-- 검토 및 제출 -->
	<div class="container myPageInfoTabMove" id="mypCpaPassReg_reviewInfo">
		<!-- 헤더 -->
		<section class="head-pop">
			<h3>등록</h3>
			<button class="btn-close" type="button" onclick="mypPassReg.mypPassReg_backMove();">
				<span>닫기</span>
			</button>
		</section>

		<section class="content">

			<div class="step-box">
				<span>합격자 등록</span>
				<h4>검토 및 제출</h4>
				<p>
					등록하신 정보가 맞는지 확인하시고<br />
					제출 버튼을 눌러주세요.
				</p>
				<div class="step-by">
					<b>6</b> / <em>6</em>
				</div>
			</div>

			<div class="mypage-wrap">

				<div class="cont">
					<h4>합격자 기본정보</h4>

					<ul class="view-space-list">
						<li>
							<span>성명 (한글)</span>
							<p id="mypPassReviewInfo_korNm"></p>
						</li>
						<li>
							<span>성명 (한자)</span>
							<p id="mypPassReviewInfo_chcNm"></p>
						</li>
						<li>
							<span>성명 (영어)</span>
							<p id="mypPassReviewInfo_engNm"></p>
						</li>
					</ul>
				</div>

				<div class="cont">
					<h4>합격자 기본정보</h4>

					<div class="in-div">
						<div class="title-gray">자택정보</div>

						<ul class="view-space-list">
							<li>
								<span>우편번호</span>
								<p id="mypPassReviewInfo_husZipCd"></p>
							</li>
							<li>
								<span>주소</span>
								<p id="mypPassReviewInfo_husAdres"></p>
							</li>
							<li>
								<span>상세주소</span>
								<p id="mypPassReviewInfo_husAdresDetail"></p>
							</li>
							<li>
								<span>우편물 수령여부</span>
								<p id="mypPassReviewInfo_postSndngYn"></p>
							</li>
						</ul>
					</div>

					<div class="in-div">
						<div class="title-gray">직장정보</div>

						<ul class="view-space-list">
							<li>
								<span>직장 우편번호</span>
								<p id="mypPassReviewInfo_ofcZipCd"></p>
							</li>
							<li>
								<span>직장 주소</span>
								<p id="mypPassReviewInfo_ofcAdres"></p>
							</li>
							<li>
								<span>직장 상세주소</span>
								<p id="mypPassReviewInfo_ofcAdresDetail"></p>
							</li>
							<li>
								<span>직장 전화번호</span>
								<p id="mypPassReviewInfo_ofcTelNo"></p>
							</li>
							<li>
								<span>FAX</span>
								<p id="mypPassReviewInfo_ofcFaxNo"></p>
							</li>
							<li>
								<span>직장명</span>
								<p id="mypPassReviewInfo_oficeNm"></p>
							</li>
							<li>
								<span>직책</span>
								<p id="mypPassReviewInfo_rspOfc"></p>
							</li>
							<li>
								<span>부서 (국/실)</span>
								<p id="mypPassReviewInfo_sectionNm"></p>
							</li>
							<li>
								<span>하위부서 (과)</span>
								<p id="mypPassReviewInfo_deptNm"></p>
							</li>
						</ul>
					</div>
				</div>

				<div class="cont">
					<h4>연락처</h4>

					<ul class="view-space-list">
						<li>
							<span>휴대전화</span>
							<p id="mypPassReviewInfo_moblPhonNo"></p>
						</li>
						<li>
							<span>자택전화</span>
							<p id="mypPassReviewInfo_husTelNo"></p>
						</li>
						<li>
							<span>회사 Email</span>
							<p id="mypPassReviewInfo_mainEmail"></p>
						</li>
						<li>
							<span>개인 Email</span>
							<p id="mypPassReviewInfo_subEmail"></p>
						</li>
						<li>
							<span>메일 수신 여부</span>
							<p id="mypPassReviewInfo_emailSndngYn"></p>
						</li>
						<li>
							<span>문자 수신 여부</span>
							<p id="mypPassReviewInfo_smsSndngYn"></p>
						</li>
					</ul>
				</div>

				<div class="cont">
					<h4>학력사항</h4>

					<div class="in-div">
						<div class="title-gray">고등학교</div>

						<ul class="view-space-list">
							<li>
								<span>학력</span>
								<p id="mypPassReviewInfo_schulCl0"></p>
							</li>
							<li>
								<span>학위</span>
								<p id="mypPassReviewInfo_degree0"></p>
							</li>
							<li>
								<span>학교명</span>
								<p id="mypPassReviewInfo_schulNm0"></p>
							</li>
							<li>
								<span>졸업년도</span>
								<p id="mypPassReviewInfo_grdtnYear0"></p>
							</li>
						</ul>
					</div>

					<div class="in-div">
						<div class="title-gray">대학교</div>

						<ul class="view-space-list">
							<li>
								<span>학력</span>
								<p id="mypPassReviewInfo_schulCl1"></p>
							</li>
							<li>
								<span>학위</span>
								<p id="mypPassReviewInfo_degree1"></p>
							</li>
							<li>
								<span>학교명</span>
								<p id="mypPassReviewInfo_schulNm1"></p>
							</li>
							<li>
								<span>졸업년도</span>
								<p id="mypPassReviewInfo_grdtnYear1"></p>
							</li>
							<li>
								<span>전공</span>
								<p id="mypPassReviewInfo_major1"></p>
							</li>
						</ul>
					</div>

					<div class="in-div" id="mypCpaPassReg_reviewInfoAcdmcrAdd">

					</div>
				</div>

			</div>
		</section>

		<!-- 이전페이지로 이동 -->
		<div class="btn-page-bottom">
			<button class="btn-text-back mypCpaPassReg_preBtn" onclick="mypPassReg.mypPassReg_tabMove('mypCpaPassReg_acdmcrInfo')" type="button">이전페이지로 이동</button>
		</div>

		<!-- 페이지하단 버튼 -->
		<div class="sticky-bottom">
			<button class="btn-sticky" type="button" id="mypCpaPassReg_submitBtn">제출</button>
		</div>
	</div>
</div>

<!-- 하단 레이어 팝업(수정/저장) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaPassReg_savePop">
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

			<button class="btn-text-blue" type="button" id="mypCpaPassReg_savePopCanclBtn">아니오</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaPassReg_savePopBtn">예</button>
			</div>
		</div>
	</div>
</div>

<!-- 하단 레이어 팝업(합격자정보 저장) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaPassReg_saveRegPop">
	<div class="layer-container">
		<div class="title-box">
			<h2>제출</h2>
		</div>

		<div class="layer-content" style="text-align: center;">
			<div class="gray-box">
				해당 내용으로 제출 하시겠습니까?<br />
				제출한 내용은 마이페이지에서<br />
				수정이 가능합니다.
			</div>
		</div>

		<div class="layer-bottom" style="text-align: center;">

			<button class="btn-text-blue" type="button" id="mypCpaPassReg_saveRegPopCanclBtn">제출취소</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaPassReg_saveRegPopBtn">제출</button>
			</div>
		</div>
	</div>
</div>

<!-- 하단 레이어 팝업(수습등록화면 이동) / 활성화시 show -->
<div class="layer-popup-wrap" id="mypCpaPassReg_trainMovePop">
	<div class="layer-container">
		<div class="title-box">
			<h2>수습공인회계사 등록신청</h2>
		</div>

		<div class="layer-content" style="text-align: center;">
			<div class="gray-box">
				수습공인회계사 등록신청을 <br />
				이어서 신청하시겠습니까? <br />
				지금 신청하지 않으셔도 <br />
				마이페이지에서 신청이 가능합니다.<br />
			</div>
		</div>

		<div class="layer-bottom" style="text-align: center;">

			<button class="btn-text-blue" type="button" id="mypCpaPassReg_trainMovePopCanclBtn">마이페이지 이동</button>

			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="mypCpaPassReg_trainMovePopBtn">수습공인회계사 등록신청 시작</button>
			</div>
		</div>
	</div>
</div>

<input type="hidden" id="mypCpaPassReg_pin" value="${mypCpaPassRegPin}"/>
<input type="hidden" id="mypCpaPassReg_saveMode" value="${mypCpaPassRegSaveMode.saveMode}"/>
<input type="hidden" id="mypCpaPassReg_movePage" value="${mypCpaPassRegSaveMode.movePage}"/>
<input type="hidden" id="mypCpaPassReg_memFlag" value="${mypCpaPassRegSaveMode.memFlag}"/>
<input type="hidden" id="mypCpaPassReg_closeCl" value="${cpaMemFlagInfo[0].closedCl}"/>
<input type="hidden" id="mypCpaPassReg_mberFlag" value="${cpaMemFlagInfo[0].mberFlag}"/>
<input type="hidden" id="mypCpaPassReg_audGrpCl" value="${cpaMemFlagInfo[0].audGrpCl}"/>
<input type="hidden" id="mypCpaPassReg_saveData"/>
</body>
</html>