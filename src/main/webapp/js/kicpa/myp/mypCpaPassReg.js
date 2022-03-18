var mypPassReg = {};

var acdmcrInfoAddCount =1;

mypPassReg.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

mypPassReg.mypPassRegInit = function(){



	//수정모드
	if($('#mypCpaPassReg_saveMode').val() == "U"){
		mypPassReg.mypPassReg_tabMove($('#mypCpaPassReg_movePage').val());
		$('.mypCpaPassReg_preBtn').hide();
		$('.mypCpaPassReg_titleYn').hide();

		if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_reviewInfo"){
			$('.mypCpaPassReg_backBtn').hide();
			$('.mypCpaPassReg_submitBtn a').text("확인");
		}
		else{
			$('.mypCpaPassReg_backBtn').show();
			$('.mypCpaPassReg_nextBtn').text("수정/저장");

			//저장된(수정할) 데이터 조회
			mypPassReg.mypCpaPassReg_updateInfoList();
		}
	}
	//처음 등록 모드
	else{
		/*mypPassReg.mypPassReg_tabMove('mypCpaPassReg_agree');
		$('.mypCpaPassReg_titleNm').text('등록');
		$('.mypCpaPassReg_backBtn').hide();
		$('.mypCpaPassReg_preBtn').show();
		$('.mypCpaPassReg_titleYn').show();
		$('.mypCpaPassReg_nextBtn a').text("다음");*/
	}



	//합격자기본정보 저장(다음버튼)
	$("#mypCpaPassReg_nameInfoSaveBtn").on("click",function(e) {
		$('#mypCpaPassReg_saveData').val("mypCpaPassReg_nameInfo");

		if($('#mypCpaPassReg_saveMode').val() == "U"){
			$('#mypCpaPassReg_body').addClass('stop');
			$('#mypCpaPassReg_savePop').addClass('show');
		}
		else{
			mypPassReg.mypCpaPassReg_infoSave();
		}
	});

	//자택&직장주소 저장(다음버튼)
	$("#mypCpaPassReg_adressInfoSaveBtn").on("click",function(e) {
		$('#mypCpaPassReg_saveData').val("mypCpaPassReg_adresInfo");

		if($('#mypCpaPassReg_saveMode').val() == "U"){
			$('#mypCpaPassReg_body').addClass('stop');
			$('#mypCpaPassReg_savePop').addClass('show');
		}
		else{
			mypPassReg.mypCpaPassReg_infoSave();
		}
	});

	//연락처 저장(다음버튼)
	$("#mypCpaPassReg_contactInfoSaveBtn").on("click",function(e) {
		$('#mypCpaPassReg_saveData').val("mypCpaPassReg_contactInfo");

		if($('#mypCpaPassReg_saveMode').val() == "U"){
			$('#mypCpaPassReg_body').addClass('stop');
			$('#mypCpaPassReg_savePop').addClass('show');
		}
		else{
			mypPassReg.mypCpaPassReg_infoSave();
		}

	});

	//학력사항 저장(다음버튼)
	$("#mypCpaPassReg_acdmcrInfoSaveBtn").on("click",function(e) {
		$('#mypCpaPassReg_saveData').val("mypCpaPassReg_acdmcrInfo");

		if($('#mypCpaPassReg_saveMode').val() == "U"){
			$('#mypCpaPassReg_body').addClass('stop');
			$('#mypCpaPassReg_savePop').addClass('show');
		}
		else{
			mypPassReg.mypCpaPassReg_infoSave();
		}

	});

	//합격자 정보 저장
	mypPassReg.mypCpaPassReg_passInfoSave = function(formData, url, flag) {

		$.ajax({
			url : url,
			type : "POST",
			data : formData,
			success : function(data) {

				if(data.message != "" && data.message != null){
					alert(data.message);
				}
				else{
					if($('#mypCpaPassReg_saveMode').val() == "U"){
						location.replace(mypPassReg.getContextPath()+'/myp/myPageInfo.do?pin='+$('#mypCpaPassReg_pin').val());
					}
					else{
						mypPassReg.mypPassReg_tabMove(flag);
					}
				}
			}
		});

	}

	//직장정보 등록 체크 클릭
	$("#mypCpaPassReg_ofcRegYn").on("click",function(e) {

		if($("input:checkbox[name=ofcRegYn]").is(":checked")){
			$('#mypCpaPassReg_ofcInfoReg').slideDown(1000);
			$('.mypCpaPassReg_postOfficeHidden').show();
			$('input:radio[name="postSndngYn"][value="O"]').prop('checked', true);
		}else{
			$('#mypCpaPassReg_ofcInfoReg').slideUp(1000);
			$('.mypCpaPassReg_postOfficeHidden').hide();
			$('input:radio[name="postSndngYn"][value="H"]').prop('checked', true);
		}

	});

	//학력추가 버튼클릭
	$("#mypCpaPassReg_acdmcrInfoAddBtn").on("click",function(e) {

		var result="";

		result+= "<div class='add-box' id='acdmcrInfoAddDiv"+acdmcrInfoAddCount+"'>"
			+"<div class='title add-num'>"
			+"<span style='font-size: 1.7rem; font-weight: 600;'>학력추가</span>"
			+"<button class='btn-delete' type='button' onclick='mypPassReg.mypCpaPassReg_acdmcrInfoRemove("+acdmcrInfoAddCount+")'></button>"
			+"</div>"

			+"<div class='form'>"
			+"<div class='inp-box'>"
			+"<label class='label essen' for='mypCpaPassReg_acdmcrInfoAddSchulCl"+acdmcrInfoAddCount+"'>학력</label>"
			+"<select class='select' name='schulCl' id='mypCpaPassReg_acdmcrInfoAddSchulCl"+acdmcrInfoAddCount+"'>"
			+"<option selected value=''>선택하세요</option>"
			+"<option value='A2230010'>고등학교</option>"
			+"<option value='A2230030'>대학교</option>"
			+"<option value='A2230040'>대학원</option>"
			+"</select>"
			+"</div>"

			+"<div class='inp-box'>"
			+"<label class='label essen' for='mypCpaPassReg_acdmcrInfoAddDegree"+acdmcrInfoAddCount+"'>학위</label>"
			+"<select class='select' name='degree' id='mypCpaPassReg_acdmcrInfoAddDegree"+acdmcrInfoAddCount+"'>"
			+"<option selected value=''>선택하세요</option>"
			+"<option value='A9030010'>졸업</option>"
			+"<option value='A9030020'>학사</option>"
			+"<option value='A9030030'>석사</option>"
			+"<option value='A9030040'>박사</option>"
			+"<option value='A9030050'>수료</option>"
			+"</select>"
			+"</div>"

			+"<div class='inp-box'>"
			+"<label class='label essen' for='mypCpaPassReg_acdmcrInfoAddSchulNm"+acdmcrInfoAddCount+"'>학교명</label>"
			+"<input type='text' id='mypCpaPassReg_acdmcrInfoAddSchulNm"+acdmcrInfoAddCount+"' name='schulNm' placeholder='전체명으로 입력하세요. 예) 서울고등학교'/>"
			+"</div>"

			+"<div class='inp-box'>"
			+"<label class='label essen' for='mypCpaPassReg_acdmcrInfoAddGrdtnYear"+acdmcrInfoAddCount+"'>졸업년도</label>"
			+"<input type='text' id='mypCpaPassReg_acdmcrInfoAddGrdtnYear"+acdmcrInfoAddCount+"' name='grdtnYear' maxlength='4' placeholder='졸업년도를 선택하세요.' required />"
			+"</div>"

			+"<div class='inp-box'>"
			+"<label class='label essen' for='mypCpaPassReg_acdmcrInfoAddMajor"+acdmcrInfoAddCount+"'>전공</label>"
			+"<input type='text' id='mypCpaPassReg_acdmcrInfoAddMajor"+acdmcrInfoAddCount+"' name='major' placeholder='전공을 입력하세요. 예) 경영학부 회계전공'/>"
			+"</div>"

			+"<input type='hidden' name='acdmcrSn' id='mypCpaPassReg_acdmcrInfoAddAcdmcrSn"+acdmcrInfoAddCount+"'/>"

			+"</div>"
			+"</div>"

		acdmcrInfoAddCount++;

		$('#mypCpaPassReg_acdmcrInfoAdd').append(result);

	});

	//저장팝업 아니오버튼 클릭
	$("#mypCpaPassReg_savePopCanclBtn").on("click",function(e) {
		$('#mypCpaPassReg_body').removeClass('stop');
		$('#mypCpaPassReg_savePop').removeClass('show');
	});

	//저장팝업 예버튼 클릭
	$("#mypCpaPassReg_savePopBtn").on("click",function(e) {

		mypPassReg.mypCpaPassReg_infoSave();

	});
}

