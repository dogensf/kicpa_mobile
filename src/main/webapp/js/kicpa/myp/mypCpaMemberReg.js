var mypCpaMemberReg = mypCpaMemberReg || {};

var proCareerInfoAddCount = 1;      //전문분야 활동사항
var proCmitInfoAddCount = 1;        //위원회 활동사항
var proLicenseInfoAddCount = 1;     //자격/면허
var proLtrryInfoAddCount = 1;       //학술활동
var proWnpzInfoAddCount = 1;        //수상내용

mypCpaMemberReg.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

// 문서 시작 시
$(document).ready(
    function() {    	

        mypCpaMemberReg.fn_init_events(); // 이벤트 등록
        mypCpaMemberReg.fn_init(); // 화면 초기화

        $('#appLoadingIndicator2', parent.document).hide();
    }
);


mypCpaMemberReg.fn_init = function() {

    $("#mypCpaMember_registDe").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });

    $('#mypCpaMemberPop_auditPop').hide();

    //수정모드
    if($('#mypCpaMemberReg_saveMode').val() == "U"){
        mypCpaMemberReg.mypCpaMemberReg_tabMove($('#mypCpaMemberReg_movePage').val());

        if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_reviewInfo"){
            $('.mypCpaMember_preReviewBtn').hide();
            $('.mypCpaMember_nextReviewBtn').hide();
            $('.mypCpaMember_mypReviewBtn').show();
            $('.mypCpaMember_mypReviewBtn a').text("확인");
        }
        else{
            $('.mypCpaMember_preBtn').hide();
            $('.mypCpaMember_mypBtn').show();
            $('.mypCpaMember_nextBtn a').text("저장");

            //저장된(수정할) 데이터 조회
            mypCpaMemberReg.mypCpaMember_updateInfoList();
        }
    }
    //처음 등록 모드
    else{
        mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_aidMberInfo');
        $('.mypCpaMember_mypBtn').hide();
        $('.mypCpaMember_preBtn').show();
        $('.mypCpaMember_nextBtn a').text("다음");
        $('.mypCpaMember_mypReviewBtn').hide();
        $('.mypCpaMember_preReviewBtn').show();
        $('.mypCpaMember_nextReviewBtn').show();
        $('.mypCpaMember_nextReviewBtn a').text("제출");
    }

    //반려상태에서 재신청한 경우
    if($('#mypCpaMemberReg_regFlag').val() == "F"){
        mypCpaMemberReg.mypCpaMember_regFlagFList();
    }

}


