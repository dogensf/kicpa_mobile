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
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<c:set var="ImgUrl" value="/images/"/>

    <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
    <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
	<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
	<script src="/js/kicpa/myp/myPage.js?var=1"></script>
<script>
	$(document).ready(function(){
		myPage.myPageInit();
	});
</script>
<body>
<div class="wrap">
	<div class="container">
		<!-- 헤더 -->
		<section class="head-main">
			<h1>마이페이지</h1>
			<%
				LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
				if(loginVO == null){
			%>
			<button class="btn-login" onclick="location.href='<c:url value='/uat/uia/LoginUsr.do'/>';" type="button">
				로그인
			</button>
			<%
			}else{
			%>
			<button class="btn-login" onclick="location.href='<c:url value='/uat/uia/actionLogout.do'/>';" type="button">
				로그아웃
			</button>
			<%-- <c:set var="loginName" value="<%= loginVO.getName()%>"/>
            <ul>
              <li><a href="#LINK" onclick="alert('개인정보 확인 등의 링크 제공'); return false;">
            <c:out value="${loginName}"/> 님</a></li>
            <li><a href="<c:url value='/uat/uia/actionLogout.do'/>">
            <img src="<c:url value='/images/leftmenu/logout.jpg' />" alt="로그아웃" /></a></li>
            <li>최근접속:2011-10-12 13:24</li>
            </ul> --%>
			<%
				}
			%>
			<button class="btn-menu" type="button">카테고리</button>
		</section>

		<section class="content">
			<!-- 프로필영역 -->
			<div class="profile-box">
				<button class="photo-box" type="button">
					<c:if test="${memPict !='' && memPict != null}">
						<img id="cpaMyPageImg" src='${memPict}'/>
					</c:if>
					<c:if test="${memPict =='' || memPict == null}">
						<img src="" alt="" />
					</c:if>
				</button>

				<div class="user-info">
					<b>${cpaPassRealInfo[0].koreanNm}</b>
					<%--<span>공인회계사</span>--%>
				</div>

				<button class="btn-more" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/myPageInfo.do?pin=${myPagePin}'">자세히보기</button>
			</div>

			<!-- 탭 -->
			<div class="tab-main">
				<a class="tab-link active myPageActiveMove" id="myPage_cpaInfoTabActive" href="javascript:void(0);" onclick="myPage.myPage_tabMove('myPage_cpaInfoTab')">
					<span>공인회계사</span>
				</a>
				<%--<a class="tab-link" href="#tabMain2">
					<span>수습회계사</span>
				</a>--%>
				<a class="tab-link myPageActiveMove" id="myPage_taxAcutInfoTabActive" href="javascript:void(0);" onclick="myPage.myPage_tabMove('myPage_taxAcutInfoTab')">
					<span>세무사 세무대리</span>
				</a>
			</div>

			<!-- 탭1 -->
			<div id="myPage_cpaInfoTab" class="tab-main-content show myPageTabMove">
				<div class="mypage-wrap">

					<div class="cont">
						<h3>기본정보</h3>

						<ul class="view-list">
							<li>
								<div class="view-box" style="text-align: left;">
									<span class="label">등록번호</span>
									<p>${cpaMemberRegReal[0].cpaId}</p>
								</div>
							</li>
							<li>
								<div class="view-box">
									<span class="label">최초등록일</span>
									<p>${cpaMemberRegReal[0].registDe}</p>
								</div>
							</li>
							<li>
								<div class="view-box">
									<span class="label">등록갱신일</span>
									<p>${cpaMemberRegReal[0].lastRegistDe}</p>
								</div>
							</li>
							<li>
								<div class="view-box">
									<span class="label">갱신예정일</span>
									<p>${cpaMemberRegReal[0].updtRegistDe}</p>
								</div>
							</li>
							<li>
								<div class="view-box">
									<span class="label">부조회원 구분</span>
									<p>${cpaMemberRegReal[0].aidMberFlagNm}</p>
								</div>
							</li>
						</ul>
					</div>

					<div class="cont">
						<h3>회원정보</h3>

						<ul class="view-list">
							<li>
								<div class="view-box">
									<span class="label">회원 구분</span>
									<p>${cpaMemberRegReal[0].mberFlagNm}</p>
								</div>
							</li>
							<li>
								<div class="view-box">
									<span class="label">소속</span>
									<p>${cpaMemberRegReal[0].auditNm}</p>
								</div>
							</li>
						</ul>
					</div>

					<!-- 버튼 -->
					<div class="btn-area">
						<button class="btn-round" type="button" id="myPage_mypCpaTrnngSmInfoMoveBtn" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaTrnngSmInfo.do?pin=${myPagePin}'">연수이수현황</button>
					</div>

					<!-- 마이페이지 메뉴 리스트 -->
					<ul class="my-menu-list">
						<li>
							<a class="new" href="#">문의접수</a>
						</li>
						<li>
							<a class="new" href="#">FAQ</a>
						</li>
						<li>
							<a href="#">알림</a>
						</li>
						<li>
							<a href="#">설정</a>
						</li>
					</ul>

				</div>
			</div><!-- //탭1 -->

			<!-- 탭2 -->
			<div id="myPage_taxAcutInfoTab" class="tab-main-content myPageTabMove">
				<div class="mypage-wrap">

					<c:if test="${cpaTaxAcutInfoList.size() > 0 && cpaTaxAcutInfoList ne null}">
						<div class="cont">
							<h3>등록정보</h3>

							<ul class="view-list">
								<li>
									<div class="view-box">
										<span class="label">현재구분</span>
										<p>${cpaTaxAcutInfoList[0].opbizClNm}</p>
									</div>
								</li>
								<li>
									<div class="view-box">
										<span class="label">등록번호</span>
										<p>${cpaTaxAcutInfoList[0].lndctnId}</p>
									</div>
								</li>
								<li>
									<div class="view-box">
										<span class="label">관리번호</span>
										<p>${cpaTaxAcutInfoList[0].lndctnVrifyNoCl}</p>
									</div>
								</li>
								<li>
									<div class="view-box">
										<span class="label">등록일</span>
										<p>${cpaTaxAcutInfoList[0].registDe}</p>
									</div>
								</li>
								<li>
									<div class="view-box">
										<span class="label">등록갱신일</span>
										<p>${cpaTaxAcutInfoList[0].updtDe}</p>
									</div>
								</li>
								<li>
									<div class="view-box">
										<span class="label">갱신예정일</span>
										<p>${cpaTaxAcutInfoList[0].lastUpdtDe}</p>
									</div>
								</li>
							</ul>
						</div>

						<div class="cont">
							<h3>자격정보</h3>

							<ul class="view-list">
								<li>
									<div class="view-box">
										<span class="label">자격번호</span>
										<p>${cpaTaxAcutInfoList[0].crqfcNo}</p>
									</div>
								</li>
								<li>
									<div class="view-box">
										<span class="label">자격증발부일</span>
										<p>${cpaTaxAcutInfoList[0].crqfcIsueDe}</p>
									</div>
								</li>
							</ul>
						</div>
					</c:if>

					<c:if test="${cpaTaxAcutInfoList.size() < 1 || cpaTaxAcutInfoList eq null}">
						<div class="application-status">
							<div class="guide-ment">
								<p>등록정보가 없습니다.</p>

								<em>세무사 개업신청을 원하시면<br />
									통합플랫폼 PC 화면에서 세무사 세무대리<br />
									개업신청서를 작성하세요.</em>
							</div>
						</div>
					</c:if>

					<!-- 마이페이지 메뉴 리스트 -->
					<ul class="my-menu-list">
						<li>
							<a class="new" href="#">문의접수</a>
						</li>
						<li>
							<a class="new" href="#">FAQ</a>
						</li>
						<li>
							<a href="#">알림</a>
						</li>
						<li>
							<a href="#">설정</a>
						</li>
					</ul>

				</div>
			</div><!-- //탭2 -->

			<input type="hidden" id="myPage_myPagePin" value="${myPagePin}">
		</section>

	</div>
</div>
</body>
</html>