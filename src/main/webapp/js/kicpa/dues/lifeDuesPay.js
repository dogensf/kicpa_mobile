
var lifeDuesPay = lifeDuesPay || {};

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        lifeDuesPay.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

$(document).ready(function() {
    lifeDuesPay.prefix = "lifeDuesPay";
    lifeDuesPay.lifeDuesPay_grid_wrap = null;
    lifeDuesPay.curDate = getCurrentDate();

    // 탭이 열린후 grid resize
    $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
        $(window).resize();
    });

    lifeDuesPay.fn_createAUIGrid();

    lifeDuesPay.fn_init_events();

    lifeDuesPay.fn_init();

    commonDues.fn_get_commonCode(lifeDuesPay,"GN0016" , lifeDuesPay.fn_set_lifeDues);

});

lifeDuesPay.fn_init = function() {

    $(lifeDuesPay.fn_get_id("lifeFlag","#")).selectpicker({
        noneSelectedText:"선택하세요."
    });

    $(lifeDuesPay.fn_get_id("acntCd","#")).selectpicker({
        noneSelectedText:"선택하세요."
    });

    $(lifeDuesPay.fn_get_id("acnutNo","#")).selectpicker({
        noneSelectedText:"선택하세요."
    });

    $(lifeDuesPay.fn_get_id("payDe","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko",
        orientation:"bottom",
        startDate:lifeDuesPay.curDate
    });

    $(lifeDuesPay.fn_get_id("accnutDe","#")).datepicker({
        format: "yyyy-mm-dd",
        language:"ko",
        orientation:"bottom",
        startDate:lifeDuesPay.curDate
    });
}

lifeDuesPay.fn_createAUIGrid = function() {
    var lifeDuesPay_columnLayout = lifeDuesPay.fn_get_lifeDuesPay_grid();

    var props = {
        headerHeight: 36, //헤더의 높이를 지정합니다.
        footerHeight: 62,
        editable : false,
        showRowNumColumn:false,
        showFooter:true,
        enableSorting:false
    }

    fn_AUIGrid_create([{id:lifeDuesPay.fn_get_id("grid_wrap"), obj:[lifeDuesPay,"lifeDuesPay_grid_wrap"], layout:lifeDuesPay_columnLayout[0] , prop:props}]);
    if(!isNull(lifeDuesPay_columnLayout[1])) {
        AUIGrid.setFooter(lifeDuesPay.lifeDuesPay_grid_wrap, lifeDuesPay_columnLayout[1]);
    }
}

