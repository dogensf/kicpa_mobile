var budgetSetup = budgetSetup || {
    sep:"/" // 권한설정 담당부서 seperator
   ,endYn:"N"
   ,admin:{}
}; // 예상편성 namespace

budgetSetup.orgnztn_grid_wrap = null;
budgetSetup.author_grid_wrap = null;
budgetSetup.dstb_grid_wrap = null;
budgetSetup.rate_grid_wrap = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        fn_AUIGrid_resize([{id:"budgetSetup_orgnztn_grid_wrap",obj:budgetSetup.orgnztn_grid_wrap}
            ,{id:"budgetSetup_author_grid_wrap",obj:budgetSetup.author_grid_wrap}
            ,{id:"budgetSetup_dstb_grid_wrap",obj:budgetSetup.dstb_grid_wrap}
            ,{id:"budgetSetup_rate_grid_wrap",obj:budgetSetup.rate_grid_wrap}]);
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(function() {
        budgetSetup.admin.admin = $("#budgetSetup").attr("data-admin");
        budgetSetup.admin.empid = $("#budgetSetup").attr("data-empid");


        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

        budgetSetup.fn_createAUIGrid(); // AUGRID 생성

        budgetSetup.fn_init(); // 화면 초기화

        budgetSetup.fn_init_events(); // 이벤트 등록
    }
);

budgetSetup.fn_init = function() {


    //편성년도 셋팅
    $("#budgetSetup_author_year").selectpicker({
        noneSelectedText:"년도선택"
    });

    // 안분비율설정 조회
    budgetSetup.fn_budgetDstbList();
    // 공통코드 조회
    /*
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/getComnCode.do',
        cache : false,
        data: {grpCd:"GN0001"},
        success: function(data)
        {
            budgetSetup.fsseCdList = data["GN0001"];
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });*/

    // 예산편성 설정화면 초기화 조회
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/initBudgetSetup.do',
        cache : false,
        data: {},
        success: function(data)
        {
            // 편성관리 조회
            budgetSetup.fn_set_budgetFrmtnYear(data.budgetFrmtnYearList);
            // 권한설정 부서 조회
            budgetSetup.budgetDeptList = data.budgetDeptList;
            // 권한설정 직원 조회
            budgetSetup.budgetEmpList = data.budgetEmpList;
            // C/C
            budgetSetup.fsseCdList = data.maCcList;
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });

}

