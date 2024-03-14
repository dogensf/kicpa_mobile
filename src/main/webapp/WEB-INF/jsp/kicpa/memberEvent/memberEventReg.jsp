<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-13
  Time: 오후 4:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<script src="/js/kicpa/memberEvent/memberEventReg.js"></script>

<script>

	function fncLocation() {
		//location.href="/kicpa/main/main.do";
		$('#appExit').addClass("show");

	}

</script>

<form>


    <section class="head-main">
        <h1>회원경조사 등록 / 수정</h1>
        <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
    </section>
    <section class="content memberEvent">
        <div class="input-wrap">
            <div class="input-box">
                <div class="key">신청자</div>
                <div class="val">안윤상</div>
            </div>
            <div class="input-box">
                <div class="key">대상자</div>
                <div class="val">
                    <div class="val-box">
                        <div class="val-desc">대상자</div>
                        <input type="text" placeholder="홍길동">
                    </div>
                    <div class="val-box">
                        <div class="val-desc">등록번호</div>
                        <input type="text" placeholder="1234">
                    </div>
                    <button class="search-button">조회</button>
                </div>
            </div>
            <div class="input-box">
                <div class="key">경조내용</div>
                <div class="val">부고</div>
            </div>
            <div class="input-box">
                <div class="key">고인과의 관계</div>
                <div class="val">
                    <select name="" id="">
                        <option value="">부친상</option>
                        <option value="">모친상</option>
                        <option value="">배우자의 부친상</option>
                        <option value="">배우자의 모친상</option>
                        <option value="">본인상</option>
                        <option value="">배우자상</option>
                        <option value="">자녀상</option>
                    </select>
                    <input type="text">
                </div>
            </div>
            <div class="input-box">
                <div class="key">작고일</div>
                <div class="val"><input type="date"></div>
            </div>
            <div class="input-box">
                <div class="key">발인일</div>
                <div class="val"><input type="date"></div>
            </div>
            <div class="input-box">
                <div class="key">빈소</div>
                <div class="val"><input type="text"></div>
            </div>
            <div class="input-box">
                <div class="key">빈소 연락처</div>
                <div class="val"><input type="text"></div>
            </div>
            <div class="checkbox-box">
                <div class="label-box">
                    <label for="data1p">
                        <input type="checkbox" id="data1p">
                        <div class="label-dummy"></div>
                    </label>
                    <div class="text">조화신청</div>
                </div>
                <div class="label-box">
                    <label for="data2p">
                        <input type="checkbox" id="data2p">
                        <div class="label-dummy"></div>
                    </label>
                    <div class="text">홈페이지게시</div>
                </div>
                <div class="label-box">
                    <label for="data3p">
                        <input type="checkbox" id="data3p">
                        <div class="label-dummy"></div>
                    </label>
                    <div class="text">회계법인 이메일 통지</div>
                </div>
            </div>
            <div class="announce-box">
                <div class="text">- 조화발송은 08:00 ~ 18:00가능하며 18시 00분 이후 신청시 익일 08시 발송</div>
                <div class="text">- 글내용 수정/삭제는 최초 글등록후 30분까지만 가능</div>
            </div>
            <div class="button-box">
                <button class="save-button">등록</button>
            </div>
        </div>
    </section>
</form>