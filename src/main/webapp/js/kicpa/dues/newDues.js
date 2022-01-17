var newDues = newDues || {
    prefix:"newDues"
   ,newDues_grid_wrap:null
};

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        newDues.fn_init_resize_AUIGrid();
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
    newDues.payStatusCode = [{cd:"I", cd_nm:"입금"},{cd:"C", cd_nm:"취소"},{cd:"R", cd_nm:"반환"}];
    newDues.curDate = getCurrentDate();

    newDues.fn_createAUIGrid();

    newDues.fn_init_events();

    newDues.fn_init();
});

newDues.fn_init = function() {

    // 탭이 열린후 grid resize
    $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
        $(window).resize();
    });

    $(newDues.fn_get_id("regist","#")).selectpicker(); // 등록구분

    //$(newDues.fn_get_id("account","#")).selectpicker({styleBase:"form-control"}); // 계정코드
    $(newDues.fn_get_id("date_flag","#")).selectpicker(); // 날짜구분

    $(newDues.fn_get_id("fromdd","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko"
    });

    $(newDues.fn_get_id("todd","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko"
    });

    commonDues.fn_get_commonCode(newDues,"GN0013");

}

newDues.fn_createAUIGrid = function() {
    var newDues_columnLayout = newDues.fn_get_newDues_grid();

    var default_props = {
        headerHeight: 24, //헤더의 높이를 지정합니다.
        editable : false,
        rowIdField : "", // row 를 구별짓는 유니크한 값을 갖는 필드 설정 (10만 행 이상의 대용량인 경우 반드시 설정을 권함 )
    }

    var newDues_props = {
        showRowNumColumn:true
    }

    fn_AUIGrid_create([{id:newDues.fn_get_id("grid_wrap"), obj:[newDues,"newDues_grid_wrap"], layout:newDues_columnLayout , prop:default_props , addprop:newDues_props}]);
}

newDues.fn_init_events = function() {
    $(newDues.fn_get_id("date_flag","#")).on('loaded.bs.select', function (e) {
        $(newDues.fn_get_id("date","#")).find("input").prop("disabled",true).end();
    });

    // 날짜구분
    $(newDues.fn_get_id("date_flag","#")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {


        // do something...
        //console.log(e,clickedIndex,isSelected,previousValue );
        var date_flag = $(e.target).val();
        var fromdd = $(newDues.fn_get_id("fromdd","#")).datepicker("getDate"); // 시작일
        var todd = $(newDues.fn_get_id("todd","#")).datepicker("getDate"); // 종료일

        // console.log("?????", fromdd , todd ,!(fromdd instanceof Date) , !(todd instanceof Date) ,newDues.curDate )

        if(isNull(date_flag)) {
            $(newDues.fn_get_id("date","#")).find("input").prop("disabled",true).end();
        }else {
            $(newDues.fn_get_id("date","#")).find("input").prop("disabled",false).end();
            if(!(fromdd instanceof Date)) {
                $(newDues.fn_get_id("fromdd","#")).datepicker("update",newDues.curDate);
            }

            if(!(todd instanceof Date)) {
                $(newDues.fn_get_id("todd","#")).datepicker("update",newDues.curDate);
            }
        }
    });

    // 날짜변경
    $(newDues.fn_get_id("fromdd","#")).on('changeDate blur', function (e) {
        var fromdd =  e.date || $(newDues.fn_get_id("fromdd","#")).datepicker("getDate");
        var todd = $(newDues.fn_get_id("todd","#")).datepicker("getDate"); // 종료일

        if(fromdd > todd) {
            $(newDues.fn_get_id("todd","#")).datepicker("update",fromdd);
        }
    });

    $(newDues.fn_get_id("todd","#")).on('changeDate blur', function (e) {
        var todd =  e.date || $(newDues.fn_get_id("todd","#")).datepicker("getDate");
        var fromdd = $(newDues.fn_get_id("fromdd","#")).datepicker("getDate"); // 시작일

        if(fromdd > todd) {
            $(newDues.fn_get_id("fromdd","#")).datepicker("update",todd);
        }
    });


    // 성명
    $(newDues.fn_get_id("koreanNm","#")).on("keypress",function(e) {
        if(e.keyCode == 13) {
            newDues.fn_seach_newDues();
        }
    });

    // 검색
    $(newDues.fn_get_id("search","#")).on("click",function(e) {
        newDues.fn_seach_newDues();
    });

    // 테이블리스트 초기화
    $(newDues.fn_get_id("init","#")).on("click",function(e) {
        AUIGrid.clearGridData(newDues.newDues_grid_wrap);
        //AUIGrid.changeColumnLayout(newDues.newDues_grid_wrap, newDues.fn_get_newDues_grid());
    });

    // 납부구분
    $(newDues.fn_get_id("pay","#")).on("click",function(e) {
        mainCommonList.fn_popupTrain_search("",{title:""} , newDues.fn_set_newDues_pay);
    });

    AUIGrid.bind(newDues.newDues_grid_wrap, "cellEditBegin", function( event ) {
        if(event.isClipboard) {
            return false;
        }
    });
}

