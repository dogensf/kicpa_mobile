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
	if( typeof fncLocation == 'function' ) {
		fncLocation();
	}
}

function logOut(){
	if (window['bridge'] )  {
		document.cookie = "loginIng=" + escape ('') + "; path=/; expires=0";
		window.bridge.userDataSave('loginIng', '');
		window.bridge.userDataRemove('loginIng');
	}
	location.href='<c:url value='/uat/uia/actionLogout.do'/>';
	
}

function getCookies(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        offset = document.cookie.indexOf(search)
        if (offset != -1) { // 쿠키가 존재하면
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset)
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1)
                end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
    }
    return "";
}
$(document).ready(function(){
	//alert(getCookie("loginIng"));
	if("" != getCookies("loginIng") && null != getCookies("loginIng")){
		if (window['bridge'] )  {
			window.bridge.userDataSave('loginIng', getCookies("loginIng"));
		}
	}

});
</script>
	<body>
        <div class="wrap">
            <div class="container">
<%--             	<tiles:insertAttribute name="header"/> --%>
            	<tiles:insertAttribute name="body"/>
				<tiles:insertAttribute name="footer"/>
				<tiles:insertAttribute name="popup"/>
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
