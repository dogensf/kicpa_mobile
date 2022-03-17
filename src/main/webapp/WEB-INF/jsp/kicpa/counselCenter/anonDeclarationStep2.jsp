<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/counselCenter/counselCenter.js"></script>
<script>
$(document).ready(function(){
	counselCenter.declarationStep2Init();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

</script>

<form id="boardForm" name="boardForm">
	<input type="hidden" name="gubun" id="gubun" value="${gubun }">
	<section class="head-pop">
		<h3>신고</h3>
		<button class="btn-close" type="button" onclick="fncLocation();">
		    <span>닫기</span>
		</button>
	</section>

	<section class="content">

		<div class="step-box">
		    <span>익명신고</span>
	        <h4>익명신고(등록)</h4>
		   	<div class="terms_box">
	   		사실관계확인 및 포상금 지급 안내와 관련하여 신고자에게 연락할 수 있읍니다. 연락처나 이메일 주소 등을 기재하여 주시기 바랍니다.
	      	</div>
	      	<br/>
	        <p>&lt; 감리·윤리행정실 TEL : 02-3149-0392 &gt;</p>
	        <p class="">(*) 표시된 항목은 필수 입력사항 입니다.</p>
	        <div class="step-by">
	            <b>2</b> / <em>2</em>
	        </div>
	    </div>


		<fieldset>
	                            <!-- 섹션1 -->
			<div class="add-box">
				<div class="title">
					<span>신고문의</span>
	            </div>

				<div class="form">
				    <div class="inp-box">
				        <label class="label essen" for="arWtitle">제목</label>
				        <input type="text" id="arWtitle" name="arWtitle" placeholder="제목을 입력하세요." maxlength="100" />
				    </div>
			       	<div class="inp-box">
				        <label class="label essen" for="arPswd">비밀번호</label>
				        <input type="password" id="arPswd" name="arPswd" placeholder="비밀번호를 입력하세요." />
				    </div>
			       	<div class="inp-box">
				        <label class="label essen" for="arWname">성명</label>
				        <input type="text" id="arWname" name="arWname" placeholder="성명을 입력하세요." maxlength="10" />
				    </div>
	        		<div class="inp-box">
				        <label class="label essen" for="arBirthYmd">생년월일</label>
				        <input type="text" id="arBirthYmd" name="arBirthYmd" placeholder="Ex) 19870312" maxlength="8" />
				    </div>
			    	<div class="inp-box">
				        <label class="label essen" for="arEmail">이메일</label>
				        <input type="text" id="arEmail" name="arEmail" placeholder="이메일을 입력하세요." />
				    </div>


				    <div class="inp-box">
				        <label class="label essen" for="etc">전화번호</label>
				        <div class="phone">
				            <input type="text" id="phone1" name="phone1" maxlength="3" placeholder="010" />
				            <input type="text" id="phone2" name="phone2" maxlength="4" />
				            <input type="text" id="phone3" name="phone3" maxlength="4" />
				        </div>
				        <div class="inp-in">
				            <input type="checkbox" name="arTelSmsYn" id="arTelSmsYn" value="1" />
				            <label for="checkearTelSmsYnd">
				            		   회계부정신고 접수여부, 담당자지정 등에 대한 안내문자(SMS)를 받는 것에 동의하는 경우 체크하십시오.
				            </label>
				        </div>
				    </div>

			       	<div class="inp-box">
				        <label class="label essen" for="arZip">우편번호</label>
				        <input type="text" id="arZip" name="arZip" placeholder="우편번호를 압력하세요." maxlength="5" />
				    </div>
		         	<div class="inp-box">
				        <label class="label essen" for="arAdd1">주소</label>
				        <input type="text" id="arAdd1" name="arAdd1" placeholder="Ex) 서울특별시 서대문구 충정로7길 12" />
				    </div>

			    	<div class="inp-box">
				        <label class="label essen" for="arAdd2">참고주소</label>
				        <input type="text" id="arAdd2" name="arAdd2" placeholder="Ex) 충정로 2가" />
				    </div>

			    	<div class="inp-box">
				        <label class="label essen" for="arAdd3">상세주소</label>
				        <input type="text" id="arAdd3" name="arAdd3" placeholder="Ex) 한국공인회계사회 1층" />
				    </div>
				</div>
			</div>

	        <!-- 섹션2 -->
	        <div class="add-box">
	            <div class="title">
	                <span>신고사항</span>
	            </div>

	            <div class="form">
	           	  	<div class="inp-box">
				        <label class="label essen" for="arConame">법인명(회사명)</label>
				        <input type="text" id="arConame" name="arConame" placeholder="Ex) 한국공인회계사회 1층" maxlength="100"/>
				    </div>


	   			    <div class="inp-box">
				        <div class="label essen">회계부정행위</div>
				        <div class="in-row">
				            <div class="inp-check">
				                <input type="checkbox" name="arReport1" id="arReport1" value="1"/>
				                <label for="arReport1">내부회계관리제도 위배</label>
				            </div>
				            <div class="inp-check">
				                <input type="checkbox" name="arReport2" id="arReport2" value="1" />
				                <label for="arReport2">회계감사기준 위반</label>
				            </div>
				            <div class="inp-check">
				                <input type="checkbox" name="arReport3" id="arReport3" value="1" />
				                <label for="arReport3">회계처리기준 위반</label>
				            </div>
				            <div class="set ect">
				                <div class="inp-check">
				                    <input type="checkbox" name="arReport0" id="arReport0" value="1" />
				                    <label for="arReport0">기타</label>
				                </div>
				                <div class="inp-box" style="display: none;">
				                    <input type="text" id="arReportEtc" name="arReportEtc" disabled placeholder="기타사항 입력" maxlength="250" />
				                </div>
				            </div>
				        </div>
				    </div>



	<!--                 첨부파일 -->
	<!--                 <div class="inp-box"> -->
	<!--                     <div class="label">첨부파일</div> -->
	<!--                     <div class="file-item"> -->
	<!--                         <div class="file">이력서파일명들어오는거인지아아아아아아.pdf</div> -->
	<!--                         <button class="btn-del" type="button"><span>닫기</span></button> -->
	<!--                     </div> -->
	<!--                     <div class="file-item"> -->
	<!--                         <div class="file">이력서파일명들어오는거인지아아아아아아.pdf</div> -->
	<!--                         <button class="btn-del" type="button"><span>닫기</span></button> -->
	<!--                     </div> -->
	<!--                 </div> -->

	            </div>
	        </div>
	        <div class="add-box">
				<div class="title">
					<span>신고내용 (구체적으로 기술: 내용이 많으면 첨부파일을 이용해 주세요)</span>
	            </div>

				<div class="form">
			        <div class="inp-box">
	                    <div class="label essen">신고내용</div>
	                    <div class="textarea-wrap">
	                        <textarea id="arContent" name="arContent"placeholder="※ 잠깐만！ 회계부정행위 내용을 구체적으로 기재하여 주시기 바랍니다." maxlength="2000"></textarea>
	                    </div>
	                </div>

				    <div class="inp-box">
				        <label class="label" for="arKicpaEtc">기타관련자료</label>
				        <input type="text" id="arKicpaEtc" name="arKicpaEtc" placeholder="한국공인회계사회가 요청시 제공할 수 있는 자료" maxlength="1000" />
				    </div>
			       	<div class="inp-box">
				        <label class="label essen" for="arDetail">신고경위</label>
				        <input type="text" id="arDetail" name="arDetail" placeholder="신고를 알게된 경위" max="500" />
				    </div>


				    <div class="inp-box">
	                    <div class="label">파일첨부</div>
	                    <input type="file" id="fileId" name="upFile" />
	                    <label for="fileId">파일을 등록해 주세요</label>
	                </div>


				    <div class="inp-box">
				        <div class="label essen">다기관 신고 여부</div>
				        <div class="inp-set">
				            <div class="inp-check">
				                <input type="radio" name="arReportUse" id="reportUse1" value="1" />
				                <label for="reportUse1">있음</label>
				            </div>
				            <div class="inp-check">
				                <input type="radio" name="arReportUse" id="reportUse2" value="2" />
				                <label for="reportUse2">없음</label>
				            </div>
			              	<div class="inp-box" style="display: none;">
			                    <input type="text" id="arReportConame" name="arReportConame" placeholder="" />
			                </div>
				        </div>
				    </div>
				</div>
			</div>

		</fieldset>
	</section>
</form>
<!-- 이전페이지로 이동 -->
<div class="btn-page-bottom">
    <button class="btn-text-back" onclick="javascript:location.href='/kicpa/counselCenter/anonDeclarationStep1.do'" type="button">이전페이지로 이동</button>
</div>

<!-- 페이지하단 버튼 -->
<div class="sticky-bottom">
    <button class="btn-sticky" onclick="counselCenter.declarationStep2Validation();"type="button">등록</button>
</div>