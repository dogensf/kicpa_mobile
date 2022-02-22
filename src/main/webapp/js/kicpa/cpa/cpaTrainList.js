var cpaTrainList = cpaTrainList || {}; // 발송대장 namespace

cpaTrainList.cpaTrainList_gridID = null;

var cpaPassUserSearchList ;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        cpaTrainList.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {    	
        cpaTrainList.fn_createAUIGrid(); // AUGRID 생성
        cpaTrainList.fn_init_events(); // 이벤트 등록
        cpaTrainList.fn_init(); // 화면 초기화

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });
    }
);


cpaTrainList.fn_init = function() {

    cpaTrainList.fn_search_cpaTrainList("", "", "");

}


//AUIGrid 를 생성합니다.
cpaTrainList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "appCpaNo",
        headerText : "수습등록번호",
        width : "11%"
    },{
        dataField : "koreanNm",
        headerText : "성명",
        width : "11%"
    },{
        dataField : "brthdy",
        headerText : "생년월일",
        width : "11%"
    },{
        dataField : "appRegistDe",
        headerText : "수습등록일",
        width : "11%"
    },{
        dataField : "apntcCl",
        headerText : "실무수습구분",
        width : "11%"
    },{
        dataField : "appInsttCd",
        headerText : "실무수습기관",
        width : "12%"
    },{
        dataField : "guideCpaNo",
        headerText : "지도 CPA",
        width : "11%"
    },{
        dataField : "passInfo",
        headerText : "기본정보 수정",
        width : "11%",
        renderer : {
            type : "ButtonRenderer",
            labelText : "수정",
            onClick : function(event) {
                cpaTrainList.fn_cpaPassInfo_modify(event.rowIndex);
            }

        }
    },{
        dataField : "appInfo",
        headerText : "수습정보 수정",
        width : "11%",
        renderer : {
            type : "ButtonRenderer",
            labelText : "수정",
            onClick : function(event) {
                cpaTrainList.fn_cpaPassTrainInfo_modify(event.rowIndex);
            }

        }
    },{
        dataField: "pin",
        headerText: "개인식별번호",
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


     fn_AUIGrid_create([{id:"cpaTrainList_grid_wrap", obj:[cpaTrainList,"cpaTrainList_gridID"], layout:columnLayout , prop:gridPros}]);

}

cpaTrainList.fcpaPassUserSelect =function(items) {

    var pin = items.pin;
    var appCpaNo = items.appCpaNo;

    addNewTab('cpaTrainRegist','/kicpa/cpa/cpaTrainRegist.do?pin='+pin+'&appCpaNo='+appCpaNo,'수습회계사추가');
}

cpaTrainList.fn_init_resize_AUIGrid= function(){

    fn_AUIGrid_resize([{id:"cpaTrainList_grid_wrap",obj:cpaTrainList.cpaTrainList_gridID}]);

}

cpaTrainList.fn_init_events = function() {

    //테이블리시트초기화 버튼 이벤트
    $("#cpaTrainList_Resert").on("click",function(e) {
        $('#cpaTrainList_apntcClFlag').val(""); //실무수습구분
        $('#cpaTrainList_SearchFlag').val(""); //검색구분
        $('#cpaTrainList_SearchText').val(""); //검색어

        cpaTrainList.fn_search_cpaTrainList("", "", "");
    });
 	  
    //검색 버튼 이벤트
    $("#cpaTrainList_Search").on("click",function(e) {
    	var cpaTrainList_apntcClFlag = $('#cpaTrainList_apntcClFlag').val(); //합격구분
    	var cpaTrainList_SearchFlag = $('#cpaTrainList_SearchFlag').val(); //검색구분
        var cpaTrainList_SearchText = $('#cpaTrainList_SearchText').val(); //검색어
    	
    	//텍스트 필드 미입력 상태에서 선택 시 alert
    	if(cpaTrainList_SearchText == ""){
    		alert("검색 내용을 입력하세요.");
    		return;
    	}

        if ( cpaTrainList_SearchFlag == "1" ) {
            cpaTrainList_SearchFlag = "name";

        } else if ( cpaTrainList_SearchFlag == "2" ) {
            cpaTrainList_SearchFlag = "name";

        } else if ( cpaTrainList_SearchFlag == "3" ) {
            cpaTrainList_SearchFlag = "name";

        } else {
            cpaTrainList_SearchFlag = "";
        }
    	
    	cpaTrainList.fn_search_cpaTrainList(cpaTrainList_apntcClFlag, cpaTrainList_SearchFlag, cpaTrainList_SearchText);
    });

    //수습회계사 추가 버튼 이벤트
    $("#cpaTrainList_Add").on("click",function(e) {

        mainCommonList.fn_popupMember_search("",{title:"수습회계사 추가"} , cpaTrainList.fcpaPassUserSelect);
    });
}

//검색 이벤트
cpaTrainList.fn_search_cpaTrainList = function(apntcClFlag, searchFlag, searchText){
	var cpaTrainList_SearchParam = {};

    cpaTrainList_SearchParam.apntcClFlag = apntcClFlag;
	cpaTrainList_SearchParam.searchFlag = searchFlag;
	cpaTrainList_SearchParam.searchText = searchText;

	fn_ajax_call("/kicpa/cpa/selectCpaTrainList.do", cpaTrainList_SearchParam, cpaTrainList.selectcpaTrainList_success, cpaTrainList.selectcpaTrainList_error);
}

//그리드 기본정보 수정버튼 클릭
cpaTrainList.fn_cpaPassInfo_modify = function(rowIndex){
    var pin = AUIGrid.getCellValue(cpaTrainList.cpaTrainList_gridID, rowIndex, "pin");
    addNewTab('cpaPassRegist','/kicpa/cpa/cpaPassRegist.do?pin='+pin,'합격자등록');
}

//그리드 수습정보 수정버튼 클릭
cpaTrainList.fn_cpaPassTrainInfo_modify = function(rowIndex){
    var pin = AUIGrid.getCellValue(cpaTrainList.cpaTrainList_gridID, rowIndex, "pin");
    var appCpaNo = AUIGrid.getCellValue(cpaTrainList.cpaTrainList_gridID, rowIndex, "appCpaNo");
    addNewTab('cpaTrainRegist','/kicpa/cpa/cpaTrainRegist.do?pin='+pin+'&appCpaNo='+appCpaNo,'수습회계사추가')
}

cpaTrainList.selectcpaTrainList_success = function(result) {
	AUIGrid.setGridData(cpaTrainList.cpaTrainList_gridID, result.cpaTrainList);
	$("#cpaTrainList_TotalCnt").html(result.cpaTrainListSize);
}

cpaTrainList.selectcpaTrainList_error = function(xhr, status, error) {
	alert("실패");
}