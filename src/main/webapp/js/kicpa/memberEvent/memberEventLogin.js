var memberEventLogin = {};

memberEventLogin.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

memberEventLogin.memberEventLoginInit = function(){

    //로그인 버튼 클릭
    $("#memberEventLogin_loginBtn").on("click",function(){
        //팝업으로 해보기
        location.href="/kicpa/memberEvent/memberEventLoginMove.do";
    });

    //본인인증 버튼 클릭
    $("#memberEventLogin_confirm").on("click",function(){
        memberEventLogin.memberEventLogin_memberCheck();
    });

}

//본인인증 버튼 클릭(본인인증 진행)
memberEventLogin.memberEventLogin_memberCheck = function (){


    var param = {};
    param.movePage = "https://mkip.kicpa.or.kr"+memberEventLogin.getContextPath()+"/kicpa/memberEvent/memberEventConfirmSucc.do";
    param.customize = "";
    fn_ajax_call("/kicpa/common/cpaMemNiceCheck.do",param,memberEventLogin.getMemberEventCheckplusEncDataSuccess,memberEventLogin.memberEventLoginError);

}

memberEventLogin.getMemberEventCheckplusEncDataSuccess = function(data){
    console.log(JSON.stringify(data));
    if(data.returnCode != "" && data.returnCode != null && data.returnCode != "0000"){
        alert(data.resultMessage);
    }
    else{
        window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        form.action = data.authUrl;
        form.target = "popupChk";
        form.submit();
    }
}

//본인인증 후 경조사 목록 이동
memberEventLogin.memberEvent_confirmSuccMove = function (di, sName){

    $('#memberEventLogin_di').val(di);
    $('#memberEventLogin_name').val(sName);

    sessionStorage.setItem("본인인증", "Y");
    sessionStorage.setItem("di", di);
    sessionStorage.setItem("sName", sName);

    location.replace(memberEventLogin.getContextPath()+'/memberEvent/memberEventList.do?di='+di+'&name='+sName);
}

memberEventLogin.memberEventLoginError = function(data,status, error){
    alert("조회실패");
}