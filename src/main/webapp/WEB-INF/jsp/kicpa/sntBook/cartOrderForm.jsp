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
	<input type="hidden" name="P_NEXT_URL" value="http://localhost:8080/kicpa/sntBook/orderReponse.do">
	<input type="hidden" name="P_MID" value="${mid }"> <!-- 에스크로테스트 : iniescrow0, 모바일빌링(정기과금)은 별도연동필요 -->
	<input type="hidden" name="P_OID" value="">
	<input type="hidden" name="P_CHARSET" value="utf8">
	<input type="hidden" name="P_GOODS" value="도서간행물">
	<input type="hidden" name="P_AMT" value="${totalPay }">
	<input type="hidden" name="P_UNAME" value="${loginVO.name }">
	<input type="hidden" name="P_INI_PAYMENT" value="CARD">
	<input type="hidden" name="gamYn" value="${param.gamYn }">
	<input type="hidden" name="gamId" value="">
	<input type="hidden" name="emailYn" value="0">
	<section class="head-pop">
		<h3>구매</h3>
		<button class="btn-close" type="button" onclick="fncLocation();">
		    <span>닫기</span>
		</button>
	</section>

	<section class="content">

		<div class="step-box">
		    <span>장바구니/구매</span>
	        <h4>개인정보 수집 및 이용,등록</h4>
	      	<br/>
	        <div class="step-by">
	            <b>1</b> / <em>1</em>
	        </div>
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
				        <label class="label essen" for="uid">아이디</label>
				        <input type="text" id="uid" name="uid" placeholder="" disabled="disabled" value="${loginVO.id }" />
				    </div>
			       	<div class="inp-box">
				        <label class="label essen" for="recName">이름</label>
				        <input type="text" id="recName" name="recName" placeholder="성명을 입력하세요." value="${loginVO.name }" />
				    </div>
			     	<div class="inp-box">
				        <label class="label essen" for="rvZip">우편번호</label>
				        <input type="text" id="rvZip" name="rvZip" placeholder="우편번호를 압력하세요." maxlength="6" />
				    </div>
		         	<div class="inp-box">
				        <label class="label essen" for="rvAdd1">주소</label>
				        <input type="text" id="rvAdd1" name="rvAdd1" placeholder="Ex) 서울특별시 서대문구 충정로7길 12" />
				    </div>

			    	<div class="inp-box">
				        <label class="label essen" for="rvAdd3">상세주소</label>
				        <input type="text" id="rvAdd3" name="rvAdd3" placeholder="Ex) 한국공인회계사회 1층" />
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

			    	<div class="inp-box">
				        <label class="label essen" for="rvCpyName">회사명</label>
				        <input type="text" id="rvCpyName" name="rvCpyName" placeholder="회사명을 입력하세요." />
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
				        <label class="label essen" for="cpyOffZip">우편번호</label>
				        <input type="text" id="cpyOffZip" name="cpyOffZip" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyOffAddr">주소</label>
				        <input type="text" id="cpyOffAddr" name="cpyOffAddr" placeholder="회사명을 입력하세요." />
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
				        <label class="label essen" for="cpyMtrcType2">업태2</label>
				        <input type="text" id="cpyMtrcType2" name="cpyMtrcType2" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcItem1">종목1</label>
				        <input type="text" id="cpyMtrcItem1" name="cpyMtrcItem1" placeholder="회사명을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcItem2">종목2</label>
				        <input type="text" id="cpyMtrcItem2" name="cpyMtrcItem2" placeholder="회사명을 입력하세요." />
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
	    <button class="btn-sticky" onclick="sntBook.orderFormValidation();"type="button">등록</button>
	</div>

</form>