String.prototype.setAmountToKorean   = setAmountToKorean;
String.prototype.isNumber			 = isNumber;
String.prototype.isFloat             = isFloat;
String.prototype.getRound            = getRound;
String.prototype.getTruncate         = getTruncate;

/**
 * @---------------------------------------------------
 * @desc   : 금액을 한글로 변환 (단위포함)
 * @param  : N/A
 * @return : String - 단위를 포함한 한글String으로 반환
 * @---------------------------------------------------
 */
function setAmountToKorean()
{
    var amountTmp = this;                    // Parameter로 받은 값
    var amount    = "";                       // Convert할 값
    var rtnAmt    = "";                       // 전체 CONV된 한글 값
    var amtKor    = "";                       // 각 단위별 CONV된 한글 값
    var flag      = "N";                      // 만단위 이상 FLAG값

    var amtLength = amountTmp.length;
    var fstChar   = "";

    for(i=0; i < amtLength ;i++) {

        fstChar = amountTmp.substring(i,i+1);

        if('0' <= fstChar && '9' >= fstChar) {
            amount = amount.concat(fstChar);
        }
    }

    amtLength   = amount.length;                // Parameter로 받은 값의 길이

    for(i=1; i<=amtLength ;i++) {

        var amtEng = (amount.substring(amtLength-i,amtLength)).substring(0,1);

        switch(amtEng) {
            case '1':
                amtKor = "일";
                break;
            case '2':
                amtKor = "이";
                break;
            case '3':
                amtKor = "삼";
                break;
            case '4':
                amtKor = "사";
                break;
            case '5':
                amtKor = "오";
                break;
            case '6':
                amtKor = "육";
                break;
            case '7':
                amtKor = "칠";
                break;
            case '8':
                amtKor = "팔";
                break;
            case '9':
                amtKor = "구";
                break;
            case '0':
                continue;
            default:
                continue;
        }

        if(i==1) {
            rtnAmt = amtKor;
        } else {
            switch((i-1)%4) {
                case 1:
                    amtKor = amtKor.concat("십");
                    break;
                case 2:
                    amtKor = amtKor.concat("백");
                    break;
                case 3:
                    amtKor = amtKor.concat("천");
                    break;
                case 0:
                default:
                    break;
            }

            if( i>4 && i<9 && flag!='M') {
                amtKor = amtKor.concat("만");
                flag = 'M';
            }

            if( i>8 && i<13 && flag!='U') {
                amtKor = amtKor.concat("억");
                flag = 'U';
            }

            if( i>12 && flag!='J') {
                amtKor = amtKor.concat("조");
                flag = 'J';
            }

            rtnAmt = amtKor.concat(rtnAmt);
        }
    }

    return rtnAmt;
}

/**
 * @---------------------------------------------------
 * @desc   : 저장된 값이 Number 형인지 점검
 * @param  : N/A
 * @return : true/false
 * @---------------------------------------------------
 */
function isNumber()
{
    if( typeof( this ) == "undefined" ) return false;
    if( this.length == 0 ) return false;

    var thisSting = this.toString();
    for( var i=0; i < thisSting.length; i++ ){
        var thisNumber = thisSting.substring( i, i+1 );

        // 숫자가 아니면 FALSE 리턴
        if( isNaN( thisNumber ) ) return false;

        // 공백이면 FALSE 리턴
        if( " " == thisNumber ) return false;
    }

    return true;
}

/**
 * @---------------------------------------------------
 * @desc   : 저장된 값이 Float 형인지 점검
 * @param  : N/A
 * @return : true/false
 * @---------------------------------------------------
 */
function isFloat()
{
    // 파라미터 값이 parseFloat()후에도 같으면 TRUE 리턴
    return ( this == parseFloat( this ) ) ? true : false;
}

/**
 * @---------------------------------------------------
 * @desc   : 저장된 값을 지정한 자리에서 올림/반올림/버림 처리
 * @param  : position - 올림/반올림/버림 할 위치(2:10자리, 1:1자리, -1:소수점이하 첫째자리)
 * @param  : mode  - UP:올림, HALF_UP:반올림, DOWN:버림
 * @return : Number
 * @---------------------------------------------------
 */
