var memberEvent = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {


memberEvent.regInit = function(){


	$("#phoneNumber1,#phoneNumber2,#phoneNumber3").on("input",function(){
		$(this).val( $(this).val().replace(/[^0-9]/g, ""));
	});


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
		alert("문의전화을 입력해주세요.")
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






