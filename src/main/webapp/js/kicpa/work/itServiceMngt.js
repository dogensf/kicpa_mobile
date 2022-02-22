var itServiceMngt = itServiceMngt || {}; // 발송대장 namespace

itServiceMngt.itServiceMngt_ReqType_grid_wrap = null;
itServiceMngt.itServiceMngt_TargetSys_grid_wrap = null;
itServiceMngt.itServiceMngt_Dept_grid_wrap = null;

$(window).resize(function(){
    try{
    	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        fn_AUIGrid_resize([{id:"itServiceMngt_ReqType_grid_wrap",obj:itServiceMngt.itServiceMngt_ReqType_grid_wrap }
            ,{id:"itServiceMngt_TargetSys_grid_wrap",obj:itServiceMngt.itServiceMngt_TargetSys_grid_wrap}
            ,{id:"itServiceMngt_Dept_grid_wrap",obj:itServiceMngt.itServiceMngt_Dept_grid_wrap}]);
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

        itServiceMngt.fn_createAUIGrid(); // AUGRID 생성
        itServiceMngt.fn_init_events(); // 이벤트 등록
        itServiceMngt.fn_init(); // 화면 초기화

    }
);


itServiceMngt.fn_init = function() {   
	//그리드초기화
	itServiceMngt.fn_init_GridList();
}


//AUIGrid 를 생성합니다.
itServiceMngt.fn_createAUIGrid = function() {
    var reqType_columnLayout = [{
        dataField : "disNo",
        headerText : "No",
        width: 100,
        visible : false	
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
        dataField : "rgsDe",
        headerText : "등록일",
        width: 150,
        editable : false
    }, {
        dataField : "expsrYn",
		headerText : "노출여부",
		width: 100,
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
        dataField : "rgsCn",
        headerText : "내용"
    }, {
    	dataField : "rgsSe",
        headerText : "코드그룹대분류",
        visible : false
    }, {
    	dataField : "rgsSn",
        headerText : "코드그룹순서",
        visible : false
    }];
    
    var targetSys_columnLayout = [{
        dataField : "disNo",
        headerText : "No",
        width: 100,
        visible : false	
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
        dataField : "rgsDe",
        headerText : "등록일",
        width: 150,
        editable : false
    }, {
        dataField : "expsrYn",
		headerText : "노출여부",
		width: 100,
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
        dataField : "rgsCn",
        headerText : "내용"
    }, {
    	dataField : "rgsSe",
        headerText : "코드그룹대분류",
        visible : false
    }, {
    	dataField : "rgsSn",
        headerText : "코드그룹순서",
        visible : false
    }];
    
    var dept_columnLayout = [{
        dataField : "disNo",
        headerText : "No",
        width: 100
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
        dataField : "rgsDe",
        headerText : "등록일",
        width: 150,
        editable : false
    }, {
        dataField : "expsrYn",
		headerText : "노출여부",
		width: 100,
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
        dataField : "rgsCn",
        headerText : "내용"
    }, {
    	dataField : "rgsSe",
        headerText : "코드그룹대분류",
        visible : false
    }, {
    	dataField : "rgsSn",
        headerText : "코드그룹순서",
        visible : false
    }];
    
    var gridPros = {
        showRowNumColumn : false,

        showRowCheckColumn : false,
        
        enableDrag : true,
        enableDragByCellDrag : true,

		headerHeight : 34,
		rowHeight : 34,
		
		editable : true,
		
		showRowNumColumn : true,
		showStateColumn : true
    };

    fn_AUIGrid_create([{id:"itServiceMngt_ReqType_grid_wrap", obj:[itServiceMngt,"itServiceMngt_ReqType_grid_wrap"], layout:reqType_columnLayout , prop:gridPros}
    , {id:"itServiceMngt_TargetSys_grid_wrap", obj:[itServiceMngt,"itServiceMngt_TargetSys_grid_wrap"], layout:targetSys_columnLayout , prop:gridPros}
    , {id:"itServiceMngt_Dept_grid_wrap", obj:[itServiceMngt,"itServiceMngt_Dept_grid_wrap"], layout:dept_columnLayout , prop:gridPros}]);

}

itServiceMngt.fn_init_events = function() {
	//요청유형 저장
	$("#itServiceMngt_ReqType_Save").on("click", function(e){
		itServiceMngt.fn_gridSaveEvent("reqType");
		
		return false;
	});
	
	//대상시스템 저장
	$("#itServiceMngt_TargetSys_Save").on("click", function(e){
		itServiceMngt.fn_gridSaveEvent("targetSys");
		
		return false;
	});
	
	//요청유형 추가
	$("#itServiceMngt_ReqType_Add").on("click", function(e){
		itServiceMngt.fn_gridAddEvent("reqType");
		
		return false;
	});
	
	//대상시스템 추가
	$("#itServiceMngt_TargetSys_Add").on("click", function(e){
		itServiceMngt.fn_gridAddEvent("targetSys");
		
		return false;
	});
}

//조회 이벤트
itServiceMngt.fn_init_GridList = function(){
	var itServiceMngt_InitGridParam = {};

	fn_ajax_call("/kicpa/initItServiceGridList.do", itServiceMngt_InitGridParam, itServiceMngt.initGridList_success, itServiceMngt.initGridList_error);
	
	return false;
}

itServiceMngt.initGridList_success = function(result) {
	AUIGrid.setGridData(itServiceMngt.itServiceMngt_ReqType_grid_wrap, result.rqestTyList);
	AUIGrid.setGridData(itServiceMngt.itServiceMngt_TargetSys_grid_wrap, result.trgetSysList);
	AUIGrid.setGridData(itServiceMngt.itServiceMngt_Dept_grid_wrap, result.rqestDeptList);
	
	$("#itServiceMngt_ReqType_Cnt").html(result.rqestTyListSize);
	$("#itServiceMngt_TargetSys_Cnt").html(result.trgetSysListSize);	
}

//그리드 추가
itServiceMngt.fn_gridAddEvent = function(type){
	var myGridID = "";
	var rgsSe = "";
	if(type == "reqType"){
		myGridID = itServiceMngt.itServiceMngt_ReqType_grid_wrap;
		rgsSe = "001";
		
	} else if(type == "targetSys"){
		myGridID = itServiceMngt.itServiceMngt_TargetSys_grid_wrap
		rgsSe = "002";
		
	}
	
	var item = new Object();
	item.disNo = "",
	item.rgsDe = getCurrentDate().toDate().getDateFormat("YYYY-MM-DD"),
	item.expsrYn = "1",
	item.rgsSe = rgsSe,
	item.rgsSn = ""
		
	AUIGrid.addRow(myGridID, item, "last");
}

//저장
itServiceMngt.fn_gridSaveEvent = function(type){
	var myGridID = "";
	if(type == "reqType"){
		myGridID = itServiceMngt.itServiceMngt_ReqType_grid_wrap;
		
	} else if(type == "targetSys"){
		myGridID = itServiceMngt.itServiceMngt_TargetSys_grid_wrap;
		
	}
	
	var editedRowItems = AUIGrid.getGridData(myGridID);
			
	var data = {
		"update" : editedRowItems,
	};
	
	fn_ajax_call("/kicpa/updateItServiceCode.do", data, itServiceMngt.editedRowItems_success, itServiceMngt.editedRowItems_error);
}

itServiceMngt.initGridList_error = function(xhr, status, error) {
	alert("실패");
}

itServiceMngt.editedRowItems_success = function(result) {
	itServiceMngt.fn_init_GridList();
	
}

itServiceMngt.editedRowItems_error = function(xhr, status, error) {
	alert("실패");
}