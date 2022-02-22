var auditorWithdrawal = auditorWithdrawal || {}; // 감사인 탈퇴 namespace

auditorWithdrawal.auditorWithdrawal_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditorWithdrawal.fn_init_resize_AUIGrid();
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

        auditorWithdrawal.fn_createAUIGrid(); // AUGRID 생성
        auditorWithdrawal.fn_init_events(); // 이벤트 등록
        auditorWithdrawal.fn_init(); // 화면 초기화

    }
);




auditorWithdrawal.fn_init = function() {
    $("#auditorWithdrawal_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#auditorWithdrawal_ChangeDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#auditorWithdrawal_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
auditorWithdrawal.fn_createAUIGrid = function() {

}


auditorWithdrawal.fn_init_resize_AUIGrid= function(){

}

auditorWithdrawal.fn_init_events = function() {

    //닫기 클릭
    $("#auditorWithdrawal_Close").on("click",function(e) {

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
                closeTab('auditorWithdrawal');

            } else if (result.dismiss === 'cancel') {

            }
        });
        return false;
    });

    /*  $('#auditorWithdrawal_submit').on("click",function(e) {
          addNewTab('officeCreate', '/kicpa/officeCreate.do', '회계법인 사무소 등록');
      });
  */
}


// //테이블 초기화
// auditorWithdrawal.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// auditorWithdrawal.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var auditorWithdrawal_SearchParam = {};
//
// 	auditorWithdrawal_SearchParam.fromDd = fromDd;
// 	auditorWithdrawal_SearchParam.toDd = toDd;
// 	auditorWithdrawal_SearchParam.searchGubun = searchGubun;
// 	auditorWithdrawal_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/selectDocList.do", auditorWithdrawal_SearchParam, auditorWithdrawal.selectDocList_success, auditorWithdrawal.selectDocList_error);
// }
//
// auditorWithdrawal.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(auditorWithdrawal.auditorWithdrawal_gridID, result.docList);
// 	$("#auditorWithdrawal_TotalCnt").html(result.docListSize);
// }
//
// auditorWithdrawal.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }
