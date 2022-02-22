var fundRsrvmneyList = fundRsrvmneyList || {};

fundRsrvmneyList.fundRsrvmneyList_gridID = null;
fundRsrvmneyList.fundRsrvmneyList_gridID2 = null;
fundRsrvmneyList.fundRsrvmneyList_gridID3 = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        fundRsrvmneyList.fn_init_resize_AUIGrid();
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

        fundRsrvmneyList.fn_createAUIGrid(); // AUGRID 생성
        fundRsrvmneyList.fn_createAUIGrid2();
        //fundRsrvmneyList.fn_createAUIGrid3();
        //
        fundRsrvmneyList.fn_init_events(); // 이벤트 등록
        fundRsrvmneyList.fn_init(); // 화면 초기화
    }
);


fundRsrvmneyList.fn_init = function() {
    if($('#fundAccountAddPin').val()=="" || $('#fundAccountAddPin').val()==null){
    }


    // 1
    $("#fundRsrvmneyList_Div").selectpicker({
        noneSelectedText:"전체"
    });
    $("#fundRsrvmneyList_Audit").selectpicker({
        noneSelectedText:"전체"
    });
    $('#fundRsrvmneyList_StartDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    $('#fundRsrvmneyList_EndDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    // 2
    $('#rsrvmneyAccmlDe').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    $("#rsrvmneyDiv").selectpicker({
        noneSelectedText:"전체"
    });
    //
    $("#rsrvmneyDiv").on('change', function(){
        var selected = $('#rsrvmneyDiv option:selected').text()
        if(selected == "추가적립금") {
            $("#rsrvmneyTrgetCmpny").removeAttr("disabled");
            $("#rsrvmneyClmDe").removeAttr("disabled");
        } else {
            $("#rsrvmneyTrgetCmpny").attr("disabled",true);
            $("#rsrvmneyClmDe").attr("disabled",true);
        };
    });
}


//AUIGrid 를 생성합니다.
fundRsrvmneyList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "accmlDe",
        headerText : "적립일"
    }, {
        dataField : "rsrvmneyDiv",
        headerText : "적립구분"
    }, {
        dataField : "korAudNm",
        headerText : "감사인"
    } , {
        dataField : "rsrvmney",
        headerText : "적립금",
        dataType : "numeric",
        formatString : "#,##0"
    }, {
        dataField : "trgetCmpny",
        headerText : "대상회사"
    } , {
        dataField : "clmDe",
        headerText : "청구권시효"
    }, {
        dataField : "opratnErns",
        headerText : "운영수익금",
        dataType : "numeric",
        formatString : "#,##0"
    }, {
        dataField : "opratnErnsSelect",
        headerText : "운용수익금 관리",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                $('#fundAccountAdd_3_Add').modal('show');
            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.opratnErnsSelect == "Y") {
                    return true;
                }
                return false;
            }
        }
    }, {
        dataField : "rsrvmneySelect",
        headerText : "적립금 관리",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                //적립금 SUM
                $('#rsrvmneyAmt').val(event.item.rsrvmney.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                //
                $('#fundAccountAdd_2_Add').modal('show');
                //
                $("#rsrvmneyAccmlDe").attr("disabled",true);
                $("#rsrvmneyDiv").attr("disabled",true);
                $('#rsrvmneyDiv').selectpicker('refresh');
                $("#rsrvmneyAudit").attr("disabled",true);
                $("#rsrvmneyAmt").attr("disabled",true);
                //
                $("#fundRsrvmneyInsert").hide();
                //적립금 관리
                $("#rsrvmneyRsrvmneySn").val(event.item.rsrvmneySn);
                var fundRsrvmneySn_SearchParam = {};
                fundRsrvmneySn_SearchParam.rsrvmneySn = event.item.rsrvmneySn;
                fn_ajax_call("kicpa/selectfundRsrvmneySn.do", fundRsrvmneySn_SearchParam, fundRsrvmneyList.selectfundRsrvmney_success, fundRsrvmneyList.selectfundRsrvmney_error);
            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.rsrvmneySelect == "Y") {
                    return true;
                    return true;
                }
                return false;
            }
        }
    }];

    // 푸터 설정
    var footerLayout = [ {
        labelText : "∑",
        positionField : "#base",
        style : "aui-grid-my-column"
    }, {
        labelText : "합계",
        positionField : "rsrvmneyDiv"
    }, {
        dataField : "rsrvmney",
        positionField : "rsrvmney",
        operation : "SUM",
        formatString : "#,##0",
    }, {
        dataField : "opratnErns",
        positionField : "opratnErns",
        operation : "SUM",
        formatString : "#,##0",
    }];

    var gridPros = {
        showRowNumColumn : true,
        showRowCheckColumn : true,
        // 푸터 보이게 설정
        showFooter : true,
        footerPosition : "top",
        headerHeight : 34,
        rowHeight : 34
    };

    fn_AUIGrid_create([{id:"fundRsrvmneyList_grid_wrap", obj:[fundRsrvmneyList,"fundRsrvmneyList_gridID"], layout:columnLayout , prop:gridPros}]);

    // 푸터 레이아웃 세팅
    AUIGrid.setFooter(fundRsrvmneyList.fundRsrvmneyList_gridID, footerLayout);
}

