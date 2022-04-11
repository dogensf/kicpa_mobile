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
			<c:choose>
       			<c:when test="${param.gamYn eq 'Y' }">
       				<span>회계법인으로 구매</span>
       			</c:when>
       			<c:otherwise>
				    <span>장바구니/구매</span>
       			</c:otherwise>
     		</c:choose>
	        <h4>개인정보 수집 및 이용,등록</h4>
	      	<br/>
	        <div class="step-by">
	        	<c:choose>
		        	<c:when test="${param.gamYn eq 'Y' }">
			            <b>2</b> / <em>2</em>
	    	    	</c:when>
	    	    	<c:otherwise>
			            <b>1</b> / <em>1</em>
	    	    	</c:otherwise>
	        	</c:choose>
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
		                1. 개인정보의 수집목적 및 이용목적<br/>
						본회는 홈페이지 메뉴중 방명록, 구인정보, 윤리신고센터, 건의사항, 회원경조사의 보다 건전하고
						합리적인 운영을 위하여 인터넷회원가입을 통해 개인정보를 수집하는 것이며, 제공받은 개인정보
						는 본인여부의 확인 및 기타 통신연락 수단으로 이용합니다.<br/>
						2. 개인정보 수집 항목<br/>
						본회는 인터넷 회원가입, 도서구매, 연수신청, 민원 처리 등을 위해 필수정보 및 선택정보를 아래와
						같이 수집하고 있습니다.<br/>
						•필수수집항목 : 성명, 실명인증값(아이핀 회원은 아이핀번호), 아이디, 비밀번호, 전자메일<br/>
						•선택수집항목 : 전화번호, 휴대폰, 직업, 메일수신여부, 정보공개여부<br/>
						※ 선택수집항목의 정보 미입력시 일부서비스 제한 및 불이익이 발생할 수도 있으며, 이에 대한 책
						임은 가입 당사자에게 있습니다.<br/>
						3. 개인정보의 보유기간<br/>
						인터넷회원의 개인정보는 인터넷회원으로 가입하고 있는 동안은 본회에서 계속 보유합니다.<br/>
						회원 탈퇴를 요청하거나 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적
						이 달성되거나 보유 및 이용기간이 종료한 경우 해당 개인정보를 지체 없이 파기합니다.<br/>
						다만, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 본회는 아래와 같이 관계법령에서 정한
						일정한 기간 동안 회원정보를 보관합니다.<br/>
						•서비스 이용기록, 접속로그, 접속 정보 : 3개월(통신비밀보호법)<br/>
						•대금결제 및 재화 등의 공급에 관한 기록 : 5년(전자상거래등에서의 소비자보호에 관한 법률)<br/>
						4.자신의 개인정보 열람, 정정 및 신청해지<br/>
						인터넷회원은 등록되어 있는 본인의 개인정보를 열람 및 정정을 요청할 수 있으며, 본회의 개인정
						보의 처리에 동의하지 않는 경우 동의를 거부하거나 신청해지를 요청하실 수 있습니다. 다만, 그러
						한 경우 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.<br/>
						개인정보와 관련하여 불만이나 의견이 있으신 분은 웹마스터에게 메일(webhelper@kicpa.or.kr) 또
						는 전화(02-3149-0221)로 의견을 주시면 접수 즉시 조치하고 처리결과를 통보해 드리겠습니다.
		                </div>
		            </div>
		   		</div>
			</div>
		   	<div class="add-box">
				<div class="title">
					<span>개인정보</span>
		        </div>
		        <div class="form">

		        	<c:if test="${param.gamYn eq 'N' }">
				   		<div class="inp-box">
					        <label class="label essen" for="uid">아이디</label>
					        <input type="text" id="uid" name="uid" placeholder="" disabled="disabled" value="${loginVO.id }" />
					    </div>
		        	</c:if>

					<c:choose>
						<c:when test="${param.gamYn eq 'N' }">
					       	<div class="inp-box">
						        <label class="label essen" for="rvName">이름</label>
						        <input type="text" id="rvName" name="rvName" placeholder="성명을 입력하세요." readonly="readonly" value="${loginVO.name }" />
						    </div>
						</c:when>
						<c:otherwise>
							<div class="inp-box">
						        <label class="label essen" for="userName">이름</label>
						        <input type="text" id="userName" name="userName" placeholder="성명을 입력하세요." value="" />
						    </div>
						</c:otherwise>
					</c:choose>

				    <c:if test="${param.gamYn eq 'N' }">
				     	<div class="inp-box">
					        <label class="label essen" for="rvZip">우편번호</label>
					        <input type="text" id="rvZip" name="rvZip" placeholder="우편번호를 압력하세요." readonly="readonly" onclick="sntBook.daumPostcode('cart');" maxlength="6" />
					    </div>
			         	<div class="inp-box">
					        <label class="label essen" for="rvAdd1">주소</label>
					        <input type="text" id="rvAdd1" name="rvAdd1" readonly="readonly" onclick="sntBook.daumPostcode('cart');" placeholder="Ex) 서울특별시 서대문구 충정로7길 12" />
					    </div>

				    	<div class="inp-box">
					        <label class="label essen" for="rvAdd3">상세주소</label>
					        <input type="text" id="rvAdd3" name="rvAdd3" placeholder="Ex) 한국공인회계사회 1층" />
					    </div>
					</c:if>
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

				  	<c:if test="${param.gamYn eq 'N' }">
				    	<div class="inp-box">
					        <label class="label essen" for="rvCpyName">회사명</label>
					        <input type="text" id="rvCpyName" name="rvCpyName" placeholder="회사명을 입력하세요." />
					    </div>
				    </c:if>
				</div>
			</div>

			<c:if test="${param.gamYn eq 'Y' }">
				<div class="add-box">
					<div class="title">
						<span>회계법인 신청</span>
			        </div>
			        <div class="form">
				   		<div class="inp-box">
					        <label class="label essen" for="uid">회계법인선택</label>
					        <button type="button" id="searchCompanyBtn"class="btn-round-sm">선택</button>
					    </div>

					</div>
				</div>
				<div class="add-box">
					<div class="title">
						<span>받는곳</span>
			        </div>
			        <div class="form">
				   		<div class="inp-box">
					        <label class="label essen" for="rvName">받는분 성함</label>
					        <input type="text" id="rvName" name="rvName" placeholder="성명을 입력하세요." value="" />
					    </div>

					    <div class="inp-box">
					        <label class="label essen" for="rvCpyName">회사명</label>
					        <input type="text" id="rvCpyName" name="rvCpyName" placeholder="회사명을 입력하세요." />
					    </div>
						<div class="inp-box">
					        <label class="label essen" for="rvZip">우편번호</label>
					        <input type="text" id="rvZip" name="rvZip" placeholder="우편번호를 압력하세요." readonly="readonly" onclick="sntBook.daumPostcode('cart');" maxlength="6" />
					    </div>
			         	<div class="inp-box">
					        <label class="label essen" for="rvAdd1">주소</label>
					        <input type="text" id="rvAdd1" name="rvAdd1" readonly="readonly" onclick="sntBook.daumPostcode('cart');" placeholder="Ex) 서울특별시 서대문구 충정로7길 12" />
					    </div>
					</div>
				</div>
	       	</c:if>

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
				        <input type="text" id="mtrcCompanyId" name="mtrcCompanyId" placeholder="등록번호를 입력하세요" />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcCompanyName">법인명(단체명)</label>
				        <input type="text" id="cpyMtrcCompanyName" name="cpyMtrcCompanyName" placeholder="법인명(단체명)을 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcRepreName">대표자</label>
				        <input type="text" id="cpyMtrcRepreName" name="cpyMtrcRepreName" placeholder="대표자를 입력하세요." />
				    </div>
