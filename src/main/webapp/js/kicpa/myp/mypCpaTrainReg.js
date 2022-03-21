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
			$('.mypCpaTrain_backBtn').show();
			$('.mypCpaTrain_nextBtn').hide();
			$('.mypCpaTrain_backBtn a').text("확인");
		}
		else{
			$('.mypCpaTrain_backBtn').show();
			$('.mypCpaTrain_nextBtn').show();
			$('.mypCpaTrain_nextBtn').text("수정/저장");
		}
	}
	//처음 등록 모드
	else{
		mypCpaTrainReg.mypCpaTrainReg_tabMove('mypCpaTrainReg_agree');
		$('.mypCpaTrainReg_titleYn').show();
		$('#mypCpaTrainRegPop_atchFileInfoPop').show();
		$('.mypCpaTrain_backBtn').hide();
		$('.mypCpaTrain_preBtn').show();
		$('.mypCpaTrain_nextBtn').show();
	}


	//사진 저장(다음버튼)
	$("#mypCpaTrainReg_pictInfoSaveBtn").on("click",function(e) {

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

	});


	//사진선택
	$('#mypCpaTrainReg_file_selection').on("change", function (e){
		mypCpaTrainReg.fn_cpaTrainRegistImgSelection(e);
	});
	
}

//화면상단 닫기버튼
mypCpaTrainReg.mypCpaTrainReg_backMove = function() {

	location.href="/kicpa/myp/myPageInfo.do?pin="+$('#mypCpaTrainReg_pin').val();

}

//탭 이동
mypCpaTrainReg.mypCpaTrainReg_tabMove = function(flag) {

	//입력화면 show/hide
	$('.myPageInfoTabMove').hide();
	$('#'+flag).show();

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