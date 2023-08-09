<%--
  Class Name : selectDuesResult.jsp
  Description : 회비관리_납부결과조회
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
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import ="adminwork.com.cmm.LoginVO" %>
<c:set var="ImgUrl" value="/images/"/>

<%--  <link rel="stylesheet" href="<c:url value='/css/kicpa/app.css'/>">
 <link rel="stylesheet" href="<c:url value='/css/swiper-bundle.min.css'/>">
 <script type="text/javascript" src="<c:url value='/js/swiper-bundle.min.js'/>"></script> --%>
<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<%-- <script src="<c:url value='/js/html2canvas.js'/>"></script>
<script src="<c:url value='/js/html2canvas.min.js'/>"></script> --%>
<!-- Sheet JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>
<!--FileSaver savaAs 이용 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
<script>


    function fncLocation(){
        location.href="/kicpa/dues/selectDuesList.do";
    }

    function excelDown(){
        /*var id = "duesExcelDown";
        var title = "세부내역";

        var data_type = 'data:application/vnd.ms-excel;charset=utf-8';
        var table_html = encodeURIComponent(document.getElementById(id).outerHTML);

        var a = document.createElement('a');
        a.href = data_type + ',%EF%BB%BF' + table_html;
        a.download = title+'.xls';
        a.click();*/

        //XLSX.utils.book_new() 를 이용해서 새 통합 문서 객체 생성
        workBook = XLSX.utils.book_new();

        //테이블을 시트로 변환 (table_to_sheet 이용)
        //워크북을 시트로 변환 (book_append_sheet 이용)
        XLSX.utils.book_append_sheet(workBook , XLSX.utils.table_to_sheet(document.getElementById('tb1')), "tb1NAME");
        XLSX.utils.book_append_sheet(workBook , XLSX.utils.table_to_sheet(document.getElementById('tb2')), "tb2NAME");
        XLSX.utils.book_append_sheet(workBook , XLSX.utils.table_to_sheet(document.getElementById('tb3')), "tb3NAME");

        XLSX.writeFile(workBook, 'excelTest.xlsx', { bookType: 'xlsx', type: 'binary' });

    }


</script>
<style>
    th, td {
        border: 1px solid #444444;
    }
</style>
<body>
<div class="wrap">
    <div class="container">
        <section class="head-sub">
            <button class="btn-back" type="button" onclick="fncLocation();">
                <span>이전</span>
            </button>
            <h3>세부내역 확인</h3>
        </section>

        <section class="content">


            <div id="tabMain1" class="tab-main-content show">

                <div class="dues-wrap">


                    <div class="modal-bill-info4"  id="selectDuesList_duesList">
                        <!-- DECODE(A.DUES_CL,'00170002','연회비','00170003','부조회비','00170004','복지회비','00170005','세무자료','00170006','도서자료','00170007','특별회비','56030010','직무회비','56030040','직무회비','00170001','직무회비','기타') -->
                        <c:forEach var="bs" items="${billSum}" varStatus="status">
                            <c:if test="${bs.dues_cl eq '00170008' }">
                                <div class="bill-group duesChkToggle1">
                                    <strong class="tb-title">입회비</strong>
                                    <div class="bill-group-tb">
                                        <table>
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>수습공인회계사등록번호</th>
                                                <th>성명 </th>
                                                <th>금액</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:set var="cur_amt" value="0"/>

                                            <c:forEach var="bi" items="${bill}" varStatus="status">
                                                <!-- 연회비 -->
                                                <c:if test="${bi.dues_cl eq '00170008' }">
                                                    <tr>
                                                        <td>${bi.odr}</td>
                                                        <td>${bi.cmpy_nm}</td>
                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.cur_amt}" var="cur_amt_" />
                                                        <td>${cur_amt_}</td>
                                                        <c:set var="cur_amt" value="${cur_amt + bi.cur_amt}"/>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td>합계</td>
                                                <td></td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${cur_amt}" var="tot_sum_" />
                                                <td><strong>${tot_sum_}</strong></td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </c:if>

                            <c:if test="${bs.dues_cl eq '00170002' }">
                                <div class="bill-group duesChkToggle2">
                                    <strong class="tb-title">연회비</strong>
                                    <div class="bill-group-tb">
                                        <table>
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>연도</th>
                                                <th>연회비</th>
                                                <th>추가회비</th>
                                                <th>납기</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:set var="pass_sum" value="0"/>
                                            <c:set var="add_sum" value="0"/>
                                            <c:set var="delay_sum"  value="0"/>
                                            <c:set var="cur_sum" value="0"/>
                                            <c:set var="dues_sum" value="0"/>
                                            <c:forEach var="bi" items="${bill}" varStatus="status">
                                                <!-- 연회비 -->
                                                <c:if test="${bi.dues_cl eq '00170002' }">
                                                    <tr>
                                                        <td>${fn:substring(bi.due_de,0,4)}</td>
                                                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />
                                                        <td>${dues_amt_}</td>
                                                        <c:set var="add_sum" value="${add_sum + bi.add_amt}"/>
                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.add_amt}" var="add_amt_" />
                                                        <td>${add_amt_}</td>
                                                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td>합계</td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
                                                <td>${dues_sum_ }</td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${add_sum}" var="add_sum_" />
                                                <td>${add_sum_ }</td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum + add_sum}" var="tot_sum_" />
                                                <td><strong>${tot_sum_}</strong></td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${bs.dues_cl eq '00170003' }">
                                <div class="bill-group duesChkToggle3">
                                    <strong class="tb-title">부조회비</strong>
                                    <div class="bill-group-tb">
