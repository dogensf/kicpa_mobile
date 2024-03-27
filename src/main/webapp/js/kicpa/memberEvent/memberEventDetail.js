var memberEventDetail = {};

memberEventDetail.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

memberEventDetail.memberEventDetailInit = function(){

    memberEventDetail.memberEventTitle();

    //조회 버튼 클릭
    $("#memberEventDetail_capSearchBtn").on("click",function(){
        window.open("/kicpa/memberEvent/cpaSearchPop2.do","cpaSearchPop");
    });

    //고인관계 변경
    $('#memberEventDetail_relation').on('change', function(){

        memberEventDetail.memberEventTitle();

        var relation = $('#memberEventDetail_relation').val();

        if(relation == "자녀상"){
            $('#memberEventDetail_children').show();
        }
        else{
            $('#memberEventDetail_children').hide();
            $('#memberEventDetail_children').val('');
        }

    });

    //목록 버튼 클릭
    $("#memberEventDetail_list").on("click",function(){
        var di = sessionStorage.getItem("di");
        var sName = sessionStorage.getItem("sName");

        location.href="/kicpa/memberEvent/memberEventList.do?di="+di+"&name="+sName;
    });

    //수정 버튼 클릭
    $('#memberEventDetail_save').on('click', function(){

        if($.trim($("#memberEventDetail_koreanNm").val()) == ''){
            alert("대상자를 조회 해주세요.")
            return false;
        }

        if($.trim($("#memberEventDetail_cpaId").val()) == ''){
            alert("대상자를 조회 해주세요.")
            return false;
        }

        /*if($("#memberEventDetail_capSearchYn").val() != 'Y'){
            alert("대상자를 조회 해주세요.")
            return false;
        }*/

        if($.trim($("#memberEventDetail_relation").val()) == ''){
            alert("고인과의 관계를 입력해주세요.")
            return false;
        }

        if($("#memberEventDetail_relation").val() == '자녀상' && $.trim($("#memberEventDetail_children").val()) == ''){
            alert("자녀 이름을 입력해주세요.")
            return false;
        }

        if($.trim($("#memberEventDetail_deaDate").val()) == ''){
            alert("작고일을 선택해주세요.")
            return false;
        }

        if($.trim($("#memberEventDetail_burialDt").val()) == ''){
            alert("발인일을 선택해주세요.")
            return false;
        }

        if($.trim($("#memberEventDetail_mortuary").val()) == ''){
            alert("빈소를 입력해주세요.")
            return false;
        }

        if($.trim($("#memberEventDetail_phoneNumber").val()) == ''){
            alert("빈소 연락처를 입력해주세요.")
            return false;
        }


        var param = new FormData($("#memberEventDetailForm")[0]);
        param.append('immDi',sessionStorage.getItem("di"));
        param.append('diName',sessionStorage.getItem("sName"));
        fn_ajax_form_call("/kicpa/memberEvent/memberEventRegSave.do",param,memberEventDetail.memberEventDetailSaveSuccess);

    });

    //삭제 버튼 클릭
    $('#memberEventDetail_delete').on('click', function(){

        if(confirm("삭제 하시겠습니까?")){
            var param = new FormData($("#memberEventDetailForm")[0]);
            fn_ajax_form_call("/kicpa/memberEvent/memberEventRegDelete.do",param,memberEventDetail.memberEventDetailDeleteSuccess);
        }

    });

    //메일발송 버튼 클릭
    $('#memberEventDetail_mailSend').on('click', function(){

        memberEventDetail.memberEventMailSend();

    });

    //화환발송 버튼 클릭
    $('#memberEventDetail_flowerSend').on('click', function(){

        memberEventDetail.memberEventFlowerSend();

    });

}

//제목 입력
memberEventDetail.memberEventTitle = function(){
    var cpaNm = $('#memberEventDetail_koreanNm').val();
    var relation = $('#memberEventDetail_relation').val();

    if((cpaNm != "" && cpaNm != null) && (relation != "" && relation != null)){

        if(relation != "자녀상"){
            relation = relation.replaceAll("상", " 별세")
        }

        $('#memberEventDetail_regTitle').val(cpaNm + " 회계사님 " + relation);
    }
    else{
        $('#memberEventDetail_regTitle').val('');
    }
}

//등록번호와 성명 일치여부 확인
memberEventDetail.memberSearch = function(){

    if($('#memberEventDetail_koreanNm').val() == '' || $('#memberEventDetail_koreanNm').val() == null){
        alert("대상자의 성명을 입력해주세요");
        $('#memberEventDetail_capSearchYn').val('N');
        return ;
    }
    if($('#memberEventDetail_cpaId').val() == '' || $('#memberEventDetail_cpaId').val() == null){
        alert("대상자의 등록번호를 입력해주세요");
        $('#memberEventDetail_capSearchYn').val('N');
        return ;
    }


    var param = {};
    param.cpaId = $('#memberEventDetail_cpaId').val();
    param.koreanNm = $('#memberEventDetail_koreanNm').val();

    fn_ajax_call("/kicpa/memberEvent/cpaMemSearch.do",param,memberEventDetail.memberSearch_success,memberEventDetail.memberSearch_error);
}

