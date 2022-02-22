var auditDscpList = auditDscpList || {}; // 회원 징계 내역 조회 namespace

auditDscpList.auditDscpList_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		auditDscpList.fn_init_resize_AUIGrid();
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
	}catch(e){
	}
});

// 문자전송 ready 시
$(document).ready(
    function() {

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

        auditDscpList.fn_createAUIGrid(); // AUGRID 생성
        auditDscpList.fn_init_events(); // 이벤트 등록
        auditDscpList.fn_init(); // 화면 초기화
    }
);


auditDscpList.fn_init = function() {

    $("#auditDscpList_SearchOrgn").selectpicker({
        noneSelectedText:"전체"
    });
    $("#auditDscpList_SearchDscpGubun").selectpicker({
        noneSelectedText:"전체"
    });

    $("#auditDscpList_SearchGubunNmOrNum").selectpicker({
        noneSelectedText:"전체"
    });

    auditDscpList.fn_search_auditDscpList("", "", "", "");
}


//AUIGrid 를 생성합니다.
auditDscpList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "cpaId",
        headerText : "등록번호"
    }, {
		dataField : "koreanNm",
		headerText : "성명"
	}, {
		dataField : "managtInstt",
		headerText : "조치기관"
	} , {
        dataField : "cdNm",
        headerText : "징계구분"
    }, {
        dataField : "dspTreDe",
        headerText : "처분일"
    } , {
        dataField : "dspBgnDe",
        headerText : "시작일"
    }, {
        dataField : "dspEndDe",
        headerText : "종료일"
    }, {
        dataField : "dspErsrDe",
        headerText : "말소일"
    }, {
        dataField : "selectYn",
        headerText : "조회",
        renderer : {
            type : "ButtonRenderer",
            labelText : "조회",
            onClick : function(event) {
                addNewTab('auditDscpReg', '/kicpa/auditDscpReg.do', '감사인 징계 등록');

                //징계항목 리스트 조회
                var auditDscp_SearchParam = {};
                auditDscp_SearchParam.dspTrgCl = "AUDIT";
                auditDscp_SearchParam.cpaId = event.item.cpaId;
                //0.5초 후 화면 갱신
                setTimeout(() => fn_ajax_call("kicpa/selectAuditDscp.do", auditDscp_SearchParam, auditDscpReg.selectAuditDscp_success, auditDscpReg.selectAuditDscp_error), 200);

                //징계내용 조회
                var auditDscpCntn_SearchParam = {};
                auditDscpCntn_SearchParam.dspTrgCl = "AUDIT";
                auditDscpCntn_SearchParam.dspSn = event.item.dspSn;
                //0.3초 후 화면 갱신
                setTimeout(() => fn_ajax_call("kicpa/selectAuditDscpCntn.do", auditDscpCntn_SearchParam, auditDscpReg.selectAuditDscpCntn_success, auditDscpReg.selectAuditDscpCntn_error), 200);

            },
            visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
                if(item.selectYn == "Y") {
                    return true;
                }
                return false;
            }
        }
    }];

    var gridPros = {
        showRowNumColumn : true,

        showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
    };
     fn_AUIGrid_create([{id:"auditDscpList_grid_wrap", obj:[auditDscpList,"auditDscpList_gridID"], layout:columnLayout , prop:gridPros}]);
}


auditDscpList.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"auditDscpList_grid_wrap",obj:auditDscpList.auditDscpList_gridID}]);
}

