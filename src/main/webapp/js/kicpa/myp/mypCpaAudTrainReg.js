var mypCpaAudTrainReg = mypCpaAudTrainReg || {};

mypCpaAudTrainReg.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

// 문서 시작 시
$(document).ready(
    function() {    	

        mypCpaAudTrainReg.fn_init_events(); // 이벤트 등록
        mypCpaAudTrainReg.fn_init(); // 화면 초기화

        $('#appLoadingIndicator2', parent.document).hide();
    }
);


mypCpaAudTrainReg.fn_init = function() {

    $("#mypCpaAudTrainReg_audRegistDe").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $('#mypCpaAudTrainRegPop_auditPop').hide();

    //수정모드(검토 및 제출 화면)
    if($('#mypCpaAudTrainReg_saveMode').val() == "U"){
        mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove($('#mypCpaAudTrainReg_movePage').val());
        $('.mypCpaAudTrainReg_preBtn').hide();
        $('.mypCpaAudTrainReg_nextBtn').hide();
        $('.mypCpaAudTrainReg_mypBtn').show();
        $('.mypCpaAudTrainReg_mypBtn a').text("확인");
    }
    //처음 등록 모드
    else{
        mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_agree');
        $('.mypCpaAudTrainReg_mypBtn').hide();
        $('.mypCpaAudTrainReg_preBtn').show();
        $('.mypCpaAudTrainReg_nextBtn').show();
        $('.mypCpaAudTrainReg_nextBtn a').text("제출");
    }

    //반려상태에서 재신청한 경우
    if($('#mypCpaAudTrainReg_regFlag').val() == "F"){
        mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList();
    }

}


mypCpaAudTrainReg.fn_init_events = function() {

    //외감실무수습 서약서 저장(시작하기버튼)
    $("#mypCpaAudTrainReg_agreeSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaAudTrainReg_agreeForm').serializeObject();
        formData.pin = $('#mypCpaAudTrainReg_pin').val();
        formData.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();
        var url = mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/mypCpaAudTrainRegAgreeSave.do";

        mypCpaAudTrainReg.mypCpaAudTrainReg_trainInfoSave(formData, url, "mypCpaAudTrainReg_apntcCpaHistInfo");
    });

    //이력정보 (외감) 저장(다음버튼)
    $("#mypCpaAudTrainReg_apntcCpaHistInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaAudTrainReg_apntcCpaHistInfoForm').serializeObject();
        formData.pin = $('#mypCpaAudTrainReg_pin').val();
        formData.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();
        var url = mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/mypCpaAudTrainRegApntcCpaHistInfoSave.do";

        mypCpaAudTrainReg.mypCpaAudTrainReg_trainInfoSave(formData, url, "mypCpaAudTrainReg_atchFileInfo");
    });

    //첨부파일 (첨부서류) 저장(다음버튼)
    $("#mypCpaAudTrainReg_atchFileInfoSaveBtn").on("click",function(e) {

        var form = $('#mypCpaAudTrainReg_atchFileInfoForm')[0];
        var formData = new FormData(form);
        formData.append("pin", $('#mypCpaAudTrainReg_pin').val());
        formData.append("apntcSn", $('#mypCpaAudTrainReg_apntcSn').val());

        $.ajax({
            cache : false,
            url : mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/mypCpaAudTrainRegAtchFileInfoSave.do",
            type : 'POST',
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            success : function(data) {
                if(!isNull(data.message)){
                    alert(data.message);
                }
                else{
                    mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_reviewInfo');
                }
            }, // success
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
        }); // $.ajax */
    });

    //제출버튼 클릭
    $("#mypCpaAudTrainReg_reviewInfoSaveBtn").on("click",function(e) {

        if(confirm("                      해당 내용으로 제출 하시겠습니까?")){

            var formData = {};
            formData.pin = $('#mypCpaAudTrainReg_pin').val();
            formData.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();

            $.ajax({
                url : mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/mypCpaAudTrainRegSubmit.do",
                type : "POST",
                data : formData,
                success : function(data) {
                    location.replace(mypCpaAudTrainReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaAudTrainReg_pin').val());
                }
            });
        }
    });

    //실무수습기관 클릭 (레이어 팝업 띄우기)
    $("#mypCpaAudTrainReg_appInsttNm").on("click",function(e) {

        $("#mypCpaAudTrainRegPop_auditPopList").empty();

        var result="";

        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaAudTrainRegPop_auditPopList').append(result);

        $('#mypCpaAudTrainRegPop_auditPop').show();

    });

    //실무수습기관 팝업 검색 클릭
    $("#mypCpaAudTrainRegPop_auditPopSearchBtn").on("click",function(e) {
        mypCpaAudTrainReg.selectAuditPopSearchListSearch();

    });

    //실무수습기관 팝업 선택 클릭
    $("#mypCpaAudTrainRegPop_auditPopSaveBtn").on("click",function(e) {

        $('#mypCpaAudTrainReg_appInsttNm').val($('#mypCpaAudTrainRegPop_auditPopSetAudNm').val());
        $('#mypCpaAudTrainReg_appInsttCd').val($('#mypCpaAudTrainRegPop_auditPopSetAudId').val());
        $('#mypCpaAudTrainRegPop_auditPopSetAudNm').val('');
        $('#mypCpaAudTrainRegPop_auditPopSetAudId').val('');
        $('#mypCpaAudTrainRegPop_auditPopSearchText').val('');
        $('#mypCpaAudTrainRegPop_auditPop').hide();

    });

    //실무수습기관 팝업 취소 클릭
    $("#mypCpaAudTrainRegPop_auditPopCloseBtn").on("click",function(e) {
        $('#mypCpaAudTrainRegPop_auditPop').hide();
        $('#mypCpaAudTrainRegPop_auditPopSetAudNm').val('');
        $('#mypCpaAudTrainRegPop_auditPopSetAudId').val('');
        $('#mypCpaAudTrainRegPop_auditPopSearchText').val('');
    });

    //close 버튼 클릭
    $("#mypCpaAudTrainReg_closeBtn").on("click",function(e) {
        alert("종료하시겠습니까?\n" +
            "작성중이던 정보는 삭제됩니다.\n");

        parent.ClosePage();
    });

}

