var mypMemberReg = {};

mypMemberReg.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypMemberReg.cpaAuditPopInit = function(){
	$(".search-box .search").on("click",function(){
		fn_portal_pop("searchPop")
		$("#cpaAuditPopForm input[name='searchKeyword']").attr("placeholder","감사인명을 입력하세요.");
	});


	$("#searchPop .btn-send").on("click",function(){
		$("#searchPop .btn-close").click();
		$("#cpaAuditPopForm input[name='searchKeyword']").val($("#boardSearchForm input[name='searchKeyword']").val());
		mypMemberReg.getCpaAuditPopList();
	});

}

mypMemberReg.getCpaAuditPopList = function(){
	var param =$("#cpaAuditPopForm").serializeObject();
	fn_ajax_call("/kicpa/myp/getCpaAuditPopList.do",param,fnCpaAuditPopListSuccess,mypMemberReg.cpaAuditPopListError);
}

mypMemberReg.mypMemberRegInit = function(){

	//수정모드
	if($('#mypCpaMemberReg_saveMode').val() == "U"){
		$('.mypCpaMemberReg_titleYn').hide();
		$('.mypCpaMember_preBtn').hide();
		if($('#mypCpaMemberReg_movePage').val() == "mypCpaMemberReg_reviewInfo"){
			$('.mypCpaMember_submitBtn').hide();
			$('.mypCpaMember_mypBtn').show();
		}
		else{
			if($('#mypCpaMemberReg_movePage').val() == "mypCpaMemberReg_aidDuesInfo"){
				$('.mypCpaMember_nextBtn').hide();
			}
			else{
				$('.mypCpaMember_submitBtn').show();
				$('.mypCpaMember_mypBtn').hide();
				$('.mypCpaMember_backBtn').show();
				$('.mypCpaMember_nextBtn').show();
				$('.mypCpaMember_nextBtn').text("수정/저장");
			}
			//저장된(수정할) 데이터 조회
			mypMemberReg.mypCpaMember_updateInfoList();
		}

		mypMemberReg.mypMemberReg_tabMove($('#mypCpaMemberReg_movePage').val());
	}
	//처음 등록 모드
	else{
		mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_agreeInfo');
		$('.mypCpaMember_backBtn').hide();
		$('.mypCpaMemberReg_titleYn').show();
		$('.mypCpaMember_preBtn').show();
		$('.mypCpaMember_nextBtn a').text("다음");
		$('.mypCpaMember_mypBtn').hide();
	}

	//반려상태에서 재신청한 경우
	if($('#mypCpaMemberReg_regFlag').val() == "F"){
		mypMemberReg.mypCpaMember_regFlagFList();
	}

	//약관동의 체크
	if($("#mypCpaMemberReg_agreement1").is(":checked") && $("#mypCpaMemberReg_agreement2").is(":checked")) // 단일 체크해제시 전체체크 해제
	{
		$("input:checkbox[id='mypCpaMemberReg_allAgree']").prop("checked", true);
		$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", false);
	}else {
		$("input:checkbox[id='mypCpaMemberReg_allAgree']").prop("checked", false);
		$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", true);
	}

	//약관동의 저장(시작하기버튼)
	$("#mypCpaMemberReg_agreeInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_agreeInfo");
		mypMemberReg.mypCpaMemberReg_infoSave();
	});

	//부조회원 구분 & 사업자등록번호 저장(다음버튼)
	$("#mypCpaMemberReg_aidMberInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_cpaCareerInfo");
		mypMemberReg.mypCpaMemberReg_infoSave();
	});

	//회원등록구분 저장(다음버튼)
	$("#mypCpaMemberReg_cpaCareerInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_aidMberInfo");
		mypMemberReg.mypCpaMemberReg_infoSave();
	});

	//정보공개설정 저장(다음버튼)
	$("#mypCpaMember_nmstOthbcInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_nmstOthbcInfo");

		if($('#mypCpaMemberReg_saveMode').val() == "U"){
			$('#mypCpaMemberReg_body').addClass('stop');
			$('#mypCpaMemberReg_savePop').addClass('show');
		}
		else{
			mypMemberReg.mypCpaMemberReg_infoSave();
		}
	});

	//첨부파일 (첨부서류) 저장(다음버튼)
	$("#mypCpaMemberReg_atchFileInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_atchFileInfo");
		mypMemberReg.mypCpaMemberReg_infoSave();
	});

	//등록 회비 납부 (다음버튼)
	$("#mypCpaMemberReg_aidDuesInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_aidDuesInfo");
		mypMemberReg.mypCpaMemberReg_infoSave();
	});

	//제출
	$("#mypCpaMember_reviewInfoSaveBtn").on("click",function(e) {
		$('#mypCpaMemberReg_saveData').val("mypCpaMemberReg_reviewInfo");
		$('#mypCpaMemberReg_body').addClass('stop');
		$('#mypCpaMemberReg_saveRegPop').addClass('show');
	});


	//약관동의 모두 동의클릭
	$('#mypCpaMemberReg_allAgree').on('click',function(e) {
		var chk = $(this).is(":checked");

		if(chk){
			$("input:checkbox[id='mypCpaMemberReg_agreement1']").prop("checked", true);
			$("input:checkbox[id='mypCpaMemberReg_agreement2']").prop("checked", true);
			$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", false);
		}else {
			$("input:checkbox[id='mypCpaMemberReg_agreement1']").prop("checked", false);
			$("input:checkbox[id='mypCpaMemberReg_agreement2']").prop("checked", false);
			$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", true);
		}
	});

	// 체크필터 체인징
	$(".mypCpaMemberReg_check").on('click',function(e) {

		if($("#mypCpaMemberReg_agreement1").is(":checked") && $("#mypCpaMemberReg_agreement2").is(":checked") ) // 단일 체크해제시 전체체크 해제
		{
			$("input:checkbox[id='mypCpaMemberReg_allAgree']").prop("checked", true);
			$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", false);
		}else {
			$("input:checkbox[id='mypCpaMemberReg_allAgree']").prop("checked", false);
			$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", true);
		}
	});

	//부조회원 구분 선택
	$('#mypCpaMember_aidMberFlag').on("change", function (e){
		mypMemberReg.mypCpaMemberReg_aidMberFlagChange();
	});

	//회원구분 선택
	$('#mypCpaMember_mberFlag').on("change", function (e){
		mypMemberReg.mypCpaMemberReg_mberFlagChange();
	});

	//가입예정 감사인 클릭
	$('#mypCpaMember_auditNm').on("click", function (e){
		window.open("/kicpa/myp/cpaAuditPop.do","cpaAuditPop");
	});

	//회원(휴업)분류 클릭
	$('#mypCpaMember_closedClNm').on("click", function (e){
		window.open("/kicpa/myp/cpaClosedPop.do","cpaClosedPop");
	});

	//첨부파일 파일 변경
	$('.mypCpaMemberReg_fileChange').on('click',function(e) {
		var fileId = $(this).attr('id');

		var type = $("#"+fileId).attr("type");

		if(type != "text"){
			$("#"+fileId).val('');

			$("label[for="+fileId+"]").text("파일을 등록해 주세요");
			$("label[for="+fileId+"]").css("color",'#ccc');
		}

	});

	$('.mypCpaMemberReg_fileChange').on('change',function(e) {
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

	//등록 회비 납부 결제(납부하기버튼)
	$("#mypCpaMember_setDuesCreate").on("click",function(e) {
		mypMemberReg.mypCpaMemberReg_setDuesCreate();
	});

	//공인회계사 등록신청서 클릭
	$("#mypCpaMember_cpaRegForm").on("click",function(e) {
		var pin = $('#mypCpaTrainReg_pin').val();
		window.open("http://kip.kicpa.or.kr/kicpacs/kicpa/myp/mypCpaRegForm.do?pin="+pin, "pop", "scrollbars=yes, resizable=yes");

	});

	//입회신청서 클릭
	$("#mypCpaMember_cpaMemRegForm").on("click",function(e) {
		var pin = $('#mypCpaTrainReg_pin').val();
		window.open("http://kip.kicpa.or.kr/kicpacs/kicpa/myp/mypCpaMemRegForm.do?pin="+pin, "pop", "scrollbars=yes, resizable=yes");

	});

	//개업 휴업신청서 클릭
	$("#mypCpaMember_cpaMemFlagRegForm").on("click",function(e) {
		var pin = $('#mypCpaTrainReg_pin').val();
		window.open("http://kip.kicpa.or.kr/kicpacs/kicpa/myp/mypCpaMemFlagRegForm.do?pin="+pin, "pop", "scrollbars=yes, resizable=yes");

	});

	//공제회 부조사업 회원가입 신청서 클릭
	$("#mypCpaMember_mypCpaAidRegForm").on("click",function(e) {
		var pin = $('#mypCpaTrainReg_pin').val();
		window.open("http://kip.kicpa.or.kr/kicpacs/kicpa/myp/mypCpaAidRegForm.do?pin="+pin, "pop", "scrollbars=yes, resizable=yes");

	});

	//저장팝업 아니오버튼 클릭
	$("#mypCpaMemberReg_savePopCanclBtn").on("click",function(e) {
		$('#mypCpaMemberReg_body').removeClass('stop');
		$('#mypCpaMemberReg_savePop').removeClass('show');
	});

	//저장팝업 예버튼 클릭
	$("#mypCpaMemberReg_savePopBtn").on("click",function(e) {

		mypMemberReg.mypCpaMemberReg_infoSave();

	});

	//저장팝업 제출취소버튼 클릭
	$("#mypCpaMemberReg_saveRegPopCanclBtn").on("click",function(e) {
		$('#mypCpaMemberReg_body').removeClass('stop');
		$('#mypCpaMemberReg_saveRegPop').removeClass('show');
	});

	//저장팝업 제출버튼 클릭
	$("#mypCpaMemberReg_saveRegPopBtn").on("click",function(e) {

		mypMemberReg.mypCpaMemberReg_infoSave();

	});
}

//납부하기 버튼 클릭
mypMemberReg.mypCpaMemberReg_setDuesCreate = function() {

	if (confirm('등록 회비를 납부 하시겠습니까?')) {

		$.ajax({
			url: mypMemberReg.getContextPath()+"/myp/createNewYearDeus.do",
			type: 'POST',
			data: JSON.stringify(formDuesData) ,
			contentType: 'application/json',
			cache: false,
			processData: false,
			dataType: 'json',
			async: false,
			timeout: 10000,
			beforeSend: function() {

			},
			complete: function() {

			},
			success: function(result) {

				if(result.rt.linkUrl != ''){
					//납부 URL 발생시 결제 진행팝업
					var popupName = "등록 회비 납부";
					var options = 'status=no, height=700, width=700, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY;

					openDialog(result.rt.linkUrl, popupName, options, function(win) {
						mypMemberReg.mypCpaMemberReg_diglogCloseCallback(result.rt.org_tran_id);
					});
				}else{
					alert("결제 URL 생성 오류!");
				}
			},
			error: function(xhr, status, error) {
				alert("오류 발생!");
			},
			fail: function() {
			}
		});
	}
}

//결제 후 콜백
mypMemberReg.mypCpaMemberReg_diglogCloseCallback = function(org_tran_id) {

	var form = new FormData();
	form.append("org_tran_id", org_tran_id);

	$.ajax({
		url: mypMemberReg.getContextPath()+"/myp/selectYearDeusPaymentResult.do",
		type: 'post',
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		async: false,
		timeout: 10000,
		success: function(result) {
			mypMemberReg.mypCpaMemberReg_aidDuesInfoEnd();
		},
		error: function(xhr, status, error) {

		},
		fail: function() {

		}
	});
}

//저장팝업 예버튼 클릭
mypMemberReg.mypCpaMemberReg_infoSave = function(){

	var saveData = $('#mypCpaMemberReg_saveData').val();

	if(saveData == "mypCpaMemberReg_agreeInfo"){						//약관동의
		var formData = $('#mypCpaMemberReg_agreeForm').serializeObject();
		formData.pin = $('#mypCpaMemberReg_pin').val();
		formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
		formData.regFlag = $('#mypCpaMemberReg_regFlag').val();
		var url = mypMemberReg.getContextPath()+"/myp/mypCpaMemberRegAgreeInfoSave.do";

		mypMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMemberReg_cpaCareerInfo");
	}
	else if(saveData == "mypCpaMemberReg_cpaCareerInfo"){					//부조회원 구분 & 사업자등록번호
		var formData = $('#mypCpaMemberReg_aidMberInfoForm').serializeObject();
		formData.pin = $('#mypCpaMemberReg_pin').val();
		formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
		formData.canclCl = $('#mypCpaMemberReg_canclCl').val();
		var url = mypMemberReg.getContextPath()+"/myp/mypCpaMemberRegAidMberInfoSave.do";

		mypMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMemberReg_aidMberInfo");
	}
	else if(saveData == "mypCpaMemberReg_aidMberInfo"){					//회원등록구분
		$("#mypCpaMember_auditOfcps").prop('disabled', false);

		var formData = $('#mypCpaMemberReg_cpaCareerInfoForm').serializeObject();
		formData.pin = $('#mypCpaMemberReg_pin').val();
		formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
		var url = mypMemberReg.getContextPath()+"/myp/mypCpaMemberRegCpaCareerInfoSave.do";

		mypMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMemberReg_nmstOthbcInfo");
	}
	else if(saveData == "mypCpaMemberReg_nmstOthbcInfo"){				//정보공개설정
		var formData = $('#mypCpaMemberReg_nmstOthbcInfoForm').serializeObject();
		formData.pin = $('#mypCpaMemberReg_pin').val();
		formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
		formData.saveMode = $('#mypCpaMemberReg_saveMode').val();
		var url = mypMemberReg.getContextPath()+"/myp/mypCpaMemberRegNmstOthbcInfoSave.do";

		mypMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMemberReg_atchFileInfo");
	}
	else if(saveData == "mypCpaMemberReg_atchFileInfo"){				//첨부파일(첨부서류)
		var form = $('#mypCpaMemberReg_atchFileInfoForm')[0];
		var formData = new FormData(form);
		formData.append("pin", $('#mypCpaMemberReg_pin').val());
		formData.append("cpaSn", $('#mypCpaMemberReg_cpaSn').val());

		$.ajax({
			cache : false,
			url : mypMemberReg.getContextPath()+"/myp/mypCpaMemberRegAtchFileInfoSave.do",
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
					mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_aidDuesInfo');
				}
			}, // success
			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		}); // $.ajax */
	}
	else if(saveData == "mypCpaMemberReg_aidDuesInfo"){				//등록회비 납부
		mypMemberReg.mypMemberReg_tabMove('mypCpaMemberReg_reviewInfo');
	}
	else if(saveData == "mypCpaMemberReg_reviewInfo"){				//제출
		var formData = {};
		formData.pin = $('#mypCpaMemberReg_pin').val();
		formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();

		$.ajax({
			url : mypMemberReg.getContextPath()+"/myp/mypCpaMemberSubmit.do",
			type : "POST",
			data : formData,
			success : function(data) {
				location.replace(mypMemberReg.getContextPath()+'/myp/myPage.do?Pin='+$('#mypCpaMemberReg_pin').val());
			}
		});
	}

}

