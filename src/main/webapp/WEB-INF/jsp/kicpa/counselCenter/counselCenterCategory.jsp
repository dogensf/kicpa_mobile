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
    <h3>회계·세무상담센터</h3>
</section>

<section class="content">
    <ul class="list-wrap">
        <li>
 
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/counselCenter/counselBoardList.do'">
            <span>회원전문세무상담</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/counselCenter/kifrsBoardList.do'">
            <span>회계기준 회원상담(K-IFRS상담)</span>
          </button>
         <!--  <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/sntBook/kifrsBookList.do'">
            <span>K-IFRS 실무사례와 해설 시리즈 구매</span>
          </button> -->
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/counselCenter/nonExtBoardList.do'">
            <span>회계기준 회원상담(비외감대상)</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/counselCenter/smpBoardList.do'">
            <span>회계기준 회원상담(SMP 감사품질)</span>
          </button>
          <button class="m-link" type="button" onclick="javascript:location.href='/kicpa/counselCenter/suggestBoardList.do'">
            <span>건의사항</span>
          </button>          
        </li>
    </ul>
</section>