<!-- 		       		<div class="inp-box"> -->
<!-- 				        <label class="label essen" for="cpyOffZip">우편번호</label> -->
<!-- 				        <input type="text" id="cpyOffZip" name="cpyOffZip" readonly="readonly" onclick="sntBook.daumPostcode('company');"  placeholder="회사명을 입력하세요." /> -->
<!-- 				    </div> -->
		       		<div class="inp-box">
				        <label class="label essen" for="cpyOffAddr">주소</label>
<!-- 				        <input type="text" id="cpyOffAddr" name="cpyOffAddr" readonly="readonly" onclick="sntBook.daumPostcode('company');"  placeholder="회사명을 입력하세요." /> -->
				        <input type="text" id="cpyOffAddr" name="cpyOffAddr"  placeholder="주소를입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyOffAddr1">상세주소</label>
				        <input type="text" id="cpyOffAddr1" name="cpyOffAddr1" placeholder="상세주소를 입력하세요." />
				    </div>
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcType1">업태1</label>
				        <input type="text" id="cpyMtrcType1" name="cpyMtrcType1" placeholder="업태을 입력하세요." />
				    </div>
<!-- 		       		<div class="inp-box"> -->
<!-- 				        <label class="label essen" for="cpyMtrcType2">업태2</label> -->
<!-- 				        <input type="text" id="cpyMtrcType2" name="cpyMtrcType2" placeholder="회사명을 입력하세요." /> -->
<!-- 				    </div> -->
		       		<div class="inp-box">
				        <label class="label essen" for="cpyMtrcItem1">종목1</label>
				        <input type="text" id="cpyMtrcItem1" name="cpyMtrcItem1" placeholder="종목명을 입력하세요." />
				    </div>
<!-- 		       		<div class="inp-box"> -->
<!-- 				        <label class="label essen" for="cpyMtrcItem2">종목2</label> -->
<!-- 				        <input type="text" id="cpyMtrcItem2" name="cpyMtrcItem2" placeholder="회사명을 입력하세요." /> -->
<!-- 				    </div> -->
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