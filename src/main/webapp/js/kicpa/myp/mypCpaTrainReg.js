var mypCpaTrainReg = {};

mypCpaTrainReg.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypCpaTrainReg.mypCpaTrainRegInit = function(){

	//수정모드(검토 및 제출 화면)
	if($('#mypCpaTrainReg_saveMode').val() == "U"){
		$('.mypCpaTrainReg_titleYn').hide();
		mypCpaTrainReg.mypCpaTrainReg_tabMove($('#mypCpaTrainReg_movePage').val());
		$('.mypCpaTrain_preBtn').hide();

		if($('#mypCpaTrainReg_movePage').val() == "mypCpaTrainReg_pictInfo"){
			$('.mypCpaTrainReg_titleNm').text('사진등록');
		}

		if($('#mypCpaTrainReg_movePage').val() == "mypCpaTrainReg_reviewInfo"){
			$('.mypCpaTrain_submitBtn').hide();
			$('.mypCpaTrain_mypBtn').show();
		}
		else{
			$('.mypCpaTrain_submitBtn').show();
			$('.mypCpaTrain_mypBtn').hide();
			$('.mypCpaTrain_backBtn').show();
			$('.mypCpaTrain_nextBtn').show();
			$('.mypCpaTrain_nextBtn').text("수정/저장");
		}
	}
	//처음 등록 모드
	else{
		mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_agreeInfo');
		$('.mypCpaTrainReg_titleYn').show();
		$('#mypCpaTrainRegPop_atchFileInfoPop').show();
		$('.mypCpaTrain_backBtn').hide();
		$('.mypCpaTrain_preBtn').show();
		$('.mypCpaTrain_nextBtn').show();
		$('.mypCpaTrain_mypBtn').hide();
	}

	//반려상태에서 재신청한 경우
	if($('#mypCpaTrainReg_regFlag').val() == "F"){
		mypCpaTrainReg.mypCpaTrainReg_regFlagFList();
	}

	mypCpaTrainReg.mypCpaTrainReg_grdtSatausChange();

	//약관동의 체크
	if($("#mypCpaTrainReg_agreement1").is(":checked") && $("#mypCpaTrainReg_agreement2").is(":checked") && $("#mypCpaTrainReg_agreement3").is(":checked")) // 단일 체크해제시 전체체크 해제
	{
		$("input:checkbox[id='mypCpaTrainReg_allAgree']").prop("checked", true);
		$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", false);
	}else {
		$("input:checkbox[id='mypCpaTrainReg_allAgree']").prop("checked", false);
		$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", true);
	}



	//약관동의 저장(시작하기버튼)
	$("#mypCpaTrainReg_agreeSaveBtn").on("click",function(e) {
		$('#mypCpaTrainReg_saveData').val("mypCpaTrainReg_agreeInfo");
		mypCpaTrainReg.mypCpaTrainReg_infoSave();

	});

	//사진 저장(다음버튼)
	$("#mypCpaTrainReg_pictInfoSaveBtn").on("click",function(e) {

		$('#mypCpaTrainReg_saveData').val("mypCpaTrainReg_pictInfo");

		if($('#mypCpaTrainReg_saveMode').val() == "U"){
			$('#mypCpaTrainReg_body').addClass('stop');
			$('#mypCpaTrainReg_savePop').addClass('show');
		}
		else{
			mypCpaTrainReg.mypCpaTrainReg_infoSave();
		}

	});

	//수습공인회계사 등록 재학여부 저장(다음버튼)
	$("#mypCpaTrainReg_grdtSatausInfoSaveBtn").on("click",function(e) {

		$('#mypCpaTrainReg_saveData').val("mypCpaTrainReg_grdtSatausInfo");
		mypCpaTrainReg.mypCpaTrainReg_infoSave();
	});

	//이력정보 저장(다음버튼)
	$("#mypCpaTrainReg_apntcCpaHistInfoSaveBtn").on("click",function(e) {

		$('#mypCpaTrainReg_saveData').val("mypCpaTrainReg_apntcCpaHistInfo");
		mypCpaTrainReg.mypCpaTrainReg_infoSave();

	});

	//첨부파일 저장(다음버튼)
	$("#mypCpaTrainReg_atchFileInfoSaveBtn").on("click",function(e) {

		$('#mypCpaTrainReg_saveData').val("mypCpaTrainReg_atchFileInfo");
		mypCpaTrainReg.mypCpaTrainReg_infoSave();
	});

	//제출
	$("#mypCpaTrainReg_reviewInfoSaveBtn").on("click",function(e) {

		$('#mypCpaTrainReg_saveData').val("mypCpaTrainReg_reviewInfo");
		$('#mypCpaTrainReg_body').addClass('stop');
		$('#mypCpaTrainReg_saveRegPop').addClass('show');
	});


	//약관동의 모두 동의클릭
	$('#mypCpaTrainReg_allAgree').on('click',function(e) {
		var chk = $(this).is(":checked");

		if(chk){
			$("input:checkbox[id='mypCpaTrainReg_agreement1']").prop("checked", true);
			$("input:checkbox[id='mypCpaTrainReg_agreement2']").prop("checked", true);
			$("input:checkbox[id='mypCpaTrainReg_agreement3']").prop("checked", true);
			$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", false);
		}else {
			$("input:checkbox[id='mypCpaTrainReg_agreement1']").prop("checked", false);
			$("input:checkbox[id='mypCpaTrainReg_agreement2']").prop("checked", false);
			$("input:checkbox[id='mypCpaTrainReg_agreement3']").prop("checked", false);
			$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", true);
		}
	});

	// 체크필터 체인징
	$(".mypCpaTrainReg_check").on('click',function(e) {

		if($("#mypCpaTrainReg_agreement1").is(":checked") && $("#mypCpaTrainReg_agreement2").is(":checked") && $("#mypCpaTrainReg_agreement3").is(":checked")) // 단일 체크해제시 전체체크 해제
		{
			$("input:checkbox[id='mypCpaTrainReg_allAgree']").prop("checked", true);
			$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", false);
		}else {
			$("input:checkbox[id='mypCpaTrainReg_allAgree']").prop("checked", false);
			$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", true);
		}
	});


	//사진선택
	$('#mypCpaTrainReg_file_selection').on("change", function (e){
		mypCpaTrainReg.fn_cpaTrainRegistImgSelection(e);
	});

	//대학 및 대학원 재학여부 선택
	$('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').on("change", function (e){
		mypCpaTrainReg.mypCpaTrainReg_grdtSatausChange();
	});

	//첨부파일 파일 변경
	$('.mypCpaTrainReg_fileChange').on('click',function(e) {
		var fileId = $(this).attr('id');

		var type = $("#"+fileId).attr("type");

		if(type != "text"){
			$("#"+fileId).val('');

			$("label[for="+fileId+"]").text("파일을 등록해 주세요");
			$("label[for="+fileId+"]").css("color",'#ccc');
		}

	});

	$('.mypCpaTrainReg_fileChange').on('change',function(e) {
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


	//추가 첨부파일 삭제(삭제버튼 클릭시 해당 div 삭제)
	mypCpaTrainReg.mypCpaTrainReg_atchFileInfoRemove = function (atchFileId){

		if(atchFileId == "regFlagFDelHide1"){
			$(".regFlagFDelHide1").hide();
			$('#mypCpaTrainReg_atchFileInfoAtchFileId1').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoAtchFileId1Set").val("");
		}
		else if(atchFileId == "regFlagFDelHide2"){
			$(".regFlagFDelHide2").hide();
			$('#mypCpaTrainReg_atchFileInfoAtchFileId2').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoAtchFileId2Set").val("");
		}
		else if(atchFileId == "regFlagFDelHide3"){
			$(".regFlagFDelHide3").hide();
			$('#mypCpaTrainReg_atchFileInfoAtchFileId3').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoAtchFileId3Set").val("");
		}
		else if(atchFileId == "regFlagFDelHide4"){
			$(".regFlagFDelHide4").hide();
			$('#mypCpaTrainReg_atchFileInfoAtchFileId4').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoAtchFileId4Set").val("");
		}
		else if(atchFileId == "regFlagFPassCrtiDelHide"){
			$(".regFlagFPassCrtiDelHide").hide();
			$('#mypCpaTrainReg_atchFileInfoPassCrtiFileId').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoPassCrtiFileIdSet").val("");
		}
		else if(atchFileId == "regFlagFEmplCrtiDelHide"){
			$(".regFlagFEmplCrtiDelHide").hide();
			$('#mypCpaTrainReg_atchFileInfoEmplCrtiFileId').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoEmplCrtiFileIdSet").val("");
		}
		else if(atchFileId == "regFlagFRsumFileDelHide"){
			$(".regFlagFRsumFileDelHide").hide();
			$('#mypCpaTrainReg_atchFileInfoRsumFileId').prop('type',"file");
			$("#mypCpaTrainReg_atchFileInfoEventnSet").val("");
		}

	}

	//수습공인회계사 등록신청서 클릭
	$("#mypCpaTrainReg_trainRegForm").on("click",function(e) {
		var pin = $('#mypCpaTrainReg_pin').val();
		window.open("http://localhost:8080/kicpacs/kicpa/myp/mypCpaTrainRegForm.do?pin="+pin, "pop", "scrollbars=yes, resizable=yes");

	});

	//저장팝업 제출취소버튼 클릭
	$("#mypCpaTrainReg_savePopCanclBtn").on("click",function(e) {
		$('#mypCpaTrainReg_body').removeClass('stop');
		$('#mypCpaTrainReg_savePop').removeClass('show');
	});

	//저장팝업 제출버튼 클릭
	$("#mypCpaTrainReg_savePopBtn").on("click",function(e) {

		mypCpaTrainReg.mypCpaTrainReg_infoSave();

	});

	//저장팝업 제출취소버튼 클릭
	$("#mypCpaTrainReg_saveRegPopCanclBtn").on("click",function(e) {
		$('#mypCpaTrainReg_body').removeClass('stop');
		$('#mypCpaTrainReg_saveRegPop').removeClass('show');
	});

	//저장팝업 제출버튼 클릭
	$("#mypCpaTrainReg_saveRegPopBtn").on("click",function(e) {

		mypCpaTrainReg.mypCpaTrainReg_infoSave();

	});
	
}

//화면상단 닫기버튼
mypCpaTrainReg.mypCpaTrainReg_backMove = function() {

	if($('#mypCpaTrainReg_saveMode').val() == "U"){
		location.href="/kicpa/myp/myPageInfo.do?pin="+$('#mypCpaTrainReg_pin').val();
	}
	else{
		location.href="/kicpa/myp/myPage.do?Pin="+$('#mypCpaTrainReg_pin').val();
	}

}

//탭 이동
mypCpaTrainReg.mypCpaTrainReg_tabMove = function(flag) {

	//입력화면 show/hide
	$('.myPageMemInfoTabMove').hide();
	$('#'+flag).show();

	if(flag == "mypCpaTrainReg_reviewInfo"){                     //검토 및 제출
		var reviewInfo_param = {};
		reviewInfo_param.pin = $('#mypCpaTrainReg_pin').val();
		reviewInfo_param.apntcSn = $('#mypCpaTrainReg_apntcSn').val();

		$.ajax({
			dataType:"json",
			url: mypCpaTrainReg.getContextPath()+"/myp/selectMypCpaTrainRegReviewInfo.do",
			data:reviewInfo_param,
			success: function (data) {
				mypCpaTrainReg.selectMypCpaTrainRegReviewInfo_success(data);
			},
			error: function (status, e) {
				alert("데이터 요청에 실패하였습니다.\r status : " + status);
			}
		});
	}

}

//사진선택
mypCpaTrainReg.fn_cpaTrainRegistImgSelection = function (e){
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);

	filesArr.forEach(function(f){
		if(!f.type.match("image.*")){
			alert("이미지 파일만  가능 합니다.");
			$('#mypCpaTrainReg_pictSelect').attr("src", "");
			$('#mypCpaTrainReg_file_selection').val('');
			return;
		}

		sel_file = f;

		var reader = new FileReader();
		reader.onload = function(e){

			$('#mypCpaTrainReg_pictSelect').attr("src", e.target.result);
			$('#mypCpaTrainReg_cpaPict').css({'background-size':'0'});
			$('#mypCpaTrainReg_cpaPict').css({'background-color':'#ffffff'});

		}

		$('#cpaPassRegistgetImg').hide();

		reader.readAsDataURL(f);
	});
}

//대학 및 대학원 재학여부 변경
mypCpaTrainReg.mypCpaTrainReg_grdtSatausChange = function(flag) {

	if($('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val() != "" && $('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val() != null){
		$('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').addClass('select');
	}
	else{
		$('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').removeClass('select');
	}

	if($('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val()=="00000020"){
		$('.mypCpaTrainReg_grdtSatausInfoTrigger').show();
		$('.mypCpaTrainReg_atchFileInfoAtchFileAdd1').show();
		$('#mypCpaTrainReg_atchFileId1FlagYn').val("Y");
		$("#mypCpaTrainReg_atchFileInfoAtchFileId1Set").val('');
		$("#mypCpaTrainReg_atchFileInfoAtchFileId2Set").val('');
		$("#mypCpaTrainReg_atchFileInfoAtchFileId3Set").val('');
		$("#mypCpaTrainReg_atchFileInfoAtchFileId4Set").val('');
	}
	else{
		$('.mypCpaTrainReg_grdtSatausInfoTrigger').hide();
		$('#mypCpaTrainReg_grdtSatausInfoGrdtDe').val('');
		$('#mypCpaTrainReg_grdtSatausInfoStartDe').val('');
		$('#mypCpaTrainReg_grdtSatausInfoEndDe').val('');
		$('.mypCpaTrainReg_atchFileInfoAtchFileAdd1').hide();
		$('#mypCpaTrainReg_atchFileId1FlagYn').val("N");
	}

}

//저장팝업 예버튼 클릭
mypCpaTrainReg.mypCpaTrainReg_infoSave = function(){

	var saveData = $('#mypCpaTrainReg_saveData').val();

	//약관동의
	if(saveData == "mypCpaTrainReg_agreeInfo"){

		var formData = $('#mypCpaTrainReg_agreeForm').serializeObject();
		formData.pin = $('#mypCpaTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
		var url = mypCpaTrainReg.getContextPath()+"/myp/mypCpaTrainRegAgreeSave.do";

		mypCpaTrainReg.mypCpaTrainReg_trainInfoSave(formData, url, "mypCpaTrainReg_pictInfo");
	}
	else if(saveData == "mypCpaTrainReg_pictInfo"){		//사진
		var form = $('#mypCpaTrainReg_pictInfoForm')[0];
		var formData = new FormData(form);
		formData.append("pin", $('#mypCpaTrainReg_pin').val());
		formData.append("apntcSn", $('#mypCpaTrainReg_apntcSn').val());
		formData.append("saveMode", $('#mypCpaTrainReg_saveMode').val());
		formData.append("regFlag", $('#mypCpaTrainReg_regFlag').val());

		$.ajax({
			cache : false,
			url : mypCpaTrainReg.getContextPath()+"/myp/mypCpaTrainRegPictInfoSave.do",
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
					if($('#mypCpaTrainReg_saveMode').val() == "U"){
						location.replace(mypCpaTrainReg.getContextPath()+'/myp/myPageInfo.do?pin='+$('#mypCpaTrainReg_pin').val());
					}
					else{
						mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_grdtSatausInfo');
					}
				}
			}, // success
			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		}); // $.ajax */
	}
	else if(saveData == "mypCpaTrainReg_grdtSatausInfo"){		//수습공인회계사 등록 재학여부
		var formData = $('#mypCpaTrainReg_grdtSatausInfoForm').serializeObject();
		formData.pin = $('#mypCpaTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
		var url = mypCpaTrainReg.getContextPath()+"/myp/mypCpaTrainRegGrdtSatausInfoSave.do";

		mypCpaTrainReg.mypCpaTrainReg_trainInfoSave(formData, url, "mypCpaTrainReg_apntcCpaHistInfo");
	}
	else if(saveData == "mypCpaTrainReg_apntcCpaHistInfo"){		//이력정보
		var formData = $('#mypCpaTrainReg_apntcCpaHistInfoForm').serializeObject();
		formData.pin = $('#mypCpaTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
		var url = mypCpaTrainReg.getContextPath()+"/myp/mypCpaTrainRegApntcCpaHistInfoSave.do";

		mypCpaTrainReg.mypCpaTrainReg_trainInfoSave(formData, url, "mypCpaTrainReg_atchFileInfo");
	}
	else if(saveData == "mypCpaTrainReg_atchFileInfo"){
		var form = $('#mypCpaTrainReg_atchFileInfoForm')[0];
		var formData = new FormData(form);
		formData.append("pin", $('#mypCpaTrainReg_pin').val());
		formData.append("apntcSn", $('#mypCpaTrainReg_apntcSn').val());

		$.ajax({
			cache : false,
			url : mypCpaTrainReg.getContextPath()+"/myp/mypCpaTrainRegAtchFileInfoSave.do",
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
					mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_reviewInfo');
				}
			}, // success
			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		}); // $.ajax */
	}
	else if(saveData == "mypCpaTrainReg_reviewInfo"){		//제출
		var formData = {};
		formData.pin = $('#mypCpaTrainReg_pin').val();
		formData.apntcSn = $('#mypCpaTrainReg_apntcSn').val();

		$.ajax({
			url : mypCpaTrainReg.getContextPath()+"/myp/mypCpaTrainRegSubmit.do",
			type : "POST",
			data : formData,
			success : function(data) {
				location.replace(mypCpaTrainReg.getContextPath()+'/myp/myPage.do?Pin='+$('#mypCpaTrainReg_pin').val());
			}
		});
	}
}

//수습 정보 저장(다음 클릭시 해당 탭 내용 저장)
mypCpaTrainReg.mypCpaTrainReg_trainInfoSave = function(formData, url, flag) {

	$.ajax({
		url : url,
		type : "POST",
		data : formData,
		success : function(data) {

			if(data.message != "" && data.message != null){
				alert(data.message);
			}
			else{
				if(data.apntcSn != "" && data.apntcSn != null && ($('#mypCpaTrainReg_apntcSn').val() =="" || $('#mypCpaTrainReg_apntcSn').val() == null)){
					$('#mypCpaTrainReg_apntcSn').val(data.apntcSn);
				}
				mypCpaTrainReg.mypCpaTrainReg_tabMove(flag);
			}
		}
	});
}

//검토 및 제출 list
mypCpaTrainReg.selectMypCpaTrainRegReviewInfo_success = function (result){
	$('.mypTrainReview_atchFileId2').hide();
	$('.mypTrainReview_atchFileId3').hide();
	$('.mypTrainReview_atchFileId4').hide();

	var vacationDe = result.cpaTrainRegReviewInfoList[0].vacationStrDe+" ~ "+result.cpaTrainRegReviewInfoList[0].vacationEndDe;
	if(result.cpaTrainRegReviewInfoList[0].vacationStrDe == "" || result.cpaTrainRegReviewInfoList[0].vacationStrDe == null
		|| result.cpaTrainRegReviewInfoList[0].vacationEndDe == "" || result.cpaTrainRegReviewInfoList[0].vacationEndDe == null){
		vacationDe ="";
	}

	$('#mypCpaTrainRegReviewInfo_pictFileNm').text(result.cpaTrainRegReviewInfoList[0].photoNm);
	$('#mypCpaTrainRegReviewInfo_grdtStaus').text(result.cpaTrainRegReviewInfoList[0].grdtSatausNm);
	$('#mypCpaTrainRegReviewInfo_grdtDe').text(result.cpaTrainRegReviewInfoList[0].grdtDe);
	$('#mypCpaTrainRegReviewInfo_vacationDe').text(vacationDe);
	$('#mypCpaTrainRegReviewInfo_appRegistDe').text(result.cpaTrainRegReviewInfoList[0].appRegistDe);
	$('#mypCpaTrainRegReviewInfo_guideCpa').text(result.cpaTrainRegReviewInfoList[0].guideCpaNm + "    "+result.cpaTrainRegReviewInfoList[0].guideCpaNo);
	$('#mypCpaTrainRegReviewInfo_appInstt').text(result.cpaTrainRegReviewInfoList[0].appInsttNm+ "    "+result.cpaTrainRegReviewInfoList[0].appInsttCd);
	$('#mypCpaTrainRegReviewInfo_appInsttEtc').text(result.cpaTrainRegReviewInfoList[0].appInsttEtc);
	$('#mypCpaTrainRegReviewInfo_atchFileId1').text(result.cpaTrainRegReviewInfoList[0].atchFileId1Nm);
	$('#mypCpaTrainRegReviewInfo_passCrtiFileId').text(result.cpaTrainRegReviewInfoList[0].passCrtiFileIdNm);
	$('#mypCpaTrainRegReviewInfo_emplCrtiFileId').text(result.cpaTrainRegReviewInfoList[0].emplCrtiFileIdNm);
	$('#mypCpaTrainRegReviewInfo_rsumFileId').text(result.cpaTrainRegReviewInfoList[0].rsumFileNm);

	//추가 첨부파일
	if(result.cpaTrainRegReviewInfoList[0].atchFileId2Nm != "" && result.cpaTrainRegReviewInfoList[0].atchFileId2Nm != null){
		$('.mypTrainReview_atchFileId2').show();
		$('#mypCpaTrainRegReviewInfo_atchFileId2').text(result.cpaTrainRegReviewInfoList[0].atchFileId2Nm);
	}
	if(result.cpaTrainRegReviewInfoList[0].atchFileId3Nm != "" && result.cpaTrainRegReviewInfoList[0].atchFileId3Nm != null){
		$('.mypTrainReview_atchFileId3').show();
		$('#mypCpaTrainRegReviewInfo_atchFileId3').text(result.cpaTrainRegReviewInfoList[0].atchFileId3Nm);
	}
	if(result.cpaTrainRegReviewInfoList[0].atchFileId4Nm != "" && result.cpaTrainRegReviewInfoList[0].atchFileId4Nm != null){
		$('.mypTrainReview_atchFileId4').show();
		$('#mypCpaTrainRegReviewInfo_atchFileId4').text(result.cpaTrainRegReviewInfoList[0].atchFileId4Nm);
	}
}

//반려상태에서 재신청한 경우
mypCpaTrainReg.mypCpaTrainReg_regFlagFList = function(result) {
	var regFlagFTrainList_param = {};
	regFlagFTrainList_param.pin = $('#mypCpaTrainReg_pin').val();
	regFlagFTrainList_param.apntcSn = $('#mypCpaTrainReg_apntcSn').val();
	regFlagFTrainList_param.regFlag = $('#mypCpaTrainReg_regFlag').val();

	$.ajax({
		url : mypCpaTrainReg.getContextPath()+"/myp/selectMypCpaTrainRegReviewInfo.do",
		type : "POST",
		data : regFlagFTrainList_param,
		success : function(data) {
			mypCpaTrainReg.mypCpaTrainReg_regFlagFList_success(data);
		}
	});
}

//반려상태 재등록시 기존 데이터 입력
mypCpaTrainReg.mypCpaTrainReg_regFlagFList_success = function(data){

	//서약서
	if(data.cpaTrainRegReviewInfoList[0].agreeInfo1Yn == "Y"){
		$('#mypCpaTrainReg_agreement1').prop("checked",true);
	}
	if(data.cpaTrainRegReviewInfoList[0].agreeInfo2Yn == "Y"){
		$('#mypCpaTrainReg_agreement2').prop("checked",true);
	}
	if(data.cpaTrainRegReviewInfoList[0].agreeInfo3Yn == "Y"){
		$('#mypCpaTrainReg_agreement3').prop("checked",true);
	}

	//약관동의 체크
	if($("#mypCpaTrainReg_agreement1").is(":checked") && $("#mypCpaTrainReg_agreement2").is(":checked") && $("#mypCpaTrainReg_agreement3").is(":checked")) // 단일 체크해제시 전체체크 해제
	{
		$("input:checkbox[id='mypCpaTrainReg_allAgree']").prop("checked", true);
		$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", false);
	}else {
		$("input:checkbox[id='mypCpaTrainReg_allAgree']").prop("checked", false);
		$("#mypCpaTrainReg_agreeSaveBtn").prop("disabled", true);
	}

	//사진
	$('#mypCpaTrainReg_cpaPict').css({'background-size':'0'});
	$('#mypCpaTrainReg_cpaPict').css({'background-color':'#ffffff'});

	//수습공인회계사 등록 재학여부
	$('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val(data.cpaTrainRegReviewInfoList[0].grdtSataus);            //대학 및 대학원 재학여부
	$('#mypCpaTrainReg_grdtSatausInfoGrdtDe').val(data.cpaTrainRegReviewInfoList[0].grdtDe);                //졸업예정일
	$('#mypCpaTrainReg_grdtSatausInfoStartDe').val(data.cpaTrainRegReviewInfoList[0].vacationStrDe);               //방학기간(시작일)
	$('#mypCpaTrainReg_grdtSatausInfoEndDe').val(data.cpaTrainRegReviewInfoList[0].vacationEndDe);                 //방학기간(종료일)

	if($('#mypCpaTrainReg_grdtSatausInfoGrdtSataus').val()=="00000020"){
		$('.mypCpaTrainReg_grdtSatausInfoTrigger').show();
		$('.mypCpaTrainReg_atchFileInfoAtchFileAdd1').show();
		$('#mypCpaTrainReg_atchFileId1FlagYn').val("Y");
		$("#mypCpaTrainReg_atchFileInfoAtchFileId1Set").val('');
		$("#mypCpaTrainReg_atchFileInfoAtchFileId2Set").val('');
		$("#mypCpaTrainReg_atchFileInfoAtchFileId3Set").val('');
		$("#mypCpaTrainReg_atchFileInfoAtchFileId4Set").val('');
	}
	else{
		$('.mypCpaTrainReg_grdtSatausInfoTrigger').hide();
		$('#mypCpaTrainReg_grdtSatausInfoGrdtDe').val('');
		$('#mypCpaTrainReg_grdtSatausInfoStartDe').val('');
		$('#mypCpaTrainReg_grdtSatausInfoEndDe').val('');
		$('.mypCpaTrainReg_atchFileInfoAtchFileAdd1').hide();
		$('#mypCpaTrainReg_atchFileId1FlagYn').val("N");
	}

	//이력정보
	$('#mypCpaTrainReg_apntcCpaHistInfoAppRegistDe').val(data.cpaTrainRegReviewInfoList[0].appRegistDe);             //실무수습기관 입사일자
	$('#mypCpaTrainReg_apntcCpaHistInfoGuideCpa').val(data.cpaTrainRegReviewInfoList[0].guideCpaNm);                //지도공인회계사명
	$('#mypCpaTrainReg_apntcCpaHistInfoGuideCpaId').val(data.cpaTrainRegReviewInfoList[0].guideCpaNo);              //지도공인회계사번호
	$('#mypCpaTrainReg_apntcCpaHistInfoAppInsttNm').val(data.cpaTrainRegReviewInfoList[0].appInsttNm);              //실무수습기관명
	$('#mypCpaTrainReg_apntcCpaHistInfoAppInsttCd').val(data.cpaTrainRegReviewInfoList[0].appInsttCd);              //실무수습기관코드
	$('#mypCpaTrainReg_apntcCpaHistInfoAudGrpCl').val(data.cpaTrainRegReviewInfoList[0].stausCl);                   //개업구분

	/*if(data.cpaTrainRegReviewInfoList[0].appInsttEtcYn == "Y"){
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtcYn').prop("checked",true);    //기타 실무수습기관 여부
    }
    if($("input:checkbox[name=appInsttEtcYn]").is(":checked")){
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').val('');
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', false);
    }else{
        $('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', true);
    }*/
	if($('#mypCpaTrainReg_apntcCpaHistInfoAudGrpCl').val() != "A3019999"){
		$('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').val('');
		$('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', true);
		$('.mypCpaTrainReg_apntcCpaHistInfoYn').hide();
	}
	else{
		$('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').prop('disabled', false);
		$('.mypCpaTrainReg_apntcCpaHistInfoYn').show();
	}


	$('#mypCpaTrainReg_apntcCpaHistInfoAppInsttEtc').val(data.cpaTrainRegReviewInfoList[0].appInsttEtc);             //기타 실무수습기관

	//첨부파일
	if(data.cpaTrainRegReviewInfoList[0].atchFileId1 != "" && data.cpaTrainRegReviewInfoList[0].atchFileId1 != null){          //졸업예정증명서류1
		$("label[for='mypCpaTrainReg_atchFileInfoAtchFileId1']").text("");
		$(".regFlagFDelHide1").show();
		$('#mypCpaTrainReg_atchFileInfoAtchFileId1').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoAtchFileId1").val(data.cpaTrainRegReviewInfoList[0].atchFileId1Nm);
		$("#mypCpaTrainReg_atchFileInfoAtchFileId1Set").val(data.cpaTrainRegReviewInfoList[0].atchFileId1);
	}
	if(data.cpaTrainRegReviewInfoList[0].atchFileId2 != "" && data.cpaTrainRegReviewInfoList[0].atchFileId2 != null){          //졸업예정증명서류2
		$("label[for='mypCpaTrainReg_atchFileInfoAtchFileId2']").text("");
		$(".regFlagFDelHide2").show();
		$('#mypCpaTrainReg_atchFileInfoAtchFileId2').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoAtchFileId2").val(data.cpaTrainRegReviewInfoList[0].atchFileId2Nm);
		$("#mypCpaTrainReg_atchFileInfoAtchFileId2Set").val(data.cpaTrainRegReviewInfoList[0].atchFileId2);
	}
	if(data.cpaTrainRegReviewInfoList[0].atchFileId3 != "" && data.cpaTrainRegReviewInfoList[0].atchFileId3 != null){          //졸업예정증명서류3
		$("label[for='mypCpaTrainReg_atchFileInfoAtchFileId3']").text("");
		$(".regFlagFDelHide3").show();
		$('#mypCpaTrainReg_atchFileInfoAtchFileId3').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoAtchFileId3").val(data.cpaTrainRegReviewInfoList[0].atchFileId3Nm);
		$("#mypCpaTrainReg_atchFileInfoAtchFileId3Set").val(data.cpaTrainRegReviewInfoList[0].atchFileId3);
	}
	if(data.cpaTrainRegReviewInfoList[0].atchFileId4 != "" && data.cpaTrainRegReviewInfoList[0].atchFileId4 != null){          //졸업예정증명서류4
		$("label[for='mypCpaTrainReg_atchFileInfoAtchFileId4']").text("");
		$(".regFlagFDelHide4").show();
		$('#mypCpaTrainReg_atchFileInfoAtchFileId4').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoAtchFileId4").val(data.cpaTrainRegReviewInfoList[0].atchFileId4Nm);
		$("#mypCpaTrainReg_atchFileInfoAtchFileId4Set").val(data.cpaTrainRegReviewInfoList[0].atchFileId4);
	}
	if(data.cpaTrainRegReviewInfoList[0].passCrtiFileId != "" && data.cpaTrainRegReviewInfoList[0].passCrtiFileId != null){          //합격증서
		$("label[for='mypCpaTrainReg_atchFileInfoPassCrtiFileId']").text("");
		$(".regFlagFPassCrtiDelHide").show();
		$('#mypCpaTrainReg_atchFileInfoPassCrtiFileId').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoPassCrtiFileId").val(data.cpaTrainRegReviewInfoList[0].passCrtiFileIdNm);
		$("#mypCpaTrainReg_atchFileInfoPassCrtiFileIdSet").val(data.cpaTrainRegReviewInfoList[0].passCrtiFileId);
	}
	if(data.cpaTrainRegReviewInfoList[0].emplCrtiFileId != "" && data.cpaTrainRegReviewInfoList[0].emplCrtiFileId != null){          //재직증명서
		$("label[for='mypCpaTrainReg_atchFileInfoEmplCrtiFileId']").text("");
		$(".regFlagFEmplCrtiDelHide").show();
		$('#mypCpaTrainReg_atchFileInfoEmplCrtiFileId').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoEmplCrtiFileId").val(data.cpaTrainRegReviewInfoList[0].emplCrtiFileIdNm);
		$("#mypCpaTrainReg_atchFileInfoEmplCrtiFileIdSet").val(data.cpaTrainRegReviewInfoList[0].emplCrtiFileId);
	}
	if(data.cpaTrainRegReviewInfoList[0].rsumFileNm != "" && data.cpaTrainRegReviewInfoList[0].rsumFileNm != null){          //이력서
		$("label[for='mypCpaTrainReg_atchFileInfoRsumFileId']").text("");
		$(".regFlagFRsumFileDelHide").show();
		$('#mypCpaTrainReg_atchFileInfoRsumFileId').prop('type',"text");
		$("#mypCpaTrainReg_atchFileInfoRsumFileId").val(data.cpaTrainRegReviewInfoList[0].rsumFileNm);
		$("#mypCpaTrainReg_atchFileInfoEventnSet").val(data.cpaTrainRegReviewInfoList[0].eventn);
	}

}