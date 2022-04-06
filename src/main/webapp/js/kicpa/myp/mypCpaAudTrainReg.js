var mypCpaAudTrainReg = {};

mypCpaAudTrainReg.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypCpaAudTrainReg.mypCpaAudTrainRegInit = function(){


	//수정모드(검토 및 제출 화면)
	if($('#mypCpaAudTrainReg_saveMode').val() == "U"){
		$('.mypCpaTrain_preBtn').hide();
		$('.mypCpaTrain_submitBtn').hide();
		$('.mypCpaTrain_mypBtn').show();

		mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove($('#mypCpaAudTrainReg_movePage').val());
	}
	//처음 등록 모드
	else{
		mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_agreeInfo');
		$('.mypCpaTrain_submitBtn').show();
		$('.mypCpaTrain_mypBtn').hide();
	}

	//반려상태에서 재신청한 경우
	if($('#mypCpaAudTrainReg_regFlag').val() == "F"){
		mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList();
	}

	//약관동의 체크
	if($("#mypCpaAudTrainReg_agreement1").is(":checked") && $("#mypCpaAudTrainReg_agreement2").is(":checked") && $("#mypCpaAudTrainReg_agreement3").is(":checked")) // 단일 체크해제시 전체체크 해제
	{
		$("input:checkbox[id='mypCpaAudTrainReg_allAgree']").prop("checked", true);
		$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", false);
	}else {
		$("input:checkbox[id='mypCpaAudTrainReg_allAgree']").prop("checked", false);
		$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", true);
	}


	//약관동의 저장(시작하기버튼)
	$("#mypCpaAudTrainReg_agreeSaveBtn").on("click",function(e) {
		$('#mypCpaAudTrainReg_saveData').val("mypCpaAudTrainReg_agreeInfo");
		mypCpaAudTrainReg.mypCpaAudTrainReg_infoSave();
	});

	//이력정보 (외감) 저장(다음버튼)
	$("#mypCpaAudTrainReg_apntcCpaHistInfoSaveBtn").on("click",function(e) {
		$('#mypCpaAudTrainReg_saveData').val("mypCpaAudTrainReg_apntcCpaHistInfo");
		mypCpaAudTrainReg.mypCpaAudTrainReg_infoSave();
	});

	//첨부파일 (첨부서류) 저장(다음버튼)
	$("#mypCpaAudTrainReg_atchFileInfoSaveBtn").on("click",function(e) {
		$('#mypCpaAudTrainReg_saveData').val("mypCpaAudTrainReg_atchFileInfo");
		mypCpaAudTrainReg.mypCpaAudTrainReg_infoSave();
	});

	//제출버튼 클릭
	$("#mypCpaAudTrainReg_reviewInfoSaveBtn").on("click",function(e) {
		$('#mypCpaAudTrainReg_saveData').val("mypCpaAudTrainReg_reviewInfo");
		$('#mypCpaAudTrainReg_body').addClass('stop');
		$('#mypCpaAudTrainReg_saveRegPop').addClass('show');
	});


	//약관동의 모두 동의클릭
	$('#mypCpaAudTrainReg_allAgree').on('click',function(e) {
		var chk = $(this).is(":checked");

		if(chk){
			$("input:checkbox[id='mypCpaAudTrainReg_agreement1']").prop("checked", true);
			$("input:checkbox[id='mypCpaAudTrainReg_agreement2']").prop("checked", true);
			$("input:checkbox[id='mypCpaAudTrainReg_agreement3']").prop("checked", true);
			$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", false);
		}else {
			$("input:checkbox[id='mypCpaAudTrainReg_agreement1']").prop("checked", false);
			$("input:checkbox[id='mypCpaAudTrainReg_agreement2']").prop("checked", false);
			$("input:checkbox[id='mypCpaAudTrainReg_agreement3']").prop("checked", false);
			$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", true);
		}
	});

	// 체크필터 체인징
	$(".mypCpaAudTrainReg_check").on('click',function(e) {

		if($("#mypCpaAudTrainReg_agreement1").is(":checked") && $("#mypCpaAudTrainReg_agreement2").is(":checked") && $("#mypCpaAudTrainReg_agreement3").is(":checked")) // 단일 체크해제시 전체체크 해제
		{
			$("input:checkbox[id='mypCpaAudTrainReg_allAgree']").prop("checked", true);
			$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", false);
		}else {
			$("input:checkbox[id='mypCpaAudTrainReg_allAgree']").prop("checked", false);
			$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", true);
		}
	});

	//첨부파일 파일 변경
	$('.mypCpaAudTrainReg_fileChange').on('click',function(e) {
		var fileId = $(this).attr('id');

		var type = $("#"+fileId).attr("type");

		if(type != "text"){
			$("#"+fileId).val('');

			$("label[for="+fileId+"]").text("파일을 등록해 주세요");
			$("label[for="+fileId+"]").css("color",'#ccc');
		}

	});

	$('.mypCpaAudTrainReg_fileChange').on('change',function(e) {
		var fileId = $(this).attr('id');


		$("label[for="+fileId+"]").text(document.getElementById(fileId).files[0].name);

		if(document.getElementById(fileId).files[0].name != "" && document.getElementById(fileId).files[0].name != null){
			$("label[for="+fileId+"]").css("color",'#000');
		}
		else{
			$("label[for="+fileId+"]").text("파일을 등록해 주세요");
			$("label[for="+fileId+"]").css("color",'#ccc');
		}

	});

	//외감실무수습 등록신청서 클릭
	$("#mypCpaAudTrainReg_audTrainRegForm").on("click",function(e) {
		var pin = $('#mypCpaAudTrainReg_pin').val();
		window.open("http://kip.kicpa.or.kr/kicpacs/kicpa/myp/mypCpaAudTrainRegForm.do?pin="+pin, "pop", "scrollbars=yes, resizable=yes");

	});

	//저장팝업 제출취소버튼 클릭
	$("#mypCpaAudTrainReg_saveRegPopCanclBtn").on("click",function(e) {
		$('#mypCpaAudTrainReg_body').removeClass('stop');
		$('#mypCpaAudTrainReg_saveRegPop').removeClass('show');
	});

	//저장팝업 제출버튼 클릭
	$("#mypCpaAudTrainReg_saveRegPopBtn").on("click",function(e) {

		mypCpaAudTrainReg.mypCpaAudTrainReg_infoSave();

	});

	//실무수습기관 검색
	$("#mypCpaAudTrainReg_appInsttNm").on("click",function(e) {

		window.open("/kicpa/myp/auditSearch.do","auditSearchPop");

	});
}