auditDscpList.fn_init_events = function() {

    //대상자 조회
    $("#auditDscpList_Search").on("click",function(e) {

        var auditDscpListSearchOrgn = $("#auditDscpList_SearchOrgn").selectpicker('val');                 // 조치기관
        var auditDscpListSearchDscpGubun = $('#auditDscpList_SearchDscpGubun').val();       //징계구분

        var auditDscpListSearchGubunNmOrNum = $('#auditDscpList_SearchGubunNmOrNum').val(); //검색구분
        var auditDscpListSearchNmOrNum = $('#auditDscpList_SearchNmOrNum').val();           //검색어 (성명, 등록번호)

        auditDscpList.fn_search_auditDscpList(auditDscpListSearchOrgn, auditDscpListSearchDscpGubun, auditDscpListSearchGubunNmOrNum, auditDscpListSearchNmOrNum);

        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });

    //테이블리스트 초기화
    $("#auditDscpList_Resert").on("click",function(e) {
        auditDscpList.fn_page_init("none");
    });

    // 징계죄회 홈페이지 연동
    // ..

    //감사인징계내역조회(삭제)
    $('#auditDscpListDelete').on("click",function(e) {
        // 중요 : 체크된 아이템 얻는 메소드는 2개가 있습니다.
        // 1. getCheckedRowItems : 현재 그리드에서 숨겨진 행 아이템을 얻어오지 않습니다.
        // 2. getCheckedRowItemsAll :  현재 그리드에서 숨겨진 행 아이템들까지 모두 얻어 옵니다.
        // 일반 그리드에서 필터링이 되지 않았다면, getCheckedRowItems 과 getCheckedRowItemsAll 같습니다. (트리 그리드에서는 다름)

        var checkedItems = AUIGrid.getCheckedRowItemsAll(auditDscpList.auditDscpList_gridID); // 접혀진 자식들이 체크된 경우 모두 얻기
        if(checkedItems.length <= 0) {
            alert("System Alert Case 03 노출");
            return;
        }
        alert("System Alert Case 04 노출");
        var item;
        var auditDscpCntn_DeleteParam;
        for(var i=0, len = checkedItems.length; i<len; i++) {
            auditDscpCntn_DeleteParam = {};
            item = checkedItems[i];
            auditDscpCntn_DeleteParam.dspSn = item.dspSn;
            auditDscpCntn_DeleteParam.dspTrgCl = "AUDIT";
            fn_ajax_call("kicpa/deleteAuditDscpList.do", auditDscpCntn_DeleteParam, auditDscpList.deleteAuditDscp_success, auditDscpList.deleteAuditDscp_error)
        }
        // 선택 삭제 후 재조회
        var auditDscpListSearchOrgn = $('#auditDscpList_SearchOrgn').val();                 // 조치기관
        var auditDscpListSearchDscpGubun = $('#auditDscpList_SearchDscpGubun').val();       //징계구분
        var auditDscpListSearchGubunNmOrNum = $('#auditDscpList_SearchGubunNmOrNum').val(); //검색구분
        var auditDscpListSearchNmOrNum = $('#auditDscpList_SearchNmOrNum').val();           //검색어 (성명, 등록번호)

        auditDscpList.fn_search_auditDscpList(auditDscpListSearchOrgn, auditDscpListSearchDscpGubun, auditDscpListSearchGubunNmOrNum, auditDscpListSearchNmOrNum);

        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });

    //감사인징계등록
     $('#auditDscpReg').on("click",function(e) {
     	addNewTab('auditDscpReg', '/kicpa/auditDscpReg.do', '감사인 징계 등록');
     });
}

//테이블 초기화
auditDscpList.fn_page_init = function(type){

    $("#auditDscpList_SearchOrgn").selectpicker('val',"");
    $("#auditDscpList_SearchOrgn").selectpicker('refresh');
    $("#auditDscpList_SearchDscpGubun").selectpicker('val',"");
    $("#auditDscpList_SearchDscpGubun").selectpicker('refresh');
    $("#auditDscpList_SearchGubunNmOrNum").selectpicker('val',"");
    $("#auditDscpList_SearchGubunNmOrNum").selectpicker('refresh');

    $("#auditDscpList_SearchNmOrNum").val("");

    auditDscpList.fn_search_auditDscpList("", "", "", "");
    return false;
}

//조회 이벤트
auditDscpList.fn_search_auditDscpList = function(orgn, dscpGubun, gubunNmOrNum, nmOrNum){
    var auditDscpList_SearchParam = {};

    auditDscpList_SearchParam.dspTrgCl = "AUDIT";
    auditDscpList_SearchParam.orgn = orgn;
    auditDscpList_SearchParam.dscpGubun = dscpGubun;
    auditDscpList_SearchParam.gubunNmOrNum = gubunNmOrNum;
    auditDscpList_SearchParam.nmOrNum = nmOrNum;

    fn_ajax_call("/kicpa/selectAuditDscpList.do", auditDscpList_SearchParam, auditDscpList.selectAuditDscpList_success, auditDscpList.selectAuditDscpList_error);
}

auditDscpList.selectAuditDscpList_success = function(result) {
    AUIGrid.setGridData(auditDscpList.auditDscpList_gridID, result.auditDscpList);
}
auditDscpList.selectAuditDscpList_error = function(xhr, status, error) {
    alert("감사인 징계 내역 조회 실패");
}


auditDscpList.deleteAuditDscp_success = function(result) {
    //감사인 징계 등록/수정 화면 닫기
    closeTab('auditDscpReg');
}
auditDscpList.deleteAuditDscp_error = function(xhr, status, error) {
    alert("선택 삭제 실패");
}
