var mTitle = null;
var title;
var con;
var link;
var nav_first;
var nav_second;
var iframe;
var iframe_refresh;
var tmp = null;

function initWindow(){
	var height = $(document).height();
	var width = $(document).width();
	$("#wrap").css("height",height - 50);
	$("#right").css("width",width - 210);
	$("#iframe").css("height",height - 90);
}

$(document).ready(function(){
	initWindow();

	mTitle = null;
	title = $('.sidebar .title');
	con = $('.title > ul');
	link = $(".in-sidebar li a");
	nav_first = $("#nav_first");
	nav_second = $("#nav_second");
	iframe = $("#iframe");
	iframe_refresh = $("#iframe_refresh");

	iframe_refresh.attr("src","../css/img/refresh.png")


	$("#header_user").mouseover(function(){
		$("#header_menu").show();
	});

	$("#header_user").mouseout(function(){
		$("#header_menu").hide();
	});


	iframe_refresh.click(function(){
		refresh();
	});


	title.click(function(){
		var t = $(this).find("span").eq(1).text();

		if(mTitle == null){
			mTitle = t;
		}else{
			if(mTitle == t){
				return ;
			}
		}

		$(tmp).children('ul').slideUp().end().children('.arrow').removeClass('arrow-up');
		$(this).children('ul').slideToggle().end().children('.arrow').addClass('arrow-up');
		
		tmp = this;

		mTitle = t;
		nav_first.text(mTitle);
		nav_second.text("").attr("src","#");
	});

	con.click(function(){
		return false;  // 阻止事件冒泡
	});

	link.click(function(){
		var link = $(this).text();
		var src = $(this).attr("data-url");
		nav_second.attr("src","#").text(link);
		iframe.attr("src",src);
	});

	$(window).resize(function() {
	  initWindow();
	});
});

//=========================================
//=====菜单相关的操作======================
function open(url){
	iframe.attr("src",url);
}

function refresh(){
	var src = iframe.attr("src");
	open(src);
}


