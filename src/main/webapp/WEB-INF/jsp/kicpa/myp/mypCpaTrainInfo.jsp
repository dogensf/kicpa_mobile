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
<script src="/js/kicpa/myp/mypCpaTrainInfo.js"></script>
<script>
	$(document).ready(function(){
		mypCpaTrainInfo.mypCpaTrainInfoInit();
	});
</script>
<body>
<div class="wrap">
	<div class="container">

		<!-- 헤더 -->
		<section class="head-sub">
			<button class="btn-back" type="button" onclick="mypCpaTrainInfo.mypCpaTrainInfo_backMove();">
				<span>이전</span>
			</button>
			<h3>수습회계사 정보</h3>
		</section>

		<section class="content">

			<!-- 탭 -->
			<div class="tab-main">
				<a class="tab-link mypCpaTrainInfoActiveMove" id="mypCpaTrainInfo_apntcBrfTabActive" href="javascript:void(0);" onclick="mypCpaTrainInfo.mypCpaTrainInfo_tabMove('mypCpaTrainInfo_apntcBrfTab')">
					<span>상황보고서</span>
				</a>
				<a class="tab-link mypCpaTrainInfoActiveMove" id="mypCpaTrainInfo_trnngResultTabActive" href="javascript:void(0);" onclick="mypCpaTrainInfo.mypCpaTrainInfo_tabMove('mypCpaTrainInfo_trnngResultTab')">
					<span>연수결과</span>
				</a>
			</div>

			<!-- 상황보고서 -->
			<div id="mypCpaTrainInfo_apntcBrfTab" class="tab-main-content mypCpaTrainInfoTabMove">
				<div class="mypage-wrap">

					<div>
						<c:if test="${cpaApntcBrfRealInfoSize < 1}">
							<div class="application-status">
								<div class="guide-ment">
									<p>등록정보가 없습니다.</p>
								</div>
							</div>
						</c:if>

						<c:if test="${cpaApntcBrfRealInfoSize > 0}">
							<c:forEach var="cpaApntcBrfRealInfo" items="${cpaApntcBrfRealInfo}" varStatus="status">
								<h3>${cpaApntcBrfRealInfo.brfYear}</h3>
								<div class="calendar">
									<div class="month">
										<span>1월</span>
										<span>2월</span>
										<span>3월</span>
										<span>4월</span>
										<span>5월</span>
										<span>6월</span>
									</div>
									<div class="day">
										<span class="${cpaApntcBrfRealInfo.brfMt1}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt2}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt3}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt4}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt5}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt6}"></span>
									</div>
									<div class="month">
										<span>7월</span>
										<span>8월</span>
										<span>9월</span>
										<span>10월</span>
										<span>11월</span>
										<span>10월</span>
									</div>
									<div class="day">
										<span class="${cpaApntcBrfRealInfo.brfMt7}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt8}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt9}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt10}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt11}"></span>
										<span class="${cpaApntcBrfRealInfo.brfMt12}"></span>
									</div>
								</div>
							</c:forEach>
						</c:if>
					</div>
				</div><!-- //상황보고서 -->
			</div>

			<!-- 연수결과 -->
			<div id="mypCpaTrainInfo_trnngResultTab" class="tab-main-content mypCpaTrainInfoTabMove">
				<div class="mypage-wrap">

					<c:if test="${cpaTrnngResultRealInfoSize < 1}">
						<div class="application-status">
							<div class="guide-ment">
								<p>등록정보가 없습니다.</p>
							</div>
						</div>
					</c:if>

					<c:if test="${cpaTrnngResultRealInfoSize > 0}">
						<c:forEach var="cpaTrnngResultRealInfo" items="${cpaTrnngResultRealInfo}" varStatus="status">
							<div class="cont">
								<h3>${cpaTrnngResultRealInfo.trnOdr}실무</h3>

								<ul class="view-list">
									<li>
										<div class="view-box">
											<span class="label">시작일</span>
											<p>${cpaTrnngResultRealInfo.trnBgnDe}</p>
										</div>
										<div class="view-box">
											<span class="label">종료일</span>
											<p>${cpaTrnngResultRealInfo.trnEndDe}</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">연수시간 (분)</span>
											<p>${cpaTrnngResultRealInfo.trnTm} 분</p>
										</div>
										<div class="view-box">
											<span class="label">출석시간 (분)</span>
											<p>${cpaTrnngResultRealInfo.atendTm} 분</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">실무역량 (점수)</span>
											<p>${cpaTrnngResultRealInfo.prcafsAbilityScore} 점</p>
										</div>
										<div class="view-box">
											<span class="label">직업윤리 (점수)</span>
											<p>${cpaTrnngResultRealInfo.vocEthicsScore} 점</p>
										</div>
									</li>
								</ul>
							</div>
						</c:forEach>
					</c:if>
				</div>
			</div><!-- //연수결과 -->
		</section>

		<input type="hidden" id="mypCpaTrainInfo_pin" value="${mypCpaTrainInfoPin}"/>
		<input type="hidden" id="mypCpaTrainInfo_moveFlag" value="${mypCpaTrainInfoMoveFlag}"/>
	</div>
</div>
</body>
</html>