<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import ="adminwork.com.cmm.LoginVO" %>

<!--begin::Content-->
<div class="content d-flex flex-column flex-column-fluid" id="addajaxtabdiv">
	<!--begin::Subheader-->
	<div class="subheader subheader-solid" id="kt_subheader">
		<div class="subheader-tab">
			<ul class="nav nav-tabs" id="addajaxtab" role="tablist">								
				<li class="nav-item" role="presentation">
					<a class="nav-link active" data-toggle="tab" id="tabview10_tab" href="#tabview10" role="tab" aria-controls="tabview10" aria-selected="true">메인</a>
				</li>				
			</ul>
		</div>
	</div>
	<div class=" flex-column-fluid tab-content" id="addajaxtabbody">
		<div class="tab-pane fade show active" id="tabview10" role="tabpanel" aria-labelledby="tabview10_tab">

			<div class="container-fluid">
				<div class="welcome-wrap pl-20 pr-10">
					<%
						LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
						if(loginVO != null){
					%>
						<c:set var="loginName" value="<%= loginVO.getName()%>"/>
						<div class="logo"><img src="assets/images/main-logo.png"></div>
						<div class="welcome-title"><c:out value="${loginName}"/> 님 반갑습니다</div>
					<%
						}
					%>

					<div class="menu-wrap">
						<div class="title">자주찾는메뉴 <i class="icon setting"></i></div>
						<ul>
							<li><a href="javascript:void(0);"><span><i class="icon intergrated"></i></span>공인회계사 통합조회</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon comprehensive"></i></span>업무자료 종합조회</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon complaint"></i></span>민원내역 관리</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon official"></i></span>공문 관리</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon statistics"></i></span>회원통계현황(대시보드)</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon correction"></i></span>문자메세지 발송</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon itservice"></i></span>IT서비스 요청 등록</a></li>
							<li><a href="javascript:void(0);"><span><i class="icon faq"></i></span>FAQ 게시판 관리</a></li>
						</ul>
					</div>
				</div>

				</div>

				<%--<c:set var="cmmCodeList" value="${cmmCodeList}" scope="session"/>--%>

				<c:if test="${LoginVO.id == 'admin'}">

				<div class="row">
					<div class="alert alert-custom alert-default" role="alert">
						<div class="alert-icon">
							<span class="svg-icon svg-icon-primary svg-icon-xl">
								<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Tools/Compass.svg-->
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<rect x="0" y="0" width="24" height="24"></rect>
										<path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3"></path>
										<path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fill-rule="nonzero"></path>
									</g>
								</svg>
								<!--end::Svg Icon-->
							</span>
						</div>
						<div class="alert-text"><h3>유저 세션</h3>
						세션이 있을경우 <br/>
						<c:out value="${LoginVO.id }" escapeXml="false" /> = ${LoginVO.id }  --> jsp 페이지 태그 확인
						<br/>
						자바에서는		<br/>
						LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
						if(user.getId().endsWith("admin")) {
						}
						<br/>

						adminwork.com.cmm.LoginVO 클래스에 해당 변수들이 들어있어서 확인하면됨
						<br/>
						adminwork.let.uat.uia.service.impl.SessionMapping.java 에보면 세션값에 매핑하는 내용이 있음 참고 하시면 됨
						<br/>

						</div>
					</div>
				</div>
				<div class="row">
					<div class="alert alert-custom alert-default" role="alert">
						<div class="alert-icon">
							<span class="svg-icon svg-icon-primary svg-icon-xl">
								<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Tools/Compass.svg-->
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<rect x="0" y="0" width="24" height="24"></rect>
										<path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3"></path>
										<path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fill-rule="nonzero"></path>
									</g>
								</svg>
								<!--end::Svg Icon-->
							</span>
						</div>
						<div class="alert-text"><h3>공통 코드</h3>
							<br/>
							<select id="cmmCombo">
								<c:forEach var="cmmCd" items="${cmmCodeList}" varStatus="status">
									<c:if test="${cmmCd.grp_cd eq 'G001' }">
										<option  value="${cmmCd.cd }">${cmmCd.cd_nm }</option>
									</c:if>
								</c:forEach>
							</select>

							<a href="javascript:closeTab('docSendList','docSendNumIssu')">닫기 테스트</a>
							<a href="javascript:closeTab('docSendList')">닫기 테스트2</a>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="alert alert-custom alert-default" role="alert">
						<div class="alert-icon">
							<span class="svg-icon svg-icon-primary svg-icon-xl">
								<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Tools/Compass.svg-->
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<rect x="0" y="0" width="24" height="24"></rect>
										<path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3"></path>
										<path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fill-rule="nonzero"></path>
									</g>
								</svg>
								<!--end::Svg Icon-->
							</span>
						</div>
						<%--공통팝업 start--%>
						<%--<input type="text" class="form-control " placeholder="Search..." id="TopGeneralSearch" AUTOCOMPLETE="OFF" onkeypress="javascript:if(event.keyCode==13) { event.preventDefault(); mainCommonList.fTopGenaralSearch('TopGeneralSearch');}">
						<input type="text" id="birth11">
						<button class="btn btn-primary btn-font-lg btn-sm" type="button"  onclick="mainCommonList.fTopGenaralSearch('TopGeneralSearch')" >검색</button>--%>
						<%--공통팝업 end--%>
						<div class="alert-text"><h3>메뉴 등록방법</h3>
							select *  from LETTNPROGRMLIST a; 에 progrm_file_nm 프로그램 등록후<br/>
							<br/>
							SELECT * FROM KIPADM.LETTNMENUINFO 에 progrm_file_nm 입력;<br/>
							<br/>
							INSERT INTO LETTNMENUCREATDTLS ( AUTHOR_CODE ,MENU_NO ) VALUES ( 'ROLE_ADMIN', 1000000 ) -- 프로그램번호 맞추기<br/>
							INSERT INTO LETTNMENUCREATDTLS ( AUTHOR_CODE ,MENU_NO ) VALUES ( 'ROLE_USER_MEMBER', 1000000 ) -- 프로그램번호 맞추기<br/>
							<br/>
							<br/>
							커밋<br/>

						</div>
					</div>
				</div>

			</c:if>



				<div class="modal-wrap">
					<div class="modal modal-v2 fade" id="favListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-top">
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="icon close-white align-middle"></i></button>
							</div>
							<div class="modal-content">

								<div class="modal-header">
									<h5 class="modal-title">자주찾는 메뉴설정</h5>
									<button class="btn btn-success rounded-pill btn-save">저장</button>
								</div>
								<div class="modal-body">
									<!--begin: Datatable-->
									<div id="mainfav_grid_wrap" class="dataTables_wrapper dt-bootstrap4" style="height:500px; margin:0 auto;">

									</div>
									<!--end: Datatable-->
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		
	</div>
	<!--end::Subheader-->







