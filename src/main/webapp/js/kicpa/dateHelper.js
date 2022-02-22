String.prototype.toDate			= toDate;
Date.prototype.getDateFormat	= getDateFormat;
Date.prototype.getAddDate		= getAddDate;
Date.prototype.getDayOfWeek		= getDayOfWeek;
Date.prototype.getMonthDay		= getMonthDay;
Date.prototype.isLeapYear		= isLeapYear;

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

/**
 * @desc   : 문자열 날짜를 Date로 반환
 * <pre>
 *     var date = "2002-03-05".toDate("YYYY-MM-DD")
 * </pre>
 * @param  : pPattern - Date를 표현하고 있는 현재의 String을 pattern으로 표현한다.
 * <pre>
 *     # syntex
 *
 *       YYYY : year(4자리)
 *       YY   : year(2자리)
 *       MM   : month in year(number)
 *       DD   : day in month
 *       hh   : hour in day (0~23)
 *       mm   : minute in hour
 *       ss   : second in minute
 *       SS   : millisecond in second
 *
 *     <font color=red>주의)</font> 이 중에서 YYYY(YY), MM, DD 는 반드시 있어야 한다.
 * </pre>
 * @return : 변환된 Date Object.
 * @---------------------------------------------------
 */
function toDate(pPattern)
{
    var index = -1;
    var year;
    var month;
    var day;
    var hour = 0;
    var min  = 0;
    var sec  = 0;
    var ms   = 0;

    if(isNull(pPattern)) pPattern = "YYYYMMDD";

    if ((index = pPattern.indexOf("YYYY")) == -1 ) {
        index = pPattern.indexOf("YY");
        year = "20" + this.substr(index, 2);
    } else {
        year = this.substr(index, 4);
    }

    index = pPattern.indexOf("MM");
    month = this.substr(index, 2);

    index = pPattern.indexOf("DD");
    day = this.substr(index, 2);

    if ((index = pPattern.indexOf("hh")) != -1 ) {
        hour = this.substr(index, 2);
    }

    if ((index = pPattern.indexOf("mm")) != -1 ) {
        min = this.substr(index, 2);
    }

    if ((index = pPattern.indexOf("ss")) != -1 ) {
        sec = this.substr(index, 2);
    }

    if ((index = pPattern.indexOf("SS")) != -1 ) {
        ms = this.substr(index, 2);
    }

    return new Date(year, month - 1, day, hour, min, sec, ms);
}

/**
 * @desc   : Date type을 문자 포맷으로 바꾼다.
 * <pre>
 *     default pattern은 "YYYYMMDD"이다.
 *
 *     함수 호출시 다음과 같이 사용한다.
 *
 *          1) getDateFormat()        --> default로 YYYYMMDD형태로 반환한다.
 *          2) getDateFormat("YYYY/MM/DD") --> pattern 형식으로 반환한다.
 *
 * </pre>
 * @param  : pPattern - syntex 참조
 * <pre>
 *
 *     # syntex
 *
 *       YYYY : hour in am/pm (1~12)
 *       MM   : month in year(number)
 *       MON  : month in year(text)  예) "January"
 *       DD   : day in month
 *       DAY  : day in week  예) "Sunday"
 *       HH   : hour in am/pm (1~12)
 *       hh   : hour in day (0~23)
 *       mm   : minute in hour
 *       ss   : second in minute
 *       SS   : millisecond in second
 *       a    : am/pm  예) "AM"
 *
 * </pre>
 *
 * @return : Pattern 형태의 문자열
 * @---------------------------------------------------
 */
