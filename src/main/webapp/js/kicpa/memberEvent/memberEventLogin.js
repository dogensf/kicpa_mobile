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
    param.movePage = "https://mkip.kicpa.or.kr"+memberEventLogin.getContextPath()+"/memberEvent/memberEventConfirmSucc.do";
    fn_ajax_call("/kicpa/common/getCheckplusEncData.do",param,memberEventLogin.getMemberEventCheckplusEncDataSuccess,memberEventLogin.memberEventLoginError);

}

memberEventLogin.getMemberEventCheckplusEncDataSuccess = function(data){
    var sMessage = data.sMessage;
    var sEncData = data.sEncData;
    $("#memberEventLogin_nice input[name='EncodeData']").val(sEncData);

    var form = document.getElementById("memberEventLogin_nice");

    window.open('', 'popupChk');
    form.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    form.target = "popupChk";
    form.submit();
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