//화면상단 닫기버튼
mypMemberReg.mypMemberReg_backMove = function() {

	if($('#mypCpaMemberReg_saveMode').val() == "U"){
		location.href="/kicpa/myp/myPageInfo.do?pin="+$('#mypCpaMemberReg_pin').val();
	}
	else{
		location.href="/kicpa/myp/myPage.do?Pin="+$('#mypCpaMemberReg_pin').val();
	}

}

//탭 이동
mypMemberReg.mypMemberReg_tabMove = function(flag) {

	//입력화면 show/hide
	$('.myPageMemInfoTabMove').hide();
	$('#'+flag).show();


	if(flag == "mypCpaMemberReg_aidDuesInfo"){                     //등록 회비 납부

		var form = $('#mypCpaMember_aidDuesInfoForm')[0];
		var form_ = new FormData(form);
		form_.append("pin", $('#mypCpaMemberReg_pin').val());

		$.ajax({
			url: mypMemberReg.getContextPath()+"/myp/selectYearDuesSearch.do",
			type: 'post',
			data: form_,
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			async: false,
			timeout: 10000,
			success: function(result) {

				if(result.cpaMemberRegReviewInfoList != "" && result.cpaMemberRegReviewInfoList != null && result.cpaMemberRegReviewInfoList[0].sbscrbYn == "Y"){
					mypMemberReg.mypCpaMemberReg_aidDuesInfoEnd();               //납부완료
				}
				else{
					searchVal = result.resultList;

					mypMemberReg.mypCpaMemberReg_aidDuesInfo(result);            //미납일 경우
				}
			},
			error: function(xhr, status, error) {

			},
			fail: function() {

			}
		});
	}
	else if(flag == "mypCpaMemberReg_reviewInfo"){                     //검토 및 제출
		var reviewInfo_param = {};
		reviewInfo_param.pin = $('#mypCpaMemberReg_pin').val();
		reviewInfo_param.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
		reviewInfo_param.appCpaNo = $('#mypCpaMember_aidDuesAppCpaNo').val();
		reviewInfo_param.name = $('#mypCpaMember_aidDuesName').val();

		$.ajax({
			dataType:"json",
			url: mypMemberReg.getContextPath()+"/myp/selectmypCpaMemberRegReviewInfo.do",
			data:reviewInfo_param,
			success: function (data) {
				mypMemberReg.selectmypCpaMemberRegReviewInfo_success(data);
			},
			error: function (status, e) {
				alert("데이터 요청에 실패하였습니다.\r status : " + status);
			}
		});
	}
}

