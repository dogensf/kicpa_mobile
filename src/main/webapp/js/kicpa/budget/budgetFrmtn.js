var budgetFrmtn = budgetFrmtn || {
    filterGrpCd:"GN0002"
   ,endYn:"N" // 예산편성마감
   ,excelPrintYN:"N"
   ,admin:{}
   ,empList:[] //담당직원
   ,partList:[] //담당부분
   ,deptList:[] //담당부서
   ,sportDeptList:[] //지원부서
   ,accnutUnitList:[] // 회계단위
   ,budgetSbjectList:[] // 예산단위

   ,frmtn_grid_wrap:null // 예산편성
   ,policy_grid_wrap:null // 정책과제
   ,execut_grid_wrap:null // 실행과제
   ,prtn_grid_wrap:null // 추진내용
   ,manage_policy_grid:null // 정책과제
   ,manage_execut_grid:null // 실행과제
   ,manage_grid_wrap:null // 관리번호
   ,dstb_grid:null // 암분비율
   ,history_grid:null // 수정이력
   ,qu_history_grid:null // 분기 수정이력

}; // 예상편성 namespace

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        budgetFrmtn.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {
        budgetFrmtn.admin.admin = $("#budgetFrmtn").attr("data-admin");
        budgetFrmtn.admin.empid = $("#budgetFrmtn").attr("data-empid");

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

        budgetFrmtn.fn_createAUIGrid(); // AUGRID 생성

        budgetFrmtn.fn_init_events(); // 이벤트 등록

        budgetFrmtn.fn_init(); // 화면 초기화

    }
);

