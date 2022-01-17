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
<link href="<c:url value='/'/>css/kicpa/myp/mypCpaTrainReg.css" rel="stylesheet" type="text/css" />
<!-- css :: End -->

<!-- script :: Start -->
<script src="<c:url value='/'/>js/jquery.min.js"></script>
<script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
<script src="<c:url value='/'/>js/kicpa/stringHelper.js?ver=2"></script>
<script src="<c:url value='/'/>js/kicpa/myp/mypCpaTrainReg.js?ver=2"></script>
<script src="<c:url value='/'/>js/KicpaCommon.js?ver=2"></script>
<!-- script :: End -->
</head>
<body>
    <div class="kicpa-layer-content">
        <div class="lnb">
            <ul>
                <li><a class="mypCpaTrainReg_activeMove" id="mypCpaTrainReg_agreeActive" href="javascript:void(0);">실무수습 서약서</a></li>
                <li><a class="mypCpaTrainReg_activeMove" id="mypCpaTrainReg_pictInfoActive" href="javascript:void(0);">사진등록</a></li>
                <li><a class="mypCpaTrainReg_activeMove" id="mypCpaTrainReg_grdtSatausInfoActive" href="javascript:void(0);">수습공인회계사 등록 재학여부</a></li>
                <li><a class="mypCpaTrainReg_activeMove" id="mypCpaTrainReg_apntcCpaHistInfoActive" href="javascript:void(0);">이력정보</a></li>
                <li><a class="mypCpaTrainReg_activeMove" id="mypCpaTrainReg_atchFileInfoActive" href="javascript:void(0);">첨부파일 (첨부서류)</a></li>
                <li><a class="mypCpaTrainReg_activeMove" id="mypCpaTrainReg_reviewInfoActive" href="javascript:void(0);">검토 및 제출</a></li>
            </ul>
        </div>

        <%--실무수습 서약서--%>
        <div class="contents mypCpaTrain_tabMove" id="mypCpaTrainReg_agree">
            <div class="contents-title">
                <h1>실무수습 서약서</h1>
                <p>아래의 실무수습 서약서를 읽고 동의하여 주시기 바랍니다.</p>
            </div>

            <form id="mypCpaTrainReg_agreeForm">
                <div class="content-box" style="margin-top: 54px;">
                    <div class="mix-input">
                        <dl>
                            <dt>성명</dt>
                            <dd><input type="text" name="koreanNm" value="${mypCpaTrainRegKoreanNm}"/></dd>
                        </dl>
                        <dl>
                            <dt>생년월일</dt>
                            <dd><input type="text" name="brthdy" value="${mypCpaTrainRegBrthdy}"/></dd>
                        </dl>
                    </div>

                    <div class="rule-box" style="margin-top:30px;">
                        <h2 class="rule-box-title">실무수습 서약서</h2>
                        <span class="textarea" style="height:130px;">
                            <textarea>
                            상기 본인은 수습공인회계사등록에 따른 실무수습에 있어 이 실무수습이 공인회계사로서의 인격과 전문가적 능력을 함양함에 있음을 명심하여 공인회계사법‧동법에
                            의한 명령‧실무수습에관한규정 및 회계연수원운영규정을 성실히 준수하고 실무수습기관에서의 실무수습 및 회계연수원의 연수기간 중 근면하고 성실한 자세로서
                            실무수습에 임할 것이며, 만일 이를 이행하지 못하였을 때에는 관련법규에 따른 조치를 감수하겠음을 이에 서약합니다.
                            </textarea>
                        </span>
                    </div>

                    <span class="checkbox-type1">
                        <input type="checkbox" name="agreeInfoYn" id="mypCpaTrainReg_agreement" value="Y"/>
                        <label for="mypCpaTrainReg_agreement">본인은 실무수습 서약에 대해 고지 받았으며 이를 충분히 이해하고 동의합니다.</label>
                    </span>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 300px;">
                <div class="button line"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaTrainRegPin}" >마이페이지 이동</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaTrainReg_agreeSaveBtn">시작하기</a></div>
            </div>
        </div>

        <%--사진등록--%>
        <div class="contents mypCpaTrain_tabMove" id="mypCpaTrainReg_pictInfo">
            <div class="contents-title">
                <h1>사진등록</h1>
            </div>

            <form id="mypCpaTrainReg_pictInfoForm" enctype="multipart/form-data">
                <div class="content-box" style="margin-top: 74px;">
                    <div class="profile-picture">
                        <strong class="profile-picture-title">사진 등록</strong>
                        <div class="profile-picture-form">
                            <span class="picture">
                                <img id="mypCpaTrainReg_pictSelect" src="<c:url value='/'/>images/img_user-placeholder.png" alt="">
                            </span>

                            <label for="mypCpaTrainReg_file_selection" class="file_selection">
                            사진선택
                                <input id="mypCpaTrainReg_file_selection" type="file" name="pictFileId" accept="image/*" />
                            </label>

                            <ul class="tips">
                                <li>- 권장이미지 : 94.4PX x 113.3PX</li>
                                <li>- 2M 이하</li>
                                <li>- GIF, PNG, JPG (JPEG)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 112px">
                <div class="button line mypCpaTrainReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaTrainRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaTrainReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_agree')">이전으로</a></div>
                <div class="button full mypCpaTrainReg_nextBtn"><a href="javascript:void(0);" id="mypCpaTrainReg_pictInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--수습공인회계사 등록 재학여부--%>
        <div class="contents mypCpaTrain_tabMove" id="mypCpaTrainReg_grdtSatausInfo">
            <div class="contents-title">
                <h1>수습공인회계사 등록 재학여부</h1>
                <p>실무수습등록일 현재 대학 및 대학원에 재학중인 경우 실무수습 등록을 할 수 없습니다.<br>
                    &lt; 관련규정 : 실무수습규정 제6조제1항제2호 &gt;<br><br>

                        현재 대학 및 대학원에 재학하고 있는 경우 아래 사항을 정확하게 입력하여 주시기 바랍니다. 제출된 서류와 입력사항이
                        일치하지 않는 경우 실무수습등록일 거부될 수 있습니다.
                </p>
            </div>

            <form id="mypCpaTrainReg_grdtSatausInfoForm">
                <div class="content-box" style="margin-top: 71px;">

                    <div class="rule-box" style="margin-top:30px;">
                        <h2 class="rule-box-title">예외사유</h2>
                        <span class="textarea" style="height:130px;">
                            <textarea>
                            가. 졸업예정학기의 말일(매년 2월말 또는 8월말)로부터 소급하여 3개월 이내에 속하는 경우
                            나. 졸업에 필요한 학점을 모두 이수한 경우
                            다. 졸업예정학기를 야간 또는 온라인으로 수강하는 경우(이 경우 수강신청필증과 단과대학장 이상의 확인서 등 그 사실을 확인할 수 있는 서류를 제출하여야 한다)
                            라. 졸업예정학기를 학칙에 따라 취업으로 인한 결석을 사유로 공결로 인정받은 경우(이 경우 단과대학장 이상의 확인서 등 그 사실을 확인할 수 있는서류를 제출하여야 한다
                            마. 방학기간 중에는 등록 가능함 (현재 규정개정 중, 금융위 승인 대기중)
                            </textarea>
                        </span>
                    </div>

                    <div class="responsive-form-box" style="margin-top:30px;">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_grdtSatausInfoGrdtSataus">대학 및 대학원 재학여부</label>
                                    <span class="select">
                                        <select name="grdtSataus" id="mypCpaTrainReg_grdtSatausInfoGrdtSataus">
                                            <option selected value=''>선택하세요</option>
                                            <option value="00000010">졸업 또는 미재학</option>
                                            <option value="00000020">재학중</option>
							            </select>
                                    </span>
                                </div>
                            </li>
                            <li class="mypCpaTrainReg_grdtSatausInfoTrigger" style="display: none;">
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_grdtSatausInfoGrdtDe">졸업예정일</label>
                                    <span class="input cal">
                                        <input type="text" name="grdtDe" id="mypCpaTrainReg_grdtSatausInfoGrdtDe" placeholder="졸업예정년월을 선택하세요."/>
                                        <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                            <li class="mypCpaTrainReg_grdtSatausInfoTrigger" style="display: none;">
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_grdtSatausInfoStartDe">방학기간(시작일)</label>
                                    <span class="input cal">
                                        <input type="text" name="vacationStrDe" id="mypCpaTrainReg_grdtSatausInfoStartDe" placeholder="방학시작일을 선택하세요."/>
                                        <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                            <li class="mypCpaTrainReg_grdtSatausInfoTrigger" style="display: none;">
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_grdtSatausInfoEndDe">방학기간(종료일)</label>
                                    <span class="input cal">
                                        <input type="text" name="vacationEndDe" id="mypCpaTrainReg_grdtSatausInfoEndDe" placeholder="방학종료일을 선택하세요."/>
                                        <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 112px">
                <div class="button line"><a href="javascript:void(0);" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_pictInfo')" >이전으로</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaTrainReg_grdtSatausInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--이력정보--%>
        <div class="contents mypCpaTrain_tabMove" id="mypCpaTrainReg_apntcCpaHistInfo">
            <div class="contents-title">
                <h1>이력정보</h1>
            </div>

            <form id="mypCpaTrainReg_apntcCpaHistInfoForm">
                <div class="content-box" style="margin-top: 71px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_apntcCpaHistInfoAppRegistDe">실무수습기관 입사일자</label>
                                    <span class="input cal">
                                        <input type="text" name="appRegistDe" id="mypCpaTrainReg_apntcCpaHistInfoAppRegistDe" placeholder="날짜를 입력하세요." />
                                        <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_apntcCpaHistInfoGuideCpa">지도공인회계사</label>
                                    <span class="input mypCpaTrainReg-inline-input"><input type="text" name="guideCpaNm" title="지도공인회계사명" id="mypCpaTrainReg_apntcCpaHistInfoGuideCpa" placeholder="지도공인회계사 성명을 입력하세요."/></span>
                                    <span class="input mypCpaTrainReg-inline-input"><input type="text" name="guideCpaNo" title="지도공인회계사번호" id="mypCpaTrainReg_apntcCpaHistInfoGuideCpaId" placeholder="지도공인회계사 번호를 입력하세요."/></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_apntcCpaHistInfoAppInsttNm">실무수습기관</label>
                                    <span class="input mypCpaTrainReg-inline-input"><input type="text" name="appInsttNm" title="실무수습기관명" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttNm" placeholder="실무수습기관을 등록하세요." readonly/></span>
                                    <span class="input mypCpaTrainReg-inline-input"><input type="text" name="appInsttCd" title="실무수습기관코드" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttCd" placeholder="실무수습기관 번호" readonly/></span>
                                </div>
                                <span class="checkbox-type2">
                                    <input type="checkbox" name="appInsttEtcYn" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcYn" value="Y"/>
                                    <label for="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcYn">회계법인 외 실무수습기관인 경우 체크박스 클릭하세요. </label>
                                </span>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc">기타 실무수습기관</label>
                                    <span class="input"><input type="text" name="appInsttEtc" id="mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc" placeholder="실제 기관명(회사명)을 등록하세요." disabled/></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 400px;">
                <div class="button line"><a href="javascript:void(0);" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_grdtSatausInfo')">이전으로</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaTrainReg_apntcCpaHistInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--첨부파일 (첨부서류)--%>
        <div class="contents mypCpaTrain_tabMove" id="mypCpaTrainReg_atchFileInfo">
            <div class="contents-title">
                <h1>첨부파일 (첨부서류)</h1>
            </div>

            <form id="mypCpaTrainReg_atchFileInfoForm">
                <div class="content-box" style="margin-top: 71px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li class="block">
                                <div class="input-group required" id="mypCpaTrainReg_atchFileInfoAtchFileAdd">
                                    <label class="file_selection" for="mypCpaTrainReg_atchFileInfoAtchFileId0">졸업예정 증명서류</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="atchFileId" id="mypCpaTrainReg_atchFileInfoAtchFileId0" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaTrainReg_atchFileInfoAtchFileId0').click()" class="file-button">첨부</button>
                                            <button type="button" id="mypCpaTrainReg_atchFileInfoAtchFileAddBtn" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_atchFileInfoPassCrtiFileId">합격증서 사본</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="passCrtiFileId" id="mypCpaTrainReg_atchFileInfoPassCrtiFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaTrainReg_atchFileInfoPassCrtiFileId').click()" class="file-button">첨부</button>
                                            <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_atchFileInfoEmplCrtiFileId">재직증명서</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="emplCrtiFileId" id="mypCpaTrainReg_atchFileInfoEmplCrtiFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaTrainReg_atchFileInfoEmplCrtiFileId').click()" class="file-button">첨부</button>
                                            <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaTrainReg_atchFileInfoRsumFileId">이력서</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="rsumFileId" id="mypCpaTrainReg_atchFileInfoRsumFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaTrainReg_atchFileInfoRsumFileId').click()" class="file-button">첨부</button>
                                            <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 478px">
                <div class="button line"><a href="javascript:void(0);" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_apntcCpaHistInfo')">이전으로</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaTrainReg_atchFileInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--검토 및 제출--%>
        <div class="contents mypCpaTrain_tabMove" id="mypCpaTrainReg_reviewInfo">
            <div class="contents-title">
                <h1>검토 및 제출</h1>
                <p>등록하신 정보가 맞는지 확인하시고 제출 버튼을 눌러주세요.</p>
            </div>

            <div class="content-box">
                <div class="result-step">
                    <ul>
                        <li>
                            <a href="javascript:void(0);" class="active">
                                <strong>수습공인회계사<br/>등록신청서</strong>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="final-box v2">
                    <h2>사진등록</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>사진등록</th>
                                <td id="mypCpaTrainRegReviewInfo_pictFileNm"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>수습공인회계사 등록 재학여부</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>대학 및 대학원 재학여부</th>
                                <td id="mypCpaTrainRegReviewInfo_grdtStaus"></td>
                            </tr>
                            <tr>
                                <th>졸업예정일</th>
                                <td id="mypCpaTrainRegReviewInfo_grdtDe"></td>
                            </tr>
                            <tr>
                                <th>방학기간</th>
                                <td id="mypCpaTrainRegReviewInfo_vacationDe"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>이력정보</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>날짜</th>
                                <td id="mypCpaTrainRegReviewInfo_appRegistDe"></td>
                            </tr>
                            <tr>
                                <th>지도공인회계사</th>
                                <td id="mypCpaTrainRegReviewInfo_guideCpa"></td>
                            </tr>
                            <tr>
                                <th>실무수습기관</th>
                                <td id="mypCpaTrainRegReviewInfo_appInstt"></td>
                            </tr>
                            <tr>
                                <th>기타실무수습기관</th>
                                <td id="mypCpaTrainRegReviewInfo_appInsttEtc"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>첨부파일(첨부서류)</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>졸업예정 증명서류</th>
                                <td id="mypCpaTrainRegReviewInfo_atchFileId1"></td>
                            </tr>
                            <tr class="mypTrainReview_atchFileId2">
                                <th></th>
                                <td id="mypCpaTrainRegReviewInfo_atchFileId2"></td>
                            </tr>
                            <tr class="mypTrainReview_atchFileId3">
                                <th></th>
                                <td id="mypCpaTrainRegReviewInfo_atchFileId3"></td>
                            </tr>
                            <tr class="mypTrainReview_atchFileId4">
                                <th></th>
                                <td id="mypCpaTrainRegReviewInfo_atchFileId4"></td>
                            </tr>
                            <tr>
                                <th>합격증서 사본</th>
                                <td id="mypCpaTrainRegReviewInfo_passCrtiFileId"></td>
                            </tr>
                            <tr>
                                <th>재직증명서</th>
                                <td id="mypCpaTrainRegReviewInfo_emplCrtiFileId"></td>
                            </tr>
                            <tr>
                                <th>이력서</th>
                                <td id="mypCpaTrainRegReviewInfo_rsumFileId"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="buttons two" style="margin-top: 287px">
                <div class="button line mypCpaTrainReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaTrainRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaTrainReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_atchFileInfo')">이전으로</a></div>
                <div class="button full mypCpaTrainReg_nextBtn"><a href="javascript:void(0);" id="mypCpaTrainReg_reviewInfoSaveBtn">제출</a></div>
            </div>
        </div>

        <button type="button" class="close" id="mypCpaTrainReg_closeBtn">close</button>

        <input type="hidden" name="pin" id="mypCpaTrainReg_pin" value="${mypCpaTrainRegPin}"/>
        <input type="hidden" name="apntcSn" id="mypCpaTrainReg_apntcSn" value="${mypCpaTrainRegApntcSn}"/>
        <input type="hidden" id="mypCpaTrainReg_saveMode" value="${mypCpaTrainRegSaveMode.saveMode}"/>
        <input type="hidden" id="mypCpaTrainReg_movePage" value="${mypCpaTrainRegSaveMode.movePage}"/>
        <input type="hidden" id="mypCpaTrainReg_regFlag" value="${mypCpaTrainRegSaveMode.regFlag}"/>
    </div>

    <!--실무수습기관 레이어팝-->
    <div class="kicpa-modal" id="mypCpaTrainRegPop_auditPop">
        <div class="modal-inner">
            <div class="modal-title">실무수습기관 검색</div>
            <div class="modal-form">
                <div class="modal-form-inner">
                    <span class="modal-input" style="width: 450px;">
                        <input type="text" id="mypCpaTrainRegPop_auditPopSearchText" placeholder="실무수습기관명, 실무수습기관 코드를 입력하세요." onkeypress="javascript:if(event.keyCode==13) { event.preventDefault(); $('#mypCpaTrainRegPop_auditPopSearchBtn').trigger('click')}">
                    </span>
                </div>
                <button type="button" id="mypCpaTrainRegPop_auditPopSearchBtn">검색</button>
            </div>
            <div class="modal-result tableFixHead" style="height: 47%; overflow:auto">
                <table cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col style="width: 60%;" />
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>실무수습기관명</th>
                        <th>실무수습기관 코드</th>
                    </tr>
                    </thead>
                    <tbody style="text-align: center;" id="mypCpaTrainRegPop_auditPopList">

                    </tbody>
                </table>
            </div>
            <div class="modal-buttons">
                <button type="button" class="small-round-button type4" id="mypCpaTrainRegPop_auditPopSaveBtn">선택</button>
                <button type="button" class="small-round-button type2" id="mypCpaTrainRegPop_auditPopCloseBtn">취소</button>
            </div>
            <input type="hidden" id="mypCpaTrainRegPop_auditPopSetAudNm">
            <input type="hidden" id="mypCpaTrainRegPop_auditPopSetAudId">
        </div>
    </div>
</body>
</html>
