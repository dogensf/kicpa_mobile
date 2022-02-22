var joinwithdrawal = joinwithdrawal || {}; // 문자메세지 전송 현황 namespace

joinwithdrawal.joinwithdrawal_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		joinwithdrawal.fn_init_resize_AUIGrid();
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

        joinwithdrawal.fn_createAUIGrid(); // AUGRID 생성
        joinwithdrawal.fn_init_events(); // 이벤트 등록
        joinwithdrawal.fn_init(); // 화면 초기화

    }
);




joinwithdrawal.fn_init = function() {
    $("#joinwithdrawal_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#joinwithdrawal_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#joinwithdrawal_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#joinwithdrawal_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
joinwithdrawal.fn_createAUIGrid = function() {

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


     fn_AUIGrid_create([{id:"joinwithdrawal_grid_wrap", obj:[joinwithdrawal,"joinwithdrawal_gridID"], layout:columnLayout , prop:gridPros}]);

}


joinwithdrawal.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"joinwithdrawal_grid_wrap",obj:joinwithdrawal.joinwithdrawal_gridID}]);

}

joinwithdrawal.fn_init_events = function() {

    $('#auditorChange').on("click",function(e) {
     	addNewTab('auditorChange', '/kicpa/auditorChange.do', '감사인 구성/구분 변경');
     });

    $('#auditorJoin').on("click",function(e) {
        addNewTab('auditorJoin', '/kicpa/auditorJoin.do', '감사인 가입');
    });

    $('#auditorWithdrawal').on("click",function(e) {
        addNewTab('auditorWithdrawal', '/kicpa/auditorWithdrawal.do', '감사인 탈퇴');
    });


}


// //테이블 초기화
// joinwithdrawal.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// joinwithdrawal.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var joinwithdrawal_SearchParam = {};
//
// 	joinwithdrawal_SearchParam.fromDd = fromDd;
// 	joinwithdrawal_SearchParam.toDd = toDd;
// 	joinwithdrawal_SearchParam.searchGubun = searchGubun;
// 	joinwithdrawal_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", joinwithdrawal_SearchParam, joinwithdrawal.selectDocList_success, joinwithdrawal.selectDocList_error);
// }
//
// joinwithdrawal.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(joinwithdrawal.joinwithdrawal_gridID, result.docList);
// 	$("#joinwithdrawal_TotalCnt").html(result.docListSize);
// }
//
// joinwithdrawal.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
