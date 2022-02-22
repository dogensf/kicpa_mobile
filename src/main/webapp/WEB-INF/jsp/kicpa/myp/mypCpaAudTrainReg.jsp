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
<link href="<c:url value='/'/>css/kicpa/myp/mypCpaAudTrainReg.css" rel="stylesheet" type="text/css" />
<!-- css :: End -->

<!-- script :: Start -->
<script src="<c:url value='/'/>js/jquery.min.js"></script>
<script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
<script src="<c:url value='/'/>js/kicpa/stringHelper.js?ver=2"></script>
<script src="<c:url value='/'/>js/kicpa/myp/mypCpaAudTrainReg.js?ver=1"></script>
<script src="<c:url value='/'/>js/KicpaCommon.js?ver=2"></script>
<!-- script :: End -->
</head>
<body>
<div class="kicpa-layer-content">
    <div class="lnb v3">
        <ul>
            <li><a class="mypCpaAudTrainReg_activeMove" href="javascript:void(0);" id="mypCpaAudTrainReg_agreeActive">외감 실무수습 서약서</a></li>
            <li><a class="mypCpaAudTrainReg_activeMove" href="javascript:void(0);" id="mypCpaAudTrainReg_apntcCpaHistInfoActive">이력정보 (외감)</a></li>
            <li><a class="mypCpaAudTrainReg_activeMove" href="javascript:void(0);" id="mypCpaAudTrainReg_atchFileInfoActive">첨부파일 (첨부서류)</a></li>
            <li><a class="mypCpaAudTrainReg_activeMove" href="javascript:void(0);" id="mypCpaAudTrainReg_reviewInfoActive">검토 및 제출</a></li>
        </ul>
    </div>

    <%--외감실무수습 서약서--%>
    <div class="contents mypCpaAudTrain_tabMove" id="mypCpaAudTrainReg_agree">
        <div class="contents-title">
            <h1>외감 실무수습 서약서</h1>
            <p>아래의 외부감사실무수습등록 실무수습 서약서를 잃고 동의하여 주시기 바랍니다.</p>
        </div>

        <form id="mypCpaAudTrainReg_agreeForm">
            <div class="content-box" style="margin-top: 54px;">
                <div class="mix-input">
                    <dl>
                        <dt>성명</dt>
                        <dd><input type="text" name="koreanNm" value="${mypCpaAudTrainRegKoreanNm}"/></dd>
                    </dl>
                    <dl>
                        <dt>생년월일</dt>
                        <dd><input type="text" name="brthdy" value="${mypCpaAudTrainRegBrthdy}"/></dd>
                    </dl>
                </div>

                <div class="rule-box" style="margin-top:30px;">
                    <h2 class="rule-box-title">외부감사실무수습등록 실무수습 서약서</h2>
                    <span class="textarea" style="height:130px;">
                        <textarea name="" id="">상기 본인은 수습공인회계사등록에 따른 실무수습에 있어 이 실무수습이 공인회계사로서의 인격과 전문가적 능력을 함양함에 있음을 명심하여 공인회계사법‧동법에
