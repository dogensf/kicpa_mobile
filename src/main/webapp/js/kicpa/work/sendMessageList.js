var sendMessageList = sendMessageList || {}; // 문자메세지 전송 현황 namespace

sendMessageList.sendMessageList_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		sendMessageList.fn_init_resize_AUIGrid();
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

        sendMessageList.fn_createAUIGrid(); // AUGRID 생성
        sendMessageList.fn_init_events(); // 이벤트 등록
        sendMessageList.fn_init(); // 화면 초기화

    }
);




sendMessageList.fn_init = function() {
    $("#sendMessageList_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#sendMessageList_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#sendMessageList_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#sendMessageList_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
sendMessageList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "발신번호"
    }, {
        dataField : "",
        headerText : "발송 회원수"
    }, {
		dataField : "",
		headerText : "첨부파일"
	}, {
		dataField : "",
		headerText : "제목"
	} , {
        dataField : "",
        headerText : "조회"
    }, {
        dataField : "",
        headerText : "발송시간"
    } , {
        dataField : "",
        headerText : "완료시간"
    }, {
        dataField : "",
        headerText : "발송자"
    }, {
        dataField : "",
        headerText : "결과"
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"sendMessageList_grid_wrap", obj:[sendMessageList,"sendMessageList_gridID"], layout:columnLayout , prop:gridPros}]);

}


sendMessageList.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"sendMessageList_grid_wrap",obj:sendMessageList.sendMessageList_gridID}]);

}

sendMessageList.fn_init_events = function() {

    // $('#sendMessageList_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}


// //테이블 초기화
// sendMessageList.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// sendMessageList.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var sendMessageList_SearchParam = {};
//
// 	sendMessageList_SearchParam.fromDd = fromDd;
// 	sendMessageList_SearchParam.toDd = toDd;
// 	sendMessageList_SearchParam.searchGubun = searchGubun;
// 	sendMessageList_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", sendMessageList_SearchParam, sendMessageList.selectDocList_success, sendMessageList.selectDocList_error);
// }
//
// sendMessageList.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(sendMessageList.sendMessageList_gridID, result.docList);
// 	$("#sendMessageList_TotalCnt").html(result.docListSize);
// }
//
// sendMessageList.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
