$(function() {
	var str = location.search;
	var id = str.split('=')[1]
	console.log(id);
	$(".text").load("header.html", function() {
		$(".nav_center").mouseenter(function() {
			$(this).children().eq(1).css("display", "block");
		})
		$(".nav_center").mouseleave(function() {
			$(".nav_ul").css("display", "none");

		})
		$(".dldl").click(function() {
			$(".dly").css("display", "block");
			$("#layer").css("display", "block");
			console.log(1);
		});
	});

	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if(scroll > 350) {
			$(".top").css("display", "block");
		} else {
			$(".top").css("display", "none");
		}
	});

	$(".top").click(function() {
		$("html,body").animate({
			"scrollTop": 0
		}, 400)
	});
	//关闭登录页面
	$(".u-closebtn").click(function(){
		$(".dly").css("display","none");
		$("#layer").css("display","none");
	});
	$("#btn").click(function(){
		var str1 = $("#zh1").val();
		var str2 = $("#mm1").val();
		$(".dly").css("display","none");
		$("#layer").css("display","none");
		console.log(getCookie(str1));
	})

	$(".p_label li").click(function() {
		$(this).addClass("pl_active").siblings().removeClass("pl_active");
	});

	$("#img_show_small li").each(function() {
		$(this).click(function() {
			$("#big_img").attr("src", $(this).find("img").attr("src"));
			$(this).addClass("bkys").siblings().removeClass("bkys");
		})
	})

	$.ajax({
		type: "get",
		url: "js/list.json",
		async: true,
		success: function(data) {
			console.log(data);
			var html3 = "";
			for(var i in data) {
				html3 +=
					"<li class='sg'></li>" +
					"<li>" +
					"<a href=''>" +
					data[i].list +
					"</a>" +
					"</li>"
			}

			$(".nav_ul li ul").append(html3);
		}

	});
	$.get("js/main.json",function(data){
		for(var i in data){
			if(data[i].id===id){
				$("#bt").text(data[i]["details"]);
				$(".gs_title").text(data[i]["details"]) ; 
				$(".product_cost_num").text(data[i]["price"]); 
				$("#big_img").attr('src',data[i]['img1']);
			}
		}
	})
})