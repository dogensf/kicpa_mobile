var mypMemberReg = {};

mypMemberReg.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypMemberReg.mypMemberRegInit = function(){



	//수정모드
	if($('#mypCpaMemberReg_saveMode').val() == "U"){
		$('.mypCpaMemberReg_titleYn').hide();
		if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_reviewInfo"){
			$('.mypCpaMember_preReviewBtn').hide();
			$('.mypCpaMember_nextReviewBtn').hide();
			$('.mypCpaMember_mypReviewBtn').show();
			$('.mypCpaMember_mypReviewBtn a').text("확인");
		}
		else{
			if($('#mypCpaMemberReg_movePage').val() == "mypCpaMember_aidDuesInfo"){
				$('.mypCpaMember_aidDuesBtn').hide();
			}
			else{
				$('.mypCpaMember_aidDuesBtn').show();
			}
			$('.mypCpaMember_preBtn').hide();
			$('.mypCpaMember_backBtn').show();
			$('.mypCpaMember_nextBtn').text("수정/저장");

			//저장된(수정할) 데이터 조회
			mypMemberReg.mypCpaMember_updateInfoList();
		}

		mypMemberReg.mypMemberReg_tabMove($('#mypCpaMemberReg_movePage').val());
	}
	//처음 등록 모드
	else{
		mypMemberReg.mypMemberReg_tabMove('mypCpaMember_agree');
		$('.mypCpaMemberReg_titleYn').show();
		$('#mypCpaMemberPop_atchFileInfoPop').show();
		$('.mypCpaMember_mypBtn').hide();
		$('.mypCpaMember_preBtn').show();
		$('.mypCpaMember_nextBtn a').text("다음");
		$('.mypCpaMember_mypReviewBtn').hide();
		$('.mypCpaMember_preReviewBtn').show();
		$('.mypCpaMember_nextReviewBtn').show();
		$('.mypCpaMember_nextReviewBtn a').text("제출");
	}


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

	//저장팝업 아니오버튼 클릭
	$("#mypCpaMemberReg_savePopCanclBtn").on("click",function(e) {
		$('#mypCpaMemberReg_body').removeClass('stop');
		$('#mypCpaMemberReg_savePop').removeClass('show');
	});

	//저장팝업 예버튼 클릭
	$("#mypCpaMemberReg_savePopBtn").on("click",function(e) {

		mypMemberReg.mypCpaMemberReg_infoSave();

	});
}

//저장팝업 예버튼 클릭
mypMemberReg.mypCpaMemberReg_infoSave = function(){

	var saveData = $('#mypCpaMemberReg_saveData').val();

	if(saveData == "mypCpaMemberReg_nmstOthbcInfo"){
		var formData = $('#mypCpaMemberReg_nmstOthbcInfoForm').serializeObject();
		formData.pin = $('#mypCpaMemberReg_pin').val();
		formData.cpaSn = $('#mypCpaMemberReg_cpaSn').val();
		formData.saveMode = $('#mypCpaMemberReg_saveMode').val();
		var url = mypMemberReg.getContextPath()+"/myp/mypCpaMemberRegNmstOthbcInfoSave.do";

		mypMemberReg.mypCpaMemberReg_memberInfoSave(formData, url, "mypCpaMember_proFieldInfo");
	}

}

//화면상단 닫기버튼
mypMemberReg.mypMemberReg_backMove = function() {

	location.href="/kicpa/myp/myPageInfo.do?pin="+$('#mypCpaMemberReg_pin').val();

}

//탭 이동
mypMemberReg.mypMemberReg_tabMove = function(flag) {

	//입력화면 show/hide
	$('.myPageMemInfoTabMove').hide();
	$('#'+flag).show();

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