<%--
  Class Name : notiList.jsp
  Description : 알림함 (푸시 알림 이력 목록)
  Modification Information

        수정일             수정자                   수정내용
    -------    --------    ---------------------------
    2026.07.24   LSY          최초 생성

--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<script src="/js/kicpa/noti/noti.js"></script>
<script>
$(document).ready(function(){
	noti.listInit();
});

function fncLocation(){
	history.back();
}
</script>

<form id="notiForm" name="notiForm" onsubmit="return false;">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">

	<section class="head-sub">
	    <button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>알림</h3>
	</section>
	<section class="content">
		<!-- 푸시 수신 설정 (앱 환경에서만 노출) -->
		<div class="set-box" id="notiSetBox" style="display:none;">
			<ul class="set-notify">
				<li>
					<span>알림받기</span>
					<div>
						<input type="checkbox" id="set01" class="switch" name="setup01">
						<label for="set01"></label>
					</div>
				</li>
			</ul>
		</div>

		<div class="board-top">
			<div class="total-num">
				<span>알림</span>
				<span class="find" id="totalCnt">0건</span>
			</div>
		</div>

		<!-- 알림 목록 -->
		<div class="board-list">
			<ul></ul>
		</div>
	</section>
</form>
