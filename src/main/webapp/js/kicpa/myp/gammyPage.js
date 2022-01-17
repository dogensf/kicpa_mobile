var gammyPage = gammyPage || {};

// 문서 시작 시
$(document).ready(
    function() {
        gammyPage.fn_init(); // 화면 초기화
        gammyPage.fn_init_events(); // 이벤트 등록

    });



gammyPage.fn_init = function() {
    $('#gammyPage_officeInfo').hide();

    $("#gammyPage_StartDagte").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $("#gammyPage_EndDagte").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $("#gammyPage_memberRegist_StartDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $("#gammyPage_memberRegist_EndDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    gammyPage.gammyPage_apntc_search('','','','','');
    gammyPage.gammyPage_cpa_search("","","","");
}


gammyPage.fn_init_events = function() {
    //감사인 마이페이지 버튼 이벤트
    $("#toggle_rowInfo").on("click",function(e) {

        if($("#toggle_rowInfo").hasClass('active')){
            $("#toggle_rowInfo").removeClass('active');
            $('#gammyPage_officeInfo').slideUp(1000);
        }
        else{
            $("#toggle_rowInfo").addClass('active');
            $('#gammyPage_officeInfo').slideDown(1000);
        }
    });

    //대표이사 톱니바퀴 클릭시
   $('#gammyPage_ChangeReppin').on('click',function (){
        $('.kicpa-modal').show();
    });

    $('#gammyPage_Change_repPin').on('click',function (){
        var pin = $('input:radio[name=gammyPage_Reppin]:checked').val();

        var update_Param = {};
        update_Param.pin = pin;
        update_Param.auditCd = $('#audit_Code').val();
        fn_ajax_call('/kicpa/myp/updategammypageReppinList.do',update_Param,gammyPage.update_repPin_success, gammyPage.update_reppin_error )
    });

    $('#gammyPage_Close_kicpaModal').on('click',function (){
        $('.kicpa-modal').hide();
    });

    $('input:radio[name=gamoffice_auditid]').on('click', function (e){
        $('#audit_empbody').empty();
       var gammyPage_auditId = $("input:radio[name=gamoffice_auditid]:checked").val();
       var select_Param = {};
       select_Param.auditId = gammyPage_auditId;
        fn_ajax_call('/kicpa/myp/gammyPageAudList.do', select_Param, gammyPage.select_success, gammyPage.select_error);
    });

    $('#close_modal').on('click',function (){
       $('.modal').hide();
    });

    $('#gammyPage_regist_auditemp').on('click', function (){

        if($("input:radio[name=gamoffice_auditid]").is(":checked") == false){
            alert("사무소 정보에서 등록할 사무소를 선택해주세요");
            return;
        }

        $('#gammyPage_auditemp_empSn').val("");
        $('#gammyPage_auditemp_empnm').val("");
        $('#gammyPage_auditemp_rspoc').val("");
        $('#gammyPage_auditemp_email').val("");
        $('#gammyPage_auditemp_telno').val("");
        $('#gammyPage_auditemp_moblphonno').val("");

        $('#gammyPage_deleteAuditemp').css('display','none');
        $('.modal').show();

    });

    $('#gammyPage_deleteAuditemp').on('click', function (){
        var empsn = $('#gammyPage_auditemp_empSn').val();
        var auditId = $('input:radio[name=gamoffice_auditid]').val();
        var delete_Param = {};
        delete_Param.empSn = empsn;
        delete_Param.auditId = auditId;
        fn_ajax_call('/kicpa/myp/deletegammyPage.do',delete_Param, gammyPage.delete_success, gammyPage.delete_error );
    });

    $('#submit_modal').on('click', function (){
        var auditId = $('input:radio[name=gamoffice_auditid]').val();
        var empSn = $('#gammyPage_auditemp_empSn').val();
        var empnm = $('#gammyPage_auditemp_empnm').val();
        var rspofc = $('#gammyPage_auditemp_rspoc').val();
        var email = $('#gammyPage_auditemp_email').val();
        var telno = $('#gammyPage_auditemp_telno').val();
        var moblphonno = $('#gammyPage_auditemp_moblphonno').val();

        if(empnm == "" || rspofc == "" || email == "" || telno == "" || moblphonno == "" ){
            alert("빈칸없이 전부 입력해 주세요")
            return;
        }

        if(empSn == "") {

            var insert_Param = {};
            insert_Param.auditCd = $('#audit_Code').val();
            insert_Param.auditId = auditId;
            insert_Param.empNm = empnm;
            insert_Param.rspOfc = rspofc;
            insert_Param.email = email;
            insert_Param.telNo = telno;
            insert_Param.moblPhonNo = moblphonno;

            fn_ajax_call('/kicpa/myp/insertgammyPage.do', insert_Param, gammyPage.insert_success, gammyPage.insert_error)
        }else{
            var update_Param = {};
            update_Param.auditCd = $('#audit_Code').val();
            update_Param.empSn = empSn;
            update_Param.auditId = auditId;
            update_Param.empNm = empnm;
            update_Param.rspOfc = rspofc;
            update_Param.email = email;
            update_Param.telNo = telno;
            update_Param.moblPhonNo = moblphonno;

            fn_ajax_call('/kicpa/myp/updategammyPage.do', update_Param, gammyPage.update_success, gammyPage.update_error)
        }
    });

    $('#gammyPage_apntccpamypSearch').on('click', function (){
       var type = $('#gammyPage_approval').val();
       var startDate = $('#gammyPage_StartDagte').val();
       var endDate = $('#gammyPage_EndDagte').val();
       var graduation = $('#gammyPage_graduation').val();
       var searchText = $('#gammyPage_searchText').val();

        gammyPage.gammyPage_apntc_search(type,startDate,endDate,graduation,searchText);

    });

    $('#gammyPage_cpamyp_Search').on('click', function (){
        var approval = $('#gammyPage_cpamyp_approval').val();
        var startDate = $('#gammyPage_memberRegist_StartDate').val();
        var endDate = $('#gammyPage_memberRegist_EndDate').val();
        var searchText = $('#gammyPage_cpamyp_searchText').val();

        gammyPage.gammyPage_cpa_search(approval,startDate,endDate,searchText);

    });
}

gammyPage.update_repPin_success = function (result){
    alert("성공");
    location.reload();
}

gammyPage.update_repPin_error = function (xhr,status, error){
    alert("실패");
}

gammyPage.select_success = function (result){
     var audList = result.gamAudList;
     var audList_size = result.gamAudList_size;
     var a = "\'";
     var aa = "\"";
     if(audList_size == '0'){
         $('#audit_empbody').append("<tr><td colspan='6' style='text-align: center; font-size:20px;'>데이터가 없습니다</td></tr>");
         return;
     }
     for(var i=0; i<audList_size; i++){
         $("#audit_empbody").append("<tr> <td style='display: none;'>"+ audList[i].auditId +"</td> <td style='display: none;'>"+ audList[i].empSn +"</td> <td>"+ audList[i].empNm +"</td> <td>"+ audList[i].rspOfc +"</td> <td>"+ audList[i].email +"</td> <td>"+ audList[i].telNo +"</td> <td>"+ audList[i].moblPhonNo +"</td> " +
             "<td><button type='button' class='line-button'  type='button' class='line-button' onclick="+aa+"auditemp_updtdel("+a+""+ audList[i].auditId +"', '"+ audList[i].empSn +"', '"+ audList[i].empNm +"', '"+ audList[i].rspOfc +"', '"+ audList[i].email +"', '"+ audList[i].telNo +"', '"+ audList[i].moblPhonNo +"')\">수정/삭제</button></td> </tr>");
     }
}

gammyPage.select_error = function (xhr,status, error){
    alert("실패");
}

gammyPage.insert_success = function (result){
    var audList = result.gamAudList;
    var audList_size = result.gamAudList_size;
    var a = "\'";
    var aa = "\"";

    $('#audit_empbody').empty();

    for(var i=0; i<audList_size; i++){
        $("#audit_empbody").append("<tr> <td style='display: none;'>"+ audList[i].auditId +"</td> <td style='display: none;'>"+ audList[i].empSn +"</td> <td>"+ audList[i].empNm +"</td> <td>"+ audList[i].rspOfc +"</td> <td>"+ audList[i].email +"</td> <td>"+ audList[i].telNo +"</td> <td>"+ audList[i].moblPhonNo +"</td> " +
            "<td><button type='button' class='line-button' onclick="+aa+"auditemp_updtdel("+a+""+ audList[i].auditId +"', '"+ audList[i].empSn +"', '"+ audList[i].empNm +"', '"+ audList[i].rspOfc +"', '"+ audList[i].email +"', '"+ audList[i].telNo +"', '"+ audList[i].moblPhonNo +"')\">수정/삭제</button></td> </tr>");
    }
    alert("성공");
    $('.modal').hide();
}

gammyPage.insert_error = function (xhr,status, error){
    alert("실패");
}

gammyPage.delete_success = function (result){
    var audList = result.gamAudList;
    var audList_size = result.gamAudList_size;
    var a = "\'";
    var aa = "\"";

    $('#audit_empbody').empty();

    for(var i=0; i<audList_size; i++){
        $("#audit_empbody").append("<tr> <td style='display: none;'>"+ audList[i].auditId +"</td> <td style='display: none;'>"+ audList[i].empSn +"</td> <td>"+ audList[i].empNm +"</td> <td>"+ audList[i].rspOfc +"</td> <td>"+ audList[i].email +"</td> <td>"+ audList[i].telNo +"</td> <td>"+ audList[i].moblPhonNo +"</td> " +
            "<td><button type='button' class='line-button' onclick="+aa+"auditemp_updtdel("+a+""+ audList[i].auditId +"', '"+ audList[i].empSn +"', '"+ audList[i].empNm +"', '"+ audList[i].rspOfc +"', '"+ audList[i].email +"', '"+ audList[i].telNo +"', '"+ audList[i].moblPhonNo +"')\">수정/삭제</button></td> </tr>");
    }
    alert("성공");
    $('.modal').hide();
}

gammyPage.delete_error = function (xhr,status, error){
    alert("실패");
}

gammyPage.update_success = function (result){
    var audList = result.gamAudList;
    var audList_size = result.gamAudList_size;
    var a = "\'";
    var aa = "\"";

    $('#audit_empbody').empty();

    for(var i=0; i<audList_size; i++){
        $("#audit_empbody").append("<tr> <td style='display: none;'>"+ audList[i].auditId +"</td> <td style='display: none;'>"+ audList[i].empSn +"</td> <td>"+ audList[i].empNm +"</td> <td>"+ audList[i].rspOfc +"</td> <td>"+ audList[i].email +"</td> <td>"+ audList[i].telNo +"</td> <td>"+ audList[i].moblPhonNo +"</td> " +
            "<td><button type='button' class='line-button' onclick="+aa+"auditemp_updtdel("+a+""+ audList[i].auditId +"', '"+ audList[i].empSn +"', '"+ audList[i].empNm +"', '"+ audList[i].rspOfc +"', '"+ audList[i].email +"', '"+ audList[i].telNo +"', '"+ audList[i].moblPhonNo +"')\">수정/삭제</button></td> </tr>");
    }
    alert("성공");
    $('.modal').hide();
}

gammyPage.update_error = function (xhr,status, error){
    alert("실패");
}

function auditemp_updtdel(auditid,empsn,empnm,rspoc,email,telno,moblphonno){
    $('#gammyPage_auditemp_empSn').val(empsn);
    $('#gammyPage_auditemp_empnm').val(empnm);
    $('#gammyPage_auditemp_rspoc').val(rspoc);
    $('#gammyPage_auditemp_email').val(email);
    $('#gammyPage_auditemp_telno').val(telno);
    $('#gammyPage_auditemp_moblphonno').val(moblphonno);

    $('.modal').show();
    $('#gammyPage_deleteAuditemp').css('display','');
}

//수습회계사 등록신청서 접수현황 조회
gammyPage.gammyPage_apntc_search = function (approval, startDate, endDate, graduation, searchText){
    var search_Param = {};
    search_Param.auditCd = $('#audit_Code').val();
    search_Param.approval = approval;
    search_Param.startDate = startDate;
    search_Param.endDate = endDate;
    search_Param.graduation = graduation;
    search_Param.searchText = searchText;
    fn_ajax_call('/kicpa/myp/selectgammyPageapntcmypList.do', search_Param, gammyPage.search_success, gammyPage.search_error);
}

gammyPage.search_success = function (result){
    var audList = result.gamAudList;
    var audList_size = result.gamAudList_size;
    var a = "\'";
    var aa = "\"";
    $('#gammyPage_apntc_body').empty();
    
    if(audList_size == "0"){
        $('#gammyPage_apntc_body').append("<tr> <td colspan='12'> 데이터가 없습니다.</td> </tr>");
    }

    for(var i=0; i<audList_size; i++) {

        $('#gammyPage_apntc_body').append("<tr> <td>"+ (i+1) +"</td> <td>"+ audList[i].regFlag +"</td> <td>"+ audList[i].type +"</td>  <td>"+ audList[i].apntcSn +"</td> <td>"+ audList[i].appRegistDe +"</td> <td>"+ audList[i].koreanNm +"</td> <td>"+ audList[i].brthdy +"</td> <td>"+ audList[i].guideCpaNm +"  "+ audList[i].guideCpaNo +"</td> <td>"+ audList[i].grdtStatus +"</td> <td>"+ audList[i].grdtDe +"</td> <td>"+ audList[i].vacationStrDe +" ~ "+ audList[i].vacationEndDe +"</td> <td><button type='button' class='line-button'>조회</button></td> </tr>");
    }
}

gammyPage.search_error = function (xhr,status, error){
    alert("실패");
}

//회원 등록신청서 접수현황 조회
gammyPage.gammyPage_cpa_search = function (approval, startDate, endDate, searchText){
    var search_Param = {};
    search_Param.auditCd = $('#audit_Code').val();
    search_Param.approval = approval;
    search_Param.startDate = startDate;
    search_Param.endDate = endDate;
    search_Param.searchText = searchText;
    fn_ajax_call('/kicpa/myp/selectgammyPagecpamypList.do', search_Param, gammyPage.search_cpa_success, gammyPage.search_cpa_error);
}

gammyPage.search_cpa_success = function (result){
    var audList = result.gamAudList;
    var audList_size = result.gamAudList_size;
    var a = "\'";
    var aa = "\"";
    $('#gammyPage_cpamyp_body').empty();

    if(audList_size == "0"){
        $('#gammyPage_cpamyp_body').append("<tr> <td colspan='10'>데이터가 없습니다.</td> </tr>");
    }else {

        for (var i = 0; i < audList_size; i++) {
            $('#gammyPage_cpamyp_body').append("<tr> <td>" + (i + 1) + "</td> <td>" + audList[i].regFlag + "</td> <td>" + audList[i].cpaSn + "</td> <td>" + audList[i].registDe + "</td> <td>" + audList[i].koreanNm + "</td> <td>" + audList[i].brthdy + "</td> <td>" + audList[i].registFlag + "</td> <td>" + audList[i].payDe + "</td> <td>" + audList[i].payIdFlag + "</td> <td><button type='button' class='line-button'>조회</button></td> </tr>");
        }
    }
}

gammyPage.search_cpa_error = function (xhr,status, error){
    alert("에러")
}