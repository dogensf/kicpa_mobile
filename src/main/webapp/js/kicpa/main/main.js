var main = {};
//function fn_ajax_call(href, param, sfn, efn) {


main.changeBoardId = function(obj,boardId){
	$("#boardId").val(boardId);
	$(".noticeTab ul > li").removeClass("active");
	$(obj).closest("li").addClass("active");

	if(boardId == 'NEWS'){
		flag = false;
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/main/getNewsList.do",param,main.getNewsListSuccess,main.boardListError);
	}else{
		main.boardBoardListAjax();

	}
}


main.jobChange = function(obj,boardId){
	$("#boardId").val(boardId);
	$(".jobTab ul > li").removeClass("active");
	$(obj).closest("li").addClass("active");

	if(boardId == 'jobInfoKicpa'){
		main.boardBoardListAjax();
	}else{
		$("#boardForm input[name='ijJobSep'").val(boardId);
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/main/getJobBoardList.do",param,main.getJobBoardListSuccess,main.boardListError);

	}
}


main.getNewsListSuccess = function(data){
	var list = data.boardList;
	var txt = "";
	if(list != null && list.length > 0){
		$.each(list,function(i,o){
			txt+='<li> \n';
			if(o.knlUrl == null){
				txt+='	<a href="javascript:window.open(\'/kicpa/commonBoard/boardDetail.do?boardId='+o.knlGubun+'&bltnNo='+o.knlId+'\');"> \n';
			}else{
				txt+='	<a href="'+o.knlUrl+'" target="_blank"> \n';
			}
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.knlSubject+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			txt+=' 	        	<span class="ico-arrow"></span> \n';
			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>'+o.knlSource+'</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});

		$(".noticeList ul").html(txt);
	}else{
		$(".noticeList ul").html("");
	}

}


main.boardBoardListAjax = function(){
	if($("#boardId").val().indexOf("/") <= -1){
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/main/getCommonBoardList.do",param,main.commonBoardListSuccess,main.boardListError);
	}else{
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/main/getCommonBoardArrList.do",param,main.commonBoardArrListSuccess ,main.boardListError);
	}
}



main.commonBoardListSuccess = function(data){
	var list = data.boardList;
	var boardMaster = data.boardMaster
	var isLogin = data.isLogin;
	var txt = "";
	if(list != null && list.length > 0){
		$.each(list,function(i,o){
			txt+='<li> \n';
			txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/commonBoard/boardDetail.do?boardId='+o.boardId+'&bltnNo='+o.bltnNo+'\');"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.bltnSubj+'</p> \n';


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


			//닉네임 표시 사용설정
			if(boardMaster.ttlYns9 == 'Y'){
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
			txt+='</li> \n';
		});
		if($("#boardId").val() != 'jobInfoKicpa'){
			$(".noticeList ul").html(txt);
		}else{
			$(".jobList ul").html(txt);
		}
	}else{
		if($("#boardId").val() != 'jobInfoKicpa'){
			$(".noticeList ul").html(txt);
		}else{
			$(".jobList ul").html(txt);
		}

	}


}


main.commonBoardArrListSuccess = function(data){
	var list = data.boardList;
	var txt = "";

	if(list != null && list.length > 0){
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
		$(".noticeList ul").html(txt);
	}else{
		$(".noticeList ul").html(txt);
	}

}

main.getJobBoardListSuccess = function(data){
	var list = data.boardList;
	var txt = "";
	if(list != null && list.length > 0){
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
			txt+='            <span>'+o.ijRecount+'</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});
		$(".jobList ul").html(txt);
	}else{
		$(".jobList ul").html(txt);
	}


}


main.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}

main.calChange = function(obj){

	var yyyymm = $('#selectCaldt option:selected').val();
	var param = { "yyyymm": yyyymm};

	fn_ajax_call("/kicpa/main/getCalendarInfo.do",param,main.calChangeSuccess,main.boardListError);
}

main.calChangeSuccess = function(data){

	if(data.sumCal == null || data.sumCal == ''){
		$("#cal01").text('0 건');
		$("#cal02").text('0 건');
		$("#cal03").text('0 건');
	}else{
		$("#cal01").text(data.sumCal.cnt01 + ' 건');
		$("#cal02").text(data.sumCal.cnt02 + ' 건');
		$("#cal03").text(data.sumCal.cnt03 + ' 건');
	}
	


}



