var taxNews = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {

taxNews.detailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}


taxNews.menuChange = function(obj,boardId){
	$("#boardForm input[name='searchKeyword']").val("")
	$("#boardId").val(boardId);
	$(".tab-link").removeClass("active");
	$(obj).addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	board.boardBoardListAjax();
}


taxNews.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






