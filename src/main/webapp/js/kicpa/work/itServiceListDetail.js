var itServiceListDetail = itServiceListDetail || {}; // 발송대장 namespace\

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

        itServiceListDetail.fn_init_events(); // 이벤트 등록
        itServiceListDetail.fn_init(); // 화면 초기화

    }
);

itServiceListDetail.fn_init = function() {
	var pageId = $("#pageId").val();
	
	if(pageId == "itServiceList"){
		$("#type1").show();
		
	} else{
		$("#type2").show();
		$("#itServiceListDetail_NoGet").show();
	}
	
	$('#itServiceListDetail_TreDd').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
	
	var itServiceListDetail_ManagtSttus = $("#itServiceListDetail_ManagtSttus").val();
	itServiceListDetail.fn_setDisAbled(itServiceListDetail_ManagtSttus);	 
}

itServiceListDetail.fn_init_events = function() {
		
	//목록으로 클릭
	$("#itServiceListDetail_Close").on("click",function(e) {
        //$("#docSendList_modal").modal();
		var sTitle = "알림메세지";

	    swal.fire({
	        title: '',
	        text: "등록하신 정보는 삭지됩니다.\n 취소하시겠습니까?",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니요',
	        reverseButtons: true
	    }).then(function(result){
	        if (result.value) {
	        	closeTab('itServiceListDetail');
	        	
	        } else if (result.dismiss === 'cancel') {
	           
	        }
	    });
		return false;		
    });
	
	//조치상태 변경
	$("#itServiceListDetail_ManagtSttus").on("change", function(e){
		var itServiceListDetail_ManagtSttus = $("#itServiceListDetail_ManagtSttus").val();
		itServiceListDetail.fn_setDisAbled(itServiceListDetail_ManagtSttus);
	});
	
	//등록/수정
	$("#itServiceListDetail_NoGet").on("click", function(e){
		//필수
		var itServiceListDetail_ManagtSttus = $("#itServiceListDetail_ManagtSttus").val();
		var itServiceListDetail_TreDd = $("#itServiceListDetail_TreDd").val().replaceAll("-", "");
		var itServiceListDetail_TreCn = $("#itServiceListDetail_TreCn").val();
		
		//선택
		var itServiceListDetail_TreUserNm = $("#itServiceListDetail_TreUserNm").val();
		
		if(itServiceListDetail_ManagtSttus == "3" || itServiceListDetail_ManagtSttus == "4"){
			if(itServiceListDetail_ManagtSttus == "" || itServiceListDetail_TreDd == "" || itServiceListDetail_TreCn == ""){
				alertMessage("모든 필수항목을 입력하세요.","","error");
				return false;
			}
			
		} else{
			if(itServiceListDetail_ManagtSttus == ""){
				alertMessage("모든 필수항목을 입력하세요.","","error");
				return false;
			}
		}
		
		var itServiceListDetail_UpdateDocListParam = {};
		
		itServiceListDetail_UpdateDocListParam.managtSttus = itServiceListDetail_ManagtSttus;
		itServiceListDetail_UpdateDocListParam.treDd = itServiceListDetail_TreDd;
		itServiceListDetail_UpdateDocListParam.treCn = itServiceListDetail_TreCn;
		itServiceListDetail_UpdateDocListParam.treUserNm = itServiceListDetail_TreUserNm;
		itServiceListDetail_UpdateDocListParam.rqestNo = $("#rqestNo").val();
    	
    	fn_ajax_call("/kicpa/updateItServiceListDetail.do", itServiceListDetail_UpdateDocListParam, itServiceListDetail.updateDocList_success, itServiceListDetail.updateDocList_error);
    	
    	return false;
		
	});
}

itServiceListDetail.fn_setDisAbled = function(val){
	if(val == "3" || val == "4"){
		$("#itServiceListDetail_TreDd").attr("disabled", false);
		$("#itServiceListDetail_TreUserNm").attr("disabled", false);
		$("#itServiceListDetail_TreCn").attr("disabled", false);
		
	} else{
		$("#itServiceListDetail_TreDd").attr("disabled", true);
		$("#itServiceListDetail_TreUserNm").attr("disabled", true);
		$("#itServiceListDetail_TreCn").attr("disabled", true);
		
	}
}

//수정 callback function
itServiceListDetail.updateDocList_success = function(result) {
	alertMessage("등록되었습니다.","","success");
	closeTab('itServiceListDetail');
	itServiceResult.fn_page_init();
	return false;
}

itServiceListDetail.updateDocList_error = function(xhr, status, error) {
	alertMessage("수정에 실패 했습니다.","","error");
}
