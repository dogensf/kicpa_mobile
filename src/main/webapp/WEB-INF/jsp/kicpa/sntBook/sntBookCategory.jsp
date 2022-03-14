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
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookList.do'">
            <span>회계감사기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>검토업무기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>인증업무기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>관련업무 수행기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>내부관리회계 제도검토기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>가치평가 수행기준</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>금융투자업 업무수행지침</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>회계감사실무 지침</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>작성사례 등</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>타 기관 제정</span>
          </button>
        </li>
        <li>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/kifrsBookList.do'">
            <b>윤리기준</b>
          </button>
        </li>
        <li>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/taxBookList.do'">
            <b>세무단행본구매</b>
          </button>
        </li>
        <li>
          <h4>실무특강리스트</h4>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/specialLectureList.do?gbn=LISTPAGE2'">
            <span>수강신청</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/specialLectureList.do?gbn=LISTPAGE3'">
            <span>신청내용</span>
          </button>
        </li>
        <li>
          <h4>집합연수</h4>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/offlineEduList.do?accEduUse=1'">
            <span>집한연수 리스트</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/offlineEduList.do?accEduUse=2'">
            <span>신청여부 리스트</span>
          </button>
        </li>
        <li>
          <h4>장바구니/구매</h4>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/cartList.do'">
            <span>장바구니</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookBuyHistoryList.do'">
            <span>구매내역</span>
          </button>
        </li>
    </ul>
</section>