fundRsrvmneyList.selectfundRsrvmney_success = function(result) {
    $('#rsrvmneyAccmlDe').val(result.rsrvmneyList[0].accmlDe);

    $("#rsrvmneyDiv").selectpicker('val',result.rsrvmneyList[0].rsrvmneyDivCd);
    $("#rsrvmneyDiv").selectpicker('refresh');
    $('#rsrvmneyAudit').val(result.rsrvmneyList[0].korAudNm);
    //적립금은 SUM으로 표시 (위에..)
    $('#rsrvmneyTrgetCmpny').val(result.rsrvmneyList[0].trgetCmpny);
    $('#rsrvmneyClmDe').val(result.rsrvmneyList[0].clmDe);
    AUIGrid.setGridData(fundRsrvmneyList.fundRsrvmneyList_gridID2, result.rsrvmneyList);
}
fundRsrvmneyList.selectfundRsrvmney_error = function(xhr, status, error) {
    alert("(버튼조회) 적급금 관리 상세 조회 실패");
}


var rsrvmneyAddDiv = [ "전체", "입금", "출금" ];

fundRsrvmneyList.fn_createAUIGrid2 = function() {

    var columnLayout = [{
        dataField : "accmlDe",
        headerText : "등록일",
        dataType : "date",
        formatString : "yyyy-mm-dd",
        editRenderer : {
            type : "CalendarRenderer",
            showExtraDays : true,
            titles : ["S", "M", "T", "W", "T", "F", "S"]
        }
    }, {
        dataField : "rsrvmneyDiv",
        headerText : "구분",
        renderer : {
            type : "DropDownListRenderer",
            descendants : [ "leaf" ], // 자손 필드들
            descendantDefaultValues : [ "-" ], // 변경 시 자손들에게 기본값 지정
            list : rsrvmneyAddDiv
        }
    }, {
        dataField : "rsrvmney",
        headerText : "적립금",
        dataType : "numeric",
        formatString : "#,##0"
    }, {
        dataField : "deleteYn",
        headerText : "삭제",
        renderer : {
            type : "ButtonRenderer",
            labelText : "삭제",
            onClick : function(event) {
            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.deleteYn == "N") {
                    return true;
                }
                return false;
            }
        }
    }];

    // 푸터 설정
    var footerLayout = [ {
        labelText : "∑",
        positionField : "#base",
        style : "aui-grid-my-column"
    }, {
        labelText : "합계",
        positionField : "rsrvmneyDiv"
    }, {
        dataField : "rsrvmney",
        positionField : "rsrvmney",
        operation : "SUM",
        formatString : "#,##0",
    }];

    var gridPros = {
        showRowNumColumn : true,
        showRowCheckColumn : false,
        //수정모드
        editable : true,
        // 푸터 보이게 설정
        showFooter : true,
        footerPosition : "top"
    };

    fn_AUIGrid_create([{id:"fundRsrvmneyList_grid2_wrap", obj:[fundRsrvmneyList,"fundRsrvmneyList_gridID2"], layout:columnLayout , prop:gridPros}]);

    // 푸터 레이아웃 세팅
    AUIGrid.setFooter(fundRsrvmneyList.fundRsrvmneyList_gridID2, footerLayout);
}
fundRsrvmneyList.fn_createAUIGrid3 = function() {

    var columnLayout = [{
        dataField : "accmlDe",
        headerText : "적립일"
    }, {
        dataField : "rsrvmneyDiv",
        headerText : "적립구분"
    }, {
        dataField : "korAudNm",
        headerText : "감사인"
    } , {
        dataField : "rsrvmney",
        headerText : "적립금",
        dataType : "numeric",
        formatString : "#,##0"
    }, {
        dataField : "trgetCmpny",
        headerText : "대상회사"
    } , {
        dataField : "clmDe",
        headerText : "청구권시효"
    }, {
        dataField : "opratnErns",
        headerText : "운영수익금",
        dataType : "numeric",
        formatString : "#,##0"
    }, {
        dataField : "opratnErnsSelect",
        headerText : "운용수익금 관리",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                $('#fundAccountAdd_3_Add').modal('show');
            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.opratnErnsSelect == "Y") {
                    return true;
                }
                return false;
            }
        }
    }, {
        dataField : "rsrvmneySelect",
        headerText : "적립금 관리",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                //--
            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.rsrvmneySelect == "Y") {
                    return true;
                }
                return false;
            }
        }
    }];

    // 푸터 설정
    var footerLayout = [ {
        labelText : "∑",
        positionField : "#base",
        style : "aui-grid-my-column"
    }, {
        labelText : "합계",
        positionField : "rsrvmneyDiv"
    }, {
        dataField : "rsrvmney",
        positionField : "rsrvmney",
        operation : "SUM",
        formatString : "#,##0",
    }, {
        dataField : "opratnErns",
        positionField : "opratnErns",
        operation : "SUM",
        formatString : "#,##0",
    }];

    var gridPros = {
        showRowNumColumn : true,
        showRowCheckColumn : true,
        // 푸터 보이게 설정
        showFooter : true,
        footerPosition : "top",
        headerHeight : 34,
        rowHeight : 34
    };

    fn_AUIGrid_create([{id:"fundRsrvmneyList_grid_wrap", obj:[fundRsrvmneyList,"fundRsrvmneyList_gridID"], layout:columnLayout , prop:gridPros}]);

    // 푸터 레이아웃 세팅
    AUIGrid.setFooter(fundRsrvmneyList.fundRsrvmneyList_gridID, footerLayout);
}


