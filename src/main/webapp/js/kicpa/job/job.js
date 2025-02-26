var job = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {
job.init = function(){

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

			//수습CPA일 경우 기본 ijCoSep 값 변경
			if($("#ijJobSep").val() == '8' && $('#ijCoSep').val() == '1'){
				$('#ijCoSep').val('5');
			}

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

		$(".board-list ul").html("");
		if($("#boardId").val() != 'jobInfoKicpa'){

			//수습CPA일 경우 기본 ijCoSep 값 변경
			if($("#ijJobSep").val() == '8' && $('#ijCoSep').val() == '1'){
				$('#ijCoSep').val('5');
			}

			var param = $("#boardForm").serializeObject();
			fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
		}else{
			board.boardBoardListAjax();
		}
	});



	if($("#boardId").val() != 'jobInfoKicpa'){

		//수습CPA일 경우 기본 ijCoSep 값 변경
		if($("#ijJobSep").val() == '8' && $('#ijCoSep').val() == '1'){
			$('#ijCoSep').val('5');
		}

		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/job/getBoardList.do",param,job.boardListSuccess,job.boardListError);
		job.getSearchTypeList();
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
	}else if($("#ijJobSep").val() == '8'){
		param = {"codeTag2" : "수습CPA" }
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
	var compCodeList = data.compCodeList;
	$("#boardForm input[name^='searchType']").remove();
	$("#searchPop .add-row").remove();
	if(compCodeList != null && compCodeList.length > 0){
		board.searchTypeHtml(compCodeList,"회사구분","searchType4",true);
	}
	if(distCodeList != null && distCodeList.length > 0){
		board.searchTypeHtml(distCodeList,"근무지역","searchType1",false);
	}
	if(empCodeList != null && empCodeList.length > 0){
		board.searchTypeHtml(empCodeList,"고용형태","searchType2",true);
	}
	if(hireCodeList != null && hireCodeList.length > 0){
		board.searchTypeHtml(hireCodeList,"채용구분","searchType3",true);
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

	//수습CPA일 경우 기본 ijCoSep 값 변경
	if(ijJobSep == '8'){
		$('#ijCoSep').val('5');
	}
	else{
		$('#ijCoSep').val('1');
	}

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

			//수습cpa 일 경우에만 구직완료구분 보여주기
			if($("#ijJobSep").val() == '8'){
				txt+='            <span>'+o.ijJobTermSepNm+'</span> \n';
			}

			txt+='            <span>'+o.ijRecount+'</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});
		$(".board-list ul").append(txt);
	}else{
		$("#totalCnt").text(totalCnt+"건")
	}

	if($("#ijJobSep").val() == '8'){
		$('.job_cpaTrain').show();
		$('.job_cpa').hide();
	}
	else{
		$('.job_cpaTrain').hide();
		$('.job_cpa').show();
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






