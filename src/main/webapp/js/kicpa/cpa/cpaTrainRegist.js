var cpaTrainRegist = cpaTrainRegist || {}; // 발송대장 namespace

cpaTrainRegist.apntcInfo_grid_wrap = null;
cpaTrainRegist.reportInfo_grid_wrap = null;
cpaTrainRegist.resultInfo_grid_wrap = null;

var trnOdrComboList = [{"code":"", "value":"선택하세요."}, {"code":"1", "value":"기본"}, {"code":"2", "value":"외감"}];
var reTrnYnComboList = [{"code":"", "value":"선택하세요."}, {"code":"Y", "value":"Y"}, {"code":"N", "value":"N"}];

$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		fn_AUIGrid_resize([{id:"cpaPassApntcInfoList_grid_wrap",obj:cpaTrainRegist.apntcInfo_grid_wrap}
			,{id:"cpaPassReportInfoList_grid_wrap",obj:cpaTrainRegist.reportInfo_grid_wrap}
			,{id:"cpaPassResultInfoList_grid_wrap",obj:cpaTrainRegist.resultInfo_grid_wrap}]);
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
	}catch(e){
	}
});

// 문서 시작 시
$(document).ready(
    function() {

		cpaTrainRegist.fn_createAUIGrid(); // AUGRID 생성
        cpaTrainRegist.fn_init(); // 화면 초기화
		cpaTrainRegist.fn_init_events(); // 이벤트 등록

		// 탭이 열린후 grid resize
		$("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
			$(window).resize();
		});
	});

cpaTrainRegist.fn_init = function() {

	cpaTrainRegist.selectCpaTrainRegistApntcInfoList();

	if($('#cpaTrainRegistAppCpaNo').val()=="" || $('#cpaTrainRegistAppCpaNo').val()==null){
		$('#cpaTrainRegist_tab2').addClass("disabled");
		$('#cpaTrainRegist_tab3').addClass("disabled");
	}

	$('#cpaTrainRegistApntcInfo_etcYn').on('click',function (){
		if($("input:checkbox[name=appInsttEtcYn]").is(":checked")){
			$('#cpaTrainRegistApntcInfo_etc').attr('disabled',false);
			$('#cpaTrainRegistApntcInfo_etcYn').val("Y");
		}else{
			$('#cpaTrainRegistApntcInfo_etc').attr('disabled',true);
			$('#cpaTrainRegistApntcInfo_etcYn').val("N");
		}
	})
}


