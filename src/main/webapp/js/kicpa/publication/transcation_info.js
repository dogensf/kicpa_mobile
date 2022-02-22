var transaction_info = transaction_info || {}; // 문자메세지 전송 namespace

transaction_info.transaction_info_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		transaction_info.fn_init_resize_AUIGrid();
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
	}catch(e){
	}
});

// 문자전송 ready 시
$(document).ready(
    function() {

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

        transaction_info.fn_createAUIGrid(); // AUGRID 생성
        transaction_info.fn_init_events(); // 이벤트 등록
        transaction_info.fn_init(); // 화면 초기화

    }
);




transaction_info.fn_init = function() {
    $("#transaction_info_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#transaction_info_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#transaction_info_StartDay2').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#transaction_info_StartDay3').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#transaction_info_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
transaction_info.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "이름"
    }, {
        dataField : "",
        headerText : "전화번호"
    }, {
		dataField : "",
		headerText : "수신거부"
	}, {
		dataField : "",
		headerText : "회원조회"
	}];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"transaction_info_grid_wrap", obj:[transaction_info,"transaction_info_gridID"], layout:columnLayout , prop:gridPros}]);

}


transaction_info.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"transaction_info_grid_wrap",obj:transaction_info.transaction_info_gridID}]);

}

transaction_info.fn_init_events = function() {

    // $('#transaction_info_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}

// //테이블 초기화
// transaction_info.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// transaction_info.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var transaction_info_SearchParam = {};
//
// 	transaction_info_SearchParam.fromDd = fromDd;
// 	transaction_info_SearchParam.toDd = toDd;
// 	transaction_info_SearchParam.searchGubun = searchGubun;
// 	transaction_info_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/auditor.do", transaction_info_SearchParam, transaction_info.auditor_success, transaction_info.selectDocList_error);
// }
//
// transaction_info.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(transaction_info.transaction_info_gridID, result.docList);
// 	$("#transaction_info_TotalCnt").html(result.docListSize);
// }
//
// transaction_info.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }

$(document).on('click', 'all_member', function (){
   alert("전체회원")
});