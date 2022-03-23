var myPage = {};

myPage.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

myPage.myPageInit = function(){



	//합격자 등록 정보 없을경우
	if($('#myPage_myPageRegFlag').val() == "N"){
		myPage.myPage_tabMove('myPage_cpaTrainInfoTab');
	}
	else{
		myPage.myPage_tabMove('myPage_cpaInfoTab');
	}


	//자세히보기 클릭
	$('#myPage_detailInfoBtn').on('click',function(e) {
		if($('#myPage_myPageRegFlag').val() != 'N'){
			location.replace(myPage.getContextPath()+'/myp/myPageInfo.do?pin='+$('#myPage_myPagePin').val());
		}
	});

	//합격자 기본정보 등록하기 클릭
	$('#myPage_cpaPassRegist').on('click',function(e) {
		location.replace(myPage.getContextPath()+'/myp/mypCpaPassReg.do?pin='+$('#myPage_myPagePin').val());
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

