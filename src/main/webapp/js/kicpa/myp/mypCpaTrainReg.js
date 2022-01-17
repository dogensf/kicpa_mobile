var mypCpaTrainReg = mypCpaTrainReg || {};

mypCpaTrainReg.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

//첨부파일 추가갯수
var atchFileInfoAddCount =1;

// 문서 시작 시
$(document).ready(
    function() {    	

        mypCpaTrainReg.fn_init_events(); // 이벤트 등록
        mypCpaTrainReg.fn_init(); // 화면 초기화

        $('#appLoadingIndicator2', parent.document).hide();
    }
);


mypCpaTrainReg.fn_init = function() {

    $("#mypCpaTrainReg_apntcCpaHistInfoAppRegistDe").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $("#mypCpaTrainReg_grdtSatausInfoGrdtDe").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $("#mypCpaTrainReg_grdtSatausInfoStartDe").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $("#mypCpaTrainReg_grdtSatausInfoEndDe").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $('#mypCpaTrainRegPop_auditPop').hide();

    //수정모드(검토 및 제출 화면)
    if($('#mypCpaTrainReg_saveMode').val() == "U"){
        mypCpaTrainReg.mypCpaTrainReg_tabMove($('#mypCpaTrainReg_movePage').val());
        $('.mypCpaTrainReg_preBtn').hide();

        if($('#mypCpaTrainReg_movePage').val() == "mypCpaTrainReg_reviewInfo"){
            $('.mypCpaTrainReg_mypBtn').hide();
            $('.mypCpaTrainReg_nextBtn a').text("확인");
        }
        else{
            $('.mypCpaTrainReg_mypBtn').show();
            $('.mypCpaTrainReg_nextBtn a').text("저장");
        }
    }
    //처음 등록 모드
    else{
        mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_agree');
        $('.mypCpaTrainReg_mypBtn').hide();
        $('.mypCpaTrainReg_preBtn').show();
        $('.mypCpaTrainReg_nextBtn').show();
        //$('.mypCpaTrainReg_nextBtn a').text("제출");
    }

    //반려상태에서 재신청한 경우
    if($('#mypCpaTrainReg_regFlag').val() == "F"){
        mypCpaTrainReg.mypCpaTrainReg_regFlagFList();
    }

}