fundRsrvmneyList.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"fundRsrvmneyList_grid_wrap",obj:fundRsrvmneyList.fundRsrvmneyList_gridID}]);
    fn_AUIGrid_resize([{id:"fundRsrvmneyList_grid2_wrap",obj:fundRsrvmneyList.fundRsrvmneyList_gridID2}]);
    fn_AUIGrid_resize([{id:"fundRsrvmneyList_grid3_wrap",obj:fundRsrvmneyList.fundRsrvmneyList_gridID3}]);
}

fundRsrvmneyList.fn_init_events = function() {

    // 계좌추가 탭 > 적립금관리 > 검색 버튼
    $("#fundRsrvmneyList_Search").on("click",function(e) {
        var fundRsrvmneyList_Div = $("#fundRsrvmneyList_Div").selectpicker('val');
        var fundRsrvmneyList_Audit = $('#fundRsrvmneyList_Audit').selectpicker('val');
        var fundRsrvmneyList_StartDay = $("#fundRsrvmneyList_StartDay").val();
        var fundRsrvmneyList_EndDay = $("#fundRsrvmneyList_EndDay").val();


        fundRsrvmneyList.fn_search_fundRsrvmneyList($("#fundAccountAdd_AcnutSn").val(), fundRsrvmneyList_Div, fundRsrvmneyList_Audit, fundRsrvmneyList_StartDay, fundRsrvmneyList_EndDay);

        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });

    // 적립금 추가 (등록 버튼)
    $('#fundRsrvmneyInsert').on("click",function(e) {
        if ( $('#rsrvmneyAccmlDe').val() == '' || $('#rsrvmneyDiv').val() == '' || $('#rsrvmneyAudit').val() == '' || $('#rsrvmneyAudit').val() == '') {
            alert("System Alert Case 05 노출 - 필수항목");
            return false;
        } else {
            if ( $('#rsrvmneyDiv').val() == '3' && ($('#rsrvmneyTrgetCmpny').val() == '' || $('#rsrvmneyClmDe').val() == '')) {
                alert("System Alert Case 05 노출 - 필수항목");
                return false;
            } else {
                if ( $('#rsrvmneyDiv').val() != '3') {
                    $('#rsrvmneyTrgetCmpny').val("");
                    $('#rsrvmneyClmDe').val("");
                }
                //
                var fundRsrvmney_InsertParam;
                fundRsrvmney_InsertParam = {};
                fundRsrvmney_InsertParam.acnutSn = $('#fundAccountAdd_AcnutSn').val();
                //
                fundRsrvmney_InsertParam.accmlDe = $('#rsrvmneyAccmlDe').val().replace( /-/gi, '');
                fundRsrvmney_InsertParam.rsrvmneyDiv = $('#rsrvmneyDiv').val();
                fundRsrvmney_InsertParam.auditCd = $('#rsrvmneyAudit').val();
                fundRsrvmney_InsertParam.trgetCmpny = $('#rsrvmneyTrgetCmpny').val();
                fundRsrvmney_InsertParam.clmDe = $('#rsrvmneyClmDe').val().replace( /-/gi, '');

                fn_ajax_call("kicpa/insertFundRsrvmney.do", fundRsrvmney_InsertParam, fundRsrvmneyList.insertFundRsrvmney_success, fundRsrvmneyList.insertFundRsrvmney_error)
            }
        }
    });
    //적립금 관리 추가 (추가 버튼)
    $('#fundRsrvmneyAddInsert').on("click",function(e) {
        var item = new Object();
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        item.accmlDe = year+month+day,
            item.rsrvmneyDiv = "전체",
            item.rsrvmney = 0,
            item.DeleteYn = "N";

        AUIGrid.addRow(fundRsrvmneyList.fundRsrvmneyList_gridID2, item, "last");
    });

    //적립금 관리 추가 (수정 버튼)
    $('#rsrvmney_Add').on("click",function(e) {
        //수정
    });
    
    // 2적립금 관리 닫기
    $("#rsrvmney_Add_Close2").on("click",function(e) {
        $('#rsrvmneyAccmlDe').val("");
        $("#rsrvmneyDiv").selectpicker('val',"");
        $("#rsrvmneyDiv").selectpicker('refresh');
        $('#rsrvmneyAudit').val("");
        $('#rsrvmneyAmt').val("");
        $('#rsrvmneyTrgetCmpny').val("");
        $('#rsrvmneyClmDe').val("");
        //
        $("#rsrvmneyTrgetCmpny").attr("disabled",true);
        $("#rsrvmneyClmDe").attr("disabled",true);
        //
        AUIGrid.clearGridData(fundRsrvmneyList.fundRsrvmneyList_gridID2);
    });
    // 3 용수익금 관리 닫기
    $("#rsrvmney_Add_Close3").on("click",function(e) {
        $('#rsrvmney_Add_Print').val("");
    });

    //테이블리스트 초기화
    $("#fundRsrvmneyList_Resert").on("click",function(e) {
        fundRsrvmneyList.fn_page_init("none");
    });
    //계좌 재예치 버튼
    $("#fundRsrvmney_Resert").on("click",function(e) {
        fundRsrvmneyList.fn_page_init("none");
    });
    //추가 버튼
    $("#fundRsrvmneyListAdd").on("click",function(e) {
        $("#rsrvmneyAccmlDe").removeAttr("disabled");
        $("#rsrvmneyDiv").removeAttr('disabled');
        $('#rsrvmneyDiv').selectpicker('refresh');
        $("#rsrvmneyAudit").removeAttr("disabled");
        $("#rsrvmneyAmt").removeAttr("disabled");
        //
        $("#fundRsrvmneyInsert").show();
        //
        $("#fundRsrvmneyInsert").removeAttr("disabled");

    });

    //삭제
    $('#fundRsrvmneyListDelete').on("click",function(e) {
        // 중요 : 체크된 아이템 얻는 메소드는 2개가 있습니다.
        // 1. getCheckedRowItems : 현재 그리드에서 숨겨진 행 아이템을 얻어오지 않습니다.
        // 2. getCheckedRowItemsAll :  현재 그리드에서 숨겨진 행 아이템들까지 모두 얻어 옵니다.
        // 일반 그리드에서 필터링이 되지 않았다면, getCheckedRowItems 과 getCheckedRowItemsAll 같습니다. (트리 그리드에서는 다름)

        var checkedItems = AUIGrid.getCheckedRowItemsAll(fundRsrvmneyList.fundRsrvmneyList_gridID); // 접혀진 자식들이 체크된 경우 모두 얻기
        if(checkedItems.length <= 0) {
            alert("System Alert  Case 01 노출");
            return;
        }
        alert("System Alert  Case 02 노출");
        var item;
        var fundRsrvmneyCntn_DeleteParam;
        for(var i=0, len = checkedItems.length; i<len; i++) {
            fundRsrvmneyCntn_DeleteParam = {};
            item = checkedItems[i];
            fundRsrvmneyCntn_DeleteParam.fnltInstt = item.fnltInstt;
            fn_ajax_call("kicpa/deletefundRsrvmneyList.do", fundRsrvmneyCntn_DeleteParam, fundRsrvmneyList.deletefundRsrvmney_success, fundRsrvmneyList.deletefundRsrvmney_error)
        }
    });
}