function getDateFormat(pPattern)
{
    var GLB_MONTH_IN_YEAR = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var GLB_DAY_IN_WEEK   = new Array("Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday");

    var year      = this.getFullYear();
    var month     = this.getMonth() + 1;
    var day       = this.getDate();
    var dayInWeek = this.getDay();
    var hour24    = this.getHours();
    var ampm      = (hour24 < 12) ? 0 : 1;
    var hour12    = (hour24 > 12) ? (hour24 - 12) : hour24;
    var min       = this.getMinutes();
    var sec       = this.getSeconds();
    var YYYY = "" + year;
    var YY   = YYYY.substr(2);
    var MM   = (("" + month).length == 1) ? "0" + month : "" + month;
    var MON  = GLB_MONTH_IN_YEAR[month-1];
    var DD   = (("" + day).length == 1) ? "0" + day : "" + day;
    var DAY  = GLB_DAY_IN_WEEK[dayInWeek];
    var HH   = (("" + hour12).length == 1) ? "0" + hour12 : "" + hour12;
    var hh   = (("" + hour24).length == 1) ? "0" + hour24 : "" + hour24;
    var mm   = (("" + min).length == 1) ? "0" + min : "" + min;
    var ss   = (("" + sec).length == 1) ? "0" + sec : "" + sec;
    var SS   = "" + this.getMilliseconds();
    var a    = (ampm == 0) ? "AM" : "PM";

    var dateStr;
    var index = -1;

    if (typeof(pPattern) == "undefined") {
        dateStr = "YYYYMMDD";
    } else {
        dateStr = pPattern;
    }

    dateStr = dateStr.replace(/a/g,    a);
    dateStr = dateStr.replace(/YYYY/g, YYYY);
    dateStr = dateStr.replace(/YY/g,   YY);
    dateStr = dateStr.replace(/MM/g,   MM);
    dateStr = dateStr.replace(/MON/g,  MON);
    dateStr = dateStr.replace(/DD/g,   DD);
    dateStr = dateStr.replace(/DAY/g,  DAY);
    dateStr = dateStr.replace(/hh/g,   hh);
    dateStr = dateStr.replace(/HH/g,   HH);
    dateStr = dateStr.replace(/mm/g,   mm);
    dateStr = dateStr.replace(/ss/g,   ss);

    return dateStr;
}

/**
 * @desc   : 특정일자의 상대일자(+/-)를 계산
 * @param  : pNum  - 구하고자 하는 상대일 수 (+/-)
 * @param  : pKind - 구하고자 하는 기준(위 참조)
 * <pre>
 *       pKind에 따른 상대일자를 계산한다.
 *
 *           "Y" : 년
 *           "M" : 월
 *           "D" : 일
 *           "h" : 시
 *           "m" : 분
 *           "s" : 초
 *
 *       default는 "D"
 *
 *       함수 호출시 다음과 같이 사용한다.
 *
 *          1) date.getAddDate(10)       --> default로 일에 대한 상대일을 구한다.
 *          2) date.getAddDate(10, "Y")  --> 년도에 대한 상대일을 구한다.
 * </pre>
 * @return : Date
 * @---------------------------------------------------
 */
function getAddDate(pNum, pKind)
{
    var rtnDate = this;

    if(isNull(pKind)) pKind = "D";

    switch(pKind){
        case "Y" : rtnDate.setFullYear(this.getFullYear() + pNum);break;
        case "M" : rtnDate.setMonth(this.getMonth() + pNum);break;
        case "D" : rtnDate.setDate(this.getDate() + pNum);break;
        case "h" : rtnDate.setHours(this.getHours() + pNum);break;
        case "m" : rtnDate.setMinutes(this.getMinutes() + pNum);break;
        case "s" : rtnDate.setSeconds(this.getSeconds() + pNum);break;
    }

    return rtnDate;
}

/**
 * @desc   : Kind에 해당하는 요일을 반환
 * @param  : pKind - 종류 (위 참조)
 * <pre>
 *     kind
 *           "K" or "k" : 한국어 -> 일,월,화,수,목,금,토
 *           "C" or "c" : 한자   -> 日,月,火,水,木,金,土
 *           "E" or "e" : 영어   -> Sun,Mon,Tue,Wed,Thu,Fri,Sat
 *           "N" or "n" : 숫자   -> 0,1,2,3,4,5,6
 * </pre>
 * @return : 요일 String (위 참조)
 * @---------------------------------------------------
 */