<div class="bill-box">
    <div class="bill-title">직무회비</div>
    <div class="title-box">
        <span>업무구분</span>
        <span>회사명</span>
        <span>접수일<br>(결산종료일)</span>
        <span>회비구분</span>
        <span>차수</span>
        <span>회비</span>
        <span>납기</span>
    </div>
    <div class="table-box">
        <p>감리업무 수수료</p>
        <p>(주)기수정밀</p>
        <p>2022.03.07</p>
        <p>추가회비</p>
        <p>1차</p>
        <p>320,000</p>
        <p>2099.12.31</p>
    </div>
    <div class="table-box">
        <p>감리업무 수수료</p>
        <p>(주)기수정밀</p>
        <p>2022.03.07</p>
        <p>추가회비</p>
        <p>1차</p>
        <p>320,000</p>
        <p>2099.12.31</p>
    </div>
</div>

<%--                                        <table id="duesExcelDown">--%>
<%--                                            <colgroup>--%>
<%--                                                <col />--%>
<%--                                                <col />--%>
<%--                                                <col />--%>
<%--                                                <col />--%>
<%--                                            </colgroup>--%>
<%--                                            <thead>--%>
<%--                                            <tr>--%>
<%--                                                <th>연도</th>--%>
<%--                                                <th>부조회비</th>--%>
<%--                                                <th>추가회비</th>--%>
<%--                                                <th>납기</th>--%>
<%--                                            </tr>--%>
<%--                                            </thead>--%>
<%--                                            <tbody>--%>
<%--                                            <c:set var="pass_sum" value="0"/>--%>
<%--                                            <c:set var="add_sum" value="0"/>--%>
<%--                                            <c:set var="delay_sum"  value="0"/>--%>
<%--                                            <c:set var="cur_sum" value="0"/>--%>
<%--                                            <c:set var="dues_sum" value="0"/>--%>
<%--                                            <c:forEach var="bi" items="${bill}" varStatus="status">--%>
<%--                                                <!-- 부조회비 -->--%>
<%--                                                <c:if test="${bi.dues_cl eq '00170003' }">--%>
<%--                                                    <tr>--%>
<%--                                                        <td>${fn:substring(bi.due_de,0,4)}</td>--%>
<%--                                                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>--%>
<%--                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />--%>
<%--                                                        <td>${dues_amt_}</td>--%>
<%--                                                        <c:set var="add_sum" value="${add_sum + bi.add_amt}"/>--%>
<%--                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.add_amt}" var="add_amt_" />--%>
<%--                                                        <td>${add_amt_}</td>--%>
<%--                                                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>--%>
<%--                                                    </tr>--%>
<%--                                                </c:if>--%>
<%--                                            </c:forEach>--%>

