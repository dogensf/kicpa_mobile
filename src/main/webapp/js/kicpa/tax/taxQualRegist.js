var taxQualRegist = taxQualRegist || {}; // 발송대장 namespace

taxQualRegist.id = "taxQualRegist";
taxQualRegist.taxQualRegist_gridID = null;

taxQualRegist.Control = [
	{id:"taxQualRegist_pin"},
	{id:"taxQualRegist_status"},
	{id:"taxQualRegist_lndctnSbscrb"},
	{id:"taxQualRegist_nm"},
	{id:"taxQualRegist_brthdy"},
	{id:"taxQualRegist_qualfReqstYn"},
	{id:"taxQualRegist_crqfcNo"},
	{id:"taxQualRegist_crqfcIsueDe"},
	{id:"taxQualRegist_registReqstYn"},
	{id:"taxQualRegist_lndctnCl"},
	{id:"taxQualRegist_lndctnNo"},
	{id:"taxQualRegist_vrifyNo"},
	{id:"taxQualRegist_lndctnId"},
	{id:"taxQualRegist_registDe"},
	{id:"taxQualRegist_lastUpdtDe"},
	{id:"taxQualRegist_updtReqstYn"},
	{id:"taxQualRegist_updtDe"}
]

//수정구분 Select Box 값
taxQualRegist.status = [
	{value:"I",		text:"신규"},
	{value:"U", 	text:"수정"}
];

// 세무사회 구분 Select Box 값
taxQualRegist.lndctnSbscrb = [
	{value:"",			text:"선택하세요"},
	{value:"A4020010",	text:"의무가입"},
	{value:"A4020020", 	text:"자진가입"},
	{value:"A4020030", 	text:"미가입"}
];
/* AS-IS 쿼리
select * from intladm.com_code_master
where 1 = 1
and (CODE like 'A402%')
*/


// 등록신청 번호 앞번호
taxQualRegist.lndctnCl = [
	{value:"",		text:"선택"},
	{value:"T",		text:"T"},
	{value:"U", 	text:"U"},
	{value:"V", 	text:"V"},
	{value:"C", 	text:"C"},
	{value:"D", 	text:"D"},
];
/*
1)  가운데 번호가 1만번 미만이고  등록일이 2004년 이전인 경우 Select Box는  T로 변경
2)  가운데 번호가 1만번 이상 ~ 2만번 미만이고 등록일이 2004년 이전인 경우 Select Box는  U로 변경
3)  가운데 번호가 2만번 이상이고 등록일이 2004년 이전인 경우 Select Box는  V로 변경
4)  가운데 번호가 1만번 미만이고 등록일이 2004년 이후인 경우 Select Box는  C로 변경 
5)  가운데 번호가 1만번 이상이고 등록일이 2004년 이후인 경우 Select Box는  D로 변경
*/

// 세무사 개업상태 내용
taxQualRegist.opbizCn = [
	{value:"A4010010",		text:"개업"},
	{value:"A4010020",		text:"휴업"},
	{value:"A4010030", 		text:"취소"}
];
/* AS-IS 쿼리
select * from intladm.com_code_master
where 1 = 1
and  (code like '%A4010010%' -- 개업
   or code like '%A4010020%' -- 휴업
   or code like '%12000010%') -- 취소(임의코드)
*/

