var docReceiptNumIssu = docReceiptNumIssu || {}; // 발송대장 namespace

$(window).resize(function(){
    try{
        
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {
    	docReceiptNumIssu.fn_init_events(); // 이벤트 등록
    	docReceiptNumIssu.fn_init();
    	
    }
);

docReceiptNumIssu.fn_init = function() {
    $("#docReceiptNumIssu_SenderGubun").selectpicker({
        noneSelectedText:"선택하세요"
    });
    
    $('#docReceiptNumIssu_ReceiptDate').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
    
    var docReceiptNumIssu_SenderGubun = $("#docReceiptNumIssu_SenderGubun").val();
	docReceiptNumIssu.setSenderGubunDiv(docReceiptNumIssu_SenderGubun);
	
	if(docReceiptNumIssu_SenderGubun == "회원"){
		$("#docReceiptNumIssu_SenderType2_value1").val("");
		$("#docReceiptNumIssu_SenderType2_value2").val("");
		
		$("#docReceiptNumIssu_SenderType3_value1").val("");
		
	} else if(docReceiptNumIssu_SenderGubun == "회계법인"){
		$("#docReceiptNumIssu_SenderType1_value1").val("");
		$("#docReceiptNumIssu_SenderType1_value2").val("");
		
		$("#docReceiptNumIssu_SenderType3_value1").val("");
		
	} else if(docReceiptNumIssu_SenderGubun == "기타"){
		$("#docReceiptNumIssu_SenderType2_value1").val("");
		$("#docReceiptNumIssu_SenderType2_value2").val("");
		
		$("#docReceiptNumIssu_SenderType1_value1").val("");
		$("#docReceiptNumIssu_SenderType1_value2").val("");
		
	}
    
    $("#docReceiptNumIssu_ReceiptDate").val(getCurrentDate().toDate().getDateFormat("YYYY-MM-DD"));

}

docReceiptNumIssu.fn_init_events = function() {	
	//목록으로 클릭
	$("#docReceiptNumIssu_Close").on("click",function(e) {
		//$("#docSendList_modal").modal();
		var sTitle = "알림메세지";

	    swal.fire({
	        title: '',
	        text: "등록하신 정보는 삭제됩니다.\n 취소하시겠습니까?",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니요',
	        reverseButtons: true
	    }).then(function(result){
	        if (result.value) {
	        	closeTab('docReceiptNumIssu');
	        	
	        } else if (result.dismiss === 'cancel') {
	           
	        }
	    });
		return false;
    	closeTab('docReceiptNumIssu');
    });
		
	$("#docReceiptNumIssu_SenderGubun").on("change", function(e){
		var docReceiptNumIssu_SenderGubun = $("#docReceiptNumIssu_SenderGubun").val();
		docReceiptNumIssu.setSenderGubunDiv(docReceiptNumIssu_SenderGubun);
	});
	
	//등록
	$("#docReceiptNumIssu_NoGet").on("click", function(e){
		var docReceiptNumIssu_ReceiptDate = $("#docReceiptNumIssu_ReceiptDate").val().replaceAll("-", "");
		var docReceiptNumIssu_SenderGubun = $("#docReceiptNumIssu_SenderGubun").val();
		var docReceiptNumIssu_SenderValue1 = "";
		var docReceiptNumIssu_SenderValue2 = "";
		var docReceiptNumIssu_Subject = $("#docReceiptNumIssu_Subject").val();
		var docReceiptNumIssu_Remark = $("#docReceiptNumIssu_Remark").val();
		
		var docReceiptNumIssu_ReceiptNo = $("#docReceiptNumIssu_DocReceiptNo").val();
		
		if(docReceiptNumIssu_SenderGubun == "회원"){
			docReceiptNumIssu_SenderGubun = "1";
			docReceiptNumIssu_SenderValue1 = $("#docReceiptNumIssu_SenderType1_value1").val();
			docReceiptNumIssu_SenderValue2 = $("#docReceiptNumIssu_SenderType1_value2").val();
			
		} else if(docReceiptNumIssu_SenderGubun == "회계법인"){
			docReceiptNumIssu_SenderGubun = "2";
			docReceiptNumIssu_SenderValue1 = $("#docReceiptNumIssu_SenderType2_value1").val();
			docReceiptNumIssu_SenderValue2 = $("#docReceiptNumIssu_SenderType2_value2").val();
			
		} else if(docReceiptNumIssu_SenderGubun == "기타"){
			docReceiptNumIssu_SenderGubun = "3";
			docReceiptNumIssu_SenderValue1 = $("#docReceiptNumIssu_SenderType3_value1").val();
			docReceiptNumIssu_SenderValue2 = "ETC";
			
		}
		
		if(docReceiptNumIssu_ReceiptDate == "" || docReceiptNumIssu_SenderGubun == "" || docReceiptNumIssu_SenderValue1 == "" || docReceiptNumIssu_SenderValue2 == ""
			|| docReceiptNumIssu_Subject == "" || docReceiptNumIssu_Remark == ""){
			alertMessage("모든 필수항목을 입력하세요.","","error");
    		return false;
		}
		
		var today = new Date();
		
		if(docReceiptNumIssu_ReceiptNo != ""){
			var docReceiptNumIssu_UpdateDocListParam = {};
			
			docReceiptNumIssu_UpdateDocListParam.year = $("#docReceiptNumIssu_Year").val();
			docReceiptNumIssu_UpdateDocListParam.docReceiptNo = $("#docReceiptNumIssu_DocReceiptNo").val();
			docReceiptNumIssu_UpdateDocListParam.docReceiptFlagNo = $("#docReceiptNumIssu_DocReceiptFlagNo").val();
			docReceiptNumIssu_UpdateDocListParam.receiptDate = docReceiptNumIssu_ReceiptDate;
			docReceiptNumIssu_UpdateDocListParam.senderFlag = docReceiptNumIssu_SenderGubun;
			docReceiptNumIssu_UpdateDocListParam.sender = docReceiptNumIssu_SenderValue1;
			docReceiptNumIssu_UpdateDocListParam.senderPin = docReceiptNumIssu_SenderValue2;
			docReceiptNumIssu_UpdateDocListParam.title = docReceiptNumIssu_Subject;
			docReceiptNumIssu_UpdateDocListParam.remark = docReceiptNumIssu_Remark;
			docReceiptNumIssu_UpdateDocListParam.inputDate = getCurrentDate().toDate().getDateFormat("YYYYMMDD");
			
        	fn_ajax_call("/kicpa/updateDocReceiptList.do", docReceiptNumIssu_UpdateDocListParam, docReceiptNumIssu.updateDocList_success, docReceiptNumIssu.updateDocList_error);
        	
        	return false;
			
		} else{
			var docReceiptNumIssu_InsertDocListParam = {};
			docReceiptNumIssu_InsertDocListParam.year = today.getFullYear();
			docReceiptNumIssu_InsertDocListParam.receiptDate = docReceiptNumIssu_ReceiptDate;
			docReceiptNumIssu_InsertDocListParam.title = docReceiptNumIssu_Subject;
			docReceiptNumIssu_InsertDocListParam.sender = docReceiptNumIssu_SenderValue1
			docReceiptNumIssu_InsertDocListParam.senderFlag = docReceiptNumIssu_SenderGubun
			docReceiptNumIssu_InsertDocListParam.senderPin = docReceiptNumIssu_SenderValue2
			docReceiptNumIssu_InsertDocListParam.remark = docReceiptNumIssu_Remark;
			docReceiptNumIssu_InsertDocListParam.inputDate = getCurrentDate().toDate().getDateFormat("YYYYMMDD");
        	
			fn_ajax_call("/kicpa/insertDocReceiptList.do", docReceiptNumIssu_InsertDocListParam, docReceiptNumIssu.insertDocList_success, docReceiptNumIssu.insertDocList_error);
			
			return false;
			
		}
	});
	
	$("#docReceiptList_modal_close").on("click", function(e){
    	$("#docReceiptList_modal").modal("hide");
    	closeTab('docReceiptNumIssu');
    	try{
    		docReceiptList.fn_page_init();
    		
    	} catch(e){
    		
    	}
    	
    });
	
	$("#docReceiptNumIssu_SenderType1_value1").on("click", function(e){
		mainCommonList.fn_popup_search("", "회원선택", docReceiptNumIssu.getMemberList_success);
		
	})
	
	$("#docReceiptNumIssu_SenderType2_value1").on("click", function(e){
		mainCommonList.fn_popupAudit_search("", "회원선택", docReceiptNumIssu.getAuditList_success);
		
	})
}

//발신처등록 div controll
docReceiptNumIssu.setSenderGubunDiv = function(type){
	if(type == "회원"){
		$("#docReceiptNumIssu_SenderType1").show();
		$("#docReceiptNumIssu_SenderType2").hide();
		$("#docReceiptNumIssu_SenderType3").hide();
		
	} else if(type == "회계법인"){
		$("#docReceiptNumIssu_SenderType1").hide();
		$("#docReceiptNumIssu_SenderType2").show();
		$("#docReceiptNumIssu_SenderType3").hide();
		
	} else if(type == "기타"){
		$("#docReceiptNumIssu_SenderType1").hide();
		$("#docReceiptNumIssu_SenderType2").hide();
		$("#docReceiptNumIssu_SenderType3").show();
		
	}
}

//회원선택 callback
docReceiptNumIssu.getMemberList_success = function(item){
	$("#docReceiptNumIssu_SenderType1_value1").val(item.koreanNm);
	$("#docReceiptNumIssu_SenderType1_value2").val(item.cpaId);
	
	$('#cpaUserListPopup').modal("hide");
}

//회계법인 callBack
docReceiptNumIssu.getAuditList_success = function(item){
	$("#docReceiptNumIssu_SenderType2_value1").val(item.auditNm);
	$("#docReceiptNumIssu_SenderType2_value2").val(item.auditId);
	
	$('#cpaAuditListPopup').modal("hide");
}

//등록 callback function
docReceiptNumIssu.insertDocList_success = function(result) {
	
	$("#docReceiptList_modal_docSendNo").html(result.docList.dispDocNo);
	$("#docReceiptList_modal_sendDate").html(result.docList.dispSendDd2);
	$("#docReceiptList_modal_subject").html(result.docList.subject);
	$("#docReceiptList_modal_receipt").html(result.docList.sender);
	$("#docReceiptList_modal_senderUserNm").html(result.docList.senderUserNm);	
	
	$("#docReceiptList_modal").modal();
}

docReceiptNumIssu.insertDocList_error = function(xhr, status, error) {
	alertMessage("발급에 실패 했습니다.","","error");
	return false;
}

//수정 callback function
docReceiptNumIssu.updateDocList_success = function(result) {
	alertMessage("등록되었습니다.","","success");
	closeTab('docReceiptNumIssu');
	try{
		docReceiptList.fn_page_init();
		
	} catch(e){
		
	}
	
	return false;
}

docReceiptNumIssu.updateDocList_error = function(xhr, status, error) {
	alertMessage("수정에 실패 했습니다.","","error");
}