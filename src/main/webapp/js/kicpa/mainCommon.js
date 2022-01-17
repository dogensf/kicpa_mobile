/**
 * @---------------------------------------------------
 *
 *
 * @---------------------------------------------------
 */
var mainCommonList = mainCommonList || {myGridIntro:"",myGridTrain:"",myGridMember:"",myGridAuditInfo:"",myGridAudit:""};

$(document).ready(function(){

    window.onresize = function () {

        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        if (typeof mainCommonList.myGridIntro !== "undefined") {
            AUIGrid.resize(mainCommonList.myGridIntro);
        }
        if (typeof mainCommonList.myGridTrain !== "undefined") {
            AUIGrid.resize(mainCommonList.myGridTrain);
        }
        if (typeof mainCommonList.myGridMember !== "undefined") {
            AUIGrid.resize(mainCommonList.myGridMember);
        }
        if (typeof mainCommonList.myGridAuditInfo !== "undefined") {
            AUIGrid.resize(mainCommonList.myGridAuditInfo);
        }
        if (typeof mainCommonList.myGridAudit !== "undefined") {
            AUIGrid.resize(mainCommonList.myGridAudit);
        }
    };

    // 엔터
    $('#cpaUser-Search').on('keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            mainCommonList.fCpaUserDynamicSearch($('#cpaUser-Search').val(), mainCommonList.myGridIntro, "NonAutoList");
        }
    });
    $('#cpaTrain-Search').on('keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            mainCommonList.fCpaTrainDynamicSearch($('#cpaTrain-Search').val(), mainCommonList.myGridTrain, "NonAutoList");
        }
    });
    $('#cpaMember-Search').on('keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            mainCommonList.fCpaMemberDynamicSearch($('#cpaMember-Search').val(), mainCommonList.myGridMember, "NonAutoList");
        }
    });
    $('#cpaAuditInfo-Search').on('keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            mainCommonList.fCpaAuditInfoDynamicSearch($('#cpaAuditInfo-Search').val(), mainCommonList.myGridAuditInfo, "NonAutoList");
        }
    });
    $('#cpaAudit-Search').on('keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            mainCommonList.fCpaAuditDynamicSearch($('#cpaAudit-Search').val(), mainCommonList.myGridAudit, "NonAutoList");
        }
    });
    //검색 클릭
    $("#cpaUser-SearchBtn").click(function () {
        mainCommonList.fCpaUserDynamicSearch($('#cpaUser-Search').val(), mainCommonList.myGridIntro, "NonAutoList");
    });
    $("#cpaTrain-SearchBtn").click(function () {
        mainCommonList.fCpaTrainDynamicSearch($('#cpaTrain-Search').val(), mainCommonList.myGridTrain, "NonAutoList");
    });
    $("#cpaMember-SearchBtn").click(function () {
        mainCommonList.fCpaMemberDynamicSearch($('#cpaMember-Search').val(), mainCommonList.myGridMember, "NonAutoList");
    });
    $("#cpaAuditInfo-SearchBtn").click(function () {
        mainCommonList.fCpaAuditInfoDynamicSearch($('#cpaAuditInfo-Search').val(), mainCommonList.myGridAuditInfo, "NonAutoList");
    });
    $("#cpaAudit-SearchBtn").click(function () {
        mainCommonList.fCpaAuditDynamicSearch($('#cpaAudit-Search').val(), mainCommonList.myGridAudit, "NonAutoList");
    });

    $('#cpaUserListPopup').on('shown.bs.modal', function (e) {
        AUIGrid.resize(mainCommonList.myGridIntro);
    });
    $('#cpaTrainListPopup').on('shown.bs.modal', function (e) {
        AUIGrid.resize(mainCommonList.myGridTrain);
    });
    $('#cpaMemberListPopup').on('shown.bs.modal', function (e) {
        AUIGrid.resize(mainCommonList.myGridMember);
    });
    $('#cpaAuditInfoListPopup').on('shown.bs.modal', function (e) {
        AUIGrid.resize(mainCommonList.myGridAuditInfo);
    });
    $('#cpaAuditListPopup').on('shown.bs.modal', function (e) {
        AUIGrid.resize(mainCommonList.myGridAudit);
    });

    $("#commonUserSelect").on("click",function (e) {
        //console.log("event", e );
        //console.log("mainCommonList.cpaUserSearchList", mainCommonList.cpaUserSearchList );

        if(isNull(mainCommonList.cpaUserSearchList)) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }else {
            mainCommonList.fn_set_search(mainCommonList.cpaUserSearchList);
            $('#cpaUserListPopup').modal('hide');
        }
    });

    $("#commonTrainSelect").on("click",function (e) {
        //console.log("event", e );
        //console.log("mainCommonList.cpaUserSearchList", mainCommonList.cpaUserSearchList );

        if(isNull(mainCommonList.cpaTrainSearchList)) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }else {
            mainCommonList.fn_set_searchTrain(mainCommonList.cpaTrainSearchList);
            $('#cpaTrainListPopup').modal('hide');
        }
    });

    $("#commonMemberSelect").on("click",function (e) {
        //console.log("event", e );
        //console.log("mainCommonList.cpaUserSearchList", mainCommonList.cpaUserSearchList );

        if(isNull(mainCommonList.cpaMemberSearchList)) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }else {
            mainCommonList.fn_set_searchMember(mainCommonList.cpaMemberSearchList);
            $('#cpaMemberListPopup').modal('hide');
        }
    });

    $("#commonAuditInfoSelect").on("click",function (e) {
        //console.log("event", e );
        //console.log("mainCommonList.cpaUserSearchList", mainCommonList.cpaUserSearchList );

        if(isNull(mainCommonList.cpaAuditInfoSearchList)) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }else {
            mainCommonList.fn_set_searchAuditInfo(mainCommonList.cpaAuditInfoSearchList);
            $('#cpaAuditInfoListPopup').modal('hide');
        }
    });
    
    $("#commonAuditSelect").on("click",function (e) {
        //console.log("event", e );
        //console.log("mainCommonList.cpaUserSearchList", mainCommonList.cpaUserSearchList );

        if(isNull(mainCommonList.cpaAuditSearchList)) {
            alertMessage("선택된 내역이 없습니다.","","-");
            return false;
        }else {
            mainCommonList.fn_set_searchAudit(mainCommonList.cpaAuditSearchList);
            $('#cpaAuditListPopup').modal('hide');
        }
    });
});