<%--                                            </tbody>--%>
<%--                                            <tfoot>--%>
<%--                                            <tr>--%>
<%--                                                <td>합계</td>--%>
<%--                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />--%>
<%--                                                <td>${dues_sum_ }</td>--%>
<%--                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${add_sum}" var="add_sum_" />--%>
<%--                                                <td>${add_sum_ }</td>--%>
<%--                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum + add_sum}" var="tot_sum_" />--%>
<%--                                                <td><strong>${tot_sum_ }</strong></td>--%>
<%--                                            </tr>--%>
<%--                                            </tfoot>--%>
<%--                                        </table>--%>
                                    </div>
                                </div>
                            </c:if>




                            <c:if test="${bs.dues_cl eq '00170004' }">
                                <div class="bill-group duesChkToggle4">
                                    <strong class="tb-title">복지회비</strong>
                                    <div class="bill-group-tb">
                                        <table>
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>해당년월</th>
                                                <th>복지회비</th>
                                                <th>납부방법 : 월납</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:set var="pass_sum" value="0"/>
                                            <c:set var="add_sum" value="0"/>
                                            <c:set var="delay_sum"  value="0"/>
                                            <c:set var="cur_sum" value="0"/>
                                            <c:set var="dues_sum" value="0"/>
                                            <c:forEach var="bi" items="${bill}" varStatus="status">
                                                <!-- 복지회비 -->
                                                <c:if test="${bi.dues_cl eq '00170004' }">
                                                    <tr>
                                                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}</td>
                                                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />
                                                        <td>${dues_amt_}</td>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td>합계</td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
                                                <td><strong>${dues_sum_ }</strong></td>

                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${bs.dues_cl eq '56030010' || bs.dues_cl eq '56030040' || bs.dues_cl eq '00170001' }">
                                <div class="bill-group duesChkToggle5">
                                    <strong class="tb-title">직무회비</strong>
                                    <div class="bill-group-tb">
                                        <table>
                                            <colgroup>
                                                <col width="120px"/>
                                                <col />
                                                <col width="120px"/>
                                                <col width="120px"/>
                                                <col width="120px"/>
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>업무구분</th>
                                                <th>회사명</th>
                                                <th>접수일(결산종료일)</th>
                                                <th>회비구분</th>
                                                <th>차수</th>
                                                <th>회비</th>
                                                <th>납기</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:set var="pass_sum" value="0"/>
                                            <c:set var="add_sum" value="0"/>
                                            <c:set var="delay_sum"  value="0"/>
                                            <c:set var="cur_sum" value="0"/>
                                            <c:set var="dues_sum" value="0"/>
                                            <c:forEach var="bi" items="${bill}" varStatus="status">
                                                <!-- 직무회비 -->
                                                <c:if test="${bi.dues_cl eq '56030010' || bi.dues_cl eq '56030040' || bi.dues_cl eq '00170001' }">
                                                    <tr>
                                                        <td>${bi.duty_dues_cl}</td>
                                                        <td>${bi.cmpy_nm}</td>
                                                        <td>
                                                            <c:choose>
                                                                <c:when test="${fn:length(bi.rcept_de) eq 8 }">
                                                                    ${fn:substring(bi.rcept_de,0,4)}.${fn:substring(bi.rcept_de,4,6)}.${fn:substring(bi.rcept_de,6,8)}
                                                                </c:when>
                                                                <c:when test="${fn:length(bi.rcept_de) eq 6 }">
                                                                    ${fn:substring(bi.rcept_de,0,4)}.${fn:substring(bi.rcept_de,4,6)}
                                                                </c:when>
                                                                <c:otherwise>
                                                                    ${bi.rcept_de}
                                                                </c:otherwise>
                                                            </c:choose>

                                                        </td>
                                                        <td>${bi.duty_flag}</td>
                                                        <td>${bi.odr}차</td>
                                                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt + bi.add_amt + bi.delay_amt}"/>
                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt + bi.add_amt + bi.delay_amt}" var="dues_amt_" />
                                                        <td>${dues_amt_}</td>
                                                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td>합계</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
                                                <td><strong>${dues_sum_ }</strong></td>
                                                <td></td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${bs.dues_cl eq '00170005' || bs.dues_cl eq '00170006' || bs.dues_cl eq '00170007' }">
                                <div class="bill-group duesChkToggle6">
                                    <strong class="tb-title">감리업무수수료</strong>
                                    <div class="bill-group-tb">
                                        <table>
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>업무구분</th>
                                                <th>회사명</th>
                                                <th>접수일(결산종료일)</th>
                                                <th>회비구분</th>
                                                <th>차수</th>
                                                <th>회비</th>
                                                <th>납기</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:set var="pass_sum" value="0"/>
                                            <c:set var="add_sum" value="0"/>
                                            <c:set var="delay_sum"  value="0"/>
                                            <c:set var="cur_sum" value="0"/>
                                            <c:set var="dues_sum" value="0"/>
                                            <c:forEach var="bi" items="${bill}" varStatus="status">
                                                <!-- 감리업무수수료 -->
                                                <c:if test="${bi.dues_cl eq '00170005' || bi.dues_cl eq '00170006' || bi.dues_cl eq '00170007' }">
                                                    <tr>
                                                        <td>${bi.duty_dues_cl}</td>
                                                        <td>${bi.cmpy_nm}</td>
                                                        <td>${bi.rcept_de}</td>
                                                        <td>${bi.duty_flag}</td>
                                                        <td>${bi.odr}차</td>
                                                        <c:set var="dues_sum" value="${dues_sum + bi.dues_amt}"/>
                                                        <fmt:formatNumber type="number" maxFractionDigits="3" value="${bi.dues_amt}" var="dues_amt_" />
                                                        <td>${dues_amt_}</td>
                                                        <td>${fn:substring(bi.due_de,0,4)}.${fn:substring(bi.due_de,4,6)}.${fn:substring(bi.due_de,6,8)}</td>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td>합계</td>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <fmt:formatNumber type="number" maxFractionDigits="3" value="${dues_sum}" var="dues_sum_" />
                                                <td><strong>${dues_sum_ }</strong></td>
                                                <td></td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </c:if>

                        </c:forEach>

                    </div>
                    <div class="btn-bottom">
                        <button class="btn-primary" id="testbtn" type="button" onclick="excelDown();">다운로드</button>
                    </div>
                </div>
                <!-- //탭1 -->
            </div>
        </section>

    </div>
</div>


</body>
</html>