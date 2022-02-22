var auditDscpReg = auditDscpReg || {}; // 문자메세지 전송 현황 namespace


auditDscpReg.auditDscp_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditDscpReg.fn_init_resize_AUIGrid();
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

        auditDscpReg.fn_createAUIGrid(); // AUGRID 생성
        auditDscpReg.fn_init_events();   // 이벤트 등록
        auditDscpReg.fn_init();          // 화면 초기화
    }
);


auditDscpReg.fn_init = function() {
    $("#auditDscpReg_Orgn").selectpicker({
       noneSelectedText:"전체"
     });
    $("#auditDscpReg_DscpGubun").selectpicker({
        noneSelectedText:"전체"
    });
    $("#auditAccnutRelYn").selectpicker({
        noneSelectedText:"선택하세요."
    });
    $("#auditAphusYn").selectpicker({
        noneSelectedText:"관련없음"
    });

    $('#auditDscpReg_Term').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditDscpReg_FinalDate').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditDscpReg_RegDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditDscpReg_StartDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditDscpReg_EndDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });

    $('#auditDscpReg_DeleteDay').datepicker({format: 'yyyy-mm-dd',
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
   // $("#auditDscpReg_modal_temp").modal();

}


//AUIGrid 를 생성합니다.
auditDscpReg.fn_createAUIGrid = function() {
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
    fn_AUIGrid_create([{id:"auditDscp_grid_wrap", obj:[auditDscpReg,"auditDscp_gridID"], layout:columnLayout , prop:gridPros}]);

    // 징계항목 선택 시 징계 내용 제공
    AUIGrid.bind(auditDscpReg.auditDscp_gridID, "cellClick", function( event ) {
        var auditDscpCntn_SearchParam = {};
        auditDscpCntn_SearchParam.dspTrgCl = "AUDIT";
        auditDscpCntn_SearchParam.dspSn = event.item.dspSn;
        fn_ajax_call("/kicpa/selectAuditDscpCntn.do", auditDscpCntn_SearchParam, auditDscpReg.selectAuditDscpCntn_success, auditDscpReg.selectAuditDscpCntn_error);
    });
}


auditDscpReg.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"auditDscp_grid_wrap",obj:auditDscpReg.auditDscp_gridID}]);
}