//회원 정보 저장(다음 클릭시 해당 탭 내용 저장)
mypMemberReg.mypCpaMemberReg_memberInfoSave = function(formData, url, flag) {

	//mypCpaMemberReg.mypCpaMemberReg_tabMove(flag);
	$.ajax({
		url : url,
		type : "POST",
		data : formData,
		success : function(data) {

			if(data.message != "" && data.message != null){
				alert(data.message);
			}
			else{
				if($('#mypCpaMemberReg_saveMode').val() == "U"){
					location.replace(mypMemberReg.getContextPath()+'/myp/myPageInfo.do?pin='+$('#mypCpaMemberReg_pin').val());
				}
				else{
					if(data.cpaSn != "" && data.cpaSn != null && ($('#mypCpaMemberReg_cpaSn').val() == "" || $('#mypCpaMemberReg_cpaSn').val() == null)){
						$('#mypCpaMemberReg_cpaSn').val(data.cpaSn);
					}
					mypMemberReg.mypMemberReg_tabMove(flag);
				}
			}
		}
	});
}


//수정할 데이터 조회(수정모드)
mypMemberReg.mypCpaMember_updateInfoList = function() {

	var updateInfo_param = {};
	updateInfo_param.pin = $('#mypCpaMemberReg_pin').val();
	updateInfo_param.movePage = $('#mypCpaMemberReg_movePage').val();

	$.ajax({
		url : mypMemberReg.getContextPath()+"/myp/selectMypCpaMemberRegUpdateInfoList.do",
		type : "POST",
		data : updateInfo_param,
		success : function(data) {
			mypMemberReg.mypCpaMember_updateInfoList_success(data);
		}
	});
};