//탭 이동
mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove = function(flag) {

    //입력화면 show/hide
    $('.mypCpaAudTrain_tabMove').hide();
    $('#'+flag).show();

    //왼쪽화면 active
    $('.mypCpaAudTrainReg_activeMove').removeClass('active');
    $('#'+flag+'Active').addClass('active');

    if(flag == "mypCpaAudTrainReg_reviewInfo"){                     //검토 및 제출
        var reviewInfo_param = {};
        reviewInfo_param.pin = $('#mypCpaAudTrainReg_pin').val();
        reviewInfo_param.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();

        $.ajax({
            dataType:"json",
            url: mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/selectMypCpaAudTrainRegReviewInfo.do",
            data:reviewInfo_param,
            success: function (data) {
                mypCpaAudTrainReg.selectmypCpaAudTrainRegReviewInfo_success(data);
            },
            error: function (status, e) {
                alert("데이터 요청에 실패하였습니다.\r status : " + status);
            }
        });
    }

}

//외감수습 정보 저장(다음 클릭시 해당 탭 내용 저장)
mypCpaAudTrainReg.mypCpaAudTrainReg_trainInfoSave = function(formData, url, flag) {

    //mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove(flag);
    $.ajax({
        url : url,
        type : "POST",
        data : formData,
        success : function(data) {

            if(!isNull(data.message)){
                alert(data.message);
            }
            else{
                if(!isNull(data.apntcSn) && isNull($('#mypCpaAudTrainReg_apntcSn').val())){
                    $('#mypCpaAudTrainReg_apntcSn').val(data.apntcSn);
                }
                mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove(flag);
            }
        }
    });
}

//검토 및 제출 list
mypCpaAudTrainReg.selectmypCpaAudTrainRegReviewInfo_success = function (result){

    $('#mypCpaAudTrainRegReviewInfo_audRegistDe').text(result.cpaAudTrainRegReviewInfoList[0].audRegistDe);
    $('#mypCpaAudTrainRegReviewInfo_guideCpa').text(result.cpaAudTrainRegReviewInfoList[0].guideCpaNm + "    "+result.cpaAudTrainRegReviewInfoList[0].guideCpaNo);
    $('#mypCpaAudTrainRegReviewInfo_appInstt').text(result.cpaAudTrainRegReviewInfoList[0].appInsttNm+ "    "+result.cpaAudTrainRegReviewInfoList[0].appInsttCd);
    $('#mypCpaAudTrainRegReviewInfo_emplCrtiFileId').text(result.cpaAudTrainRegReviewInfoList[0].emplCrtiFileId);
    $('#mypCpaAudTrainRegReviewInfo_rsumFileId').text(result.cpaAudTrainRegReviewInfoList[0].rsumFileId);
    $('#mypCpaAudTrainRegReviewInfo_atchFileId').text(result.cpaAudTrainRegReviewInfoList[0].atchFileId);

}

