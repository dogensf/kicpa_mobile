var counselCenter = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {
counselCenter.declarationInit = function(){

	counselCenter.getDeclarationBoardListAjax();
}

counselCenter.counselBoardDetailInit = function(){

}


counselCenter.counselInit = function(){

	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop")
	});


	$("#searchPop .btn-send").on("click",function(){
		$("#searchPop .btn-close").click();
		$("#pageIndex").val(1);
		$(".board-list ul").html("");
		$("#boardForm input[name='searchKeyword']").val($("#boardSearchForm input[name='searchKeyword']").val());
		if($("#boardForm input[name='searchKeyword']").val() != ''){
			$("#boardForm input[name='searchKeyword']").addClass("value");
		}
		counselCenter.counselBoardAjax();
	});

	$(".btn-del").on("click",function(){
		$("#boardForm input[name='searchKeyword']").removeClass("value");
		$("#boardForm input[name='searchKeyword']").val("");
		$("#boardSearchForm input[name='searchKeyword']").val("");
		$(".board-list ul").html("");
		counselCenter.counselBoardAjax();
	});

	if($("#boardId").val() == 'kifrs'){
		$(".btn-round-sm").show();
	}else{
		$(".btn-round-sm").hide();
	}

	counselCenter.counselBoardAjax();

}

counselCenter.counselBoardAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/getCounselBoardList.do",param,counselCenter.getCounselBoardListSuccess,counselCenter.boardListError);
}


counselCenter.declarationDetailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}

counselCenter.regInit = function(){

	$("#phoneNumber1,#phoneNumber2,#phoneNumber3").on("input",function(){
		$(this).val( $(this).val().replace(/[^0-9]/g, ""));
	});


}

counselCenter.declarationStep2Init = function(){
	$("#arReport0").on("change",function(){
		if($(this).prop("checked")){
			$("#arReportEtc").closest(".inp-box").show();
			$("#arReportEtc").prop("disabled",false);
		}else{
			$("#arReportEtc").closest(".inp-box").hide();
			$("#arReportEtc").prop("disabled",true);
			$("#arReportEtc").val("");
		}
	});

	$("input[name='arReportUse']").on("change",function(){
		if($("#reportUse1").prop("checked")){
			$("#arReportConame").closest(".inp-box").show();
			$("#arReportConame").prop("disabled",false);
		}else{
			$("#arReportConame").closest(".inp-box").hide();
			$("#arReportConame").prop("disabled",true);
			$("#arReportConame").val("");
		}
	});


	$("#phone1,#phone2,#phone3,#arBirthYmd").on("input",function(){
		$(this).val( $(this).val().replace(/[^0-9]/g, ""));
	});

	$("#boardForm input[name='upFile']").on("change",function(){
		var files = $(this)[0].files;

		if(files != null && files.length > 0){
			$("label[for='"+$(this).attr("id")+"']").text(files[0].name);

		}else{
			$("label[for='"+$(this).attr("id")+"']").text("");
		}
	});
}

counselCenter.getDeclarationBoardListAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/getDeclarationBoardList.do",param,counselCenter.getBoardListSuccess,counselCenter.boardListError);
}


counselCenter.memoCheckValidation = function(){
	if($("#boardForm textarea[name='memoCntt']").val() == ''){
		alert("의견을 입력해주세요.");
		return false;
	}
	counselCenter.insertMemberCounselBoardMemo();

};


counselCenter.categoryTab = function(obj,cateId){
	$("#boardForm input[name='searchKeyword']").removeClass("value");
	$("#boardForm input[name='searchKeyword']").val("");
	$("#boardSearchForm")[0].reset();
	$(".tab-link").removeClass("active");
	$("#cateId").val(cateId);
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	$(obj).addClass("active");
	counselCenter.counselBoardAjax();

}

counselCenter.kifrsTab = function(obj,boardId){
	$("#boardForm input[name='searchKeyword']").removeClass("value");
	if(boardId == 'kifrs' || boardId == 'sugt01' || boardId == 'sugt02' || boardId == 'sugt03'){
		$(".btn-write").show();
	}else{
		$(".btn-write").hide();
	}


	if(boardId == 'kifrs'){
		$(".btn-round-sm").show();
	}else{
		$(".btn-round-sm").hide();
	}

	$("#boardForm input[name='searchKeyword']").val("");
	$(".tab-link").removeClass("active");
	$("#boardId").val(boardId);
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	$(obj).addClass("active");
	board.boardBoardListAjax();
}