auditDscpReg.fn_init_events = function() {
    // 추가
    $('#auditDscpRegInsert').on("click",function(e) {
        if ( $('#auditDscpReg_Orgn').val() == '-' || $('#auditDscpReg_DscpGubun').val() == '-' || $('#auditAccnutRelYn').val() == '-' ) {
            alert("System Alert Case 05 노출 - 필수항목");
            return false;
        } else {
            var auditDscp_InsertParam;
            auditDscp_InsertParam = {};
            auditDscp_InsertParam.dspSn = "0";
            auditDscp_InsertParam.dspTrgCl = "AUDIT";
            auditDscp_InsertParam.dspTrgId = $('#auditdspTrgId').val();
            auditDscp_InsertParam.dspOrgnz = $('#auditDscpReg_Orgn').val();
            auditDscp_InsertParam.managtInstt = $('#auditDscpReg_Orgn option:checked').text();
            auditDscp_InsertParam.dspCd = $('#auditDscpReg_DscpGubun').val();
            auditDscp_InsertParam.dspReqest = $('#auditDspReqest').val();
            auditDscp_InsertParam.ofldcNo = $('#auditOfldcNo').val();
            auditDscp_InsertParam.psitnAuditId = $('#auditPsitnAuditId').val();
            auditDscp_InsertParam.basisArtcl = $('#auditBasisArtcl').val();
            auditDscp_InsertParam.dutyDues = $('#auditDutyDues').val();
            auditDscp_InsertParam.payDues = $('#auditPayDues').val();
            auditDscp_InsertParam.npyDues = $('#auditNpyDues').val();
            auditDscp_InsertParam.payTmlmt = $('#auditDscpReg_Term').val();
            auditDscp_InsertParam.lastPayDe = $('#auditDscpReg_FinalDate').val();
            auditDscp_InsertParam.dspTreDe = $('#auditDscpReg_RegDay').val();
            auditDscp_InsertParam.dspBgnDe = $('#auditDscpReg_StartDay').val();
            auditDscp_InsertParam.dspEndDe = $('#auditDscpReg_EndDay').val();
            auditDscp_InsertParam.dspErsrDe = $('#auditDscpReg_DeleteDay').val();
            auditDscp_InsertParam.accnutRelYn = $('#auditAccnutRelYn').val();
            auditDscp_InsertParam.aphusYn = $('#auditAphusYn').val();
            auditDscp_InsertParam.sprvisnCmpny = $('#auditSprvisnCmpny').val();
            auditDscp_InsertParam.comment = $('#auditComment').val();
            auditDscp_InsertParam.partclrMatter = $('#auditPartclrMatter').val();
            auditDscp_InsertParam.remark = $('#auditRemark').val();

            fn_ajax_call("kicpa/mergeAuditDscpReg.do", auditDscp_InsertParam, auditDscpReg.insertAuditDscp_success, auditDscpReg.insertAuditDscp_error)
        }
    });
    //감사인징계등록(삭제)
    $('#auditDscpRegDelete').on("click",function(e) {
        // 중요 : 체크된 아이템 얻는 메소드는 2개가 있습니다.
        // 1. getCheckedRowItems : 현재 그리드에서 숨겨진 행 아이템을 얻어오지 않습니다.
        // 2. getCheckedRowItemsAll :  현재 그리드에서 숨겨진 행 아이템들까지 모두 얻어 옵니다.
        // 일반 그리드에서 필터링이 되지 않았다면, getCheckedRowItems 과 getCheckedRowItemsAll 같습니다. (트리 그리드에서는 다름)

        var checkedItems = AUIGrid.getCheckedRowItemsAll(auditDscpReg.auditDscp_gridID); // 접혀진 자식들이 체크된 경우 모두 얻기
        if(checkedItems.length <= 0) {
            alert("System Alert Case 03 노출");
            return;
        }
        alert("System Alert Case 04 노출");
        var item;
        var auditDscpCntn_DeleteParam;
        for(var i=0, len = checkedItems.length; i<len; i++) {
            auditDscpCntn_DeleteParam = {};
            item = checkedItems[i];
            auditDscpCntn_DeleteParam.dspSn = item.dspSn;
            auditDscpCntn_DeleteParam.dspTrgCl = "AUDIT";
            fn_ajax_call("kicpa/deleteAuditDscpReg.do", auditDscpCntn_DeleteParam, auditDscpReg.deleteAuditDscp_success, auditDscpReg.deleteAuditDscp_error)
        }
    });
    // 수정/저장
    $('#auditDscpRegUpdate').on("click",function(e) {
        if ( $('#auditDscpReg_Orgn').val() == '-' || $('#auditDscpReg_DscpGubun').val() == '-' || $('#auditAccnutRelYn').val() == '-' ) {
            alert("System Alert Case 05 노출 - 필수항목");
            return false;
        } else {
            var auditDscp_InsertParam;
            auditDscp_InsertParam = {};
            auditDscp_InsertParam.dspSn = $('#auditDscpdspSn').val();
            auditDscp_InsertParam.dspTrgCl = "AUDIT";
            auditDscp_InsertParam.dspTrgId = $('#auditdspTrgId').val();
            auditDscp_InsertParam.dspOrgnz = $('#auditDscpReg_Orgn').val();
            auditDscp_InsertParam.managtInstt = $('#auditDscpReg_Orgn option:checked').text();
            auditDscp_InsertParam.dspCd = $('#auditDscpReg_DscpGubun').val();
            auditDscp_InsertParam.dspReqest = $('#auditDspReqest').val();
            auditDscp_InsertParam.ofldcNo = $('#auditOfldcNo').val();
            auditDscp_InsertParam.psitnAuditId = $('#auditPsitnAuditId').val();
            auditDscp_InsertParam.basisArtcl = $('#auditBasisArtcl').val();
            auditDscp_InsertParam.dutyDues = $('#auditDutyDues').val();
            auditDscp_InsertParam.payDues = $('#auditPayDues').val();
            auditDscp_InsertParam.npyDues = $('#auditNpyDues').val();
            auditDscp_InsertParam.payTmlmt = $('#auditDscpReg_Term').val();
            auditDscp_InsertParam.lastPayDe = $('#auditDscpReg_FinalDate').val();
            auditDscp_InsertParam.dspTreDe = $('#auditDscpReg_RegDay').val();
            auditDscp_InsertParam.dspBgnDe = $('#auditDscpReg_StartDay').val();
            auditDscp_InsertParam.dspEndDe = $('#auditDscpReg_EndDay').val();
            auditDscp_InsertParam.dspErsrDe = $('#auditDscpReg_DeleteDay').val();
            auditDscp_InsertParam.accnutRelYn = $('#auditAccnutRelYn').val();
            auditDscp_InsertParam.aphusYn = $('#auditAphusYn').val();
            auditDscp_InsertParam.sprvisnCmpny = $('#auditSprvisnCmpny').val();
            auditDscp_InsertParam.comment = $('#auditComment').val();
            auditDscp_InsertParam.partclrMatter = $('#auditPartclrMatter').val();
            auditDscp_InsertParam.remark = $('#auditRemark').val();

            fn_ajax_call("kicpa/mergeAuditDscpReg.do", auditDscp_InsertParam, auditDscpReg.insertAuditDscp_success, auditDscpReg.insertAuditDscp_error)
        }
        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });
    // 목록으로
     $('#auditDscpReg_Close').on("click",function(e) {
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
                 closeTab('auditDscpReg');

             } else if (result.dismiss === 'cancel') {
             } else if (result.dismiss === 'cancel') {

             }
         });
         return false;
     });

    //조회 후 탭 닫히는 것에 대한 방어코드
    return false;
}