function getDayOfWeek(pKind)
{
    if(pKind.toUpperCase() == "K") {
        var week = new Array("일","월","화","수","목","금","토");
        return week[this.getDay()];
    } else if(pKind.toUpperCase() == "C") {
        var week = new Array("日","月","火","水","木","金","土");
        return week[this.getDay()];
    } else if(pKind.toUpperCase() == "E") {
        var week = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
        return week[this.getDay()];
    } else if(pKind.toUpperCase() == "N") {
        return this.getDay() + "";
    }

    return "";
}

/**
 * @group  : Date prototype function
 * @ver    : 2004.06.30 (KUHDEV-0001)
 * @by     : Mr.Joe.
 * @---------------------------------------------------
 * @type   : Date prototype function
 * @access : public
 * @desc   : 해당일의 마지막 일을 계산
 * @return : 마지막 일자
 * @---------------------------------------------------
 */
function getMonthDay()
{
    var year = this.getFullYear();
    var month = this.getMonth();


    with(new Date(year, month + 1, 1, 12)) {  //MM = 1 .. 12
        setDate(0);
        return getDate();
    }
}

/**
 * @---------------------------------------------------
 * @desc   : 윤년인지 아닌지 점검
 * @return : true/false
 * @---------------------------------------------------
 */
function isLeapYear()
{
    var yyyy = this.getFullYear();

    return (new Date(yyyy, 1, 29)).getMonth() == 1
}

/**
 * @---------------------------------------------------
 * @desc   : 윤년인지 아닌지 점검
 * @return : true/false
 * @---------------------------------------------------
 */
function isLeapYear(year) {
    var yyyy = parseInt(year);

    return (new Date(yyyy, 1, 29)).getMonth() == 1
}

/**
 * @---------------------------------------------------
 * @desc   :  옵션에 따라 Date형을 DateTime형 String으로 변환
 * @param  : pDate - Date 객체
 * @param  : pMode - 대소문자 구분 없음
 * <pre>
 *				'기본' - 일자 + 시간,
 'D'    - 일자,
 'T'    - 시간,
 'W'    - 요일,
 'S'    - 시간 + 초,
 'A'    - 전체 + 초

 * </pre>
 * @return : String "200406081415"
 * @---------------------------------------------------
 */
function getDateTime( pDate, pMode ){
    var rtnStr = null;

    sFDate = pDate.getFullYear();
    sFDate = sFDate.toString() + (( pDate.getMonth() + 1 > 9 ) ? pDate.getMonth() + 1 : "0" + (pDate.getMonth() + 1));
    sFDate = sFDate.toString() + (( pDate.getDate()      > 9 ) ? pDate.getDate() : "0" + pDate.getDate());

    sFTime = (( pDate.getHours() > 9 ) ? pDate.getHours() : "0" + pDate.getHours());
    sFTime = sFTime.toString() + (( pDate.getMinutes() > 9 ) ? pDate.getMinutes() : "0" + pDate.getMinutes());

    sFSec  = (( pDate.getSeconds() > 9 ) ? pDate.getSeconds() : "0" + pDate.getSeconds() );
    var x = new Array("일", "월", "화", "수", "목", "금", "토");
    sWeek  = x[pDate.getDay()];

    switch( pMode.toUpperCase() ){
        case 'D': // YEAR + MONTH + DATE
            rtnStr = sFDate;
            break;
        case 'T': // HOUR + MINUTE
            rtnStr = sFTime;
            break;
        case 'S': // HOUR + MINUTE + SECONDS
            rtnStr = sFTime + sFSec;
            break;
        case 'A': // YEAR + MONTH + DATE + HOUR + MINUTE + SECONDS
            rtnStr = sFDate + sFTime + sFSec;
            break;
        case 'W': // WEEK
            rtnStr = sWeek;
            break;

        default:  // YEAR + MONTH + DATE + HOUR + MINUTE
            rtnStr = sFDate + sFTime;
    }
    return rtnStr;
}