//AUIGrid 를 생성합니다.
budgetSetup.fn_createAUIGrid = function() {

    var orgnztn_columnLayout = [ {
        dataField : "creatYear",
        headerText : "생성년도",
        width:"100px",
        dataType : "date",
        dateInputFormat : "yyyy", // 실제 데이터의 형식 지정
        formatString : "yyyy", // 실제 데이터 형식을 어떻게 표시할지 지정
        renderer : {
            type : "IconRenderer",
            iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
            iconHeight : 16,
            iconPosition : "aisleRight",
            iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
                "default" : "./auigrid/AUIGrid/images/calendar-icon.png" // default
            },
            onClick : function(event) {
                // 달력 아이콘 클릭하면 실제로 달력을 띄움.
                // 즉, 수정으로 진입함.
                AUIGrid.openInputer(event.pid);
            }
        },
        editRenderer : {
            type : "BTCalendarRenderer",
            defaultFormat : "yyyy", // 달력 선택 시 데이터에 적용되는 날짜 형식
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
            onlyMonthMode : true, // 일 단위 달력이 아닌 월 단위 달력 출력
            showEditorBtn : false,
            showEditorBtnOver : false,
            maxlength:4,
            // bootstrap-datepicker 속성을 여기에 설정하십시오.
            // API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
            btOpts : {
                language : "ko",
                //startView : 2, // 년도부터 선택하게 할지 여부...(주석 제거 하고 확인해보세요.)
                minViewMode : 2  // 0 : 일, 1 :월, 2 :년 단위 달력

            }  // end of btOpts
        }
    } , {
        dataField : "creatDe",
        headerText : "생성일",
        width:"200px",
        dataType : "date",
        dateInputFormat : "yyyy-mm-dd", // 실제 데이터의 형식 지정
        formatString : "yyyy-mm-dd", // 실제 데이터 형식을 어떻게 표시할지 지정
        renderer : {
            type : "IconRenderer",
            iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
            iconHeight : 16,
            iconPosition : "aisleRight",
            iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
                "default" : "./auigrid/AUIGrid/images/calendar-icon.png" // default
            },
            onClick : function(event) {
                // 달력 아이콘 클릭하면 실제로 달력을 띄움.
                // 즉, 수정으로 진입함.
                AUIGrid.openInputer(event.pid);
            }
        },
        editRenderer : {
            type : "BTCalendarRenderer",
            showExtraDays : true, // 지난 달, 다음 달 여분의 날짜(days) 출력 안함
            onlyCalendar : true, // 사용자 입력 불가, 즉 달력으로만 날짜입력 (기본값 : true)
            showEditorBtn : false,
            showEditorBtnOver : false,
            defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
            maxlength:8,

            validator : function(oldValue, newValue, rowItem) { // 에디팅 유효성 검사
                var date, isValid = true;
                if(isNaN(Number(newValue)) ) { //20190201 형태 또는 그냥 1, 2 로 입력한 경우는 허락함.
                    if(isNaN(Date.parse(newValue))) { // 그냥 막 입력한 경우 인지 조사. 즉, JS 가 Date 로 파싱할 수 있는 형식인지 조사
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                }
                // 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
                return { "validate" : isValid, "message"  : "날짜 형식으로 입력해주세요." };
            }
        }
    }];

    var author_columnLayout = [  {
        dataField : "chrgPartCd",
        headerText : "담당부문 선택",
        width:"25%",
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = budgetSetup.budgetDeptList.find(function(item) {
                return item.cdDept == value;
            });
            if(typeof selItem == "undefined") {
                return "담당부문을 선택하세요.";
            }
            return selItem.nmDept;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            keyField : "cdDept", // key 에 해당되는 필드명
            valueField : "nmDept", // value 에 해당되는 필드명
            list:budgetSetup.budgetDeptList,
            descendants : [ "chrgDeptCd" ,"chrgCd" ],
            descendantDefaultValues : ["",""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {

                var list = budgetSetup.budgetDeptList.filter(function(arr) {
                    if(arr.hDept == "0000") {
                        if(!isNull(arr.dtEnd) && String(arr.dtEnd).substr(0,4) < item.budgetYear ) {
                            return false
                        }
                        return true;
                    }else {
                        return false;
                    }
                })
                return list;
            }
        }

    } , {
        dataField : "chrgCd",
        headerText : "담당자 선택",
        width:"25%",
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = budgetSetup.budgetEmpList.find(function(arr) {
                return arr.empId == value;
            });
            if(typeof selItem == "undefined") {
                return "담당자를 선택하세요.";
            }
            return selItem.korNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            keyField : "empId", // key 에 해당되는 필드명
            valueField : "korNm", // value 에 해당되는 필드명
            list:budgetSetup.budgetEmpList,
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetSetup.fn_get_budgetEmpFilterList(item);
            }
        }
    } , {
        dataField : "chrgDeptCd",
        headerText : "권한설정 담당부서 선택",
        width:"50%",
        renderer : {
            type : "IconRenderer",
            iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
            iconHeight : 16,
            iconPosition : "aisleRight",
            iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
                "default" : "./auigrid/AUIGrid/images/list-icon.png" // default
            },
            onClick : function(event) {
                // 아이콘을 클릭하면 수정으로 진입함.
                AUIGrid.openInputer(event.pid);
            }
        },
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            if(isNull2(value)) {
                return "담당부서를 선택하세요";
            }

            var valArr = value.split(budgetSetup.sep);
            var nmArr = [];

            if(budgetSetup.budgetDeptList instanceof Array) {
                for(var i=0; i < valArr.length; i++) {
                    for(var j=0; j<budgetSetup.budgetDeptList.length; j++) {
                        if(valArr[i] == budgetSetup.budgetDeptList[j].cdDept) {
                            nmArr.push(budgetSetup.budgetDeptList[j].nmDept);
                            break;
                        }
                    }
                }
            }
            if(nmArr.length > 0) {
                return nmArr.join(budgetSetup.sep);
            }else {
                return "";
            }

        },
        editRenderer : {
            type : "DropDownListRenderer",
            showEditorBtn : false,
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            multipleMode : true, // 다중 선택 모드(기본값 : false)
            showCheckAll : true, // 다중 선택 모드에서 전체 체크 선택/해제 표시(기본값:false);
            //descendants : [ "chrgCd" ],
            keyField : "cdDept", // key 에 해당되는 필드명
            valueField : "nmDept", // value 에 해당되는 필드명
            //list: budgetSetup.budgetDeptList,
            delimiter : budgetSetup.sep, // 다중 선택시 구분자 (기본값 : 컴마(,))
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var list = budgetSetup.budgetDeptList.filter(function(arr) {
                    var dtEnd = isNull(arr.dtEnd) ? "" : arr.dtEnd.substr(0,4);

                    if(arr.hDept != "0000" && arr.rootDept == item.chrgPartCd && ( isNull(dtEnd) || (!isNull(dtEnd) && dtEnd <= item.budgetYear ) )) {
                        return true;
                    }else if(!isNull(item.chrgDeptCd)) {
                        var valArr = item.chrgDeptCd.split(budgetSetup.sep);
                        var rtn_bool = false;

                        for(var i=0; i < valArr.length; i++) {
                            if(valArr[i] == arr.cdDept) {
                                rtn_bool = true;
                                break;
                            }
                        }

                        return rtn_bool;
                    }else {
                        return false;
                    }
                });
                return list;
            }
        }
    }
    ];

    var item_columnLayout = [ {
        dataField : "dstbNm",
        headerText : "안분항목명",
        width:"100%",
        sortable:true,
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:50,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 50) {
                    isValid = false;
                    item.dstbNm = newValue.getByteString(50);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    } ];

    var rate_columnLayout = [ {
        dataField : "fsseCd",
        headerText : "회계구분",
        width:"60%",
        sortable:true,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            if(budgetSetup.fsseCdList instanceof Array) {
                var selItem = budgetSetup.fsseCdList.find(function(item) {
                    return item.cdCc == value;
                });
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "선택하세요.";
                }
                return selItem.nmCc;
            }else {
                return "";
            }
            return selItem.cd_nm;
        },
        editRenderer : {
        type : "DropDownListRenderer",
            autoCompleteMode : false, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            keyField : "cdCc", // key 에 해당되는 필드명
            valueField : "nmCc", // value 에 해당되는 필드명
            list:budgetSetup.fsseCdList,
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var rtnList = budgetSetup.fsseCdList.filter(function (obj) {

                    if (obj["ynUse"] == "Y") {
                        return true;
                    } else if (obj["cdCc"] == item.fsseCd) {
                        return true;
                    }
                    return false;
                });

                return rtnList;
            }
        }
    },{
        dataField : "dstbRate",
        headerText : "안분비율",
        width:"40%",
        sortable:true,
        dataType : "numeric",
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            return value+"%";
        },
        editRenderer : {
            type : "InputEditRenderer",
            onlyNumeric : true, // 0~9 까지만 허용
            allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
            maxlength:3,
            formatString:"###%",
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = Number(newValue);
                if(!isNaN(numVal) && numVal > 100) {
                    isValid = false;
                }
                return { "validate" : isValid, "message"  : "100보다 큰 수를 입력 할 수 없습니다." };
            }
        }
    } ];

    // 그리드 속성 설정
    var gridPros = {
        headerHeight: 24, //헤더의 높이를 지정합니다.
        editable : true,
        rowIdField : "", // row 를 구별짓는 유니크한 값을 갖는 필드 설정 (10만 행 이상의 대용량인 경우 반드시 설정을 권함 )
        showRowCheckColumn: true,
        //showRowNumColumn:true,//엑스트라 행 체크박스(showRowCheckColumn=true)를 설정한 경우, 헤더 부분에 전체 선택 체크박스를 표시할지 여부를 지정합니다.
        //rowNumHeaderText:"NO", //행번호 칼럼 설정한 경우(showRowNumColumn=true) 행번호 칼럼의 헤더에 출력할 텍스트를 지정합니다.
        enableFilter : true,
        enableRowCheckShiftKey : true, // 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
        nullsLastOnSorting : true, // 정렬 시 빈값(undefined, null, "")이 항상 하단에 위치할지 여부 (기본값 : true)
        enableMovingColumn:false,
        selectionMode:"singleRow",
        showStateColumn : true
        // noDataMessage : "출력할 데이터가 없습니다."
    };

    fn_AUIGrid_create([{id:"budgetSetup_orgnztn_grid_wrap", obj:[budgetSetup,"orgnztn_grid_wrap"], layout:orgnztn_columnLayout , prop:gridPros}
        ,{id:"budgetSetup_author_grid_wrap", obj: [budgetSetup,"author_grid_wrap"], layout:author_columnLayout, prop:gridPros}
        ,{id:"budgetSetup_dstb_grid_wrap", obj: [budgetSetup,"dstb_grid_wrap"], layout:item_columnLayout, prop:gridPros}
        ,{id:"budgetSetup_rate_grid_wrap",obj: [budgetSetup,"rate_grid_wrap"],layout:rate_columnLayout,prop:gridPros}
    ]);

    AUIGrid.setColumnSizeList(budgetSetup.orgnztn_grid_wrap, [200, 250]);

    fn_AUIGrid_resize([{id:"budgetSetup_orgnztn_grid_wrap",obj:budgetSetup.orgnztn_grid_wrap}]);

}