mypCpaMemberReg.fn_init_events = function() {

    //부조회원 구분 & 사업자등록번호 저장(시작하기버튼)
    $("#mypCpaMemberReg_aidMberInfoSaveBtn").on("click",function(e) {

        var formData = $('#mypCpaMemberReg_aidMberInfoForm').serializeObject();
        formData.pin = $('#mypCpaMemberReg_pin').val();
        formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaMemberRegAidMberInfoSave.do";

        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMember_cpaCareerInfo");
    });

    //회원등록구분 저장(다음버튼)
    $("#mypCpaMemberReg_cpaCareerInfoSaveBtn").on("click",function(e) {
        var formData = $('#mypCpaMemberReg_cpaCareerInfoForm').serializeObject();
        formData.pin = $('#mypCpaMemberReg_pin').val();
        formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaMemberRegCpaCareerInfoSave.do";

        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMember_nmstOthbcInfo");
    });

    //회원구분 변경
    $('#mypCpaMember_mberFlag').on('change', function(){
        var mberFlag = $('#mypCpaMember_mberFlag').val();

        if(mberFlag =='A2020010'){		//전업
            $("#mypCpaMember_auditNm").prop('disabled', false);
            $("#mypCpaMember_auditId").prop('disabled', false);
            $("#mypCpaMember_auditNm").prop('readonly', true);
            $("#mypCpaMember_auditId").prop('readonly', true);
        }
        else{
            $("#mypCpaMember_auditNm").prop('disabled', true);
            $("#mypCpaMember_auditId").prop('disabled', true);
        }
    });

    //정보공개설정 저장(다음버튼)
    $("#mypCpaMemberReg_nmstOthbcInfoSaveBtn").on("click",function(e) {
        var formData = $('#mypCpaMemberReg_nmstOthbcInfoForm').serializeObject();
        formData.pin = $('#mypCpaMemberReg_pin').val();
        formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        formData.saveMode = $('#mypCpaMemberReg_saveMode').val();
        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaMemberRegNmstOthbcInfoSave.do";

        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMember_proFieldInfo");
    });

    //전문분야 저장(다음버튼)
    $("#mypCpaMemberReg_proFieldInfoSaveBtn").on("click",function(e) {
        var formData = $('#mypCpaMemberReg_proFieldInfoForm').serializeObject();
        formData.pin = $('#mypCpaMemberReg_pin').val();
        formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        formData.saveMode = $('#mypCpaMemberReg_saveMode').val();
        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaMemberRegProFieldInfoSave.do";

        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMember_proCareerInfo");
    });

    //전문분야 기타 클릭

    $('input[name="proFildCd[]"]').click(function(){

        mypCpaMemberReg.fn_check_proFieldEtc();

    });

    //전문분야 활동사항 저장(다음버튼)
    $("#mypCpaMemberReg_proCareerInfoSaveBtn").on("click",function(e) {
        var data = {};
        var proCareerInfoSize = $("select[name='proCareerInsttCd']").length;
        var proCareerInfoList  = [];

        for(var i=0; i<proCareerInfoSize; i++) {

            var item = {};
            item.insttCd = $("select[name='proCareerInsttCd']").eq(i).val();
            item.insttNm = $("input[name='proCareerInsttNm']").eq(i).val();
            item.rspOfc = $("input[name='proCareerRspOfc']").eq(i).val();
            item.chrgJob = $("input[name='proCareerChrgJob']").eq(i).val();
            item.bgnYm = $("input[name='proCareerBgnYm']").eq(i).val();
            item.endYm = $("input[name='proCareerEndYm']").eq(i).val();
            item.remark = $("input[name='proCareerRemark']").eq(i).val();
            item.careerSn = $("input[name='careerSn']").eq(i).val();
            proCareerInfoList.push(item);

        }
        data.pin = $('#mypCpaMemberReg_pin').val();
        data.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        data.saveMode = $('#mypCpaMemberReg_saveMode').val();
        data.list = JSON.stringify(proCareerInfoList);

        //수정모드일 경우 삭제할 전문분야 활동사항정보 담기
        if($('#mypCpaMemberReg_saveMode').val() == "U"){

            var careerSnDelSize = $("input[name='careerSnDel']").length;
            var careerSnDelList  = [];

            for(var i=0; i<careerSnDelSize; i++) {

                var item = {};
                item.careerSnDel = $("input[name='careerSnDel']").eq(i).val();
                careerSnDelList.push(item);

            }

            data.listDel = JSON.stringify(careerSnDelList);
        }

        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaPassRegProCareerInfoSave.do";
        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(data, url, "mypCpaMember_proCmitInfo");
    });

    //전문분야 활동사항추가 버튼클릭
    $("#mypCpaMember_proCareerAddBtn").on("click",function(e) {

        var result="";
        var classRemove="mypCpaMemberReg.mypCpaMemberReg_divRemove('proCareerAddDiv"+proCareerInfoAddCount+"','"+proCareerInfoAddCount+"')";

        result+= "<div class='form-title2 proCareerAddDiv"+proCareerInfoAddCount+"'>" +
            "                    <h2>추가 "+proCareerInfoAddCount+"</h2>" +
            "                    <button type='button' onclick="+classRemove+">delete</button>" +
            "                </div>" +
            "                <div class='responsive-form-box proCareerAddDiv"+proCareerInfoAddCount+"'>" +
            "                    <ul>" +
            "                        <li>" +
            "                            <div class='input-group required active'>" +
            "                                <label for='mypCpaMember_insttCd"+proCareerInfoAddCount+"'>기관분류</label>" +
            "                                <span class='select'>" +
            "                                    <select name='proCareerInsttCd' id='mypCpaMember_insttCd"+proCareerInfoAddCount+"'>" +
            "                                        <option value=''>선택하세요.</option>" +
            "                                        <option value='A2190010'>정부기관</option>" +
            "                                        <option value='A2190020'>법원등</option>" +
            "                                        <option value='A2190030'>정부산하위원회</option>" +
            "                                        <option value='A2190040'>지방자치단체</option>" +
            "                                        <option value='A2190050'>공공기관</option>" +
            "                                        <option value='A2190060'>세무서</option>" +
            "                                        <option value='A2199999'>기타</option>" +
            "                                    </select>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_insttNm"+proCareerInfoAddCount+"'>기관명</label>" +
            "                                <span class='input'><input type='text' name='proCareerInsttNm' id='mypCpaMember_insttNm"+proCareerInfoAddCount+"' placeholder='기관명을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_rspOfc"+proCareerInfoAddCount+"'>직위</label>" +
            "                                <span class='input'><input type='text' name='proCareerRspOfc' id='mypCpaMember_rspOfc"+proCareerInfoAddCount+"' placeholder='직위를 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_chrgJob"+proCareerInfoAddCount+"'>담당업무</label>" +
            "                                <span class='input'><input type='text' name='proCareerChrgJob' id='mypCpaMember_chrgJob"+proCareerInfoAddCount+"' placeholder='담당업무를 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_bgnYm"+proCareerInfoAddCount+"'>시작년월</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proCareerDatepicker' type='text' name='proCareerBgnYm' id='mypCpaMember_bgnYm"+proCareerInfoAddCount+"' placeholder='시작년월을 입력하세요.' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_endYm"+proCareerInfoAddCount+"'>종료년월</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proCareerDatepicker' type='text' name='proCareerEndYm' id='mypCpaMember_endYm"+proCareerInfoAddCount+"' placeholder='종료년월을 입력하세요.' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li class='block'>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_remark"+proCareerInfoAddCount+"'>비고</label>" +
            "                                <span class='input'><input type='text' name='proCareerRemark' id='mypCpaMember_remark"+proCareerInfoAddCount+"' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <input type='hidden' name='careerSn' id='mypCpaMember_careerSn"+proCareerInfoAddCount+"'/>" +
            "                    </ul>" +
            "                </div>";


        proCareerInfoAddCount++;

        $('#mypCpaMember_proCareerInfoAdd').append(result);

        $(".mypCpaMember_proCareerDatepicker").datepicker("destroy");

        $(".mypCpaMember_proCareerDatepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy-mm',
            calender:false
        });
    });

    //위원회 활동사항 저장(다음버튼)
    $("#mypCpaMemberReg_proCmitInfoSaveBtn").on("click",function(e) {
        var data = {};
        var proCmitInfoSize = $("select[name='proCmitCmitCd']").length;
        var proCmitInfoList  = [];

        for(var i=0; i<proCmitInfoSize; i++) {

            var item = {};
            item.cmitCd = $("select[name='proCmitCmitCd']").eq(i).val();
            item.cmitNm = $("input[name='proCmitCmitNm']").eq(i).val();
            item.entrstInstt = $("input[name='proCmitEntrstInstt']").eq(i).val();
            item.chrgJob = $("input[name='proCmitChrgJob']").eq(i).val();
            item.bgnYm = $("input[name='proCmitBgnYm']").eq(i).val();
            item.endYm = $("input[name='proCmitEndYm']").eq(i).val();
            item.remark = $("input[name='proCmitRemark']").eq(i).val();
            item.cmitSn = $("input[name='cmitSn']").eq(i).val();
            proCmitInfoList.push(item);

        }
        data.pin = $('#mypCpaMemberReg_pin').val();
        data.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        data.saveMode = $('#mypCpaMemberReg_saveMode').val();
        data.list = JSON.stringify(proCmitInfoList);

        //수정모드일 경우 삭제할 위원회 활동사항정보 담기
        if($('#mypCpaMemberReg_saveMode').val() == "U"){

            var cmitSnDelSize = $("input[name='cmitSnDel']").length;
            var cmitSnDelList  = [];

            for(var i=0; i<cmitSnDelSize; i++) {

                var item = {};
                item.cmitSnDel = $("input[name='cmitSnDel']").eq(i).val();
                cmitSnDelList.push(item);

            }

            data.listDel = JSON.stringify(cmitSnDelList);
        }

        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaPassRegProCmitInfoSave.do";
        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(data, url, "mypCpaMember_proLicenseInfo");
    });

    //위원회 활동사항 추가 버튼클릭
    $("#mypCpaMember_proCmitAddBtn").on("click",function(e) {

        var result="";
        var classRemove="mypCpaMemberReg.mypCpaMemberReg_divRemove('proCmitAddDiv"+proCmitInfoAddCount+"','"+proCmitInfoAddCount+"')";

        result+= "<div class='form-title2 proCmitAddDiv"+proCmitInfoAddCount+"'>" +
            "                    <h2>추가 "+proCmitInfoAddCount+"</h2>" +
            "                    <button type='button' onclick="+classRemove+">delete</button>" +
            "                </div>" +
            "                <div class='responsive-form-box proCmitAddDiv"+proCmitInfoAddCount+"'>" +
            "                    <ul>" +
            "                        <li>" +
            "                            <div class='input-group required active'>" +
            "                                <label for='mypCpaMember_cmitCd"+proCmitInfoAddCount+"'>기관분류</label>" +
            "                                <span class='select'>" +
            "                                    <select name='proCmitCmitCd' id='mypCpaMember_cmitCd"+proCmitInfoAddCount+"'>" +
            "                                        <option value=''>선택하세요.</option>" +
            "                                        <option value='A2190010'>정부기관</option>" +
            "                                        <option value='A2190020'>법원등</option>" +
            "                                        <option value='A2190030'>정부산하위원회</option>" +
            "                                        <option value='A2190040'>지방자치단체</option>" +
            "                                        <option value='A2190050'>공공기관</option>" +
            "                                        <option value='A2190060'>세무서</option>" +
            "                                        <option value='A2199999'>기타</option>" +
            "                                    </select>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_cmitNm"+proCmitInfoAddCount+"'>기관명</label>" +
            "                                <span class='input'><input type='text' name='proCmitCmitNm' id='mypCpaMember_cmitNm"+proCmitInfoAddCount+"' placeholder='기관명을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_entrstInstt"+proCmitInfoAddCount+"'>위촉기관</label>" +
            "                                <span class='input'><input type='text' name='proCmitEntrstInstt' id='mypCpaMember_entrstInstt"+proCmitInfoAddCount+"' placeholder='위촉기관을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_cmitChrgJob"+proCmitInfoAddCount+"'>담당업무</label>" +
            "                                <span class='input'><input type='text' name='proCmitChrgJob' id='mypCpaMember_cmitChrgJob"+proCmitInfoAddCount+"' placeholder='담당업무를 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_cmitBgnYm"+proCmitInfoAddCount+"'>시작년월</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proCmitInfoDatepicker' type='text' name='proCmitBgnYm' id='mypCpaMember_cmitBgnYm"+proCmitInfoAddCount+"' placeholder='시작년월을 입력하세요.' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_cmitEndYm"+proCmitInfoAddCount+"'>종료년월</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proCmitInfoDatepicker' type='text' name='proCmitEndYm' id='mypCpaMember_cmitEndYm"+proCmitInfoAddCount+"' placeholder='종료년월을 입력하세요.' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li class='block'>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_cmitRemark"+proCmitInfoAddCount+"'>비고</label>" +
            "                                <span class='input'><input type='text' name='proCmitRemark' id='mypCpaMember_cmitRemark"+proCmitInfoAddCount+"'/></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <input type='hidden' name='cmitSn' id='mypCpaMember_cmitSn"+proCmitInfoAddCount+"'/>" +
            "                    </ul>" +
            "                </div>";


        proCmitInfoAddCount++;

        $('#mypCpaMember_proCmitInfoAdd').append(result);

        $(".mypCpaMember_proCmitInfoDatepicker").datepicker("destroy");

        $(".mypCpaMember_proCmitInfoDatepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy-mm'
        });
    });

    //자격/면허 저장(다음버튼)
    $("#mypCpaMemberReg_proLicenseInfoSaveBtn").on("click",function(e) {
        var data = {};
        var proLicenseInfoSize = $("select[name='proLicenseLcnsCd']").length;
        var proLicenseInfoList  = [];

        for(var i=0; i<proLicenseInfoSize; i++) {

            var item = {};
            item.lcnsCd = $("select[name='proLicenseLcnsCd']").eq(i).val();
            item.lcnsNm = $("input[name='proLicenseLcnsNm']").eq(i).val();
            item.issuInstt = $("input[name='proLicenseIssuInstt']").eq(i).val();
            item.acqsYm = $("input[name='proLicenseAcqsYm']").eq(i).val();
            item.remark = $("input[name='proLicenseRemark']").eq(i).val();
            item.lcnsSn = $("input[name='lcnsSn']").eq(i).val();
            proLicenseInfoList.push(item);

        }
        data.pin = $('#mypCpaMemberReg_pin').val();
        data.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        data.saveMode = $('#mypCpaMemberReg_saveMode').val();
        data.list = JSON.stringify(proLicenseInfoList);

        //수정모드일 경우 삭제할 자격/면허 정보 담기
        if($('#mypCpaMemberReg_saveMode').val() == "U"){

            var lcnsSnDelSize = $("input[name='lcnsSnDel']").length;
            var lcnsSnDelList  = [];

            for(var i=0; i<lcnsSnDelSize; i++) {

                var item = {};
                item.lcnsSnDel = $("input[name='lcnsSnDel']").eq(i).val();
                lcnsSnDelList.push(item);

            }

            data.listDel = JSON.stringify(lcnsSnDelList);
        }

        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaPassRegProLicenseInfoSave.do";
        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(data, url, "mypCpaMember_proLtrryInfo");
    });

    //자격/면허 추가 버튼클릭
    $("#mypCpaMember_proLicenseAddBtn").on("click",function(e) {

        var result="";
        var classRemove="mypCpaMemberReg.mypCpaMemberReg_divRemove('proLicenseAddDiv"+proLicenseInfoAddCount+"','"+proLicenseInfoAddCount+"')";

        result+= "<div class='form-title2 proLicenseAddDiv"+proLicenseInfoAddCount+"'>" +
            "                    <h2>추가 "+proLicenseInfoAddCount+"</h2>" +
            "                    <button type='button' onclick="+classRemove+">delete</button>" +
            "                </div>" +
            "                <div class='responsive-form-box proLicenseAddDiv"+proLicenseInfoAddCount+"'>" +
            "                    <ul>" +
            "                        <li>" +
            "                            <div class='input-group required active'>" +
            "                                <label for='mypCpaMember_lcnsCd"+proLicenseInfoAddCount+"'>자격 / 면허구분</label>" +
            "                                <span class='select'>" +
            "                                    <select name='proLicenseLcnsCd' id='mypCpaMember_lcnsCd"+proLicenseInfoAddCount+"'>" +
            "                                        <option value=''>선택하세요.</option>" +
            "                                        <option value='A2200010'>행정고시</option>" +
            "                                        <option value='A2200020'>사법고시</option>" +
            "                                        <option value='A2200030'>법무사</option>" +
            "                                        <option value='A2209999'>기타</option>" +
            "                                    </select>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_lcnsNm"+proLicenseInfoAddCount+"'>자격/면허명칭</label>" +
            "                                <span class='input'><input type='text' name='proLicenseLcnsNm' id='mypCpaMember_lcnsNm"+proLicenseInfoAddCount+"' placeholder='자격/면허명칭을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_issuInstt"+proLicenseInfoAddCount+"'>부여기관</label>" +
            "                                <span class='input'><input type='text' name='proLicenseIssuInstt' id='mypCpaMember_issuInstt"+proLicenseInfoAddCount+"' placeholder='부여기관을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_acqsYm"+proLicenseInfoAddCount+"'>취득년월</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proLicenseInfoDatepicker' type='text' id='mypCpaMember_acqsYm"+proLicenseInfoAddCount+"' name='proLicenseAcqsYm' placeholder='취득년월을 입력하세요' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li class='block'>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_proLicenseInfoDatepicker"+proLicenseInfoAddCount+"'>비고</label>" +
            "                                <span class='input'><input type='text' name='proLicenseRemark' id='mypCpaMember_licenseRemark"+proLicenseInfoAddCount+"'/></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <input type='hidden' name='lcnsSn' id='mypCpaMember_lcnsSn"+proLicenseInfoAddCount+"'/>" +
            "                    </ul>" +
            "                </div>" ;


        proLicenseInfoAddCount++;

        $('#mypCpaMember_proLicenseInfoAdd').append(result);

        $(".mypCpaMember_proLicenseInfoDatepicker").datepicker("destroy");

        $(".mypCpaMember_proLicenseInfoDatepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy-mm'
        });
    });

    //학술활동 저장(다음버튼)
    $("#mypCpaMemberReg_proLtrryInfoSaveBtn").on("click",function(e) {
        var data = {};
        var proLtrryInfoSize = $("input[name='proLtrryLtrryYear']").length;
        var proLtrryInfoList  = [];

        for(var i=0; i<proLtrryInfoSize; i++) {

            var item = {};
            item.ltrryYear = $("input[name='proLtrryLtrryYear']").eq(i).val();
            item.subjectNm = $("input[name='proLtrrySubjectNm']").eq(i).val();
            item.mainCn = $("input[name='proLtrryMainCn']").eq(i).val();
            item.remark = $("input[name='proLtrryRemark']").eq(i).val();
            item.ltrrySn = $("input[name='ltrrySn']").eq(i).val();
            proLtrryInfoList.push(item);

        }
        data.pin = $('#mypCpaMemberReg_pin').val();
        data.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        data.saveMode = $('#mypCpaMemberReg_saveMode').val();
        data.list = JSON.stringify(proLtrryInfoList);

        //수정모드일 경우 삭제할 학술활동 정보 담기
        if($('#mypCpaMemberReg_saveMode').val() == "U"){

            var ltrrySnDelSize = $("input[name='ltrrySnDel']").length;
            var ltrrySnDelList  = [];

            for(var i=0; i<ltrrySnDelSize; i++) {

                var item = {};
                item.ltrrySnDel = $("input[name='ltrrySnDel']").eq(i).val();
                ltrrySnDelList.push(item);

            }

            data.listDel = JSON.stringify(ltrrySnDelList);
        }

        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaPassRegProLtrryInfoSave.do";
        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(data, url, "mypCpaMember_proWnpzInfo");
    });

    //학술활동 추가 버튼클릭
    $("#mypCpaMember_proLtrryAddBtn").on("click",function(e) {

        var result="";
        var classRemove="mypCpaMemberReg.mypCpaMemberReg_divRemove('proLtrryAddDiv"+proLtrryInfoAddCount+"','"+proLtrryInfoAddCount+"')";

        result+= "<div class='form-title2 proLtrryAddDiv"+proLtrryInfoAddCount+"'>" +
            "                    <h2>추가 "+proLtrryInfoAddCount+"</h2>" +
            "                    <button type='button' onclick="+classRemove+">delete</button>" +
            "                </div>" +
            "                <div class='responsive-form-box proLtrryAddDiv"+proLtrryInfoAddCount+"'>" +
            "                    <ul>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_ltrryYear"+proLtrryInfoAddCount+"'>저술년도</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proLtrryInfoDatepicker' type='text' name='proLtrryLtrryYear' id='mypCpaMember_ltrryYear"+proLtrryInfoAddCount+"' placeholder='저술년도를 입력하세요.' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_subjectNm"+proLtrryInfoAddCount+"'>제목/저서명</label>" +
            "                                <span class='input'><input type='text' name='proLtrrySubjectNm' id='mypCpaMember_subjectNm"+proLtrryInfoAddCount+"' placeholder='제목/저서명을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_mainCn"+proLtrryInfoAddCount+"'>주요내용</label>" +
            "                                <span class='input'><input type='text' name='proLtrryMainCn' id='mypCpaMember_mainCn"+proLtrryInfoAddCount+"'/></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li class='block'>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_ltrryRemark"+proLtrryInfoAddCount+"'>비고</label>" +
            "                                <span class='input'><input type='text' name='proLtrryRemark' id='mypCpaMember_ltrryRemark"+proLtrryInfoAddCount+"'/></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <input type='hidden' name='ltrrySn' id='mypCpaMember_ltrrySn"+proLtrryInfoAddCount+"'/>" +
            "                    </ul>" +
            "                </div>";


        proLtrryInfoAddCount++;

        $('#mypCpaMember_proLtrryInfoAdd').append(result);

        $(".mypCpaMember_proLtrryInfoDatepicker").datepicker("destroy");

        $(".mypCpaMember_proLtrryInfoDatepicker").datepicker({
            changeMonth: false,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy',
            onClose: function(dateText, inst) {
                $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            }
        });
    });

    //수상내용 저장(다음버튼)
    $("#mypCpaMemberReg_proWnpzInfoSaveBtn").on("click",function(e) {
        var data = {};
        var proWnpzInfoSize = $("input[name='proWnpzWnpzYm']").length;
        var proWnpzInfoList  = [];

        for(var i=0; i<proWnpzInfoSize; i++) {

            var item = {};
            item.wnpzYm = $("input[name='proWnpzWnpzYm']").eq(i).val();
            item.wnpzNm = $("input[name='proWnpzWnpzNm']").eq(i).val();
            item.relateInstt = $("input[name='proWnpzRelateInstt']").eq(i).val();
            item.remark = $("input[name='proWnpzRemark']").eq(i).val();
            item.wnpzSn = $("input[name='wnpzSn']").eq(i).val();
            proWnpzInfoList.push(item);

        }
        data.pin = $('#mypCpaMemberReg_pin').val();
        data.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
        data.saveMode = $('#mypCpaMemberReg_saveMode').val();
        data.list = JSON.stringify(proWnpzInfoList);

        //수정모드일 경우 삭제할 수상내용 정보 담기
        if($('#mypCpaMemberReg_saveMode').val() == "U"){

            var wnpzSnDelSize = $("input[name='wnpzSnDel']").length;
            var wnpzSnDelList  = [];

            for(var i=0; i<wnpzSnDelSize; i++) {

                var item = {};
                item.wnpzSnDel = $("input[name='wnpzSnDel']").eq(i).val();
                wnpzSnDelList.push(item);

            }

            data.listDel = JSON.stringify(wnpzSnDelList);
        }

        var url = mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaPassRegProWnpzInfoSave.do";
        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(data, url, "mypCpaMember_atchFileInfo");
    });

    //수상내용 추가 버튼클릭
    $("#mypCpaMember_proWnpzAddBtn").on("click",function(e) {

        var result="";
        var classRemove="mypCpaMemberReg.mypCpaMemberReg_divRemove('proWnpzAddDiv"+proWnpzInfoAddCount+"','"+proWnpzInfoAddCount+"')";

        result+= "<div class='form-title2 proWnpzAddDiv"+proWnpzInfoAddCount+"'>" +
            "                    <h2>추가 "+proWnpzInfoAddCount+"</h2>" +
            "                    <button type='button' onclick="+classRemove+">delete</button>" +
            "                </div>" +
            "                <div class='responsive-form-box proWnpzAddDiv"+proWnpzInfoAddCount+"'>" +
            "                    <ul>" +
            "                        <li>" +
            "                            <div class='input-group required'>" +
            "                                <label for='mypCpaMember_wnpzYm"+proWnpzInfoAddCount+"'>수상년월</label>" +
            "                                <span class='input cal'>" +
            "                                    <input class='mypCpaMember_proWnpzInfoDatepicker' type='text' name='proWnpzWnpzYm' id='mypCpaMember_wnpzYm"+proWnpzInfoAddCount+"' placeholder='수상년월를 입력하세요.' />" +
            "                                    <button type='button' class='calendar-button'>calendar</button>" +
            "                                </span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_wnpzNm"+proWnpzInfoAddCount+"'>내용 (수상명)</label>" +
            "                                <span class='input'><input type='text' name='proWnpzWnpzNm' id='mypCpaMember_wnpzNm"+proWnpzInfoAddCount+"' placeholder='내용 (수상명)을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_relateInstt"+proWnpzInfoAddCount+"'>부여기관</label>" +
            "                                <span class='input'><input type='text' name='proWnpzRelateInstt' id='mypCpaMember_relateInstt"+proWnpzInfoAddCount+"' placeholder='부여기관을 입력하세요.' /></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <li>" +
            "                            <div class='input-group'>" +
            "                                <label for='mypCpaMember_wnpzRemark"+proWnpzInfoAddCount+"'>비고</label>" +
            "                                <span class='input'><input type='text' name='proWnpzRemark' id='mypCpaMember_wnpzRemark"+proWnpzInfoAddCount+"'/></span>" +
            "                            </div>" +
            "                        </li>" +
            "                        <input type='hidden' name='wnpzSn' id='mypCpaMember_wnpzSn"+proWnpzInfoAddCount+"'/>" +
            "                    </ul>" +
            "                </div>";


        proWnpzInfoAddCount++;

        $('#mypCpaMember_proWnpzInfoAdd').append(result);

        $(".mypCpaMember_proWnpzInfoDatepicker").datepicker("destroy");

        $(".mypCpaMember_proWnpzInfoDatepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy-mm'
        });

        $('.ui-datepicker-calendar').css("display","none");
        $('.ui-datepicker-month').css("display","none");
        $('.ui-datepicker-prev').css("display","none");
    });

    //첨부파일 (첨부서류) 저장(다음버튼)
    $("#mypCpaMemberReg_atchFileInfoSaveBtn").on("click",function(e) {
        var form = $('#mypCpaMemberReg_atchFileInfoForm')[0];
        var formData = new FormData(form);
        formData.append("pin", $('#mypCpaMemberReg_pin').val());
        formData.append("cpaSn", $('#mypCpaMemberReg_cpaSn').val());

        $.ajax({
            cache : false,
            url : mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaMemberRegAtchFileInfoSave.do",
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
                    mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_aidDuesInfo');
                }
            }, // success
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
        }); // $.ajax */
    });

    //등록 회비 납부 결제(다음버튼)
    $("#mypCpaMemberReg_aidDuesInfoSaveBtn").on("click",function(e) {
        mypCpaMemberReg.mypCpaMemberReg_tabMove('mypCpaMember_reviewInfo');
        /*var formData = $('#mypCpaMemberReg_agreeForm').serializeObject();
        formData.pin = $('#mypCpaMemberReg_pin').val();
        var url = "/kicpa/myp/mypCpaMemberRegAgreeSave.do";

        mypCpaMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMemberReg_apntcCpaHistInfo");
        */
    });

    //제출버튼 클릭
    $("#mypCpaMember_reviewInfoSaveBtn").on("click",function(e) {

        if($('#mypCpaMemberReg_saveMode').val() == "U"){
            location.replace(mypCpaMemberReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaMemberReg_pin').val());
        }
        else{
            if(confirm("                      해당 내용으로 제출 하시겠습니까?")){

                var formData = {};
                formData.pin = $('#mypCpaMemberReg_pin').val();
                formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();

                $.ajax({
                    url : mypCpaMemberReg.getContextPath()+"/kicpa/myp/mypCpaMemberSubmit.do",
                    type : "POST",
                    data : formData,
                    success : function(data) {
                        location.replace(mypCpaMemberReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaMemberReg_pin').val());
                    }
                });
            }
        }
    });

    //가입 감사인 클릭 (레이어 팝업 띄우기)
    $("#mypCpaMember_auditNm").on("click",function(e) {

        $('#mypCpaMemberPop_auditPopList *').remove();

        var result="";

        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaMemberPop_auditPopList').append(result);
        $('#mypCpaMemberPop_auditPop').show();

    });

    //가입 감사인 팝업 검색 클릭
    $("#mypCpaMemberPop_auditPopSearchBtn").on("click",function(e) {
        mypCpaMemberReg.selectAuditPopSearchListSearch();

    });

    //가입 감사인 팝업 선택 클릭
    $("#mypCpaMemberPop_auditPopSaveBtn").on("click",function(e) {

        $('#mypCpaMember_auditNm').val($('#mypCpaMemberPop_auditPopSetAudNm').val());
        $('#mypCpaMember_auditId').val($('#mypCpaMemberPop_auditPopSetAudId').val());
        $('#mypCpaMemberPop_auditPopSetAudNm').val('');
        $('#mypCpaMemberPop_auditPopSetAudId').val('');
        $('#mypCpaMemberPop_auditPopSearchText').val('');
        $('#mypCpaMemberPop_auditPop').hide();

    });

    //가입 감사인 팝업 취소 클릭
    $("#mypCpaMemberPop_auditPopCloseBtn").on("click",function(e) {
        $('#mypCpaMemberPop_auditPop').hide();
        $('#mypCpaMemberPop_auditPopSetAudNm').val('');
        $('#mypCpaMemberPop_auditPopSetAudId').val('');
        $('#mypCpaMemberPop_auditPopSearchText').val('');
    });

    //close 버튼 클릭
    $("#mypCpaMember_closeBtn").on("click",function(e) {
        alert("종료하시겠습니까?\n" +
            "작성중이던 정보는 삭제됩니다.\n");

        parent.ClosePage();
    });
}

//수정할 데이터 조회(수정모드)
mypCpaMemberReg.mypCpaMember_updateInfoList = function() {

    var updateInfo_param = {};
    updateInfo_param.pin = $('#mypCpaMemberReg_pin').val();
    updateInfo_param.movePage = $('#mypCpaMemberReg_movePage').val();

    $.ajax({
        url : mypCpaMemberReg.getContextPath()+"/kicpa/myp/selectMypCpaMemberRegUpdateInfoList.do",
        type : "POST",
        data : updateInfo_param,
        success : function(data) {
            mypCpaMemberReg.mypCpaMember_updateInfoList_success(data);
        }
    });
};

//탭 이동
mypCpaMemberReg.mypCpaMemberReg_tabMove = function(flag) {

    //입력화면 show/hide
    $('.mypCpaMember_tabMove').hide();
    $('#'+flag).show();

    //왼쪽화면 active
    $('.mypCpaMember_activeMove').removeClass('active');
    $('#'+flag+'Active').addClass('active');


    if($('#mypCpaMemberReg_saveMode').val() == "U"){

    }
    else{
        if(flag == "mypCpaMember_reviewInfo"){                     //검토 및 제출
            var reviewInfo_param = {};
            reviewInfo_param.pin = $('#mypCpaMemberReg_pin').val();
            reviewInfo_param.cpaSn = $('#mypCpaMemberReg_cpaSn').val();

            $.ajax({
                dataType:"json",
                url: mypCpaMemberReg.getContextPath()+"/kicpa/myp/selectmypCpaMemberRegReviewInfo.do",
                data:reviewInfo_param,
                success: function (data) {
                    mypCpaMemberReg.selectmypCpaMemberRegReviewInfo_success(data);
                },
                error: function (status, e) {
                    alert("데이터 요청에 실패하였습니다.\r status : " + status);
                }
            });
        }
    }

}

//회원 정보 저장(다음 클릭시 해당 탭 내용 저장)
mypCpaMemberReg.mypCpaMemberReg_memberInfoSave = function(formData, url, flag) {

    //mypCpaMemberReg.mypCpaMemberReg_tabMove(flag);
    $.ajax({
        url : url,
        type : "POST",
        data : formData,
        success : function(data) {

            if(!isNull(data.message)){
                alert(data.message);
            }
            else{
                if($('#mypCpaMemberReg_saveMode').val() == "U"){
                    location.replace(mypCpaMemberReg.getContextPath()+'/kicpa/myp/myPage.do?Pin='+$('#mypCpaMemberReg_pin').val());
                }
                else{
                    if(!isNull(data.cpaSn) && isNull($('#mypCpaMemberReg_cpaSn').val())){
                        $('#mypCpaMemberReg_cpaSn').val(data.cpaSn);
                    }
                    mypCpaMemberReg.mypCpaMemberReg_tabMove(flag);
                }
            }
        }
    });
}

//사업자등록번호 입력
mypCpaMemberReg.inputBizrNumber = function(obj) {

    var number = obj.value.replace(/[^0-9]/g, "");
    var bizrNo = "";

    if(number.length < 4) {
        return number;
    } else if(number.length < 5) {
        bizrNo += number.substr(0, 3);
        bizrNo += "-";
        bizrNo += number.substr(3);
    } else {
        bizrNo += number.substr(0, 3);
        bizrNo += "-";
        bizrNo += number.substr(3, 2);
        bizrNo += "-";
        bizrNo += number.substr(5);
    }
    obj.value = bizrNo;

}

//전문활동 기타 클릭
mypCpaMemberReg.fn_check_proFieldEtc = function (){
    if($('input:checkbox[name="proFildCd[]"][value="A2180199"]').is(':checked')){
        $('#mypCpaMember_proFildCdEtc199').prop('disabled', false);
    }
    else{
        $('#mypCpaMember_proFildCdEtc199').prop('disabled', true);
        $('#mypCpaMember_proFildCdEtc199').val('');
    }

    if($('input:checkbox[name="proFildCd[]"][value="A2180299"]').is(':checked')){
        $('#mypCpaMember_proFildCdEtc299').prop('disabled', false);
    }
    else{
        $('#mypCpaMember_proFildCdEtc299').prop('disabled', true);
        $('#mypCpaMember_proFildCdEtc299').val('');
    }

    if($('input:checkbox[name="proFildCd[]"][value="A2180399"]').is(':checked')){
        $('#mypCpaMember_proFildCdEtc399').prop('disabled', false);
    }
    else{
        $('#mypCpaMember_proFildCdEtc399').prop('disabled', true);
        $('#mypCpaMember_proFildCdEtc399').val('');
    }

    if($('input:checkbox[name="proFildCd[]"][value="A2180499"]').is(':checked')){
        $('#mypCpaMember_proFildCdEtc499').prop('disabled', false);
    }
    else{
        $('#mypCpaMember_proFildCdEtc499').prop('disabled', true);
        $('#mypCpaMember_proFildCdEtc499').val('');
    }

    if($('input:checkbox[name="proFildCd[]"][value="A2189999"]').is(':checked')){
        $('#mypCpaMember_proFildCdEtc999').prop('disabled', false);
    }
    else{
        $('#mypCpaMember_proFildCdEtc999').prop('disabled', true);
        $('#mypCpaMember_proFildCdEtc999').val('');
    }
}

//div 삭제
mypCpaMemberReg.mypCpaMemberReg_divRemove = function (divId, rowNum){

    //수정모드일 경우 삭제 정보 hidden에 담기
    if($('#mypCpaMemberReg_saveMode').val() == "U"){
        //전문분야 활동사항
        if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proCareerInfo"){
            var careerSn = $('#mypCpaMember_careerSn'+rowNum).val();
            var result="";

            if(!isNull(careerSn)){
                result = "<input type='hidden' name='careerSnDel' value='"+careerSn+"'/>";

                $('#mypCpaMember_proCareerInfoDel').append(result);
            }
        }
        //위원회 활동사항
        else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proCmitInfo"){
            var cmitSn = $('#mypCpaMember_cmitSn'+rowNum).val();
            var result="";

            if(!isNull(cmitSn)){
                result = "<input type='hidden' name='cmitSnDel' value='"+cmitSn+"'/>";

                $('#mypCpaMember_proCmitInfoDel').append(result);
            }
        }
        //자격/면허
        else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proLicenseInfo"){
            var lcnsSn = $('#mypCpaMember_lcnsSn'+rowNum).val();
            var result="";

            if(!isNull(lcnsSn)){
                result = "<input type='hidden' name='lcnsSnDel' value='"+lcnsSn+"'/>";

                $('#mypCpaMember_proLicenseInfoDel').append(result);
            }
        }
        //학술활동
        else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proLtrryInfo"){
            var ltrrySn = $('#mypCpaMember_ltrrySn'+rowNum).val();
            var result="";

            if(!isNull(ltrrySn)){
                result = "<input type='hidden' name='ltrrySnDel' value='"+ltrrySn+"'/>";

                $('#mypCpaMember_proLtrryInfoDel').append(result);
            }
        }
        //수상내용
        else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proWnpzInfo"){
            var wnpzSn = $('#mypCpaMember_wnpzSn'+rowNum).val();
            var result="";

            if(!isNull(wnpzSn)){
                result = "<input type='hidden' name='wnpzSnDel' value='"+wnpzSn+"'/>";

                $('#mypCpaMember_proWnpzInfoDel').append(result);
            }
        }
    }

    $("."+divId).remove();
}