memberEventDetail.memberSearch_success = function(data){

    if(data.cpaMemChkSize > 0 && data.cpaMemChk != null){
        alert("조회 되었습니다.");
        $('#memberEventDetail_capSearchYn').val('Y');
    }
    else{
        alert("일치하는 정보가 없습니다.");
        $('#memberEventDetail_capSearchYn').val('N');
    }

}

memberEventDetail.memberSearch_error = function(data, status, error){
    alert("실패");
}

memberEventDetail.memberEventDetailSaveSuccess = function(data){
    alert("수정되었습니다.");

    var di = sessionStorage.getItem("di");
    var sName = sessionStorage.getItem("sName");

    location.href="/kicpa/memberEvent/memberEventList.do?di="+di+"&name="+sName;
}

memberEventDetail.memberEventDetailDeleteSuccess = function(data){
    alert("삭제되었습니다.");

    var di = sessionStorage.getItem("di");
    var sName = sessionStorage.getItem("sName");

    location.href="/kicpa/memberEvent/memberEventList.do?di="+di+"&name="+sName;
}

//메일발송
memberEventDetail.memberEventMailSend = function(){

    var param = $("#memberEventDetailForm").serializeObject();
    fn_ajax_call("/kicpa/myp/boardInfoSendMail.do",param,memberEventDetail.memberEventMailSendSuccess ,memberEventDetail.memberEventMailSendError);
}

memberEventDetail.memberEventMailSendSuccess = function(result){

    if(result.boardSendMailInfo == null){
        alert("메일발송 실패");
    }
    else{
        if(result.boardSendMailInfo.v_result == "0"){
            alert("v_result ==>  0, 리턴" );
        }
        else if(result.boardSendMailInfo.v_result == "1"){
            alert("v_result ==>  1, 정상" );
        }
        else if(result.boardSendMailInfo.v_result == "3"){
            alert("v_result ==>  3, 발송내역 존재" );
        }
        else{
            alert("v_result ==>  "+result.boardSendMailInfo.v_result+", 기타오류");
        }
    }
}

memberEventDetail.memberEventMailSendError = function(){
    alert("메일발송 오류");
}

//화환발송
memberEventDetail.memberEventFlowerSend = function(){

    var param = $("#memberEventDetailForm").serializeObject();
    fn_ajax_call("/kicpa/myp/boardInfoSendAtfFlower.do",param,memberEventDetail.memberEventFlowerSendSuccess ,memberEventDetail.memberEventFlowerSendError);
}

memberEventDetail.memberEventFlowerSendSuccess = function(result){

    if(result.boardSendAtfFlowerInfo == null){
        alert("화환발송 실패");
    }
    else{
        if(result.boardSendAtfFlowerInfo.v_result == "0"){
            alert("v_result ==>  0, 실패" );
        }
        else if(result.boardSendAtfFlowerInfo.v_result == "1"){
            alert("v_result ==>  1, 정상" );
        }
        else if(result.boardSendAtfFlowerInfo.v_result == "3"){
            alert("v_result ==>  3, 발송내역 존재" );
        }
        else{
            alert("v_result ==>  "+result.boardSendAtfFlowerInfo.v_result+", 기타오류");
        }
    }
}

memberEventDetail.memberEventFlowerSendError = function(){
    alert("화환발송 오류");
}


//회원조회 팝업
memberEventDetail.cpaSearchPop2Init = function(){


    $(".search-box .search").on("click",function(){
        fn_portal_pop("cpaSearchPop");
        $("#cpaSearchPop2Form input[name='searchKeyword1']").attr("placeholder","대상자명을 입력하세요.");
        $("#cpaSearchPop2Form input[name='searchKeyword2']").attr("placeholder","대상자 등록번호를 입력하세요.");
    });


    $("#cpaSearchPop .btn-send").on("click",function(){

        if($("#cpaSearchForm input[name='searchKeyword1']").val() == '' || $("#cpaSearchForm input[name='searchKeyword1']").val() == null){
            alert("대상자명을 입력하세요.");
            return ;
        }

        if($("#cpaSearchForm input[name='searchKeyword2']").val() == '' || $("#cpaSearchForm input[name='searchKeyword2']").val() == null){
            alert("대상자 등록번호를 입력하세요.");
            return ;
        }

        $("#cpaSearchPop .btn-close").click();
        $("#cpaSearchPop2Form input[name='searchKeyword1']").val($("#cpaSearchForm input[name='searchKeyword1']").val());
        $("#cpaSearchPop2Form input[name='searchKeyword2']").val($("#cpaSearchForm input[name='searchKeyword2']").val());
        memberEventDetail.getCpaSearchPop2List();
    });

}

//회원 조회
memberEventDetail.getCpaSearchPop2List = function(){
    var param =$("#cpaSearchPop2Form").serializeObject();
    fn_ajax_call("/kicpa/memberEvent/getCpaSearchPopList.do",param,fnCpaSearchPop2ListSuccess,memberEventDetail.cpaSearchPop2ListError);
}

//회원조회 실패
memberEventDetail.cpaSearchPop2ListError = function(data,status, error){
    alert("조회실패");
}