의한 명령‧실무수습에관한규정 및 회계연수원운영규정을 성실히 준수하고 실무수습기관에서의 실무수습 및 회계연수원의 연수기간 중 근면하고 성실한 자세로서
실무수습에 임할 것이며, 만일 이를 이행하지 못하였을 때에는 관련법규에 따른 조치를 감수하겠음을 이에 서약합니다.
</textarea>
                    </span>
                </div>

                <span class="checkbox-type1">
                <input type="checkbox" name="agreeInfoYn" id="mypCpaAudTrainReg_agreement" value="Y"/>
                <label for="mypCpaAudTrainReg_agreement">본인은 실무수습 서약에 대해 고지 받았으며 이를 충분히 이해하고 동의합니다.</label>
              </span>
            </div>
        </form>

        <div class="buttons two" style="margin-top: 342px">
            <div class="button line"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaAudTrainRegPin}" >마이페이지 이동</a></div>
            <div class="button full"><a href="javascript:void(0);" id="mypCpaAudTrainReg_agreeSaveBtn">시작하기</a></div>
        </div>
    </div>

    <%--이력정보 (외감)--%>
    <div class="contents mypCpaAudTrain_tabMove" id="mypCpaAudTrainReg_apntcCpaHistInfo">
        <div class="contents-title">
            <h1>이력정보 (외감)</h1>
        </div>

        <form id="mypCpaAudTrainReg_apntcCpaHistInfoForm">
            <div class="content-box" style="margin-top: 71px;">
                <div class="responsive-form-box">
                    <ul>
                        <li>
                            <div class="input-group required">
                                <label for="mypCpaAudTrainReg_audRegistDe">외감 실무수습 시작일</label>
                                <span class="input cal">
                                    <input type="text" name="audRegistDe" id="mypCpaAudTrainReg_audRegistDe" placeholder="날짜를 입력하세요." />
                                    <button type="button" class="calendar-button">calendar</button>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="input-group required">
                                <label for="mypCpaAudTrainReg_guideCpa">지도공인회계사</label>
                                <span class="input mypCpaAudTrainReg-inline-input"><input type="text" name="guideCpaNm" title="지도공인회계사명" id="mypCpaAudTrainReg_guideCpa" placeholder="지도공인회계사 성명을 입력하세요."/></span>
                                <span class="input mypCpaAudTrainReg-inline-input"><input type="text" name="guideCpaNo" title="지도공인회계사번호" id="mypCpaAudTrainReg_guideCpaId" placeholder="지도공인회계사 번호를 입력하세요."/></span>
                            </div>
                        </li>
                        <li class="block">
                            <div class="input-group required">
                                <label for="mypCpaAudTrainReg_appInsttNm">실무수습기관</label>
                                <span class="input mypCpaAudTrainReg-inline-input"><input type="text" name="appInsttNm" title="실무수습기관명" id="mypCpaAudTrainReg_appInsttNm" placeholder="실무수습기관을 등록하세요." readonly/></span>
                                <span class="input mypCpaAudTrainReg-inline-input"><input type="text" name="appInsttCd" title="실무수습기관코드" id="mypCpaAudTrainReg_appInsttCd" placeholder="실무수습기관 번호" readonly/></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </form>

        <div class="buttons two" style="margin-top: 508px">
            <div class="button line"><a href="javascript:void(0);" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_agree')">이전으로</a></div>
            <div class="button full"><a href="javascript:void(0);" id="mypCpaAudTrainReg_apntcCpaHistInfoSaveBtn">다음</a></div>
        </div>
    </div>

    <%--첨부파일 (첨부서류)--%>
    <div class="contents mypCpaAudTrain_tabMove" id="mypCpaAudTrainReg_atchFileInfo">
        <div class="contents-title">
            <h1>첨부파일 (첨부서류)</h1>
        </div>

        <form id="mypCpaAudTrainReg_atchFileInfoForm">
            <div class="content-box" style="margin-top: 71px;">
                <div class="responsive-form-box">
                    <ul>
                        <li class="block">
                            <div class="input-group required">
                                <label for="mypCpaAudTrainReg_emplCrtiFileId">재직증명서</label>
                                <div class="file">
                                    <span class="input">
                                        <input type="file" name="emplCrtiFileId" id="mypCpaAudTrainReg_emplCrtiFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                    </span>
                                    <div class="action-buttons">
                                        <button type="button" onclick="jQuery('#mypCpaAudTrainReg_emplCrtiFileId').click()" class="file-button">첨부</button>
                                        <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                        <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="block">
                            <div class="input-group required">
                                <label for="mypCpaAudTrainReg_rsumFileId">이력서</label>
                                <div class="file">
                                    <span class="input">
                                        <input type="file" name="rsumFileId" id="mypCpaAudTrainReg_rsumFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                    </span>
                                    <div class="action-buttons">
                                        <button type="button" onclick="jQuery('#mypCpaAudTrainReg_rsumFileId').click()" class="file-button">첨부</button>
                                        <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                        <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="block">
                            <div class="input-group">
                                <label for="mypCpaAudTrainReg_atchFileId">기타</label>
                                <div class="file">
                                    <span class="input">
                                        <input type="file" name="atchFileId" id="mypCpaAudTrainReg_atchFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                    </span>
                                    <div class="action-buttons">
                                        <button type="button" onclick="jQuery('#mypCpaAudTrainReg_atchFileId').click()" class="file-button">첨부</button>
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

        <div class="buttons two" style="margin-top: 407px">
            <div class="button line"><a href="javascript:void(0);" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_apntcCpaHistInfo')">이전으로</a></div>
            <div class="button full"><a href="javascript:void(0);" id="mypCpaAudTrainReg_atchFileInfoSaveBtn">다음</a></div>
        </div>
    </div>

    <%--검토 및 제출--%>
    <div class="contents mypCpaAudTrain_tabMove" id="mypCpaAudTrainReg_reviewInfo">
        <div class="contents-title">
            <h1>검토 및 제출</h1>
            <p>등록하신 정보가 맞는지 확인하시고 제출 버튼을 눌러주세요.</p>
        </div>

        <div class="content-box">
            <div class="result-step">
                <ul>
                    <li>
                        <a href="javascript:void(0);" class="active">
                            <strong>외부감사실무수습<br/>등록신청서</strong>
                        </a>
                    </li>
                </ul>
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
                            <td id="mypCpaAudTrainRegReviewInfo_audRegistDe"></td>
                        </tr>
                        <tr>
                            <th>지도공인회계사</th>
                            <td id="mypCpaAudTrainRegReviewInfo_guideCpa"></td>
                        </tr>
                        <tr>
                            <th>실무수습기관</th>
                            <td id="mypCpaAudTrainRegReviewInfo_appInstt"></td>
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
                            <th>재직증명서</th>
                            <td id="mypCpaAudTrainRegReviewInfo_emplCrtiFileId"></td>
                        </tr>
                        <tr>
                            <th>이력서</th>
                            <td id="mypCpaAudTrainRegReviewInfo_rsumFileId"></td>
                        </tr>
                        <tr>
                            <th>기타</th>
                           <td id="mypCpaAudTrainRegReviewInfo_atchFileId"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="buttons two" style="margin-top: 287px">
            <div class="button line mypCpaAudTrainReg_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaAudTrainRegPin}" >마이페이지 이동</a></div>
            <div class="button line mypCpaAudTrainReg_preBtn"><a href="javascript:void(0);" onclick="mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_atchFileInfo')">이전으로</a></div>
            <div class="button full mypCpaAudTrainReg_nextBtn"><a href="javascript:void(0);" id="mypCpaAudTrainReg_reviewInfoSaveBtn">제출</a></div>
        </div>
    </div>

    <button type="button" class="close" id="mypCpaAudTrainReg_closeBtn">close</button>

    <input type="hidden" name="pin" id="mypCpaAudTrainReg_pin" value="${mypCpaAudTrainRegPin}"/>
    <input type="hidden" name="apntcSn" id="mypCpaAudTrainReg_apntcSn" value="${mypCpaAudTrainRegApntcSn}"/>
    <input type="hidden" id="mypCpaAudTrainReg_saveMode" value="${mypCpaAudTrainRegSaveMode.saveMode}"/>
    <input type="hidden" id="mypCpaAudTrainReg_movePage" value="${mypCpaAudTrainRegSaveMode.movePage}"/>
    <input type="hidden" id="mypCpaAudTrainReg_regFlag" value="${mypCpaAudTrainRegSaveMode.regFlag}"/>
