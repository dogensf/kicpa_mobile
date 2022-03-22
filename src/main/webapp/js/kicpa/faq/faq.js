var faq = {};
//function fn_ajax_call(href, param, sfn, efn) {
var flag =true;
faq.listInit = function(){
	faq.getFaqSearchType();
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

		faq.listAjax()
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

		faq.listAjax()
	});


	faq.listAjax();
}

faq.listAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/faq/getFaqList.do",param,faq.getFaqListSuccess,faq.boardListError);
}

faq.getFaqSearchType = function (){
	var param = {}
	fn_ajax_call("/kicpa/faq/getFaqSearchType.do",param,faq.getFaqSearchTypeSuccess,faq.boardListError);
}

faq.getFaqSearchTypeSuccess = function(data){
	var ccode =data.ccode;
	board.searchTypeHtml(ccode,"해당업무","searchType1");
}

faq.fn_select_List_cate = function(obj,faqCate){
	$("#boardForm input[name='faqCate']").val(faqCate);
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	$("#boardSearchForm")[0].reset();
	$(".tab-sub ul > li").removeClass("active");
	$(obj).closest("li").addClass("active");
	faq.listAjax();
}

faq.getFaqListSuccess = function(data){
	var list = data.boardList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$.each(list,function(i,o){

			txt+='<li> \n';
			txt+='	<a href="javascript:board.openDetailPop(\'/kicpa/faq/faqDetail.do?faqId='+o.faqId+'\');"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.faqSj+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			txt+=' 	        	<span class="ico-arrow"></span> \n';
			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>'+o.regDt+'</span> \n';
			txt+='            <span>'+o.faqPart+'</span> \n';
			txt+='            <span>'+o.rdcnt+'</span> \n';
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
				faq.listAjax();
			}
		});
	}

	flag = true;
}


faq.boardListError = function(data,status, error){
	flag = true;
	alert("조회실패");
}






