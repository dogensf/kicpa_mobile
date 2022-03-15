<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/introduction/introduction.js"></script>
<script>

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>


<section class="head-sub">
    <button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>공인회계사 소개</h3>
</section>

<section class="content">
    <div class="tab-main">
        <a class="tab-link active" href="javascript:void(0);">
            <span>비전</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/greetings.do">
            <span>인사말</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/boardList.do">
            <span>회무보고</span>
        </a>
    </div>

    <div id="tabMain1" class="tab-main-content show">
        <div class="info-page">
            <div class="visions">
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
            </div>

            <div class="cont">
                <h3>CI 소개</h3>
                <div class="ci-zone">
                    <img src="/images/kicpa/img-ci.png" alt="ci" />

                    <div class="ci-color">
                        <span class="c-281">PANTONE 281 C</span>
                        <span class="c-279">PANTONE 279 C</span>
                        <span class="c-gray">PANTONE Cool Gray 9</span>
                    </div>
                </div>

                <p>
                    KICPA의 CI는 “KICPA”라는 간결한 워드마크에 확대경 이미지를 결합하여 국내 최고의 회계ㆍ세무전문가로서 투명한 경제사회를 견인하겠다는 의지가 담겨 있습니다.
                </p>

                <div class="btn-area">
                    <button class="btn-round" type="button">원본 이미지 다운로드</button>
                    <button class="btn-round" type="button">CI 사용규정 다운로드</button>
                </div>
            </div>

        </div>
    </div><!-- //tabMain1 -->
</section>