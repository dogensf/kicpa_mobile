var cpaPassRegist = cpaPassRegist || {}; // 발송대장 namespace

cpaPassRegist.houseInfo_grid_wrap = null;
cpaPassRegist.oficeInfo_grid_wrap = null;
cpaPassRegist.oficeAdresInfo_grid_wrap = null;
cpaPassRegist.acdmcrInfo_grid_wrap = null;
cpaPassRegist.rsumInfo_grid_wrap = null;


var myFileCaches = {};		//파일 저장 캐시
var recentGridItem = null;	// 최근 그리드 파일 선택 행 아이템 보관 변수

var schulClComboList = [{"code":"", "value":"선택하세요."}, {"code":"001", "value":"고등학교"}, {"code":"002", "value":"대학교"}, {"code":"003", "value":"대학원"}];
var degreeComboList = [{"code":"", "value":"선택하세요."}, {"code":"001", "value":"졸업"}, {"code":"002", "value":"석사"}, {"code":"003", "value":"학사"}, {"code":"004", "value":"박사"}];


$(window).resize(function(){
	try{
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
		fn_AUIGrid_resize([{id:"cpaPassHouseInfoList_grid_wrap",obj:cpaPassRegist.houseInfo_grid_wrap}
			,{id:"cpaPassOficeInfoList_grid_wrap",obj:cpaPassRegist.oficeInfo_grid_wrap}
			,{id:"cpaPassOficeAdresInfoList_grid_wrap",obj:cpaPassRegist.oficeAdresInfo_grid_wrap}
			,{id:"cpaPassAcdmcrInfoList_grid_wrap",obj:cpaPassRegist.acdmcrInfo_grid_wrap}
			,{id:"cpaPassRsumInfoList_grid_wrap",obj:cpaPassRegist.rsumInfo_grid_wrap}]);
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
	}catch(e){
	}
});

// 문서 시작 시
$(document).ready(
    function() {

		cpaPassRegist.fn_createAUIGrid(); // AUGRID 생성
        cpaPassRegist.fn_init(); // 화면 초기화
		cpaPassRegist.fn_init_events(); // 이벤트 등록

		// 탭이 열린후 grid resize
		$("a[data-toggle='tab']").on("shown.bs.tab", function(e) {
			$(window).resize();
		});
	});

cpaPassRegist.fn_init = function() {
	$("#cpaPassRegistPsexamYear").selectpicker({
		noneSelectedText:"전체"
	});

	$("#cpaPassRegistPassFlag").selectpicker({
		noneSelectedText:"전체"
	});

	if($('#cpaPassRegistPin').val()=="" || $('#cpaPassRegistPin').val()==null){
		$('#cpaPassRegist_tab2').addClass("disabled");
		$('#cpaPassRegist_tab3').addClass("disabled");
		$('#cpaPassRegist_tab4').addClass("disabled");
		$('#cpaPassRegist_tab5').addClass("disabled");
	}

	if($('#cpaPassRegistImgUrl').val() !="" && $('#cpaPassRegistImgUrl').val() != null){

		$('#cpaPssRegistImg').css({'background':'url()'});
		$('#cpaPssRegistImg').css({'background-size':'207px 220px'});
		$('#cpaPssRegistImg').css({'background-repeat':'no-repeat'});
	}


}


