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
<link href="<c:url value='/'/>css/kicpa/myp/mypCpaMemberReg.css" rel="stylesheet" type="text/css" />
<!-- css :: End -->

<!-- script :: Start -->
<script src="<c:url value='/'/>js/jquery.min.js"></script>
<script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
<script src="<c:url value='/'/>js/kicpa/stringHelper.js?ver=2"></script>
<script src="<c:url value='/'/>js/kicpa/myp/mypCpaMemberReg.js?ver=1"></script>
<script src="<c:url value='/'/>js/KicpaCommon.js?ver=2"></script>
<!-- script :: End -->
</head>
<body>
    <div class="kicpa-layer-content">
        <div class="lnb">
            <ul>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_agreeActive">동의서</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_aidMberInfoActive">부조회원 구분 &<br />사업자등록번호</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_cpaCareerInfoActive">회원등록구분</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_nmstOthbcInfoActive">정보공개설정</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_proFieldInfoActive">전문분야</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_proCareerInfoActive">전문분야 활동사항</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_proCmitInfoActive">위원회 활동사항</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_proLicenseInfoActive">자격/면허</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_proLtrryInfoActive">학술활동</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_proWnpzInfoActive">수상내용</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_atchFileInfoActive">첨부파일 (첨부서류)</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_aidDuesInfoActive">등록 회비 납부</a></li>
                <li><a class="mypCpaMember_activeMove" href="javascript:void(0);" id="mypCpaMember_reviewInfoActive">검토 및 제출</a></li>
            </ul>
        </div>

        <%--동의서--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_agree">
            <div class="contents-title">
                <h1>외감 실무수습 서약서</h1>
                <p>아래의 외부감사실무수습등록 실무수습 서약서를 잃고 동의하여 주시기 바랍니다.</p>
            </div>

            <form id="mypCpaMemberReg_agreeForm">
                <div class="content-box" style="margin-top: 54px;">
                    <div class="mix-input">
                        <dl>
                            <dt>성명</dt>
                            <dd><input type="text" name="koreanNm" value="${mypCpaMemberRegKoreanNm}"/></dd>
                        </dl>
                        <dl>
                            <dt>생년월일</dt>
                            <dd><input type="text" name="brthdy" value="${mypCpaMemberRegBrthdy}"/></dd>
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
                <input type="checkbox" name="agreeInfoYn" id="mypCpaMemberReg_agreement" value="Y"/>
                <label for="mypCpaMemberReg_agreement">본인은 실무수습 서약에 대해 고지 받았으며 이를 충분히 이해하고 동의합니다.</label>
              </span>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 342px">
                <div class="button line"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaMemberReg_agreeSaveBtn">시작하기</a></div>
            </div>
        </div>
        
        <%--부조회원 구분 & 사업자등록번호--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_aidMberInfo">
            <div class="contents-title">
                <h1>부조회원 구분 & 사업자등록번호</h1>
            </div>

            <form id="mypCpaMemberReg_aidMberInfoForm">
                <div class="content-box" style="margin-top: 65px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaMember_aidMberFlag">부조회원 구분</label>
                                    <span class="select">
                                        <select name="aidMberFlag" id="mypCpaMember_aidMberFlag">
                                            <option value="">선택하세요.</option>
                                            <option value="R">정회원</option>
                                            <option value="A">준회원</option>
                                        </select>
                                    </span>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label for="mypCpaMember_bizrNo">사업자 등록번호</label>
                                    <span class="input"><input type="text" name="bizrNo" id="mypCpaMember_bizrNo" placeholder="“-” 제외 사업자번호를 등록하세요." maxlength="12" oninput="mypCpaMemberReg.inputBizrNumber(this);"/></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" name="koreanNm" value="${mypCpaMemberRegKoreanNm}"/>
                <input type="hidden" name="brthdy" value="${mypCpaMemberRegBrthdy}"/>
            </form>

            <div class="buttons two" style="margin-top: 452px">
                <div class="button line"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >종료</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaMemberReg_aidMberInfoSaveBtn">시작하기</a></div>
            </div>
        </div>

        <%--회원등록구분--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_cpaCareerInfo">
            <div class="contents-title">
                <h1>회원등록구분</h1>
            </div>

            <form id="mypCpaMemberReg_cpaCareerInfoForm">
                <div class="content-box" style="margin-top: 65px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaMember_registDe">공인회계사 등록예정일</label>
                                    <span class="input cal">
                                        <input type="text" name="registDe" id="mypCpaMember_registDe" placeholder="날짜를 입력하세요." />
                                        <button type="button" class="calendar-button">calendar</button>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaMember_mberFlag">회원구분</label>
                                    <span class="select">
                                        <select name="mberFlag" id="mypCpaMember_mberFlag">
                                            <option value="">선택하세요.</option>
                                            <option value="A2020010">전업</option>
                                            <option value="A2020030">개업</option>
                                            <option value="A2020050">휴업</option>
                                        </select>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaMember_auditNm">가입 감사인</label>
                                    <span class="input mypCpaMember-inline-input"><input type="text" name="auditNm" title="감사인명" id="mypCpaMember_auditNm" placeholder="감사인명을 입력하세요." disabled/></span>
                                    <span class="input mypCpaMember-inline-input"><input type="text" name="auditId" title="감사인코드" id="mypCpaMember_auditId" placeholder="감사인코드를 입력하세요." disabled/></span>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label for="mypCpaMember_auditOfcps">구성구분</label>
                                    <span class="select">
                                        <select name="auditOfcps" id="mypCpaMember_auditOfcps">
                                            <option value="">선택하세요.</option>
                                            <option value="A3020010">대표이사</option>
                                            <option value="A3020020">이사</option>
                                            <option value="A3020030">사원</option>
                                            <option value="A3020040">구성원</option>
                                            <option value="A3020050">주무공인회계사</option>
                                        </select>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 580px">
                <div class="button line"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_aidMberInfo')">이전으로</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaMemberReg_cpaCareerInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--정보공개설정--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_nmstOthbcInfo">
            <div class="contents-title">
                <h1>정보공개설정</h1>
            </div>

            <form id="mypCpaMemberReg_nmstOthbcInfoForm">
                <div class="content-box" style="margin-top: 65px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li>
                                <div class="input-group required">
                                    <label>사무소 주소</label>
                                    <div class="radio-group">
                                        <span class="radio">
                                            <input type="radio" name="ofcAdresYn" id="mypCpaMember_ofcAdresY" value="Y" checked/>
                                            <label for="mypCpaMember_ofcAdresY">공개</label>
                                        </span>
                                        <span class="radio">
                                            <input type="radio" name="ofcAdresYn" id="mypCpaMember_ofcAdresN" value="N"/>
                                            <label for="mypCpaMember_ofcAdresN">비공개</label>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>사무소 명</label>
                                    <div class="radio-group">
                                        <span class="radio">
                                            <input type="radio" name="ofcNameYn" id="mypCpaMember_ofcNameY" value="Y" checked/>
                                            <label for="mypCpaMember_ofcNameY">공개</label>
                                        </span>
                                        <span class="radio">
                                            <input type="radio" name="ofcNameYn" id="mypCpaMember_ofcNameN" value="N"/>
                                            <label for="mypCpaMember_ofcNameN">비공개</label>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>전자메일</label>
                                    <div class="radio-group">
                                        <span class="radio">
                                            <input type="radio" name="emailYn" id="mypCpaMember_emailY" value="Y" checked/>
                                            <label for="mypCpaMember_emailY">공개</label>
                                        </span>
                                        <span class="radio">
                                            <input type="radio" name="emailYn" id="mypCpaMember_emailN" value="N"/>
                                            <label for="mypCpaMember_emailN">비공개</label>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>사무소 전화</label>
                                    <div class="radio-group">
                                        <span class="radio">
                                            <input type="radio" name="ofcTelYn" id="mypCpaMember_ofcTelY" value="Y" checked/>
                                            <label for="mypCpaMember_ofcTelY">공개</label>
                                        </span>
                                        <span class="radio">
                                            <input type="radio" name="ofcTelYn" id="mypCpaMember_ofcTelN" value="N"/>
                                            <label for="mypCpaMember_ofcTelN">비공개</label>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>사진</label>
                                    <div class="radio-group">
                                        <span class="radio">
                                            <input type="radio" name="photoYn" id="mypCpaMember_photoY" value="Y" checked/>
                                            <label for="mypCpaMember_photoY">공개</label>
                                        </span>
                                        <span class="radio">
                                            <input type="radio" name="photoYn" id="mypCpaMember_photoN" value="N"/>
                                            <label for="mypCpaMember_photoN">비공개</label>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="input-group required">
                                    <label>사무소 팩스</label>
                                    <div class="radio-group">
                                        <span class="radio">
                                            <input type="radio" name="ofcFaxYn" id="mypCpaMember_ofcFaxY" value="Y" checked/>
                                            <label for="mypCpaMember_ofcFaxY">공개</label>
                                        </span>
                                        <span class="radio">
                                            <input type="radio" name="ofcFaxYn" id="mypCpaMember_ofcFaxN" value="N"/>
                                            <label for="mypCpaMember_ofcFaxN">비공개</label>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 580px">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_cpaCareerInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_nmstOthbcInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--전문분야--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_proFieldInfo">
            <div class="contents-title">
                <h1>전문분야</h1>
                <p>항목을 체크해 주세요.</p>
            </div>

            <form id="mypCpaMemberReg_proFieldInfoForm">
                <div class="content-box" style="margin-top: 72px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li class="block">
                                <div class="input-group">
                                    <label>회계감사</label>
                                    <div class="check-group">
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd101" name="proFildCd[]" value="A2180101"/>
                                            <label for="mypCpaMember_proFildCd101">금융회사 (외감)</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd102" name="proFildCd[]" value="A2180102"/>
                                            <label for="mypCpaMember_proFildCd102">비금융회사(외감)</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd103" name="proFildCd[]" value="A2180103"/>
                                            <label for="mypCpaMember_proFildCd103">지방자체단체</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd104" name="proFildCd[]" value="A2180104"/>
                                            <label for="mypCpaMember_proFildCd104">공공기관</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd105" name="proFildCd[]" value="A2180105"/>
                                            <label for="mypCpaMember_proFildCd105">학교법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd106" name="proFildCd[]" value="A2180106"/>
                                            <label for="mypCpaMember_proFildCd106">의료법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd107" name="proFildCd[]" value="A2180107"/>
                                            <label for="mypCpaMember_proFildCd107">사회복지 법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd108" name="proFildCd[]" value="A2180108"/>
                                            <label for="mypCpaMember_proFildCd108">종교법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd109" name="proFildCd[]" value="A2180109"/>
                                            <label for="mypCpaMember_proFildCd109">상호금융</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd110" name="proFildCd[]" value="A2180110"/>
                                            <label for="mypCpaMember_proFildCd110">공동주택등</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd111" name="proFildCd[]" value="A2180111"/>
                                            <label for="mypCpaMember_proFildCd111">정부결산지원</label>
                                        </span>
                                        <span class="check w5" style="width: 5%;">
                                            <input type="checkbox" id="mypCpaMember_proFildCd199" name="proFildCd[]" value="A2180199"/>
                                            <label for="mypCpaMember_proFildCd199">기타</label>
                                        </span>
                                        <span class="check w5">
                                            <span class="input inline" style="width: 300px;"><input type="text" name="remark1" id="mypCpaMember_proFildCdEtc199" disabled></span>
                                        </span>

                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label>세무</label>
                                    <div class="check-group">
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd201" name="proFildCd[]" value="A2180201"/>
                                            <label for="mypCpaMember_proFildCd201">개인사업</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd202" name="proFildCd[]" value="A2180202"/>
                                            <label for="mypCpaMember_proFildCd202">내국법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd203" name="proFildCd[]" value="A2180203"/>
                                            <label for="mypCpaMember_proFildCd203">외국법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd204" name="proFildCd[]" value="A2180204"/>
                                            <label for="mypCpaMember_proFildCd204">비영리법인</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd205" name="proFildCd[]" value="A2180205"/>
                                            <label for="mypCpaMember_proFildCd205">연결납세</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd206" name="proFildCd[]" value="A2180206"/>
                                            <label for="mypCpaMember_proFildCd206">양도/상속/증여</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd207" name="proFildCd[]" value="A2180207"/>
                                            <label for="mypCpaMember_proFildCd207">지방세</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd208" name="proFildCd[]" value="A2180208"/>
                                            <label for="mypCpaMember_proFildCd208">구조조정</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd209" name="proFildCd[]" value="A2180209"/>
                                            <label for="mypCpaMember_proFildCd209">부동산투자개발</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd210" name="proFildCd[]" value="A2180210"/>
                                            <label for="mypCpaMember_proFildCd210">금융세무</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd211" name="proFildCd[]" value="A2180211"/>
                                            <label for="mypCpaMember_proFildCd211">국내 및 해외투자</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd212" name="proFildCd[]" value="A2180212"/>
                                            <label for="mypCpaMember_proFildCd212">이전가격</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd213" name="proFildCd[]" value="A2180213"/>
                                            <label for="mypCpaMember_proFildCd213">관세</label>
                                        </span>
                                        <span class="check w5" style="width: 5%;">
                                            <input type="checkbox" id="mypCpaMember_proFildCd299" name="proFildCd[]" value="A2180299"/>
                                            <label for="mypCpaMember_proFildCd299">기타</label>
                                        </span>
                                        <span class="check w5">
                                            <span class="input inline" style="width: 300px;"><input type="text" name="remark2" id="mypCpaMember_proFildCdEtc299" disabled></span>
                                        </span>

                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label>컨설팅</label>
                                    <div class="check-group">
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd301" name="proFildCd[]" value="A2180301"/>
                                            <label for="mypCpaMember_proFildCd301">재무 및 회계 자문</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd302" name="proFildCd[]" value="A2180302"/>
                                            <label for="mypCpaMember_proFildCd302">리스트관리 및 내부감사 자문</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd303" name="proFildCd[]" value="A2180303"/>
                                            <label for="mypCpaMember_proFildCd303">FTA 원산지 증명업무</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd304" name="proFildCd[]" value="A2180304"/>
                                            <label for="mypCpaMember_proFildCd304">고객관계 및 물류관리 등 기업운영 자문</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd305" name="proFildCd[]" value="A2180305"/>
                                            <label for="mypCpaMember_proFildCd305">기업전략자문</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd306" name="proFildCd[]" value="A2180306"/>
                                            <label for="mypCpaMember_proFildCd306">전자적 지원관리 및 전산 자문</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd307" name="proFildCd[]" value="A2180307"/>
                                            <label for="mypCpaMember_proFildCd307">주식가치평가 및 실사업무</label>
                                        </span>
                                        <span class="check w3">
                                            <input type="checkbox" id="mypCpaMember_proFildCd308" name="proFildCd[]" value="A2180308"/>
                                            <label for="mypCpaMember_proFildCd308">공동부문 자문</label>
                                        </span>
                                        <span class="check w3">

                                        </span>
                                        <span class="check w5" style="width: 5%;">
                                            <input type="checkbox" id="mypCpaMember_proFildCd399" name="proFildCd[]" value="A2180399"/>
                                            <label for="mypCpaMember_proFildCd399">기타</label>
                                        </span>
                                        <span class="check w3">
                                            <span class="input inline" style="width: 300px;"><input type="text" name="remark3" id="mypCpaMember_proFildCdEtc399" disabled></span>
                                        </span>

                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label>법원관련</label>
                                    <div class="check-group">
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd401" name="proFildCd[]" value="A2180401"/>
                                            <label for="mypCpaMember_proFildCd401">법정관리</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd402" name="proFildCd[]" value="A2180402"/>
                                            <label for="mypCpaMember_proFildCd402">회생</label>
                                        </span>
                                        <span class="check w5">
                                            <input type="checkbox" id="mypCpaMember_proFildCd403" name="proFildCd[]" value="A2180403"/>
                                            <label for="mypCpaMember_proFildCd403">파산</label>
                                        </span>
                                        <span class="check w5" style="width: 5%;">
                                            <input type="checkbox" id="mypCpaMember_proFildCd499" name="proFildCd[]" value="A2180499"/>
                                            <label for="mypCpaMember_proFildCd499">기타</label>
                                        </span>
                                        <span class="check w5">
                                            <span class="input inline" style="width: 300px;"><input type="text" name="remark4" id="mypCpaMember_proFildCdEtc499" disabled></span>
                                        </span>

                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label>기타</label>
                                    <div class="check-group">
                                        <span class="check solo">
                                            <input type="checkbox" id="mypCpaMember_proFildCd999" name="proFildCd[]" value="A2189999"/>
                                            <label for="mypCpaMember_proFildCd999">&nbsp</label>
                                        </span>
                                        <span class="input inline" style="width: 300px;"><input type="text" name="remark5" id="mypCpaMember_proFildCdEtc999" disabled></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>

            <div class="buttons two" style="margin-top: 100px">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_nmstOthbcInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_proFieldInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--전문분야 활동사항--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_proCareerInfo">
            <div class="contents-title">
                <h1>전문분야 활동사항</h1>
                <p>전문분야 활동사항 등록하시려면 추가 버튼을 선택하세요. 없으면 다음버튼을 선택하세요.</p>
            </div>

            <div class="content-box" style="" id="mypCpaMember_proCareerInfoAdd">

            </div>

            <div class="content-box" style="" id="mypCpaMember_proCareerInfoDel">

            </div>

            <button type="button" class="gray-button icon" id="mypCpaMember_proCareerAddBtn" style="margin-top:40px;">전문분야 활동사항 추가</button>

            <div class="buttons two" style="margin-top:128px;">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_proFieldInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_proCareerInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--위원회 활동사항--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_proCmitInfo">
            <div class="contents-title">
                <h1>위원회 활동사항</h1>
                <p>위원회 활동사항 등록하시려면 추가 버튼을 선택하세요. 없으면 다음버튼을 선택하세요.</p>
            </div>

            <div class="content-box" style="" id="mypCpaMember_proCmitInfoAdd">

            </div>

            <div class="content-box" style="" id="mypCpaMember_proCmitInfoDel">

            </div>

            <button type="button" class="gray-button icon" id="mypCpaMember_proCmitAddBtn" style="margin-top:40px;">위원회 활동사항 추가</button>

            <div class="buttons two" style="margin-top:128px;">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_proCareerInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_proCmitInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--자격/면허--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_proLicenseInfo">
            <div class="contents-title">
                <h1>자격/면허</h1>
                <p>자격/면허사항 등록하시려면 추가 버튼을 선택하세요. 없으면 다음버튼을 선택하세요.</p>
            </div>

            <div class="content-box" style="" id="mypCpaMember_proLicenseInfoAdd">

            </div>

            <div class="content-box" style="" id="mypCpaMember_proLicenseInfoDel">

            </div>

            <button type="button" class="gray-button icon" id="mypCpaMember_proLicenseAddBtn" style="margin-top:40px;">자격/면허 추가</button>

            <div class="buttons two" style="margin-top:128px;">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_proCmitInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_proLicenseInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--학술활동--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_proLtrryInfo">
            <div class="contents-title">
                <h1>학술활동</h1>
                <p>학술활동을 등록하시려면 추가 버튼을 선택하세요. 없으면 다음버튼을 선택하세요.</p>
            </div>

            <div class="content-box" style="" id="mypCpaMember_proLtrryInfoAdd">

            </div>

            <div class="content-box" style="" id="mypCpaMember_proLtrryInfoDel">

            </div>

            <button type="button" class="gray-button icon" style="margin-top:40px;" id="mypCpaMember_proLtrryAddBtn">학술활동 추가</button>

            <div class="buttons two" style="margin-top:128px;">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_proLicenseInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_proLtrryInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--수상내용--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_proWnpzInfo">
            <div class="contents-title">
                <h1>수상내용</h1>
                <p>수상내역을 등록하시려면 추가 버튼을 선택하세요. 없으면 다음버튼을 선택하세요.</p>
            </div>

            <div class="content-box" style="" id="mypCpaMember_proWnpzInfoAdd">

            </div>

            <div class="content-box" style="" id="mypCpaMember_proWnpzInfoDel">

            </div>

            <button type="button" class="gray-button icon" id="mypCpaMember_proWnpzAddBtn" style="margin-top:40px;">수상내역 추가</button>

            <div class="buttons two" style="margin-top:128px;">
                <div class="button line mypCpaMember_mypBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_proLtrryInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextBtn"><a href="javascript:void(0);" id="mypCpaMemberReg_proWnpzInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--첨부파일 (첨부서류)--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_atchFileInfo">
            <div class="contents-title">
                <h1>첨부파일 (첨부서류)</h1>
            </div>

            <form id="mypCpaMemberReg_atchFileInfoForm">
                <div class="content-box" style="margin-top: 71px;">
                    <div class="responsive-form-box">
                        <ul>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaMember_passCrtiFileId">공인회계사 합격증 사본 </label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="passCrtiFileId" id="mypCpaMember_passCrtiFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaMember_passCrtiFileId').click()" class="file-button">첨부</button>
                                            <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaMember_rsumFileId">이력서</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="rsumFileId" id="mypCpaMember_rsumFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaMember_rsumFileId').click()" class="file-button">첨부</button>
                                            <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group required">
                                    <label for="mypCpaMember_apntcEndFileId">실무수습종료증명서</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="apntcEndFileId" id="mypCpaMember_apntcEndFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaMember_apntcEndFileId').click()" class="file-button">첨부</button>
                                            <button type="button" style="visibility: hidden;" class="action-button add">+</button>
                                            <button type="button" style="visibility: hidden;" class="action-button delete">-</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="block">
                                <div class="input-group">
                                    <label for="mypCpaMember_atchFileId">기타</label>
                                    <div class="file">
                                        <span class="input">
                                            <input type="file" name="atchFileId" id="mypCpaMember_atchFileId" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                                        </span>
                                        <div class="action-buttons">
                                            <button type="button" onclick="jQuery('#mypCpaMember_atchFileId').click()" class="file-button">첨부</button>
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
                <div class="button line"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_proWnpzInfo');">이전으로</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaMemberReg_atchFileInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--등록 회비 납부--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_aidDuesInfo">
            <div class="contents-title">
                <h1>등록 회비 납부</h1>
            </div>

            <div class="content-box">
            </div>

            <div class="buttons two" style="margin-top: 478px">
                <div class="button line"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_atchFileInfo');">이전으로</a></div>
                <div class="button full"><a href="javascript:void(0);" id="mypCpaMemberReg_aidDuesInfoSaveBtn">다음</a></div>
            </div>
        </div>

        <%--검토 및 제출--%>
        <div class="contents mypCpaMember_tabMove" id="mypCpaMember_reviewInfo">
            <div class="contents-title">
                <h1>검토 및 제출</h1>
                <p>등록하신 정보가 맞는지 확인하시고 제출 버튼을 눌러주세요.</p>
            </div>

            <div class="content-box">
                <div class="result-step">
                    <ul>
                        <li>
                            <a href="javascript:void(0);" class="active">
                                <strong>공인회계사<br/>등록신청서</strong>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <strong>입회신청서</strong>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <strong>개업 휴업신청서</strong>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <strong>등록회비 납부</strong>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="final-box v2">
                    <h2>부조회원 구분 & 사업자등록번호</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>부조회원 구분</th>
                                <td id="mypCpaMemberReviewInfo_aidMberFlag"></td>
                            </tr>
                            <tr>
                                <th>사업자등록번호</th>
                                <td id="mypCpaMemberReviewInfo_bizrNo"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>회원등록구분</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>공인회계사 등록예정일</th>
                                <td id="mypCpaMemberReviewInfo_registDe"></td>
                            </tr>
                            <tr>
                                <th>회원구분</th>
                                <td id="mypCpaMemberReviewInfo_mberFlag"></td>
                            </tr>
                            <tr>
                                <th>가입 감사인</th>
                                <td id="mypCpaMemberReviewInfo_audit"></td>
                            </tr>
                            <tr>
                                <th>감사인 구성구분</th>
                                <td id="mypCpaMemberReviewInfo_auditOfcps"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>정보공개설정</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>사무소 주소</th>
                                <td id="mypCpaMemberReviewInfo_ofcAdresYn"></td>
                            </tr>
                            <tr>
                                <th>사무소 명</th>
                                <td id="mypCpaMemberReviewInfo_ofcNameYn"></td>
                            </tr>
                            <tr>
                                <th>전자메일</th>
                                <td id="mypCpaMemberReviewInfo_emailYn"></td>
                            </tr>
                            <tr>
                                <th>사무소 전화</th>
                                <td id="mypCpaMemberReviewInfo_ofcTelYn"></td>
                            </tr>
                            <tr>
                                <th>사진</th>
                                <td id="mypCpaMemberReviewInfo_photoYn"></td>
                            </tr>
                            <tr>
                                <th>사무소 펙스</th>
                                <td id="mypCpaMemberReviewInfo_ofcFaxYn"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>전문분야</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>회계감사</th>
                                <td id="mypCpaMemberReviewInfo_proFildCd100"></td>
                            </tr>
                            <tr>
                                <th>세무</th>
                                <td id="mypCpaMemberReviewInfo_proFildCd200"></td>
                            </tr>
                            <tr>
                                <th>컨설팅</th>
                                <td id="mypCpaMemberReviewInfo_proFildCd300"></td>
                            </tr>
                            <tr>
                                <th>법원관련</th>
                                <td id="mypCpaMemberReviewInfo_proFildCd400"></td>
                            </tr>
                            <tr>
                                <th>기타</th>
                                <td id="mypCpaMemberReviewInfo_proFildCd999"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2" id="mypCpaMember_reviewInfoProCareerAdd">

                </div>

                <div class="final-box v2" id="mypCpaMember_reviewInfoProCmitAdd">

                </div>

                <div class="final-box v2" id="mypCpaMember_reviewInfoProLicenseAdd">

                </div>

                <div class="final-box v2" id="mypCpaMember_reviewInfoProLtrryAdd">

                </div>

                <div class="final-box v2" id="mypCpaMember_reviewInfoProWnpzAdd">

                </div>


                <div class="final-box v2">
                    <h2>첨부파일 (첨부서류)</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>공인회계사 합격증</th>                                                                                                                                       </th>
                                <td id="mypCpaMemberReviewInfo_passCrtiFileId"></td>
                            </tr>
                            <tr>
                                <th>이력서</th>                                                                                                                                       </th>
                                <td id="mypCpaMemberReviewInfo_rsumFileId"></td>
                            </tr>
                            <tr>
                                <th>실무수습종료증명서</th>                                                                                                                                       </th>
                                <td id="mypCpaMemberReviewInfo_apntcEndFileId"></td>
                            </tr>
                            <tr>
                                <th>기타</th>                                                                                                                                       </th>
                                <td id="mypCpaMemberReviewInfo_atchFileId"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="final-box v2">
                    <h2>등록 회비 납부</h2>
                    <div class="final-box-inner">
                        <table>
                            <colgroup>
                                <col style="width: 206px" />
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th id="mypCpaMemberReviewInfo_etc1"></th>                                                                                                                                       </th>
                                <td id="mypCpaMemberReviewInfo_etc2"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="buttons two" style="margin-top: 287px">
                <div class="button line mypCpaMember_mypReviewBtn"><a href="${pageContext.request.contextPath}/kicpa/myp/myPage.do?Pin=${mypCpaMemberRegPin}" >마이페이지 이동</a></div>
                <div class="button line mypCpaMember_preReviewBtn"><a href="javascript:void(0);" onclick="mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_aidDuesInfo');">이전으로</a></div>
                <div class="button full mypCpaMember_nextReviewBtn"><a href="javascript:void(0);" id="mypCpaMember_reviewInfoSaveBtn">제출</a></div>
            </div>
        </div>


        <button type="button" class="close" id="mypCpaMember_closeBtn">close</button>

        <input type="hidden" name="pin" id="mypCpaMemberReg_pin" value="${mypCpaMemberRegPin}"/>
        <input type="hidden" name="cpaSn" id="mypCpaMemberReg_cpaSn" value="${mypCpaMemberRegCpaSn}"/>
        <input type="hidden" id="mypCpaMemberReg_saveMode" value="${mypCpaMemberRegSaveMode.saveMode}"/>
        <input type="hidden" id="mypCpaMemberReg_movePage" value="${mypCpaMemberRegSaveMode.movePage}"/>
        <input type="hidden" id="mypCpaMemberReg_regFlag" value="${mypCpaMemberRegSaveMode.regFlag}"/>
    </div>

    <!--가입 감사인 레이어팝-->
    <div class="kicpa-modal" id="mypCpaMemberPop_auditPop">
        <div class="modal-inner">
            <div class="modal-title">감사인 검색</div>
            <div class="modal-form">
                <div class="modal-form-inner">
                    <span class="modal-input" style="width: 450px;">
                        <input type="text" id="mypCpaMemberPop_auditPopSearchText" placeholder="감사인기관명, 감사인코드를  입력하세요." onkeypress="javascript:if(event.keyCode==13) { event.preventDefault(); $('#mypCpaMemberPop_auditPopSearchBtn').trigger('click')}">
                    </span>
                </div>
                <button type="button" id="mypCpaMemberPop_auditPopSearchBtn">검색</button>
            </div>
            <div class="modal-result tableFixHead" style="height: 47%; overflow:auto">
                <table cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col style="width: 60%;" />
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>감사인기관명</th>
                        <th>감사인 코드</th>
                    </tr>
                    </thead>
                    <tbody style="text-align: center;" id="mypCpaMemberPop_auditPopList">

                    </tbody>
                </table>
            </div>
            <div class="modal-buttons">
                <button type="button" class="small-round-button type4" id="mypCpaMemberPop_auditPopSaveBtn">선택</button>
                <button type="button" class="small-round-button type2" id="mypCpaMemberPop_auditPopCloseBtn">취소</button>
            </div>
            <input type="hidden" id="mypCpaMemberPop_auditPopSetAudNm">
            <input type="hidden" id="mypCpaMemberPop_auditPopSetAudId">
        </div>
    </div>
</body>
</html>