$(window).resize(function(){
    try{
        // 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    	taxQualRegist.fn_init_resize_AUIGrid();
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

        taxQualRegist.fn_createAUIGrid(); // AUGRID 생성
        taxQualRegist.fn_init_events(); // 이벤트 등록
        taxQualRegist.fn_init(); // 화면 초기화

    }
);

taxQualRegist.fn_init_events = function() {
	
	// 수정구분 Select Box 값 셋팅
	for (var i = 0 ; i < taxQualRegist.status.length ; i ++ ) {
		$("#taxQualRegist_status").append('<option value="' + taxQualRegist.status[i].value + '">' + taxQualRegist.status[i].text + '</option>');
	}
	$("#taxQualRegist_status").selectpicker('refresh');
	
	// 세무사회 구분 Select Box 값 셋팅
	for (var i = 0 ; i < taxQualRegist.lndctnSbscrb.length ; i ++ ) {
		$("#taxQualRegist_lndctnSbscrb").append('<option value="' + taxQualRegist.lndctnSbscrb[i].value + '">' + taxQualRegist.lndctnSbscrb[i].text + '</option>');
	}
	$("#taxQualRegist_lndctnSbscrb").selectpicker('refresh');
	
	// 등록신청 앞번호(코드) Select Box 값 셋팅
	for (var i = 0 ; i < taxQualRegist.lndctnCl.length ; i ++ ) {
		$("#taxQualRegist_lndctnCl").append('<option value="' + taxQualRegist.lndctnCl[i].value + '">' + taxQualRegist.lndctnCl[i].text + '</option>');
	}
	$('#taxQualRegist_lndctnCl').val("");
	$("#taxQualRegist_lndctnCl").selectpicker('refresh');
	
	// 자격증발부일
	$('#taxQualRegist_crqfcIsueDe').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
	
	// 등록일
	$('#taxQualRegist_registDe').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
	
	// 등록갱신반영일
	$('#taxQualRegist_updtDe').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
	
	// 최종갱신일
	$('#taxQualRegist_lastUpdtDe').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        orientation: "bottom left"
    });
	
	$('#taxQualRegist_status').attr("disabled", false);
	$("#taxQualRegist_status").selectpicker('refresh');
	
	// 성명 선택
	$("#taxQualRegist_nm").on("click",function(e) {
		mainCommonList.fn_popupMember_search("", "", taxQualRegist.userSearchPopup);
	});
	
	// 세무사 개업상태 행추가
	$('#taxQualRegist_addRow').on("click",function(e) {
		var item = {};
		item.no = parseInt(AUIGrid.getRowCount(taxQualRegist.taxQualRegist_gridID)) + 1;
		item.chk = "";
		item.opbizDe = getCurrentDate().toDate().getDateFormat("YYYY-MM-DD");
		item.text = "";
		AUIGrid.addRow(taxQualRegist.taxQualRegist_gridID, item, "last");
    });
	
	// 세무사 개업상태 행삭제
	$('#taxQualRegist_delRow').on("click",function(e) {
		var gridData = AUIGrid.getGridData(taxQualRegist.taxQualRegist_gridID);
		var delRowCount = 0;
		for ( var i = 0 ; i < gridData.length ; i ++ ) {
			if ( gridData[i]['chk'] ) {
				AUIGrid.removeRow(taxQualRegist.taxQualRegist_gridID, i - delRowCount);
				delRowCount++;
			}
		}
		
		gridData = AUIGrid.getGridData(taxQualRegist.taxQualRegist_gridID);
		for ( var i = 0 ; i < gridData.length ; i ++ ) {
			gridData[i].no = i + 1;
		}
		AUIGrid.setGridData(taxQualRegist.taxQualRegist_gridID, gridData);
    });
	
	// 자격신청
	$('#taxQualRegist_qualfReqstYn').change(function() {
		$(this).prop("checked", this.checked);
		
		if(this.checked) {
            $(this).val("Y");
        } else {
        	$(this).val("N");
        	$('#taxQualRegist_crqfcNo').val("");
        	$('#taxQualRegist_crqfcNo').change();
        }
		
        $('#taxQualRegist_crqfcNo').attr("disabled", !this.checked);
    });
	
	// 등록신청
	$('#taxQualRegist_registReqstYn').change(function() {
		$(this).prop("checked", this.checked);
		
		if(this.checked) {
            $(this).val("Y");
        } else {
        	$(this).val("N");
			$('#taxQualRegist_lndctnCl').val("");
			$('#taxQualRegist_lndctnNo').val("");
			$('#taxQualRegist_vrifyNo').val("");
			$('#taxQualRegist_lndctnId').val("");
        }
		
		$('#taxQualRegist_lndctnCl').attr("disabled", 	!this.checked);
		$('#taxQualRegist_lndctnNo').attr("disabled", 	!this.checked);
		$('#taxQualRegist_vrifyNo').attr("disabled", 	!this.checked);
		$('#taxQualRegist_lndctnId').attr("disabled", 	!this.checked);
		
		$('#taxQualRegist_lndctnCl').selectpicker('refresh');
    });
	
	// 갱신신청
	$('#taxQualRegist_updtReqstYn').change(function() {
		$(this).prop("checked", this.checked);
		
		if ( this.checked ) {
			$(this).val("Y");
		} else {
			$(this).val("N");
			$('#taxQualRegist_updtDe').datepicker("setDate", "");
		}
		
		$('#taxQualRegist_updtDe').attr("disabled", !this.checked);
		$('#taxQualRegist_updtDe').datepicker("refresh");
	});
	
	// 저장
	$('#taxQualRegist_save').on("click",function(e) {
		
		var taxQualRegist_saveData = {};
		// 자격 정보
		taxQualRegist_saveData.qualfData = $('#taxQualRegist_qualfForm').serializeObject();
		// 개업상태 정보
		taxQualRegist_saveData.opbizData = AUIGrid.getGridData(taxQualRegist.taxQualRegist_gridID);
		
		if ( taxQualRegist.saveValidation(taxQualRegist_saveData.qualfData, taxQualRegist_saveData.opbizData) ) {
			fn_ajax_call("/kicpa/tax/saveTaxQualRegist.do", taxQualRegist_saveData, taxQualRegist.saveTaxQualRegist_success, taxQualRegist.saveTaxQualRegist_error);
		}
		
		return false;
    });
	
	$('#taxQualRegist_crqfcNo').change(function() {
		var val = $(this).val();
		$('#taxQualRegist_crqfcIsueDe').attr("disabled", (val.length < 6));
		$('#taxQualRegist_crqfcIsueDe').datepicker("refresh");
		if ( $('#taxQualRegist_crqfcIsueDe').attr("disabled") ) {
			$('#taxQualRegist_crqfcIsueDe').datepicker("setDate", "");
		}
		$('#taxQualRegist_crqfcIsueDe').datepicker("refresh");
	});
	
	$('#taxQualRegist_lndctnNo').change(function() {
		var val1 = $('#taxQualRegist_lndctnNo').val();
		var val2 = $('#taxQualRegist_vrifyNo').val();
		var val3 = $('#taxQualRegist_lndctnId').val();
		
		$('#taxQualRegist_registDe').attr("disabled", (val1.length < 1 || val2.length < 1 || val3.length < 6));
		if ( $('#taxQualRegist_registDe').attr("disabled") ) {
			$('#taxQualRegist_registDe').datepicker("setDate", "");
		}
		$('#taxQualRegist_registDe').datepicker("refresh");
	});
	
	$('#taxQualRegist_vrifyNo').change(function() {
		var val1 = $('#taxQualRegist_lndctnNo').val();
		var val2 = $('#taxQualRegist_vrifyNo').val();
		var val3 = $('#taxQualRegist_lndctnId').val();
		
		$('#taxQualRegist_registDe').attr("disabled", (val1.length < 1 || val2.length < 1 || val3.length < 6));
		if ( $('#taxQualRegist_registDe').attr("disabled") ) {
			$('#taxQualRegist_registDe').datepicker("setDate", "");
		}
		$('#taxQualRegist_registDe').datepicker("refresh");
	});
	
	$('#taxQualRegist_lndctnId').change(function() {
		var val1 = $('#taxQualRegist_lndctnNo').val();
		var val2 = $('#taxQualRegist_vrifyNo').val();
		var val3 = $('#taxQualRegist_lndctnId').val();
		
		$('#taxQualRegist_registDe').attr("disabled", (val1.length < 1 || val2.length < 1 || val3.length < 6));
		if ( $('#taxQualRegist_registDe').attr("disabled") ) {
			$('#taxQualRegist_registDe').datepicker("setDate", "");
		}
		$('#taxQualRegist_registDe').datepicker("refresh");
	});
	
	$('#taxQualRegist_registDe').change(function() {
		var val1 = $('#taxQualRegist_lndctnNo').val();
		var val2 = $(this).val();
		var lndctnCl = "";
		if ( val2.length >= 4 ) {
			val2 = val2.substring(0, 4);
			if ( val1 < 10000 && val2 < 2004 ) {
				lndctnCl = "T";
			} else if ( val1 >= 10000 && val1 < 20000 && val2 < 2004 ) {
				lndctnCl = "U";
			} else if ( val1 >= 20000 && val2 < 2004 ) {
				lndctnCl = "V";
			} else if ( val1 < 10000 && val2 >= 2004 ) {
				lndctnCl = "C";
			} else if ( val1 >= 10000 && val2 >= 2004 ) {
				lndctnCl = "D";
			}
		}
		
		if ( lndctnCl != "" ) {
			$('#taxQualRegist_lndctnCl').val(lndctnCl);
			$("#taxQualRegist_lndctnCl").selectpicker('refresh');
		}
		
		if ( $('#taxQualRegist_registDe').val() != "" && $('#taxQualRegist_updtDe').val() == "" ) {
			var lastUpdtDe = ($('#taxQualRegist_registDe').val().replaceAll('-', '')).toDate().getAddDate(5, "Y").getAddDate(-1, "D").getDateFormat("YYYY-MM-DD");
			$('#taxQualRegist_lastUpdtDe').datepicker("setDate", lastUpdtDe);
			$('#taxQualRegist_lastUpdtDe').datepicker("refresh");
		}
/*
1)  가운데 번호가 1만번 미만이고  등록일이 2004년 이전인 경우 Select Box는  T로 변경
2)  가운데 번호가 1만번 이상 ~ 2만번 미만이고 등록일이 2004년 이전인 경우 Select Box는  U로 변경
3)  가운데 번호가 2만번 이상이고 등록일이 2004년 이전인 경우 Select Box는  V로 변경
4)  가운데 번호가 1만번 미만이고 등록일이 2004년 이후인 경우 Select Box는  C로 변경 
5)  가운데 번호가 1만번 이상이고 등록일이 2004년 이후인 경우 Select Box는  D로 변경             
*/
	});
	
	$('#taxQualRegist_updtDe').change(function() {
		if ( $('#taxQualRegist_updtDe').val() != "" ) {
			var lastUpdtDe = ($('#taxQualRegist_updtDe').val().replaceAll('-', '')).toDate().getAddDate(5, "Y").getAddDate(-1, "D").getDateFormat("YYYY-MM-DD");
			$('#taxQualRegist_lastUpdtDe').datepicker("setDate", lastUpdtDe);
			$('#taxQualRegist_lastUpdtDe').datepicker("refresh");
		}
	});
	
	// 종료
	$('#taxQualRegist_exit').on("click",function(e) {
		closeTab(taxQualRegist.id);
    });
	
}

