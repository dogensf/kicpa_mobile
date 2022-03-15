<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

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
<!-- KICPA 알림마당 게시판 -->
	<div class="title-box">
	  <h3>KICPA 알림마당</h3>
	  <button type="button" onClick="location.href='<c:url value='/kicpa/notice/boardList.do'/>'" class="btn-detail">상세보기</button>
	</div>

	<div class="cont">
		<div class="tab-sub">
		    <ul>
		        <li class="active">
		            <a href="#">공지사항</a>
		        </li>
		        <li>
		            <a href="#">주요 기사 (Newsaclips)</a>
		        </li>
		        <li>
		            <a href="#">국제동향</a>
		        </li>
		    </ul>
	  	</div>
		<div class="tab-sub-content show">
		    <div class="board-list">
				<ul>
					<li>
						<a href="#">
							<div class="title-zone">
							    <p>다산회계법인 4본부 경력회계사님을 모십니다.</p>
							    <div class="other">
							        <span class="ico-file"></span>
							    </div>
							</div>
							<div class="info-zone">
							    <span>2021.12.14</span>
							    <span>다산회계법인</span>
							    <span>조회 16</span>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

<!-- KICPA 구인정보 게시판 -->
	<div class="title-box">
		<h3>KICPA 구인정보</h3>
		<button type="button" class="btn-detail">상세보기</button>
	</div>

	<div class="cont">
		<div class="tab-sub">
			<ul>
			    <li class="active">
			        <a href="#">공인회계사</a>
			    </li>
			    <li>
			        <a href="#">일반</a>
			    </li>
			    <li>
			        <a href="#">한국공인회계사회</a>
			    </li>
			</ul>
		</div>
		<div class="tab-sub-content show">
			<div class="board-list">
				<ul>
					<li>
					    <a href="#">
					        <div class="title-zone">
					            <p>다산회계법인 4본부 경력회계사님을 모십니다.</p>
					            <div class="other">
					                <span class="state">다섯글자씩</span>
					            </div>
					        </div>
					        <div class="info-zone">
					            <span>2021.12.14</span>
					            <span>다산회계법인</span>
					            <span>조회 16</span>
					        </div>
					    </a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>