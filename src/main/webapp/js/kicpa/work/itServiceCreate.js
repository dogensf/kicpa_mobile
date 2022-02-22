var itServiceCreate = itServiceCreate || {}; // 발송대장 namespace\

var itServiceCreate_myFileCaches = {};		//파일 저장 캐시

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

        itServiceCreate.fn_init_events(); // 이벤트 등록
        itServiceCreate.fn_init(); // 화면 초기화
    }
);

itServiceCreate.fn_init = function() {
	$("#itServiceCreate_RquestDeptList").selectpicker({
		noneSelectedText:"전체"
	});

	$("#itServiceCreate_RqestTyList").selectpicker({
		noneSelectedText:"전체"
	});

	$("#itServiceCreate_TrgetSysList").selectpicker({
		noneSelectedText:"전체"
	});
	
	//등록 / 수정 구분
	var itServiseCreate_hid_rqestNo = $("#itServiseCreate_hid_rqestNo").val();
	if(itServiseCreate_hid_rqestNo == ""){
		$("#itServiceCreate_RqestDate").val(getCurrentDate().toDate().getDateFormat("YYYY-MM-DD"));
		$("#itServiceCreate_hid_RqestDate").val($("#itServiceCreate_RqestDate").val());
	} else{
		itServiceCreate.setHiddenData();
	}
	
}

itServiceCreate.fn_init_events = function() {
	
	//등록/수정
	$("#itServiceCreate_NoGet").on("click", function(e){
		var itServiceCreate_RqestDate = $('#itServiceCreate_RqestDate').val().replaceAll("-", ""); //처리요청일
		var itServiceCreate_NowDate = getCurrentDate().toDate().getDateFormat("YYYYMMDD");
		var itServiceCreate_RquestDeptList = $("#itServiceCreate_RquestDeptList").val();
		var itServiceCreate_RqestTyList = $("#itServiceCreate_RqestTyList").val();
		var itServiceCreate_TrgetSysList = $("#itServiceCreate_TrgetSysList").val();
		var itServiceCreate_Subject = $("#itServiceCreate_Subject").val();
		var itServiceCreate_Cn = $("#itServiceCreate_Cn").val();
		var itServiseCreate_hid_rqestNo = $("#itServiseCreate_hid_rqestNo").val();
						
		var noFile = true;	
		var today = new Date();
		
		// jQuery Ajax Form 사용
		var formData = new FormData();

		$.each(itServiceCreate_myFileCaches, function(n, v) {
			var name = "files_"+n;
			//	formData.append("ids[]", n); // 추가 정보들
			//	formData.append("names[]", v.name); // 추가 정보들
			//	formData.append("countries[]", v.country); // 추가 정보들
			formData.append(name, v.file);
			formData.append("registDe", v.registDe);
			noFile = false;
		});
		
		if(itServiceCreate_NowDate > itServiceCreate_RqestDate){
			alertMessage("처리 요청일자는 당일 포함 이후 날짜만 선택 가능합니다.","","error");
			return false;
		}
		
		if(itServiceCreate_RquestDeptList == "" || itServiceCreate_RqestTyList == "" || itServiceCreate_TrgetSysList == ""
			|| itServiceCreate_Subject == "" || itServiceCreate_Cn == "" || noFile){
			alertMessage("모든 필수항목을 입력하세요.","","error");
			return false;
		}
		
		
		formData.append("rqestNo", itServiseCreate_hid_rqestNo);
		formData.append("rqestDate", itServiceCreate_NowDate);
		formData.append("rqestTreDate", itServiceCreate_RqestDate);
		formData.append("rqestDept", itServiceCreate_RquestDeptList);
		formData.append("rqestTy", itServiceCreate_RqestTyList);
		formData.append("trgetSys", itServiceCreate_TrgetSysList);
		formData.append("title", itServiceCreate_Subject);
		formData.append("rqestCn", itServiceCreate_Cn);
		formData.append("psexamYear", today.getFullYear());
		
		var callUrl = "/kicpa/insertItServiceList.do";
		if(itServiseCreate_hid_rqestNo != ""){
			callUrl = "/kicpa/updateItServiceList.do";
		} 
		
		$.ajax({
			url: callUrl,
			processData: false,
			contentType: false,
			data: formData,
			cache: false,
			dataType: 'json',
			type: 'POST',
			success: function () {
				itServiceCreate.insert_success();
				itServiceCreate_myFileCaches = {};
			}
		});
					
		return false;
	});
	
	//목록으로 클릭
	$("#itServiceCreate_Close").on("click",function(e) {
        //$("#docSendList_modal").modal();
		var saveFlag = true;
		if($("#itServiceCreate_hid_RqestDate").val() != $("#itServiceCreate_RqestDate").val() 
			|| $("#itServiseCreate_hid_RquestDeptList").val() != $("#itServiceCreate_RquestDeptList").val()
			|| $("#itServiseCreate_hid_RqestTyList").val() != $("#itServiceCreate_RqestTyList").val()
			|| $("#itServiseCreate_hid_TrgetSysList").val() != $("#itServiceCreate_TrgetSysList").val()
			|| $("#itServiseCreate_hid_Subject").val() != $("#itServiceCreate_Subject").val()
			|| $("#itServiseCreate_hid_Cn").val() != $("#itServiceCreate_Cn").val()){
			
			saveFlag = false;
		}
		
		
		if(!saveFlag){
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
		        	closeTab('itServiceCreate');
		        	
		        } else if (result.dismiss === 'cancel') {
		           
		        }
		    });
			return false;
		} else{
			closeTab('itServiceCreate');
		}
		
    });
	
	$("#itServiceCreate_AddDiv_Btn").on("click",function(e) {
		$("#itServiceCreate_AddDiv_Btn").show();
	});
	
	$("#itServiceCreate_AddDiv_Btn1").on("click",function(e) {
		$("#itSerivceCrate_AddDiv").show();
	});
	
	$("#itServiceCreate_AddDiv_Btn2").on("click", function(e){
		$("#itSerivceCrate_AddDiv").hide();
	});
	
	$("#itServiceCreate_File1").on("change", function(e){
		itServiceCreate.uploadFile("file1", $(this).val());
		
    });	
	
	$("#itServiceCreate_File2").on("change", function(e){
		itServiceCreate.uploadFile("file2", $(this).val());
    });	
}

