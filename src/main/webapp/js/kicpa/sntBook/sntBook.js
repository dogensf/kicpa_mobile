var sntBook = {};
//var flag = true;
//function fn_ajax_call(href, param, sfn, efn) {

sntBook.bookInit = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getBookList.do",param,sntBook.getBookListSuccess,sntBook.boardListError);
}
sntBook.kifrsBookInit = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getBookList.do",param,sntBook.getKifrsBookListSuccess,sntBook.boardListError);

	sntBook.cartValidation();
}
sntBook.taxBookInit = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getBookList.do",param,sntBook.geTaxBookListSuccess,sntBook.boardListError);
	sntBook.cartValidation();
}

sntBook.bookFormatInit = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getBookFormatList.do",param,sntBook.getBooFormatkListSuccess,sntBook.boardListError);
}
sntBook.offlineEduInit = function(){
	sntBook.offlineEduListAjax();
}


sntBook.lectureInit = function(){

	$("button.btn-round-sm").on("click",function(){
		var text = {}
		text.gray = "";
		text.gray += '실무특강 시리즈 및 개업지원 교육은 강좌별로 45명까지 선착순으로 수강신청을 받으며,<br/>\n';
		text.gray += '① 먼저 본회 홈페이지에서 수강신청 후 (로그인 필요)<br/>\n';
		text.gray += '② 아래의 계좌로 본인 명의로 입금하시면 수강신청이 완료됩니다.<br/>\n';
		text.gray += '     - 입금계좌: 국민은행 011-25-0016-100 (예금주 : 한국공인회계사회), 카드결제 불가<br/>\n';
		text.gray += '※ 선택하신 수강신청과목에 대한 총 수강료를 한 번에 입금해 주시기 바라며 , 수강신청 후 2일 이내에 입금내역이 확인되지 않는 경우<br/>\n';
		text.gray += '수강신청은 자동 취소됨을 알려드리오니 이 점 양지하여 주시기 바랍니다.<br/>\n';
		text.gray += '본 교육은 ZOOM 비대면 온라인으로만 진행되며, 추후 SMS 및 E-mail로 교재 및 강의 접속링크 등을 개별 안내드릴 예정이오니, 반드시 회원서비스센터 또는 전자문서수발신 시스템 → 내 정보 조회에서 연락처를 확인 해주시기 바랍니다.<br/>\n';
		text.gray += '선착순으로 접수에 따라 수강신청 후 입금이 완료되면 환불이나 전체·부분 취소는 어려운 점 양해 바랍니다. (수강인원이 저조한 과목의 경우 다음으로 연기될 수 있습니다.)<br/>\n';
		text.gray += '제공되는 교육은 회원연수시간이 인정되며, 교육 커리큘럼 및 일정 등은 사정에 따라 변경될 수 있습니다.\n';


		fn_portal_pop("informationPopup",text)

	})

	$("#appBtn").on("click",function(){
		if($("#boardForm input[name='emaEduCode']:checked").length == 0){
			alert("하나이상 선택하셔야 합니다.")
			return false;
		}


		sntBook.insertLecture();

	});

	sntBook.specialLectureListAjax();
}

sntBook.lectureDetailInit = function(){
	$("#appBtn").on("click",function(){
		sntBook.insertLecture();
	});
}

sntBook.cartInit = function(){
	$("#cartForm input[name='ibmBookCode']").on("change", function(){
		if($("#cartForm input[name='ibmBookCode']:checked").length > 0 ){
			var totalPrice = 0;
			$.each($("#cartForm input[name='ibmBookCode']:checked"),function(i,o){
				var price = Number($(this).closest("li").find(".product i").text().replace(/,|[원]/gi,""));
				var cnt = Number($(this).closest("li").find(".quantity-num em").text());
				console.log(price);
				console.log(cnt);
				totalPrice += price*cnt;
			});
			//배송비추가
			totalPrice+= 5000;
			totalPrice = String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			$("#totalBtn").text("합계금액 " +totalPrice+"원");
			$("#totalBtn").prop("disabled",false);
		}else{
			$("#totalBtn").text("합계금액 0원");
			$("#totalBtn").prop("disabled",true);
		}
	});


	$(".btn-minus-ico").on("click",function(){
		var cnt = $(this).closest("li").find(".quantity-num em").text();

		if(cnt <= 1){
			$(this).closest("li").find(".quantity-num em").text(1);
			alert("수량은 1개 이상입니다.");
		}else{
			sntBook.updateCart('MINUS',$(this).closest("li").find("input[name='ibmBookCode']").val());
		}

	});

	$(".btn-plus-ico").on("click",function(){
		var cnt = $(this).closest("li").find(".quantity-num em").text();
		sntBook.updateCart('PLUS',$(this).closest("li").find("input[name='ibmBookCode']").val());
	});


	$(".btn-del-ico").on("click",function(){
		sntBook.updateCart('DELETE',$(this).closest("li").find("input[name='ibmBookCode']").val());
	});

	$("#totalBtn").on("click",function(){
		if($("#cartForm input[name='ibmBookCode']:checked").length == 0){
			alert("선택된 상품이 없습니다.");
			return false;
		}


		sntBook.orderCartFrom();
	});




//	sntBook.specialLectureListAjax();
}

