var docSendNumIssu = docSendNumIssu || {}; // 발송대장 namespace

$(window).resize(function(){
    try{
        
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {
    	docSendNumIssu.fn_init_events(); // 이벤트 등록
    }
);

docSendNumIssu.fn_init_events = function() {
	
	//목록으로 클릭
	$("#docSendNumIssu_Close").on("click",function(e) {
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
	        	closeTab('docSendNumIssu');
	        	
	        } else if (result.dismiss === 'cancel') {
	           
	        }
	    });
		return false;
    });
	
	//발급/수정
	$("#docSendNumIssu_NoGet").on("click", function(e){
		var docSendNumIssu_DocNo = $("#docSendNumIssu_DocNo").val();
		var docSendNumIssu_Subject = $("#docSendNumIssu_Subject").val();
		var docSendNumIssu_Receipt = $("#docSendNumIssu_Receipt").val();
		
		if(docSendNumIssu_Subject == "" || docSendNumIssu_Receipt == ""){
			 alertMessage("모든 필수항목을 입력하세요.","","error");
			 return false;
		}
		
		var today = new Date();
		
		if(docSendNumIssu_DocNo != ""){
			var docSendNumIssu_UpdateDocListParam = {};
			docSendNumIssu_UpdateDocListParam.conditionYear = $("#docSendNumIssu_Year").val();
			docSendNumIssu_UpdateDocListParam.conditionDocSendNo = $("#docSendNumIssu_DocSendNo").val();
			docSendNumIssu_UpdateDocListParam.conditionDocSendFlagNo = $("#docSendNumIssu_DocSendFlagNo").val();
			docSendNumIssu_UpdateDocListParam.updateTitle = docSendNumIssu_Subject;
			docSendNumIssu_UpdateDocListParam.updateReceipt = docSendNumIssu_Receipt;
			docSendNumIssu_UpdateDocListParam.updateDate = getCurrentDate().toDate().getDateFormat("YYYYMMDD");
        	
        	fn_ajax_call("/kicpa/updateDocList.do", docSendNumIssu_UpdateDocListParam, docSendNumIssu.updateDocList_success, docSendNumIssu.updateDocList_error);
        	
        	return false;
			
		} else{
			var docSendNumIssu_InsertDocListParam = {};
			docSendNumIssu_InsertDocListParam.year = today.getFullYear();
			docSendNumIssu_InsertDocListParam.sendDate = getCurrentDate().toDate().getDateFormat("YYYYMMDD");
			docSendNumIssu_InsertDocListParam.title = docSendNumIssu_Subject;
			docSendNumIssu_InsertDocListParam.receipt = docSendNumIssu_Receipt;
			docSendNumIssu_InsertDocListParam.intnetYN = "1";
			docSendNumIssu_InsertDocListParam.inputDate = getCurrentDate().toDate().getDateFormat("YYYYMMDD");
        	
        	fn_ajax_call("/kicpa/insertDocList.do", docSendNumIssu_InsertDocListParam, docSendNumIssu.insertDocList_success, docSendNumIssu.insertDocList_error);
        	
        	return false;
		}
	});
	
	$("#docSendList_modal_close").on("click", function(e){
    	$("#docSendList_modal").modal("hide");
    	closeTab('docSendNumIssu');
    	
    	try{
    		docSendList.fn_page_init();
    		
    	} catch(e){
    		
    	}    	
    	
    });
}

//발급 callback function
docSendNumIssu.insertDocList_success = function(result) {
	$("#docSendList_modal_docSendNo").html(result.docList.dispDocNo);
	$("#docSendList_modal_sendDate").html(result.docList.dispSendDd2);
	$("#docSendList_modal_title").html(result.docList.subject);
	$("#docSendList_modal_receipt").html(result.docList.receipt);
	$("#docSendList_modal_inputUserNm").html(result.docList.inputUserNm);
	
	$("#docSendList_modal").modal();
	
	return false;
}

docSendNumIssu.insertDocList_error = function(xhr, status, error) {
	alertMessage("발급에 실패 했습니다.","","error");
}

//수정 callback function
docSendNumIssu.updateDocList_success = function(result) {
	alertMessage("등록되었습니다.","","success");
	closeTab('docSendNumIssu');
	docSendList.fn_page_init();
	return false;
}

docSendNumIssu.updateDocList_error = function(xhr, status, error) {
	alertMessage("수정에 실패 했습니다.","","error");
}