var lifeDues = lifeDues || {
    prefix:"lifeDues"
   ,lifeDues_grid_wrap:null
};

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        lifeDues.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

$(document).ready(function() {
    // 탭이 열린후 grid resize
    $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
        $(window).resize();
    });
    //납부상태(I:입금,C:취소,R:반환)
    lifeDues.curDate = getCurrentDate();
    lifeDues.payStatusCode = [{cd:"I", cd_nm:"납부"},{cd:"C", cd_nm:"납부취소"}];

    lifeDues.fn_createAUIGrid();

    lifeDues.fn_init_events();

    lifeDues.fn_init();
});

lifeDues.fn_init = function() {

    // 탭이 열린후 grid resize
    $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
        $(window).resize();
    });

    $(lifeDues.fn_get_id("regist","#")).selectpicker(); // 등록구분

    $(lifeDues.fn_get_id("date_flag","#")).selectpicker(); // 날짜구분

    $(lifeDues.fn_get_id("fromdd","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko"
    });

    $(lifeDues.fn_get_id("todd","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko"
    });

    commonDues.fn_get_commonCode(lifeDues,"GN0013");

}

lifeDues.fn_createAUIGrid = function() {
    var lifeDues_columnLayout = lifeDues.fn_get_lifeDues_grid();

    var default_props = {
        headerHeight: 24, //헤더의 높이를 지정합니다.
        editable : false,
        rowIdField : "", // row 를 구별짓는 유니크한 값을 갖는 필드 설정 (10만 행 이상의 대용량인 경우 반드시 설정을 권함 )
    }

    var lifeDues_props = {
        showRowNumColumn:true
    }

    fn_AUIGrid_create([{id:lifeDues.fn_get_id("grid_wrap"), obj:[lifeDues,"lifeDues_grid_wrap"], layout:lifeDues_columnLayout , prop:default_props , addprop:lifeDues_props}]);
}

lifeDues.fn_init_events = function() {
    $(lifeDues.fn_get_id("date_flag","#")).on('loaded.bs.select', function (e) {
        $(lifeDues.fn_get_id("date","#")).find("input").prop("disabled",true).end();
    });

    // 날짜구분
    $(lifeDues.fn_get_id("date_flag","#")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        // do something...
        //console.log(e,clickedIndex,isSelected,previousValue );
        var date_flag = $(e.target).val();
        var fromdd = $(lifeDues.fn_get_id("fromdd","#")).datepicker("getDate"); // 시작일
        var todd = $(lifeDues.fn_get_id("todd","#")).datepicker("getDate"); // 종료일

        // console.log("?????", fromdd , todd ,!(fromdd instanceof Date) , !(todd instanceof Date) ,lifeDues.curDate )

        if(isNull(date_flag)) {
            $(lifeDues.fn_get_id("date","#")).find("input").prop("disabled",true).end();
        }else {
            $(lifeDues.fn_get_id("date","#")).find("input").prop("disabled",false).end();
            if(!(fromdd instanceof Date)) {
                $(lifeDues.fn_get_id("fromdd","#")).datepicker("update",lifeDues.curDate);
            }

            if(!(todd instanceof Date)) {
                $(lifeDues.fn_get_id("todd","#")).datepicker("update",lifeDues.curDate);
            }
        }
    });

    // 날짜변경
    $(lifeDues.fn_get_id("fromdd","#")).on('changeDate blur', function (e) {
        var fromdd =  e.date || $(lifeDues.fn_get_id("fromdd","#")).datepicker("getDate");
        var todd = $(lifeDues.fn_get_id("todd","#")).datepicker("getDate"); // 종료일

        if(fromdd > todd) {
            $(lifeDues.fn_get_id("todd","#")).datepicker("update",fromdd);
        }
    });

    $(lifeDues.fn_get_id("todd","#")).on('changeDate blur', function (e) {
        var todd =  e.date || $(lifeDues.fn_get_id("todd","#")).datepicker("getDate");
        var fromdd = $(lifeDues.fn_get_id("fromdd","#")).datepicker("getDate"); // 시작일

        if(fromdd > todd) {
            $(lifeDues.fn_get_id("fromdd","#")).datepicker("update",todd);
        }
    });


    // 성명
    $(lifeDues.fn_get_id("koreanNm","#")).on("keypress",function(e) {
        if(e.keyCode == 13) {
            lifeDues.fn_seach_lifeDues();
        }
    });

    // 검색
    $(lifeDues.fn_get_id("search","#")).on("click",function(e) {
        lifeDues.fn_seach_lifeDues();
    });

    // 테이블리스트 초기화
    $(lifeDues.fn_get_id("init","#")).on("click",function(e) {
        AUIGrid.clearGridData(lifeDues.lifeDues_grid_wrap);
        //AUIGrid.changeColumnLayout(lifeDues.lifeDues_grid_wrap, lifeDues.fn_get_lifeDues_grid());
    });

    // 납부구분
    $(lifeDues.fn_get_id("pay","#")).on("click",function(e) {
        mainCommonList.fn_popup_search("",{title:""} , lifeDues.fn_set_lifeDues_pay);
    });

    AUIGrid.bind(lifeDues.lifeDues_grid_wrap, "cellEditBegin", function( event ) {
        if(event.isClipboard) {
            return false;
        }
    });
}

