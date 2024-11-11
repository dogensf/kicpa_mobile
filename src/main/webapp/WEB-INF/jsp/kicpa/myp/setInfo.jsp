<%--
  Class Name : myPage.jsp
  Description : 마이페이지
  Modification Information
 
        수정일             수정자                   수정내용
    -------    --------    ---------------------------     
    2021.11.01   KIK          최초 생성
    
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<c:set var="ImgUrl" value="/images/"/>
<script>
function fncLocation(){
	window.close();
}
</script>
<body>
		<div class="wrap">
			<div class="container">
				<!-- 헤더 -->
				<section class="head-sub">
                    <button class="btn-back" type="button"  onclick="javascript:fncLocation();">
                        <span>이전</span>
                    </button>
                    <h3>설정</h3>
                </section>

				<section class="content">

					<div class="mypage-wrap">
						<div class="set-box">
							<h5>버전 정보</h5>
							<div class="img-app">
								<img src="<c:url value='/images/app.png'/>" alt="KICPA_APP" />
							</div>
							<ul class="ver-list">
								<li>현재버전 ${ver.cur}</li>
								<li class="latest">최신버전 ${ver.cur}</li>
							</ul>
							<div class="btn-area">
								<button type="button" disabled class="btn-primary">
									최신버전입니다.
								</button>
							</div>
						</div>
						
						<%--<div class="set-box">
							<h5>알림</h5>
							<ul class="set-notify">
								<li>
									<span>알림받기</span>
									<div>
										<input type="checkbox" id="set01" class="switch" name="setup01">
  										<label for="set01"></label>
									</div>
								</li>	
								<!-- <li>
									<span>PUSH</span>
									<div>
										<input type="checkbox" id="set02" class="switch" name="setup02">
  										<label for="set02"></label>
									</div>
								</li> -->	
							</ul>
						</div>--%>
					</div>

				</section>

			</div>
		</div>
	</body>
</html>