/**
 * @desc   : 유효한 날짜, 시간 인지 점검
 * @param  : pDateString - 날짜 문자열
 * @param  : pFormat - 아래 Syntex 참조
 * <pre>
 *     # syntex
 *
 *       YYYY : hour in am/pm (1~12)
 *       MM   : month in year(number)
 *       MON  : month in year(text)  예) "January"
 *       DD   : day in month
 *       DAY  : day in week  예) "Sunday"
 *       HH   : hour in am/pm (1~12)
 *       hh   : hour in day (0~23)
 *       mm   : minute in hour
 *       ss   : second in minute
 *       SS   : millisecond in second
 *       a    : am/pm  예) "AM"
 *
 *     사용예> isValidDateTime("20030229", "YYYYMMDD")
 *             isValidDateTime("11:61", "hh:mm");
 *
 * </pre>
 * @return : true/false
 * @---------------------------------------------------
 */
function isValidDateTime(pDateString, pFormat)
{
    var dt = pDateString.toDate(pFormat).getDateFormat(pFormat);

    return (pDateString == dt);
}

/**
 * @desc   : YYYY/MM/DD or YYYY-MM-DD -> YYYYMMDD 로 변환
 * @param  : pDateString - 구분자('/' or '-')가 들어간 일자 문자열
 * @return : 구분자 제외한 날짜 String
 * @---------------------------------------------------
 */
function getRemoveFormatter(pDateString)
{
    if(pDateString.length == 10) {
        var arrDate = new Array(3);

        arrDate = pDateString.split("/");
        if(arrDate.length != 3) {
            arrDate = pDateString.split("-");
        }
        return arrDate[0] + arrDate[1] + arrDate[2];
    } else {
        return pDateString;
    }
}

/**
 * @group  :
 * @ver    : 2004.06.30 (KUHDEV-0001)
 * @by     : Mr.Joe.
 * @---------------------------------------------------
 * @type   : function
 * @access : public
 * @desc   : 유효한 월인지 점검
 * @param  : pMonth - 월 문자열
 * @return : true/false
 * @---------------------------------------------------
 */
function isValidMonth(pMonth)
{
    var month = 0;

    try {
        month = eval(pMonth);
    } catch(err) {
        return false;
    }

    return (month >= 1 && month <= 12);
}

/**
 * @group  :
 * @ver    : 2004.06.30 (KUHDEV-0001)
 * @by     : Mr.Joe.
 * @---------------------------------------------------
 * @type   : function
 * @access : public
 * @desc   : 유효한 일인지 점검
 * @param  : pDay - 일 문자열
 * @return : true/false
 * @---------------------------------------------------
 */
function isValidDay(pDay)
{
    var day = 0;

    try {
        day = eval(pDay);
    } catch(err) {
        return false;
    }

    return (day >= 1 && day <= 31);
}

/**
 * @---------------------------------------------------
 * @desc   : 두 일자사이의 차를 다양한 형태의 날짜 단위로 반환
 * @param  : fromDate - 시작일자 문자열 (YYYYMMDD or YYYY/MM/DD or YYYY-MM-DD)
 * @param  : endDate  - 종료일자 문자열 (YYYYMMDD or YYYY/MM/DD or YYYY-MM-DD)
 * @param : format - 반환될 날짜차이 포맷(dd:일자, mm:월, yyyy:년, yyyymm:년월, mmdd:월일, yyyymmdd:년월일 / 생략시 일자 반환)
 * @return : 종료일자에서 시작일자를 뺀 일자(format 이 주어진 경우 년/월/일 구분은 "/"로 표현된다.)
 * @---------------------------------------------------
 */