mypCpaTrainReg.fn_init_events = function() {

    //실무수습 서약서 저장(시작하기버튼)
    $("#mypCpaTrainReg_agreeSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaTrainReg_agreeForm').serializeObject();
        formData.pin = $('#mypCpaTrainReg_pin').val();
        formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
        var url = mypCpaTrainReg.getContextPath()+"/kicpa/myp/mypCpaTrainRegAgreeSave.do";

        mypCpaTrainReg.mypCpaTrainReg_trainInfoSave(formData, url, "mypCpaTrainReg_pictInfo");

    });

    //사진 저장(다음버튼)
    $("#mypCpaTrainReg_pictInfoSaveBtn").on("click",function(e) {

        var form = $('#mypCpaTrainReg_pictInfoForm')[0];
        var formData = new FormData(form);
        formData.append("pin", $('#mypCpaTrainReg_pin').val());
        formData.append("apntcSn", $('#mypCpaTrainReg_apntcSn').val());
        formData.append("saveMode", $('#mypCpaTrainReg_saveMode').val());

        $.ajax({
            cache : false,
            url : mypCpaTrainReg.getContextPath()+"/kicpa/myp/mypCpaTrainRegPictInfoSave.do",
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
                    if($('#mypCpaTrainReg_saveMode').val() == "U"){
                        location.replace(mypCpaTrainReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaTrainReg_pin').val());
                    }
                    else{
                        mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_grdtSatausInfo');
                    }
                }
            }, // success
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
        }); // $.ajax */
    });

    //수습공인회계사 등록 재학여부 저장(다음버튼)
    $("#mypCpaTrainReg_grdtSatausInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaTrainReg_grdtSatausInfoForm').serializeObject();
        formData.pin = $('#mypCpaTrainReg_pin').val();
        formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
        var url = mypCpaTrainReg.getContextPath()+"/kicpa/myp/mypCpaTrainRegGrdtSatausInfoSave.do";

        mypCpaTrainReg.mypCpaTrainReg_trainInfoSave(formData, url, "mypCpaTrainReg_apntcCpaHistInfo");
    });

    //이력정보 저장(다음버튼)
    $("#mypCpaTrainReg_apntcCpaHistInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaTrainReg_apntcCpaHistInfoForm').serializeObject();
        formData.pin = $('#mypCpaTrainReg_pin').val();
        formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
        var url = mypCpaTrainReg.getContextPath()+"/kicpa/myp/mypCpaTrainRegApntcCpaHistInfoSave.do";

        mypCpaTrainReg.mypCpaTrainReg_trainInfoSave(formData, url, "mypCpaTrainReg_atchFileInfo");
    });

    //첨부파일 저장(다음버튼)
    $("#mypCpaTrainReg_atchFileInfoSaveBtn").on("click",function(e) {

        var form = $('#mypCpaTrainReg_atchFileInfoForm')[0];
        var formData = new FormData(form);
        formData.append("pin", $('#mypCpaTrainReg_pin').val());
        formData.append("apntcSn", $('#mypCpaTrainReg_apntcSn').val());

        $.ajax({
            cache : false,
            url : mypCpaTrainReg.getContextPath()+"/kicpa/myp/mypCpaTrainRegAtchFileInfoSave.do",
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
                    mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_reviewInfo');
                }
            }, // success
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
        }); // $.ajax */
    });

    //제출버튼 클릭
    $("#mypCpaTrainReg_reviewInfoSaveBtn").on("click",function(e) {

        if(confirm("                      해당 내용으로 제출 하시겠습니까?\n            제출된 내용은 마이페이지에서 수정이 가능합니다.")){

            var formData = {};
            formData.pin = $('#mypCpaTrainReg_pin').val();
            formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();

            $.ajax({
                url : mypCpaTrainReg.getContextPath()+"/kicpa/myp/mypCpaTrainRegSubmit.do",
                type : "POST",
                data : formData,
                success : function(data) {
                    location.replace(mypCpaTrainReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaTrainReg_pin').val());
                }
            });

        }
    });

    //사진선택
    $('#mypCpaTrainReg_file_selection').on("change", function (e){
        mypCpaTrainReg.fn_cpaTrainRegistImgSelection(e);
    });

    //대학 및 대학원 재학여부 변경
    $('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').on("change", function (e){
        if($('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val()=="00000020"){
            $('.mypCpaTrainReg_grdtSatausInfoTrigger').show();
        }
        else{
            $('.mypCpaTrainReg_grdtSatausInfoTrigger').hide();
            $('#mypCpaTrainReg_grdtSatausInfoGrdtDe').val('');
            $('#mypCpaTrainReg_grdtSatausInfoStartDe').val('');
            $('#mypCpaTrainReg_grdtSatausInfoEndDe').val('');
        }
    });

    //실무수습기관 클릭 (레이어 팝업 띄우기)
    $("#mypCpaTrainReg_apntcCpaHistInfoAppInsttNm").on("click",function(e) {

        $("#mypCpaTrainRegPop_auditPopList").empty();

        var result="";

        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaTrainRegPop_auditPopList').append(result);

        $('#mypCpaTrainRegPop_auditPop').show();

    });

    //실무수습기관 팝업 검색 클릭
    $("#mypCpaTrainRegPop_auditPopSearchBtn").on("click",function(e) {
        mypCpaTrainReg.selectAuditPopSearchListSearch();

    });

    //실무수습기관 팝업 선택 클릭
    $("#mypCpaTrainRegPop_auditPopSaveBtn").on("click",function(e) {

        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttNm').val($('#mypCpaTrainRegPop_auditPopSetAudNm').val());
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttCd').val($('#mypCpaTrainRegPop_auditPopSetAudId').val());
        $('#mypCpaTrainRegPop_auditPopSetAudNm').val('');
        $('#mypCpaTrainRegPop_auditPopSetAudId').val('');
        $('#mypCpaTrainRegPop_auditPopSearchText').val('');
        $('#mypCpaTrainRegPop_auditPop').hide();

    });

    //실무수습기관 팝업 취소 클릭
    $("#mypCpaTrainRegPop_auditPopCloseBtn").on("click",function(e) {
        $('#mypCpaTrainRegPop_auditPop').hide();
        $('#mypCpaTrainRegPop_auditPopSetAudNm').val('');
        $('#mypCpaTrainRegPop_auditPopSetAudId').val('');
        $('#mypCpaTrainRegPop_auditPopSearchText').val('');
    });

    //기타실무수습기관 체크 클릭
    $("#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcYn").on("click",function(e) {

        if($("input:checkbox[name=appInsttEtcYn]").is(":checked")){
            $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').val('');
            $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', false);
        }else{
            $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', true);
        }

    });

    //첨부파일추가 버튼클릭
    $("#mypCpaTrainReg_atchFileInfoAtchFileAddBtn").on("click",function(e) {

        var atchFileCnt = $('.mypCpaTrainReg_atchFileInfoAdd').length;

        if(atchFileCnt < 3){

            var result="";
            var atchFileId = "jQuery('#mypcpatrainreg_atchfileinfoatchfileid"+atchFileInfoAddCount+"').click()";
            var atchFileRemoveId = "mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove('#mypCpaTrainReg_atchFileInfoAtchFileRemoveId"+atchFileInfoAddCount+"')";

            result+= "<div style='margin-top: 10px;' class='mypCpaTrainReg_atchFileInfoAdd' id='mypCpaTrainReg_atchFileInfoAtchFileRemoveId"+atchFileInfoAddCount+"'>"
                        +"<div class='file'>"
                            +"<span class='input'>"
                                +"<input type='file' name='atchFileId"+atchFileInfoAddCount+"' id='mypcpatrainreg_atchfileinfoatchfileid"+atchFileInfoAddCount+"' placeholder='2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) ' />"
                            +"</span>"
                            +"<div class='action-buttons'>"
                                +"<button type='button' onclick="+atchFileId+" class='file-button'>첨부</button>"
                                +"<button type='button' onclick="+atchFileRemoveId+" class='action-button delete'>-</button>"
                                +"<button type='button' style='visibility: hidden;' class='action-button add'>+</button>"
                            +"</div>"
                        +"</div>"
                    +"</div>";


            $('#mypCpaTrainReg_atchFileInfoAtchFileAdd').append(result);

            atchFileInfoAddCount++;
        }
        else{
            alert("4개까지 등록할 수 있습니다.");
        }


    });

    //close 버튼 클릭
    $("#mypCpaTrainReg_closeBtn").on("click",function(e) {
        alert("종료하시겠습니까?\n" +
            "작성중이던 정보는 삭제됩니다.\n");

        parent.ClosePage();
    });
}

//탭 이동
mypCpaTrainReg.mypCpaTrainReg_tabMove = function(flag) {

    //입력화면 show/hide
    $('.mypCpaTrain_tabMove').hide();
    $('#'+flag).show();

    //왼쪽화면 active
    $('.mypCpaTrainReg_activeMove').removeClass('active');
    $('#'+flag+'Active').addClass('active');

    if(flag == "mypCpaTrainReg_reviewInfo"){                     //검토 및 제출
        var reviewInfo_param = {};
        reviewInfo_param.pin = $('#mypCpaTrainReg_pin').val();
        reviewInfo_param.apntcSn = $('#mypCpaTrainReg_apntcSn').val();

        $.ajax({
            dataType:"json",
            url: mypCpaTrainReg.getContextPath()+"/kicpa/myp/selectMypCpaTrainRegReviewInfo.do",
            data:reviewInfo_param,
            success: function (data) {
                mypCpaTrainReg.selectMypCpaTrainRegReviewInfo_success(data);
            },
            error: function (status, e) {
                alert("데이터 요청에 실패하였습니다.\r status : " + status);
            }
        });
    }

}


//수습 정보 저장(다음 클릭시 해당 탭 내용 저장)
mypCpaTrainReg.mypCpaTrainReg_trainInfoSave = function(formData, url, flag) {

    //mypCpaTrainReg.mypCpaTrainReg_tabMove(flag);
    $.ajax({
        url : url,
        type : "POST",
        data : formData,
        success : function(data) {

            if(!isNull(data.message)){
                alert(data.message);
            }
            else{
                if(!isNull(data.apntcSn) && isNull($('#mypCpaTrainReg_apntcSn').val())){
                    $('#mypCpaTrainReg_apntcSn').val(data.apntcSn);
                }
                mypCpaTrainReg.mypCpaTrainReg_tabMove(flag);
            }
        }
    });
}

//사진선택
mypCpaTrainReg.fn_cpaTrainRegistImgSelection = function (e){
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);

    filesArr.forEach(function(f){
        if(!f.type.match("image.*")){
            alert("이미지 파일만  가능 합니다.");
            $('#mypCpaTrainReg_pictSelect').attr("src", "");
            $('#mypCpaTrainReg_file_selection').val('');
            return;
        }

        sel_file = f;

        var reader = new FileReader();
        reader.onload = function(e){

            $('#mypCpaTrainReg_pictSelect').attr("src", e.target.result);

        }

        $('#cpaPassRegistgetImg').hide();

        reader.readAsDataURL(f);
    });
}

