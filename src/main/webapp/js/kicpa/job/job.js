var job = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {
job.init = function(){

	job.getSearchTypeList();

	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop")
	});


	$("#searchPop .btn-send").on("click",function(){
		$("#searchPop .btn-close").click();
		$("#pageIndex").val(1);
		$(".board-list ul").html("");


		var txt = "";
		$.each($("#boardSearchForm select[name^='searchType']") ,function(){
			txt += $(this).find("option:selected").text()+" - ";
		});

		if($("#boardSearchForm input[name='searchKeyword']").val() != ''){
			txt += $("#boardSearchForm input[name='searchKeyword']").val();
		}else{
			txt = txt.substring(0,txt.length - 3);
		}

		$("#boardForm input[name='searchKeyword']").val($("#boardSearchForm input[name='searchKeyword']").val());
		$("#readInput").val(txt);

		if(txt != '' || $("#boardSearchForm input[name='searchKeyword']").val() != '' ){
			$("#boardForm input[name='readInput']").addClass("value");
		}

		if($("#ijJobSep").val() != 'jobInfoKicpa'){
			var param = $("#boardForm").serializeObject();
			fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
		}else{
			board.boardBoardListAjax();
		}
	});


	$(".btn-del").on("click",function(){
		$("#boardForm input[name='readInput']").removeClass("value");
		$("#boardForm input[name='searchKeyword']").val("");
		$("#boardSearchForm input[name='searchKeyword']").val("");
		$("#readInput").val("");
		$.each($("#boardSearchForm select[name^='searchType']") ,function(){
			$(this).val("");
		});
		$.each($("#boardForm input[name^='searchType']") ,function(){
			$(this).val("");
		});

		if($("#boardId").val() != 'jobInfoKicpa'){
			var param = $("#boardForm").serializeObject();
			fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
		}else{
			board.boardBoardListAjax();
		}
	});



	if($("#boardId").val() != 'jobInfoKicpa'){
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
	}else{
		board.boardBoardListAjax();
	}
}

job.detailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}


job.getSearchTypeList = function(){
	var param = {};

	if($("#ijJobSep").val() == '1'){
		param = {"codeTag2" : "CPA" }
	}else{
		param = {"codeTag2Gbn" : "Y" }
	}
//		$("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/job/getSearchTypeList.do",param,job.getSearchTypeListSuccess,job.boardListError);
}


job.getSearchTypeListSuccess = function(data){
	var hireCodeList = data.hireCodeList;
	var distCodeList = data.distCodeList;
	var empCodeList = data.empCodeList;
	$("#boardForm input[name^='searchType']").remove();
	$("#searchPop .add-row").remove();
	board.searchTypeHtml(distCodeList,"근무지역","searchType1");
	board.searchTypeHtml(empCodeList,"고용형태","searchType2")
	if(hireCodeList != null && hireCodeList.length > 0){
		board.searchTypeHtml(hireCodeList,"채용구분","searchType3");
	}

}



job.ijCoSepChange = function(obj,ijCoSep){
	$(".tab-sub ul > li").removeClass("active");
	$("#ijCoSep").val(ijCoSep);
	$(obj).closest("li").addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);

}

job.menuChange = function(obj,ijJobSep){
	$("#boardForm input[name='readInput']").removeClass("value");
	$("#readInput").val("");
	$("#boardForm input[name='searchKeyword']").val("");
	$(".tab-link").removeClass("active");
	$(obj).addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	$("#boardSearchForm")[0].reset();
	if(ijJobSep != 'jobInfoKicpa'){
		$(".login-guide").hide();
		$("#tabMain1").show();
		$(".tab-sub").show();
		$("#ijJobSep").val(ijJobSep);
		job.getSearchTypeList();
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
	}else{
		$("#loginYn").val('Y');
		$("#ijJobSep").val(ijJobSep);
		$("#boardId").val(ijJobSep);
		$(".tab-sub").hide();
		$("#boardForm input[name^='searchType']").remove();
		$("#searchPop .add-row").remove();
//		var param = $("#boardForm").serializeObject();
//		fn_ajax_call("/kicpa/job/getMemberPollList.do",param,job.getMemberPollListSuccess,job.boardListError);
		board.boardBoardListAjax();
	}


}