//테이블 초기화
fundRsrvmneyList.fn_page_init = function(type){

    $("#fundRsrvmneyList_Div").selectpicker('val',"");
    $("#fundRsrvmneyList_Div").selectpicker('refresh');
    $("#fundRsrvmneyList_Audit").selectpicker('val',"");
    $("#fundRsrvmneyList_Audit").selectpicker('refresh');
    $("#fundRsrvmneyList_StartDay").val("");
    $("#fundRsrvmneyList_EndDay").val("");

    fundRsrvmneyList.fn_search_fundRsrvmneyList($("#fundAccountAdd_AcnutSn").val(), "","", "", "","");
}

//조회 이벤트
fundRsrvmneyList.fn_search_fundRsrvmneyList = function(acnutSn, rsrvmneyDiv, auditCd, startDay, endDay){
    var fundRsrvmneyList_SearchParam = {};
    fundRsrvmneyList_SearchParam.acnutSn = acnutSn;
    fundRsrvmneyList_SearchParam.rsrvmneyDiv = rsrvmneyDiv;
    fundRsrvmneyList_SearchParam.auditCd = auditCd;
    fundRsrvmneyList_SearchParam.startDay = startDay;
    fundRsrvmneyList_SearchParam.endDay = endDay;

    fn_ajax_call("/kicpa/selectfundRsrvmneyList.do", fundRsrvmneyList_SearchParam, fundRsrvmneyList.selectfundRsrvmneyList_success, fundRsrvmneyList.selectfundRsrvmneyList_error);
}

