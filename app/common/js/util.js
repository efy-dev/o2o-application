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


/**
 * modal
 * @type 提示条成功 modal.overAlert('操作成功弹出框！', 'success');
 * @type 提示条失败 modal.overAlert('提示或操作失败弹出框！', 'fail');
 * @type 确认框:一个按钮 modal.confirm('确定删除该收货地址？');
 * @type 确认框:两个按钮 modal.confirm('确定删除该收货地址？', '');
 */
var modal = {
    /**
     * 提示条
     * value: 提示文字
     * status: 提示的状态
     */
    overAlert: function(value, status) {
        var str = '<div id="modal" class="modal tips ' + status + '"><h4>' + value + '</h4></div>';
        $('body').append(str);
        $('#modal').stop().animate({ 'top': '0' }, 800);
        setTimeout(function() {
            $('#modal').stop().animate({ 'top': '-100%' }, 800);
        }, 4000);
    },
    /**
     * 确认框
     * value: 提示文字
     * status: 按钮的状态 为空显示一个 不为空显示两个
     */
    confirm: function(value, status, callback) {
        var btnHtml = '';
        var btnOne = '<a id="btnyes" style="width:100%" href="javascript:;">确定并继续</a>';
        var btnTwo = '<a id="btnyes" href="javascript:;">确定</a><a id="btnno" href="javascript:;">取消</a>';
        btnHtml = (status == '') ? btnTwo : btnOne;
        var str = '<div id="modal" class="modal confirm" style="display:none"><div class="content"><h4>' + value + '</h4>' + btnHtml + '</div></div>';
        $('body').append(str);
        $('#modal').fadeIn('fast');
        $('#btnyes').on('click', function() {
            $('#modal').remove();
            if (typeof callback == 'function') {
                callback;
            }
            console.log('删除成功');
            return false;
        });
        $('#btnno').on('click', function() {
            $('#modal').remove();
            console.log('取消删除');
            return false;
        });
    },
};