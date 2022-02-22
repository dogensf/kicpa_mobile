var taxQualRegistList = taxQualRegistList || {}; // 발송대장 namespace

taxQualRegistList.list_gridID = null; // 목록 그리드

taxQualRegistList.registReqst_vrify_gridID = null; // 등록신청 검증용 그리드
taxQualRegistList.registReqst_vrify_gridID_excelTemp = null; // 등록신청 엑셀양식 그리드
taxQualRegistList.updtReqst_vrify_gridID = null; // 갱신신청 검증용 그리드
taxQualRegistList.updtReqst_vrify_gridID_excelTemp = null; // 갱신신청 엑셀양식 그리드

// 자격상태 구분 Select Box 값
taxQualRegistList.qualfSttusSeList = [
	{value:"", 		text:"전체"},
	{value:"1", 	text:"등록"},
	{value:"2", 	text:"신청"},
	{value:"3", 	text:"없음"}
];

// 처리상태 구분 Select Box 값
taxQualRegistList.processSttusSeList = [
	{value:"", 		text:"전체"},
	{value:"1", 	text:"등록"},
	{value:"2", 	text:"신청(최초신청)"},
	{value:"3", 	text:"신청(갱신신청)"},
	{value:"4", 	text:"없음"}
];

// 검색 구분 Select Box 값
taxQualRegistList.searchSeList = [
	{value:"", 		text:"전체"},
	{value:"1", 	text:"성명"},
	{value:"2", 	text:"CPA_ID"},
	{value:"3", 	text:"등록번호"},
	{value:"4", 	text:"자격번호"}
];


$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    	taxQualRegistList.fn_init_resize_AUIGrid();
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    }catch(e){
    }
});

// 문서 시작 시
$(document).ready(
    function() {

        // 탭이 열린후 grid resize
        $("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
            $(window).resize();
        });

        taxQualRegistList.fn_createAUIGrid(); // AUGRID 생성
        taxQualRegistList.fn_init_events(); // 이벤트 등록
        taxQualRegistList.fn_init(); // 화면 초기화

    }
);


taxQualRegistList.fn_init = function() {
	
	// 처리상태 구분 Select Box 값 셋팅
	for (var i = 0 ; i < taxQualRegistList.qualfSttusSeList.length ; i ++ ) {
		$("#taxQualRegistList_qualfSttusSe").append('<option value="' + taxQualRegistList.qualfSttusSeList[i].value + '">' + taxQualRegistList.qualfSttusSeList[i].text + '</option>');
	}
	
	// 처리상태 구분 Select Box 값 셋팅
	for (var i = 0 ; i < taxQualRegistList.processSttusSeList.length ; i ++ ) {
		$("#taxQualRegistList_processSttusSe").append('<option value="' + taxQualRegistList.processSttusSeList[i].value + '">' + taxQualRegistList.processSttusSeList[i].text + '</option>');
	}
	
	// 검색 구분 Select Box 값 셋팅
	for (var i = 0 ; i < taxQualRegistList.searchSeList.length ; i ++ ) {
		$("#taxQualRegistList_searchSe").append('<option value="' + taxQualRegistList.searchSeList[i].value + '">' + taxQualRegistList.searchSeList[i].text + '</option>');
	}
	
}


