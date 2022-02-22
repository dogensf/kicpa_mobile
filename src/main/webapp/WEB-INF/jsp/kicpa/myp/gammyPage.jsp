<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE>
<html>
<head>
    <title>GAM MYPAGE</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/jquery-ui.min.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />

    <script src="<c:url value='/'/>js/jquery.min.js"></script>
    <script src="<c:url value='/'/>js/jquery-ui.min.js"></script>
    <script src="<c:url value='/'/>js/kicpa/stringHelper.js"></script>
    <script src="<c:url value='/'/>js/kicpa/myp/gammyPage.js?ver=13"></script>
    <script src="<c:url value='/'/>js/KicpaCommon.js"></script>

    <style>
        .modal {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal.show {
            display: block;
        }

        .modal_body {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1000px;
            height: 300px;
            padding: 10px;
            text-align: center;
            background-color: rgb(255, 255, 255);
            border-radius: 1px;
            box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
            transform: translateX(-50%) translateY(-50%);

        }

        .input {
             width : 150px;
             height: 35px;
             text-align: center;

         }

        .button{
            color: white;
            background: orange;
            height: 35px;
            width: 100px;
            border-radius: 20px;
            border : 0;
        }

    </style>

</head>
<body>
<input type="hidden" id="audit_Code" value="${auditCd}">
<input type="hidden" id="audit_Id" value="${auditId}">
<div class="kicpa-layer-content">
    <div class="mypage">
        <h1 class="my-page-title">감사인 마이페이지</h1>

        <div class="my-page-table1">
            <table>
                <colgroup>
                    <col style="width:100%" />
                </colgroup>
                <thead>
                <tr>
                    <th>
                        기본정보
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div class="content-table">
                            <table>
                                <colgroup>
                                    <col style="width: 20%;" />
                                    <col style="width: 20%;" />
                                    <col style="width: 15%;" />
                                    <col style="width: 25%;" />
                                    <col style="width: 20%;" />
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>감사인명 <button type="button" class="setting-button">setting</button></th>
                                    <th>감사인 정보 <button type="button" class="setting-button">setting</button></th>
                                    <th>대표이사 <button type="button" id="gammyPage_ChangeReppin" class="setting-button">setting</button></th>
                                    <th>사무실 <button type="button" class="setting-button">setting</button></th>
                                    <th>연락처 <button type="button" class="setting-button">setting</button></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>${gamList.get(0).korAudNm}</td>
                                    <td>등록일 &emsp;&emsp;${gamList.get(0).registDe}</td>
                                    <td>${gamList.get(0).koreanNm} <c:if test="${gamList.get(0).koreanNm eq gamList.get(0).repPin }">(행정대표)</c:if> </td>
                                    <td>${gamList.get(0).auditId}</td>
                                    <td>Tel &emsp;&emsp;${gamList.get(0).telNo1}</td>
                                </tr>
                                <tr>
                                    <td>${gamList.get(0).chcAudNm}</td>
                                    <td>등록번호 &emsp;&emsp;${gamList.get(0).auditCd}</td>
                                    <td>${gamList.get(1).koreanNm} <c:if test="${gamList.get(1).koreanNm eq gamList.get(0).repPin }">(행정대표)</c:if></td>
                                    <td>${gamList.get(0).rdAdres}</td>
                                    <td>FAX &emsp;&emsp;${gamList.get(0).faxNo}</td>
                                </tr>
                                <tr>
                                    <td>${gamList.get(0).engAudNm}</td>
                                    <td>세무조정반번호&emsp;&emsp;${gamList.get(0).taxGrpNo}</td>
                                    <td>${gamList.get(2).koreanNm} <c:if test="${gamList.get(2).koreanNm eq gamList.get(0).repPin }">(행정대표)</c:if></td>
                                    <td>${gamList.get(0).rdAdresDetail}</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="hr" style="height:50px;"></div>

            <table>
                <colgroup>
                    <col style="width:100%" />
                </colgroup>
                <thead>
                <tr>
                    <th>
                        법인정보
                        <button type="button" class="toggle" id="toggle_rowInfo">toggle</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div class="content-table2" style="height: 155px; overflow: auto">
                            <div class="td-title">
                                법인 담당자 <button type="button" class="setting-button">setting</button><br />
                                정보
                                <br><br>
                                <button  type='button' class='line-button' style="width: 60px;" id="gammyPage_regist_auditemp">등록</button>
                            </div>
                            <div class="content-table2-inner">
                                <table>
                                    <colgroup>
                                        <col style="width: 15%;" />
                                        <col style="width: 15%;" />
                                        <col style="width: 19%;" />
                                        <col style="width: 18%;" />
                                        <col style="width: 18%;" />
                                        <col style="width: 15%;" />
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>성명</th>
                                        <th>직급</th>
                                        <th>Email</th>
                                        <th>Tel</th>
                                        <th>HP</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody id="audit_empbody">
                                    <c:forEach var="audList" items="${gamAudList}" varStatus="status">
                                    <tr>
                                        <td id="auditor_auditId" style="display: none;">${audList.auditId}</td>
                                        <td id="audit_empsn"style="display: none;">${audList.empSn}</td>
                                        <td>${audList.empNm}</td>
                                        <td>${audList.rspOfc}</td>
                                        <td>${audList.email}</td>
                                        <td>${audList.telNo}</td>
                                        <td>${audList.moblPhonNo}</td>
                                        <td><button type='button' class='line-button' onclick="auditemp_updtdel('${audList.auditId}','${audList.empSn}','${audList.empNm}','${audList.rspOfc}','${audList.email}','${audList.telNo}','${audList.moblPhonNo}')">수정/삭제</button></td>
                                    </tr>
                                    </c:forEach>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="gammyPage_officeInfo" class="content-table2" style="height: 120px; overflow: auto">
                            <div class="td-title">
                                사무소 정보 <button type="button" class="setting-button">setting</button><br />
                            </div>
                            <div class="content-table2-inner" >
                                <table>
                                    <colgroup>
                                        <col style="width: 5%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 35%;" />
                                        <col style="width: 30%;" />
                                        <col style="width: 10%;" />
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>구분</th>
                                        <th>우편번호</th>
                                        <th>주소</th>
                                        <th>상세주소</th>
                                        <th>FAX</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <c:forEach var="officeList" items="${gamOffList}" varStatus="status">
                                            <tr>
                                                <td><input type="radio" name="gamoffice_auditid" value="${officeList.auditId}" <c:if test="${officeList.auditId  eq auditId}"> checked </c:if> ></td>
                                                <td>${officeList.statusCl}</td>
                                                <td>${officeList.zipCd}</td>
                                                <td>${officeList.rdAdres}</td>
                                                <td>${officeList.rdAdresDetail}</td>
                                                <td>${officeList.faxNo}</td>
                                            </tr>
                                        </c:forEach>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

                <div class="hr" style="height:50px;"></div>

            <table>
                <colgroup>
                    <col style="width:100%" />
                </colgroup>
                <thead>
                <tr>
                    <th colspan="5">
                        수습회계사 등록신청서 접수현황
                    </th>
                </tr>
                </thead>
            </table>

            <div class="content-table3">
                <div class="form">
                    <div class="form-inner">
                        <dl>
                            <dt>승인구분</dt>
                            <dd>
                                <span class="compact-select" style="width: 80px; margin-right: 10px;">
                                    <select id="gammyPage_approval">
                                        <option value="">전체</option>
                                        <option value="Y">승인대기</option>
                                        <option value="E">승인</option>
                                        <option value="F">반려</option>
                                    </select>
                                </span>
                            </dd>
                            <dt>입사일자</dt>
                            <dd>
                          <span class="compact-input inline cal" style="width: 120px;">
                            <input type="text" id="gammyPage_StartDagte" autocomplete="off" placeholder="선택하세요.">
                            <button type="button">calendar</button>
                          </span>
                         <em class="middle-icon">~</em>
                         <span class="compact-input inline cal" style="width: 120px;">
                            <input type="text" id="gammyPage_EndDagte" autocomplete="off" placeholder="선택하세요.">
                            <button type="button">calendar</button>
                          </span>
                            </dd>
                        </dl>
                        <dl class="last">
                            <dt>대학 및 대학원 재학여부</dt>
                            <dd>
                              <span class="compact-select" style="width: 100px; margin-right: 10px;">
                                <select id="gammyPage_graduation">
                                  <option value="">전체</option>
                                    <option value="A">졸업 또는 미재학</option>
                                    <option value="B">재학중</option>
                                </select>
                              </span>
                            </dd>
                            <dt>성명</dt>
                            <dd><span class="compact-input" style="width: 130px;"><input type="text" id="gammyPage_searchText" placeholder=""></span></dd>

                        </dl>
                    </div>
                    <button type="button" id="gammyPage_apntccpamypSearch" class="search" >검색</button>
                </div>
            </div>

            <div class="hr" style="height:50px;"></div>

            <div class="basic-table">
                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>승인구분</th>
                            <th>type구분</th>
                            <th>수습등록번호</th>
                            <th>실무수습기간 입사일지</th>
                            <th>성명</th>
                            <th>생년</th>
                            <th>지도 CPA</th>
                            <th>대학 및 대학원 재학여부</th>
                            <th>졸업예정일</th>
                            <th>방학기간</th>
                            <th>조회</th>
                        </tr>
                    </thead>
                    <tbody id="gammyPage_apntc_body" style="text-align: center;">
                    </tbody>
                </table>
            </div>

            <div class="hr" style="height:50px;"></div>

            <table>
                <colgroup>
                    <col style="width:100%" />
                </colgroup>
                <thead>
                <tr>
                    <th colspan="5">
                        회원 등록신청서 접수현황
                    </th>
                </tr>
                </thead>
            </table>


            <div class="content-table3">
            <div class="form">
                <div class="form-inner">
                    <dl>
                        <dt>승인구분</dt>
                        <dd>
                            <span class="compact-select" style="width: 100px; margin-right: 10px;">
                                <select id="gammyPage_cpamyp_approval">
                                    <option value="">전체</option>
                                    <option value="Y">승인대기</option>
                                    <option value="E">승인</option>
                                    <option value="F">반려</option>
                                </select>
                            </span>
                        </dd>
                        <dt>등록일자</dt>
                        <dd>
                          <span class="compact-input inline cal" style="width: 150px;">
                            <input type="text" id="gammyPage_memberRegist_StartDate" autocomplete="off" placeholder="선택하세요.">
                            <button type="button">calendar</button>
                          </span>
                                        <em class="middle-icon">~</em>
                                        <span class="compact-input inline cal" style="width: 150px;">
                            <input type="text" id="gammyPage_memberRegist_EndDate" autocomplete="off" placeholder="선택하세요.">
                            <button type="button">calendar</button>
                          </span>
                        </dd>
                    </dl>
                    <dl class="last">
                        <dt>성명</dt>
                        <dd><span class="compact-input" style="width: 170px;"><input type="text" id="gammyPage_cpamyp_searchText" placeholder="성명을 입력해 주세요"></span></dd>
                    </dl>
                </div>
                <button type="button" id="gammyPage_cpamyp_Search" class="search">조회</button>
            </div>

            <div class="hr" style="height:50px;"></div>

            <div class="basic-table">
                <table>
                    <thead>
                    <tr>
                        <th>NO</th>
                        <th>승인구분</th>
                        <th>등록번호</th>
                        <th>등록일</th>
                        <th>성명</th>
                        <th>생년</th>
                        <th>등록구분</th>
                        <th>등록회비 납부일</th>
                        <th>등록회비</th>
                        <th>승인조회</th>
                    </tr>
                    </thead>
                    <tbody id="gammyPage_cpamyp_body" style="text-align: center;">

                    </tbody>
                </table>
            </div>
            <div class="hr" style="height:50px;"></div>
        </div>
        </div>
    </div>
</div>
</body>
</html>

<!-- 행정대표 팝업 -->
<div class="kicpa-modal" style="display: none;">
    <div class="modal-inner" style="height: 400px;">
        <div class="modal-title">행정대표 변경</div>

        <div class="modal-result">
            <table>
                <colgroup>
                    <col style="width: 20%;" />
                    <col style="width: 80%;" />
                </colgroup>
                <thead>
                <tr>
                    <th></th>
                    <th>행정대표</th>
                </tr>
                </thead>
                <tbody style="text-align: center;">
                    <c:if test="${gamList.get(0).koreanNm ne ''}">
                    <tr>
                        <td><input type="radio" name = "gammyPage_Reppin" value="${gamList.get(0).pin}" <c:if test="${gamList.get(0).koreanNm eq gamList.get(0).repPin}"> checked</c:if>  ></td>
                        <td>${gamList.get(0).koreanNm}</td>
                    </tr>
                    </c:if>

                    <c:if test="${gamList.get(1).koreanNm ne ''}">
                    <tr>
                        <td><input type="radio" name = "gammyPage_Reppin" value="${gamList.get(1).pin}" <c:if test="${gamList.get(1).koreanNm eq gamList.get(0).repPin}"> checked</c:if> ></td>
                        <td>${gamList.get(1).koreanNm}</td>
                    </tr>
                    </c:if>

                    <c:if test="${gamList.get(2).koreanNm ne ''}">
                    <tr>
                        <td><input type="radio" name = "gammyPage_Reppin" value="${gamList.get(2).pin}" <c:if test="${gamList.get(2).koreanNm eq gamList.get(0).repPin}"> checked</c:if> ></td>
                        <td>${gamList.get(2).koreanNm}</td>
                    </tr>
                    </c:if>
                </tbody>
            </table>
        </div>
        <div class="modal-buttons">
            <button type="button" id="gammyPage_Change_repPin" class="small-round-button type3">등록</button>
            <button type="button" id="gammyPage_Close_kicpaModal" class="small-round-button type2">닫기</button>
        </div>
    </div>
</div>

<!-- 법인 담당자 팝업 -->
<div class="modal">
    <div class="modal_body">
        <h3 style="font-weight: bold; margin-top: 10px; font-size: 15pt;">법인 담당자 등록/수정/삭제</h3>

        <div class="content-table" style="height: 130px; margin-top: 50px;" >
            <table>
                <colgroup>
                    <col style="width: 15%;" />
                    <col style="width: 15%;" />
                    <col style="width: 20%;" />
                    <col style="width: 15%;" />
                    <col style="width: 15%;" />
                    <col style="width: 5%;" />
                </colgroup>
                <thead>
                <tr>
                    <th>성명</th>
                    <th>직급</th>
                    <th>Email</th>
                    <th>tel</th>
                    <th>hp</th>
                    <th></th>
                </tr>
                </thead>
                <tbody style="text-align: center;">
                <tr>
                    <td style="display: none;"><input type="text" class="input" id="gammyPage_auditemp_auditId"></td>
                    <td style="display: none;"><input type="text" class="input" id="gammyPage_auditemp_empSn"></td>
                    <td><input type="text" class="input" id="gammyPage_auditemp_empnm"></td>
                    <td><input type="text" class="input" id="gammyPage_auditemp_rspoc"></td>
                    <td><input type="text" class="input" id="gammyPage_auditemp_email" style="width: 200px;"></td>
                    <td><input type="text" class="input" id="gammyPage_auditemp_telno"></td>
                    <td><input type="text" class="input" id="gammyPage_auditemp_moblphonno"></td>
                    <td><button class="button" id="gammyPage_deleteAuditemp">삭제</button></td>
                </tr>
                </tbody>
            </table>
        </div>


            <div class="modal-buttons">
                <button type="button" id="submit_modal" class="small-round-button type3">등록/수정</button>
                <button type="button" id="close_modal" class="small-round-button type2">닫기</button>
            </div>

    </div>

</div>

