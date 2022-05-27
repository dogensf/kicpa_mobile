<%--
  Class Name : myPage.jsp
  Description : 마이페이지
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
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ImgUrl" value="/images/"/>

    <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
    <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
	<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<script src="/js/kicpa/myp/mypCpaTrnngSmInfo.js"></script>
<script>
	$(document).ready(function(){
		mypCpaTrnngSmInfo.mypCpaTrnngSmInfoInit();
	});
	function fncLocation(){
		mypCpaTrnngSmInfo.mypCpaTrnngSmInfo_backMove();
	}

	function goCyber(){
		<c:choose>
		<c:when test="${empty userId || userId ==''|| userId =='test' || userId == null}">
		location.href="/uat/uia/authLogin.do";
		</c:when>
		<c:otherwise>
		location.href="javascript:window.bridge.newWebView('kicpa1','http://mkip.kicpa.or.kr/kicpa/main/getCyberToken.do?userId=${userId}','')";
		</c:otherwise>
		</c:choose>
	}
</script>
<body>
<div class="wrap">
	<div class="container">
		<!-- 헤더 -->
		<section class="head-sub" style="border: 0px;">
			<button class="btn-back" type="button" onclick="javascript:fncLocation();">
				<span>이전</span>
			</button>
			<h3>연수 이수현황</h3>
		</section>

		<section class="content">

			<!-- 탭1 -->
			<div id="tabMain1" class="tab-main-content show">
				<div class="mypage-wrap">

					<div class="inp-box">
						<select class="select" name="trnYear" id="mypCpaTrnngSmInfo_cpaMemTrnngSmYear">
							<c:if test="${cpaMemberRegTrnngSmInfoSize > 0}">
								<c:forEach var="cpaMemberRegTrnngSmYearList" items="${cpaMemberRegTrnngSmYearList}" varStatus="status">
									<option value=${cpaMemberRegTrnngSmYearList.trnYear}>${cpaMemberRegTrnngSmYearList.trnYear}</option>
								</c:forEach>
							</c:if>
							<c:if test="${cpaMemberRegTrnngSmInfoSize < 1}">
								<option value="">-</option>
							</c:if>
						</select>
					</div>

					<table class="table-col gray">
						<colgroup>
							<col width="" />
							<col width="" />
							<col width="" />
							<col width="" />
							<col width="" />
						</colgroup>
						<thead>
						<tr>
							<th>구분</th>
							<th>필수</th>
							<th>의무시간<br />(A)</th>
							<th>의무시간<br />(B)</th>
							<th>미 이수시간<br />(A-B)</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>필수</td>
							<td>회계</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp01">${cpaMemberRegTrnngSmInfo[0].temp01}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp02">${cpaMemberRegTrnngSmInfo[0].temp02}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp03">${cpaMemberRegTrnngSmInfo[0].temp03}</td>
						</tr>
						<tr>
							<td>필수</td>
							<td>윤리</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp04">${cpaMemberRegTrnngSmInfo[0].temp04}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp05">${cpaMemberRegTrnngSmInfo[0].temp05}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp06">${cpaMemberRegTrnngSmInfo[0].temp06}</td>
						</tr>
						<tr>
							<td>선택</td>
							<td>-</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp07">${cpaMemberRegTrnngSmInfo[0].temp07}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp08">${cpaMemberRegTrnngSmInfo[0].temp08}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp09">${cpaMemberRegTrnngSmInfo[0].temp09}</td>
						</tr>
						<tr class="t-red">
							<td>합계</td>
							<td>-</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp10">${cpaMemberRegTrnngSmInfo[0].temp10}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp11">${cpaMemberRegTrnngSmInfo[0].temp11}</td>
							<td id="mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp12">${cpaMemberRegTrnngSmInfo[0].temp12}</td>
						</tr>
						</tbody>
					</table>

					<div class="gray-box">
						<ol class="blt">
							<li>
								필수과목을 의무시간보다 초과하여 이수한 부분은 당해 연도 선택과목 이수시간에 합산됩니다.
							</li>
							<li>
								총 의무시간을 초과하여 이수한 시간은 최대 40시간까지 다음  연도 선택과목 이수시간으로 이월하여 인정합니다.
							</li>
							<li>
								의무시간 미 이수시 당해 연도 미 이수시간의 1,2배가 다음 연도 의무시간에 합산되어 적용됩니다.
							</li>
						</ol>
						<div class="btn-area">
							<button class="btn-round" type="button" onclick="javascript:goCyber()"><span>사이버 회계연수원 바로가기 (GO)</span></button>
						</div>
					</div>

					<input type="hidden" id="mypCpaTrnngSmInfo_pin" value="${mypCpaTrnngSmInfoPin}">
				</div>
			</div><!-- //탭1 -->
		</section>

	</div>
</div>
</body>
</html>