mainCommonList.cpaUserListGrid = function(){
    cpaUserSearchList = "";

    if(!AUIGrid.isCreated("#grid_cpaUserList")) {
        mainCommonList.createAUIGridIntro();
    }

    var searchVal = $('#cpaUser-Search').val();

    if(!isNull(searchVal)) {
        mainCommonList.fCpaUserDynamicSearch(searchVal, mainCommonList.myGridIntro, "NonAutoList");
    }
}

mainCommonList.cpaTrainListGrid = function(){
    cpaTrainSearchList = "";

    if(!AUIGrid.isCreated("#grid_cpaTrainList")) {
        mainCommonList.createAUIGridTrain();
    }

    var searchVal = $('#cpaTrain-Search').val();

    mainCommonList.fCpaTrainDynamicSearch(searchVal, mainCommonList.myGridTrain, "NonAutoList");
}

mainCommonList.cpaMemberListGrid = function(){
    cpaMemberSearchList = "";

    if(!AUIGrid.isCreated("#grid_cpaMemberList")) {
        mainCommonList.createAUIGridMember();
    }

    var searchVal = $('#cpaMember-Search').val();

    mainCommonList.fCpaMemberDynamicSearch(searchVal, mainCommonList.myGridMember, "NonAutoList");
}

mainCommonList.cpaAuditInfoListGrid = function(){
    cpaAuditInfoSearchList = "";

    if(!AUIGrid.isCreated("#grid_cpaAuditInfoList")) {
        mainCommonList.createAUIGridAuditInfo();
    }

    var searchVal = $('#cpaAuditInfo-Search').val();

    mainCommonList.fCpaAuditInfoDynamicSearch(searchVal, mainCommonList.myGridAuditInfo, "NonAutoList");
}

mainCommonList.cpaAuditListGrid = function(){
    cpaAuditSearchList = "";

    if(!AUIGrid.isCreated("#grid_cpaAuditList")) {
        mainCommonList.createAUIGridAudit();
    }

    var searchVal = $('#cpaAudit-Search').val();

    mainCommonList.fCpaAuditDynamicSearch(searchVal, mainCommonList.myGridAudit, "NonAutoList");
}