budgetSetup.fn_init_events = function() {
    // 권한설정 수정 시작 이벤트
    AUIGrid.bind(budgetSetup.author_grid_wrap, "cellEditBegin", function( event ) {
        // 마감완료 처리
        if(budgetSetup.endYn == "Y") {
            return false;
        }

        // 담당부분에 추가 제외 수정 못하게
        if(event.item.setupSn > 0 && event.dataField == "chrgPartCd") {
            return false;
        }

    });

    // 권한설정 셀 데이터 변경이 완료 됐을 때 이벤트
    AUIGrid.bind(budgetSetup.author_grid_wrap, "cellEditEnd", function( event ) {

        // 담당부서에 선택한 담당직원이 존재하는지 체크
        /*
        if(event.dataField == "chrgDeptCd") {
            var list = budgetSetup.fn_get_budgetEmpFilterList(event.item);
            var chrgCd = event.item.chrgCd;

            var idx = list.findIndex(function(el) {
                return el.empId == chrgCd;
            });

            if(idx < 0 || idx == "undefined") {
                AUIGrid.setCellValue(budgetSetup.author_grid_wrap,event.rowIndex,"chrgCd","");
            }
        };*/
    });

    // 안분비율설정 선택
    AUIGrid.bind(budgetSetup.dstb_grid_wrap, "selectionChange", function( event ) {
        var dstbSn = event.selectedItems[0].item.dstbSn;

        if(dstbSn > 0) {
            budgetSetup.fn_budgetRateList(dstbSn);
        }else {
            AUIGrid.clearGridData(budgetSetup.rate_grid_wrap);
        }
    });

    // 탭 이동이 완료됐을 때 이벤트
    $("body").on("shown.bs.tab", "#budgetSetup_tab", function(e) {

        switch (e.target.id) {
            case "budgetSetup_tab1" : // 편성관리
                fn_AUIGrid_resize([{id:"budgetSetup_orgnztn_grid_wrap",obj:budgetSetup.orgnztn_grid_wrap}]);
                break;
            case "budgetSetup_tab2" : // 권한설정
                fn_AUIGrid_resize([{id:"budgetSetup_author_grid_wrap",obj:budgetSetup.author_grid_wrap}]);

                var author_year = $("#budgetSetup_author_year").selectpicker("val");
                if(isNull2(author_year)) {
                    var year = getCurrentDate().toDate().getDateFormat("YYYY");

                    $("#budgetSetup_author_year").selectpicker("val",year);
                }

                break;
            case "budgetSetup_tab3" : // 안분비율설정
                fn_AUIGrid_resize([{id:"budgetSetup_dstb_grid_wrap",obj:budgetSetup.dstb_grid_wrap}
                    ,{id:"budgetSetup_rate_grid_wrap",obj:budgetSetup.rate_grid_wrap}]);

                break;
        }
    });

    // 편성관리 탭 행 추가
    $("#budgetSetup_orgnztn_add").on("click",function(e) {
        var items = AUIGrid.getGridData(budgetSetup.orgnztn_grid_wrap);
        var curDate = getCurrentDate();
        var year = curDate.toDate().getDateFormat("YYYY");

        if(items.length > 0) {
             var creatYear = items[0].creatYear;
            if(!isNull2(creatYear)) {
                year = (creatYear+"0101").toDate().getAddDate(1,"Y").getDateFormat("YYYY");
            }
        }

        AUIGrid.addRow(budgetSetup.orgnztn_grid_wrap,{creatSn:0, creatYear:year,creatDe:curDate,deleteYn:"N"},"first");

    });

    // 편성관리 탭 행 삭제
    $("#budgetSetup_orgnztn_delete").on("click",function(e) {
        var grid = budgetSetup.orgnztn_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(budgetSetup.orgnztn_grid_wrap);

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.creatSn > 0) {
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(deleteItems.length > 0) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetFrmtnYear.do',
                cache : false,
                data: {frmtns:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetSetup.fn_set_budgetFrmtnYear(data.budgetFrmtnYearList);
                    }else if(result.result == "D") { // 예산편성에 해당 년도 정보가 있는경우
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].creatYear : "," + list[i].creatYear;
                        }

                        alertMessage(message + "년도 예산편성 내역이 존재합니다.","","-");
                    } else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }else {
            AUIGrid.removeRow(grid,removeIndexs);
        }
    });

    // 편성관리 탭 저장
    $("#budgetSetup_orgnztn_save").on("click",function(e) {
        var grid = budgetSetup.orgnztn_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);
        var saveItems = [].concat(addItems);
        saveItems = saveItems.concat(editItems);
        var validate = true;

        if(saveItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        validate = AUIGrid.validateGridData(grid, ["creatYear","creatDe"],"필수 입력 값입니다.");
        if(!validate) {return false;}

        for(var i=0; i < saveItems.length; i++) {
            var creatYear = saveItems[i].creatYear;
            var creatDe = saveItems[i].creatDe;
            var uid = saveItems[i]._$uid;

            if(!isValidDateTime(creatYear,"YYYY")) {
                validate = false;
                alertMessage("유효하지 않은 날짜형식입니다.","","-");
                AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,uid), AUIGrid.getColumnIndexByDataField(grid,"creatYear"));
                break;
            }

            if(!isValidDateTime(creatDe,"YYYYMMDD")) {
                validate = false;
                alertMessage("유효하지 않은 날짜형식입니다.","","-");
                AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,uid), AUIGrid.getColumnIndexByDataField(grid,"creatDe"));
                break;
            }

            for(var j=0; j < items.length; j++) {
                var des_creatYear = items[j].creatYear;
                var des_creatDe = items[j].creatDe;
                var des_uid = items[j]._$uid;
                // 생성년도 중복 입력 체크
                if(uid != des_uid && creatYear == des_creatYear) {
                    validate = false;
                    alertMessage("중복된 생성년도를 입력할 수 없습니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,uid), AUIGrid.getColumnIndexByDataField(grid,"creatYear"));
                    break;
                }
            }
        }

        if(validate) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/insertBudgetFrmtnYear.do',
                cache : false,
                data: {frmtns:JSON.stringify(saveItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetSetup.fn_set_budgetFrmtnYear(data.budgetFrmtnYearList);
                    }else if(result.result == "D") {
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].creatYear : "," + list[i].creatYear;
                        }

                        Swal.fire({
                                title: "",
                                html: message + "년도 편성관리 내역이 존재합니다.<br>" + "재조회 하시겠습니까?" ,
                                icon: "",
                                    showCancelButton: true,
                                    confirmButtonText: "확인",
                                    cancelButtonText: "취소",
                                    reverseButtons: false }).then(function(result) {
                                if (result.value) {
                                    budgetSetup.fn_budgetFrmtnList();
                                }
                            });
                        //alertMessage(message + "년도 편성관리 내역이 존재합니다.","","-");
                    }else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }
    });

    // 편성년도 변경
    $('#budgetSetup_author_year').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        var sel_year = $(e.target).val();

        if(previousValue != sel_year && !isNull(sel_year)) {
            budgetSetup.fn_budgetAuthorList(sel_year);
        }

        if(isNull(sel_year)) {
            AUIGrid.showInfoMessage(budgetSetup.author_grid_wrap, '<div style="text-align:center; display: inline-block; line-height:400px;">편성년도를 먼저 선택해 주세요.\n</div>');
            $("#budgetSetup_author_grid_wrap").find(".aui-grid-info-layer").css("width","100%").css("text-align","center");
        }
    });

    // 권한설정 추가
    $("#budgetSetup_author_add").on("click", function(e) {
        var budgetYear = $("#budgetSetup_author_year").selectpicker("val");

        if(isNull2(budgetYear)) {
            alertMessage("편성년도를 선택해 주십시오.","","-");
            return false;
        }

        if(budgetSetup.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetSetup.author_grid_wrap;
        var item = {setupSn:0 , budgetYear:budgetYear,chrgPartCd:"",chrgCd:"",orgChrgCd:"",chrgDeptCd:"",orgChrgDeptCd:"" , deleteYn:"N"};

        AUIGrid.addRow(grid,item);
    });

    // 권한설정 삭제
    $("#budgetSetup_author_delete").on("click", function(e) {

        var grid = budgetSetup.author_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        if(budgetSetup.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.setupSn > 0) {
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(deleteItems.length > 0) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetAuthor.do',
                cache : false,
                data: {budgetYear:$("#budgetSetup_author_year").selectpicker("val"), deleteYn:'N',progrsFlag:'1',sep:budgetSetup.sep, authors:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetSetup.fn_set_budgetAuthorList(data.budgetAuthorList);
                    }else if(result.result == "D") {
                        alertMessage("예산편성 내역에 등록된 권한설정입니다.","","-");
                    }else if(result.result == "END") {
                        alertMessage("예산편성이 마감되었습니다.","","-");
                    }else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }else {
            AUIGrid.removeRow(grid,removeIndexs);
        }
    });

    // 권한설정 저장
    $("#budgetSetup_author_save").on("click", function(e) {
        var grid = budgetSetup.author_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);
        var checkItems = [].concat(addItems).concat(editItems);
        var saveItems = [];

        if(budgetSetup.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        // 변경 체크
        for(var i=0; i < editItems.length; i++) {
            var orgChrgCd = editItems[i].orgChrgCd;
            var chrgCd = editItems[i].chrgCd;
            var orgChrgDeptCd = editItems[i].orgChrgDeptCd;
            var chrgDeptCd = editItems[i].chrgDeptCd;
            var orgChrgDeptCdArr = String(isNull(orgChrgDeptCd) ? "" : orgChrgDeptCd).split(budgetSetup.sep);
            var chrgDeptCdArr = String(isNull(chrgDeptCd) ? "" : chrgDeptCd).split(budgetSetup.sep);
            var fChrgIdx = -1;
            var fDeptIdx = -1;
            var checkArr = [];

            if(orgChrgCd != chrgCd) {
                fChrgIdx = addItems.findIndex(function(arr) {
                    return arr.chrgCd == orgChrgCd;
                });

                if(fChrgIdx > -1) {
                    chrgDeptCd = addItems[fChrgIdx].chrgDeptCd;
                    orgChrgDeptCdArr = String(isNull(chrgDeptCd) ? "" : chrgDeptCd).split(budgetSetup.sep);
                }else {
                    continue;
                }
            }

            for(var j=0; j < orgChrgDeptCdArr.length; j++) {
                if(chrgDeptCdArr.length > 0) {
                    fDeptIdx = chrgDeptCdArr.findIndex(function(arr) {
                        return arr == orgChrgDeptCdArr[j];
                    });

                    if(fDeptIdx < 0) {
                        checkArr.push(orgChrgDeptCdArr[j]);
                    }
                }
            }

            editItems[i].orgChrgDeptCd = checkArr.join(budgetSetup.sep);
        }

        if(addItems.length < 1 && editItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["chrgPartCd","chrgCd","chrgDeptCd"],"필수 입력 값입니다.");
        if(!valid) { return false;}

        for(var i=0; i < items.length; i++) {
            var src_chrgPartCd = items[i].chrgPartCd;
            var src_chrgCd = items[i].chrgCd;
            var src_uid = items[i]._$uid;

            if(addItems.some(function(item) {
                return items[i]._$uid == item._$uid;
            })) {
                saveItems.push(items[i]);
            }

            for(var j=0; j < checkItems.length; j++) {
                var des_chrgPartCd = checkItems[j].chrgPartCd;
                var des_chrgCd = checkItems[j].chrgCd;
                var des_uid = checkItems[j]._$uid;
                if(des_uid != src_uid && src_chrgPartCd == des_chrgPartCd && src_chrgCd == des_chrgCd) {
                    valid = false;
                    alertMessage("담당자가 중복 입니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"chrgCd"));
                    return false;
                    break;
                }
            }
        }

        if(valid) {
            saveItems = saveItems.concat(editItems);

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetAuthor.do',
                cache : false,
                data: {budgetYear:$("#budgetSetup_author_year").selectpicker("val"), deleteYn:'N',progrsFlag:'1',sep:budgetSetup.sep,authors:JSON.stringify(saveItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetSetup.fn_set_budgetAuthorList(data.budgetAuthorList);
                    }else if(result.result == "D") {
                        alertMessage("예산편성에 등록된 데이터 존재합니다.<br> 편성내용을 수정하고 저장하세요. ","","-");
                    }else if(result.result == "END") {
                        alertMessage("예산편성이 마감되었습니다.","","-");
                    } else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }

    });
    // 안분비율 아이템 추가
    $("#budgetSetup_dstb_add").on("click" ,function(e) {
        var grid = budgetSetup.dstb_grid_wrap;
        var item = {dstbSn:0, dstbNm:"", deleteYn:'N'};

        AUIGrid.addRow(grid,item);
    });

    // 안분비율 아이템 삭제
    $("#budgetSetup_dstb_delete").on("click" ,function(e) {
        var grid = budgetSetup.dstb_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);
        var selItems = AUIGrid.getSelectedItems(grid);

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.dstbSn > 0) {
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(deleteItems.length > 0) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetDstb.do',
                cache : false,
                data: { deleteYn:'N', dstbs:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        var dstbSn = -1;
                        if(selItems.length > 0) {
                            dstbSn = selItems[0].item.dstbSn;
                        }
                        budgetSetup.fn_set_budgetDstbList(data.budgetDstbList,dstbSn);
                    } else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }else {
            AUIGrid.removeRow(grid,removeIndexs);
        }
    });

    // 안분비율 아이템 저장
    $("#budgetSetup_dstb_save").on("click" ,function(e) {
        var grid = budgetSetup.dstb_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var selItems = AUIGrid.getSelectedItems(grid);
        var items = AUIGrid.getGridData(grid);
        var saveItems = [];

        if(addItems.length < 1 && editItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["dstbNm"],"필수 입력 값입니다.");

        if(valid) {
            for(var i=0; i < items.length; i++) {
                if(addItems.some(function(item) {
                    return items[i]._$uid == item._$uid;
                }) || editItems.some(function(item) {
                    return items[i]._$uid == item._$uid;
                })) {
                    saveItems.push(items[i]);
                }
            }

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetDstb.do',
                cache : false,
                data: { deleteYn:'N',dstbs:JSON.stringify(saveItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        var dstbSn = -1;
                        if(selItems.length > 0) {
                            dstbSn = selItems[0].item.dstbSn;
                        }
                        budgetSetup.fn_set_budgetDstbList(data.budgetDstbList,dstbSn);
                    }else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }
    });

    // 안분비율 비율 추가
    $("#budgetSetup_rate_add").on("click" ,function(e) {
        var grid2 = budgetSetup.dstb_grid_wrap;

        var selectDstbs = AUIGrid.getSelectedItems(grid2);

        //console.log("selectDstbs",selectDstbs);

        if(selectDstbs.length > 0) {
            var dstbSn = selectDstbs[0].item.dstbSn;
            if(dstbSn < 1) {
                alertMessage("안분항목을 저장 후 안분비율을 추가하십시오.","","-");
                return false;
            }
        }else {
            alertMessage("선택 된 내역이 없습니다.","","-");
            return false;
        }

        var grid = budgetSetup.rate_grid_wrap;
        var item = { dstbRateSn:0, dstbSn:dstbSn, fsseCd:'', dstbRate:0, deleteYn:'N'};

        AUIGrid.addRow(grid,item);
    });

    // 안분비율 비율 삭제
    $("#budgetSetup_rate_delete").on("click" ,function(e) {
        var grid = budgetSetup.rate_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.dstbRateSn > 0) {
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(deleteItems.length > 0) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetRate.do',
                cache : false,
                data: { deleteYn:'N', dstbSn:deleteItems[0].dstbSn, rates:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetSetup.fn_set_budgetRateList(data.budgetRateList);
                    } else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }else {
            AUIGrid.removeRow(grid,removeIndexs);
        }
    });

    // 안분비율 비율 저장
    $("#budgetSetup_rate_save").on("click" ,function(e) {
        var grid = budgetSetup.rate_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);
        var checkItems = [].concat(addItems).concat(editItems);
        var saveItems = [];

        if(addItems.length < 1 && editItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["fsseCd","dstbRate"],"필수 입력 값입니다.");
        if(!valid) { return false;}

        var dstbRate = 0;
        for(var i=0; i < items.length; i++) {
            dstbRate += items[i].dstbRate;
            var src_fsseCd = items[i].fsseCd;
            var src_uid = items[i]._$uid;

            if(addItems.some(function(item) {
                return items[i]._$uid == item._$uid;
            }) || editItems.some(function(item) {
                return items[i]._$uid == item._$uid;
            })) {
                saveItems.push(items[i]);
            }

            for(var j=0; j < checkItems.length; j++) {
                var des_fsseCd = checkItems[j].fsseCd;
                var des_uid = checkItems[j]._$uid;
                if(src_uid != des_uid && src_fsseCd == des_fsseCd) {
                    valid = false;
                    alertMessage("회계구분이 중복 됩닙니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"fsseCd"));
                    return false;
                    break;
                }
            }
        }

        if(dstbRate > 100) {
            alertMessage("합계가 " + dstbRate +"% 입니다.","","-");
            return false;
        }

        if(valid) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetRate.do',
                cache : false,
                data: { deleteYn:'N',dstbSn:saveItems[0].dstbSn,rates:JSON.stringify(saveItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetSetup.fn_set_budgetRateList(data.budgetRateList);
                    }else {
                        alertMessage("저장 된 내역이 없습니다.","","-");
                    }
                },
                onError : function(status, e) {
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }
    });
}