//저장팝업 예버튼 클릭
mypPassReg.mypCpaPassReg_infoSave = function(){

	var saveData = $('#mypCpaPassReg_saveData').val();

	if(saveData == "mypCpaPassReg_nameInfo"){
		var formData = $("#mypCpaPassReg_passInfoForm").serializeObject();
		formData.pin = $('#mypCpaPassReg_pin').val();
		formData.saveMode = $('#mypCpaPassReg_saveMode').val();
		var url = mypPassReg.getContextPath()+"/myp/mypCpaPassRegPassInfoSave.do";

		mypPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_adresInfo");
	}
	else if(saveData == "mypCpaPassReg_adresInfo"){
		var formData = $('#mypCpaPassReg_adressInfoForm').serializeObject();
		formData.pin = $('#mypCpaPassReg_pin').val();
		formData.saveMode = $('#mypCpaPassReg_saveMode').val();
		var url = mypPassReg.getContextPath()+"/myp/mypCpaPassRegAdressInfoSave.do";

		mypPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_contactInfo");
	}
	else if(saveData == "mypCpaPassReg_contactInfo"){
		var formData = $('#mypCpaPassReg_contactInfoForm').serializeObject();
		formData.pin = $('#mypCpaPassReg_pin').val();
		formData.saveMode = $('#mypCpaPassReg_saveMode').val();
		var url = mypPassReg.getContextPath()+"/myp/mypCpaPassRegContactInfoSave.do";

		mypPassReg.mypCpaPassReg_passInfoSave(formData, url, "mypCpaPassReg_acdmcrInfo");
	}
	else if(saveData == "mypCpaPassReg_acdmcrInfo"){
		var data = {};
		var acdmcrInfoSize = $("select[name='schulCl']").length;
		var acdmcrInfoList  = [];

		for(var i=0; i<acdmcrInfoSize; i++) {

			var item = {};
			item.schulCl = $("select[name='schulCl']").eq(i).val();
			item.degree = $("select[name='degree']").eq(i).val();
			item.schulNm = $("input[name='schulNm']").eq(i).val();
			item.grdtnYear = $("input[name='grdtnYear']").eq(i).val();
			item.major = $("input[name='major']").eq(i).val();
			item.acdmcrSn = $("input[name='acdmcrSn']").eq(i).val();
			acdmcrInfoList.push(item);

		}
		data.pin = $('#mypCpaPassReg_pin').val();
		data.saveMode = $('#mypCpaPassReg_saveMode').val();
		data.list = JSON.stringify(acdmcrInfoList);

		//수정모드일 경우 삭제할 학력정보 담기
		if($('#mypCpaPassReg_saveMode').val() == "U"){

			var acdmcrDelSize = $("input[name='acdmcrSnDel']").length;
			var acdmcrDelList  = [];

			for(var i=0; i<acdmcrDelSize; i++) {

				var item = {};
				item.acdmcrSnDel = $("input[name='acdmcrSnDel']").eq(i).val();
				acdmcrDelList.push(item);

			}

			data.listDel = JSON.stringify(acdmcrDelList);
		}

		var url = mypPassReg.getContextPath()+"/myp/mypCpaPassRegAcdmcrInfoSave.do";
		mypPassReg.mypCpaPassReg_passInfoSave(data, url, "mypCpaPassReg_reviewInfo");
	}

}

