var auditorJoin = auditorJoin || {}; // 감사인 가입 namespace

auditorJoin.auditorJoin_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditorJoin.fn_init_resize_AUIGrid();
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

        auditorJoin.fn_createAUIGrid(); // AUGRID 생성
        auditorJoin.fn_init_events(); // 이벤트 등록
        auditorJoin.fn_init(); // 화면 초기화

    }
);




auditorJoin.fn_init = function() {
    $("#auditorJoin_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#auditorJoin_ChangeDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#auditorJoin_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
auditorJoin.fn_createAUIGrid = function() {

}


auditorJoin.fn_init_resize_AUIGrid= function(){

}

auditorJoin.fn_init_events = function() {

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
                closeTab('auditorJoin');

            } else if (result.dismiss === 'cancel') {

            }
        });
        return false;
    });
  /*  $('#auditorJoin_submit').on("click",function(e) {
        addNewTab('officeCreate', '/kicpa/officeCreate.do', '회계법인 사무소 등록');
    });
*/
}


// //테이블 초기화
// auditorJoin.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// auditorJoin.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var auditorJoin_SearchParam = {};
//
// 	auditorJoin_SearchParam.fromDd = fromDd;
// 	auditorJoin_SearchParam.toDd = toDd;
// 	auditorJoin_SearchParam.searchGubun = searchGubun;
// 	auditorJoin_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", auditorJoin_SearchParam, auditorJoin.selectDocList_success, auditorJoin.selectDocList_error);
// }
//
// auditorJoin.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(auditorJoin.auditorJoin_gridID, result.docList);
// 	$("#auditorJoin_TotalCnt").html(result.docListSize);
// }
//
// auditorJoin.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
