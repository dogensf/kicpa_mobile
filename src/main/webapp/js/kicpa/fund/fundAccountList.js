var fundAccountList = fundAccountList || {};

fundAccountList.fundAccountList_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		fundAccountList.fn_init_resize_AUIGrid();
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

        fundAccountList.fn_createAUIGrid(); // AUGRID 생성
        fundAccountList.fn_init_events(); // 이벤트 등록
        fundAccountList.fn_init(); // 화면 초기화
    }
);


fundAccountList.fn_init = function() {

    $("#fundAccountList_Sttus").selectpicker({
        noneSelectedText:"전체"
    });
    $("#fundAccountList_DeGubun").selectpicker({
        noneSelectedText:"전체"
    });
    $('#fundAccountList_StartDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    $('#fundAccountList_EndDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    $("#fundAccountList_FnltInsttOrAcnutNo").val();

    fundAccountList.fn_search_fundAccountList("","", "", "", "", "");
}


//AUIGrid 를 생성합니다.
fundAccountList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "fnltInstt",
        headerText : "금융기관"
    }, {
		dataField : "acnutNo",
		headerText : "계좌번호"
	}, {
		dataField : "acnutNm",
		headerText : "계좌명"
	} , {
        dataField : "inrst",
        headerText : "금리"
    }, {
        dataField : "bgnDe",
        headerText : "가입일"
    } , {
        dataField : "endDe",
        headerText : "만기일"
    }, {
        dataField : "scbtDe",
        headerText : "해지일"
    }, {
        dataField : "acnutSttus",
        headerText : "상태"
    }, {
        dataField : "selectYn",
        headerText : "수정",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                closeTab('fundAccountAdd');
                addNewTab('fundAccountAdd', '/kicpa/fund/fundAccountAdd.do', '계좌추가');
                var fundAccount_SearchParam = {};
                fundAccount_SearchParam.acnutSn = event.item.acnutSn;
                //0.5초 후 화면 갱신
                //계좌관리
                setTimeout(() => fn_ajax_call("kicpa/selectfundAccountList.do", fundAccount_SearchParam, fundAccountAdd.selectfundAccount_success, fundAccountAdd.selectfundAccount_error), 200);
                //적립금관리
                setTimeout(() => fundRsrvmneyList.fn_search_fundRsrvmneyList(event.item.acnutSn, "","", "", "",""), 200);


            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.selectYn == "정상") {
                    return true;
                }
                return false;
            }
        }
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };
     fn_AUIGrid_create([{id:"fundAccountList_grid_wrap", obj:[fundAccountList,"fundAccountList_gridID"], layout:columnLayout , prop:gridPros}]);
}


fundAccountList.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"fundAccountList_grid_wrap",obj:fundAccountList.fundAccountList_gridID}]);
}

