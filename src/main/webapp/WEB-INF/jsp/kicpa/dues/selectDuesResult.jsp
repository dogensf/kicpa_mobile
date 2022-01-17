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
<c:set var="ImgUrl" value="/images/"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회비관리_납부결과조회</title>
<link rel="stylesheet" type="text/css" href="<c:url value="/css/base.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/kicpa.css"/>" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
<script>
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

    $(function() {
        $("#datepicker1").datepicker({
            onSelect:function(dateText, inst) {
                console.log(dateText);
            }
        });
        
        $("#datepicker2").datepicker({
            onSelect:function(dateText, inst) {
                console.log(dateText);
            }
        });
        
        $('.line-compact-button').click(function(){
        	$('.line-compact-button').each(function(){
        		$(this).removeClass('active');       	
        		
        	});
        	$(this).addClass('active');
        	
        	var myDate = new Date();        	
        	 var month = (("00"+myDate.getMonth() + 1).slice(-2));
       	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + myDate.getDate()  ;
       	    $("#datepicker1").val(datePlusMinus(prettyDate, - $(this).attr('month'), 'm'));
        	
        	
        	var myDate = new Date();
       	    var month = (("00"+myDate.getMonth() + 1).slice(-2));
       	    var prettyDate = myDate.getFullYear() +'-'+ month+'-'  + myDate.getDate()  ;
       	    $("#datepicker2").val(prettyDate);
        	
        	
        });
    });

    function datePlusMinus(sDate, nNum, type) {
        var yy = parseInt(sDate.substr(0, 4), 10);
        var mm = parseInt(sDate.substr(5, 2), 10);
        var dd = parseInt(sDate.substr(8), 10);
        
        var dt;
        if (type == "d") {
            dt = new Date(yy, mm - 1, dd + nNum);
        } else if (type == "m") {
            dt = new Date(yy, mm - 1, dd + (nNum * 31));
        } else if (type == "y") {
            dt = new Date(yy + nNum, mm - 1, dd);
        }
        
        yy = dt.getFullYear();
        mm = dt.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        dd = dt.getDate();
        dd = (dd < 10) ? '0' + dd : dd;
        
        return '' + yy + '-' + mm + '-' + dd;
    }
</script>
</head>
<body>
  <div class="kicpa-layer-content bg2">
    <div class="mypage">
      <h1 class="my-page-title2">
        회비관리
        <div class="menu">
          <ul>            
            <li><a href="<c:url value='/kicpa/dues/selectDuesList.do'/>" >회비 조회 / 납부</a></li>            
            <li><a href="<c:url value='/kicpa/dues/selectDuesNewList.do'/>">신규등록회비 납부</a></li>
            <li><a href="<c:url value='/kicpa/dues/selectDuesResult.do'/>" class="active">납부결과 조회</a></li>
          </ul>
        </div>
      </h1>

      <h2 class="my-page-sub-title">납부결과조회</h2>

      <div class="search-form">
        <div class="form-inner">
          <dl>
            <dt>납부일</dt>
            <dd>
              <span class="compact-input inline cal" style="width: 150px;">
                <input type="text" name="searchBgnDe" value="${searchVO.searchBgnDe}" id="datepicker1" placeholder="선택하세요" readonly>
                <button type="button" onclick="$('#datepicker1').datepicker('show');">calendar</button>
              </span>
              <em class="middle-icon">~</em>
              <span class="compact-input inline cal" style="width: 150px;">
                <input type="text" name="searchEndDe" value="${searchVO.searchEndDe}" id="datepicker2"placeholder="선택하세요" readonly>
                <button type="button" onclick="$('#datepicker2').datepicker('show');">calendar</button>
              </span>
            </dd>
            <dd class="buttons">
              <button type="button" class="line-compact-button" month="1">1개월</button>
              <button type="button" class="line-compact-button" month="2">2개월</button>
              <button type="button" class="line-compact-button" month="3">3개월</button>
              <button type="button" class="line-compact-button" month="4">4개월</button>
            </dd>
          </dl>
        </div>
        <button type="button" class="search">검색</button>
      </div>

      <div style="height: 20px;"></div>
 <div class="my-page-table2">
		<%-- <c:forEach var="drt" items="${list}" varStatus="status"> --%>	 
       	<table class="tb-bg">
          <colgroup>
            <col />
            <col style="width: 120px;" />
            <col style="width: 200px;" />
            <col style="width: 80px;" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="3" class="left title">연회비<c:out value='${drt.rqest_nm}'/></th>
              <fmt:formatNumber type="number" maxFractionDigits="3" value="${drt.dudt_in_amt}" var="d_amt" />
              <th class="right" style="text-align:center;"><c:out value='${d_amt}'/> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4"  class="bg-content">
                <div class="dl-list">
                  <dl class="price">
                    <dt>납부번호</dt>                    
                    <dd>122</dd>
                  </dl>
                  <dl>
                    <dt>납부일</dt>
                    <fmt:parseDate value="${drt.dudt}" var="Ddudt" pattern="yyyyMMdd"/>									
                    <dd><fmt:formatDate value="${Ddudt}" pattern="yyyy-MM-dd"/></dd>
                  </dl>
                  <dl>
                    <dt>납부방법</dt>
                    <dd>전자납부</dd>
                  </dl>                 
                </div>
                <div class="offline-jiro-check">
                  <span class="line-checkbox inline"><button type="button" class="search77" onclick="javascript:$('.image-view-layer').show();">영수증 보기</button></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
       
       <%-- </c:forEach> --%>

