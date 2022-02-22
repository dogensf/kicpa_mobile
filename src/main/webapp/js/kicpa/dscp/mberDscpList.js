var mberDscpList = mberDscpList || {}; // 회원 징계 내역 조회 namespace

mberDscpList.mberDscpList_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        mberDscpList.fn_init_resize_AUIGrid();
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

        mberDscpList.fn_createAUIGrid(); // AUGRID 생성
        mberDscpList.fn_init_events(); // 이벤트 등록
        mberDscpList.fn_init(); // 화면 초기화
    }
);


mberDscpList.fn_init = function() {

    $("#mberDscpList_SearchOrgn").selectpicker({
        noneSelectedText:"전체"
    });
    $("#mberDscpList_SearchDscpGubun").selectpicker({
        noneSelectedText:"전체"
    });

    $("#mberDscpList_SearchGubunNmOrNum").selectpicker({
        noneSelectedText:"전체"
    });

    mberDscpList.fn_search_mberDscpList("", "", "", "");
}


//AUIGrid 를 생성합니다.
mberDscpList.fn_createAUIGrid = function() {

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
                addNewTab('mberDscpReg', '/kicpa/mberDscpReg.do', '회원 징계 등록');

                //징계항목 리스트 조회
                var mberDscp_SearchParam = {};
                mberDscp_SearchParam.dspTrgCl = "MBER";
                mberDscp_SearchParam.cpaId = event.item.cpaId;
                //0.5초 후 화면 갱신
                setTimeout(() => fn_ajax_call("kicpa/selectMberDscp.do", mberDscp_SearchParam, mberDscpReg.selectMberDscp_success, mberDscpReg.selectMberDscp_error), 200);

                //징계내용 조회
                var mberDscpCntn_SearchParam = {};
                mberDscpCntn_SearchParam.dspTrgCl = "MBER";
                mberDscpCntn_SearchParam.dspSn = event.item.dspSn;
                //0.3초 후 화면 갱신
                setTimeout(() => fn_ajax_call("kicpa/selectMberDscpCntn.do", mberDscpCntn_SearchParam, mberDscpReg.selectMberDscpCntn_success, mberDscpReg.selectMberDscpCntn_error), 200);

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
    fn_AUIGrid_create([{id:"mberDscpList_grid_wrap", obj:[mberDscpList,"mberDscpList_gridID"], layout:columnLayout , prop:gridPros}]);
}


mberDscpList.fn_init_resize_AUIGrid= function(){
    fn_AUIGrid_resize([{id:"mberDscpList_grid_wrap",obj:mberDscpList.mberDscpList_gridID}]);
}