//학력삭제(추가된 내용)
mypPassReg.mypCpaPassReg_acdmcrInfoRemove = function(rowNum){

	//수정모드일 경우 저장되어있는 학력 정보 hidden에 담기
	if($('#mypCpaPassReg_saveMode').val() == "U"){
		var acdmcrSn = $('#mypCpaPassReg_acdmcrInfoAddAcdmcrSn'+rowNum).val();
		var result="";

		if(acdmcrSn != "" && acdmcrSn != null){
			result = "<input type='hidden' name='acdmcrSnDel' value='"+acdmcrSn+"'/>";

			$('#mypCpaPassReg_acdmcrInfoDel').append(result);
		}
	}

	var divId= "acdmcrInfoAddDiv"+rowNum;

	$("#"+divId).remove();

}

//화면상단 닫기버튼
mypPassReg.mypPassReg_backMove = function() {

	location.href="/kicpa/myp/myPageInfo.do?pin="+$('#mypCpaPassReg_pin').val();

}

//탭 이동
mypPassReg.mypPassReg_tabMove = function(flag) {

	//입력화면 show/hide
	$('.myPageInfoTabMove').hide();
	$('#'+flag).show();

}

//수정할 데이터 조회(수정모드)
mypPassReg.mypCpaPassReg_updateInfoList = function() {

	var updateInfo_param = {};
	updateInfo_param.pin = $('#mypCpaPassReg_pin').val();
	updateInfo_param.movePage = $('#mypCpaPassReg_movePage').val();

	$.ajax({
		url : mypPassReg.getContextPath()+"/myp/selectMypCpaPassRegUpdateInfoList.do",
		type : "POST",
		data : updateInfo_param,
		success : function(data) {
			mypPassReg.mypCpaPassReg_updateInfoList_success(data);
		}
	});
};

