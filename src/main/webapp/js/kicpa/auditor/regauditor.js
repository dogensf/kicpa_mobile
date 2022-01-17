var regauditor = regauditor || {}; // 문자메세지 전송 현황 namespace

regauditor.regauditor_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		regauditor.fn_init_resize_AUIGrid();
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

        regauditor.fn_createAUIGrid(); // AUGRID 생성
        regauditor.fn_init_events(); // 이벤트 등록
        regauditor.fn_init(); // 화면 초기화

    }
);




regauditor.fn_init = function() {
    $("#regauditor_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#regauditor_ChangeDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#regauditor_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#regauditor_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
regauditor.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "관리모드"
    }, {
		dataField : "",
		headerText : "구분"
	}, {
        dataField : "",
        headerText : "등록일"
    }, {
        dataField : "",
        headerText : "개업구분"
    } , {
        dataField : "",
        headerText : "주소"
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"regauditor_grid_wrap", obj:[regauditor,"regauditor_gridID"], layout:columnLayout , prop:gridPros}]);

}


regauditor.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"regauditor_grid_wrap",obj:regauditor.regauditor_gridID}]);

}

regauditor.fn_init_events = function() {

    $('#regauditor_submit').on("click",function(e) {
        addNewTab('officeCreate', '/kicpa/officeCreate.do', '회계법인 사무소 등록');
    });

}


// //테이블 초기화
// regauditor.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// regauditor.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var regauditor_SearchParam = {};
//
// 	regauditor_SearchParam.fromDd = fromDd;
// 	regauditor_SearchParam.toDd = toDd;
// 	regauditor_SearchParam.searchGubun = searchGubun;
// 	regauditor_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", regauditor_SearchParam, regauditor.selectDocList_success, regauditor.selectDocList_error);
// }
//
// regauditor.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(regauditor.regauditor_gridID, result.docList);
// 	$("#regauditor_TotalCnt").html(result.docListSize);
// }
//
// regauditor.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