lifeDuesPay.fn_init_events = function() {
    var curDate = lifeDuesPay.curDate;
    var payInfo = lifeDuesPay.lifeDuesPayInfo;

    $(lifeDuesPay.fn_get_id("lifeFlag","#")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        // do something...
        var date_flag = $(e.target).val();
        lifeDuesPay.fn_set_calc_amt();
    });

    //납부
    $(lifeDuesPay.fn_get_id("pay","#")).on("click",function(e) {

        var lifeFlag = $(lifeDuesPay.fn_get_id("lifeFlag","#")).selectpicker("val"); // 등록구분
        var payDe = $(lifeDuesPay.fn_get_id("payDe","#")).datepicker("getDate"); // 입금일
        var accnutDe = $(lifeDuesPay.fn_get_id("accnutDe","#")).datepicker("getDate"); // 회계일
        var acntCd = $(lifeDuesPay.fn_get_id("acntCd","#")).selectpicker("val"); // 계정코드
        var acnutNo = $(lifeDuesPay.fn_get_id("acnutNo","#")).selectpicker("val"); // 계좌번호

        if(isNull(lifeFlag)) {
            alert("등록구분을 입력해 주세요.");
            $(lifeDuesPay.fn_get_id("lifeFlag","#")).selectpicker('toggle');
            return false;
        }

        if(isNull(payDe)) {
            alert("입금일을 입력해 주세요.","","-");
            $(lifeDuesPay.fn_get_id("payDe","#")).focus();
            return false;
        }

        if(isNull(accnutDe)) {
            alert("회계일을 입력해 주세요.","","-");
            $(lifeDuesPay.fn_get_id("accnutDe","#")).focus();
            return false;
        }

        if(isNull(acntCd)) {
            alert("계정코드를 선택해주세요.","","-");
            $(lifeDuesPay.fn_get_id("acntCd","#")).selectpicker('toggle');
            return false;
        }

        if(isNull(acnutNo)) {
            alert("계좌번호를 선택해주세요.","","-");
            $(lifeDuesPay.fn_get_id("acnutNo","#")).selectpicker('toggle');
            return false;
        }

        var param = {};
        var arr = $(lifeDuesPay.fn_get_id("saveForm","#")).serializeArray();

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
                            case "giroYn" : param[item.name] = (item.value == "on" ? "Y":"N"); break;
                            default : param[item.name] = item.value; break;
                        }
                    }
                }
            });
        }

        var gridData = AUIGrid.getGridData(lifeDuesPay.lifeDuesPay_grid_wrap);

        if (gridData) {
            $.each(gridData, function(index,item) {
                param.payAmt = item.duesAmt;
            });
        }

        if(!param.hasOwnProperty("giroYn")) {
            param.giroYn = "N";
        }

        param.payAmtInfo = gridData;
        param.payStatus = "I";
        param.accnutYear = String(param.accnutDe).substr(0,4);

        Swal.fire({
            title: "",
            html:  "등록 하시겠습니까?" ,
            icon: "",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            reverseButtons: false }).then(function(result) {
            if (result.value) {
                KTApp.block(lifeDuesPay.fn_get_id("main","#"), {
                    overlayColor: 'transparent',
                    state: 'primary',
                    message: 'Please wait...'
                });

                $.ajax({
                    type: 'POST',
                    dataType:"json",
                    url: '/kicpa/dues/saveLifeDuesPay.do',
                    cache : false,
                    data: param,
                    success: function(data)
                    {
                        KTApp.unblock(lifeDuesPay.fn_get_id("main","#"));

                        var result = data.result;

                        if(result.result == "D") {
                            alertMessage("이미 입금 된 종신회비입니다.","","-");
                        }else {
                            lifeDuesPay.lifeDuesPayInfo = data.lifeDuesPayInfo;
                            lifeDuesPay.fn_set_lifeDues();
                        }
                    },
                    error : function(status, e) {
                        KTApp.unblock(lifeDuesPay.fn_get_id("main","#"));
                        alertMessage("종신회비 납부 중 오류발생했습니다.","","-");
                        // 로더 제거
                        console.log("errror",e);
                    }
                });
            }
        });
    });

    //반환
    $(lifeDuesPay.fn_get_id("return","#")).on("click", function(e) {
        var param = lifeDuesPay.lifeDuesPayInfo;

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
                KTApp.block(lifeDuesPay.fn_get_id("main","#"), {
                    overlayColor: 'transparent',
                    state: 'primary',
                    message: 'Please wait...'
                });

                $.ajax({
                    type: 'POST',
                    dataType:"json",
                    url: '/kicpa/dues/saveLifeDuesReturn.do',
                    cache : false,
                    data: param,
                    success: function(data)
                    {
                        KTApp.unblock(lifeDuesPay.fn_get_id("main","#"));
                        var result = data.result;

                        if(result.result == "D") {
                            alertMessage("이미 반환 된 신규회비입니다.","","-");
                        }else {
                            lifeDuesPay.lifeDuesPayInfo = data.lifeDuesPayInfo;
                            lifeDuesPay.fn_set_lifeDues();
                        }
                    },
                    error : function(status, e) {
                        KTApp.unblock(lifeDuesPay.fn_get_id("main","#"));
                        alertMessage("신규회비 반환 중 오류발생했습니다.","","-");
                        // 로더 제거
                        console.log("errror",e);
                    }
                });
            }
        });
    });

    //목록으로
    $(lifeDuesPay.fn_get_id("pay_list","#")).on("click", function(e) {
        if(lifeDuesPay.lifeDuesPayInfo.calcFlag == "S") {
            closeTab("lifeDuesPay","lifeDues");
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
                    closeTab("lifeDuesPay","lifeDues");
                }
            });
        }
    });
}