//화면상단 닫기버튼
mypCpaAudTrainReg.mypCpaAudTrainReg_backMove = function() {

	location.href="/kicpa/myp/myPage.do?Pin="+$('#mypCpaAudTrainReg_pin').val();

}

//탭 이동
mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove = function(flag) {

	//입력화면 show/hide
	$('.mypCpaAudTrainTabMove').hide();
	$('#'+flag).show();

	if(flag == "mypCpaAudTrainReg_reviewInfo"){                     //검토 및 제출
		var reviewInfo_param = {};
		reviewInfo_param.pin = $('#mypCpaAudTrainReg_pin').val();
		reviewInfo_param.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();

		$.ajax({
			dataType:"json",
			url: mypCpaAudTrainReg.getContextPath()+"/myp/selectMypCpaAudTrainRegReviewInfo.do",
			data:reviewInfo_param,
			success: function (data) {
				mypCpaAudTrainReg.selectmypCpaAudTrainRegReviewInfo_success(data);
			},
			error: function (status, e) {
				alert("데이터 요청에 실패하였습니다.\r status : " + status);
			}
		});
	}

}

//검토 및 제출 list
mypCpaAudTrainReg.selectmypCpaAudTrainRegReviewInfo_success = function (result){

	$('#mypCpaAudTrainRegReviewInfo_audRegistDe').text(result.cpaAudTrainRegReviewInfoList[0].audRegistDe);
	$('#mypCpaAudTrainRegReviewInfo_guideCpa').text(result.cpaAudTrainRegReviewInfoList[0].guideCpaNm);
	$('#mypCpaAudTrainRegReviewInfo_appInstt').text(result.cpaAudTrainRegReviewInfoList[0].appInsttNm);
	$('#mypCpaAudTrainRegReviewInfo_appInsttEtc').text(result.cpaAudTrainRegReviewInfoList[0].appInsttEtc);
	$('#mypCpaAudTrainRegReviewInfo_emplCrtiFileId').text(result.cpaAudTrainRegReviewInfoList[0].emplCrtiFileIdNm);
	$('#mypCpaAudTrainRegReviewInfo_rsumFileId').text(result.cpaAudTrainRegReviewInfoList[0].rsumFileNm);
	$('#mypCpaAudTrainRegReviewInfo_atchFileId').text(result.cpaAudTrainRegReviewInfoList[0].atchFileIdNm);

}

