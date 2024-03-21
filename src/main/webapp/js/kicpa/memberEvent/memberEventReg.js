var memberEventReg = {};

memberEventReg.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

memberEventReg.memberEventRegInit = function(){

    //조회 버튼 클릭
    $("#memberEventReg_capSearchBtn").on("click",function(){
        memberEventReg.cpaMemSearch();
    });

    //성명(등록번호) 입력
    $("#memberEventReg_koreanNm").on("input",function(e) {

        var cpaNm = $('#memberEventReg_koreanNm').val();
        var relation = $('#memberEventReg_relation').val();

        if((cpaNm != "" && cpaNm != null) && (relation != "" && relation != null)){

            if(relation != "자녀상"){
                relation = relation.replaceAll("상", " 별세")
            }

            $('#memberEventReg_regTitle').val(cpaNm + " 회계사님 " + relation);
        }
        else{
            $('#memberEventReg_regTitle').val('');
        }

        $('#memberEventReg_capSearchYn').val('N');
    });

    $("#memberEventReg_cpaId").on("input",function(e) {
        $('#memberEventReg_capSearchYn').val('N');
    });

    //고인관계 변경
    $('#memberEventReg_relation').on('change', function(){
        var cpaNm = $('#memberEventReg_koreanNm').val();
        var relation = $('#memberEventReg_relation').val();

        if((cpaNm != "" && cpaNm != null) && (relation != "" && relation != null)){

            if(relation != "자녀상"){
                relation = relation.replaceAll("상", " 별세")
            }

            $('#memberEventReg_regTitle').val(cpaNm + " 회계사님 " + relation);
        }
        else{
            $('#memberEventReg_regTitle').val('');
        }

        if(relation == "자녀상"){
            $('#memberEventReg_children').show();
        }
        else{
            $('#memberEventReg_children').hide();
            $('#memberEventReg_children').val('');
        }

    });

    //등록 버튼 클릭
    $('#memberEventReg_save').on('click', function(){

        if($.trim($("#memberEventReg_koreanNm").val()) == ''){
            alert("대상자 성명을 입력해주세요.")
            return false;
        }

        if($.trim($("#memberEventReg_cpaId").val()) == ''){
            alert("대상자 등록번호를 입력해주세요.")
            return false;
        }

        if($("#memberEventReg_capSearchYn").val() != 'Y'){
            alert("대상자를 조회 해주세요.")
            return false;
        }

        if($.trim($("#memberEventReg_relation").val()) == ''){
            alert("고인과의 관계를 입력해주세요.")
            return false;
        }

        if($("#memberEventReg_relation").val() == '자녀상' && $.trim($("#memberEventReg_children").val()) == ''){
            alert("자녀 이름을 입력해주세요.")
            return false;
        }

        if($.trim($("#memberEventReg_deaDate").val()) == ''){
            alert("작고일을 선택해주세요.")
            return false;
        }

        if($.trim($("#memberEventReg_burialDt").val()) == ''){
            alert("발인일을 선택해주세요.")
            return false;
        }

        if($.trim($("#memberEventReg_mortuary").val()) == ''){
            alert("빈소를 입력해주세요.")
            return false;
        }

        if($.trim($("#memberEventReg_phoneNumber").val()) == ''){
            alert("빈소 연락처를 입력해주세요.")
            return false;
        }


        var param = new FormData($("#memberEventRegForm")[0]);
        fn_ajax_form_call("/kicpa/memberEvent/memberEventRegSave.do",param,memberEventReg.memberEventRegSaveSuccess);

    });

}

//등록번호와 성명 일치여부 확인
memberEventReg.cpaMemSearch = function(){

    if($('#memberEventReg_koreanNm').val() == '' || $('#memberEventReg_koreanNm').val() == null){
        alert("대상자의 성명을 입력해주세요");
        $('#memberEventReg_capSearchYn').val('N');
        return ;
    }
    if($('#memberEventReg_cpaId').val() == '' || $('#memberEventReg_cpaId').val() == null){
        alert("대상자의 등록번호를 입력해주세요");
        $('#memberEventReg_capSearchYn').val('N');
        return ;
    }


    var param = {};
    param.cpaId = $('#memberEventReg_cpaId').val();
    param.koreanNm = $('#memberEventReg_koreanNm').val();

    fn_ajax_call("/kicpa/memberEvent/cpaMemSearch.do",param,memberEventReg.cpaMemSearch_success,memberEventReg.cpaMemSearch_error);
}

memberEventReg.cpaMemSearch_success = function(data){

    if(data.cpaMemChkSize > 0 && data.cpaMemChk != null){
        alert("조회 되었습니다.");
        $('#memberEventReg_capSearchYn').val('Y');
    }
    else{
        alert("일치하는 정보가 없습니다.");
        $('#memberEventReg_capSearchYn').val('N');
    }

}

memberEventReg.cpaMemSearch_error = function(data, status, error){
    alert("실패");
}

memberEventReg.memberEventRegSaveSuccess = function(data){
    alert("등록되었습니다.");

    var di = $('#memberEventReg_di').val();
    var sName = $('#memberEventReg_name').val();

    location.href="/kicpa/memberEvent/memberEventList.do?di="+di+"&name="+sName;
    //window.close();
}