fundRsrvmneyList.insertFundRsrvmney_success = function(result) {
    $('#rsrvmneyRsrvmneySn').val(result);
    //적립금 추가 관리 입력
    var fundRsrvmney_InsertAddParam = {};
    fundRsrvmney_InsertAddParam.rsrvmneySn = result;
    fundRsrvmney_InsertAddParam.rsrvmneyAddDe = $('#rsrvmneyAccmlDe').val().replace( /-/gi, '');
    //fundRsrvmney_InsertAddParam.rsrvmneyAddDiv = $('#rsrvmneyDiv').val();
    fundRsrvmney_InsertAddParam.rsrvmneyAddDiv = "1"; // 1: 입금, -1: 출금
    fundRsrvmney_InsertAddParam.rsrvmneyAdd = $('#rsrvmneyAmt').val().replace( /,/gi, '');

    fn_ajax_call("kicpa/insertFundRsrvmneyAdd.do", fundRsrvmney_InsertAddParam, fundRsrvmneyList.insertFundRsrvmneyAdd_success, fundRsrvmneyList.insertFundRsrvmneyAdd_error)
}
fundRsrvmneyList.insertFundRsrvmney_error = function (xhr, status, error) {
    alert("적립금 수정/저장 실패");
}

fundRsrvmneyList.insertFundRsrvmneyAdd_success = function(result) {
    //
    $("#rsrvmneyAccmlDe").attr("disabled",true);
    $("#rsrvmneyDiv").attr("disabled",true);
    $('#rsrvmneyDiv').selectpicker('refresh');
    $("#rsrvmneyAudit").attr("disabled",true);
    $("#rsrvmneyAmt").attr("disabled",true);
    $("#rsrvmneyTrgetCmpny").attr("disabled",true);
    $("#rsrvmneyClmDe").attr("disabled",true);
    //
    $("#fundRsrvmneyInsert").hide();

    //적립금관리 add1 화면초기화
    var fundRsrvmneyList_Div = $("#fundRsrvmneyList_Div").selectpicker('val');
    var fundRsrvmneyList_Audit = $('#fundRsrvmneyList_Audit').selectpicker('val');
    var fundRsrvmneyList_StartDay = $("#fundRsrvmneyList_StartDay").val();
    var fundRsrvmneyList_EndDay = $("#fundRsrvmneyList_EndDay").val();

    fundRsrvmneyList.fn_search_fundRsrvmneyList($("#fundAccountAdd_AcnutSn").val(), fundRsrvmneyList_Div, fundRsrvmneyList_Audit, fundRsrvmneyList_StartDay, fundRsrvmneyList_EndDay);

    // 적립금 관리 상세 조회
    var fundRsrvmneyAddSn_SearchParam = {};
    fundRsrvmneyAddSn_SearchParam.rsrvmneySn = $('#rsrvmneyRsrvmneySn').val();
    fn_ajax_call("kicpa/selectfundRsrvmneySn.do", fundRsrvmneyAddSn_SearchParam, fundRsrvmneyList.selectfundRsrvmneySn_success, fundRsrvmneyList.selectfundRsrvmneySn_error);
}
fundRsrvmneyList.selectfundRsrvmneySn_success = function(result) {
    //
    AUIGrid.setGridData(fundRsrvmneyList.fundRsrvmneyList_gridID2, result.rsrvmneyList);
}
fundRsrvmneyList.selectfundRsrvmneySn_error = function(xhr, status, error) {
    alert("적급금 관리 상세 조회 실패");
}

