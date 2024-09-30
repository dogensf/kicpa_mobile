<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-14
  Time: 오후 2:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<script src="/js/kicpa/memberEvent/memberEventDetail.js?ver=2"></script>

<script>

    if (window['bridge'] )  {
        window.bridge.displayBottom(true);
    }

    $(document).ready(function(){
        memberEventDetail.memberEventDetailInit();
    });

    function fncLocation(){
        location.href="/kicpa/memberEvent/memberEventList.do";
    }

</script>

<form id="memberEventDetailForm" name="memberEventDetailForm">
    <input type="hidden" name="boardId" id="memberEventDetail_boardId" value="${param.boardId }">
    <input type="hidden" name="bltnNo" id="memberEventDetail_bltnNo" value="${param.bltnNo }">
    <input type="hidden" name="fileSeq">

    <section class="head-sub head-main">
        <button class="btn-back" type="button" onclick="javascript:fncLocation();">
            <span>이전</span>
        </button>
        <h3>경조사 내용보기</h3>
        <button class="btn-menu" type="button" onClick="javascript:window.bridge.showCategory();">카테고리</button>
    </section>

    <section class="content memberEvent">
        <div class="input-wrap">
            <div class="input-box">
                <input type="hidden" id="memberEventDetail_regTitle" name="regTitle"/>
                <c:if test="${boardMaster.extTitle1 eq null}">
                <div class="key">신청자</div>
                    <c:if test="${boardMaster.extTitle1 eq null}">
                        <c:if test="${boardMaster.funcYns6 eq 'N'}">
                            <c:choose>
                                <c:when test="${boardDetail.bltnTopTag ne 'N' }">
                                    <div class="val">관리자</div>
                                </c:when>
                                <c:otherwise>
                                    <div class="val">${boardDetail.userNick }</div>
                                </c:otherwise>
                            </c:choose>
                        </c:if>

                    </c:if>
                </c:if>
            </div>
            <div class="input-box">
                <div class="key">대상자</div>
                <div class="val">
                    <div class="val-box">
                        <div class="val-desc">대상자</div>
                        <input type="text" placeholder="홍길동" name="koreanNm" id="memberEventDetail_koreanNm" value="<c:out value="${boardDetail.extStr3 }"/>" readonly>
                    </div>
                    <div class="val-box">
                        <div class="val-desc">등록번호</div>
                        <input type="text" placeholder="1234" name="cpaId" id="memberEventDetail_cpaId" value="<c:out value="${boardDetail.extStr10 }"/>" readonly>
                    </div>
                    <input type="hidden" id="memberEventDetail_capSearchYn" value="Y"/>
                    <c:if test="${(boardDetail.extStr15 ne 'Y' || loginVO.userTy eq '임직원') && boardDetail.timediff <= 30}">
                        <button class="search-button" type="button" id="memberEventDetail_capSearchBtn">조회</button>
                    </c:if>
                </div>
            </div>
            <div class="input-box">
                <div class="key">경조내용</div>
                <div class="val">부고</div>
            </div>
            <div class="input-box">
                <div class="key">소속</div>
                <div class="val"><input type="text" name="regUserAgency" id="memberEventDetail_regUserAgency" value="<c:out value="${boardDetail.extStr4 }"/>"
                <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> readonly</c:if>></div>
            </div>
            <div class="input-box">
                <div class="key">고인과의 관계</div>
                <div class="val">
                    <select name="relation" id="memberEventDetail_relation" style="color: black;" <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> disabled</c:if>>
                        <option value="부친상" <c:if test="${boardDetail.extStr5 eq '부친상'}">selected</c:if> >부친상</option>
                        <option value="모친상" <c:if test="${boardDetail.extStr5 eq '모친상'}">selected</c:if>>모친상</option>
                        <option value="배우자의 부친상" <c:if test="${boardDetail.extStr5 eq '배우자의 부친상'}">selected</c:if>>배우자의 부친상</option>
                        <option value="배우자의 모친상" <c:if test="${boardDetail.extStr5 eq '배우자의 모친상'}">selected</c:if>>배우자의 모친상</option>
                        <option value="본인상" <c:if test="${boardDetail.extStr5 eq '본인상'}">selected</c:if>>본인상</option>
                        <option value="배우자상" <c:if test="${boardDetail.extStr5 eq '배우자상'}">selected</c:if>>배우자상</option>
                        <option value="자녀상" <c:if test="${boardDetail.extStr5 eq '자녀상'}">selected</c:if>>자녀상</option>
                    </select>

                    <c:if test="${loginVO.userTy eq '임직원' || boardDetail.extStr16 eq loginVO.id || boardDetail.extStr16 eq di}">
                        <input type="text" value="<c:out value="${boardDetail.extStr11 }"/>" name="children" id="memberEventDetail_children" <c:if test="${boardDetail.extStr5 ne '자녀상'}">style="display:none;"</c:if>
                        <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> readonly</c:if>>
                    </c:if>

                </div>
            </div>
            <div class="input-box">
                <div class="key">작고일</div>
                <div class="val"><input style="text-align: left;" type="date" name="deaDate" id="memberEventDetail_deaDate" value="<c:out value="${boardDetail.extStr6Dd }"/>"
                <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> onclick="return false;"</c:if>></div>
            </div>
            <div class="input-box">
                <div class="key">발인일</div>
                <div class="val"><input style="text-align: left;" type="date" name="burialDt" id="memberEventDetail_burialDt" value="<c:out value="${boardDetail.extStr9Dd }"/>"
                <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}">onclick="return false;" </c:if>></div>
            </div>
            <div class="input-box">
                <div class="key">빈소</div>
                <div class="val"><input type="text" name="mortuary" id="memberEventDetail_mortuary" value="<c:out value="${boardDetail.extStr7 }"/>"
                <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> readonly</c:if>></div>
            </div>
            <div class="input-box">
                <div class="key">빈소 연락처</div>
                <div class="val"><input type="text" name="phoneNumber" id="memberEventDetail_phoneNumber" value="<c:out value="${boardDetail.extStr8 }"/>"
                <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> readonly</c:if>></div>
            </div>

            <c:if test="${loginVO.userTy eq '임직원' || boardDetail.extStr16 eq loginVO.id || boardDetail.extStr16 eq di}">
                <div class="checkbox-box">
                    <div class="label-box">
                        <label for="memberEventDetail_flowerYn">
                            <input type="checkbox" name="flowerYn" id="memberEventDetail_flowerYn" value="Y" <c:if test="${boardDetail.extStr12 eq 'Y'}">checked</c:if>
                            <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> onclick="return false;" </c:if>>
                            <div class="label-dummy"></div>
                        </label>
                        <div class="text">조화신청</div>
                    </div>
                    <div class="label-box">
                        <label for="memberEventDetail_homepageYn">
                            <input type="checkbox" name="homepageYn" id="memberEventDetail_homepageYn" value="Y" <c:if test="${boardDetail.extStr14 eq 'Y'}">checked</c:if>
                            <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> onclick="return false;" </c:if>>
                            <div class="label-dummy"></div>
                        </label>
                        <div class="text">홈페이지게시</div>
                    </div>
                    <div class="label-box">
                        <label for="memberEventDetail_mailYn">
                            <input type="checkbox" name="mailYn" id="memberEventDetail_mailYn" value="Y" <c:if test="${boardDetail.extStr13 eq 'Y'}">checked</c:if>
                            <c:if test="${(boardDetail.extStr15 eq 'Y' && loginVO.userTy ne '임직원') || boardDetail.timediff > 30}"> onclick="return false;" </c:if>>
                            <div class="label-dummy"></div>
                        </label>
                        <div class="text">회계법인 이메일 통지</div>
                    </div>
                </div>
            </c:if>

            <div class="announce-box">
                <div class="text">- 조화발송은 08:00 ~ 18:00가능하며 18시 00분 이후 신청시 익일 08시 발송</div>
                <div class="text">- 글내용 수정/삭제는 최초 글등록후 30분까지만 가능</div>
            </div>
            <div class="button-box">
                <button class="list" type="button" style="width: calc((100% - 24px)/4);" id="memberEventDetail_list">목록</button>
                <button class="list" type="button" style="width: calc((100% - 24px)/4);" id="memberEventDetail_copy">내용복사</button>

                <button class="send" type="button" id="memberEventDetail_mailSend" <c:if test="${loginVO.userTy ne '임직원'}">style="visibility: hidden; width: calc((100% - 24px)/4);"</c:if>>메일발송</button>
                <button class="send" type="button" id="memberEventDetail_flowerSend" <c:if test="${loginVO.userTy ne '임직원'}">style="visibility: hidden; width: calc((100% - 24px)/4);"</c:if>>화환발송</button>


                <c:if test="${(boardDetail.extStr15 ne 'Y' || loginVO.userTy eq '임직원') && boardDetail.timediff <= 30}">
                    <button class="save-button" type="button" id="memberEventDetail_save">수정</button>
                    <button class="del-button" type="button" id="memberEventDetail_delete">삭제</button>
                </c:if>

            </div>
        </div>
    </section>
</form>