var auditorChange = auditorChange || {}; // 감사인 구성/구분 변경 namespace

auditorChange.auditorChange_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditorChange.fn_init_resize_AUIGrid();
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

        auditorChange.fn_createAUIGrid(); // AUGRID 생성
        auditorChange.fn_init_events(); // 이벤트 등록
        auditorChange.fn_init(); // 화면 초기화

    }
);




auditorChange.fn_init = function() {
    $("#auditorChange_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#auditorChange_ChangeDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#auditorChange_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
auditorChange.fn_createAUIGrid = function() {

}


auditorChange.fn_init_resize_AUIGrid= function(){

}

auditorChange.fn_init_events = function() {

    //목록으로 클릭
    $("#auditorList").on("click",function(e) {

        var sTitle = "알림메세지";

        swal.fire({
            title: '',
            text: "등록하신 정보는 삭제됩니다.\n 취소하시겠습니까?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
            reverseButtons: true
        }).then(function(result){
            if (result.value) {
                closeTab('auditorChange');

            } else if (result.dismiss === 'cancel') {

            }
        });
        return false;
    });
}


// //테이블 초기화
// auditorChange.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// auditorChange.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var auditorChange_SearchParam = {};
//
// 	auditorChange_SearchParam.fromDd = fromDd;
// 	auditorChange_SearchParam.toDd = toDd;
// 	auditorChange_SearchParam.searchGubun = searchGubun;
// 	auditorChange_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", auditorChange_SearchParam, auditorChange.selectDocList_success, auditorChange.selectDocList_error);
// }
//
// auditorChange.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(auditorChange.auditorChange_gridID, result.docList);
// 	$("#auditorChange_TotalCnt").html(result.docListSize);
// }
//
// auditorChange.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
