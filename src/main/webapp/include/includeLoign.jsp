<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>



<div class="login-guide" style="display: none;">
	<div class="ment">로그인이 필요한 서비스입니다.</div>

	<div class="btn-area">
		<button class="btn-primary" type="button" onclick="javascript:location.href='/uat/uia/LoginUsr.do';">로그인</button>
	</div>

	<p>
		등록은 KICPA 한국공인회계사회<br />
		홈페이지(<a href="https://www.kicpa.or.kr/" target="_blank">www.kicpa.or.kr</a>)에서 가입하시기 바랍니다.
	</p>
</div>