sntBook.bookDetailInit = function(){
	$(".btn-sticky").on("click",function(){
		sntBook.insertCart();
	});
}

sntBook.orderFormInit = function(){


	$("#mobileweb input[name='payCode']").on("change",function(){

		if($("#mobileweb input[name='payCode']:checked").val() == '2'){
			$(".tax").show();
		}else{
			$(".tax, .company").hide();
		}

	});

	$("#mobileweb input[name='cpyId']").on("change",function(){

		if($("#mobileweb input[name='cpyId']:checked").val() == '1'){
			$(".company").show();
		}else{
			$(".company").hide();
		}

	});

	$("#mobileweb input[name='payCode']").on("change",function(){
		if($("#mobileweb input[name='payCode']:checked").val() == '1'){
			$("#mobileweb input[name='P_INI_PAYMENT']").val('CARD');
		}else{
			$("#mobileweb input[name='P_INI_PAYMENT']").val('BANK');
		}
	});

}

sntBook.updateCart = function(gbn,ibmBookCode){
	var param = {"gbn" : gbn ,"ibmBookCode" : ibmBookCode}
	fn_ajax_call("/kicpa/sntBook/updateCart.do",param,sntBook.updateCartSuccess,sntBook.boardListError);
}

sntBook.updateCartSuccess = function(data){
	var gbn = data.gbn;
	var ibmBookCode = data.ibmBookCode;
	var cnt = data.cnt;
	if(gbn == 'DELETE'){
		if($(".basket-list li").length <= 2){
			$(".basket-list li").remove();
		}else{
			$("input[name='ibmBookCode'][value='"+ibmBookCode+"']").closest("li").remove();
			$("#cartForm input[name='ibmBookCode']").change();
		}
	}else if(gbn == 'PLUS' || gbn == 'MINUS' ){
		$("input[name='ibmBookCode'][value='"+ibmBookCode+"']").closest("li").find(".quantity-num em").text(cnt);
		$("#cartForm input[name='ibmBookCode']").change();
	}


}


sntBook.offlineEduListAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getOfflineEduList.do",param,sntBook.getOfflineEduListSuccess,sntBook.boardListError);
}
sntBook.offlineEduListAppAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getOfflineEduAppList.do",param,sntBook.getOfflineEduAppListSuccess,sntBook.boardListError);
}

sntBook.specialLectureListAjax = function(){
	var param = $("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/getSpecialLectureList.do",param,sntBook.getSpecialLectureListSuccess,sntBook.boardListError);
}

sntBook.insertCart = function(){
	var param =$("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/insertCart.do",param,sntBook.insertCartSuccess,sntBook.boardListError);
}

sntBook.insertCartSuccess = function(data){
	var isLogin = data.isLogin;
	if(isLogin){
		fn_portal_pop("bookCartPopup")

		$("#bookCartPopup .btn-send").off().on("click",function(){
			location.href='/kicpa/sntBook/cartList.do';
		});

	}else{
		sntBook.getCheckplusEncData();
	}
//	alert("완료 팝업창 뜰차례");
}




sntBook.detailInit = function(){
	$(".btn-board-togl").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}

sntBook.specialLectureChange = function(obj,gbn){
	$(".tab-link").removeClass("active");
	$("#gbn").val(gbn);
	$(obj).addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");
	sntBook.specialLectureListAjax();
}

