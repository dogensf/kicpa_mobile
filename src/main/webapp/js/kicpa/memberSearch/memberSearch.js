var memberSearch = {};

memberSearch.init = function(){
	$("#btnSearch").on("click", function(){
		memberSearch.searchAjax();
	});

	//엔터로 검색
	$("#searchKeyword").on("keyup", function(e){
		if(e.keyCode == 13){
			memberSearch.searchAjax();
		}
	});

	$("#btnClear").on("click", function(){
		$("#searchKeyword").val("");
		$("#totalCnt").text("0건");
		memberSearch.renderEmpty("성명을 입력하고 검색하세요.");
	});
}

memberSearch.searchAjax = function(){
	var keyword = $.trim($("#searchKeyword").val());
	if(keyword == ""){
		alert("성명을 입력하세요.");
		return;
	}
	fn_ajax_call("/kicpa/memberSearch/getMemberSearchList.do", {searchKeyword : keyword}, memberSearch.searchSuccess, memberSearch.searchError);
}

memberSearch.searchSuccess = function(data){
	if(data.errorYn == 'Y'){
		alert("조회 중 오류가 발생했습니다.");
		return;
	}
	if(data.authYn == 'N'){
		alert("임직원만 사용할 수 있는 기능입니다.");
		location.href = "/kicpa/myp/faqQnaCategory.do";
		return;
	}

	var list = data.resultList;
	var totalCnt = data.totalCnt ? data.totalCnt : 0;
	$("#totalCnt").text(totalCnt + "건");

	if(list == null || list.length == 0){
		memberSearch.renderEmpty("검색 결과가 없습니다.");
		return;
	}

	var txt = "";
	$.each(list, function(i, o){
		txt += '<tr>\n';
		txt += '	<td>' + memberSearch.nvl(o.cpaClNm) + '</td>\n';
		txt += '	<td>' + memberSearch.nvl(o.cpaRegNo) + '</td>\n';
		txt += '	<td>' + memberSearch.nvl(o.koreanNm) + '</td>\n';
		txt += '	<td>' + memberSearch.nvl(o.auditNm) + '</td>\n';
		txt += '</tr>\n';
	});
	$("#memberSearchGrid").html(txt);
}

memberSearch.renderEmpty = function(message){
	$("#memberSearchGrid").html('<tr class="emptyRow"><td colspan="4">' + message + '</td></tr>');
}

memberSearch.nvl = function(v){
	return (v == null || v == undefined) ? '' : v;
}

memberSearch.searchError = function(data, status, error){
	alert("조회실패");
}
