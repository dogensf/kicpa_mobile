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
        <a class="tab-link" href="/kicpa/introduction/vision.do">
            <span>비전</span>
        </a>
        <a class="tab-link active" href="javascript:void(0);">
            <span>인사말</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/boardList.do">
            <span>회무보고</span>
        </a>
    </div>

    <div id="tabMain1" class="tab-main-content show">
        <div class="info-page">
            <div class="info-ment">
                &quot;<span>회계</span>가치, <span>우리</span>같이!&quot;
            </div>

            <p>
                한국공인회계사회는 1954년 창립된 국내 최고의 회계·세무전문가 단체로서 국민경제 발전과 함께 눈부신 성장을 이루었으며, 현재 2만3천여 회원들이 회계·감사·조세·경영자문 등 다양한 분야에서 전문가적 역량을 펼칠 수 있도록 지원하고 있습니다.
            </p>

            <p>
                우리나라가 선진국으로 도약하기 위해서는 경제사회 전반의 회계투명성을 향상시키는 것이 반드시 필요합니다.
            </p>

            <p>
                이제 회계투명성은 사회 모든 분야에서 필수적으로 갖추어야 할 시대적 요구사항입니다.
            </p>

            <p>
                한국공인회계사회는 이 역사적 소임을 달성하기 위해 최고 수준의 전문가적 역량과 윤리성을 갖추어 기업을 비롯한 민간부문은 물론 공공부문의 투명성을 제고하는 데 기여하고, 이를 통해 우리 경제사회가 지속가능한 발전을 이루어 나갈 수 있도록 견인차 역할을 수행하고 있습니다.
            </p>

            <p>
                또한, FTA 확대 및 자본·금융시장의 세계화 등 급변하는 글로벌 경제 환경에 부응하여 공인회계사와 관련된 전문가기준을 국제적으로 정합시키는 가운데 직무품질을 세계 최고 수준으로 향상시키는 등 국내 회계산업의 국제경쟁력을 강화하여 국가경쟁력을 높이는 데 기여하고 있습니다.
            </p>

            <p>
                우리 2만3천여 공인회계사는 우리나라가 경제 강국으로 발전을 이룩하고 선진국으로 도약하는 데최선을 다해 노력하겠습니다.
            </p>

            <p>
                감사합니다.
            </p>

            <div class="sign-box">
                <b>한국공인회계사회 회장</b>
                <img src="/images/kicpa/img-sign.png" alt="김영식" />
            </div>
        </div>
    </div><!-- //tabMain1 -->
</section>