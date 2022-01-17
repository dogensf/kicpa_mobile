var mberDscpReg = mberDscpReg || {}; // 문자메세지 전송 현황 namespace


mberDscpReg.mberDscp_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        mberDscpReg.fn_init_resize_AUIGrid();
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

        mberDscpReg.fn_createAUIGrid(); // AUGRID 생성
        mberDscpReg.fn_init_events();   // 이벤트 등록
        mberDscpReg.fn_init();          // 화면 초기화
    }
);


mberDscpReg.fn_init = function() {
    $("#mberDscpReg_Orgn").selectpicker({
        noneSelectedText:"전체"
    });
    $("#mberDscpReg_DscpGubun").selectpicker({
        noneSelectedText:"전체"
    });
    $("#mberAccnutRelYn").selectpicker({
        noneSelectedText:"선택하세요."
    });
    $("#mberAphusYn").selectpicker({
        noneSelectedText:"관련없음"
    });

    $('#mberDscpReg_Term').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#mberDscpReg_FinalDate').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#mberDscpReg_RegDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#mberDscpReg_StartDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#mberDscpReg_EndDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#mberDscpReg_DeleteDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    // $("#mberDscpReg_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
mberDscpReg.fn_createAUIGrid = function() {
    var columnLayout = [{
        dataField : "dspTreDe",
        headerText : "징계일"
    }, {
        dataField : "managtInstt",
        headerText : "조치기관"
    }, {
        dataField : "cdNm",
        headerText : "징계구분"
    }, {
        dataField : "dspBgnDe",
        headerText : "징계시작일"
    }, {
        dataField : "dspErsrDe",
        headerText : "징계말소일"
    }];

    var gridPros = {
        showRowNumColumn : true,
        showRowCheckColumn : true,

        headerHeight : 34,
        rowHeight : 34
    };
    fn_AUIGrid_create([{id:"mberDscp_grid_wrap", obj:[mberDscpReg,"mberDscp_gridID"], layout:columnLayout , prop:gridPros}]);

    // 징계항목 선택 시 징계 내용 제공
    AUIGrid.bind(mberDscpReg.mberDscp_gridID, "cellClick", function( event ) {
        var mberDscpCntn_SearchParam = {};
        mberDscpCntn_SearchParam.dspTrgCl = "MBER";
        mberDscpCntn_SearchParam.dspSn = event.item.dspSn;
        fn_ajax_call("/kicpa/selectMberDscpCntn.do", mberDscpCntn_SearchParam, mberDscpReg.selectMberDscpCntn_success, mberDscpReg.selectMberDscpCntn_error);
    });
}


mberDscpReg.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"mberDscp_grid_wrap",obj:mberDscpReg.mberDscp_gridID}]);
}

