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

<script src="/js/kicpa/memberEvent/memberEventReg.js?ver=2"></script>

<script>

    if (window['bridge'] )  {
        window.bridge.displayBottom(false);
    }
    $(document).ready(function(){
        memberEventReg.memberEventRegInit();
    });


    function fncLocation(){
        window.close();
    }

</script>

<form id="memberEventRegForm" name="memberEventRegForm">
    <input type="hidden" name="pageIndex" id="pageIndex" value="1">
    <input type="hidden" name="boardId" id="boardId" value="mstate">
    <input type="hidden" name="loginYn" id="loginYn" value="Y">
    <input type="hidden" name="returnUrl" id="returnUrl" value="">

    <section class="head-main">
        <h1>회원경조사 등록 / 수정</h1>
        <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
    </section>
    <section class="content memberEvent">
        <div class="input-wrap">
            <div class="input-box">
                <input type="hidden" id="memberEventReg_regTitle" name="regTitle"/>
                <div class="key">신청자</div>
                <c:if test="${cpaMemInfo[0].koreanNm ne '' && cpaMemInfo[0].koreanNm ne null && name eq null}"><div class="val">${cpaMemInfo[0].koreanNm}</div></c:if>
                <c:if test="${name ne '' && name ne null && cpaMemInfo[0].koreanNm eq null}"><div class="val">${name}</div></c:if>
            </div>
            <div class="input-box">
                <div class="key">대상자</div>
                <div class="val">
                    <div class="val-box">
                        <div class="val-desc">대상자</div>
                        <input type="text" placeholder="홍길동" name="koreanNm" id="memberEventReg_koreanNm" value="${cpaMemInfo[0].koreanNm}">
                    </div>
                    <div class="val-box">
                        <div class="val-desc">등록번호</div>
                        <input type="text" placeholder="1234" name="cpaId" id="memberEventReg_cpaId" value="${cpaMemInfo[0].cpaId}">
                    </div>
                    <input type="hidden" id="memberEventReg_capSearchYn" <c:if test="${cpaMemInfo[0].cpaId ne '' && cpaMemInfo[0].cpaId ne null}">value="Y"</c:if>/>
                    <button class="search-button" type="button" id="memberEventReg_capSearchBtn">조회</button>
                </div>
            </div>
            <div class="input-box">
                <div class="key">경조내용</div>
                <div class="val">부고</div>
            </div>
            <div class="input-box">
                <div class="key">고인과의 관계</div>
                <div class="val">
                    <select name="relation" id="memberEventReg_relation" style="color: black;">
                        <option value="">선택하세요.</option>
                        <option value="부친상">부친상</option>
                        <option value="모친상">모친상</option>
                        <option value="배우자의 부친상">배우자의 부친상</option>
                        <option value="배우자의 모친상">배우자의 모친상</option>
                        <option value="본인상">본인상</option>
                        <option value="배우자상">배우자상</option>
                        <option value="자녀상">자녀상</option>
                    </select>
                    <input type="text" name="children" id="memberEventReg_children" placeholder="자녀이름 입력" style="display: none;">
                </div>
            </div>
            <div class="input-box">
                <div class="key">작고일</div>
                <div class="val"><input type="date" name="deaDate" id="memberEventReg_deaDate"></div>
            </div>
            <div class="input-box">
                <div class="key">발인일</div>
                <div class="val"><input type="date" name="burialDt" id="memberEventReg_burialDt"></div>
            </div>
            <div class="input-box">
                <div class="key">빈소</div>
                <div class="val"><input type="text" name="mortuary" id="memberEventReg_mortuary"></div>
            </div>
            <div class="input-box">
                <div class="key">빈소 연락처</div>
                <div class="val"><input type="text" name="phoneNumber" id="memberEventReg_phoneNumber"></div>
            </div>
            <div class="checkbox-box">
                <div class="label-box">
                    <label for="memberEventReg_flowerYn">
                        <input type="checkbox" name="flowerYn" id="memberEventReg_flowerYn" value="Y">
                        <div class="label-dummy"></div>
                    </label>
                    <div class="text">조화신청</div>
                </div>
                <div class="label-box">
                    <label for="memberEventReg_homepageYn">
                        <input type="checkbox" name="homepageYn" id="memberEventReg_homepageYn" value="Y">
                        <div class="label-dummy"></div>
                    </label>
                    <div class="text">홈페이지게시</div>
                </div>
                <div class="label-box">
                    <label for="memberEventReg_mailYn">
                        <input type="checkbox" name="mailYn" id="memberEventReg_mailYn" value="Y">
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
                <button class="save-button" type="button" id="memberEventReg_save">등록</button>
            </div>

            <input type="hidden" id="memberEventReg_di" name="immDi" value="${di}"/>
            <input type="hidden" id="memberEventReg_name" name="diName" value="${name}"/>
        </div>
    </section>
</form>