taxQualRegist.fn_init = function(pParam) {
	
	taxQualRegist.clearData();
	
	var param = {};
	if ( pParam ) {
		param = pParam;
	} else if ( taxQualRegist_paramJson ) {
		param = taxQualRegist_paramJson;
		taxQualRegist_paramJson = null;
	}
	
	if ( param.status == "U" ) {
		fn_ajax_call("/kicpa/tax/selectTaxQualRegist.do", param, taxQualRegist.selectTaxQualRegist_success, taxQualRegist.selectTaxQualRegist_error);
	}
	
	if ( param.cpaId != null && param.cpaId != "null" && param.cpaId != "" ) { // 회원번호 있으면 회계사, 없으면 합격자, 수습
		$('#taxQualRegist_div_registReqst').show();
		$('#taxQualRegist_div_registDe').show();
		$('#taxQualRegist_div_lastUpdtDe').show();
		$('#taxQualRegist_div_updtReqst').show();
	} else {
		$('#taxQualRegist_div_registReqst').hide();
		$('#taxQualRegist_div_registDe').hide();
		$('#taxQualRegist_div_lastUpdtDe').hide();
		$('#taxQualRegist_div_updtReqst').hide();
	}
	
	// 수정구분 신규
	$("#taxQualRegist_status").selectpicker('val', param.status);
	$("#taxQualRegist_status").selectpicker('refresh');
}


