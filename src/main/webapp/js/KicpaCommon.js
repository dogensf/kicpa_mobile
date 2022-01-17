/****************************************************************
 * 
 * 파일명 : KicpaCommon.js
 * 설  명 : KICPA 공통 기능 사용 JavaScript
 * 
 *    수정일           수정자        Version        Function 명
 * ------------    ---------   -------------  ----------------------------
 * 2021.09.01       KIK         1.0             최초생성
 * 
 * 
 * **************************************************************/

function fn_trim(str) {
    if (str == null) {
        return '';
    }
    var count = str.length;
    var len = count;
    var st = 0;

    while ((st < len) && (str.charAt(st) <= ' ')) {
        st++;
    }
    
    while ((st < len) && (str.charAt(len - 1) <= ' ')) {
        len--;
    }
    
    return ((st > 0) || (len < count)) ? str.substring(st, len) : str;
}

/*
 * fn_ajax_call(CONTEXTPATH + '/popup/area-list', param, searhFn);
 */
function fn_ajax_call(href, param, sfn, efn) {
	$.ajax({
		contentType: 'application/json',
		url: href,
		data: JSON.stringify(param),
		type: 'POST',
		dataType: 'json',
		async: false,
		timeout: 10000,
		beforeSend: function() {
			$('body').prepend('<div id="PG_OVERLAY" onclick="fn_PG_OVERLAY_remove();"></div>');
		},
		complete: function() {
			$('#PG_OVERLAY').remove();
		},
		success: function(result) {
			if (sfn !== undefined || typeof sfn !== 'undefined') sfn(result);
		},
		error: function(xhr, status, error) {
			//if(xhr.status == 401) location.reload();
			if (efn !== undefined || typeof efn !== 'undefined' ||  efn !== '') efn(xhr, status, error);
		}
	});
};


/**
 * fn_ajax_Apicall(currentMenu, '/order/deliveryMethod', param, orderConfirmDeliveryList, setOrderProgError);
 * @param id
 * @param href
 * @param param
 * @param sfn
 * @param efn
 * @returns
 */
function fn_ajax_Apicall(id, href, param, sfn, efn) {
	$.ajax({
		contentType: 'application/json',
		url: href,
		data: JSON.stringify(param),
		type: 'POST',
		dataType: 'json',
		async: false,
		timeout: 10000,
		beforeSend : function(xhr){

		},
		/*beforeSend: function() {
			$('body').prepend('<div id="PG_OVERLAY" onclick="fn_PG_OVERLAY_remove();"></div>');
		},*/
		complete: function() {
			//$('#PG_OVERLAY').remove();
		},
		success: function(result) {
			if (sfn !== undefined || typeof sfn !== 'undefined') {
				if(result.resultData){
					if(result.resultData.code != 'undefined' && result.resultData.code =='500'){
						alert("오류가 발생했습니다. 관리자에게 문의 바랍니다.")
					}
				}

        	    if(id == ''){
                    sfn(result);
                }else{
        	    	if(result.resultCd == '90'){
						orderCancelMenu(id,result);
					}else if(result.resultCd == '400' || result.code =='50011'){
                        efn(id,result);
                    }else if(result.resultCd == '401'){
						orderCancelCompleteErrorDelivery(id,result);
					}else if(result.orderNo == '0'){
						orderCancelMenu(id,result);
					}else{
                        sfn(id,result);

                    }

                }

            }
		},
		error: function(xhr, status, error) {
			alert("오류가 발생했습니다. 관리자에게 문의 바랍니다.")
			//if(xhr.status == 401) location.reload();
			if (efn !== undefined || typeof efn !== 'undefined' ||  efn !== '') efn(xhr, status, error);
		}
	});
};



function fn_call_popup(href, container, fnm, param, popFn, args, returnType, div, type) {
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: href,
		data: param,
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
			$('body').prepend('<div id="PG_OVERLAY" onclick="fn_PG_OVERLAY_remove(\'' + div + '\', \'' + type + '\');"></div>');
			fn_overlay_scroll_set();
			$(document).scroll();
        },
        complete: function() {
			//nothing
        },
        success: function(html) {
        	var append = function() {
        		var deferred = $.Deferred();
        		try {
        			$(container).empty();
            		$(container).append(html);
            		deferred.resolve();
        		} catch(err) {
        			deferred.reject(err);
        		}
        		return deferred.promise();
        	};
        	append().done(function() {
        		eval('fn_' + fnm)(popFn, args, returnType);
		    });
        },
        error: function(xhr, status, error) {
			//if(xhr.status == 401) location.reload();
        },
        fail: function() {

        }
	});
};


/*
 * fn_ajax_form_call(CONTEXTPATH + '/store/save', formData, function(result){

		if(result.resultCd == 'S'){
			$('#PG_HEADER_FRM_SHOP_NO').val(result.resultData);
			$('#PG_HEADER_FRM').attr('action', CONTEXTPATH + '/store/join').submit();
		} else {
			alert('저장중에러');
		}

	});
 * 
 */

function fn_ajax_form_call(href, param, sfn) {
	$.ajaxSettings.traditional = true;
	$.ajax({
		url: href,
		type: 'POST',
		data: param,
		enctype: 'multipart/form-data',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		async: false,
		timeout: 10000,
		beforeSend: function() {
			//$('body').prepend('<div id="PG_OVERLAY" onclick="fn_PG_OVERLAY_remove();"></div>');
		},
		complete: function() {
			//$('#PG_OVERLAY').remove();
		},
		success: function(result) {
			if (sfn !== undefined || typeof sfn !== 'undefined') sfn(result);
		},
		error: function(xhr, status, error) {
			//if(xhr.status == 401) location.reload();
			//itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
		},
		fail: function() {
			//itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
		}
	});
};

function fn_load_html(href, container, param, fn, args) {
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: href,
		data: param,
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	$('body').prepend('<div id="PG_OVERLAY" onclick="fn_PG_OVERLAY_remove();"></div>');
        },
        complete: function() {
        	$('#PG_OVERLAY').remove();
        },
        success: function(html) {
        	var append = function() {
        		var deferred = $.Deferred();
        		try {
        			$(container).empty();
            		$(container).append(html);
            		deferred.resolve();
        		} catch(err) {
        			deferred.reject(err);
        		}
        		return deferred.promise();
        	};
        	append().done(function() {
    			if (fn !== undefined || typeof fn !== 'undefined') {
    				fn.callBack(args);
    			}
		    });
        },
        error: function(xhr, status, error) {
			if(xhr.status == 401) location.reload();
        },
        fail: function() {

        }
	});
};

$.fn.serializeObject = function() {

    var result = {}
    var extend = function(i, element) {
        var node = result[element.name]
        if ("undefined" !== typeof node && node !== null) {
            if ($.isArray(node)) {
                node.push(element.value)
            } else {
                result[element.name] = [node, element.value]
            }
        } else {
            result[element.name] = element.value
        }
    }

    $.each(this.serializeArray(), extend)
    return result
}

$.datepicker.setDefaults({ closeText: "닫기", currentText: "오늘", prevText: '이전 달', nextText: '다음 달', monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], dayNames: ['일', '월', '화', '수', '목', '금', '토'], dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'], dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], weekHeader: "주", yearSuffix: '년' });