mberDscpList.fn_init_events = function() {

    //대상자 조회
    $("#mberDscpList_Search").on("click",function(e) {

        var mberDscpListSearchOrgn = $("#mberDscpList_SearchOrgn").selectpicker('val');                 // 조치기관
        var mberDscpListSearchDscpGubun = $('#mberDscpList_SearchDscpGubun').val();       //징계구분

        var mberDscpListSearchGubunNmOrNum = $('#mberDscpList_SearchGubunNmOrNum').val(); //검색구분
        var mberDscpListSearchNmOrNum = $('#mberDscpList_SearchNmOrNum').val();           //검색어 (성명, 등록번호)

        mberDscpList.fn_search_mberDscpList(mberDscpListSearchOrgn, mberDscpListSearchDscpGubun, mberDscpListSearchGubunNmOrNum, mberDscpListSearchNmOrNum);

        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });

    //테이블리스트 초기화
    $("#mberDscpList_Resert").on("click",function(e) {
        mberDscpList.fn_page_init("none");
    });

    // 징계죄회 홈페이지 연동
    // ..

    //회원징계내역조회(삭제)
    $('#mberDscpListDelete').on("click",function(e) {
        // 중요 : 체크된 아이템 얻는 메소드는 2개가 있습니다.
        // 1. getCheckedRowItems : 현재 그리드에서 숨겨진 행 아이템을 얻어오지 않습니다.
        // 2. getCheckedRowItemsAll :  현재 그리드에서 숨겨진 행 아이템들까지 모두 얻어 옵니다.
        // 일반 그리드에서 필터링이 되지 않았다면, getCheckedRowItems 과 getCheckedRowItemsAll 같습니다. (트리 그리드에서는 다름)

        var checkedItems = AUIGrid.getCheckedRowItemsAll(mberDscpList.mberDscpList_gridID); // 접혀진 자식들이 체크된 경우 모두 얻기
        if(checkedItems.length <= 0) {
            alert("System Alert Case 03 노출");
            return;
        }
        alert("System Alert Case 04 노출");
        var item;
        var mberDscpCntn_DeleteParam;
        for(var i=0, len = checkedItems.length; i<len; i++) {
            mberDscpCntn_DeleteParam = {};
            item = checkedItems[i];
            mberDscpCntn_DeleteParam.dspSn = item.dspSn;
            mberDscpCntn_DeleteParam.dspTrgCl = "MBER";
            fn_ajax_call("kicpa/deleteMberDscpList.do", mberDscpCntn_DeleteParam, mberDscpList.deleteMberDscp_success, mberDscpList.deleteMberDscp_error)
        }
        // 선택 삭제 후 재조회
        var mberDscpListSearchOrgn = $('#mberDscpList_SearchOrgn').val();                 // 조치기관
        var mberDscpListSearchDscpGubun = $('#mberDscpList_SearchDscpGubun').val();       //징계구분
        var mberDscpListSearchGubunNmOrNum = $('#mberDscpList_SearchGubunNmOrNum').val(); //검색구분
        var mberDscpListSearchNmOrNum = $('#mberDscpList_SearchNmOrNum').val();           //검색어 (성명, 등록번호)

        mberDscpList.fn_search_mberDscpList(mberDscpListSearchOrgn, mberDscpListSearchDscpGubun, mberDscpListSearchGubunNmOrNum, mberDscpListSearchNmOrNum);

        //조회 후 탭 닫히는 것에 대한 방어코드
        return false;
    });

    //회원징계등록
    $('#mberDscpReg').on("click",function(e) {
        addNewTab('mberDscpReg', '/kicpa/mberDscpReg.do', '회원 징계 등록');
    });
}

//테이블 초기화
mberDscpList.fn_page_init = function(type){

    $("#mberDscpList_SearchOrgn").selectpicker('val',"");
    $("#mberDscpList_SearchOrgn").selectpicker('refresh');
    $("#mberDscpList_SearchDscpGubun").selectpicker('val',"");
    $("#mberDscpList_SearchDscpGubun").selectpicker('refresh');
    $("#mberDscpList_SearchGubunNmOrNum").selectpicker('val',"");
    $("#mberDscpList_SearchGubunNmOrNum").selectpicker('refresh');

    $("#mberDscpList_SearchNmOrNum").val("");

    mberDscpList.fn_search_mberDscpList("", "", "", "");
    return false;
}

//조회 이벤트
mberDscpList.fn_search_mberDscpList = function(orgn, dscpGubun, gubunNmOrNum, nmOrNum){
    var mberDscpList_SearchParam = {};

    mberDscpList_SearchParam.dspTrgCl = "MBER";
    mberDscpList_SearchParam.orgn = orgn;
    mberDscpList_SearchParam.dscpGubun = dscpGubun;
    mberDscpList_SearchParam.gubunNmOrNum = gubunNmOrNum;
    mberDscpList_SearchParam.nmOrNum = nmOrNum;

    fn_ajax_call("/kicpa/selectMberDscpList.do", mberDscpList_SearchParam, mberDscpList.selectMberDscpList_success, mberDscpList.selectMberDscpList_error);
}

mberDscpList.selectMberDscpList_success = function(result) {
    AUIGrid.setGridData(mberDscpList.mberDscpList_gridID, result.mberDscpList);
}
mberDscpList.selectMberDscpList_error = function(xhr, status, error) {
    alert("회원 징계 내역 조회 실패");
}


mberDscpList.deleteMberDscp_success = function(result) {
    //회원 징계 등록/수정 화면 닫기
    closeTab('mberDscpReg');
}
mberDscpList.deleteMberDscp_error = function(xhr, status, error) {
    alert("선택 삭제 실패");
}
