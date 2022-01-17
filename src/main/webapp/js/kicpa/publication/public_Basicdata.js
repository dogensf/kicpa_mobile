var public_Basicdata = public_Basicdata || {}; // 문자메세지 전송 namespace

public_Basicdata.public_Basicdata_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		public_Basicdata.fn_init_resize_AUIGrid();
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

        public_Basicdata.fn_createAUIGrid(); // AUGRID 생성
        public_Basicdata.fn_init_events(); // 이벤트 등록
        public_Basicdata.fn_init(); // 화면 초기화

    }
);




public_Basicdata.fn_init = function() {
    $("#public_Basicdata_SearchGubun").selectpicker({
       noneSelectedText:"전체"
     });

    $('#public_Basicdata_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#public_Basicdata_StartDay2').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#public_Basicdata_StartDay3').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

   // $("#public_Basicdata_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
public_Basicdata.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "",
        headerText : "출판물코드"
    }, {
        dataField : "",
        headerText : "출판물명"
    }, {
		dataField : "",
		headerText : "회원단가"
	}, {
		dataField : "",
		headerText : "일반단가"
	}, {
        dataField : "",
        headerText : "ERP자동연동"
    }, {
        dataField : "",
        headerText : "ERP연동 회계구분"
    }, {
        dataField : "",
        headerText : "ERP연동 계정코드"
    }, {
        dataField : "",
        headerText : "ERP연동 관리항목"
    }, {
        dataField : "",
        headerText : "출간예정일"
    }, {
        dataField : "",
        headerText : "등록일자"
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : false,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"public_Basicdata_grid_wrap", obj:[public_Basicdata,"public_Basicdata_gridID"], layout:columnLayout , prop:gridPros}]);

}


public_Basicdata.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"public_Basicdata_grid_wrap",obj:public_Basicdata.public_Basicdata_gridID}]);

}

public_Basicdata.fn_init_events = function() {

    // $('#public_Basicdata_NoGet').on("click",function(e) {
    // 	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    // });

}

// //테이블 초기화
// public_Basicdata.fn_page_init = function(type){
//
//
// }
//
// //조회 이벤트
// public_Basicdata.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
// 	var public_Basicdata_SearchParam = {};
//
// 	public_Basicdata_SearchParam.fromDd = fromDd;
// 	public_Basicdata_SearchParam.toDd = toDd;
// 	public_Basicdata_SearchParam.searchGubun = searchGubun;
// 	public_Basicdata_SearchParam.searchText = searchText;
//
// 	fn_ajax_call("/kicpa/auditor.do", public_Basicdata_SearchParam, public_Basicdata.auditor_success, public_Basicdata.selectDocList_error);
// }
//
// public_Basicdata.selectDocList_success = function(result) {
// 	AUIGrid.setGridData(public_Basicdata.public_Basicdata_gridID, result.docList);
// 	$("#public_Basicdata_TotalCnt").html(result.docListSize);
// }
//
// public_Basicdata.selectDocList_error = function(xhr, status, error) {
// 	alert("실패");
// }

$(document).on('click', 'all_member', function (){
   alert("전체회원")
});