auditDscpReg.selectAuditDscp_success = function(result) {
    AUIGrid.setGridData(auditDscpReg.auditDscp_gridID, result.auditDscp);
}

auditDscpReg.selectAuditDscp_error = function(xhr, status, error) {
    alert("징계항목 불러오기 실패");
}

auditDscpReg.selectAuditDscpCntn_success = function(result) {

    $('#auditdspTrgId').val(result.auditDscpCntn[0].dspTrgId); //등록번호
    $('#auditDscpCpaId').val(result.auditDscpCntn[0].cpaId); //등록번호
    $('#auditDscpdspSn').val(result.auditDscpCntn[0].dspSn); //등록번호

    $('#auditDscpKoreanNm').val(result.auditDscpCntn[0].koreanNm); //성명
    $('#auditZipCd').val(result.auditDscpCntn[0].zipCd); //우편번호
    $('#auditAdres').val(result.auditDscpCntn[0].adres); //rdAdres
    $('#auditAdresDetail').val(result.auditDscpCntn[0].adresDetail); //상세주소


    $("#auditDscpReg_Orgn").selectpicker('val',result.auditDscpCntn[0].dspOrgnz); //징계 조치기관
    $("#auditDscpReg_Orgn").selectpicker('refresh');
    $("#auditDscpReg_DscpGubun").selectpicker('val',result.auditDscpCntn[0].cd); //징계구분
    $("#auditDscpReg_DscpGubun").selectpicker('refresh');

    $('#auditDspReqest').val(result.auditDscpCntn[0].dspReqest); //징계의뢰처
    $('#auditOfldcNo').val(result.auditDscpCntn[0].ofldcNo); //공문번호
    $('#auditKorAudNm').val(result.auditDscpCntn[0].korAudNm); //감사인성명
    $('#auditPsitnAuditId').val(result.auditDscpCntn[0].psitnAuditId); //감사인아이디
    $('#auditBasisArtcl').val(result.auditDscpCntn[0].basisArtcl); //근거조항
    $('#auditDutyDues').val(result.auditDscpCntn[0].dutyDues); //특별회비
    $('#auditPayDues').val(result.auditDscpCntn[0].payDues); //납부금액
    $('#auditNpyDues').val(result.auditDscpCntn[0].npyDues); // 미납금액

    $('#auditDscpReg_Term').val(result.auditDscpCntn[0].payTmlmt); //납부기한
    $('#auditDscpReg_FinalDate').val(result.auditDscpCntn[0].lastPayDe); //최종납부일
    //과태료
    //특별회비 / $('#').val(result.auditDscpCntn[0].dutyDues); //과징금
    $('#auditDscpReg_RegDay').val(result.auditDscpCntn[0].dspTreDe); // 징계처분일
    $('#auditDscpReg_StartDay').val(result.auditDscpCntn[0].dspBgnDe); //징계시작일
    $('#auditDscpReg_EndDay').val(result.auditDscpCntn[0].dspEndDe); //징계종료일
    $('#auditDscpReg_DeleteDay').val(result.auditDscpCntn[0].dspErsrDe); //징계기록말소일
    //
    $("#auditAccnutRelYn").selectpicker('val',result.auditDscpCntn[0].accnutRelYn); //회계감사 관련여부
    $("#auditAccnutRelYn").selectpicker('refresh');
    $("#auditAphusYn").selectpicker('val',result.auditDscpCntn[0].accnutRelYn); //공동주택관련여부
    $("#auditAphusYn").selectpicker('refresh');
    //
    $('#auditOficeNm').val(result.auditDscpCntn[0].cmpyNm); //감리회사명
    $('#auditSprvisnCmpny').val(result.auditDscpCntn[0].sprvisnCmpny); //감리회사코드
    $('#auditComment').val(result.auditDscpCntn[0].comment); //내용
    $('#auditPartclrMatter').val(result.auditDscpCntn[0].partclrMatter); //특이사항
    $('#auditRemark').val(result.auditDscpCntn[0].remark); //비고
}

