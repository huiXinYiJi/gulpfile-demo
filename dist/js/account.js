"use strict";

$(function () {
	//修改密码 弹窗打开
	$("[data-click='modifyPwd']").click(function () {
		$(".fade").show(500);
		$("#modifyPwd").show(500);
	});

	//谷歌验证 弹窗打开
	$("[data-click='googleVerify']").click(function () {
		$(".fade").show(500);
		$("#googleVerify").show(500);
	});

	//关闭弹窗
	$("[data-act='closePop']").click(function () {
		$(this).parents(".popup").hide(500);
		$(".fade").hide(500);
	});
});