//AUIGrid 를 생성합니다.
cpaTrainRegist.fn_createAUIGrid = function() {

	var apntcInfo_columnLayout = [ {
		dataField : "registDe",
		headerText : "날짜*",
		width : "10%",
		dataType : "date",
		dateInputFormat : "yyyymmdd", // 실제 데이터의 형식 지정
		formatString : "yyyy-mm-dd", // 실제 데이터 형식을 어떻게 표시할지 지정
		editRenderer : {
			type : "BTCalendarRenderer",
			defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
			showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 출력 여부
			onlyMonthMode : true, // 일 단위 달력이 아닌 월 단위 달력 출력
			// bootstrap-datepicker 속성을 여기에 설정하십시오.
			// API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
			btOpts : {
				language : "ko",
				minViewMode : 2
			}  // end of btOpts  // end of btOpts
		}
	}, {
		dataField : "apntcClNm",
		headerText : "실무수습구분*",
		width : "10%"
	}, {
		dataField : "appInsttCdNm",
		headerText : "실무수습기관*",
		width : "10%",
		colSpan : 4, // 자신을 포함하여 3개의 헤더를 가로 병합함.
		dataType : "numeric"
	}, {
		dataField: "appInsttCd",
		dataType : "numeric",
		width : "7%"
	}, {
		dataField: "appInsttEtcYn",
		width : "4%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "기타";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : false, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	}, {
		dataField: "appInsttEtc",
		dataType : "numeric",
		width : "7%"
	}, {
		dataField : "guideCpaNm",
		headerText : "지도공인 회계사*",
		colSpan : 2,
		width : "11%"
	},{
		dataField: "guideCpaNo",
		width : "11%"
	},{
		dataField: "remark",
		headerText: "비고",
		width : "20%"
	},{
		dataField : "apntcInfo",
		headerText : "수정",
		width : "10%",
		renderer : {
			type : "ButtonRenderer",
			labelText : "수정",
			onClick : function(event) {
				cpaTrainRegist.fn_cpaTrainAuditInfo_modify(event);
			}

		}
	},{
		dataField: "apntcSn",
		headerText: "이력번호",
		visible: false
	},{
		dataField : "apntcCl",
		headerText : "실무수습구분코드",
		visible: false
	},{
		dataField : "deSaveFlag",
		headerText : "수습날짜저장flag",
		visible: false
	},{
		dataField : "deSaveFlag2",
		headerText : "외감날짜저장flag",
		visible: false
	}];

	var reportInfo_columnLayout = [ {
		dataField : "brfYear",
		headerText : "연도",
		width : "16%",
		dataType : "date",
		dateInputFormat : "yyyy", // 실제 데이터의 형식 지정
		formatString : "yyyy", // 실제 데이터 형식을 어떻게 표시할지 지정
		editRenderer : {
			type : "BTCalendarRenderer",
			defaultFormat : "yyyy", // 달력 선택 시 데이터에 적용되는 날짜 형식
			showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
			onlyMonthMode : true, // 일 단위 달력이 아닌 월 단위 달력 출력
			// bootstrap-datepicker 속성을 여기에 설정하십시오.
			// API : https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
			btOpts : {
				language : "ko",
				minViewMode : 2
			}  // end of btOpts  // end of btOpts
		}
	}, {
		dataField : "brfMt1",
		headerText : "1월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	}, {
		dataField : "brfMt2",
		headerText : "2월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	}, {
		dataField : "brfMt3",
		headerText : "3월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt4",
		headerText: "4월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt5",
		headerText: "5월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt6",
		headerText: "6월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt7",
		headerText: "7월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt8",
		headerText: "8월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt9",
		headerText: "9월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt10",
		headerText: "10월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt11",
		headerText: "11월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "brfMt12",
		headerText: "12월",
		width : "7%",
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			return "제출";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N"
		}
	},{
		dataField: "appCpaId",
		headerText: "수습등록번호",
		visible: false
	}];

	var resultInfo_columnLayout = [ {
		dataField : "trnOdr",
		headerText : "차수*",
		width : "10%",
		labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
			var retStr = value;
			for(var i=0,len=trnOdrComboList.length; i<len; i++) {
				if(trnOdrComboList[i]["code"] == value) {
					retStr = trnOdrComboList[i]["value"];
					break;
				}
			}
			return retStr;
		},
		editRenderer : {
			type : "DropDownListRenderer",
			list : trnOdrComboList, //key-value Object 로 구성된 리스트
			keyField : "code", // key 에 해당되는 필드명
			valueField : "value" // value 에 해당되는 필드명
		}
	}, {
		dataField : "complYn",
		headerText : "재연수(Y/N)*",
		width : "11%",
		labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
			var retStr = value;
			for(var i=0,len=reTrnYnComboList.length; i<len; i++) {
				if(reTrnYnComboList[i]["code"] == value) {
					retStr = reTrnYnComboList[i]["value"];
					break;
				}
			}
			return retStr;
		},
		editRenderer : {
			type : "DropDownListRenderer",
			list : reTrnYnComboList, //key-value Object 로 구성된 리스트
			keyField : "code", // key 에 해당되는 필드명
			valueField : "value" // value 에 해당되는 필드명
		}
	}, {
		dataField : "psexamYn",
		headerText : "재시험(Y/N)*",
		width : "11%",
		labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
			var retStr = value;
			for(var i=0,len=reTrnYnComboList.length; i<len; i++) {
				if(reTrnYnComboList[i]["code"] == value) {
					retStr = reTrnYnComboList[i]["value"];
					break;
				}
			}
			return retStr;
		},
		editRenderer : {
			type : "DropDownListRenderer",
			list : reTrnYnComboList, //key-value Object 로 구성된 리스트
			keyField : "code", // key 에 해당되는 필드명
			valueField : "value" // value 에 해당되는 필드명
		}
	}, {
		dataField : "trnBgnDe",
		headerText : "시작일*",
		width : "12%",
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
				daysOfWeekHighlighted: "0,6"
			}  // end of btOpts
		}
	},{
		dataField: "trnEndDe",
		headerText: "종료일*",
		width : "12%",
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
				daysOfWeekHighlighted: "0,6"
			}  // end of btOpts
		}
	},{
		dataField: "trnTm",
		headerText: "연수시간*",
		width : "11%",
		editRenderer : {
			type : "InputEditRenderer",
			onlyNumeric : true, // 0~9만 입력가능
			maxlength : 3
		}
	},{
		dataField: "atendTm",
		headerText: "출석시간*",
		width : "11%",
		editRenderer : {
			type : "InputEditRenderer",
			onlyNumeric : true, // 0~9만 입력가능
			maxlength : 3
		}
	},{
		dataField: "prcafsAbilityScore",
		headerText: "실무역량*",
		width : "11%",
		dataType: "numeric",
		formatString: "#,##0.00",
		editRenderer : {
			type : "InputEditRenderer",
			onlyNumeric : true, // 0~9만 입력가능
			allowPoint : true,
			maxlength : 5
		}
	},{
		dataField: "vocEthicsScore",
		headerText: "직업윤리*",
		width : "11%",
		dataType: "numeric",
		formatString: "#,##0.00",
		editRenderer : {
			type : "InputEditRenderer",
			onlyNumeric : true, // 0~9만 입력가능
			allowPoint : true,
			maxlength : 5
		}
	},{
		dataField: "appTrnSn",
		headerText: "순번",
		visible: false
	}];


	// 그리드 속성 설정

	var gridPros_apntcInfo = {
		editable: false,                	// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
		showRowNumColumn: true,
		headerHeight: 40, 				//헤더의 높이를 지정합니다.
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 45,

		useContextMenu: true,           // 컨텍스트 메뉴 사용 여부 (기본값 : false)
		enableFilter: true,             // 필터 사용 여부 (기본값 : false)
		useGroupingPanel: false,        // 그룹핑 패널 사용
		showStateColumn: false,         // 상태 칼럼 사용
		displayTreeOpen: true,          // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)

		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassreportInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		}
	};

	var gridPros_reportInfo = {
		editable: true,                	// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
		showRowNumColumn: true,
		headerHeight: 40, 				//헤더의 높이를 지정합니다.
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 45,
		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassreportInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		}
	};

	var gridPros_resultInfo = {
		editable: true,                	// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
		showRowNumColumn: true,
		headerHeight: 40, 				//헤더의 높이를 지정합니다.
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 50,
		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassreportInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		}
	};


	fn_AUIGrid_create([{id:"cpaPassApntcInfoList_grid_wrap", obj:[cpaTrainRegist,"apntcInfo_grid_wrap"], layout:apntcInfo_columnLayout , prop:gridPros_apntcInfo}
		,{id:"cpaPassReportInfoList_grid_wrap", obj:[cpaTrainRegist,"reportInfo_grid_wrap"], layout:reportInfo_columnLayout , prop:gridPros_reportInfo}
		,{id:"cpaPassResultInfoList_grid_wrap", obj: [cpaTrainRegist,"resultInfo_grid_wrap"], layout:resultInfo_columnLayout, prop:gridPros_resultInfo}
	]);

	/*AUIGrid.setColumnSizeList(cpaTrainRegist.reportInfo_grid_wrap, [200, 250]);

	fn_AUIGrid_resize([{id:"cpaPassReportInfoList_grid_wrap",obj:cpaTrainRegist.reportInfo_grid_wrap}]);*/

}

