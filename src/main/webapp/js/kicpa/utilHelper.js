/**
 * @desc   : 유효한 주민번호인지 점검한다.
 * <pre>
 *           1. 주민번호 13자리중 12자리를 처음부터 A라고 하면 12자리
 *              까지만 다음식을 시행한다.
 *              Total = (A * 2) + (B * 3) + (C * 4) + (D * 5) + (E * 6)
 *                    + (F * 7) + (G * 8) + (H * 9) + (I * 2) + (J * 3)
 *                    + (K * 4) + (L * 5)
 *           2. Total을 11로 나눈 나머지를 취한다. --> X
 *           3. 나머지를 11에서 뺀 차를 취한다.    --> 11 - X = Y
 *           4. 차를 구한 값을 다시 10으로나눈 나머지를 취한다.
 *              --> Y % 10 = Z
 *           5. 1,2,3,4에서 구한 값이 주민번호 끝자리가 된다. --> 'Z'
 *           6. 'Z'와 끝자리수를 비교해서 틀리면 주민번호 오류.
 * </pre>
 * @param  : pResidnetNo - 구분자를 제외한 주민번호 13자리 문자열
 * @return : true/false
 * @---------------------------------------------------
 */
function isResidentNo(pResidnetNo)
{
    if(isNaN(pResidnetNo)) return false;

    if(pResidnetNo.length != 13) return false;

    var c = pResidnetNo.substr(6,1);
    if(c == '5' || c == '6') return true;

    last = pResidnetNo.substr(12,1);

    regNo = new Array(12); regNo[12] = 0;

    for(var i = 0; i < (regNo.length - 1); i++) {
        regNo[i] = eval(pResidnetNo.substr(i, 1)) * ((i % 8) + 2);
    }

    for(var i = 0; i < (regNo.length - 1); i++) {
        regNo[12] += regNo[i];
    }

    var result = ((11 - (regNo[12] % 11)) % 10);

    if(result == eval(last)) {
        return true;
    } else {
        //주민등록번호가 유효하지 않은 경우, 외국인 주민등록번호 체크 로직 수행
        return isForegnResidentNo(pResidnetNo);
    }
}

/**
 * @desc   : 현재일자를 기준으로 나이계산
 * @param  : pResidentNo - 중간 구분자를 제외한 주민번호 13자리
 * @param  : pDate - 기준이 되는 Date Object 일자 (default는 오늘 일자)
 * @param  : pPosition - 1세이하시 개월 계산
 * <pre>
 *
 *             함수 호출시 다음과 같은 두가지 형태로 사용한다.
 *
 *             1) getFullAge("1234567890123");         --> 오늘 일자를 기준으로 나이계산
 *             2) getFullAge("1234567890123", date);   --> parameter 값으로 넘겨받은 date를 기준으로 나이계산
 *
 * </pre>
 * @return : 숫자 (오류시 -1)
 * @---------------------------------------------------
 */
function getFullAge(pResidentNo, pDate, pPosition)
{
    if(isNaN(pResidentNo)) return -1;

    var pivotYY = "";
    var pivotMM = "";
    var pivotDD = "";
    var regYY = "";
    var regMM = "";
    var regDD = "";

    if(typeof(pDate) == "undefined" || pDate == "" || pDate == null) {
        var today = new Date();
        pivotYY = today.getYear();
        pivotMM = today.getMonth() + 1;
        pivotDD = today.getDate();
    } else {
        pivotYY = pDate.getYear();
        pivotMM = pDate.getMonth() + 1;
        pivotDD = pDate.getDate();
    }

    if(pResidentNo.length == 13 && isResidentNo(pResidentNo)){
        gender = pResidentNo.substr(6, 1);
        regYY = eval(pResidentNo.substr(0, 2));
        regMM = eval(pResidentNo.substr(2, 2));
        regDD = eval(pResidentNo.substr(4, 2));

        if(gender == '3' || gender == '4' || gender == '7' || gender == '8') {
            regYY += 2000;
        } else if(gender == '0' || gender == '9') {
            regYY += 1800;
        } else {
            regYY += 1900;
        }
    }else if(pResidentNo.length == 8 && isValidDateTime(pResidentNo, "YYYYMMDD")){
        regYY = eval(pResidentNo.substr(0, 4));
        regMM = eval(pResidentNo.substr(4, 2));
        regDD = eval(pResidentNo.substr(6, 2));
    }else{
        return -1;
    }

    var age = pivotYY - regYY;

    if(age > 0) {
        if(pivotMM == regMM) {
            if(pivotDD < regDD) {
                age -= 1;
            }
        } else if(pivotMM < regMM) {
            age -= 1;
        }
    }

    if ( pPosition == "M")
    {
        //12개월이하일때 계산
        if(age <= 0){
            if(pivotYY > regYY) {
                pivotMM += 12;
            }
            age = pivotMM - regMM ;
            if(pivotDD < regDD) {
                age -= 1;
            }
            age = "0."+age;
        }
    }

    return age;
}

