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
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!--begin::Header-->
<!--회원추가 레이어팝-->
<div class="modal fade draggable-modal" id="cpaUserListPopup" data-target="#cpaUserListPopup" tabindex="-1"
	 role="cpaUserListPopup" data-backdrop="false" aria-hidden="true" style="z-index:10000;">
	<div class="modal-dialog modal-lg" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header" style="justify-content: center;">
				<h4 class="modal-title" id="common_title">회원추가</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			</div>
			<div class="modal-body">
				<div class="portlet light form-fit ">
					<div class="portlet-body form">
						<div class="row align-items-center" style="padding-left: 0.75rem;">
							<div class="col-10">
								<div class="page-title-box">
									<div class="d-none d-lg-block">
										<div class="position-relative">
											<div class="kt-input-icon kt-input-icon--right">
												<input type="text" class="form-control form-control-sm" placeholder="회원 이름을 입력하세요" id="cpaUser-Search" autocomplete="OFF">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-2">
								<button type="button" class="btn btn-dark btn-sm" id="cpaUser-SearchBtn" >검색</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="modal-body">
						<div id="grid_cpaUserList" class="portlet-body"
							 style="width:100%; height:300px; margin:0 auto;"></div>
						<%--<input type="hidden" class="form-control" id="introduction-part" placeholder="" value="">--%>
					</div>
				</div>
				<div class="modal-footer" style="padding: 1.5rem 0 0 0; justify-content: center;">
					<button type="button" class="btn btn-dark"  id="commonUserSelect">선택</button>
					<button type="button" class="btn btn-close" style="border: 1px solid black;" data-dismiss="modal"  id="commonClose">취소</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</div>
<!--회원추가 레이어팝-->

<!--수습공인회계사 검색 레이어팝-->
<div class="modal fade draggable-modal" id="cpaTrainListPopup" data-target="#cpaTrainListPopup" tabindex="-1"
	 role="cpaTrainListPopup" data-backdrop="false" aria-hidden="true" style="z-index:10000;">
	<div class="modal-dialog modal-lg" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header" style="justify-content: center;">
				<h4 class="modal-title" id="commonTrain_title">수습공인회계사 검색</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			</div>
			<div class="modal-body">
				<div class="portlet light form-fit ">
					<div class="portlet-body form">
						<div class="row align-items-center" style="padding-left: 0.75rem;">
							<div class="col-10">
								<div class="page-title-box">
									<div class="d-none d-lg-block">
										<div class="position-relative">
											<div class="kt-input-icon kt-input-icon--right">
												<input type="text" class="form-control form-control-sm" placeholder="성명을 입력하세요" id="cpaTrain-Search" autocomplete="OFF">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-2">
								<button type="button" class="btn btn-dark btn-sm" id="cpaTrain-SearchBtn" >검색</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="modal-body">
						<div id="grid_cpaTrainList" class="portlet-body"
							 style="width:100%; height:300px; margin:0 auto;"></div>
						<%--<input type="hidden" class="form-control" id="introduction-part" placeholder="" value="">--%>
					</div>
				</div>
				<div class="modal-footer" style="padding: 1.5rem 0 0 0; justify-content: center;">
					<button type="button" class="btn btn-dark"  id="commonTrainSelect">선택</button>
					<button type="button" class="btn btn-close" style="border: 1px solid black;" data-dismiss="modal"  id="commonTrainClose">취소</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</div>
<!--수습공인회계사 검색 레이어팝-->

<!--공인회계사 합격자 검색 레이어팝-->
<div class="modal fade draggable-modal" id="cpaMemberListPopup" data-target="#cpaMemberListPopup" tabindex="-1"
	 role="cpaMemberListPopup" data-backdrop="false" aria-hidden="true" style="z-index:10000;">
	<div class="modal-dialog modal-lg" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header" style="justify-content: center;">
				<h4 class="modal-title" id="commonMember_title">수습공인회계사 검색</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			</div>
			<div class="modal-body">
				<div class="portlet light form-fit ">
					<div class="portlet-body form">
						<div class="row align-items-center" style="padding-left: 0.75rem;">
							<div class="col-10">
								<div class="page-title-box">
									<div class="d-none d-lg-block">
										<div class="position-relative">
											<div class="kt-input-icon kt-input-icon--right">
												<input type="text" class="form-control form-control-sm" placeholder="성명을 입력하세요" id="cpaMember-Search" autocomplete="OFF">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-2">
								<button type="button" class="btn btn-dark btn-sm" id="cpaMember-SearchBtn" >검색</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="modal-body">
						<div id="grid_cpaMemberList" class="portlet-body"
							 style="width:100%; height:300px; margin:0 auto;"></div>
						<%--<input type="hidden" class="form-control" id="introduction-part" placeholder="" value="">--%>
					</div>
				</div>
				<div class="modal-footer" style="padding: 1.5rem 0 0 0; justify-content: center;">
					<button type="button" class="btn btn-dark"  id="commonMemberSelect">선택</button>
					<button type="button" class="btn btn-close" style="border: 1px solid black;" data-dismiss="modal"  id="commonMemberClose">취소</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</div>
