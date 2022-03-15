<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/main/main.js"></script>
<section class="bookmark-wrap">
	<div class="title-box">
		<h2>My 즐겨찾기</h2>
		<div class="r-area">
		    <button class="btn-edit" type="button" onClick="javascript:window.bridge.showFavorites();">
		      	편집
		    </button>
		</div>
	</div>
	<!-- 즐겨찾기 메뉴 -->
	<div class="swiper mySwiper">
  		<div class="swiper-wrapper">
	    	<div class="swiper-slide">
	      		<div>
			        <button class="tax" type="button"  onclick="javascript:location.href='<c:url value='/kicpa/dues/selectDuesList.do'/>';">
			         	 회비관리
			        </button>
			        <button class="counsel" type="button" onclick="javascript:location.href='<c:url value='/kicpa/taxNews/boardList.do'/>';">
			          	상담센터
			        </button>
			        <button class="job" type="button" onclick="javascript:location.href='<c:url value='/kicpa/job/boardList.do'/>';">
			        	 구인정보
			        </button>
			        <button class="familyEvent" type="button" onclick="javascript:location.href='<c:url value='/kicpa/memberEvent/boardList.do'/>';">
			       		   회원경조사
			        </button>
	     		</div>
	      		<div>
			        <button class="translation" type="button">
			    	      회계연수원
			        </button>
			        <button class="alret" type="button">
			     	     회계∙감사 Alert
			        </button>
			        <button class="news" type="button" onclick="javascript:location.href='<c:url value='/kicpa/taxNews/boardList.do'/>';">
			   		       세무속보
			        </button>
			        <button class="book" type="button">
			      	    도서구매∙<br />집합연수 신청
			        </button>
	     	 	</div>
	    	</div>
		    <div class="swiper-slide">
				<div>
		        	<button class="add" type="button">
		       			   추가
		       		</button>
		      	</div>
	    	</div>
	</div>
  	<div class="swiper-pagination"></div>
	</div>
</section>

<section class="content">
	<form id="boardForm" name="boardForm">
		<input type="hidden" name="boardId" id="boardId">
		<input type="hidden" name="ijJobSep">

	</form>
<!-- KICPA 알림마당 게시판 -->
	<div class="title-box">
	  <h3>KICPA 알림마당</h3>
	  <button type="button" onClick="location.href='<c:url value='/kicpa/notice/boardList.do'/>'" class="btn-detail">상세보기</button>
	</div>

	<div class="cont">
		<div class="tab-sub noticeTab">
		    <ul>
		        <li class="active">
		            <a href="javascript:void(0);" onclick="main.changeBoardId(this,'noti');" >공지사항</a>
		        </li>
		        <li>
		            <a href="javascript:void(0);" onclick="main.changeBoardId(this,'NEWS');">주요 기사 (Newsaclips)</a>
		        </li>
		        <li>
		            <a href="javascript:void(0);" onclick="main.changeBoardId(this,'intl04/intl05/intl06/intl07/intl08/rpnofin05');">국제동향</a>
		        </li>
		    </ul>
	  	</div>
		<div class="tab-sub-content show">
		    <div class="board-list noticeList">
				<ul>
					<c:if test="${boardList ne null and fn:length(boardList) > 0 }">
						<c:forEach items="${boardList }" var="board" varStatus="index">
							<li>
								<a href="javascript:board.openDetailPop('/kicpa/commonBoard/boardDetail.do?boardId=${board.boardId}&bltnNo=${board.bltnNo}');">
									<div class="title-zone">
									    <p>${board.bltnSubj }</p>
									    <div class="other">
										    <c:choose>
										    	<c:when test="${board.bltnTopTag ne 'N' }">
											        <span class="ico-bell"></span>
										    	</c:when>
										    	<c:when test="${board.fileCnt > 0 }">
											        <span class="ico-file"></span>
										    	</c:when>
										    	<c:otherwise>
										    		<span class="ico-arrow"></span>
										    	</c:otherwise>
										    </c:choose>
									    </div>
									</div>
								    <div class="info-zone">
							            <span>${board.regDatim }</span>
							            <span>${board.extStr1 }</span>
							            <span>조회 ${board.bltnReadCnt }</span>
							        </div>
								</a>
							</li>
						</c:forEach>
					</c:if>
				</ul>
			</div>
		</div>
	</div>

<!-- KICPA 구인정보 게시판 -->
	<div class="title-box">
		<h3>KICPA 구인정보</h3>
		<button type="button" onclick="location.href='/kicpa/job/boardList.do?ijJobSep=1'" class="btn-detail">상세보기</button>
	</div>

	<div class="cont">
		<div class="tab-sub jobTab">
			<ul>
			    <li class="active">
			        <a href="javascript:void(0);" onclick="main.jobChange(this,'1');">공인회계사</a>
			    </li>
			    <li>
			        <a href="javascript:void(0);" onclick="main.jobChange(this,'');">일반</a>
			    </li>
			    <c:if test="${isLogin eq true }">
				    <li>
				        <a href="javascript:void(0);" onclick="main.jobChange(this,'jobInfoKicpa');">한국공인회계사회</a>
				    </li>
			    </c:if>
			</ul>
		</div>
		<div class="tab-sub-content show">
			<div class="board-list jobList">
				<ul>
					<c:if test="${jobBoardList ne null and fn:length(jobBoardList) > 0 }">
						<c:forEach items="${jobBoardList }" var="board" varStatus="index">

							<li>
								<a href="javascript:board.openDetailPop('/kicpa/job/boardDetail.do?boardId=${board.boardId}');">
									<div class="title-zone">
									    <p>${board.ijWtitle }</p>
									    <div class="other">
								    		<span class="state">${board.jobName }</span>
									    </div>
									</div>
								    <div class="info-zone">
							            <span>${board.ijWdate }</span>
							            <span>${board.ijCoName }</span>
							            <span>조회 ${board.ijRecount }</span>
							        </div>
								</a>
							</li>
						</c:forEach>
					</c:if>
				</ul>
			</div>
		</div>
	</div>
</section>