// AUIGrid 를 생성합니다.
mainCommonList.createAUIGridIntro =function() {

    var columnLayoutIntro = [{
        dataField: "koreanNm",
        headerText: "성명",
        width: "25%"
    },{
        dataField: "cpaId",
        headerText: "회원등록번호",
        width: "25%"
    },{
        dataField: "statusClNm",
        headerText: "개업구분",
        width: "25%"
    },{
        dataField: "korAudNm",
        headerText: "감사인명",
        width: "25%"
    },{
        dataField: "cpaSn",
        headerText: "순번",
        visible: false
    },{
        dataField: "statusCl",
        headerText: "개업구분분류",
        visible: false
    },{
        dataField: "pin",
        headerText: "개인식별코드",
        visible: false
    },{
        dataField: "cpaCl",
        headerText: "회원등록분류",
        visible: false
    },{
        dataField: "opetrDe",
        headerText: "처리일(경력사항 마지막날짜)",
        visible: false
    },{
        dataField: "registDe",
        headerText: "등록일",
        visible: false
    },{
        dataField: "lastRegistDe",
        headerText: "최종등록일(등록갱신)",
        visible: false
    },{
        dataField: "mberFlag",
        headerText: "회원구분",
        visible: false
    },{
        dataField: "auditId",
        headerText: "감사인ID",
        visible: false
    },{
        dataField: "auditOfcps",
        headerText: "감사인구성구분",
        visible: false
    },{
        dataField: "canclCl",
        headerText: "등록취소구분",
        visible: false
    },{
        dataField: "rsndqfEndDe",
        headerText: "결격사유종료일",
        visible: false
    },{
        dataField: "remark",
        headerText: "공인회계사 메모 테이블 MERGE",
        visible: false
    },{
        dataField: "memo",
        headerText: "메모",
        visible: false
    },{
        dataField: "extrlAudCl",
        headerText: "외감구분",
        visible: false
    },{
        dataField: "extrlAudDe",
        headerText: "외감가능일자",
        visible: false
    },{
        dataField: "bizrNo",
        headerText: "사업자등록번호",
        visible: false
    },{
        dataField: "moblPhonNo",
        headerText: "휴대전화",
        visible: false
    },{
        dataField: "mainEmail",
        headerText: "이메일",
        visible: false
    }
    ];

    // 그리드 속성 설정
    var gridPros = {
        
        editable: false,                    // 편집 가능 여부 (기본값 : false)
        rowIdField: "pin",
        enterKeyColumnBase: true,           // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
        enableRightDownFocus: true,
        selectionMode: "singleRow",         // 셀 선택모드 (기본값: singleCell)
        useContextMenu: true,               // 컨텍스트 메뉴 사용 여부 (기본값 : false)
        enableFilter: true,                 // 필터 사용 여부 (기본값 : false)
        useGroupingPanel: false,            // 그룹핑 패널 사용
        showStateColumn: false,             // 상태 칼럼 사용
        displayTreeOpen: true,              // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
        showRowNumColumn: false,
        noDataMessage: "검색결과가 없습니다.",
        groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
    };

    mainCommonList.myGridIntro = AUIGrid.create("#grid_cpaUserList" , columnLayoutIntro, gridPros);

    // 선택 이벤트 바인딩
    AUIGrid.bind(mainCommonList.myGridIntro, "cellClick", function (event) {
        mainCommonList.cpaUserSearchList = event.item;
    });

    AUIGrid.bind(mainCommonList.myGridIntro, "cellDoubleClick", function (event) {
        mainCommonList.callback(event.item);
        $('#cpaUserListPopup').modal('hide');
        //mainCommonList.fn_set_search()
    });

}

mainCommonList.createAUIGridTrain =function() {

    var columnLayoutTrain = [{
        dataField: "koreanNm",
        headerText: "성명",
        width: "20%"
    },{
        dataField: "brthdy",
        headerText: "생년월일",
        width: "20%"
    },{
        dataField: "appCpaNo",
        headerText: "수습등록번호",
        width: "20%"
    },{
        dataField: "apntcClNm",
        headerText: "구분",
        width: "20%"
    },{
        dataField: "appInsttCdNm",
        headerText: "실무수습기관",
        width: "20%"
    },{
        dataField: "pin",
        headerText: "개인식별번호",
        visible: false
    },{
        dataField: "appRegistDe",
        headerText: "실무수습등록일",
        visible: false
    },{
        dataField: "appEndDe",
        headerText: "실무수습종료일",
        visible: false
    },{
        dataField: "audRegistDe",
        headerText: "외감수습등록일",
        visible: false
    },{
        dataField: "audEndDe",
        headerText: "외감수습종료일",
        visible: false
    },{
        dataField: "apntcCl",
        headerText: "실무수습구분",
        visible: false
    },{
        dataField: "appInsttCd",
        headerText: "실무수습기관코드",
        visible: false
    },{
        dataField: "appInsttEtc",
        headerText: "실무수습기관상세기타",
        visible: false
    },{
        dataField: "appInsttEtcYn",
        headerText: "실무수습기관상세기타여부",
        visible: false
    },{
        dataField: "guideCpaNo",
        headerText: "지도공인회계사등록번호",
        visible: false
    },{
        dataField: "remark",
        headerText: "비고",
        visible: false
    },{
        dataField: "memo",
        headerText: "메모",
        visible: false
    }
    ];

    // 그리드 속성 설정
    var gridPros = {

        editable: false,                    // 편집 가능 여부 (기본값 : false)
        enterKeyColumnBase: true,           // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
        enableRightDownFocus: true,
        selectionMode: "singleRow",         // 셀 선택모드 (기본값: singleCell)
        useContextMenu: true,               // 컨텍스트 메뉴 사용 여부 (기본값 : false)
        enableFilter: true,                 // 필터 사용 여부 (기본값 : false)
        useGroupingPanel: false,            // 그룹핑 패널 사용
        showStateColumn: false,             // 상태 칼럼 사용
        displayTreeOpen: true,              // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
        showRowNumColumn: false,
        noDataMessage: "검색결과가 없습니다.",
        groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
    };

    mainCommonList.myGridTrain = AUIGrid.create("#grid_cpaTrainList" , columnLayoutTrain, gridPros);

    // 선택 이벤트 바인딩
    AUIGrid.bind(mainCommonList.myGridTrain, "cellClick", function (event) {
        mainCommonList.cpaTrainSearchList = event.item;
    });

    AUIGrid.bind(mainCommonList.myGridTrain, "cellDoubleClick", function (event) {
        mainCommonList.callback(event.item);
        $('#cpaTrainListPopup').modal('hide');
        //mainCommonList.fn_set_search()
    });

}