//실무수습기관 팝업 list 조회
mypCpaAudTrainReg.selectAuditPopSearchListSearch = function(data) {

    if(isNull($('#mypCpaAudTrainRegPop_auditPopSearchText').val())){
        var result="";
        $("#mypCpaAudTrainRegPop_auditPopList").empty();
        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaAudTrainRegPop_auditPopList').append(result);
        return ;
    }
    else{
        var mypCpaAudTrainRegPop_auditSearchParam = {};

        mypCpaAudTrainRegPop_auditSearchParam.searchText = $('#mypCpaAudTrainRegPop_auditPopSearchText').val();

        fn_ajax_call(mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/selectAuditPopSearchList.do", mypCpaAudTrainRegPop_auditSearchParam, mypCpaAudTrainReg.selectAuditPopSearchList_success, mypCpaAudTrainReg.mypCpaAudTrainReg_error);
    }
}

//실무수습기관 팝업 검색 성공
mypCpaAudTrainReg.selectAuditPopSearchList_success = function(data) {

    var result="";
    $("#mypCpaAudTrainRegPop_auditPopList").empty();
    if(data.auditPopSearchListSize==0 || data.auditPopSearchListSize == null){
        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaAudTrainRegPop_auditPopList').append(result);
    }
    else{
        for(var i=0; i<data.auditPopSearchListSize; i++){

            result+= "<tr onclick='mypCpaAudTrainReg.selectAuditPopupCellClick(this);'>"
                +"<td style='height: 25px; font-size: 13px;'>"+data.auditPopSearchList[i].korAudNm+"</td>"
                +"<td style='height: 25px; font-size: 13px;'>"+data.auditPopSearchList[i].auditCd+"</td>"
                +"</tr>";
        }
        $('#mypCpaAudTrainRegPop_auditPopList').append(result);
    }
}

//실무수습기관 팝업 행 클릭
mypCpaAudTrainReg.selectAuditPopupCellClick = function(obj) {

    var table = document.getElementById("mypCpaAudTrainRegPop_auditPopList");
    var tr = table.getElementsByTagName("tr");
    for(var i=0; i<tr.length; i++){
        tr[i].style.background = "white";
    }
    obj.style.backgroundColor = "#FCE6E0";

    var tr = $(obj);
    var td = tr.children();

    $('#mypCpaAudTrainRegPop_auditPopSetAudNm').val( td.eq(0).text());
    $('#mypCpaAudTrainRegPop_auditPopSetAudId').val(td.eq(1).text());
};


//반려상태에서 재신청한 경우
mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList = function(result) {
    var regFlagFAudTrainList_param = {};
    regFlagFAudTrainList_param.pin = $('#mypCpaAudTrainReg_pin').val();
    regFlagFAudTrainList_param.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();
    regFlagFAudTrainList_param.regFlag = $('#mypCpaAudTrainReg_regFlag').val();

    $.ajax({
        url : mypCpaAudTrainReg.getContextPath()+"/kicpa/myp/selectMypCpaAudTrainRegReviewInfo.do",
        type : "POST",
        data : regFlagFAudTrainList_param,
        success : function(data) {
            mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList_success(data);
        }
    });
}

//반려상태 재등록시 기존 데이터 입력
mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList_success = function(data){

    //서약서
    if(data.cpaAudTrainRegReviewInfoList[0].agreeInfoYn == "Y"){
        $('#mypCpaAudTrainReg_agreement').prop("checked",true);
    }

    //이력정보(외감)
    $('#mypCpaAudTrainReg_audRegistDe').val(data.cpaAudTrainRegReviewInfoList[0].audRegistDe);              //외감 실무수습 시작일
    $('#mypCpaAudTrainReg_guideCpa').val(data.cpaAudTrainRegReviewInfoList[0].guideCpaNm);                  //지도공인회계사명
    $('#mypCpaAudTrainReg_guideCpaId').val(data.cpaAudTrainRegReviewInfoList[0].guideCpaNo);                //지도공인회계사번호
    $('#mypCpaAudTrainReg_appInsttNm').val(data.cpaAudTrainRegReviewInfoList[0].appInsttNm);                //실무수습기관명
    $('#mypCpaAudTrainReg_appInsttCd').val(data.cpaAudTrainRegReviewInfoList[0].appInsttCd);                //실무수습기관코드

}
mypCpaAudTrainReg.mypCpaAudTrainReg_error = function (){

    alert("실패");

}