cpaTrainRegist.fn_init_events = function() {

	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(cpaTrainRegist.reportInfo_grid_wrap, "cellEditBegin", function(event) {
		var rowIndex = $("#cpaPassreportInfoList_TotalCnt").html();
		if(event.rowIndex < rowIndex){
			return false;
		}
		else{
			if(event.dataField == "zipCd" || event.dataField == "rdAdres") {

				var selectedItems = AUIGrid.getSelectedItems(cpaTrainRegist.reportInfo_grid_wrap);
				var first = selectedItems[0];


				cpaTrainRegist.goPopup_Adres(first.rowIndex,"reportInfo_grid_wrap");

				return false; // false 반환. 기본 행위인 편집 불가
			}

			if(event.dataField == "inputCl") {
				return false;
			}
		}
	});

	// 선택 이벤트 바인딩
	AUIGrid.bind(cpaTrainRegist.resultInfo_grid_wrap, "cellEditEnd", function (event) {

		if(event.dataField == "prcafsAbilityScore") {

			if(event.value >100){
				var item = { prcafsAbilityScore : 100 };
				AUIGrid.updateRow(cpaTrainRegist.resultInfo_grid_wrap, item, event.rowIndex);
			}
		}

		if(event.dataField == "vocEthicsScore") {

			if(event.value >100){
				var item = { vocEthicsScore : 100 };
				AUIGrid.updateRow(cpaTrainRegist.resultInfo_grid_wrap, item, event.rowIndex);
			}
		}

	});

	// 탭 이동이 완료됐을 때 이벤트
	$("body").on("shown.bs.tab", "#cpaTrainRegist_tab", function(e) {

		switch (e.target.id) {
			case "cpaTrainRegist_tab1" : // 이력정보
				fn_AUIGrid_resize([{id:"cpaPassApntcInfoList_grid_wrap",obj:cpaTrainRegist.apntcInfo_grid_wrap}]);
				break;
			case "cpaTrainRegist_tab2" : // 상황보고서
				fn_AUIGrid_resize([{id:"cpaPassReportInfoList_grid_wrap",obj:cpaTrainRegist.reportInfo_grid_wrap}]);
				break;
			case "cpaTrainRegist_tab3" : // 연수결과
				fn_AUIGrid_resize([{id:"cpaPassResultInfoList_grid_wrap",obj:cpaTrainRegist.resultInfo_grid_wrap}]);
				break;
		}
	});

	//합격자 기본정보 미등록시 다른 탭 선택 불가
	$('.nopointer').on('click',function(){
		alert("합격자 기본정보를 먼저\n저장하세요.");
		return;
	});

	//감사인 검색
	$('#cpaTrainPop_appInsttCdSearchBtn').on("click",function(e) {
		mainCommonList.fn_popupAudit_search($('#cpaTrainPop_appInsttDetail').val(),{title:"실무수습기관 선택"} , cpaTrainRegist.fn_set_audit_search);
	});
	$('#cpaTrainPop_appInsttDetail').on("keypress",function(event) {
		if(event.keyCode==13) {
			event.preventDefault();
			mainCommonList.fn_popupAudit_search($('#cpaTrainPop_appInsttDetail').val(),{title:"실무수습기관 선택"} , cpaTrainRegist.fn_set_audit_search);
		}
	});

	//지도공인회계사 검색
	$('#cpaTrainPop_guideCpaSearchBtn').on("click",function(e) {
		mainCommonList.fn_popup_search($('#cpaTrainPop_guideCpaNm').val(),{title:"지도공인회계사 선택"} , cpaTrainRegist.fn_set_train_search);
	});
	$('#cpaTrainPop_guideCpaNm').on("keypress",function(event) {
		if(event.keyCode==13) {
			event.preventDefault();
			mainCommonList.fn_popup_search($('#cpaTrainPop_guideCpaNm').val(),{title:"지도공인회계사 선택"} , cpaTrainRegist.fn_set_train_search);
		}
	});


	//이력정보 조회
	$("#cpaTrainRegist_tab1").on("click",function(e) {
		cpaTrainRegist.selectCpaTrainRegistApntcInfoList();
	});

	//상황보고서 조회
	$("#cpaTrainRegist_tab2").on("click",function(e) {
		cpaTrainRegist.selectCpaTrainRegistReportInfoList();
	});

	//상황보고서 조회
	$("#cpaTrainRegist_tab3").on("click",function(e) {
		cpaTrainRegist.selectCpaTrainRegistResultInfoList();
	});

}

