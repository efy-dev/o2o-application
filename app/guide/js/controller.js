/**
 * 渲染头部
 * @param it 页面的请求参数
 * @returns {string}
 */
function renderHeader(it /**/) {
    var out = ' <a href="javascript:history.go(-1)" class="angle left" title="返回上一页"></a> <h1 class="text_hidden">' + (it.title) + '</h1><button class="icon user" title="个人中心" style="border: none;"></button> <div class="layer"><a class="link" href="/app/index.html"><i class="icon icon-home"></i>首页</a><a class="link" href="http://i.efeiyi.com/"><i class="icon icon-center"></i>个人中心</a><i class="angle"></i></div>';
    return out;
}

function renderHomeHeader(it /**/) {
    var out = ' <a href="http://www.efeiyi.com/app/index.html" class="icon logo" title="前门 华韵"></a> <button class="icon user" title="个人中心" style="border: none;" ></button> <div class="layer"> <a class="link" href="/app/index.html"><i class="icon icon-home"></i>首页</a> <a class="link" href="http://i.efeiyi.com/"><i class="icon icon-center"></i>个人中心</a> <i class="angle"></i> </div>';
    return out;
}

function renderFooter(it /**/) {
    var out = ' <footer> <div class="bd item"><h3>战略合作伙伴</h3> <div class="bd icons"><span><a href="http://en.unesco.org/" title="联合国教科文组织"><em class="bd"><i class="icon-home icon1"></i></em>联合国教科文组织</a></span><span><a href="http://mall.efeiyi.com" title="非物质文化遗产平台"><em class="bd"><i class="icon-home icon2"></i></em>非物质文化遗产平台</a></span><span><a title="中国非物质文化遗产保护协会"><em class="bd"><i class="icon-home icon3"></i></em>中国非遗保护协会</a></span></div> </div> <div class="bd content"> <div class="bd wechat"> <div class="bd"> <div class="icon-home icon-logo"></div> </div> <div class="bd"><h4>非物质文化遗产平台</h4></div> <div class="bd img"><img src="/app/images/icon-home-wechat.png"></div> <div class="bd txt"><p>关注微信公众号</p> <p>领取超值代金券</p></div> </div> </div> <div class="bd copyright">京ICP备15032511号-1</div> </footer>';
    return out;
}

//所有页面加载最先加载当前用户数据


$().ready(function () {
    initWx("http://www.efeiyi.com/wx/init.do");

    $("[dot-template=header]").on("click", ".icon.user", function () {
        $(".layer").slideToggle(50, function () {
            if ($(".icon.user").hasClass("active")) {
                $(".icon.user").removeClass("active")
            } else {
                $(".icon.user").addClass("active");
            }
        });
    })

    $(".footer").html(renderFooter());
});

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