sntBook.offlineEduMainTabs = function(obj,idx){
	$(".tab-link").removeClass("active");
	$(obj).addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");

	if(idx == 1){
		$(".tab-sub").show();
		sntBook.offlineEduListAjax();
	}else if(idx == 2 ){
		$(".tab-sub").hide();
		sntBook.offlineEduListAppAjax();
	}
}


sntBook.offlineEduSubTabs = function(obj,accEduUse){
	$(".tab-sub ul > li").removeClass("active");
	$("#accEduUse").val(accEduUse);
	$(obj).closest("li").addClass("active");
	$("#pageIndex").val(1);
	$(".board-list ul").html("");

	sntBook.offlineEduListAjax();
},


sntBook.getBookListSuccess = function(data){
	var list = data.bookList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(totalCnt+"건")
		$.each(list,function(i,o){
			txt+='<li> \n';
			txt+='	<a href="/kicpa/sntBook/bookDetail.do?ibmBookCode='+o.ibmBookCode+'&type=bookList"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.ibmBookName+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			if(o.ibmNum != '52'){
				if(o.ibmPublishSep == '9'){
					txt+=' 	        	<span class="state">품절</span> \n';
				}else{
					txt+=' 	        	<span class="ico-arrow"></span> \n';
				}
			}

			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>벌간년월 '+o.ibmYm+' 발간</span> \n';
			txt+='            <span>'+o.ibmPrice2+' (회원할인가: '+o.ibmPrice1+')</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});
		$(".board-list ul").append(txt);
	}
}

sntBook.getKifrsBookListSuccess = function(data){
	var list = data.bookList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(totalCnt+"건")
		$.each(list,function(i,o){
			txt+='<li> \n';
			txt+='	<a href="/kicpa/sntBook/bookDetail.do?ibmBookCode='+o.ibmBookCode+'&type=kifrsBookList"> \n';
//			txt+='		<div class="btn-zone">\n';
//			txt+='			<div class="inp-check">\n';
			if(o.ibmNum != '52'){
				if(o.ibmPublishSep == '9'){
					txt+='				<input type="checkbox" name="ibmBookCode" id="ibmBookCode'+i+'" value="'+o.ibmBookCode+'" disabled/>\n';
					txt+='				<label for="ibmBookCode'+i+'">선택</label>\n';
				}else{
					txt+='				<input type="checkbox" name="ibmBookCode" id="ibmBookCode'+i+'" value="'+o.ibmBookCode+'"/>\n';
					txt+='				<label for="ibmBookCode'+i+'">선택</label>\n';
				}
			}
//			txt+='			</div>\n';
//			txt+='		</div>\n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.ibmBookName+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			if(o.ibmNum != '52'){
				if(o.ibmPublishSep == '9'){
					txt+=' 	        	<span class="state">품절</span> \n';
				}else{
					txt+=' 	        	<span class="ico-arrow"></span> \n';
				}
			}

			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>발간년월 '+o.ibmYm+'</span> \n';
			txt+='            <span>'+o.ibmPrice1+'원</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});
		$(".board-list ul").append(txt);
	}
}

// 세무 단행본은 상세링크가 없다...
sntBook.geTaxBookListSuccess = function(data){
	var list = data.bookList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(totalCnt+"건")
		$.each(list,function(i,o){
			txt+='<li> \n';
			if(o.ibmNum != '52'){
				if(o.ibmPublishSep == '9'){
					txt+='				<input type="checkbox" name="ibmBookCode" id="ibmBookCode'+i+'" value="'+o.ibmBookCode+'" disabled/>\n';
					txt+='				<label for="ibmBookCode'+i+'">선택</label>\n';
				}else{
					txt+='				<input type="checkbox" name="ibmBookCode" id="ibmBookCode'+i+'" value="'+o.ibmBookCode+'"/>\n';
					txt+='				<label for="ibmBookCode'+i+'">선택</label>\n';
				}
			}
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.ibmBookName+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			if(o.ibmNum != '52'){
				if(o.ibmPublishSep == '9'){
					txt+=' 	        	<span class="state">품절</span> \n';
				}else{
					txt+=' 	        	<span class="ico-arrow"></span> \n';
				}
			}

			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>벌간년월 '+o.ibmYm+'</span> \n';
			txt+='            <span>'+o.ibmPrice1+'원</span> \n';
			txt+='        </div> \n';
			txt+='</li> \n';
		});
		$(".board-list ul").append(txt);
	}
}