/**
 * @desc   : 성별을 Return
 * @param  : pResidnetNo - 중간 구분자를 제외한 주민번호 13자리 혹은 주민번호 뒤 7자리 문자열
 * @return : M(ale)/F(emale) , 오류시 "" 반환
 * @---------------------------------------------------
 */
function getGender(pResidentNo)
{

    if(pResidentNo.length != 13 && pResidentNo.length != 7) return false;

    var rrns = 0;

    if(pResidentNo.length == 13) {
        rrns = eval(pResidentNo.substr(6, 1));
    } else {
        rrns = eval(pResidentNo.substr(0, 1));
    }

    return (rrns % 2) ? "M" : "F";
}

/**
 * @desc   : 유효한 사업자 등록번호인지 점검
 * @param  : pWorkNo - 구분자를 제외한 사업자 등록번호
 * @return : true/false
 * @---------------------------------------------------
 */
function isBusinessNo(pWorkNo)
{
    if(isNaN(pWorkNo)) return false;

    if(pWorkNo.length != 10) return false;

    var chkValue = new Array(1,3,7,1,3,7,1,3,5);
    var epNo = new Array(10);

    for(var i = 0; i < 10; i++) epNo[i] = eval(pWorkNo.substr(i, 1));
    for(var i = 0, sum = 0; i <  9; i++) sum += epNo[i] * chkValue[i];
    sum += ((epNo[8] * 5) / 10);

    var mod = sum % 10;
    var epNoChk = ((mod == 0) ? 0 : 10 - mod);

    return ((epNoChk == epNo[9]) ? true : false);
}

/**
 * @desc   : 메일이 올바른지 검사한다.
 * @param  : pEmail - eMail 주소
 * @return : true/false
 * @---------------------------------------------------
 */
function isEMail(pEmail)
{
    var email = pEmail.split("@");

    if(email.length != 2) return false;

    if(email[0].replace(/(^\s*)|(\s*$)/g, "").length == 0) return false;

    var domain = email[1].split(".");

    if(domain.length != 2 || domain.length != 3) return false;

    if(domain[0].replace(/(^\s*)|(\s*$)/g, "").length == 0) return false;
    if(domain[1].replace(/(^\s*)|(\s*$)/g, "").length == 0) return false;

    return true;
}

/**
 * @desc   : 올바른 DDD번호인지 점검 (필요할까?)
 * @param  : pDDD - DDD 번호 문자열 혹은 숫자
 * @return : true/false
 * @---------------------------------------------------
 */
function isTelephoneZoneNo(pDDD)
{
    //pDDD 숫자 점검 logic 필요

    var strDDD = pDDD + "";

    if( strDDD != "02" &&
        strDDD != "031" &&
        strDDD != "032" &&
        strDDD != "033" &&
        strDDD != "041" &&
        strDDD != "042" &&
        strDDD != "043" &&
        strDDD != "051" &&
        strDDD != "052" &&
        strDDD != "053" &&
        strDDD != "054" &&
        strDDD != "055" &&
        strDDD != "061" &&
        strDDD != "062" &&
        strDDD != "063" &&
        strDDD != "064" ) return false;

    return true;
}

/**
 * @desc   : 파일을 읽어 TextStream을 반환
 * @param  : pFilePath - 파일의 Full Path
 * @param  : pMode   - Optional. File 읽기,쓰기 Mode
 * @return : 파일의 TextStream
 * @deprecated : 사용하지 않음. - 필요시 요청할것.
 * @---------------------------------------------------

 var OpenFileForReading = 1 ;
 var OpenFileForWriting = 2 ;
 var OpenFileForAppending = 8 ;
 function getReadFile(pFilePath, pMode)
 {
     var fso = new ActiveXObject("Scripting.FileSystemObject");
     var TextStream;

     if (pMode == null) {
         TextStream = fso.OpenTextFile(pFilePath, OpenFileForReading);
     } else {
         TextStream = fso.OpenTextFile(pFilePath, pMode);
     }

     return TextStream;
 }
 */

/**
 * @desc   : 파일 Copy
 * @param  : srcFilePath
 * @param  : targetFilePath
 * @deprecated : 사용하지 않음. - 필요시 요청할것.
 * @---------------------------------------------------

 function getCopyFile(srcFilePath, targetFilePath)
 {
     var fso = new ActiveXObject("Scripting.FileSystemObject");
     var sLine;

     var File = fso.GetFile(srcFilePath)
     var TextStream = File.OpenAsTextStream(OpenFileForReading)
     var MyFile = fso.CreateTextFile(targetFilePath, true)

     while(!TextStream.AtEndOfStream)
     {
         sLine = TextStream.ReadLine() + "\r\n";
         MyFile.WriteLine(sLine);
     }
     TextStream.Close();
     MyFile.Close();
 }
 */

