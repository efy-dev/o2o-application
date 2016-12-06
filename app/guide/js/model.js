// var api_url = '';
var api_url = 'http://192.168.1.10';
// var api_url = 'http://192.168.1.72';
var PageVariable = {
    template: {
        homeRecommendList: "home-recommend-list",
        tenantBase: "tenant-base",
        tenantPraise: "tenant-praise",
        tenantProductList: "tenant-product-list",
        tenantPanelList: "tenant-panel-list",
        productBase: "product-base",
        productDetail: "product-detail",
        productBuy: "product-buy",
        productList: "product-list",
        tenantList: "tenant-list",
        tenantAudioList: "tenant-audio-list",
        panelBase: "panel-base",
        tenantAppointment: "tenant-appointment",
        purchaseProduct: "purchase-product",
        purchaseOrder: "purchase-order",
        purchasePay: "purchase-pay",
    },
    service: {
        login: "/wx/login",
        listProductModel: api_url + "/product/getProductModelList",
        listTenant: api_url + "/tenant/getTenantList",
        listRecommend: api_url + "/tenant/getRecommendList",
        viewTenantById: api_url + "/tenant/getTenantById",
        listTenantPraise: api_url + "/tenant/getTenantPraiseListByTenant",
        saveTenantPraise: api_url + "/tenant/saveTenantPraise",
        listTenantPanel: api_url + "/tenant/getImageTextListByTenant",
        viewProductModelById: api_url + "/product/getProductModelById",
        listProductModelPanel: api_url + "/product/getColumnListByProductModel",
        currentUser: api_url + "/user/getCurrentUser",
        panelById: api_url + "/tenant/getPanelById",
        saveUserOrder: api_url + "/tenant/saveUserOrder",  //提交预约信息
        getOrderById: api_url + "/tenant/getOrderById",  //获取预约信息
        hasArtistry: api_url + "/project/hasArtistry",
        createNewOrder: api_url + "/order/createNewOrder",
        hasAuthenticated: api_url + "/hasAuthenticated",
        getPurchaseOrderById: api_url + "/order/getPurchaseOrderById"
    },

    currentUser: null,
    userId: "",
    tenant: {},
    productModelList: [],
    tenantColumnList: [],
    tenantPraiseList: [],
    productModel: {},
    productModelColumnList: [],
    tenantList: [],
    master: {},
    project: {},
    imageTextList: [],
    imageText: {},
    recommendList: [],
    panelList: {},  //店铺实景
    appointment: {},
    imageStyle: {},
    currentAudio: null,
    audioList: [],

    setCurrentAudio: function (audio) {
        if (PageVariable.currentAudio != null) {
            PageVariable.currentAudio.bodyStop();
        }
        PageVariable.currentAudio = audio;
        PageVariable.currentAudio.bodyPlay();
    }
    ,

    removeCurrentAudio: function (audio) {
        if (PageVariable.currentAudio == null) {
            audio.bodyStop();
        } else if (audio.id == PageVariable.currentAudio.id) {
            PageVariable.currentAudio.bodyStop();
            PageVariable.currentAudio = null;
        }
    }
};

function getTenantById(id, callback) {
    var success = function (data) {
        PageVariable.tenant = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.viewTenantById, requestParam, success);
}

//@TODO
function getColumnListByTenant(id) {

}

