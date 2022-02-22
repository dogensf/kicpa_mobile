var popup = popup || {}; // 위원회 관리 namespace

popup.cmitMberCareerHistSearch_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		popup.fn_init_resize_AUIGrid();
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		
	}catch(e){
	}
});

$(document).ready(
	function() {
		// 탭이 열린후 grid resize
		$("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
		$(window).resize();
		
	});
	
	popup.fn_createAUIGrid(); // AUGRID 생성
	popup.fn_init_events(); // 이벤트 등록
	popup.fn_init(); // 화면 초기화
	
	}
);

popup.fn_init = function() {
	AUIGrid.resize(popup.cmitMberCareerHistSearch_gridID);
}

//AUIGrid 를 생성합니다.
popup.fn_createAUIGrid = function() {
	var columnLayout = [
		{
			dataField : "cmitKorNm",
			headerText : "위원회명"
		}, {
			dataField : "cdNm",
			headerText : "직책"
		}, {
			dataField : "tenureBgnDe",
			headerText : "임기시작일"
		}, {
			dataField : "tenureEndDe",
			headerText : "임기종료일"
		}, {
			dataField : "remark",
			headerText : "비고"
		}
	];

	var gridPros = {
		showRowNumColumn : true,
		showRowCheckColumn : false,

		headerHeight : 34,
		rowHeight : 34
	};


	fn_AUIGrid_create([{id:"grid_cmitMberCareerHistSearch", obj:[popup,"cmitMberCareerHistSearch_gridID"], layout:columnLayout , prop:gridPros}]);

}

popup.fn_init_resize_AUIGrid= function(){
	fn_AUIGrid_resize([{id:"grid_cmitMberCareerHistSearch",obj:popup.cmitMberCareerHistSearch_gridID}]);
	
}

popup.fn_init_events = function() {
	$("#cmitMberCareerHistSearch_commonClose").on("click", function(e){
		 $('#cmitMberCareerHistSearch').modal("hide");
	})

}

//회원팝업
popup.fn_popup_search = function(title, cpaId) {
	$("#cmitMberCareerHistSearch_title").text(title);
	
	var pop_searchList = {};
	pop_searchList.cpaId = cpaId;
	
	fn_ajax_call("/kicpa/selectCmitMberCareerHistSearch.do", pop_searchList, popup.selectList_success, popup.selectList_error);
	
}

//조회성공
popup.selectList_success = function(result){
	AUIGrid.setGridData(popup.cmitMberCareerHistSearch_gridID, result.docList);
	$('#cmitMberCareerHistSearch').modal();
}

//조회실패
popup.selectList_error = function(){
	
	
}