mainCommonList.createAUIGridMember =function() {

    var columnLayoutMember = [{
        dataField: "koreanNm",
        headerText: "성명",
        width: "20%"
    },{
        dataField: "brthdy",
        headerText: "생년월일",
        width: "20%"
    },{
        dataField: "psexamYear",
        headerText: "합격년도",
        width: "20%"
    },{
        dataField: "appCpaNo",
        headerText: "수습등록번호",
        width: "20%"
    },{
        dataField: "cpaId",
        headerText: "회원등록번호",
        width: "20%"
    },{
        dataField: "pin",
        headerText: "개인식별번호",
        visible: false
    },{
        dataField: "testCl",
        headerText: "시험구분",
        visible: false
    },{
        dataField: "passEdycNo",
        headerText: "합격증서번호",
        visible: false
    },{
        dataField: "passDe",
        headerText: "합격일",
        visible: false
    },{
        dataField: "passClNo",
        headerText: "합격분류번호",
        visible: false
    },{
        dataField: "passFlag",
        headerText: "합격구분",
        visible: false
    },{
        dataField: "orginCtlf",
        headerText: "원자격국",
        visible: false
    },{
        dataField: "nlty",
        headerText: "국적",
        visible: false
    },{
        dataField: "remark",
        headerText: "비고",
        visible: false
    }
    ];

    // 그리드 속성 설정
    var gridPros = {

        editable: false,                    // 편집 가능 여부 (기본값 : false)
        enterKeyColumnBase: true,           // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
        enableRightDownFocus: true,
        selectionMode: "singleRow",         // 셀 선택모드 (기본값: singleCell)
        useContextMenu: true,               // 컨텍스트 메뉴 사용 여부 (기본값 : false)
        enableFilter: true,                 // 필터 사용 여부 (기본값 : false)
        useGroupingPanel: false,            // 그룹핑 패널 사용
        showStateColumn: false,             // 상태 칼럼 사용
        displayTreeOpen: true,              // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
        showRowNumColumn: false,
        noDataMessage: "검색결과가 없습니다.",
        groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
    };

    mainCommonList.myGridMember = AUIGrid.create("#grid_cpaMemberList" , columnLayoutMember, gridPros);

    // 선택 이벤트 바인딩
    AUIGrid.bind(mainCommonList.myGridMember, "cellClick", function (event) {
        mainCommonList.cpaMemberSearchList = event.item;
    });

    AUIGrid.bind(mainCommonList.myGridMember, "cellDoubleClick", function (event) {
        mainCommonList.callback(event.item);
        $('#cpaMemberListPopup').modal('hide');
        //mainCommonList.fn_set_search()
    });

}

