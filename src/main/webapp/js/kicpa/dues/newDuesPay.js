
var newDuesPay = newDuesPay || {};

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        newDuesPay.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

$(document).ready(function() {
    newDuesPay.prefix = "newDuesPay";
    newDuesPay.newDuesPay_grid_wrap = null;
    newDuesPay.curDate = getCurrentDate();

    // 탭이 열린후 grid resize
    $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
        $(window).resize();
    });

    newDuesPay.fn_createAUIGrid();

    newDuesPay.fn_init_events();

    newDuesPay.fn_init();

    commonDues.fn_get_commonCode(newDuesPay,"GN0015,GN0016" , newDuesPay.fn_set_newDues);

});

newDuesPay.fn_init = function() {

    $(newDuesPay.fn_get_id("registFlag","#")).selectpicker({
        noneSelectedText:"선택하세요."
    });

    $(newDuesPay.fn_get_id("acntCd","#")).selectpicker({
        noneSelectedText:"선택하세요."
    });

    $(newDuesPay.fn_get_id("acnutNo","#")).selectpicker({
        noneSelectedText:"선택하세요."
    });

    $(newDuesPay.fn_get_id("registPreDe","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko",
        orientation:"bottom",
        startDate:newDuesPay.curDate,
        endDate:newDuesPay.curDate.toDate().getAddDate(1,"M")
    });

    $(newDuesPay.fn_get_id("payDe","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko",
        orientation:"bottom",
        startDate:newDuesPay.curDate
    });

    $(newDuesPay.fn_get_id("accnutDe","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko",
        orientation:"bottom",
        startDate:newDuesPay.curDate
    });
}

newDuesPay.fn_createAUIGrid = function() {
    var newDuesPay_columnLayout = newDuesPay.fn_get_newDuesPay_grid();

    var props = {
        headerHeight: 36, //헤더의 높이를 지정합니다.
        footerHeight: 62,
        editable : false,
        rowIdField : "rowId", // row 를 구별짓는 유니크한 값을 갖는 필드 설정 (10만 행 이상의 대용량인 경우 반드시 설정을 권함 )
        showRowNumColumn:false,
        showFooter:true,
        enableSorting:false,
        enableCellMerge : true,
        cellMergePolicy : "default"
    }

    fn_AUIGrid_create([{id:newDuesPay.fn_get_id("grid_wrap"), obj:[newDuesPay,"newDuesPay_grid_wrap"], layout:newDuesPay_columnLayout[0] , prop:props}]);
    if(!isNull(newDuesPay_columnLayout[1])) {
        AUIGrid.setFooter(newDuesPay.newDuesPay_grid_wrap, newDuesPay_columnLayout[1]);
    }
}