//AUIGrid 를 생성합니다.
taxQualRegistList.fn_createAUIGrid = function() {

	taxQualRegistList.fn_create_list_AUIGrid(); // 메인 목록 그리드 생성
	
    var gridPros = {
        showRowNumColumn : false,
        showRowCheckColumn : false,
		headerHeight : 34,
		rowHeight : 34
    };
    
	var vrify_columnLayout = [{
        dataField : "lndctnId",
        headerText : "등록증번호",
        width : 150
    }, {
        dataField : "nm",
        headerText : "성명",
        width : 150
    }, {
        dataField : "ihidnum",
        headerText : "주민등록번호",
        width : 150
    }, {
        dataField : "registDe",
        headerText : "교부일자(등록일)",
        width : 150
    }, {
        dataField : "lndctnSbscrb",
        headerText : "세무사회",
        width : 150
    }, {
        dataField : "manageNo", // lndctnCl + lndctnNo + vrifyNo
        headerText : "관리번호",
        width : 150
    }, {
        dataField : "vrifyResult",
        headerText : "검증결과",
        width : 500
    }];
	
	// 등록신청 검증용 그리드
	fn_AUIGrid_create([{id:"taxQualRegistList_grid_wrap_registReqst_vrify", obj:[taxQualRegistList,"registReqst_vrify_gridID"], layout:vrify_columnLayout , prop:gridPros}]);
	vrify_columnLayout.pop(); // 검증결과(vrifyResult) 삭제
	// 등록신청 엑셀양식 그리드
	fn_AUIGrid_create([{id:"taxQualRegistList_grid_wrap_registReqst_vrify_excelTemp", obj:[taxQualRegistList,"registReqst_vrify_gridID_excelTemp"], layout:vrify_columnLayout , prop:gridPros}]);
	
	vrify_columnLayout = [{
        dataField : "nm",
        headerText : "성명",
        width : 150
    }, {
        dataField : "ihidnum",
        headerText : "주민등록번호",
        width : 150
    }, {
        dataField : "updtDe",
        headerText : "갱신일",
        width : 150
    }, {
        dataField : "vrifyResult",
        headerText : "검증결과",
        width : 500
    }];
	
	// 갱신신청 검증용 그리드
	fn_AUIGrid_create([{id:"taxQualRegistList_grid_wrap_updtReqst_vrify", obj:[taxQualRegistList,"updtReqst_vrify_gridID"], layout:vrify_columnLayout , prop:gridPros}]);
	vrify_columnLayout.pop(); // 검증결과(vrifyResult) 삭제
	// 갱신신청 엑셀양식 그리드
	fn_AUIGrid_create([{id:"taxQualRegistList_grid_wrap_updtReqst_vrify_excelTemp", obj:[taxQualRegistList,"updtReqst_vrify_gridID_excelTemp"], layout:vrify_columnLayout , prop:gridPros}]);
	
}

taxQualRegistList.fn_create_list_AUIGrid = function() { // 메인 목록 그리드 생성
	// 메인 목록 그리드 생성
    var columnLayout = [{
        dataField : "no",
        headerText : "No"
    }, {
        dataField : "chk",
        headerText : "",
        width : 40,
        headerRenderer : { // 헤더 렌더러
        	type : "CheckBoxHeaderRenderer",
        	// renderer 의 체크박스에 상호 의존적인 모드로 설정 (기본값 : false)
        	// dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
        	dependentMode : true
        },
        renderer : {
        	type : "CheckBoxEditRenderer",
        	editable : true,
        	checkableFunction : function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
				// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
				return true;
			}
        }
    }, {
        dataField : "brthdy",
        headerText : "생년월일"
    }, {
        dataField : "nm",
        headerText : "성명"
    }, {
        dataField : "registDe",
        headerText : "등록일"
    }, {
        dataField : "lastUpdtDe",
        headerText : "갱신예정일"
    }, {
        dataField : "lndctnCl",
        headerText : "상태구분"
    }, {
        dataField : "crqfcNo",
        headerText : "자격번호"
    }, {
        dataField : "lndctnId",
        headerText : "등록번호"
    }, {
        dataField : "qualfStatus",
        headerText : "자격상태"
    }, {
        dataField : "processStatus",
        headerText : "처리상태"
    }, {
        dataField : "inqire",
        headerText : "조회",
		renderer : {
			type : "ButtonRenderer",
			labelText : "수정",
			onClick : function(event) {
				var exitsTab = taxQualRegistList.fn_exits_tab("taxQualRegist");
				if ( exitsTab ) {
					var param = {"pin":event.item.pin, "cpaId":event.item.cpaId, "status":"U"};
					taxQualRegist.fn_init(param);
					$("#taxQualRegist_tab").tab('show');
				} else {
					addNewTab('taxQualRegist', '/kicpa/tax/taxQualRegist.do?status=U&pin=' + event.item.pin + '&cpaId=' + event.item.cpaId, '세무사 자격/등록');
				}
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
        
        enableSorting : true, // 정렬 사용

		headerHeight : 34,
		rowHeight : 34
    };


	// 메인 목록 그리드 생성
	fn_AUIGrid_create([{id:"taxQualRegistList_grid_wrap", obj:[taxQualRegistList,"list_gridID"], layout:columnLayout , prop:gridPros}]);
}

taxQualRegistList.fn_exits_tab = function(tabId) {
	var exitsTab = false;
	var tabs = $("#addajaxtab");
	$.each(tabs.find("li > a"), function(idx, a){
		if(tabId  + '_tab' == $(a).attr("id")){
			exitsTab = true;
			return false;
		}					
	});
	return exitsTab;
}


taxQualRegistList.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"taxQualRegistList_grid_wrap",obj:taxQualRegistList.list_gridID}]);

}

