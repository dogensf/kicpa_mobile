var fundAccountAdd = fundAccountAdd || {}; // 문자메세지 전송 현황 namespace

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        fundAccountAdd.fn_init_resize_AUIGrid();
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

        fundAccountAdd.fn_init_events();   // 이벤트 등록
        fundAccountAdd.fn_init();          // 화면 초기화
    }
);


fundAccountAdd.fn_init = function() {

    $('#fundAccountAdd_BgnDe').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#fundAccountAdd_EndDe').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#fundAccountAdd_ScbtDe').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    // (탭숨기기) 적립금관리/운용수익금배분/계좌재예치현황
    $('#fundAccountAdd_tab2').addClass("disabled");
    $('#fundAccountAdd_tab3').addClass("disabled");
    $('#fundAccountAdd_tab4').addClass("disabled");
    //적급금 관리
    $('#rsrvmneyAccmlDe').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    $("#rsrvmneyDiv").selectpicker({
        noneSelectedText:"전체"
    });
    $('#rsrvmneyClmDe').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
}

fundAccountAdd.fn_init_events = function() {
    // 계좌 추가
    $('#fundAccountInsert').on("click",function(e) {
        if ( $('#fundAccountAdd_FnltInstt').val() == ''
            || $('#fundAccountAdd_AcnutNm').val() == '' || $('#fundAccountAdd_AcnutNo').val() == ''
            || $('#fundAccountAdd_BizrNo').val() == '' || $('#fundAccountAdd_JurirNo').val() == ''
            || $('#fundAccountAdd_BgnDe').val() == '' || $('#fundAccountAdd_EndDe').val() == '' || $('#fundAccountAdd_ScbtDe').val() == '' ) {
            alert("System Alert Case 05 노출 - 필수항목");
            return false;
        } else {
            var fundAccount_InsertParam;
            fundAccount_InsertParam = {};
            fundAccount_InsertParam.fnltInstt = $('#fundAccountAdd_FnltInstt').val();
            fundAccount_InsertParam.acnutNm = $('#fundAccountAdd_AcnutNm').val();
            fundAccount_InsertParam.acnutNo = $('#fundAccountAdd_AcnutNo').val();
            fundAccount_InsertParam.bizrNo = $('#fundAccountAdd_BizrNo').val();
            fundAccount_InsertParam.reprsntNm = $('#fundAccountAdd_ReprsntNm').val();
            fundAccount_InsertParam.jurirNo = $('#fundAccountAdd_JurirNo').val();
            fundAccount_InsertParam.adres = $('#fundAccountAdd_Adres').val();
            fundAccount_InsertParam.adresDetail = $('#fundAccountAdd_AdresDetail').val();
            fundAccount_InsertParam.bgnDe = $('#fundAccountAdd_BgnDe').val();
            fundAccount_InsertParam.endDe = $('#fundAccountAdd_EndDe').val();
            fundAccount_InsertParam.scbtDe = $('#fundAccountAdd_ScbtDe').val();
            fundAccount_InsertParam.inrst = $('#fundAccountAdd_Inrst').val();
            fundAccount_InsertParam.acnutSttus = "정상";

            fn_ajax_call("kicpa/insertFundAccount.do", fundAccount_InsertParam, fundAccountAdd.insertFundAccount_success, fundAccountAdd.insertFundAccount_error)
        }
    });

}

fundAccountAdd.insertFundAccount_success = function(result) {
    $('#fundAccountAdd_AcnutSn').val(result);
    //(탭보기) 적립금관리/운용수익금배분/계좌재예치현황
    $('#fundAccountAdd_tab2').removeClass("disabled");
    $('#fundAccountAdd_tab3').removeClass("disabled");
    $('#fundAccountAdd_tab4').removeClass("disabled");
}
fundAccountAdd.insertFundAccount_error = function(xhr, status, error) {
    alert("계좌 수정/저장 실패");
}

fundAccountAdd.selectfundAccount_success = function (result) {
    //손해배상 공동기금 계좌관리 조회 이동
    $('#fundAccountAdd_AcnutSn').val(result.fundAccountList[0].acnutSn);
    //
    $('#fundAccountAdd_FnltInstt').val(result.fundAccountList[0].fnltInstt);
    $('#fundAccountAdd_AcnutNm').val(result.fundAccountList[0].acnutNm);
    $('#fundAccountAdd_AcnutNo').val(result.fundAccountList[0].acnutNo);
    $('#fundAccountAdd_BizrNo').val(result.fundAccountList[0].bizrNo);
    $('#fundAccountAdd_ReprsntNm').val(result.fundAccountList[0].reprsntNm);
    $('#fundAccountAdd_JurirNo').val(result.fundAccountList[0].jurirNo);
    $('#fundAccountAdd_Adres').val(result.fundAccountList[0].adres);
    $('#fundAccountAdd_AdresDetail').val(result.fundAccountList[0].adresDetail);
    $('#fundAccountAdd_BgnDe').val(result.fundAccountList[0].bgnDe);
    $('#fundAccountAdd_EndDe').val(result.fundAccountList[0].endDe);
    $('#fundAccountAdd_ScbtDe').val(result.fundAccountList[0].scbtDe);
    $('#fundAccountAdd_Inrst').val(result.fundAccountList[0].inrst);
    //
    //(탭보기) 적립금관리/운용수익금배분/계좌재예치현황
    $('#fundAccountAdd_tab2').removeClass("disabled");
    $('#fundAccountAdd_tab3').removeClass("disabled");
    $('#fundAccountAdd_tab4').removeClass("disabled");
}

fundAccountAdd.selectfundAccount_error = function (xhr, status, error) {
    //손해배상 공동기금 계좌관리 조회 이동 실패
    alert("계좌정보 조회 실패");
}