function getCurrentUser(callback) {
    var success = function (data) {
        PageVariable.currentUser = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    ajaxRequest(PageVariable.service.currentUser, {}, success);
}


function getTenantPraiseListByTenant(id, callback) {
    var success = function (data) {
        PageVariable.tenantPraiseList = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.listTenantPraise, requestParam, success);
}


function saveTenantPraise(tenantId, delFlag, callback) {
    var success = function (data) {
        if (typeof data.id != "undefined") {
            if (delFlag == 0) {
                PageVariable.tenantPraiseList.push(data);
            } else if (delFlag == 1) {
                for (var i = 0; i < PageVariable.tenantPraiseList.length; i++) {
                    var praise = PageVariable.tenantPraiseList[i];
                    if (data.id == praise.id) {
                        PageVariable.tenantPraiseList.splice(i);
                    }
                }
            }
        }

        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.tenantId = tenantId;
    requestParam.delFlag = delFlag;
    ajaxRequest(PageVariable.service.saveTenantPraise, requestParam, success);

}


function getProductModelById(id, callback) {
    var success = function (data) {
        PageVariable.productModel = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.viewProductModelById, requestParam, success);
}

function getColumnListByProductModel(id, callback) {
    var success = function (data) {
        PageVariable.productModelColumnList = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.listProductModelPanel, requestParam, success);
}

function getTenantList(param, limit, offset, callback) {
    var success = function (data) {
        PageVariable.tenantList = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.param = param;
    requestParam.limit = limit;
    requestParam.offset = offset;
    ajaxRequest(PageVariable.service.listTenant, requestParam, success);
}

function getProductModelList(param, limit, offset, callback) {
    var success = function (data) {
        PageVariable.productModelList = data;
        if (typeof callback == "function") {
            callback();
            swiperContaniner('[dot-template=tenant-product-list]');
        }
    };
    var requestParam = {};
    requestParam.param = param;
    requestParam.limit = limit;
    requestParam.offset = offset;
    ajaxRequest(PageVariable.service.listProductModel, requestParam, success);
}

function getImageTextListByTenant(id, callback) {
    var success = function (data) {
        PageVariable.imageTextList = data;
        if (typeof callback == "function") {
            callback();
            swiperContaniner('[dot-template=tenant-panel-list]');
        }
    };
    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.listTenantPanel, requestParam, success);
}

//@TODO
function getImageTextById(id) {

}

function getRecommendList(param, limit, offset, callback) {
    var success = function (data) {
        PageVariable.recommendList = data;
        if (typeof callback == "function") {
            callback();
            swiperContaniner('.swiper-container');
        }
    };
    var requestParam = {};
    requestParam.param = param;
    requestParam.limit = limit;
    requestParam.offset = offset;
    ajaxRequest(PageVariable.service.listRecommend, requestParam, success);
}

/**
 * @param 店铺实景
 * @param callback
 */
function getPanelById(id, callback) {
    var success = function (data) {
        PageVariable.panelList = data;
        if (typeof callback == "function") {
            callback();
            swiperContaniner('.swiper-container');
        }
    };

    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.panelById, requestParam, success);
}


/**
 * @param 店铺预约
 * @param callback
 */
function getOrderById(id, callback) {
    var success = function (data) {
        PageVariable.appointment = data;
        if (typeof callback == "function") {
            callback();
        }
    };
    var requestParam = {};
    requestParam.id = id;
    ajaxRequest(PageVariable.service.getOrderById, requestParam, success);
}


function hasArtistry(projectId, callback) {
    var success = function (data) {
        PageVariable.hasArtistry = data;
        callback();
    };
    var requestParam = {};
    requestParam.projectId = projectId;
    ajaxRequest(PageVariable.service.hasArtistry, requestParam, success);
}


function createNewOrder(productList, tenantId, callback) {
    var success = function (data) {
        PageVariable.purchaseOrderId = data.orderId;
        callback();
    };
    var requestParam = {};
    requestParam.productList = productList;
    requestParam.tenantId = tenantId;
    ajaxRequest(PageVariable.service.createNewOrder, requestParam, success);
}


function getPurchaseOrderById(id, callback) {
    var success = function (data) {
        PageVariable.purchaseOrder = data.purchaseOrder;
        PageVariable.productList = data.productList;
        callback();
    };
    var requestParam = {};
    requestParam.purchaseOrderId = id;
    ajaxRequest(PageVariable.service.getPurchaseOrderById, requestParam, success);
}


function authenticationFilter(filterMappingFunction, failFunction) {
    var success = function (data) {
        PageVariable.hasAuthenticated = data.hasAuthenticated;
        if (PageVariable.hasAuthenticated) {
            filterMappingFunction();
        } else {
            failFunction();
        }
    };
    ajaxRequest(PageVariable.service.hasAuthenticated, {}, success);
}

getCurrentUser();