//AUIGrid 를 생성합니다.
cpaPassRegist.fn_createAUIGrid = function() {

	var houseInfo_columnLayout = [ {
		dataField : "inputCl",
		headerText : "등록구분",
		width : "10%"
	}, {
		dataField : "registDe",
		headerText : "등록일",
		width : "10%",
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
		dataField : "zipCd",
		headerText : "우편번호",
		width : "10%"
	}, {
		dataField : "rdAdres",
		headerText : "도로명주소",
		width : "37%"
	}, {
		dataField : "rdAdresDetail",
		headerText : "상세주소",
		width : "33%"
	},{
		dataField: "adres",
		headerText: "지번주소",
		visible: false
	},{
		dataField: "adresDetail",
		headerText: "지번상세주소",
		visible: false
	},{
		dataField: "legalCd",
		headerText: "법정동코드",
		visible: false
	},{
		dataField: "buldNm",
		headerText: "건물명",
		visible: false
	},{
		dataField: "buldNo",
		headerText: "건물번호",
		visible: false
	}];

	var OficeInfo_columnLayout = [ {
		dataField : "inputCl",
		headerText : "등록구분",
		width : "9%"
	}, {
		dataField : "opetrDe",
		headerText : "등록일",
		width : "13%",
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
		dataField : "oficeNm",
		headerText : "직장명",
		width : "16%"
	}, {
		dataField : "rspOfc",
		headerText : "직책",
		width : "8%"
	}, {
		dataField : "sectionNm",
		headerText : "부서(국/실)",
		width : "15%"
	}, {
		dataField : "deptNm",
		headerText : "하위부서(과)",
		width : "13%"
	}, {
		dataField : "ofcTelNo",
		headerText : "회사전화번호",
		width : "13%",
		editRenderer : {
			type : "InputEditRenderer",
			onlyNumeric : true, // 0~9만 입력가능
		}
	}, {
		dataField : "ofcFaxNo",
		headerText : "FAX",
		width : "13%",
		editRenderer : {
			type : "InputEditRenderer",
			onlyNumeric : true, // 0~9만 입력가능
		}
	}];

	var OficeAdresInfo_columnLayout = [ {
		dataField : "inputCl",
		headerText : "등록구분",
		width : "9%"
	}, {
		dataField : "registDe",
		headerText : "등록일",
		width : "15%",
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
		dataField : "zipCd",
		headerText : "우편번호",
		width : "12%"
	}, {
		dataField : "rdAdres",
		headerText : "도로명주소",
		width : "39%"
	}, {
		dataField : "rdAdresDetail",
		headerText : "상세주소",
		width : "25%"
	}, {
		dataField: "adres",
		headerText: "지번주소",
		visible: false
	},{
		dataField: "adresDetail",
		headerText: "지번상세주소",
		visible: false
	},{
		dataField: "legalCd",
		headerText: "법정동코드",
		visible: false
	},{
		dataField: "buldNm",
		headerText: "건물명",
		visible: false
	},{
		dataField: "buldNo",
		headerText: "건물번호",
		visible: false
	}];

	var acdmcrInfo_columnLayout = [ /*{
		dataField : "selectYn",
		headerText : "",
		width : "5%",
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : true, // true, false 인 경우가 기본
			unCheckValue : false,
			disabledFunction : function(rowIndex, columnIndex, value, isChecked, item, dataField) {
				if($("#cpaPassAcdmcrInfoList_TotalCnt").html() != "0" && rowIndex == 0)
					return true; // true 반환하면 disabled 시킴
				return false;
			}
		}
	} ,*/ {
		dataField : "grdtnYear",
		headerText : "졸업년도*",
		dataType : "date",
		dateInputFormat : "yyyy", // 실제 데이터의 형식 지정
		formatString : "yyyy", // 실제 데이터 형식을 어떻게 표시할지 지정
		width:"20%",
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
			}  // end of btOpts
		}
	}, {
		dataField : "schulNm",
		headerText : "학교명*",
		width : "20%"
	}, {
		dataField : "schulCl",
		headerText : "학력구분*",
		width : "20%",
		labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
			var retStr = value;
			for(var i=0,len=schulClComboList.length; i<len; i++) {
				if(schulClComboList[i]["code"] == value) {
					retStr = schulClComboList[i]["value"];
					break;
				}
			}
			return retStr;
		},
		editRenderer : {
			type : "DropDownListRenderer",
			list : schulClComboList, //key-value Object 로 구성된 리스트
			keyField : "code", // key 에 해당되는 필드명
			valueField : "value" // value 에 해당되는 필드명
		}
	}, {
		dataField : "degree",
		headerText : "학위*",
		width : "20%",
		labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) {
			var retStr = value;
			for(var i=0,len=degreeComboList.length; i<len; i++) {
				if(degreeComboList[i]["code"] == value) {
					retStr = degreeComboList[i]["value"];
					break;
				}
			}
			return retStr;
		},
		editRenderer : {
			type : "DropDownListRenderer",
			list : degreeComboList, //key-value Object 로 구성된 리스트
			keyField : "code", // key 에 해당되는 필드명
			valueField : "value" // value 에 해당되는 필드명
		}
	}, {
		dataField : "major",
		headerText : "전공*",
		width : "20%"
	},{
		dataField: "acdmcrSn",
		headerText: "순번",
		visible: false
	},{
		dataField: "pin",
		headerText: "개인식별번호",
		visible: false
	}];

	var rsumInfo_columnLayout = [ {
		dataField : "registDe",
		headerText : "등록일*",
		width : "30%",
		dataType : "date",
		dateInputFormat : "yyyy-mm-dd", // 실제 데이터의 형식 지정
		formatString : "yyyy-mm-dd", // 실제 데이터 형식을 어떻게 표시할지 지정
		editRenderer : {
			type : "BTCalendarRenderer",
			defaultFormat : "yyyy-mm-dd", // 달력 선택 시 데이터에 적용되는 날짜 형식
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
		dataField : "fileNm",
		headerText : "선택 파일명",
		width : "30%",
		styleFunction  : function (rowIndex, columnIndex, value, headerText, item, dataField) {
			if(typeof value == "undefined" || value == "") {
				return null;
			}
			return "my-file-selected";
		},
		labelFunction : function( rowIndex, columnIndex, value, headerText, item ) {
			if(typeof value == "undefined" || value == "") {
				return "선택 파일 없음";
			}
			return value;
		}
	}, {
		dataField : "fileUrl",
		headerText : "이력서 다운로드",
		width : "30%",
		style : "myLinkStyle",
		postfix : " 다운로드",
		renderer : { // HTML 템플릿 렌더러 사용
			type : "TemplateRenderer"
		},
		// dataField 로 정의된 필드 값이 HTML 이라면 labelFunction 으로 처리할 필요 없음.
		labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // HTML 템플릿 작성
			if(!value)	return "";
			var link = value; // 이동할 URL
			var template = '<div class="my_div">';
			template += '<a href="' + link + '" class="my_a_tag" target="_blank" title="' + link + '" download>';
			template += "다운로드";
			template += '</a></div>';
			return template; // HTML 템플릿 반환..그대도 innerHTML 속성값으로 처리됨
		}
	},{
		dataField : "rsumFile",
		headerText : "파일선택*",
		width : "10%",
		renderer : {
			type : "ButtonRenderer",
			labelText : "파일 선택",
			onclick : function(rowIndex, columnIndex, value, item) {
				cpaPassRegist.myButtonClick(item);
			},
			disabledFunction :  function(rowIndex, columnIndex, value, item, dataField ) {
				if($("#cpaPassRsumInfoList_TotalCnt").html() > rowIndex)
					return true; // true 반환하면 disabled 시킴
				return false;
			}
		}
	} ];

	// 그리드 속성 설정
	var gridPros_houseInfo = {
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
			if($("#cpaPassHouseInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		},
		rowCheckableFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassHouseInfoList_TotalCnt").html() > rowIndex) {
				return false;
			}
			return true;
		}
	};

	var gridPros_oficeInfo = {
		editable: true,                	// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
		showRowNumColumn: true,
		headerHeight: 40, 				//헤더의 높이를 지정합니다.
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 25,
		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassOficeInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		},
		rowCheckableFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassOficeInfoList_TotalCnt").html() > rowIndex) {
				return false;
			}
			return true;
		}
	};
	var gridPros_oficeAdresInfo = {
		editable: true,                	// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
		showRowNumColumn: true,
		headerHeight: 40, 				//헤더의 높이를 지정합니다.
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 25,
		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassOficeAdresInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		},
		rowCheckableFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassOficeAdresInfoList_TotalCnt").html() > rowIndex) {
				return false;
			}
			return true;
		}
	};

	var gridPros_acdmcrInfo = {
		editable: true,                		// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       	// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     	// 셀 선택모드 (기본값: singleCell)
		useContextMenu: true,           	// 컨텍스트 메뉴 사용 여부 (기본값 : false)
		enableFilter: false,             	// 필터 사용 여부 (기본값 : false)
		useGroupingPanel: false,        	// 그룹핑 패널 사용
		showStateColumn: false,         	// 상태 칼럼 사용
		displayTreeOpen: false,          	// 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
		showRowNumColumn: true,
		headerHeight: 40, 					//헤더의 높이를 지정합니다.
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		enableRowCheckShiftKey : false,		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 48,
		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassAcdmcrInfoList_TotalCnt").html() != "0" && rowIndex == 0)
				return false; // true 반환하면 disabled 시킴
			return true;
		}
	};

	var gridPros_rsumInfo = {
		editable: true,                	// 편집 가능 여부 (기본값 : false)
		enterKeyColumnBase: true,       // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enableRightDownFocus: true,
		selectionMode: "singleRow",     // 셀 선택모드 (기본값: singleCell)
		showRowNumColumn: true,
		headerHeight: 40, 				//헤더의 높이를 지정합니다.
		rowIdField : "id",
		enableSorting : false,
		showRowCheckColumn : true,			// 엑스트라 체크박스 표시 설정
		showRowAllCheckBox : false,			// 전체 체크박스 표시 설정
		rowCheckColumnWidth : 50,
		noDataMessage: "데이터가 없습니다.",
		groupingMessage: "여기에 칼럼을 드래그하면 그룹핑이 됩니다.",

		rowCheckDisabledFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassRsumInfoList_TotalCnt").html() > rowIndex)
				return false; // true 반환하면 disabled 시킴
			return true;
		},
		rowCheckableFunction : function(rowIndex, isChecked, item) {
			if($("#cpaPassRsumInfoList_TotalCnt").html() > rowIndex) {
				return false;
			}
			return true;
		}
	};



	fn_AUIGrid_create([{id:"cpaPassHouseInfoList_grid_wrap", obj:[cpaPassRegist,"houseInfo_grid_wrap"], layout:houseInfo_columnLayout , prop:gridPros_houseInfo}
		,{id:"cpaPassOficeInfoList_grid_wrap", obj: [cpaPassRegist,"oficeInfo_grid_wrap"], layout:OficeInfo_columnLayout, prop:gridPros_oficeInfo}
		,{id:"cpaPassOficeAdresInfoList_grid_wrap", obj: [cpaPassRegist,"oficeAdresInfo_grid_wrap"], layout:OficeAdresInfo_columnLayout, prop:gridPros_oficeAdresInfo}
		,{id:"cpaPassAcdmcrInfoList_grid_wrap", obj: [cpaPassRegist,"acdmcrInfo_grid_wrap"], layout:acdmcrInfo_columnLayout, prop:gridPros_acdmcrInfo}
		,{id:"cpaPassRsumInfoList_grid_wrap",obj: [cpaPassRegist,"rsumInfo_grid_wrap"],layout:rsumInfo_columnLayout,prop:gridPros_rsumInfo}
	]);

	/*AUIGrid.setColumnSizeList(cpaPassRegist.houseInfo_grid_wrap, [200, 250]);

	fn_AUIGrid_resize([{id:"cpaPassHouseInfoList_grid_wrap",obj:cpaPassRegist.houseInfo_grid_wrap}]);*/

}