//저장팝업 예버튼 클릭
mypCpaAudTrainReg.mypCpaAudTrainReg_infoSave = function(){

	var saveData = $('#mypCpaAudTrainReg_saveData').val();

	//약관동의
	if(saveData == "mypCpaAudTrainReg_agreeInfo"){
		var formData = $('#mypCpaAudTrainReg_agreeForm').serializeObject();
		formData.pin = $('#mypCpaAudTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();
		var url = mypCpaAudTrainReg.getContextPath()+"/myp/mypCpaAudTrainRegAgreeSave.do";

		mypCpaAudTrainReg.mypCpaAudTrainReg_trainInfoSave(formData, url, "mypCpaAudTrainReg_apntcCpaHistInfo");
	}
	else if(saveData == "mypCpaAudTrainReg_apntcCpaHistInfo"){			//이력정보 (외감)
		var formData = $('#mypCpaAudTrainReg_apntcCpaHistInfoForm').serializeObject();
		formData.pin = $('#mypCpaAudTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();
		var url = mypCpaAudTrainReg.getContextPath()+"/myp/mypCpaAudTrainRegApntcCpaHistInfoSave.do";

		mypCpaAudTrainReg.mypCpaAudTrainReg_trainInfoSave(formData, url, "mypCpaAudTrainReg_atchFileInfo");
	}
	else if(saveData == "mypCpaAudTrainReg_atchFileInfo"){			//첨부파일(첨부서류)
		var form = $('#mypCpaAudTrainReg_atchFileInfoForm')[0];
		var formData = new FormData(form);
		formData.append("pin", $('#mypCpaAudTrainReg_pin').val());
		formData.append("apntcSn", $('#mypCpaAudTrainReg_apntcSn').val());

		$.ajax({
			cache : false,
			url : mypCpaAudTrainReg.getContextPath()+"/myp/mypCpaAudTrainRegAtchFileInfoSave.do",
			type : 'POST',
			enctype: 'multipart/form-data',
			data : formData,
			processData: false,
			contentType: false,
			success : function(data) {
				if(data.message != "" && data.message != null){
					alert(data.message);
				}
				else{
					mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove('mypCpaAudTrainReg_reviewInfo');
				}
			}, // success
			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		}); // $.ajax */
	}
	else if(saveData == "mypCpaAudTrainReg_reviewInfo"){			//검토 및 제출
		var formData = {};
		formData.pin = $('#mypCpaAudTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();

		$.ajax({
			url : mypCpaAudTrainReg.getContextPath()+"/myp/mypCpaAudTrainRegSubmit.do",
			type : "POST",
			data : formData,
			success : function(data) {
				location.replace(mypCpaAudTrainReg.getContextPath()+'/myp/myPage.do?Pin='+$('#mypCpaAudTrainReg_pin').val());
			}
		});
	}
}

//외감수습 정보 저장(다음 클릭시 해당 탭 내용 저장)
mypCpaAudTrainReg.mypCpaAudTrainReg_trainInfoSave = function(formData, url, flag) {

	$.ajax({
		url : url,
		type : "POST",
		data : formData,
		success : function(data) {

			if(data.message != "" && data.message != null){
				alert(data.message);
			}
			else{
				if(data.apntcSn != "" && data.apntcSn != null && ($('#mypCpaAudTrainReg_apntcSn').val() =="" || $('#mypCpaAudTrainReg_apntcSn').val() == null)){
					$('#mypCpaAudTrainReg_apntcSn').val(data.apntcSn);
				}
				mypCpaAudTrainReg.mypCpaAudTrainReg_tabMove(flag);
			}
		}
	});
}

//반려상태에서 재신청한 경우
mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList = function(result) {
	var regFlagFAudTrainList_param = {};
	regFlagFAudTrainList_param.pin = $('#mypCpaAudTrainReg_pin').val();
	regFlagFAudTrainList_param.apntcSn = $('#mypCpaAudTrainReg_apntcSn').val();
	regFlagFAudTrainList_param.regFlag = $('#mypCpaAudTrainReg_regFlag').val();

	$.ajax({
		url : mypCpaAudTrainReg.getContextPath()+"/myp/selectMypCpaAudTrainRegReviewInfo.do",
		type : "POST",
		data : regFlagFAudTrainList_param,
		success : function(data) {
			mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList_success(data);
		}
	});
}

//반려상태 재등록시 기존 데이터 입력
mypCpaAudTrainReg.mypCpaAudTrainReg_regFlagFList_success = function(data){

	//서약서
	if(data.cpaAudTrainRegReviewInfoList[0].agreeInfo1Yn == "Y"){
		$('#mypCpaAudTrainReg_agreement1').prop("checked",true);
	}
	if(data.cpaAudTrainRegReviewInfoList[0].agreeInfo2Yn == "Y"){
		$('#mypCpaAudTrainReg_agreement2').prop("checked",true);
	}
	if(data.cpaAudTrainRegReviewInfoList[0].agreeInfo3Yn == "Y"){
		$('#mypCpaAudTrainReg_agreement3').prop("checked",true);
	}

	//약관동의 체크
	if($("#mypCpaAudTrainReg_agreement1").is(":checked") && $("#mypCpaAudTrainReg_agreement2").is(":checked") && $("#mypCpaAudTrainReg_agreement3").is(":checked")) // 단일 체크해제시 전체체크 해제
	{
		$("input:checkbox[id='mypCpaAudTrainReg_allAgree']").prop("checked", true);
		$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", false);
	}else {
		$("input:checkbox[id='mypCpaAudTrainReg_allAgree']").prop("checked", false);
		$("#mypCpaAudTrainReg_agreeSaveBtn").prop("disabled", true);
	}

	//이력정보(외감)
	$('#mypCpaAudTrainReg_audRegistDe').val(data.cpaAudTrainRegReviewInfoList[0].audRegistDe);              //외감 실무수습 시작일
	$('#mypCpaAudTrainReg_guideCpa').val(data.cpaAudTrainRegReviewInfoList[0].guideCpaNm);                  //지도공인회계사명
	$('#mypCpaAudTrainReg_guideCpaId').val(data.cpaAudTrainRegReviewInfoList[0].guideCpaNo);                //지도공인회계사번호
	$('#mypCpaAudTrainReg_appInsttNm').val(data.cpaAudTrainRegReviewInfoList[0].appInsttNm);                //실무수습기관명
	$('#mypCpaAudTrainReg_appInsttCd').val(data.cpaAudTrainRegReviewInfoList[0].appInsttCd);                //실무수습기관코드
	$('#mypCpaAudTrainReg_audGrpCl').val(data.cpaAudTrainRegReviewInfoList[0].stausCl);                   //개업구분

	if($('#mypCpaAudTrainReg_audGrpCl').val() != "A3019999"){
		$('#mypCpaAudTrainReg_appInsttEtc').val('');
		$('#mypCpaAudTrainReg_appInsttEtc').prop('disabled', true);
		$('.mypTrainAppInsttEtcYn').hide();
	}
	else{
		$('#mypCpaAudTrainReg_appInsttEtc').prop('disabled', false);
		$('.mypTrainAppInsttEtcYn').show();
	}

	$('#mypCpaAudTrainReg_appInsttEtc').val(data.cpaAudTrainRegReviewInfoList[0].appInsttEtc);             //기타 실무수습기관

	//첨부파일
	if(data.cpaAudTrainRegReviewInfoList[0].emplCrtiFileId != "" && data.cpaAudTrainRegReviewInfoList[0].emplCrtiFileId != null){          //재직증명서
		$("label[for='mypCpaAudTrainReg_emplCrtiFileId']").text("");
		$(".regFlagFEmplDelHide").show();
		$('#mypCpaAudTrainReg_emplCrtiFileId').prop('type',"text");
		$("#mypCpaAudTrainReg_emplCrtiFileId").val(data.cpaAudTrainRegReviewInfoList[0].emplCrtiFileIdNm);
		$("#mypCpaAudTrainReg_emplCrtiFileIdSet").val(data.cpaAudTrainRegReviewInfoList[0].emplCrtiFileId);
	}
	if(data.cpaAudTrainRegReviewInfoList[0].rsumFileNm != "" && data.cpaAudTrainRegReviewInfoList[0].rsumFileNm != null){          //이력서
		$("label[for='mypCpaAudTrainReg_rsumFileId']").text("");
		$(".regFlagFRsumDelHide").show();
		$('#mypCpaAudTrainReg_rsumFileId').prop('type',"text");
		$("#mypCpaAudTrainReg_rsumFileId").val(data.cpaAudTrainRegReviewInfoList[0].rsumFileNm);
		$("#mypCpaAudTrainReg_rsumFileEventnSet").val(data.cpaAudTrainRegReviewInfoList[0].eventn);
	}
	if(data.cpaAudTrainRegReviewInfoList[0].atchFileId != "" && data.cpaAudTrainRegReviewInfoList[0].atchFileId != null){          //기타
		$("label[for='mypCpaAudTrainReg_atchFileId']").text("");
		$(".regFlagFAtchDelHide").show();
		$('#mypCpaAudTrainReg_atchFileId').prop('type',"text");
		$("#mypCpaAudTrainReg_atchFileId").val(data.cpaAudTrainRegReviewInfoList[0].atchFileIdNm);
		$("#mypCpaAudTrainReg_atchFileIdSet").val(data.cpaAudTrainRegReviewInfoList[0].atchFileId);
	}
}

//추가 첨부파일 삭제(삭제버튼 클릭시 해당 div 삭제)
mypCpaAudTrainReg.mypCpaAudTrainReg_atchFileInfoRemove = function (atchFileId){

	if(atchFileId == "regFlagFEmplDelHide"){
		$(".regFlagFEmplDelHide").hide();
		$('#mypCpaAudTrainReg_emplCrtiFileId').prop('type',"file");
		$("#mypCpaAudTrainReg_emplCrtiFileIdSet").val("");
		$("label[for='mypCpaAudTrainReg_emplCrtiFileId']").text("파일을 등록해 주세요");
	}
	else if(atchFileId == "regFlagFRsumDelHide"){
		$(".regFlagFRsumDelHide").hide();
		$('#mypCpaAudTrainReg_rsumFileId').prop('type',"file");
		$("#mypCpaAudTrainReg_rsumFileEventnSet").val("");
		$("label[for='mypCpaAudTrainReg_rsumFileId']").text("파일을 등록해 주세요");
	}
	else if(atchFileId == "regFlagFAtchDelHide"){
		$(".regFlagFAtchDelHide").hide();
		$('#mypCpaAudTrainReg_atchFileId').prop('type',"file");
		$("#mypCpaAudTrainReg_atchFileIdSet").val("");
		$("label[for='mypCpaAudTrainReg_atchFileId']").text("파일을 등록해 주세요");
	}
}