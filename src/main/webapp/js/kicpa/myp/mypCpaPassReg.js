var mypCpaPassReg = mypCpaPassReg || {};

var acdmcrInfoAddCount =1;
// 문서 시작 시
$(document).ready(
    function() {    	

        mypCpaPassReg.fn_init_events(); // 이벤트 등록
        mypCpaPassReg.fn_init(); // 화면 초기화

        $('#appLoadingIndicator2', parent.document).hide();
    }
);
mypCpaPassReg.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypCpaPassReg.fn_init = function() {

    $(".mypCpaPassReg_datepickerAdd").datepicker({
        changeMonth: false,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy',
        onClose: function(dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    });

    $('#mypCpaPassReg_ofcInfoReg').hide();

    //수정모드
    if($('#mypCpaPassReg_saveMode').val() == "U"){
        mypCpaPassReg.mypCpaPassReg_tabMove($('#mypCpaPassReg_movePage').val());
        $('.mypCpaPassReg_preBtn').hide();

        if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_reviewInfo"){
            $('.mypCpaPassReg_mypBtn').hide();
            $('.mypCpaPassReg_nextBtn a').text("확인");
        }
        else{
            $('.mypCpaPassReg_mypBtn').show();
            $('.mypCpaPassReg_nextBtn a').text("저장");

            //저장된(수정할) 데이터 조회
            mypCpaPassReg.mypCpaPassReg_updateInfoList();
        }
    }
    //처음 등록 모드
    else{
        mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_agree');
        $('.mypCpaPassReg_mypBtn').hide();
        $('.mypCpaPassReg_preBtn').show();
        $('.mypCpaPassReg_nextBtn a').text("다음");
    }

}