cpaPassRegist.fn_init_events = function() {


	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(cpaPassRegist.houseInfo_grid_wrap, "cellEditBegin", function(event) {
		var rowIndex = $("#cpaPassHouseInfoList_TotalCnt").html();
		if(event.rowIndex < rowIndex){
			return false;
		}
		else{
			if(event.dataField == "zipCd" || event.dataField == "rdAdres") {

				var selectedItems = AUIGrid.getSelectedItems(cpaPassRegist.houseInfo_grid_wrap);
				var first = selectedItems[0];


				cpaPassRegist.goPopup_Adres(first.rowIndex,"houseInfo_grid_wrap");

				return false; // false 반환. 기본 행위인 편집 불가
			}

			if(event.dataField == "inputCl") {
				return false;
			}
		}
	});

	AUIGrid.bind(cpaPassRegist.oficeInfo_grid_wrap, "cellEditBegin", function(event) {
		var rowIndex = $("#cpaPassOficeInfoList_TotalCnt").html();
		if(event.rowIndex < rowIndex){
			return false;
		}
		else{

			if(event.dataField == "inputCl") {
				return false;
			}
		}

	});

	AUIGrid.bind(cpaPassRegist.oficeAdresInfo_grid_wrap, "cellEditBegin", function(event) {
		var rowIndex = $("#cpaPassOficeAdresInfoList_TotalCnt").html();
		if(event.rowIndex < rowIndex){
			return false;
		}
		else{
			if(event.dataField == "zipCd" || event.dataField == "rdAdres") {

				var selectedItems = AUIGrid.getSelectedItems(cpaPassRegist.oficeAdresInfo_grid_wrap);
				var first = selectedItems[0];


				cpaPassRegist.goPopup_Adres(first.rowIndex,"oficeAdresInfo_grid_wrap");

				return false; // false 반환. 기본 행위인 편집 불가
			}

			if(event.dataField == "inputCl") {
				return false;
			}
		}

	});

	AUIGrid.bind(cpaPassRegist.acdmcrInfo_grid_wrap, "cellEditBegin", function(event) {
		// Country 가 "Korea", "UK" 인 경우, Name, Product 수정 못하게 하기
		if(event.dataField == "schulCl" || event.dataField == "degree" || event.dataField == "major") {
			if(event.rowIndex == 0) {

				return false; // false 반환. 기본 행위인 편집 불가
			}
		}
	});

	AUIGrid.bind(cpaPassRegist.rsumInfo_grid_wrap, "cellEditBegin", function(event) {
		// Country 가 "Korea", "UK" 인 경우, Name, Product 수정 못하게 하기

		/*if(event.rowIndex != 0){
			var str = AUIGrid.getCellValue(cpaPassRegist.rsumInfo_grid_wrap, event.rowIndex - 1, "registDe");
			var str2 = AUIGrid.getCellValue(cpaPassRegist.rsumInfo_grid_wrap, event.rowIndex, "registDe");

			if(str>str2){
				alert();
				var item = { registDe : "" };
				AUIGrid.updateRow(cpaPassRegist.rsumInfo_grid_wrap, item, event.rowIndex);
			}
		}
		else{
			startDate = "";
		}*/

		var rowIndex = $("#cpaPassRsumInfoList_TotalCnt").html();
		if(event.rowIndex < rowIndex){
			return false;
		}
		else{
			if(event.dataField == "fileUrl" || event.dataField == "fileNm") {
				return false;
			}
		}

	});

	// 선택 이벤트 바인딩
	AUIGrid.bind(cpaPassRegist.rsumInfo_grid_wrap, "cellEditEnd", function (event) {
		recentGridItem = event.item;

		var file =myFileCaches[recentGridItem.id].file;
		myFileCaches[recentGridItem.id] = {
			file : file,
			registDe : recentGridItem.registDe
		};

	});

	// 탭 이동이 완료됐을 때 이벤트
	$("body").on("shown.bs.tab", "#cpaPassRegist_tab", function(e) {

		switch (e.target.id) {
			/*case "cpaPassRegist_tab1" : // 자택주소
				var oficeInfoCnt = $("#cpaPassOficeInfoList_TotalCnt").html();
				if(oficeInfoCnt > 0 ){

				}
				break;*/
			case "cpaPassRegist_tab2" : // 자택주소
				fn_AUIGrid_resize([{id:"cpaPassHouseInfoList_grid_wrap",obj:cpaPassRegist.houseInfo_grid_wrap}]);
				break;
			case "cpaPassRegist_tab3" : // 직장주소
				fn_AUIGrid_resize([{id:"cpaPassOficeInfoList_grid_wrap",obj:cpaPassRegist.oficeInfo_grid_wrap}]);
				fn_AUIGrid_resize([{id:"cpaPassOficeAdresInfoList_grid_wrap",obj:cpaPassRegist.oficeAdresInfo_grid_wrap}]);
				break;
			case "cpaPassRegist_tab4" : // 학력사항
				fn_AUIGrid_resize([{id:"cpaPassAcdmcrInfoList_grid_wrap",obj:cpaPassRegist.acdmcrInfo_grid_wrap}]);
				break;
			case "cpaPassRegist_tab5" : // 회원 이력서 관리
				fn_AUIGrid_resize([{id:"cpaPassRsumInfoList_grid_wrap",obj:cpaPassRegist.rsumInfo_grid_wrap}]);
				break;
		}
	});

	//합격자 기본정보 미등록시 다른 탭 선택 불가
	$('.nopointer').on('click',function(){
		alert("합격자 기본정보를 먼저\n저장하세요.");
		return;
	});

    //주민등록번호 보이기/숨기기
	$('.eyes').on('click',function(){
		$('.input.password').toggleClass('active');
		if( $('.input.password').hasClass('active') == true ){
			$(this).find('.fa-eye').attr('class',"fas fa-eye-slash").parents('.input').find('#cpaPassRegistRsgstNo').attr('type',"text"); // i 클래스 // 텍스트 보이기 i 클래스
		}
		else{ $(this).find('.fa-eye-slash').attr('class',"fas fa-eye").parents('.input').find('#cpaPassRegistRsgstNo').attr('type','password');
		}
	});

	//한글만 입력가능
	$("#cpaPassRegistKoreanNm").on("input",function(e) {
		var pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
		this.value = this.value.replace(pattern, '');
	});

    //사진등록
	$('#imageFileOpenInput').on("change", function (e){
		cpaPassRegist.fn_cpaPassMemRegistImgSave(e);
	});

    //저장 버튼 이벤트
    $("#cpaPassMemRegistSave").on("click",function(e) {

		if(cpaPassRegist.fn_cpaPassMemRegistValidation()){

			if(confirm("저장/수정 하시겠습니까?")){
				cpaPassRegist.fn_cpaPassMemRegistSave();
			}
		}
    });

	//자택주소 조회
	$("#cpaPassRegist_tab2").on("click",function(e) {
		cpaPassRegist.selectCpaPassRegistHouseInfoList();
	});
	//직장정보 조회
	$("#cpaPassRegist_tab3").on("click",function(e) {
		cpaPassRegist.selectCpaPassRegistOficeInfoList();
		cpaPassRegist.selectCpaPassRegistOficeAdresInfoList();
	});
	//학력사항 조회
	$("#cpaPassRegist_tab4").on("click",function(e) {

		cpaPassRegist.selectCpaPassRegistAcdmcrInfoList();

	});
	//회원이력서관리 조회
	$("#cpaPassRegist_tab5").on("click",function(e) {
		cpaPassRegist.selectCpaPassRegistRsumInfoList();
	});

	//주민등록번호 입력 이벤트
	$("#cpaPassRegistRsgstNo").keyup(function(e) {
		var cpaPassRegist_RsgstNo = $('#cpaPassRegistRsgstNo').val();
		var birth;
		var sex;

		if(cpaPassRegist_RsgstNo.length>=7){
			birth = cpaPassRegist_RsgstNo.substring(0,6);
			sex = cpaPassRegist_RsgstNo.substring(6,7);

			if(sex == "1" || sex =="2"){
				birth = "19"+ birth;
				birth = birth.substr(0, 4) + '-' + birth.substr(4, 2) + '-' + birth.substr(6, 2);
				$('#cpaPassRegistBrthdy').val(birth);
			}
			if(sex == "3" || sex =="4"){
				birth = "20"+ birth;
				birth = birth.substr(0, 4) + '-' + birth.substr(4, 2) + '-' + birth.substr(6, 2);
				$('#cpaPassRegistBrthdy').val(birth);
			}

			if(sex == "1" || sex =="3"){
				sex="남";
				$('#cpaPassRegistSex').val(sex);
			}
			if(sex == "2" || sex =="4"){
				sex="여";
				$('#cpaPassRegistSex').val(sex);
			}

		}else{
			$('#cpaPassRegistBrthdy').val('');
			$('#cpaPassRegistSex').val('');
		}

	});

	// 이력서 파일 선택하기
	$('#cpaPassRsumInfoList_file').on('change', function(evt) {
		var data = null;
		var file = evt.target.files[0];
		if (typeof file == "undefined") {
			alert("파일 선택 시 취소!!");

			delete myFileCaches[recentGridItem.id];

			AUIGrid.updateRowsById(cpaPassRegist.rsumInfo_grid_wrap, {
				id : recentGridItem.id,
				fileNm :  ""
			});
			return;
		}

		if(file.size > 2048000) {
			alert("개별 파일은 2MB 를 초과해선 안됩니다.");
			return;
		}

		// 서버로 보낼 파일 캐시에 보관
		myFileCaches[recentGridItem.id] = {
			file : file,
			registDe : recentGridItem.registDe
		};

		//alert("업로드 할 파일 선택 : \r\n" + file.name + "\r\n" + recentGridItem.id + "\r\n" + recentGridItem.registDe);

		// 선택 파일명 그리드에 출력 시킴
		AUIGrid.updateRowsById(cpaPassRegist.rsumInfo_grid_wrap, {
			id : recentGridItem.id,
			fileNm :  file.name
		});

		$(this).val("");
	});
}

