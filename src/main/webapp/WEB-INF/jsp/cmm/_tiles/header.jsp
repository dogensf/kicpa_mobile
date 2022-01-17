<%--
  Class Name : EgovIncHeader.jsp
  Description : 화면상단 Header (include)
  Modification Information
 
      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2011.08.31   JJY       경량환경 버전 생성
 
    author   : 실행환경개발팀 JJY
    since    : 2011.08.31 
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!--begin::Header-->
					<div id="kt_header" class="header header-fixed">
						<!--begin::Container-->
						<div class="container-fluid d-flex align-items-stretch justify-content-between">
							<!--begin::Header Menu Wrapper-->
							<div class="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
								<!--begin::Header Menu-->
								<div id="kt_header_menu" class="header-menu header-menu-mobile header-menu-layout-default">
									<!--begin::Header Nav-->
									<!-- 로고 추가 -->
									<div class="logo-wrap">
										<a href="javascript:addNewTab('tabview10','','메인');" ><img src="assets/images/logo.png"></a>
									</div>
									<ul class="menu-nav">
										<li class="menu-item menu-item-open menu-item-here menu-item-submenu menu-item-rel menu-item-open menu-item-here menu-item-active" data-menu-toggle="click" aria-haspopup="true">
											<a href="javascript:;" class="menu-link menu-toggle">
												<span class="menu-text">통합업무</span>
												<i class="menu-arrow"></i>
											</a>
										</li>
										<li class="menu-item menu-item-submenu" >
											<a href="https://eap.kicpa.or.kr" class="menu-link" target="_blank">
												<span class="menu-text">회원서비스</span>
												<i class="menu-arrow"></i>
											</a>
										</li>

									</ul>
									<!--end::Header Nav-->
								</div>
								<!--end::Header Menu-->
							</div>
							<!--end::Header Menu Wrapper-->
							<!--begin::Topbar-->
							<div class="topbar">
								<!--begin::User-->
								<div class="topbar-item">
									<%
							        LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
							        if(loginVO == null){
							        %>
							        <div class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
										<!-- <span class="mr-3">
											<i class="icon alarm"><span class="num"></span></i>
										</span>				 -->						
										<span class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline">로그인정보 없음</span>
										<span class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">로그인후 사용하십시오</span>
										</div>
										<a href="<c:url value='/uat/uia/LoginUsr.do'/>" class="logout btn btn-sm font-weight-bolder py-2 px-5">로그인</a>
								  	<%
							        }else{
								  	%>
								  		<div class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
										<span class="mr-3">
											<i class="icon alarm"><span class="num"></span></i>
										</span>
										<c:set var="loginName" value="<%= loginVO.getName()%>"/>

											<span class="text-primary font-weight-bolder font-size-base d-none d-md-inline"><c:out value="${loginName}"/></span>
											<span class="font-weight-bolder font-size-base d-none d-md-inline mr-1 text-dark">님 반갑습니다!</span>

										</div>
										<a href="<c:url value='/uat/uia/actionLogout.do'/>" class="logout btn btn-sm font-weight-bolder py-2 px-5">로그아웃</a>
								  	    
								  	<%
								  	}
							        %>
								
								
									
								</div>
								
								<!--end::User-->
							</div>
							<!--end::Topbar-->
						</div>
						<!--end::Container-->
					</div>
					<!--end::Header-->
