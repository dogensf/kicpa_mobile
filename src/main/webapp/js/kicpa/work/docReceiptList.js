var docReceiptList = docReceiptList || {}; // 접수대장 namespace

docReceiptList.docReceiptList_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    	docReceiptList.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

    	docReceiptList.fn_createAUIGrid(); // AUGRID 생성
    	docReceiptList.fn_init_events(); // 이벤트 등록
    	docReceiptList.fn_init(); // 화면 초기화

    }
);

docReceiptList.fn_init = function() {
    $("#docReceiptList_SearchGubun").selectpicker({
        noneSelectedText:"전체"
    });


    $('#docReceiptList_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#docReceiptList_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    
    docReceiptList.fn_search_docList("", "", "", "");



}


//AUIGrid 를 생성합니다.
docReceiptList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "dispNo",
        headerText : "No"
    }, {
        dataField : "dispDocNo",
        headerText : "접수번호"
    }, {
        dataField : "dispSendDd",
        headerText : "접수일"
    }, {
        dataField : "dispModDd",
        headerText : "수정일"
    }, {
        dataField : "subject",
        headerText : "제목"
    }, {
        dataField : "sender",
        headerText : "발신처"
    }, {
        dataField : "senderUserNm",
        headerText : "접수자"
    }, {
        dataField : "remark",
        headerText : "비고"
    }, {
        dataField : "modifyYn",
        headerText : "수정",
		renderer : {
			type : "ButtonRenderer",
			labelText : "수정",
			onClick : function(event) {
				var url = "/kicpa/docReceiptNumIssu.do?year=" + event.item.year + "&docReceiptNo=" + event.item.docReceiptNo + "&docReceiptFlagNo=" + event.item.docReceiptFlagNo;
				closeTab('docReceiptNumIssu');
				addNewTab('docReceiptNumIssu', url, '문서접수/수정');
			},
			visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
				if(item.modifyYn == "Y") {
		              return true;
		        }
		        return false;
			}
		}
    }];

    var gridPros = {
        showRowNumColumn : false,

        showRowCheckColumn : false,

        headerHeight : 34,
		rowHeight : 34,
		
		noDataMessage: "검색결과가 없습니다."
    };


    fn_AUIGrid_create([{id:"docReceiptList_grid_wrap", obj:[docReceiptList,"docReceiptList_gridID"], layout:columnLayout , prop:gridPros}]);



}


docReceiptList.fn_init_resize_AUIGrid= function(){
	fn_AUIGrid_resize([{id:"docReceiptList_grid_wrap",obj:docReceiptList.docReceiptList_gridID}]);

}

docReceiptList.fn_init_events = function() {
	$("#docReceiptList_NoGet").on("click",function(e) {
    	addNewTab('docReceiptNumIssu', '/kicpa/docReceiptNumIssu.do', '문서접수/수정');
    });
	
	//검색 버튼 이벤트
    $("#docReceiptList_Search").on("click",function(e) {    	
    	var docReceiptList_FromDd = $('#docReceiptList_StartDay').val().replaceAll("-", ""); //시작일
    	var docReceiptList_ToDd = $('#docReceiptList_EndDay').val().replaceAll("-", ""); //종료일
    	
    	var docReceiptList_SearchGubun = $('#docReceiptList_SearchGubun').val(); //검색구분
    	var docReceiptList_SearchText = $('#docReceiptList_SearchText').val(); //검색어

    	//시행일 시작일만 입력한 경우 
    	if(docReceiptList_FromDd != "" && docReceiptList_ToDd == ""){
    		alertMessage("시작일과 종료일을 선택하세요.","","error");
    		return false;
    		
    	} 
    	
    	//종료일이 시작일 보다 느린경우
    	if(docReceiptList_FromDd > docReceiptList_ToDd){
    		alertMessage("종료일은 시작일 이후만 가능합니다.","","error");
    		return false;
    		
    	}
    	
    	//시행일 미입력, 텍스트 필드 미입력 상태에서 선택 시 alert
    	if(docReceiptList_FromDd == "" && docReceiptList_ToDd == "" && docReceiptList_SearchText == ""){
    		alertMessage("검색조건이 없습니다.","","error");
    		return false;
    		
    	}
    	
    	if ( docReceiptList_SearchGubun == "접수번호" ) {
    		docReceiptList_SearchGubun = "docno";
    		
    	} else if ( docReceiptList_SearchGubun == "제목" ) {
    		docReceiptList_SearchGubun = "subject";
    		
    	} else {
    		docReceiptList_SearchGubun = "";
    		
    	}
    	
    	docReceiptList.fn_search_docList(docReceiptList_FromDd, docReceiptList_ToDd, docReceiptList_SearchGubun, docReceiptList_SearchText);
    	
    	//조회 후 탭 닫히는 것에 대한 방어코드
    	return false;
    });
    
    $("#docReceiptList_Resert").on("click",function(e) {
    	docReceiptList.fn_page_init();
    });
}

//테이블 초기화
docReceiptList.fn_page_init = function(){
	$("#docReceiptList_StartDay").val("");
	$("#docReceiptList_EndDay").val("");
	$("#docReceiptList_SearchText").val("");
	
	$("#docReceiptList_SearchGubun option:eq(0)").prop('selected', true);
	$("#docReceiptList_SearchGubun").selectpicker("refresh");
	
	docReceiptList.fn_search_docList("", "", "", "");


	return false;
}

//조회 이벤트
docReceiptList.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
	var docReceiptList_SearchParam = {};
	
	docReceiptList_SearchParam.fromDd = fromDd;
	docReceiptList_SearchParam.toDd = toDd;
	docReceiptList_SearchParam.searchGubun = searchGubun;
	docReceiptList_SearchParam.searchText = searchText;

	fn_ajax_call("/kicpa/selectDocReceiptList.do", docReceiptList_SearchParam, docReceiptList.selectDocList_success, docReceiptList.selectDocList_error);
}

docReceiptList.selectDocList_success = function(result) {
	AUIGrid.setGridData(docReceiptList.docReceiptList_gridID, result.docList);	
	$("#docReceiptList_TotalCnt").html(result.docListSize);

}

docReceiptList.selectDocList_error = function(xhr, status, error) {
	alert("실패");
}