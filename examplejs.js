$(document).ready(function() {
	ARTICLE.bcchange();
	$("#article").resizable();
	$(window).resize(ARTICLE.bcchange);
	// resizable是引入的jq插件的用法
	//浮动导航的实现
	$(window).scroll(TITLE.ftitle);
	// 		当用户滚动指定的元素时，会发生 scroll 事件。
	// scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
	// scroll() 方法触发 scroll 事件，或规定当发生 scroll 事件时运行的函数。
	// 语法
	// $(selector).scroll()

	$("#title").resizable({
		grid: [20, 20],
		// 以网格形式拉开选择器
		handles: "e",
		// 可以拉伸的方向
		container: "parent"
		// 限制大小在父容器内
	});
	// $("#condiv2").resizable({
	// 	handles: "w",
	// 	minWidth: "100",
	// 	maxWidth: "400",

	// 	resize: function() {
	// 		var ll = $(this).parent().width() - $(this).outerWidth();
	// 		var nn = $("#condiv1");
	// 		var nwidth = ll - (nn.outerWidth() - nn.width());
	// 		nn.css("width", nwidth + "px")
	// 	}
	// });
	// 介于html是以左上角定位的，此处不宜采用改变右端的div，会造成边界调节的意想不到的错误
	$("#condiv1").resizable({
		handles: "e",
		minWidth: "100",
		maxWidth: "400",

		resize: function() {
			var ll = $(this).parent().width() - $(this).outerWidth();
			// 在jQuery中，width()方法用于获得元素宽度；innerWidth()方法用于获得包括内边界（padding）的元素宽度，
			// outerWidth()方法用于获得包括内边界(padding)和边框(border)的元素宽度，
			// 如果outerWidth()方法的参数为true则外边界(margin)也会被包括进来，
			// 即获得包括外边框(margin)、内边界(padding)和边框(border)的元素宽度。
			// 同理，innerHeight方法与outerHeight方法也是用同样的方法计算相应的高度。
			var nn = $("#condiv2");
			var nwidth = ll - (nn.outerWidth() - nn.width());
			nn.css("width", nwidth + "px")
		}
	});
	$("#article").mCustomScrollbar();
	$("#mindiv2").mCustomScrollbar();
	$("#bt1").click(function() {
		$("#mindiv1>ul ul").toggle();
	});
	$('<input type="button" value="insertAfter">').insertAfter('#togglediv').css({
		'position': 'relative',
		'top': '-5px',
		'left': '5%'
	});
	$('<input type="button" value="insertBefore">').insertBefore('#togglediv').css({
		'position': 'relative',
		'top': '-5px',
		'left': '5%'
	}).click(function() {
		$("#jqnewdiv1").toggleClass('testdiv');
	});
	// 此处不能使用attr(),两个不相同，css()是和style有关，attr是获取属性，比如上面href,title，alt.
	$('<input type="button" value="prependTo">').prependTo('#togglediv').click(function() {
		$("#mindiv1").slideToggle("slow");
	});
	$('<input type="button" value="appendTo">').appendTo('#togglediv').click(function() {
		$("#togglediv p").text("hahahahahahahha");
	});
	$("#mindiv1").hover(function() {
			$(this).css({
				background: "blue"
			});
		},
		function() {
			$(this).css({
				background: "yellow"
			});
			// 注意css中添加{}后函数才能正常运行
		}
	);
	// 注意单引号与双引号不能同一种间相互嵌套
	// relative相对定位后元素仍旧占原来的位置，与之相关的定位以原位置为基础
	$("<div>", {
		id: "jqnewdiv1",
		text: "new a div with jquery! ",
		css: {
			background: "yellow",
			position: "absolute",
			top: "0px",
			left: "1900px"

		}
	}).appendTo('html').addClass('testdiv');

	$('a[href = #]').click(function() {
		$("body").animate({
				"scrollTop": 0
			},
			"slow"
		);
		return false;
	});

	$("a.img").click(function() {
		IMG.lightbox(this);
		return false;
	});
	$('#simg').hover(function() {
		$('img.hide').stop().fadeIn();
	}, function() {
		$('img.hide').fadeOut();
	});

});

var TITLE = {

	ftitle: function() {
		if (!$("#title").hasClass("fixed") && ($(window).scrollTop() > $("#title").offset().top)) {
			$("#title").addClass("fixed")
			//注意此处的fixed类的css文件中类前必须加#title以提升其权值，否则会因为类选择器权值小于id选择器而不可用
			//权重记忆口诀。从0开始，一个行内样式+1000，一个id+100，一个属性选择器/class或者伪类+10，一个元素名，或者伪元素+1
			.data("top", $("#title").offset().top);
		} else if ($("#title").hasClass("fixed") && ($(window).scrollTop() < $("#title").data("top"))) {
			$("#title").removeClass("fixed");
		}
	}
	//浮动导航的简单实现~不太好
	// function() {
	// 	$("
	// 		# main ").css({
	// 		"
	// 		top ": $(document).scrollTop(),
	// 		"
	// 		z - index ": 100
	// 	});
	// }

};

var ARTICLE = {

	bcchange: function() {
		if ($("body").width() < 900) {
			$('<link rel="stylesheet" href="s.css">').appendTo("body");
		} else {
			$('link[href="s.css"]').remove();
			//remove()方法移除被选元素，包括所有文本和子节点。
			//该方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。
			//但除了这个元素本身得以保留之外，remove()不会保留元素的jQuery数据。
			//其他的比如绑定的事件、附加的数据等都会被移除。这一点与detach()不同
		}
	}

};

var IMG = {
	lightbox: function(x) {
		$("body").css("overflow-y", "hidden");
		$("body").css("overflow-x", "hidden");
		$("<div>", {
			id: "con",
			css: {
				position: "fixed",
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				background: 'black',
				'z-index': '101',
				opacity: '0'
			}
		}).animate({

				opacity: '0.5'
			},
			'fast')
			.appendTo('body');
		$("<div>", {
			id: "imgcon",
			css: {
				position: "fixed",
				width: document.documentElement.clientWidth / 2,
				height: document.documentElement.clientHeight / 2,
				left: document.documentElement.clientWidth / 4,
				top: document.documentElement.clientHeight / 4,
				border: '2px solid yellow',
				'z-index': '101'
			}
		}).appendTo('body').hide();
		$("<img>", {
			'src': $(x).attr('href'),
			css: {
				height: '100%',
				width: '100%',
				opacity: '1' 
			}
			// load: function() {
			// 	$("#imgcon").fadeIn("slow");
			// }
			// // click: function() {

			// }
		}).appendTo("#imgcon");
		$("#imgcon").fadeIn('slow');
		$('#con,#imgcon').click(function() {
			$('#con,#imgcon').remove();
			// $(this).remove();
			$("body").css("overflow-y", "auto");
			$("body").css("overflow-x", "auto");
		});

	}
}