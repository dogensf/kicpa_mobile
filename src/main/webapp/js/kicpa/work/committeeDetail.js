var committeeDetail = committeeDetail || {}; // 위원회 관리 namespace

committeeDetail.committeeDetail_gridID = null;

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		committeeDetail.fn_init_resize_AUIGrid();
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

		committeeDetail.fn_createAUIGrid(); // AUGRID 생성
		committeeDetail.fn_init_events(); // 이벤트 등록
		committeeDetail.fn_init(); // 화면 초기화
	}
	
);

committeeDetail.fn_init = function() {
	$("#committeeDetail_SearchGubun").selectpicker({
		noneSelectedText:"전체"
	});

	$('#committeeDetail_StartDay').datepicker({
		rtl: KTUtil.isRTL(),
		todayHighlight: true,
		orientation: "bottom left"
	});

	$('#committeeDetail_EndDay').datepicker({
		rtl: KTUtil.isRTL(),
		todayHighlight: true,
		orientation: "bottom left"
	});
	
	var committeeDetail_CmitCode = $("#committeeDetail_CmitCode").val();
	
	if(committeeDetail_CmitCode != ""){
		committeeDetail.fn_search_memberList(committeeDetail_CmitCode);
	}

}

//AUIGrid 를 생성합니다.
committeeDetail.fn_createAUIGrid = function() {	
	var gubunList = [{"code":"1", "name":"회원"}, {"code":"2", "name":"비회원"}];
	                
	var columnLayout = [
		{
			dataField : "cmitListSn",
			headerText : "순번",
			visible : false
		}, {
			dataField : "colStatus",
			headerText : "컬럼상태",
			visible : false
		}, {
			dataField : "inputGubun",
			headerText : "구분",
			labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
				var retStr = "";
				for(var i = 0, len = gubunList.length; i < len; i++) {
					if(gubunList[i]["code"] == value) {
						retStr = gubunList[i]["name"];
						break;
					}
				}
				return retStr == "" ? value : retStr;
			},
			editRenderer : {
				type : "DropDownListRenderer",
				list : gubunList, //key-value Object 로 구성된 리스트
				keyField : "code", // key 에 해당되는 필드명
				valueField : "name" // value 에 해당되는 필드명		
			}
		}, {
			dataField : "koreanNm",
			headerText : "성명*",
			colSpan : 2
		}, {
			dataField : "cpaId",
			editable : false
		}, {
			dataField : "pin",
			headerText : "개인식별번호",
			visible : false
		}, {
			dataField : "cpaSn",
			headerText : "CPA순번",
			editable : false,
			visible : false
		}, {
			dataField : "cmitRspofc",
			headerText : "직책*",
			labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) { 
				var retStr = "";
				for(var i = 0, len = committeeDetail_rspofcList.length; i < len; i++) {
					if(committeeDetail_rspofcList[i]["code"] == value) {
						retStr = committeeDetail_rspofcList[i]["name"];
						break;
					}
				}
				return retStr == "" ? value : retStr;
			},
			editRenderer : {
				type : "DropDownListRenderer",
				list : committeeDetail_rspofcList, //key-value Object 로 구성된 리스트
				keyField : "code", // key 에 해당되는 필드명
				valueField : "name" // value 에 해당되는 필드명
			}
		}, {
			dataField : "tenureBgnDe",
			headerText : "임기시작일*",
			dataType : "date",
			dateInputFormat : "yyyymmdd", // 실제 데이터의 형식 지정
			formatString : "yyyy-mm-dd", // 실제 데이터 형식을 어떻게 표시할지 지정
			editRenderer : {
				type : "BTCalendarRenderer",
				defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
				showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
				uncheckDateValue : "-", // 날짜 선택 해제 버턴 클릭 시 적용될 값.

				// bootstrap-datepicker 속성을 여기에 설정하십시오.
				// API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
				btOpts : {
					language : "ko",
					daysOfWeekHighlighted: "0,6",
					//startDate : startDate, // 오늘 부터 ~ 30일까지만 선택 가능
					//endDate : new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30))
				}  // end of btOpts
			}
		}, {
			dataField : "tenureEndDe",
			headerText : "임기종료일",
			dataType : "date",
			dateInputFormat : "yyyymmdd", // 실제 데이터의 형식 지정
			formatString : "yyyy-mm-dd", // 실제 데이터 형식을 어떻게 표시할지 지정
			editRenderer : {
				type : "BTCalendarRenderer",
				defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
				showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
				uncheckDateValue : "-", // 날짜 선택 해제 버턴 클릭 시 적용될 값.

				// bootstrap-datepicker 속성을 여기에 설정하십시오.
				// API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
				btOpts : {
					language : "ko",
					daysOfWeekHighlighted: "0,6",
					//startDate : startDate, // 오늘 부터 ~ 30일까지만 선택 가능
					//endDate : new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30))
				}  // end of btOpts
			}
		}, {
			dataField : "moblPhonNo",
			headerText : "전화번호*"
		}, {
			dataField : "mainEmail",
			headerText : "Email*"
		}, {
			dataField : "rsndqf",
			headerText : "결격여부",
			editable : false
		}, {
			dataField : "remark",
			headerText : "비고"
		}, {
			dataField : "searchHis",
			headerText : "경력조회",
			renderer : {
				type : "ButtonRenderer",
				labelText : "확인",
				onClick : function(event) {
					popup.fn_popup_search(event.item.koreanNm + " 경력조회", event.item.cpaId);
				}
			}
		}];

	var gridPros = {
		editable: true,
		showRowNumColumn : true,
		showStateColumn : true,
		showRowCheckColumn : true,

		headerHeight : 34,
		rowHeight : 34
	};


	fn_AUIGrid_create([{id:"committeeDetail_grid_wrap", obj:[committeeDetail,"committeeDetail_gridID"], layout:columnLayout , prop:gridPros}]);
	
	//셀 클릭 이벤트 바인딩
	AUIGrid.bind(committeeDetail.committeeDetail_gridID, "cellClick", function(event) {
		if(event.item.colStatus == "3" && event.item.inputGubun == "1" && event.dataField == "koreanNm"){
			mainCommonList.fn_popup_search("", "회원추가", committeeDetail.getMemberList_success);
		}
	});
	
	//조회된 데이터의 이름/구분 변경 불가
	//colStatus 1:회원 2:비회원 수정 불가 / 3:addColumn 수정가능 
	AUIGrid.bind(committeeDetail.committeeDetail_gridID, "cellEditBegin", function(event) {
		if(event.item.colStatus == "3"){
			if(event.dataField == "koreanNm" || event.dataField == "inputGubun") {
				return true;
			}
			
		} else{
			if(event.dataField == "koreanNm" || event.dataField == "inputGubun") {
				return false;
			}
		}
	});

	// 에디팅 정상 종료 이벤트 바인딩
	AUIGrid.bind(committeeDetail.committeeDetail_gridID, "cellEditEnd", committeeDetail.auiCellEditingHandler);
}