cpaPassRegist.fn_cpaPassMemRegistImgSave = function(e) {
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);

	filesArr.forEach(function(f){
		if(!f.type.match("image.*")){
			alert("이미지 파일만  가능 합니다.")
			return;
		}

		sel_file = f;

		var reader = new FileReader();
		reader.onload = function(e){
			$('#cpaPssRegistImg').css({'background':'url('+e.target.result+')'});
			$('#cpaPssRegistImg').css({'background-size':'207px 220px'});
			$('#cpaPssRegistImg').css({'background-repeat':'no-repeat'});


		}

		$('#cpaPassRegistgetImg').hide();

		reader.readAsDataURL(f);
	});
}

cpaPassRegist.fn_cpaPassMemRegistValidation = function() {

	if($('#cpaPassRegistKoreanNm').val() =="" || $('#cpaPassRegistKoreanNm').val() == null){		//성명(한글)
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistRsgstNo').val() =="" || $('#cpaPassRegistRsgstNo').val() == null){			//주민등록번호
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistBrthdy').val() =="" || $('#cpaPassRegistBrthdy').val() == null){			//생년월일
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistSex').val() =="" || $('#cpaPassRegistSex').val() == null){					//성별
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistNlty').val() =="" || $('#cpaPassRegistNlty').val() == null){				//국적
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistPsexamYear').val() =="" || $('#cpaPassRegistPsexamYear').val() == null){	//합격연도
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistTestCl').val() =="" || $('#cpaPassRegistTestCl').val() == null){			//시험구분
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistPassEdycNo').val() =="" || $('#cpaPassRegistPassEdycNo').val() == null){	//합격증서번호
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistPassDe').val() =="" || $('#cpaPassRegistPassDe').val() == null){			//합격일
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistPassClNo').val() =="" || $('#cpaPassRegistPassClNo').val() == null){		//합격분류번호
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistPassFlag').val() =="" || $('#cpaPassRegistPassFlag').val() == null){		//합격구분
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistOrginCtlf').val() =="" || $('#cpaPassRegistOrginCtlf').val() == null){		//원자격국
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistMoblPhonNo').val() =="" || $('#cpaPassRegistMoblPhonNo').val() == null){	//원자격국
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if($('#cpaPassRegistMainEmail').val() =="" || $('#cpaPassRegistMainEmail').val() == null){		//원자격국
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if(!$('input:radio[name=emailSndngYn]').is(':checked')){								//메일수신여부
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if(!$('input:radio[name=smsSndngYn]').is(':checked')){									//문자수신여부
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else if(!$('input:radio[name=postSndngYn]').is(':checked')){									//우편물수령여부
		alert("필수항목을 모두 등록해주세요.");
		return false;
	}
	else{
		return true;
	}
}

cpaPassRegist.fn_cpaPassMemRegistSave = function(){

	var form = $('#cpaPassMemRegisterForm')[0];
	var formData = new FormData(form);

	$.ajax({
		cache : false,
		url : "/kicpa/cpa/cpaPassMemRegistSave.do",
		type : 'POST',
		enctype: 'multipart/form-data',
		data : formData,
		processData: false,
		contentType: false,
		success : function(data) {

			//alert("저장 완료");
			$('#cpaPassRegistPin').val(data.cpaPassUserPin);
			$('#cpaPassRegist_tab2').removeClass("disabled");
			$('#cpaPassRegist_tab3').removeClass("disabled");
			$('#cpaPassRegist_tab4').removeClass("disabled");
			$('#cpaPassRegist_tab5').removeClass("disabled");

		}, // success
		error : function(xhr, status) {
			alert(xhr + " : " + status);
		}
	}); // $.ajax */

}

cpaPassRegist.fn_cpaPassRegistHouseInfoSave = function(){

	var houseInfoAddedRowItems = AUIGrid.getAddedRowItems(cpaPassRegist.houseInfo_grid_wrap);	//추가된 행

	var data = {};

	var cpaPassHouseInfolList = [];

	for (var i = 0; i < houseInfoAddedRowItems.length; i++) {
		if(isNull(houseInfoAddedRowItems[i].registDe) && isNull(houseInfoAddedRowItems[i].zipCd) && isNull(houseInfoAddedRowItems[i].rdAdres) && isNull(houseInfoAddedRowItems[i].rdAdresDetail)){
			alert("항목 1개이상은 등록하세요.");
			return;
		}
		var item = houseInfoAddedRowItems[i];
		item.pin = $('#cpaPassRegistPin').val();
		cpaPassHouseInfolList.push(item);
	}

	data.list = JSON.stringify(cpaPassHouseInfolList);

	if(cpaPassHouseInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")){
		fn_ajax_call("/kicpa/cpa/cpaPassRegistHouseInfoSave.do", data, cpaPassRegist.selectCpaPassRegistHouseInfoList, cpaPassRegist.selectCpaPassRegist_error);
	}


}

cpaPassRegist.fn_cpaPassRegistOficeInfoSave = function(){

	var OficeInfoAddedRowItems = AUIGrid.getAddedRowItems(cpaPassRegist.oficeInfo_grid_wrap);	//추가된 행

	var data = {};

	var cpaPassOficeInfolList = [];

	for (var i = 0; i < OficeInfoAddedRowItems.length; i++) {
		if(isNull(OficeInfoAddedRowItems[i].oficeNm) && isNull(OficeInfoAddedRowItems[i].rspOfc) && isNull(OficeInfoAddedRowItems[i].sectionNm)
			&& isNull(OficeInfoAddedRowItems[i].deptNm) && isNull(OficeInfoAddedRowItems[i].ofcTelNo) && isNull(OficeInfoAddedRowItems[i].ofcFaxNo)){
			alert("항목 1개이상은 등록하세요.");
			return;
		}
		var item = OficeInfoAddedRowItems[i];
		item.pin = $('#cpaPassRegistPin').val();
		cpaPassOficeInfolList.push(item);
	}

	data.list = JSON.stringify(cpaPassOficeInfolList);

	if(cpaPassOficeInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")){
		fn_ajax_call("/kicpa/cpa/cpaPassRegistOficeInfoSave.do", data, cpaPassRegist.selectCpaPassRegistOficeInfoList, cpaPassRegist.selectCpaPassRegist_error);
	}

}

cpaPassRegist.fn_cpaPassRegistOficeAdresInfoSave = function(){

	var OficeAdresInfoAddedRowItems = AUIGrid.getAddedRowItems(cpaPassRegist.oficeAdresInfo_grid_wrap);	//추가된 행

	var data = {};

	var cpaPassOficeAdresInfolList = [];

	for (var i = 0; i < OficeAdresInfoAddedRowItems.length; i++) {
		if(isNull(OficeAdresInfoAddedRowItems[i].registDe) && isNull(OficeAdresInfoAddedRowItems[i].zipCd) && isNull(OficeAdresInfoAddedRowItems[i].rdAdres) && isNull(OficeAdresInfoAddedRowItems[i].rdAdresDetail)){
			alert("항목 1개이상은 등록하세요.");
			return;
		}
		var item = OficeAdresInfoAddedRowItems[i];
		item.pin = $('#cpaPassRegistPin').val();
		cpaPassOficeAdresInfolList.push(item);
	}

	data.list = JSON.stringify(cpaPassOficeAdresInfolList);

	if(cpaPassOficeAdresInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")){
		fn_ajax_call("/kicpa/cpa/cpaPassRegistOficeAdresInfoSave.do", data, cpaPassRegist.selectCpaPassRegistOficeAdresInfoList, cpaPassRegist.selectCpaPassRegist_error);
	}

}

cpaPassRegist.fn_cpaPassRegistAcdmcrInfoSave = function(){

	var acdmcrInfoAddedRowItems = AUIGrid.getAddedRowItems(cpaPassRegist.acdmcrInfo_grid_wrap);	//추가된 행
	var acdmcrInfoEditedRowItems = AUIGrid.getEditedRowItems(cpaPassRegist.acdmcrInfo_grid_wrap);	//수정된 행
	var acdmcrInfoRemovedRowItems = AUIGrid.getRemovedItems(cpaPassRegist.acdmcrInfo_grid_wrap);	//삭제된 행

	var data = {};

	var cpaPassAcdmcrInfolList = [];

	for (var i = 0; i < acdmcrInfoRemovedRowItems.length; i++) {
		var item = acdmcrInfoRemovedRowItems[i];
		item.saveMode = "D";
		cpaPassAcdmcrInfolList.push(item);
	}
	for (var i = 0; i < acdmcrInfoEditedRowItems.length; i++) {

		if(isNull(acdmcrInfoEditedRowItems[i].grdtnYear) || isNull(acdmcrInfoEditedRowItems[i].schulNm) || isNull(acdmcrInfoEditedRowItems[i].schulCl)
			|| isNull(acdmcrInfoEditedRowItems[i].degree) || isNull(acdmcrInfoEditedRowItems[i].major)){
			alert("필수항목을 모두 등록해주세요.");
			return;
		}
		var item = acdmcrInfoEditedRowItems[i];
		item.saveMode = "U";
		cpaPassAcdmcrInfolList.push(item);
	}
	for (var i = 0; i < acdmcrInfoAddedRowItems.length; i++) {
		if(acdmcrInfoAddedRowItems[i].schulCl=="001" && isNull(acdmcrInfoAddedRowItems[i].degree)){
			acdmcrInfoAddedRowItems[i].degree = "-";
		}
		if(isNull(acdmcrInfoAddedRowItems[i].grdtnYear) || isNull(acdmcrInfoAddedRowItems[i].schulNm) || isNull(acdmcrInfoAddedRowItems[i].schulCl)
			|| isNull(acdmcrInfoAddedRowItems[i].degree) || isNull(acdmcrInfoAddedRowItems[i].major)){
			alert("필수항목을 모두 등록해주세요.");
			return;
		}
		var item = acdmcrInfoAddedRowItems[i];
		item.saveMode = "I";
		item.pin = $('#cpaPassRegistPin').val();
		cpaPassAcdmcrInfolList.push(item);
	}

	data.list = JSON.stringify(cpaPassAcdmcrInfolList);

	if(cpaPassAcdmcrInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")){
		fn_ajax_call("/kicpa/cpa/cpaPassRegistAcdmcrInfoSave.do", data, cpaPassRegist.selectCpaPassRegistAcdmcrInfoList, cpaPassRegist.selectCpaPassRegist_error);
	}
}

cpaPassRegist.cpaPassRegist_addGridRow = function(tabFlag){

	var item = new Object();

	if(tabFlag=='houseInfo'){

		AUIGrid.addRow(cpaPassRegist.houseInfo_grid_wrap, item, "last");
	}
	else if(tabFlag=='oficeInfo'){

		AUIGrid.addRow(cpaPassRegist.oficeInfo_grid_wrap, item, "last");
	}
	else if(tabFlag=='oficeAdresInfo'){

		AUIGrid.addRow(cpaPassRegist.oficeAdresInfo_grid_wrap, item, "last");
	}
	else if(tabFlag=='acdmcrInfo'){

		var selectedItemsCnt = AUIGrid.getRowCount(cpaPassRegist.acdmcrInfo_grid_wrap);

		if(selectedItemsCnt <= 0){
			item.schulCl = "001";
			item.degree = "001";
			item.major = "-";
		}
		else{
			item.schulCl = "";
			item.degree = "";
		}

		AUIGrid.addRow(cpaPassRegist.acdmcrInfo_grid_wrap, item, "last");
	}


	else if(tabFlag=='rsumInfo'){


		AUIGrid.addRow(cpaPassRegist.rsumInfo_grid_wrap, item, "last");
	}

}

cpaPassRegist.cpaPassRegist_removeGridRow = function(tabFlag){

	var item = new Object();

	if(tabFlag=='houseInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaPassRegist.houseInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaPassRegist.houseInfo_grid_wrap);
	}
	else if(tabFlag=='oficeInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaPassRegist.oficeInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaPassRegist.oficeInfo_grid_wrap);
	}
	else if(tabFlag=='oficeAdresInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaPassRegist.oficeAdresInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaPassRegist.oficeAdresInfo_grid_wrap);
	}
	else if(tabFlag=='acdmcrInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaPassRegist.acdmcrInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaPassRegist.acdmcrInfo_grid_wrap);

	}
	else if(tabFlag=='rsumInfo'){

		var checkedItems = AUIGrid.getCheckedRowItems(cpaPassRegist.rsumInfo_grid_wrap);
		if(checkedItems.length <= 0) {
			alert("체크박스를 선택하세요.");
			return;
		}

		AUIGrid.removeCheckedRows(cpaPassRegist.rsumInfo_grid_wrap);
	}

}

cpaPassRegist.selectCpaPassRegistHouseInfoList = function(result) {
	var cpaPassRegist_SearchParam = {};

	cpaPassRegist_SearchParam.pin = $('#cpaPassRegistPin').val();

	fn_ajax_call("/kicpa/cpa/selectCpaPassRegistHouseInfoList.do", cpaPassRegist_SearchParam, cpaPassRegist.selectCpaPassRegistHouseInfoList_success, cpaPassRegist.selectCpaPassRegist_error);
}

cpaPassRegist.selectCpaPassRegistOficeInfoList = function(result) {
	var cpaPassRegist_SearchParam = {};

	cpaPassRegist_SearchParam.pin = $('#cpaPassRegistPin').val();

	fn_ajax_call("/kicpa/cpa/selectCpaPassRegistOficeInfoList.do", cpaPassRegist_SearchParam, cpaPassRegist.selectCpaPassRegistOficeInfoList_success, cpaPassRegist.selectCpaPassRegist_error);
}

cpaPassRegist.selectCpaPassRegistOficeAdresInfoList = function(result) {
	var cpaPassRegist_SearchParam = {};

	cpaPassRegist_SearchParam.pin = $('#cpaPassRegistPin').val();

	fn_ajax_call("/kicpa/cpa/selectCpaPassRegistOficeAdresInfoList.do", cpaPassRegist_SearchParam, cpaPassRegist.selectCpaPassRegistOficeAdresInfoList_success, cpaPassRegist.selectCpaPassRegist_error);
}

cpaPassRegist.selectCpaPassRegistAcdmcrInfoList = function(result) {
	var cpaPassRegist_SearchParam = {};

	cpaPassRegist_SearchParam.pin = $('#cpaPassRegistPin').val();

	fn_ajax_call("/kicpa/cpa/selectCpaPassRegistAcdmcrInfoList.do", cpaPassRegist_SearchParam, cpaPassRegist.selectCpaPassRegistAcdmcrInfoList_success, cpaPassRegist.selectCpaPassRegist_error);
}

cpaPassRegist.selectCpaPassRegistRsumInfoList = function(result) {
	var cpaPassRegist_SearchParam = {};

	cpaPassRegist_SearchParam.pin = $('#cpaPassRegistPin').val();

	fn_ajax_call("/kicpa/cpa/selectCpaPassRegistRsumInfoList.do", cpaPassRegist_SearchParam, cpaPassRegist.selectCpaPassRegistRsumInfoList_success, cpaPassRegist.selectCpaPassRegist_error);
}

cpaPassRegist.goPopup_Adres = function(rowIndex,gridId){
//경로는 시스템에 맞게 수정하여 사용
//호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrLinkUrl.do)를
//호출하게 됩니다.
	var pop = window.open("/kicpa/cpa/cpaPassAdresPop.do?rowIndex="+rowIndex+"&gridId="+gridId,"pop","width=570,height=420, scrollbars=yes, resizable=yes");
//** 2017년 5월 모바일용 팝업 API 기능 추가제공 **/
// 모바일 웹인 경우, 호출된 페이지(jusopopup.jsp)에서
// 실제 주소검색 URL(https://www.juso.go.kr/addrlink/addrMobileLinkUrl.do)를 호출하게 됩니다.
// var pop = window.open("/popup/jusoPopup.jsp","pop","scrollbars=yes, resizable=yes");
}

function cpaPassAdresCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd,
					   rnMgtSn, bdMgtSn , detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm,
					   buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo, rowIndex, gridId){

	if(gridId == "houseInfo_grid_wrap"){
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"zipCd",zipNo);						//우편번호
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"adres",jibunAddr);					//지번주소
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"adresDetail",addrDetail);			//지번주소상세
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"rdAdres",roadFullAddr);			//도로명주소
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"rdAdresDetail",addrDetail);		//도로명상세
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"legalCd",admCd);					//법정동코드
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"buldNm",bdNm);						//건물명
		AUIGrid.setCellValue(cpaPassRegist.houseInfo_grid_wrap,rowIndex,"buldNo",bdMgtSn);					//건물번호
	}

	else if(gridId == "oficeAdresInfo_grid_wrap"){
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"zipCd",zipNo);					//우편번호
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"adres",jibunAddr);				//지번주소
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"adresDetail",addrDetail);			//지번주소상세
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"rdAdres",roadFullAddr);			//도로명주소
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"rdAdresDetail",addrDetail);		//도로명상세
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"legalCd",admCd);					//법정동코드
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"buldNm",bdNm);					//건물명
		AUIGrid.setCellValue(cpaPassRegist.oficeAdresInfo_grid_wrap,rowIndex,"buldNo",bdMgtSn);					//건물번호
	}
}

