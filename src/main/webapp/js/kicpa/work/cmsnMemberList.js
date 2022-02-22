let cmsnMemberList = {}; // 발송대장 namespace

cmsnMemberList.cmsnMemberList_gridID = null;

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
        if (typeof cmsnMemberList.cmsnMemberList_gridID !== "undefined") {
            if(AUIGrid.isCreated("#cmsnMemberList_grid_wrap")) {
                AUIGrid.resize(cmsnMemberList.cmsnMemberList_gridID);
            }
        }
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {
        cmsnMemberList.fn_createAUIGrid(); // AUGRID 생성

        cmsnMemberList.fn_init_events(); // 이벤트 등록

        cmsnMemberList.fn_init(); // 화면 초기화
    }
);

cmsnMemberList.fn_init = function() {
    
}

//AUIGrid 를 생성합니다.
cmsnMemberList.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "dispNo",
        headerText : "No"
    }, {
        dataField : "dispDocNo",
        headerText : "구분"
    }, {
        dataField : "dispSendDd",
        headerText : "등록번호"
    }, {
        dataField : "dispModDd",
        headerText : "이름"
    }, {
        dataField : "subject",
        headerText : "위원회명"
    }, {
        dataField : "receipt",
        headerText : "직책"
    }, {
        dataField : "receipt",
        headerText : "임기시작일"
    }, {
        dataField : "receipt",
        headerText : "임기종료일"
    }, {
        dataField : "receipt",
        headerText : "상태"
    }, {
        dataField : "receipt",
        headerText : "비고"
    }, {
        dataField : "modifyYn",
        headerText : "경력조회",
		renderer : {
			type : "ButtonRenderer",
			labelText : "경력조회",
			onClick : function(event) {
				alert("(" + event.rowIndex + ", " + event.columnIndex + ") " + "\n" + JSON.stringify(event.item));
			},
			visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
				if(item.modifyYn == "Y") {
		              return true;
		        }
		        return false;
			}
		}
    }, {
        dataField : "modifyYn",
        headerText : "수정",
		renderer : {
			type : "ButtonRenderer",
			labelText : "수정",
			onClick : function(event) {
				alert("(" + event.rowIndex + ", " + event.columnIndex + ") " + "\n" + JSON.stringify(event.item));
			},
			visibleFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
				if(item.modifyYn == "Y") {
		              return true;
		        }
		        return false;
			}
		}
    }];

    var gridPros = {
        showRowNumColumn : false,

        showRowCheckColumn : false,

        // 그리드가 height 지정( 지정하지 않으면 부모 height 의 100% 할당받음 )
        height : 480
    };


    // 그리드가 생성되어 있을시 해제
    if(AUIGrid.isCreated("#cmsnMemberList_grid_wrap")) {
        AUIGrid.destroy("#cmsnMemberList_grid_wrap");
        cmsnMemberList.cmsnMemberList_gridID = null;
    }

    // 실제로 #test_grid_wrap 에 그리드 생성
    cmsnMemberList.cmsnMemberList_gridID = AUIGrid.create("#cmsnMemberList_grid_wrap", columnLayout, gridPros);
}

cmsnMemberList.fn_init_events = function() {
    $('#cmsnMemberList_AddMember').on("click",function(e) {
        $("#cmsnMemberList_modal").modal();
    });
    
    $('#cmsnMemberList_Search').on("click",function(e) {
    	
    	// 조회조건의 검색항목 필수체크
    	var cmsnMemberList_searchText = $('#cmsnMemberList_searchText').val();
    	if ( cmsnMemberList_searchText == "" ) { // 설계서에는 조회조건 필수
    		alert("공통_04. System Alert _01 참조");
    		return;
    	}
    	
    	// 조회조건의 이름/등록번호 구분
    	var cmsnMemberList_searchCond = $('#cmsnMemberList_searchCond').val();
    	if ( cmsnMemberList_searchCond == "이름" ) {
    		cmsnMemberList_searchCond = "name";
    	} else if ( cmsnMemberList_searchCond == "등록번호" ) {
    		cmsnMemberList_searchCond = "id";
    	} else {
    		cmsnMemberList_searchCond = "";
    	}
    	
    	// 조회조건의 회원/비회원 구분
    	var cmsnMemberList_searchMemberCond = $('#cmsnMemberList_searchMemberCond').val();
    	if ( cmsnMemberList_searchMemberCond == "회원" ) {
    		cmsnMemberList_searchMemberCond = "member";
    	} else if ( cmsnMemberList_searchMemberCond == "비회원" ) {
    		cmsnMemberList_searchMemberCond = "nonmember";
    	} else {
    		cmsnMemberList_searchMemberCond = "";
    	}
    	
    	var cmsnMemberList_searchCmsnNm = $('#cmsnMemberList_searchCmsnNm').val();
    	
    	var cmsnMemberList_searchParam = {};
    	cmsnMemberList_searchParam.searchCond = cmsnMemberList_searchCond;
    	cmsnMemberList_searchParam.searchText = cmsnMemberList_searchText;
    	
    	cmsnMemberList_searchParam.memberCond = cmsnMemberList_searchMemberCond;
    	cmsnMemberList_searchParam.cmsnNm = cmsnMemberList_searchCmsnNm;
    	
    	fn_ajax_call("/kicpa/getCmsnMemberList.do", cmsnMemberList_searchParam, cmsnMemberList.getCmsnMemberList_success, cmsnMemberList.getCmsnMemberList_error);
    });
}

cmsnMemberList.getCmsnMemberList_success = function(result) {
	AUIGrid.setGridData(cmsnMemberList.cmsnMemberList_gridID, result.List);
}

cmsnMemberList.getCmsnMemberList_error = function(xhr, status, error) {
	alert("실패");
}