function getDateInterval(fromDate, endDate, format)
{
    var arrFromDate = new Array(3);
    var arrEndDate = new Array(3);

    if(fromDate.length == 8) {
        arrFromDate[0] = fromDate.substr(0, 4);
        arrFromDate[1] = fromDate.substr(4, 2);
        arrFromDate[2] = fromDate.substr(6, 2);
    } else if(fromDate.length == 10) {
        arrFromDate = fromDate.split("/");
        if(arrFromDate.length != 3) {
            arrFromDate = fromDate.split("-");
        }
    }

    if(endDate.length == 8) {
        arrEndDate[0] = endDate.substr(0, 4);
        arrEndDate[1] = endDate.substr(4, 2);
        arrEndDate[2] = endDate.substr(6, 2);
    } else if(endDate.length == 10) {
        arrEndDate = endDate.split("/");
        if(arrEndDate.length != 3) {
            arrEndDate = endDate.split("-");
        }
    }

    var rstFromDate = new Date(eval(arrFromDate[0]), eval(arrFromDate[1])-1, eval(arrFromDate[2]));
    var rstEndDate = new Date(eval(arrEndDate[0]), eval(arrEndDate[1])-1, eval(arrEndDate[2]));
    var rstFrom = rstFromDate.getTime();
    var rstEnd = rstEndDate.getTime();

    var daydue = Math.ceil((rstEnd - rstFrom) / (24 * 60 * 60 * 1000));
    var yeardue = 0;
    var monthdue = 0;

    // 일자(dd)로 반환
    if (format == null || format == "" || format.toLowerCase() == "dd") {
        return daydue;
    } else {
        format = format.toLowerCase();
    }

    var year = arrFromDate[0];
    var month = arrFromDate[1];
    var day = arrFromDate[2];

    var dayCount = 0;

    // 시작일자가 1일이 아닌경우
    if (day != 1) {
        month += 1;
    }

    do {
        if (month > 12) {
            month = 1;
            year += 1;
        }

        dayCount = getDayCountForMonth(year, month);

        if (daydue < dayCount) {
            break;
        }

        daydue = daydue - dayCount;
        month++;
        monthdue++;

        if (format == "yyyy" && daydue < 365 && (monthdue % 12) == 0) {
            break;
        }

    } while (true);

    // 년도 계산
    if (format != "mmdd" && format != "mm" && monthdue >= 12) {
        yeardue = monthdue / 12;
        monthdue = monthdue % 12;
    }

    var result = "";
    if (format == "yyyy") {
        result = yeardue;
    } else if (format == "mm") {
        result = monthdue;
    } else if (format == "mmdd") {
        result = monthdue + "/" + daydue;
    } else if (format == "yyyymm") {
        result = yeardue + "/" + monthdue;
    } else if (format == "yyyymmdd") {
        result = yeardue + "/" + monthdue + "/" + daydue;
    }

    return result;
}

/**
 * @---------------------------------------------------
 * @desc   : 해당년의 해당 월이 몇일인지를 반환
 * @param  : year - 년도(yyyy)
 * @param  : month - 달(mm)
 * @return : 해당 년도의 해당 달이 몇일을 가지고 있는지를 반환한다.(윤년계산 포함)
 * @---------------------------------------------------
 */
function getDayCountForMonth(year, month) {
    var normal = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var leap = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    if (isLeapYear(year)) {
        return leap[month - 1];
    } else {
        return normal[month - 1];
    }
}

/**
 * @---------------------------------------------------
 * @desc   : 두 시간의 차를 초단위로 반환
 * @param  : fromTime - 시작시간 문자열 (hhmm or hh:mm or hhmmss or hh:mm:ss)
 * @param  : endTime   - 종료시간 문자열 (hhmm or hh:mm or hhmmss or hh:mm:ss)
 * @return : (종료시간 - 시작시간) 를 초단위로 반환
 * @---------------------------------------------------
 */