mypCpaPassReg.fn_init_events = function() {
 	  
    //약관동의 저장(시작하기버튼)
    $("#mypCpaPassReg_agreeSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaPassReg_agreeForm').serializeObject();
        formData.pin = $('#mypCpaPassReg_pin').val();
        formData.saveMode = $('#mypCpaPassReg_saveMode').val();
        var url = mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegAgreeSave.do";

        mypCpaPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_passInfo");

    });

    //합격자기본정보 저장(다음버튼)
    $("#mypCpaPassReg_passInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaPassReg_passInfoForm').serializeObject();
        formData.pin = $('#mypCpaPassReg_pin').val();
        formData.saveMode = $('#mypCpaPassReg_saveMode').val();
        var url = mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegPassInfoSave.do";

        mypCpaPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_adressInfo");
    });

    //자택&직장주소 저장(다음버튼)
    $("#mypCpaPassReg_adressInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaPassReg_adressInfoForm').serializeObject();
        formData.pin = $('#mypCpaPassReg_pin').val();
        formData.saveMode = $('#mypCpaPassReg_saveMode').val();
        var url = mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegAdressInfoSave.do";

        mypCpaPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_contactInfo");


    });

    //연락처 저장(다음버튼)
    $("#mypCpaPassReg_contactInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaPassReg_contactInfoForm').serializeObject();
        formData.pin = $('#mypCpaPassReg_pin').val();
        formData.saveMode = $('#mypCpaPassReg_saveMode').val();
        var url = mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegContactInfoSave.do";

        mypCpaPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_acdmcrInfo");

    });

    //학력사항 저장(다음버튼)
    $("#mypCpaPassReg_acdmcrInfoSaveBtn").on("click",function(e) {

        var data = {};
        var acdmcrInfoSize = $("select[name='schulCl']").length;
        var acdmcrInfoList  = [];

        for(var i=0; i<acdmcrInfoSize; i++) {

            var item = {};
            item.schulCl = $("select[name='schulCl']").eq(i).val();
            item.degree = $("select[name='degree']").eq(i).val();
            item.schulNm = $("input[name='schulNm']").eq(i).val();
            item.grdtnYear = $("input[name='grdtnYear']").eq(i).val();
            item.major = $("input[name='major']").eq(i).val();
            item.acdmcrSn = $("input[name='acdmcrSn']").eq(i).val();
            acdmcrInfoList.push(item);

        }
        data.pin = $('#mypCpaPassReg_pin').val();
        data.saveMode = $('#mypCpaPassReg_saveMode').val();
        data.list = JSON.stringify(acdmcrInfoList);

        //수정모드일 경우 삭제할 학력정보 담기
        if($('#mypCpaPassReg_saveMode').val() == "U"){

            var acdmcrDelSize = $("input[name='acdmcrSnDel']").length;
            var acdmcrDelList  = [];

            for(var i=0; i<acdmcrDelSize; i++) {

                var item = {};
                item.acdmcrSnDel = $("input[name='acdmcrSnDel']").eq(i).val();
                acdmcrDelList.push(item);

            }

            data.listDel = JSON.stringify(acdmcrDelList);
        }

        var url = mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegAcdmcrInfoSave.do";
        mypCpaPassReg.mypCpaPassReg_passInfoSave(data, url, "mypCpaPassReg_rsumInfo");

    });

    //이력서 저장(다음버튼)
    $("#mypCpaPassReg_rsumInfoSaveBtn").on("click",function(e) {

        var form = $('#mypCpaPassReg_rsumInfoForm')[0];
        var formData = new FormData(form);
        formData.append("pin", $('#mypCpaPassReg_pin').val());

        $.ajax({
            cache : false,
            url : mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegRsumInfoSave.do",
            type : 'POST',
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            success : function(data) {

                mypCpaPassReg.mypCpaPassReg_tabMove('mypCpaPassReg_reviewInfo');

            }, // success
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
        }); // $.ajax */
    });

    //직장정보 등록 체크 클릭
    $("#mypCpaPassReg_ofcRegYn").on("click",function(e) {

        if($("input:checkbox[name=ofcRegYn]").is(":checked")){
            $('#mypCpaPassReg_ofcInfoReg').slideDown(1000);
            $('.mypCpaPassReg_postOfficeHidden').show();
            $('input:radio[name="postSndngYn"][value="O"]').prop('checked', true);
        }else{
            $('#mypCpaPassReg_ofcInfoReg').slideUp(1000);
            $('.mypCpaPassReg_postOfficeHidden').hide();
            $('input:radio[name="postSndngYn"][value="H"]').prop('checked', true);
        }

    });

    //학력추가 버튼클릭
    $("#mypCpaPassReg_acdmcrInfoAddBtn").on("click",function(e) {

        var result="";

        result+= "<div id='acdmcrInfoAddDiv"+acdmcrInfoAddCount+"'>"
                    +"<div class='form-title' style='margin-top:30px;'>"
                        /*+"<h2>추가"+ acdmcrInfoAddCount +"</h2>"*/
                        +"<h2>학력추가</h2>"
                        +"<button type='button' onclick='mypCpaPassReg.mypCpaPassReg_acdmcrInfoRemove("+acdmcrInfoAddCount+")'>delete</button>"
                    +"</div>"

                    +"<div class='responsive-form-box'>"
                        +"<ul>"
                            +"<li>"
                                +"<div class='input-group required'>"
                                    +"<label for='mypCpaPassReg_acdmcrInfoAddSchulCl"+acdmcrInfoAddCount+"'>학력</label>"
                                    +"<span class='input'>"
                                        +"<select name='schulCl' id='mypCpaPassReg_acdmcrInfoAddSchulCl"+acdmcrInfoAddCount+"'>"
                                            +"<option selected value=''>선택하세요</option>"
                                            +"<option value='A2230010'>고등학교</option>"
                                            +"<option value='A2230030'>대학교</option>"
                                            +"<option value='A2230040'>대학원</option>"
                                        +"</select>"
                                    +"</span>"
                                +"</div>"
                            +"</li>"
                            +"<li>"
                                +"<div class='input-group required'>"
                                    +"<label for='mypCpaPassReg_acdmcrInfoAddDegree"+acdmcrInfoAddCount+"'>학위</label>"
                                    +"<span class='input'>"
                                        +"<select name='degree' id='mypCpaPassReg_acdmcrInfoAddDegree"+acdmcrInfoAddCount+"'>"
                                            +"<option selected value=''>선택하세요</option>"
                                            +"<option value='A9030010'>졸업</option>"
                                            +"<option value='A9030020'>학사</option>"
                                            +"<option value='A9030030'>석사</option>"
                                            +"<option value='A9030040'>박사</option>"
                                            +"<option value='A9030050'>수료</option>"
                                        +"</select>"
                                    +"</span>"
                                +"</div>"
                            +"</li>"
                            +"<li>"
                                +"<div class='input-group required'>"
                                    +"<label for='mypCpaPassReg_acdmcrInfoAddSchulNm"+acdmcrInfoAddCount+"'>학교명</label>"
                                    +"<span class='input'><input type='text' name='schulNm' id='mypCpaPassReg_acdmcrInfoAddSchulNm"+acdmcrInfoAddCount+"' placeholder='학교명을 입력하세요.' /></span>"
                                +"</div>"
                            +"</li>"
                            +"<li>"
                                +"<div class='input-group required'>"
                                    +"<label for='mypCpaPassReg_acdmcrInfoAddGrdtnYear"+acdmcrInfoAddCount+"'>졸업년도</label>"
                                    +"<span class='input cal'>"
                                        +"<span class='input'><input class='mypCpaPassReg_datepickerAdd' type='text' name='grdtnYear' id='mypCpaPassReg_acdmcrInfoAddGrdtnYear"+acdmcrInfoAddCount+"' placeholder='졸업년도를 입력하세요.' /></span>"
                                        +"<button type='button' class='calendar-button'>calendar</button>"
                                    +"</span>"
                                +"</div>"
                            +"</li>"
                            +"<li>"
                                +"<div class='input-group required'>"
                                    +"<label for='mypCpaPassReg_acdmcrInfoAddMajor"+acdmcrInfoAddCount+"'>전공</label>"
                                    +"<span class='input'><input type='text' name='major' id='mypCpaPassReg_acdmcrInfoAddMajor"+acdmcrInfoAddCount+"' placeholder='전공을 입력하세요.  예) 경영학부 회계전공, 경제세무학과' /></span>"
                                +"</div>"
                            +"</li>"
                            +"<input type='hidden' name='acdmcrSn' id='mypCpaPassReg_acdmcrInfoAddAcdmcrSn"+acdmcrInfoAddCount+"'/>"
                        +"</ul>"
                    +"</div>"
                +"</div>"

        acdmcrInfoAddCount++;

        $('#mypCpaPassReg_acdmcrInfoAdd').append(result);

        $(".mypCpaPassReg_datepickerAdd").datepicker("destroy");

        $(".mypCpaPassReg_datepickerAdd").datepicker({
            changeMonth: false,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy',
            onClose: function(dateText, inst) {
                $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            }
        });
    });

    //제출버튼 클릭
    $("#mypCpaPassReg_submitBtn").on("click",function(e) {

        if($('#mypCpaPassReg_saveMode').val() == "U"){
            location.replace(mypCpaPassReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaPassReg_pin').val());
        }
        else{
            if(confirm("                      해당 내용으로 제출 하시겠습니까?\n            제출된 내용은 마이페이지에서 수정이 가능합니다.")){

                var formData = {};
                formData.pin = $('#mypCpaPassReg_pin').val();

                $.ajax({
                    url : mypCpaPassReg.getContextPath()+"/kicpa/myp/mypCpaPassRegSubmit.do",
                    type : "POST",
                    data : formData,
                    success : function(data) {
                        location.replace(mypCpaPassReg.getContextPath()+'/kicpa/myp/mypCpaTrainRegMove.do?pin='+$('#mypCpaPassReg_pin').val());
                    }
                });

            }
        }
    });

    //close 버튼 클릭
    $("#mypCpaPassReg_closeBtn").on("click",function(e) {
        alert("종료하시겠습니까?\n" +
            "작성중이던 정보는 삭제됩니다.\n");

        parent.ClosePage();
    });

}

