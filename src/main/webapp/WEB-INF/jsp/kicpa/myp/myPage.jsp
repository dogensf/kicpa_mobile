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
	<script src="/js/kicpa/myp/myPage.js"></script>
<script>
	$(document).ready(function(){
		myPage.myPageInit();
	});
	
	function fncLocation(){
		$('#appExit').addClass("show");
	}

</script>
<body id="myPage_body">
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
			<button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
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

				<button class="btn-more" type="button" id="myPage_detailInfoBtn">자세히보기</button>
			</div>

			<!-- 탭 -->
			<div class="tab-main">
				<a class="tab-link myPageActiveMove" id="myPage_cpaInfoTabActive" href="javascript:void(0);" onclick="myPage.myPage_tabMove('myPage_cpaInfoTab')">
					<span>공인회계사</span>
				</a>
				<c:if test="${trainFlag ne 'H'}">
					<a class="tab-link myPageActiveMove" id="myPage_cpaTrainInfoTabActive" href="javascript:void(0);" onclick="myPage.myPage_tabMove('myPage_cpaTrainInfoTab')">
						<span>수습회계사</span>
					</a>
				</c:if>
				<a class="tab-link myPageActiveMove" id="myPage_taxAcutInfoTabActive" href="javascript:void(0);" onclick="myPage.myPage_tabMove('myPage_taxAcutInfoTab')">
					<span>세무사 (세무대리)</span>
				</a>
			</div>

			<!-- 공인회계사 -->
			<div id="myPage_cpaInfoTab" class="tab-main-content myPageTabMove">
				<div class="mypage-wrap">

					<!-- 정보없음 -->
					<c:if test="${cpaMemFlag eq 'N'}">

						<!-- 기본실무 종료 안함 -->
						<c:if test="${leftDays > 15 || leftDays eq '' || leftDays eq null}">
							<div class="application-status">
								<div class="guide-ment">
									<p>수습기본실무를 먼저 수료하세요.</p>
								</div>
							</div>
						</c:if>

						<!-- 기본실무 종료예정일 15일 이전 -->
						<c:if test="${leftDays <= 15}">
							<div class="application-status">
								<div class="guide-ment">
									<p>등록정보가 없습니다.</p>
								</div>

								<div class="btn-area">
									<button class="btn-primary" type="button" id="myPage_cpaMemberRegist">공인회계사 등록하기</button>
								</div>
							</div>
						</c:if>

					</c:if>

					<!-- 승인대기 -->
					<c:if test="${cpaMemFlag eq 'Y'}">

						<div class="application-status">
							<div class="guide-ment">
								<em>공인회계사 신청일 ${cpaMemberRegInfo.opetrDe}</em>

								<p>등록하신 내용을 검토중입니다.</p>

							</div>


							<div class="btn-area">
								<button class="btn-round" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMemberReg_reviewInfo&pin=${myPagePin}'">공인회계사 등록조회</button>
								<!-- 등록회비 미납 -->
								<c:if test="${cpaAidFlag ne 'Y'}">
									<button class="btn-round fill" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMemberReg_aidDuesInfo&pin=${myPagePin}'">등록회비 납부</button>
								</c:if>
							</div>
						</div>

					</c:if>

					<!-- 반려 -->
					<c:if test="${cpaMemFlag eq 'F'}">

						<div class="application-status">
							<div class="guide-ment">
								<em>공인회계사 정보 신청이 반려됐습니다.</em>

								<p>자세한 사항은 반려사유 조회를 참조하세요.</p>

							</div>

							<div class="btn-area">
								<button class="btn-round" type="button" onclick="myPage.myPage_rejectRsnClick('${cpaMemberRegInfo.rejectRsn}')">반려사유 조회</button>
								<button class="btn-round fill" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?pin=${myPagePin}'">재신청하기</button>
							</div>
						</div>

					</c:if>

					<!-- 승인완료 -->
					<c:if test="${cpaMemFlag eq 'E'}">
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
					</c:if>

					<!-- 마이페이지 메뉴 리스트 -->
					<ul class="my-menu-list">
						<li>
							<a href="/kicpa/qna/qnaList.do">문의접수</a>
						</li>
						<li>
							<a href="/kicpa/faq/faqList.do">FAQ</a>
						</li>
						<!-- <li>
							<a href="#">알림</a>
						</li> -->
						<li>
							<a href="javascript:window.open('/kicpa/myp/setInfo.do');">설정</a>
						</li>
					</ul>

				</div>
			</div><!-- //공인회계사 -->

			<!-- 수습회계사 -->
			<c:if test="${trainFlag ne 'H'}">
				<div id="myPage_cpaTrainInfoTab" class="tab-main-content myPageTabMove">
					<div class="mypage-wrap">

						<!-- 합격자 정보 없을 경우 -->
						<c:if test="${myPageRegFlag eq 'N'}">
							<div class="application-status">
								<div class="guide-ment">
									<p>합격자 기본정보를 등록하셔야<br />서비스를 이용하실 수 있습니다.</p>
								</div>

								<div class="btn-area">
									<button class="btn-primary" type="button" id="myPage_cpaPassRegist">합격자 기본정보 등록하기</button>
								</div>
							</div>
						</c:if>

						<!-- 기본실무 정보 없을 경우 -->
						<c:if test="${myPageRegFlag ne 'N' && trainFlag eq 'N' && audTrainFlag eq 'N'}">
							<div class="application-status">
								<div class="guide-ment">
									<p>기본실무를 등록하세요.</p>
								</div>

								<div class="btn-area">
									<button class="btn-primary" type="button" id="mypPage_mypCpaTrainRegPageMove">기본실무 등록하기</button>
								</div>
							</div>
						</c:if>

						<!-- 기본실무 승인대기 -->
						<c:if test="${myPageRegFlag ne 'N' && trainFlag eq 'Y' && audTrainFlag eq 'N'}">
							<div class="application-status">
								<div class="guide-ment">
									<em>수습회계사 기본실무 신청일 ${cpaTrainRegInfo.opetrDe}</em>

									<p>등록하신 내용을 검토중입니다.</p>

								</div>

								<div class="btn-area">
									<button class="btn-round" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaTrainReg.do?movePage=mypCpaTrainReg_reviewInfo&pin=${myPagePin}'">기본실무 등록조회</button>
								</div>

							</div>
						</c:if>

						<!-- 기본실무 반려 -->
						<c:if test="${myPageRegFlag ne 'N' && trainFlag eq 'F' && audTrainFlag eq 'N'}">
							<div class="application-status">
								<div class="guide-ment">
									<em>수습회계사 기본실무 신청이 반려됐습니다.</em>

									<p>자세한 사항은 반려사유 조회를 참조하세요.</p>

								</div>

								<div class="btn-area">
									<button class="btn-round" type="button" onclick="myPage.myPage_rejectRsnClick('${cpaTrainRegInfo.rejectRsn}')">반려사유 조회</button>
									<button class="btn-round fill" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaTrainReg.do?pin=${myPagePin}'">재신청하기</button>
								</div>
							</div>
						</c:if>

						<!-- 기본실무 승인완료 -->
						<c:if test="${myPageRegFlag ne 'N' && trainFlag eq 'E' && audTrainFlag eq 'N'}">
							<div class="application-status">

								<div class="status-detail">
									<h3>기본정보</h3>

									<div class="status-box">
										<div class="status-grp"><span style="width:${appProgressDays}%;"></span></div>
										<p class="percentage">
											<em>진행률</em>
											<span>${appProgressDays}%</span>
										</p>
									</div>
								</div>

								<ul class="view-list">
									<li>
										<div class="view-box">
											<span class="label">실무시작일</span>
											<p>${cpaTrainRegReal[0].appRegistDe}</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">종료예정일</span>
											<p>${cpaTrainRegReal[0].appRegistEndDe}</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">실습수습기관</span>
											<p>${cpaTrainRegReal[0].appInsttCdNm}</p>
										</div>
										<div class="view-box">
											<p>${cpaTrainRegReal[0].appInsttCd}</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">지도공인회계사</span>
											<p>${cpaTrainRegReal[0].guideCpaNm}</p>
										</div>
										<div class="view-box">
											<p>${cpaTrainRegReal[0].guideCpaSn}</p>
										</div>
									</li>
								</ul>

								<!-- 버튼 -->
								<div class="btn-multiArea">
									<div>
										<button class="btn-round mypage_trainInfoMove" type="button" value="apntcBrf">상황보고서</button>
										<button class="btn-round mypage_trainInfoMove" type="button" value="trnngResult">연수결과</button>
									</div>

									<!-- 기본실무수습 종료예정일 15일전부터 외감 신청 가능 -->
									<c:if test="${leftDays <= 15}">
										<div>
											<button class="btn-round fill mypPage_mypAudTrainRegMove" type="button">외감신청</button>
										</div>
									</c:if>
								</div>
							</div>
						</c:if>


						<!-- 외감실무 승인대기 -->
						<c:if test="${trainFlag eq 'E' && audTrainFlag eq 'Y'}">
							<div class="application-status">
								<div class="guide-ment">
									<em>수습회계사 외감실무 신청일 ${cpaAudTrainRegInfo.opetrDe}</em>

									<p>등록하신 내용을 검토중입니다.</p>

								</div>

								<div class="btn-area">
									<button class="btn-round" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaAudTrainReg.do?movePage=mypCpaAudTrainReg_reviewInfo&pin=${myPagePin}'">외감실무 등록조회</button>
								</div>

							</div>
						</c:if>

						<!-- 외감실무 반려 -->
						<c:if test="${trainFlag eq 'E' && audTrainFlag eq 'F'}">
							<div class="application-status">
								<div class="guide-ment">
									<em>수습회계사 외감실무 신청이 반려됐습니다.</em>

									<p>자세한 사항은 반려사유 조회를 참조하세요.</p>

								</div>

								<div class="btn-area">
									<button class="btn-round" type="button" onclick="myPage.myPage_rejectRsnClick('${cpaAudTrainRegInfo.rejectRsn}')">반려사유 조회</button>
									<button class="btn-round fill" type="button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaAudTrainReg.do?pin=${myPagePin}'">재신청하기</button>
								</div>
							</div>
						</c:if>

						<!-- 외감실무 승인완료 -->
						<c:if test="${trainFlag eq 'D' && audTrainFlag eq 'E'}">
							<div class="application-status">

								<div class="status-detail">
									<h3>외감정보</h3>

									<div class="status-box">
										<div class="status-grp"><span style="width:${audProgressDays}%;"></span></div>
										<p class="percentage">
											<em>진행률</em>
											<span>${audProgressDays}%</span>
										</p>
									</div>
								</div>

								<ul class="view-list">
									<li>
										<div class="view-box">
											<span class="label">실무시작일</span>
											<p>${cpaTrainRegReal[0].audRegistDe}</p>
										</div>
									</li>
									<c:if test="${cpaTrainRegReal[0].audRegistEndDe ne '' && cpaTrainRegReal[0].audRegistEndDe ne null}">
										<li>
											<div class="view-box">
												<span class="label">종료예정일</span>
												<p>${cpaTrainRegReal[0].audRegistEndDe}</p>
											</div>
										</li>
									</c:if>
									<c:if test="${cpaTrainRegReal[0].audRegistEndDe eq '' || cpaTrainRegReal[0].audRegistEndDe eq null}">
										<li>
											<div class="view-box">
												<span class="label">종료일</span>
												<p>${cpaTrainRegReal[0].audEndDe}</p>
											</div>
										</li>
									</c:if>
									<li>
										<div class="view-box">
											<span class="label">실습수습기관</span>
											<p>${cpaTrainRegReal[0].appInsttCdNm}</p>
										</div>
										<div class="view-box">
											<p>${cpaTrainRegReal[0].appInsttCd}</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">지도공인회계사</span>
											<p>${cpaTrainRegReal[0].guideCpaNm}</p>
										</div>
										<div class="view-box">
											<p>${cpaTrainRegReal[0].guideCpaSn}</p>
										</div>
									</li>
									<li>
										<div class="view-box">
											<span class="label">기본실무 종료일</span>
											<p>${cpaTrainRegReal[0].appEndDe}</p>
										</div>
									</li>
								</ul>

								<!-- 버튼 -->
								<div class="btn-multiArea">
									<div>
										<button class="btn-round mypage_trainInfoMove" type="button" value="apntcBrf">상황보고서</button>
										<button class="btn-round mypage_trainInfoMove" type="button" value="trnngResult">연수결과</button>
									</div>
								</div>
							</div>
						</c:if>

						<!-- 마이페이지 메뉴 리스트 -->
						<ul class="my-menu-list">
							<li>
								<a href="/kicpa/qna/qnaList.do">문의접수</a>
							</li>
							<li>
								<a href="/kicpa/faq/faqList.do">FAQ</a>
							</li>
							<!-- <li>
							<a href="#">알림</a>
							</li> -->
							<li>
								<a href="javascript:window.open('/kicpa/myp/setInfo.do');">설정</a>
							</li>
						</ul>

					</div>
				</div><!-- //수습회계사 -->
			</c:if>

			<!-- 세무사 세무대리 -->
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

								<em><br />세무사 개업신청을 원하시면<br />
									통합플랫폼 PC 화면에서 세무사(세무대리)<br />
									개업신청서를 작성하세요.</em>
							</div>
						</div>
					</c:if>

					<!-- 마이페이지 메뉴 리스트 -->
					<ul class="my-menu-list">
						<li>
							<a href="/kicpa/qna/qnaList.do">문의접수</a>
						</li>
						<li>
							<a href="/kicpa/faq/faqList.do">FAQ</a>
						</li>
						<!-- <li>
							<a href="#">알림</a>
						</li> -->
						<li>
							<a href="javascript:window.open('/kicpa/myp/setInfo.do');">설정</a>
						</li>
					</ul>

				</div>
			</div><!-- //세무사 세무대리 -->

			<input type="hidden" id="myPage_myPagePin" value="${myPagePin}">
			<input type="hidden" id="myPage_myPageRegFlag" value="${myPageRegFlag}"/>
			<input type="hidden" id="myPage_mypTrainFlag" value="${trainFlag}">
			<input type="hidden" id="myPage_mypAudTrainFlag" value="${audTrainFlag}">
			<input type="hidden" id="myPage_mypCpaMemFlag" value="${cpaMemFlag}">
		</section>

	</div>
</div>


<!-- 하단 레이어 팝업(반려사유 조회) / 활성화시 show -->
<div class="layer-popup-wrap" id="myPagePop_rejectRsn">
	<div class="layer-container">
		<div class="title-box">
			<h2>반려사유 조회</h2>
		</div>

		<div class="layer-content" style="text-align: center;">
			<div class="gray-box" id="myPagePop_rejectRsnText">

			</div>
		</div>

		<div class="layer-bottom" style="text-align: center;">
			<div class="btn-bottom">
				<button class="btn-round fill" type="button" id="myPagePop_rejectRsnBtn">확인</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>