cpaTrainRegist.cpaTrainRegist_apntcPopInit = function(){
	$("#cpaTrainPop_appRegistDe").datepicker('setDate', new Date());
	$('#cpaTrainPop_appInsttDetail').val('');
	$('#cpaTrainPop_appInsttCd').val('');
	$("input:checkbox[id='cpaTrainRegistApntcInfo_etcYn']").prop("checked", false);
	$('#cpaTrainRegistApntcInfo_etc').attr('disabled',true);
	$('#cpaTrainRegistApntcInfo_etc').val('');
	$('#cpaTrainPop_guideCpaNm').val('');
	$('#cpaTrainPop_guideCpaNo').val('');
	$('#cpaTrainPop_remark').val('');
	$("#cpaTrainPop_apntcCl option").remove();
	$("#cpaTrainPop_apntcCl").selectpicker('refresh');
	$("#cpaTrainPop_apntcSn").val('');
	$('#cpaTrainPop_deSaveFlag').val('N');
	$('#cpaTrainPop_deSaveFlag2').val('N');
	$('#cpaTrainPop_registToDe').val('');
	$('#cpaTrainPop_registFromDe').val('');
}

cpaTrainRegist.cpaTrainRegist_apntcPopReadonlyT = function(){
	$('#cpaTrainPop_appInsttDetail').prop('readonly', true);
	$('#cpaTrainRegistApntcInfo_etcYn').prop('disabled', true);
	$('#cpaTrainPop_appInsttCdSearchBtn').prop('disabled', true);
	$('#cpaTrainPop_guideCpaSearchBtn').prop('disabled', true);
	$('#cpaTrainRegistApntcInfo_etc').prop('readonly', true);
	$('#cpaTrainPop_guideCpaNm').prop('readonly', true);
	$('#cpaTrainPop_remark').prop('readonly', true);
	$('#cpaTrainPop_apntcCl').prop('readonly', true);
}
cpaTrainRegist.cpaTrainRegist_apntcPopReadonlyF = function(){
	$('#cpaTrainPop_appInsttDetail').prop('readonly', false);
	$('#cpaTrainRegistApntcInfo_etcYn').prop('disabled', false);
	$('#cpaTrainPop_appInsttCdSearchBtn').prop('disabled', false);
	$('#cpaTrainPop_guideCpaSearchBtn').prop('disabled', false);
	$('#cpaTrainRegistApntcInfo_etc').prop('readonly', false);
	$('#cpaTrainPop_guideCpaNm').prop('readonly', false);
	$('#cpaTrainPop_remark').prop('readonly', false);
	$('#cpaTrainPop_apntcCl').prop('readonly', false);
}

cpaTrainRegist.cpaTrainRegist_apntcPopApntcClInit = function(apntcCl){
	$("#cpaTrainPop_apntcCl option").remove();
	$("#cpaTrainPop_apntcCl").selectpicker('refresh');

	if(apntcCl=='A1010020'){
		$("#cpaTrainPop_apntcCl").append(new Option('실무수습' ,'A1010020' , true , true));
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');
	}
	else if(apntcCl=='A1010050'){
		$("#cpaTrainPop_apntcCl").append(new Option('수습중지' ,'A1010050' , false , true));
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');
	}
	else if(apntcCl=='A1010040'){
		$("#cpaTrainPop_apntcCl").append(new Option('등록취소' ,'A1010040' , false , true));
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');
	}
	else if(apntcCl=='A1010070'){
		$("#cpaTrainPop_apntcCl").append(new Option('수습1차종료' ,'A1010070' , false , true));
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');
	}
	else if(apntcCl=='A1010030'){
		$("#cpaTrainPop_apntcCl").append(new Option('수습종료' ,'A1010030' , false , true));
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');
	}
	$("#cpaTrainPop_apntcCl").selectpicker('val',apntcCl);
}

cpaTrainRegist.cpaTrainRegist_addGridRow = function(tabFlag){

	var item = new Object();

	var cpaTrainRegist_SearchParam = {};
	cpaTrainRegist_SearchParam.pin = $('#cpaTrainRegistPin').val();
	cpaTrainRegist_SearchParam.appCpaNo = $('#cpaTrainRegistAppCpaNo').val();

	if(tabFlag=='apntcInfo'){

		cpaTrainRegist.cpaTrainRegist_apntcPopInit();

		fn_ajax_call("/kicpa/cpa/selectCpaTrainRegistApntcCpaInfoList.do", cpaTrainRegist_SearchParam, cpaTrainRegist.selectcpaTrainRegistApntcCpaInfoList_success, cpaTrainRegist.selectcpaTrainRegist_error);
		$('#cpaTrainRegistApntcInfo_modal').modal('show');

	}
	else if(tabFlag=='reportInfo'){
		AUIGrid.addRow(cpaTrainRegist.reportInfo_grid_wrap, item, "last");
	}
	else if(tabFlag=='resultInfo'){
		AUIGrid.addRow(cpaTrainRegist.resultInfo_grid_wrap, item, "last");
	}
}