//AUIGrid 를 생성합니다.
taxQualRegist.fn_createAUIGrid = function() {

    var columnLayout = [{
        dataField : "no",
        headerText : "No",
        width : 40,
        editable : false // ID 편집 불가능 설정
    }, {
        dataField : "chk",
        headerText : "선택",
        width : 40,
        /*
        headerRenderer : { // 헤더 렌더러
        	type : "CheckBoxHeaderRenderer",
        	// renderer 의 체크박스에 상호 의존적인 모드로 설정 (기본값 : false)
        	// dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
        	dependentMode : true
        },*/
        renderer : {
        	type : "CheckBoxEditRenderer",
        	editable : true,
        	checkableFunction : function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
				// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
				if(item.no == "1") { // 첫줄 수정 불가
					return false;
				}
				return true;
			}
        }
    }, {
        dataField : "opbizDe",
        headerText : "날짜",
        width : 180,
        dataType : "date",
    	dateInputFormat : "yyyy-mm-dd", // 실제 데이터의 형식 지정
    	formatString : "yyyy-mm-dd", // 실제 데이터 형식을 어떻게 표시할지 지정
    	renderer : {
    		type : "IconRenderer",
    		iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
    		iconHeight : 16,
    		iconPosition : "aisleRight",
    		iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
    			"default" : "../../../images/calendar.gif" // default
    		},
    		onClick : function(event) {
    			// 달력 아이콘 클릭하면 실제로 달력을 띄움.
    			// 즉, 수정으로 진입함.
    			AUIGrid.openInputer(event.pid);
    		}
    	},
    	editRenderer : {
    		type : "CalendarRenderer",
    		defaultFormat : "yyyy-mm-dd", // 달력 선택 시 데이터에 적용되는 날짜 형식
    		showEditorBtn : false,
    		showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 출력 여부
    		onlyCalendar : true, // 사용자 입력 불가, 즉 달력으로만 날짜입력 (기본값 : true)
    		showExtraDays : true // 지난 달, 다음 달 여분의 날짜(days) 출력
    	}
    }, {
        dataField : "opbizCn",
        headerText : "내용",
        renderer : {
			type : "DropDownListRenderer",
			list : taxQualRegist.opbizCn, // key-value Object 로 구성된 리스트
			keyField : "value", // key 에 해당되는 필드명
			valueField : "text", // value 에 해당되는 필드명
		}
    }];

    var gridPros = {
        showRowNumColumn : false,
        showRowCheckColumn : false,
        editable : true,
        enableSorting : false, // 정렬 사용
        softRemoveRowMode:false,
		headerHeight : 34,
		rowHeight : 34
    };


     fn_AUIGrid_create([{id:"taxQualRegist_grid_wrap", obj:[taxQualRegist,"taxQualRegist_gridID"], layout:columnLayout , prop:gridPros}]);

}


