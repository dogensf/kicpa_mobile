<%--
  Class Name : MOBILE selectDuesList.jsp
  Description : 회비 조회
  Modification Information

        수정일             수정자                   수정내용
    -------    --------    ---------------------------
    2021.11.01   KIK          최초 생성

--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<c:set var="ImgUrl" value="/images/"/>

<link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
<script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
<script src="/js/KicpaCommon.js"></script>
<%-- <script src="<c:url value='/js/html2canvas.js'/>"></script>
<script src="<c:url value='/js/html2canvas.min.js'/>"></script> --%>
<style>
    .TABLE{border-collapse:collapse;}
    .TABLE thead{float:left; width:588px;}
    .TABLE tbody{overflow-y:auto; overflow-x:hidden; float:left; width:588px; height:<c:choose><c:when test="${fn:length(detail) eq 0}">302</c:when><c:when test="${fn:length(detail) eq 1}">302</c:when><c:otherwise>${fn:length(detail) * 151}</c:otherwise></c:choose>px;}
    .TABLE tbody tr{display:table; }
    .TABLE td{width:588px}
</style>
<script type="text/javascript">
    <c:if test="${!empty errMsg}">
    alert('${errMsg}');
    </c:if>


    var win=null;
    function printIt(printThis)  {
        win = window.open();
        self.focus();
        win.document.open();
        win.document.write('<'+'html'+'><'+'head'+'><'+'style'+'>');
        win.document.write('body, td { font-family: Verdana; font-size: 10pt;height:100%;}');
        win.document.write('<'+'/'+'style'+'><'+'/'+'head'+'><'+'body'+'>');
        win.document.write('<link rel="stylesheet" type="text/css" href="../../css/base.css" />');
        win.document.write(printThis);
        win.document.write('<'+'/'+'body'+'><'+'/'+'html'+'>');
        win.document.close();
        win.print();
        win.close();


    }


    //이미지(png)로 다운로드
    function downImg(){
        $("#printArea").css("height","200%");
        $('.wide').css("height","100%");

        html2canvas($("#printArea")[0]).then(function(canvas){
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "고지서.png")
        });
    }

    function downloadURI(uri, name){
        var link = document.createElement("a")
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        $('.wide').css("height","700px");
        $("#printArea").css("height","460px");
    }



    $(document).ready(function(e) {
        //window.bridge.displayBottom(true);

        $('#appLoadingIndicator2', parent.document).hide();

        $("#searchYYYY").change(function(){
            fn_select_duesList();
        });

        $(".postChk").change(function(){

            var sendData;
            if($(this).is(":checked")){
                sendData= {"giro_cd":$(this).val(),
                    "post_send_yn" : "Y"
                }

            }else{
                sendData= {"giro_cd":$(this).val(),
                    "post_send_yn" : "N"
                }

            }

            /*  $.ajax({
                 url: "<c:url value='/kicpa/dues/updatePostSendYn.do'/>",
                    type: 'get',
                    data: sendData,
                    dataType: 'json',
                    async: false,
                    timeout: 10000,
                    beforeSend: function() {
                    },
                    complete: function() {

                    },
                    success: function(result) {

                    },
                    error: function(xhr, status, error) {

                    },
                    fail: function() {

                    }
                });
 */

            // $("#resultTbody").caa("height",140*1);

        });


        $("#aa").click(function(){
            alert($(this).val());
            /* if (confirm('지로를 우편으로 수령 하시겠습니까?')) {
                var url;
                 if($('#ref_id').val()==''){
                    url = "<c:url value='/kicpa/dues/inserDuesRef.do'/>";
            }else{
            	url = "<c:url value='/kicpa/dues/updateDuesRef.do'/>";
            }
            var form = $('#refReg')[0];
        	var form = new FormData(form);



        } */
        });

        $('.dudtInAmtCk').click(function(){
            //장기체납자 연회비,직무회비 일 경우
            if($(this).attr('reqcd') == '35230080'){
                if($(this).is(':checked')){
                    alert('장기체납자 연회비,직무회비 일 경우 단건으로 결제가 가능합니다.');
                    $('.dudtInAmtCk').each(function(){
                        if($(this).attr('reqcd') != '35230080'){
                            $(this).prop('checked',false);
                            $(this).attr("disabled", true);
                        }
                    });
                }else{
                    $('.dudtInAmtCk').each(function(){
                        if($(this).attr('reqcd') != '35230080'){
                            $(this).prop('checked',false);
                            $(this).attr("disabled", false);
                        }
                    });
                }

            }

            var girocd = '';
            var dudtamt ='';
            var sumDudtamt =0;
            $('.dudtInAmtCk').each(function(){
                if($(this).is(':checked')){
                    girocd  += $(this).val()+',';
                    dudtamt += $(this).attr('amt')+',';
                    sumDudtamt =Number(sumDudtamt) + Number($(this).attr('amt'));
                }
            });
            girocd = girocd.slice(0,-1);
            dudtamt = dudtamt.slice(0,-1);
            $('#giroCd').val(girocd);
            $('#dudtInAmt_').val(dudtamt);
            $('#dudtInAmt').val(sumDudtamt);
            //sumDudtamt= sumDudtamt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            sumDudtamt= sumDudtamt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if(sumDudtamt != '0' ){
                $('#paymentBtn').css("background","#EB640F");
                $('#paymentBtn').css("color","#fff");
            }else{
                $('#paymentBtn').css("background","#0070C0");
                $('#paymentBtn').css("color","#fff");
            }
            $('#paymentBtn').html(sumDudtamt +' 원 결제');

        });
        $("#paymentBtn").click(function(){
            if($("#dudtInAmt").val() == 0){
                alert("결제금액을 확인해 주세요.")
                return;
            }

            var formData = $('#selectDuesList_frm').serialize();

            //추가회비 프로시저
            $.ajax({
                url : "<c:url value='/kicpa/dues/callGiroInterestProc.do'/>",
                data : formData,
                method : "POST",
                dataType : "json",
                success : function(data) {

                    if(data.v_amt != "" && data.v_amt != null){

                        alert("납부하실 회비 중 납기경과분이 포함되어 있습니다.\n\n회비규정 제5조 제1항에 따라 납부 후 아래와 같이 추가회비(경과일수에 따라 연6% 이자율 적용)가 부과될 예정입니다.\n\n"+
                            data.v_amt
                            + "\n추가회비는 다음 회비고지시 합산 청구됩니다.");
                    }

                    document.frm.action = "<c:url value='/kicpa/dues/setDuesPayment.do'/>";
                    document.frm.submit();

                },

                error : function(status, e) {
                    alert("데이터 요청에 실패하였습니다.\r status : " + status);
                }
            });

        });


        //세부내역 확인 버튼 클릭
        $("#selectDuesList_detailBtn").click(function(){
            selectDuesList_detsilBtnClick();
        });

        //세부내역 확인 팝업 확인 버튼
        $('#selectDuesListPop_ok').click(function(){
            $('#selectDuesList_body').removeClass('stop');
            $('#selectDuesListPop_duesDetail').removeClass('show');
        });

    });


    function press(event) {
        if (event.keyCode==13) {
            fn_select_duesList();
        }
    }

    function fn_addNotice() {
        document.frm.action = "<c:url value='/cop/bbs${prefix}/addBoardArticle.do'/>";
        document.frm.submit();
    }

    function fn_select_duesList() {
        document.frm.action = "<c:url value='/kicpa/dues/selectDuesList.do'/>";
        document.frm.submit();
    }





    function giroReport(){
        $('.kicpa-modal').show();
    }
    function fncLocation(){
        //location.href='<c:url value='/kicpa/main/main.do'/>';
        $('#appExit').addClass("show");
    }

    //세부내역 확인 화면 이동
    function selectDuesList_detsilBtnClick() {

        if($("#selectDuesList_confirmPass").is(":checked") || sessionStorage.getItem("본인인증") == "Y"  ){        //본인인증 패스
            duesDetailReport();
        }
        else{
            getSelectDuesListDetsilCheckplusEncData();
        }
    }

    //세부내역 확인 화면 이동 전 본인 인증
    function getSelectDuesListDetsilCheckplusEncData() {
        var param = {};
        param.movePage = "https://mkip.kicpa.or.kr"+"<c:url value='/dues/selectDuesListConfirmSucc.do'/>";
        fn_ajax_call("/kicpa/common/getCheckplusEncData.do",param,getSelectDuesListDetsilCheckplusEncDataSuccess,selectDuesListError);
    }

    function getSelectDuesListDetsilCheckplusEncDataSuccess(data) {
        var sMessage = data.sMessage;
        var sEncData = data.sEncData;


        $("#selectDuesList_nice input[name='EncodeData']").val(sEncData);

        var form = document.getElementById("selectDuesList_nice");

        window.open('', 'popupChk');
        form.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        form.target = "popupChk";
        form.submit();
    }

    //본인인증 후 세부내역 확인 화면으로 이동
    function selectDuesList_duesDetailConfirmSuccMove() {

        if(di != $('#selectDuesList_duesDetailInfoDi').val()){
            alert("회원정보가 일치하지 않습니다.");
        }
        else{
            sessionStorage.setItem("본인인증", "Y");
            duesDetailReport();
        }
    }

    function duesDetailReport() {
        var formData = $('#selectDuesList_frm').serializeObject();

        formData.duesFlag = $("input[name=duesFlagChk]").val();

        //location.href='<c:url value='/kicpa/dues/selectDuesListDetailPop.do'/>';

        $.ajax({
            url: "<c:url value='/kicpa/dues/selectDuesListDetailPop.do'/>",
            type : "POST",
            data : formData,
            success : function(data) {
                var duesFlag1 = false;
                var duesFlag2 = false;
                var duesFlag3 = false;
                var duesFlag4 = false;
                var duesFlag5 = false;
                var duesFlag6 = false;

                $('input:checkbox[name="duesFlagChk"]').each(function() {

                    if(this.checked){
                        if($(this).attr('duescl') == '00170008'){
                            duesFlag1 = true;
                        }
                        if($(this).attr('duescl') == '00170002'){
                            duesFlag2 = true;
                        }
                        if($(this).attr('duescl') == '00170003'){
                            duesFlag3 = true;
                        }
                        if($(this).attr('duescl') == '00170004'){
                            duesFlag4 = true;
                        }
                        if($(this).attr('duescl') == '56030010' || $(this).attr('duescl') == '56030040' || $(this).attr('duescl') == '00170001'){
                            duesFlag5 = true;
                        }
                        if($(this).attr('duescl') == '00170005' || $(this).attr('duescl') == '00170006' || $(this).attr('duescl') == '00170007'){
                            duesFlag6 = true;
                        }
                    }

                });

                $("#selectDuesList_duesContents").empty();
                $("#selectDuesList_duesContentsSum").empty();
                $("#selectDuesList_duesList").empty();

                var result="";
                var pass_sum = 0;
                var add_sum = 0;
                var delay_sum = 0;
                var cur_sum = 0;

                $('#selectDuesList_duesNum').text(data.detail[0].epay_no.substring(0,1)+" "+
                    data.detail[0].epay_no.substring(1,2)+" "+
                    data.detail[0].epay_no.substring(2,3)+" "+
                    data.detail[0].epay_no.substring(3,4)+" "+
                    "- " +
                    data.detail[0].epay_no.substring(4,5)+" "+
                    data.detail[0].epay_no.substring(5,6)+" "+
                    data.detail[0].epay_no.substring(6,7)+" "+
                    data.detail[0].epay_no.substring(7,8)+" "+
                    data.detail[0].epay_no.substring(8,9)+" "+
                    "- " +
                    data.detail[0].epay_no.substring(9,10)+" "+
                    data.detail[0].epay_no.substring(10,11)+" "+
                    data.detail[0].epay_no.substring(11,12)+" "+
                    data.detail[0].epay_no.substring(12,13)+" ");

                $('#selectDuesList_cpaName').text(data.searchVO.name);

                for(var i=0; i<data.billSum.length; i++){

                    var showYn = "N";

                    if(data.billSum[i].dues_cl == '00170008' && duesFlag1){      //입회비
                        showYn = "Y";
                    }
                    if(data.billSum[i].dues_cl == '00170002' && duesFlag2){      //연회비
                        showYn = "Y";
                    }
                    if(data.billSum[i].dues_cl == '00170003' && duesFlag3){      //부조회비
                        showYn = "Y";
                    }
                    if(data.billSum[i].dues_cl == '00170004' && duesFlag4){      //복지회비
                        showYn = "Y";
                    }
                    if((data.billSum[i].dues_cl == '56030010' || data.billSum[i].dues_cl == '56030040' || data.billSum[i].dues_cl == '00170001') && duesFlag5){      //직무회비
                        showYn = "Y";
                    }
                    if((data.billSum[i].dues_cl == '00170005' || data.billSum[i].dues_cl == '00170006' || data.billSum[i].dues_cl == '00170007') && duesFlag6){      //감리업무수수료
                        showYn = "Y";
                    }

                    if(showYn == "Y"){
                        pass_sum = pass_sum + data.billSum[i].pass_amt;
                        add_sum = add_sum + data.billSum[i].add_amt;
                        delay_sum = delay_sum + data.billSum[i].delay_amt;
                        cur_sum = cur_sum + data.billSum[i].cur_amt;
                    }

                }

                for(var i=0; i<data.billSum.length; i++){
                    //입회비
                    if(data.billSum[i].dues_cl == '00170008' && duesFlag1){

                        var cur_amt = 0;

                        result = result +
                            "<div class='bill-box2'>" +
                            "<div class='bill-title'>입회비</div>" +
                            "<div class='bill-title-box'>" +
                            "<span>수습공인회계사등록번호</span>" +
                            "<span>성명 </span>" +
                            "<span>금액</span>" +
                            "</div>";

                        for(var j=0; j<data.bill.length; j++){

                            if(data.bill[j].dues_cl == '00170008'){

                                result = result +
                                    "<div class='table-box'>" +
                                    "<p>"+data.bill[j].odr+"</p>" +
                                    "<p>"+data.bill[j].cmpy_nm+"</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].cur_amt)+"</p>" +
                                    "</div>";

                                cur_amt = cur_amt + data.bill[j].cur_amt;
                            }
                        }

                        result = result +
                            "<div class='sum-box'>" +
                            "<p>합계</p>" +
                            "<p>"+duesCommaCheck(cur_amt)+"</p>" +
                            "</div>" +
                            "</div>";

                    }

                    //연회비
                    if(data.billSum[i].dues_cl == '00170002' && duesFlag2){

                        var add_sum = 0;
                        var dues_sum = 0;

                        result = result +
                            "<div class='bill-box2'>" +
                            "<div class='bill-title'>연회비</div>" +
                            "<div class='bill-title-box'>" +
                            "<span>연도</span>" +
                            "<span>연회비</span>" +
                            "<span>추가회비</span>" +
                            "<span>납기</span>" +
                            "</div>";

                        for(var j=0; j<data.bill.length; j++){

                            if(data.bill[j].dues_cl == '00170002'){

                                result = result +
                                    "<div class='table-box'>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].dues_amt)+"</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].add_amt)+"</p>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"."+data.bill[j].due_de.substring(4,6)+"."+data.bill[j].due_de.substring(6,8)+"</p>" +
                                    "</div>";

                                dues_sum = dues_sum + data.bill[j].dues_amt;
                                add_sum = add_sum + data.bill[j].add_amt;

                            }
                        }

                        result = result +
                            "<div class='sum-box'>" +
                            "<p>합계</p>" +
                            "<p>"+duesCommaCheck(dues_sum)+"</p>" +
                            "<p>"+duesCommaCheck(add_sum)+"</p>" +
                            "<p>"+duesCommaCheck(dues_sum+add_sum)+"</p>" +
                            "</div>" +
                            "</div>";

                    }

                    //부조회비
                    if(data.billSum[i].dues_cl == '00170003' && duesFlag3){

                        var add_sum = 0;
                        var dues_sum = 0;

                        result = result +
                            "<div class='bill-box2'>" +
                            "<div class='bill-title'>부조회비</div>" +
                            "<div class='bill-title-box'>" +
                            "<span>연도</span>" +
                            "<span>부조회비</span>" +
                            "<span>추가회비</span>" +
                            "<span>납기</span>" +
                            "</div>";

                        for(var j=0; j<data.bill.length; j++){

                            if(data.bill[j].dues_cl == '00170003'){

                                result = result +
                                    "<div class='table-box'>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].dues_amt)+"</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].add_amt)+"</p>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"."+data.bill[j].due_de.substring(4,6)+"."+data.bill[j].due_de.substring(6,8)+"</p>" +
                                    "</div>";

                                dues_sum = dues_sum + data.bill[j].dues_amt;
                                add_sum = add_sum + data.bill[j].add_amt;

                            }
                        }

                        result = result +
                            "<div class='sum-box'>" +
                            "<p>합계</p>" +
                            "<p>"+duesCommaCheck(dues_sum)+"</p>" +
                            "<p>"+duesCommaCheck(add_sum)+"</p>" +
                            "<p>"+duesCommaCheck(dues_sum+add_sum)+"</p>" +
                            "</div>" +
                            "</div>";

                    }

                    //복지회비
                    if(data.billSum[i].dues_cl == '00170004' && duesFlag4){

                        var dues_sum = 0;

                        result = result +
                            "<div class='bill-box2'>" +
                            "<div class='bill-title'>복지회비</div>" +
                            "<div class='bill-title-box'>" +
                            "<span>해당년월</span>" +
                            "<span>복지회비 </span>" +
                            "<span>납부방법 : 월납</span>" +
                            "</div>";

                        for(var j=0; j<data.bill.length; j++){

                            if(data.bill[j].dues_cl == '00170004'){

                                if(data.bill[j].due_de == null){
                                    data.bill[j].due_de ="";
                                }

                                result = result +
                                    "<div class='table-box'>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"."+data.bill[j].due_de.substring(4,6)+"</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].dues_amt)+"</p>" +
                                    "</div>";

                                dues_sum = dues_sum + data.bill[j].dues_amt;

                            }
                        }

                        result = result +
                            "<div class='sum-box'>" +
                            "<p>합계</p>" +
                            "<p>"+duesCommaCheck(dues_sum)+"</p>" +
                            "</div>" +
                            "</div>";

                    }

                    //직무회비
                    if(data.billSum[i].dues_cl == '56030010' || data.billSum[i].dues_cl == '56030040' || data.billSum[i].dues_cl == '00170001' && duesFlag5){

                        var dues_sum = 0;

                        result = result +
                            "<div class='bill-box5'>" +
                            "<div class='bill-title'>직무회비</div>" +
                            "<div class='bill-title-box'>" +
                            "<span>업무구분</span>" +
                            "<span>회사명</span>" +
                            "<span>접수일(결산종료일)</span>" +
                            "<span>회비구분</span>" +
                            "<span>차수</span>" +
                            "<span>회비</span>" +
                            "<span>납기</span>" +
                            "</div>";

                        for(var j=0; j<data.bill.length; j++){

                            if(data.bill[j].dues_cl == '56030010' || data.bill[j].dues_cl == '56030040' || data.bill[j].dues_cl == '00170001'){

                                var rcept_de = "";
                                if(data.bill[j].rcept_de.length == 8){
                                    rcept_de = data.bill[j].rcept_de.substring(0,4)+"."+data.bill[j].rcept_de.substring(4,6)+"."+data.bill[j].rcept_de.substring(6,8);
                                }
                                else if(data.bill[j].rcept_de.length == 6){
                                    rcept_de = data.bill[j].rcept_de.substring(0,4)+"."+data.bill[j].rcept_de.substring(4,6);
                                }
                                else{
                                    rcept_de = data.bill[j].rcept_de;
                                }

                                result = result +
                                    "<div class='table-box'>" +
                                    "<p>"+data.bill[j].duty_dues_cl+"</p>" +
                                    "<p>"+data.bill[j].cmpy_nm+"</p>" +
                                    "<p>"+rcept_de+"</p>" +
                                    "<p>"+data.bill[j].duty_flag+"</p>" +
                                    "<p>"+data.bill[j].odr+"차</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].dues_amt + data.bill[j].add_amt + data.bill[j].delay_amt)+"</p>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"."+data.bill[j].due_de.substring(4,6)+"."+data.bill[j].due_de.substring(6,8)+"</p>" +
                                    "</div>";

                                dues_sum = dues_sum + data.bill[j].dues_amt + data.bill[j].add_amt + data.bill[j].delay_amt;

                            }
                        }

                        result = result +
                            "<div class='sum-box'>" +
                            "<p>합계</p>" +
                            "<p>"+duesCommaCheck(dues_sum)+"</p>" +
                            "</div>";

                    }

                    //감리업무수수료
                    if(data.billSum[i].dues_cl == '00170005' || data.billSum[i].dues_cl == '00170006' || data.billSum[i].dues_cl == '00170007' && duesFlag6){

                        var dues_sum = 0;

                        result = result +
                            "<div class='bill-box5'>" +
                            "<div class='bill-title'>감리업무수수료</div>" +
                            "<div class='bill-title-box'>" +
                            "<span>업무구분</span>" +
                            "<span>회사명</span>" +
                            "<span>접수일(결산종료일)</span>" +
                            "<span>회비구분</span>" +
                            "<span>차수</span>" +
                            "<span>회비</span>" +
                            "<span>납기</span>" +
                            "</div>";

                        for(var j=0; j<data.bill.length; j++){

                            if(data.bill[j].dues_cl == '00170005' || data.bill[j].dues_cl == '00170006' || data.bill[j].dues_cl == '00170007'){

                                result = result +
                                    "<div class='table-box'>" +
                                    "<p>"+data.bill[j].duty_dues_cl+"</p>" +
                                    "<p>"+data.bill[j].cmpy_nm+"</p>" +
                                    "<p>"+data.bill[j].rcept_de+"</p>" +
                                    "<p>"+data.bill[j].duty_flag+"</p>" +
                                    "<p>"+data.bill[j].odr+"차</p>" +
                                    "<p>"+duesCommaCheck(data.bill[j].dues_amt)+"</p>" +
                                    "<p>"+data.bill[j].due_de.substring(0,4)+"."+data.bill[j].due_de.substring(4,6)+"."+data.bill[j].due_de.substring(6,8)+"</p>" +
                                    "</div>";

                                dues_sum = dues_sum + data.bill[j].dues_amt;

                            }
                        }

                        result = result +
                            "<div class='sum-box'>" +
                            "<p>합계</p>" +
                            "<p>"+duesCommaCheck(dues_sum)+"</p>" +
                            "</div>";

                    }


                }

                $('#selectDuesList_duesList').append(result);

                //duesFlagChkChange();
                $('#selectDuesList_printArea').show();


                $('#selectDuesList_body').addClass('stop');
                $('#selectDuesListPop_duesDetail').addClass('show');
            }
        });
    }

    function duesCommaCheck(num){
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

    function selectDuesListError() {
        alert("조회실패");
    }


</script>
</head>
<body id="selectDuesList_body">
<div class="wrap">
    <form name="selectDuesList_nice" id="selectDuesList_nice" method="post">
        <input type="hidden" name="m" value="checkplusService">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->
        <input type="hidden" name="EncodeData" value="">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
    </form>


    <div class="container">
        <section class="head-main">
            <h1>회비납부/조회</h1>
            <%
                LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO");
                if(loginVO == null){
            %>
            <button class="btn-login" onclick="location.href='<c:url value='/uat/uia/LoginUsr.do'/>';" type="button">
                로그인
            </button>
            <%
            }else{
            %>
            <button class="btn-login" onclick="javascript:logOut();" type="button">
                로그아웃
            </button>
            <%
                }
            %>
            <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
        </section>

        <section class="content">
            <form name="frm" id="selectDuesList_frm" action ="<c:url value='/kicpa/dues/selectDuesList.do'/>" method="post">
                <input type="hidden" name="giro_cd" id="giroCd">
                <input type="hidden" name="dudt_in_amt_" id="dudtInAmt_">
                <input type="hidden" name="dudt_in_amt" id="dudtInAmt" value="0">
                <input type="hidden" name="epay_no" id="epayNo" value="${detail[0].epay_no}">
                <input type="hidden" name="cust_inqr_no" id="custInqrNo" value="${detail[0].cust_inqr_no}">
                <input type="hidden" name="cstmr_flag" id="cstmr_flag" value="${detail[0].cstmr_flag}">
                <input type="hidden" name="cstmr_cd" id="cstmrCd" value="${detail[0].cstmr_cd}">
                <input type="hidden" name="cstmr_nm" id="cstmrNm" value="${detail[0].cstmr_nm}">
            </form>
            <div class="tab-main">
                <a class="tab-link active" href="<c:url value='/kicpa/dues/selectDuesList.do'/>">
                    <span>회비조회 및 납부</span>
                </a>
                <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesList.do?path=result'/>">
                    <%-- <a class="tab-link" href="<c:url value='/kicpa/dues/selectDuesResult.do'/>"> --%>
                    <span>납부결과 및 조회</span>
                </a>
                <!-- <a class="tab-link" href="#tabMain2">
                    <span>환급신청 및 조회</span>
                </a> -->
            </div>

            <div>
                <div>
                    <input type="hidden" id="selectDuesList_duesDetailInfoDi" value="${diCheckList[0].immDi}"/>
                </div>
            </div>

            <div id="tabMain1" class="tab-main-content show">
                <div class="blue-box">
                    <ul class="guest-private">
                        <li>
                            <b style="font-weight: 900; font-size: 1.6rem;">회원명</b>
                            <span>${searchVO.name}</span>
                        </li>
                        <li>
                            <b style="font-weight: 900; font-size: 1.6rem;">전자납부번호</b>
                            <span>
	                      	${fn:substring(detail[0].epay_no,0,1)}
		                    ${fn:substring(detail[0].epay_no,1,2)}
		                    ${fn:substring(detail[0].epay_no,2,3)}
		                    ${fn:substring(detail[0].epay_no,3,4)}
		                    -
		                    ${fn:substring(detail[0].epay_no,4,5)}
		                    ${fn:substring(detail[0].epay_no,5,6)}
		                    ${fn:substring(detail[0].epay_no,6,7)}
		                    ${fn:substring(detail[0].epay_no,7,8)}
		                    ${fn:substring(detail[0].epay_no,8,9)}
		                    -
		                    ${fn:substring(detail[0].epay_no,9,10)}
		                    ${fn:substring(detail[0].epay_no,10,11)}
		                    ${fn:substring(detail[0].epay_no,11,12)}
		                    ${fn:substring(detail[0].epay_no,12,13)}
		                  </span>
                        </li>
                        <li>
                            <b style="font-weight: 900; font-size: 1.6rem;">지로번호</b>
                            <span>7613018</span>
                        </li>
                    </ul>
                    <p class="text-guide" style="color:black; font-size: 14px; line-height: 17px; margin-top:40px;">
                        현재 화면에서 고지된 회비 목록 중 선택하여 납부하거나, 인터넷 지로 또는 은행 사이트에서도 "전자납부번호"를 이용해 납부 할 수 있습니다.</br></br>
                        ※ 회칙 제28조 제6항 제3호의 규정에 따라 “총회소집 공고일(개회 2주전) 현재 개인연간회비를 3년 이상 납부하지 않은 회원”은 총회 의결권이 제한됩니다.
                    </p>

                </div>

                <div class="dues-wrap">

                    <div class="dues-list">
                        <div class="title-box">
                            <h3>납부내역 조회</h3>
                            <button type="button" class="btn-full" onclick="javascript:location.href='<c:url value='/kicpa/dues/selectDuesResultPop.do'/>'">전체보기</button>
                        </div>

                        <ul>
                            <c:if test="${empty result}">
                                <li>
                                    <span class="day">납부내역이 존재하지 않습니다.</span>
                                </li>
                            </c:if>
                            <c:forEach var="rt" items="${result}" varStatus="status" end="2">
                                <li>
                                    <span class="day">${rt.pay_de}</span>
                                    <div>
                                        <span class="ctg-name"><c:out value='${fn:replace(rt.rqest_nm,"지로","")}'/></span>
                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${rt.dudt_in_amt}" var="d_amt_" />
                                        <span class="price"><c:out value='${d_amt_}'/> 원</span>
                                    </div>
                                </li>
                            </c:forEach>
                        </ul>
                    </div>

                    <div class="board-list">
                        <div class="title-box">
                            <h3>미납회비 조회</h3>
                            <div class="inp-box" style="display: none;">
                                <div class="inp-check">
                                    <input type="checkbox" name="cpaConfirmPass" id="selectDuesList_confirmPass"/>
                                    <label for="selectDuesList_confirmPass"></label>
                                </div>
                            </div>
                            <%--<button type="button" class="btn-full" id="selectDuesList_detailBtn">세부내역 확인</button>--%>
                        </div>

                        <ul class="between-list line">
                            <c:if test="${empty detail}">
                                <li>
                                    <div class="detail">
                                        <p class="total">
                                            <b>&nbsp;&nbsp;미납회비가 없습니다.</b>
                                        </p>
                                    </div>

                                </li>
                            </c:if>
                            <c:forEach var="drt" items="${detail}" varStatus="status">
                                <li>
                                    <div class="inp-check">
                                        <input type="checkbox" name="duesFlagChk" id="du${status.count}" value="${drt.giro_cd}" amt="${drt.dudt_in_amt}" reqcd="${drt.rqest_cd }" duescl="${drt.dues_cl }" class="dudtInAmtCk"/>
                                        <label for="du${status.count}"><c:out value='${fn:replace(drt.rqest_nm,"지로","")}'/></label>
                                    </div>

                                    <div class="detail">
                                        <p class="total">
                                            <b>고지금액</b>
                                            <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
                                            <span><c:out value='${d_amt}'/></span>
                                        </p>
                                        <p>
                                            <b>전자납부번호</b>
                                            <span>${fn:substring(detail[0].epay_no,0,1)}
                                            ${fn:substring(detail[0].epay_no,1,2)}
                                            ${fn:substring(detail[0].epay_no,2,3)}
                                            ${fn:substring(detail[0].epay_no,3,4)}
                                        -
                                            ${fn:substring(detail[0].epay_no,4,5)}
                                            ${fn:substring(detail[0].epay_no,5,6)}
                                            ${fn:substring(detail[0].epay_no,6,7)}
                                            ${fn:substring(detail[0].epay_no,7,8)}
                                            ${fn:substring(detail[0].epay_no,8,9)}
                                        -
                                            ${fn:substring(detail[0].epay_no,9,10)}
                                            ${fn:substring(detail[0].epay_no,10,11)}
                                            ${fn:substring(detail[0].epay_no,11,12)}
                                                    ${fn:substring(detail[0].epay_no,12,13)}</span>
                                        </p>
                                        <p>
                                            <b>납입기일</b>
                                            <fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>
                                            <span><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></span>
                                        </p>
                                    </div>
                                </li>
                            </c:forEach>

                        </ul>
                    </div>

                    <div class="btn-bottom">
                        <button class="btn-primary" id="paymentBtn" type="button" <c:if test="${empty detail}">disabled</c:if>>0 원 결제</button>
                    </div>
                </div>
            </div>
            <!-- //탭1 -->
        </section>

    </div>
</div>

<!-- 하단 레이어 팝업(세부내역 확인) / 활성화시 show -->
<div class="layer-popup-wrap" id="selectDuesListPop_duesDetail">
    <div class="layer-container">
        <div class="title-box">
            <h2>세부내역 확인</h2>
        </div>

        <div class="layer-content" style="text-align: center;">
            <div class="gray-box" id="selectDuesListPop_duesDetailContents">
                <div class="modal-inner wide" >
                    <div class="modal-bill" id="printArea">


                        <div class="modal-bill-info4"  id="selectDuesList_duesList">
                            <!-- DECODE(A.DUES_CL,'00170002','연회비','00170003','부조회비','00170004','복지회비','00170005','세무자료','00170006','도서자료','00170007','특별회비','56030010','직무회비','56030040','직무회비','00170001','직무회비','기타') -->
                            <div class="bill-group duesChkToggle3">
                                <strong class="tb-title">부조회비</strong>
                                <div class="bill-group-tb">
                                    <table>
                                        <colgroup>
                                            <col><col>
                                            <col><col>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th style="">회비구분</th>
                                            <th>연도</th>
                                            <th>부조회비</th>
                                            <th>추가회비</th>
                                            <th>납기</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colspan="2">부조회비</td>
                                            <td>2024</td>
                                            <td>300,000</td>
                                            <td>0</td>
                                            <td>2024.03.31</td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td>합계</td>
                                            <td>300,000</td>
                                            <td>0</td>
                                            <td><strong>300,000</strong></td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div class="layer-bottom" style="text-align: center;">
            <div class="btn-bottom">
                <button class="btn-round fill" type="button" id="selectDuesListPop_ok">확인</button>
            </div>
        </div>
    </div>
</div>
</body>

</body>
</html>