mberDscpReg.fn_init_events = function() {
    // 추가
    $('#mberDscpRegInsert').on("click",function(e) {
        if ( $('#mberDscpReg_Orgn').val() == '-' || $('#mberDscpReg_DscpGubun').val() == '-' || $('#mberAccnutRelYn').val() == '-' ) {
            alert("System Alert Case 05 노출 - 필수항목");
            return false;
        } else {
            var mberDscp_InsertParam;
            mberDscp_InsertParam = {};
            mberDscp_InsertParam.dspSn = "0";
            mberDscp_InsertParam.dspTrgCl = "MBER";
            mberDscp_InsertParam.dspTrgId = $('#mberdspTrgId').val();
            mberDscp_InsertParam.dspOrgnz = $('#mberDscpReg_Orgn').val();
            mberDscp_InsertParam.managtInstt = $('#mberDscpReg_Orgn option:checked').text();
            mberDscp_InsertParam.dspCd = $('#mberDscpReg_DscpGubun').val();
            mberDscp_InsertParam.dspReqest = $('#mberDspReqest').val();
            mberDscp_InsertParam.ofldcNo = $('#mberOfldcNo').val();
            mberDscp_InsertParam.psitnmberId = $('#mberPsitnmberId').val();
            mberDscp_InsertParam.basisArtcl = $('#mberBasisArtcl').val();
            mberDscp_InsertParam.dutyDues = $('#mberDutyDues').val();
            mberDscp_InsertParam.payDues = $('#mberPayDues').val();
            mberDscp_InsertParam.npyDues = $('#mberNpyDues').val();
            mberDscp_InsertParam.payTmlmt = $('#mberDscpReg_Term').val();
            mberDscp_InsertParam.lastPayDe = $('#mberDscpReg_FinalDate').val();
            mberDscp_InsertParam.dspTreDe = $('#mberDscpReg_RegDay').val();
            mberDscp_InsertParam.dspBgnDe = $('#mberDscpReg_StartDay').val();
            mberDscp_InsertParam.dspEndDe = $('#mberDscpReg_EndDay').val();
            mberDscp_InsertParam.dspErsrDe = $('#mberDscpReg_DeleteDay').val();
            mberDscp_InsertParam.accnutRelYn = $('#mberAccnutRelYn').val();
            mberDscp_InsertParam.aphusYn = $('#mberAphusYn').val();
            mberDscp_InsertParam.sprvisnCmpny = $('#mberSprvisnCmpny').val();
            mberDscp_InsertParam.comment = $('#mberComment').val();
            mberDscp_InsertParam.partclrMatter = $('#mberPartclrMatter').val();
            mberDscp_InsertParam.remark = $('#mberRemark').val();

            fn_ajax_call("kicpa/mergeMberDscpReg.do", mberDscp_InsertParam, mberDscpReg.insertMberDscp_success, mberDscpReg.insertMberDscp_error)
        }
    });
    //회원징계등록(삭제)
    $('#mberDscpRegDelete').on("click",function(e) {
        // 중요 : 체크된 아이템 얻는 메소드는 2개가 있습니다.
        // 1. getCheckedRowItems : 현재 그리드에서 숨겨진 행 아이템을 얻어오지 않습니다.
        // 2. getCheckedRowItemsAll :  현재 그리드에서 숨겨진 행 아이템들까지 모두 얻어 옵니다.
        // 일반 그리드에서 필터링이 되지 않았다면, getCheckedRowItems 과 getCheckedRowItemsAll 같습니다. (트리 그리드에서는 다름)

        var checkedItems = AUIGrid.getCheckedRowItemsAll(mberDscpReg.mberDscp_gridID); // 접혀진 자식들이 체크된 경우 모두 얻기
        if(checkedItems.length <= 0) {
            alert("System Alert Case 03 노출");
            return;
        }
        alert("System Alert Case 04 노출");
        var item;
        var mberDscpCntn_DeleteParam;
        for(var i=0, len = checkedItems.length; i<len; i++) {
            mberDscpCntn_DeleteParam = {};
            item = checkedItems[i];
            mberDscpCntn_DeleteParam.dspSn = item.dspSn;
            mberDscpCntn_DeleteParam.dspTrgCl = "MBER";
            fn_ajax_call("kicpa/deleteMberDscpReg.do", mberDscpCntn_DeleteParam, mberDscpReg.deleteMberDscp_success, mberDscpReg.deleteMberDscp_error)
        }
    });
    // 수정/저장
    $('#mberDscpRegUpdate').on("click",function(e) {
        if ( $('#mberDscpReg_Orgn').val() == '-' || $('#mberDscpReg_DscpGubun').val() == '-' || $('#mberAccnutRelYn').val() == '-' ) {
            alert("System Alert Case 05 노출 - 필수항목");
            return false;
        } else {
            var mberDscp_InsertParam;
            mberDscp_InsertParam = {};
            mberDscp_InsertParam.dspSn = $('#mberDscpdspSn').val();
            mberDscp_InsertParam.dspTrgCl = "MBER";
            mberDscp_InsertParam.dspTrgId = $('#mberdspTrgId').val();
            mberDscp_InsertParam.dspOrgnz = $('#mberDscpReg_Orgn').val();
            mberDscp_InsertParam.managtInstt = $('#mberDscpReg_Orgn option:checked').text();
            mberDscp_InsertParam.dspCd = $('#mberDscpReg_DscpGubun').val();
            mberDscp_InsertParam.dspReqest = $('#mberDspReqest').val();
            mberDscp_InsertParam.ofldcNo = $('#mberOfldcNo').val();
            mberDscp_InsertParam.psitnmberId = $('#mberPsitnmberId').val();
            mberDscp_InsertParam.basisArtcl = $('#mberBasisArtcl').val();
            mberDscp_InsertParam.dutyDues = $('#mberDutyDues').val();
            mberDscp_InsertParam.payDues = $('#mberPayDues').val();
            mberDscp_InsertParam.npyDues = $('#mberNpyDues').val();
            mberDscp_InsertParam.payTmlmt = $('#mberDscpReg_Term').val();
            mberDscp_InsertParam.lastPayDe = $('#mberDscpReg_FinalDate').val();
            mberDscp_InsertParam.dspTreDe = $('#mberDscpReg_RegDay').val();
            mberDscp_InsertParam.dspBgnDe = $('#mberDscpReg_StartDay').val();
            mberDscp_InsertParam.dspEndDe = $('#mberDscpReg_EndDay').val();
            mberDscp_InsertParam.dspErsrDe = $('#mberDscpReg_DeleteDay').val();
            mberDscp_InsertParam.accnutRelYn = $('#mberAccnutRelYn').val();
            mberDscp_InsertParam.aphusYn = $('#mberAphusYn').val();
            mberDscp_InsertParam.sprvisnCmpny = $('#mberSprvisnCmpny').val();
            mberDscp_InsertParam.comment = $('#mberComment').val();
            mberDscp_InsertParam.partclrMatter = $('#mberPartclrMatter').val();
            mberDscp_InsertParam.remark = $('#mberRemark').val();

            fn_ajax_call("kicpa/mergeMberDscpReg.do", mberDscp_InsertParam, mberDscpReg.insertMberDscp_success, mberDscpReg.insertMberDscp_error)
        }
        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });
    // 목록으로
    $('#mberDscpReg_Close').on("click",function(e) {
        var sTitle = "알림메세지";

        swal.fire({
            title: '',
            text: "등록하신 정보는 삭제 됩니다.\n 취소하시겠습니까?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
            reverseButtons: true
        }).then(function(result){
            if (result.value) {
                closeTab('mberDscpReg');

            } else if (result.dismiss === 'cancel') {
            } else if (result.dismiss === 'cancel') {

            }
        });
        return false;
    });

    //조회 후 탭 닫히는 것에 대한 방어코드
    return false;
}



