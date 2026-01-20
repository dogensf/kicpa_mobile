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
                <span style="color: #537db9;">존경하는 회원 여러분,</span>
            </div>

            <p>
                우리 회는 「공인회계사법」제41조에 따라 ‘공인회계사의 품위향상과 직무의 개선·발전을 도모하고, 회원의 지도 및 감독에 관한 사무’를 수행하기 위하여 1954년 설립되었습니다. 올해는 설립 70주년을 맞이하는 해로서 그 의미가 남다른 것 같습니다.
            </p>

            <p>
                저는 20대 국회의원으로 의정활동을 하던 2017년 「외부감사법」 전부 개정, 2020년 “회계의 날” 법정기념일 지정 등 괄목할 성과들을 거두었으며, 이제는 한국공인회계사회 회장으로서 회계개혁의 완전한 정착과 업계 상생발전을 위해 경주하고자 합니다.
            </p>

            <p>
                단언컨대,  대한민국의 회계투명성 순위가 10대 경제강국에 걸맞는 수준으로 향상될 때까지 「신 외부감사법」 은 유지되어야 합니다. 외부감사비용은 단순한 비용이 아니라 기업의 가치를 증가시키는 투자입니다. 앞으로 경제 활성화를 위해 정부가 추진하는 과감한 규제개혁이 이루어지기 위해서는 기업의 회계투명성 확보가 전제되어야 한다는 점을 국민 모두가 공감할 수 있도록 다양한 이해관계자들과 지속적으로 대화해 나가겠습니다.
            </p>

            <p>
                이런 과정을 통해 우리 공인회계사는 자본시장의 파수꾼으로서 사회적으로 더 높은 위상을 갖게 될 것입니다. 동시에 우리는 그 위상에 걸맞도록 국가·사회가 부여한 사회적 책임을 완수하고 공적 기여에도 많은 관심과 노력을 기울여야 하겠습니다.
            </p>

            <p>
                저는「신 외부감사법」의 입법에 핵심적인 역할을 했던 사람으로서 이 제도를 유지하고 발전시켜 나가야할 막중한 책임감을 갖고 있습니다. 다시 한 번 “<span style="color: rgb(255, 51, 51);">회계</span><span style="color: #0348ad;">가 바로 서야 </span><span style="color: rgb(255, 51, 51);">경제</span><span style="color: #0348ad;">가 바로 선다</span>”는 신념으로 대한민국의 국격을 높이고자 최선을 다하겠습니다.
            </p>

            <p>
                회원 여러분의 많은 성원과 격려를 부탁드립니다.
            </p>

            <p>
                감사합니다.
            </p>

            <div class="sign-box" style="justify-content: center;">
                <b>한국공인회계사회 회장</b>
                <img src="/images/kicpa/img-sign1.png" alt="최운열" style="width: 30%;"/>
            </div>
        </div>
    </div><!-- //tabMain1 -->
</section>