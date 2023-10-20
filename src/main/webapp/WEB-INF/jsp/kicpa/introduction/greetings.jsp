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
    <h3>공인회계사회 소개</h3>
</section>

<section class="content">
    <div class="tab-main">
        <a class="tab-link active" href="javascript:void(0);">
            <span>인사말</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/missionVision.do">
            <span>미션/비전</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/vision.do">
            <span>CI소개</span>
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
                한국공인회계사회는 1954년 창립 이래 국민경제의 성장과 발전에 힘썼으며, ‘공인회계사 위상 제고’라는 회원단체 본연의 역할을 충실히 수행해 왔습니다. 또한 2017년 외부감사법 전부 개정, 2020년 “회계의 날” 법정기념일 지정 등 괄목할 성과들을 거두며, 회계개혁 안착 및 업계 상생발전을 위해 노력해 왔습니다.
            </p>

            <p>
                이렇게 양적·질적 성장을 거듭해온 우리 앞에, 또 다른 변화의 물결이 다가오고 있습니다. 인공지능, 빅데이터 등 IT 기술이 융합된 새로운 감사환경이 빠르게 조성되고 있으며, 가상자산·XBRL·ESG 등 New Market에 대한 논의가 본격화되고 있습니다. 기업경영 패러다임이 근본부터 변화함에 따라, 회계 산업의 미래를 준비하는 우리에게도 결정적인 영향을 미치고 있는 것입니다. 미증유의 대변혁 속에서 무엇보다 중요한 가치는, “회계투명성 제고”를 통해 신뢰를 기반으로 한 공정한 경제사회 질서를 만드는 것입니다.
            </p>

            <p>
                이에 우리 회는 “<span style="color: #0348ad;">국가경쟁력을 선도하는 회계투명성</span>”을 기치로 <span style="color: #0348ad;">VISION2030</span>을 <span style="color: #0348ad;">선포</span>하였으며, 대한민국을 회계선진국으로 만들어 나가는 데 모든 역량을 투입하고자 합니다. 또한 디지털 감사 등 IT기반 직무역량 지원을 확충하는 한편, New Market을 회계업계가 선점할 수 있도록 투자와 준비에 더욱 박차를 가하겠습니다.
            </p>

            <p>
                2만5천 회원 여러분께서는 철처한 직업 윤리의식을 바탕으로 사회로부터 신뢰를 받고, 대한민국이 경제선진국으로 나아 가는데 앞장서 주시기 바랍니다.
            </p>

            <p>
                감사합니다.
            </p>

            <div class="sign-box" style="justify-content: center;">
                <b>한국공인회계사회 회장</b>
                <img src="/images/kicpa/img-sign.png" alt="김영식" style="width: 30%;"/>
            </div>
        </div>
    </div><!-- //tabMain1 -->
</section>