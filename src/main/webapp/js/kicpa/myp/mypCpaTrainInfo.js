var mypCpaTrainInfo = {};

mypCpaTrainInfo.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypCpaTrainInfo.mypCpaTrainInfoInit = function(){

	if($('#mypCpaTrainInfo_moveFlag').val()=="trnngResult"){
		mypCpaTrainInfo.mypCpaTrainInfo_tabMove('mypCpaTrainInfo_trnngResultTab');
	}
	else{
		mypCpaTrainInfo.mypCpaTrainInfo_tabMove('mypCpaTrainInfo_apntcBrfTab');
	}

}

//화면상단 닫기버튼
mypCpaTrainInfo.mypCpaTrainInfo_backMove = function() {

	location.href="/kicpa/myp/myPage.do?Pin="+$('#mypCpaTrainInfo_pin').val();

}

//탭 이동
mypCpaTrainInfo.mypCpaTrainInfo_tabMove = function(flag) {

	// show/hide
	$('.mypCpaTrainInfoTabMove').removeClass('show');
	$('#'+flag).addClass('show');

	//tab active
	$('.mypCpaTrainInfoActiveMove').removeClass('active');
	$('#'+flag+'Active').addClass('active');

}