</div>
      <%-- <div class="table-title">
        <dl>
          <dt>납부번호</dt>
          <dd>${info.succes_amt }</dd>
        </dl>
       <!--  <dl>
          <dt>납부일</dt>
          <dd>yyyy-dd-mm</dd>
        </dl> -->
        <dl>
          <dt>납부방법</dt>
          <dd>전자납부</dd>
        </dl>
        <div class="result">
          <button type="button" class="line-button inline round">회비고지서</button>
          <strong class="price">${info.succes_amt }원</strong>
          <button type="button" class="toggle active">toggle</button>
        </div>
      </div>
      <div class="basic-table2">
        <table>
          <colgroup>
            <col style="width: 200px;" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col style="width: 150px;" />
          </colgroup>
          <thead>
            <tr>
              <th class="first-title">연회비</th>
              <th>회계연도</th>
              <th>연회비</th>
              <th>납기</th>
              <th>발생예정 추가회비</th>
              <th>기발생 추가회비</th>
              <th class="last">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="total-price" rowspan="3">906,000원</td>
              <td>yyyy</td>
              <td>300,000원</td>
              <td>yyyy-dd-mm</td>
              <td>3,000원</td>
              <td></td>
              <td class="center">303,000원</td>
            </tr>
            <!-- <tr>
              <td>yyyy</td>
              <td>300,000원</td>
              <td>yyyy-dd-mm</td>
              <td>3,000원</td>
              <td></td>
              <td class="center">303,000원</td>
            </tr>
            <tr>
              <td>yyyy</td>
              <td class="noti">300,000원</td>
              <td class="noti">yyyy-dd-mm<br/>이전 납부완료</td>
              <td>3,000원</td>
              <td></td>
              <td class="center">303,000원</td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <div class="basic-table2">
        <table>
          <colgroup>
            <col style="width: 200px;" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col style="width: 150px;" />
          </colgroup>
          <thead>
            <tr>
              <th class="first-title">공제회 부조회비</th>
              <th>회계연도</th>
              <th>연회비</th>
              <th>납기</th>
              <th>발생예정 추가회비</th>
              <th>기발생 추가회비</th>
              <th class="last">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="total-price" rowspan="3">906,000원</td>
              <td>yyyy</td>
              <td>300,000원</td>
              <td>yyyy-dd-mm</td>
              <td>3,000원</td>
              <td></td>
              <td class="center">303,000원</td>
            </tr>
            <tr>
              <td>yyyy</td>
              <td>300,000원</td>
              <td>yyyy-dd-mm</td>
              <td>3,000원</td>
              <td></td>
              <td class="center">303,000원</td>
            </tr>
            <tr>
              <td>yyyy</td>
              <td class="noti">300,000원</td>
              <td class="noti">yyyy-dd-mm<br/>이전 납부완료</td>
              <td>3,000원</td>
              <td></td>
              <td class="center">303,000원</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="basic-table2">
        <table>
          <colgroup>
            <col style="width: 200px;" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col style="width: 150px;" />
          </colgroup>
          <thead>
            <tr>
              <th class="first-title">감리업무 수수료</th>
              <th>회사명</th>
              <th>갱신년월</th>
              <th>회비구분</th>
              <th>차수</th>
              <th>납기</th>
              <th>직무회비</th>
              <th>발생예정 추가회비</th>
              <th>기발생 추가회비</th>
              <th class="last">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="total-price" rowspan="3">906,000원</td>
              <td>xxx전자</td>
              <td>yyyy-dd-mm</td>
              <td class="center">개별</td>
              <td class="center">1</td>
              <td>yyyy-dd-mm</td>
              <td>150,000</td>
              <td>3,500원</td>
              <td></td>
              <td class="center">135,000원</td>
            </tr>
            <tr>
              <td>xxx전자</td>
              <td>yyyy-dd-mm</td>
              <td class="center">개별</td>
              <td class="center">1</td>
              <td class="noti">yyyy-dd-mm<br/>이전 납부완료</td>
              <td class="noti">150,000</td>
              <td>3,500원</td>
              <td></td>
              <td class="center">135,000원</td>
            </tr>
          </tbody>
        </table>
      </div> --%>
    </div>

    

    <button type="button" class="close" onClick="javascript:parent.ClosePage();">close</button>
  </div>
</body>
</html>