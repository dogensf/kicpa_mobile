var receive_data = receive_data || {}; // 문자메세지 전송 namespace

receive_data.receive_data_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		receive_data.fn_init_resize_AUIGrid();
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

        receive_data.fn_createAUIGrid(); // AUGRID 생성
        receive_data.fn_init_events(); // 이벤트 등록
        receive_data.fn_init(); // 화면 초기화

    }
);




receive_data.fn_init = function() {
    $("#receive_data_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#receive_data_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#receive_data_StartDay2').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#receive_data_StartDay3').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#receive_data_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
receive_data.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "입고일"
    }, {
        dataField : "",
        headerText : "서적구분"
    }, {
		dataField : "",
		headerText : "처리구분"
	}, {
		dataField : "",
		headerText : "부수"
	}, {
        dataField : "",
        headerText : "부수폐기"
    }, {
        dataField : "",
        headerText : "비고"
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"receive_data_grid_wrap", obj:[receive_data,"receive_data_gridID"], layout:columnLayout , prop:gridPros}]);

}


receive_data.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"receive_data_grid_wrap",obj:receive_data.receive_data_gridID}]);

}

receive_data.fn_init_events = function() {

    // $('#receive_data_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}

// //테이블 초기화
// receive_data.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// receive_data.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var receive_data_SearchParam = {};
//
// 	receive_data_SearchParam.fromDd = fromDd;
// 	receive_data_SearchParam.toDd = toDd;
// 	receive_data_SearchParam.searchGubun = searchGubun;
// 	receive_data_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/auditor.do", receive_data_SearchParam, receive_data.auditor_success, receive_data.selectDocList_error);
// }
//
// receive_data.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(receive_data.receive_data_gridID, result.docList);
// 	$("#receive_data_TotalCnt").html(result.docListSize);
// }
//
// receive_data.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }

$(document).on('click', 'all_member', function (){
   alert("전체회원")
});