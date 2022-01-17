var auditorList = auditorList || {}; // 문자메세지 전송 현황 namespace

auditorList.auditorList_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditorList.fn_init_resize_AUIGrid();
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

        auditorList.fn_createAUIGrid(); // AUGRID 생성
        auditorList.fn_init_events(); // 이벤트 등록
        auditorList.fn_init(); // 화면 초기화

    }
);




auditorList.fn_init = function() {
    $("#auditorList_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#auditorList_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditorList_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#auditorList_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
auditorList.fn_createAUIGrid = function() {

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


     fn_AUIGrid_create([{id:"auditorList_grid_wrap", obj:[auditorList,"auditorList_gridID"], layout:columnLayout , prop:gridPros}]);

}


auditorList.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"auditorList_grid_wrap",obj:auditorList.auditorList_gridID}]);

}

auditorList.fn_init_events = function() {


    // $('#auditorList_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}


// //테이블 초기화
// auditorList.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// auditorList.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var auditorList_SearchParam = {};
//
// 	auditorList_SearchParam.fromDd = fromDd;
// 	auditorList_SearchParam.toDd = toDd;
// 	auditorList_SearchParam.searchGubun = searchGubun;
// 	auditorList_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", auditorList_SearchParam, auditorList.selectDocList_success, auditorList.selectDocList_error);
// }
//
// auditorList.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(auditorList.auditorList_gridID, result.docList);
// 	$("#auditorList_TotalCnt").html(result.docListSize);
// }
//
// auditorList.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