taxQualRegistList.fn_init_events = function() {

	// 검색 버튼
	$("#taxQualRegistList_Search").on("click",function(e) {
		taxQualRegistList.fn_search_taxQualRegistList();
	});
	
	// 테이블 열 초기화 버튼
	$("#taxQualRegistList_Resert").on("click",function(e) {
		AUIGrid.clearGridData(taxQualRegistList.list_gridID);
	});
	
	// 등록신청 양식다운로드 버튼
	$("#taxQualRegistList_registReqstFormDwld").on("click",function(e) {
		taxQualRegistList.exportToXlsx(taxQualRegistList.registReqst_vrify_gridID_excelTemp, "등록신청 업로드 양식");
	});
	
	// 등록신청 엑셀 업로드
	$("#taxQualRegistList_registReqstExcelUpload").on('change', function(evt) {
		
		taxQualRegistList.fn_excelUpload(evt, taxQualRegistList.registReqst_vrify_gridID, taxQualRegistList.fn_excelUpload_valid);
		
	});
	
	// 갱신신청 양식다운로드 버튼
	$("#taxQualRegistList_updtReqstFormDwld").on("click",function(e) {
		taxQualRegistList.exportToXlsx(taxQualRegistList.updtReqst_vrify_gridID_excelTemp, "갱신신청 업로드 양식");
	});
	
	// 갱신신청 엑셀 업로드 버튼
	$("#taxQualRegistList_updtReqstExcelUpload").on('change', function(evt) {
		
		taxQualRegistList.fn_excelUpload(evt, taxQualRegistList.updtReqst_vrify_gridID, taxQualRegistList.fn_excelUpload_valid);
		
	});
	
	// 엑셀 버튼
	$("#taxQualRegistList_ExcelDwld").on("click",function(e) {
		taxQualRegistList.exportToXlsx(taxQualRegistList.list_gridID, "세무사 자격 및 등록 신청(목록)");
	});
	
	// 갱신신청 버튼
	$("#taxQualRegistList_UpdtReqst").on("click",function(e) {
		var gridData = AUIGrid.getGridData(taxQualRegistList.list_gridID);
		var updateData = [];
		for ( var i = 0 ; i < gridData.length ; i ++ ) {
			if ( gridData[i]['chk'] && gridData[i]['modifyYn'] == "Y" ) {
				updateData.push(gridData[i]);
				updateData[updateData.length-1].updtReqstYn = "Y";
			}
		}
		
		if ( updateData.length < 1 ) {
			alert("체크박스를  선택하세요.");
			return;
		}

		var sTitle = "알림메세지";
	    swal.fire({
	        title: '',
	        text: "처리상태를 “신청” 으로"+ "\n변경 하시겠습니까?",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니요',
	        reverseButtons: true
	    }).then(function(result){
	        if ( result.isConfirmed ) { // 예
	        	//UPDT_REQST_YN 업델이트
	        	var searchData = $('#taxQualRegistList_Cond').serializeObject();
	        	fn_ajax_call("/kicpa/tax/updateTaxQualUpdtReqstYn.do", {"searchData":searchData, "updateData":updateData}, taxQualRegistList.selectTaxQualRegistList_success, taxQualRegistList.selectTaxQualRegistList_error);
	        } else {
	           
	        }
	    });
		return;
	});
	
	// 등록신청 버튼
	$("#taxQualRegistList_RegistReqst").on("click",function(e) {
		var exitsTab = taxQualRegistList.fn_exits_tab("taxQualRegist");
		if ( exitsTab ) {
			//taxQualRegist.fn_init({"status":"I"});
			taxQualRegist.fn_init();
			$("#taxQualRegist_tab").tab('show');
		} else {
			addNewTab('taxQualRegist', '/kicpa/tax/taxQualRegist.do?status=I', '세무사 자격/등록');
		}
	});
	
	// 선택삭제 버튼
	$("#taxQualRegistList_Delete").on("click",function(e) {
		var gridData = AUIGrid.getGridData(taxQualRegistList.list_gridID);
		var deleteData = [];
		for ( var i = 0 ; i < gridData.length ; i ++ ) {
			if ( gridData[i]['chk'] && gridData[i]['modifyYn'] == "Y" ) {
				deleteData.push(gridData[i]);
			}
		}
		
		if ( deleteData.length < 1 ) {
			alert("체크박스를  선택하세요.");
			return;
		}

		var sTitle = "알림메세지";
	    swal.fire({
	        title: '',
	        text: "선택하신 항목은 삭제됩니다." + "\n삭제 하시겠습니까?",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니요',
	        reverseButtons: true
	    }).then(function(result){
	        if ( result.isConfirmed ) { // 예
	        	var searchData = $('#taxQualRegistList_Cond').serializeObject();
	        	fn_ajax_call("/kicpa/tax/deleteTaxQualRegistList.do", {"searchData":searchData, "deleteData":deleteData}, taxQualRegistList.selectTaxQualRegistList_success, taxQualRegistList.selectTaxQualRegistList_error);
	        } else {
	           
	        }
	    });
		return;
	});

	/*
    $('#docSendList_NoGet').on("click",function(e) {
    	addNewTab('docSendNumIssu', '/kicpa/docSendNumIssu.do', '번호발급/수정');
    });
 	  
    //검색 버튼 이벤트
    $("#docSendList_Search").on("click",function(e) {    	
    	var docSendList_FromDd = $('#docSendList_StartDay').val().replaceAll("-", ""); //시작일
    	var docSendList_ToDd = $('#docSendList_EndDay').val().replaceAll("-", ""); //종료일
    	
    	var docSendList_SearchGubun = $('#docSendList_SearchGubun').val(); //검색구분
    	var docSendList_SearchText = $('#docSendList_SearchText').val(); //검색어

    	//시행일 시작일만 입력한 경우 
    	if(docSendList_FromDd != "" && docSendList_ToDd == ""){
    		alertMessage("시작일과 종료일을 선택하세요.","","error");
    		return false;
    		
    	} 
    	
    	//시행일 미입력, 텍스트 필드 미입력 상태에서 선택 시 alert
    	if(docSendList_FromDd == "" && docSendList_ToDd == "" && docSendList_SearchText == ""){
    		alertMessage("검색조건이 없습니다.","","error");
    		return false;
    		
    	}
    	
    	if ( docSendList_SearchGubun == "문서번호" ) {
    		docSendList_SearchGubun = "docno";
    		
    	} else if ( docSendList_SearchGubun == "제목" ) {
    		docSendList_SearchGubun = "subject";
    		
    	} else {
    		docSendList_SearchGubun = "";
    		
    	}
    	
    	docSendList.fn_search_docList(docSendList_FromDd, docSendList_ToDd, docSendList_SearchGubun, docSendList_SearchText);
    	
    	//조회 후 탭 닫히는 것에 대한 방어코드
    	return false;
    });
    */
}