newDuesPay.fn_init_events = function() {
    var curDate = newDuesPay.curDate;
    var payInfo = newDuesPay.newDuesPayInfo;

    $(newDuesPay.fn_get_id("registFlag","#")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        // do something...
        var date_flag = $(e.target).val();
        newDuesPay.fn_set_calc_amt();
    });

    $(newDuesPay.fn_get_id("registPreDe","#")).on('changeDate', function (e) {
        var registPreDe =  e.date;
        var accnutYear = payInfo.accnutYear;

        if(getDateInterval(registPreDe.getDateFormat("YYYY")+"0401",registPreDe.getDateFormat("YYYYMMDD"),"dd") >= 0 ) {
            accnutYear = registPreDe.getDateFormat("YYYY");
        }else {
            accnutYear = registPreDe.getDateFormat("YYYYMMDD").toDate().getAddDate(-1,"Y");
        }

        if(payInfo.accnutYear != payInfo.accnutYear) {
            newDuesPay.fn_set_reCalc_amt(accnutYear);
        }else {
            newDuesPay.fn_set_calc_amt();
        }
    });

    //납부
    $(newDuesPay.fn_get_id("pay","#")).on("click",function(e) {

        var registFlag = $(newDuesPay.fn_get_id("registFlag","#")).selectpicker("val"); // 등록구분
        var registPreDe = $(newDuesPay.fn_get_id("registPreDe","#")).datepicker("getDate"); // 등록예정일
        var payDe = $(newDuesPay.fn_get_id("payDe","#")).datepicker("getDate"); // 입금일
        var accnutDe = $(newDuesPay.fn_get_id("accnutDe","#")).datepicker("getDate"); // 회계일
        var acntCd = $(newDuesPay.fn_get_id("acntCd","#")).selectpicker("val"); // 계정코드
        var acnutNo = $(newDuesPay.fn_get_id("acnutNo","#")).selectpicker("val"); // 계좌번호

        if(isNull(registFlag)) {
            alert("등록구분을 입력해 주세요.");
            $(newDuesPay.fn_get_id("registFlag","#")).selectpicker('toggle');
            return false;
        }

        if(isNull(registPreDe)) {
            alert("등룍예정일 입력해 주세요.","","-");
            $(newDuesPay.fn_get_id("registPreDe","#")).focus();
            return false;
        }

        if(isNull(payDe)) {
            alert("입금일을 입력해 주세요.","","-");
            $(newDuesPay.fn_get_id("payDe","#")).focus();
            return false;
        }

        if(isNull(accnutDe)) {
            alert("회계일을 입력해 주세요.","","-");
            $(newDuesPay.fn_get_id("accnutDe","#")).focus();
            return false;
        }

        if(isNull(acntCd)) {
            alert("계정코드를 선택해주세요.","","-");
            $(newDuesPay.fn_get_id("acntCd","#")).selectpicker('toggle');
            return false;
        }

        if(isNull(acnutNo)) {
            alert("계좌번호를 선택해주세요.","","-");
            $(newDuesPay.fn_get_id("acnutNo","#")).selectpicker('toggle');
            return false;
        }

        var param = {};
        var arr = $(newDuesPay.fn_get_id("saveForm","#")).serializeArray();

        if (arr) {
            $.each(arr, function(index,item) {
                if(!isNull(item.value)) {
                    if(param.hasOwnProperty(item.name)) {
                        param[item.name] += "," + item.value;
                    }else {
                        switch(item.name) {
                            case "accnutDe" : param[item.name] = item.value.replace(/-/g,""); break;
                            case "brthdy" : param[item.name] = item.value.replace(/-/g,""); break;
                            case "payDe" : param[item.name] = item.value.replace(/-/g,""); break;
                            case "registPreDe" : param[item.name] = item.value.replace(/-/g,""); break;
                            case "giroYn" : param[item.name] = (item.value == "on" ? "Y":"N"); break;
                            default : param[item.name] = item.value; break;
                        }
                    }
                }
            });
        }

        if(!param.hasOwnProperty("giroYn")) {
            param.giroYn = "N";
        }

        var gridData = AUIGrid.getGridData(newDuesPay.newDuesPay_grid_wrap);

        if (gridData) {
            $.each(gridData, function(index,item) {
                param[item.rowId] = item.duesAmt;
            });
        }

        param.payAmtInfo = gridData;
        param.payStatus = "I";
        param.payIdFlag = "P";
        param.payId = param.pin;

        Swal.fire({
            title: "",
            html:  "등록 하시겠습니까?" ,
            icon: "",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            reverseButtons: false }).then(function(result) {
            if (result.value) {
                KTApp.block(newDuesPay.fn_get_id("main","#"), {
                    overlayColor: 'transparent',
                    state: 'primary',
                    message: 'Please wait...'
                });

                $.ajax({
                    type: 'POST',
                    dataType:"json",
                    url: '/kicpa/dues/saveNewDuesPay.do',
                    cache : false,
                    data: param,
                    success: function(data)
                    {
                        KTApp.unblock(newDuesPay.fn_get_id("main","#"));

                        var result = data.result;

                        if(result.result == "D") {
                            alertMessage("이미 입금 된 신규회비입니다.","","-");
                        }else {
                            newDuesPay.newDuesPayInfo = data.newDuesPayInfo;
                            newDuesPay.fn_set_newDues();
                        }
                    },
                    error : function(status, e) {
                        KTApp.unblock(newDuesPay.fn_get_id("main","#"));
                        alertMessage("신규회비 납부 중 오류발생했습니다.","","-");
                        // 로더 제거
                        console.log("errror",e);
                    }
                });
            }
        });
    });

    //반환
    $(newDuesPay.fn_get_id("return","#")).on("click", function(e) {
        var param = newDuesPay.newDuesPayInfo;

        param.payStatus = "R";

        if(Object.hasOwnProperty("keys")) {
            delete param["keys"];
        }

        Swal.fire({
            title: "",
            html:  "반환 하시겠습니까?" ,
            icon: "",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            reverseButtons: false }).then(function(result) {

            if (result.value) {
                KTApp.block(newDuesPay.fn_get_id("main","#"), {
                    overlayColor: 'transparent',
                    state: 'primary',
                    message: 'Please wait...'
                });

                $.ajax({
                    type: 'POST',
                    dataType:"json",
                    url: '/kicpa/dues/saveNewDuesReturn.do',
                    cache : false,
                    data: param,
                    success: function(data)
                    {
                        KTApp.unblock(newDuesPay.fn_get_id("main","#"));
                        var result = data.result;

                        if(result.result == "D") {
                            alertMessage("이미 반환 된 신규회비입니다.","","-");
                        }else {
                            newDuesPay.newDuesPayInfo = data.newDuesPayInfo;
                            newDuesPay.fn_set_newDues();
                        }
                    },
                    error : function(status, e) {
                        KTApp.unblock(newDuesPay.fn_get_id("main","#"));
                        alertMessage("신규회비 반환 중 오류발생했습니다.","","-");
                        // 로더 제거
                        console.log("errror",e);
                    }
                });
            }
        });
    });

    //목록으로
    $(newDuesPay.fn_get_id("pay_list","#")).on("click", function(e) {
        if(newDuesPay.newDuesPayInfo.calcFlag == "S") {
            closeTab("newDuesPay","newDues");
        }else {
            Swal.fire({
                title: "",
                html:  "등록을 취소 하시겠습니까?" ,
                icon: "",
                showCancelButton: true,
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                reverseButtons: false }).then(function(result) {
                if (result.value) {
                    closeTab("newDuesPay","newDues");
                }
            });
        }
    });
}

