<%--
  Class Name : regQna.jsp
  Description : 문의접수등록
  Modification Information
 
        수정일             수정자                   수정내용
    -------    --------    ---------------------------     
    2021.11.01   KIK          최초 생성
    
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ImgUrl" value="/images/"/>
<!DOCTYPE>
<html>
<head>
<meta charset="UTF-8">
<title>MYPAGE</title>
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/jquery-ui.min.css"/>" />

<!-- css :: Start -->
<link href="<c:url value='/'/>css/kicpa/myp/myPage.css" rel="stylesheet" type="text/css" />
<!-- css :: End -->
<!-- script :: Start -->
<script src="<c:url value='/'/>js/jquery.min.js"></script>
<script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
<script src="<c:url value='/'/>js/kicpa/stringHelper.js"></script>
<script src="<c:url value='/'/>js/kicpa/myp/myPage.js?ver=1"></script>
<script src="<c:url value='/'/>js/KicpaCommon.js"></script>
<!-- script :: End -->
</head>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title">마이페이지</h1>

      <%--합격자 정보--%>
      <div class="my-page-table1">
        <table class="tb-bg">
          <colgroup>
            <col style="width:100%" />
          </colgroup>
          <thead>
            <tr>
              <th>
                기본정보
                <button type="button" class="tb-button1" id="myPageRsumPop_openBtn">이력서 관리</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="content-table4">
                  <div class="picture">
                    <c:if test="${trainFlag ne 'N'}">
                    <div class="title" style="margin: 0; padding: 0 0 10px 0;">
                      사진 변경 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaTrainReg.do?movePage=mypCpaTrainReg_pictInfo&pin=${myPagePin}'">setting</button>
                    </div>
                    </c:if>
                    <c:if test="${cpaPassMberPhotoRealInfo[0].atchFileId !='' && cpaPassMberPhotoRealInfo[0].atchFileId != null}">
                      <img id="cpaPassRegistgetImg" src='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${cpaPassMberPhotoRealInfo[0].atchFileId}"/>&fileSn=<c:out value="0"/>' height="230" width="200"/>
                    </c:if>
                    <c:if test="${cpaPassMberPhotoRealInfo[0].atchFileId =='' || cpaPassMberPhotoRealInfo[0].atchFileId == null}">
                      <img src="<c:url value='/'/>images/img_user-placeholder.png" alt="" width="200">
                    </c:if>
                    <%--<img src="<c:url value='/'/>images/img_dummy1.png" alt="">--%>
                  </div>
                  <div class="content-table-inner">
                    <table>
                      <colgroup>
                        <col style="width: 15%;" />
                        <col style="width: 22%;" />
                        <col style="width: 25%;" />
                        <col style="width: 24%;" />
                        <col style="width: 25%;" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <td>
                            <div class="title">
                              성명 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaPassReg.do?movePage=mypCpaPassReg_passInfo&pin=${myPagePin}'">setting</button>
                            </div>
                            <ul class="cont">
                              <li>${cpaPassRealInfo[0].koreanNm}</li>
                              <li>${cpaPassRealInfo[0].engNm}</li>
                              <li>${cpaPassRealInfo[0].chcrtNm}</li>
                            </ul>
                          </td>
                          <td>
                            <div class="title">
                              자택 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaPassReg.do?movePage=mypCpaPassReg_adressInfo&pin=${myPagePin}'">setting</button>
                            </div>
                            <ul class="cont">
                              <li></li>
                              <li>${cpaPassHusAeresRealInfo[0].zipCd}</li>
                              <li>${cpaPassHusAeresRealInfo[0].rdAdres}, ${cpaPassHusAeresRealInfo[0].rdAdresDetail}</li>
                            </ul>
                          </td>
                          <td>
                            <div class="title">
                              사무실 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaPassReg.do?movePage=mypCpaPassReg_adressInfo&pin=${myPagePin}'">setting</button>
                            </div>
                            <ul class="cont">
                              <li>${cpaPassOfcAeresRealInfo[0].zipCd}</li>
                              <li>${cpaPassOfcAeresRealInfo[0].rdAdres}, ${cpaPassOfcAeresRealInfo[0].rdAdresDetail}</li>
                              <li>${cpaPassOfcRealInfo[0].oficeNm}</li>
                              <li>${cpaPassOfcRealInfo[0].sectionNm} · ${cpaPassOfcRealInfo[0].deptNm} · ${cpaPassOfcRealInfo[0].rspOfc}</li>
                            </ul>
                          </td>
                          <td>
                            <div class="title">
                              연락처 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaPassReg.do?movePage=mypCpaPassReg_contactInfo&pin=${myPagePin}'">setting</button>
                            </div>
                            <ul class="cont">
                              <li>HP ${cpaPassRealInfo[0].moblPhonNo}</li>
                              <li>직장 ${cpaPassOfcRealInfo[0].ofcTelNo}</li>
                              <li>FAX ${cpaPassOfcRealInfo[0].ofcFaxNo}</li>
                              <li>개인 Email ${cpaPassRealInfo[0].mainEmail}</li>
                              <li>회사 Email ${cpaPassRealInfo[0].subEmail}</li>
                            </ul>
                          </td>
                          <td>
                            <div class="title">
                              학력사항 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaPassReg.do?movePage=mypCpaPassReg_acdmcrInfo&pin=${myPagePin}'">setting</button>
                            </div>
                            <ul class="cont">
                              <c:forEach var="cpaPassAcdmcrRealInfo" items="${cpaPassAcdmcrRealInfo}" varStatus="status">
                                <li>${cpaPassAcdmcrRealInfo.schulNm}</li>
                              </c:forEach>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>  
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="hr" style="height:50px;"></div>


        <%--수습정보--%>
          <table class="tb-bg">
            <colgroup>
              <col style="width:100%" />
            </colgroup>
            <thead>
            <tr>
              <th>
                수습회계사 정보
                <c:if test="${trainFlag =='E' || audTrainFlag !='D'}"><button type="button" class="toggle" id="myPage_trainToggleBtn">toggle</button></c:if>
              </th>
            </tr>
            </thead>
            <tbody>
            <c:if test="${audTrainFlag =='N'}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    외감실무
                  </div>
                  <div class="content-table2-inner">
                    <div class="no-result2" style="padding-right: 130px;">
                      등록정보가 없습니다.
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 34px 30px">
                <button type="button" class="gray-button icon" id="myPage_mypCpaAudTrainRegPageMove">외감실무 등록하기</button>
              </td>
            </tr>
            </c:if>
            <c:if test="${audTrainFlag =='Y'}">
              <tr>
                <td>
                  <div class="content-table2">
                    <div class="td-title">
                      외감실무
                    </div>
                    <div class="content-table2-inner">
                      <div class="reviewing" style="padding-right: 130px;">
                        외감실무 신청일 <span class="blue">${cpaAudTrainRegInfo.frstRegistDt}</span> <br />
                        등록하신 내용을 <span class="blue">검토중</span>입니다.
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 36px 30px 34px 30px">
                  <div class="buttons2">
                    <span class="button line2">
                      <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaAudTrainReg.do?movePage=mypCpaAudTrainReg_reviewInfo&pin=${myPagePin}">외감실무 등록조회</a>
                    </span>
                  </div>
                </td>
              </tr>
            </c:if>
            <c:if test="${audTrainFlag =='F'}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    외감실무
                  </div>
                  <div class="content-table2-inner">
                    <div class="reviewing" style="padding-right: 130px;">
                      외감실무 신청이 <span class="red">반려</span>됐습니다.<br />
                      자세한 사항은 반려사유 조회를 참조하세요.
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 34px 30px">
                <div class="buttons2 two">
                  <span class="button line2">
                    <a href="javascript:void(0);" onclick="myPageInfo.myPage_rejectRsnClick('${cpaAudTrainRegInfo.rejectRsn}')">반려사유 조회</a>
                  </span>
                  <span class="button full2">
                    <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaAudTrainReg.do?pin=${myPagePin}&regFlag=F">재신청하기</a>
                  </span>
                </div>
              </td>
            </tr>
            </c:if>
            <c:if test="${audTrainFlag =='E'}">
              <tr>
                <td>
                  <div class="content-table2">
                    <div class="td-title">
                      외감실무 <button type="button" class="setting-button">setting</button><br />
                    </div>
                    <div class="content-table2-inner">
                      <table>
                        <colgroup>
                          <col style="width: 15%;" />
                          <col style="width: 15%;" />
                          <col style="width: 40%;" />
                          <col style="width: 15%;" />
                          <col style="width: 15%;" />
                        </colgroup>
                        <thead>
                        <tr>
                          <th>실무시작일</th>
                          <th>종료에정일</th>
                          <th>진행률</th>
                          <th>실무수습기관</th>
                          <th>지도공인회계사</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>${cpaTrainRegReal[0].audRegistDe}</td>
                          <td>${cpaTrainRegReal[0].audRegistEndDe}</td>
                          <td>
                            <div class="progress">
                                ${audProgressDays}%
                              <div class="gage"><span class="gage-selected" style="width: ${audProgressDays}%;"></span></div>
                            </div>
                          </td>
                          <td>
                              ${cpaTrainRegReal[0].appInsttCdNm} <br/>
                              ${cpaTrainRegReal[0].appInsttCd}<br/>
                          </td>
                          <td>
                              ${cpaTrainRegReal[0].guideCpaNm} <br/>
                              ${cpaTrainRegReal[0].guideCpaNo}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="content-table2">
                    <div class="td-title">

                    </div>
                    <div class="content-table2-inner">
                      <div class="reviewing" style="padding-right: 130px;">
                        기본실무 종료일 <span class="blue">${cpaTrainRegReal[0].appEndDe}</span> <br />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </c:if>
            <c:if test="${trainFlag =='N'}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    기본실무
                  </div>
                  <div class="content-table2-inner">
                    <div class="no-result2" style="padding-right: 130px;">
                      등록정보가 없습니다.
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 34px 30px">
                <button type="button" class="gray-button icon" id="mypPage_mypCpaTrainRegPageMove">기본실무 등록하기</button>
              </td>
            </tr>
            </c:if>
            <c:if test="${trainFlag =='Y'}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    기본실무
                  </div>
                  <div class="content-table2-inner">
                    <div class="reviewing" style="padding-right: 130px;">
                      수습회계사 신청일 <span class="blue">${cpaTrainRegInfo.frstRegistDt}</span> <br />
                      등록하신 내용을 <span class="blue">검토중</span>입니다.
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 34px 30px">
                <div class="buttons2">
                  <span class="button line2">
                    <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaTrainReg.do?movePage=mypCpaTrainReg_reviewInfo&pin=${myPagePin}">기본실무 등록조회</a>
                  </span>
                </div>
              </td>
            </tr>
            </c:if>
            <c:if test="${trainFlag =='F'}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    기본실무
                  </div>
                  <div class="content-table2-inner">
                    <div class="reviewing" style="padding-right: 130px;">
                      수습회계사 신청이 <span class="red">반려</span>됐습니다.<br />
                      자세한 사항은 반려사유 조회를 참조하세요.
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 34px 30px">
                <div class="buttons2 two">
                  <span class="button line2">
                    <a href="javascript:void(0);" onclick="myPageInfo.myPage_rejectRsnClick('${cpaTrainRegInfo.rejectRsn}')">반려사유 조회</a>
                  </span>
                  <span class="button full2">
                    <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaTrainReg.do?pin=${myPagePin}&regFlag=F">재신청하기</a>
                  </span>
                </div>
              </td>
            </tr>
            </c:if>
            <c:if test="${trainFlag =='E'}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    기본실무  <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 15%;" />
                        <col style="width: 15%;" />
                        <col style="width: 40%;" />
                        <col style="width: 15%;" />
                        <col style="width: 15%;" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>실무시작일</th>
                        <th>종료예정일</th>
                        <th>진행률</th>
                        <th>실무수습기관</th>
                        <th>지도공인회계사</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${cpaTrainRegReal[0].appRegistDe}</td>
                        <td>${cpaTrainRegReal[0].appRegistEndDe}</td>
                        <td>
                          <div class="progress">
                              ${appProgressDays}%
                            <div class="gage"><span class="gage-selected" style="width: ${appProgressDays}%;"></span></div>
                          </div>
                        </td>
                        <td>
                            ${cpaTrainRegReal[0].appInsttCdNm} <br/>
                            ${cpaTrainRegReal[0].appInsttCd}<br/>
                            ${cpaTrainRegReal[0].appInsttEtc}
                        </td>
                        <td>
                            ${cpaTrainRegReal[0].guideCpaNm} <br/>
                            ${cpaTrainRegReal[0].guideCpaNo}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            </c:if>
            </tbody>
          </table>


        <c:if test="${trainFlag =='E' || audTrainFlag !='D'}">
        <div id="myPage_trainToggle">
          <table class="tb-bg">
            <colgroup>
              <col style="width:100%" />
            </colgroup>

            <tbody>

            <tr class="myPage_trainToggle">
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    상황보고서 <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <c:if test="${cpaApntcBrfRealInfoSize > 0}">
                  <div class="content-table2-inner center">
                    <table>
                      <thead>
                      <tr>
                        <th style="width: 100px;">년도</th>
                        <th>01월</th>
                        <th>02월</th>
                        <th>03월</th>
                        <th>04월</th>
                        <th>05월</th>
                        <th>06월</th>
                        <th>07월</th>
                        <th>08월</th>
                        <th>09월</th>
                        <th>10월</th>
                        <th>11월</th>
                        <th>12월</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaApntcBrfRealInfo" items="${cpaApntcBrfRealInfo}" varStatus="status">
                        <tr>
                          <td style="width: 100px;">${cpaApntcBrfRealInfo.brfYear}</td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt1}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt2}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt3}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt4}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt5}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt6}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt7}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt8}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt9}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt10}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt11}"></span></td>
                          <td><span class="status-check ${cpaApntcBrfRealInfo.brfMt12}"></span></td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaApntcBrfRealInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            <tr class="myPage_trainToggle">
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    연수결과
                  </div>
                  <c:if test="${cpaTrnngResultRealInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <thead>
                      <tr>
                        <th style="width: 120px;">차수</th>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>연수기간 (분)</th>
                        <th>출석기간 (분)</th>
                        <th>실무역량 (점수)</th>
                        <th>직업윤리 (점수)</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaTrnngResultRealInfo" items="${cpaTrnngResultRealInfo}" varStatus="status">
                        <tr>
                          <td style="width: 120px;">${cpaTrnngResultRealInfo.trnOdr}</td>
                          <td>${cpaTrnngResultRealInfo.trnBgnDe}</td>
                          <td>${cpaTrnngResultRealInfo.trnEndDe}</td>
                          <td>${cpaTrnngResultRealInfo.trnTm}</td>
                          <td>${cpaTrnngResultRealInfo.atendTm}</td>
                          <td>${cpaTrnngResultRealInfo.prcafsAbilityScore}</td>
                          <td>${cpaTrnngResultRealInfo.vocEthicsScore}</td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaTrnngResultRealInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
        </c:if>
        <div class="hr" style="height:50px;"></div>



        <%--공인회계사 정보--%>
        <table class="tb-bg">
          <colgroup>
            <col style="width:100%" />
          </colgroup>
          <thead>
            <tr>
              <th>
                공인회계사 정보
                <c:if test="${cpaMemFlag =='E'}"><button type="button" class="toggle" id="myPage_cpaMemToggleBtn">toggle</button></c:if>
              </th>
            </tr>
          </thead>
          <tbody>
          <c:if test="${cpaMemFlag =='N'}">
          <tr>
            <td>
              <div class="content-table2">
                <div class="td-title">

                </div>
                <div class="content-table2-inner">
                  <div class="no-result2" style="padding-right: 130px;">
                    등록정보가 없습니다.
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 34px 30px">
              <button type="button" class="gray-button icon" id="myPage_mypCpaMemberRegPageMove">등록하기</button>
            </td>
          </tr>
          </c:if>
          <c:if test="${cpaMemFlag =='Y'}">
          <tr>
            <td>
              <div class="content-table2">
                <div class="td-title">

                </div>
                <div class="content-table2-inner">
                  <div class="reviewing" style="padding-right: 130px;">
                    공인회계사 신청일 <span class="blue">${cpaMemberRegInfo.frstRegistDt}</span> <br />
                    등록하신 내용을 <span class="blue">검토중</span>입니다.
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 30px 34px 30px">
              <div class="buttons2">
                  <span class="button line2">
                    <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_reviewInfo&pin=${myPagePin}">등록정보 조회</a>
                  </span>
              </div>
            </td>
          </tr>
          </c:if>
          <c:if test="${cpaMemFlag =='F'}">
          <tr>
            <td>
              <div class="content-table2">
                <div class="td-title">

                </div>
                <div class="content-table2-inner">
                  <div class="reviewing" style="padding-right: 130px;">
                    공인회계사 신청이 <span class="red">반려</span>됐습니다.<br />
                    자세한 사항은 반려사유 조회를 참조하세요.
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 30px 34px 30px">
              <div class="buttons2 two">
                  <span class="button line2">
                    <a href="javascript:void(0);" onclick="myPageInfo.myPage_rejectRsnClick('${cpaMemberRegInfo.rejectRsn}')">반려사유 조회</a>
                  </span>
                <span class="button full2">
                    <a href="${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?pin=${myPagePin}&regFlag=F">재신청하기</a>
                </span>
              </div>
            </td>
          </tr>
          </c:if>
          <c:if test="${cpaMemFlag =='E'}">
            <tr>
              <td style="display: flex;">
                <div class="content-table2" style="width: 70%;">
                  <div class="td-title">
                    기본정보 <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <%--<col style="width: 16.66%" />--%>
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>공인회계사번호</th>
                          <th>부조회원 구분</th>
                          <%--<th>시작일</th>--%>
                          <th>등록일</th>
                          <th>등록갱신일</th>
                          <th>갱신예정일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${cpaMemberRegReal[0].cpaId}</td>
                          <td>${cpaMemberRegAidMasterInfo[0].mberFlagNm}</td>
                          <%--<td>${cpaMemberRegReal[0].cpaId}</td>--%>
                          <td>${cpaMemberRegReal[0].registDe}</td>
                          <td>${cpaMemberRegReal[0].lastRegistDe}</td>
                          <td>${cpaMemberRegReal[0].updtRegistDe}</td>
                        </tr>
                      </tbody>
                    </table>  
                  </div>
               </div>
                <div class="content-table2" style="width: 45%;">
                  <div class="td-title">
                    회원정보 <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <c:if test="${cpaMemberRegCareerHistInfo[0].mberFlag eq 'A2020010'}"><col style="width: 16.66%" /></c:if>
                      </colgroup>
                      <c:if test="${cpaMemberRegCareerHistInfo[0].mberFlag eq 'A2020010'}">
                      <thead>
                      <tr>
                        <th>회원구분</th>
                        <th>감사인</th>
                        <th>구성원구분</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${cpaMemberRegCareerHistInfo[0].mberFlagNm}</td>
                        <td>${cpaMemberRegCareerHistInfo[0].auditNm} <br />${cpaMemberRegCareerHistInfo[0].auditId}</td>
                        <td>${cpaMemberRegCareerHistInfo[0].auditOfcpsNm}</td>
                      </tr>
                      </tbody>
                      </c:if>
                      <c:if test="${cpaMemberRegCareerHistInfo[0].mberFlag ne 'A2020010'}">
                        <thead>
                        <tr>
                          <th>회원구분</th>
                          <th>사업자 등록번호</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>${cpaMemberRegCareerHistInfo[0].mberFlagNm}</td>
                          <td>${cpaMemberRegReal[0].bizrNo}</td>
                        </tr>
                        </tbody>
                      </c:if>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="display: flex;">
                <div class="content-table2" style="width: 70%;">
                  <div class="td-title">
                    보험정보 <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegInsrncPayInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>보험시작일</th>
                        <th>보험종료일</th>
                        <th>보상한도</th>
                        <th>자기부담금</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${cpaMemberRegInsrncPayInfo[0].insBgnDd}</td>
                        <td>${cpaMemberRegInsrncPayInfo[0].insEndDd}</td>
                        <td>${cpaMemberRegInsrncPayInfo[0].repratnLmtAmt}</td>
                        <td>${cpaMemberRegInsrncPayInfo[0].idsrAmt}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegInsrncPayInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="margin-top: 22px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
                <div class="content-table2" style="width: 45%;">
                  <div class="td-title">
                    공인회계사경력 <br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>전체경력</th>
                        <th>개업경력</th>
                        <th>전업경력</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${cpaMemberRegCareerInfo[0].temp01}</td>
                        <td>${cpaMemberRegCareerInfo[0].temp02}</td>
                        <td>${cpaMemberRegCareerInfo[0].temp03}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </c:if>
          </tbody>
        </table>


        <c:if test="${cpaMemFlag =='E'}">
        <div id="myPage_cpaMemToggle">
          <table class="tb-bg">
            <colgroup>
              <col style="width:100%" />
            </colgroup>
            <tbody>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    사이버연수 <br/>이수현황<br />
                  </div>
                  <div class="content-table2-inner">
                    <div class="cyber">
                      <div class="cyber-inner">
                        <div class="cyber-title">
                          시행연도
                          <span class="select">
                              <select name="" id="">
                                <option value="0">2021</option>
                              </select>
                            </span>
                        </div>
                        <div class="cyber-table">
                          <table>
                            <colgroup>
                              <col style="width:20%;" />
                              <col style="width:20%;" />
                              <col style="width:20%;" />
                              <col style="width:20%;" />
                              <col style="width:20%;" />
                            </colgroup>
                            <thead>
                            <tr>
                              <th>구분</th>
                              <th>분류</th>
                              <th>의무 시간 (A)</th>
                              <th>이수 시간 (B)</th>
                              <th>미이수 시간 (A-B)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:if test="${cpaMemberRegTrnngSmInfoSize > 0}">
                            <tr>
                              <td>필수</td>
                              <td>회계</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp01}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp02}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp03}</td>
                            </tr>
                            <tr>
                              <td>필수</td>
                              <td>윤리</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp04}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp05}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp06}</td>
                            </tr>
                            <tr>
                              <td>선택</td>
                              <td>전체</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp07}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp08}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp09}</td>
                            </tr>
                            <tr>
                              <td>합계</td>
                              <td>-</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp10}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp11}</td>
                              <td>${cpaMemberRegTrnngSmInfo[0].temp12}</td>
                            </tr>
                            </c:if>
                            <c:if test="${cpaMemberRegTrnngSmInfoSize < 1}">
                              <tr class="content-table2-inner">
                                <td class="no-result2" style="padding-right: 130px; padding-top: 14px;" colspan="5">
                                  이수 내용이 없습니다.
                                </td>
                              </tr>
                            </c:if>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <ul class="cyber-tips">
                        <li>⁕ 필수과목을 의무시간보다 초과하여 이수한 부분은 당해 연도 선택과목 이수시간에 합산됩니다. </li>
                        <li>⁕ 총 의무시간을 초과하여 이수한 시간은 최대 40시간까지 다음 연도 선택과목 이수시간으로 이월하여 인정합니다.</li>
                        <li>⁕ 의무시간 미 이수시 당해 연도 미 이수시간의 1,2배가 다음 연도 의무시간에 합산되어 적용됩니다.</li>
                      </ul>
                      <button type="button" onclick="window.open('https://cyber.kicpa.or.kr/')">사이버 회계연수원 바로가기 (GO)</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    정보공개<br />설정 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_nmstOthbcInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                        <col style="width: 16.66%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>사무실 주소</th>
                        <th>사무소 명</th>
                        <th>전자메일</th>
                        <th>사무소 전화</th>
                        <th>사진</th>
                        <th>사무소 팩스</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>${cpaMemberRegNmstOthbcInfo[0].ofcAdresYnNm}</td>
                        <td>${cpaMemberRegNmstOthbcInfo[0].ofcNameYnNm}</td>
                        <td>${cpaMemberRegNmstOthbcInfo[0].emailYnNm}</td>
                        <td>${cpaMemberRegNmstOthbcInfo[0].ofcTelYnNm}</td>
                        <td>${cpaMemberRegNmstOthbcInfo[0].photoYnNm}</td>
                        <td>${cpaMemberRegNmstOthbcInfo[0].ofcFaxYnNm}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    전문분야 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_proFieldInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegProFieldInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <c:forEach var="cpaMemberRegProFieldInfo" items="${cpaMemberRegProFieldInfo}" varStatus="status">
                          <col style="width: 20%" />
                        </c:forEach>
                      </colgroup>
                      <thead>
                      <tr>
                        <c:forEach var="cpaMemberRegProFieldInfo" items="${cpaMemberRegProFieldInfo}" varStatus="status">
                          <c:if test="${cpaMemberRegProFieldInfo.proFildCdFlag eq 1}">
                            <th>회계감사</th>
                          </c:if>
                          <c:if test="${cpaMemberRegProFieldInfo.proFildCdFlag eq 2}">
                            <th>세무</th>
                          </c:if>
                          <c:if test="${cpaMemberRegProFieldInfo.proFildCdFlag eq 3}">
                            <th>컨설팅</th>
                          </c:if>
                          <c:if test="${cpaMemberRegProFieldInfo.proFildCdFlag eq 4}">
                            <th>법원관련</th>
                          </c:if>
                          <c:if test="${cpaMemberRegProFieldInfo.proFildCdFlag eq 9}">
                            <th>기타</th>
                          </c:if>
                        </c:forEach>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <c:forEach var="cpaMemberRegProFieldInfo" items="${cpaMemberRegProFieldInfo}" varStatus="status">
                          <td>
                            <div class="multiple-text">
                                ${cpaMemberRegProFieldInfo.proFildCdNm}
                            </div>
                          </td>
                        </c:forEach>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegProFieldInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    전문분야<br />활동사항 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_proCareerInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegProCareerInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 10%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>기관분류</th>
                        <th>기관명</th>
                        <th>직위</th>
                        <th>담당업무</th>
                        <th>시작년월</th>
                        <th>종료년월</th>
                        <th>비고</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaMemberRegProCareerInfo" items="${cpaMemberRegProCareerInfo}" varStatus="status">
                        <tr>
                          <td>${cpaMemberRegProCareerInfo.insttCdNm}</td>
                          <td>${cpaMemberRegProCareerInfo.insttNm}</td>
                          <td>${cpaMemberRegProCareerInfo.rspOfc}</td>
                          <td>${cpaMemberRegProCareerInfo.chrgJob}</td>
                          <td>${cpaMemberRegProCareerInfo.bgnYm}</td>
                          <td>${cpaMemberRegProCareerInfo.endYm}</td>
                          <td>${cpaMemberRegProCareerInfo.remark}</td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegProCareerInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    위원회<br />활동사항 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_proCmitInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegProCmitInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 15%" />
                        <col style="width: 10%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>기관분류</th>
                        <th>기관명</th>
                        <th>위촉기관</th>
                        <th>담당업무</th>
                        <th>시작년월</th>
                        <th>종료년월</th>
                        <th>비고</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaMemberRegProCmitInfo" items="${cpaMemberRegProCmitInfo}" varStatus="status">
                        <tr>
                          <td>${cpaMemberRegProCmitInfo.cmitCdNm}</td>
                          <td>${cpaMemberRegProCmitInfo.cmitNm}</td>
                          <td>${cpaMemberRegProCmitInfo.entrstInstt}</td>
                          <td>${cpaMemberRegProCmitInfo.chrgJob}</td>
                          <td>${cpaMemberRegProCmitInfo.bgnYm}</td>
                          <td>${cpaMemberRegProCmitInfo.endYm}</td>
                          <td>${cpaMemberRegProCmitInfo.remark}</td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegProCmitInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    자격/면허 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_proLicenseInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegProLicenseInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>자격/면허 구분</th>
                        <th>자격/면허 명칭</th>
                        <th>부여기관</th>
                        <th>취득년월</th>
                        <th>비고</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaMemberRegProLicenseInfo" items="${cpaMemberRegProLicenseInfo}" varStatus="status">
                        <tr>
                          <td>${cpaMemberRegProLicenseInfo.lcnsCdNm}</td>
                          <td>${cpaMemberRegProLicenseInfo.lcnsNm}</td>
                          <td>${cpaMemberRegProLicenseInfo.issuInstt}</td>
                          <td>${cpaMemberRegProLicenseInfo.acqsYm}</td>
                          <td>${cpaMemberRegProLicenseInfo.remark}</td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegProLicenseInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    학술활동 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_proLtrryInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegProLtrryInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 25%" />
                        <col style="width: 25%" />
                        <col style="width: 25%" />
                        <col style="width: 25%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>저술년도</th>
                        <th>제목/저서명</th>
                        <th>주요내용</th>
                        <th>비고</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaMemberRegProLtrryInfo" items="${cpaMemberRegProLtrryInfo}" varStatus="status">
                        <tr>
                          <td>${cpaMemberRegProLtrryInfo.ltrryYear}</td>
                          <td>${cpaMemberRegProLtrryInfo.subjectNm}</td>
                          <td>${cpaMemberRegProLtrryInfo.mainCn}</td>
                          <td>${cpaMemberRegProLtrryInfo.remark}</td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegProLtrryInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    수상내역 <button type="button" class="setting-button" onClick="location.href='${pageContext.request.contextPath}/kicpa/myp/mypCpaMemberReg.do?movePage=mypCpaMember_proWnpzInfo&pin=${myPagePin}'">setting</button><br />
                  </div>
                  <c:if test="${cpaMemberRegProWnpzInfoSize > 0}">
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 25%" />
                        <col style="width: 25%" />
                        <col style="width: 25%" />
                        <col style="width: 25%" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th>수상년월</th>
                        <th>내용 (수상명)</th>
                        <th>부여기관</th>
                        <th>비고</th>
                      </tr>
                      </thead>
                      <tbody>
                      <c:forEach var="cpaMemberRegProWnpzInfo" items="${cpaMemberRegProWnpzInfo}" varStatus="status">
                        <tr>
                          <td>${cpaMemberRegProWnpzInfo.wnpzYm}</td>
                          <td>${cpaMemberRegProWnpzInfo.wnpzNm}</td>
                          <td>${cpaMemberRegProWnpzInfo.relateInstt}</td>
                          <td>${cpaMemberRegProWnpzInfo.remark}</td>
                        </tr>
                      </c:forEach>
                      </tbody>
                    </table>
                  </div>
                  </c:if>
                  <c:if test="${cpaMemberRegProWnpzInfoSize < 1}">
                    <div class="content-table2-inner">
                      <div class="no-result2" style="padding-right: 130px;">
                        등록정보가 없습니다.
                      </div>
                    </div>
                  </c:if>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        </c:if>
        <div class="hr" style="height:50px;"></div>


        <%--세무사 세무대리 정보--%>
        <table class="tb-bg">
          <colgroup>
            <col style="width:100%" />
          </colgroup>
          <thead>
            <tr>
              <th>
                세무사 세무대리 정보
                <%--<button type="button" class="toggle active">toggle</button>--%>
              </th>
            </tr>
          </thead>
          <tbody>
          <c:if test="${cpaLndctnQualfManageInfoSize < 1}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="content-table2-inner">
                    <div class="no-result2" style="padding-right: 130px;">
                      등록정보가 없습니다.
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 34px 30px">
                <div class="buttons2">
                  <span class="button line2">
                    <a href="javascript:void(0);">세무사 개업신청서 이동</a>
                  </span>
                </div>
              </td>
            </tr>
          </c:if>
          <c:if test="${cpaLndctnQualfManageInfoSize > 0}">
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    기본정보 <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>자격번호</th>
                          <th>자격증발부일</th>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${cpaLndctnQualfManageInfo[0].crqfcNo}</td>
                          <td>${cpaLndctnQualfManageInfo[0].crqfcIsueDe}</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>  
                  </div>
               </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="content-table2">
                  <div class="td-title">
                    세무대리<br/>정보 <button type="button" class="setting-button">setting</button><br />
                  </div>
                  <div class="content-table2-inner">
                    <table>
                      <colgroup>
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>등록번호</th>
                          <th>관리번호</th>
                          <th>현재구분</th>
                          <th>등록일</th>
                          <th>등록갱신일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${cpaLndctnQualfManageInfo[0].lndctnId}</td>
                          <td>${cpaLndctnQualfManageInfo[0].lndctnVrifyNoCl}</td>
                          <td>${cpaLndctnQualfManageInfo[0].opbizClNm}</td>
                          <td>${cpaLndctnQualfManageInfo[0].registDe}</td>
                          <td>${cpaLndctnQualfManageInfo[0].updtDe}</td>
                        </tr>
                      </tbody>
                    </table>  
                  </div>
               </div>
              </td>
            </tr>
          </c:if>
          </tbody>
        </table>
      </div>
    </div>

    <input type="hidden" id="myPage_myPagePin" value="${myPagePin}">
    <input type="hidden" id="myPage_mypLeftDays" value="${leftDays}">
    <button type="button" class="close" onclick="javascript:parent.ClosePage()">close</button>
  </div>


  <!--이력서 레이어팝-->
  <div class="kicpa-modal" id="myPageRsumPop_rsumSave">
    <div class="modal-inner" style="height: 515px;">
      <form id="myPageRsumPop_rsumSaveForm">
        <div class="modal-title">이력서</div>
        <div style="margin-top: 10px;">
          <label style="font-weight: 600;">이력서 변경</label>
          <div class="modal-form" style="margin-top:15px;">
            <div class="responsive-form-box">
              <ul>
                <li class="block">
                  <div class="input-group required">

                    <div class="file long">
                        <span class="input">
                          <input type="file" style="width: 80%;" name="atchFileId" id="mypCpaPassReg_rsumInfoFile" placeholder="2M 이하, HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) " />
                        </span>
                      <div class="action-buttons">
                        <button type="button" class="file-button" onclick="jQuery('#mypCpaPassReg_rsumInfoFile').click()">첨부</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="tips2" style="margin-top:20px;">
          <li>* 2M 이하 </li>
          <li>* HWP, DOC, PPT, XLSX, GIF, PNG, JPG (JPEG) </li>
        </ul>
        <div style="margin-top:7%;">
          <label style="font-weight: 600;">이력서 안내</label>

          <div class="modal-result tableFixHead" style="overflow:auto">
            <table cellspacing="0" cellpadding="0" style="border: 1px solid #dddddd;border-bottom: 0px;">
              <colgroup>
                <col style="width: 85%;"/>
                <col style="width: 15%;"/>
              </colgroup>
              <thead>
              <tr>
                <th id="myPageRsumPop_rsumFileNm"></th>
                <th><a id="myPageRsumPop_rsumFileUrl" href="javascript:void(0);" download><button type="button" class="file-button">다운로드</button></a></th>
              </tr>
              </thead>
            </table>
          </div>
          <input type="hidden" id="myPageRsumPop_rsumSaveRegistDe">
        </div>
        <div class="modal-buttons">
          <button type="button" class="small-round-button type4" id="myPageRsumPop_rsumSaveBtn">저장</button>
          <button type="button" class="small-round-button type2" id="myPageRsumPop_rsumCloseBtn">종료</button>
        </div>
      </form>
    </div>
  </div>

  <!--반려사유 조회 레이어팝-->
  <div class="kicpa-alert2" id="myPagePop_rejectRsn">
    <div class="alert-inner">
      <div class="alert-title">반려사유</div>
      <div class="alert-text">
        <label id="myPagePop_rejectRsnText"></label>
      </div>
      <div class="alert-buttons">
        <button type="button" style="font-size: 20px;" class="small-round-button type1" id="myPagePop_rejectRsnClose">확인</button>
      </div>
    </div>
  </div>
</body>
</html>