// 검색 이벤트
taxQualRegistList.fn_search_taxQualRegistList = function() {
	
	var searchData = $('#taxQualRegistList_Cond').serializeObject();

	fn_ajax_call("/kicpa/tax/selectTaxQualRegistList.do", searchData, taxQualRegistList.selectTaxQualRegistList_success, taxQualRegistList.selectTaxQualRegistList_error);
}

taxQualRegistList.exportToXlsx = function(gridID, pFileName) {
	AUIGrid.exportToXlsx(gridID, {
		exportWithStyle : true
		, fileName : pFileName
		, progressBar : true
		, exceptColumnFields : ["chk", "inqire"]
		/*
        , beforeRequestCallback : function() { alert("beforeRequestCallback") }
        , afterRequestCallback : function() { alert("afterRequestCallback") }
        */
	});
}

taxQualRegistList.selectTaxQualRegistList_success = function(result) {
	//alert(JSON.stringify(result.taxQualRegistList));
	AUIGrid.setGridData(taxQualRegistList.list_gridID, result.taxQualRegistList);
}

taxQualRegistList.selectTaxQualRegistList_error = function(xhr, status, error) {
	alert("실패");
}

taxQualRegistList.fn_excelUpload = function(evt, gridID, pCallback) {
	
	AUIGrid.clearGridData(gridID);
	
	// IE10, 11은 readAsBinaryString 지원을 안함. 따라서 체크함.
	var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
	var data = null;
	var file = evt.target.files[0];
	if (typeof file == "undefined") {
		//alert("파일 선택 시 오류 발생!!");
	    return false;
	}
	
	// IE10, 11는 바이너리스트링 못읽기 때문에 ArrayBuffer 처리 하기 위함.
	var fixdata = function(data) {
		var o = "", l = 0, w = 10240;
		for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
		o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
		return o;
	};
	
	// 엑셀 시트를 파싱하여 반환
	var to_json = function(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			// JSON으로 파싱
			var roa = XLSX.utils.sheet_to_json( workbook.Sheets[sheetName] );
			if(roa.length > 0){
				result[sheetName] = roa;
			}
		});
		return result;
	}
	
	// 엑셀 파일 시트에서 파싱한 JSON 데이터 기반으로 그리드 동적 생성
	var createAUIGrid = function(jsonData) {
		
		if ( jsonData == null || jsonData.length < 1 ) {
			alert("엑셀의 업로드할 데이터가 없습니다.");
			return false;
		}
		
		var columnLayout = AUIGrid.getColumnLayout(gridID);
		var gridData = [];
		for ( var i = 0 ; i < jsonData.length ; i ++) {
			var tempJson = {};
			var dataCount = 0;
			for ( var key in jsonData[i] ) {
				for ( var j = 0 ; j < columnLayout.length ; j ++ ) {
					try {
						if ( key == columnLayout[j].headerText ) {
							if ( (jsonData[i][key]).constructor.toString().indexOf("Date") > -1 ) { // 날짜변환
								tempJson[columnLayout[j].dataField] = new Date(jsonData[i][key]).getDateFormat("YYYY-MM-DD");
								dataCount++;
								break;
							}
							tempJson[columnLayout[j].dataField] = jsonData[i][key];
							dataCount++;
							break;
						}
					} catch ( e ) {
						alert("엑셀의 자료가 맞지 않습니다.");
						return false;
					}
				}
			}
			if ( dataCount < (columnLayout.length - 1) ) {
				alert("엑셀의 자료가 맞지 않습니다.");
				return false;
			}
			gridData.push(tempJson);
		}
		
		// 그리드에 데이터 삽입
		AUIGrid.setGridData(gridID, gridData);
		return true;
	};
	
	var reader = new FileReader();
	
	reader.onload = function(e) {
		
		var data = e.target.result;
	
		/* 엑셀 바이너리 읽기 */
		
		var workbook;
	
		if(rABS) { // 일반적인 바이너리 지원하는 경우
			workbook = XLSX.read(data, {type:'binary', cellDates:true, cellNF: false, cellText:false});
		} else { // IE 10, 11인 경우
			var arr = fixdata(data);
			workbook = XLSX.read(btoa(arr), {type:'base64'});
		}
	
		var jsonObj = to_json(workbook);
		
		var status = createAUIGrid( jsonObj[Object.keys(jsonObj)[0]] );
		
		if (pCallback !== undefined || typeof pCallback !== 'undefined') pCallback(status, gridID, file);
	};
	
	if(rABS) reader.readAsBinaryString(file);
	else reader.readAsArrayBuffer(file);
}


