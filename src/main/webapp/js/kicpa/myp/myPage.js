var myPageInfo = myPageInfo || {};

myPageInfo.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

// 문서 시작 시
$(document).ready(
    function() {
        myPageInfo.fn_init(); // 화면 초기화
        myPageInfo.fn_init_events(); // 이벤트 등록

        $('#appLoadingIndicator2', parent.document).hide();
    }
);


myPageInfo.fn_init = function() {
    $('#myPage_trainToggle').hide();
    $('#myPage_cpaMemToggle').hide();


    $('#myPageRsumPop_rsumSave').hide();
    $('#myPagePop_rejectRsn').hide();
}


myPageInfo.fn_init_events = function() {

    //수습회계사 토글 버튼 이벤트
    $("#myPage_trainToggleBtn").on("click",function(e) {
        if($("#myPage_trainToggleBtn").hasClass('active')){
            $("#myPage_trainToggleBtn").removeClass('active');

            $('#myPage_trainToggle').slideUp(1000);
        }
        else{
            $("#myPage_trainToggleBtn").addClass('active');
            $('#myPage_trainToggle').slideDown(1000);
        }

    });

    //공인회계사 토글 버튼 이벤트
    $("#myPage_cpaMemToggleBtn").on("click",function(e) {

        if($("#myPage_cpaMemToggleBtn").hasClass('active')){
            $("#myPage_cpaMemToggleBtn").removeClass('active');
            $('#myPage_cpaMemToggle').slideToggle(1000);
        }
        else{
            $("#myPage_cpaMemToggleBtn").addClass('active');
            $('#myPage_cpaMemToggle').slideToggle(1000);
        }

    });

    //기본실무 등록하기 클릭
    $('#mypPage_mypCpaTrainRegPageMove').on("click",function () {
        location.replace(myPageInfo.getContextPath()+'/kicpa/myp/mypCpaTrainReg.do?pin='+$('#myPage_myPagePin').val());
    });

    //외감실무 등록하기 클릭
    $('#myPage_mypCpaAudTrainRegPageMove').on("click",function () {

        if($('#myPage_mypLeftDays').val()<0){
            alert("기본수습 종료예정일기준으로 15일 전부터 신청 가능합니다.");
        }
        else{
            location.replace(myPageInfo.getContextPath()+'/kicpa/myp/mypCpaAudTrainReg.do?pin='+$('#myPage_myPagePin').val());
        }

    });

    //공인회계사 등록하기 클릭
    $('#myPage_mypCpaMemberRegPageMove').on("click",function () {

        if($('#myPage_mypLeftDays').val()<0){
            alert("기본수습 종료예정일기준으로 15일 전부터 신청 가능합니다.");
        }
        else{
            location.replace(myPageInfo.getContextPath()+'/kicpa/myp/mypCpaMemberReg.do?pin='+$('#myPage_myPagePin').val());
        }

    });

    //이력서 관리 버튼
    $('#myPageRsumPop_openBtn').on("click",function () {
        $('#myPageInfo_rsumInfoFile').val('');
        var rsumInfo_param = {};
        rsumInfo_param.pin = $('#myPage_myPagePin').val();

        $.ajax({
            url : myPageInfo.getContextPath()+"/kicpa/myp/selectMypCpaLastRusmInfo.do",
            type : "POST",
            data : rsumInfo_param,
            success : function(data) {
                $("#myPageRsumPop_rsumFileNm").text(data.cpaLastRsumInfo[0].fileNm);
                $("#myPageRsumPop_rsumFileUrl").attr("href", data.cpaLastRsumInfo[0].fileUrl);
                $("#myPageRsumPop_rsumSaveRegistDe").val(data.cpaLastRsumInfo[0].registDe);
            }
        });

        $('#myPageRsumPop_rsumSave').show();
    });

    //이력서 레이어팝 저장 버튼
    $('#myPageRsumPop_rsumSaveBtn').on("click",function () {

        var form = $('#myPageRsumPop_rsumSaveForm')[0];
        var formData = new FormData(form);
        formData.append("pin", $('#myPage_myPagePin').val());
        formData.append("registDe", $('#myPageRsumPop_rsumSaveRegistDe').val());

        $.ajax({
            cache : false,
            url : myPageInfo.getContextPath()+"/kicpa/myp/mypCpaLastRusmInfoUpdate.do",
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
                    $('#myPageRsumPop_rsumSave').hide();
                }

            }, // success
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
        }); // $.ajax */
    });

    //이력서 레이어팝 종료 버튼
    $('#myPageRsumPop_rsumCloseBtn').on("click",function () {
        $('#myPageRsumPop_rsumSave').hide();
    });

    //반려사유 조회 레이어팝 확인 버튼
    $('#myPagePop_rejectRsnClose').on("click",function () {
        $('#myPagePop_rejectRsn').hide();
        $('#myPagePop_rejectRsnText').text('');
    });
}

myPageInfo.myPage_rejectRsnClick = function (rejectRsn){
    $('#myPagePop_rejectRsnText').text(rejectRsn);
    $('#myPagePop_rejectRsn').show();
}