taxQualRegist.fn_init_resize_AUIGrid= function(){
	
    fn_AUIGrid_resize([{id:"taxQualRegist_grid_wrap", obj:taxQualRegist.taxQualRegist_gridID}]);

}

taxQualRegist.saveValidation = function(qualfData, opbizData) {
	
	var msg = "";
	var cnt = 1;
	//qualfData 세무사 자격정보
	if ( !(qualfData.pin) ) { msg += cnt++ + ". 회원을 선택하십시오.\n"; }
	if ( !(qualfData.lndctnSbscrb) ) { msg += cnt++ + ". 세무사회 가입 상태를 선택하십시오.\n"; }
	//if ( !(qualfData.crqfcNo) ) { msg 0+= cnt++ + ". 세무사 자격증 번호를 입력하십시오.\n"; }
	//if ( !(qualfData.crqfcIsueDe) ) { msg += cnt++ + ". 자격증발부일을 입력하십시오.\n"; }
	
	//opbizData 세무사 개업상태
	
	
	if ( msg == "" ) {
		return true;
	} else {
		alert(msg);
		return false;
	}
}

taxQualRegist.saveTaxQualRegist_success = function(result) {
	alert("저장되었습니다.");
	return;
}

taxQualRegist.saveTaxQualRegist_error = function(xhr, status, error) {
	alert("실패");
}

taxQualRegist.selectTaxQualRegist_success = function(result) {
	var data = result.qualfData[0];
	for ( var key in data ) {
        var value = data[key];
        var elementID = "#taxQualRegist_" + key + "";
        // console.log("key ==> " + key + ", " + elementID + ", " + value);
        if ( $(elementID).length > 0 ) {
        	
        	if ( $(elementID)[0].type == "checkbox" ) {
        		if ( value == "Y" ) {
        			$(elementID).prop('checked', true);
        		} else {
        			$(elementID).prop('checked', false);
        		}
        		$(elementID).change();
        	} else if ( $(elementID)[0].tagName == "SELECT") {
                $(elementID).selectpicker('val', value);
                $(elementID).selectpicker('refresh');
        	} else if ( $(elementID)[0].attributes['data-date-format'] != null ) {
        		$(elementID).datepicker("setDate", value);
        		$(elementID).datepicker("refresh");
        	} else {
        		$(elementID).val(value);
        		$(elementID).change();
        	}
        }
    }
	
	AUIGrid.setGridData(taxQualRegist.taxQualRegist_gridID, result.opbizData);
}

taxQualRegist.selectTaxQualRegist_error = function(xhr, status, error) {
	alert("저장을 실패하였습니다.");
}

taxQualRegist.userSearchPopup = function(result) {
	var param = {"pin":result.pin,  "cpaId":result.cpaId, "status":"U"};
	alert(JSON.stringify(result));
	taxQualRegist.fn_init(param);
}

taxQualRegist.clearData = function() {
	for ( var i = 0 ; i < taxQualRegist.Control.length ; i ++ ) {
		var elementID = "#" + taxQualRegist.Control[i].id;
		if ( $(elementID).length > 0 ) {
        	if ( $(elementID)[0].type == "checkbox" ) {
       			$(elementID).prop('checked', false);
        		$(elementID).change();
        	} else if ( $(elementID)[0].tagName == "SELECT") {
                $(elementID).selectpicker('val', "");
                $(elementID).selectpicker('refresh');
        	} else if ( $(elementID)[0].attributes['data-date-format'] != null ) {
        		$(elementID).datepicker("setDate", "");
        		$(elementID).datepicker("refresh");
        	} else {
        		$(elementID).val("");
        		$(elementID).change();
        	}
        }
	}
	
	AUIGrid.clearGridData(taxQualRegist.taxQualRegist_gridID);
}