newDues.fn_set_newDues_pay = function(item) {
    //console.log("item~~" , item);
    if(isNull(item)) {
        return false;
    }

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/dues/newDuesPayInfo.do',
        cache : false,
        data: {pin:item.pin},
        success: function(data)
        {
            if(isNull(data.newDuesPayInfo)) {
                alertMessage("납입대상자가 아닙니다.","","-");
                return false;
            }else {

                //console.log("param",param);
                addNewTab('newDuesPay', '/kicpa/dues/newDuesPay.do', '납부등록' , data.newDuesPayInfo);
            }
        },
        error : function(status, e) {
            alertMessage("납입 대상자 확인 중 오류발생","","-");
            // 로더 제거
            console.log("errror",e);
        }
    });
}

newDues.fn_init_resize_AUIGrid = function(){

    fn_AUIGrid_resize([{id: newDues.fn_get_id("grid_wrap"),obj:newDues.newDues_grid_wrap}]);
}

newDues.fn_get_id = function(id,tag) {
    return  (isNull(tag)?"":tag) + newDues.prefix + "_" + id;
}

newDues.fn_seach_newDues = function() {
    var param = {};
    var arr = $(newDues.fn_get_id("searchForm","#")).serializeArray();

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

    KTApp.block(newDues.fn_get_id("main","#"), {
        overlayColor: 'transparent',
        state: 'primary',
        message: 'Please wait...'
    });

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/dues/newDuesList.do',
        cache : false,
        data: param,
        success: function(data)
        {
            KTApp.unblock(newDues.fn_get_id("main","#"));
            AUIGrid.setGridData(newDues.newDues_grid_wrap,data.newDuesList);
        },
        error : function(status, e) {
            KTApp.unblock(newDues.fn_get_id("main","#"));
            alertMessage("신규회비 조회 중 오류발생했습니다.","","-");
            // 로더 제거
            console.log("errror",e);
        }
    });
}

newDues.fn_get_newDues_grid = function() {
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
        dataField : "registFlag",
        headerText : "등록구분",
        width:120,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(newDues.GN0013)) {
                selItem = newDues.GN0013.find(function(arr) {
                    return arr.cd == value;
                });
            }

            if(isNull(selItem) ) {
                return "";
            }
            return selItem.cd_nm+"등록";
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
                return newDues.GN0013;
            }
        }
    },{
        dataField : "registPreDe",
        headerText : "등록예정일",
        width:120,
        labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField, cItem) {
            if(isNull(value)) {
                return "";
            }
            return AUIGrid.formatDate(value, "yyyy-mm-dd");;
        }
    },{
        headerText : "일반회계",
        children : [
            {
                dataField : "gnrlEntrncAmt",
                headerText : "입회금",
                width : 120,
                dataType:"numeric",
                formatString : "#,##0",
                style:"grid_right_style "
            },{
                dataField : "gnrlYyAmt",
                headerText : "연회비",
                width : 120,
                dataType:"numeric",
                formatString : "#,##0",
                style:"grid_right_style"
            }]
    },{
        dataField : "cmitEntrncAmt",
        headerText : "회관회계\r\n입회금",
        width : 120,
        dataType:"numeric",
        formatString : "#,##0",
        style:"grid_right_style"
    },{
        headerText : "공제회 부조회계",
        children : [
            {
                dataField : "asstnEntrncAmt",
                headerText : "입회금",
                width : 120,
                dataType:"numeric",
                formatString : "#,##0",
                style:"grid_right_style"
            },{
                dataField : "asstnYyAmt",
                headerText : "연회비",
                width : 120,
                dataType:"numeric",
                formatString : "#,##0",
                style:"grid_right_style"
            }]
    },{
        dataField : "newDuesTotAmt",
        headerText : "총계",
        width : 150,
        style:"grid_right_style",
        labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField, cItem) {
            var totAmt = 0;
            totAmt += (isNaN(item.gnrlEntrncAmt) ? 0 : Number(item.gnrlEntrncAmt));
            totAmt += (isNaN(item.gnrlYyAmt) ? 0 : Number(item.gnrlYyAmt));
            totAmt += (isNaN(item.cmitEntrncAmt) ? 0 : Number(item.cmitEntrncAmt));
            totAmt += (isNaN(item.asstnEntrncAmt) ? 0 : Number(item.asstnEntrncAmt));
            totAmt += (isNaN(item.asstnYyAmt) ? 0 : Number(item.asstnYyAmt));
            return AUIGrid.formatNumber(totAmt, "#,##0");;
        }
    },{
        dataField : "payStatus",
        headerText : "납부상태",
        width : 100,
        labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
            var selItem = undefined;
            if(Array.prototype.isPrototypeOf(newDues.payStatusCode)) {
                selItem = newDues.payStatusCode.find(function(arr) {
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
                return newDues.payStatusCode;
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
                addNewTab('newDuesPay', '/kicpa/dues/newDuesPay.do', '납부등록' , item);
            }
        }
    },{
        dataField : "undefined",
        headerText : "반환",
        width : 100,
        renderer : {
            type : "ButtonRenderer",
            labelText : "반환",
            onClick : function(event) {
                var item = fDeepCloneObject(event.item);
                item.calcFlag = "R";
                addNewTab('newDuesPay', '/kicpa/dues/newDuesPay.do', '납부등록' , item);
            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.payStatus == "I") {
                    return true;
                }
                return false;
            }
        }
    }]
}