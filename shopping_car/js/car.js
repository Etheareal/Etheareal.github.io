$(function() {
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
	$(".u-closebtn").click(function() {
		$(".dly").css("display", "none");
		$("#layer").css("display", "none");
	});
	$("#btn").click(function() {
		var str1 = $("#zh1").val();
		var str2 = $("#mm1").val();
		$(".dly").css("display", "none");
		$("#layer").css("display", "none");
		console.log(getCookie(str1));
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

	var obj = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
	console.log(obj);
	$.ajax({
		type: "get",
		url: "js/main.json",
		async: true,
		success: function(data) {
			console.log(data);
			var html4 = "";
			for(var j = 0; j < data.length; j++) {
				for(var i in obj) {
					//				console.log(i);
					//				console.log(data[j].img1);
					if(data[j].id == i) {

						var jiage = data[j].price.substring(1) * obj[i];
						//				console.log(typeof(obj[i]));
						//				console.log(jiage);
						html4 +=
							`<tr class="product">
						<td><input type="checkbox" name="chbox" class="reCheckbox" checked="checked"></td>
						<td class="textLeft">
							<div class="clearFix">
								<div class="pic">
									<a href="/script/buyer/product_dtl/product_id___1172/"><img width="95" height="95" src="${data[j].img1}" alt="${data[j].details}"></a>
								</div>
								<ul>
									<li>
										<a class="font_blue14" href="/script/buyer/product_dtl/product_id___1172/">${data[j].details}</a>
									</li>
									<li><span class="f12px">规格: 特大版</span></li>
								</ul>
							</div>
						</td>

						<td class="font_14">
							<p>${data[j].price}</p>	
						</td>
						<td>
							<p class="p_num">
								<a class="icon_y p_num_down" href="javascript:;"></a>
						<input type="text" class="product_num"  value="${obj[i]}" onkeydown="if(event.keyCode == 13) event.returnValue = false" sub_pid="3517">
								<a class="icon_y p_num_up" href="javascript:;"></a>
							</p>
							<div class="blank6 errorInfo_blank" style="display:none;"></div><span class="f12px cBrown errorInfo" style="display:none;"></span>
						</td>
						<td><span class="font_14"><p>¥ 0.00</p></span></td>
						<td><span class="sum_price font_red font_14">${jiage}</span></td>
						<td>
							<a class="delete_product font_blue14" href="#nogo" sub_pid="3517">删除</a>
						</td>
					</tr>`;
						continue;
					}
				}
			}
			$("tbody").append(html4);
			jszj();
		}
	});

	function jszj() {
		var count = 0;
		var zj = 0;
		for(var i in obj) {
			count++
			zj += Number($('.sum_price').eq(count-1).text());
			console.log($('.sum_price').eq(count-1));
		}
		$('#total_cart_num').text(count);
		$('#total_money').text(zj);
	}
})