budgetFrmtn.fn_init = function() {

    $("#budgetFrmtn_year").selectpicker({
        noneSelectedText:"년도선택"
    });

    $("#budgetFrmtn_year").selectpicker('val',getCurrentDate().toDate().getDateFormat("YYYY"));
    // 기초코드 조회
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/code/itemFilterList.do',
        cache : false,
        data: { deleteYn:'N',useYn:'Y',grpCd:budgetFrmtn.filterGrpCd},
        success: function(data)
        {
            budgetFrmtn.fn_set_itemFilter(data.itemFilterList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });

    // 공통코드 조회
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/getComnCode.do',
        cache : false,
        data: {grpCd:"GN0004,GN0005"},
        success: function(data)
        {
            budgetFrmtn.GN0004 = data["GN0004"];
            budgetFrmtn.GN0005 = data["GN0005"];
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });

    // 공통코드 조회
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/initBudgetFrmtn.do',
        cache : false,
        data: {deleteYn:"N"},
        success: function(data)
        {
            budgetFrmtn.budgetDstbList = data.budgetDstbList;
            budgetFrmtn.sportDeptList = data.budgetDeptList;
            budgetFrmtn.accnutUnitList = data.maCcList; // 회계단위
            budgetFrmtn.budgetSbjectList = data.expAcctList; // 계정코드
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

//AUIGrid 를 생성합니다.
budgetFrmtn.fn_createAUIGrid = function() {

    var frmtn_columnLayout = [ {
        dataField : "actvtyAt",
        headerText : "활성/비활성",
        width:80,
        sortable:false,
        headerRenderer : { // 헤더 렌더러
            type : "CheckBoxHeaderRenderer",
            position : "left", // 기본값 bottom
            checked : false, // 최초 체크 여부
            dependentMode : false,
            onClick : budgetFrmtn.fn_activeBudget // 클릭 핸들러
        },
        renderer : {
            type : "CheckBoxEditRenderer",
            editable: true,
            checkValue:"Y",
            unCheckValue:"N",
            checkableFunction:function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
                if(item.budgetProgrsSttus == "1") {
                    return true;
                }
                return false;
            }
        }
    },{
        dataField : "chrgEmpCd",
        headerText : "담당직원",
        width:90,
        sortable:true,
        style:"grid_left_style",
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.empList)) {
                selItem = budgetFrmtn.empList.find(function(arr) {
                    return arr.chrgCd == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }

            var chrgEmpNm = isNull2(item.chrgEmpNm) ? selItem.chrgNm : item.chrgEmpNm;

            return chrgEmpNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            keyField : "chrgCd", // key 에 해당되는 필드명
            valueField : "chrgNm", // value 에 해당되는 필드명
            descendants : [ "chrgPartCd" ,"chrgDeptCd" ],
            descendantDefaultValues : ["",""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var list = budgetFrmtn.empList.filter(function(arr) {
                    // 권한 필터
                    return true;
                });
                return list;
            }
        }
    },{
        dataField : "chrgPartCd",
        headerText : "담당부분",
        width:120,
        sortable:true,
        style:"grid_left_style",
        filter : {
            eanble : true,
            showIcon : true,
            displayFormatValues:true
        },
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.partList)) {
                selItem = budgetFrmtn.partList.find(function(arr) {
                    return arr.chrgPartCd == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }

            var chrgPartNm = isNull2(item.chrgPartNm) ? selItem.chrgPartNm : item.chrgPartNm;

            return chrgPartNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "chrgPartCd", // key 에 해당되는 필드명
            valueField : "chrgPartNm", // value 에 해당되는 필드명
            //descendants : [ "chrgDeptCd" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                //console.log("budgetFrmtn.partList",budgetFrmtn.partList);
                var list = budgetFrmtn.partList.filter(function(part) {
                    var fIdx = budgetFrmtn.budgetEmpDeptList.findIndex(function(deptEmp) {
                        if(item.chrgEmpCd == deptEmp.chrgCd && part.chrgPartCd == deptEmp.chrgPartCd) {
                            return true;
                        }
                    });

                    return fIdx > -1;
                });
                return list;
            }
        }
    },{
        dataField : "chrgDeptCd",
        headerText : "담당부서",
        width:120,
        sortable:true,
        style:"grid_left_style",
        filter : {
            eanble : true,
            showIcon : true,
            displayFormatValues:true
        },
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.deptList)) {
                selItem = budgetFrmtn.deptList.find(function(arr) {
                    return arr.chrgDeptCd == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }

            var chrgDeptNm = isNull2(item.chrgDeptNm) ? selItem.chrgDeptNm : item.chrgDeptNm;

            return selItem.chrgDeptNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "chrgDeptCd", // key 에 해당되는 필드명
            valueField : "chrgDeptNm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                //console.log("budgetFrmtn.deptList",budgetFrmtn.deptList);
                var list = budgetFrmtn.deptList.filter(function(dept) {
                    /*
                    var fIdx = budgetFrmtn.budgetEmpDeptList.findIndex(function(deptEmp) {
                        if(item.chrgEmpCd == deptEmp.chrgCd && item.chrgPartCd == deptEmp.chrgPartCd) {
                            return true;
                        }
                    });

                    return fIdx > -1;
                 */
                return (dept.chrgCd == item.chrgEmpCd && isNull(item.chrgPartCd)) || dept.chrgPartCd == item.chrgPartCd;

                });
                return list;
            }
        }
    },{
        dataField : "sportDeptCd",
        headerText : "지원부서",
        style:"grid_left_style",
        width:120,
        sortable:true,
        filter : {
            eanble : true,
            showIcon : true,
            displayFormatValues:true
        },
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.sportDeptList)) {
                selItem = budgetFrmtn.sportDeptList.find(function(arr) {
                    return arr.cdDept == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }

            var sportDeptNm = isNull2(item.sportDeptNm) ? selItem.nmDept : item.sportDeptNm;

            return sportDeptNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "cdDept", // key 에 해당되는 필드명
            valueField : "nmDept", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {

                var list = budgetFrmtn.sportDeptList.filter(function(arr) {
                    if(arr.lvl != "1" && (isNull(arr.dtEnd) || ( !isNull(arr.dtEnd) && String(arr.dtEnd).substr(0,4) <= item.budgetYear ) )) {
                        return true;
                    }
                });
                return list;
            }
        }
    },{
        dataField : "policyTaskSn",
        headerText : '<i data-func="fn_modal_class" class="flaticon2-gear"></i>정책과제',
        width:150,
        style:"grid_left_style",
        sortable:true,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;

            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetPolicyList)) {
                selItem = budgetFrmtn.budgetPolicyList.find(function(arr) {
                    return arr.policyTaskSn == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }

            return selItem.policyTaskPrjctNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "policyTaskSn", // key 에 해당되는 필드명
            valueField : "policyTaskPrjctNm", // value 에 해당되는 필드명
            descendants : [ "executTaskSn" , "prtnCnSn" , "prtnCnGroupSn"],
            descendantDefaultValues : ["" , "" , ""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var list = budgetFrmtn.budgetPolicyList.filter(function(arr) {
                    return true;
                });
                return list;
            }
        }
    },{
        dataField : "executTaskSn",
        headerText : '<i data-func="fn_modal_class" class="flaticon2-gear"></i>실행과제',
        width:200,
        style:"grid_left_style",
        sortable:true,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetExecutList)) {
                selItem = budgetFrmtn.budgetExecutList.find(function(arr) {
                    return arr.executTaskSn == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }
            return selItem.executTaskPrjctNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "executTaskSn", // key 에 해당되는 필드명
            valueField : "executTaskPrjctNm", // value 에 해당되는 필드명
            descendants : [ "prtnCnSn","prtnCnGroupSn"],
            descendantDefaultValues : ["",""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var list = budgetFrmtn.budgetExecutList.filter(function(execut) {
                    if(execut.policyTaskSn == item.policyTaskSn) {
                        return true;
                    }
                    return false;
                });
                return list;
            }
        }
    },{
        dataField : "prtnCnSn",
        headerText : '<i data-func="fn_modal_class" class="flaticon2-gear"></i>추진내용',
        width:300,
        style:"grid_left_style",
        sortable:true,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetPrtnList)) {
                selItem = budgetFrmtn.budgetPrtnList.find(function(arr) {
                    return arr.prtnCnSn == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }
            return selItem.prtnTaskPrjctNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "prtnCnSn", // key 에 해당되는 필드명
            valueField : "prtnTaskPrjctNm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var list = budgetFrmtn.budgetPrtnList.filter(function(prtn) {
                    if(prtn.executTaskSn == item.executTaskSn) {
                        return true;
                    }
                    return false;
                });
                return list;
            },
            listTemplateFunction : function(rowIndex, columnIndex, value, item, dataField, listItem) {
                return listItem.prtnTaskPrjctNo + "." + listItem.prtnTaskPrjctNm;
            }
        }
    },{
        dataField : "prjctNo",
        headerText : "프로젝트번호",
        width:90,
        editable:false

    },{
        dataField : "prtnCnGroupSn",
        headerText : '<i data-func="fn_modal_manage" class="flaticon2-gear"></i>관리번호',
        width:90,
        sortable:true,
        tooltip : {
            show : true,
            tooltipFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
                var selItem = undefined;

                if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetGroupList)) {

                    selItem = budgetFrmtn.budgetGroupList.find(function(arr) {
                        return arr.prtnCnGroupSn == item.prtnCnGroupSn;
                    });
                }

                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "";
                }
                return selItem.prtnCnGroupNm;
            }
        },
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetGroupList)) {
                selItem = budgetFrmtn.budgetGroupList.find(function(arr) {
                    return arr.prtnCnGroupSn == value;
                });
            }
            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }

            return selItem.prtnCnGroupNo;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            listAlign:"left",
            keyField : "prtnCnGroupSn", // key 에 해당되는 필드명
            valueField : "prtnCnGroupNo", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                var list = budgetFrmtn.budgetGroupList.filter(function(group) {
                    if(group.executTaskSn == item.executTaskSn) {
                        return true;
                    }
                    return false;
                });
                return list;
            },
            listTemplateFunction : function(rowIndex, columnIndex, value, item, dataField, listItem) {
                return listItem.prtnCnGroupNo + "." + listItem.prtnCnGroupNm;
            }
        }
    },{
        dataField : "goalResult",
        headerText : "목표결과물",
        width:300,
        style:"grid_left_style",
        labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
            if(isNull(value)) {
                return "<pre>" + (budgetFrmtn.excelPrintYN == "Y" ? "" : "목표결과물 텍스트를 입력해 주세요.") + "</pre>";
            }
            return budgetFrmtn.fn_get_textarea_style(value);
        },
        renderer : {
            type : "TemplateRenderer"
        }
    },{
        headerText : "전기편성예산",
        dataField : "frmtrmBudget",
        children : [{
            dataField : "frmtrmBudgetUnit",
            headerText : "회계단위",
            editable:false,
            width : 120,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.accnutUnitList)) {
                    selItem = budgetFrmtn.accnutUnitList.find(function(arr) {
                        return arr.cdCc == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "";
                }
                return selItem.nmCc;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn:false, //셀이 선택된 상태에서 해당 셀의 오른쪽에 에디터 버턴을 출력할지 여부를 지정합니다.
                keyField : "cdCc", // key 에 해당되는 필드명
                valueField : "nmCc", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {

                    return budgetFrmtn.accnutUnitList;
                }
            }
        }, {
            dataField : "frmtrmBudgetSubjet",
            headerText : "예산과목",
            editable:false,
            width : 120,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetSbjectList)) {
                    selItem = budgetFrmtn.budgetSbjectList.find(function(arr) {
                        return arr.cdAcct == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "";
                }
                return selItem.nmAcct;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn:false, //셀이 선택된 상태에서 해당 셀의 오른쪽에 에디터 버턴을 출력할지 여부를 지정합니다.
                keyField : "cdAcct", // key 에 해당되는 필드명
                valueField : "nmAcct", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    return budgetFrmtn.budgetSbjectList;
                }
            }
        }, {
            dataField: "frmtrmBudgetAmt",
            headerText: "예산금액",
            style:"grid_right_style",
            dataType: "numeric",
            formatString: "#,##0",
            editable:false,
            width: 150,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return budgetFrmtn.fn_text_express("WON",value)+"원" ;
            },
        }]
    },{
        headerText : "전기집행금액",
        dataField : "executBudget",
        children : [{
            dataField : "executBudgetAmt",
            headerText : "누적집행",
            dataType : "numeric",
            formatString : "#,##0",
            style:"grid_right_style",
            editable:false,
            width : 150,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return budgetFrmtn.fn_text_express("WON",value)+"원" ;
            },
        }, {
            dataField : "executBudgetRate",
            headerText : "집행율",
            width : 80,
            editable:false,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return value+"%";
            }
        }]
    },{
        headerText : "전기집행예정금액",
        dataField : "prearngeBudget",
        children : [{
            dataField : "excutPrearngeAmt",
            headerText : "집행예정",
            dataType : "numeric",
            formatString: "#,##0",
            style:"grid_right_style",
            width : 150,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return budgetFrmtn.fn_text_express("WON",value)+"원" ;
            },
            editRenderer : {
                type : "InputEditRenderer",
                onlyNumeric : true, // 0~9 까지만 허용
                allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
                maxlength:14,
                textAlign:"right",
                autoThousandSeparator:true
            }
        }, {
            dataField : "excutPrearngeSumAmt",
            headerText : "최종집행 합계",
            dataType : "numeric",
            editable:false,
            formatString : "#,##0",
            style:"grid_right_style",
            width : 150,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return budgetFrmtn.fn_text_express("WON",value)+"원" ;
            }
        }, {
            dataField : "excutPrearngeRate",
            headerText : "최종진행률",
            editable:false,
            width : 80,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return value+"%";
            }
        }]

    },{
        headerText : "당기편성예산",
        dataField : "srtpdBudget",
        children : [{
            dataField : "srtpdBudgetUnit",
            headerText : "회계단위",
            sortable:true,
            width : 120,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.accnutUnitList)) {
                    selItem = budgetFrmtn.accnutUnitList.find(function(arr) {
                        return arr.cdCc == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
                }
                return selItem.nmCc;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
                keyField : "cdCc", // key 에 해당되는 필드명
                valueField : "nmCc", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    var list = budgetFrmtn.accnutUnitList.filter(function(obj) {

                        if(obj["ynUse"] == "Y") {
                            return true;
                        }else if(!isNull(item.srtpdBudgetUnit) && obj["cdCc"] == item.srtpdBudgetUnit) {
                            return true;
                        }
                        return false;
                    });
                    return list;
                }
            }

        }, {
            dataField : "srtpdBudgetSubjet",
            headerText : "예산과목",
            sortable:true,
            width : 120,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetSbjectList)) {
                    selItem = budgetFrmtn.budgetSbjectList.find(function(arr) {
                        return arr.cdAcct == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
                }
                return selItem.nmAcct;
            },
            editRenderer : {
                type : "ComboBoxRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
                listAlign:"left",
                keyField : "cdAcct", // key 에 해당되는 필드명
                valueField : "nmAcct", // value 에 해당되는 필드명
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    var list = budgetFrmtn.budgetSbjectList;
                    return list;
                },
                validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                    var isValid = true;

                    if(isNull(newValue)) {
                        isValid = true;
                        item.srtpdBudgetSubjet = oldValue;
                    }else {
                        isValid = budgetFrmtn.budgetSbjectList.some(function(arr) {
                            return arr.cdAcct == newValue
                        });

                        if(!isValid) {
                            var fObj = budgetFrmtn.budgetSbjectList.find(function(arr) {
                                return arr.nmAcct == newValue
                            });

                            if(!isNull2(fObj)) {
                                isValid = true;
                            }
                        }
                    }

                    if(!isValid) {
                        item.srtpdBudgetSubjet = "";
                    }

                    //console.log("newValue",oldValue,newValue,isValid,item.srtpdBudgetSubjet);

                    return { "validate" : isValid, "message"  : "입력한 내역은 목록과 일치하지 않습니다." };
                }
            }
        }, {
            dataField : "srtpdBudgetAmt",
            headerText : "예산금액",
            sortable:true,
            dataType : "numeric",
            formatString: "#,##0",
            width : 150,
            style:"grid_right_style",
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {

                return budgetFrmtn.fn_text_express("WON",value)+"원" ;
            },
            editRenderer : {
                type : "InputEditRenderer",
                onlyNumeric : true, // 0~9 까지만 허용
                allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
                maxlength:14,
                textAlign:"right",
                autoThousandSeparator:true
            }
        }]
    },{
        dataField : "remark",
        headerText : "비고",
        width:300,
        sortable:false,
        style:"grid_left_style",
        labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
            return budgetFrmtn.fn_get_textarea_style(value);
        },
        renderer : {
            type : "TemplateRenderer"
        }
    },{
        dataField : "hnfInptCd",
        headerText : "인력투입",
        width:100,
        sortable:true,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.GN0004)) {
                selItem = budgetFrmtn.GN0004.find(function(arr) {
                    return arr.cd == value;
                });
            }
            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return (budgetFrmtn.excelPrintYN == "Y" ? "" : "선택하세요.");
            }
            return selItem.cd_nm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            keyField : "cd", // key 에 해당되는 필드명
            valueField : "cd_nm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.GN0004;
            }
        }
    },{
        dataField:"goalEra",
        headerText : "",
        width:100,
        children: [{
            dataField : "goalEraCdEtc",
            headerText : "목표시기",
            width:80,
            editRenderer : {
                type : "InputEditRenderer",
                onlyNumeric : false, // 0~9 까지만 허용
                allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
                maxlength:50,
                textAlign:"right",
                autoThousandSeparator:false,
                validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                    var isValid = true;
                    var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                    if(numVal > 50) {
                        isValid = false;
                        item.goalEraCdEtc = newValue.getByteString(50);
                    }
                    return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
                }
            }
        },{ dataField : "goalEraCd",
            headerText : "",
            width:18,
            renderer : {
                type : "IconRenderer",
                iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
                iconHeight : 16,
                iconPosition : "aisleRight",
                iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
                    "default" : "./auigrid/AUIGrid/images/arrow-down-black-icon.png" // default
                },
                onClick : function(event) {
                    // 아이콘을 클릭하면 수정으로 진입함.
                    AUIGrid.openInputer(event.pid);
                }
            },
            sortable:false,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return "";
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn : false,
                keyField : "cd", // key 에 해당되는 필드명
                valueField : "cd_nm", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    return budgetFrmtn.GN0005;
                }
            }
        }]
    }
    /*,{
        dataField : "goalEraCd",
        headerText : "목표시기",
        width:100,
        sortable:true,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.GN0005)) {
                selItem = budgetFrmtn.GN0005.find(function(arr) {
                    return arr.cd == value;
                });
            }
            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "선택하세요.";
            }
            return selItem.cd_nm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            keyField : "cd", // key 에 해당되는 필드명
            valueField : "cd_nm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.GN0005;
            }
        }
    }*/
    ,{
        headerText : "분기항목",
        dataField : "quIem",
        children : [{
            headerText : "1분기",
            children : [
                {
                    dataField : "quIem4",
                    headerText : "4월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }

                }, {
                    dataField : "quIem5",
                    headerText : "5월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }

                }, {
                    dataField : "quIem6",
                    headerText : "6월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        },{
            headerText : "2분기",
            children : [
                {
                    dataField : "quIem7",
                    headerText : "7월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem8",
                    headerText : "8월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem9",
                    headerText : "9월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        },{
            headerText : "3분기",
            children : [
                {
                    dataField : "quIem10",
                    headerText : "10월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem11",
                    headerText : "11월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem12",
                    headerText : "12월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        },{
            headerText : "4분기",
            children : [
                {
                    dataField : "quIem1",
                    headerText : "1월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem2",
                    headerText : "2월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem3",
                    headerText : "3월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        }]

    },{
        dataField : "quHistRcord",
        headerText : "분기수정기록",
        sortable:false,
        editable:false,
        width:80,
        postfix:" 회",
        renderer : {
            type : "IconRenderer",
            iconWidth : 16,
            iconHeight : 16,
            iconPosition : "aisleRight",
            iconFunction : function(rowIndex, columnIndex, value, item) {
                var icon = "./auigrid/AUIGrid/images/list-icon.png";
                if(value < 1) {
                    icon = "";
                }
                // 로직 처리
                return icon;
            },
            onClick : function(event) {
                budgetFrmtn.fn_get_history(function() {
                        $("#budgetFrmtn_qu_history_modal").modal("show");
                    }
                    ,"/kicpa/budget/budgetFrmtnQuHistList.do"
                    ,{budgetSn:event.item.budgetSn,progrsFlag:"1"}
                    , function(data) {
                        AUIGrid.setGridData(budgetFrmtn.qu_history_grid ,data.budgetFrmtnQuHistList);
                    });
            }
        }
    },{
        dataField : "histRcord",
        headerText : "수정기록",
        sortable:false,
        editable:false,
        width:80,
        postfix:" 회",
        renderer : {
            type : "IconRenderer",
            iconWidth : 16,
            iconHeight : 16,
            iconPosition : "aisleRight",
            iconFunction : function(rowIndex, columnIndex, value, item) {
                var icon = "./auigrid/AUIGrid/images/list-icon.png";
                if(value < 1) {
                    icon = "";
                }
                // 로직 처리
                return icon;
            },
            onClick : function(event) {
                budgetFrmtn.fn_get_history(function() {
                        $("#budgetFrmtn_history_modal").modal("show");
                    }
                    ,"/kicpa/budget/budgetFrmtnHistList.do"
                    ,{budgetSn:event.item.budgetSn,progrsFlag:"1"}
                    , function(data) {
                        AUIGrid.setGridData(budgetFrmtn.history_grid ,data.budgetFrmtnHistList);
                    });
            }
        }
    },{
        dataField : "budgetProgrsSttus",
        headerText : "",
        width:0,
        editable:false,
        visible:false
    },{
        dataField : "excutAddYn",
        headerText : "",
        width:0,
        editable:false,
        visible:false
    } ];

    var policy_columnLayout = [{
        dataField : "policyTaskOrderSn",
        headerText : "정렬",
        width:"20%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            onlyNumeric : true, // 0~9 까지만 허용
            autoThousandSeparator: false,
            allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
            maxlength:5
        }
    },{
        dataField : "policyTaskPrjctNo",
        headerText : "프로젝트번호",
        width:"21%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:5,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 5) {
                    isValid = false;
                    item.policyTaskPrjctNo = newValue.getByteString(5);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    },{
        dataField : "policyTaskPrjctNm",
        headerText : "정책과제",
        width:"59%",
        dataType : "text",
        style:"grid_left_style",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:50,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 100) {
                    isValid = false;
                    item.policyTaskPrjctNm = newValue.getByteString(100);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    }];
    var execut_columnLayout = [{
        dataField : "executTaskOrderSn",
        headerText : "정렬",
        width:"20%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            onlyNumeric : true, // 0~9 까지만 허용
            autoThousandSeparator: false,
            allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
            maxlength:5
        }
    },{
        dataField : "executTaskPrjctNo",
        headerText : "프로젝트번호",
        width:"21%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:5,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 5) {
                    isValid = false;
                    item.executTaskPrjctNo = newValue.getByteString(5);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    },{
        dataField : "executTaskPrjctNm",
        headerText : "실행과제",
        width:"59%",
        dataType : "text",
        style:"grid_left_style",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:50,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 100) {
                    isValid = false;
                    item.executTaskPrjctNm = newValue.getByteString(100);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    }];

    var prtn_columnLayout = [{
        dataField : "prtnTaskOrderSn",
        headerText : "정렬",
        width:"20%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            onlyNumeric : true, // 0~9 까지만 허용
            autoThousandSeparator: false,
            allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
            maxlength:10
        }
    },{
        dataField : "prtnTaskPrjctNo",
        headerText : "프로젝트번호",
        width:"21%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:10,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 10) {
                    isValid = false;
                    item.prtnTaskPrjctNo = newValue.getByteString(10);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    },{
        dataField : "prtnTaskPrjctNm",
        headerText : "추진내용",
        width:"59%",
        dataType : "text",
        style:"grid_left_style",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:50,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 100) {
                    isValid = false;
                    item.prtnTaskPrjctNm = newValue.getByteString(100);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    }];

    var manage_columnLayout = [{
        dataField : "prtnCnGroupOrderSn",
        headerText : "정렬",
        width:"20%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            onlyNumeric : true, // 0~9 까지만 허용
            autoThousandSeparator: false,
            allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
            maxlength:5
        }
    },{
        dataField : "prtnCnGroupNo",
        headerText : "관리번호",
        width:"21%",
        dataType : "text",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:5,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 5) {
                    isValid = false;
                    item.prtnCnGroupNo = newValue.getByteString(5);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    },{
        dataField : "prtnCnGroupNm",
        headerText : "관리번호명",
        width:"59%",
        dataType : "text",
        style:"grid_left_style",
        editRenderer : {
            type : "InputEditRenderer",
            maxlength:50,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 100) {
                    isValid = false;
                    item.prtnCnGroupNm = newValue.getByteString(100);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    }];

    var dstb_columnLayout = [{
            headerText:"삭제",
            width:"5%",
            renderer : {
                type : "IconRenderer",
                iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
                iconHeight : 16,
                iconPosition : "left",
                iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
                    "default" : "./auigrid/AUIGrid/images/delete.png" // default
                },
                onClick : function(event) {
                    AUIGrid.removeRow(budgetFrmtn.dstb_grid, event.rowIndex);
                }
            }
        },{
            dataField : "fsseCd",
            headerText:"회계단위",
            width:"25%",
            editable:false,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.accnutUnitList)) {
                    selItem = budgetFrmtn.accnutUnitList.find(function(arr) {
                        return arr.cdCc == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "선택하세요.";
                }
                return selItem.nmCc;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn:false,
                keyField : "cdCc", // key 에 해당되는 필드명
                valueField : "nmCc", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    return budgetFrmtn.accnutUnitList;
                }
            }
        },{
            dataField : "srtpdBudgetSubjet",
            headerText:"예산과목",
            width:"25%",
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetSbjectList)) {
                    selItem = budgetFrmtn.budgetSbjectList.find(function(arr) {
                        return arr.cdAcct == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "선택하세요.";
                }
                return selItem.nmAcct;
            },
            editRenderer : {
                type : "ComboBoxRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
                listAlign:"left",
                keyField : "cdAcct", // key 에 해당되는 필드명
                valueField : "nmAcct", // value 에 해당되는 필드명
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    var list = budgetFrmtn.budgetSbjectList;
                    return list;
                },
                validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                    var isValid = true;

                    if (isNull(newValue)) {
                        isValid = true;
                        item.srtpdBudgetSubjet = oldValue;
                    } else {
                        isValid = budgetFrmtn.budgetSbjectList.some(function (arr) {
                            return arr.cdAcct == newValue
                        });

                        if (!isValid) {
                            var fObj = budgetFrmtn.budgetSbjectList.find(function (arr) {
                                return arr.nmAcct == newValue
                            });

                            if (!isNull2(fObj)) {
                                isValid = true;
                            }
                        }
                    }

                    if (!isValid) {
                        item.srtpdBudgetSubjet = "";
                    }

                    //console.log("newValue",oldValue,newValue,isValid,item.srtpdBudgetSubjet);

                    return {"validate": isValid, "message": "입력한 내역은 목록과 일치하지 않습니다."};
                }
            }
        },{
            dataField : "dstbRate",
            headerText:"비율",
            width:"10%",
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
                var message = "";

                var data = AUIGrid.getGridData(budgetFrmtn.dstb_grid);
                var sum_dstbRate = 0;

                data.forEach(function(arr) {
                    if(arr.dstbRateSn != item.dstbRateSn) {
                        sum_dstbRate += arr.dstbRate;
                    }
                });

                var new_sum_rate = Number(sum_dstbRate )+Number( newValue);

                if(new_sum_rate > 100) {
                    item.dstbRate = oldValue;
                    isValid = false;
                    message = "비율 합산이 100을 넘을 수 없습니다."
                }

                if(!isNaN(numVal) && numVal > 100) {
                    isValid = false;
                    message = "100보다 큰 수를 입력 할 수 없습니다.";
                }
                return { "validate" : isValid, "message"  : message };
            }
        }
        },{
            dataField : "srtpdBudgetAmt",
            headerText:"예산금액",
            width:"35%",
            dataType : "numeric",
            formatString: "#,##0",
            editable:false
            /*
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                return budgetFrmtn.fn_text_express("WON",value) +"원" ;
            }*/
        }
    ];

    history_columnLayout = [{
        dataField : "frstRegistNm",
        headerText : "등록자",
        width:80,
        sortable:true,
      },{
        dataField : "frstRegistDt",
        headerText : "등록일시",
        width:130,
        sortable:true,
      },{
        dataField : "chrgEmpCd",
        headerText : "담당직원",
        width:90,
        sortable:false,
        style:"grid_left_style",
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.empList)) {
                selItem = budgetFrmtn.empList.find(function(arr) {
                    return arr.chrgCd == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }

            var chrgEmpNm = isNull2(item.chrgEmpNm) ? selItem.chrgNm : item.chrgEmpNm;

            return chrgEmpNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "chrgCd", // key 에 해당되는 필드명
            valueField : "chrgNm", // value 에 해당되는 필드명
            descendants : [ "chrgPartCd" ,"chrgDeptCd","sportDeptCd" ],
            descendantDefaultValues : ["","",""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {

                return budgetFrmtn.empList;
            }
        }
    },{
        dataField : "chrgPartCd",
        headerText : "담당부분",
        width:120,
        sortable:true,
        style:"grid_left_style",
        /*filter : {
            eanble : true,
            showIcon : true,
            displayFormatValues:true
        },*/
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.partList)) {
                selItem = budgetFrmtn.partList.find(function(arr) {
                    return arr.chrgPartCd == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }

            var chrgPartNm = isNull2(item.chrgPartNm) ? selItem.chrgPartNm : item.chrgPartNm;

            return chrgPartNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "chrgPartCd", // key 에 해당되는 필드명
            valueField : "chrgPartNm", // value 에 해당되는 필드명
            descendants : [ "chrgDeptCd" ],
            descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.partList;
            }
        }
    },{
        dataField : "chrgDeptCd",
        headerText : "담당부서",
        width:120,
        sortable:true,
        style:"grid_left_style",
        /*filter : {
            eanble : true,
            showIcon : true,
            displayFormatValues:true
        },*/
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.deptList)) {
                selItem = budgetFrmtn.deptList.find(function(arr) {
                    return arr.chrgDeptCd == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }

            var chrgDeptNm = isNull2(item.chrgDeptNm) ? selItem.chrgDeptNm : item.chrgDeptNm;

            return selItem.chrgDeptNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "chrgDeptCd", // key 에 해당되는 필드명
            valueField : "chrgDeptNm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.deptList;
            }
        }
    },{
        dataField : "sportDeptCd",
        headerText : "지원부서",
        style:"grid_left_style",
        width:120,
        sortable:true,
        /*filter : {
            eanble : true,
            showIcon : true,
            displayFormatValues:true
        },*/
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.sportDeptList)) {
                selItem = budgetFrmtn.sportDeptList.find(function(arr) {
                    return arr.cdDept == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }

            var sportDeptNm = isNull2(item.sportDeptNm) ? selItem.nmDept : item.sportDeptNm;

            return sportDeptNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "cdDept", // key 에 해당되는 필드명
            valueField : "nmDept", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.sportDeptList;
            }
        }
    },{
        dataField : "policyTaskSn",
        headerText : '정책과제',
        width:150,
        style:"grid_left_style",
        sortable:false,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;

            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetPolicyList)) {
                selItem = budgetFrmtn.budgetPolicyList.find(function(arr) {
                    return arr.policyTaskSn == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }

            return selItem.policyTaskPrjctNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "policyTaskSn", // key 에 해당되는 필드명
            valueField : "policyTaskPrjctNm", // value 에 해당되는 필드명
            descendants : [ "executTaskSn" , "prtnCnSn" , "prtnCnGroupSn"],
            descendantDefaultValues : ["" , "" , ""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.budgetPolicyList;
            }
        }
    },{
        dataField : "executTaskSn",
        headerText : '실행과제',
        width:200,
        style:"grid_left_style",
        sortable:false,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetExecutList)) {
                selItem = budgetFrmtn.budgetExecutList.find(function(arr) {
                    return arr.executTaskSn == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }
            return selItem.executTaskPrjctNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "executTaskSn", // key 에 해당되는 필드명
            valueField : "executTaskPrjctNm", // value 에 해당되는 필드명
            descendants : [ "prtnCnSn"],
            descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.budgetExecutList;
            }
        }
    },{
        dataField : "prtnCnSn",
        headerText : '추진내용',
        width:300,
        style:"grid_left_style",
        sortable:false,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetPrtnList)) {
                selItem = budgetFrmtn.budgetPrtnList.find(function(arr) {
                    return arr.prtnCnSn == value;
                });
            }

            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }
            return selItem.prtnTaskPrjctNm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "prtnCnSn", // key 에 해당되는 필드명
            valueField : "prtnTaskPrjctNm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.budgetPrtnList;
            }
        }
    },{
        dataField : "prjctNo",
        headerText : "프로젝트번호",
        width:90,
        editable:false

    },{
        dataField : "prtnCnGroupSn",
        headerText : '관리번호',
        width:90,
        sortable:false,
        tooltip : {
            show : true,
            tooltipFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
                var selItem = undefined;

                if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetGroupList)) {

                    selItem = budgetFrmtn.budgetGroupList.find(function(arr) {
                        return arr.prtnCnGroupSn == item.prtnCnGroupSn;
                    });
                }

                if(typeof selItem == "undefined" || isNull2(selItem)) {
                    return "";
                }
                return selItem.prtnCnGroupNm;
            }
        },
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetGroupList)) {
                selItem = budgetFrmtn.budgetGroupList.find(function(arr) {
                    return arr.prtnCnGroupSn == value;
                });
            }
            if(typeof selItem == "undefined" || isNull2(selItem)) {
                return "";
            }

            return selItem.prtnCnGroupNo;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "prtnCnGroupSn", // key 에 해당되는 필드명
            valueField : "prtnCnGroupNo", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return budgetFrmtn.budgetGroupList;
            }
        }
    },{
        dataField : "goalResult",
        headerText : "목표결과물",
        width:300,
        style:"grid_left_style",
        labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
            return budgetFrmtn.fn_get_textarea_style(value);
        },
        renderer : {
            type : "TemplateRenderer"
        }
    },{
        dataField : "excutPrearngeAmt",
        headerText : "집행예정",
        dataType : "numeric",
        formatString: "#,##0",
        style:"grid_right_style",
        width : 150,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            return budgetFrmtn.fn_text_express("WON",value)+"원" ;
        }
    },{
        headerText : "당기편성예산",
        dataField : "srtpdBudget",
        children : [
            {
            dataField : "srtpdBudgetUnit",
            headerText : "회계단위",
            sortable:false,
            width : 120,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.accnutUnitList)) {
                    selItem = budgetFrmtn.accnutUnitList.find(function(arr) {
                        return arr.cdCc == value;
                    });
                }

                if(typeof selItem == "undefined" || isNull2(selItem) ) {
                    return "";
                }
                return selItem.nmCc;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn:false, //셀이 선택된 상태에서 해당 셀의 오른쪽에 에디터 버턴을 출력할지 여부를 지정합니다.
                keyField : "cdCc", // key 에 해당되는 필드명
                valueField : "nmCc", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    return budgetFrmtn.accnutUnitList;
                }
            }

        }, {
            dataField : "srtpdBudgetSubjet",
            headerText : "예산과목",
            sortable:false,
            width : 120,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.budgetSbjectList)) {
                    selItem = budgetFrmtn.budgetSbjectList.find(function(arr) {
                        return arr.cdAcct == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem) ) {
                    return "";
                }
                return selItem.nmAcct;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn:false, //셀이 선택된 상태에서 해당 셀의 오른쪽에 에디터 버턴을 출력할지 여부를 지정합니다.
                keyField : "cdAcct", // key 에 해당되는 필드명
                valueField : "nmAcct", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    return budgetFrmtn.budgetSbjectList;
                }
            }
        }, {
            dataField : "srtpdBudgetAmt",
            headerText : "예산금액",
            sortable:true,
            dataType : "numeric",
            formatString: "#,##0",
            width : 150,
            style:"grid_right_style",
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {

                return budgetFrmtn.fn_text_express("WON",value)+"원" ;
            }
        }]
    },{
            dataField : "remark",
            headerText : "비고",
            width:300,
            sortable:false,
            style:"grid_left_style",
            labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                return budgetFrmtn.fn_get_textarea_style(value);
            },
            renderer : {
                type : "TemplateRenderer"
            }
        },{
            dataField : "hnfInptCd",
            headerText : "인력투입",
            width:100,
            sortable:false,
            labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
                var selItem = undefined;
                if(Array.prototype.isPrototypeOf(budgetFrmtn.GN0004)) {
                    selItem = budgetFrmtn.GN0004.find(function(arr) {
                        return arr.cd == value;
                    });
                }
                if(typeof selItem == "undefined" || isNull2(selItem) ) {
                    return "";
                }
                return selItem.cd_nm;
            },
            editRenderer : {
                type : "DropDownListRenderer",
                autoCompleteMode : true, // 자동완성 모드 설정
                autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
                showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
                showEditorBtn:false, //셀이 선택된 상태에서 해당 셀의 오른쪽에 에디터 버턴을 출력할지 여부를 지정합니다.
                keyField : "cd", // key 에 해당되는 필드명
                valueField : "cd_nm", // value 에 해당되는 필드명
                //descendants : [ "" ],
                //descendantDefaultValues : [""],
                listFunction : function(rowIndex, columnIndex, item, dataField) {
                    return budgetFrmtn.GN0004;
                }
            }
        },{
        dataField : "goalEraCdEtc",
        headerText : "목표시기",
        width:100,
        editRenderer : {
            type : "InputEditRenderer",
            onlyNumeric : false, // 0~9 까지만 허용
            allowPoint : false, // onlyNumeric 인 경우 소수점(.) 도 허용
            maxlength:50,
            textAlign:"right",
            autoThousandSeparator:false,
            validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                var isValid = true;
                var numVal = (isNull(newValue) ? "":newValue).getByteLength();
                if(numVal > 50) {
                    isValid = false;
                    item.goalEraCdEtc = newValue.getByteString(50);
                }

                return { "validate" : isValid, "message"  : "입력 가능한 자릿수 넘겼습니다." };
            }
        }
    }];

    qu_history_columnLayout = [ {
        dataField : "frstRegistNm",
        headerText : "등록자",
        width:80,
        sortable:false,
    },{
        dataField : "frstRegistDt",
        headerText : "등록일시",
        width:130,
        sortable:false
    },{
        headerText : "분기항목",
        dataField : "quIem",
        children : [{
            headerText : "1분기",
            children : [
                {
                    dataField : "quIem4",
                    headerText : "4월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }

                }, {
                    dataField : "quIem5",
                    headerText : "5월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }

                }, {
                    dataField : "quIem6",
                    headerText : "6월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        },{
            headerText : "2분기",
            children : [
                {
                    dataField : "quIem7",
                    headerText : "7월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem8",
                    headerText : "8월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem9",
                    headerText : "9월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        },{
            headerText : "3분기",
            children : [
                {
                    dataField : "quIem10",
                    headerText : "10월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem11",
                    headerText : "11월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem12",
                    headerText : "12월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        },{
            headerText : "4분기",
            children : [
                {
                    dataField : "quIem1",
                    headerText : "1월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem2",
                    headerText : "2월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }, {
                    dataField : "quIem3",
                    headerText : "3월",
                    sortable:false,
                    style:"grid_left_style",
                    width : 300,
                    labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
                        return budgetFrmtn.fn_get_textarea_style(value);
                    },
                    renderer : {
                        type : "TemplateRenderer"
                    }
                }]
        }]

    }];

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
        enableMovingColumn:true,
        showStateColumn : true,
        wordWrap:true,
        editingOnKeyDown:true,
        useContextMenu : true, // 컨텍스트 메뉴 사용
        enableRightDownFocus : true, //  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
        enableDrag:true,
        enableDragByCellDrag:true,
        resetHScroll:false,
        resetVScroll:false,
        independentAllCheckBox:true,
        showTooltip:true,
        // noDataMessage : "출력할 데이터가 없습니다."
        rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
            return item.budgetProgrsSttus == "1";
        },
        rowStyleFunction : function(rowIndex, item) {
            if(item.budgetSn < 1) {
                return "aui-grid-new-row-style";
            }else if(item.actvtyAt == "Y") {
                return "aui-grid-active-row-style";
            }
            return "";
        }
    };

    var gridPros_modal_edit = {
        enableFilter : false,
        enableRowCheckShiftKey : false, // 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
        enableMovingColumn:false,
        showRowNumColumn:false,
        wordWrap:false,
        editingOnKeyDown:true,
        useContextMenu : false, // 컨텍스트 메뉴 사용
        enableRightDownFocus : false, //  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
        enableDrag:false,
        enableDragByCellDrag:false,
        independentAllCheckBox:false,
        // noDataMessage : "출력할 데이터가 없습니다."
        rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
            return true;
        },
        rowStyleFunction : function(rowIndex, item) {
            return "";
        }
    };

    var gridPros_modal_readonly = {
        enableFilter : false,
        enableRowCheckShiftKey : false, // 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
        enableMovingColumn:false,
        showRowNumColumn:false,
        showRowCheckColumn: false,
        showStateColumn : false,
        editable : false,
        wordWrap:false,
        editingOnKeyDown:true,
        useContextMenu : false, // 컨텍스트 메뉴 사용
        enableRightDownFocus : false, //  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
        enableDrag:false,
        enableDragByCellDrag:false,
        independentAllCheckBox:true,
        rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
            return true;
        },
        // noDataMessage : "출력할 데이터가 없습니다."
        rowStyleFunction : function(rowIndex, item) {
            return "";
        }
    };

    var gridPros_modal_dstb = {
        enableFilter : false,
        enableRowCheckShiftKey : false, // 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
        enableMovingColumn:false,
        showRowNumColumn:false,
        showRowCheckColumn: false,
        showStateColumn : false,
        wordWrap:false,
        editingOnKeyDown:true,
        useContextMenu : false, // 컨텍스트 메뉴 사용
        enableRightDownFocus : false, //  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
        softRemoveRowMode:false,
        enableDrag:false,
        enableDragByCellDrag:false,
        independentAllCheckBox:true,
        rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
            return true;
        },
        rowStyleFunction : function(rowIndex, item) {
            return "";
        }
    };

    var gridPros_modal_history = {
        enableFilter : false,
        enableRowCheckShiftKey : false, // 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
        enableMovingColumn:false,
        showRowNumColumn:true,
        showRowCheckColumn: false,
        showStateColumn : false,
        editable : false,
        wordWrap:true,
        editingOnKeyDown:true,
        useContextMenu : false, // 컨텍스트 메뉴 사용
        enableRightDownFocus : false, //  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
        enableDrag:false,
        independentAllCheckBox:true,
        rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
            return true;
        },
        // noDataMessage : "출력할 데이터가 없습니다."
        rowStyleFunction : function(rowIndex, item) {
            return "";
        }
    };

    fn_AUIGrid_create([{id:"budgetFrmtn_grid_wrap", obj:[budgetFrmtn,"frmtn_grid_wrap"], layout:frmtn_columnLayout , prop:gridPros}
        ,{id:"budgetFrmtn_policy_grid_wrap", obj: [budgetFrmtn,"policy_grid_wrap"], layout:policy_columnLayout, prop:gridPros ,addprop:gridPros_modal_edit}
        ,{id:"budgetFrmtn_execut_grid_wrap", obj: [budgetFrmtn,"execut_grid_wrap"], layout:execut_columnLayout, prop:gridPros,addprop:gridPros_modal_edit}
        ,{id:"budgetFrmtn_prtn_grid_wrap",obj: [budgetFrmtn,"prtn_grid_wrap"],layout:prtn_columnLayout,prop:gridPros,addprop:gridPros_modal_edit}
        ,{id:"budgetFrmtn_manage_policy_grid",obj: [budgetFrmtn,"manage_policy_grid"],layout:policy_columnLayout,prop:gridPros,addprop:gridPros_modal_readonly}
        ,{id:"budgetFrmtn_manage_execut_grid",obj: [budgetFrmtn,"manage_execut_grid"],layout:execut_columnLayout,prop:gridPros,addprop:gridPros_modal_readonly}
        ,{id:"budgetFrmtn_manage_grid_wrap",obj: [budgetFrmtn,"manage_grid_wrap"],layout:manage_columnLayout,prop:gridPros,addprop:gridPros_modal_edit}
        ,{id:"budgetFrmtn_dstb_grid",obj: [budgetFrmtn,"dstb_grid"],layout:dstb_columnLayout,prop:gridPros,addprop:gridPros_modal_dstb}
        ,{id:"budgetFrmtn_history_grid",obj: [budgetFrmtn,"history_grid"],layout:history_columnLayout,prop:gridPros,addprop:gridPros_modal_history}
        ,{id:"budgetFrmtn_qu_history_grid",obj: [budgetFrmtn,"qu_history_grid"],layout:qu_history_columnLayout,prop:gridPros,addprop:gridPros_modal_history}
        ]);

    budgetFrmtn.frmtn_columnLayout = frmtn_columnLayout;

    budgetFrmtn.fn_init_resize_AUIGrid();
}

