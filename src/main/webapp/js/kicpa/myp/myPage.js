var myPage = {};

myPage.myPageInit = function(){



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