mainCommonList.createAUIGridAuditInfo =function() {

    var columnLayoutAuditInfo = [{
        dataField: "auditCd",
        headerText: "감사인코드",
        width: "50%"
    },{
        dataField: "korAudNm",
        headerText: "감사인명",
        width: "25%"
    },{
        dataField: "chcAudNm",
        headerText: "한자감사인명",
        width: "25%"
    },{
        dataField: "engAudNm",
        headerText: "영문감사인명",
        visible: false
    },{
        dataField: "formAudNm",
        headerText: "양식영문감사인명",
        visible: false
    },{
        dataField: "registDe",
        headerText: "등록일",
        visible: false
    },{
        dataField: "lastUpdtDe",
        headerText: "최종변경일",
        visible: false
    },{
        dataField: "audGrpCl",
        headerText: "감사인구분(감사인구분회계법인,감사반,합동회계사무소,개인감사반)",
        visible: false
    },{
        dataField: "StatusCl",
        headerText: "개업구분분류",
        visible: false
    },{
        dataField: "statusClNm",
        headerText: "개업구분",
        visible: false
    },{
        dataField: "dsrgnzDe",
        headerText: "해산일",
        visible: false
    },{
        dataField: "dsrgnzResn",
        headerText: "해산사유",
        visible: false
    },{
        dataField: "capital",
        headerText: "자본금",
        visible: false
    },{
        dataField: "fncsusvCd",
        headerText: "금감원코드",
        visible: false
    },{
        dataField: "audCprNo",
        headerText: "회계법인등록번호(금융위)",
        visible: false
    },{
        dataField: "hmpg",
        headerText: "홈페이지",
        visible: false
    },{
        dataField: "engHmpg",
        headerText: "영문홈페이지",
        visible: false
    },{
        dataField: "repPin",
        headerText: "행정대표 식별번호",
        visible: false
    },{
        dataField: "lawPin",
        headerText: "준법감시인 식별번호",
        visible: false
    },{
        dataField: "bcncCd",
        headerText: "거래처코드(ERP 전표 전송용)",
        visible: false
    }
    ];

    // 그리드 속성 설정
    var gridPros = {

        editable: false,                    // 편집 가능 여부 (기본값 : false)
        enterKeyColumnBase: true,           // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
        enableRightDownFocus: true,
        selectionMode: "singleRow",         // 셀 선택모드 (기본값: singleCell)
        useContextMenu: true,               // 컨텍스트 메뉴 사용 여부 (기본값 : false)
        enableFilter: true,                 // 필터 사용 여부 (기본값 : false)
        useGroupingPanel: false,            // 그룹핑 패널 사용
        showStateColumn: false,             // 상태 칼럼 사용
        displayTreeOpen: true,              // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
        showRowNumColumn: false,
        noDataMessage: "검색결과가 없습니다.",
        groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
    };

    mainCommonList.myGridAuditInfo = AUIGrid.create("#grid_cpaAuditInfoList" , columnLayoutAuditInfo, gridPros);

    // 선택 이벤트 바인딩
    AUIGrid.bind(mainCommonList.myGridAuditInfo, "cellClick", function (event) {
        mainCommonList.cpaAuditInfoSearchList = event.item;
    });

    AUIGrid.bind(mainCommonList.myGridAuditInfo, "cellDoubleClick", function (event) {
        mainCommonList.callback(event.item);
        $('#cpaAuditInfoListPopup').modal('hide');
        //mainCommonList.fn_set_search()
    });

}

mainCommonList.createAUIGridAudit =function() {

    var columnLayoutAudit = [{
        dataField: "auditNm",
        headerText: "감사인명",
        width: "50%"
    },{
        dataField: "auditCd",
        headerText: "감사인코드",
        width: "25%"
    },{
        dataField: "statusClNm",
        headerText: "개업구분",
        width: "25%"
    },{
        dataField: "auditCl",
        headerText: "사무소구분",
        visible: false
    },{
        dataField: "auditId",
        headerText: "감사인ID",
        visible: false
    },{
        dataField: "registDe",
        headerText: "등록일",
        visible: false
    },{
        dataField: "lastUpdtDe",
        headerText: "최종변경일",
        visible: false
    },{
        dataField: "statusCl",
        headerText: "개업구분코드",
        visible: false
    },{
        dataField: "dsrgnzDe",
        headerText: "폐쇄일",
        visible: false
    },{
        dataField: "opetrDe",
        headerText: "처리일",
        visible: false
    },{
        dataField: "auditEmail",
        headerText: "대표전자메일",
        visible: false
    },{
        dataField: "taxAgencyNo",
        headerText: "세무조정반 관리번호",
        visible: false
    },{
        dataField: "taxGrpCl",
        headerText: "세무조정반 분류",
        visible: false
    },{
        dataField: "taxGrpNo",
        headerText: "세무조정반 번호",
        visible: false
    },{
        dataField: "bizrNo",
        headerText: "사업자등록번호",
        visible: false
    }
    ];

    // 그리드 속성 설정
    var gridPros = {

        editable: false,                    // 편집 가능 여부 (기본값 : false)
        enterKeyColumnBase: true,           // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
        enableRightDownFocus: true,
        selectionMode: "singleRow",         // 셀 선택모드 (기본값: singleCell)
        useContextMenu: true,               // 컨텍스트 메뉴 사용 여부 (기본값 : false)
        enableFilter: true,                 // 필터 사용 여부 (기본값 : false)
        useGroupingPanel: false,            // 그룹핑 패널 사용
        showStateColumn: false,             // 상태 칼럼 사용
        displayTreeOpen: true,              // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
        showRowNumColumn: false,
        noDataMessage: "검색결과가 없습니다.",
        groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
    };

    mainCommonList.myGridAudit = AUIGrid.create("#grid_cpaAuditList" , columnLayoutAudit, gridPros);

    // 선택 이벤트 바인딩
    AUIGrid.bind(mainCommonList.myGridAudit, "cellClick", function (event) {
        mainCommonList.cpaAuditSearchList = event.item;
    });

    AUIGrid.bind(mainCommonList.myGridAudit, "cellDoubleClick", function (event) {
        mainCommonList.callback(event.item);
        $('#cpaAuditListPopup').modal('hide');
        //mainCommonList.fn_set_search()
    });

}

