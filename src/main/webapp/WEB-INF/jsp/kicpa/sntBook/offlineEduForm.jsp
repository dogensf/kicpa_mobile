<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="/js/kicpa/sntBook/sntBook.js"></script>
<script>

$(document).ready(function(){
	sntBook.orderFormInit();
});

function fncLocation(){
	location.href="/kicpa/main/main.do";
}

function pay0(){
	 myform = document.mobileweb;
	 myform.action = "https://mobile.inicis.com/smart/payment/";
	 myform.target = "_self";
	 myform.submit();
}
</script>
<form name="mobileweb" id="mobileweb" method="post" accept-charset="euc-kr">
	<input type="hidden" name="P_NEXT_URL" value="https://mkip.kicpa.or.kr/kicpa/sntBook/orderOfflineEduReponse.do">
	<input type="hidden" name="P_MID" value="${mid }"> <!-- 에스크로테스트 : iniescrow0, 모바일빌링(정기과금)은 별도연동필요 -->
	<input type="hidden" name="P_OID" value="${P_OID}">
	<input type="hidden" name="P_CHARSET" value="utf8">
	<input type="hidden" name="P_GOODS" value="<c:out value="${detail.wtitle }"/>">
	<input type="hidden" name="P_AMT" value="${totalPay }">
	<input type="hidden" name="P_UNAME" value="${loginVO.name }">
	<input type="hidden" name="P_INI_PAYMENT" value="CARD">
	<input type="hidden" name="P_TIMESTAMP" value="${P_TIMESTAMP}">
	<input type="hidden" name="P_CHKFAKE" value="${P_CHKFAKE}">
	<input type="hidden" name="gamYn" value="N">
	<input type="hidden" name="gamId" value="">
	<input type="hidden" name="emailYn" value="0">
	<input type="hidden" name="bookDiv" value="5">
	<input type="hidden" name="bookCnt" value="1">
	<input type="hidden" name="idNum" id="idNum" value="${param.idNum }">
	<section class="head-pop">
		<h3>수강신청</h3>
		<button class="btn-close" type="button" onclick="fncLocation();">
		    <span>닫기</span>
		</button>
	</section>

	<section class="content">

		<div class="step-box">
		    <span>수강신청</span>
	        <h4><c:out value="${detail.wtitle }"/> </h4>
	    </div>

		<fieldset>
	                            <!-- 섹션1 -->
			<div class="add-box">
				<div class="title">
					<span>약관동의</span>
		        </div>

				<div class="form">
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
		   		</div>
			</div>
		   	<div class="add-box">
				<div class="title">
					<span>개인정보</span>
		        </div>
		        <div class="form">
			       	<div class="inp-box">
				        <label class="label essen" for="recName">성명</label>
				        <input type="text" id="rvName" name="rvName" placeholder="성명을 입력하세요." value="${loginVO.name }" />
				    </div>
			    	<div class="inp-box">
				        <label class="label essen" for="rvCpyName">회사명</label>
				        <input type="text" id="rvCpyName" name="rvCpyName" placeholder="회사명을 입력하세요." />
				    </div>

		    	    <div class="inp-box">
				        <label class="label essen" for="etc">전화번호</label>
				        <div class="phone">
				            <input type="text" id="telNo1" name="telNo1" maxlength="3" placeholder="02" />
				            <input type="text" id="telNo2" name="telNo2" maxlength="4" />
				            <input type="text" id="telNo3" name="telNo3" maxlength="4" />
				        </div>
				    </div>
		    	    <div class="inp-box">
				        <label class="label essen" for="etc">핸드폰</label>
				        <div class="phone">
				            <input type="text" id="hpNo1" name="hpNo1" maxlength="3" placeholder="010" />
				            <input type="text" id="hpNo2" name="hpNo2" maxlength="4" />
				            <input type="text" id="hpNo3" name="hpNo3" maxlength="4" />
				        </div>
				    </div>

			    	<div class="inp-box">
				        <label class="label essen" for="email">이메일</label>
				        <input type="text" id="email" name="email" placeholder="이메일을 입력하세요." ${loginVO.email } />
				    </div>

				</div>
			</div>

	       <!-- 섹션2 -->
	       	<div class="add-box">
				<div class="title">
	               <span>결제정보</span>
	           	</div>

	          	<div class="form">
	          		<div class="inp-box">
				        <label class="label essen" for="arEmail">합계금액</label>
				        <input type="text" id="payTotalAmt" name="payTotalAmt" disabled="disabled" value="<fmt:formatNumber value="${totalPay }" pattern="#,###"/>"/>
				    </div>


	          		<div class="inp-box">
			       		<div class="label essen">결제정보</div>
			        		<div class="inp-set">
			            	<div class="inp-check">
			                	<input type="radio" name="payCode" id="payCard" value="1" checked="checked" />
			                	<label for="payCard">신용카드결제</label>
			            	</div>
			            	<div class="inp-check">
			                	<input type="radio" name="payCode" id="payBank" value="2" />
			                	<label for="payBank">자동이체</label>
			            	</div>
			        	</div>
			  		</div>

	           </div>
	      	</div>
	       	<div class="add-box tax" style="display: none;">
			   	<div class="title">
					<span>계산서</span>
	          	</div>

				<div class="form">
			        <div class="inp-box">
		            	<div class="label essen">세금계산서</div>
			        		<div class="inp-set">
			            	<div class="inp-check">
			                	<input type="radio" name="cpyId" id="cpyId1" value="1" />
			                	<label for="cpyId1">발행</label>
			            	</div>
			            	<div class="inp-check">
			                	<input type="radio" name="cpyId" id="cpyId2" value="0" checked="checked" />
			                	<label for="cpyId2">미발행</label>
			            	</div>
			        	</div>
	               	</div>
				</div>
			</div>
	       	<div class="add-box company" style="display: none;">
			   	<div class="title">
					<span>사업자등록증 정보입력</span>
	          	</div>
	       	 	<div class="terms_box">
	            	* 계산서를 신청하신 경우 위에 등록하신 메일로 발송되오니, 메일을 확인하시기 바랍니다.
	            </div>

				<div class="form">
		       		<div class="inp-box">
				        <label class="label essen" for="mtrcCompanyId">등록번호</label>
				        <input type="text" id="mtrcCompanyId" name="mtrcCompanyId" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcCompanyName">법인명(단체명)</label>
				        <input type="text" id="cpyMtrcCompanyName" name="cpyMtrcCompanyName" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcRepreName">대표자</label>
				        <input type="text" id="cpyMtrcRepreName" name="cpyMtrcRepreName" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyOffAddr">주소</label>
				        <input type="text" id="cpyOffAddr" name="cpyOffAddr" readonly="readonly" onclick="sntBook.daumPostcode('company');" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyOffAddr1">상세주소</label>
				        <input type="text" id="cpyOffAddr1" name="cpyOffAddr1" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcType1">업태1</label>
				        <input type="text" id="cpyMtrcType1" name="cpyMtrcType1" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcItem1">종목1</label>
				        <input type="text" id="cpyMtrcItem1" name="cpyMtrcItem1" placeholder="회사명을 입력하세요." />
				    </div>
				</div>
			</div>

		</fieldset>
	</section>


	<!-- 이전페이지로 이동 -->
	<div class="btn-page-bottom">
	    <button class="btn-text-back" onclick="javascript:location.href='/kicpa/counselCenter/anonDeclarationStep1.do'" type="button">이전페이지로 이동</button>
	</div>

	<!-- 페이지하단 버튼 -->
	<div class="sticky-bottom">
	    <button class="btn-sticky" onclick="sntBook.orderFormValidation2();"type="button">등록</button>
	</div>

</form>