counselCenter.getBoardListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var isLogin = data.isLogin;
	var returnUrl = data.returnUrl;
	var txt = "";
	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();
		if(list != null && list.length > 0){
			$("#totalCnt").text(totalCnt+"건")
			$.each(list,function(i,o){
				txt+='<li> \n';
				txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/counselCenter/declarationBoardDetail.do?arIdNum='+o.arIdNum+'\');"> \n';
				txt+=' 		<div class="title-zone"> \n';

				if(o.arUserId != null && o.arUserId != '' && o.arUserId != '-'){
					txt+=' 			<p>'+o.arWtitle+'</p> \n';
				}else{
					txt+=' 			<p>(익명신고) '+o.arWtitle+'</p> \n';
				}
				txt+=' 	      	<div class="other"> \n';
				if(o.arStatus != '1'){
					txt+=' 	        	<span class="state">'+o.codeName+'</span> \n';
				}
				txt+=' 	        </div> \n';
				txt+=' 	    </div> \n';
				txt+='      <div class="info-zone"> \n';
				txt+='            <span>'+o.arRegDate+'</span> \n';
				txt+='        </div> \n';
				txt+='	</a> \n';
				txt+='</li> \n';
			});
			$(".board-list ul").append(txt);
		}else{
			$("#totalCnt").text(totalCnt+"건")
		}

		if(totalCnt < Number($("#pageIndex").val())){
			$(window).off('scroll');
		}else{
			$(window).off().on("scroll",function() {
				if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && flag ) {
					flag = false;
					$("#pageIndex").val(Number($("#pageIndex").val())+10);
					var param = $("#boardForm").serializeObject();
					counselCenter.getDeclarationBoardListAjax();
				}
			});
		}
	}else{
		$("#returnUrl").val(returnUrl);
		$(".login-guide").show();
		$("#tabMain1").hide();
	}

	flag = true;

}


counselCenter.getCounselBoardListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var isLogin = data.isLogin;
	var returnUrl = data.returnUrl;
	var txt = "";
	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();

		if(list != null && list.length > 0){
			$("#totalCnt").text(totalCnt+"건")
			$.each(list,function(i,o){
				txt+='<li > \n';
				txt+='	<a  href="javascript:board.openDetailPop(\'/kicpa/counselCenter/counselBoardDetail.do?bltnNo='+o.bltnNo+'\');"> \n';
				txt+=' 		<div class="title-zone"> \n';
				txt+=' 			<p>'+o.bltnSubj+'[' +o.bltnMemoCnt+']</p> \n';
				txt+=' 	      	<div class="other"> \n';
				if(o.replyStatus == 'C'){
					txt+=' 	        	<span class="state">답변완료</span> \n';
				}else if(o.replyStatus == 'A'){
					txt+=' 	        	<span class="state">접수</span> \n';
				}else if(o.replyStatus == 'B'){
					txt+=' 	        	<span class="state">답변준비중</span> \n';
				}else{
					txt+=' 	        	<span class="ico-arrow"></span> \n';
				}
				txt+=' 	        </div> \n';
				txt+=' 	    </div> \n';
				txt+='      <div class="info-zone"> \n';
				txt+='            <span>'+o.regDatim+'</span> \n';
				txt+='            <span>'+o.userNick+'</span> \n';
				txt+='            <span>'+o.bltnReadCnt+'</span> \n';
				txt+='        </div> \n';
				txt+='	</a> \n';
				txt+='</li> \n';
			});
			$(".board-list ul").append(txt);
		}else{
			$("#totalCnt").text(totalCnt+"건")
		}

		if(totalCnt < Number($("#pageIndex").val())){
			$(window).off('scroll');
		}else{
			$(window).off().on("scroll",function() {
				if ($(window).scrollTop() >= $(document).height() - $(window).height() - 150 && flag ) {
					flag = false;
					$("#pageIndex").val(Number($("#pageIndex").val())+10);
					counselCenter.counselBoardAjax();
				}
			});
		}
	}else{
		$("#returnUrl").val(returnUrl);
		$(".login-guide").show();
		$("#tabMain1").hide();
	}

	flag = true;
}