newDuesPay.fn_set_newDues = function(data) {
    var gridDataList = [];
    // 그리드 데이터 생성
    $.each(newDuesPay.GN0015,function(index,item) {
        var rowData = {};
        var arr_title = String(item.cd_nm).split("^");

        rowData.acctFlag = arr_title[0];
        rowData.duesFlag = arr_title[1];
        rowData.duesAmt = 0;
        rowData.rowId = item.optn2;
        rowData.accountCd = item.optn1;

        gridDataList.push(rowData);
    });
    AUIGrid.setGridData(newDuesPay.newDuesPay_grid_wrap,gridDataList);

    var payInfo = newDuesPay.newDuesPayInfo;

    if(isNull(payInfo)) {
        return false;
    }

    $(newDuesPay.fn_get_id("koreanNm","#")).val(payInfo.koreanNm);

    if(payInfo.payNo > 0) {
        $(newDuesPay.fn_get_id("payNo","#")).val(payInfo.payNo);
    }

    if(!isNull(payInfo.brthdy)) {
        var brthdy = payInfo.brthdy.toDate().getDateFormat("YYYY-MM-DD");

        $(newDuesPay.fn_get_id("brthdy","#")).val(brthdy);
    }

    $(newDuesPay.fn_get_id("cpaId","#")).val(payInfo.cpaId);
    $(newDuesPay.fn_get_id("sbscrbSn","#")).val(payInfo.sbscrbSn);
    $(newDuesPay.fn_get_id("pin","#")).val(payInfo.pin);


    if( payInfo.calcFlag == "Y") { // 납부
        $(newDuesPay.fn_get_id("registFlag","#")).selectpicker("val","");
        $(newDuesPay.fn_get_id("registPreDe","#")).datepicker("update",newDuesPay.curDate);
        $(newDuesPay.fn_get_id("payDe","#")).datepicker("update",newDuesPay.curDate);
        $(newDuesPay.fn_get_id("accnutDe","#")).datepicker("update",newDuesPay.curDate);
        $(newDuesPay.fn_get_id("giroYn","#")).prop("checked",false);

        // 초기값 셋팅
        $.each(newDuesPay.GN0016,function(index,item) {
            var target_cd = "";
            if(item.cd == "N1") {
                target_cd = "acntCd";
            }else if(item.cd == "N2") {
                target_cd = "acnutNo";
            }

            if(!isNull(target_cd)) {
                if($(newDuesPay.fn_get_id(target_cd,"#")).children("option").is("option[value='" + item.optn1 + "']")) {
                    $(newDuesPay.fn_get_id(target_cd,"#")).selectpicker("val",item.optn1);
                }else {
                    $(newDuesPay.fn_get_id(target_cd,"#")).selectpicker("val","");
                }
            }
        });

    }else {
        $(newDuesPay.fn_get_id("saveForm","#")).find(".dropdown-toggle").prop("disabled",true).end()
            .find("input").prop("disabled",true).end();

        $(newDuesPay.fn_get_id("registFlag","#")).selectpicker("val",payInfo.registFlag);
        $(newDuesPay.fn_get_id("registPreDe","#")).datepicker("setDate",payInfo.registPreDe);
        $(newDuesPay.fn_get_id("payDe","#")).datepicker("setDate",payInfo.payDe);
        $(newDuesPay.fn_get_id("accnutDe","#")).datepicker("setDate",payInfo.accnutDe);
        $(newDuesPay.fn_get_id("acntCd","#")).selectpicker("val",payInfo.acntCd);
        $(newDuesPay.fn_get_id("acnutNo","#")).selectpicker("val",payInfo.acnutNo);
        $(newDuesPay.fn_get_id("giroYn","#")).prop("checked",(payInfo.giroYn == "Y" ? true : false));

        if(payInfo.calcFlag == "R") { // 반환

        }else { // 조회
            $(newDuesPay.fn_get_id("buttons","#")).find(newDuesPay.fn_get_id("pay","#")).prop("disabled",true).end()
                .find(newDuesPay.fn_get_id("return","#")).prop("disabled",true).end();
        }
    }

    // 계산처리
    newDuesPay.fn_set_calc_amt();
}

