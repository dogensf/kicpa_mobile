<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/introduction/introduction.js"></script>
<script>

    function fncLocation(){
        location.href="/kicpa/main/main.do";
    }

</script>


<section class="head-sub">
    <button class="btn-back" type="button" onclick="fncLocation();">
        <span>이전</span>
    </button>
    <h3>공인회계사회 소개</h3>
</section>

<section class="content">
    <div class="tab-main">
        <a class="tab-link " href="/kicpa/introduction/greetings.do">
            <span>인사말</span>
        </a>
        <a class="tab-link active" href="javascript:void(0);">
            <span>미션/비전</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/vision.do">
            <span>CI소개</span>
        </a>
        <a class="tab-link" href="/kicpa/introduction/boardList.do">
            <span>회무보고</span>
        </a>
    </div>

    <div id="tabMain1" class="tab-main-content show">
        <div class="info-page">
            <img src="../../../../images/vision/vision_2024_f.jpg" alt="mission&vision">
        </div>
    </div><!-- //tabMain1 -->
</section>