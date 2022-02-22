var itServiceList = itServiceList || {}; // 발송대장 namespace

itServiceList.itServiceList_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    	itServiceList.fn_init_resize_AUIGrid();
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

        itServiceList.fn_createAUIGrid(); // AUGRID 생성
        itServiceList.fn_init_events(); // 이벤트 등록
        itServiceList.fn_init(); // 화면 초기화

    }
);


itServiceList.fn_init = function() {
    $("#itServiceList_RquestDeptList").selectpicker({
        noneSelectedText:"전체"
    });
    
    $("#itServiceList_TrgetSysList").selectpicker({
        noneSelectedText:"전체"
    });
    
    $("#itServiceList_RqestTyList").selectpicker({
        noneSelectedText:"전체"
    });
    
    $("#itServiceList_MnangtSttus").selectpicker({
        noneSelectedText:"전체"
    });
    
    itServiceList.fn_search_docList("", "", "", "", "");   
}


//AUIGrid 를 생성합니다.
itServiceList.fn_createAUIGrid = function() {
    var columnLayout = [{
        dataField : "rqestNo",
        headerText : "No"
    }, {    
	    dataField : "itemCheck",
		headerText : "",
		width: 50,
		headerRenderer : {
			type : "CheckBoxHeaderRenderer",
			position : "bottom", // 기본값 "bottom",
			onClick : function(e) {
				myCheckboxHandler(e);
			}
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : 1,
			unCheckValue : 0,
			// 체크박스 disabled 함수
			disabledFunction : function(rowIndex, columnIndex, value, isChecked, item, dataField) {
				if(item.charge == "Anna")
					return true; // true 반환하면 disabled 시킴
				return false;
			}
		}
	}, {
        dataField : "dispRqestDd",
        headerText : "요청일자"
    }, {
        dataField : "dispRqestTreDd",
        headerText : "처리요청일자"
    }, {
        dataField : "dispTreDd",
        headerText : "조치일자"
    }, {
        dataField : "dispRgsDept",
        headerText : "요청부서"
    }, {
        dataField : "dispRgsSys",
        headerText : "대상시스템"
    }, {
        dataField : "dispRgsTy",
        headerText : "유형"
    }, {
        dataField : "disManagtSttus",
        headerText : "조치현황"
    }, {
        dataField : "rqestSubject",
        headerText : "요청사항"
    }, {
        dataField : "searchBtn",
        headerText : "조회",
		renderer : {
			type : "ButtonRenderer",
			labelText : "확인",
			onClick : function(event) {
				if(event.item.disManagtSttus == "접수"){
					var url = "/kicpa/itServiceCreate.do?rqestNo=" + event.item.rqestNo;
					addNewTab('itServiceCreate', url, '내용등록');
				} else{
					var url = "/kicpa/itServiceListDetail.do?rqestNo=" + event.item.rqestNo + "&pageId=itServiceList";
					addNewTab('itServiceListDetail', url, '내용조회');
				}
			}
		}
    }];

    var gridPros = {
        showRowNumColumn : false,

        showRowCheckColumn : false,
        
        enableDrag : true,
        enableDragByCellDrag : true,

		headerHeight : 34,
		rowHeight : 34,
		
		noDataMessage: "검색결과가 없습니다."
    };


     fn_AUIGrid_create([{id:"itServiceList_grid_wrap", obj:[itServiceList,"itServiceList_gridID"], layout:columnLayout , prop:gridPros}]);

}


itServiceList.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"itServiceList_grid_wrap",obj:itServiceList.itServiceList_gridID}]);

}

itServiceList.fn_init_events = function() {
	
	//요청추가
	$("#itServiceList_RqestAdd").on("click", function(e){
		var url = "/kicpa/itServiceCreate.do";
		addNewTab('itServiceCreate', url, '내용등록');
	});
	
	//테이블 초기화
	$("#itServiceList_Resert").on("click",function(e) {
		itServiceList.fn_page_init();
    });
	
	//삭제
	$("#itServiceList_RqestDelete").on("click",function(e) {
		var activeItems = AUIGrid.getItemsByValue(itServiceList.itServiceList_gridID, "itemCheck", 1);
		var len = activeItems.length;
		var deleteNum = "";
		
		for(var i = 0; i < len; i++) {
			if(i == 0){
				deleteNum = activeItems[i].rqestNo;
			} else{
				deleteNum = deleteNum + ", " + activeItems[i].rqestNo;
			}
		}
		
		var itServiceList_DeleteParam = {};
		itServiceList_DeleteParam.rqestNo = deleteNum;
    	
    	fn_ajax_call("/kicpa/deleteItServiceList.do", itServiceList_DeleteParam, itServiceList.deleteList_success, itServiceList.deleteList_error);
    	
    	return false;
    });
	
	//검색
	$("#itServiceList_Search").on("click", function(e){
		var itServiceList_RquestDeptList = $("#itServiceList_RquestDeptList").val();
		var itServiceList_TrgetSysList = $("#itServiceList_TrgetSysList").val();
		var itServiceList_RqestTyList = $("#itServiceList_RqestTyList").val();
		var itServiceList_MnangtSttus = $("#itServiceList_MnangtSttus").val();
		var itServiceList_Title = $("#itServiceList_Title").val();
		
		itServiceList.fn_search_docList(itServiceList_RquestDeptList, itServiceList_TrgetSysList, itServiceList_RqestTyList, itServiceList_MnangtSttus, itServiceList_Title);
		
		return false;
	});
}

//테이블 초기화
itServiceList.fn_page_init = function(){
	$("#itServiceList_RquestDeptList").find('option:first').prop('selected', true);
	$("#itServiceList_RquestDeptList").selectpicker("refresh");
	
	$("#itServiceList_TrgetSysList").find('option:first').prop('selected', true);
	$("#itServiceList_TrgetSysList").selectpicker("refresh");
	
	$("#itServiceList_RqestTyList").find('option:first').prop('selected', true);
	$("#itServiceList_RqestTyList").selectpicker("refresh");
	
	$("#itServiceList_MnangtSttus").find('option:first').prop('selected', true);
	$("#itServiceList_MnangtSttus").selectpicker("refresh");
	
	$("#itServiceList_Title").val("");
	
	itServiceList.fn_search_docList("", "", "", "", "");
}

//조회 이벤트
itServiceList.fn_search_docList = function(rqestDept, trgetSys, rqestTy, managtSttus, title){
	var itServiceList_SearchParam = {};
	
	itServiceList_SearchParam.rqestDept = rqestDept;
	itServiceList_SearchParam.trgetSys = trgetSys;
	itServiceList_SearchParam.rqestTy = rqestTy;
	itServiceList_SearchParam.managtSttus = managtSttus;
	itServiceList_SearchParam.title = title;

	fn_ajax_call("/kicpa/selectItServiceList.do", itServiceList_SearchParam, itServiceList.selectList_success, itServiceList.selectList_error);
	
	return false;
}

itServiceList.selectList_success = function(result) {
	AUIGrid.setGridData(itServiceList.itServiceList_gridID, result.docList);
}

itServiceList.selectList_error = function(xhr, status, error) {
	alert("실패");
}

itServiceList.deleteList_success = function(result) {
	itServiceList.fn_search_docList("", "", "", "", "");
}

itServiceList.deleteList_error = function(xhr, status, error) {
	alert("실패");
}