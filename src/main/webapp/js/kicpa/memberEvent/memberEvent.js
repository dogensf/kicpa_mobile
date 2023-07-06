var memberEvent = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {


memberEvent.regInit = function(){


	$("#phoneNumber1,#phoneNumber2,#phoneNumber3").on("input",function(){
		$(this).val( $(this).val().replace(/[^0-9]/g, ""));
	});

	//성명(등록번호) 입력
	$("#regMemberEvent_cpaNmId").on("input",function(e) {

		var cpaNmId = $('#regMemberEvent_cpaNmId').val();
		var relation = $('#relation').val();

		if((cpaNmId != "" && cpaNmId != null) && (relation != "" && relation != null)){
			$('#regTitle').val(cpaNmId + " 회계사님 " + relation);
		}
		else{
			$('#regTitle').val('');
		}
	});

	//고인관계 변경
	$('#relation').on('change', function(){
		var cpaNmId = $('#regMemberEvent_cpaNmId').val();
		var relation = $('#relation').val();

		if((cpaNmId != "" && cpaNmId != null) && (relation != "" && relation != null)){
			$('#regTitle').val(cpaNmId + " 회계사님 " + relation);
		}
		else{
			$('#regTitle').val('');
		}
	});

	//작고일 요일표시
	/*$('#deaDate').on('input', function(){

		var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

		var today = $('#deaDate').val();
		var today1 = new Date(today).getDay();

		var todayLabel = week[today1];

		alert(today + "(" + todayLabel + ")");
		$('#deaDate').val(today + "(" + todayLabel + ")");
	});*/

}

memberEvent.insertValicationCheck = function(){

	if($.trim($("#extStr0").val()) == ''){
		alert("이메일을 입력해주세요.")
		return false;
	}

/*	var regex=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
	if(!regex.test($.trim($("#extStr0").val()))) {
		alert("올바르지 않은 이메일주소입니다.");
		return false;
	}*/

	if($.trim($("#regMemberEvent_cpaNmId").val()) == ''){
		alert("성명(등록번호)을 입력해주세요.")
		return false;
	}

	if($.trim($("#relation").val()) == ''){
		alert("고인과의 관계를 입력해주세요.")
		return false;
	}

	if($.trim($("#deaDate").val()) == ''){
		alert("작고일을 선택해주세요.")
		return false;
	}

	if($.trim($("#mortuary").val()) == ''){
		alert("빈소를 입력해주세요.")
		return false;
	}

	if($.trim($("#phoneNumber1").val()) == '' || $.trim($("#phoneNumber2").val()) == '' || $.trim($("#phoneNumber3").val()) == ''){
		alert("빈소 연락처를 입력해주세요.")
		return false;
	}

	if($.trim($("#burialDt").val()) == ''){
		alert("발인일을 선택해주세요.")
		return false;
	}


	var param = new FormData($("#boardForm")[0]);
	fn_ajax_form_call("/kicpa/memberEvent/insertMemberEvent.do",param,memberEvent.insertMemberEventSuccess);

}


memberEvent.insertMemberEventSuccess = function(data){
	alert("등록되었습니다.");
	opener.location.reload();
	window.close();
}




memberEvent.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