taxQualRegistList.fn_excelUpload_valid = function(pStatus, pGridID, pFile) {
	
	if ( pStatus ) {
		
		var isVaild = true;
		
		var gridData = AUIGrid.getGridData(pGridID);
		var columnLayout = AUIGrid.getColumnLayout(pGridID);
		for ( var i = 0 ; i < gridData.length ; i ++ ) {
			var msgCount = 0;
			var resultMsg = "";
			if ( pGridID.indexOf("registReqst_vrify") > -1 ) { // 등록신청 엑셀
				for ( var j = 0 ; j < columnLayout.length ; j ++ ) {
					if ( gridData[i][columnLayout[j].dataField] == null && columnLayout[j].dataField != "vrifyResult" ) {
						msgCount++;
						resultMsg += msgCount + ". [" + columnLayout[j].headerText + "] 정보 누락" + "\n";
					}
				}
				
				if ( gridData[i].lndctnId.length > 6 ) {
					msgCount++;
					resultMsg += msgCount + ". [등록증번호] 6자리 초과" + "\n";
				}
				
				var ihidnum = gridData[i].ihidnum;
				var arr_ihidnum = ihidnum.split("-");
				if ( arr_ihidnum.length != 2 ) {
					msgCount++;
					resultMsg += msgCount + ". [주민등록번호] 형식 불일치 (예:000000-0000000)" + "\n";
				} else {
					if ( arr_ihidnum[0].length != 6 ) {
						msgCount++;
						resultMsg += msgCount + ". [주민등록번호] 형식 불일치 (예:000000-0000000)" + "\n";
					}
					if ( arr_ihidnum[1].length != 7 ) {
						msgCount++;
						resultMsg += msgCount + ". [주민등록번호] 형식 불일치 (예:000000-0000000)" + "\n";
					}
				}
				
				try {
					gridData[i].registDe.replaceAll("-").toDate();
				} catch ( e ) {
					msgCount++;
					resultMsg += msgCount + ". [교부일자(등록일)] 날짜형식 불일치 (예:0000-00-00)" + "\n";
				}
				
				if ( gridData[i].lndctnSbscrb != "의무가입" && gridData[i].lndctnSbscrb != "자진가입" && gridData[i].lndctnSbscrb != "미가입" ) {
					msgCount++;
					resultMsg += msgCount + ". [세무사회] 정보 불일치 (예:의무가입, 자진가입, 미가입)" + "\n";
				}
				
				var manageNo = gridData[i].manageNo + "";
				var arr_manageNo = manageNo.split("-");
				if ( arr_manageNo.length != 3  ) {
					msgCount++;
					resultMsg += msgCount + ". [관리번호] 형식 불일치 (예:D-000000-0)" + "\n";
				} else {
					if ( arr_manageNo[0] != "T" && arr_manageNo[0] != "U" && arr_manageNo[0] != "V" && arr_manageNo[0] != "C" && arr_manageNo[0] != "D" ) {
						msgCount++;
						resultMsg += msgCount + ". [관리번호] 정보 불일치 (예:T, U, V, C, D)" + "\n";
					}
					if ( arr_manageNo[1] == null || arr_manageNo[1].length < 1 ) {
						msgCount++;
						resultMsg += msgCount + ". [관리번호] 중간번호 누락" + "\n";
					} else if ( arr_manageNo[1].length > 6 ) {
						msgCount++;
						resultMsg += msgCount + ". [관리번호] 중간번호 6자리 초과" + "\n";
					}
					if ( arr_manageNo[2] == null || arr_manageNo[2].length < 1 ) {
						msgCount++;
						resultMsg += msgCount + ". [관리번호] 끝번호 누락" + "\n";
					} else if ( arr_manageNo[2].length > 1 ) {
						msgCount++;
						resultMsg += msgCount + ". [관리번호] 끝번호 자리수 초과" + "\n";
					}
				}
				
			} else if ( pGridID.indexOf("updtReqst_vrify") > -1 ) { // 갱신신청 엑셀
				for ( var j = 0 ; j < columnLayout.length ; j ++ ) {
					if ( gridData[i][columnLayout[j].dataField] == null && columnLayout[j].dataField != "vrifyResult" ) {
						msgCount++;
						resultMsg += msgCount + ". [" + columnLayout[j].headerText + "] 정보 누락" + "\n";
					}
				}
				
				var ihidnum = gridData[i].ihidnum;
				var arr_ihidnum = ihidnum.split("-");
				if ( arr_ihidnum.length != 2 ) {
					msgCount++;
					resultMsg += msgCount + ". [주민등록번호] 형식 불일치 (예:000000-0000000)" + "\n";
				} else {
					if ( arr_ihidnum[0].length != 6 ) {
						msgCount++;
						resultMsg += msgCount + ". [주민등록번호] 형식 불일치 (예:000000-0000000)" + "\n";
					}
					if ( arr_ihidnum[1].length != 7 ) {
						msgCount++;
						resultMsg += msgCount + ". [주민등록번호] 형식 불일치 (예:000000-0000000)" + "\n";
					}
				}
				
				try {
					gridData[i].updtDe.replaceAll("-").toDate();
				} catch ( e ) {
					msgCount++;
					resultMsg += msgCount + ". [교부일자(등록일)] 날짜형식 불일치 (예:0000-00-00)" + "\n";
				}
			}
			
			
			if ( msgCount > 0 ) {
				isVaild = false;
				AUIGrid.updateRow(pGridID, { "vrifyResult" : resultMsg }, i);
			}
		}
		
		
		var fileName = pFile.name.split(".");
		fileName.pop();
		fileName = fileName.join("");
		
		//주민번호, 성명 등 회원여부, 세무사 자격 등록여부 확인을 위해 서버 조회
		fn_ajax_call("/kicpa/tax/validTaxQualExcelUploadList.do", {"gridId":pGridID, "fileName":fileName, "validData":AUIGrid.getGridData(pGridID)}, taxQualRegistList.validTaxQualExcelUploadList_success, taxQualRegistList.validTaxQualExcelUploadList_error);
		
	}
}

