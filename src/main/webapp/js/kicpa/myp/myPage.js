var myPage = {};

myPage.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

myPage.myPageInit = function(){



	//합격자 등록 정보 없을경우
	if($('#myPage_myPageRegFlag').val() == "N" || $('#myPage_mypCpaMemFlag').val() != "E"){
		myPage.myPage_tabMove('myPage_cpaTrainInfoTab');
	}
	else{
		myPage.myPage_tabMove('myPage_cpaInfoTab');
	}


	//자세히보기 클릭
	$('#myPage_detailInfoBtn').on('click',function(e) {
		if($('#myPage_myPageRegFlag').val() != 'N'){
			location.href='/kicpa/myp/myPageInfo.do?pin='+$('#myPage_myPagePin').val();
		}
	});

	//합격자 기본정보 등록하기 클릭
	$('#myPage_cpaPassRegist').on('click',function(e) {
		location.replace(myPage.getContextPath()+'/myp/mypCpaPassReg.do?pin='+$('#myPage_myPagePin').val());
	});

	//공인회계사 등록하기 클릭
	$('#myPage_cpaMemberRegist').on('click',function(e) {
		location.replace(myPage.getContextPath()+'/myp/mypCpaMemberReg.do?pin='+$('#myPage_myPagePin').val());
	});

	//기본실무 등록하기 클릭
	$('#mypPage_mypCpaTrainRegPageMove').on('click',function(e) {
		location.replace(myPage.getContextPath()+'/myp/mypCpaTrainReg.do?pin='+$('#myPage_myPagePin').val());
	});

	//외감 신청 클릭
	$('.mypPage_mypAudTrainRegMove').on('click',function(e) {
		location.replace(myPage.getContextPath()+'/myp/mypCpaAudTrainReg.do?pin='+$('#myPage_myPagePin').val());
	});

	//수습회계사 정보 화면 이동
	$('.mypage_trainInfoMove').on('click',function(e) {
		var moveFlag = $(this).attr('value');

		location.replace(myPage.getContextPath()+'/myp/mypCpaTrainInfoMove.do?pin='+$('#myPage_myPagePin').val()+"&moveFlag="+moveFlag);
	});

	//반려사유 조회 팝업 확인 버튼
	$('#myPagePop_rejectRsnBtn').on('click',function(e) {
		$('#myPage_body').removeClass('stop');
		$('#myPagePop_rejectRsn').removeClass('show');
	});

    //수정제출 클릭 시, REG_FLAG값이 "N"으로 바뀜
    $('#mypCpaMemberRegEditAndSubmitBtn').on('click',function() {

        const pin = $('#myPage_myPagePin').val();

        if(confirm('제출 전 상태로 변경되며 수정 후 반드시 제출버튼을 클릭해야 합니다.')){
            $.ajax({
                url: myPage.getContextPath() + '/myp/mypCpaMemberRegEditAndSubmitBtn.do',
                type: 'POST',
                data: { pin: pin, regFlag: 'N' , cpaSn: $('#mypCpaMemberRegEditAndSubmitCpaSn').val()},
                success: function(response) {
                    // 성공 시 페이지 이동
                    location.replace(myPage.getContextPath() + '/myp/mypCpaMemberReg.do?pin=' + pin);
                },
                error: function(xhr, status, error) {
                    alert('REG_FLAG 변경 중 오류가 발생했습니다.');
                    console.error(error);
                }
            });
        }
    });
}



//탭 이동
myPage.myPage_tabMove = function(flag) {

	//입력화면 show/hide
	$('.myPageTabMove').removeClass('show');
	$('#'+flag).addClass('show');

	//tab active
	$('.myPageActiveMove').removeClass('active');
	$('#'+flag+'Active').addClass('active');

}

//반려사유 조회
myPage.myPage_rejectRsnClick = function (flag){

	var rejectRsn = "";

	if(flag == "APP"){
		rejectRsn = $('#cpaTrainRegInfo_regectRsn').text();
	}
	if(flag == "AUD"){
		rejectRsn = $('#cpaAudTrainRegInfo_regectRsn').text();
	}
	if(flag == "CPA"){
		rejectRsn = $('.cpaMemberRegInfo_regectRsn').text();
	}

	$('#myPagePop_rejectRsnText').text(rejectRsn);
	$('#myPage_body').addClass('stop');
	$('#myPagePop_rejectRsn').addClass('show');
}

