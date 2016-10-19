/**
 * Created by Administrator on 2015/12/25 0025.
 */
//调用微信接口的步骤 1.获取access_token 2获得jsapi_tickit 3 生成signature 4 缓存signature 7200秒
//获取accesstoken的步骤最好在服务端做，为了安全性考虑最后js端获得的只是signatrue 其他的都在服务端做
//初始化微信参数
//需要传递的一些特殊的自定义参数在需要调用微信接口的页面中设置，参数值如下，在weixin.js之前设置该值
var wx_share_title = ""; //分享标题
var wx_share_des = "";  //分享描述
var wx_share_link = ""; //分享的链接地址
var wx_share_imgUrl = ""; //分享图片的url
var wx_share_type = "";   //分享的类型   分享类型,music、video或link，不填默认为link
var wx_share_dataUrl = ""; // 如果type是music或video，则要提供数据链接，默认为空

function initWx(initUrl) {
    var noncestr = "Wm3WZYTPz0wzccnW";
    var timestamp = new Date().getTime();
    var config = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx7f6aa253b75466dd', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: typeof wx_api_list != "undefined" ? wx_api_list : ['getLocation', 'openLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    };
    ajaxRequest(initUrl, {
        "nonceStr": noncestr,
        "timestamp": timestamp,
        "callUrl": encodeURIComponent(window.location.href.split('#')[0])
    }, function (data) {
        config.signature = data;
        wx.config(config);


        wx.ready(function () {
            //目前只提供了分享给朋友的的接口，如果需要其他的分享接口功能，再往下添加
            wx.onMenuShareAppMessage({     //发送给朋友的接口
                title: wx_share_title, // 分享标题
                desc: wx_share_des, // 分享描述
                link: wx_share_link, // 分享链接
                imgUrl: wx_share_imgUrl, // 分享图标
                type: wx_share_type, // 分享类型,music、video或link，不填默认为link
                dataUrl: wx_share_dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    ajaxRequest("http://mall.efeiyi.com/sharePage/resultProfits.do", {"userId": "${userId}"}, function (data) {
                    }, function () {
                    }, "get")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareTimeline({
                title: wx_share_title, // 分享标题
                link: wx_share_link, // 分享链接
                imgUrl: wx_share_imgUrl, // 分享图标
                success: function () {
                    ajaxRequest("http://mall.efeiyi.com/sharePage/resultProfits.do", {"userId": "${userId}"}, function (data) {
                    }, function () {
                    }, "get")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function (res) {
            alert("微信验证失败");
        });

    }, function () {
    }, "get");

}

/**
 * 打开微信地图
 * @param latitude 纬度
 * @param longitude 经度
 * @param name  位置名
 * @param address  地址详情说明
 * @param scale 地图缩放级别 默认14
 * @param infoUrl  超链接跳转地址（位置界面底部有个显示超链接的位置，点击可跳转）
 */
function openLocation(latitude, longitude, name, address, scale, infoUrl) {
    wx.openLocation({
        latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
        name: name, // 位置名
        address: address, // 地址详情说明
        scale: (typeof scale != "undefined" && scale != null) ? scale : 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
    });
}