//회원 검색
mainCommonList.fCpaUserDynamicSearch =function (TargetVal, GridID, NonAutoSearch) {
    AUIGrid.clearGridData(GridID);
    if(isNull(NonAutoSearch))
    {
        //clearPatientFooterInfo();
    }

    var searchvalue = TargetVal;
    // 이름  검색
    mainCommonList.fCpaUserRequestData(GridID, "name", searchvalue, "");

}

mainCommonList.fCpaUserRequestData= function (GridID, part, param, param2) {

    var url = "";

    url  = "/kicpa/cpa/cpaMemList.do?usrNm=" + param;
        /*url  = "/kicpa/cpa/cpaMemList.do?FirstVisitDate=" + getCurrentDate() + "&instCode=" + getInstcdSession();*/


    // ajax 요청 전 그리드에 로더 표시..원할 경우 주석 제거
    AUIGrid.showAjaxLoader(GridID);

    // ajax (XMLHttpRequest) 로 그리드 데이터 요청
    $.ajax( {
        url : url,
        async : false,
        dataType:"json",
        success : function(data) {

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);

            var gridData = data.cpaList;


            AUIGrid.setGridData(GridID, gridData);


        },
        error : function(status, e) {
            alert("데이터 요청에 실패하였습니다.\r status : " + status);

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);
        }
    });

}

mainCommonList.fTopGenaralSearch=function (valId){

    $('#cpaUser-Search').val($('#'+valId).val());

    /*mainCommonList.fCpaUserDynamicSearch($('#TopGeneralSearch').val(), myGridIntro, "NonAutoList");*/

    /*$('#introduction-part').val("탑서취");*/
    mainCommonList.cpaUserListGrid();
    $('#cpaUserListPopup').modal();

}
//회원팝업
mainCommonList.fn_popup_search = function(val , options, callback) {
    mainCommonList.fn_init();

    if(!isNull(val)) {
        $('#cpaUser-Search').val(val);
    }

    if(!isNull(options["title"])) {
        $("#common_title").text(options["title"]);
    }

    if(!isNull(options["type"])) {
        mainCommonList.type = options["type"];
    }

    mainCommonList.callback = callback;

    mainCommonList.cpaUserListGrid();
    $('#cpaUserListPopup').modal();
}

mainCommonList.fn_init = function() {
    $("#common_title").text("회원추가");
    mainCommonList.type = "";
    mainCommonList.callback = null;
    mainCommonList.cpaUserSearchList = null;

    if (typeof mainCommonList.myGridIntro !== "undefined") {
        AUIGrid.clearGridData(mainCommonList.myGridIntro);
    }

    $('#cpaUser-Search').val("");
}
mainCommonList.fn_set_search = function(param) {

    if(typeof mainCommonList.callback == "function") {
        mainCommonList.callback(param);
        mainCommonList.callback = null;
    }
    mainCommonList.cpaUserSearchList = null;
}

//수습공인회계사 검색
mainCommonList.fCpaTrainDynamicSearch =function (TargetVal, GridID, NonAutoSearch) {
    AUIGrid.clearGridData(GridID);
    if(isNull(NonAutoSearch))
    {
        //clearPatientFooterInfo();
    }

    var searchvalue = TargetVal;
    // 이름  검색
    mainCommonList.fCpaTrainRequestData(GridID, "name", searchvalue, "");

}