budgetSetup.fn_get_budgetEmpFilterList = function (item) {
    var chrgDeptCd =  isNull(item.chrgDeptCd)  ? [] : item.chrgDeptCd.split(budgetSetup.sep);
    var year = $("#budgetSetup_author_year").val();

    var list = budgetSetup.budgetEmpList.filter(function(arr) {
        var deptIdx = -1;
        if(isNull(item.chrgDeptCd)) {
            deptIdx = 1;
        }else {
            /*deptIdx = chrgDeptCd.findIndex(function(el) {
                return arr.deptCode == el;
            });*/
        }
        //담당부서 상관없이 담당자 선택
        deptIdx = 1;
        var enterDt = isNull(arr.enterDt) ? "" : arr.enterDt;
        var retireDt = isNull(arr.retireDt) ? "" : arr.retireDt;

        if(deptIdx > -1 && item.chrgPartCd == arr.deptRoot && year >= String(enterDt).substr(0,4)
            && ( (!isNull(retireDt) && String(retireDt).substr(0,4) >= year) || isNull(retireDt) ) ) {
            return true;
        }else if(item.setupSn > 0 && item.chrgCd == arr.empId) {
            return true;
        }else {
            return false;
        }
    });

    //console.log("fn_get_budgetEmpFilterListc",list);
    return list;
}