function getTimeInterval(fromTime, endTime)
{
    var arrFromTime = new Array(3);
    var arrEndTime = new Array(3);

    if(fromTime.length == 4 || fromTime.length == 6) {
        arrFromTime[0] = fromTime.substr(0, 2);
        arrFromTime[1] = fromTime.substr(2, 2);
        arrFromTime[2] = fromTime.substr(4, 2);
    } else if(fromTime.length == 5 || fromTime.length == 8) {
        arrFromTime = fromTime.split(":");
    }
    if(arrFromTime[2].length == 0) arrFromTime[2] = 0;

    if(endTime.length == 4 || endTime.length == 6) {
        arrEndTime[0] = endTime.substr(0, 2);
        arrEndTime[1] = endTime.substr(2, 2);
        arrEndTime[2] = endTime.substr(4, 2);
    } else if(endTime.length == 5 || endTime.length == 8) {
        arrEndTime = endTime.split(":");
    }
    if(arrEndTime[2].length == 0) arrEndTime[2] = 0;

    var rstFromTime = new Date(2000, 1, 1, eval(arrFromTime[0]), eval(arrFromTime[1]), eval(arrFromTime[2]), 0);
    var rstEndTime = new Date(2000, 1, 1, eval(arrEndTime[0]), eval(arrEndTime[1]), eval(arrEndTime[2]), 0);
    var diffTime = (rstEndTime - rstFromTime) / 1000;

    return diffTime;
}

/**
 * @desc   : 현재날짜 시간 서버시간으로 변경
 * @param  :
 * @param  :
 * @return : date
 * @---------------------------------------------------
 */
function getNewDate(){
    var rtnDate = new Date();

    rtnDate.setTime(rtnDate.getTime());

    return rtnDate;
}

/**
 * @desc   : 현재날짜 시간 반환
 * @param  :
 * @param  :
 * @return : YYYYMMDD HHMMSS
 * @---------------------------------------------------
 */
function getCurrentDateTime(){
    return getCurrentDate() + " " + getCurrentTime();
}

/**
 * @desc   : 현재날짜 반환
 * @param  :
 * @param  :
 * @return : YYYYMMDD
 * @---------------------------------------------------
 */
function getCurrentDate()
{
   /* //var sDate = getNewDate();
    var xmlHttp;
    try {
        //FF, Opera, Safari, Chrome
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //IE
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (eerr3) {
                //AJAX not supported, use CPU time.
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD', window.location.href.toString(), false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    st = xmlHttp.getResponseHeader("Date");

    var sDate = new Date(st);

    rtnDate = sDate.getFullYear();
    rtnDate = rtnDate.toString() + (( sDate.getMonth() + 1 > 9 ) ? sDate.getMonth() + 1 : "0" + (sDate.getMonth() + 1));
    rtnDate = rtnDate.toString() + (( sDate.getDate()      > 9 ) ? sDate.getDate() : "0" + sDate.getDate()) ;

    return rtnDate;
*/
    var sDate = getNewDate();

    rtnDate = sDate.getFullYear();
    rtnDate = rtnDate.toString() + (( sDate.getMonth() + 1 > 9 ) ? sDate.getMonth() + 1 : "0" + (sDate.getMonth() + 1));
    rtnDate = rtnDate.toString() + (( sDate.getDate()      > 9 ) ? sDate.getDate() : "0" + sDate.getDate()) ;

    return rtnDate;

}

/**
 * @desc   : 현재 시간 반환
 * @param  :
 * @param  :
 * @return : hhmmssSS
 * @---------------------------------------------------
 */
function getCurrentTime()
{
    var sDate = getNewDate();

    rtnTime = (( sDate.getHours() > 9 ) ? sDate.getHours() : "0" + sDate.getHours());
    rtnTime = rtnTime.toString() + (( sDate.getMinutes() > 9 ) ? sDate.getMinutes() : "0" + sDate.getMinutes());
    rtnTime = rtnTime.toString() + (( sDate.getSeconds() > 9 ) ? sDate.getSeconds() : "0" + sDate.getSeconds());

    return rtnTime;
}

