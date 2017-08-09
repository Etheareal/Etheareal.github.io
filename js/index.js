$(function() {
	//头部引用
	$(".text").load("common/header.html", function() {
		$(".dldl").click(function() {
			$(".dly").css("display", "block");
			$("#layer").css("display", "block");
			console.log(1);
		});
		//何时出现按钮
	});
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if(scroll > 350) {
			$(".top").css("display", "block");
		} else {
			$(".top").css("display", "none");
		}
	});
	//页面向上按钮
	$(".top").click(function() {
		$("html,body").animate({
			"scrollTop": 0
		}, 400)
	});
	//关闭登录页面
	$(".u-closebtn").click(function() {
		$(".dly").css("display", "none");
		$("#layer").css("display", "none");
	});
	//登录调取数据
	$("#btn").click(function() {
		var str1 = $("#zh1").val();
		var str2 = $("#mm1").val();
		$(".dly").css("display", "none");
		$("#layer").css("display", "none");

//				if(getCookie(str1) == ($("#mm1").val())) {
//					$(".dly").css("display", "none");
//					$("#layer").css("display", "none");
//				}
		console.log(str1);
		console.log(getCookie(str1));
	})
	//轮播图
	$("#sliderBox").slider({
		showNav: true,
		showBtns: true
	});
	//商品列表	
	$('.tab_name li').hover(function() {
		var i = $(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$(this).parent().next().find("ul").eq(i).removeClass("dn").siblings().addClass("dn");
	})
	//json调用
	$.ajax({
		type: "get",
		url: "js/index.json",
		async: true,
		success: function(data) {
			var html = "";
			console.log(data[1].img1);
			for(var i in data) {
				html +=
					"<li>" +
					"<a href='product/product.html?id=" + data[i].id + "'>" +
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
					"<a href='product/product.html?id=" + data[i].id + "'>" +
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
	$.get("js/main.json", function(data) {
		for(var i in data) {
			if(data[i].id === id) {
				$("#bt").text(data[i]["details"]);
				$(".gs_title").text(data[i]["details"]);
				$(".product_cost_num").text(data[i]["price"]);
				$("#big_img").attr('src', data[i]['img1']);
			}
		}
	})
});

//轮播图
(function($, undefined) {
	$.fn.slider = function(opts) {
		var defaults = {
			width: 900,
			height: 301,
			direction: "left",
			interval: 3000,
			showNav: false,
			showBtns: false
		};
		var options = $.extend(true, {}, defaults, opts);

		function Slider(options) {
			this.ele = $("#sliderBox");
			this.lists = $("#sliderList");
			this.nav = $("#sliderNav");
			this.btns = $("#sliderBtns");
			this.lists.find("li").eq(0).clone(true).appendTo(this.lists);
			this.list = this.lists.find("li");
			this.ele.css({
				"width": options.width,
				"height": options.height
			});
			this.list.css({
				"width": options.width,
				"height": options.height
			});
			this.list.find("img").css({
				"width": options.width,
				"height": options.height
			});
			this.btns.find(".btn").css("top", ((options.height / 2) - 20));

			switch(options.direction) {
				case "top":
					this.topBottom();
					break;
				default:
					this.leftRight();
			}
			if(options.showNav) {
				this.nav.show();
			}
			if(options.showBtns) {
				this.btns.show();
			}
		}
		Slider.prototype.leftRight = function() {
			this.lists.css({
				"width": options.width * this.list.length,
				"height": options.height
			});
			this.list.css("float", "left");
			this.timer = setInterval(move, options.interval);
			var _this = this;
			var index = 0;

			function move() {
				index++;
				if(index == _this.list.length) {
					index = 1;
					_this.lists.css("left", 0);
				}
				if(index == _this.list.length - 1) {
					_this.nav.find("li").eq(0).addClass("hover").siblings().removeClass("hover");

				} else {
					_this.nav.find("li").eq(index).addClass("hover").siblings().removeClass("hover");
				}
				_this.lists.stop().animate({
					"left": -index * options.width
				}, 1000, function() {

				});

			}

			this.nav.find("li").hover(function() {
				clearInterval(_this.timer);
				index = $(this).index() - 1;
				move();
			}, function() {
				_this.timer = setInterval(move, 3000);
			});

			//						this.btns.find(".btn").eq(1).click(function(){
			//							clearInterval(_this.timer);
			//							move();
			//							_this.timer = setInterval(move,3000);
			//						})
			//						this.btns.find(".btn").eq(0).click(function(){
			//							clearInterval(_this.timer);
			//							console.log(index);
			//							if(index==0){
			//								index = _this.list.length-3;
			//								_this.lists.css("left",(-(_this.list.length-1))*options.width);
			//							}else{
			//								index = index -2;
			//							}
			//							move();
			//							_this.timer = setInterval(move,3000);
			//						})

		}
		Slider.prototype.topBottom = function() {

		}

		new Slider(options);
		return this;
	}

})(jQuery);

function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split("=");
		if(arr1[0] == name) {
			return arr1[1];
		}
	}

}

function setCookie(name, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}

function removeCookie(name) {
	//删除cookie，把生命期设为过期时间
	setCookie(name, 1, -1);
}