var docSendList = docSendList || {}; // 발송대장 namespace

docSendList.docSendList_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        docSendList.fn_init_resize_AUIGrid();
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

        docSendList.fn_createAUIGrid(); // AUGRID 생성
        docSendList.fn_init_events(); // 이벤트 등록
        docSendList.fn_init(); // 화면 초기화

    }
);


docSendList.fn_init = function() {
    $("#docSendList_SearchGubun").selectpicker({
        noneSelectedText:"전체"
    });

    $('#docSendList_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#docSendList_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    
    docSendList.fn_search_docList("", "", "", "");
    
   // $("#docSendList_modal_temp").modal();
    
    //$("#docSendList_StartDay").datepicker( "setDate", "1900-01-01"); // 셋팅 필요
    //$("#docSendList_EndDay").datepicker( "setDate", getCurrentDate().toDate().getDateFormat("YYYY-MM-DD"));

}


//AUIGrid 를 생성합니다.
docSendList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "dispNo",
        headerText : "No"
    }, {
        dataField : "dispDocNo",
        headerText : "문서번호"
    }, {
        dataField : "dispSendDd",
        headerText : "시행일"
    }, {
        dataField : "dispModDd",
        headerText : "수정일"
    }, {
        dataField : "subject",
        headerText : "제목"
    }, {
        dataField : "receipt",
        headerText : "수신처"
    }, {
        dataField : "inputUserNm",
        headerText : "담당자"
    }, {
        dataField : "modifyYn",
        headerText : "수정",
		renderer : {
			type : "ButtonRenderer",
			labelText : "수정",
			onClick : function(event) {
				var url = "/kicpa/docSendNumIssu.do?year=" + event.item.year + "&docSendNo=" + event.item.docSendNo + "&docSendFlagNo=" + event.item.docSendFlagNo;
                closeTab('docSendNumIssu');
				addNewTab('docSendNumIssu', url, '번호발급/수정');
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


     fn_AUIGrid_create([{id:"docSendList_grid_wrap", obj:[docSendList,"docSendList_gridID"], layout:columnLayout , prop:gridPros}]);

}


docSendList.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"docSendList_grid_wrap",obj:docSendList.docSendList_gridID}]);

}

docSendList.fn_init_events = function() {
    $('#docSendList_NoGet').on("click",function(e) {
    	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    });
 	  
    //검색 버튼 이벤트
    $("#docSendList_Search").on("click",function(e) {    	
    	var docSendList_FromDd = $('#docSendList_StartDay').val().replaceAll("-", ""); //시작일
    	var docSendList_ToDd = $('#docSendList_EndDay').val().replaceAll("-", ""); //종료일
    	
    	var docSendList_SearchGubun = $('#docSendList_SearchGubun').val(); //검색구분
    	var docSendList_SearchText = $('#docSendList_SearchText').val(); //검색어

    	//시행일 시작일만 입력한 경우 
    	if(docSendList_FromDd != "" && docSendList_ToDd == ""){
    		alertMessage("시작일과 종료일을 선택하세요.","","error");
    		return false;
    		
    	} 
    	
    	//종료일이 시작일 보다 느린경우
    	if(docSendList_FromDd > docSendList_ToDd){
    		alertMessage("종료일은 시작일 이후만 가능합니다.","","error");
    		return false;
    		
    	}
    	
    	//시행일 미입력, 텍스트 필드 미입력 상태에서 선택 시 alert
    	if(docSendList_FromDd == "" && docSendList_ToDd == "" && docSendList_SearchText == ""){
    		alertMessage("검색조건이 없습니다.","","error");
    		return false;
    		
    	}
    	
    	if ( docSendList_SearchGubun == "문서번호" ) {
    		docSendList_SearchGubun = "docno";
    		
    	} else if ( docSendList_SearchGubun == "제목" ) {
    		docSendList_SearchGubun = "subject";
    		
    	} else {
    		docSendList_SearchGubun = "";
    		
    	}
    	
    	docSendList.fn_search_docList(docSendList_FromDd, docSendList_ToDd, docSendList_SearchGubun, docSendList_SearchText);
    	
    	//조회 후 탭 닫히는 것에 대한 방어코드
    	return false;
    });
    
    $("#docSendList_Resert").on("click",function(e) {
    	docSendList.fn_page_init();
    });
    
    $("#docSendList_Modal_Close").on("click", function(e){
    	$("#docSendList_modal_temp").modal("hide");
    });
}

//테이블 초기화
docSendList.fn_page_init = function(type){
		
	$("#docSendList_StartDay").val("");
	$("#docSendList_EndDay").val("");
	$("#docSendList_SearchText").val("");
	
	$("#docSendList_SearchGubun option:eq(0)").prop('selected', true);
	$("#docSendList_SearchGubun").selectpicker("refresh");
	
	docSendList.fn_search_docList("", "", "", "");
	return false;
}

//조회 이벤트
docSendList.fn_search_docList = function(fromDd, toDd, searchGubun, searchText){
	var docSendList_SearchParam = {};
	
	docSendList_SearchParam.fromDd = fromDd;
	docSendList_SearchParam.toDd = toDd;
	docSendList_SearchParam.searchGubun = searchGubun;
	docSendList_SearchParam.searchText = searchText;

	fn_ajax_call("/kicpa/selectDocList.do", docSendList_SearchParam, docSendList.selectDocList_success, docSendList.selectDocList_error);
}

docSendList.selectDocList_success = function(result) {
	AUIGrid.setGridData(docSendList.docSendList_gridID, result.docList);
	$("#docSendList_TotalCnt").html(result.docListSize);
}

docSendList.selectDocList_error = function(xhr, status, error) {
	alert("실패");
}