newDuesPay.fn_init_resize_AUIGrid = function(){
    fn_AUIGrid_resize([{id: newDuesPay.fn_get_id("grid_wrap"),obj:newDuesPay.newDuesPay_grid_wrap}]);
}

newDuesPay.fn_get_id = function(id,tag) {
    return  (isNull(tag)?"":tag) + newDuesPay.prefix + "_" + id;
}

newDuesPay.fn_get_newDuesPay_grid = function() {
    var grid_layout = [];
    var body = [{
        dataField : "acctFlag",
        headerText : "회계구분",
        width:"25%",
        cellMerge:true,
        mergeRef:"accountCd"
    },{
        dataField : "duesFlag",
        headerText : "회비구분",
        width:"25%"
    },{
        dataField : "duesAmt",
        headerText : "회비",
        width:"50%",
        dataType:"numeric",
        formatString : "#,##0",
        postfix:" 원",
        style:"aui-grid-newDuesPay-dues-cell"
    }];

    var footer = [{
        labelText : "총액",
        colSpan:2,
        positionField : "acctFlag",
        style : "aui-grid-newDuesPay-footer-title"
    },{
        labelText : "합계",
        positionField : "duesFlag"
    },{
        dataField : "duesAmt",
        positionField : "duesAmt",
        operation : "SUM",
        formatString : "#,##0",
        postfix:" 원",
        style : "aui-grid-newDuesPay-footer-sum-total"
    }];

    grid_layout.push(body);
    grid_layout.push(footer);

    return grid_layout;
}

