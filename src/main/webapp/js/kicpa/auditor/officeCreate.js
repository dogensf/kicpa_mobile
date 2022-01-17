var officeCreate = officeCreate || {}; // 문자메세지 전송 현황 namespace

officeCreate.officeCreate_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		officeCreate.fn_init_resize_AUIGrid();
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

        officeCreate.fn_createAUIGrid(); // AUGRID 생성
        officeCreate.fn_init_events(); // 이벤트 등록
        officeCreate.fn_init(); // 화면 초기화

    }
);




officeCreate.fn_init = function() {
    $("#officeCreate_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#officeCreate_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#officeCreate_ChangeDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#officeCreate_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });



   // $("#officeCreate_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
officeCreate.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "성명"
    }, {
		dataField : "",
		headerText : "직책"
	}, {
		dataField : "",
		headerText : "유선전화"
	} , {
        dataField : "",
        headerText : "휴대전화"
    }, {
        dataField : "",
        headerText : "전자이메일"
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"officeCreate_grid_wrap", obj:[officeCreate,"officeCreate_gridID"], layout:columnLayout , prop:gridPros}]);

}


officeCreate.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"officeCreate_grid_wrap",obj:officeCreate.officeCreate_gridID}]);

}

officeCreate.fn_init_events = function() {

    // $('#officeCreate_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}


// //테이블 초기화
// officeCreate.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// officeCreate.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var officeCreate_SearchParam = {};
//
// 	officeCreate_SearchParam.fromDd = fromDd;
// 	officeCreate_SearchParam.toDd = toDd;
// 	officeCreate_SearchParam.searchGubun = searchGubun;
// 	officeCreate_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", officeCreate_SearchParam, officeCreate.selectDocList_success, officeCreate.selectDocList_error);
// }
//
// officeCreate.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(officeCreate.officeCreate_gridID, result.docList);
// 	$("#officeCreate_TotalCnt").html(result.docListSize);
// }
//
// officeCreate.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