cpaTrainRegist.cpaTrainRegist_removeGridRow = function(tabFlag){

	var item = new Object();

	if(tabFlag=='apntcInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaTrainRegist.apntcInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaTrainRegist.apntcInfo_grid_wrap);

		var apntcInfoRemovedRowItems = AUIGrid.getRemovedItems(cpaTrainRegist.apntcInfo_grid_wrap);	//삭제된 행

		var data = {};
		var cpaTrainApntcInfolList = [];

		for (var i = 0; i < apntcInfoRemovedRowItems.length; i++) {
			var item = apntcInfoRemovedRowItems[i];

			item.pin = $('#cpaTrainRegistPin').val();
			item.appCpaId = $('#cpaTrainRegistAppCpaNo').val();
			cpaTrainApntcInfolList.push(item);
		}

		data.list = JSON.stringify(cpaTrainApntcInfolList);

		fn_ajax_call("/kicpa/cpa/cpaTrainRegistApntcInfoDelete.do", data, cpaTrainRegist.selectCpaTrainRegistApntcInfoList, cpaTrainRegist.selectcpaTrainRegist_error);

	}
	else if(tabFlag=='reportInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaTrainRegist.reportInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaTrainRegist.reportInfo_grid_wrap);
	}
	else if(tabFlag=='resultInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaTrainRegist.resultInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaTrainRegist.resultInfo_grid_wrap);
	}
}

//수정 버튼 클릭
cpaTrainRegist.fn_cpaTrainAuditInfo_modify = function (event){
	var value = event.item;
	var registDe = value.registDe.substr(0,4)+"-"+value.registDe.substr(4,2)+"-"+value.registDe.substr(6,2);
	var rowIndex = event.rowIndex;

	if(rowIndex>0){
		rowIndex = rowIndex-1;
		$('#cpaTrainPop_registToDe').val(AUIGrid.getCellValue(cpaTrainRegist.apntcInfo_grid_wrap, rowIndex, "registDe"));
	}
	else{
		$('#cpaTrainPop_registToDe').val('19000101');
	}

	if(event.rowIndex+1 == $("#cpaPassApntcInfoList_TotalCnt").html()){
		$('#cpaTrainPop_registFromDe').val('99991231');
	}
	else{
		$('#cpaTrainPop_registFromDe').val(AUIGrid.getCellValue(cpaTrainRegist.apntcInfo_grid_wrap, event.rowIndex+1, "registDe"));
	}

	$( "#cpaTrainPop_appRegistDe" ).datepicker( "setDate", registDe );
	$('#cpaTrainPop_appInsttDetail').val(value.appInsttCdNm);
	$('#cpaTrainPop_appInsttCd').val(value.appInsttCd);
	$('#cpaTrainRegistApntcInfo_etc').val(value.appInsttEtc);
	$('#cpaTrainPop_guideCpaNm').val(value.guideCpaNm);
	$('#cpaTrainPop_guideCpaNo').val(value.guideCpaNo);
	$('#cpaTrainPop_remark').val(value.remark);
	$('#cpaTrainPop_deSaveFlag').val(value.deSaveFlag);
	$('#cpaTrainPop_deSaveFlag2').val(value.deSaveFlag2);



	cpaTrainRegist.cpaTrainRegist_apntcPopApntcClInit(value.apntcCl);
	cpaTrainRegist.cpaTrainRegist_apntcPopReadonlyT();

	if(value.appInsttEtcYn =="Y"){
		$("input:checkbox[id='cpaTrainRegistApntcInfo_etcYn']").prop("checked", true);
		$('#cpaTrainRegistApntcInfo_etc').attr('disabled',false);
	}
	else{
		$("input:checkbox[id='cpaTrainRegistApntcInfo_etcYn']").prop("checked", false);
		$('#cpaTrainRegistApntcInfo_etc').attr('disabled',true);
	}

	$("#cpaTrainPop_apntcSn").val(value.apntcSn);

	$('#cpaTrainRegistApntcInfo_modal').modal('show');
};

//실무수습기관 선택
cpaTrainRegist.fn_set_audit_search = function(item) {

	$('#cpaTrainPop_appInsttDetail').val(item.auditNm);
	$('#cpaTrainPop_appInsttCd').val(item.auditCd);

}

//지도공인회계사 선택
cpaTrainRegist.fn_set_train_search = function(item) {

	$('#cpaTrainPop_guideCpaNm').val(item.koreanNm);
	$('#cpaTrainPop_guideCpaNo').val(item.pin);

}