function getRound( position, mode )
{
// 파라미터 값을 수치화 하여 변수에 저장
    var valueNumber    = eval(this);

    // 소수점을 기준으로 숫자들만 취하여 배열 변수에 저장
    var tempArray = eval(this).toString().setReplaceWord("-", "").split(".");

    // this 가 float 형이 아니면
    if( !this.isFloat() )
    {
        //fAlertMessage(4, "파라미터");
        return "";
    }

    // position 가 float 형이 아니면
    if( !position.toString().isFloat() )
    {
        //fAlertMessage(4, "파라미터");
        return "";
    }

    // 소수점 앞에서 처리하려면
    if(0 < eval( position ))
    {
        // 소수점 이상 자리수보다 크면
        if( tempArray[0].length < eval(position) )
        {
            // 메시지 처리후 리턴
            //fAlertMessage(1, "올림/반올림/버림 할 위치");
            return "";
        }
    }
    // 소수점 뒤에서 처리하려면
    else if(0 > eval(position))
    {
        // 소수점 이하값이 존재하지 않거나 자리수보다 크면
        if(tempArray.length != 2 || tempArray[1].length < eval(position)*(-1))
        {
            return this;
        }
    }

    switch(mode){
        // '올림'이고
        case "UP" :
            // 소수점 앞에서 처리하려면
            if(0 < eval(position))
            {
                // 해당 자리(position)에서 올림 처리
                valueNumber = Math.ceil(valueNumber / Math.pow(10, position)) * Math.pow(10, position);

                return valueNumber;
            }
            // 소수점 뒤에서 처리하려면
            else if(0 > eval(position))
            {
                // 해당 자리(position)에서 올림 처리
                valueNumber = Math.ceil(valueNumber * Math.pow(10, position*(-1)-1)) / Math.pow(10, position*(-1)-1);

                return valueNumber;
            }
            else
            {
                //fAlertMessage(4, "올림자리");
                return "";
            }
        // '반올림'이고
        case "HALF_UP" :
            // 소수점 앞에서 처리하려면
            if(0 < eval(position))
            {
                // 해당 자리(position)에서 반올림 처리
                valueNumber = Math.round(valueNumber / Math.pow(10, position)) * Math.pow(10, position);

                return valueNumber;
            }
            // 소수점 뒤에서 처리하려면
            else if(0 > eval(position))
            {
                // 해당 자리(position)에서 반올림 처리
                valueNumber = Math.round(valueNumber * Math.pow(10, position*(-1)-1)) / Math.pow(10, position*(-1)-1);

                return valueNumber;
            }
            else
            {
                //fAlertMessage(4, "올림자리");
                return "";
            }

        // '버림'이고
        case "DOWN" :
            // 소수점 앞에서 처리하려면
            if(0 < eval(position))
            {
                // 해당 자리(position)에서 내림 처리
                valueNumber = Math.floor(valueNumber / Math.pow(10, position)) * Math.pow(10, position);

                return valueNumber;
            }
            // 소수점 뒤에서 처리하려면
            else if(0 > eval(position))
            {
                // 해당 자리(position)에서 내림 처리
                valueNumber = Math.floor(valueNumber * Math.pow(10, position*(-1)-1)) / Math.pow(10, position*(-1)-1);

                return valueNumber;
            }else{
                //fAlertMessage(4, "올림자리");
                return "";
            }

        // 모두 아니면
        default :
            // 메시지 처리후 리턴
            //fAlertMessage(1, "모드('1'/'0'/'-1')");
            return "";
    }
}

/**
 * @---------------------------------------------------
 * @desc   : 소수점 버리고 정수형 String으로 생성 (음수인경우에도 마찬가지 음수표시는 유효)
 * @param  : N/A
 * @return : Number
 * @---------------------------------------------------
 */
function getTruncate()
{
    var TempArray = new Array();
    TempArray = this.split(".");
    return TempArray[0];
}

/**
 * @---------------------------------------------------
 * @desc   : 랜덤숫자 만들기
 * @param  : iRange - 랜덤숫자가 발생할 범위 지정 ( 1 ~ iRange )
 * @return : iRange 범위에 속하는 랜덤숫자
 * @---------------------------------------------------
 */
function getRandomNo( iRange )
{
    iRnt = Math.floor( Math.random() * iRange ) + 1;
    return iRnt;
}
