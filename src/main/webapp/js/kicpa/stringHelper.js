String.prototype.setReplaceWord			= setReplaceWord;
String.prototype.getByteLength			= getByteLength;
String.prototype.getTrim				= getTrim;
String.prototype.isByteSize				= isByteSize;
String.prototype.getTrimLeft			= getTrimLeft;
String.prototype.getTrimRight			= getTrimRight;
String.prototype.getLeftPad				= getLeftPad;
String.prototype.getRightPad			= getRightPad;
String.prototype.getCarrigeReturnRemove = getCarrigeReturnRemove;
String.prototype.getCarrigeReturnReplace = getCarrigeReturnReplace;
String.prototype.getByteString                   = getByteString;


/**
 * @---------------------------------------------------
 * @desc   : 값이 없는지 체크
 * @param  : 체크할 문자열
 * @return : true or false
 * @---------------------------------------------------
 */
function isNull(str){
    return ((str == null || str == "" || str == "undefined") ? true:false);
}

function isNull2(str){
    return  ((str == null || str === "" || str == "undefined") ? true:false);
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열중의 특정 문자 또는 단어를 찾아 원하는 문자 또는 단어로 치환
 * <pre>
 *				1. 찾을 단어를 구분자로 분리한 문자열을 저장할 배열 변수지정
 *				2. 치환하여 리턴할 내용을 담을 변수 지정
 *				3. 원본 문자열을 찾을 단어를 구분자로 분리
 *				4. 찾을 단어의 수만큼 loop
 *					- 찾을 단어 대신 대체 단어를 붙이면서 누적
 *				3. 마지막 찾을 단어의 뒷부분 내용 추가.
 *					- 찾을 단어가 없었다면 원본 문자열 전체가 됨
 * </pre>
 * @param  : findWord    - 찾을 단어
 * @param  : replaceWord - 대체 단어
 * @return : rtnSting - 대체하고난 문자열
 * @---------------------------------------------------
 */
function setReplaceWord( findWord, replaceWord )
{
    var tempArray;
    var rtnSting = "";

    tempArray = this.split(findWord);

    for(var i=0; i < tempArray.length-1; i++)
    {
        rtnSting += tempArray[i] + replaceWord;
    }

    rtnSting += tempArray[tempArray.length-1];

    return rtnSting;
}

/**
 * @---------------------------------------------------
 * @desc   : 파라미터 값의 Byte 크기를 리턴
 * @param  : N/A
 * @return : 파라미터 값의 Byte 크기
 * @---------------------------------------------------
 */
function getByteLength()
{
    // Byte 수를 저장할 변수
    var rtnValue = 0;

    // Value 값의 길이만큼 loop
    for(var i=0; i < this.length; i++)
    {
        //한글이 들어오면 255보다 크다
        (this.charCodeAt(i) > 255) ? rtnValue += 2 : rtnValue += 1;
    }

    return rtnValue;
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열의 Byte 크기가 제한값을 벗어나는지 체크 (벗어나면 false 리턴)
 * @param  : pSize - 제한크기
 * @return : TRUE or FALSE
 * @---------------------------------------------------
 */
function isByteSize(pSize)
{
    return (this.getByteLength() <= eval(pSize) ? true : false);
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열을 원하는 바이트 크기로 만든다
 * @param  : strValue         : 문자열
 * @param  : pMakeByteSize    : 만들고자 하는 바이트수
 * @param  : pByteSize        : 문자열의 바이트수
 * @---------------------------------------------------
 */
function getStringAsByte(strValue, pMakeByteSize, pByteSize)
{
    var rtnValue = strValue;
    var sSpace = "";
    if (pByteSize > pMakeByteSize) return strValue;

    for( var iCnt = 1; iCnt <= pMakeByteSize-pByteSize; iCnt++) {
        sSpace = " " + sSpace;
    }

    rtnValue = sSpace + rtnValue;

    return rtnValue;
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열 앞뒤에있는 공백 제거
 * @param  : N/A
 * @return : 공백을 제거한 결과 문자열
 * @---------------------------------------------------
 */
function getTrim()
{
    var startPoint = 0;             // subString 하기 위한 시작 포인트
    var endPoint   = this.length;   // subString 하기 위한 끝 포인트

    //문자열앞에 공백문자가 들어 있는 Index 추출
    while( (startPoint < endPoint) && (this.charCodeAt(startPoint) == 32) )
    {
        startPoint++;
    }

    //문자열뒤에 공백문자가 들어 있는 Index 추출
    while( (startPoint < endPoint) && (this.charCodeAt(endPoint-1) == 32) )
    {
        endPoint--;
    }
    // 공백을 제거했으면 subString하여 결과문자열을 리턴하고 제거한 내용이 없으면 그대로 리턴
    return ( (startPoint > 0) || (endPoint < this.length) ) ? this.substring(startPoint, endPoint) : this;
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열 앞에 있는 공백 제거
 * @param  : N/A
 * @return : 공백을 제거한 결과 문자열
 * @---------------------------------------------------
 */
function getTrimLeft()
{
    var i, j = 0;


    for (i = 0; i < this.length; i++) {
        if (this.charAt(i) == ' ') j = j + 1;
        else break;
    }

    return this.substr(j, this.length - j + 1);
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열 뒤에 있는 공백 제거
 * @param  : N/A
 * @return : 공백을 제거한 결과 문자열
 * @---------------------------------------------------
 */
function getTrimRight()
{

    var i, j = 0;

    for (i = this.length - 1; i >= 0; i--) {
        if (this.charAt(i) == ' ') j = j + 1;
        else break;
    }

    return this.substr(0, this.length - j);
}

/**
 * @---------------------------------------------------
 * @desc   :  저장된 숫자 값에 원하는 길이만큼 '0'을 붙여 표현
 * @param  : pLen - 돌려받을 최종문자의 길이
 * @return : 지정길이보다 모자른경우 "0"값이 추가된 문자열
 * @return : 지정길이보다 큰경우 원래 문자열을 반환
 * @---------------------------------------------------
 */
function getLeftPad( pLength, padString )
{
    var rtnStr = eval(this);
    if (this.length < pLength) {

        for( var i = this.length; i < pLength; i++){
            rtnStr = padString + rtnStr;
        }
    }

    return rtnStr;
}

/**
 * @---------------------------------------------------
 * @desc   : 저장된 문자 값에 원하는 길이만큼 뒤쪽에 ' '을 붙여 표현
 * @param  : pLen - 돌려받을 최종문자의 길이
 * @return : 지정길이보다 모자른경우 " "값이 추가된 문자열
 * @return : 지정길이보다 큰경우 원래 문자열을 반환
 * @---------------------------------------------------
 */
function getRightPad( pLength, padString )
{
    var rtnStr = eval(this);
    if (this.length < pLength) {

        for( var i = this.length; i < pLength; i++){
            rtnStr = rtnStr + padString;
        }
    }

    return rtnStr;
}

/**
 * @---------------------------------------------------
 * @desc   : 문자열의 길이를 구한다.
 * @param  :
 * @return :
 * @---------------------------------------------------
 */
function getStringLength(pData)
{
    var sBit = "";
    var iLen = 0;

    for (var i = 0; i < pData.length; i++) {
        sBit = pData.charAt(i);

        if (escape(sBit).length > 4) iLen = iLen + 2;
        else iLen = iLen + 1;
    }

    return iLen;
}

/**
 * @---------------------------------------------------
 * @desc   : CarrigeReturn을 없앤 문자열을 리턴한다.
 * @param  :
 * @return :
 * @---------------------------------------------------
 */
function getCarrigeReturnRemove() {
    return this.replace(/\s/g, "")
}

/**
 * @---------------------------------------------------
 * @desc   :  전체 문장에서 특정 문장을 뒤에서 부터 찾는 함수
 * @param  : strSrc - 전체 문장
 * @param  : strFind - 찾을 문장
 * @return :  int
 * @---------------------------------------------------
 */
function getSearchStringRight(strSrc, strFind)
{
    var pos = strSrc.indexOf(strFind);
    if(pos == -1)
        return -1;

    while(pos != -1)
    {
        var oldPos = pos;
        pos = strSrc.indexOf(strFind, oldPos + 1);
    }

    return oldPos;
}

/**
 * @---------------------------------------------------
 * @desc   :  전체 문장에서 특정 문장이 있는지를 검사하는 함수
 * @param  : strSrc - 전체 문장
 * @param  : strFind - 찾을 문장
 * @return :  boolean
 * @---------------------------------------------------
 */
function isSearchString(strSrc, strFind)
{
    var r, re;
    re = new RegExp(strFind);
    r = re.exec(strSrc);
    if (r)
    {
        return true;
    }
    return false;
}

/**
 * @---------------------------------------------------
 * @desc   :  원하는 바이트만큼 문자열을 잘라옴. 만약 현재 문자열보다 자르고자 하는 바이트가 크면 현재 문자열 반환.
 * @param  : bSize - 자르고자 하는 바이트크기(예:30 => 30byte)
 * @return :  bSize 만큼의 문자열
 * @---------------------------------------------------
 */
function getByteString(bSize) {
    if (this.getByteLength() <= bSize) {
        return this;
    }

    var rtnValue = "";
    for (var i = 0; i < this.length; i++) {
        if (rtnValue.getByteLength() >= bSize) {
            break;
        }

        rtnValue += this.charAt(i);
    }

    return rtnValue;
}

/**
 * @---------------------------------------------------
 * @desc   : CarrigeReturn을 원하는 문자열로 반환한 다음  리턴한다.
 * @param  : ch 바꾸고자 하는 문자열
 * @return :
 * @---------------------------------------------------
 */
function getCarrigeReturnReplace(ch) {
    return this.replace(/\s/g, ch) ;
}

function getNVL(str,alt) {
    if(isNull(str)) {
        if(isNull(alt)) {
            return "";
        }else {
            return alt;
        }
    }else {
        return str;
    }
}