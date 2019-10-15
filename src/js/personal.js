$(function(){
	//已登录状态验证进入个人中心
	// 导航登录注册隐藏，显示用户名
	$('[data-log="unLogin"]').hide().siblings('[data-log="logined"]').removeClass("hide");


	//点击充值 打开弹窗
	$('[data-act="charge"]').click(function(){
		//TODO加载数据
		//打开弹窗
		$(".fade").show(500);
		$("#chongzhi").show(500);
	});

	//点击提现 打开弹窗
	$('[data-act="transmoney"]').click(function(){
		//TODO加载数据
		//打开弹窗
		$(".fade").show(500);
		$("#tixian").show(500);
	});

	//提现弹窗--提现卡号 显示
	$('[data-act="showDropList"]').click(function(){
		var opaVal=parseInt($("#addrList").css("opacity"));
		if(opaVal){
			$("#dropIcon").css("backgroundImage","url(./../img/dropdown.png)");
			$("#addrList").css("opacity",0).hide(500);
		}else{
			$("#dropIcon").css("backgroundImage","url(./../img/dropup.png)");
			$("#addrList").css("opacity",1).show(500);
		}
	});

	//关闭弹窗
	$("[data-act='closePop']").click(function(){
		$(this).parents(".popup").hide(500);
		$(".fade").hide(500);
	});
	
});