mberDscpReg.selectMberDscp_success = function(result) {
    AUIGrid.setGridData(mberDscpReg.mberDscp_gridID, result.mberDscp);
}

mberDscpReg.selectMberDscp_error = function(xhr, status, error) {
    alert("징계항목 불러오기 실패");
}

mberDscpReg.selectMberDscpCntn_success = function(result) {

    $('#mberdspTrgId').val(result.mberDscpCntn[0].dspTrgId); //등록번호
    $('#mberDscpCpaId').val(result.mberDscpCntn[0].cpaId); //등록번호
    $('#mberDscpdspSn').val(result.mberDscpCntn[0].dspSn); //등록번호

    $('#mberDscpKoreanNm').val(result.mberDscpCntn[0].koreanNm); //성명
    $('#mberZipCd').val(result.mberDscpCntn[0].zipCd); //우편번호
    $('#mberAdres').val(result.mberDscpCntn[0].adres); //rdAdres
    $('#mberAdresDetail').val(result.mberDscpCntn[0].adresDetail); //상세주소


    $("#mberDscpReg_Orgn").selectpicker('val',result.mberDscpCntn[0].dspOrgnz); //징계 조치기관
    $("#mberDscpReg_Orgn").selectpicker('refresh');
    $("#mberDscpReg_DscpGubun").selectpicker('val',result.mberDscpCntn[0].cd); //징계구분
    $("#mberDscpReg_DscpGubun").selectpicker('refresh');

    $('#mberDspReqest').val(result.mberDscpCntn[0].dspReqest); //징계의뢰처
    $('#mberOfldcNo').val(result.mberDscpCntn[0].ofldcNo); //공문번호
    $('#mberKorAudNm').val(result.mberDscpCntn[0].korAudNm); //회원성명
    $('#mberPsitnmberId').val(result.mberDscpCntn[0].psitnmberId); //회원아이디
    $('#mberBasisArtcl').val(result.mberDscpCntn[0].basisArtcl); //근거조항
    $('#mberDutyDues').val(result.mberDscpCntn[0].dutyDues); //특별회비
    $('#mberPayDues').val(result.mberDscpCntn[0].payDues); //납부금액
    $('#mberNpyDues').val(result.mberDscpCntn[0].npyDues); // 미납금액

    $('#mberDscpReg_Term').val(result.mberDscpCntn[0].payTmlmt); //납부기한
    $('#mberDscpReg_FinalDate').val(result.mberDscpCntn[0].lastPayDe); //최종납부일
    //과태료
    //특별회비 / $('#').val(result.mberDscpCntn[0].dutyDues); //과징금
    $('#mberDscpReg_RegDay').val(result.mberDscpCntn[0].dspTreDe); // 징계처분일
    $('#mberDscpReg_StartDay').val(result.mberDscpCntn[0].dspBgnDe); //징계시작일
    $('#mberDscpReg_EndDay').val(result.mberDscpCntn[0].dspEndDe); //징계종료일
    $('#mberDscpReg_DeleteDay').val(result.mberDscpCntn[0].dspErsrDe); //징계기록말소일
    //
    $("#mberAccnutRelYn").selectpicker('val',result.mberDscpCntn[0].accnutRelYn); //회계감사 관련여부
    $("#mberAccnutRelYn").selectpicker('refresh');
    $("#mberAphusYn").selectpicker('val',result.mberDscpCntn[0].accnutRelYn); //공동주택관련여부
    $("#mberAphusYn").selectpicker('refresh');
    //
    $('#mberOficeNm').val(result.mberDscpCntn[0].cmpyNm); //감리회사명
    $('#mberSprvisnCmpny').val(result.mberDscpCntn[0].sprvisnCmpny); //감리회사코드
    $('#mberComment').val(result.mberDscpCntn[0].comment); //내용
    $('#mberPartclrMatter').val(result.mberDscpCntn[0].partclrMatter); //특이사항
    $('#mberRemark').val(result.mberDscpCntn[0].remark); //비고
}

