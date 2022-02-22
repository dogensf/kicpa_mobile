<%--
  Class Name : EgovIncHeader.jsp
  Description : 화면상단 Header (include)
  Modification Information

      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2011.08.31   JJY       경량환경 버전 생성

    author   : 실행환경개발팀 JJY
    since    : 2011.08.31
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!--begin::Footer-->
<section class="link-url">
	<a href="#" target="_blank">회계연수원</a>
 	<a href="#" target="_blank">AT자격시험</a>
	<a href="#" target="_blank">조세지원센터</a>
	<a href="#" target="_blank">Youtube</a>
	<a href="#" target="_blank">회원용 email</a>
	<a href="#" target="_blank">PC버전 </a>
 </section>

<footer>
	<address>
	  	<span>
	    	서울특별시 서대문구 충정로7길 12 (충정로 2가) 한국공인회계사회
	  	</span>
	  	<span>TEL : 02-3149-0100</span>
	  	<span class="between-line">
	    	<a href="#">개인정보처리방침</a>
	   		 <a href="#">이용약관</a>
	  	</span>
	  	<span>COPYRIGHT (C) KICPA, ALL RIGHTS RESERVED.</span>
	</address>
</footer>

<script>
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});
</script>
<!--end::Footer-->