//이력정보 조회
cpaTrainRegist.selectCpaTrainRegistApntcInfoList = function() {
	var cpaTrainRegist_SearchParam = {};

	cpaTrainRegist_SearchParam.pin = $('#cpaTrainRegistPin').val();
	cpaTrainRegist_SearchParam.appCpaNo = $('#cpaTrainRegistAppCpaNo').val();

	fn_ajax_call("/kicpa/cpa/selectCpaTrainRegistApntcInfoList.do", cpaTrainRegist_SearchParam, cpaTrainRegist.selectCpaTrainRegistApntcInfoList_success, cpaTrainRegist.selectcpaTrainRegist_error);
}
//상황보고서 조회
cpaTrainRegist.selectCpaTrainRegistReportInfoList = function() {
	var cpaTrainRegist_SearchParam = {};

	cpaTrainRegist_SearchParam.appCpaId = $('#cpaTrainRegistAppCpaNo').val();

	fn_ajax_call("/kicpa/cpa/selectCpaTrainRegistReportInfoList.do", cpaTrainRegist_SearchParam, cpaTrainRegist.selectCpaTrainRegistReportInfoList_success, cpaTrainRegist.selectcpaTrainRegist_error);
}
//연수결과 조회
cpaTrainRegist.selectCpaTrainRegistResultInfoList = function() {
	var cpaTrainRegist_SearchParam = {};

	cpaTrainRegist_SearchParam.appCpaId = $('#cpaTrainRegistAppCpaNo').val();

	fn_ajax_call("/kicpa/cpa/selectCpaTrainRegistResultInfoList.do", cpaTrainRegist_SearchParam, cpaTrainRegist.selectCpaTrainRegistResultInfoList_success, cpaTrainRegist.selectcpaTrainRegist_error);
}