//그리드의 셀 버턴 클릭 처리
cpaPassRegist.myButtonClick = function(item){
	recentGridItem = item; // 그리드의 클릭한 행 아이템 보관
	var input = $("#cpaPassRsumInfoList_file");
	input.trigger('click'); // 파일 브라우저 열기
}

//선택한 파일 서버로 전송
cpaPassRegist.cpaPassRegistRsumInfoSave = function() {

	var RsumInfoAddRowItems = AUIGrid.getAddedRowItems(cpaPassRegist.rsumInfo_grid_wrap);	//추가된 행

	var data = {};

	var cpaPassRsumInfolList = [];

	for (var i = 0; i < RsumInfoAddRowItems.length; i++) {
		if(isNull(RsumInfoAddRowItems[i].registDe) || isNull(RsumInfoAddRowItems[i].fileNm)){
			alert("필수항목을 모두 등록해주세요.");
			return;
		}
		var item = RsumInfoAddRowItems[i];
		item.pin = $('#cpaPassRegistPin').val();
		cpaPassRsumInfolList.push(item);
	}

	data.list = JSON.stringify(cpaPassRsumInfolList);

	if(cpaPassRsumInfolList.length<1){
		alert("저장/수정할 데이터가 없습니다.");
		return;
	}

	var noFile = true;

	// jQuery Ajax Form 사용
	var formData = new FormData();

	$.each(myFileCaches, function(n, v) {
		var name = "files_"+n;
		//	formData.append("ids[]", n); // 추가 정보들
		//	formData.append("names[]", v.name); // 추가 정보들
		//	formData.append("countries[]", v.country); // 추가 정보들
		formData.append(name, v.file);
		formData.append("registDe", v.registDe);
		noFile = false;
	});

	formData.append("pin", $('#cpaPassRegistPin').val());
	formData.append("psexamYear", $('#cpaPassRegistPsexamYear').val());

	if(noFile) {
		alert("서버로 전송할 파일이 없습니다. 먼저 선택하십시오.!!");
		return;
	}

	if(confirm("저장/수정 하시겠습니까?")) {
		$.ajax({
			url: '/kicpa/cpa/cpaPassRegistRsumInfoSave.do',
			processData: false,
			contentType: false,
			data: formData,
			cache: false,
			dataType: 'json',
			type: 'POST',
			success: function () {
				cpaPassRegist.selectCpaPassRegistRsumInfoList();
				myFileCaches = {};
			}
		});
	}
};