counselCenter.insertMemberCounselBoardMemo = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/insertMemberCounselBoardMemo.do",param,counselCenter.insertMemberCounselBoardMemoSuccess,counselCenter.boardInsertError);

}

counselCenter.insertMemberCounselBoardMemoSuccess = function(data){
	var memoList = data.memoList;
	var txt = "";
	if(memoList != null && memoList.length > 0){
		$("#boardForm textarea[name='memoCntt']").val("");
		$.each(memoList,function(i,o){
			txt+= '<li>\n';
     	   	txt+= '	<div class="info">\n';
 	    	txt+= '		<b class="name">'+o.userNick+'</b>\n';
      	    txt+= '   		<span class="day">'+o.regDatim+'</span>\n';
       	   	txt+= '	</div>\n';
       	   	txt+= '	<p class="comment">\n';
           	txt+= 	o.memoCntt+'\n';
           	txt+= '	</p>\n';
        	txt+= '</li>\n';
		});

		$(".comment-list").html(txt);

	}

}

counselCenter.insertValicationCheck = function(){

	if($("#boardId").val() == ''){
		alert("비정상적인 접근입니다.");
		return false;
	}

	if($.trim($("#boardForm input[name='bltnSubj']").val()) == '' ){
		alert("제목을 입력해주세요.");
		return false;
	}


	if($("#boardId").val() == 'sugt01' || $("#boardId").val() == 'sugt02' || $("#boardId").val() == 'sugt03'  ){
		if($.trim($("#extStr0").val()) == ''){
			alert("이메일을 입력해주세요.")
			return false;
		}

		var regex=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
		if(!regex.test($.trim($("#extStr0").val()))) {
			alert("올바르지 않은 이메일주소입니다.");
			return false;
		}

	}
	if($("#boardId").val() == 'nonextaudit01' || $("#boardId").val() == 'nonextaudit02' || $("#boardId").val() == 'nonextaudit04' || $("#boardId").val() == 'nonextaudit05'    ){
		if($.trim($("#phoneNumber1").val()) == '' || $.trim($("#phoneNumber2").val()) == '' || $.trim($("#phoneNumber3").val()) == ''){
			alert("전화번호를 입력해주세요.")
			return false;
		}
	}

	if($.trim($("#boardForm textarea[name='bltnCntt']").val()) == '' ){
		alert("내용을 입력해주세요.");
		return false;
	}


	var param = new FormData($("#boardForm")[0]);
	fn_ajax_form_call("/kicpa/counselCenter/insertBoard.do",param,counselCenter.insertBoardSuccess);

}

counselCenter.counselBoardValicationCheck = function(){
	if($("#cateId").val() == ''){
		alert("비정상적인 접근입니다.");
		return false;
	}

	if($.trim($("#boardForm input[name='bltnSubj']").val()) == '' ){
		alert("제목을 입력해주세요.");
		return false;
	}


	if($.trim($("#userEmail").val()) == ''){
		alert("이메일을 입력해주세요.")
		return false;
	}

	var regex=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
	if(!regex.test($.trim($("#userEmail").val()))) {
		alert("올바르지 않은 이메일주소입니다.");
		return false;
	}

	if($.trim($("#phoneNumber1").val()) == '' || $.trim($("#phoneNumber2").val()) == '' || $.trim($("#phoneNumber3").val()) == ''){
		alert("전화번호를 입력해주세요.")
		return false;
	}

	if($.trim($("#boardForm textarea[name='bltnCntt']").val()) == '' ){
		alert("내용을 입력해주세요.");
		return false;
	}

	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/insertMemberCounselBoard.do",param,counselCenter.insertMemberCounselBoardSuccess,counselCenter.boardInsertError);

}