auditDscpReg.fn_dscpCntReSet = function() {

    $('#auditDscpdspSn').val(""); //순번
    //
    $('#auditDscpKoreanNm').val(""); //성명
    $('#auditDscpCpaId').val(""); //등록번호
    $('#auditZipCd').val(""); //우편번호
    $('#auditAdres').val(""); //rdAdres
    $('#auditAdresDetail').val(""); //상세주소
    //
    $("#auditDscpReg_Orgn").selectpicker('val',""); //징계조치기관
    $("#auditDscpReg_Orgn").selectpicker('refresh');
    $("#auditDscpReg_DscpGubun").selectpicker('val',""); //징계구분
    $("#auditDscpReg_DscpGubun").selectpicker('refresh');
    //
    $('#auditDspReqest').val(""); //징계의뢰처
    $('#auditOfldcNo').val(""); //공문번호
    $('#auditKorAudNm').val(""); //감사인성명
    $('#auditPsitnAuditId').val(""); //감사인아이디
    $('#auditBasisArtcl').val(""); //근거조항
    $('#auditDutyDues').val(""); //특별회비
    $('#auditPayDues').val(""); //납부금액
    $('#auditNpyDues').val(""); // 미납금액
    $('#auditDscpReg_Term').val(""); //납부기한
    $('#auditDscpReg_FinalDate').val(""); //최종납부일
    //과태료
    //특별회비 / $('#').val(result.auditDscpCntn[0].dutyDues); //과징금
    $('#auditDscpReg_RegDay').val(""); // 징계처분일
    $('#auditDscpReg_StartDay').val(""); //징계시작일
    $('#auditDscpReg_EndDay').val(""); //징계종료일
    $('#auditDscpReg_DeleteDay').val(""); //징계기록말소일
    //
    $("#auditAccnutRelYn").selectpicker('val',""); //회계감사 관련여부
    $("#auditAccnutRelYn").selectpicker('refresh');
    $("#auditAphusYn").selectpicker('val',""); //공동주택관련여부
    $("#auditAphusYn").selectpicker('refresh');
    //
    $('#auditOficeNm').val(""); //감리회사명
    $('#auditSprvisnCmpny').val(""); //감리회사코드
    $('#auditComment').val(""); //내용
    $('#auditPartclrMatter').val(""); //특이사항
    $('#auditRemark').val(""); //비고

}

auditDscpReg.selectAuditDscpCntn_error = function(xhr, status, error) {
    alert("징계내용 불러오기 실패");
}

auditDscpReg.deleteAuditDscp_success = function(result) {
    //징계항목 리스트 조회
    var auditDscp_SearchParam = {};
    auditDscp_SearchParam.dspTrgCl = "AUDIT";
    auditDscp_SearchParam.cpaId = $('#auditDscpCpaId').val();
    //화면 갱신
    fn_ajax_call("kicpa/selectAuditDscp.do", auditDscp_SearchParam, auditDscpReg.selectAuditDscp_success, auditDscpReg.selectAuditDscp_error);
    //징계내용 초기화
    auditDscpReg.fn_dscpCntReSet();
}

auditDscpReg.deleteAuditDscp_error = function(xhr, status, error) {
    alert("삭제 실패");
}

auditDscpReg.insertAuditDscp_success = function(result) {
    //징계항목 리스트 조회
    var auditDscp_SearchParam = {};
    auditDscp_SearchParam.dspTrgCl = "AUDIT";
    auditDscp_SearchParam.cpaId = $('#auditDscpCpaId').val();
    //화면 갱신
    fn_ajax_call("kicpa/selectAuditDscp.do", auditDscp_SearchParam, auditDscpReg.selectAuditDscp_success, auditDscpReg.selectAuditDscp_error);
}

auditDscpReg.insertAuditDscp_error = function(xhr, status, error) {
    alert("저장 실패");
}