//바코드 폰트를 등록한다.
function installBarcodeFont(fontNm){
    // 2008.02.19 해당 ocx 변경. - 김기호
    //body.createChild("xforms:object", "id:obj_barcodefont; clsid:{ad1a9e73-cddd-4636-b4aa-f121453af3bb}; visibility:hidden; left:0px; top:0px; width:0px; height:0px; ");
    body.createChild("xforms:object", "id:LiveUtil; clsid:{7b1f53ab-6137-4773-88cc-53a46af2d289}; visibility:hidden; left:0px; top:0px; width:0px; height:0px;");
    if (fontNm == null || fontNm == "") {
        fontNm = "FREE3OF9.TTF";
    }

    LiveUtil.installFont(fontNm);
}

/**
 * @desc : 외국인 주민등록번호에 대한 검증을 수행
 */
function isForegnResidentNo(pResidnetNo) {
    var sum = 0;
    var odd = 0;

    buf = new Array(13);
    for (i = 0; i < 13; i++) {
        buf[i] = parseInt(pResidnetNo.charAt(i));
    }

    odd = buf[7]*10 + buf[8];

    //기관번호 검사, 기관번호를 2로 나눈 경우, 나머지 있는 경우, 주민등록번호 무효
    if (odd%2 != 0) {
        return false;
    }

    //등록자구분이 아래와 같지 않은 경우 오류
    // 6 : ??
    // 7 : 외국국적동포
    // 8 : 재외국인
    // 9 : 순수외국인
	/*
	 2012.6월 고시변경사항 - 신분구분자 삭제

	 if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) {
	 return false;
	 }
	 */

    //주민번호 13자리 중 12자리를 처음부터 12자리까지 배열값의 순서대로 곱한 후 합계를 낸다.
    //Total = (A * 2) + (B * 3) + (C * 4) + (D * 5) + (E * 6) + (F * 7)
    //      + (G * 8) + (H * 9) + (I * 2) + (J * 3) + (K * 4) + (L * 5)
    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for (i = 0, sum = 0; i < 12; i++) {
        sum += (buf[i] *= multipliers[i]);
    }

    sum=11-(sum%11);

    if (sum>=10) sum-=10;

    sum += 2;

    if (sum>=10) sum-=10;

    if ( sum != buf[12]) {
        return false;
    }
    else {
        return true;
    }
}

/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
	, test : function(sInput){
		var regBase64 = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
		return regBase64.test(sInput);
	}
}

function fDeepCloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(typeof(obj[i])=="object" && obj[i] != null)
            clone[i] = fDeepCloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}

function fDeepCloneArrayObject(obj) {
    var cloneArray = [];
    for(var i=0; i < obj.length; i++) {
        cloneArray.push(fDeepCloneObject(obj[i]));
    }
    return cloneArray;
}

function fn_AUIGrid_create(option) {

    if(typeof option === "object") {
        if(Array.prototype.isPrototypeOf(option)) {
            for(var i=0; i < option.length; i++) {
                fn_AUIGrid_create(option[i]);
            }
        }else {
            var obj = option["obj"];
            if(Array.prototype.isPrototypeOf(obj) && obj.length == 2 && typeof obj[0] === "object" && typeof obj[1] === "string") {
                if(AUIGrid.isCreated("#" + option["id"] )) {
                    AUIGrid.destroy("#" + option["id"]);
                    obj[0][obj[1]] = null;
                }

                var gridPros =  Object.assign({}
                    ,typeof option["prop"] === "object" ? option["prop"] : {}
                    ,typeof option["addprop"] === "object" ? option["addprop"] : {});

                obj[0][obj[1]] = AUIGrid.create("#" + option["id"], option["layout"], gridPros);
            }
        }
    }else {
        return false;
    }
}

function fn_AUIGrid_resize(option) {
    if(typeof option === "object") {
        if(Array.prototype.isPrototypeOf(option)) {
            for(var i=0; i < option.length; i++) {
                fn_AUIGrid_resize(option[i]);
            }
        }else {
            var obj = option["obj"];
            if (typeof obj !== "undefined") {
                if(typeof option["id"] === "string" && AUIGrid.isCreated("#" + option["id"])) {
                    AUIGrid.resize(obj);
                }
            }
        }
    }else {
        return false;
    }
}

function fn_AUIGrid_destory(option) {
    if(typeof option === "object") {
        if(Array.prototype.isPrototypeOf(option)) {
            for(var i=0; i < option.length; i++) {
                fn_AUIGrid_resize(option[i]);
            }
        }else {
            var obj = option["obj"];
            if (typeof obj !== "undefined") {
                if(typeof option["id"] !== "string" && AUIGrid.isCreated("#" + option["id"])) {
                    // 이미 생성되어 있는 경우
                    AUIGrid.destroy("#"+option["id"]);
                    option["obj"] = null;
                }
            }
        }
    }else {
        return false;
    }
}

// 출처: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
};