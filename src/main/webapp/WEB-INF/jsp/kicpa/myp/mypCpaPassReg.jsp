<%--
  Class Name : regQna.jsp
  Description : 문의접수등록
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
<title>MYPAGE</title>
<!-- css :: Start -->
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/jquery-ui.min.css"/>" />
<link href="<c:url value='/'/>css/kicpa/myp/mypCpaPassReg.css" rel="stylesheet" type="text/css" />
<!-- css :: End -->

<!-- script :: Start -->

<script src="<c:url value='/'/>js/jquery.min.js"></script>
<script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
<script src="<c:url value='/'/>js/kicpa/stringHelper.js?ver=2"></script>
<script src="<c:url value='/'/>js/kicpa/myp/mypCpaPassReg.js?ver=3"></script>
<script src="<c:url value='/'/>js/KicpaCommon.js?ver=2"></script>
<!-- script :: End -->
</head>
<body>
    <div class="kicpa-layer-content">
        <div class="lnb v2">
            <ul>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_agreeActive">약관동의</a></li>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_passInfoActive">합격자 기본정보</a></li>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_adressInfoActive">자택&직장주소</a></li>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_contactInfoActive">연락처</a></li>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_acdmcrInfoActive">학력사항</a></li>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_rsumInfoActive">회원 이력서 관리</a></li>
              <li><a class="mypCpaPassReg_activeMove" href="javascript:void(0);" id="mypCpaPassReg_reviewInfoActive">검토 및 제출</a></li>
            </ul>
        </div>

        <!--약관동의-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_agree">
            <div class="contents-title">
                <h1>약관동의</h1>
                <p>원활한 회원서비스 사용을 위해 아래의 개인정보수집 및 <br />이용 · 개인정보의 제공 및 공유 안내를 읽고 동의하여 주시기 바랍니다.  </p>
            </div>

            <form id="mypCpaPassReg_agreeForm">
                <div class="content-box" style="margin-top: 54px;">
                    <div class="mix-input">
                        <dl>
                            <dt>성명</dt>
                            <dd><input type="text" name="koreanNm" value="${mypCpaPassRegkoreanNm}" readonly/></dd>
                        </dl>
                        <dl>
                            <dt>생년월일</dt>
                            <dd><input type="text" name="brthdy" value="${mypCpaPassRegBrthdy}" readonly/></dd>
                        </dl>
                    </div>

                    <div class="rule-box" style="margin-top:30px;">
                        <h2 class="rule-box-title">한국공인회계사회의 개인정보 수집 및 이용 (필수)</h2>
                        <span class="textarea" style="height:130px;">
                            <textarea readonly>
                            상기 본인은 수습공인회계사등록에 따른 실무수습에 있어 이 실무수습이 공인회계사로서의 인격과 전문가적 능력을 함양함에 있음을 명심하여 공인회계사법‧동법에
                            의한 명령‧실무수습에관한규정 및 회계연수원운영규정을 성실히 준수하고 실무수습기관에서의 실무수습 및 회계연수원의 연수기간 중 근면하고 성실한 자세로서
                            실무수습에 임할 것이며, 만일 이를 이행하지 못하였을 때에는 관련법규에 따른 조치를 감수하겠음을 이에 서약합니다.
                            </textarea>
                        </span>
                    </div>

                    <span class="checkbox-type1">
                        <input type="checkbox" name="agreeInfo1Yn" id="mypCpaPassReg_agreement" value="Y"/>
                        <label for="mypCpaPassReg_agreement">본인은 개인정보의 수집 및 이용에 대해 고지 받았으며 이를 충분히 이해하고 동의합니다.</label>
                    </span>

                    <div class="rule-box" style="margin-top:47px;">
                        <h2 class="rule-box-title">개인정보의 제공 및 공유 (필수)</h2>
                        <span class="textarea" style="height:130px;">
                            <textarea readonly>
                            상기 본인은 수습공인회계사등록에 따른 실무수습에 있어 이 실무수습이 공인회계사로서의 인격과 전문가적 능력을 함양함에 있음을 명심하여 공인회계사법‧동법에
                            의한 명령‧실무수습에관한규정 및 회계연수원운영규정을 성실히 준수하고 실무수습기관에서의 실무수습 및 회계연수원의 연수기간 중 근면하고 성실한 자세로서
                            실무수습에 임할 것이며, 만일 이를 이행하지 못하였을 때에는 관련법규에 따른 조치를 감수하겠음을 이에 서약합니다.
                            </textarea>
                        </span>
                    </div>

                    <span class="checkbox-type1">
                        <input type="checkbox" name="agreeInfo2Yn" id="mypCpaPassReg_agreement2" value="Y"/>
                        <label for="mypCpaPassReg_agreement2">본인은 개인정보의 제공 및 공유에 대해 고지 받았으며 이를 충분히 이해하고 동의합니다.</label>
                    </span>
                </div>
            </form>
            <div class="buttons two" style="margin-top: 69px">
                <div class="button line"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaPassRegPin}">마이페이지 이동</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaPassReg_agreeSaveBtn">시작하기</a></div>
            </div>
        </div>

        <!--합격자 기본정보-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_passInfo">
            <div class="contents-title">
                <h1>합격자 기본정보</h1>
                <p>필수항목을 등록해 주세요. 모든 항목은 마이페이지에서 수정이 가능합니다. </p>
            </div>

            <form id="mypCpaPassReg_passInfoForm">
                <div class="content-box" style="margin-top: 50px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_passInfoKorName">성명(한글)</label>
                                    <span class="input readonly"><input type="text" id="mypCpaPassReg_passInfoKorName" value="${mypCpaPassRegkoreanNm}" readonly/></span>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label for="mypCpaPassReg_passInfoChcName">성명(한자)</label>
                                    <span class="input"><input type="text" name="chcrtNm" id="mypCpaPassReg_passInfoChcName" placeholder="한자 성명을 입력하세요." /></span>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label for="mypCpaPassReg_passInfoEngName">성명(영문)</label>
                                    <span class="input"><input type="text" name="engNm" id="mypCpaPassReg_passInfoEngName" placeholder="영문 성명을 입력하세요." /></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 406px">
                <div class="button line mypCpaPassReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaPassRegPin}">마이페이지 이동</a></div>
                <div class="button line mypCpaPassReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_agree')">이전으로</a></div>
                <div class="button full mypCpaPassReg_nextBtn"><a href="javascript:void(0);" id="mypCpaPassReg_passInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <!--자택&직장주소-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_adressInfo">
            <div class="contents-title">
                <h1>자택&직장주소</h1>
                <p>필수항목을 등록해 주세요. 모든 항목은 마이페이지에서 수정이 가능합니다.</p>
            </div>

            <form id="mypCpaPassReg_adressInfoForm">
                <div class="content-box" style="margin-top: 50px;">
                    <div class="form-title">
                        <h2>자택 정보</h2>
                    </div>

                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_houseInfoZipCd">우편번호</label>
                                    <span class="input"><input type="text" name="husZipCd" id="mypCpaPassReg_houseInfoZipCd" onclick="mypCpaPassReg.mypAdresGoPopup('H');" placeholder="우편번호를 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_houseInfoAdres">주소</label>
                                    <span class="input"><input type="text" name="husAdres" id="mypCpaPassReg_houseInfoAdres" onclick="mypCpaPassReg.mypAdresGoPopup('H');" placeholder="주소를 입력하세요." /></span>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_houseInfoAdresDt">상세주소</label>
                                    <span class="input"><input type="text" name="husAdresDetail" id="mypCpaPassReg_houseInfoAdresDt" placeholder="상세주소를 입력하세요." /></span>
                                    <input type="hidden" name="husLegalCd" id="mypCpaPassReg_houseInfoLegalCd"/>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label>우편물 수령여부</label>
                                    <div class="radio-group">
                                        <span class="radio"><input type="radio" id="mypCpaPassReg_adressInfoPostHouse" name="postSndngYn" value="H" checked/><label for="mypCpaPassReg_adressInfoPostHouse">자택</label></span>
                                        <span class="radio mypCpaPassReg_postOfficeHidden" style="display: none;"><input type="radio" id="mypCpaPassReg_adressInfoPostOffice" name="postSndngYn"  value="O"/><label for="mypCpaPassReg_adressInfoPostOffice">회사</label></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="form-title" style="margin-top:70px;">
                        <h2>직장 정보</h2>
                    </div>

                    <div class="responsive-form-box">

                        <span class="check" style="padding-bottom: 50px;">
                          <input type="checkbox" name="ofcRegYn" id="mypCpaPassReg_ofcRegYn" value="Y"/>
                          <label for="mypCpaPassReg_ofcRegYn">직장정보 등록 체크</label>
                        </span>

                        <ul id="mypCpaPassReg_ofcInfoReg">
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_officeInfoZipCd">우편번호</label>
                                    <span class="input"><input type="text" name="ofcZipCd" id="mypCpaPassReg_officeInfoZipCd" onclick="mypCpaPassReg.mypAdresGoPopup('O');" placeholder="우편번호를 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_officeInfoAdres">직장 주소</label>
                                    <span class="input"><input type="text" name="ofcAdres" id="mypCpaPassReg_officeInfoAdres" onclick="mypCpaPassReg.mypAdresGoPopup('O');" placeholder="주소를 입력하세요." /></span>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_officeInfoAdresDt">직장 상세주소</label>
                                    <span class="input"><input type="text" name="ofcAdresDetail" id="mypCpaPassReg_officeInfoAdresDt" placeholder="상세주소를 입력하세요." /></span>
                                    <input type="hidden" name="ofcLegalCd" id="mypCpaPassReg_officeInfoLegalCd"/>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_officeInfoTelNo1">전화번호</label>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="ofcTelNo1" title="직장 전화번호 첫째자리" id="mypCpaPassReg_officeInfoTelNo1" placeholder="직장 전화번호를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="ofcTelNo2" title="직장 전화번호 중간자리" id="mypCpaPassReg_officeInfoTelNo2" placeholder="직장 전화번호를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="ofcTelNo3" title="직장 전화번호 끝자리" id="mypCpaPassReg_officeInfoTelNo3" placeholder="직장 전화번호를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_officeInfoFax1">FAX</label>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="ofcFaxNo1" title="FAX 첫째자리" id="mypCpaPassReg_officeInfoFax1" placeholder="FAX를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="ofcFaxNo2" title="FAX 중간자리" id="mypCpaPassReg_officeInfoFax2" placeholder="FAX를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="ofcFaxNo3" title="FAX 끝자리" id="mypCpaPassReg_officeInfoFax3" placeholder="FAX를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_officeInfoOficeNm">직장명</label>
                                    <span class="input"><input type="text" name="oficeNm" id="mypCpaPassReg_officeInfoOficeNm" placeholder="직장명을 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_officeInfoRspOfc">직책</label>
                                    <span class="input"><input type="text" name="rspOfc" id="mypCpaPassReg_officeInfoRspOfc" placeholder="직책을 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_officeInfoSectionNm">부서(국/실)</label>
                                    <span class="input"><input type="text" name="sectionNm" id="mypCpaPassReg_officeInfoSectionNm" placeholder="부서(국/실)를 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_officeInfoDeptNm">하위부서 (과)</label>
                                    <span class="input"><input type="text" name="deptNm" id="mypCpaPassReg_officeInfoDeptNm" placeholder="부서(과)를 입력하세요." /></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" name="officeInfoYn" id="mypCpaPassReg_officeInfoYn"/>
            </form>

            <div class="buttons two" style="margin-top: 94px">
                <div class="button line mypCpaPassReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaPassRegPin}">마이페이지 이동</a></div>
                <div class="button line mypCpaPassReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_passInfo')">이전으로</a></div>
                <div class="button full mypCpaPassReg_nextBtn"><a href="javascript:void(0);" id="mypCpaPassReg_adressInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <!--연락처-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_contactInfo">
            <div class="contents-title">
                <h1>연락처</h1>
                <p>필수항목을 등록해 주세요. 모든 항목은 마이페이지에서 수정이 가능합니다.</p>
            </div>

            <form id="mypCpaPassReg_contactInfoForm">
                <div class="content-box" style="margin-top: 80px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_contactInfoPhonNo1">휴대전화</label>
                                        <span class="input mypCpaPassReg-tel-input">
                                            <input type="text" name="moblPhonNo1" title="휴대폰 첫째자리" id="mypCpaPassReg_contactInfoPhonNo1" placeholder="휴대전화를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                        </span>
                                        <span class="input mypCpaPassReg-tel-input">
                                            <input type="text" name="moblPhonNo2" title="휴대폰 중간자리" id="mypCpaPassReg_contactInfoPhonNo2" placeholder="휴대전화를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                        </span>
                                        <span class="input mypCpaPassReg-tel-input">
                                            <input type="text" name="moblPhonNo3" title="휴대폰 끝자리" id="mypCpaPassReg_contactInfoPhonNo3" placeholder="휴대전화를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                        </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_contactInfoHouseTel1">자택전화</label>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="husTelNo1" title="자택전화 첫째자리" id="mypCpaPassReg_contactInfoHouseTel1" placeholder="자택전화를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="husTelNo2" title="자택전화 중간자리" id="mypCpaPassReg_contactInfoHouseTel2" placeholder="자택전화를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                    <span class="input mypCpaPassReg-tel-input">
                                        <input type="text" name="husTelNo3" title="자택전화 끝자리" id="mypCpaPassReg_contactInfoHouseTel3" placeholder="자택전화를 입력하세요." maxlength="4" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="OFF"/>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_contactInfoMainEmail">개인 Email</label>
                                    <span class="input"><input type="text" name="mainEmail" id="mypCpaPassReg_contactInfoMainEmail" placeholder="개인 Email 를 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group">
                                    <label for="mypCpaPassReg_contactInfoSubEmail">회사 Email</label>
                                    <span class="input"><input type="text" name="subEmail" id="mypCpaPassReg_contactInfoSubEmail" placeholder="회사 Email 을 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>메일 수신 여부</label>
                                    <div class="radio-group">
                                        <span class="radio"><input type="radio" id="mypCpaPassReg_contactInfoEmailSndngY" name="emailSndngYn" value="Y" checked/><label for="mypCpaPassReg_contactInfoEmailSndngY">수신</label></span>
                                        <span class="radio"><input type="radio" id="mypCpaPassReg_contactInfoEmailSndngN" name="emailSndngYn" value="N" /><label for="mypCpaPassReg_contactInfoEmailSndngN">미수신</label></span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>문자 수신 여부</label>
                                    <div class="radio-group">
                                        <span class="radio"><input type="radio" id="mypCpaPassReg_contactInfoSmsSndngY" name="smsSndngYn" value="Y" checked/><label for="mypCpaPassReg_contactInfoSmsSndngY">수신</label></span>
                                        <span class="radio"><input type="radio" id="mypCpaPassReg_contactInfoSmsSndngN" name="smsSndngYn" value="N" /><label for="mypCpaPassReg_contactInfoSmsSndngN">미수신</label></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 345px">
                <div class="button line mypCpaPassReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaPassRegPin}">마이페이지 이동</a></div>
                <div class="button line mypCpaPassReg_preBtn"><a href="#mypCpaPassReg_adressInfo" onclick="mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_adressInfo')">이전으로</a></div>
                <div class="button full mypCpaPassReg_nextBtn"><a href="#mypCpaPassReg_acdmcrInfo" id="mypCpaPassReg_contactInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <!--학력사항-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_acdmcrInfo">
            <div class="contents-title">
                <h1>학력사항</h1>
                <p>필수항목을 등록해 주세요. 모든 항목은 마이페이지에서 수정이 가능합니다.</p>
            </div>

            <form id="mypCpaPassReg_acdmcrInfoForm">
                <div class="content-box" style="margin-top: 50px;">
                    <div class="form-title">
                        <h2>고등학교 등록</h2>
                    </div>
                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoSchulCl">학력</label>
                                    <span class="input">
                                        <select name="schulCl" id="mypCpaPassReg_acdmcrInfoSchulCl">
                                            <option value="A2230010" selected>고등학교</option>
							            </select>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoDegree">학위</label>
                                    <span class="input">
                                        <select name="degree" id="mypCpaPassReg_acdmcrInfoDegree">
                                            <option value="A9030010" selected>졸업</option>
							            </select>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoSchulNm">학교명</label>
                                    <span class="input"><input type="text" name="schulNm" id="mypCpaPassReg_acdmcrInfoSchulNm" placeholder="전체명으로 입력하세요.  예) 서울고등학교" /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoGrdtnYear">졸업년도</label>
                                    <span class="input cal">
                                        <input class="mypCpaPassReg_datepickerAdd" type="text" name="grdtnYear" id="mypCpaPassReg_acdmcrInfoGrdtnYear" placeholder="졸업년도를 입력하세요." />
                                        <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoMajor">전공</label>
                                    <span class="input"><input type="text" name="major" id="mypCpaPassReg_acdmcrInfoMajor" value="-" placeholder="전공을 입력하세요.  예) 경영학부 회계전공, 경제세무학과" readonly/></span>
                                </div>
                            </li>
                            <input type="hidden" name="acdmcrSn" id="mypCpaPassReg_acdmcrInfoAcdmcrSn"/>
                        </ul>
                    </div>

                    <div class="form-title" style="margin-top:30px;">
                        <h2>대학교 등록</h2>
                    </div>
                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoSchulCl2">학력</label>
                                    <span class="input">
                                        <select name="schulCl" id="mypCpaPassReg_acdmcrInfoSchulCl2">
                                            <option value="A2230030" selected>대학교</option>
							            </select>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoDegree2">학위</label>
                                    <span class="input">
                                        <select name="degree" id="mypCpaPassReg_acdmcrInfoDegree2">
                                            <option selected value=''>선택하세요</option>
                                            <option value="A9030010">졸업</option>
                                            <option value="A9030020">학사</option>
                                            <option value="A9030030">석사</option>
                                            <option value="A9030040">박사</option>
                                            <option value="A9030050">수료</option>
							            </select>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoSchulNm2">학교명</label>
                                    <span class="input"><input type="text" name="schulNm" id="mypCpaPassReg_acdmcrInfoSchulNm2" placeholder="학교명을 입력하세요." /></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoGrdtnYear2">졸업년도 </label>
                                    <span class="input cal">
                                      <input class="mypCpaPassReg_datepickerAdd" type="text" name="grdtnYear" id="mypCpaPassReg_acdmcrInfoGrdtnYear2" placeholder="졸업년도를 입력하세요." />
                                      <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_acdmcrInfoMajor2">전공</label>
                                    <span class="input"><input type="text" name="major" id="mypCpaPassReg_acdmcrInfoMajor2" placeholder="전공을 입력하세요.  예) 경영학부 회계전공, 경제세무학과" /></span>
                                </div>
                            </li>
                            <input type="hidden" name="acdmcrSn" id="mypCpaPassReg_acdmcrInfoAcdmcrSn2"/>
                        </ul>
                    </div>

                    <div id="mypCpaPassReg_acdmcrInfoAdd">

                    </div>

                    <div id="mypCpaPassReg_acdmcrInfoDel">

                    </div>
                    <button type="button" class="gray-button" id="mypCpaPassReg_acdmcrInfoAddBtn" style="margin-top:40px;">학력추가</button>
                </div>
            </form>

            <div class="buttons two" style="margin-top:128px;">
                <div class="button line mypCpaPassReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaPassRegPin}">마이페이지 이동</a></div>
                <div class="button line mypCpaPassReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_contactInfo')">이전으로</a></div>
                <div class="button full mypCpaPassReg_nextBtn"><a href="javascript:void(0);" id="mypCpaPassReg_acdmcrInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <!--회원 이력서 관리-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_rsumInfo">
            <div class="contents-title">
                <h1>회원 이력서 관리</h1>
                <p>이력서를 첨부하세요. 모든 항목은 마이페이지에서 수정이 가능합니다.</p>
            </div>

            <form id="mypCpaPassReg_rsumInfoForm" enctype="multipart/form-data">
                <div class="content-box" style="margin-top: 138px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaPassReg_rsumInfoFile">이력서 첨부</label>
                                    <div class="file long">
                                        <span class="input">
                                          <input type="file" name="atchFileId" id="mypCpaPassReg_rsumInfoFile" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" class="file-button" onclick="mypCpaPassReg.select_file();">첨부</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul class="tips2">
                        <li>* 2M 이하 </li>
                        <li>* HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) </li>
                    </ul>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 478px">
                <div class="button line mypCpaPassReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_acdmcrInfo')">이전으로</a></div>
                <div class="button full mypCpaPassReg_nextBtn"><a href="javascript:void(0);" id="mypCpaPassReg_rsumInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <!--검토 및 제출-->
        <div class="contents mypCpaPass_tabMove" id="mypCpaPassReg_reviewInfo">
            <div class="contents-title">
                <h1>검토 및 제출</h1>
                <p>등록하신 정보가 맞는지 확인하시고 제출 버튼을 눌러주세요.</p>
            </div>

            <div class="content-box">
                <div class="final-box">
                    <h2>합격자 기본정보</h2>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col  />
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>성명(한글)</th>
                            <td id="reviewInfo_korNm"></td>
                        </tr>
                        <tr>
                            <th>성명(한자)</th>
                            <td id="reviewInfo_chcNm"></td>
                        </tr>
                        <tr>
                            <th>성명(영문)</th>
                            <td id="reviewInfo_engNm"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="final-box">
                    <h2>자택&직장주소</h2>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th colspan="2">자택주소</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>우편번호</th>
                            <td id="reviewInfo_husZipCd"></td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td id="reviewInfo_husAdres"></td>
                        </tr>
                        <tr>
                            <th>상세주소</th>
                            <td id="reviewInfo_husAdresDetail"></td>
                        </tr>
                        <tr>
                            <th>우편물 수령여부</th>
                            <td id="reviewInfo_postSndngYn"></td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th colspan="2">직장주소</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>우편번호</th>
                            <td id="reviewInfo_ofcZipCd"></td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td id="reviewInfo_ofcAdres"></td>
                        </tr>
                        <tr>
                            <th>상세주소</th>
                            <td id="reviewInfo_ofcAdresDetail"></td>
                        </tr>
                        <tr>
                            <th>직장 전화번호</th>
                            <td id="reviewInfo_ofcTelNo"></td>
                        </tr>
                        <tr>
                            <th>FAX</th>
                            <td id="reviewInfo_ofcFaxNo"></td>
                        </tr>
                        <tr>
                            <th>직장명</th>
                            <td id="reviewInfo_oficeNm"></td>
                        </tr>
                        <tr>
                            <th>직책</th>
                            <td id="reviewInfo_rspOfc"></td>
                        </tr>
                        <tr>
                            <th>부서 (국/실)</th>
                            <td id="reviewInfo_sectionNm"></td>
                        </tr>
                        <tr>
                            <th>하위부서 (과)</th>
                            <td id="reviewInfo_deptNm"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="final-box">
                    <h2>연락처</h2>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>휴대전화</th>
                            <td id="reviewInfo_moblPhonNo"></td>
                        </tr>
                        <tr>
                            <th>자택전화</th>
                            <td id="reviewInfo_husTelNo"></td>
                        </tr>
                        <tr>
                            <th>개인 Email</th>
                            <td id="reviewInfo_mainEmail"></td>
                        </tr>
                        <tr>
                            <th>회사 Email </th>
                            <td id="reviewInfo_subEmail"></td>
                        </tr>
                        <tr>
                            <th>메일 수신 여부</th>
                            <td id="reviewInfo_emailSndngYn"></td>
                        </tr>
                        <tr>
                            <th>문자 수신 여부</th>
                            <td id="reviewInfo_smsSndngYn"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="final-box">
                    <h2>학력사항</h2>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th colspan="2">고등학교</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>학력</th>
                            <td id="reviewInfo_schulCl0"></td>
                        </tr>
                        <tr>
                            <th>학위</th>
                            <td id="reviewInfo_degree0"></td>
                        </tr>
                        <tr>
                            <th>학교명</th>
                            <td id="reviewInfo_schulNm0"></td>
                        </tr>
                        <tr>
                            <th>졸업년도</th>
                            <td id="reviewInfo_grdtnYear0"></td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th colspan="2">대학교</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>학력</th>
                            <td id="reviewInfo_schulCl1"></td>
                        </tr>
                        <tr>
                            <th>학위</th>
                            <td id="reviewInfo_degree1"></td>
                        </tr>
                        <tr>
                            <th>학교명</th>
                            <td id="reviewInfo_schulNm1"></td>
                        </tr>
                        <tr>
                            <th>졸업년도</th>
                            <td id="reviewInfo_grdtnYear1"></td>
                        </tr>
                        <tr>
                            <th>전공</th>
                            <td id="reviewInfo_major1"></td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="mypCpaPassReg_reviewInfoAcdmcrAdd">

                    </div>
                </div>

                <div class="final-box">
                    <h2>회원 이력서 관리</h2>
                    <table>
                        <colgroup>
                            <col style="width: 206px" />
                            <col/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>이력서 첨부</th>
                            <td id="reviewInfo_atchFileId"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="buttons two" style="margin-top: 287px">
                <div class="button line mypCpaPassReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_rsumInfo')">이전으로</a></div>
                <div class="button full mypCpaPassReg_nextBtn"><a href="javascript:void(0);" id="mypCpaPassReg_submitBtn">제출</a></div>
            </div>
        </div>

        <button type="button" class="close" id="mypCpaPassReg_closeBtn">close</button>

        <input type="hidden" name="pin" id="mypCpaPassReg_pin" value="${mypCpaPassRegPin}"/>
        <input type="hidden" id="mypCpaPassReg_saveMode" value="${mypCpaPassRegSaveMode.saveMode}"/>
        <input type="hidden" id="mypCpaPassReg_movePage" value="${mypCpaPassRegSaveMode.movePage}"/>
    </div>
</body>
</html>