newDuesPay.fn_set_calc_amt = function () {
    /*
    일반회계 입회금 : 150만원 , 회관회계 입회금 : 80만원 , 공제회 부조회계 : 90마원
    1.신규
        - 입회금 발생
        - 해당 회계연도의 4월1일 기준  만60세 이상인 경우 휴업연회비 면제 예) 2022.3.31 등록인 경우 2021. 4. 1 현재의 만나이 계산
        - 연회비
            1-1. 개업등록
                상반기 : 04/01 ~ 09/31(상반기) 30만원, 10/01 ~ 03/31(하반기) 15만원
            1-2. 휴업등록
                상반기 : 5만원
    2.재등록
        - 입회금 미발생
        - 기입금 연회비 체크  (일반회계 , 공제회 부조회계)
        - 해당 회계연도의 4월1일 기준  만60세 이상인 경우 휴업연회비 면제 예) 2022.3.31 등록인 경우 2021. 4. 1 현재의 만나이 계산
        - 연회비
            2-1. 개업등록
                상반기 : 04/01 ~ 09/31(상반기) 30만원, 10/01 ~ 03/31(하반기) 15만원
            2-2. 휴업등록
                상반기 : 5만원
    */
    var registFlag =  $(newDuesPay.fn_get_id("registFlag","#")).selectpicker("val");
    var registPreDe = $(newDuesPay.fn_get_id("registPreDe","#")).datepicker('getDate');
    var payInfo = newDuesPay.newDuesPayInfo;
    var gridData = AUIGrid.getGridData(newDuesPay.newDuesPay_grid_wrap);
    var secondHalYn = "N" // 하반기여부

    // 하반기 체크
    if(registPreDe instanceof Date) {
        if(registPreDe.getDateFormat("YYYY")+"0401" <= registPreDe.getDateFormat("YYYYMMDD")
            && registPreDe.getDateFormat("YYYYMMDD") < registPreDe.getDateFormat("YYYY")+"1001") {
            secondHalYn = "N";
        }else {
            secondHalYn = "Y";
        }
    }

    $.each(gridData, function(index,item) {
        var payAmt = 0;

        switch (item.rowId) {
            case "gnrlEntrncAmt":  // 일반회계 입회금
                    payAmt = payInfo[item.rowId];
                    break;
            case "gnrlYyAmt": // 일반회계 연회비
                    if(payInfo.calcFlag == "Y") {
                        if(registFlag == "1") { // 개업
                            payAmt = 300000;
                            
                            if(secondHalYn == "Y") { // 하반기 여부
                                payAmt -= 150000;
                            }
                        }else if(registFlag == "2") { //휴업
                            payAmt = 50000;
                        }

                        var preGnrlYyAmt = isNull2(payInfo.preGnrlYyAmt) ? 0 : payInfo.preGnrlYyAmt; // 기수납금
                        if(preGnrlYyAmt > 0) {
                            payAmt -= preGnrlYyAmt;
                        }

                        if(payInfo.ageDiscountYn == "Y") { // 만60세 이상 할인체크
                            payAmt -= 50000;
                        }

                        if(payAmt < 0) {
                            payAmt = 0;
                        }
                    }else {
                        payAmt = payInfo[item.rowId];
                    }
                    break;
            case "cmitEntrncAmt": // 회관회계 입회금
                    payAmt = payInfo[item.rowId];
                    break;
            case "asstnEntrncAmt": // 공제회 부조회계 입회금
                    payAmt = payInfo[item.rowId];
                    break;
            case "asstnYyAmt": // 공제회 부조회계 연회비
                    if(payInfo.calcFlag == "Y") {
                        payAmt = 150000;

                        var preAsstnYyAmt = isNull2(payInfo.preAsstnYyAmt) ? 0 : payInfo.preAsstnYyAmt; // 기수납금
                        if(preAsstnYyAmt > 0) {
                            payAmt -= preAsstnYyAmt;
                        }
                    }else {
                        payAmt = payInfo[item.rowId];
                    }

                    if(payAmt < 0) {
                        payAmt = 0;
                    }
                    break;
        }

        item.duesAmt = isNull2(payAmt) ? 0 : payAmt;
    });

    AUIGrid.setGridData(newDuesPay.newDuesPay_grid_wrap,gridData);
}

newDuesPay.fn_set_reCalc_amt = function(accnutYear) {
    var payInfo = newDuesPay.newDuesPayInfo;

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/kicpa/dues/newDuesPayInfo.do',
        cache : false,
        data: {pin:payInfo.pin,accnutYear:accnutYear},
        success: function(data)
        {
            newDuesPay.newDuesPayInfo = data.newDuesPayInfo;
            newDuesPay.fn_set_calc_amt();
        },
        error : function(status, e) {
            alertMessage("신규회비 계산 중 오류발생했습니다.","","-");
            // 로더 제거
            console.log("errror",e);
        }
    });
}