cpaPassRegist.selectCpaPassRegistHouseInfoList_success = function(result) {
	AUIGrid.setGridData(cpaPassRegist.houseInfo_grid_wrap, result.cpaPassRegistHouseInfoList);
	$("#cpaPassHouseInfoList_TotalCnt").html(result.cpaPassRegistHouseInfoListSize);
}

cpaPassRegist.selectCpaPassRegistOficeInfoList_success = function(result) {
	AUIGrid.setGridData(cpaPassRegist.oficeInfo_grid_wrap, result.cpaPassRegistOficeInfoList);
	$("#cpaPassOficeInfoList_TotalCnt").html(result.cpaPassRegistOficeInfoListSize);
}

cpaPassRegist.selectCpaPassRegistOficeAdresInfoList_success = function(result) {
	AUIGrid.setGridData(cpaPassRegist.oficeAdresInfo_grid_wrap, result.cpaPassRegistOficeAdresInfoList);
	$("#cpaPassOficeAdresInfoList_TotalCnt").html(result.cpaPassRegistOficeAdresInfoListSize);
}

cpaPassRegist.selectCpaPassRegistAcdmcrInfoList_success = function(result) {
	AUIGrid.setGridData(cpaPassRegist.acdmcrInfo_grid_wrap, result.cpaPassRegistAcdmcrInfoList);
	$("#cpaPassAcdmcrInfoList_TotalCnt").html(result.cpaPassRegistAcdmcrInfoListSize);
}

cpaPassRegist.selectCpaPassRegistRsumInfoList_success = function(result) {
	AUIGrid.setGridData(cpaPassRegist.rsumInfo_grid_wrap, result.cpaPassRegistRsumInfoList);
	$("#cpaPassRsumInfoList_TotalCnt").html(result.cpaPassRegistRsumInfoListSize);
}

/*cpaPassRegist.selectCpaPassRegistAcdmcrInfoSave_success = function(result) {
	cpaPassRegist.selectCpaPassRegistAcdmcrInfoList();
}*/

cpaPassRegist.selectCpaPassRegist_error = function(xhr, status, error) {
	alert("실패");
}




