<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script>
$(document).ready(function(){

	if($('#mypCpaMemberPop_closedCl').val() != "" && $('#mypCpaMemberPop_closedCl').val() != null){
		$("input[value='"+$('#mypCpaMemberPop_closedCl').val()+"']").prop('checked', true);
	}

	if($('#mypCpaMemberPop_memFlag').val() == "H"){
		fnCpaClosedPopList();
	}

	//회원(휴업)분류 선택
	$('#cpaClosedPop_closedClSet').on("click", function (e){
		fnCpaClosedPopList();
	});

});

function fncLocation(){
	window.close();
}

function fnCpaClosedPopList(){

	var closedCl = $('input[name=closedCl]:checked').val();
	var closedClId = $('input[name=closedCl]:checked').attr('id');

	if(closedCl == "" || closedCl == null){
		alert("항목을 선택해주세요.");
	}
	else{
		$(opener.document).find("input[name='closedClNm']").val($("label[for='"+closedClId+"']").text());
		$(opener.document).find("input[name='closedCl']").val(closedCl);

		window.close();
	}

}
</script>

<form id="cpaAuditPopForm" name="cpaAuditPopForm">
	<input type="hidden" name="pageIndex" id="pageIndex" value="1">

	<section class="head-sub">
	 	<button class="btn-back" type="button" onclick="fncLocation();">
	        <span>이전</span>
	    </button>
	    <h3>회원(휴업)분류</h3>
	</section>
	<section class="content">

		<div id="tabMain1" class="tab-main-content show">
		    <div id="tabSub1" class="tab-sub-content show">
		        <!-- 게시판 목록 -->
		      <div class="board-list">
				  <ul>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">1. 정부기관</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk011" value="A2170101"/>
                                    <label for="mypCpaMemberPop_closedClChk011">(1)행정기관</label>
                                </span>
								  <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk012" value="A2170102"/>
                                    <label for="mypCpaMemberPop_closedClChk012">(2)입법기관</label>
                                </span>
								  <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk013" value="A2170103"/>
                                    <label for="mypCpaMemberPop_closedClChk013">(3)사법기관</label>
                                </span>
								  <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk014" value="A2170104"/>
                                    <label for="mypCpaMemberPop_closedClChk014">(4)감사원</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">2. 유관기관</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk021" value="A2170201"/>
                                    <label for="mypCpaMemberPop_closedClChk021">(1)금융감독원</label>
                                </span>
								  <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk022" value="A2170202"/>
                                    <label for="mypCpaMemberPop_closedClChk022">(2)한국회계기준원</label>
                                </span>
								  <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk023" value="A2170203"/>
                                    <label for="mypCpaMemberPop_closedClChk023">(3)국가회계재정통계센터</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">3. 공공기관</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk031" value="A2170301"/>
                                    <label for="mypCpaMemberPop_closedClChk031">(1)공공기관</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">4. 경제단체</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk041" value="A2170401"/>
                                    <label for="mypCpaMemberPop_closedClChk041">(1)경제단체</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">5. 각종 협회 및 단체</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk051" value="A2170501"/>
                                    <label for="mypCpaMemberPop_closedClChk051">(1)각종협회 및 단체</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">6. 학교기관</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk061" value="A2170601"/>
                                    <label for="mypCpaMemberPop_closedClChk061">(1)교 수</label>
                                </span>
								  <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk062" value="A2170602"/>
                                    <label for="mypCpaMemberPop_closedClChk062">(2)기타 대학교 (/중고등학교 등)</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">7. 연구소</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk071" value="A2170701"/>
                                    <label for="mypCpaMemberPop_closedClChk071">(1)연구소</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">8. 금융기관</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk081" value="A2170801"/>
                                    <label for="mypCpaMemberPop_closedClChk081">(1)은행</label>
                                </span>
								  <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk082" value="A2170802"/>
                                    <label for="mypCpaMemberPop_closedClChk082">(2)증권</label>
                                </span>
								  <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk083" value="A2170803"/>
                                    <label for="mypCpaMemberPop_closedClChk083">(3)보험</label>
                                </span>
								  <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk084" value="A2170804"/>
                                    <label for="mypCpaMemberPop_closedClChk084">(4)자산운용 등 기타</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">9. 기업체</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk091" value="A2170901"/>
                                    <label for="mypCpaMemberPop_closedClChk091">(1)일반기업체</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">10. 법조계</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk101" value="A2171001"/>
                                    <label for="mypCpaMemberPop_closedClChk101">(1)법무법인</label>
                                </span>
								  <span class="radio" style="margin-right: 10px;">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk102" value="A2171002"/>
                                    <label for="mypCpaMemberPop_closedClChk102">(2)법률사무소</label>
                                </span>
								  <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk103" value="A2171003"/>
                                    <label for="mypCpaMemberPop_closedClChk103">(3)기타 법조계</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">97. 본회</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk111" value="A2179701"/>
                                    <label for="mypCpaMemberPop_closedClChk111">(1) 본회 상근 임직원</label>
                                </span>
							  </div>
						  </div>
					  </li>
					  <li class="addRow">
						  <div class="title-zone" style="display: inline-block;">
							  <p><label style="margin: 20px 0 12px 0; width: 20%;">99. 기타</label></p>

							  <div class="radio-group" style="margin: 15px 0 25px 30px;line-height: 3em;">
                                <span class="radio">
                                    <input type="radio" name="closedCl" id="mypCpaMemberPop_closedClChk121" value="A2179999"/>
                                    <label for="mypCpaMemberPop_closedClChk121">기타 분류되지 않은 회원</label>
                                </span>
							  </div>
						  </div>
					  </li>
				  </ul>
		      </div>
				<input type="hidden" id="mypCpaMemberPop_closedCl" value="${closedCl}"/>
				<input type="hidden" id="mypCpaMemberPop_memFlag" value="${memFlag}"/>
		  </div><!-- tabSub1 -->
		</div><!-- tabMain1 -->
	</section>

	<!-- 페이지 하단 버튼 -->
	<div class="sticky-bottom">
		<button class="btn-sticky" type="button" id="cpaClosedPop_closedClSet">선택</button>
	</div>
</form>