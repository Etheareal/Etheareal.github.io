$(function() {
	$(".text").load("header.html", function() {
		$(".nav_center").hover(function() {
			$(".nav_ul").css("display", "block");
		})
		$(".nav_ul").mouseleave(function() {
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
	$(".u-closebtn").click(function() {
		$(".dly").css("display", "none");
		$("#layer").css("display", "none");
	});
	$("#btn").click(function(){
		var str1 = $("#zh1").val();
		var str2 = $("#mm1").val();
		$(".dly").css("display","none");
		$("#layer").css("display","none");
		console.log(getCookie(str1));
	})
	$.ajax({
		type: "get",
		url: "js/main.json",
		async: true,
		success: function(data) {
			var html = "";
			console.log(data[1].img1);
			for(var i in data) {
				html +=
					"<li>" +
					"<a href='../product/product.html?id="+data[i].id+"'>" +
					"<img src='" + data[i].img1 + "'>" +
					"<span class='goods_name'>" + data[i].details + "</span>" +
					"<span class='goods_cost'>" + "商城价&nbsp;" + data[i].price + "</span>" +
					"</a>" +
					"</li>"

			}
			$(".goods_list").append(html);
		}
	});
	$.ajax({
		type: "get",
		url: "js/aside1.json",
		async: true,
		success: function(data) {
			console.log(data);
			var html2 = "";
			for(var i in data) {
				html2 +=
					"<li>" +
					"<a href='../product/product.html?id="+data[i].id+"'>" +
					"<span class='hot_icons'></span>" +
					"<img src='" + data[i].img1 + "'>" +
					"<div class='hot_name'>" +
					data[i].details + "<br>" +
					"<span class='goods_cost'>" + "商城价&nbsp;" + data[i].price + "</span>" +
					"</div>" +
					"</a>" +
					"</li>"

			}

			$(".aside_hot ul").append(html2);
		}

	});
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

})