committeeDetail.auiCellEditingHandler = function(event){
	if(event.type == "cellEditEnd") {
		if(event.dataField == "inputGubun"){
			var item = {
					koreanNm : "",
					cpaId : "",
					pin : "",
					cpaSn : "",
					cmitRspofc : "",
					tenureBgnDe : "",
					tenureEndDe : "",
					moblPhonNo : "",
					mainEmail : "", 
					remark : ""
					
				};
				
			var myGridID = committeeDetail.committeeDetail_gridID;
					
			AUIGrid.updateRow(myGridID, item, event.rowIndex );
		}
	}
}

committeeDetail.fn_init_resize_AUIGrid= function(){
	fn_AUIGrid_resize([{id:"committeeDetail_grid_wrap",obj:committeeDetail.committeeDetail_gridID}]);

}

committeeDetail.fn_init_events = function() {
	var myGridID = committeeDetail.committeeDetail_gridID
	//등록
	$("#committeeDetail_NoGet").on("click", function(e){		
		var addedRowItems = AUIGrid.getAddedRowItems(myGridID);
		var removedRowItems = AUIGrid.getRemovedItems(myGridID);
		var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 
		
		var isValid = AUIGrid.validateGridData(myGridID, ["cmitRspofc", "tenureBgnDe"]);
		
		var committeeDetail_CmitKorNm = $("#committeeDetail_CmitKorNm").val();
		var committeeDetail_CmitDeptCd = $("#committeeDetail_CmitDeptCd").val();
		var committeeDetail_StartDay = $("#committeeDetail_StartDay").val().replaceAll("-", "");
		var committeeDetail_EndDay = $("#committeeDetail_EndDay").val().replaceAll("-", "");
		var committeeDetail_CmitCode = $("#committeeDetail_CmitCode").val();
		var committeeDetail_CmitSn = $("#committeeDetail_CmitSn").val();
		
		if(committeeDetail_CmitKorNm == "" || committeeDetail_CmitDeptCd == "" || committeeDetail_StartDay == "" || !isValid){
			alertMessage("모든 필수항목을 입력하세요.","","error");
			return false;
			
		}
		
		var sTitle = "알림메세지";

	    swal.fire({
	        title: '',
	        text: "등록/수정 하시겠습니까?",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니요',
	        reverseButtons: true
	    }).then(function(result){
	        if (result.value) {
	        	var committeeDetail_updateParam = {
	        			"add" : addedRowItems,
	        			"delete" : removedRowItems,
	        			"modify" : editedRowItems
	        	};
	        		
	        	committeeDetail_updateParam.cmitKorNm = committeeDetail_CmitKorNm;
	        	committeeDetail_updateParam.cmitCode = committeeDetail_CmitCode;
	        	committeeDetail_updateParam.cmitBgnde = committeeDetail_StartDay;
	        	committeeDetail_updateParam.cmitendde = committeeDetail_EndDay;
	        	committeeDetail_updateParam.cmitDeptCd = committeeDetail_CmitDeptCd;
	        	committeeDetail_updateParam.cmitSn = committeeDetail_CmitSn;
	        		
	        	fn_ajax_call("/kicpa/updateCommitteeList.do", committeeDetail_updateParam, committeeDetail.updateList_success, committeeDetail.updateList_error);
	        	
	        } else if (result.dismiss === 'cancel') {
	        	return false;
	        		       
	        }
	    });	
		
		return false;
		
	});
	
	//닫기
	$("#committeeDetail_Close").on("click", function(e){
		//$("#docSendList_modal").modal();
		var sTitle = "알림메세지";

	    swal.fire({
	        title: '',
	        text: "등록하신 정보는 삭제됩니다.\n 취소하시겠습니까?",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니요',
	        reverseButtons: true
	    }).then(function(result){
	        if (result.value) {
	        	closeTab('committeeDetail');
	        	
	        } else if (result.dismiss === 'cancel') {
	           
	        }
	    });
		return false;
	});
	
	//회원추가
	$("#committeeDetail_MberAdd").on("click", function(e){		
		var item = new Object();
		item.inputGubun = "1";
		item.colStatus = "3";
		
		AUIGrid.addRow(myGridID, item, "frist");
		
		return false;
		
	});
	
	$("#committeeDetail_MberDelete").on("click", function(e){
		var activeItems = AUIGrid.getCheckedRowItems(myGridID);
		
		if(activeItems.length == 0){
			alertMessage("체크박스를 선택하세요.","","error");
    		return false;
		}
		
		for(var i = 0, len = activeItems.length; i < len; i++) {
			AUIGrid.removeRow(myGridID, activeItems[i].rowIndex);
		}
		
	});
}