//실무수습기관 팝업 list 조회
mypCpaTrainReg.selectAuditPopSearchListSearch = function(data) {

    if(isNull($('#mypCpaTrainRegPop_auditPopSearchText').val())){
        var result="";
        $("#mypCpaTrainRegPop_auditPopList").empty();
        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaTrainRegPop_auditPopList').append(result);
        return ;
    }
    else{
        var mypCpaTrainRegPop_auditSearchParam = {};

        mypCpaTrainRegPop_auditSearchParam.searchText = $('#mypCpaTrainRegPop_auditPopSearchText').val();

        fn_ajax_call(mypCpaTrainReg.getContextPath()+"/kicpa/myp/selectAuditPopSearchList.do", mypCpaTrainRegPop_auditSearchParam, mypCpaTrainReg.selectAuditPopSearchList_success, mypCpaTrainReg.mypCpaTrainReg_error);
    }
}

//실무수습기관 팝업 검색 성공
mypCpaTrainReg.selectAuditPopSearchList_success = function(data) {

    var result="";
    $("#mypCpaTrainRegPop_auditPopList").empty();
    if(data.auditPopSearchListSize==0 || data.auditPopSearchListSize == null){
        result+= "<tr>"
                    +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
                +"</tr>";

        $('#mypCpaTrainRegPop_auditPopList').append(result);
    }
    else{
        for(var i=0; i<data.auditPopSearchListSize; i++){

            result+= "<tr onclick='mypCpaTrainReg.selectAuditPopupCellClick(this);'>"
                +"<td style='height: 25px; font-size: 13px;'>"+data.auditPopSearchList[i].korAudNm+"</td>"
                +"<td style='height: 25px; font-size: 13px;'>"+data.auditPopSearchList[i].auditCd+"</td>"
                +"</tr>";
        }
        $('#mypCpaTrainRegPop_auditPopList').append(result);
    }
}

