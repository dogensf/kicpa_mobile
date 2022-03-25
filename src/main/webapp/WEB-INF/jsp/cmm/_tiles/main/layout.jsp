<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles"  prefix="tiles"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
    	<tiles:insertAttribute name="head"/>
	</head>
<!--begin::Body-->
<script type="text/javascript">

function onBackKey(){
	//window.bridge.stopApp();
	/* if (!!window.opener) {
		if ( history.length > 1 ) {
			history.back();
		}
		else {
			window.close();
		}
	}
	else{
		if (document.referrer=='${url}') {
			window.bridge.displayBottom(true)
			
		}
		//history.back();
		
	} */
	$('#appExit').addClass("show");
}
</script>
	<body>
        <div class="wrap">
            <div class="container main">
            	<tiles:insertAttribute name="header"/>
            	<tiles:insertAttribute name="body"/>
				<tiles:insertAttribute name="footer"/>
            </div>
        </div>
        <!-- 하단 레이어 팝업 / 활성화시 show -->
	 <div class="layer-popup-wrap" id="appExit">
	     <div class="layer-container">
	         <div class="title-box">
	             <h2>종료 하시겠습니까?</h2>
	         </div>
	
	        <!--  <div class="layer-content">
	             <div class="gray-box">               
	             </div>
	         </div> -->
	
	         <div class="layer-bottom">
	
	             <em class="text-gray"></em>
	
	             <div class="layer-bottom">
	                 <div class="btn-bottom">
	                     <button class="btn-round" type="button" onClick="javascript:$('#appExit').removeClass('show');">취소</button>
	                     <button class="btn-round fill" type="button" onClick="javascript:window.bridge.stopApp();">종료</button>
	                 </div>
	             </div>
	         </div>
	     </div>
	 </div>
    </body>
</html>
