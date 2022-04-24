<%--
  Class Name : movePage.jsp
  Description : 최초화면으로 메인화면으로 이동한다.(system)
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="/js/jquery-ui.min.js"></script>
<script type="text/javaScript">

function getCookie1(Name) {
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
	if("" != getCookie1("loginIng") && null != getCookie1("loginIng")){
		if (window['bridge'] )  {
			window.bridge.userDataSave('loginIng', getCookie1("loginIng"));
		}
	}
	location.href="<c:url value='/kicpa/main/main.do'/>";
});




</script>