sntBook.getBooFormatkListSuccess = function(data){
	var list = data.bookFormatList;
	var totalCnt = data.totalCnt;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(totalCnt+"건")
		$.each(list,function(i,o){
			txt+='<li> \n';
			txt+='	<a href="/kicpa/sntBook/bookFormatDetail.do?fileId='+o.fileId+'" target="_blank"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.fileTitle+'</p> \n';
			txt+=' 	      	<div class="other"> \n';
			if(o.fileName != null && o.fileName != ''){
				txt+=' 	        	<span class="state">다운로드</span> \n';
			}else{
				txt+=' 	        	<span class="ico-arrow"></span> \n';
			}

			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			if(o.fileName != null && o.fileName != ''){
				txt+='            <span>다운로드용</span> \n';
			}else{
				txt+='            <span>서면신청용</span> \n';
			}

			if(o.fileName != null && o.fileName != ''){
				txt+='            <span>'+o.downPrice+'원</span> \n';
			}else{
				txt+='            <span>'+o.orgPrice+'원</span> \n';
			}

			if(o.fileName != null && o.fileName != ''){
				txt+='            <span>단위/이용가능일 '+o.downDay+'원</span> \n';
			}else{
				txt+='            <span>단위/이용가능일  '+o.unit+'</span> \n';
			}
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});
		$(".board-list ul").append(txt);
	}

//	if(totalCnt < Number($("#pageIndex").val())){
//		$(window).off('scroll');
//	}else{
//		$(window).off().on("scroll",function() {
//			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && flag ) {
//				flag = false;
//				$("#pageIndex").val(Number($("#pageIndex").val())+10);
//				if($("#boardId").val().indexOf("/") <= -1){
//					var param = $("#boardForm").serializeObject();
//					fn_ajax_call("/kicpa/commonBoard/getCommonBoardList.do",param,notice.commonBoardListSuccess,notice.boardListError);
//				}else{
//					var param = $("#boardForm").serializeObject();
//					fn_ajax_call("/kicpa/commonBoard/getCommonBoardArrList.do",param,notice.commonBoardListSuccess ,notice.boardListError);
//				}
//			}
//		});
//	}

//	flag = true;
}

sntBook.getSpecialLectureListSuccess = function(data){
	var list = data.list;
	var gbn = data.gbn;
	var isLogin = data.isLogin;
	var txt = "";
	var totalCost = 0;

	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1").show();
		if(gbn == 'LISTPAGE2'){
			$("#tabMain1 .blue-box").hide();
			$(".sticky-bottom").show();
		}else{
			$("#tabMain1 .blue-box").show();
			$(".sticky-bottom").hide();
		}


		if(list != null && list.length > 0){
			$("#totalCnt").text(list.length+"건");
			$.each(list,function(i,o){
				txt+='<li> \n';
				txt+='	<a href="/kicpa/sntBook/specialLectureDetail.do?eduCode='+o.eduCode+'"> \n';

				if(gbn == 'LISTPAGE2'){

					if(o.cnt - o.regCnt <=  0){
						txt+='				<input type="checkbox" name="emaEduCode" id="emaEduCode'+i+'" value="'+o.eduCode+'" disabled/>\n';
						txt+='				<label for="emaEduCode'+i+'">선택</label>\n';
					}else{
						txt+='				<input type="checkbox" name="emaEduCode" id="emaEduCode'+i+'" value="'+o.eduCode+'"/>\n';
						txt+='				<label for="emaEduCode'+i+'">선택</label>\n';
					}
				}
				txt+=' 		<div class="title-zone"> \n';
				txt+=' 			<p>'+o.eduName+'</p> \n';
				txt+=' 	      	<div class="other"> \n';
				if(o.cnt - o.regCnt <=  0){
					txt+=' 	        	<span class="state">마감</span> \n';
				}else{
					txt+=' 	        	<span class="ico-arrow"></span> \n';
				}

				txt+=' 	        </div> \n';
				txt+=' 	    </div> \n';
				txt+='      <div class="info-zone"> \n';
				txt+='            <span>'+o.dateStr+' '+o.timeStr+'</span> \n';
				txt+='            <span>'+o.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'원</span> \n';
				txt+='        </div> \n';
				txt+='	</a> \n';
				txt+='</li> \n';

				totalCost+= Number(o.cost);
			});
			$(".board-list ul").append(txt);

			if(gbn == 'LISTPAGE2'){
				$("#appBtn").prop("disabled",true);
				$("#boardForm input[name='emaEduCode']").off().on("change",function(){
					if($("#boardForm input[name='emaEduCode']:checked").length <= 0){
						$("#appBtn").prop("disabled",true);
					}else{
						$("#appBtn").prop("disabled",false);
					}
				});
			}else{
				$("#tabMain1 .blue-box em").text(String(totalCost).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"원");
			}
		}else{
			$("#totalCnt").text(0+"건");
		}


	}else{
		$(".login-guide").show();
		$("#tabMain1").hide();
		$(".sticky-bottom").hide();
	}

}

