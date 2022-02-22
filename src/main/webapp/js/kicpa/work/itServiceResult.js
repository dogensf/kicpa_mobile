var itServiceResult = itServiceResult || {}; // 발송대장 namespace

itServiceResult.itServiceResult_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    	itServiceResult.fn_init_resize_AUIGrid();
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

        itServiceResult.fn_createAUIGrid(); // AUGRID 생성
        itServiceResult.fn_init_events(); // 이벤트 등록
        itServiceResult.fn_init(); // 화면 초기화

    }
);


itServiceResult.fn_init = function() {
    $("#itServiceResult_RquestDeptList").selectpicker({
        noneSelectedText:"전체"
    });
    
    $("#itServiceResult_TrgetSysList").selectpicker({
        noneSelectedText:"전체"
    });
    
    $("#itServiceResult_RqestTyList").selectpicker({
        noneSelectedText:"전체"
    });
    
    $("#itServiceResult_MnangtSttus").selectpicker({
        noneSelectedText:"전체"
    });
    
    $('#itServiceResult_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#itServiceResult_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    
    itServiceResult.fn_search_docList("", "", "", "", "");   
}


//AUIGrid 를 생성합니다.
itServiceResult.fn_createAUIGrid = function() {
    var columnLayout = [{
        dataField : "rqestNo",
        headerText : "No"
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
        dataField : "rqestUserNm",
        headerText : "요청자"
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
        dataField : "managtUserNm",
        headerText : "조치담당자"
    }, {
        dataField : "rqestSubject",
        headerText : "요청사항"
    }, {
        dataField : "searchBtn",
        headerText : "내용",
		renderer : {
			type : "ButtonRenderer",
			labelText : "확인",
			onClick : function(event) {
				var url = "/kicpa/itServiceListDetail.do?rqestNo=" + event.item.rqestNo + "&pageId=itServiceResult";
				addNewTab('itServiceListDetail', url, '내용조회');
			}
		}
    }];

    var gridPros = {
        showRowNumColumn : false,

        showRowCheckColumn : false,

		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"itServiceResult_grid_wrap", obj:[itServiceResult,"itServiceResult_gridID"], layout:columnLayout , prop:gridPros}]);

}


itServiceResult.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"itServiceResult_grid_wrap",obj:itServiceResult.itServiceResult_gridID}]);

}

itServiceResult.fn_init_events = function() {
		
	//테이블 초기화
	$("#itServiceResult_Resert").on("click",function(e) {
		itServiceResult.fn_page_init();
    });
	
	//검색
	$("#itServiceResult_Search").on("click", function(e){
		var itServiceResult_RquestDeptList = $("#itServiceResult_RquestDeptList").val();
		var itServiceResult_TrgetSysList = $("#itServiceResult_TrgetSysList").val();
		var itServiceResult_RqestTyList = $("#itServiceResult_RqestTyList").val();
		var itServiceResult_MnangtSttus = $("#itServiceResult_MnangtSttus").val();
		var itServiceResult_Title = $("#itServiceResult_Title").val();
		
		itServiceResult.fn_search_docList(itServiceResult_RquestDeptList, itServiceResult_TrgetSysList, itServiceResult_RqestTyList, itServiceResult_MnangtSttus, itServiceResult_Title);
		
		return false;
	});
}

//테이블 초기화
itServiceResult.fn_page_init = function(){
	$("#itServiceResult_RquestDeptList").find('option:first').prop('selected', true);
	$("#itServiceResult_RquestDeptList").selectpicker("refresh");
	
	$("#itServiceResult_TrgetSysList").find('option:first').prop('selected', true);
	$("#itServiceResult_TrgetSysList").selectpicker("refresh");
	
	$("#itServiceResult_RqestTyList").find('option:first').prop('selected', true);
	$("#itServiceResult_RqestTyList").selectpicker("refresh");
	
	$("#itServiceResult_MnangtSttus").find('option:first').prop('selected', true);
	$("#itServiceResult_MnangtSttus").selectpicker("refresh");
	
	$("#itServiceResult_Title").val("");
	
	itServiceList.fn_search_docList("", "", "", "", "");
}

//조회 이벤트
itServiceResult.fn_search_docList = function(rqestDept, trgetSys, rqestTy, managtSttus, title){
	var itServiceResult_SearchParam = {};
	
	itServiceResult_SearchParam.rqestDept = rqestDept;
	itServiceResult_SearchParam.trgetSys = trgetSys;
	itServiceResult_SearchParam.rqestTy = rqestTy;
	itServiceResult_SearchParam.managtSttus = managtSttus;
	itServiceResult_SearchParam.title = title;

	fn_ajax_call("/kicpa/selectItServiceList.do", itServiceResult_SearchParam, itServiceResult.selectList_success, itServiceResult.selectList_error);
	
	return false;
}

itServiceResult.selectList_success = function(result) {
	AUIGrid.setGridData(itServiceResult.itServiceResult_gridID, result.docList);
}

itServiceResult.selectList_error = function(xhr, status, error) {
	alert("실패");
}

itServiceResult.deleteList_success = function(result) {
	itServiceResult.fn_search_docList("", "", "", "", "");
}

itServiceResult.deleteList_error = function(xhr, status, error) {
	alert("실패");
}