mainCommonList.fCpaTrainRequestData= function (GridID, part, param, param2) {

    var url = "";

    url  = "/kicpa/cpa/cpaTrainPopList.do?param="+param;
    /*url  = "/kicpa/cpa/cpaMemList.do?FirstVisitDate=" + getCurrentDate() + "&instCode=" + getInstcdSession();*/


    // ajax 요청 전 그리드에 로더 표시..원할 경우 주석 제거
    AUIGrid.showAjaxLoader(GridID);

    // ajax (XMLHttpRequest) 로 그리드 데이터 요청
    $.ajax( {
        url : url,
        async : false,
        dataType:"json",
        success : function(data) {

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);

            var gridData = data.trainPopList;

            AUIGrid.setGridData(GridID, gridData);


        },
        error : function(status, e) {
            alert("데이터 요청에 실패하였습니다.\r status : " + status);

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);
        }
    });

}
//수습공인회계사 팝업
mainCommonList.fn_popupTrain_search = function(val , options, callback) {
    mainCommonList.fn_initTrain();

    if(!isNull(val)) {
        $('#cpaTrain-Search').val(val);
    }

    if(!isNull(options["title"])) {
        $("#commonTrain_title").text(options["title"]);
    }
    if(!isNull(options["type"])) {
        mainCommonList.type = options["type"];
    }

    mainCommonList.callback = callback;

    mainCommonList.cpaTrainListGrid();
    $('#cpaTrainListPopup').modal();
}

mainCommonList.fn_initTrain = function() {
    $("#commonTrain_title").text("수습공인회계사 검색");
    mainCommonList.type = "";
    mainCommonList.callback = null;
    mainCommonList.cpaTrainSearchList = null;

    if (typeof mainCommonList.myGridTrain !== "undefined") {
        AUIGrid.clearGridData(mainCommonList.myGridTrain);
    }

    $('#cpaTrain-Search').val("");
}
mainCommonList.fn_set_searchTrain = function(param) {

    if(typeof mainCommonList.callback == "function") {
        mainCommonList.callback(param);
        mainCommonList.callback = null;
    }
    mainCommonList.cpaTrainSearchList = null;
}

//공인회계사 합격자 검색
mainCommonList.fCpaMemberDynamicSearch =function (TargetVal, GridID, NonAutoSearch) {
    AUIGrid.clearGridData(GridID);
    if(isNull(NonAutoSearch))
    {
        //clearPatientFooterInfo();
    }

    var searchvalue = TargetVal;
    // 이름  검색
    mainCommonList.fCpaMemberRequestData(GridID, "name", searchvalue, "");

}

mainCommonList.fCpaMemberRequestData= function (GridID, part, param, param2) {

    var url = "";

    url  = "/kicpa/cpa/cpaMemberPopList.do?param="+param;
    /*url  = "/kicpa/cpa/cpaMemList.do?FirstVisitDate=" + getCurrentDate() + "&instCode=" + getInstcdSession();*/


    // ajax 요청 전 그리드에 로더 표시..원할 경우 주석 제거
    AUIGrid.showAjaxLoader(GridID);

    // ajax (XMLHttpRequest) 로 그리드 데이터 요청
    $.ajax( {
        url : url,
        async : false,
        dataType:"json",
        success : function(data) {

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);

            var gridData = data.memberPopList;

            AUIGrid.setGridData(GridID, gridData);


        },
        error : function(status, e) {
            alert("데이터 요청에 실패하였습니다.\r status : " + status);

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);
        }
    });

}
//공인회계사 합격자 팝업
mainCommonList.fn_popupMember_search = function(val , options, callback) {
    mainCommonList.fn_initMember();

    if(!isNull(val)) {
        $('#cpaMember-Search').val(val);
    }

    if(!isNull(options["title"])) {
        $("#commonMember_title").text(options["title"]);
    }
    if(!isNull(options["type"])) {
        mainCommonList.type = options["type"];
    }

    mainCommonList.callback = callback;

    mainCommonList.cpaMemberListGrid();
    $('#cpaMemberListPopup').modal();
}

mainCommonList.fn_initMember = function() {
    $("#commonMember_title").text("공인회계사 검색");
    mainCommonList.type = "";
    mainCommonList.callback = null;
    mainCommonList.cpaMemberSearchList = null;

    if (typeof mainCommonList.myGridMember !== "undefined") {
        AUIGrid.clearGridData(mainCommonList.myGridMember);
    }

    $('#cpaMember-Search').val("");
}
mainCommonList.fn_set_searchMember = function(param) {

    if(typeof mainCommonList.callback == "function") {
        mainCommonList.callback(param);
        mainCommonList.callback = null;
    }
    mainCommonList.cpaMemberSearchList = null;
}

//감사인 검색
mainCommonList.fCpaAuditInfoDynamicSearch =function (TargetVal, GridID, NonAutoSearch) {
    AUIGrid.clearGridData(GridID);
    if(isNull(NonAutoSearch))
    {
        //clearPatientFooterInfo();
    }

    var searchvalue = TargetVal;
    // 이름  검색
    mainCommonList.fCpaAuditInfoRequestData(GridID, "name", searchvalue, "");

}