//검토 및 제출 list
mypCpaMemberReg.selectmypCpaMemberRegReviewInfo_success = function (result){

    //회원정보(부조회비, 사업자번호, 회원구분, 첨부파일)
    $('#mypCpaMemberReviewInfo_aidMberFlag').text(result.cpaMemberRegReviewInfoList[0].aidMberFlagNm);
    $('#mypCpaMemberReviewInfo_bizrNo').text(result.cpaMemberRegReviewInfoList[0].bizrNo);
    $('#mypCpaMemberReviewInfo_registDe').text(result.cpaMemberRegReviewInfoList[0].registDe);
    $('#mypCpaMemberReviewInfo_mberFlag').text(result.cpaMemberRegReviewInfoList[0].mberFlagNm);
    $('#mypCpaMemberReviewInfo_audit').text(result.cpaMemberRegReviewInfoList[0].auditNm + "    "+result.cpaMemberRegReviewInfoList[0].auditId);
    $('#mypCpaMemberReviewInfo_auditOfcps').text(result.cpaMemberRegReviewInfoList[0].auditOfcpsNm);
    $('#mypCpaMemberReviewInfo_passCrtiFileId').text(result.cpaMemberRegReviewInfoList[0].passCrtiFileId);
    $('#mypCpaMemberReviewInfo_rsumFileId').text(result.cpaMemberRegReviewInfoList[0].rsumFileId);
    $('#mypCpaMemberReviewInfo_apntcEndFileId').text(result.cpaMemberRegReviewInfoList[0].apntcEndFileId);
    $('#mypCpaMemberReviewInfo_atchFileId').text(result.cpaMemberRegReviewInfoList[0].atchFileId);

    //정보공개설정
    $('#mypCpaMemberReviewInfo_ofcAdresYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcAdresYnNm);
    $('#mypCpaMemberReviewInfo_ofcNameYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcNameYnNm);
    $('#mypCpaMemberReviewInfo_emailYn').text(result.cpaMemberRegNmstOthbcInfoList[0].emailYnNm);
    $('#mypCpaMemberReviewInfo_ofcTelYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcTelYnNm);
    $('#mypCpaMemberReviewInfo_photoYn').text(result.cpaMemberRegNmstOthbcInfoList[0].photoYnNm);
    $('#mypCpaMemberReviewInfo_ofcFaxYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcFaxYnNm);

    //전문분야
    if(result.cpaMemberRegProFieldInfoListSize>0){
        var proFildCdNm100 = "";
        var proFildCdNm200 = "";
        var proFildCdNm300 = "";
        var proFildCdNm400 = "";
        var proFildCdNm999 = "";

        for(var i=0; i<result.cpaMemberRegProFieldInfoListSize; i++){
            if(isNull(result.cpaMemberRegProFieldInfoList[i].remark)){
                result.cpaMemberRegProFieldInfoList[i].remark ="";
            }
            if(result.cpaMemberRegProFieldInfoList[i].proFildCd == "A2180199"){result.cpaMemberRegProFieldInfoList[i].proFildCdNm= result.cpaMemberRegProFieldInfoList[i].proFildCdNm +"("+result.cpaMemberRegProFieldInfoList[i].remark+")";}
            if(result.cpaMemberRegProFieldInfoList[i].proFildCd == "A2180299"){result.cpaMemberRegProFieldInfoList[i].proFildCdNm= result.cpaMemberRegProFieldInfoList[i].proFildCdNm +"("+result.cpaMemberRegProFieldInfoList[i].remark+")";}
            if(result.cpaMemberRegProFieldInfoList[i].proFildCd == "A2180399"){result.cpaMemberRegProFieldInfoList[i].proFildCdNm= result.cpaMemberRegProFieldInfoList[i].proFildCdNm +"("+result.cpaMemberRegProFieldInfoList[i].remark+")";}
            if(result.cpaMemberRegProFieldInfoList[i].proFildCd == "A2180499"){result.cpaMemberRegProFieldInfoList[i].proFildCdNm= result.cpaMemberRegProFieldInfoList[i].proFildCdNm +"("+result.cpaMemberRegProFieldInfoList[i].remark+")";}

            if(result.cpaMemberRegProFieldInfoList[i].proFildCdFlag == 1){
                if(proFildCdNm100 == ""){
                    proFildCdNm100 = result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
                else{
                     proFildCdNm100 = proFildCdNm100 + "," + result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
            }
            if(result.cpaMemberRegProFieldInfoList[i].proFildCdFlag == 2){
                if(proFildCdNm200 == ""){
                    proFildCdNm200 = result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
                else{
                    proFildCdNm200 = proFildCdNm200 + "," + result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
            }
            if(result.cpaMemberRegProFieldInfoList[i].proFildCdFlag == 3){
                if(proFildCdNm300 == ""){
                    proFildCdNm300 = result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
                else{
                    proFildCdNm300 = proFildCdNm300 + "," + result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
            }
            if(result.cpaMemberRegProFieldInfoList[i].proFildCdFlag == 4){
                if(proFildCdNm400 == ""){
                    proFildCdNm400 = result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
                else{
                    proFildCdNm400 = proFildCdNm400 + "," + result.cpaMemberRegProFieldInfoList[i].proFildCdNm;
                }
            }
            if(result.cpaMemberRegProFieldInfoList[i].proFildCdFlag == 9){
                proFildCdNm999 = result.cpaMemberRegProFieldInfoList[i].remark;
            }

        }

        $('#mypCpaMemberReviewInfo_proFildCd100').text(proFildCdNm100);
        $('#mypCpaMemberReviewInfo_proFildCd200').text(proFildCdNm200);
        $('#mypCpaMemberReviewInfo_proFildCd300').text(proFildCdNm300);
        $('#mypCpaMemberReviewInfo_proFildCd400').text(proFildCdNm400);
        $('#mypCpaMemberReviewInfo_proFildCd999').text(proFildCdNm999);
    }

    //등록 회비
    $('#mypCpaMemberReviewInfo_etc1').text("3,650,000");
    $('#mypCpaMemberReviewInfo_etc2').text("미납");

    //전문분야 활동사항
    if(result.cpaMemberRegProCareerInfoListSize>0){
        var addProCareer="";
        var reviewInfoProCareerrAddCnt =1;

        addProCareer+= "<h2>전문분야 활동사항</h2><div class='final-box-inner'>";
        
        for(var i=0; i<result.cpaMemberRegProCareerInfoListSize; i++){

            addProCareer+= "<table>"
                +"<colgroup><col style='width: 206px' /><col/></colgroup>"
                +"<thead><tr><th colspan='2'>추가 "+reviewInfoProCareerrAddCnt+"</th></tr></thead>"
                +"<tbody>"
                +"<tr><th>기관분류</th><td>"+result.cpaMemberRegProCareerInfoList[i].insttCdNm+"</td></tr>"
                +"<tr><th>기관명</th><td>"+result.cpaMemberRegProCareerInfoList[i].insttNm+"</td></tr>"
                +"<tr><th>직위</th><td>"+result.cpaMemberRegProCareerInfoList[i].rspOfc+"</td></tr>"
                +"<tr><th>담당업무</th><td>"+result.cpaMemberRegProCareerInfoList[i].chrgJob+"</td></tr>"
                +"<tr><th>시작년월</th><td>"+result.cpaMemberRegProCareerInfoList[i].bgnYm+"</td></tr>"
                +"<tr><th>종료년월</th><td>"+result.cpaMemberRegProCareerInfoList[i].endYm+"</td></tr>"
                +"<tr><th>비고</th><td>"+result.cpaMemberRegProCareerInfoList[i].remark+"</td></tr>"
                +"</tbody>"
                +"</table>"

            reviewInfoProCareerrAddCnt++;
        }

        addProCareer+= "</div>";

        $('#mypCpaMember_reviewInfoProCareerAdd').append(addProCareer);
    }

    //위원회 활동사항
    if(result.cpaMemberRegProCmitInfoListSize>0){
        var addProCmit="";
        var reviewInfoProCmitAddCnt =1;

        addProCmit+= "<h2>위원회 활동사항</h2><div class='final-box-inner'>";

        for(var i=0; i<result.cpaMemberRegProCmitInfoListSize; i++){

            addProCmit+= "<table>"
                +"<colgroup><col style='width: 206px' /><col/></colgroup>"
                +"<thead><tr><th colspan='2'>추가 "+reviewInfoProCmitAddCnt+"</th></tr></thead>"
                +"<tbody>"
                +"<tr><th>기관분류</th><td>"+result.cpaMemberRegProCmitInfoList[i].cmitCdNm+"</td></tr>"
                +"<tr><th>기관명</th><td>"+result.cpaMemberRegProCmitInfoList[i].cmitNm+"</td></tr>"
                +"<tr><th>위촉기관</th><td>"+result.cpaMemberRegProCmitInfoList[i].entrstInstt+"</td></tr>"
                +"<tr><th>담당업무</th><td>"+result.cpaMemberRegProCmitInfoList[i].chrgJob+"</td></tr>"
                +"<tr><th>시작년월</th><td>"+result.cpaMemberRegProCmitInfoList[i].bgnYm+"</td></tr>"
                +"<tr><th>종료년월</th><td>"+result.cpaMemberRegProCmitInfoList[i].endYm+"</td></tr>"
                +"<tr><th>비고</th><td>"+result.cpaMemberRegProCmitInfoList[i].remark+"</td></tr>"
                +"</tbody>"
                +"</table>"

            reviewInfoProCmitAddCnt++;
        }

        addProCmit+= "</div>";

        $('#mypCpaMember_reviewInfoProCmitAdd').append(addProCmit);
    }

    //자격/면허
    if(result.cpaMemberRegProLicenseInfoListSize>0){
        var addProLicense="";
        var reviewInfoProLicenseAddCnt =1;

        addProLicense+= "<h2>자격/면허</h2><div class='final-box-inner'>";

        for(var i=0; i<result.cpaMemberRegProLicenseInfoListSize; i++){

            addProLicense+= "<table>"
                +"<colgroup><col style='width: 206px' /><col/></colgroup>"
                +"<thead><tr><th colspan='2'>추가 "+reviewInfoProLicenseAddCnt+"</th></tr></thead>"
                +"<tbody>"
                +"<tr><th>자격/면허구분</th><td>"+result.cpaMemberRegProLicenseInfoList[i].lcnsCdNm+"</td></tr>"
                +"<tr><th>자격/면허명칭</th><td>"+result.cpaMemberRegProLicenseInfoList[i].lcnsNm+"</td></tr>"
                +"<tr><th>부여기관</th><td>"+result.cpaMemberRegProLicenseInfoList[i].acqsYm+"</td></tr>"
                +"<tr><th>취득년월</th><td>"+result.cpaMemberRegProLicenseInfoList[i].issuInstt+"</td></tr>"
                +"<tr><th>비고</th><td>"+result.cpaMemberRegProLicenseInfoList[i].remark+"</td></tr>"
                +"</tbody>"
                +"</table>"

            reviewInfoProLicenseAddCnt++;
        }

        addProLicense+= "</div>";

        $('#mypCpaMember_reviewInfoProLicenseAdd').append(addProLicense);
    }

    //학술활동
    if(result.cpaMemberRegProLtrryInfoListSize>0){
        var addProLtrry="";
        var reviewInfoProLtrryAddCnt =1;

        addProLtrry+= "<h2>학술활동</h2><div class='final-box-inner'>";

        for(var i=0; i<result.cpaMemberRegProLtrryInfoListSize; i++){

            addProLtrry+= "<table>"
                +"<colgroup><col style='width: 206px' /><col/></colgroup>"
                +"<thead><tr><th colspan='2'>추가 "+reviewInfoProLtrryAddCnt+"</th></tr></thead>"
                +"<tbody>"
                +"<tr><th>저술년도</th><td>"+result.cpaMemberRegProLtrryInfoList[i].ltrryYear+"</td></tr>"
                +"<tr><th>제목/저서명</th><td>"+result.cpaMemberRegProLtrryInfoList[i].subjectNm+"</td></tr>"
                +"<tr><th>주요내용</th><td>"+result.cpaMemberRegProLtrryInfoList[i].mainCn+"</td></tr>"
                +"<tr><th>비고</th><td>"+result.cpaMemberRegProLtrryInfoList[i].remark+"</td></tr>"
                +"</tbody>"
                +"</table>"

            reviewInfoProLtrryAddCnt++;
        }

        addProLtrry+= "</div>";

        $('#mypCpaMember_reviewInfoProLtrryAdd').append(addProLtrry);
    }

    //수상내역
    if(result.cpaMemberRegProWnpzInfoListSize>0){
        var addProWnpz="";
        var reviewInfoProWnpzAddCnt =1;

        addProWnpz+= "<h2>수상내역</h2><div class='final-box-inner'>";

        for(var i=0; i<result.cpaMemberRegProWnpzInfoListSize; i++){

            addProWnpz+= "<table>"
                +"<colgroup><col style='width: 206px' /><col/></colgroup>"
                +"<thead><tr><th colspan='2'>추가 "+reviewInfoProWnpzAddCnt+"</th></tr></thead>"
                +"<tbody>"
                +"<tr><th>수상년월</th><td>"+result.cpaMemberRegProWnpzInfoList[i].wnpzYm+"</td></tr>"
                +"<tr><th>내용 (수상명)</th><td>"+result.cpaMemberRegProWnpzInfoList[i].wnpzNm+"</td></tr>"
                +"<tr><th>부여기관</th><td>"+result.cpaMemberRegProWnpzInfoList[i].relateInstt+"</td></tr>"
                +"<tr><th>비고</th><td>"+result.cpaMemberRegProWnpzInfoList[i].remark+"</td></tr>"
                +"</tbody>"
                +"</table>"

            reviewInfoProWnpzAddCnt++;
        }

        addProWnpz+= "</div>";

        $('#mypCpaMember_reviewInfoProWnpzAdd').append(addProWnpz);
    }
}

//수정데이터 입력
mypCpaMemberReg.mypCpaMember_updateInfoList_success = function(data){

    //정보공개설정 수정
    if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_nmstOthbcInfo"){
        $("input:radio[name='ofcAdresYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcAdresYn+"']").attr('checked', true);      //사무소 주소
        $("input:radio[name='ofcNameYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcNameYn+"']").attr('checked', true);      //사무소 명
        $("input:radio[name='emailYn'][value='"+data.cpaMemberNmstOthbcInfo[0].emailYn+"']").attr('checked', true);      //전자메일
        $("input:radio[name='ofcTelYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcTelYn+"']").attr('checked', true);      //사무소 전화
        $("input:radio[name='photoYn'][value='"+data.cpaMemberNmstOthbcInfo[0].photoYn+"']").attr('checked', true);      //사진
        $("input:radio[name='ofcFaxYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcFaxYn+"']").attr('checked', true);      //사무소 팩스
    }
    //전문분야 수정
    else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proFieldInfo"){
        $('#mypCpaMember_proFildCdEtc199').val('');
        $('#mypCpaMember_proFildCdEtc299').val('');
        $('#mypCpaMember_proFildCdEtc399').val('');
        $('#mypCpaMember_proFildCdEtc499').val('');
        $('#mypCpaMember_proFildCdEtc999').val('');

        if(data.cpaMemberProFieldInfoSize != 0 && !isNull(data.cpaMemberProFieldInfoSize)){

            for(var i=0; i<data.cpaMemberProFieldInfoSize; i++){

                $('input:checkbox[name="proFildCd[]"]').each(function() {

                    if(this.value == data.cpaMemberProFieldInfo[i].proFildCd){
                        this.checked = true;
                        if(data.cpaMemberProFieldInfo[i].proFildCd == "A2180199"){
                            $('#mypCpaMember_proFildCdEtc199').val(data.cpaMemberProFieldInfo[i].remark);
                        }
                        else if(data.cpaMemberProFieldInfo[i].proFildCd == "A2180299"){
                            $('#mypCpaMember_proFildCdEtc299').val(data.cpaMemberProFieldInfo[i].remark);
                        }
                        else if(data.cpaMemberProFieldInfo[i].proFildCd == "A2180399"){
                            $('#mypCpaMember_proFildCdEtc399').val(data.cpaMemberProFieldInfo[i].remark);
                        }
                        else if(data.cpaMemberProFieldInfo[i].proFildCd == "A2180499"){
                            $('#mypCpaMember_proFildCdEtc499').val(data.cpaMemberProFieldInfo[i].remark);
                        }
                        else if(data.cpaMemberProFieldInfo[i].proFildCd == "A2189999"){
                            $('#mypCpaMember_proFildCdEtc999').val(data.cpaMemberProFieldInfo[i].remark);
                        }
                    }
                });
            }
            mypCpaMemberReg.fn_check_proFieldEtc();
        }
    }
    //전문분야 활동사항 수정
    else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proCareerInfo"){
        for(var i=0; i<data.cpaMemberProCareerInfoSize; i++){
            $('#mypCpaMember_proCareerAddBtn').trigger('click');

            var proCareerCnt = proCareerInfoAddCount-1;
            $('#mypCpaMember_careerSn'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].careerSn);          //순번
            $('#mypCpaMember_insttCd'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].insttCd);            //기관분류
            $('#mypCpaMember_insttNm'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].insttNm);            //기관명
            $('#mypCpaMember_rspOfc'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].rspOfc);              //직위
            $('#mypCpaMember_chrgJob'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].chrgJob);            //담당업무
            $('#mypCpaMember_bgnYm'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].bgnYm);                //시작년월
            $('#mypCpaMember_endYm'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].endYm);                //종료년월
            $('#mypCpaMember_remark'+proCareerCnt).val(data.cpaMemberProCareerInfo[i].remark);              //비고
        }
    }
    //위원회 활동사항 수정
    else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proCmitInfo"){
        for(var i=0; i<data.cpaMemberProCmitInfoSize; i++){
            $('#mypCpaMember_proCmitAddBtn').trigger('click');

            var proCmitCnt = proCmitInfoAddCount-1;
            $('#mypCpaMember_cmitSn'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].cmitSn);              //순번
            $('#mypCpaMember_cmitCd'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].cmitCd);              //기관분류
            $('#mypCpaMember_cmitNm'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].cmitNm);              //기관명
            $('#mypCpaMember_entrstInstt'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].entrstInstt);    //위촉기관
            $('#mypCpaMember_cmitChrgJob'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].chrgJob);        //담당업무
            $('#mypCpaMember_cmitBgnYm'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].bgnYm);            //시작년월
            $('#mypCpaMember_cmitEndYm'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].endYm);            //종료년월
            $('#mypCpaMember_cmitRemark'+proCmitCnt).val(data.cpaMemberProCmitInfo[i].remark);              //비고
        }
    }
    //자격/면허 수정
    else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proLicenseInfo"){
        for(var i=0; i<data.cpaMemberProLicenseInfoSize; i++){
            $('#mypCpaMember_proLicenseAddBtn').trigger('click');

            var proLicenseCnt = proLicenseInfoAddCount-1;
            $('#mypCpaMember_lcnsSn'+proLicenseCnt).val(data.cpaMemberProLicenseInfo[i].lcnsSn);                //순번
            $('#mypCpaMember_lcnsCd'+proLicenseCnt).val(data.cpaMemberProLicenseInfo[i].lcnsCd);                //자격 / 면허구분
            $('#mypCpaMember_lcnsNm'+proLicenseCnt).val(data.cpaMemberProLicenseInfo[i].lcnsNm);                //자격/면허명칭
            $('#mypCpaMember_issuInstt'+proLicenseCnt).val(data.cpaMemberProLicenseInfo[i].issuInstt);          //부여기관
            $('#mypCpaMember_acqsYm'+proLicenseCnt).val(data.cpaMemberProLicenseInfo[i].acqsYm);                //취득년월
            $('#mypCpaMember_licenseRemark'+proLicenseCnt).val(data.cpaMemberProLicenseInfo[i].remark);         //비고
        }
    }
    //학술활동 수정
    else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proLtrryInfo"){
        for(var i=0; i<data.cpaMemberProLtrryInfoSize; i++){
            $('#mypCpaMember_proLtrryAddBtn').trigger('click');

            var proLtrryCnt = proLtrryInfoAddCount-1;
            $('#mypCpaMember_ltrrySn'+proLtrryCnt).val(data.cpaMemberProLtrryInfo[i].ltrrySn);                  //순번
            $('#mypCpaMember_ltrryYear'+proLtrryCnt).val(data.cpaMemberProLtrryInfo[i].ltrryYear);              //저술년도
            $('#mypCpaMember_subjectNm'+proLtrryCnt).val(data.cpaMemberProLtrryInfo[i].subjectNm);              //제목/저서명
            $('#mypCpaMember_mainCn'+proLtrryCnt).val(data.cpaMemberProLtrryInfo[i].mainCn);                    //부여기관
            $('#mypCpaMember_ltrryRemark'+proLtrryCnt).val(data.cpaMemberProLtrryInfo[i].remark);               //비고
        }
    }
    //수상내용 수정
    else if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_proWnpzInfo"){
        for(var i=0; i<data.cpaMemberProWnpzInfoSize; i++){
            $('#mypCpaMember_proWnpzAddBtn').trigger('click');

            var proWnpzCnt = proWnpzInfoAddCount-1;
            $('#mypCpaMember_wnpzSn'+proWnpzCnt).val(data.cpaMemberProWnpzInfo[i].wnpzSn);                  //순번
            $('#mypCpaMember_wnpzYm'+proWnpzCnt).val(data.cpaMemberProWnpzInfo[i].wnpzYm);                  //수상년월
            $('#mypCpaMember_wnpzNm'+proWnpzCnt).val(data.cpaMemberProWnpzInfo[i].wnpzNm);                  //내용 (수상명)
            $('#mypCpaMember_relateInstt'+proWnpzCnt).val(data.cpaMemberProWnpzInfo[i].relateInstt);        //부여기관
            $('#mypCpaMember_wnpzRemark'+proWnpzCnt).val(data.cpaMemberProWnpzInfo[i].remark);              //비고
        }
    }

}