budgetFrmtn.fn_init_resize_AUIGrid= function(){

    fn_AUIGrid_resize([{id:"budgetFrmtn_grid_wrap",obj:budgetFrmtn.frmtn_grid_wrap}
        ,{id:"budgetFrmtn_policy_grid_wrap",obj:budgetFrmtn.policy_grid_wrap}
        ,{id:"budgetFrmtn_execut_grid_wrap",obj:budgetFrmtn.execut_grid_wrap}
        ,{id:"budgetFrmtn_prtn_grid_wrap",obj:budgetFrmtn.prtn_grid_wrap}
        ,{id:"budgetFrmtn_manage_policy_grid",obj:budgetFrmtn.manage_policy_grid}
        ,{id:"budgetFrmtn_manage_execut_grid",obj:budgetFrmtn.manage_execut_grid}
        ,{id:"budgetFrmtn_manage_grid_wrap",obj:budgetFrmtn.manage_grid_wrap}
        ,{id:"budgetFrmtn_dstb_grid",obj:budgetFrmtn.dstb_grid}
        ,{id:"budgetFrmtn_history_grid",obj:budgetFrmtn.history_grid}
        ,{id:"budgetFrmtn_qu_history_grid",obj:budgetFrmtn.qu_history_grid}]);
}

budgetFrmtn.fn_init_grid_events = function() {

    function fn_custom_textArea_AUIGrid(event,fieldObj) {
        var dataField = event.dataField;
        var $popupObj = $("#budgetFrmtn_textArea_wrap").show();
        var left =  $popupObj.offsetParent().offset().left;
        var top =  $popupObj.offsetParent().offset().top;
        var $textArea;

        $popupObj.hide();
        $("#budgetFrmtn_textArea_error").hide();

        $popupObj = $popupObj.css({
            left : event.position.x-left,
            top : event.position.y-top,
            width : event.size.width ,
            height : 200
        }).show();

        $textArea = $("#budgetFrmtn_textArea").val(String(event.value).replace(/[<]br[/][>]/gi, "\r\n"));

        // 데이터 필드 보관
        $popupObj.data("data-field", dataField);
        $popupObj.data("data-grid", event.pid);
        $popupObj.data("data-item", event.item);
        $popupObj.data("data-field-object", fieldObj);

        // 포커싱
        setTimeout(function(){
            $textArea.focus();
            //$textArea.select();
        },16);
    }

    function fn_textArea_to_size(size , value) {
        var isValid = true;
        var checkValue = (isNull(value) ? "":value);
        var numVal = checkValue.getByteLength();

        if(numVal > size) {
            isValid = false;
            checkValue = checkValue.getByteString(size);
        }

        return { validate : isValid , resizeText:checkValue , message  : "입력 가능한 자릿수를 넘겼습니다." };
    }

    function fn_get_field_maxLength(array_column,dataField) {
        for(var i=0; i < array_column.length; i++) {
            if(dataField == array_column[i].dataField) {
                return isNull2(array_column[i]["maxLength"]) ? -1 : array_column[i]["maxLength"];
            }else if(Array.prototype.isPrototypeOf(array_column[i]["children"])) {
                fn_get_field_maxLength(array_column[i].children,dataField);
            }
        }
        return -1;
    }

    // 진짜로 textarea 값을 그리드에 수정 적용시킴
    function fn_textArea_to_AUIGrid(value,callback) {

        var $textWrap = $("#budgetFrmtn_textArea_wrap");
        var dataField = $textWrap.data("data-field"); // 보관한 dataField 얻기
        var $item = $textWrap.data("data-item"); // 보관한 item 얻기
        var grid = $textWrap.data("data-grid"); // 보관한 grid 얻기
        var filedObj = $textWrap.data("data-field-object");
        var maxLength = isNull2(filedObj["maxLength"]) ? -1 : filedObj["maxLength"]; //fn_get_field_maxLength(AUIGrid.getColumnLayout(grid),dataField);

        var rtnObj = fn_textArea_to_size(maxLength,value);

        if(!rtnObj.validate) {
            $("#budgetFrmtn_textArea_error").show();
            $("#budgetFrmtn_textArea_error").text(rtnObj.message);
            return false;
        }else {
            $("#budgetFrmtn_textArea_error").hide();
            AUIGrid.setFocus(grid);
        }

        var item = {};
        item[dataField] = value;

        AUIGrid.updateRow(grid, item, AUIGrid.rowIdToIndex(grid,$item._$uid));

        if(typeof callback == "function") {
            callback();
        }
    };

    // textarea
    $( "#budgetFrmtn_textArea" ).on("keydown",function(event) {
        if(event.keyCode == 9) {
            var value = $("#budgetFrmtn_textArea").val();
            fn_textArea_to_AUIGrid(value, function() {
                $("#budgetFrmtn_textArea_wrap").hide();
                AUIGrid.setFocus($("#budgetFrmtn_textArea_wrap").data("data-grid"));
            });
            return false;
        }
    });

    // textarea 확인
    $( "#budgetFrmtn_textArea_confirm" ).on("click",function(event) {
        var value = $("#budgetFrmtn_textArea").val();
        fn_textArea_to_AUIGrid(value, function() {
            $("#budgetFrmtn_textArea_wrap").hide();
            AUIGrid.setFocus($("#budgetFrmtn_textArea_wrap").data("data-grid"));
        });
    });

    // textarea 취소
    $( "#budgetFrmtn_textArea_cancel" ).click(function(event) {
        $("#budgetFrmtn_textArea_wrap").hide();
        AUIGrid.setFocus($("#budgetFrmtn_textArea_wrap").data("data-grid"));
    });

    // textarea blur
    $("#budgetFrmtn_textArea").on("blur",function(event) {
        var relatedTarget = event.relatedTarget || document.activeElement;
        var $relatedTarget = $(relatedTarget);

        // 확인 버튼 클릭한 경우
        if($relatedTarget.is("#budgetFrmtn_textArea_confirm")) {
            return false;
        } else if($relatedTarget.is("#budgetFrmtn_textArea_cancel")) { // 취소 버튼
            return false;
        }

        fn_textArea_to_AUIGrid(this.value, function() {
            $("#budgetFrmtn_textArea_wrap").hide();
            AUIGrid.setFocus($("#budgetFrmtn_textArea_wrap").data("data-grid"));
        });
    });

    // 예산편성 컨텍스트 메뉴
    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "contextMenu", function( event ) {

        if(event.item.actvtyAt == "Y") {
            return false;
        }

        if(budgetFrmtn.endYn == "Y") {
            return false;
        }

        // console.log("rowAllChkClick",event);
        var itemRateContextMenu = [];

        for(var i=0; i < budgetFrmtn.budgetDstbList.length; i++) {
            var dstb = {label : "안분(" + budgetFrmtn.budgetDstbList[i].dstbNm +")", callback:fn_item_rate_hander , item:budgetFrmtn.budgetDstbList[i] };
            itemRateContextMenu.push(dstb);
        }

        if(itemRateContextMenu.length < 1) {
            return false;
        }

        return itemRateContextMenu;
    });

    //컨텍스트 메뉴 아이템 핸들러
    function fn_item_rate_hander(event) {

        var contextMenu = AUIGrid.getProp(budgetFrmtn.frmtn_grid_wrap,"contextMenuItems");

        var context_item = contextMenu[event.contextIndex].item;

        budgetFrmtn.fn_modal_dstb({
            srtpdBudgetAmt:event.item.srtpdBudgetAmt,
            dstbSn:context_item.dstbSn,
            srtpdBudgetSubjet:event.item.srtpdBudgetSubjet,
            rowIndex:event.rowIndex,
            item:event.item,
        });
    };

    // 예산편성 전체체크 이벤트
    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "rowAllChkClick", function( event ) {
        // console.log("rowAllChkClick",event);
        if(event.checked) {
            AUIGrid.setCheckedRowsByValue(event.pid, "budgetProgrsSttus", ["1"]);
        } else {
            AUIGrid.setCheckedRowsByValue(event.pid, "budgetProgrsSttus", []);
        }
    });

    // 예산편성 전체체크 이벤트
    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "rowCheckClick", function( event ) {
        // console.log("rowCheckClick",event);
    });

    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "headerClick", function( event ) {
        //console.log("headerClick",event, $(event.orgEvent.target).attr("data-func"));
        var sort_bool = true;
        var func;
        switch(event.dataField) {
            case "policyTaskSn" : func = budgetFrmtn[$(event.orgEvent.target).attr("data-func")]; break;
            case "executTaskSn" : func = budgetFrmtn[$(event.orgEvent.target).attr("data-func")]; break;
            case "prtnCnSn" : func = budgetFrmtn[$(event.orgEvent.target).attr("data-func")]; break;
            case "prtnCnGroupSn" : func = budgetFrmtn[$(event.orgEvent.target).attr("data-func")]; break;
        }

        if(typeof func == "function") {
            func();
            sort_bool = false;
        }

       return sort_bool;
    });

    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "cellEditBegin", function( event ) {
        if(budgetFrmtn.endYn == "Y") { // 최종등록 이후 수정 불가
            return false;
        }

        if(event.item.actvtyAt == "Y") { // 비활성화 일 때 블럭킹
            return false;
        }

        var textArea_array = [{dataField:"goalResult",maxLength:1000,type:"textarea"},{dataField:"remark",maxLength:1000,type:"textarea"}
            ,{dataField:"quIem4",maxLength:1000,type:"textarea"},{dataField:"quIem5",maxLength:1000,type:"textarea"}
            ,{dataField:"quIem6",maxLength:1000,type:"textarea"},{dataField:"quIem7",maxLength:1000,type:"textarea"}
            ,{dataField:"quIem8",maxLength:1000,type:"textarea"},{dataField:"quIem9",maxLength:1000,type:"textarea"}
            ,{dataField:"quIem10",maxLength:1000,type:"textarea"},{dataField:"quIem11",maxLength:1000,type:"textarea"}
            ,{dataField:"quIem12",maxLength:1000,type:"textarea"},{dataField:"quIem1",maxLength:1000,type:"textarea"}
            ,{dataField:"quIem2",maxLength:1000,type:"textarea"},{dataField:"quIem3",maxLength:1000,type:"textarea"}
        ];

        var fieldObj = textArea_array.find(function(arr) {
            return arr.dataField == event.dataField;
        });

        if(fieldObj != undefined) {

            if(fieldObj.type == "textarea") {
                if(event.isClipboard) {
                    return true;
                }else {
                    fn_custom_textArea_AUIGrid(event,fieldObj);
                    return false;
                }
            }
        }

        if(event.isClipboard) {
            return false;
        }

        if(event.dataField == "goalEraCdEtc") {
            var goalEraCd = event.item.goalEraCd;

            var edit_bool = budgetExcut.GN0005.some(function(item) {
                return item.cd == goalEraCd && item.optn1 == "Y";
            });

            if(!edit_bool) {
                return false;
            }
        }

        if(isNull2(event.item.chrgEmpCd)) { // 담당직원 선택해야 활성화
            switch(event.dataField) {
                case "chrgPartCd" : return false; break;
                case "chrgDeptCd" : return false; break;
                case "chrgDeptCd" : return false; break;
                //case "sportDeptCd" : return false; break;
                default : break;
            }
        }
    });

    // 붙여 넣기 시작 이벤트 바인딩
    // 붙여 넣기 할 때 엑셀에서 Alt+엔터로 개행된 값을 그대로 넣기 위한 작업
    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "pasteBegin", function(event) {
        var selectedIndex = AUIGrid.getSelectedIndex(event.pid);
        var rowCount = AUIGrid.getRowCount(event.pid);

        var sliceIndex = rowCount - (selectedIndex[0] < 0 ? 0 : selectedIndex[0]);

        var data = event.clipboardData;
        var arr;
        var i, j, len, len2, str;

        // 엑셀 개행 문자가 없는 경우
        if(data.indexOf("\n") === -1) {
            return data;
        }

        arr = CSVToArray(data, "\t"); // tab 문자 구성 String 을 배열로 반환
        if(arr && arr.length) {
            if(String(arr[arr.length-1]).trim() == "") { // 마지막 빈 값이 삽입되는 경우가 존재함.
                arr.pop();
            }
            for(i=0, len=arr.length; i<len; i++) {
                arr2 = arr[i];
                if(arr2 && arr2.length) {
                    for(j=0, len2=arr2.length; j<len2; j++) {
                        str = arr2[j];
                        //arr[i][j] = str.replace(/\n/g,"<br/>"); // 엑셀 개행 문자를 br 태그로 변환
                    }
                }
            }
        }

        if(sliceIndex > -1) {
            arr = arr.slice(0,sliceIndex);
        }

        return arr;
    });

    AUIGrid.bind(budgetFrmtn.frmtn_grid_wrap, "cellEditEnd", function( event ) {
        // console.log("cellEditEnd",event);
        // 프로젝트 코드
        if(event.dataField == "prtnCnSn" || event.dataField == "policyTaskSn" || event.dataField == "executTaskSn") {

            if(budgetFrmtn.budgetPrtnList instanceof Array) {
                var find_obj = budgetFrmtn.budgetPrtnList.find(function(arr) {
                    return arr.prtnCnSn == event.item.prtnCnSn;
                });

                if(find_obj != undefined) {
                    AUIGrid.setCellValue(budgetFrmtn.frmtn_grid_wrap,event.rowIndex,"prjctNo",find_obj["prtnTaskPrjctNo"]);
                }else {
                    AUIGrid.setCellValue(budgetFrmtn.frmtn_grid_wrap,event.rowIndex,"prjctNo","");
                }
            }
        }else if(event.dataField == "excutPrearngeAmt") { //전기집행예정금액
            var frmtrmBudgetAmt = event.item.frmtrmBudgetAmt; //전기예산금액
            var executBudget = event.item.executBudget; //전기집행금액
            var excutPrearngeAmt = event.value; //전기집행예정금액
            var update = {excutPrearngeSumAmt:0 ,excutPrearngeRate:0}; //전기집행예정합산금액 , 최종진행률

            if( executBudget >= 0 || excutPrearngeAmt >= 0 ) {
                excutPrearngeSumAmt = (isNaN(executBudget) ? 0 :executBudget)  + (isNaN(excutPrearngeAmt) ? 0 : excutPrearngeAmt) ;

                update.excutPrearngeSumAmt = excutPrearngeSumAmt;
            }

            if( frmtrmBudgetAmt > 0 && update.excutPrearngeSumAmt > 0 ) {
                var calcRate = (update.excutPrearngeSumAmt / frmtrmBudgetAmt) * 100;

                update.excutPrearngeRate = String(calcRate).getRound(-1,"HALF_UP");
            }

            AUIGrid.updateRow(budgetFrmtn.frmtn_grid_wrap,update,event.rowIndex);
        }else if(event.dataField == "goalEraCd") {
            var goalEraCd = event.value;

            var fObj = budgetFrmtn.GN0005.find(function(item) {
                return item.cd == event.value;
            });

            if(!isNull(fObj)) {
                AUIGrid.setCellValue(budgetFrmtn.frmtn_grid_wrap,event.rowIndex,"goalEraCdEtc",fObj.cd_nm);
            }
        }

        var list_obj = undefined;

        // 이름 셋팅
        switch(event.dataField) {
            case "chrgEmpCd":list_obj = {list:budgetFrmtn.empList ,cd:"chrgCd",nm:"chrgNm",des_nm:"chrgEmpNm" }; break;
            case "chrgPartCd":list_obj = {list:budgetFrmtn.partList ,cd:"chrgPartCd",nm:"chrgPartNm",des_nm:"chrgPartNm" };break;
            case "chrgDeptCd":list_obj = {list:budgetFrmtn.deptList ,cd:"chrgDeptCd",nm:"chrgDeptNm",des_nm:"chrgDeptNm" };break;
            case "sportDeptCd":list_obj = {list:budgetFrmtn.sportDeptList ,cd:"cdDept",nm:"nmDept",des_nm:"sportDeptNm" };break;
            default:break;
        }

        if(list_obj != undefined) {

            if(list_obj.list instanceof Array) {
                var find_obj = list_obj.list.find(function(arr) {
                    return arr[list_obj.cd] == event.value;
                });
                var update = {};

                if(find_obj != undefined) {
                    update[list_obj.des_nm] = find_obj[list_obj.nm];
                    AUIGrid.updateRow(budgetFrmtn.frmtn_grid_wrap,update,event.rowIndex);
                }else {
                    update[list_obj.des_nm] = "";
                    AUIGrid.updateRow(budgetFrmtn.frmtn_grid_wrap,update,event.rowIndex);
                }
            }
        }

    });

    // 청잭과제 선택 시 실행과제 조회
    AUIGrid.bind(budgetFrmtn.policy_grid_wrap, "selectionChange", function( event ) {
        var item = event.selectedItems[0].item

        if(item.policyTaskSn > 0) {
            budgetFrmtn.fn_get_budgetExecut(budgetFrmtn.execut_grid_wrap ,{accnutYear:item.accnutYear,policyTaskSn:item.policyTaskSn});
        }else {
            AUIGrid.clearGridData(budgetFrmtn.execut_grid_wrap);
        }

        AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);
    });

    AUIGrid.bind(budgetFrmtn.policy_grid_wrap, "cellEditBegin", function( event ) {
        if(budgetFrmtn.endYn == "Y") { // 최종등록 이후 수정 불가
            return false;
        }
    });

    // 실행과제 선택 시 추진내용 조회
    AUIGrid.bind(budgetFrmtn.execut_grid_wrap, "selectionChange", function( event ) {
        var item = event.selectedItems[0].item;

        if(item.executTaskSn > 0) {
            budgetFrmtn.fn_get_budgetPrtn( budgetFrmtn.prtn_grid_wrap, {accnutYear:item.accnutYear,executTaskSn:item.executTaskSn});
        }else {
            AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);
        }

        AUIGrid.clearGridData(budgetFrmtn.manage_grid_wrap);
    });

    AUIGrid.bind(budgetFrmtn.execut_grid_wrap, "cellEditBegin", function( event ) {
        if(budgetFrmtn.endYn == "Y") { // 최종등록 이후 수정 불가
            return false;
        }
    });

    AUIGrid.bind(budgetFrmtn.prtn_grid_wrap, "cellEditBegin", function( event ) {
        if(budgetFrmtn.endYn == "Y") { // 최종등록 이후 수정 불가
            return false;
        }
    });

    AUIGrid.bind(budgetFrmtn.manage_policy_grid, "selectionChange", function( event ) {
        var item = event.selectedItems[0].item;

        if(item.policyTaskSn > 0) {
            budgetFrmtn.fn_get_budgetExecut( budgetFrmtn.manage_execut_grid, {accnutYear:item.accnutYear,policyTaskSn:item.policyTaskSn});
        }else {
            AUIGrid.clearGridData(budgetFrmtn.manage_execut_grid);
        }
        AUIGrid.clearGridData(budgetFrmtn.manage_grid_wrap);
    });

    AUIGrid.bind(budgetFrmtn.manage_execut_grid, "selectionChange", function( event ) {
        var item = event.selectedItems[0].item;

        if(item.executTaskSn > 0) {
            budgetFrmtn.fn_get_budgetGroup( budgetFrmtn.manage_grid_wrap, {accnutYear:item.accnutYear,executTaskSn:item.executTaskSn});
        }else {
            AUIGrid.clearGridData(budgetFrmtn.manage_grid_wrap);
        }
    });

    AUIGrid.bind(budgetFrmtn.manage_grid_wrap, "cellEditBegin", function( event ) {
        if(budgetFrmtn.endYn == "Y") { // 최종등록 이후 수정 불가
            return false;
        }
    });

    // 안분비율 수정 이벤트
    AUIGrid.bind(budgetFrmtn.dstb_grid,"cellEditEnd",function (event) {
        if(event.dataField == "dstbRate") { // 비율수정
            var dstb_amt = $("#budgetFrmtn_dstb_amt").val();
            var calc_amt = budgetFrmtn.fn_dstb_calculate(dstb_amt,event.value);

            AUIGrid.setCellValue(budgetFrmtn.dstb_grid,event.rowIndex,"srtpdBudgetAmt",calc_amt);
        }else if(event.dataField == "srtpdBudgetSubjet") { // 예산과목 수정
            AUIGrid.updateAllToValue(budgetFrmtn.dstb_grid,event.dataField,event.value);
        }
    });
}