fundAccountList.fn_init_events = function() {

    $("#fundAccountList_Search").on("click",function(e) {

        var fundAccountList_Sttus = $("#fundAccountList_Sttus").selectpicker('val');    // 상태
        var fundAccountList_DeGubun = $('#fundAccountList_DeGubun').selectpicker('val'); //날짜구분
        var fundAccountList_StartDay = $("#fundAccountList_StartDay").val();
        var fundAccountList_EndDay = $("#fundAccountList_EndDay").val();
        var fundAccountList_FnltInsttOrAcnutNo = $('#fundAccountList_FnltInsttOrAcnutNo').val(); //종료일자

        fundAccountList.fn_search_fundAccountList("", fundAccountList_Sttus, fundAccountList_DeGubun, fundAccountList_StartDay, fundAccountList_EndDay, fundAccountList_FnltInsttOrAcnutNo);

        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });

    //테이블리스트 초기화
    $("#fundAccountList_Resert").on("click",function(e) {
        fundAccountList.fn_page_init("none");
    });


    //계좌정지
    $('#fundAccountListDelete').on("click",function(e) {
        // 중요 : 체크된 아이템 얻는 메소드는 2개가 있습니다.
        // 1. getCheckedRowItems : 현재 그리드에서 숨겨진 행 아이템을 얻어오지 않습니다.
        // 2. getCheckedRowItemsAll :  현재 그리드에서 숨겨진 행 아이템들까지 모두 얻어 옵니다.
        // 일반 그리드에서 필터링이 되지 않았다면, getCheckedRowItems 과 getCheckedRowItemsAll 같습니다. (트리 그리드에서는 다름)

        var checkedItems = AUIGrid.getCheckedRowItemsAll(fundAccountList.fundAccountList_gridID); // 접혀진 자식들이 체크된 경우 모두 얻기
        if(checkedItems.length <= 0) {
            alert("System Alert  Case 01 노출");
            return;
        }
        alert("System Alert  Case 02 노출");
        var item;
        var fundAccountCntn_DeleteParam;
        for(var i=0, len = checkedItems.length; i<len; i++) {
            fundAccountCntn_DeleteParam = {};
            item = checkedItems[i];
            fundAccountCntn_DeleteParam.fnltInstt = item.fnltInstt;
            fn_ajax_call("kicpa/deletefundAccountList.do", fundAccountCntn_DeleteParam, fundAccountList.deletefundAccount_success, fundAccountList.deletefundAccount_error)
        }
        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });
}

//테이블 초기화
fundAccountList.fn_page_init = function(type){

    $("#fundAccountList_Sttus").selectpicker('val',"");
    $("#fundAccountList_Sttus").selectpicker('refresh');
    $("#fundAccountList_DeGubun").selectpicker('val',"");
    $("#fundAccountList_DeGubun").selectpicker('refresh');
    $("#fundAccountList_StartDay").val("");
    $("#fundAccountList_EndDay").val("");
    $("#fundAccountList_FnltInsttOrAcnutNo").val("");

    fundAccountList.fn_search_fundAccountList("","", "", "", "", "");
    return false;
}

//조회 이벤트
fundAccountList.fn_search_fundAccountList = function(fnltInstt, acnutSttus, deGubun, startDay, endDay, fnltInsttOrAcnutNo){
    var fundAccountList_SearchParam = {};

    fundAccountList_SearchParam.fnltInstt = fnltInstt;
    fundAccountList_SearchParam.acnutSttus = acnutSttus;
    fundAccountList_SearchParam.deGubun = deGubun;
    fundAccountList_SearchParam.startDay = startDay;
    fundAccountList_SearchParam.endDay = endDay;
    fundAccountList_SearchParam.fnltInsttOrAcnutNo = fnltInsttOrAcnutNo;


    fn_ajax_call("/kicpa/selectfundAccountList.do", fundAccountList_SearchParam, fundAccountList.selectfundAccountList_success, fundAccountList.selectfundAccountList_error);
}

fundAccountList.selectfundAccountList_success = function(result) {
    AUIGrid.setGridData(fundAccountList.fundAccountList_gridID, result.fundAccountList);
}
fundAccountList.selectfundAccountList_error = function(xhr, status, error) {
    alert("손해배상 공동기금 계좌내역 조회 실패");
}


fundAccountList.deletefundAccount_success = function(result) {
    var fundAccountList_Sttus = $("#fundAccountList_Sttus").selectpicker('val');    // 상태
    var fundAccountList_DeGubun = $('#fundAccountList_DeGubun').selectpicker('val'); //날짜구분
    var fundAccountList_StartDay = $("#fundAccountList_StartDay").val();
    var fundAccountList_EndDay = $("#fundAccountList_EndDay").val();
    var fundAccountList_FnltInsttOrAcnutNo = $('#fundAccountList_FnltInsttOrAcnutNo').val(); //종료일자

    fundAccountList.fn_search_fundAccountList("", fundAccountList_Sttus, fundAccountList_DeGubun, fundAccountList_StartDay, fundAccountList_EndDay, fundAccountList_FnltInsttOrAcnutNo);
}
fundAccountList.deletefundAccount_error = function(xhr, status, error) {
    alert("선택 삭제 실패");
}