<%-- 	<!--end::Subheader-->
	<!--begin::Entry-->
	<div class="d-flex flex-column-fluid">
		<!--begin::Container-->
		<div class="container-fluid">
			<!-- <p>Page content goes here...</p> -->
			
			<div id="addajaxtabdiv"> 
				<!-- Tab Headers Start -->
				<ul class="nav nav-tabs" id="addajaxtab" role="tablist">
					<li class="nav-item" role="presentation">
						<a class="nav-link active" data-toggle="tab" id="tabview10-tab" href="#tabview10" role="tab" aria-controls="tabview10" aria-selected="true">Tab 1</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" data-toggle="tab" id="tabview11-tab" href="#tabview11" role="tab" aria-controls="tabview11" aria-selected="true">Tab 2</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" data-toggle="tab" id="tabview12-tab" href="#tabview12" role="tab" aria-controls="tabview12" aria-selected="true">Tab 3</a>
					</li>
				</ul>
				<!-- Tab Headers End --> 
				<!-- Tab Body Start -->
				<div class="tab-content" id="addajaxtabbody">
					<div class="tab-pane fade show active" id="tabview10" role="tabpanel" aria-labelledby="tabview10-tab"> 
					세션이 있을경우 <br/>
					<c:out value="${LoginVO.id }" escapeXml="false" /> = ${LoginVO.id }  --> jsp 페이지 태그 확인
					<br/>
					자바에서는		<br/>		
					LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
						if(user.getId().endsWith("admin")) {
						}
					<br/>
					
					adminwork.com.cmm.LoginVO 클래스에 해당 변수들이 들어있어서 확인하면됨
					<br/>
					adminwork.let.uat.uia.service.impl.SessionMapping.java 에보면 세션값에 매핑하는 내용이 있음 참고 하시면 됨
		
					</div>
					<div class="tab-pane fade show" id="tabview11" role="tabpanel" aria-labelledby="tabview11-tab"> Some more static content... </div>
					<div class="tab-pane fade show" id="tabview12" role="tabpanel" aria-labelledby="tabview12-tab"> A bit more... </div>
				</div>
			</div>
			
		</div>
		<!--end::Container-->
	</div>
	<!--end::Entry-->
	 --%>
	

<script>
	var mainFavList = mainFavList || {}; // 접수대장 namespace

	mainFavList.mainFavList_gridID = null;

	//AUIGrid 를 생성합니다.
	mainFavList.fn_createAUIGrid = function() {

		var columnLayout = [{
			dataField : "",
			headerText : "화면명"
		}];

		var gridPros = {
			showRowNumColumn : true,
			showRowCheckColumn : true,
			headerHeight : 34,
			rowHeight : 34
		};


		fn_AUIGrid_create([{id:"mainfav_grid_wrap", obj:[mainFavList,"mainFavList_gridID"], layout:columnLayout , prop:gridPros}]);
	};

	mainFavList.fn_init_events = function() {
		$("#favListModal").on('shown.bs.modal', function () {
			mainFavList.fn_init_resize_AUIGrid();
		});

	};

	mainFavList.fn_init_resize_AUIGrid= function(){
		fn_AUIGrid_resize([{id:"mainfav_grid_wrap",obj:mainFavList.mainFavList_gridID}]);

	};


	// 문서 시작 시
	$(document).ready(
			function() {
				mainFavList.fn_createAUIGrid();
				mainFavList.fn_init_events();
			}
	);



</script>

<!--end::Content-->