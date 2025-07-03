<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/myp/mypCpaTrainReg.js?ver=1"></script>
<script>
$(document).ready(function(){
	mypCpaTrainReg.auditListInit();
});

function fncLocation(){
	window.close();
}

function fnAuditListSuccess(data){
	var list = data.list;
	$(".board-list ul .addRow").remove();
	if(list != null && list.length > 0 ){
		$.each(list,function(i,o){

			var rowData = $(".board-list ul .firstRow").clone();
			rowData.removeClass("firstRow");
			rowData.addClass("addRow");
			rowData.find(".title-zone p").html(o.korAudNm +'['+ o.auditCd+ '] - ' + o.statusClNm);
			rowData.show();

			rowData.off().on("click",function(){
				$(opener.document).find("input[name='appInsttNm']").val(o.korAudNm);
				$(opener.document).find("input[name='appInsttCd']").val(o.auditCd);
				$(opener.document).find("input[name='audGrpCl']").val(o.audGrpCl);

				if(o.audGrpCl != "A3019999"){
					$(opener.document).find("input[name='appInsttEtc']").val('');
					$(opener.document).find("input[name='appInsttEtcDept']").val('');
					$(opener.document).find("input[name='appInsttEtcTask']").val('');
					$(opener.document).find("input[name='appInsttEtc']").prop('disabled', true);
					$(opener.document).find("input[name='appInsttEtcDept']").prop('disabled', true);
					$(opener.document).find("input[name='appInsttEtcTask']").prop('disabled', true);
					$(opener.document).find('.mypTrainAppInsttEtcYn').hide();
				}
				else{
					$(opener.document).find("input[name='appInsttEtc']").prop('disabled', false);
					$(opener.document).find("input[name='appInsttEtcDept']").prop('disabled', false);
					$(opener.document).find("input[name='appInsttEtcTask']").prop('disabled', false);
					$(opener.document).find('.mypTrainAppInsttEtcYn').show();
				}

				window.close();
			});
			$(".board-list ul").append(rowData);
		});
	}
}
</script>

<form id="auditSearchForm" name="auditSearchForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">

	<section class="head-sub">
	 	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>실무수습기관 검색</h3>
	</section>
	<section class="content">

		<div id="tabMain1" class="tab-main-content show">
		    <div class="search-box">
		        <input class="search" type="text" readonly="readonly" name="searchKeyword" placeholder="실무수습기관명을 입력하세요." />
		         <button class="btn-del" type="button"><span>삭제</span></button>
		    </div>

		    <div id="tabSub1" class="tab-sub-content show">
		        <!-- 게시판 목록 -->
		      <div class="board-list">
		          <ul>
          			<li class="firstRow" style="display: none;">
						<div class="title-zone">
							<p></p>
						</div>
						<div class="info-zone">
							<span></span>
						</div>
					</li>
		          </ul>
		      </div>
		  </div><!-- tabSub1 -->
		</div><!-- tabMain1 -->
	</section>
</form>