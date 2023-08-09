<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/introduction/introduction.js"></script>
<script>

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

function download(fileName){
	$("#introductionForm input[name='fileName']").val(fileName);
	$("#introductionForm").attr("action","/kicpa/introduction/ciFileDownload.do").submit();
}
</script>

<style>
    .ico-file {
        border: 1px solid #0070C0;
        background: url("data:image/svg+xml;charset=utf8,%3Csvg width='16' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m8.178 11.264-5.42-5.422a2.666 2.666 0 1 1 3.77-3.77l5.893 5.892a1.667 1.667 0 0 1-2.357 2.357l-4.95-4.95a.669.669 0 0 1 0-.943c.26-.26.684-.26.943 0l4.479 4.478.707-.707-4.479-4.478a1.667 1.667 0 0 0-2.357 2.357l4.95 4.95a2.666 2.666 0 1 0 3.771-3.771L7.236 1.364a3.665 3.665 0 0 0-5.186 0 3.665 3.665 0 0 0 0 5.185l5.421 5.422.707-.707Z' fill='%230070C0'/%3E%3C/svg%3E") no-repeat 50%;
        background-size: 1.5rem;
        background-position: 5px 5px;
        margin-right: 10px;
        padding-left:15px;
        width: 40px;
        height: 21px;
        font-size: 12px;
    }
</style>

<form id="introductionForm" name="introduction">
	<input type="hidden" name="fileName">
</form>
<section class="head-sub">
    <button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>공인회계사회 소개</h3>
</section>