//가입 감사인 팝업 list 조회
mypCpaMemberReg.selectAuditPopSearchListSearch = function(data) {

    if(isNull($('#mypCpaMemberPop_auditPopSearchText').val())){
        var result="";
        $('#mypCpaMemberPop_auditPopList *').remove();
        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaMemberPop_auditPopList').append(result);
        return ;
    }
    else{
        var mypCpaMemberPop_auditSearchParam = {};

        mypCpaMemberPop_auditSearchParam.searchText = $('#mypCpaMemberPop_auditPopSearchText').val();

        fn_ajax_call(mypCpaMemberReg.getContextPath()+"/kicpa/myp/selectCpaAuditPopSearchList.do", mypCpaMemberPop_auditSearchParam, mypCpaMemberReg.selectCpaAuditPopSearchList_success, mypCpaMemberReg.mypCpaMember_error);
    }
}

//가입 감사인 팝업 검색 성공
mypCpaMemberReg.selectCpaAuditPopSearchList_success = function(data) {

    var result="";
    $("#mypCpaMemberPop_auditPopList").empty();
    if(data.cpaAuditPopSearchListSize==0 || data.cpaAuditPopSearchListSize == null){
        result+= "<tr>"
            +"<td colspan='2' style='height: 100%;'><div style='display: flex; align-items: center; justify-content: space-around;' class='result-td'>검색결과가 없습니다.</div></td>"
            +"</tr>";

        $('#mypCpaMemberPop_auditPopList').append(result);
    }
    else{
        for(var i=0; i<data.cpaAuditPopSearchListSize; i++){

            result+= "<tr onclick='mypCpaMemberReg.selectAuditPopupCellClick(this);'>"
                +"<td style='height: 25px; font-size: 13px;'>"+data.cpaAuditPopSearchList[i].korAudNm+"</td>"
                +"<td style='height: 25px; font-size: 13px;'>"+data.cpaAuditPopSearchList[i].auditCd+"</td>"
                +"</tr>";
        }
        $('#mypCpaMemberPop_auditPopList').append(result);
    }
}

