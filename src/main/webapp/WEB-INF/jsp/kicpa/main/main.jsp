<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/board/board.js"></script>
<script src="/js/kicpa/main/main.js"></script>
<script>


var aa =  [
			{"name":"회원경조사", "img":"icon_obituary", "url":"location.href='https://m.naver.com'"},
			{"name":"회비관리", "img":"icon_tax", "url":"location.href='https://m.naver.com'"},
			{"name":"마이페이지", "img":"icon_mypage", "url":"location.href='https://m.naver.com'"},
			{"name":"설문조사", "img":"icon_consulting", "url":"location.href='https://m.naver.com'"},
			{"name":"구인정보", "img":"icon_survey", "url":"https://m.naver.com"},
			{"name":"알림마당", "img":"icon_notice", "url":"https://m.naver.com"},
			{"name":"공인회계사 소개", "img":"icon_intro2", "url":"https://m.naver.com"},			
			{"name":"회비관리", "img":"icon_tax", "url":"https://m.naver.com"},
			{"name":"마이페이지", "img":"icon_mypage", "url":"https://m.naver.com"},
			{"name":"설문조사", "img":"icon_consulting", "url":"https://m.naver.com"},
			{"name":"출판도서구매", "img":"icon_books_1", "url":"https://m.naver.com"}
		] ;

$(document).ready(function(){
	/* var ua = navigator.userAgent.toLowerCase();	
	if(ua.indexOf("iamaboy") > -1) {
		window.bridge.reqFavorite();
	}else{
		applyFavorite(aa);	
	}
	
	 */
	if ( !!window['bridge'] )  {
		window.bridge.reqFavorite(); 
	} else { 
		applyFavorite(aa); 
	}
});



function applyFavorite(menus) {
	
/* 	for(i=0;i < menus.length;i++){
	    console.log(menus[i]);
	    console.log(index + " ::: " , data.name);
		console.log(index + " ::: " , data.img);
		console.log(index + " ::: " , data.url);
	}; */
	var menu11="";
	var menu12="";
	var menu21="";
	var menu22="";
	menus.forEach(function(data, idx){
		if(idx < 8){
			if(idx < 4){
				menu11 +="<button class=\""+data.img+"\" type=\"button\" onclick=\"javascript:"+data.url+"\">"+data.name+"</button>";	
			}else{
				menu12 +="<button class=\""+data.img+"\" type=\"button\" onclick=\"javascript:"+data.url+"\">"+data.name+"</button>";
			}			
		}else{
			if(idx < 12){
				menu21 +="<button class=\""+data.img+"\" type=\"button\" onclick=\"javascript:"+data.url+"\">"+data.name+"</button>";	
			}else{
				menu22 +="<button class=\""+data.img+"\" type=\"button\" onclick=\"javascript:"+data.url+"\">"+data.name+"</button>";
			}			
		}
		console.log(idx + " ::: " , data.name);
		console.log(idx + " ::: " , data.img);
		console.log(idx + " ::: " , data.url);
	});
	
	  $('#mfm11').html(menu11);
	  $('#mfm12').html(menu12);
	  $('#mfm21').html(menu21);
	  $('#mfm22').html(menu22);

}
</script>

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
	      		<div id="mfm11">
			        <button class="tax" type="button"  onclick="javascript:location.href='<c:url value='/kicpa/dues/selectDuesList.do'/>';">
			         	 회비관리
			        </button>
			        <button class="icon_obituary" type="button" onclick="javascript:location.href='<c:url value='/kicpa/taxNews/boardList.do'/>';">
			          	상담센터
			        </button>
			        <button class="icon_inquiry" type="button" onclick="javascript:location.href='<c:url value='/kicpa/job/boardList.do'/>';">
			        	 구인정보
			        </button>
			        <button class="icon_accounting" type="button" onclick="javascript:location.href='<c:url value='/kicpa/memberEvent/boardList.do'/>';">
			       		   회원경조사
			        </button>
	     		</div>
	      		<div id="mfm12">
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
				<div id="mfm21">
		        	<button class="add" type="button">
		       			   추가
		       		</button>
		      	</div>
		      	<div id="mfm22">		        	
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
		            <a href="javascript:void(0);" onclick="main.changeBoardId(this,'NEWS');">주요기사 (Daily Newsclips)</a>
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