//조회성공
committeeDetail.updateList_success = function(result){
	AUIGrid.setGridData(committeeDetail.committeeDetail_gridID, result.docList);
	
}

//조회실패
committeeDetail.updateList_error = function(){
	
}

//회원검색
committeeDetail.getMemberList_success = function(result){	
	var item = {
		koreanNm : result.koreanNm,
		cpaId : result.cpaId,
		pin : result.pin,
		cpaSn : result.cpaSn
	};
	
	var myGridID = committeeDetail.committeeDetail_gridID;
		
	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
}

//그리드조회
committeeDetail.fn_search_memberList = function(cmitCode){
	var committeeDetail_SearchParam = {};
	
	committeeDetail_SearchParam.cmitCode = cmitCode;

	fn_ajax_call("/kicpa/selectCommitteeMemberListByCmitCd.do", committeeDetail_SearchParam, committeeDetail.selectMemberList_success, committeeDetail.selectMemberList_error);
}

//저장성공
committeeDetail.updateList_success = function(result){
	committeeDetail.fn_search_memberList(result.cmitCode);
	try{
		committeeList.fn_search_committeeList("", "", "", "", "");
		
	} catch(e){
		
	}
	
}

//조회성공
committeeDetail.selectMemberList_success = function(result){
	AUIGrid.setGridData(committeeDetail.committeeDetail_gridID, result.docList);
	
}

//조회성공
committeeDetail.selectMemberList_error = function(result){
	
}

