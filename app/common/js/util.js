function ajaxRequest(url, param, success) {
    $.ajax({
        crossDomain: true,
        type: "post",
        url: url,
        cache: false,
        dataType: "json",
        data: param,
        success: function (data) {
            //1.处理data当中的错误信息
            success(data);
        },
        error: function () {
            // @TODO renderRequestErrorTemplate
        }
    })
    ;
}
function renderTemplate(templateId, data) {
    $("[dot-template=" + templateId + "]").html(doT.template($("#" + templateId).text())(data));
}
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
function getRequestParameter() {
    var url = window.location.href.split("?");
    var result = {};
    if (url.length > 1) {
        var queryStr = url[1];
        var paramList = queryStr.split("&");
        for (var i = 0; i < paramList.length; i++) {
            var param = paramList[i].split("=");
            if (param[0] != "") {
                result[param[0]] = param[1];
            }
        }
        console.log(result);
        return result
    }
    console.log(result);
    return result;
}


function subString(str, number, postfix) {
    if (number <= 0) {
        return str;
    }
    var result = "";
    if (str.length > number) {
        result = str.substr(0, number) + (typeof postfix != "undefined" ? postfix : "");
    } else {
        result = str;
    }
    return result;
}
