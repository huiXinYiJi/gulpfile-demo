$(function(){
	//提交申请 弹窗打开
	$("#subQA").click(function(){
		$(".fade").show(500);
		$("#submitRequest").show(500);
	});
	//关闭弹窗
	$("[data-act='closePop']").click(function(){
		$(this).parents(".popup").hide(500);
		$(".fade").hide(500);
	});
	
});