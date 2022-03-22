var qna = {};
//function fn_ajax_call(href, param, sfn, efn) {
var flag =true;
qna.listInit = function(){
	qna.getQnaSearchType1();
	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop")
	});

	$("#boardSearchForm select[name='searchType1']").on("change",function(){
		if($(this).val()!= ''){
			qna.getQnaSearchType2();
		}
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

		qna.listAjax()
	});

	$(".btn-del").on("click",function(){
		$("#boardForm input[name='readInput']").removeClass("value");
		$("#boardForm input[name='searchKeyword']").val("");
		$("#boardSearchForm input[name='searchKeyword']").val("");
		$("#readInput").val("");
		$(".board-list ul").html("");
		$.each($("#boardSearchForm select[name^='searchType']") ,function(){
			$(this).val("");
		});
		$.each($("#boardForm input[name^='searchType']") ,function(){
			$(this).val("");
		});

		qna.listAjax()
	});


	qna.listAjax();
}

qna.initForm = function(){
	$("#boardForm select[name='category']").on("change",function(){
		if($(this).val()!= ''){
			qna.getQnaSearchTypeForm2();
		}
	});
}

qna.listAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/qna/getQnaList.do",param,qna.getQnaListSuccess,qna.boardListError);
}

qna.getQnaSearchType1 = function (){
	var param = {}
	fn_ajax_call("/kicpa/qna/getQnaSearchType1.do",param,qna.getQnaSearchType1Success,qna.boardListError);
}
qna.getQnaSearchType2 = function (){
	var param = {"searchType1" : $("#boardSearchForm select[name='searchType1']").val()}
	fn_ajax_call("/kicpa/qna/getQnaSearchType2.do",param,qna.getQnaSearchType2Success,qna.boardListError);
}
qna.getQnaSearchTypeForm2 = function (){
	var param = {"searchType1" : $("#boardForm select[name='category']").val()}
	fn_ajax_call("/kicpa/qna/getQnaSearchType2.do",param,qna.getQnaSearchType2Success,qna.boardListError);
}

qna.getQnaSearchType1Success = function(data){
	var ccode =data.ccode;
	board.searchTypeHtml(ccode,"카테고리","searchType1");
	board.searchTypeHtml({},"해당업무","searchType2");
	var list = new Array();

	var status = {"code" : "등록","codeName" : "등록"};
	list.push(status)
	status = {"code" : "등록","codeName" : "조치중"};
	list.push(status)
	status = {"code" : "등록","codeName" : "완료"};
	list.push(status)


	board.searchTypeHtml(list,"민원처리상태","searchType3");
}
qna.getQnaSearchType2Success = function(data){
	var ccode =data.ccode;
	var txt = "";
	txt='<option value="">전체</option>\n';
	$.each(ccode,function(i,o){
		txt += '<option value="'+o.code+'">'+o.codeName+'</option>\n';
	});
	$("#searchType2").html(txt);

}

qna.getQnaListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$.each(list,function(i,o){

			txt+='<li> \n';
			txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/qna/qnaDetail.do?qnaId='+o.qnaId+'\');"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.qnaSj+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			txt+=' 	        	<span class="ico-arrow"></span> \n';
			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>'+o.regDt+'</span> \n';
			txt+='            <span>'+o.category+'</span> \n';
			txt+='            <span>'+o.job+'</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		})
		$(".board-list ul").append(txt);
		$("#totalCnt").text(totalCnt+"건")
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
				qna.listAjax();
			}
		});
	}

	flag = true;
}

qna.validation = function(){
	if($.trim($("#boardForm select[name='category']").val()) ==''){
		alert("카테고리를 선택해주세요.");
		return false;
	}
	if($.trim($("#boardForm select[name='job']").val()) ==''){
		alert("해당업무를 선택해주세요.");
		return false;
	}
	if($.trim($("#boardForm input[name='qnaSj']").val()) ==''){
		alert("제목를 입력해주세요.");
		return false;
	}
	if($.trim($("#boardForm textarea[name='qnaCn']").val()) ==''){
		alert("내용를 입력해주세요.");
		return false;
	}

	qna.insertQna();
}


qna.insertQna = function (){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/qna/insertQna.do",param,qna.insertQnaSuccess,qna.boardListError);
}

qna.insertQnaSuccess = function(data){
	alert("등록되었습니다.")
	opener.location.reload();
	window.close();

}


qna.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






