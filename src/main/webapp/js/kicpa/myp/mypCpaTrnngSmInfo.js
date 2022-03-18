var mypCpaTrnngSmInfo = {};

mypCpaTrnngSmInfo.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypCpaTrnngSmInfo.mypCpaTrnngSmInfoInit = function(){

	//사이버연수 시행연도 변경
	$("#mypCpaTrnngSmInfo_cpaMemTrnngSmYear").on("change", function(e){

		var cpaMemTrnngSmYear_param = {};
		cpaMemTrnngSmYear_param.pin = $('#mypCpaTrnngSmInfo_pin').val();
		cpaMemTrnngSmYear_param.trnYear = $('#mypCpaTrnngSmInfo_cpaMemTrnngSmYear').val();

		$.ajax({
			url : mypCpaTrnngSmInfo.getContextPath()+"/myp/selectCpaMemTrnngSmYear.do",
			type : "POST",
			data : cpaMemTrnngSmYear_param,
			success : function(data) {

				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp01').text(data.cpaMemTrnngSmInfo[0].temp01);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp02').text(data.cpaMemTrnngSmInfo[0].temp02);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp03').text(data.cpaMemTrnngSmInfo[0].temp03);

				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp04').text(data.cpaMemTrnngSmInfo[0].temp04);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp05').text(data.cpaMemTrnngSmInfo[0].temp05);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp06').text(data.cpaMemTrnngSmInfo[0].temp06);

				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp07').text(data.cpaMemTrnngSmInfo[0].temp07);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp08').text(data.cpaMemTrnngSmInfo[0].temp08);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp09').text(data.cpaMemTrnngSmInfo[0].temp09);

				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp10').text(data.cpaMemTrnngSmInfo[0].temp10);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp11').text(data.cpaMemTrnngSmInfo[0].temp11);
				$('#mypCpaTrnngSmInfo_cpaMemTrnngSmYearTemp12').text(data.cpaMemTrnngSmInfo[0].temp12);

			}
		});
	});

}

//화면상단 닫기버튼
mypCpaTrnngSmInfo.mypCpaTrnngSmInfo_backMove = function() {

	location.href="/kicpa/myp/myPage.do?Pin="+$('#mypCpaTrnngSmInfo_pin').val();

}