sntBook.getOfflineEduListSuccess = function(data){
	var list = data.list;
	var isLogin = data.isLogin;
	var txt = "";
	if(isLogin){
		$(".login-guide").hide();
		$("#tabMain1,.tab-main").show();
		if(list != null && list.length > 0){
			$("#totalCnt").text(list.length+"건");
			$.each(list,function(i,o){
				txt+='<li> \n';
				txt+='	<a href="/kicpa/sntBook/offlineEduDetail.do?idNum='+o.idNum+'" target="_blank"> \n';
				txt+=' 		<div class="title-zone"> \n';
				txt+=' 			<p>'+o.wtitle+'</p> \n';
				txt+=' 	      	<div class="other"> \n';
				txt+=' 	        	<span class="state">'+o.supotEdu+'</span> \n';

				txt+=' 	        </div> \n';
				txt+=' 	    </div> \n';
				txt+='      <div class="info-zone"> \n';
				txt+='            <span>'+o.eduTerm+'</span> \n';
				txt+='            <span>교육시간 '+o.eduTime+'</span> \n';
				txt+='        </div> \n';
				txt+='	</a> \n';
				txt+='</li> \n';
			});
			$(".board-list ul").append(txt);
		}else{
			$("#totalCnt").text(0+"건");
		}
	}else{
		$(".login-guide").show();
		$("#tabMain1,.tab-main").hide();
	}
}

sntBook.getOfflineEduAppListSuccess = function(data){
	var list = data.list;
	var txt = "";
	if(list != null && list.length > 0){
		$("#totalCnt").text(list.length+"건");
		$.each(list,function(i,o){
			txt+='<li> \n';
			txt+='	<a href="/kicpa/sntBook/offlineEduDetail.do?idNum='+o.idNum+'" target="_blank"> \n';
			txt+=' 		<div class="title-zone"> \n';
			txt+=' 			<p>'+o.bookName+'</p> \n';
			txt+=' 	      	<div class="other"> \n';

			if(o.canDate != null && o.canDate != '' && o.ordSeq == '1' ){

				txt+=' 	        	<span class="state">취소</span> \n';
			}else{
				txt+=' 	        	<span class="ico-arrow"></span> \n';
			}

			txt+=' 	        </div> \n';
			txt+=' 	    </div> \n';
			txt+='      <div class="info-zone"> \n';
			txt+='            <span>신청일 : '+o.ordDate+'</span> \n';
			txt+='            <span>'+o.payTotalAmt+'원</span> \n';
			txt+='        </div> \n';
			txt+='	</a> \n';
			txt+='</li> \n';
		});
		$(".board-list ul").append(txt);
	}else{
		$("#totalCnt").text(0+"건");
	}
}

sntBook.insertLecture = function(){
	var param =$("#boardForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/insertSpecialLecture.do",param,sntBook.insertSpecialLectureSuccess,sntBook.boardListError);
}

sntBook.insertSpecialLectureSuccess = function(data){
	var resultCode = data.resultCode;
	if(resultCode == '1'){
		$("#cartPopup .btn-send").text("신청내역으로 이동");
		$("#cartPopup .btn-send").off().on("click",function(){
			$("#cartPopup .btn-close").click();
			sntBook.specialLectureChange($(".tab-link:eq(1)"),"LISTPAGE3");
		});
		fn_portal_pop("cartPopup")

	}else if(resultCode == '2'){
		alert("접수가 마감되었습니다.")
	}else if(resultCode == '3'){
		alert("이미 등록된 이름과 연락처가 있습니다.\n\n신청문의는 02-3149-0304으로 연락주시기 바랍니다.");
	}else if(resultCode == '5'){
		alert("정원이 초과되어 신청이 되지 않았습니다.\n\n신청문의는 02-3149-0304으로 연락주시기 바랍니다.");
	}else{
		 alert("신청정보가 없습니다.\n\n다시한번 신청해 주시기 바랍니다.");
	}


}

