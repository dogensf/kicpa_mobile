var board = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {
board.boardListInit = function(){

	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop")
	});


	$("#searchPop .btn-send").on("click",function(){
		$("#searchPop .btn-close").click();
		$("#pageIndex").val(1);
		$(".board-list ul").html("");
		$("#boardForm input[name='searchKeyword']").val($("#boardSearchForm input[name='searchKeyword']").val());
		board.boardBoardListAjax();
	});

	board.boardBoardListAjax();
}

board.detailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}z
	});
}


board.boardBoardListAjax = function(){
	if($("#boardId").val().indexOf("/") <= -1){
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/commonBoard/getCommonBoardList.do",param,board.commonBoardListSuccess,board.boardListError);
	}else{
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/commonBoard/getCommonBoardArrList.do",param,board.commonBoardArrListSuccess ,board.boardListError);
	}
}


board.commonBoardListSuccess = function(data){
	var list = data.boardList;
	var boardMaster = data.boardMaster
	var totalCnt = data.totalCnt;
	var isLogin = data.isLogin;
	var txt = "";

	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();
		if(list != null && list.length > 0){
			$("#totalCnt").text(totalCnt+"건")
			$.each(list,function(i,o){

				if(o.bltnLev != 1){
					txt+='<li class="answer"> \n';
				}else{
					txt+='<li> \n';
				}

				if(o.delFlag == 'N'){

					txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/commonBoard/boardDetail.do?boardId='+o.boardId+'&bltnNo='+o.bltnNo+'\');"> \n';
					txt+=' 		<div class="title-zone"> \n';



						if(o.bltnIcon  == 'D'){
							txt+=' 			<p class="lock">'+o.bltnSubj+'</p> \n';
						}else{
							txt+=' 			<p>'+o.bltnSubj+'</p> \n';
						}


					txt+=' 	      	<div class="other"> \n';
					if(o.bltnTopTag != 'N'){
						txt+=' 	        	<span class="ico-bell"></span> \n';
					}else if(o.fileCnt > 0){
						txt+=' 	        	<span class="ico-file"></span> \n';
					}else{
						txt+=' 	        	<span class="ico-arrow"></span> \n';
					}
					txt+=' 	        </div> \n';
					txt+=' 	    </div> \n';
					txt+='      <div class="info-zone"> \n';

					//등록일자 표시 설정
					if(boardMaster.ttlYns10 == 'Y'){
						txt+='            <span>'+o.regDatim+'</span> \n';
					}

					if(o.bltnTopTag != 'N'){
						txt+='            <span>관리자</span> \n';

						//닉네임 표시 사용설정
					}else if(boardMaster.ttlYns9 == 'Y'){
						txt+='            <span>'+o.userNick+'</span> \n';
					}
					//확징필드 사용설정
					else if(boardMaster.funcYns9 == 'Y' && boardMaster.extTitle1 != null && boardMaster.extTitle1 != ''){
						txt+='            <span>'+o.extStr1+'</span> \n';

					}
					//조회수 표시 사용설정
					if(boardMaster.ttlYns10 == 'Y'){
						txt+='            <span>'+o.bltnReadCnt+'</span> \n';
					}
					txt+='        </div> \n';
					txt+='	</a> \n';
				}else{
					txt+=' 		<div class="title-zone"> \n';
					txt+=' 			<p>삭제된 글입니다.</p> \n';
					txt+=' 	    </div> \n';

				}
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
					board.boardBoardListAjax();
				}
			});
		}

	}else{
		$(".login-guide").show();
		$("#tabMain1").hide();
	}

	flag = true;
}


board.commonBoardArrListSuccess = function(data){
	var list = data.boardList;
	var isLogin = data.isLogin;
	var totalCnt = data.totalCnt;
	var txt = "";

	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();
		if(list != null && list.length > 0){
			$("#totalCnt").text(totalCnt+"건")
			$.each(list,function(i,o){

				if(o.bltnLev != 1){
					txt+='<li class="answer"> \n';
				}else{
					txt+='<li> \n';
				}

				txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/commonBoard/boardDetail.do?boardId='+o.boardId+'&bltnNo='+o.bltnNo+'\');"> \n';
				txt+=' 		<div class="title-zone"> \n';
				if(o.bltnIcon  == 'D'){
					txt+=' 			<p class="lock">'+o.bltnSubj+'</p> \n';
				}else{
					txt+=' 			<p>'+o.bltnSubj+'</p> \n';

				}
				txt+=' 	      	<div class="other"> \n';
				if(o.bltnTopTag != 'N'){
					txt+=' 	        	<span class="ico-bell"></span> \n';
				}else if(o.fileCnt > 0){
					txt+=' 	        	<span class="ico-file"></span> \n';
				}else{
					txt+=' 	        	<span class="ico-arrow"></span> \n';
				}
				txt+=' 	        </div> \n';
				txt+=' 	    </div> \n';
				txt+='      <div class="info-zone"> \n';
				txt+='            <span>'+o.regDatim+'</span> \n';
				txt+='            <span>'+o.extStr1+'</span> \n';
				txt+='            <span>'+o.bltnReadCnt+'</span> \n';
				txt+='        </div> \n';
				txt+='	</a> \n';
				txt+='</li> \n';
			});
			$(".board-list ul").append(txt);
		}

		if(totalCnt < Number($("#pageIndex").val())){
			$(window).off('scroll');
		}else{
			$(window).off().on("scroll",function() {
				if ($(window).scrollTop() >= $(document).height() - $(window).height() - 150 && flag ) {
					flag = false;
					$("#pageIndex").val(Number($("#pageIndex").val())+10);
					board.boardBoardListAjax();
				}
			});
		}

	}else{
		$(".login-guide").show();
		$("#tabMain1").hide();
	}
	flag = true;
}

board.searchTypeHtml = function(list,title,id){
	var txt= "";
	var rowData = $("#searchPop .first-row").clone();
	rowData.removeClass("first-row");
	rowData.addClass("add-row");
	rowData.find(".label").text(title);
	rowData.find(".label").attr("for",id);
	rowData.find("select").attr({"id":id , "name" : id});
	$("#boardForm").append('<input type="hidden" name="'+id+'"/> ')

	if(list != null && list.length > 0){
		$.each(list,function(i,o){
			txt += '<option value="'+o.code+'">'+o.codeName+'</option>\n';
		})
	}

	rowData.find("select").append(txt);

	rowData.find("select").off().on("change",function(){
		$("#boardForm input[name='"+id+"']").val($(this).val());
	});


	rowData.show();
	$("#searchPop .inp-box:eq("+($('#searchPop .inp-box').length-2)+")").after(rowData);



}

board.fileDownload = function(fileSeq){
	$("#boardForm input[name='fileSeq']").val(fileSeq);
	$("#boardForm").attr("action","/kicpa/commonBoard/boardFileDownload.do").submit();
}

board.openDetailPop = function(url,popId){
	if(popId == null){
		popId = "boardPop"
	}

	window.open(url);

}

board.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