//이력정보 체크
cpaTrainRegist.fn_cpaTrainRegistApntcInfoValidation = function() {
	var toDd = $('#cpaTrainPop_registToDe').val();
	var fromDd = $('#cpaTrainPop_registFromDe').val();
	toDd = toDd.substr(0,4)+"-"+toDd.substr(4,2)+"-"+toDd.substr(6,2);
	fromDd = fromDd.substr(0,4)+"-"+fromDd.substr(4,2)+"-"+fromDd.substr(6,2);

	if($('#cpaTrainPop_appRegistDe').val() <= toDd || $('#cpaTrainPop_appRegistDe').val() >= fromDd){		//날짜 범위 확인
		alert(toDd+" ~ " +fromDd +" 날짜를 선택해주세요.");
		return false;
	}

	else if($('#cpaTrainPop_appRegistDe').val() =="" || $('#cpaTrainPop_appRegistDe').val() == null){		//날짜
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($("select[name=apntcCl]").val() =="" || $("select[name=apntcCl]").val() == null){			//실무수습구분
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($("select[name=apntcCl]").val() =="A1010020"){

		if($('#cpaTrainPop_appInsttCd').val() =="" || $('#cpaTrainPop_appInsttCd').val() == null){		//실무실습기관
			alert("필수항목을 모두 등록해주세요.");
			return false;
		}
		else if($('#cpaTrainPop_guideCpaNo').val() =="" || $('#cpaTrainPop_guideCpaNo').val() == null){		//지도공인회계사
			alert("필수항목을 모두 등록해주세요.");
			return false;
		}
		return true;
	}
	else{
		return true;
	}
}

//이력정보 저장
cpaTrainRegist.fn_cpaTrainRegistApntcInfoSave = function(result) {
	if(cpaTrainRegist.fn_cpaTrainRegistApntcInfoValidation()){
		if(confirm("저장/수정 하시겠습니까?")){

			var formData = $('#cpaTrainApntcPopForm').serialize();

			formData += "&pin="+$("#cpaTrainRegistPin").val();
			formData += "&appCpaNo="+$("#cpaTrainRegistAppCpaNo").val();

			$.ajax({
				url : "/kicpa/cpa/cpaTrainRegistApntcInfoSave.do",
				data : formData,
				method : "POST",
				dataType : "json",
				success : function(data) {
					$('#cpaTrainRegistApntcInfo_modal').modal('hide');

					$('#cpaTrainRegistAppCpaNo').val(data.appCpaNoSet);
					$('#cpaTrainRegist_tab2').removeClass("disabled");
					$('#cpaTrainRegist_tab3').removeClass("disabled");

					cpaTrainRegist.selectCpaTrainRegistApntcInfoList();
				},

				error : function(status, e) {
					alert("데이터 요청에 실패하였습니다.\r status : " + status);
				}
			});
		}
	}
}

//상황보고서 저장
cpaTrainRegist.fn_cpaTrainRegistReportInfoSave = function(result) {
	var reportInfoAddedRowItems = AUIGrid.getAddedRowItems(cpaTrainRegist.reportInfo_grid_wrap);	//추가된 행
	var reportInfoEditedRowItems = AUIGrid.getEditedRowItems(cpaTrainRegist.reportInfo_grid_wrap);	//수정된 행
	var reportInfoRemovedRowItems = AUIGrid.getRemovedItems(cpaTrainRegist.reportInfo_grid_wrap);	//삭제된 행

	var data = {};

	var cpaTrainReportInfolList = [];

	for (var i = 0; i < reportInfoRemovedRowItems.length; i++) {
		var item = reportInfoRemovedRowItems[i];
		item.saveMode = "D";
		item.pin = $('#cpaTrainRegistPin').val();
		item.appCpaId = $('#cpaTrainRegistAppCpaNo').val();
		cpaTrainReportInfolList.push(item);
	}
	for (var i = 0; i < reportInfoEditedRowItems.length; i++) {
		if(isNull(reportInfoEditedRowItems[i].brfYear) && isNull(reportInfoEditedRowItems[i].brfMt02) && isNull(reportInfoEditedRowItems[i].brfMt03)
			&& isNull(reportInfoEditedRowItems[i].brfMt04) && isNull(reportInfoEditedRowItems[i].brfMt05) && isNull(reportInfoEditedRowItems[i].brfMt06)
			&& isNull(reportInfoEditedRowItems[i].brfMt07) && isNull(reportInfoEditedRowItems[i].brfMt08) && isNull(reportInfoEditedRowItems[i].brfMt09)
			&& isNull(reportInfoEditedRowItems[i].brfMt10) && isNull(reportInfoEditedRowItems[i].brfMt11) && isNull(reportInfoEditedRowItems[i].brfMt12)){
			alert("항목 1개이상은 등록하세요.");
			return;
		}
		var item = reportInfoEditedRowItems[i];
		item.saveMode = "U";
		item.pin = $('#cpaTrainRegistPin').val();
		item.appCpaId = $('#cpaTrainRegistAppCpaNo').val();
		cpaTrainReportInfolList.push(item);
	}
	for (var i = 0; i < reportInfoAddedRowItems.length; i++) {
		if(isNull(reportInfoAddedRowItems[i].brfYear) && isNull(reportInfoAddedRowItems[i].brfMt02) && isNull(reportInfoAddedRowItems[i].brfMt03)
			&& isNull(reportInfoAddedRowItems[i].brfMt04) && isNull(reportInfoAddedRowItems[i].brfMt05) && isNull(reportInfoAddedRowItems[i].brfMt06)
			&& isNull(reportInfoAddedRowItems[i].brfMt07) && isNull(reportInfoAddedRowItems[i].brfMt08) && isNull(reportInfoAddedRowItems[i].brfMt09)
			&& isNull(reportInfoAddedRowItems[i].brfMt10) && isNull(reportInfoAddedRowItems[i].brfMt11) && isNull(reportInfoAddedRowItems[i].brfMt12)){
			alert("항목 1개이상은 등록하세요.");
			return;
		}
		var item = reportInfoAddedRowItems[i];
		item.saveMode = "I";
		item.pin = $('#cpaTrainRegistPin').val();
		item.appCpaId = $('#cpaTrainRegistAppCpaNo').val();
		cpaTrainReportInfolList.push(item);
	}

	data.list = JSON.stringify(cpaTrainReportInfolList);

	if(cpaTrainReportInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")){
		fn_ajax_call("/kicpa/cpa/cpaTrainRegistReportInfoSave.do", data, cpaTrainRegist.selectCpaTrainRegistReportInfoList, cpaTrainRegist.selectcpaTrainRegist_error);
	}
}

//연수결과 저장
cpaTrainRegist.fn_cpaTrainRegistResultInfoSave = function(result) {
	var resultInfoAddedRowItems = AUIGrid.getAddedRowItems(cpaTrainRegist.resultInfo_grid_wrap);	//추가된 행
	var resultInfoEditedRowItems = AUIGrid.getEditedRowItems(cpaTrainRegist.resultInfo_grid_wrap);	//수정된 행
	var resultInfoRemovedRowItems = AUIGrid.getRemovedItems(cpaTrainRegist.resultInfo_grid_wrap);	//삭제된 행

	var data = {};

	var cpaTrainResultInfolList = [];

	for (var i = 0; i < resultInfoRemovedRowItems.length; i++) {
		var item = resultInfoRemovedRowItems[i];
		item.saveMode = "D";
		cpaTrainResultInfolList.push(item);
	}
	for (var i = 0; i < resultInfoEditedRowItems.length; i++) {
		if(isNull(resultInfoEditedRowItems[i].trnOdr) || isNull(resultInfoEditedRowItems[i].complYn) || isNull(resultInfoEditedRowItems[i].psexamYn)
			|| isNull(resultInfoEditedRowItems[i].trnBgnDe) || isNull(resultInfoEditedRowItems[i].trnEndDe) || isNull(resultInfoEditedRowItems[i].trnTm)
			|| isNull(resultInfoEditedRowItems[i].atendTm) || isNull(resultInfoEditedRowItems[i].prcafsAbilityScore) || isNull(resultInfoEditedRowItems[i].vocEthicsScore)){
			alert("필수항목을 모두 등록해주세요.");
			return;
		}
		var item = resultInfoEditedRowItems[i];
		item.saveMode = "U";
		item.pin = $('#cpaTrainRegistPin').val();
		item.appCpaId = $('#cpaTrainRegistAppCpaNo').val();
		cpaTrainResultInfolList.push(item);
	}
	for (var i = 0; i < resultInfoAddedRowItems.length; i++) {
		if(isNull(resultInfoAddedRowItems[i].trnOdr) || isNull(resultInfoAddedRowItems[i].complYn) || isNull(resultInfoAddedRowItems[i].psexamYn)
			|| isNull(resultInfoAddedRowItems[i].trnBgnDe) || isNull(resultInfoAddedRowItems[i].trnEndDe) || isNull(resultInfoAddedRowItems[i].trnTm)
			|| isNull(resultInfoAddedRowItems[i].atendTm) || isNull(resultInfoAddedRowItems[i].prcafsAbilityScore) || isNull(resultInfoAddedRowItems[i].vocEthicsScore)){
			alert("필수항목을 모두 등록해주세요.");
			return;
		}
		var item = resultInfoAddedRowItems[i];
		item.saveMode = "I";
		item.pin = $('#cpaTrainRegistPin').val();
		item.appCpaId = $('#cpaTrainRegistAppCpaNo').val();
		cpaTrainResultInfolList.push(item);
	}

	data.list = JSON.stringify(cpaTrainResultInfolList);

	if(cpaTrainResultInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")){
		fn_ajax_call("/kicpa/cpa/cpaTrainRegistResultInfoSave.do", data, cpaTrainRegist.selectCpaTrainRegistResultInfoList, cpaTrainRegist.selectcpaTrainRegist_error);
	}
}

cpaTrainRegist.selectCpaTrainRegistApntcInfoList_success = function(result) {
	AUIGrid.setGridData(cpaTrainRegist.apntcInfo_grid_wrap, result.cpaTrainRegistApntcInfoList);
	$("#cpaPassApntcInfoList_TotalCnt").html(result.cpaTrainRegistApntcInfoListSize);
}

cpaTrainRegist.selectcpaTrainRegistApntcCpaInfoList_success  = function (result){

	cpaTrainRegist.cpaTrainRegist_apntcPopReadonlyF();

	var apntcCl;

	if(isNull(result.cpaTrainApntcInfoCpaList[0])){
		apntcCl ="";
	}else{
		apntcCl = result.cpaTrainApntcInfoCpaList[0].apntcCl;
	}

	if(isNull(result.cpaTrainApntcInfoCpaListSize) || result.cpaTrainApntcInfoCpaListSize == 0 || apntcCl == 'A1010050' || apntcCl == 'A1010070'){

		$("#cpaTrainPop_apntcCl").append(new Option('실무수습' ,'A1010020' , true , true));
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');

	}
	else{

		$("#cpaTrainPop_apntcCl").append(new Option('선택하기' ,'' , true , true));
		$("#cpaTrainPop_apntcCl").append(new Option('수습중지' ,'A1010050' , false , true));
		$("#cpaTrainPop_apntcCl").append(new Option('등록취소' ,'A1010040' , false , true));
		if(!isNull(result.cpaTrainApntcInfoCpaList[0].appEndDe) && isNull(result.cpaTrainApntcInfoCpaList[0].audEndDe)){
			$("#cpaTrainPop_apntcCl").append(new Option('수습종료' ,'A1010030' , false , true));
		}
		else{
			$("#cpaTrainPop_apntcCl").append(new Option('수습1차종료' ,'A1010070' , false , true));
		}

		$("#cpaTrainPop_apntcCl").selectpicker('val','');
		$("#cpaTrainPop_apntcCl").selectpicker('refresh');

		$('#cpaTrainPop_appInsttDetail').prop('readonly', true);
		$('#cpaTrainRegistApntcInfo_etcYn').prop('disabled', true);
		$('#cpaTrainPop_appInsttCdSearchBtn').prop('disabled', true);
		$('#cpaTrainPop_guideCpaSearchBtn').prop('disabled', true);
		$('#cpaTrainPop_guideCpaNm').prop('readonly', true);

	}

	if(isNull(result.cpaTrainApntcInfoCpaListSize) || result.cpaTrainApntcInfoCpaListSize == 0){
		$('#cpaTrainPop_registToDe').val('19000101');
		$('#cpaTrainPop_appRegistDePop').val('');
		$('#cpaTrainPop_appEndDePop').val('');
		$('#cpaTrainPop_audRegistDePop').val('');
	}
	else{
		$('#cpaTrainPop_registToDe').val(result.cpaTrainApntcInfoCpaList[0].lastRegistDe);
		$('#cpaTrainPop_appRegistDePop').val(result.cpaTrainApntcInfoCpaList[0].appRegistDe);
		$('#cpaTrainPop_appEndDePop').val(result.cpaTrainApntcInfoCpaList[0].appEndDe);
		$('#cpaTrainPop_audRegistDePop').val(result.cpaTrainApntcInfoCpaList[0].audRegistDe);
	}
	$('#cpaTrainPop_registFromDe').val('99991231');

}

cpaTrainRegist.selectCpaTrainRegistReportInfoList_success = function(result) {
	AUIGrid.setGridData(cpaTrainRegist.reportInfo_grid_wrap, result.cpaTrainRegistReportInfoList);
	$("#cpaPassReportInfoList_TotalCnt").html(result.cpaTrainRegistReportInfoListSize);
}

cpaTrainRegist.selectCpaTrainRegistResultInfoList_success = function(result) {
	AUIGrid.setGridData(cpaTrainRegist.resultInfo_grid_wrap, result.cpaTrainRegistResultInfoList);
	$("#cpaPassResultInfoList_TotalCnt").html(result.cpaTrainRegistResultInfoListSize);
}

cpaTrainRegist.selectCpaTrainRegist_success = function(result) {

}

cpaTrainRegist.selectcpaTrainRegist_error = function(xhr, status, error) {
	alert("실패");
}