//수정데이터 입력
mypPassReg.mypCpaPassReg_updateInfoList_success = function(data){

	//이름 수정
	if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_nameInfo"){
		$('.mypCpaPassReg_titleNm').text('합격자 기본정보');
		$('#mypCpaPassReg_chcrtNm').val(data.cpaPassRegRealInfo[0].chcrtNm);                                //한자이름
		$('#mypCpaPassReg_engNm').val(data.cpaPassRegRealInfo[0].engNm);                                //영문이름
	}
	//자택,직장주소 수정
	else if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_adresInfo"){
		$('.mypCpaPassReg_titleNm').text('자택&직장주소');
		$('#mypCpaPassReg_houseInfoZipCd').val(data.cpaPassRegHusAeresRealInfo[0].zipCd);                                 //자택우편번호
		$('#mypCpaPassReg_houseInfoAdres').val(data.cpaPassRegHusAeresRealInfo[0].rdAdres);                                 //자택주소
		$('#mypCpaPassReg_houseInfoAdresDt').val(data.cpaPassRegHusAeresRealInfo[0].rdAdresDetail);                         //자택상세주소
		$('#mypCpaPassReg_houseInfoLegalCd').val(data.cpaPassRegHusAeresRealInfo[0].legalCd);                               //자택법정동코드

		if(data.cpaPassRegOfcAeresRealInfoSize >0 || data.cpaPassRegOfcRealInfoSize >0){
			$("input:checkbox[name='ofcRegYn']").attr('checked', true);      //직장정보 등록 체크
			$('.mypCpaPassReg_postOfficeHidden').show();
			$('#mypCpaPassReg_ofcInfoReg').show();

			$('#mypCpaPassReg_officeInfoZipCd').val(data.cpaPassRegOfcAeresRealInfo[0].zipCd);                                //직장우편번호
			$('#mypCpaPassReg_officeInfoAdres').val(data.cpaPassRegOfcAeresRealInfo[0].rdAdres);                                //직장주소
			$('#mypCpaPassReg_officeInfoAdresDt').val(data.cpaPassRegOfcAeresRealInfo[0].rdAdresDetail);                        //직장상세주소
			$('#mypCpaPassReg_officeInfoLegalCd').val(data.cpaPassRegOfcAeresRealInfo[0].legalCd);                              //직장법정동코드

			if(data.cpaPassRegOfcRealInfo[0].ofcTelNo != "" && data.cpaPassRegOfcRealInfo[0].ofcTelNo != null){
				var ofcTelNo = data.cpaPassRegOfcRealInfo[0].ofcTelNo.split("-");
				$('#mypCpaPassReg_officeInfoTelNo1').val(ofcTelNo[0]);                               //직장전화번호
				$('#mypCpaPassReg_officeInfoTelNo2').val(ofcTelNo[1]);
				$('#mypCpaPassReg_officeInfoTelNo3').val(ofcTelNo[2]);
			}
			if(data.cpaPassRegOfcRealInfo[0].ofcFaxNo != "" && data.cpaPassRegOfcRealInfo[0].ofcFaxNo != null){
				var ofcFaxNo = data.cpaPassRegOfcRealInfo[0].ofcFaxNo.split("-");
				$('#mypCpaPassReg_officeInfoFax1').val(ofcFaxNo[0]);                                 //팩스번호
				$('#mypCpaPassReg_officeInfoFax2').val(ofcFaxNo[1]);
				$('#mypCpaPassReg_officeInfoFax3').val(ofcFaxNo[2]);
			}

			$('#mypCpaPassReg_officeInfoOficeNm').val(data.cpaPassRegOfcRealInfo[0].oficeNm);                              //직장명
			$('#mypCpaPassReg_officeInfoRspOfc').val(data.cpaPassRegOfcRealInfo[0].rspOfc);                               //직책
			$('#mypCpaPassReg_officeInfoSectionNm').val(data.cpaPassRegOfcRealInfo[0].sectionNm);                            //부서(국/실)
			$('#mypCpaPassReg_officeInfoDeptNm').val(data.cpaPassRegOfcRealInfo[0].deptNm);                               //하위부서


			//$('#mypCpaPassReg_officeInfoYn').val("Y");                                                     //기존 직장정보 삭제 시 삭제 정보 저장
		}else{
			$("input:checkbox[name='ofcRegYn']").attr('checked', false);      //직장정보 등록 체크
			$('.mypCpaPassReg_postOfficeHidden').hide();
			$('#mypCpaPassReg_ofcInfoReg').hide();
		}


		if(data.cpaPassRegRealInfo[0].postSndngYn == "H"){
			$("input:radio[name='postSndngYn'][value='H']").attr('checked', true);      //우편물 수령여부-자택
		}
		else{
			$("input:radio[name='postSndngYn'][value='O']").attr('checked', true);      //우편물 수령여부-직장
		}
	}
	//연락처 수정
	else if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_contactInfo"){
		$('.mypCpaPassReg_titleNm').text('연락처');
		if(data.cpaPassRegRealInfo[0].moblPhonNo != "" && data.cpaPassRegRealInfo[0].moblPhonNo != null){
			var moblPhonNo = data.cpaPassRegRealInfo[0].moblPhonNo.split("-");
			$('#mypCpaPassReg_contactInfoPhonNo1').val(moblPhonNo[0]);                             //휴대전화
			$('#mypCpaPassReg_contactInfoPhonNo2').val(moblPhonNo[1]);
			$('#mypCpaPassReg_contactInfoPhonNo3').val(moblPhonNo[2]);
		}
		if(data.cpaPassRegRealInfo[0].houseTelNo != "" && data.cpaPassRegRealInfo[0].houseTelNo != null){
			var houseTelNo = data.cpaPassRegRealInfo[0].houseTelNo.split("-");
			$('#mypCpaPassReg_contactInfoHouseTel1').val(houseTelNo[0]);                           //자택전화
			$('#mypCpaPassReg_contactInfoHouseTel2').val(houseTelNo[1]);
			$('#mypCpaPassReg_contactInfoHouseTel3').val(houseTelNo[2]);
		}

		$('#mypCpaPassReg_contactInfoMainEmail').val(data.cpaPassRegRealInfo[0].mainEmail);                           //개인 Email
		$('#mypCpaPassReg_contactInfoSubEmail').val(data.cpaPassRegRealInfo[0].subEmail);                            //회사 Email

		if(data.cpaPassRegRealInfo[0].emailSndngYn=="Y"){
			$("input:radio[name='emailSndngYn'][value='Y']").attr('checked', true);     //메일 수신여부
		}
		else{
			$("input:radio[name='emailSndngYn'][value='N']").attr('checked', true);
		}
		if(data.cpaPassRegRealInfo[0].smsSndngYn=="Y"){
			$("input:radio[name='smsSndngYn'][value='Y']").attr('checked', true);       //문자 수신여부
		}
		else{
			$("input:radio[name='smsSndngYn'][value='N']").attr('checked', true);
		}


	}
	//학력 수정
	else if($('#mypCpaPassReg_movePage').val() == "mypCpaPassReg_acdmcrInfo"){
		$('.mypCpaPassReg_titleNm').text('학력사항');
		//고등학교
		$('#mypCpaPassReg_acdmcrInfoSchulNm').val(data.cpaPassRegAcdmcrRealInfo[0].schulNm);                                    //학교명
		$('#mypCpaPassReg_acdmcrInfoGrdtnYear').val(data.cpaPassRegAcdmcrRealInfo[0].grdtnYear);                                //졸업년도
		$('#mypCpaPassReg_acdmcrInfoAcdmcrSn').val(data.cpaPassRegAcdmcrRealInfo[0].acdmcrSn);                                  //순번

		if(data.cpaPassRegAcdmcrRealInfoSize>1){
			//대학교
			$('#mypCpaPassReg_acdmcrInfoDegree2').val(data.cpaPassRegAcdmcrRealInfo[1].degree);                                 //학위
			$('#mypCpaPassReg_acdmcrInfoSchulNm2').val(data.cpaPassRegAcdmcrRealInfo[1].schulNm);                               //학교명
			$('#mypCpaPassReg_acdmcrInfoGrdtnYear2').val(data.cpaPassRegAcdmcrRealInfo[1].grdtnYear);                           //졸업년도
			$('#mypCpaPassReg_acdmcrInfoMajor2').val(data.cpaPassRegAcdmcrRealInfo[1].major);                                   //전공
			$('#mypCpaPassReg_acdmcrInfoAcdmcrSn2').val(data.cpaPassRegAcdmcrRealInfo[1].acdmcrSn);                             //순번

			for(var i=2; i<data.cpaPassRegAcdmcrRealInfoSize; i++){
				$('#mypCpaPassReg_acdmcrInfoAddBtn').trigger('click');

				var acdmcrInfoCnt = acdmcrInfoAddCount-1;
				$('#mypCpaPassReg_acdmcrInfoAddSchulCl'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].schulCl);           //학력
				$('#mypCpaPassReg_acdmcrInfoAddDegree'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].degree);             //학위
				$('#mypCpaPassReg_acdmcrInfoAddSchulNm'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].schulNm);           //학교명
				$('#mypCpaPassReg_acdmcrInfoAddGrdtnYear'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].grdtnYear);       //졸업년도
				$('#mypCpaPassReg_acdmcrInfoAddMajor'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].major);               //전공
				$('#mypCpaPassReg_acdmcrInfoAddAcdmcrSn'+acdmcrInfoCnt).val(data.cpaPassRegAcdmcrRealInfo[i].acdmcrSn);         //순번
			}
		}

	}
}

//우편번호, 주소 클릭
mypPassReg.mypAdresGoPopup = function(flag){

	var pop = window.open(mypPassReg.getContextPath()+"/myp/mypAdresPop.do?flag="+flag,"pop","scrollbars=yes, resizable=yes");

};

//주소콜백
function mypAdresCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd,
						  rnMgtSn, bdMgtSn , detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm,
						  buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo, flag){

	if(flag == 'H'){
		$('#mypCpaPassReg_houseInfoZipCd').val(zipNo);						//우편번호
		$('#mypCpaPassReg_houseInfoAdres').val(roadAddrPart1);			    //도로명주소
		$('#mypCpaPassReg_houseInfoAdresDt').val(addrDetail);		        //도로명상세
		$('#mypCpaPassReg_houseInfoLegalCd').val(admCd);		            //법정동코드
	}
	else{
		$('#mypCpaPassReg_officeInfoZipCd').val(zipNo);						//우편번호
		$('#mypCpaPassReg_officeInfoAdres').val(roadAddrPart1);			    //도로명주소
		$('#mypCpaPassReg_officeInfoAdresDt').val(addrDetail);		        //도로명상세
		$('#mypCpaPassReg_officeInfoLegalCd').val(admCd);		            //법정동코드
	}

}