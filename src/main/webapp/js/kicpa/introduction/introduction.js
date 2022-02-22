var introduction = {};
var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {

introduction.detailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}

introduction.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