itServiceCreate.uploadFile = function(type, fileName){
	var file = "";
	var uploadFile = "";
	var index;
	
	if(type == "file1"){
		$("#itServiceCreate_File_Name1").val(fileName.split('/').pop().split('\\').pop());
		file = document.getElementById("itServiceCreate_File1").files[0];
		uploadFile = $("#itServiceCreate_File_Name1").val();
		index = 0;
		
	} else{
		$("#itServiceCreate_File_Name2").val(fileName.split('/').pop().split('\\').pop());
		file = document.getElementById("itServiceCreate_File2").files[0];
		uploadFile = $("#itServiceCreate_File_Name2").val();
		index = 1;
		
	}
	
	var fileSize = file.size;
	if(fileSize > 2048000) {
		alertMessage("파일은 2MB 를 초과해선 안됩니다.","","error");
		return false;
	}
	
    var extension = uploadFile.split('.').pop().toLowerCase();
            
    if(!(extension == "hwp" || extension == "doc" || extension == "xlsx" 
    	|| extension == "gif" || extension == "png" || extension == "jpg" || extension == "jpeg")){
    	alertMessage("등록 불가능한 파일입니다.","","error");
    	$("#itServiceCreate_File_Name2").val("");
    	return false;
    }
    
    //서버로 보낼 파일 캐시에 보관
    itServiceCreate_myFileCaches[index] = {
		file : file,
		registDe : $('#itServiceCreate_RqestDate').val()
	};
}


//set Hidden Data
itServiceCreate.setHiddenData = function(){
	$("#itServiceCreate_hid_RqestDate").val($("#itServiceCreate_RqestDate").val());
	$("#itServiseCreate_hid_RquestDeptList").val($("#itServiceCreate_RquestDeptList").val());
	$("#itServiseCreate_hid_RqestTyList").val($("#itServiceCreate_RqestTyList").val());
	$("#itServiseCreate_hid_TrgetSysList").val($("#itServiceCreate_TrgetSysList").val());
	$("#itServiseCreate_hid_Subject").val($("#itServiceCreate_Subject").val());
	$("#itServiseCreate_hid_Cn").val($("#itServiceCreate_Cn").val());
}

itServiceCreate.insert_success = function(result) {
	alertMessage("등록되었습니다.","","success");
	/*
	if(result.rqestNo == "" || result.rqestNo == undefined){
	} else{
		$("#itServiseCreate_hid_rqestNo").val(result.rqestNo);
	}	
	
	itServiceCreate.setHiddenData();
	*/
	
	closeTab('itServiceCreate');
	
	try{
		itServiceList.fn_page_init();
		
	} catch(e){
		
	}
	return false;
	
}

itServiceCreate.insert_error = function(result) {
}