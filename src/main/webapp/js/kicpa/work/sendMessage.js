var sendMessage = sendMessage || {}; // 문자메세지 전송 namespace

sendMessage.sendMessage_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		sendMessage.fn_init_resize_AUIGrid();
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

        sendMessage.fn_createAUIGrid(); // AUGRID 생성
        sendMessage.fn_init_events(); // 이벤트 등록
        sendMessage.fn_init(); // 화면 초기화

    }
);




sendMessage.fn_init = function() {
    $("#sendMessage_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#sendMessage_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#sendMessage_StartDay2').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#sendMessage_StartDay3').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#sendMessage_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
sendMessage.fn_createAUIGrid = function() {

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


     fn_AUIGrid_create([{id:"sendMessage_grid_wrap", obj:[sendMessage,"sendMessage_gridID"], layout:columnLayout , prop:gridPros}]);

}


sendMessage.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"sendMessage_grid_wrap",obj:sendMessage.sendMessage_gridID}]);

}

sendMessage.fn_init_events = function() {

    // $('#sendMessage_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}

// //테이블 초기화
// sendMessage.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// sendMessage.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var sendMessage_SearchParam = {};
//
// 	sendMessage_SearchParam.fromDd = fromDd;
// 	sendMessage_SearchParam.toDd = toDd;
// 	sendMessage_SearchParam.searchGubun = searchGubun;
// 	sendMessage_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", sendMessage_SearchParam, sendMessage.selectDocList_success, sendMessage.selectDocList_error);
// }
//
// sendMessage.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(sendMessage.sendMessage_gridID, result.docList);
// 	$("#sendMessage_TotalCnt").html(result.docListSize);
// }
//
// sendMessage.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }

$(document).on('click', 'all_member', function (){
   alert("전체회원")
});