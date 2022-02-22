var committeeList = committeeList || {}; // 위원회 관리 namespace

committeeList.committeeList_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		committeeList.fn_init_resize_AUIGrid();
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

		committeeList.fn_createAUIGrid(); // AUGRID 생성
		committeeList.fn_init_events(); // 이벤트 등록
		committeeList.fn_init(); // 화면 초기화
	}
);

committeeList.fn_init = function() {
	$("#committeeList_SearchGubun").selectpicker({
		noneSelectedText:"전체"
	});

	$('#committeeList_StartDay').datepicker({
		rtl: KTUtil.isRTL(),
		todayHighlight: true,
		orientation: "bottom left"
	});

	$('#committeeList_EndDay').datepicker({
		rtl: KTUtil.isRTL(),
		todayHighlight: true,
		orientation: "bottom left"
	});
	
	committeeList.fn_search_committeeList("", "", "", "", "");
	
}

//AUIGrid 를 생성합니다.
committeeList.fn_createAUIGrid = function() {
	var columnLayout = [
		{
			dataField : "cmitSn",
			headerText : "No",
			width: 50
		}, {
			dataField : "cmitSttus",
			headerText : "상태",
			width: 80
		}, {
			dataField : "cmitKorNm",
			headerText : "위원회명"
		}, {
			dataField : "cmitCode",
			headerText : "위원회코드",
			visible : false
		}, {
			dataField : "cmitBgnde",
			headerText : "시작일",
			width: 150
		}, {
			dataField : "cmitEndde",
			headerText : "종료일",
			width: 150
		}, {
			dataField : "cmitDeptNm",
			headerText : "소관부서"
		}, {
			dataField : "cmitDeptcd",
			headerText : "소관부서코드",
			visible : false
		}, {
			dataField : "cmitConstntCnt",
			headerText : "등록회원수",
			width: 150
		}, {
			dataField : "searchBtn",
			headerText : "조회",
			width: 100,
			renderer : {
				type : "ButtonRenderer",
				labelText : "확인",
				onClick : function(event) {
					var url = "/kicpa/committeeDetail.do?cmitCode=" + event.item.cmitCode + "&cmitSttus=" + event.item.cmitSttus;
					closeTab('committeeDetail');
					addNewTab('committeeDetail', url, '위원회 추가');
					
				}
			}
		}
	];

	var gridPros = {
		showRowNumColumn : false,
		showRowCheckColumn : false,

		headerHeight : 34,
		rowHeight : 34,
		
		noDataMessage: "검색결과가 없습니다."
	};

	fn_AUIGrid_create([{id:"committeeList_grid_wrap", obj:[committeeList,"committeeList_gridID"], layout:columnLayout , prop:gridPros}]);
	
}

committeeList.fn_init_resize_AUIGrid= function(){
	fn_AUIGrid_resize([{id:"committeeList_grid_wrap",obj:committeeList.committeeList_gridID}]);
	
}

committeeList.fn_init_events = function() {
	//검색
	$("#committeeList_Search").on("click", function(e){
		var committeeList_SttusSearchGubun = $("#committeeList_SttusSearchGubun").val();
		var committeeList_DateSearchGubun = $("#committeeList_DateSearchGubun").val();
		var committeeList_StartDay = $("#committeeList_StartDay").val().replaceAll("-", "");
		var committeeList_EndDay = $("#committeeList_EndDay").val().replaceAll("-", "");
		var committeeList_SearchCmit = $("#committeeList_SearchCmit").val();
		
		if(committeeList_EndDay != "" && (committeeList_StartDay > committeeList_EndDay)){
			alertMessage("조회종료일이 조회시작일 보다 빠릅니다.","","error");
			return false;
		}
		
		committeeList.fn_search_committeeList(committeeList_SttusSearchGubun, committeeList_DateSearchGubun, committeeList_StartDay, committeeList_EndDay, committeeList_SearchCmit);
		
		return false; 
		
	});
	
	//초기화
	$("#committeeList_Resert").on("click", function(e){
		$("#committeeList_SttusSearchGubun option:eq(0)").prop('selected', true);
		$("#committeeList_SttusSearchGubun").selectpicker("refresh");
		
		$("#committeeList_DateSearchGubun option:eq(0)").prop('selected', true);
		$("#committeeList_DateSearchGubun").selectpicker("refresh");
		
		$("#committeeList_StartDay").val("");
		$("#committeeList_EndDay").val("");
		$("#committeeList_SearchCmit").val("");
		
		committeeList.fn_search_committeeList("", "", "", "", "");
		
		return false;
		
	});
	
	//위원회 추가
	$("#committeeList_Add").on("click", function(e){
		addNewTab('committeeDetail', '/kicpa/committeeDetail.do', '위원회 추가');
		
		return false;
		
	});
}

//조회
committeeList.fn_search_committeeList = function(sttusSearchGubun, dateSearchGubun, startDay, endDay, searchCmit){
	var committeeList_SearchParam = {};
	
	committeeList_SearchParam.sttusSearchGubun = sttusSearchGubun;
	committeeList_SearchParam.dateSearchGubun = dateSearchGubun;
	committeeList_SearchParam.startDay = startDay;
	committeeList_SearchParam.endDay = endDay;
	committeeList_SearchParam.searchCmit = searchCmit;
	
	fn_ajax_call("/kicpa/selectCommitteeList.do", committeeList_SearchParam, committeeList.selectList_success, committeeList.selectList_error);
	
}

//조회성공
committeeList.selectList_success = function(result){
	AUIGrid.setGridData(committeeList.committeeList_gridID, result.docList);
	
}

//조회실패
committeeList.selectList_error = function(){
	
}