fundRsrvmneyList.insertFundRsrvmneyAdd_error = function (xhr, status, error) {
    alert("적립금(추가) 수정/저장 실패");
}




fundRsrvmneyList.selectfundRsrvmneyList_success = function(result) {
    AUIGrid.setGridData(fundRsrvmneyList.fundRsrvmneyList_gridID, result.rsrvmneyList);
}
fundRsrvmneyList.selectfundRsrvmneyList_error = function(xhr, status, error) {
    alert("손해배상 공동기금 계좌내역 조회 실패");
}


fundRsrvmneyList.deletefundRsrvmney_success = function(result) {

    var fundRsrvmneyList_Div = $("#fundRsrvmneyList_Div").selectpicker('val');
    var fundRsrvmneyList_Audit = $('#fundRsrvmneyList_Audit').selectpicker('val');
    var fundRsrvmneyList_StartDay = $("#fundRsrvmneyList_StartDay").val();
    var fundRsrvmneyList_EndDay = $("#fundRsrvmneyList_EndDay").val();

    fundRsrvmneyList.fn_search_fundRsrvmneyList($("#fundAccountAdd_AcnutSn").val(), fundRsrvmneyList_Div, fundRsrvmneyList_Audit, fundRsrvmneyList_StartDay, fundRsrvmneyList_EndDay);
}
fundRsrvmneyList.deletefundRsrvmney_error = function(xhr, status, error) {
    alert("선택 삭제 실패");
}