lifeDues.fn_set_lifeDues_pay = function(item) {
    //console.log("item~~" , item);
    if(isNull(item)) {
        return false;
    }

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/dues/lifeDuesPayInfo.do',
        cache : false,
        data: {pin:item.pin},
        success: function(data)
        {
            if(isNull(data.lifeDuesPayInfo)) {
                alertMessage("납입대상자가 아닙니다.","","-");
                return false;
            }else {

                //console.log("param",param);
                addNewTab('lifeDuesPay', '/kicpa/dues/lifeDuesPay.do', '납부등록' , data.lifeDuesPayInfo);
            }
        },
        error : function(status, e) {
            alertMessage("납입 대상자 확인 중 오류발생","","-");
            // 로더 제거
            console.log("errror",e);
        }
    });
}

lifeDues.fn_init_resize_AUIGrid = function(){

    fn_AUIGrid_resize([{id: lifeDues.fn_get_id("grid_wrap"),obj:lifeDues.lifeDues_grid_wrap}]);
}

lifeDues.fn_get_id = function(id,tag) {
    return  (isNull(tag)?"":tag) + lifeDues.prefix + "_" + id;
}

lifeDues.fn_seach_lifeDues = function() {
    var param = {};
    var arr = $(lifeDues.fn_get_id("searchForm","#")).serializeArray();

    if (arr) {
        $.each(arr, function(index,item) {
            if(!isNull(item.value)) {
                if(param.hasOwnProperty(item.name)) {
                    param[item.name] += "," + item.value;
                }else {
                    switch(item.name) {
                        case "fromdd" : param[item.name] = item.value.replace(/-/g,""); break;
                        case "todd" : param[item.name] = item.value.replace(/-/g,""); break;
                        default : param[item.name] = item.value; break;
                    }
                }
            }
        });
    }

    KTApp.block(lifeDues.fn_get_id("main","#"), {
        overlayColor: 'transparent',
        state: 'primary',
        message: 'Please wait...'
    });

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/dues/lifeDuesList.do',
        cache : false,
        data: param,
        success: function(data)
        {
            KTApp.unblock(lifeDues.fn_get_id("main","#"));
            AUIGrid.setGridData(lifeDues.lifeDues_grid_wrap,data.lifeDuesList);
        },
        error : function(status, e) {
            KTApp.unblock(lifeDues.fn_get_id("main","#"));
            alertMessage("신규회비 조회 중 오류발생했습니다.","","-");
            // 로더 제거
            console.log("errror",e);
        }
    });
}

lifeDues.fn_get_lifeDues_grid = function() {
    return [{
        dataField : "koreanNm",
        headerText : "이름",
        width:120
    },{
        dataField : "brthdy",
        headerText : "생년월일",
        width:120,
        labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField, cItem) {
            if(isNull(value)) {
                return "";
            }
            return AUIGrid.formatDate(value, "yyyy-mm-dd");;
        }
    },{
        dataField : "psexamYear",
        headerText : "합격년도",
        width:80
    },{
        dataField : "lifeFlag",
        headerText : "등록구분",
        width:120,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(lifeDues.GN0013)) {
                selItem = lifeDues.GN0013.find(function(arr) {
                    return arr.cd == value;
                });
            }

            if(isNull(selItem) ) {
                return "";
            }
            return selItem.cd_nm+"종신";
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "cd", // key 에 해당되는 필드명
            valueField : "cd_nm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return lifeDues.GN0013;
            }
        }
    },{
        dataField : "payDe",
        headerText : "입금일",
        width:120,
        labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField, cItem) {
            if(isNull(value)) {
                return "";
            }
            return AUIGrid.formatDate(value, "yyyy-mm-dd");;
        }
    },{
        dataField : "payAmt",
        headerText : "총계",
        width : 150,
        style:"grid_right_style",
        dataType:"numeric",
        formatString : "#,##0"
    },{
        dataField : "payStatus",
        headerText : "납부상태",
        width : 100,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(lifeDues.payStatusCode)) {
                selItem = lifeDues.payStatusCode.find(function(arr) {
                    return arr.cd == value;
                });
            }

            if(isNull(selItem) ) {
                return "";
            }
            return selItem.cd_nm;
        },
        editRenderer : {
            type : "DropDownListRenderer",
            autoCompleteMode : true, // 자동완성 모드 설정
            autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
            showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
            showEditorBtn:false,
            keyField : "cd", // key 에 해당되는 필드명
            valueField : "cd_nm", // value 에 해당되는 필드명
            //descendants : [ "" ],
            //descendantDefaultValues : [""],
            listFunction : function(rowIndex, columnIndex, item, dataField) {
                return lifeDues.payStatusCode;
            }
        }
    },{
        dataField : "",
        headerText : "조회",
        width : 100,
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                var item = fDeepCloneObject(event.item);
                item.calcFlag = "S";
                addNewTab('lifeDuesPay', '/kicpa/dues/lifeDuesPay.do', '납부등록' , item);
            }
        }
    }]
}