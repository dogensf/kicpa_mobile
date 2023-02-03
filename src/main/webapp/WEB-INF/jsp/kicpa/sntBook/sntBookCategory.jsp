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
    <h3>도서구매 · 집합연수 신청</h3>
</section>

<section class="content">
    <ul class="list-wrap">
        <li>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookList.do'">
            <span>출판도서구매</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookFormatList.do'">
            <span>감사조서 서식 구매등</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/kifrsBookList.do'">
            <span>K-IFRS 실무사례와 해설 시리즈 구매</span>
          </button>
          <%--<button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/taxBookList.do'">
            <span>세무단행본구매</span>
          </button>--%>
          <%--<button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/specialLectureList.do?gbn=LISTPAGE2'">
            <span>실무특강리스트(수강신청)</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/specialLectureList.do?gbn=LISTPAGE3'">
            <span>실무특강리스트(신청내용)</span>
          </button>--%>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/offlineEduList.do?accEduUse=1'">
            <span>집합연수 리스트</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/offlineEduList.do?accEduUse=2'">
            <span>신청여부 리스트</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/cartList.do'">
            <span>장바구니</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/bookBuyHistoryList.do'">
            <span>구매내역</span>
          </button>
        </li>
    </ul>
</section>