<!--공인회계사 합격자 검색 레이어팝-->

<!--감사인 검색 레이어팝-->
<div class="modal fade draggable-modal" id="cpaAuditInfoListPopup" data-target="#cpaAuditInfoListPopup" tabindex="-1"
	 role="cpaAuditInfoListPopup" data-backdrop="false" aria-hidden="true" style="z-index:10000;">
	<div class="modal-dialog modal-lg" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header" style="justify-content: center;">
				<h4 class="modal-title" id="commonAuditInfo_title">감사인 검색</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			</div>
			<div class="modal-body">
				<div class="portlet light form-fit ">
					<div class="portlet-body form">
						<div class="row align-items-center" style="padding-left: 0.75rem;">
							<div class="col-10">
								<div class="page-title-box">
									<div class="d-none d-lg-block">
										<div class="position-relative">
											<div class="kt-input-icon kt-input-icon--right">
												<input type="text" class="form-control form-control-sm" placeholder="감사인명을 입력하세요" id="cpaAuditInfo-Search" autocomplete="OFF">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-2">
								<button type="button" class="btn btn-dark btn-sm" id="cpaAuditInfo-SearchBtn" >검색</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="modal-body">
						<div id="grid_cpaAuditInfoList" class="portlet-body"
							 style="width:100%; height:300px; margin:0 auto;"></div>
						<%--<input type="hidden" class="form-control" id="introduction-part" placeholder="" value="">--%>
					</div>
				</div>
				<div class="modal-footer" style="padding: 1.5rem 0 0 0; justify-content: center;">
					<button type="button" class="btn btn-dark"  id="commonAuditInfoSelect">선택</button>
					<button type="button" class="btn btn-close" style="border: 1px solid black;" data-dismiss="modal"  id="commonAuditInfoClose">취소</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</div>
<!--감사인 검색 레이어팝-->

<!--감사인 사무소 검색 레이어팝-->
<div class="modal fade draggable-modal" id="cpaAuditListPopup" data-target="#cpaAuditListPopup" tabindex="-1"
	 role="cpaAuditListPopup" data-backdrop="false" aria-hidden="true" style="z-index:10000;">
	<div class="modal-dialog modal-lg" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header" style="justify-content: center;">
				<h4 class="modal-title" id="commonAudit_title">감사인 사무소 검색</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			</div>
			<div class="modal-body">
				<div class="portlet light form-fit ">
					<div class="portlet-body form">
						<div class="row align-items-center" style="padding-left: 0.75rem;">
							<div class="col-10">
								<div class="page-title-box">
									<div class="d-none d-lg-block">
										<div class="position-relative">
											<div class="kt-input-icon kt-input-icon--right">
												<input type="text" class="form-control form-control-sm" placeholder="감사인명을 입력하세요" id="cpaAudit-Search" autocomplete="OFF">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-2">
								<button type="button" class="btn btn-dark btn-sm" id="cpaAudit-SearchBtn" >검색</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="modal-body">
						<div id="grid_cpaAuditList" class="portlet-body"
							 style="width:100%; height:300px; margin:0 auto;"></div>
						<%--<input type="hidden" class="form-control" id="introduction-part" placeholder="" value="">--%>
					</div>
				</div>
				<div class="modal-footer" style="padding: 1.5rem 0 0 0; justify-content: center;">
					<button type="button" class="btn btn-dark"  id="commonAuditSelect">선택</button>
					<button type="button" class="btn btn-close" style="border: 1px solid black;" data-dismiss="modal"  id="commonAuditClose">취소</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</div>
<!--감사인 사무소 검색 레이어팝-->
<!--end::Header-->
