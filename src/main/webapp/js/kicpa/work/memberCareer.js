var memberCareer = memberCareer || {}; // 위원회 관리 namespace

memberCareer.memberCareer_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		memberCareer.fn_init_resize_AUIGrid();
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

	memberCareer.fn_createAUIGrid(); // AUGRID 생성
	memberCareer.fn_init_events(); // 이벤트 등록
	memberCareer.fn_init(); // 화면 초기화
	
	}
);

memberCareer.fn_init = function() {
	$("#memberCareer_SearchGubun").selectpicker({
		noneSelectedText:"전체"
		
	});
	
	//회원 경력 조회
	memberCareer.fn_search_committeeList("", "");
}

//AUIGrid 를 생성합니다.
memberCareer.fn_createAUIGrid = function() {
	var columnLayout = [
		{
			dataField : "mberType",
			headerText : "등록구분"
		}, {
			dataField : "koreanNm",
			headerText : "성명"
		}, {
			dataField : "dispCpaId",
			headerText : "등록번호"
		}, {
			dataField : "cpaId",
			headerText : "조회용등록번호",
			visible : false
		}, {
			dataField : "registCmitCnt",
			headerText : "등록된 위원회 개수"
		}, {
			dataField : "rsndqf",
			headerText : "결격여부"
		}, {
			dataField : "searchHis",
			headerText : "경력조회",
			renderer : {
				type : "ButtonRenderer",
				labelText : "확인",
				onClick : function(event) {
					popup.fn_popup_search(event.item.koreanNm + " 경력조회", event.item.cpaId);
				}
			}
		}
	];

	var gridPros = {
		showRowNumColumn : true,
		showRowCheckColumn : false,

		headerHeight : 34,
		rowHeight : 34,
		
		noDataMessage: "검색결과가 없습니다."
	};


	fn_AUIGrid_create([{id:"memberCareer_grid_wrap", obj:[memberCareer,"memberCareer_gridID"], layout:columnLayout , prop:gridPros}]);

}

memberCareer.fn_init_resize_AUIGrid= function(){
	fn_AUIGrid_resize([{id:"memberCareer_grid_wrap",obj:memberCareer.memberCareer_gridID}]);
	
}

memberCareer.fn_init_events = function() {
	$("#memberCareer_Search").on("click", function(e){
		var memberCareer_SearchGubun = $("#memberCareer_SearchGubun").val();
		var memberCareer_SearchText = $("#memberCareer_SearchText").val();
		
		memberCareer.fn_search_committeeList(committeeList_SearchGubun, committeeList_SearchText);
		
		return false;
	});
	
	$("#memberCareer_Resert").on("click", function(e){
		$("#memberCareer_SearchText").val("");
		
		$("#memberCareer_SearchGubun option:eq(0)").prop('selected', true);
		$("#memberCareer_SearchGubun").selectpicker("refresh");
		
		memberCareer.fn_search_committeeList("", "");
		
		return false;
	});

}


//조회
memberCareer.fn_search_committeeList = function(mberType, koreanNm){
	var memberCareer_SearchParam = {};
	
	memberCareer_SearchParam.mberType = mberType;
	memberCareer_SearchParam.koreanNm = koreanNm;
	
	fn_ajax_call("/kicpa/selectCommitteeMemberList.do", memberCareer_SearchParam, memberCareer.selectList_success, memberCareer.selectList_error);
	
}

//조회성공
memberCareer.selectList_success = function(result){
	AUIGrid.setGridData(memberCareer.memberCareer_gridID , result.docList);
	
}

//조회실패
memberCareer.selectList_error = function(){
	
	
}