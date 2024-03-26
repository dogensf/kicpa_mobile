var memberEventList = {};

memberEventList.getContextPath = function() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
}

memberEventList.memberEventListInit = function(){
    $(".search-box .search").on("click",function(){
        fn_portal_pop("searchPop");
    });


    $("#searchPop .btn-send").on("click",function(){
        $("#searchPop .btn-close").click();
        $("#pageIndex").val(1);
        $(".board-list ul").html("");
        $("#boardForm input[name='searchKeyword']").val($("#boardSearchForm input[name='searchKeyword']").val());
        if($("#boardForm input[name='searchKeyword']").val() != ''){
            $("#boardForm input[name='searchKeyword']").addClass("value");
        }
        memberEventList.memberEventListListAjax();
    });


    $(".btn-del").on("click",function(){
        $("#boardForm input[name='searchKeyword']").removeClass("value");
        $("#boardForm input[name='searchKeyword']").val("");
        $("#boardSearchForm input[name='searchKeyword']").val("");
        $(".board-list ul").html("");
        memberEventList.memberEventListListAjax();
    });

    memberEventList.memberEventListListAjax();

    if(sessionStorage.getItem("본인인증") != 'Y'){
        sessionStorage.setItem("di", '');
        sessionStorage.setItem("sName", '');
    }

}


memberEventList.memberEventListListAjax = function(){
    $("#returnUrl").val($(location).attr('pathname')+"?boardId="+$("#boardId").val());

    var param = $("#boardForm").serializeObject();
    fn_ajax_call("/kicpa/commonBoard/getCommonBoardList.do",param,memberEventList.commonBoardList_success,memberEventList.commonBoardList_error);
}

memberEventList.commonBoardList_success = function(data){
    var list = data.boardList;
    var boardMaster = data.boardMaster
    var totalCnt = data.totalCnt;
    var isLogin = data.isLogin;
    var returnUrl = data.returnUrl;
    var userId = data.userId;
    var txt = "";

    var di = "";
    var name = "";

    if(sessionStorage.getItem("di") != '' && sessionStorage.getItem("di") != null){
        di = sessionStorage.getItem("di");
        name = sessionStorage.getItem("sName");
    }

    if(isLogin){
        $(".login-guide").hide();
        $("#tabMain1").show();
        if(list != null && list.length > 0){
            $("#totalCnt").text(totalCnt+"건")
            $.each(list,function(i,o){

                if(o.bltnLev != 1){
                    txt+='<li class="answer"> \n';
                }else{
                    txt+='<li> \n';
                }

                if(o.delFlag == 'N'){
                    console.log(o.userId)
                    console.log(userId)
                    if(o.bltnIcon  == 'D' && o.userId != userId){
                        txt+='	<a href="javascript:void(0);"> \n';
                    }else{
                        txt+='	<a href="/kicpa/commonBoard/memberEventDetail.do?boardId='+o.boardId+'&bltnNo='+o.bltnNo+'&di='+di+'&name='+name+'"> \n';
                    }
                    txt+=' 		<div class="title-zone"> \n';



                    if(o.bltnIcon  == 'D'){
                        txt+=' 			<p class="lock">'+o.bltnSubj+'</p> \n';
                    }else{
                        txt+=' 			<p>'+o.bltnSubj+'</p> \n';
                    }


                    txt+=' 	      	<div class="other"> \n';
                    if(o.bltnTopTag != 'N'){
                        txt+=' 	        	<span class="ico-bell"></span> \n';
                    }else if(o.fileCnt > 0){
                        txt+=' 	        	<span class="ico-file"></span> \n';
                    }else{
                        txt+=' 	        	<span class="ico-arrow"></span> \n';
                    }
                    txt+=' 	        </div> \n';
                    txt+=' 	    </div> \n';
                    txt+='      <div class="info-zone"> \n';

                    //등록일자 표시 설정
                    if(boardMaster.ttlYns10 == 'Y'){
                        txt+='            <span>'+o.regDatim+'</span> \n';
                    }

                    if(o.bltnTopTag != 'N'){
                        txt+='            <span>관리자</span> \n';

                        //닉네임 표시 사용설정
                    }else if(boardMaster.ttlYns9 == 'Y'){
                        txt+='            <span>'+o.userNick+'</span> \n';
                    }
                    //확징필드 사용설정
                    /*else if(boardMaster.funcYns9 == 'Y' && boardMaster.extTitle1 != null && boardMaster.extTitle1 != ''){
                        txt+='            <span>'+o.extStr1+'</span> \n';

                    }*/
                    //조회수 표시 사용설정
                    if(boardMaster.ttlYns10 == 'Y'){
                        txt+='            <span>'+o.bltnReadCnt+'</span> \n';
                    }
                    txt+='        </div> \n';
                    txt+='	</a> \n';
                }else{
                    txt+=' 		<div class="title-zone"> \n';
                    txt+=' 			<p>삭제된 글입니다.</p> \n';
                    txt+=' 	    </div> \n';

                }
                txt+='</li> \n';
            });
            $(".board-list ul").append(txt);
        }else{
            $("#totalCnt").text(totalCnt+"건")
        }

        if(totalCnt < Number($("#pageIndex").val())){
            $(window).off('scroll');
        }else{
            $(window).off().on("scroll",function() {
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 150 && flag ) {
                    flag = false;
                    $("#pageIndex").val(Number($("#pageIndex").val())+10);
                    memberEventList.memberEventListListAjax();
                }
            });
        }

    }else{

        $(".login-guide").show();
        $("#tabMain1").hide();
    }

    flag = true;
}

memberEventList.openDetailPop = function(url,popId){

    window.open(url);

}

memberEventList.commonBoardList_error = function(data, status, error){
    flag = true;
    alert("실패");
}