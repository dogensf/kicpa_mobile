<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script>
function fncLocation(){
	location.href="/kicpa/main/main.do";
}


</script>
<section class="head-sub">
    <button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>회계 · 감사 Alert</h3>
</section>

<section class="content">
    <ul class="list-wrap">
        <li>
          <h4>감시인증기준</h4>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/accIstBoardList.do'">
            <span>회계감사기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/inspectTaskBoardList.do'">
            <span>검토업무기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/authTaskBoardList.do'">
            <span>인증업무기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/relationTaskBoardList.do'">
            <span>관련업무 수행기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/accManagementBoardList.do'">
            <span>내부관리회계 제도검토기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/evaluationkBoardList.do'">
            <span>가치평가 수행기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/etcBoardList.do'">
            <span>금융투자업 업무수행지침</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/accIstWlBoardList.do'">
            <span>회계감사실무 지침</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/writeCaseBoardList.do'">
            <span>작성사례 등</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/organizationBoardList.do'">
            <span>타 기관 제정</span>
          </button>
        </li>
        <li>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/ethicsBoardList.do'">
            <b>윤리기준</b>
          </button>
        </li>
        <li>
          <h4>회계기준</h4>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('http://www.kasb.or.kr/fe/accstd/NR_comAccList.do?bbsCd=1070&');">
            <span>기업회계기준 전문</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('http://www.kasb.or.kr/fe/accstd/NR_list.do?divCd=01&sortCd=K-IFRS&');">
            <span>한국채택국제 회계기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('http://www.kasb.or.kr/fe/accstd/NR_list.do?sortCd=G-COMPANY&');">
            <span>일반기업회계기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('https://www.moef.go.kr/lw/denm/detailTbDenmView.do?menuNo=7030000&searchNttId1=MOSF_000000000012003&searchBbsId1=MOSFBBS_000000000120#');">
            <span>공익법인회계기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('http://www.kasb.or.kr/fe/bbs/NR_list.do?bbsCd=1105&');">
            <span>비영리조직 회계기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('http://www.kasb.or.kr/fe/accstd/NR_list.do;jsessionid=7104DACBC5CAE5EEC7CD3069444A15B3?sortCd=SPEACIAL&');">
            <span>특수분야회계기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/ifrsBoardList.do'">
            <span>IFRS 실무사례</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/accIstAlert/contributeBoardList.do'">
            <span>회계기준원 기고문</span>
          </button>
        </li>
        <li>
          <h4>eBOOK</h4>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('https://www.kicpa-ebook.com');">
            <span>회계편람 e-book</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:window.bridge.openWeb('https://www.school-audit.com');">
            <span>사립학교 감사실무 편람</span>
          </button>
        </li>
    </ul>
</section>