job.boardListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(totalCnt+"건")
		$.each(list,function(i,o){
			txt+='<li> \n';
			txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/job/boardDetail.do?boardId='+o.boardId+'\');"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.ijWtitle+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			txt+=' 	        	<span class="state">'+o.jobName+'</span> \n';
			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>'+o.ijWdate+'</span> \n';
			txt+='            <span>'+o.ijCoName+'</span> \n';
			txt+='            <span>'+o.sidoArea+' '+o.gugunArea+'</span> \n';
			txt+='            <span>'+o.ijRecount+'</span> \n';
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
				fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
			}
		});
	}



	flag = true;

}

//job.commonBoardListSuccess = function(data){
//	var list = data.boardList;
//	var totalCnt = data.totalCnt;
//	var txt = "";
//	if(list != null && list.length > 0){
//		$("#totalCnt").text(totalCnt+"건")
//		$.each(list,function(i,o){
//			txt+='<li> \n';
//			txt+='	<a href="#" target="_blank"> \n';
//			txt+=' 		<div class="title-zone"> \n';
//			txt+=' 			<p>'+o.bltnSubj+'</p> \n';
//			txt+=' 	      	<div class="other"> \n';
//			if(o.fileCnt > 0){
//				txt+='				<span class="ico-file"></span>\n';
//			}else{
//				txt+=' 	        	<span class="ico-arrow"></span> \n';
//			}
////			txt+=' 	        	<span class="state">'+o.jobName+'</span> \n';
//			txt+=' 	        </div> \n';
//			txt+=' 	    </div> \n';
//			txt+='      <div class="info-zone"> \n';
//			txt+='            <span>'+o.regDatim+'</span> \n';
//			txt+='            <span>'+o.extStr1+'</span> \n';
//			txt+='            <span>'+o.bltnReadCnt+'</span> \n';
//			txt+='        </div> \n';
//			txt+='	</a> \n';
//			txt+='</li> \n';
//		});
//		$(".board-list ul").append(txt);
//	}
//
//	if(totalCnt < Number($("#pageIndex").val())){
//		$(window).off('scroll');
//	}else{
//		$(window).off().on("scroll",function() {
//			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && flag ) {
//				flag = false;
//				$("#pageIndex").val(Number($("#pageIndex").val())+10);
//				var param = $("#boardForm").serializeObject();
//				fn_ajax_call("/kicpa/commonBoard/getCommonBoardList.do",param,job.commonBoardListSuccess,job.boardListError);
//			}
//		});
//	}
//
//
//
//	flag = true;
//
//},

//job.getMemberPollListSuccess = function(data){
//	var list = data.boardList;
//	var totalCnt = data.totalCnt;
//	var txt = "";
//	if(list != null && list.length > 0){
//		$("#totalCnt").text(totalCnt+"건")
//		$.each(list,function(i,o){
//			txt+='<li> \n';
//			txt+='	<a href="#" target="_blank"> \n';
//			txt+=' 		<div class="title-zone"> \n';
//			txt+=' 			<p>'+o.ijsbTitle+'</p> \n';
//			txt+=' 	      	<div class="other"> \n';
//			txt+=' 	        	<span class="ico-arrow"></span> \n';
////			txt+=' 	        	<span class="state">'+o.jobName+'</span> \n';
//			txt+=' 	        </div> \n';
//			txt+=' 	    </div> \n';
//			txt+='      <div class="info-zone"> \n';
//			txt+='            <span>'+o.ijsbSysDate+'</span> \n';
//			txt+='            <span>'+o.compName+'</span> \n';
//			txt+='            <span>'+o.ijsbRecount+'</span> \n';
//			txt+='        </div> \n';
//			txt+='	</a> \n';
//			txt+='</li> \n';
//		});
//		$(".board-list ul").append(txt);
//	}
//
//	flag = true;
//
//}

job.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