<section class="content">
    <div class="tab-main">
        <a class="tab-link" href="/kicpa/introduction/greetings.do">
            <span>인사말</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/missionVision.do">
            <span>미션/비전</span>
        </a>
        <a class="tab-link active" href="javascript:void(0);">
            <span>CI소개</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/boardList.do">
            <span>회무보고</span>
        </a>
    </div>

    <div id="tabMain1" class="tab-main-content show">
        <div class="info-page">
            <%--<div class="visions">
                KICPA의 Vision은 <b>"공인회계사의 사회적 위상제고"</b>입니다.
            </div>

            <div class="cont">
                <h3>KICPA의 Vision 달성을 위하여</h3>
                <ul class="vision-list">
                    <li>
                        최고 수준의 전문가적 역량과 윤리성을 갖추고 삶의 질을 향상시켜 사회로부터 신뢰와 존경을 받는 전문가를 지향합니다.
                    </li>
                    <li>
                        우리 사회의 경제적 의사결정이 합리적으로 이루어질 수 있도록 투명한 회계 인프라를 구축하는데 기여하는 전문가를 지향합니다.
                    </li>
                    <li>
                        국제사회에 책임을 다하는 일원으로서 Global Standards를 준수하고 우리나라의 국제적 신인도 향상에 기여하는 전문가를 지향합니다.
                    </li>
                    <li>
                        KICPA는 이러한 Vision 달성을 바탕으로 공인회계사는 물론 국민 모두가 윤택한 삶을 누릴 수 있도록 23,000여 명의 공인회계사와 함께 모든 역량을 집중해 나아가겠습니다.
                    </li>
                </ul>
            </div>--%>

            <div class="cont">
                <h3 style="margin-top: 0;">CI 소개</h3>
                <div class="ci-zone">
                    <iframe width="100%" height="250" src="https://www.youtube.com/embed/F-TcLy3eW3M?rel=0&amp;autoplay=1&amp;feature=player_detailpage" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                </div>

                <h3 style="font-size: 1.5rem; margin-bottom: 5px;">국문 시그니처 (Signature)</h3>

                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 40%;">
                        <label style="font-weight: 700; line-height: 3.0rem; font-size: 1.2rem;">상하조합</label>
                        <div style="margin-bottom:5px; border:1px solid #cfcfcf;padding:10px; height: 82px; display: flex; align-items: center; justify-content: space-around;">
                            <img src="<c:url value='/images/kicpa/korTB_ci.png'/>" style="width: 70%; max-width: 120px;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn-round ico-file" onclick="download('korTB_ci.ai');" type="button">AI</button>
                            <button class="btn-round ico-file" onclick="download('korTB_ci.png');" type="button" style="padding-left: 15px; width: 52px; margin-right: 0;">PNG</button>
                        </div>
                    </div>

                    <div style="width: 50%;">
                        <label style="font-weight: 700; line-height: 3.0rem; font-size: 1.2rem;">좌우조합</label>
                        <div style="margin-bottom:5px; border:1px solid #cfcfcf;padding:10px; height: 82px; display: flex; align-items: center; justify-content: space-around;">
                            <img src="<c:url value='/images/kicpa/korLR_ci.png'/>" style="width: 100%; max-width: 300px;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn-round ico-file" onclick="download('korLR_ci.ai');" type="button">AI</button>
                            <button class="btn-round ico-file" onclick="download('korLR_ci.png');" type="button" style="padding-left: 15px; width: 52px; margin-right: 0;">PNG</button>
                        </div>
                    </div>
                </div>


                <h3 style="font-size: 1.5rem; margin: 30px 0 5px 0;">한문 시그니처 (Signature)</h3>

                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 40%;">
                        <label style="font-weight: 700; line-height: 3.0rem; font-size: 1.2rem;">상하조합</label>
                        <div style="margin-bottom:5px; border:1px solid #cfcfcf;padding:10px; height: 82px; display: flex; align-items: center; justify-content: space-around;">
                            <img src="<c:url value='/images/kicpa/chcTB_ci.png'/>" style="width: 70%; max-width: 120px;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn-round ico-file" onclick="download('chcTB_ci.ai');" type="button">AI</button>
                            <button class="btn-round ico-file" onclick="download('chcTB_ci.png');" type="button" style="padding-left: 15px; width: 52px; margin-right: 0;">PNG</button>
                        </div>
                    </div>

                    <div style="width: 50%;">
                        <label style="font-weight: 700; line-height: 3.0rem; font-size: 1.2rem;">좌우조합</label>
                        <div style="margin-bottom:5px; border:1px solid #cfcfcf;padding:10px; height: 82px; display: flex; align-items: center; justify-content: space-around;">
                            <img src="<c:url value='/images/kicpa/chcLR_ci.png'/>" style="width: 100%; max-width: 300px;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn-round ico-file" onclick="download('chcLR_ci.ai');" type="button">AI</button>
                            <button class="btn-round ico-file" onclick="download('chcLR_ci.png');" type="button" style="padding-left: 15px; width: 52px; margin-right: 0;">PNG</button>
                        </div>
                    </div>
                </div>



                <h3 style="font-size: 1.5rem; margin: 30px 0 5px 0;">영문 시그니처 (Signature)</h3>

                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 40%;">
                        <label style="font-weight: 700; line-height: 3.0rem; font-size: 1.2rem;">상하조합</label>
                        <div style="margin-bottom:5px; border:1px solid #cfcfcf;padding:10px; height: 82px; display: flex; align-items: center; justify-content: space-around;">
                            <img src="<c:url value='/images/kicpa/engTB_ci.png'/>" style="width: 70%; max-width: 120px;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn-round ico-file" onclick="download('engTB_ci.ai');" type="button">AI</button>
                            <button class="btn-round ico-file" onclick="download('engTB_ci.png');" type="button" style="padding-left: 15px; width: 52px; margin-right: 0;">PNG</button>
                        </div>
                    </div>

                    <div style="width: 50%;">
                        <label style="font-weight: 700; line-height: 3.0rem; font-size: 1.2rem;">좌우조합</label>
                        <div style="margin-bottom:5px; border:1px solid #cfcfcf;padding:10px; height: 82px; display: flex; align-items: center; justify-content: space-around;">
                            <img src="<c:url value='/images/kicpa/engLR_ci.png'/>" style="width: 100%; max-width: 300px;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn-round ico-file" onclick="download('engLR_ci.ai');" type="button">AI</button>
                            <button class="btn-round ico-file" onclick="download('engLR_ci.png');" type="button" style="padding-left: 15px; width: 52px; margin-right: 0;">PNG</button>
                        </div>
                    </div>
                </div>



                <h3 style="font-size: 1.5rem; margin: 50px 0 5px 0;">사용 금지 규정 (Incorrect Usage)</h3>
                <div style="margin-bottom:20px;">
                    <img src="<c:url value='/images/kicpa/ci_rule.png'/>" style="width: 100%;">
                </div>


                <h3 style="font-size: 1.5rem; margin-bottom: 5px;">CI 다운로드</h3>
                <p style="margin: 0 0 10px 0;">- 엠블럼, 지방공인회계사회 로고, 명함 등을 내려받으실 수 있습니다.</p>
                <div class="btn-area">
                    <button class="btn-round"  onclick="download('ci.zip');" type="button">원본 이미지 다운로드</button>
                </div>
            </div>

        </div>
    </div><!-- //tabMain1 -->
</section>