//실무수습기관 팝업 행 클릭
mypCpaTrainReg.selectAuditPopupCellClick = function(obj) {

    var table = document.getElementById("mypCpaTrainRegPop_auditPopList");
    var tr = table.getElementsByTagName("tr");
    for(var i=0; i<tr.length; i++){
        tr[i].style.background = "white";
    }
    obj.style.backgroundColor = "#FCE6E0";

    var tr = $(obj);
    var td = tr.children();

    $('#mypCpaTrainRegPop_auditPopSetAudNm').val( td.eq(0).text());
    $('#mypCpaTrainRegPop_auditPopSetAudId').val(td.eq(1).text());
};

//추가 첨부파일 삭제(-버튼 클릭시 해당 div 삭제)
mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove = function (atchFileId){

    $(atchFileId).remove();
}

//검토 및 제출 list
mypCpaTrainReg.selectMypCpaTrainRegReviewInfo_success = function (result){
    $('.mypTrainReview_atchFileId2').hide();
    $('.mypTrainReview_atchFileId3').hide();
    $('.mypTrainReview_atchFileId4').hide();

    $('#mypCpaTrainRegReviewInfo_pictFileNm').text(result.cpaTrainRegReviewInfoList[0].pictFileNm);
    $('#mypCpaTrainRegReviewInfo_grdtStaus').text(result.cpaTrainRegReviewInfoList[0].grdtSatausNm);
    $('#mypCpaTrainRegReviewInfo_grdtDe').text(result.cpaTrainRegReviewInfoList[0].grdtDe);
    $('#mypCpaTrainRegReviewInfo_vacationDe').text(result.cpaTrainRegReviewInfoList[0].vacationStrDe+" ~ "+result.cpaTrainRegReviewInfoList[0].vacationEndDe);
    $('#mypCpaTrainRegReviewInfo_appRegistDe').text(result.cpaTrainRegReviewInfoList[0].appRegistDe);
    $('#mypCpaTrainRegReviewInfo_guideCpa').text(result.cpaTrainRegReviewInfoList[0].guideCpaNm + "    "+result.cpaTrainRegReviewInfoList[0].guideCpaNo);
    $('#mypCpaTrainRegReviewInfo_appInstt').text(result.cpaTrainRegReviewInfoList[0].appInsttNm+ "    "+result.cpaTrainRegReviewInfoList[0].appInsttCd);
    $('#mypCpaTrainRegReviewInfo_appInsttEtc').text(result.cpaTrainRegReviewInfoList[0].appInsttEtc);
    $('#mypCpaTrainRegReviewInfo_atchFileId1').text(result.cpaTrainRegReviewInfoList[0].atchFileId1Nm);
    $('#mypCpaTrainRegReviewInfo_passCrtiFileId').text(result.cpaTrainRegReviewInfoList[0].passCrtiFileIdNm);
    $('#mypCpaTrainRegReviewInfo_emplCrtiFileId').text(result.cpaTrainRegReviewInfoList[0].emplCrtiFileIdNm);
    $('#mypCpaTrainRegReviewInfo_rsumFileId').text(result.cpaTrainRegReviewInfoList[0].rsumFileIdNm);

    //추가 첨부파일
    if(!isNull(result.cpaTrainRegReviewInfoList[0].atchFileId2Nm)){
        $('.mypTrainReview_atchFileId2').show();
        $('#mypCpaTrainRegReviewInfo_atchFileId2').text(result.cpaTrainRegReviewInfoList[0].atchFileId2Nm);
    }
    if(!isNull(result.cpaTrainRegReviewInfoList[0].atchFileId3Nm)){
        $('.mypTrainReview_atchFileId3').show();
        $('#mypCpaTrainRegReviewInfo_atchFileId3').text(result.cpaTrainRegReviewInfoList[0].atchFileId3Nm);
    }
    if(!isNull(result.cpaTrainRegReviewInfoList[0].atchFileId4Nm)){
        $('.mypTrainReview_atchFileId4').show();
        $('#mypCpaTrainRegReviewInfo_atchFileId4').text(result.cpaTrainRegReviewInfoList[0].atchFileId4Nm);
    }
}