/**
 * @desc   : 현재 요일 반환
 * @param  : 한글(K) or 숫자
 * @param  :
 * @return : 0, 1, 2.....or 일, 월, 화......
 * @---------------------------------------------------
 */
function getCurrentWeek(flag)
{
    var sDate = getNewDate();

    sWeek = new Array("일", "월", "화", "수", "목", "금", "토");

    rtnWeek = (flag == "K") ? sWeek[sDate.getDay()] : sDate.getDay();

    return rtnWeek;
}


;(function($) {
    var defaults = {
        searchDate : getCurrentDate()
    }

    var AbijouDateRangePicker = function(element,option){
        $(element).data('abijouDateRangePicker', this);
        this.element = element;
        this.$element = $(element);
        this.settings = option;
        this.calendar = {};
        this.init();

        this.$element.on('click','#abijou_pre_month',$.proxy(this.preMonth,this));
        this.$element.on('click','#abijou_next_month',$.proxy(this.nextMonth,this));
        this.$element.on('click','a',$.proxy(this.selectDate,this));
    };

    $.extend(AbijouDateRangePicker.prototype, {
        init: function () {

            var searchDD = this.settings.searchDate || getCurrentDate();
            var searchDate = searchDD.toDate();
            var templete = $($.fn.abijouDateRangePicker.templete);

            this.calendar.month = searchDate.getDateFormat("YYYYMM");
            this.calendar.selectDate = searchDD;

            if(this.settings.holidays == "" || this.settings.holidays == undefined || this.settings.holidays == null) {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: '/emr/rsrv/holi.do',
                    data: {
                        dateType : 'Y'
                    },
                    success: function(data)
                    {
                        //console.log("data.holiListdata.holiListdata.holiList" , data.holiList);
                        that.settings.holidays = data.holiList;
                        that.holiday_callback(searchDate,data.holiList);
                    },
                    error :function() {
                        that.holiday_callback(searchDate);
                    }
                });
            }else {
                this.$element.html(templete)
                    .find('#abijou_month').text(searchDate.getDateFormat("YYYY-MM"));
                this.draqCalendar();
            }
        },
        holiday_callback : function(searchDate) {
            var templete = $($.fn.abijouDateRangePicker.templete);
            this.$element.html(templete)
                .find('#abijou_month').text(searchDate.getDateFormat("YYYY-MM"));
            this.draqCalendar();
        },
        draqCalendar : function() {

            this.$element.find('#calendarlist').html('');

            var month = this.calendar.month;
            var startDate = (month+"01").toDate("YYYYMMDD").getDateFormat();

            var lastDay = startDate.toDate().getMonthDay();
            var endDate = (month + lastDay).toDate("YYYYMMDD").getDateFormat();

            this.$element.find('#abijou_month').text((month + "01").toDate().getDateFormat("YYYY-MM"));
            var holidays = this.settings.holidays;
            var selectedDay = this.calendar.selectDate;

            for(var day = startDate ; day <= endDate ; day = day.toDate("YYYYMMDD").getAddDate(1,"D").getDateFormat()) {
                var dayComp = $($.fn.abijouDateRangePicker.day);
                var dayObj = day.toDate();
                var dayWeek = dayObj.getDayOfWeek('K');
                var holiObj = null;

                if(typeof holidays == 'object') {
                    for(var i=0; i < holidays.length; i++) {
                        if(day == holidays[i].holiDd) {
                            holiObj = holidays[i];
                            break;
                        }
                    }
                }

                this.$element.find('#calendarlist')
                        .append(dayComp.addClass(function() {
                                var classStr = "";
                                if(!isNull(holiObj)){
                                    classStr = "holiday";
                                    if(holiObj.holiType =='x'){
                                        classStr = "";
                                    }
                                }else if(dayWeek == "토") {
                                    //classStr = "saturday";
                                    classStr = "sat";
                                }else if(dayWeek == "일") {
                                    //classStr = "sunday";
                                    classStr = "sun";
                                }

                                if(selectedDay == day) {
                                    classStr += " today";
                                }
                                return classStr;

                            }).find('a')
                            .attr('title', function () {
                                return  dayWeek + (!isNull(holiObj) ? "[" + holiObj.holiNm + "]" : "") + " " + dayObj.getDateFormat("YYYY-MM-DD");
                            })
                            .attr('date',day)
                            .html(function() {
                                //return dayObj.getDate() + "<br>(" + dayObj.getDayOfWeek('K') + ")";
                                return "<strong>" + dayObj.getDayOfWeek('K') + "</strong><span>" + dayObj.getDate() + "</span>"
                            }).end()
                            );
            }
        },
        preMonth : function(e) {
            this.calendar.month = (this.calendar.month + "01").toDate().getAddDate(-1,"M").getDateFormat("YYYYMM");
            this.draqCalendar();
        },
        nextMonth : function(e) {
            this.calendar.month = (this.calendar.month + "01").toDate().getAddDate(1,"M").getDateFormat("YYYYMM");
            this.draqCalendar();
        },
        getDate : function() {
            return this.calendar.selectDate;
        },
        selectedChange : function(orgSelectDate,updateDate) {
            //$("#calendarlist").find('a[date=' + orgSelectDate + ']').parent().removeClass("today");
            //$("#calendarlist").find('a[date=' + updateDate + ']').parent().addClass("today");
            this.$element.find('a[date=' + orgSelectDate + ']').parent().removeClass("today");
            this.$element.find('a[date=' + updateDate + ']').parent().addClass("today");
        },
        setDate : function(updateDate) {
            var orgSelectDate = this.calendar.selectDate;

            this.calendar.month = updateDate.toDate().getDateFormat("YYYYMM");
            this.calendar.selectDate = updateDate;

            if(updateDate != undefined && updateDate != "" && updateDate.substr(0,6) == orgSelectDate.substr(0,6)) {
                this.selectedChange(orgSelectDate,updateDate);
            }else {
                this.draqCalendar();
            }
        },
        updateDate : function(updateDate) {
            this.setDate(updateDate);

            if(typeof this.settings.changeDateCallback == 'function') {
                this.settings.changeDateCallback(updateDate);
            }
        },
        selectDate : function(e) {
            var selecedDate = $(e.target).parent().attr('date');
            this.updateDate(selecedDate);
        }
    });

    $.fn.abijouDateRangePicker = function(option) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;

        this.each(function(){
            var $this = $(this),
                data = $this.data('abijouDateRangePicker'),
                options = typeof option === 'object' && option;
            if (!data){
                var opts = $.extend({}, defaults, options);
                data = new AbijouDateRangePicker(this, opts);
                $this.data('abijouDateRangePicker', data);
            }
            if (typeof option === 'string' && typeof data[option] === 'function'){
                internal_return = data[option].apply(data, args);
            }
        });

        if (
            internal_return === undefined ||
            internal_return instanceof AbijouDateRangePicker
        )
            return this;

        if (this.length > 1)
            throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
        else
            return internal_return;
    }

    //templete
    $.fn.abijouDateRangePicker.templete =
        '<div id="select_rsrvDate" class="select_rsrvDate">' +
        '<div class="cal_util">' +
        '<div class="prev" id="abijou_pre_month" ><i class="fa fa-caret-left"></i></div><span id="abijou_month">2017-07</span><div class="next" id="abijou_next_month" ><i class="fa  fa-caret-right"></i></div>'+
        '</div>' +
        '<div class="cal_list">' +
        '<ul id="calendarlist"></ul></div></div>';
    // Day
    $.fn.abijouDateRangePicker.day = '<li><a></a></li>';

})(window.jQuery);