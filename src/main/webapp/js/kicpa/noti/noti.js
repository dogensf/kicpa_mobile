var noti = {};
var notiFlag = true;
var fcmToken = "";

noti.listInit = function(){
	noti.settingInit();
	noti.listAjax();
}

//푸시 수신 설정 토글 (앱 환경에서만 노출)
noti.settingInit = function(){
	if(window['bridge']){
		try{
			window.bridge.getFcmToken('function(d) {setPushToken(d);}');
		}catch(e){}
	}
}

//네이티브 브릿지 콜백 — 전역 함수여야 함
function setPushToken(token){
	if(!token){
		return;
	}
	fcmToken = token;
	fn_ajax_call('/kicpa/noti/getPushSetting.do', {token : fcmToken}, function(result){
		$("#set01").prop("checked", result.pushYn != 'N');
		$("#notiSetBox").show();
		$("#set01").on("change", function(){
			var pushYn = $(this).is(":checked") ? 'Y' : 'N';
			fn_ajax_call('/kicpa/noti/savePushSetting.do', {token : fcmToken, pushYn : pushYn}, function(r){
				if(r.result != 'OK'){
					alert("저장에 실패했습니다.");
				}
			}, function(){
				alert("저장에 실패했습니다.");
			});
		});
	}, function(){});
}

noti.listAjax = function(){
	var param = $("#notiForm").serializeObject();
	fn_ajax_call("/kicpa/noti/getNotiList.do", param, noti.listSuccess, noti.listError);
}

noti.listSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$.each(list, function(i, o){
			var mainTxt = o.body ? o.body : o.title;
			var href = o.linkUrl ? "javascript:location.href='" + o.linkUrl + "';" : "javascript:void(0);";
			txt += '<li> \n';
			txt += '	<a href="' + href + '"> \n';
			txt += ' 		<div class="title-zone"> \n';
			txt += ' 			<p>' + mainTxt + '</p> \n';
			txt += ' 	      	<div class="other"> \n';
			txt += ' 	        	<span class="state">' + o.title + '</span> \n';
			txt += ' 	        </div> \n';
			txt += ' 	    </div> \n';
			txt += '      <div class="info-zone"> \n';
			txt += '            <span>' + o.regDt + '</span> \n';
			txt += '        </div> \n';
			txt += '	</a> \n';
			txt += '</li> \n';
		});
		$(".board-list ul").append(txt);
	}
	$("#totalCnt").text(totalCnt + "건");

	if(totalCnt < Number($("#pageIndex").val())){
		$(window).off('scroll');
	}else{
		$(window).off().on("scroll", function(){
			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && notiFlag) {
				notiFlag = false;
				$("#pageIndex").val(Number($("#pageIndex").val()) + 10);
				noti.listAjax();
			}
		});
	}

	notiFlag = true;
}

noti.listError = function(data, status, error){
	notiFlag = true;
	alert("조회실패");
}