//가입 감사인 팝업 행 클릭
mypCpaMemberReg.selectAuditPopupCellClick = function(obj) {

    var table = document.getElementById("mypCpaMemberPop_auditPopList");
    var tr = table.getElementsByTagName("tr");
    for(var i=0; i<tr.length; i++){
        tr[i].style.background = "white";
    }
    obj.style.backgroundColor = "#FCE6E0";

    var tr = $(obj);
    var td = tr.children();

    $('#mypCpaMemberPop_auditPopSetAudNm').val( td.eq(0).text());
    $('#mypCpaMemberPop_auditPopSetAudId').val(td.eq(1).text());
};

//반려상태에서 재신청한 경우
mypCpaMemberReg.mypCpaMember_regFlagFList = function(result) {
    var regFlagFList_param = {};
    regFlagFList_param.pin = $('#mypCpaMemberReg_pin').val();
    regFlagFList_param.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
    regFlagFList_param.regFlag = $('#mypCpaMemberReg_regFlag').val();

    $.ajax({
        url : mypCpaMemberReg.getContextPath()+"/kicpa/myp/selectmypCpaMemberRegReviewInfo.do",
        type : "POST",
        data : regFlagFList_param,
        success : function(data) {
            mypCpaMemberReg.mypCpaMember_regFlagFList_success(data);
        }
    });
}