// 편성관리 조회
budgetSetup.fn_budgetFrmtnList = function() {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetFrmtnYearList.do',
        cache : false,
        data: {},
        success: function(data)
        {
            budgetSetup.fn_set_budgetFrmtnYear(data.budgetFrmtnYearList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 편성관리 년도 셋팅
budgetSetup.fn_set_budgetFrmtnYear = function(list) {
    var grid = budgetSetup.orgnztn_grid_wrap;
    var selects = [];

    // 편성관리 셋팅
    $("#budgetSetup_orgnztn_cnt").text(list.length);
    AUIGrid.setGridData(grid,list);

    // 권한설정 편성년도 셋팅
    $("#budgetSetup_author_year").empty();
    //$("#budgetSetup_author_year").append('<option value="">년도선택</option>');
    $.each(list,function(idx,item) {
        $("#budgetSetup_author_year").append('<option value="' +item.creatYear + '">' + item.creatYear + '</option>')
    });
    $("#budgetSetup_author_year").selectpicker('val',"");
    $("#budgetSetup_author_year").selectpicker('refresh');
}

// 편성관리 년도 셋팅
budgetSetup.fn_set_budgetAuthorList= function(list) {
    var grid =  budgetSetup.author_grid_wrap;
    AUIGrid.setGridData(grid,list);

    // 조회 건수
    $("#budgetSetup_author_cnt").text(list.length);
}

// 권한설정 조회
budgetSetup.fn_budgetAuthorList = function(budgetYear) {

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetAuthorList.do',
        cache : false,
        data: {budgetYear:budgetYear,deleteYn:'N',progrsFlag:'1',sep:budgetSetup.sep},
        success: function(data)
        {
            budgetSetup.fn_set_budgetAuthorList(data.budgetAuthorList);
            budgetSetup.endYn = data.endYn
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 안분비율설정 항목 조회
budgetSetup.fn_budgetDstbList = function(dstbSn) {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetDstbList.do',
        cache : false,
        data: {deleteYn:'N'},
        success: function(data)
        {
            budgetSetup.fn_set_budgetDstbList(data.budgetDstbList,dstbSn)
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 안분비율설정 항목 설정
budgetSetup.fn_set_budgetDstbList = function(list,dstbSn) {
    var grid = budgetSetup.dstb_grid_wrap;
    AUIGrid.setGridData(grid,list);

    // 선택한 안분비율 항목 있는지 확인
    var fIdx = list.findIndex(function(el) {
        return el.dstbSn == dstbSn;
    });

    // 존재하면 항목비율 조회
    if(fIdx > -1) {
        budgetSetup.fn_budgetRateList(dstbSn);
    }else {
        AUIGrid.clearGridData(budgetSetup.rate_grid_wrap);
    }
}

// 안분비율설정 항목비율 조회
budgetSetup.fn_budgetRateList = function(dstbSn,dstbRateSn) {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetRateList.do',
        cache : false,
        data: {dstbSn:dstbSn,dstbRateSn:dstbRateSn,deleteYn:'N'},
        success: function(data)
        {
            var grid = budgetSetup.rate_grid_wrap;
            AUIGrid.setGridData(grid,data.budgetRateList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 안분비율설정 항목비율 설정
budgetSetup.fn_set_budgetRateList = function(list) {
    var grid = budgetSetup.rate_grid_wrap;
    AUIGrid.setGridData(grid,list);
}