budgetFrmtn.fn_init_events = function() {
    budgetFrmtn.fn_init_grid_events();

    // 편성년도 변경
    $('#budgetFrmtn_year').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        var sel_year = $(e.target).val();

        if(previousValue != sel_year && !isNull(sel_year)) {
            // 기초코드 조회
            KTApp.block('#budgetFrmtn', {
                overlayColor: 'transparent',
                state: 'primary',
                message: 'Please wait...'
            });

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/initBudgetFrmtnYear.do',
                cache : false,
                data: { deleteYn:'N',accnutYear:sel_year,budgetYear:sel_year,progrsFlag:"1"},
                success: function(data)
                {
                    KTApp.unblock('#budgetFrmtn');
                    var checkLastYear = "Y";
                    budgetFrmtn.fn_get_budgetFrmtn( budgetFrmtn.frmtn_grid_wrap, { deleteYn:'N',budgetYear: sel_year ,progrsFlag:'1'} ,checkLastYear);

                    budgetFrmtn.budgetPolicyList = data.budgetPolicyList; // 정책과제
                    budgetFrmtn.budgetExecutList = data.budgetExecutList; // 실행과제
                    budgetFrmtn.budgetPrtnList = data.budgetPrtnList; //추진과제
                    budgetFrmtn.budgetGroupList = data.budgetGroupList; // 과제번호
                    budgetFrmtn.budgetEmpDeptList = data.budgetEmpDeptList;
                    budgetFrmtn.endYn = data.endYn; // 마감여부

                    var list = data.budgetEmpDeptList;

                    budgetFrmtn.empList = [];
                    budgetFrmtn.partList = [];
                    budgetFrmtn.deptList = [];
                    //budgetFrmtn.sportDeptList = [];

                    for(var i=0; i < list.length; i++) {
                        var item = list[i];

                        var fIdx = budgetFrmtn.empList.findIndex(function(arr) {
                            if(arr.chrgCd == item.chrgCd) {
                                return true;
                            }
                        });

                        if(fIdx < 0 && !isNull2(item.chrgCd)) {
                            budgetFrmtn.empList.push(item);
                        }

                        fIdx = budgetFrmtn.partList.findIndex(function(arr) {
                            if(arr.chrgPartCd == item.chrgPartCd) {
                                return true;
                            }
                        });

                        if(fIdx < 0 && !isNull2(item.chrgPartCd)) {
                            budgetFrmtn.partList.push(item);
                        }

                        fIdx = budgetFrmtn.deptList.findIndex(function(arr) {
                            if(arr.chrgDeptCd == item.chrgDeptCd) {
                                return true;
                            }
                        });

                        if(fIdx < 0 && !isNull2(item.chrgDeptCd)) {
                            budgetFrmtn.deptList.push(item);
                            //budgetFrmtn.sportDeptList.push(item);
                        }
                    }
                },
                onError : function(status, e) {
                    KTApp.unblock('#budgetFrmtn');
                    // 로더 제거
                    console.log("errror",e);
                }
            });
        }
    });

    // 취소, 확인 외 메뉴닫기 방지
    $("#budgetFrmtn_selectdept_control").on("click", function(e) {
        return false;
    });

   // 항목선택 전체선택
    $("#budgetFrmtn_selectdept_control").on("click", "a",function(e) {
        var $target = $(e.currentTarget).find("input[type='checkbox']");
        var $checks = $("input[type='checkbox']","#budgetFrmtn_select_menu");
        var $all_check = $("#budgetFrmtn_all_menu");
        var checked = [];

        $target.prop("checked") ? $target.prop("checked",false) : $target.prop("checked",true);

        if($target.is("#budgetFrmtn_all_menu")) {
            $target.prop("checked") ? $checks.prop("checked",true) : $checks.prop("checked",false);
        }

        $checks.filter(":checked").each(function(idx ,item) {
            checked.push({itemCl:budgetFrmtn.filterGrpCd , itemField:$(item).val()});
        });

        if($checks.is(":not(:checked)")) {
            if($all_check.prop("checked"))  {
                $all_check.prop("checked",false);
            }
        }else {
            if(!$all_check.prop("checked"))  {
                $all_check.prop("checked",true);
            }
        }

        budgetFrmtn.insertItemFilter = checked;

        return false;
    });

    // 항목선택 확인
    $("#budgetFrmtn_confirm_menu").on("click",function(e) {
        budgetFrmtn.fn_save_itemFilter(budgetFrmtn.filterGrpCd,budgetFrmtn.insertItemFilter,function() {
            $("#budgetFrmtn_select").dropdown("toggle");
        });
        return false;
    });

    // 항목선택 취소
    $("#budgetFrmtn_cancel_menu").on("click",  function(e) {
        $("#budgetFrmtn_select").dropdown("toggle");
        return false;
    });

    $("body").on("show.bs.dropdown" , "#budgetFrmtn_search",function(e) {
        budgetFrmtn.fn_set_itemFilter(budgetFrmtn.itemFilterList,true);
    });

    // 예산편성 조회
    $("#budgetFrmtn_btn_search").on("click",function(e) {
        var budgetYear = $("#budgetFrmtn_year").val();
        budgetFrmtn.fn_get_budgetFrmtn( budgetFrmtn.frmtn_grid_wrap, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
    });

    // 예산편성 추가
    $("#budgetFrmtn_add").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.frmtn_grid_wrap;
        var year = $("#budgetFrmtn_year").selectpicker('val');

        var item = {
            budgetSn:0 //편성순번
            ,budgetYear:year //편성년도
            ,actvtyAt:"N" //활성여부
            ,chrgEmpCd:"" //담당직원코드
            ,chrgEmpNm:"" //담당직원명
            ,chrgPartCd:"" //담당부분코드
            ,chrgPartNm:"" //담당부분명
            ,chrgDeptCd:"" //담당부서코드
            ,chrgDeptNm:"" //담당부서명
            ,sportDeptCd:"" //지원부서코드
            ,sportDeptNm:"" //지원부서명
            ,policyTaskSn:"" //정책과제
            ,executTaskSn:"" //실행과제
            ,prtnCnSn:"" //추진내용순번
            ,prjctNo:"" //프로젝트번호
            ,prtnCnGroupSn:"" //추진내용그룹순번
            ,goalResult:"" //목표결과물
            ,frmtrmBudgetUnit:"" //전기편성예산(회계단위)
            ,frmtrmBudgetSubjet:"" //전기편성예산(예산과목)
            ,frmtrmBudgetAmt:0 //전기편성예산(예산금액)
            ,executBudgetAmt:0  //전기집행금액(누적집행)
            ,executBudgetRate:0 //전기집행금액(집행율)
            ,excutPrearngeAmt:0  //전기집행예정금액(집행예정)
            ,excutPrearngeSumAmt:0 //전기집행예정금액(최종집행 합계)
            ,excutPrearngeRate:0 //전기집행예정금액(최종진행률)
            ,srtpdBudgetUnit:"" // 당기편성예산(회계단위)
            ,srtpdBudgetSubjet:"" //당기편성예산(예산과목)
            ,srtpdBudgetAmt:0 //당기편성예산(예산금액)
            ,remark:"" //비고
            ,hnfInptCd:"" //인력투입
            ,goalEraCd:"" //목표시기
            ,goalEraCdEtc:"" //목표시기기타
            ,quIem4:"" //분기항목 1분기(4월)
            ,quIem5:"" //분기항목 1분기(5월)
            ,quIem6:"" //분기항목 1분기(6월)
            ,quIem7:"" //분기항목 2분기(7월)
            ,quIem8:"" //분기항목 2분기(8월)
            ,quIem9:"" //분기항목 2분기(9월)
            ,quIem10:"" //분기항목 3분기(10월)
            ,quIem11:"" //분기항목 3분기(11월)
            ,quIem12:"" //분기항목 3분기(12월)
            ,quIem1:"" //분기항목 4분기(1월)
            ,quIem2:"" //분기항목 4분기(2월)
            ,quIem3:"" //분기항목 4분기(3월)
            ,deleteYn:"N"
            ,excutAddYn:"N"
            ,dstbYn:"N"
            ,budgetSortSn:0
            ,budgetEmpSortSn:0
            ,budgetProgrsSttus:"1"
            ,quHistRcord:0 //분기이력
            ,histRcord:0 // 이력
        };

        AUIGrid.addRow(grid,item,"first");
    });

    // 예산편성 행복사
    $("#budgetFrmtn_copy").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.frmtn_grid_wrap;

        var selectedRows = AUIGrid.getSelectedRows(grid);
        var refresh = {budgetSn:0
            ,frmtrmBudgetUnit: ""
            ,frmtrmBudgetSubjet:""
            ,frmtrmBudgetAmt:0
            ,excutPrearngeAmt:0
            ,excutAddYn:"N"
            ,budgetSortSn:0
            ,budgetEmpSortSn:0
            ,budgetProgrsSttus:"1"
            ,quHistRcord:0
            ,histRcord:0};

        if(selectedRows.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }
        var selectedRow = selectedRows[0];

        delete selectedRow._$uid;

        //console.log("selectedRow",selectedRow);
        var item = Object.assign(selectedRow,refresh);
        //console.log("item",item);

        AUIGrid.addRow(grid,item,"first");
    });

    // 예산편성 정렬 저장
    $("#budgetFrmtn_sort_save").on("click",function(e) {
        var grid = budgetFrmtn.frmtn_grid_wrap;
        var items = AUIGrid.getGridData(grid);

        if(items.length < 1) {
            alertMessage("정렬할 내역이 없습니다.","","-");
            return false;
        }

        var empCd = "";
        if(budgetFrmtn.admin.admin != "Y") {
            empCd = budgetFrmtn.admin.empid;
        }

        for(var i=0; i < items.length; i++) {
            items[i].budgetEmpSortSn = i;
            items[i].budgetSortSn = i;
            items[i].empCd = empCd;
        }

        var budgetYear = items[0].budgetYear;

        $.ajax({
            type: 'POST',
            dataType:"json",
            url: '/kicpa/budget/updateBudgetFrmtnSort.do',
            cache : false,
            data: { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1',sorts:JSON.stringify(items)},
            success: function(data)
            {
                var result = data.result;
                if(result.result == "S") {
                    budgetFrmtn.fn_get_budgetFrmtn( grid, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
                }else {
                    alertMessage("저장 된 내역이 없습니다.","","-");
                }
            },
            onError : function(status, e) {
                // 로더 제거
                console.log("errror",e);
            }
        });
    });

    // 예산편성 저장
    $("#budgetFrmtn_save").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.frmtn_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);
        var checkItems = [].concat(addItems).concat(editItems);
        var saveItems = [];

        if(checkItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        //var valid = AUIGrid.validateGridData(grid, ["policyTaskPrjctNo","policyTaskPrjctNm"],"필수 입력 값입니다.");
        var valid = true;
        if(!valid) {return false;}


        for(var i=0; i < items.length; i++) {
            var src_prtnCnSn = items[i].prtnCnSn;
            var src_dstbYn = items[i].dstbYn;
            var src_uid = items[i]._$uid;

            if(addItems.some(function(item) {
                return items[i]._$uid == item._$uid;
            })) {
                saveItems.push(items[i]);
            }

            /*
            for(var j=0; j < checkItems.length; j++) {
                var des_prtnCnSn = checkItems[j].prtnCnSn;
                var des_dstbYn = checkItems[j].dstbYn;
                var des_uid = checkItems[j]._$uid;
                if(des_uid != src_uid && src_prtnCnSn == des_prtnCnSn && !isNull(src_prtnCnSn) && !isNull(des_prtnCnSn) && src_dstbYn != des_dstbYn) {

                    valid = false;
                    alertMessage("프로젝트번호가 중복 입니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"prtnCnSn"));
                    return false;
                    break;
                }
            }*/
        }

        if(valid) {
            saveItems = saveItems.concat(editItems);

            var budgetYear = saveItems[0].budgetYear;

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetFrmtn.do',
                cache : false,
                data: { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1',frmtns:JSON.stringify(saveItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        budgetFrmtn.fn_get_budgetFrmtn( grid, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
                    }else if(result.result == "D") {
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].prtnTaskPrjctNo : "," + list[i].prtnTaskPrjctNo;
                        }

                        Swal.fire({
                            title: "",
                            html: message + " 프로젝트 번호가 이미 등록되어 있습니다.<br>" + "재조회 하시겠습니까?" ,
                            icon: "",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                            reverseButtons: false }).then(function(result) {
                            if (result.value) {
                                budgetFrmtn.fn_get_budgetFrmtn( grid, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
                            }
                        });
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
        }
    });

    // 예산편성 선택삭제
    $("#budgetFrmtn_detele").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.frmtn_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);
        var valid = true;

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        Swal.fire({
            title: "",
            html: "삭제하시겠습니까? " ,
            icon: "",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            reverseButtons: false }).then(function(result) {
            if (result.value) {
                var deleteItems = [];
                var removeIndexs = [];

                for(var i=0; i < items.length; i++) {
                    if(items[i].item.budgetSn > 0) {
                        deleteItems.push(items[i].item);
                    }else {
                        removeIndexs.push(items[i].rowIndex);
                    }
                }

                if(deleteItems.length > 0) {
                    var budgetYear = deleteItems[0].budgetYear;

                    $.ajax({
                        type: 'POST',
                        dataType:"json",
                        url: '/kicpa/budget/deleteBudgetFrmtn.do',
                        cache : false,
                        data: {deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1',frmtns:JSON.stringify(deleteItems)},
                        success: function(data)
                        {
                            var result = data.result;
                            if(result.result == "S") {
                                budgetFrmtn.fn_get_budgetFrmtn( grid, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
                            }else if(result.result == "END") {
                                alertMessage("예산편성이 마감되었습니다.","","-");
                            } else {
                                alertMessage("삭제 된 내역이 없습니다.","","-");
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
            }
        });
    });

    // 예산편성 최종등록
    $("#budgetFrmtn_finish").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.frmtn_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);
        var saveItems = [].concat(addItems);
        saveItems = saveItems.concat(editItems);

        if(addItems.length > 0 || editItems.length > 0) {
            alertMessage("저장 후 최종등록 해 주십시오.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["chrgEmpCd","chrgPartCd","chrgDeptCd","sportDeptCd","policyTaskSn","executTaskSn","prtnCnSn"
        ,"prtnCnGroupSn","goalResult","srtpdBudgetUnit","srtpdBudgetSubjet","srtpdBudgetAmt","hnfInptCd","goalEraCd"],"필수 입력 값입니다.");
        if(!valid) {return false;}

        Swal.fire({
            title: "",
            html: "최종등록 하시겠습니까? " ,
            icon: "",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            reverseButtons: false }).then(function(result) {
            if (result.value) {
                if(valid) {
                    var budgetYear = items[0].budgetYear;
                    $.ajax({
                        type: 'POST',
                        dataType:"json",
                        url: '/kicpa/budget/saveBudgetFrmtnLast.do',
                        cache : false,
                        data: { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1',frmtns:JSON.stringify(saveItems)},
                        success: function(data)
                        {
                            var result = data.result;
                            if(result.result == "S") {
                                budgetFrmtn.fn_get_budgetFrmtn( budgetFrmtn.frmtn_grid_wrap, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
                                budgetFrmtn.endYn = data.endYn;
                            }else if(result.result == "D") {

                                Swal.fire({
                                    title: "",
                                    html:  result.message + "<br>" + "재조회 하시겠습니까?" ,
                                    icon: "",
                                    showCancelButton: true,
                                    confirmButtonText: "확인",
                                    cancelButtonText: "취소",
                                    reverseButtons: false }).then(function(result) {
                                    if (result.value) {
                                        budgetFrmtn.fn_get_budgetFrmtn_refresh("ALL");
                                        budgetFrmtn.fn_get_budgetFrmtn( grid, { deleteYn:'N',budgetYear: budgetYear ,progrsFlag:'1'});
                                    }
                                });
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
                }
            }
        });
    });

    // 분류작업 팝업
    $("#budgetFrmtn_class_modal").on("shown.bs.modal",function(e) {
        fn_AUIGrid_resize([{id:"budgetFrmtn_policy_grid_wrap",obj:budgetFrmtn.policy_grid_wrap}
            ,{id:"budgetFrmtn_execut_grid_wrap",obj:budgetFrmtn.execut_grid_wrap}
            ,{id:"budgetFrmtn_prtn_grid_wrap",obj:budgetFrmtn.prtn_grid_wrap}]);
    });

    $("#budgetFrmtn_class_modal").on("hide.bs.modal",function(e) {
        budgetFrmtn.fn_get_budgetFrmtn_refresh("PROJECT");
    });

    // 관리번호 팝업
    $("#budgetFrmtn_manage_modal").on("shown.bs.modal",function(e) {
        fn_AUIGrid_resize([{id:"budgetFrmtn_manage_policy_grid",obj:budgetFrmtn.manage_policy_grid}
            ,{id:"budgetFrmtn_manage_execut_grid",obj:budgetFrmtn.manage_execut_grid}
            ,{id:"budgetFrmtn_manage_grid_wrap",obj:budgetFrmtn.manage_grid_wrap}]);
    });

    $("#budgetFrmtn_manage_modal").on("hide.bs.modal",function(e) {
        budgetFrmtn.fn_get_budgetFrmtn_refresh("MANAGE");
    });

    // 암분 팝업
    $("#budgetFrmtn_dstb_modal").on("shown.bs.modal",function(e) {
        fn_AUIGrid_resize({id:"budgetFrmtn_dstb_grid",obj:budgetFrmtn.dstb_grid});
    });

    // 수정기록 팝업
    $("#budgetFrmtn_history_modal").on("shown.bs.modal",function(e) {
        fn_AUIGrid_resize({id:"budgetFrmtn_history_grid",obj:budgetFrmtn.history_grid});
    });

    // 분기수정기록 팝업
    $("#budgetFrmtn_qu_history_modal").on("shown.bs.modal",function(e) {
        fn_AUIGrid_resize({id:"budgetFrmtn_qu_history_grid",obj:budgetFrmtn.qu_history_grid});
    });

    // 정책과제 추가
    $("#budgetFrmtn_policy_add").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.policy_grid_wrap;
        var accnutYear = $("#budgetFrmtn_year").selectpicker('val');

        if(isNull2(accnutYear)) {
            alertMessage("편성년도를 선택 하십시오.","","-");
            return false;
        }

        var item = { policyTaskSn:0, accnutYear:accnutYear, policyTaskPrjctNo:"", policyTaskPrjctNm:"",policyTaskOrderSn:0, deleteYn:'N'};

        AUIGrid.addRow(grid,item);
    });

    // 정책과제 삭제
    $("#budgetFrmtn_policy_delete").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.policy_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.policyTaskSn > 0) {
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(deleteItems.length > 0) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetPolicy.do',
                cache : false,
                data: {deleteYn:"N",accnutYear: deleteItems[0].accnutYear,budgetYear:deleteItems[0].accnutYear,progrsFlag:"1" ,policys:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(budgetFrmtn.policy_grid_wrap ,data.budgetPolicyList);
                        AUIGrid.clearGridData(budgetFrmtn.execut_grid_wrap);
                        AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);
                    } else if(result.result == "D") {
                        alertMessage("예산편성에 등록된 정책과제 입니다.","","-");
                    } else if(result.result == "END") {
                        alertMessage("예산편성이 마감되었습니다.","","-");
                    }else{
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

    // 정책과제 저장
    $("#budgetFrmtn_policy_save").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }
        var accnutYear = $("#budgetFrmtn_year").selectpicker('val');

        var grid = budgetFrmtn.policy_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);

        addItems.forEach(function(item) {
            if(isNull(item["policyTaskSn"])) {
                item.policyTaskSn = 0;
                item.accnutYear = accnutYear;
                item.deleteYn = "N";
                item.policyTaskOrderSn = (isNull(item["policyTaskOrderSn"]) ? 0 : item["policyTaskOrderSn"]);
            }
        });

        var saveItems = [].concat(addItems);
        saveItems = saveItems.concat(editItems);

        if(saveItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["policyTaskPrjctNo","policyTaskPrjctNm"],"필수 입력 값입니다.");
        if(!valid) {return false;}

        for(var i=0; i < items.length; i++) {
            var src_policyTaskPrjctNo = items[i].policyTaskPrjctNo;
            var src_uid = items[i]._$uid;

            for(var j=0; j < saveItems.length; j++) {
                var des_policyTaskPrjctNo = saveItems[j].policyTaskPrjctNo;
                var des_uid = saveItems[j]._$uid;
                if(des_uid != src_uid && src_policyTaskPrjctNo == des_policyTaskPrjctNo) {
                    valid = false;
                    alertMessage("프로젝트번호가 중복 됩니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"policyTaskPrjctNo"));
                    return false;
                    break;
                }
            }
        }

        if(valid) {
            accnutYear = saveItems[0].accnutYear;

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetPolicy.do',
                cache : false,
                data: { deleteYn:'N',accnutYear: accnutYear,budgetYear: accnutYear,progrsFlag:"1",policys:JSON.stringify(saveItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(budgetFrmtn.policy_grid_wrap ,data.budgetPolicyList);
                        AUIGrid.clearGridData(budgetFrmtn.execut_grid_wrap);
                        AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);
                    }else if(result.result == "D") {
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].policyTaskPrjctNo : "," + list[i].policyTaskPrjctNo;
                        }

                        Swal.fire({
                            title: "",
                            html: message + " 프로젝트 번호가 이미 등록되어 있습니다.<br>" + "재조회 하시겠습니까?" ,
                            icon: "",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                            reverseButtons: false }).then(function(result) {
                            if (result.value) {
                                budgetFrmtn.fn_get_budgetPolicy( budgetFrmtn.policy_grid_wrap, {accnutYear:accnutYear});
                            }
                        });
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
        }
    });

    // 실행과제 추가
    $("#budgetFrmtn_execut_add").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.policy_grid_wrap;
        var selItems = AUIGrid.getSelectedItems(grid);

        if(selItems.length < 1) {
            alertMessage("정책과제를 선택해 주세요.","","-");
            return false;
        }

        var accnutYear = selItems[0].item.accnutYear;
        var policyTaskSn = selItems[0].item.policyTaskSn;

        if(policyTaskSn < 1) {
            alertMessage("정책과제를 저장 후 선택해 주세요.","","-");
            return false;
        }

        var item = { policyTaskSn:policyTaskSn, accnutYear:accnutYear,executTaskSn:0 , executTaskPrjctNo:"", executTaskPrjctNm:"",executTaskOrderSn:0, deleteYn:'N'};
        AUIGrid.addRow(budgetFrmtn.execut_grid_wrap,item);
    });

    // 실행과제 삭제
    $("#budgetFrmtn_execut_delete").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.execut_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.executTaskSn > 0) {
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(deleteItems.length > 0) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetExecut.do',
                cache : false,
                data: {deleteYn:"N",accnutYear: deleteItems[0].accnutYear,budgetYear: deleteItems[0].accnutYear,progrsFlag:"1",policyTaskSn:deleteItems[0].policyTaskSn,executs:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(grid ,data.budgetExecutList);
                        AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);
                    } else if(result.result == "D") {
                        alertMessage("예산편성에 등록된 실행과제 입니다.","","-");
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

    // 실행과제 저장
    $("#budgetFrmtn_execut_save").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var selItems = AUIGrid.getSelectedItems(budgetFrmtn.policy_grid_wrap);
        var accnutYear = selItems[0].item.accnutYear;
        var policyTaskSn = selItems[0].item.policyTaskSn;

        if(policyTaskSn < 1) {
            return false;
        }

        var grid = budgetFrmtn.execut_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);

        addItems.forEach(function(item) {
            if(isNull(item["executTaskSn"])) {
                item.executTaskSn = 0;
                item.accnutYear = accnutYear;
                item.deleteYn = "N";
                item.policyTaskSn = policyTaskSn;
                item.executTaskOrderSn = (isNull(item["executTaskOrderSn"]) ? 0 : item["executTaskOrderSn"]);
            }
        });

        var saveItems = [].concat(addItems);
        saveItems = saveItems.concat(editItems);

        if(saveItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["executTaskPrjctNo","executTaskPrjctNm"],"필수 입력 값입니다.");
        if(!valid) {return false;}

        for(var i=0; i < items.length; i++) {
            var src_executTaskPrjctNo = items[i].executTaskPrjctNo;
            var src_uid = items[i]._$uid;

            for(var j=0; j < saveItems.length; j++) {
                var des_executTaskPrjctNo = saveItems[j].executTaskPrjctNo;
                var des_uid = saveItems[j]._$uid;
                if(des_uid != src_uid && src_executTaskPrjctNo == des_executTaskPrjctNo) {
                    valid = false;
                    alertMessage("프로젝트번호가 중복 됩니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"executTaskPrjctNo"));
                    return false;
                    break;
                }
            }
        }

        if(valid) {
            var params = {accnutYear:saveItems[0].accnutYear, policyTaskSn:saveItems[0].policyTaskSn ,budgetYear:saveItems[0].accnutYear,progrsFlag:"1"};

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetExecut.do',
                cache : false,
                data: Object.assign({ deleteYn:'N',executs:JSON.stringify(saveItems)},params),
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(grid ,data.budgetExecutList);
                        AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);
                    }else if(result.result == "D") {
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].executTaskPrjctNo : "," + list[i].executTaskPrjctNo;
                        }

                        Swal.fire({
                            title: "",
                            html: message + " 프로젝트 번호가 이미 등록되어 있습니다.<br>" + "재조회 하시겠습니까?" ,
                            icon: "",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                            reverseButtons: false }).then(function(result) {
                            if (result.value) {
                                budgetFrmtn.fn_get_budgetExecut(budgetFrmtn.execut_grid_wrap ,params);
                            }
                        });
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
        }
    });

    // 추진내용 추가
    $("#budgetFrmtn_prtn_add").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.execut_grid_wrap;
        var selItems = AUIGrid.getSelectedItems(grid);

        if(selItems.length < 1) {
            alertMessage("실행과제를 선택해 주세요.","","-");
            return false;
        }

        var accnutYear = selItems[0].item.accnutYear;
        var executTaskSn = selItems[0].item.executTaskSn;

        if(executTaskSn < 1 || isNull2(executTaskSn)) {
            alertMessage("실행과제를 저장 후 선택해 주세요.","","-");
            return false;
        }

        var item = { accnutYear:accnutYear,executTaskSn:executTaskSn ,prtnCnSn:0 , prtnTaskPrjctNo:"", prtnTaskPrjctNm:"",prtnTaskOrderSn:0, deleteYn:'N'};
        AUIGrid.addRow(budgetFrmtn.prtn_grid_wrap,item);
    });

    // 추진내용 삭제
    $("#budgetFrmtn_prtn_delete").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.prtn_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);
        var adminValid = true;

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];


        for(var i=0; i < items.length; i++) {

            if(items[i].item.prtnCnSn > 0) {
                if(budgetFrmtn.admin.admin == "N" && items[i].item.frstRegistId != budgetFrmtn.admin.empid) {
                    adminValid = false;
                    break;
                }

                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(!adminValid) {
            alertMessage("삭제 할 수 없는 항목을 선택하였습니다.","","-");
            return false;
        }

        if(deleteItems.length > 0 && adminValid) {
            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetPrtn.do',
                cache : false,
                data: {deleteYn:"N",accnutYear: deleteItems[0].accnutYear, executTaskSn:deleteItems[0].executTaskSn,budgetYear: deleteItems[0].accnutYear,progrsFlag:"1" ,prtns:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(grid ,data.budgetPrtnList);
                    }else if(result.result == "D") {
                        alertMessage("예산편성에 등록된 추진내용 입니다.","","-");
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
        }else {
            AUIGrid.removeRow(grid,removeIndexs);
        }
    });

    // 추진내용 저장
    $("#budgetFrmtn_prtn_save").on("click", function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var selItems = AUIGrid.getSelectedItems(budgetFrmtn.execut_grid_wrap);
        var accnutYear = selItems[0].item.accnutYear;
        var executTaskSn = selItems[0].item.executTaskSn;

        if(executTaskSn < 1) {
            return false;
        }

        var grid = budgetFrmtn.prtn_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);

        addItems.forEach(function(item) {
            if(isNull(item["prtnCnSn"])) {
                item.prtnCnSn = 0;
                item.accnutYear = accnutYear;
                item.deleteYn = "N";
                item.executTaskSn = executTaskSn;
                item.prtnTaskOrderSn = (isNull(item["prtnTaskOrderSn"]) ? 0 : item["prtnTaskOrderSn"]);
            }
        });

        var saveItems = [].concat(addItems);
        saveItems = saveItems.concat(editItems);

        if(saveItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["prtnTaskPrjctNo","prtnTaskPrjctNm"],"필수 입력 값입니다.");
        if(!valid) {return false;}

        if(editItems.length > 0) {
            var fIdx = editItems.findIndex(function(arr) {
                return budgetFrmtn.admin.admin == "N" && arr.item.frstRegistId != budgetFrmtn.admin.empid
            })

            if(fIdx > -1) {
                alertMessage("수정 할 수 없는 항목을 수정하셨습니다.","","-");
                return false;
            }
        }

        for(var i=0; i < items.length; i++) {
            var src_prtnTaskPrjctNo = items[i].prtnTaskPrjctNo;
            var src_uid = items[i]._$uid;

            for(var j=0; j < saveItems.length; j++) {
                var des_prtnTaskPrjctNo = saveItems[j].prtnTaskPrjctNo;
                var des_uid = saveItems[j]._$uid;
                if(des_uid != src_uid && src_prtnTaskPrjctNo == des_prtnTaskPrjctNo) {
                    valid = false;
                    alertMessage("프로젝트번호가 중복 됩니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"prtnTaskPrjctNo"));
                    return false;
                    break;
                }
            }
        }

        if(valid) {
            var params = {accnutYear:saveItems[0].accnutYear , executTaskSn:saveItems[0].executTaskSn ,budgetYear:saveItems[0].accnutYear,progrsFlag:"1"};

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetPrtn.do',
                cache : false,
                data: Object.assign({ deleteYn:'N' ,prtns:JSON.stringify(saveItems)},params),
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(grid ,data.budgetPrtnList);
                    }else if(result.result == "D") {
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].prtnTaskPrjctNo : "," + list[i].prtnTaskPrjctNo;
                        }

                        Swal.fire({
                            title: "",
                            html: message + " 프로젝트 번호가 이미 등록되어 있습니다.<br>" + "재조회 하시겠습니까?" ,
                            icon: "",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                            reverseButtons: false }).then(function(result) {
                            if (result.value) {
                                budgetFrmtn.fn_get_budgetPrtn( grid, params);
                            }
                        });
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
        }
    });
    
    // 관리번호 추가
    $("#budgetFrmtn_manage_add").on("click",function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.manage_execut_grid;
        var selItems = AUIGrid.getSelectedItems(grid);

        if(selItems.length < 1) {
            alertMessage("실행과제를 선택해 주세요.","","-");
            return false;
        }

        var accnutYear = selItems[0].item.accnutYear;
        var executTaskSn = selItems[0].item.executTaskSn;

        if(executTaskSn < 1) {
            alertMessage("실행과제를 저장 후 선택해 주세요.","","-");
            return false;
        }

        var item = { executTaskSn:executTaskSn, accnutYear:accnutYear,prtnCnGroupSn:0 , prtnCnGroupNo:"", prtnCnGroupNm:"",prtnCnGroupOrderSn:0, deleteYn:'N'};
        AUIGrid.addRow(budgetFrmtn.manage_grid_wrap,item);
    });
    // 관리번호 삭제
    $("#budgetFrmtn_manage_delete").on("click",function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var grid = budgetFrmtn.manage_grid_wrap;
        var items = AUIGrid.getCheckedRowItems(grid);
        var adminValid = true;

        if(items.length < 1) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }

        var deleteItems = [];
        var removeIndexs = [];

        for(var i=0; i < items.length; i++) {
            if(items[i].item.prtnCnGroupSn > 0) {
                if(budgetFrmtn.admin.admin == "N" && items[i].item.frstRegistId != budgetFrmtn.admin.empid) {
                    adminValid = false;
                    break;
                }
                deleteItems.push(items[i].item);
            }else {
                removeIndexs.push(items[i].rowIndex);
            }
        }

        if(!adminValid) {
            alertMessage("삭제 할 수 없는 항목을 선택하였습니다.","","-");
            return false;
        }

        if(deleteItems.length > 0 && adminValid) {
            var accnutYear = deleteItems[0].accnutYear;
            var executTaskSn = deleteItems[0].executTaskSn;

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/deleteBudgetGroup.do',
                cache : false,
                data: {deleteYn:"N",accnutYear: accnutYear,budgetYear:accnutYear ,progrsFlag:"1" , executTaskSn:executTaskSn ,groups:JSON.stringify(deleteItems)},
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(grid ,data.budgetGroupList);
                    }else if(result.result == "D") {
                        alertMessage("예산편성에 등록된 관리번호 입니다.","","-");
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
        }else {
            AUIGrid.removeRow(grid,removeIndexs);
        }
    });
    // 관리번호 저장
    $("#budgetFrmtn_manage_save").on("click",function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var selItems = AUIGrid.getSelectedItems(budgetFrmtn.manage_execut_grid);
        var accnutYear = selItems[0].item.accnutYear;
        var executTaskSn = selItems[0].item.executTaskSn;

        if(executTaskSn < 1) {
            return false;
        }

        var grid = budgetFrmtn.manage_grid_wrap;
        var addItems = AUIGrid.getAddedRowItems(grid);
        var editItems = AUIGrid.getEditedRowItems(grid);
        var items = AUIGrid.getGridData(grid);

        addItems.forEach(function(item) {
            if(isNull(item["executTaskSn"])) {
                item.prtnCnGroupSn = 0;
                item.accnutYear = accnutYear;
                item.deleteYn = "N";
                item.executTaskSn = executTaskSn;
                item.executTaskOrderSn = (isNull(item["executTaskOrderSn"]) ? 0 : item["executTaskOrderSn"]);
            }
        });

        var saveItems = [].concat(addItems);
        saveItems = saveItems.concat(editItems);

        if(saveItems.length < 1) {
            alertMessage("저장할 내역이 없습니다.","","-");
            return false;
        }

        if(editItems.length > 0) {
            var fIdx = editItems.findIndex(function(arr) {
                return budgetFrmtn.admin.admin == "N" && arr.item.frstRegistId != budgetFrmtn.admin.empid
            })

            if(fIdx > -1) {
                alertMessage("수정 할 수 없는 항목을 수정하셨습니다.","","-");
                return false;
            }
        }

        // 필수 입력 체크
        var valid = AUIGrid.validateGridData(grid, ["prtnCnGroupNo","prtnCnGroupNm"],"필수 입력 값입니다.");
        if(!valid) {return false;}

        for(var i=0; i < items.length; i++) {
            var src_prtnCnGroupNo = items[i].prtnCnGroupNo;
            var src_uid = items[i]._$uid;

            for(var j=0; j < saveItems.length; j++) {
                var des_prtnCnGroupNo = saveItems[j].prtnCnGroupNo;
                var des_uid = saveItems[j]._$uid;
                if(des_uid != src_uid && src_prtnCnGroupNo == des_prtnCnGroupNo) {
                    valid = false;
                    alertMessage("프로젝트번호가 중복 됩니다.","","-");
                    AUIGrid.setSelectionByIndex(grid, AUIGrid.rowIdToIndex(grid,des_uid), AUIGrid.getColumnIndexByDataField(grid,"prtnCnGroupNo"));
                    return false;
                    break;
                }
            }
        }

        if(valid) {

            var params = {executTaskSn:saveItems[0].executTaskSn,accnutYear:saveItems[0].accnutYear,budgetYear:saveItems[0].accnutYear,progrsFlag:"1"};

            $.ajax({
                type: 'POST',
                dataType:"json",
                url: '/kicpa/budget/saveBudgetGroup.do',
                cache : false,
                data: Object.assign({ deleteYn:'N' ,groups:JSON.stringify(saveItems)},params),
                success: function(data)
                {
                    var result = data.result;
                    if(result.result == "S") {
                        AUIGrid.setGridData(grid ,data.budgetGroupList);
                    }else if(result.result == "D") {
                        var list = result.existList;
                        var message = "";

                        for(var i=0; i < list.length; i++) {
                            message += isNull2(message) ?  list[i].prtnCnGroupNo : "," + list[i].prtnCnGroupNo;
                        }

                        Swal.fire({
                            title: "",
                            html: message + " 프로젝트 번호가 이미 등록되어 있습니다.<br>" + "재조회 하시겠습니까?" ,
                            icon: "",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                            reverseButtons: false }).then(function(result) {
                            if (result.value) {
                                budgetFrmtn.fn_get_budgetGroup( grid, params);
                            }
                        });
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
        }
    });

    function fn_set_dstb_amt() {
        var data = AUIGrid.getGridData(budgetFrmtn.dstb_grid);

        data.forEach(function(arr,idx) {
            var srtpdBudgetAmt = $("#budgetFrmtn_dstb_amt").val().replace(/\s|\D/g, '');
            var calc_amt = budgetFrmtn.fn_dstb_calculate(srtpdBudgetAmt,arr.dstbRate);
            AUIGrid.setCellValue(budgetFrmtn.dstb_grid,idx,"srtpdBudgetAmt",calc_amt);
        });
    }

    // 안분율 총금액 입력
    $("#budgetFrmtn_dstb_amt").on({
       input:function(e) {
           var value = $(this).val().replace(/\s|\D/g, '');
           var value = AUIGrid.formatNumber(value,"#,###");
           $(this).val(value);
          },
        keyup:function(e) {
            if(e.keyCode == 13) {
                fn_set_dstb_amt();
            }
        },
        blur : function(e) {
            fn_set_dstb_amt();
        },
    });

    // 안분율 확인
    $("#budgetFrmtn_dstb_confirm").on("click", function(e){
        var data = AUIGrid.getGridData(budgetFrmtn.dstb_grid);
        var dstb_obj = $("#budgetFrmtn_dstb_modal").data("data-dstb");
        var rowIndex = dstb_obj.rowIndex;
        var item = dstb_obj.item;
        var refresh = {budgetSn:0
            ,frmtrmBudgetUnit: ""
            ,frmtrmBudgetSubjet:""
            ,frmtrmBudgetAmt:0
            ,excutPrearngeAmt:0
            ,excutAddYn:"N"
            ,budgetSortSn:0
            ,budgetEmpSortSn:0
            ,budgetProgrsSttus:"1"
            ,quHistRcord:0
            ,histRcord:0};

        for(var i=0; i < data.length; i++) {
            var new_item = fDeepCloneObject(item);

            new_item.srtpdBudgetAmt = data[i].srtpdBudgetAmt;
            new_item.srtpdBudgetSubjet = data[i].srtpdBudgetSubjet;
            new_item.srtpdBudgetUnit = data[i].fsseCd;
            new_item.dstbYn = "Y";

            if(i==0) {
                AUIGrid.updateRow(budgetFrmtn.frmtn_grid_wrap,new_item,rowIndex);
            }else {
                new_init_item = Object.assign(new_item,refresh);
                AUIGrid.addRow(budgetFrmtn.frmtn_grid_wrap,new_init_item,rowIndex+i);
            }
        }

        $("#budgetFrmtn_dstb_modal").modal("hide");
    });

    // 테이블 열 초기화
    $("#budgetFrmtn_column_reset").on("click",function(e) {
        AUIGrid.changeColumnLayout(budgetFrmtn.frmtn_grid_wrap, budgetFrmtn.frmtn_columnLayout);

        budgetFrmtn.fn_set_itemFilter(budgetFrmtn.itemFilterList);
    });

    // 엑셀 다운로드
    $("#budgetFrmtn_excel").on("click",function(e) {
        var year = $("#budgetFrmtn_year").val();
        var grid = budgetFrmtn.frmtn_grid_wrap;
        var exceptColumns = ["excutAddYn","budgetProgrsSttus","goalEraCd"];

        if(Array.isArray(budgetFrmtn.itemFilterList)) {
            budgetFrmtn.itemFilterList.forEach(function(item) {
                if(item.ck == "Y") {
                    if(item.optn2 == "G") {
                        var col = budgetFrmtn.frmtn_columnLayout.find(function(arr) {
                            return arr.dataField == item.optn1
                        });
                        if(!isNull(col)) {
                            var dataFields = budgetFrmtn.fn_get_leaf_dataFiled(col);
                            if(Array.isArray(dataFields) && dataFields.length > 0) {
                                exceptColumns = exceptColumns.concat(dataFields);
                            }
                        }
                    }else {
                        exceptColumns.push(item.optn1);
                    }
                }
            });
        }

        var exportProps = {fileName:"예산편성" + (isNull(year) ? "" : "_" + year)
            ,exceptColumnFields : exceptColumns
            ,beforeRequestCallback: function() { budgetFrmtn.excelPrintYN = "Y";}
            ,afterRequestCallback : function() { budgetFrmtn.excelPrintYN = "N";}
            ,exportWithStyle:true};

        AUIGrid.exportToXlsx(grid ,exportProps );
    });
    
    // 분류등록 불러오기
    $("#budgetFrmtn_prtn_load").on("click",function(e) {

        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var selItems = AUIGrid.getSelectedItems(budgetFrmtn.execut_grid_wrap);

        if(selItems.length < 1) {
            alertMessage("실행과제를 선택하십시오.","","-");
            return false;
        }

        var accnutYear = selItems[0].item.accnutYear;
        var executTaskSn = selItems[0].item.executTaskSn;

        if(!isNull2(accnutYear)) {
            var lastAccnutYear = (accnutYear+"0101").toDate().getAddDate(-1,"Y").getDateFormat("YYYY");
        }

        $.ajax({
            type: 'POST',
            dataType:"json",
            url: '/kicpa/budget/loadLastYearPrnt.do',
            cache : false,
            data: { deleteYn:'N',accnutYear:accnutYear,lastAccnutYear:lastAccnutYear,executTaskSn:executTaskSn},
            success: function(data)
            {
                var list = data.lastYearPrntList;
                if(isNull(list)) {
                    alertMessage("불러올 내역이 존재하지 않습니다.","","-");
                    return false;
                }else if(list.length < 1) {
                    alertMessage("불러올 내역이 존재하지 않습니다.","","-");
                    return false;
                }else {
                    AUIGrid.addRow( budgetFrmtn.prtn_grid_wrap, list);
                }
            },
            onError : function(status, e) {
                // 로더 제거
                console.log("errror",e);
            }
        });
    });
    // 관리번호 불러오기
    $("#budgetFrmtn_manage_load").on("click",function(e) {
        if(budgetFrmtn.endYn == "Y") {
            alertMessage("예산편성이 마감되었습니다.","","-");
            return false;
        }

        var selItems = AUIGrid.getSelectedItems(budgetFrmtn.manage_execut_grid);

        if(selItems.length < 1) {
            alertMessage("실행과제를 선택하십시오.","","-");
            return false;
        }

        var accnutYear = selItems[0].item.accnutYear;
        var executTaskSn = selItems[0].item.executTaskSn;

        if(!isNull2(accnutYear)) {
            var lastAccnutYear = (accnutYear+"0101").toDate().getAddDate(-1,"Y").getDateFormat("YYYY");
        }

        $.ajax({
            type: 'POST',
            dataType:"json",
            url: '/kicpa/budget/loadLastYearGroup.do',
            cache : false,
            data: { deleteYn:'N',accnutYear:accnutYear,lastAccnutYear:lastAccnutYear,executTaskSn:executTaskSn},
            success: function(data)
            {
                var list = data.lastYearGroupList;
                if(isNull(list)) {
                    alertMessage("불러올 내역이 존재하지 않습니다.","","-");
                    return false;
                }else if(list.length < 1) {
                    alertMessage("불러올 내역이 존재하지 않습니다.","","-");
                    return false;
                }else {
                    AUIGrid.addRow( budgetFrmtn.manage_grid_wrap, list);
                }
            },
            onError : function(status, e) {
                // 로더 제거
                console.log("errror",e);
            }
        });
    });
}
// 정책과제 조회
budgetFrmtn.fn_get_budgetPolicy = function(grid , params) {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetPolicyList.do',
        cache : false,
        data: { deleteYn:'N',accnutYear:params["accnutYear"],policyTaskSn:params["policyTaskSn"]},
        success: function(data)
        {
            AUIGrid.setGridData(grid,data.budgetPolicyList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 실행과제 조회
budgetFrmtn.fn_get_budgetExecut = function(grid , params) {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetExecutList.do',
        cache : false,
        data: { deleteYn:'N',accnutYear:params["accnutYear"],policyTaskSn:params["policyTaskSn"],executTaskSn:params["executTaskSn"]},
        success: function(data)
        {
            AUIGrid.setGridData(grid,data.budgetExecutList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 추진내용
budgetFrmtn.fn_get_budgetPrtn = function(grid , params) {

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetPrtnList.do',
        cache : false,
        data: { deleteYn:'N',accnutYear:params["accnutYear"],prtnCnSn:params["prtnCnSn"],executTaskSn:params["executTaskSn"]},
        success: function(data)
        {
            AUIGrid.setGridData(grid,data.budgetPrtnList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

// 관리번호 조회
budgetFrmtn.fn_get_budgetGroup = function(grid , params) {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetGroupList.do',
        cache : false,
        data: { deleteYn:'N',accnutYear:params["accnutYear"],prtnCnGroupSn:params["prtnCnGroupSn"],executTaskSn:params["executTaskSn"]},
        success: function(data)
        {
            AUIGrid.setGridData(grid,data.budgetGroupList);
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}


// 그리드 활성/비활성화 전체 체크박스
budgetFrmtn.fn_activeBudget = function(event) {
    var items = AUIGrid.getGridData(budgetFrmtn.frmtn_grid_wrap);
    var updateItems = [];

    items.forEach(function(item,idx) {
        if(event.checked) {
            if(item.budgetProgrsSttus == "1" && item.actvtyAt == "N") {
                updateItems.push(["Y"]);
            }else {
                updateItems.push(["N"]);
            }
        }else {
            updateItems.push(["N"]);
        }
    });
    if(updateItems.length > 0) {
        AUIGrid.updateRowBlockToValue(budgetFrmtn.frmtn_grid_wrap , 0 , items.length-1 ,"actvtyAt" ,updateItems );
    }
}

// 분류등록 (정책과제, 실행과제, 추진내용 설정기능)  팝업
budgetFrmtn.fn_modal_class = function (e) {

    $("#budgetFrmtn_class_modal").modal('show');
    var accnutYear = $("#budgetFrmtn_year").selectpicker('val');

    if(!isNull(budgetFrmtn.template)) {
        budgetFrmtn.templateYn = "Y";
    }else {
        budgetFrmtn.templateYn = "N";
    }

    // 정책과제 조회
    budgetFrmtn.fn_get_budgetPolicy(budgetFrmtn.policy_grid_wrap,{accnutYear:accnutYear});
    //실행과제,추진내용 초기화
    AUIGrid.clearGridData(budgetFrmtn.execut_grid_wrap);
    AUIGrid.clearGridData(budgetFrmtn.prtn_grid_wrap);

}

// 그룹코드 관리번호 팝업
budgetFrmtn.fn_modal_manage = function () {
    $("#budgetFrmtn_manage_modal").modal('show');
    var accnutYear = $("#budgetFrmtn_year").selectpicker('val');

    if(!isNull(budgetFrmtn.template)) {
        budgetFrmtn.templateYn = "Y";
    }else {
        budgetFrmtn.templateYn = "N";
    }

    // 정책과제 조회
    budgetFrmtn.fn_get_budgetPolicy(budgetFrmtn.manage_policy_grid,{accnutYear:accnutYear});
    //실행과제,추진내용 초기화
    AUIGrid.clearGridData(budgetFrmtn.manage_execut_grid);
    AUIGrid.clearGridData(budgetFrmtn.manage_grid_wrap);
}

// 항목선택 항목저장
budgetFrmtn.fn_save_itemFilter = function(grpCd , checks ,callback) {

    if(Array.prototype.isPrototypeOf(checks)) {

        $.ajax({
            type: 'POST',
            dataType:"json",
            url: '/kicpa/code/saveItemFilter.do',
            cache : false,
            data: { deleteYn:'N',grpCd:grpCd,items:JSON.stringify(checks)},
            success: function(data)
            {
                budgetFrmtn.insertItemFilter = null;
                budgetFrmtn.fn_set_itemFilter(data.itemFilterList);
                if(typeof callback == "function") {
                    callback();
                }
            },
            onError : function(status, e) {
                // 로더 제거
                console.log("errror",e);
            }
        });
    }else {
        if(typeof callback == "function") {
            callback();
        }
    }
}

// 항목선택 설정
budgetFrmtn.fn_set_itemFilter = function(list,isCheckOnly) {
    var grid = budgetFrmtn.frmtn_grid_wrap;
    budgetFrmtn.itemFilterList = list;

    // 항목 선택 설정
    var $checks = $("input[type='checkbox']","#budgetFrmtn_select_menu");
    var $all_check = $("#budgetFrmtn_all_menu");
    var hideField = [];
    var showField = [];

    for(var i=0; i < list.length; i++) {
        var ck = list[i].ck;
        var optn1 = list[i].optn1;
        var optn2 = list[i].optn2;

        $checks.filter("[value='" + list[i].cd + "']").each(function(idx,item) {
            var $item = $(item);
            ck == "Y" ? $item.prop("checked",true) : $item.prop("checked",false);
        });

        if(isCheckOnly) {
            continue;
        }

        // 그리드 항목 설정
        if(ck == "Y") {
            optn2 == "G" ? AUIGrid.hideColumnGroup(grid,optn1) : hideField.push(optn1);
        }else {
            optn2 == "G" ? AUIGrid.showColumnGroup(grid,optn1) : showField.push(optn1);
        }
    }

    if(!isCheckOnly) {
        if(hideField.length > 0) {
            AUIGrid.hideColumnByDataField(grid,hideField);
        }

        if(showField.length > 0) {
            AUIGrid.showColumnByDataField(grid,showField);
        }
    }

    if($checks.is(":not(:checked)")) {
        if($all_check.prop("checked"))  {
            $all_check.prop("checked",false);
        }
    }else {
        if(!$all_check.prop("checked"))  {
            $all_check.prop("checked",true);
        }
    }
}

// 안분 계산
budgetFrmtn.fn_dstb_calculate = function(amt , rate){
    if(isNull(amt) || isNull(rate)) {
        return 0;
    }
    return String(amt*(rate/100)).getRound(6,"UP");
}
// 안분비율 팝업
budgetFrmtn.fn_modal_dstb = function(dstb_obj) {
    $("#budgetFrmtn_dstb_modal").modal("show");
    $("#budgetFrmtn_dstb_modal").data("data-dstb",dstb_obj);

    var params = {deleteYn:"N",dstbSn:dstb_obj.dstbSn}

    var srtpdBudgetAmt = isNull(dstb_obj.srtpdBudgetAmt) ? 0 : dstb_obj.srtpdBudgetAmt;


    if(srtpdBudgetAmt > 0) {
        $("#budgetFrmtn_dstb_amt").val(budgetFrmtn.fn_text_express("WON",srtpdBudgetAmt));
    }

    budgetFrmtn.fn_get_dstb_rate(params,function(list) {
        for(var i=0; i < list.length; i++) {
            list[i].srtpdBudgetSubjet = dstb_obj.srtpdBudgetSubjet;
            var dstbRate = isNull2(list[i].dstbRate) ? 0 : list[i].dstbRate;
            if(srtpdBudgetAmt > 0 && dstbRate > 0) {
                list[i].srtpdBudgetAmt = budgetFrmtn.fn_dstb_calculate(srtpdBudgetAmt,dstbRate);
            }else {
                list[i].srtpdBudgetAmt = 0;
            }
        }
        AUIGrid.setGridData(budgetFrmtn.dstb_grid,list);
    });
}

// 안분비율 조회
budgetFrmtn.fn_get_dstb_rate = function(params,callback){
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetRateList.do',
        cache : false,
        data: params,
        success: function(data)
        {
            if(typeof callback == "function") {
                callback(data.budgetRateList);
            }
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

budgetFrmtn.fn_text_express = function(mode,value) {
    var rtn_value = "";
    switch(mode) {
        case "WON" : rtn_value = (isNull2(value) ? value : String(value).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')); break;
    }
    return rtn_value;
}

budgetFrmtn.fn_get_budgetFrmtn = function( grid, params , checkLastYear) {

    if(budgetFrmtn.admin.admin != "Y") {
        params["chrgEmpCd"] = budgetFrmtn.admin.empid;
    }

    KTApp.block('#budgetFrmtn', {
        overlayColor: 'transparent',
        state: 'primary',
        message: 'Please wait...'
    });

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetFrmtnList.do',
        cache : false,
        data: params,
        success: function(data)
        {
            KTApp.unblock('#budgetFrmtn');
            //console.log("grid" , data.budgetFrmtnList);
            var count = data.budgetFrmtnList.length;
            $("#budgetFrmtn_count").text(count);
            AUIGrid.setGridData( grid, data.budgetFrmtnList);

            if(checkLastYear == "Y" && count < 1 && budgetFrmtn.admin.admin == "Y") {
                var template = $('<div style="margin-top:200px;">등록된 정보가 없습니다.<br>' +
                  '<button type="button" style="margin-top:20px;height:50px;border-radius:30px;" onclick="budgetFrmtn.fn_get_lastYear_budgetFrmtn();"> 작년정보 불러오기</button>    ' +
                  '</div>').wrapAll('<div></div>').parent().html();

                //console.log("template",template);
                budgetFrmtn.template = template;
                AUIGrid.showInfoMessage(budgetFrmtn.frmtn_grid_wrap, template);
                $("#budgetFrmtn_grid_wrap").find(".aui-grid-info-layer").css("width","100%").css("text-align","center");
            }
        },
        onError : function(status, e) {
            KTApp.unblock('#budgetFrmtn');
            // 로더 제거
            console.log("errror",e);
        }
    });
}

budgetFrmtn.fn_get_history = function(callpre, url, params , callback) {
    if(typeof callpre == "function") {
        callpre();
    }

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: url,
        cache : false,
        data: params,
        success: function(data)
        {
            if(typeof callback == "function") {
                callback(data);
            }
        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}

budgetFrmtn.fn_get_budgetFrmtn_refresh = function(call_type) {
    var sel_year = $("#budgetFrmtn_year").val();
    var grid = budgetFrmtn.frmtn_grid_wrap;

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/selectBudgetFrmtnRefresh.do',
        cache : false,
        data: { deleteYn:'N',accnutYear:sel_year,type:call_type},
        success: function(data)
        {
            var items = AUIGrid.getGridData(grid);

            if(call_type == "PROJECT" || call_type == "ALL") {
                budgetFrmtn.budgetPolicyList = data.budgetPolicyList; // 정책과제
                budgetFrmtn.budgetExecutList = data.budgetExecutList; // 실행과제
                budgetFrmtn.budgetPrtnList = data.budgetPrtnList; //추진과제

            }else if(call_type == "MANAGE" || call_type == "ALL") {
                budgetFrmtn.budgetGroupList = data.budgetGroupList; // 과제번호

            }

            AUIGrid.refresh(grid);

            if(budgetFrmtn.templateYn == "Y" && !isNull(budgetFrmtn.template)) {
                AUIGrid.showInfoMessage(budgetFrmtn.frmtn_grid_wrap, budgetFrmtn.template);
                budgetFrmtn.templateYn = "N";
            }

            for(var i=0; i < items.length; i++) {
                var policyTaskSn = items[i].policyTaskSn;
                var executTaskSn = items[i].executTaskSn;
                var prtnCnSn = items[i].prtnCnSn;
                var prtnCnGroupSn = items[i].prtnCnGroupSn;
                var fIdx = -1;
                var item = {};


                if(call_type == "PROJECT" || call_type == "ALL") {
                    if(budgetFrmtn.budgetPolicyList instanceof Array && budgetFrmtn.budgetPolicyList.length > 0) {
                        fIdx = budgetFrmtn.budgetPolicyList.findIndex(function(arr) {
                            return arr.policyTaskSn == policyTaskSn;
                        });

                        if(fIdx <0) {
                            item.policyTaskSn = "";
                        }
                    }

                    if(budgetFrmtn.budgetExecutList instanceof Array && budgetFrmtn.budgetExecutList.length > 0) {
                        fIdx = budgetFrmtn.budgetExecutList.findIndex(function(arr) {
                            return arr.executTaskSn == executTaskSn;
                        });

                        if(fIdx <0) {
                            item.executTaskSn = "";
                        }
                    }

                    if(budgetFrmtn.budgetPrtnList instanceof Array && budgetFrmtn.budgetPrtnList.length > 0) {
                        fIdx = budgetFrmtn.budgetPrtnList.findIndex(function(arr) {
                            return arr.prtnCnSn == prtnCnSn;
                        });

                        if(fIdx <0) {
                            item.prtnCnSn = "";
                        }
                    }
                }else if(call_type == "MANAGE" || call_type == "ALL") {
                    if(budgetFrmtn.budgetGroupList instanceof Array && budgetFrmtn.budgetGroupList.length > 0) {
                        fIdx = budgetFrmtn.budgetGroupList.findIndex(function(arr) {
                            return arr.prtnCnGroupSn == prtnCnGroupSn;
                        });

                        if(fIdx <0) {
                            item.prtnCnGroupSn = "";
                        }
                    }
                }

                if(Object.keys(item).length > 0) {
                    AUIGrid.updateRow(grid, item, AUIGrid.rowIdToIndex(grid,items[i]._$uid));
                }
            }

        },
        onError : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });

}

budgetFrmtn.fn_get_leaf_dataFiled = function(columns) {
    var rtn_cols = [];

    if(Array.isArray(columns["children"])) {
        columns["children"].forEach(function(col) {
            if(Array.isArray(col["children"])) {
                var temp = budgetExcut.fn_get_leaf_dataFiled(col);
                if(Array.isArray(temp)) {
                    rtn_cols = rtn_cols.concat(temp);
                }
            }else {
                rtn_cols.push(col.dataField);
            }
        });

        return rtn_cols;
    }else {
        return rtn_cols.push(columns.dataField);
    }
}

budgetFrmtn.fn_get_lastYear_budgetFrmtn = function() {

    KTApp.block('#budgetFrmtn', {
        overlayColor: 'transparent',
        state: 'primary',
        message: 'Please wait...'
    });

    var budgetYear = $("#budgetFrmtn_year").selectpicker('val');

    if(!isNull(budgetYear)) {
        var budgetFormerYear = budgetYear -1;
    }

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/budget/budgetFrmtnLastYear.do',
        cache : false,
        data: {budgetYear:budgetYear,budgetFormerYear:budgetFormerYear,deleteYn:'N'},
        success: function(data)
        {
            KTApp.unblock('#budgetFrmtn');
            budgetFrmtn.template = "";
            //console.log("grid" , data.budgetFrmtnLastYearList);
            var count = data.budgetFrmtnLastYearList.length;
            $("#budgetFrmtn_count").text(count);
            AUIGrid.addRow( budgetFrmtn.frmtn_grid_wrap, data.budgetFrmtnLastYearList);
        },
        onError : function(status, e) {
            KTApp.unblock('#budgetFrmtn');
            // 로더 제거
            console.log("errror",e);
        }
    });
}

budgetFrmtn.fn_get_textarea_style = function(value) {
    return '<pre style="font-family: Malgun Gothic, 맑은 고딕, AppleSDGothicNeo-Light,tsans-serif;">' + value + '</pre>';
}