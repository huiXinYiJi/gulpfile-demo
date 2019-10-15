'use strict';

//生成警告框
//mode为空，即只有一个确认按钮，mode为1时有确认和取消两个按钮
function alertMsg(msg, mode) {
    msg = msg || '';
    mode = mode || 0;
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    var isIe = document.all ? true : false;
    var isIE6 = isIe && !window.XMLHttpRequest;
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var winSize = function () {
        var xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;
        // innerHeight获取的是可视窗口的高度，IE不支持此属性
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = document.body.scrollWidth;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) {
            // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else {
            // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        if (self.innerHeight) {
            // all except Explorer
            windowWidth = self.innerWidth;
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) {
            // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = windowWidth;
        } else {
            pageWidth = xScroll;
        }

        return {
            'pageWidth': pageWidth,
            'pageHeight': pageHeight,
            'windowWidth': windowWidth,
            'windowHeight': windowHeight
        };
    }();
    //遮罩层
    var styleStr = 'top:0;left:0;position:absolute;z-index:10000;background:rgba(0,0,0,.6);width:' + winSize.pageWidth + 'px;height:' + (winSize.pageHeight + 30) + 'px;';
    var shadowDiv = document.createElement('div'); //添加阴影DIV
    shadowDiv.style.cssText = styleStr; //添加样式
    shadowDiv.id = "shadowDiv";
    //如果是IE6则创建IFRAME遮罩SELECT
    if (isIE6) {
        var maskIframe = document.createElement('iframe');
        maskIframe.style.cssText = 'width:' + winSize.pageWidth + 'px;height:' + (winSize.pageHeight + 30) + 'px;position:absolute;visibility:inherit;z-index:-1;filter:alpha(opacity=0);';
        maskIframe.frameborder = 0;
        maskIframe.src = "about:blank";
        shadowDiv.appendChild(maskIframe);
    }
    document.body.insertBefore(shadowDiv, document.body.firstChild); //遮罩层加入文档

    //弹出框
    // var styleStr1 = 'display:block;position:fixed;_position:absolute;left:' + (winSize.windowWidth / 2 - 200) + 'px;top:' + (winSize.windowHeight / 2 - 150) + 'px;_top:' + (winSize.windowHeight / 2 + top - 150)+ 'px;'; //弹出框的位置
    var styleStr1 = 'display:block;position:fixed;_position:absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);';
    var alertBox = document.createElement('div');
    alertBox.id = 'alertMsg';
    alertBox.style.cssText = styleStr1;
    //创建弹出框里面的内容P标签
    var alertMsg_info = document.createElement('P');
    alertMsg_info.id = 'alertMsg_info';
    alertMsg_info.innerHTML = msg;
    alertBox.appendChild(alertMsg_info);
    //创建按钮
    var btn1 = document.createElement('a');
    btn1.id = 'alertMsg_btn1';
    btn1.href = 'javascript:void(0)';
    btn1.innerHTML = '<cite>确定</cite>';
    btn1.onclick = function () {
        document.body.removeChild(alertBox);
        document.body.removeChild(shadowDiv);
        return true;
    };

    alertBox.appendChild(btn1);
    if (mode === 1) {
        var btn2 = document.createElement('a');
        btn2.id = 'alertMsg_btn2';
        btn2.href = 'javascript:void(0)';
        btn2.innerHTML = '<cite>取消</cite>';
        btn2.onclick = function () {
            document.body.removeChild(alertBox);
            document.body.removeChild(shadowDiv);
            return false;
        };
        //设置确定 取消按钮 样式
        btn1.style.cssText = 'left: 10%;transform:translateX(0)';
        alertBox.appendChild(btn2);
    }
    document.body.appendChild(alertBox);
};

//判断是否手机端
var isMobile = false; //全局变量 默认为PC false
browserRedirect();
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        console.log("移动");
        isMobile = true;
    } else {
        console.log("pc");
        isMobile = false;
    }
}

$(function () {
    //点击导航用户名 显示侧边导航栏
    $("#userInfo").click(function () {
        var navRight = parseInt($("#rightNav").css("right"));
        var navWidth = $("#rightNav").width();
        if (navRight < 0) {
            $("#rightNav").css("right", 0);
        } else {
            $("#rightNav").css("right", -navWidth);
        }
    });

    //语种切换
    $("#navList").mouseenter(function () {
        $("#langList").show(500);
    }).mouseleave(function () {
        $("#langList").hide(500);
    });

    // 标签页切换
    $("[data-tab]").on("click", function () {
        var elem = $(this).data("tab");
        $(this).addClass("active").siblings().removeClass("active");
        $("[data-show='" + elem + "']").removeClass("hide").siblings().addClass("hide");
    });

    //mobile端 自定义下拉框  显示效果
    $(".self-select").on("click", '[data-select="selected"]', function () {
        $(this).find('[data-icon="drop"]').toggleClass("icon-up"); //小三角切换
        $(this).siblings('[data-select="ul"]').toggleClass("hide");
    });
    //下拉框选择列表项
    $('.self-select').on("click", '[data-select="option"]', function () {
        var optionVal = $(this).data("val");
        var optionText = $(this).data("text");
        var selfSelect = $(this).parents('.self-select');
        selfSelect.find('[data-selectval]').attr("data-selectval", optionVal).text(optionText);
        selfSelect.find('[data-select="ul"]').addClass("hide"); //隐藏下拉框
        selfSelect.find('[data-icon="drop"]').removeClass("icon-up"); //小三角切换
        //根据下拉框选择的值显示对应div元素
        $('[data-showopt]').each(function (i) {
            var showoptVal = $(this).data("showopt");
            if (showoptVal == optionVal) {
                $(this).removeClass("hide");
            } else {
                $(this).addClass("hide");
            }
        });
    });
});