//수정데이터 입력
mypMemberReg.mypCpaMember_updateInfoList_success = function(data){

	//정보공개설정 수정
	if($('#mypCpaMemberReg_movePage').val() == "mypCpaMemberReg_nmstOthbcInfo"){
		$('.mypCpaMemberReg_titleNm').text('정보공개설정');
		$("input:radio[name='ofcAdresYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcAdresYn+"']").attr('checked', true);      //사무소 주소
		$("input:radio[name='ofcNameYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcNameYn+"']").attr('checked', true);      //사무소 명
		$("input:radio[name='emailYn'][value='"+data.cpaMemberNmstOthbcInfo[0].emailYn+"']").attr('checked', true);      //전자메일
		$("input:radio[name='ofcTelYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcTelYn+"']").attr('checked', true);      //사무소 전화
		$("input:radio[name='photoYn'][value='"+data.cpaMemberNmstOthbcInfo[0].photoYn+"']").attr('checked', true);      //사진
		$("input:radio[name='ofcFaxYn'][value='"+data.cpaMemberNmstOthbcInfo[0].ofcFaxYn+"']").attr('checked', true);      //사무소 팩스
	}
}

//반려상태에서 재신청한 경우
mypMemberReg.mypCpaMember_regFlagFList = function(result) {
	var regFlagFList_param = {};
	regFlagFList_param.pin = $('#mypCpaMemberReg_pin').val();
	regFlagFList_param.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
	regFlagFList_param.regFlag = $('#mypCpaMemberReg_regFlag').val();
	regFlagFList_param.appCpaNo = $('#mypCpaMember_aidDuesAppCpaNo').val();
	regFlagFList_param.name = $('#mypCpaMember_aidDuesName').val();

	$.ajax({
		url : mypMemberReg.getContextPath()+"/myp/selectmypCpaMemberRegReviewInfo.do",
		type : "POST",
		data : regFlagFList_param,
		success : function(data) {
			mypMemberReg.mypCpaMember_regFlagFList_success(data);
		}
	});
}

//반려상태 재등록시 기존 데이터 입력
mypMemberReg.mypCpaMember_regFlagFList_success = function(data){

	//약관동의
	if(data.cpaMemberRegReviewInfoList[0].agreeInfo1Yn == "Y"){
		$('#mypCpaMemberReg_agreement1').prop("checked",true);
	}
	if(data.cpaMemberRegReviewInfoList[0].agreeInfo2Yn == "Y"){
		$('#mypCpaMemberReg_agreement2').prop("checked",true);
	}

	//약관동의 체크
	if($("#mypCpaMemberReg_agreement1").is(":checked") && $("#mypCpaMemberReg_agreement2").is(":checked")) // 단일 체크해제시 전체체크 해제
	{
		$("input:checkbox[id='mypCpaMemberReg_allAgree']").prop("checked", true);
		$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", false);
	}else {
		$("input:checkbox[id='mypCpaMemberReg_allAgree']").prop("checked", false);
		$("#mypCpaMemberReg_agreeInfoSaveBtn").prop("disabled", true);
	}

	//부조회원구분 & 사업자등록번호
	var number = data.cpaMemberRegReviewInfoList[0].bizrNo;
	var bizrNo = "";
	if(number.length == 10) {
		bizrNo += number.substr(0, 3);
		bizrNo += "-";
		bizrNo += number.substr(3, 2);
		bizrNo += "-";
		bizrNo += number.substr(5);
	}
	$('#mypCpaMember_aidMberFlag').val(data.cpaMemberRegReviewInfoList[0].aidMberFlag);         //부조회원 구분
	$('#mypCpaMember_bizrNo').val(bizrNo);                                                      //사업자등록번호

	mypMemberReg.mypCpaMemberReg_aidMberFlagChange();

	//회원등록구분
	$('#mypCpaMember_registDe').val(data.cpaMemberRegReviewInfoList[0].registDe);               //공인회계사 등록예정일
	$('#mypCpaMember_mberFlag').val(data.cpaMemberRegReviewInfoList[0].mberFlag);               //회원구분
	$('#mypCpaMember_auditNm').val(data.cpaMemberRegReviewInfoList[0].auditNm);                 //감사예정감사인명
	$('#mypCpaMember_auditId').val(data.cpaMemberRegReviewInfoList[0].auditId);                 //감사예정감사인코드
	$('#mypCpaMember_auditAdres').val(data.cpaMemberRegReviewInfoList[0].adres);                 //감사인주소
	$('#mypCpaMember_auditOfcps').val(data.cpaMemberRegReviewInfoList[0].auditOfcps);           //감사인구성구분
	$('#mypCpaMember_closedClNm').val(data.cpaMemberRegReviewInfoList[0].closedClNm);           //회원(휴업)분류명
	$('#mypCpaMember_closedCl').val(data.cpaMemberRegReviewInfoList[0].closedCl);           	//회원(휴업)분류코드

	mypMemberReg.mypCpaMemberReg_mberFlagChange();

	//정보공개설정
	$("input:radio[name='ofcAdresYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcAdresYn+"']").attr('checked', true);      //사무소 주소
	$("input:radio[name='ofcNameYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcNameYn+"']").attr('checked', true);      //사무소 명
	$("input:radio[name='emailYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].emailYn+"']").attr('checked', true);      //전자메일
	$("input:radio[name='ofcTelYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcTelYn+"']").attr('checked', true);      //사무소 전화
	$("input:radio[name='photoYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].photoYn+"']").attr('checked', true);      //사진
	$("input:radio[name='ofcFaxYn'][value='"+data.cpaMemberRegNmstOthbcInfoList[0].ofcFaxYn+"']").attr('checked', true);      //사무소 팩스

	//첨부파일
	if(data.cpaMemberRegReviewInfoList[0].passCrtiFileId != "" && data.cpaMemberRegReviewInfoList[0].passCrtiFileId != null){          //공인회계사 합격증 사본
		$("label[for='mypCpaMember_passCrtiFileId']").text("");
		$(".regFlagFPassCrtiFileIdDelHide").show();
		$('#mypCpaMember_passCrtiFileId').prop('type',"text");
		$("#mypCpaMember_passCrtiFileId").val(data.cpaMemberRegReviewInfoList[0].passCrtiFileIdNm);
		$("#mypCpaMember_passCrtiFileIdSet").val(data.cpaMemberRegReviewInfoList[0].passCrtiFileId);
	}
	if(data.cpaMemberRegReviewInfoList[0].rsumFileNm != "" && data.cpaMemberRegReviewInfoList[0].rsumFileNm != null){          //이력서
		$("label[for='mypCpaMember_rsumFileId']").text("");
		$(".regFlagFRsumFileIdDelHide").show();
		$('#mypCpaMember_rsumFileId').prop('type',"text");
		$("#mypCpaMember_rsumFileId").val(data.cpaMemberRegReviewInfoList[0].rsumFileNm);
		$("#mypCpaMember_rsumFileIdEventnSet").val(data.cpaMemberRegReviewInfoList[0].eventn);
	}
	if(data.cpaMemberRegReviewInfoList[0].apntcEndFileId != "" && data.cpaMemberRegReviewInfoList[0].apntcEndFileId != null){          //실무수습종료증명서
		$("label[for='mypCpaMember_apntcEndFileId']").text("");
		$(".regFlagFApntcEndFileIdDelHide").show();
		$('#mypCpaMember_apntcEndFileId').prop('type',"text");
		$("#mypCpaMember_apntcEndFileId").val(data.cpaMemberRegReviewInfoList[0].apntcEndFileIdNm);
		$("#mypCpaMember_apntcEndFileIdSet").val(data.cpaMemberRegReviewInfoList[0].apntcEndFileId);
	}
	if(data.cpaMemberRegReviewInfoList[0].atchFileId != "" && data.cpaMemberRegReviewInfoList[0].atchFileId != null){          //기타
		$("label[for='mypCpaMember_atchFileId']").text("");
		$(".regFlagFEmplCrtiDelHide").show();
		$('#mypCpaMember_atchFileId').prop('type',"text");
		$("#mypCpaMember_atchFileId").val(data.cpaMemberRegReviewInfoList[0].atchFileIdNm);
		$("#mypCpaMember_atchFileInfoAtchFileId1Set").val(data.cpaMemberRegReviewInfoList[0].atchFileId);
	}
}

//부조회원 구분 변경
mypMemberReg.mypCpaMemberReg_aidMberFlagChange = function(flag) {

	if($('#mypCpaMember_aidMberFlag').val() != "" && $('#mypCpaMember_aidMberFlag').val() != null){
		$('#mypCpaMember_aidMberFlag').addClass('select');
	}
	else{
		$('#mypCpaMember_aidMberFlag').removeClass('select');
	}

}

//회원구분 변경
mypMemberReg.mypCpaMemberReg_mberFlagChange = function(flag) {

	if($('#mypCpaMember_mberFlag').val() != "" && $('#mypCpaMember_mberFlag').val() != null){
		$('#mypCpaMember_mberFlag').addClass('select');
	}
	else{
		$('#mypCpaMember_mberFlag').removeClass('select');
	}

	if($('#mypCpaMember_mberFlag').val() == "A2020010"){			//전업
		$('.mypCpaMemberReg_auditReg').show();
		$('.mypCpaMemberReg_closedClReg').hide();

		$("#mypCpaMember_auditNm").prop('disabled', false);
		$("#mypCpaMember_auditId").prop('disabled', false);
		$("#mypCpaMember_auditAdres").prop('disabled', false);
		$("#mypCpaMember_auditOfcps").prop('disabled', false);
		$("#mypCpaMember_auditNm").prop('readonly', true);
		$("#mypCpaMember_auditId").prop('readonly', true);
		$("#mypCpaMember_auditAdres").prop('readonly', true);
		$("#mypCpaMember_closedCl").val("");
		$("#mypCpaMember_closedClNm").val("");

		$('#mypCpaMember_auditOfcps').addClass('select');
	}
	else if($('#mypCpaMember_mberFlag').val() == "A2020050"){		//휴업
		$('.mypCpaMemberReg_closedClReg').show();
		$('.mypCpaMemberReg_auditReg').hide();

		$("#mypCpaMember_auditNm").val("");
		$("#mypCpaMember_auditId").val("");
		$("#mypCpaMember_auditAdres").val("");
		$("#mypCpaMember_auditOfcps").val("");
		$("#mypCpaMember_auditNm").prop('disabled', true);
		$("#mypCpaMember_auditId").prop('disabled', true);
		$("#mypCpaMember_auditAdres").prop('disabled', true);
		$("#mypCpaMember_auditOfcps").prop('disabled', true);

		$('#mypCpaMember_auditOfcps').removeClass('select');
	}
	else{
		$('.mypCpaMemberReg_auditReg').hide();
		$('.mypCpaMemberReg_closedClReg').hide();

		$("#mypCpaMember_auditNm").val("");
		$("#mypCpaMember_auditId").val("");
		$("#mypCpaMember_auditAdres").val("");
		$("#mypCpaMember_auditOfcps").val("");
		$("#mypCpaMember_closedCl").val("");
		$("#mypCpaMember_closedClNm").val("");
		$("#mypCpaMember_auditNm").prop('disabled', true);
		$("#mypCpaMember_auditId").prop('disabled', true);
		$("#mypCpaMember_auditAdres").prop('disabled', true);
		$("#mypCpaMember_auditOfcps").prop('disabled', true);

		$('#mypCpaMember_auditOfcps').removeClass('select');
	}

}

//사업자등록번호 입력
mypMemberReg.inputBizrNumber = function(obj) {

	var number = obj.value.replace(/[^0-9]/g, "");
	var bizrNo = "";

	if(number.length < 4) {
		return number;
	} else if(number.length < 5) {
		bizrNo += number.substr(0, 3);
		bizrNo += "-";
		bizrNo += number.substr(3);
	} else {
		bizrNo += number.substr(0, 3);
		bizrNo += "-";
		bizrNo += number.substr(3, 2);
		bizrNo += "-";
		bizrNo += number.substr(5);
	}
	obj.value = bizrNo;
}

//추가 첨부파일 삭제(버튼 클릭시 input type 변경)
mypMemberReg.mypCpaMember_atchFileInfoRemove = function (atchFileId){

	if(atchFileId == "regFlagFPassCrtiFileIdDelHide"){
		$(".regFlagFPassCrtiFileIdDelHide").hide();
		$('#mypCpaMember_passCrtiFileId').prop('type',"file");
		$("#mypCpaMember_passCrtiFileIdSet").val("");
		$("label[for='mypCpaMember_passCrtiFileId']").text("파일을 등록해 주세요");
	}
	else if(atchFileId == "regFlagFRsumFileIdDelHide"){
		$(".regFlagFRsumFileIdDelHide").hide();
		$('#mypCpaMember_rsumFileId').prop('type',"file");
		$("#mypCpaMember_rsumFileIdEventnSet").val("");
		$("label[for='mypCpaMember_rsumFileId']").text("파일을 등록해 주세요");
	}
	else if(atchFileId == "regFlagFApntcEndFileIdDelHide"){
		$(".regFlagFApntcEndFileIdDelHide").hide();
		$('#mypCpaMember_apntcEndFileId').prop('type',"file");
		$("#mypCpaMember_apntcEndFileIdSet").val("");
		$("label[for='mypCpaMember_apntcEndFileId']").text("파일을 등록해 주세요");
	}
	else if(atchFileId == "regFlagFAtchFileIdDelHide"){
		$(".regFlagFAtchFileIdDelHide").hide();
		$('#mypCpaMember_atchFileId').prop('type',"file");
		$("#mypCpaMember_atchFileInfoAtchFileId1Set").val("");
		$("label[for='mypCpaMember_atchFileId']").text("파일을 등록해 주세요");
	}
}

//납부 완료
mypMemberReg.mypCpaMemberReg_aidDuesInfoEnd = function() {

	var aidDuesInfo_param = {};
	aidDuesInfo_param.pin = $('#mypCpaMemberReg_pin').val();
	aidDuesInfo_param.cpaSn = $('#mypCpaMemberReg_cpaSn').val();

	$.ajax({
		dataType:"json",
		url: mypCpaMemberReg.getContextPath()+"/myp/selectmypCpaMemberRegInfo.do",
		data:aidDuesInfo_param,
		success: function (data) {

			if(data.cpaMemberAidDuesInfoListSize>0 && data.cpaMemberAidDuesInfoList != null){
				$('#mypCpaMember_gnrlEntrncAmt').text(mypCpaMemberReg.mypCpaMember_commaCheck(data.cpaMemberAidDuesInfoList[0].gnrlEntrncAmt) + " 원");
				$('#mypCpaMember_yearDuesAmt').text(mypCpaMemberReg.mypCpaMember_commaCheck(data.cpaMemberAidDuesInfoList[0].gnrlYyAmt) + " 원");
				$('#mypCpaMember_cmitEntrncAmt').text(mypCpaMemberReg.mypCpaMember_commaCheck(data.cpaMemberAidDuesInfoList[0].cmitEntrncAmt) + " 원");
				$('#mypCpaMember_asstnEntrncAmt').text(mypCpaMemberReg.mypCpaMember_commaCheck(data.cpaMemberAidDuesInfoList[0].asstnEntrncAmt) + " 원");
				$('#mypCpaMember_asstnYyAmt').text(mypCpaMemberReg.mypCpaMember_commaCheck(data.cpaMemberAidDuesInfoList[0].asstnYyAmt) + " 원");
				$('#mypCpaMember_totAmt').text(mypCpaMemberReg.mypCpaMember_commaCheck(data.cpaMemberAidDuesInfoList[0].totAmt) + " 원");

				$('.mypCpaMember_aidDuesN').hide();
				$('.mypCpaMember_aidDuesY').show();
			}
		},
		error: function (status, e) {
			alert("데이터 요청에 실패하였습니다.\r status : " + status);
		}
	});
}

//등록회비 납부금액 조회
mypMemberReg.mypCpaMemberReg_aidDuesInfo = function(result) {

	sumAmt = 0;

	formDuesData  = [];
	var rt = searchVal;
	var gnrlEntrncAmt = 0;      //일반회계 입회금
	var yearDuesAmt = 0;        //일반회계 연회비
	var cmitEntrncAmt = 0;      //회관회계 입회금
	var asstnEntrncAmt = 0;     //공제회 부조회계 입회금
	var asstnYyAmt = 0;         //공제회 부조회계 연회비

	for(var i = 0; i < rt.length; i++){
		var totalAmt = 0;
		var keys = {};
		keys.pin 		= rt[i].pin;


		keys.cpaId 		=  rt[i].cpaId;
		keys.registFlag = result.cpaMemberRegReviewInfoList[0].mberFlag;
		keys.acntCd     = "11103010";
		keys.acnutNo    = "011250010713";
		keys.calcFlag 	=  rt[i].calcFlag;
		keys.registPreDe = result.cpaMemberRegReviewInfoList[0].registDe.replaceAll("-","");       //등록예정일
		keys.accnutDe    = result.cpaMemberRegReviewInfoList[0].currentDe;      //회계일
		keys.payDe 	     = result.cpaMemberRegReviewInfoList[0].currentDe;      //입금일
		//일반입회금
		keys.gnrlEntrncAmt =  rt[i].gnrlEntrncAmt;
		if(rt[i].gnrlEntrncAmt > 0 ){
			gnrlEntrncAmt = rt[i].gnrlEntrncAmt;
			totalAmt += rt[i].gnrlEntrncAmt;
		}
		//일반연회비
		// 하반기 체크
		var secondHalYn = "N" // 하반기여부
		if(new Date(result.cpaMemberRegReviewInfoList[0].registDe) instanceof Date) {
			if(result.cpaMemberRegReviewInfoList[0].registDe.substr(0,4)+"0401" <= result.cpaMemberRegReviewInfoList[0].registDe.replace(/-/gi,'')
				&& result.cpaMemberRegReviewInfoList[0].registDe.replace(/-/gi,'') < result.cpaMemberRegReviewInfoList[0].registDe.substr(0,4)+"1001")
			{
				secondHalYn = "N";
			}else {
				secondHalYn = "Y";
			}
		}
		var payAmt = 0;
		if( rt[i].calcFlag == "Y") {
			if(keys.registFlag == "A2020010" || keys.registFlag == "A2020030") { // 전업,개업
				keys.registFlag = 1;
				payAmt = 300000;
				if(secondHalYn == "Y") { // 하반기 여부
					payAmt -= 150000;
				}
			}else if(keys.registFlag == "A2020050") { //휴업
				keys.registFlag = 2;
				payAmt = 50000;
			}

			var preGnrlYyAmt = 0;
			if(rt[i].preGnrlYyAmt > 0){ preGnrlYyAmt = rt[i].preGnrlYyAmt;} // 기수납금
			if(preGnrlYyAmt > 0) {
				payAmt -= preGnrlYyAmt;
			}

			if(rt[i].ageDiscountYn == "Y") { // 만60세 이상 할인체크
				payAmt -= 50000;
			}

			if(payAmt < 0) {
				payAmt = 0;
			}
		}
		yearDuesAmt = payAmt;
		keys.gnrlYyAmt =  payAmt;
		if(payAmt > 0 ){
			totalAmt += payAmt;
		}
		//회관회계 입회금
		keys.cmitEntrncAmt =  rt[i].cmitEntrncAmt;
		if(rt[i].cmitEntrncAmt > 0 ){
			cmitEntrncAmt = rt[i].cmitEntrncAmt;
			totalAmt += rt[i].cmitEntrncAmt;
		}
		//공제회 부조회계 입회금
		keys.asstnEntrncAmt =  rt[i].asstnEntrncAmt;
		if(rt[i].asstnEntrncAmt > 0 ){
			asstnEntrncAmt = rt[i].asstnEntrncAmt;
			totalAmt += rt[i].asstnEntrncAmt;
		}
		//공제회 부조회계 연회비
		var payAmt = 0;
		if(rt[i].calcFlag == "Y") {
			payAmt = 150000;

			var preAsstnYyAmt = 0;
			if(rt[i].preAsstnYyAmt > 0) { preAsstnYyAmt =rt[i].preAsstnYyAmt;} // 기수납금
			if(preAsstnYyAmt > 0) {
				payAmt -= preAsstnYyAmt;
			}
		}
		if(payAmt < 0) {
			payAmt = 0;
		}
		asstnYyAmt = payAmt;
		keys.asstnYyAmt =  payAmt;
		if(payAmt > 0 ){
			totalAmt += payAmt;
		}


		formDuesData.push(keys);
		if(totalAmt > 0 ){
			sumAmt += totalAmt;
		}
	}

	$('#mypCpaMember_gnrlEntrncAmt').text(mypMemberReg.mypCpaMember_commaCheck(gnrlEntrncAmt) + " 원");
	$('#mypCpaMember_yearDuesAmt').text(mypMemberReg.mypCpaMember_commaCheck(yearDuesAmt) + " 원");
	$('#mypCpaMember_cmitEntrncAmt').text(mypMemberReg.mypCpaMember_commaCheck(cmitEntrncAmt) + " 원");
	$('#mypCpaMember_asstnEntrncAmt').text(mypMemberReg.mypCpaMember_commaCheck(asstnEntrncAmt) + " 원");
	$('#mypCpaMember_asstnYyAmt').text(mypMemberReg.mypCpaMember_commaCheck(asstnYyAmt) + " 원");
	$('#mypCpaMember_totAmt').text(mypMemberReg.mypCpaMember_commaCheck(sumAmt) + " 원");

	$('#mypCpaMemberReviewInfo_etc1').text(mypMemberReg.mypCpaMember_commaCheck(sumAmt) + " 원");

	$('.mypCpaMember_aidDuesN').show();
	$('.mypCpaMember_aidDuesY').hide();
}

//검토 및 제출 list
mypMemberReg.selectmypCpaMemberRegReviewInfo_success = function (result){

	//회원정보(부조회비, 사업자번호, 회원구분, 첨부파일)
	$('#mypCpaMemberReviewInfo_aidMberFlag').text(result.cpaMemberRegReviewInfoList[0].aidMberFlagNm);
	$('#mypCpaMemberReviewInfo_bizrNo').text(result.cpaMemberRegReviewInfoList[0].bizrNo);
	$('#mypCpaMemberReviewInfo_registDe').text(result.cpaMemberRegReviewInfoList[0].registDe);
	$('#mypCpaMemberReviewInfo_mberFlag').text(result.cpaMemberRegReviewInfoList[0].mberFlagNm);
	$('#mypCpaMemberReviewInfo_audit').text(result.cpaMemberRegReviewInfoList[0].auditNm);
	$('#mypCpaMemberReviewInfo_auditOfcps').text(result.cpaMemberRegReviewInfoList[0].auditOfcpsNm);
	$('#mypCpaMemberReviewInfo_passCrtiFileId').text(result.cpaMemberRegReviewInfoList[0].passCrtiFileIdNm);
	$('#mypCpaMemberReviewInfo_rsumFileId').text(result.cpaMemberRegReviewInfoList[0].rsumFileNm);
	$('#mypCpaMemberReviewInfo_apntcEndFileId').text(result.cpaMemberRegReviewInfoList[0].apntcEndFileIdNm);
	$('#mypCpaMemberReviewInfo_atchFileId').text(result.cpaMemberRegReviewInfoList[0].atchFileIdNm);

	if(result.cpaMemberRegReviewInfoList[0].mberFlag == "A2020050"){      //휴업일 경우 휴업분류 보여주기
		$('#mypCpaMemberReviewInfo_closedClNmHide').show();
		$('#mypCpaMemberReviewInfo_closedClNm').text(result.cpaMemberRegReviewInfoList[0].closedClNm);
	}
	else{
		$('#mypCpaMemberReviewInfo_closedClNmHide').hide();
	}

	//정보공개설정
	$('#mypCpaMemberReviewInfo_ofcAdresYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcAdresYnNm);
	$('#mypCpaMemberReviewInfo_ofcNameYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcNameYnNm);
	$('#mypCpaMemberReviewInfo_emailYn').text(result.cpaMemberRegNmstOthbcInfoList[0].emailYnNm);
	$('#mypCpaMemberReviewInfo_ofcTelYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcTelYnNm);
	$('#mypCpaMemberReviewInfo_photoYn').text(result.cpaMemberRegNmstOthbcInfoList[0].photoYnNm);
	$('#mypCpaMemberReviewInfo_ofcFaxYn').text(result.cpaMemberRegNmstOthbcInfoList[0].ofcFaxYnNm);

	//등록 회비
	if(result.cpaMemberAidDuesInfoList == null || result.cpaMemberAidDuesInfoListSize < 1){
		$('#mypCpaMemberReviewInfo_etc2').text("미납");
		searchVal = result.resultList;

		mypMemberReg.mypCpaMemberReg_aidDuesInfo(result);
	}
	else{
		$('#mypCpaMemberReviewInfo_etc2').text("납부완료");
		$('#mypCpaMemberReviewInfo_etc1').text(mypMemberReg.mypCpaMember_commaCheck(result.cpaMemberAidDuesInfoList[0].totAmt) + " 원");
	}
}

//숫자 ',' 표시
mypMemberReg.mypCpaMember_commaCheck = function (num){
	var len, point, str;
	num = num + "";
	point = num.length % 3 ;
	len = num.length;
	str = num.substring(0, point);
	while (point < len) {
		if (str != "") str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}
	return str;
}

mypMemberReg.cpaAuditPopListError = function(data,status, error){
//	flag = true;
	alert("조회실패");
}