//합격자 정보 저장
mypCpaPassReg.mypCpaPassReg_passInfoSave = function(formData, url, flag) {

    $.ajax({
        url : url,
        type : "POST",
        data : formData,
        success : function(data) {

            if(!isNull(data.message)){
                alert(data.message);
            }
            else{
                if($('#mypCpaPassReg_saveMode').val() == "U"){
                    location.replace(mypCpaPassReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaPassReg_pin').val());
                }
                else{
                    mypCpaPassReg.mypCpaPassReg_tabMove(flag);
                }
            }
        }
    });

}

//수정할 데이터 조회(수정모드)
mypCpaPassReg.mypCpaPassReg_updateInfoList = function() {

    var updateInfo_param = {};
    updateInfo_param.pin = $('#mypCpaPassReg_pin').val();
    updateInfo_param.movePage = $('#mypCpaPassReg_movePage').val();

    $.ajax({
        url : mypCpaPassReg.getContextPath()+"/kicpa/myp/selectMypCpaPassRegUpdateInfoList.do",
        type : "POST",
        data : updateInfo_param,
        success : function(data) {
            mypCpaPassReg.mypCpaPassReg_updateInfoList_success(data);
        }
    });
};

//탭 이동
mypCpaPassReg.mypCpaPassReg_tabMove = function(flag) {

    //입력화면 show/hide
    $('.mypCpaPass_tabMove').hide();
    $('#'+flag).show();

    //왼쪽화면 active
    $('.mypCpaPassReg_activeMove').removeClass('active');
    $('#'+flag+'Active').addClass('active');

    if($('#mypCpaPassReg_saveMode').val() == "U"){

    }
    else{
        if(flag == "mypCpaPassReg_reviewInfo"){                     //검토 및 제출
            var reviewInfo_param = {};
            reviewInfo_param.pin = $('#mypCpaPassReg_pin').val();

            $.ajax({
                dataType:"json",
                url: mypCpaPassReg.getContextPath()+"/kicpa/myp/selectMypCpaPassRegReviewInfo.do",
                data:reviewInfo_param,
                success: function (data) {
                    mypCpaPassReg.selectMypCpaPassRegReviewInfo_success(data);
                },
                error: function (status, e) {
                    alert("데이터 요청에 실패하였습니다.\r status : " + status);
                }
            });
        }
    }
}

//학력삭제(추가된 내용)
mypCpaPassReg.mypCpaPassReg_acdmcrInfoRemove = function(rowNum){

    //수정모드일 경우 저장되어있는 학력 정보 hidden에 담기
    if($('#mypCpaPassReg_saveMode').val() == "U"){
        var acdmcrSn = $('#mypCpaPassReg_acdmcrInfoAddAcdmcrSn'+rowNum).val();
        var result="";

        if(!isNull(acdmcrSn)){
            result = "<input type='hidden' name='acdmcrSnDel' value='"+acdmcrSn+"'/>";

            $('#mypCpaPassReg_acdmcrInfoDel').append(result);
        }
    }

    var divId= "acdmcrInfoAddDiv"+rowNum;

    $("#"+divId).remove();

}

//이력서파일선택버튼 클릭
mypCpaPassReg.select_file = function() {
    $('#mypCpaPassReg_rsumInfoFile').trigger('click');
}

//검토 및 제출 데이터 조회
mypCpaPassReg.selectMypCpaPassRegReviewInfo_success = function(result){

    $('#reviewInfo_korNm').text(result.cpaRegReviewInfoList[0].koreanNm);
    $('#reviewInfo_chcNm').text(result.cpaRegReviewInfoList[0].chcrtNm);
    $('#reviewInfo_engNm').text(result.cpaRegReviewInfoList[0].engNm);
    $('#reviewInfo_husZipCd').text(result.cpaRegReviewInfoList[0].husZipCd);
    $('#reviewInfo_husAdres').text(result.cpaRegReviewInfoList[0].husAdres);
    $('#reviewInfo_husAdresDetail').text(result.cpaRegReviewInfoList[0].husAdresDetail);
    $('#reviewInfo_postSndngYn').text(result.cpaRegReviewInfoList[0].postSndngNm);
    $('#reviewInfo_ofcZipCd').text(result.cpaRegReviewInfoList[0].ofcZipCd);
    $('#reviewInfo_ofcAdres').text(result.cpaRegReviewInfoList[0].ofcAdres);
    $('#reviewInfo_ofcAdresDetail').text(result.cpaRegReviewInfoList[0].ofcAdresDetail);
    $('#reviewInfo_ofcTelNo').text(result.cpaRegReviewInfoList[0].ofcTelNo);
    $('#reviewInfo_ofcFaxNo').text(result.cpaRegReviewInfoList[0].ofcFaxNo);
    $('#reviewInfo_oficeNm').text(result.cpaRegReviewInfoList[0].oficeNm);
    $('#reviewInfo_rspOfc').text(result.cpaRegReviewInfoList[0].rspOfc);
    $('#reviewInfo_sectionNm').text(result.cpaRegReviewInfoList[0].sectionNm);
    $('#reviewInfo_deptNm').text(result.cpaRegReviewInfoList[0].deptNm);
    $('#reviewInfo_moblPhonNo').text(result.cpaRegReviewInfoList[0].moblPhonNo);
    $('#reviewInfo_husTelNo').text(result.cpaRegReviewInfoList[0].husTelNo);
    $('#reviewInfo_mainEmail').text(result.cpaRegReviewInfoList[0].mainEmail);
    $('#reviewInfo_subEmail').text(result.cpaRegReviewInfoList[0].subEmail);
    $('#reviewInfo_emailSndngYn').text(result.cpaRegReviewInfoList[0].emailSndngNm);
    $('#reviewInfo_smsSndngYn').text(result.cpaRegReviewInfoList[0].smsSndngNm);
    $('#reviewInfo_atchFileId').text(result.cpaRegReviewInfoList[0].fileNm);

    //학력사항
    var addAcdmcr="";
    var reviewInfoAcdmcrAddCnt =1;
    if(result.cpaRegReviewAcdmcrInfoListSize>0){
        for(var i=0; i<result.cpaRegReviewAcdmcrInfoListSize; i++){

            if(i<=1){
                $("#reviewInfo_schulCl"+i).text(result.cpaRegReviewAcdmcrInfoList[i].schulClNm);
                $("#reviewInfo_degree"+i).text(result.cpaRegReviewAcdmcrInfoList[i].degreeNm);
                $("#reviewInfo_schulNm"+i).text(result.cpaRegReviewAcdmcrInfoList[i].schulNm);
                $("#reviewInfo_grdtnYear"+i).text(result.cpaRegReviewAcdmcrInfoList[i].grdtnYear);
                if(i==1){
                    $("#reviewInfo_major"+i).text(result.cpaRegReviewAcdmcrInfoList[i].major);
                }
            }
            else{

                addAcdmcr+= "<table>"
                    +"<colgroup><col style='width: 206px' /><col/></colgroup>"
                    +"<thead><tr><th colspan='2'>추가 "+reviewInfoAcdmcrAddCnt+"</th></tr></thead>"
                    +"<tbody>"
                    +"<tr><th>학력</th><td>"+result.cpaRegReviewAcdmcrInfoList[i].schulClNm+"</td></tr>"
                    +"<tr><th>학위</th><td>"+result.cpaRegReviewAcdmcrInfoList[i].degreeNm+"</td></tr>"
                    +"<tr><th>학교명</th><td>"+result.cpaRegReviewAcdmcrInfoList[i].schulNm+"</td></tr>"
                    +"<tr><th>졸업년도</th><td>"+result.cpaRegReviewAcdmcrInfoList[i].grdtnYear+"</td></tr>"
                    +"<tr><th>전공</th><td>"+result.cpaRegReviewAcdmcrInfoList[i].major+"</td></tr>"
                    +"</tbody>"
                    +"</table>";

                reviewInfoAcdmcrAddCnt++;


            }
        }
        $('#mypCpaPassReg_reviewInfoAcdmcrAdd').append(addAcdmcr);
    }

}

//수정데이터 입력
mypCpaPassReg.mypCpaPassReg_updateInfoList_success = function(data){

    //이름 수정
    if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_passInfo"){
        $('#mypCpaPassReg_passInfoChcName').val(data.cpaPassRegRealInfo[0].chcrtNm);                                //한자이름
        $('#mypCpaPassReg_passInfoEngName').val(data.cpaPassRegRealInfo[0].engNm);                                //영문이름
    }
    //자택,직장주소 수정
    else if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_adressInfo"){
        $('#mypCpaPassReg_houseInfoZipCd').val(data.cpaPassRegHusAeresRealInfo[0].zipCd);                                 //자택우편번호
        $('#mypCpaPassReg_houseInfoAdres').val(data.cpaPassRegHusAeresRealInfo[0].rdAdres);                                 //자택주소
        $('#mypCpaPassReg_houseInfoAdresDt').val(data.cpaPassRegHusAeresRealInfo[0].rdAdresDetail);                               //자택상세주소


        if(data.cpaPassRegOfcAeresRealInfoSize >0 || data.cpaPassRegOfcRealInfoSize >0){
            $("input:checkbox[name='ofcRegYn']").attr('checked', true);      //직장정보 등록 체크
            $('.mypCpaPassReg_postOfficeHidden').show();
            $('#mypCpaPassReg_ofcInfoReg').show();

            $('#mypCpaPassReg_officeInfoZipCd').val(data.cpaPassRegOfcAeresRealInfo[0].zipCd);                                //직장우편번호
            $('#mypCpaPassReg_officeInfoAdres').val(data.cpaPassRegOfcAeresRealInfo[0].rdAdres);                                //직장주소
            $('#mypCpaPassReg_officeInfoAdresDt').val(data.cpaPassRegOfcAeresRealInfo[0].rdAdresDetail);                        //직장상세주소

            if(!isNull(data.cpaPassRegOfcRealInfo[0].ofcTelNo)){
                var ofcTelNo = data.cpaPassRegOfcRealInfo[0].ofcTelNo.split("-");
                $('#mypCpaPassReg_officeInfoTelNo1').val(ofcTelNo[0]);                               //직장전화번호
                $('#mypCpaPassReg_officeInfoTelNo2').val(ofcTelNo[1]);
                $('#mypCpaPassReg_officeInfoTelNo3').val(ofcTelNo[2]);
            }
            if(!isNull(data.cpaPassRegOfcRealInfo[0].ofcFaxNo)){
                var ofcFaxNo = data.cpaPassRegOfcRealInfo[0].ofcFaxNo.split("-");
                $('#mypCpaPassReg_officeInfoFax1').val(ofcFaxNo[0]);                                 //팩스번호
                $('#mypCpaPassReg_officeInfoFax2').val(ofcFaxNo[1]);
                $('#mypCpaPassReg_officeInfoFax3').val(ofcFaxNo[2]);
            }

            $('#mypCpaPassReg_officeInfoOficeNm').val(data.cpaPassRegOfcRealInfo[0].oficeNm);                              //직장명
            $('#mypCpaPassReg_officeInfoRspOfc').val(data.cpaPassRegOfcRealInfo[0].rspOfc);                               //직책
            $('#mypCpaPassReg_officeInfoSectionNm').val(data.cpaPassRegOfcRealInfo[0].sectionNm);                            //부서(국/실)
            $('#mypCpaPassReg_officeInfoDeptNm').val(data.cpaPassRegOfcRealInfo[0].deptNm);                               //하위부서


            //$('#mypCpaPassReg_officeInfoYn').val("Y");                                                     //기존 직장정보 삭제 시 삭제 정보 저장
        }else{
            $("input:checkbox[name='ofcRegYn']").attr('checked', false);      //직장정보 등록 체크
            $('.mypCpaPassReg_postOfficeHidden').hide();
            $('#mypCpaPassReg_ofcInfoReg').hide();
            //$('#mypCpaPassReg_officeInfoYn').val("N");
        }


        if(data.cpaPassRegRealInfo[0].postSndngYn == "H"){
            $("input:radio[name='postSndngYn'][value='H']").attr('checked', true);      //우편물 수령여부
        }
        else{
            $("input:radio[name='postSndngYn'][value='O']").attr('checked', true);      //우편물 수령여부
        }
    }
    //연락처 수정
    else if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_contactInfo"){
        if(!isNull(data.cpaPassRegRealInfo[0].moblPhonNo)){
            var moblPhonNo = data.cpaPassRegRealInfo[0].moblPhonNo.split("-");
            $('#mypCpaPassReg_contactInfoPhonNo1').val(moblPhonNo[0]);                             //휴대전화
            $('#mypCpaPassReg_contactInfoPhonNo2').val(moblPhonNo[1]);
            $('#mypCpaPassReg_contactInfoPhonNo3').val(moblPhonNo[2]);
        }
        if(!isNull(data.cpaPassRegRealInfo[0].houseTelNo)){
            var houseTelNo = data.cpaPassRegRealInfo[0].houseTelNo.split("-");
            $('#mypCpaPassReg_contactInfoHouseTel1').val(houseTelNo[0]);                           //자택전화
            $('#mypCpaPassReg_contactInfoHouseTel2').val(houseTelNo[1]);
            $('#mypCpaPassReg_contactInfoHouseTel3').val(houseTelNo[2]);
        }

        $('#mypCpaPassReg_contactInfoMainEmail').val(data.cpaPassRegRealInfo[0].mainEmail);                           //개인 Email
        $('#mypCpaPassReg_contactInfoSubEmail').val(data.cpaPassRegRealInfo[0].subEmail);                            //회사 Email

        if(data.cpaPassRegRealInfo[0].emailSndngYn=="Y"){
            $("input:radio[name='emailSndngYn'][value='Y']").attr('checked', true);     //메일 수신여부
        }
        else{
            $("input:radio[name='emailSndngYn'][value='N']").attr('checked', true);
        }
        if(data.cpaPassRegRealInfo[0].smsSndngYn=="Y"){
            $("input:radio[name='smsSndngYn'][value='Y']").attr('checked', true);       //문자 수신여부
        }
        else{
            $("input:radio[name='smsSndngYn'][value='N']").attr('checked', true);
        }


    }
    //학력 수정
    else if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_acdmcrInfo"){
        //고등학교
        $('#mypCpaPassReg_acdmcrInfoSchulNm').val(data.cpaPassRegAcdmcrRealInfo[0].schulNm);                                    //학교명
        $('#mypCpaPassReg_acdmcrInfoGrdtnYear').val(data.cpaPassRegAcdmcrRealInfo[0].grdtnYear);                                //졸업년도
        $('#mypCpaPassReg_acdmcrInfoMajor').val(data.cpaPassRegAcdmcrRealInfo[0].major);                                        //전공
        $('#mypCpaPassReg_acdmcrInfoAcdmcrSn').val(data.cpaPassRegAcdmcrRealInfo[0].acdmcrSn);                                  //순번

        if(data.cpaPassRegAcdmcrRealInfoSize>1){
            //대학교
            $('#mypCpaPassReg_acdmcrInfoDegree2').val(data.cpaPassRegAcdmcrRealInfo[1].degree);                                 //학위
            $('#mypCpaPassReg_acdmcrInfoSchulNm2').val(data.cpaPassRegAcdmcrRealInfo[1].schulNm);                               //학교명
            $('#mypCpaPassReg_acdmcrInfoGrdtnYear2').val(data.cpaPassRegAcdmcrRealInfo[1].grdtnYear);                           //졸업년도
            $('#mypCpaPassReg_acdmcrInfoMajor2').val(data.cpaPassRegAcdmcrRealInfo[1].major);                                   //전공
            $('#mypCpaPassReg_acdmcrInfoAcdmcrSn2').val(data.cpaPassRegAcdmcrRealInfo[1].acdmcrSn);                             //순번

            for(var i=2; i<data.cpaPassRegAcdmcrRealInfoSize; i++){
                $('#mypCpaPassReg_acdmcrInfoAddBtn').trigger('click');

                var acdmcrInfoCnt = acdmcrInfoAddCount-1;
                $('#mypCpaPassReg_acdmcrInfoAddSchulCl'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].schulCl);           //학력
                $('#mypCpaPassReg_acdmcrInfoAddDegree'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].degree);             //학위
                $('#mypCpaPassReg_acdmcrInfoAddSchulNm'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].schulNm);           //학교명
                $('#mypCpaPassReg_acdmcrInfoAddGrdtnYear'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].grdtnYear);       //졸업년도
                $('#mypCpaPassReg_acdmcrInfoAddMajor'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].major);               //전공
                $('#mypCpaPassReg_acdmcrInfoAcdmcrSn'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].acdmcrSn);            //순번
            }
        }

    }

}