sntBook.cartValidation = function(){
	$("#goCartBtn").on("click",function(){
		if($("#boardForm input[name='ibmBookCode']:checked").length <= 0){
			alert("하나이상 선택하셔야 합니다.")
			return false;
		}

		sntBook.insertCart();

	});
}


sntBook.getCheckplusEncData = function(){
	var param = {};
	fn_ajax_call("/kicpa/common/getCheckplusEncData.do",param,sntBook.getCheckplusEncDataSuccess,sntBook.boardListError);
}

sntBook.getCheckplusEncDataSuccess = function(data){
	var sMessage = data.sMessage;
	var sEncData = data.sEncData;


	$("#checkPlusForm input[name='EncodeData']").val(sEncData);

	fn_portal_pop("checkplusPopup")

	$("#checkplusPopup .btn-send").off().on("click",function(){
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		$("#checkPlusForm").attr({"action":"https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb","target" : "popupChk"});
		$("#checkPlusForm").submit();
	});



}


sntBook.orderCartFrom = function(){
	var param =$("#cartForm").serializeObject();
	fn_ajax_call("/kicpa/sntBook/orderCartForm.do",param,sntBook.orderCartFormSuccess,sntBook.boardListError);
}

sntBook.orderCartFormSuccess = function(data){
	var result = data.result;

	if(result == '0000'){
		location.href="kicpa/sntBook/cartOrderForm.do?gamYn=N";
	}else if(result == '0001'){
		alert("장바구니에 상품이 존재하지 않습니다.");
	}else if(result == '0002'){
		alert("선택된 상품이 존재하지 않습니다.");
	}else{
		alert("정상적으로 처리되지 않았습니다.")
		locarion.reload();
	}
}

sntBook.orderFormValidation = function(){

	if(!$("#terms02").prop("checked")){
		alert("약관동의를 선택해주세요.");
		return false;
	}

	if($.trim($("#recName").val()) == ''){
		alert("이름를 입력해주세요.");
		return false;
	}
	if($.trim($("#rvZip").val()) == ''){
		alert("우편번호를 입력해주세요.");
		return false;
	}
	if($.trim($("#rvAdd1").val()) == ''){
		alert("주소를 입력해주세요.");
		return false;
	}
	if($.trim($("#rvAdd3").val()) == ''){
		alert("상세주소를 입력해주세요.");
		return false;
	}
	if($.trim($("#telNo1").val()) == '' || $.trim($("#telNo2").val()) == '' || $.trim($("#telNo3").val()) == ''){
		alert("전화번호를 입력해주세요.");
		return false;
	}
	if($.trim($("#hpNo1").val()) == '' || $.trim($("#hpNo2").val()) == '' || $.trim($("#hpNo3").val()) == ''){
		alert("핸드폰 번호를 입력해주세요.");
		return false;
	}
	if($.trim($("#email").val()) == ''){
		alert("이메일을 입력해주세요.");
		return false;
	}
	if($.trim($("#rvCpyName").val()) == ''){
		alert("회사명을 입력해주세요.");
		return false;
	}


	sntBook.orderFormCheck();
}


sntBook.orderFormCheck = function(){
	var param =$("#mobileweb").serializeObject();
	fn_ajax_call("/kicpa/sntBook/orderFormCheck.do",param,sntBook.orderFormCheckSuccess,sntBook.boardListError);
}

sntBook.orderFormCheckSuccess = function(data){
	var result =data.result;
	var oid = data.oid;
	if(result == '0000'){
		$("#mobileweb input[name='P_OID']").val(oid);
		$("#mobileweb input[name='P_AMT']").val(1000);
		$("#mobileweb").attr("action","https://mobile.inicis.com/smart/payment/").submit();
	}else if(result == '0001'){
		alert("주문데이터가 존재하지 않습니다.")
	}else{
		alert("결제금액과 결제내용이 일치하지 않아 결제가 정상적으로 되지 않고 있습니다.")
	}
}

sntBook.boardListError = function(data,status, error){
//	flag = true;
	alert("조회실패");
}






