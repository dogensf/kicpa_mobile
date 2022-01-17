var mode = 'info';



var consoleLog = function(message) {
    if(mode != 'debug') {
        return true;
    }

    console.log(message);
}

var alertLog = function(message) {
    if(mode != 'debug') {
        return true;
    }

    alert(message);
}

var alertMessage = function(message, title, info) {

    // Enable warning, error, success, info and question state icons
    var stitle = isNull(title)? "" : title;
    var sinfo = "info";

    sinfo = (info == "-") ? "" : isNull(info)? "info" : info;

    Swal.fire(message, stitle, sinfo);


}

var confirmMessage = function(message, onSuccess, onCancel, title, messageinfo ) {

  var sTitle = isNull(title)? "알림메세지" : title;

    swal.fire({
        title: message,
        text: messageinfo,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '예',
        cancelButtonText: '아니요',
        reverseButtons: true
    }).then(function(result){
        if (result.value) {
            swal.fire(
                '완료',
                '작업이 완료되었습니다.',
                'success'
            );
            onSuccess();
            // result.dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
        } else if (result.dismiss === 'cancel') {
            swal.fire(
                '취소',
                '작업이 취소되었습니다.',
                'error'
            );
            onCancel();
        }
    });

    // bootbox.dialog({
    //     message: message ,
    //
    //
    //     title: sTitle,
    //     buttons: {
    //         success: {
    //             label: "예", className: "green", callback: function () {
    //                 onSuccess();
    //             }
    //         }, danger: {
    //             label: "아니요", className: "red", callback: function () {
    //                 onCancel();
    //             }
    //         }
    //     }
    // })

    /*var confirmResult = confirm(message);
    if(confirmResult) {
        onSuccess();
    } else {
        onCancel();
    }*/
    //return false;
}