//우편번호, 주소 클릭
mypCpaPassReg.mypAdresGoPopup = function(flag){

    var pop = window.open(mypCpaPassReg.getContextPath()+"/kicpa/myp/mypAdresPop.do?flag="+flag,"pop","width=570,height=420, scrollbars=yes, resizable=yes");

};

//주소콜백
function mypAdresCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd,
                              rnMgtSn, bdMgtSn , detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm,
                              buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo, flag){

    if(flag == 'H'){
        $('#mypCpaPassReg_houseInfoZipCd').val(zipNo);						//우편번호
        $('#mypCpaPassReg_houseInfoAdres').val(roadAddrPart1);			    //도로명주소
        $('#mypCpaPassReg_houseInfoAdresDt').val(addrDetail);		        //도로명상세
        $('#mypCpaPassReg_houseInfoLegalCd').val(admCd);		            //법정동코드
    }
    else{
        $('#mypCpaPassReg_officeInfoZipCd').val(zipNo);						//우편번호
        $('#mypCpaPassReg_officeInfoAdres').val(roadAddrPart1);			    //도로명주소
        $('#mypCpaPassReg_officeInfoAdresDt').val(addrDetail);		        //도로명상세
        $('#mypCpaPassReg_officeInfoLegalCd').val(admCd);		            //법정동코드
    }

}