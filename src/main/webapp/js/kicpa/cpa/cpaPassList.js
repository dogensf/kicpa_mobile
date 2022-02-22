var cpaPassList = cpaPassList || {}; // 발송대장 namespace

cpaPassList.cpaPassList_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        cpaPassList.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {    	
        cpaPassList.fn_createAUIGrid(); // AUGRID 생성
        cpaPassList.fn_init_events(); // 이벤트 등록
        cpaPassList.fn_init(); // 화면 초기화

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });
    }
);


cpaPassList.fn_init = function() {
    $("#cpaPassList_SearchGubun").selectpicker({
        noneSelectedText:"전체"
    });

    $('#cpaPassList_StartDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#cpaPassList_EndDay').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    
    cpaPassList.fn_search_cpaPassList("", "", "");
    
    //$("#cpaPassList_StartDay").datepicker( "setDate", "1900-01-01"); // 셋팅 필요
    //$("#cpaPassList_EndDay").datepicker( "setDate", getCurrentDate().toDate().getDateFormat("YYYY-MM-DD"));

}


//AUIGrid 를 생성합니다.
cpaPassList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "selectYn",
        headerText : "",
        width : "5%",
        headerRenderer : {
            type : "CheckBoxHeaderRenderer",
            // 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
            // dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
            // true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
            dependentMode : true,
            position : "bottom" // 기본값 "bottom"
        },
        renderer : {
            type : "CheckBoxEditRenderer",
            showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
            editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
            checkValue : true, // true, false 인 경우가 기본
            unCheckValue : false
        }
    },{
        dataField : "brthdy",
        headerText : "생년월일",
        width : "10%"
    }, {
        dataField : "koreanNm",
        headerText : "성명",
        width : "10%"
    }, {
        dataField : "psexamYear",
        headerText : "합격년도",
        width : "10%"
    }, {
        dataField : "passEdycNo",
        headerText : "합격증서번호",
        width : "10%"
    }, {
        dataField : "",
        headerText : "합격증서사본\n등록여부",
        width : "10%"
    }, {
        dataField : "",
        headerText : "CPA 번호",
        width : "10%"
    }, {
        dataField : "passFlag",
        headerText : "합격구분",
        width : "13%"
    }, {
        dataField : "orginCtlf",
        headerText : "원자격국",
        width : "12%"
    }, {
        dataField : "modifyYn",
        headerText : "정보수정",
        width : "10%",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                cpaPassList.fn_cpaPassInfo_seach(event.rowIndex);
            }

        }
    },{
        dataField: "pin",
        headerText: "사용자번호",
        visible: false
    }];

    var gridPros = {

        editable: false,                // 편집 가능 여부 (기본값 : false)
        enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
        enableRightDownFocus: true,
        selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
        useContextMenu: true,           // 컨텍스트 메뉴 사용 여부 (기본값 : false)
        enableFilter: true,             // 필터 사용 여부 (기본값 : false)
        useGroupingPanel: false,        // 그룹핑 패널 사용
        showStateColumn: false,         // 상태 칼럼 사용
        displayTreeOpen: true,          // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
        showRowNumColumn: true,
        reverseRowNum : true,
        usePaging : true,// 페이징 사용
        pageRowCount : 20,// 한 화면에 출력되는 행 개수 20(기본값:20)
        noDataMessage: "검색결과가 없습니다.",
        groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",
        headerHeight : 34,
        rowHeight : 34
    };


     fn_AUIGrid_create([{id:"cpaPassList_grid_wrap", obj:[cpaPassList,"cpaPassList_gridID"], layout:columnLayout , prop:gridPros}]);

}


cpaPassList.fn_init_resize_AUIGrid= function(){

    fn_AUIGrid_resize([{id:"cpaPassList_grid_wrap",obj:cpaPassList.cpaPassList_gridID}]);

}

cpaPassList.fn_init_events = function() {
    /*$('#cpaPassList_NoGet').on("click",function(e) {
    	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    });*/

    //테이블리시트초기화 버튼 이벤트
    $("#cpaPassList_Resert").on("click",function(e) {
        $('#cpaPassList_PassFlag').val(""); //합격구분
        $('#cpaPassList_SearchFlag').val(""); //검색구분
        $('#cpaPassList_SearchText').val(""); //검색어

        cpaPassList.fn_search_cpaPassList("", "", "");
    });
 	  
    //검색 버튼 이벤트
    $("#cpaPassList_Search").on("click",function(e) {
    	var cpaPassList_PassFlag = $('#cpaPassList_PassFlag').val(); //합격구분
    	var cpaPassList_SearchFlag = $('#cpaPassList_SearchFlag').val(); //검색구분
        var cpaPassList_SearchText = $('#cpaPassList_SearchText').val(); //검색어
    	
    	//텍스트 필드 미입력 상태에서 선택 시 alert
    	if(cpaPassList_SearchText == ""){
    		alert("검색 내용을 입력하세요.");
    		return;
    		
    	}

        if ( cpaPassList_SearchFlag == "1" ) {
            cpaPassList_SearchFlag = "name";

        } else if ( cpaPassList_SearchFlag == "2" ) {
            cpaPassList_SearchFlag = "name";

        } else if ( cpaPassList_SearchFlag == "3" ) {
            cpaPassList_SearchFlag = "name";

        } else {
            cpaPassList_SearchFlag = "";

        }
    	
    	cpaPassList.fn_search_cpaPassList(cpaPassList_PassFlag, cpaPassList_SearchFlag, cpaPassList_SearchText);
    });
}

//검색 이벤트
cpaPassList.fn_search_cpaPassList = function(passFlag, searchFlag, searchText){
	var cpaPassList_SearchParam = {};

    cpaPassList_SearchParam.passFlag = passFlag;
	cpaPassList_SearchParam.searchFlag = searchFlag;
	cpaPassList_SearchParam.searchText = searchText;

	fn_ajax_call("/kicpa/cpa/selectCpaPassList.do", cpaPassList_SearchParam, cpaPassList.selectCpaPassList_success, cpaPassList.selectCpaPassList_error);
}

//그리드 조회버튼 클릭
cpaPassList.fn_cpaPassInfo_seach = function(rowIndex){
    var pin = AUIGrid.getCellValue(cpaPassList.cpaPassList_gridID, rowIndex, "pin");
    addNewTab('cpaPassRegist','/kicpa/cpa/cpaPassRegist.do?pin='+pin,'합격자등록');
}

cpaPassList.selectCpaPassList_success = function(result) {
	AUIGrid.setGridData(cpaPassList.cpaPassList_gridID, result.cpaPassList);
	$("#cpaPassList_TotalCnt").html(result.cpaPassListSize);
}

cpaPassList.selectCpaPassList_error = function(xhr, status, error) {
	alert("실패");
}