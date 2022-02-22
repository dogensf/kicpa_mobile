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
	<body>
        <div class="wrap">
            <div class="container">
<%--             	<tiles:insertAttribute name="header"/> --%>
            	<tiles:insertAttribute name="body"/>
				<tiles:insertAttribute name="footer"/>
				<tiles:insertAttribute name="popup"/>
            </div>
        </div>
    </body>
</html>