//반려상태 재등록시 기존 데이터 입력
mypCpaMemberReg.mypCpaMember_regFlagFList_success = function(data){

    //부조회원구분 & 사업자등록번호
    var number = data.cpaMemberRegReviewInfoList[0].bizrNo;
    var bizrNo = "";
    if(number.length == 10) {
        bizrNo += number.substr(0, 3);
        bizrNo += "-";
        bizrNo += number.substr(3, 2);
        bizrNo += "-";
        bizrNo += number.substr(5);
    }
    $('#mypCpaMember_aidMberFlag').val(data.cpaMemberRegReviewInfoList[0].aidMberFlag);         //부조회원 구분
    $('#mypCpaMember_bizrNo').val(bizrNo);                                                      //사업자등록번호

    //회원등록구분
    $('#mypCpaMember_registDe').val(data.cpaMemberRegReviewInfoList[0].registDe);               //공인회계사 등록예정일
    $('#mypCpaMember_mberFlag').val(data.cpaMemberRegReviewInfoList[0].mberFlag);               //회원구분
    $('#mypCpaMember_auditNm').val(data.cpaMemberRegReviewInfoList[0].auditNm);                 //감사예정감사인명
    $('#mypCpaMember_auditId').val(data.cpaMemberRegReviewInfoList[0].auditId);                 //감사예정감사인코드
    $('#mypCpaMember_auditOfcps').val(data.cpaMemberRegReviewInfoList[0].auditOfcps);           //감사인구성구분

    if(data.cpaMemberRegReviewInfoList[0].mberFlag =='A2020010'){		//전업
        $("#mypCpaMember_auditNm").prop('disabled', false);
        $("#mypCpaMember_auditId").prop('disabled', false);
        $("#mypCpaMember_auditNm").prop('readonly', true);
        $("#mypCpaMember_auditId").prop('readonly', true);
    }
    else{
        $("#mypCpaMember_auditNm").prop('disabled', true);
        $("#mypCpaMember_auditId").prop('disabled', true);
    }

    //정보공개설정
    $("input:radio[name='ofcAdresYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcAdresYn+"']").attr('checked', true);      //사무소 주소
    $("input:radio[name='ofcNameYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcNameYn+"']").attr('checked', true);      //사무소 명
    $("input:radio[name='emailYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].emailYn+"']").attr('checked', true);      //전자메일
    $("input:radio[name='ofcTelYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcTelYn+"']").attr('checked', true);      //사무소 전화
    $("input:radio[name='photoYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].photoYn+"']").attr('checked', true);      //사진
    $("input:radio[name='ofcFaxYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcFaxYn+"']").attr('checked', true);      //사무소 팩스

    //전문분야
    $('#mypCpaMember_proFildCdEtc199').val('');
    $('#mypCpaMember_proFildCdEtc299').val('');
    $('#mypCpaMember_proFildCdEtc399').val('');
    $('#mypCpaMember_proFildCdEtc499').val('');
    $('#mypCpaMember_proFildCdEtc999').val('');

    if(data.cpaMemberProFieldRegFlagFListSize != 0 && !isNull(data.cpaMemberProFieldRegFlagFListSize)){

        for(var i=0; i<data.cpaMemberProFieldRegFlagFListSize; i++){

            $('input:checkbox[name="proFildCd[]"]').each(function() {

                if(this.value == data.cpaMemberProFieldRegFlagFList[i].proFildCd){
                    this.checked = true;
                    if(data.cpaMemberProFieldRegFlagFList[i].proFildCd == "A2180199"){
                        $('#mypCpaMember_proFildCdEtc199').val(data.cpaMemberProFieldRegFlagFList[i].remark);
                    }
                    else if(data.cpaMemberProFieldRegFlagFList[i].proFildCd == "A2180299"){
                        $('#mypCpaMember_proFildCdEtc299').val(data.cpaMemberProFieldRegFlagFList[i].remark);
                    }
                    else if(data.cpaMemberProFieldRegFlagFList[i].proFildCd == "A2180399"){
                        $('#mypCpaMember_proFildCdEtc399').val(data.cpaMemberProFieldRegFlagFList[i].remark);
                    }
                    else if(data.cpaMemberProFieldRegFlagFList[i].proFildCd == "A2180499"){
                        $('#mypCpaMember_proFildCdEtc499').val(data.cpaMemberProFieldRegFlagFList[i].remark);
                    }
                    else if(data.cpaMemberProFieldRegFlagFList[i].proFildCd == "A2189999"){
                        $('#mypCpaMember_proFildCdEtc999').val(data.cpaMemberProFieldRegFlagFList[i].remark);
                    }
                }
            });
        }
        mypCpaMemberReg.fn_check_proFieldEtc();
    }

    //전문분야 활동사항
    for(var i=0; i<data.cpaMemberRegProCareerInfoListSize; i++){
        $('#mypCpaMember_proCareerAddBtn').trigger('click');

        var proCareerCnt = proCareerInfoAddCount-1;
        $('#mypCpaMember_careerSn'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].careerSn);          //순번
        $('#mypCpaMember_insttCd'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].insttCd);            //기관분류
        $('#mypCpaMember_insttNm'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].insttNm);            //기관명
        $('#mypCpaMember_rspOfc'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].rspOfc);              //직위
        $('#mypCpaMember_chrgJob'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].chrgJob);            //담당업무
        $('#mypCpaMember_bgnYm'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].bgnYm);                //시작년월
        $('#mypCpaMember_endYm'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].endYm);                //종료년월
        $('#mypCpaMember_remark'+proCareerCnt).val(data.cpaMemberRegProCareerInfoList[i].remark);              //비고
    }

    //위원회 활동사항
    for(var i=0; i<data.cpaMemberRegProCmitInfoListSize; i++){
        $('#mypCpaMember_proCmitAddBtn').trigger('click');

        var proCmitCnt = proCmitInfoAddCount-1;
        $('#mypCpaMember_cmitSn'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].cmitSn);              //순번
        $('#mypCpaMember_cmitCd'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].cmitCd);              //기관분류
        $('#mypCpaMember_cmitNm'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].cmitNm);              //기관명
        $('#mypCpaMember_entrstInstt'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].entrstInstt);    //위촉기관
        $('#mypCpaMember_cmitChrgJob'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].chrgJob);        //담당업무
        $('#mypCpaMember_cmitBgnYm'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].bgnYm);            //시작년월
        $('#mypCpaMember_cmitEndYm'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].endYm);            //종료년월
        $('#mypCpaMember_cmitRemark'+proCmitCnt).val(data.cpaMemberRegProCmitInfoList[i].remark);              //비고
    }

    //자격/면허
    for(var i=0; i<data.cpaMemberRegProLicenseInfoListSize; i++){
        $('#mypCpaMember_proLicenseAddBtn').trigger('click');

        var proLicenseCnt = proLicenseInfoAddCount-1;
        $('#mypCpaMember_lcnsSn'+proLicenseCnt).val(data.cpaMemberRegProLicenseInfoList[i].lcnsSn);                //순번
        $('#mypCpaMember_lcnsCd'+proLicenseCnt).val(data.cpaMemberRegProLicenseInfoList[i].lcnsCd);                //자격 / 면허구분
        $('#mypCpaMember_lcnsNm'+proLicenseCnt).val(data.cpaMemberRegProLicenseInfoList[i].lcnsNm);                //자격/면허명칭
        $('#mypCpaMember_issuInstt'+proLicenseCnt).val(data.cpaMemberRegProLicenseInfoList[i].issuInstt);          //부여기관
        $('#mypCpaMember_acqsYm'+proLicenseCnt).val(data.cpaMemberRegProLicenseInfoList[i].acqsYm);                //취득년월
        $('#mypCpaMember_licenseRemark'+proLicenseCnt).val(data.cpaMemberRegProLicenseInfoList[i].remark);         //비고
    }

    //학술활동
    for(var i=0; i<data.cpaMemberRegProLtrryInfoListSize; i++){
        $('#mypCpaMember_proLtrryAddBtn').trigger('click');

        var proLtrryCnt = proLtrryInfoAddCount-1;
        $('#mypCpaMember_ltrrySn'+proLtrryCnt).val(data.cpaMemberRegProLtrryInfoList[i].ltrrySn);                  //순번
        $('#mypCpaMember_ltrryYear'+proLtrryCnt).val(data.cpaMemberRegProLtrryInfoList[i].ltrryYear);              //저술년도
        $('#mypCpaMember_subjectNm'+proLtrryCnt).val(data.cpaMemberRegProLtrryInfoList[i].subjectNm);              //제목/저서명
        $('#mypCpaMember_mainCn'+proLtrryCnt).val(data.cpaMemberRegProLtrryInfoList[i].mainCn);                    //부여기관
        $('#mypCpaMember_ltrryRemark'+proLtrryCnt).val(data.cpaMemberRegProLtrryInfoList[i].remark);               //비고
    }

    //수상내용
    for(var i=0; i<data.cpaMemberRegProWnpzInfoListSize; i++){
        $('#mypCpaMember_proWnpzAddBtn').trigger('click');

        var proWnpzCnt = proWnpzInfoAddCount-1;
        $('#mypCpaMember_wnpzSn'+proWnpzCnt).val(data.cpaMemberRegProWnpzInfoList[i].wnpzSn);                  //순번
        $('#mypCpaMember_wnpzYm'+proWnpzCnt).val(data.cpaMemberRegProWnpzInfoList[i].wnpzYm);                  //수상년월
        $('#mypCpaMember_wnpzNm'+proWnpzCnt).val(data.cpaMemberRegProWnpzInfoList[i].wnpzNm);                  //내용 (수상명)
        $('#mypCpaMember_relateInstt'+proWnpzCnt).val(data.cpaMemberRegProWnpzInfoList[i].relateInstt);        //부여기관
        $('#mypCpaMember_wnpzRemark'+proWnpzCnt).val(data.cpaMemberRegProWnpzInfoList[i].remark);              //비고
    }
}

mypCpaMemberReg.mypCpaMember_error = function (){

    alert("실패");

}
