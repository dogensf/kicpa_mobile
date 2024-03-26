<%--
  Created by IntelliJ IDEA.
  User: 도젠
  Date: 2024-03-26
  Time: 오후 2:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="/js/kicpa/memberEvent/memberEventReg.js?ver=1"></script>
<script>
    $(document).ready(function(){
        memberEventReg.cpaSearchPopInit();
    });

    function fncLocation(){
        window.close();
    }

    function fnCpaSearchPopListSuccess(data){
        var list = data.list;
        $(".board-list ul .addRow").remove();
        if(list != null && list.length > 0 ){
            $.each(list,function(i,o){

                var rowData = $(".board-list ul .firstRow").clone();
                rowData.removeClass("firstRow");
                rowData.addClass("addRow");
                rowData.find(".title-zone p").html(o.koreanNm +' ['+ o.cpaId+ ']');
                rowData.show();

                rowData.off().on("click",function(){
                    $(opener.document).find("input[name='koreanNm']").val(o.koreanNm);
                    $(opener.document).find("input[name='cpaId']").val(o.cpaId);

                    window.close();
                });

                var cpaNm = o.koreanNm;
                var relation = $(opener.document).find("select[name='relation']").val();

                if((cpaNm != "" && cpaNm != null) && (relation != "" && relation != null)){

                    if(relation != "자녀상"){
                        relation = relation.replaceAll("상", " 별세")
                    }

                    $(opener.document).find("input[name='regTitle']").val(cpaNm + " 회계사님 " + relation);
                }
                else{
                    $(opener.document).find("input[name='regTitle']").val('');
                }

                $(".board-list ul").append(rowData);
            });
        }
        else{
            var rowData = $(".board-list ul .firstRow").clone();
            rowData.removeClass("firstRow");
            rowData.addClass("addRow");
            rowData.find(".title-zone p").html('일치하는 회원정보가 없습니다.');
            rowData.show();
            $(".board-list ul").append(rowData);
        }
    }
</script>

<form id="cpaSearchPopForm" name="cpaSearchPopForm">
    <input type="hidden" name="pageIndex" id="pageIndex" value="1">

    <section class="head-sub">
        <button class="btn-back" type="button" onclick="fncLocation();">
            <span>이전</span>
        </button>
        <h3>대상자 조회</h3>
    </section>
    <section class="content">

        <div id="tabMain1" class="tab-main-content show">
            <div class="search-box" style="display: flex;">
                <input class="search" type="text" name="searchKeyword1" placeholder="대상자명을 입력하세요." style="padding: 0; margin-right: 20px;" readonly/>
                <input class="search" type="text" name="searchKeyword2" placeholder="대상자 등록번호를 입력하세요." style="padding: 0;" readonly/>
            </div>

            <div id="tabSub1" class="tab-sub-content show">
                <!-- 게시판 목록 -->
                <div class="board-list">
                    <ul>
                        <li class="firstRow" style="display: none;">
                            <div class="title-zone">
                                <p></p>
                            </div>
                            <div class="info-zone">
                                <span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div><!-- tabSub1 -->
        </div><!-- tabMain1 -->
    </section>
</form>