</div>


<!--실무수습기관 레이어팝-->
<div class="kicpa-modal" id="mypCpaAudTrainRegPop_auditPop">
    <div class="modal-inner">
        <div class="modal-title">실무수습기관 검색</div>
        <div class="modal-form">
            <div class="modal-form-inner">
                    <span class="modal-input" style="width: 450px;">
                        <input type="text" id="mypCpaAudTrainRegPop_auditPopSearchText" placeholder="실무수습기관명, 실무수습기관 코드를 입력하세요." onkeypress="javascript:if(event.keyCode==13) { event.preventDefault(); $('#mypCpaAudTrainRegPop_auditPopSearchBtn').trigger('click')}">
                    </span>
            </div>
            <button type="button" id="mypCpaAudTrainRegPop_auditPopSearchBtn">검색</button>
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
                <tbody style="text-align: center;" id="mypCpaAudTrainRegPop_auditPopList">

                </tbody>
            </table>
        </div>
        <div class="modal-buttons">
            <button type="button" class="small-round-button type4" id="mypCpaAudTrainRegPop_auditPopSaveBtn">선택</button>
            <button type="button" class="small-round-button type2" id="mypCpaAudTrainRegPop_auditPopCloseBtn">취소</button>
        </div>
        <input type="hidden" id="mypCpaAudTrainRegPop_auditPopSetAudNm">
        <input type="hidden" id="mypCpaAudTrainRegPop_auditPopSetAudId">
    </div>
</div>
</body>
</html>