counselCenter.declarationStep2Validation = function(){
	if($.trim($("#boardForm input[name='arWtitle']").val()) == '' ){
		alert("제목을 입력해주세요.");
		return false;
	}
	if($.trim($("#boardForm input[name='arPswd']").val()) == ''&& $("#gubun").val() == 'anonymous' ){
		alert("비밀번호를 입력해주세요.");
		return false;
	}
	if($.trim($("#boardForm input[name='arWname']").val()) == '' && $("#gubun").val() == 'anonymous'  ){
		alert("성명을 입력해주세요.");
		return false;
	}
	if($.trim($("#boardForm input[name='arBirthYmd']").val()) == '' ){
		alert("생년월일을 입력해주세요.");
		return false;
	}

	if($.trim($("#arEmail").val()) == ''){
		alert("이메일을 입력해주세요.")
		return false;
	}

	var regex=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
	if(!regex.test($.trim($("#arEmail").val()))) {
		alert("올바르지 않은 이메일주소입니다.");
		return false;
	}

	if($.trim($("#phone1").val()) == '' || $.trim($("#phone2").val()) == '' || $.trim($("#phone3").val()) == ''){
		alert("전화번호를 입력해주세요.")
		return false;
	}

	if($.trim($("#arZip").val()) == ''){
		alert("우편번호를 입력해주세요.")
		return false;
	}
	if($.trim($("#arAdd1").val()) == ''){
		alert("주소를 입력해주세요.")
		return false;
	}
	if($.trim($("#arAdd2").val()) == ''){
		alert("참고주소를 입력해주세요.")
		return false;
	}
	if($.trim($("#arAdd3").val()) == ''){
		alert("상세주소를 입력해주세요.")
		return false;
	}
	if($.trim($("#arConame").val()) == ''){
		alert("법인명(회사명) 입력해주세요.")
		return false;
	}


	if($("#boardForm input[name^='arReport'][type='checkbox']:checked").length == 0 ){
		alert("회계부정행위를 선택해주세요.");
		return false;
	}

	if($("#arReport0").prop("checked") && $.trim($("#arReportEtc").val()) == ''  ){
		alert("기타 회계부정행위를 입력해주세요.");
		return false;
	}

	if($.trim($("#arContent").val()) == ''){
		alert("신고내용을 입력해주세요.")
		return false;
	}

	if($.trim($("#boardForm input[name='arReportUse']:checked").val()) == ''){
		alert("다기관 신고여부를 선택해주세요.")
		return false;
	}

	if($.trim($("#boardForm input[name='arReportUse']:checked").val()) == '1' && $.trim($("#arReportConame").val()) == ''){
		alert("신고기관을 입력해주세요.")
		return false;
	}


	var param = new FormData($("#boardForm")[0]);
	fn_ajax_form_call("/kicpa/counselCenter/insertDeclarationBoard.do",param,counselCenter.insertDeclarationBoardSuccess);

}

counselCenter.insertDeclarationBoardSuccess = function(data){
	var isLogin =data.isLogin;
	alert("등록되었습니다.");

	if(isLogin){
		$(opener.document).find("#pageIndex").val(1);
		$(opener.document).find(".board-list ul").html("");
		opener.counselCenter.getDeclarationBoardListAjax();
		window.close();
	}else{
		location.href="/kicpa/counselCenter/declarationBoardList.do";
	}
}



counselCenter.insertMemberCounselBoardSuccess = function(data){
	alert("등록되었습니다.");
	$(opener.document).find("#pageIndex").val(1);
	$(opener.document).find(".board-list ul").html("");
	opener.counselCenter.counselBoardAjax();
	window.close();

}



counselCenter.insertBoardSuccess = function(data){
	alert("등록되었습니다.");
	$(opener.document).find("#pageIndex").val(1);
	$(opener.document).find(".board-list ul").html("");
	opener.board.boardBoardListAjax();
	window.close();
//	location.href="/kicpa/counselCenter/kifrsBoardList.do";
}


counselCenter.fileDownload = function(seqNum){
	$("#boardForm input[name='seqNum']").val(seqNum);
	$("#boardForm").attr("action","/kicpa/counselCenter/fileDownload.do").submit();

}

counselCenter.daumPostcode = function(){
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            console.log(data);
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            $("#arZip").val(data.zonecode);
            $("#arAdd1").val(roadAddr);
//            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
            	$("#arAdd2").val(extraRoadAddr);
            } else {
            	$("#arAdd2").val("");
            }
        }
    }).open();
}

counselCenter.counselBoardDelete = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/updateMemberCounselBoardDelete.do",param,counselCenter.counselBoardDeleteSuccess,counselCenter.boardInsertError);
}

counselCenter.counselBoardDeleteSuccess = function(data){
	alert("삭제되었습니다.");
	$(opener.document).find("#pageIndex").val(1);
	$(opener.document).find(".board-list ul").html("");
	opener.counselCenter.counselBoardAjax();
	window.close();
}

counselCenter.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}
counselCenter.boardInsertError = function(data,status, error){
	alert("등록실패");
}