mainCommonList.fCpaAuditInfoRequestData= function (GridID, part, param, param2) {

    var url = "";

    url  = "/kicpa/cpa/cpaAuditInfoPopList.do?param="+param;
    /*url  = "/kicpa/cpa/cpaMemList.do?FirstVisitDate=" + getCurrentDate() + "&instCode=" + getInstcdSession();*/


    // ajax 요청 전 그리드에 로더 표시..원할 경우 주석 제거
    AUIGrid.showAjaxLoader(GridID);

    // ajax (XMLHttpRequest) 로 그리드 데이터 요청
    $.ajax( {
        url : url,
        async : false,
        dataType:"json",
        success : function(data) {

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);

            var gridData = data.auditInfoPopList;

            AUIGrid.setGridData(GridID, gridData);


        },
        error : function(status, e) {
            alert("데이터 요청에 실패하였습니다.\r status : " + status);

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);
        }
    });

}
//감사인 팝업
mainCommonList.fn_popupAuditInfo_search = function(val , options, callback) {
    mainCommonList.fn_initAuditInfo();

    if(!isNull(val)) {
        $('#cpaAuditInfo-Search').val(val);
    }

    if(!isNull(options["title"])) {
        $("#commonAuditInfo_title").text(options["title"]);
    }
    if(!isNull(options["type"])) {
        mainCommonList.type = options["type"];
    }

    mainCommonList.callback = callback;

    mainCommonList.cpaAuditInfoListGrid();
    $('#cpaAuditInfoListPopup').modal();
}

mainCommonList.fn_initAuditInfo = function() {
    $("#commonAuditInfo_title").text("감사인 검색");
    mainCommonList.type = "";
    mainCommonList.callback = null;
    mainCommonList.cpaAuditInfoSearchList = null;

    if (typeof mainCommonList.myGridAuditInfo !== "undefined") {
        AUIGrid.clearGridData(mainCommonList.myGridAuditInfo);
    }

    $('#cpaAuditInfo-Search').val("");
}
mainCommonList.fn_set_searchAuditInfo = function(param) {

    if(typeof mainCommonList.callback == "function") {
        mainCommonList.callback(param);
        mainCommonList.callback = null;
    }
    mainCommonList.cpaAuditInfoSearchList = null;
}

//감사인 사무소 검색
mainCommonList.fCpaAuditDynamicSearch =function (TargetVal, GridID, NonAutoSearch) {
    AUIGrid.clearGridData(GridID);
    if(isNull(NonAutoSearch))
    {
        //clearPatientFooterInfo();
    }

    var searchvalue = TargetVal;
    // 이름  검색
    mainCommonList.fCpaAuditRequestData(GridID, "name", searchvalue, "");

}

mainCommonList.fCpaAuditRequestData= function (GridID, part, param, param2) {

    var url = "";

    url  = "/kicpa/cpa/cpaAuditPopList.do?param="+param;
    /*url  = "/kicpa/cpa/cpaMemList.do?FirstVisitDate=" + getCurrentDate() + "&instCode=" + getInstcdSession();*/


    // ajax 요청 전 그리드에 로더 표시..원할 경우 주석 제거
    AUIGrid.showAjaxLoader(GridID);

    // ajax (XMLHttpRequest) 로 그리드 데이터 요청
    $.ajax( {
        url : url,
        async : false,
        dataType:"json",
        success : function(data) {

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);

            var gridData = data.auditPopList;

            AUIGrid.setGridData(GridID, gridData);


        },
        error : function(status, e) {
            alert("데이터 요청에 실패하였습니다.\r status : " + status);

            // 로더 제거.. 원할 경우 주석 제거
            AUIGrid.removeAjaxLoader(GridID);
        }
    });

}
//감사인 사무소 팝업
mainCommonList.fn_popupAudit_search = function(val , options, callback) {
    mainCommonList.fn_initAudit();

    if(!isNull(val)) {
        $('#cpaAudit-Search').val(val);
    }

    if(!isNull(options["title"])) {
        $("#commonAudit_title").text(options["title"]);
    }
    if(!isNull(options["type"])) {
        mainCommonList.type = options["type"];
    }

    mainCommonList.callback = callback;

    mainCommonList.cpaAuditListGrid();
    $('#cpaAuditListPopup').modal();
}

mainCommonList.fn_initAudit = function() {
    $("#commonAudit_title").text("감사인 사무소 검색");
    mainCommonList.type = "";
    mainCommonList.callback = null;
    mainCommonList.cpaAuditSearchList = null;

    if (typeof mainCommonList.myGridAudit !== "undefined") {
        AUIGrid.clearGridData(mainCommonList.myGridAudit);
    }

    $('#cpaAudit-Search').val("");
}
mainCommonList.fn_set_searchAudit = function(param) {

    if(typeof mainCommonList.callback == "function") {
        mainCommonList.callback(param);
        mainCommonList.callback = null;
    }
    mainCommonList.cpaAuditSearchList = null;
}