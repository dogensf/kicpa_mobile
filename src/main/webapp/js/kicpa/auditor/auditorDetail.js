var auditorDetail = auditorDetail || {}; // 문자메세지 전송 현황 namespace

auditorDetail.auditorDetail_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditorDetail.fn_init_resize_AUIGrid();
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

        auditorDetail.fn_createAUIGrid(); // AUGRID 생성
        auditorDetail.fn_init_events(); // 이벤트 등록
        auditorDetail.fn_init(); // 화면 초기화

    }
);




auditorDetail.fn_init = function() {
    $("#auditorDetail_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#auditorDetail_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditorDetail_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#auditorDetail_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
auditorDetail.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "관리모드"
    }, {
		dataField : "",
		headerText : "감사인명"
	}, {
		dataField : "",
		headerText : "감사인 구분"
	} , {
        dataField : "",
        headerText : "등록일"
    }, {
        dataField : "",
        headerText : "개업구분"
    } , {
        dataField : "",
        headerText : "해산사유"
    }, {
        dataField : "",
        headerText : "합병감사인"
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"auditorDetail_grid_wrap", obj:[auditorDetail,"auditorDetail_gridID"], layout:columnLayout , prop:gridPros}]);

}


auditorDetail.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"auditorDetail_grid_wrap",obj:auditorDetail.auditorDetail_gridID}]);

}

auditorDetail.fn_init_events = function() {

    // $('#auditorDetail_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}


// //테이블 초기화
// auditorDetail.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// auditorDetail.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var auditorDetail_SearchParam = {};
//
// 	auditorDetail_SearchParam.fromDd = fromDd;
// 	auditorDetail_SearchParam.toDd = toDd;
// 	auditorDetail_SearchParam.searchGubun = searchGubun;
// 	auditorDetail_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", auditorDetail_SearchParam, auditorDetail.selectDocList_success, auditorDetail.selectDocList_error);
// }
//
// auditorDetail.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(auditorDetail.auditorDetail_gridID, result.docList);
// 	$("#auditorDetail_TotalCnt").html(result.docListSize);
// }
//
// auditorDetail.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
