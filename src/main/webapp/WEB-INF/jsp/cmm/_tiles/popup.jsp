<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<!--발송문서 레이어팝업-->
<div class="modal-wrap">
	<div class="modal modal-v2 fade" id="docSendList_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-top">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="icon close-white align-middle"></i></button>
			</div>

			<div class="modal-content">
				<div class="modal-header justify-content-center border-bottom-sm">
					<h5 class="modal-title">발송문서 번호 안내</h5>
					<!-- <button class="btn btn-success rounded-pill btn-save">저장</button> -->
				</div>
				<div class="modal-body">
					<div class="pb-4 border-bottom-sm">
						<div>
							<label>문서번호</label>
							<span id="docSendList_modal_docSendNo">2021 -0326</span>
						</div>
						<div>
							<label>시행일</label>
							<span id="docSendList_modal_sendDate">2021.08.11</span>
						</div>
						<div>
							<label>제목</label>
							<span id="docSendList_modal_title">회계법인 징계 등 조치사실 확인원</span>
						</div>
						<div>
							<label>수신처</label>
							<span id="docSendList_modal_receipt">법무법인 길동</span>
						</div>
						<div>
							<label>담당자</label>
							<span id="docSendList_modal_inputUserNm">홍길동</span>
						</div>
						<p class="mt-5">위와 같이 발송문서 번호가 발급되었습니다.</p>
					</div>
					<div class="btn-wrap mt-4 mb-2 text-center">
						<button class="btn btn-primary" id="docSendList_modal_close">확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--발송문서 레이어팝업-->

<!--접수문서 레이어팝업-->
<div class="modal-wrap">
	<div class="modal modal-v2 fade" id="docReceiptList_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-top">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="icon close-white align-middle"></i></button>
			</div>

			<div class="modal-content">
				<div class="modal-header justify-content-center border-bottom-sm">
					<h5 class="modal-title">접수문서 번호 안내</h5>
					<!-- <button class="btn btn-success rounded-pill btn-save">저장</button> -->
				</div>
				<div class="modal-body">
					<div class="pb-4 border-bottom-sm">
						<div>
							<label>접수번호</label>
							<span id="docReceiptList_modal_docSendNo">2021 -0326</span>
						</div>
						<div>
							<label>시행일</label>
							<span id="docReceiptList_modal_sendDate">2021.08.11</span>
						</div>
						<div>
							<label>제목</label>
							<span id="docReceiptList_modal_subject">회계법인 징계 등 조치사실 확인원</span>
						</div>
						<div>
							<label>발신처</label>
							<span id="docReceiptList_modal_receipt">법무법인 길동</span>
						</div>
						<div>
							<label>담당자</label>
							<span id="docReceiptList_modal_senderUserNm">홍길동</span>
						</div>
						<p class="mt-5">위와 같이 발송문서 번호가 발급되었습니다.</p>
					</div>
					<div class="btn-wrap mt-4 mb-2 text-center">
						<button class="btn btn-primary" id="docReceiptList_modal_close">확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--접수문서 레이어팝업-->

<!--회원 경력 조회 레이어팝-->
<div class="modal fade draggable-modal" id="cmitMberCareerHistSearch" data-target="#cmitMberCareerHistSearch" tabindex="-1"
	 role="cmitMberCareerHistSearch" data-backdrop="false" aria-hidden="true" style="z-index:10000;">
	<div class="modal-dialog modal-lg" style="max-width: 40%;">
		<div class="modal-content">
			<div class="modal-header" style="justify-content: center;">
				<h4 class="modal-title" id="cmitMberCareerHistSearch_title">경력조회</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="modal-body">
						<div id="grid_cmitMberCareerHistSearch" class="portlet-body"
							 style="width:100%; height:300px; margin:0 auto;"></div>
						<%--<input type="hidden" class="form-control" id="introduction-part" placeholder="" value="">--%>
					</div>
				</div>
				<div class="modal-footer" style="padding: 1.5rem 0 0 0; justify-content: center;">
					<button type="button" class="btn btn-close" id="cmitMberCareerHistSearch_commonClose">닫기</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</div>
<!--회원추가 레이어팝-->