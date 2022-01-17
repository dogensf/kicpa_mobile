var commonDues = commonDues || {};


commonDues.fn_get_commonCode = function(nameSpace,grpcd,callback) {
    if(isNull(nameSpace) || isNull(nameSpace)) {
        return false;
    }

    $.ajax({
        type: 'POST',
        dataType:"json",
        url: '/getComnCode.do',
        cache : false,
        data: {grpCd:grpcd},
        success: function(data)
        {
            var arr_grp = String(grpcd).split(",");

            for(var i=0; i < arr_grp.length; i++) {
                nameSpace[arr_grp[i]] = data[arr_grp[i]];
            }

            if(typeof callback == "function") {
                callback(data);
            }
        },
        error : function(status, e) {
            // 로더 제거
            console.log("errror",e);
        }
    });
}