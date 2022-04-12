var myPageInfo = {};

myPageInfo.getContextPath = function() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

myPageInfo.myPageInfoInit = function(){


	//사진 수정
	$("#myPage_cpaPictInfo").on("click",function(e) {
		if($('#myPageInfo_cpaTrainInfoListCnt').val() > 0 && $('#myPageInfo_cpaTrainInfoListCnt').val() != "" && $('#myPageInfo_cpaTrainInfoListCnt').val() != null
		|| ($('#myPageInfo_cpaMemberInfoListCnt').val() > 0 && $('#myPageInfo_cpaMemberInfoListCnt').val() != "" && $('#myPageInfo_cpaMemberInfoListCnt').val() != null)){
			myPageInfo.myPage_memberInfoUpdateBtn('mypCpaTrainReg_pictInfo','T', $('#myPageInfo_pin').val());
		}
		else{
			alert("수습회계사 기본실무 승인 완료시 사용가능합니다.");
		}
	});

	//정보공개설정 수정
	$("#myPage_cpaNmstOthbcInfo").on("click",function(e) {
		if($('#myPageInfo_cpaMemberInfoListCnt').val() > 0 && $('#myPageInfo_cpaMemberInfoListCnt').val() != "" && $('#myPageInfo_cpaMemberInfoListCnt').val() != null){
			myPageInfo.myPage_memberInfoUpdateBtn('mypCpaMemberReg_nmstOthbcInfo','C', $('#myPageInfo_pin').val());
		}
		else{
			alert("공인회계사 승인 완료시 사용가능합니다.");
		}
	});

	$("input:checkbox[id='myPage_cpaConfirmPass']").prop("checked", true);
}

//화면상단 닫기버튼
myPageInfo.myPageInfo_backMove = function() {

	location.href="/kicpa/myp/myPage.do";

}

//개인, 회원정보 수정 버튼 클릭(본인인증 진행)
myPageInfo.myPage_memberInfoUpdateBtn = function (movePage, moveFlag, pin){      //moveFlag - 'M':기본정보, 'T':수습정보, 'C':회원정보

	
		var canclCl = $('#myPage_myPageCanclCl').val();

		if(moveFlag == "C" && canclCl != null && canclCl != ""){       //등록취소 상태일경우 수정 불가
			alert("수정할 수 없습니다.");
			return ;
		}

		pin = $('#myPageInfo_pin').val();


		if($("#myPage_cpaConfirmPass").is(":checked") || sessionStorage.getItem("인증여부") == "Y"  ){        //본인인증 패스
			if(moveFlag =="M"){
				location.replace(myPageInfo.getContextPath()+'/myp/mypCpaPassReg.do?movePage='+movePage+'&pin='+pin);
			}
			else if(moveFlag =="C"){
				location.replace(myPageInfo.getContextPath()+'/myp/mypCpaMemberReg.do?movePage='+movePage+'&pin='+pin);
			}
			else if(moveFlag =="T"){
				location.replace(myPageInfo.getContextPath()+'/myp/mypCpaTrainReg.do?movePage='+movePage+'&pin='+pin);
			}
		}
		else{
			myPageInfo.getMyPageCheckplusEncData(movePage, moveFlag, pin);
		}
	
	
}

//본인인증
myPageInfo.getMyPageCheckplusEncData = function(movePage, moveFlag, pin){

	var param = {};
	param.movePage = "https://mkip.kicpa.or.kr"+myPageInfo.getContextPath()+"/myp/mypCpaConfirmSucc.do?movePage="+movePage+"&moveFlag="+moveFlag+"&pin="+pin;
	fn_ajax_call("/kicpa/common/getCheckplusEncData.do",param,myPageInfo.getMyPageCheckplusEncDataSuccess,myPageInfo.myPageInfoError);
}

myPageInfo.getMyPageCheckplusEncDataSuccess = function(data){
	var sMessage = data.sMessage;
	var sEncData = data.sEncData;


	$("#myPageInfo_nice input[name='EncodeData']").val(sEncData);

	var form = document.getElementById("myPageInfo_nice");

	window.open('', 'popupChk');
	form.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
	form.target = "popupChk";
	form.submit();
}

//본인인증 후 정보 수정 화면으로 이동
myPageInfo.myPage_memberConfirmSuccMove = function (di, movePage, moveFlag, pin){      //moveFlag - 'M':기본정보, 'T':수습정보, 'C': 회계사정보

	pin = $('#myPageInfo_pin').val();

	if(di != $('#myPageInfo_myPageInfoDi').val()){
		alert("회원정보가 일치하지 않습니다.");
	}
	else{
		sessionStorage.setItem("인증여부", "Y");
		if(moveFlag =="M"){
			location.replace(myPageInfo.getContextPath()+'/myp/mypCpaPassReg.do?movePage='+movePage+'&pin='+pin);
		}
		else if(moveFlag =="C"){
			location.replace(myPageInfo.getContextPath()+'/myp/mypCpaMemberReg.do?movePage='+movePage+'&pin='+pin);
		}
		else if(moveFlag =="T"){
			location.replace(myPageInfo.getContextPath()+'/myp/mypCpaTrainReg.do?movePage='+movePage+'&pin='+pin);
		}
	}
}

myPageInfo.myPageInfoError = function(data,status, error){
//	flag = true;
	alert("조회실패");
}