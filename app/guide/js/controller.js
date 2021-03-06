/**
 * 渲染头部
 * @param it 页面的请求参数
 * @returns {string}
 */
function renderHeader(it /**/) {
    var out = ' <a href="javascript:history.go(-1)" class="angle left" title="返回上一页"></a><h1 class="text_hidden">' + (it.title) + '</h1><div class="search"><i class="icon"></i><input class="name" type="text" onblur=searchProductModel(this) value="" placeholder="搜索"></div><button class="icon user" title="个人中心" style="border: none;"></button> <div class="layer"><a class="link" href="index.html"><i class="icon icon-home"></i>首页</a><a class="link" href="http://i.efeiyi.com/"><i class="icon icon-center"></i>个人中心</a><i class="angle"></i><i class="side"></i></div>';
    return out;
}

function renderHomeHeader(it /**/) {
    var out = '<a href="http://www.efeiyi.com/app/index.html" class="icon logo_efeiyi" title="e飞蚁"></a><a href="http://www.efeiyi.com/app/index.html" class="icon logo" title="前门 华韵"></a><div class="search" ><i class="icon"></i><input type="text" onblur=searchProductModel(this)  class="name" value="" placeholder="搜索"></div><button class="icon user" title="个人中心" style="border:none;"></button><div class="layer"><a class="link" href="index.html"><i class="icon icon-home"></i>首页</a><a class="link" href="http://i.efeiyi.com/"><i class="icon icon-center"></i>个人中心</a><i class="angle"></i></div>';
    return out;
}

function renderLogicHeader(it /**/) {
    var out = ' <a onclick="' + it.backFunction + '" class="angle left" title="返回上一页"></a><h1 class="text_hidden">' + (it.title) + '</h1></div>';
    return out;
}

function renderFooter(it /**/) {
    var out = ' <i class="searchbg"></i><footer> <div class="bd item"><h3>战略合作伙伴</h3> <div class="bd icons"><span><a href="http://en.unesco.org/" title="联合国教科文组织"><em class="bd"><i class="icon-home icon1"></i></em>联合国教科文组织</a></span><span><a href="http://mall.efeiyi.com" title="非物质文化遗产平台"><em class="bd"><i class="icon-home icon2"></i></em>非物质文化遗产平台</a></span><span><a title="中国非物质文化遗产保护协会" href="http://chinaich.org/"><em class="bd"><i class="icon-home icon3"></i></em>中国非遗保护协会</a></span></div> </div> <div class="bd content"> <div class="bd wechat"> <div class="bd"> <div class="icon-home icon-logo"></div> </div> <div class="bd"><h4>非物质文化遗产平台</h4></div> <div class="bd img"><img style="float: none;" src="http://www.efeiyi.com/app/images/icon-home-wechat.png"></div> <div class="bd txt"><p>关注微信公众号</p> <p>领取超值代金券</p></div> </div> </div> <div class="bd copyright">京ICP备15032511号-1</div> </footer>';
    return out;
}


function logicHeader(title, backFunction) {
    var head = {};
    head.title = title;
    head.backFunction = backFunction;
    renderLogicHeader(head);
    $("[dot-template=logicHeader]").html(renderLogicHeader(head));
    $("[dot-template=logicHeader]").show();
}

//所有页面加载最先加载当前用户数据

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

$().ready(function () {
    initWx("http://www.efeiyi.com/wx/init.do");

    var $header = $("[dot-template=header]");
    $header.on("touchend", '.search', function (e) {
        var _this = $(this);
        _this.addClass('active');
        $('.searchbg').show();
        $('.searchbg').on('click', function () {
            _this.removeClass('active');
            $(this).hide();
        });
        // e.preventDefault();
    });

    //右侧菜单
    $header.on("touchend", '.icon.user', function (e) {
        var iconUser = $('.icon.user');
        var layer = $('.layer');

        if (layer.is(':hidden')) {
            iconUser.addClass('active');
            layer.show();
        } else {
            layer.hide();
            iconUser.removeClass('active');
        }
        e.preventDefault();

    });

    $(".footer").html(renderFooter());
});


function searchProductModel(element) {//  window.location.href = "localhost:63343/o2o-application/app/search.html?name=" + $(this).val();
        window.location.href = "search.html?name=" + $(element).val();
}

var Audio = function (audioBoxId, isAutoPlay) {
    this.id = audioBoxId;
    this.box = $("#" + audioBoxId);
    this.body = this.box.find("[data-type=audio-body]");
    this.button = this.box.find("[data-type=audio-button]");
    this.icon = this.box.find("[data-type=audio-icon]");
    this.status = this.body.attr("autoplay");


    if (this.status == "autoplay") {
        this.button.unbind();
        this.button.on("click", function () {
            this.stop();
        }.bind(this));
    } else {
        this.button.unbind();
        this.button.on("click", function () {
            this.play();
        }.bind(this));
    }

    this.bodyPlay = function () {
        this.body[0].play();
        this.icon.addClass("active");
        this.button.unbind();
        this.button.on("click", function () {
            this.stop();
        }.bind(this))
    };

    this.bodyStop = function () {
        this.body[0].pause();
        this.icon.removeClass("active");
        this.button.unbind();
        this.button.on("click", function () {
            this.play();
        }.bind(this))
    };

    this.play = function () {
        PageVariable.setCurrentAudio(this);
    };

    this.stop = function () {
        PageVariable.removeCurrentAudio(this);
    };

};