//반려상태에서 재신청한 경우
mypCpaTrainReg.mypCpaTrainReg_regFlagFList = function(result) {
    var regFlagFTrainList_param = {};
    regFlagFTrainList_param.pin = $('#mypCpaTrainReg_pin').val();
    regFlagFTrainList_param.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
    regFlagFTrainList_param.regFlag = $('#mypCpaTrainReg_regFlag').val();

    $.ajax({
        url : mypCpaTrainReg.getContextPath()+"/kicpa/myp/selectMypCpaTrainRegReviewInfo.do",
        type : "POST",
        data : regFlagFTrainList_param,
        success : function(data) {
            mypCpaTrainReg.mypCpaTrainReg_regFlagFList_success(data);
        }
    });
}

//반려상태 재등록시 기존 데이터 입력
mypCpaTrainReg.mypCpaTrainReg_regFlagFList_success = function(data){

    //서약서
    if(data.cpaTrainRegReviewInfoList[0].agreeInfoYn == "Y"){
        $('#mypCpaTrainReg_agreement').prop("checked",true);
    }

    //수습공인회계사 등록 재학여부
    $('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val(data.cpaTrainRegReviewInfoList[0].grdtSataus);            //대학 및 대학원 재학여부
    $('#mypCpaTrainReg_grdtSatausInfoGrdtDe').val(data.cpaTrainRegReviewInfoList[0].grdtDe);                //졸업예정일
    $('#mypCpaTrainReg_grdtSatausInfoStartDe').val(data.cpaTrainRegReviewInfoList[0].vacationStrDe);               //방학기간(시작일)
    $('#mypCpaTrainReg_grdtSatausInfoEndDe').val(data.cpaTrainRegReviewInfoList[0].vacationEndDe);                 //방학기간(종료일)

    if($('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val()=="00000020"){
        $('.mypCpaTrainReg_grdtSatausInfoTrigger').show();
    }
    else{
        $('.mypCpaTrainReg_grdtSatausInfoTrigger').hide();
        $('#mypCpaTrainReg_grdtSatausInfoGrdtDe').val('');
        $('#mypCpaTrainReg_grdtSatausInfoStartDe').val('');
        $('#mypCpaTrainReg_grdtSatausInfoEndDe').val('');
    }

    //이력정보
    $('#mypCpaTrainReg_apntcCpaHistInfoAppRegistDe').val(data.cpaTrainRegReviewInfoList[0].appRegistDe);             //실무수습기관 입사일자
    $('#mypCpaTrainReg_apntcCpaHistInfoGuideCpa').val(data.cpaTrainRegReviewInfoList[0].guideCpaNm);                //지도공인회계사명
    $('#mypCpaTrainReg_apntcCpaHistInfoGuideCpaId').val(data.cpaTrainRegReviewInfoList[0].guideCpaNo);              //지도공인회계사번호
    $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttNm').val(data.cpaTrainRegReviewInfoList[0].appInsttNm);              //실무수습기관명
    $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttCd').val(data.cpaTrainRegReviewInfoList[0].appInsttCd);              //실무수습기관코드

    if(data.cpaTrainRegReviewInfoList[0].appInsttEtcYn == "Y"){
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcYn').prop("checked",true);    //기타 실무수습기관 여부
    }

    if($("input:checkbox[name=appInsttEtcYn]").is(":checked")){
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').val('');
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', false);
    }else{
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', true);
    }

    $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').val(data.cpaTrainRegReviewInfoList[0].appInsttEtc);             //기타 실무수습기관
}

//ajax 실패
mypCpaTrainReg.mypCpaTrainReg_error = function(){
    alert("실패");
}