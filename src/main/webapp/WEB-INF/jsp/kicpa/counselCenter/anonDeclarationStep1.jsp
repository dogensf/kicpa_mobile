<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){
	$(".btn-sticky").on("click",function(){
		if(!$("#terms02").prop("checked") || !$("#terms01").prop("checked")  ){
			alert("개인정보의 수집·이용 등 처리에 관한 사항 , 개인정보의 제3자 제공에 관한 사항 동의 모두 동의해주세요.");
			return false;
		}
		location.href="/kicpa/counselCenter/anonDeclarationStep2.do";
	});


	$("#all").on("change",function(){
		if($(this).prop("checked")){
			$("#terms02,#terms01").prop("checked",true);
		}else{
			$("#terms02,#terms01").prop("checked",false);
		}
	});


});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="gubun" id="gubun" value="${param.gubun }">
	<section class="head-pop">
    	<h3>신고</h3>
        <button class="btn-close" type="button" onclick="fncLocation();">
            <span>닫기</span>
        </button>
    </section>

    <section class="content">

		<div class="step-box">
		    <span>익명신고</span>
		    <h4>회계부정신고</h4>
		    <div class="step-by">
		        <b>1</b> / <em>2</em>
		    </div>
		</div>

        <div class="mypage-wrap">

   	        <div class="inp-box">
               <div class="inp-check">
                 <label class="label">회계부정 익명신고시 유의사항</label>
               </div>

               <div class="terms_box">
				<p>• 익명신고시 접수통지 등 진행사항 통지가 생략됩니다.</p>
				<p>• 익명으로 부정신고하면 실명이 확인되지 않아 조사결과가 나오더라도 회계 포상금 지급이 제한될 수 있습니다.</p>
				<p>• 구체적인 회계부정 혐의와 증빙자료 없는 익명신고는 제출하더라도 회계부정신고로 볼 수 없습니다</p>
               </div>
           </div>
   	        <div class="inp-box">
               <div class="inp-check">
                 <label class="label"> 회계부정신고·포상</label>
               </div>

               <div class="terms_box">
					본 사이트에서는 「주식회사 등의 외부감사에 관한 법률」제4조에 따른 외부감사대상회사 중 비상장회사(사업보고서 제출대상은 제외)의 회계부정행위에 대해 신고를 받고 있으며 회계부정과 관련 없는 사항이나 민원 고충사항 등에 대해서는 접수받지 않습니다.
               </div>
           </div>

            <!-- 약관모두동의 -->
            <div class="inp-box">
                <div class="label essen">약관동의</div>
                <div class="inp-all-check">
                    <input type="checkbox" name="all" id="all" />
                    <label for="all">모두 동의합니다.</label>
                </div>
            </div>

            <!-- 약관1 -->
            <div class="inp-box">
                <div class="inp-check">
                    <input type="checkbox" name="terms02" id="terms02" />
                    <label for="terms02">개인정보의 수집·이용 등 처리에 관한 사항 (필수)</label>
                </div>

                <div class="terms_box">
                	&lt; 개인정보의 수집·이용 목적 &gt;
					   「주식회사 등의 외부감사에 관한 법률」 등에 근거한 심사·감리 업무를 위해 귀하의 개인정보를 수집·이용 등 처리합니다.
					&lt; 수집·이용하는 개인정보 항목 &gt;
                </div>
            </div>

              <!-- 약관2 -->
           <div class="inp-box">
               <div class="inp-check">
                   <input type="checkbox" name="terms01" id="terms01" />
                   <label for="terms01">개인정보의 제3자 제공에 관한 사항 (필수)</label>
               </div>

               <div class="terms_box">
               	  &lt; 개인정보를 제공받는 자 &gt;
					귀하가 개인정보의 제3자 제공에 동의하는 경우 아래의 기관에 개인정보가 제공될 수 있습니다.
					① 검찰 등 수사기관
					② 법원
               </div>
           </div>
      </div>
	</section>

	<div class="btn-page-bottom">
	    <button class="btn-text-blue" onclick="fncLocation();" type="button">취소</button>
	</div>

	<!-- 시작하기 버튼 -->
	<div class="sticky-bottom">
	    <button class="btn-sticky" type="button">시작하기</button>
	</div>
</form>