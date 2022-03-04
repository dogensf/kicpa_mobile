var counselCenter = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {
counselCenter.declarationInit = function(){

	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/getDeclarationBoardList.do",param,counselCenter.getBoardListSuccess,counselCenter.boardListError);
}


counselCenter.counselInit = function(){

	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop")
	});


	$("#searchPop .btn-send").on("click",function(){
		$("#searchPop .btn-close").click();
		$("#pageIndex").val(1);
		$(".board-list ul").html("");
		$("#boardForm input[name='searchKeyword']").val($("#searchKeyword").val());
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/counselCenter/getCounselBoardList.do",param,counselCenter.getCounselBoardListSuccess,counselCenter.boardListError);
	});

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

	$("#phoneNumber1,#phoneNumber2,#phoneNumber3").on("keyup",function(){
		$(this).val( $(this).val().replace(/[^0-9]/g, ""));
	});


}


counselCenter.memoCheckValidation = function(){
	if($("#boardForm textarea[name='memoCntt']").val() == ''){
		alert("의견을 입력해주세요.");
		return false;
	}
	counselCenter.insertMemberCounselBoardMemo();

};


counselCenter.categoryTab = function(obj,cateId){
	$("#boardForm input[name='searchKeyword']").val("");
	$(".tab-link").removeClass("active");
	$("#cateId").val(cateId);
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	$(obj).addClass("active");
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/getCounselBoardList.do",param,counselCenter.getCounselBoardListSuccess,counselCenter.boardListError);

}

counselCenter.kifrsTab = function(obj,boardId){

	if(boardId == 'kifrs' || boardId == 'sugt01' || boardId == 'sugt02' || boardId == 'sugt03'){
		$(".btn-write").show();
	}else{
		$(".btn-write").hide();
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
	var txt = "";
	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();
		if(list != null && list.length > 0){
			$("#totalCnt").text(totalCnt+"건")
			$.each(list,function(i,o){
				txt+='<li> \n';
				txt+='	<a href="/kicpa/counselCenter/declarationBoardDetail.do?arIdNum='+o.arIdNum+'" target="_blank"> \n';
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
					fn_ajax_call("/kicpa/counselCenter/getDeclarationBoardList.do",param,counselCenter.getBoardListSuccess,counselCenter.boardListError);
				}
			});
		}
	}else{
		$(".login-guide").show();
		$("#tabMain1").hide();
	}

	flag = true;

}


counselCenter.getCounselBoardListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var isLogin = data.isLogin;
	var txt = "";
	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();

		if(list != null && list.length > 0){
			$("#totalCnt").text(totalCnt+"건")
			$.each(list,function(i,o){
				txt+='<li> \n';
				txt+='	<a href="/kicpa/counselCenter/counselBoardDetail.do?bltnNo='+o.bltnNo+'" target="_blank"> \n';
				txt+=' 		<div class="title-zone"> \n';
				txt+=' 			<p>'+o.bltnSubj+'[' +o.bltnMemoCnt+']</p> \n';
				txt+=' 	      	<div class="other"> \n';
				if(o.replyStatus = 'C'){
					txt+=' 	        	<span class="state">답변완료</span> \n';
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
					var param = $("#boardForm").serializeObject();
					fn_ajax_call("/kicpa/counselCenter/getCounselBoardList.do",param,counselCenter.getCounselBoardListSuccess,counselCenter.boardListError);
				}
			});
		}
	}else{
		$(".login-guide").show();
		$("#tabMain1").hide();
	}

	flag = true;
}

counselCenter.insertMemberCounselBoardMemo = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/counselCenter/insertMemberCounselBoardMemo.do",param,counselCenter.insertMemberCounselBoardMemoSuccess,counselCenter.boardListError);

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



counselCenter.insertBoardSuccess = function(data){
	alert("등록되었습니다.");
	$(opener.document).find("#pageIndex").val(1);
	$(opener.document).find(".board-list ul").html("");
	opener.board.boardBoardListAjax();
	window.close();
//	location.href="/kicpa/counselCenter/kifrsBoardList.do";
}




counselCenter.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






