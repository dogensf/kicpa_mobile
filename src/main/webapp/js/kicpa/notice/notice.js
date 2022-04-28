var notice = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {

notice.boardListInit = function(){

	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop");
	});


	$("#searchPop .btn-send").on("click",function(){
		$("#searchPop .btn-close").click();
		$("#pageIndex").val(1);
		$(".board-list ul").html("");
		$("#boardForm input[name='searchKeyword']").val($("#boardSearchForm input[name='searchKeyword']").val());
		if($("#boardForm input[name='searchKeyword']").val() != ''){
			$("#boardForm input[name='searchKeyword']").addClass("value");
		}

		if($("#boardId").val() == 'NEWS'){
			flag = false;
			var param = $("#boardForm").serializeObject();
			fn_ajax_call("/kicpa/notice/getNewsList.do",param,notice.getNewsListSuccess,notice.boardListError);
		}else{
			board.boardBoardListAjax();
		}
	});

	$(".btn-del").on("click",function(){
		$("#boardForm input[name='searchKeyword']").removeClass("value");
		$("#boardForm input[name='searchKeyword']").val("");
		$("#boardSearchForm input[name='searchKeyword']").val("");
		if($("#boardId").val() == 'NEWS'){
			flag = false;
			var param = $("#boardForm").serializeObject();
			fn_ajax_call("/kicpa/notice/getNewsList.do",param,notice.getNewsListSuccess,notice.boardListError);
		}else{
			board.boardBoardListAjax();
		}
	});

	if($("#boardId").val() == 'NEWS'){
		flag = false;
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/notice/getNewsList.do",param,notice.getNewsListSuccess,notice.boardListError);
	}else{
		board.boardBoardListAjax();
	}

}

notice.detailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}

notice.menuChange = function(obj,boardId){
	$("#boardForm input[name='searchKeyword']").removeClass("value");
	$("#boardSearchForm")[0].reset();
	$("#boardForm input[name='searchKeyword']").val("");
	$("#boardId").val(boardId);
	$(".tab-link").removeClass("active");
	$(obj).addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");

	if(boardId == 'NEWS'){
		flag = false;
		var param = $("#boardForm").serializeObject();
		fn_ajax_call("/kicpa/notice/getNewsList.do",param,notice.getNewsListSuccess,notice.boardListError);
	}else{
		board.boardBoardListAjax();

	}

}


notice.getNewsListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(totalCnt+"건")
		$.each(list,function(i,o){
			txt+='<li> \n';
			if(o.knlUrl == null){
				txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/commonBoard/boardDetail.do?boardId='+o.knlGubun+'&bltnNo='+o.knlId+'\');"> \n';
			}else{
				if (window['bridge'] )  {
					txt+="	<a href=\"javascript:window.bridge.newWebView('popss','"+o.knlUrl+"','')\"> \n";
				}else{
					txt+='	<a href="'+o.knlUrl+'" target="_blank"> \n';
				}
				
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
				fn_ajax_call("/kicpa/notice/getNewsList.do",param,notice.getNewsListSuccess,notice.boardListError);
			}
		});
	}



	flag = true;

}

notice.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