lifeDuesPay.fn_set_lifeDues = function(data) {
    var gridDataList = [];
    var rowData = {acctFlag:"종신회비",duesAmt:0};
    // 그리드 데이터 생성
    gridDataList.push(rowData);

    AUIGrid.setGridData(lifeDuesPay.lifeDuesPay_grid_wrap,gridDataList);

    var payInfo = lifeDuesPay.lifeDuesPayInfo;

    if(isNull(payInfo)) {
        return false;
    }

    $(lifeDuesPay.fn_get_id("koreanNm","#")).val(payInfo.koreanNm);

    if(payInfo.payNo > 0) {
        $(lifeDuesPay.fn_get_id("payNo","#")).val(payInfo.payNo);
    }

    if(!isNull(payInfo.brthdy)) {
        var brthdy = payInfo.brthdy.toDate().getDateFormat("YYYY-MM-DD");

        $(lifeDuesPay.fn_get_id("brthdy","#")).val(brthdy);
    }

    $(lifeDuesPay.fn_get_id("cpaId","#")).val(payInfo.cpaId);
    $(lifeDuesPay.fn_get_id("lifeSn","#")).val(payInfo.lifeSn);
    $(lifeDuesPay.fn_get_id("pin","#")).val(payInfo.pin);

    if( payInfo.calcFlag == "Y") { // 납부
        $(lifeDuesPay.fn_get_id("lifeFlag","#")).selectpicker("val",(isNull(payInfo.lifeFlag) ? "": payInfo.lifeFlag));
        $(lifeDuesPay.fn_get_id("payDe","#")).datepicker("update",lifeDuesPay.curDate);
        $(lifeDuesPay.fn_get_id("accnutDe","#")).datepicker("update",lifeDuesPay.curDate);
        $(lifeDuesPay.fn_get_id("giroYn","#")).prop("checked",false);

        // 초기값 셋팅
        $.each(lifeDuesPay.GN0016,function(index,item) {
            var target_cd = "";
            if(item.cd == "L1") {
                target_cd = "acntCd";
            }else if(item.cd == "L2") {
                target_cd = "acnutNo";
            }

            if(!isNull(target_cd)) {
                if($(lifeDuesPay.fn_get_id(target_cd,"#")).children("option").is("option[value='" + item.optn1 + "']")) {
                    $(lifeDuesPay.fn_get_id(target_cd,"#")).selectpicker("val",item.optn1);
                }else {
                    $(lifeDuesPay.fn_get_id(target_cd,"#")).selectpicker("val","");
                }
            }
        });

    }else {
        $(lifeDuesPay.fn_get_id("saveForm","#")).find(".dropdown-toggle").prop("disabled",true).end()
            .find("input").prop("disabled",true).end();

        $(lifeDuesPay.fn_get_id("lifeFlag","#")).selectpicker("val",payInfo.lifeFlag);
        $(lifeDuesPay.fn_get_id("payDe","#")).datepicker("setDate",payInfo.payDe);
        $(lifeDuesPay.fn_get_id("accnutDe","#")).datepicker("setDate",payInfo.accnutDe);
        $(lifeDuesPay.fn_get_id("acntCd","#")).selectpicker("val",payInfo.acntCd);
        $(lifeDuesPay.fn_get_id("acnutNo","#")).selectpicker("val",payInfo.acnutNo);
        $(lifeDuesPay.fn_get_id("giroYn","#")).prop("checked",(payInfo.giroYn == "Y" ? true : false));

        $(lifeDuesPay.fn_get_id("buttons","#")).find(lifeDuesPay.fn_get_id("pay","#")).prop("disabled",true).end()
            .find(lifeDuesPay.fn_get_id("return","#")).prop("disabled",true).end();
    }

    // 계산처리
    lifeDuesPay.fn_set_calc_amt();
}

lifeDuesPay.fn_init_resize_AUIGrid = function(){
    fn_AUIGrid_resize([{id: lifeDuesPay.fn_get_id("grid_wrap"),obj:lifeDuesPay.lifeDuesPay_grid_wrap}]);
}

lifeDuesPay.fn_get_id = function(id,tag) {
    return  (isNull(tag)?"":tag) + lifeDuesPay.prefix + "_" + id;
}

lifeDuesPay.fn_get_lifeDuesPay_grid = function() {
    var grid_layout = [];
    var body = [{
        dataField : "acctFlag",
        headerText : "회계구분",
        width:"35%",
        cellMerge:true,
        mergeRef:"accountCd"
    },{
        dataField : "duesAmt",
        headerText : "회비",
        width:"65%",
        dataType:"numeric",
        formatString : "#,##0",
        postfix:" 원",
        style:"aui-grid-lifeDuesPay-dues-cell"
    }];

    var footer = [{
        labelText : "총액",
        positionField : "acctFlag",
        style : "aui-grid-lifeDuesPay-footer-title"
    },{
        dataField : "duesAmt",
        positionField : "duesAmt",
        operation : "SUM",
        formatString : "#,##0",
        postfix:" 원",
        style : "aui-grid-lifeDuesPay-footer-sum-total"
    }];

    grid_layout.push(body);
    grid_layout.push(footer);

    return grid_layout;
}

lifeDuesPay.fn_set_calc_amt = function () {
    /*
    등록구분
    1)  등록구분이 “개업종신” 인 경우
        종신회비는 3,000,000원 노출
    2) 등록구분이 “휴업종신” 인 경우
        종신회비는 500,000원 노출
    */
    var lifeFlag =  $(lifeDuesPay.fn_get_id("lifeFlag","#")).selectpicker("val");
    var payInfo = lifeDuesPay.lifeDuesPayInfo;
    var gridData = AUIGrid.getGridData(lifeDuesPay.lifeDuesPay_grid_wrap);

    $.each(gridData,function(index,item) {
        var payAmt = 0;
        switch (lifeFlag) {
            case "1" : payAmt = 3000000;
                break;
            case "2" : payAmt = 500000;
                break;
            default : break;
        }
        item.duesAmt = payAmt;
    })

    AUIGrid.setGridData(lifeDuesPay.lifeDuesPay_grid_wrap,gridData);
}