mberDscpReg.fn_dscpCntReSet = function() {

    $('#mberDscpdspSn').val(""); //순번
    //
    $('#mberDscpKoreanNm').val(""); //성명
    $('#mberDscpCpaId').val(""); //등록번호
    $('#mberZipCd').val(""); //우편번호
    $('#mberAdres').val(""); //rdAdres
    $('#mberAdresDetail').val(""); //상세주소
    //
    $("#mberDscpReg_Orgn").selectpicker('val',""); //징계조치기관
    $("#mberDscpReg_Orgn").selectpicker('refresh');
    $("#mberDscpReg_DscpGubun").selectpicker('val',""); //징계구분
    $("#mberDscpReg_DscpGubun").selectpicker('refresh');
    //
    $('#mberDspReqest').val(""); //징계의뢰처
    $('#mberOfldcNo').val(""); //공문번호
    $('#mberKorAudNm').val(""); //회원성명
    $('#mberPsitnmberId').val(""); //회원아이디
    $('#mberBasisArtcl').val(""); //근거조항
    $('#mberDutyDues').val(""); //특별회비
    $('#mberPayDues').val(""); //납부금액
    $('#mberNpyDues').val(""); // 미납금액
    $('#mberDscpReg_Term').val(""); //납부기한
    $('#mberDscpReg_FinalDate').val(""); //최종납부일
    //과태료
    //특별회비 / $('#').val(result.mberDscpCntn[0].dutyDues); //과징금
    $('#mberDscpReg_RegDay').val(""); // 징계처분일
    $('#mberDscpReg_StartDay').val(""); //징계시작일
    $('#mberDscpReg_EndDay').val(""); //징계종료일
    $('#mberDscpReg_DeleteDay').val(""); //징계기록말소일
    //
    $("#mberAccnutRelYn").selectpicker('val',""); //회계감사 관련여부
    $("#mberAccnutRelYn").selectpicker('refresh');
    $("#mberAphusYn").selectpicker('val',""); //공동주택관련여부
    $("#mberAphusYn").selectpicker('refresh');
    //
    $('#mberOficeNm').val(""); //감리회사명
    $('#mberSprvisnCmpny').val(""); //감리회사코드
    $('#mberComment').val(""); //내용
    $('#mberPartclrMatter').val(""); //특이사항
    $('#mberRemark').val(""); //비고

}

mberDscpReg.selectMberDscpCntn_error = function(xhr, status, error) {
    alert("징계내용 불러오기 실패");
}

mberDscpReg.deleteMberDscp_success = function(result) {
    //징계항목 리스트 조회
    var mberDscp_SearchParam = {};
    mberDscp_SearchParam.dspTrgCl = "MBER";
    mberDscp_SearchParam.cpaId = $('#mberDscpCpaId').val();
    //화면 갱신
    fn_ajax_call("kicpa/selectMberDscp.do", mberDscp_SearchParam, mberDscpReg.selectMberDscp_success, mberDscpReg.selectMberDscp_error);
    //징계내용 초기화
    mberDscpReg.fn_dscpCntReSet();
}

mberDscpReg.deleteMberDscp_error = function(xhr, status, error) {
    alert("삭제 실패");
}

mberDscpReg.insertMberDscp_success = function(result) {
    //징계항목 리스트 조회
    var mberDscp_SearchParam = {};
    mberDscp_SearchParam.dspTrgCl = "MBER";
    mberDscp_SearchParam.cpaId = $('#mberDscpCpaId').val();
    //화면 갱신
    fn_ajax_call("kicpa/selectMberDscp.do", mberDscp_SearchParam, mberDscpReg.selectMberDscp_success, mberDscpReg.selectMberDscp_error);
}

mberDscpReg.insertMberDscp_error = function(xhr, status, error) {
    alert("저장 실패");
}