taxQualRegistList.validTaxQualExcelUploadList_success = function(result) {
	
	var isVaild = true;
	for ( var i = 0 ; i < result.validData.length ; i ++ ) {
		
		var vrifyResult = result.validData[i].vrifyResult || "";
		
		var mberYn = result.validData[i].mberYn; // 회원여부
		var taxQualYn = result.validData[i].taxQualYn; // 세무사등록 여부
		
		if ( mberYn == "N" ) {
			vrifyResult += "회원등록이 되어있지 않음(주민번호와 성명 불일치)\n";
		}
		if ( taxQualYn == "N" ) {
			vrifyResult += "세무사 등록이 되어있지 않음\n";
		}
		
		if ( vrifyResult != "" ) {
			result.validData[i].vrifyResult = vrifyResult;
			isVaild = false;
		}
		
	}
	
	if ( !isVaild ) { // 검증결과 이상한 자료가 있다면
		
		AUIGrid.clearGridData(result.gridId);
		AUIGrid.setGridData(result.gridId, result.validData);
		
		AUIGrid.exportToXlsx(result.gridId, {
			exportWithStyle : true
			, fileName : result.fileName + "_검증결과"
			, progressBar : true
		});
		
		alert("업로드 검증결과 확인이 필요한 내역이 있습니다.\n* 다운로드 받은 엑셀을 참조");
	} else { // 검증결과 정상이라면
		// 일괄 저장 호출
		
	}
}

taxQualRegistList.validTaxQualExcelUploadList_error = function(xhr, status, error) {
	
}