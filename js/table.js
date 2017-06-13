/**
2016-11-30  By繁华
**/
var prePage = "&laquo;";
var nextPage = "&raquo;";
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage">'+ prePage +'</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">'+ prePage +'</span>');
				}
				//中间页码    可不要
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				
				//可不要
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage">'+ nextPage +'</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">'+ nextPage +'</span>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);



//加入自动获取表数据分页码
var page_name = "page";
var page_limit = 10;//分页显示的数据条数  与后台数据需保持一致
var page_count = 0;//数据页数   
var pager;//分页对象
var table_data;
var toolbar_onclick;//是否自动注册工具条按钮事件
var loading;
var header;
var data_name;
var data_name_index;
var data_function_index;
var data_html;
var page = 1;
var data_count;
var api_url;
var all_check = false;
var data;//表格数据
var url;
var data_extra_param;

table_data = $("#table_data");
header = $("#table_header");
loading = $("#table_loading");
pager = $("#pager");


table_data.attr("cellspacing",0);
url = table_data.attr("data-url");
toolbar_onclick = table_data.attr("data-toolbar-onclick");
data_extra_param = table_data.attr("data-extra-param");

data_name = new Array();
data_function = new Array();
data_name_index = 0;
data_function_index = 0;
data_count = 0;


//立即加载
if(typeof(url) != "undefined"){ 
	Table(url,data_extra_param);
} 


//隐藏分页
function HiddenPager(){
	pager.hide();
}

/*
*
*如果您要使用自动注册工具条按钮的事件。请在table.js引入后复写ToolBarOnClick(int index)方法。
*/
function ToolBarOnClick(index){
	alert("请复写ToolBarOnClick(int index);");
}


$("#table_toolbar button").click(function(){
	if(typeof(toolbar_onclick)  != "undefined" && toolbar_onclick == "true"){
		var index = $(this).index();
		ToolBarOnClick(index);
	}
});


//清空表数据
function clearTable(){
	var d = $("#table_data tr");
	var index = 0;

	d.each(function(){
		index++;

		if(index != 1){
			$(this).remove();
		}
	});
	data_name_index = 0;
	data_function_index = 0;
}


//刷新表 当我们清空表 或者删除数据后需要从新加载一次数据
function refreshTable(){
	//初始化分页
	loading.show().text("正在刷新数据..");
	data_html = "";
	data_count = data.length;

	if(data_count < page_limit && page == 1){
		pager.hide();
	}else{
		pager.show();
	}

	if(data_count == 0){
		loading.show().text("没有任何数据");
	}else{
		var th = header.find("th");

		th.each(function(){
			data_name[data_name_index] = $(this).attr("data-name");


			//设置表格的Width大小
			var data_width = $(this).attr("data-width");
			if(typeof(data_width) != "undefined"){
				$(this).attr("width",data_width);
			}
			
			if(data_name[data_name_index] == "checkbox"){
				$(this).attr("width",50);//如果是复选框就默认大小
				$(this).html("<input type='checkbox' id='parent_checkbox' />");
			}

			data_name_index++;
			data_function[data_function_index] = $(this).attr("data-function");
			data_function_index++;
			
			
		});
		
		var item;
		for(var i = 0;i<data.length;i++){
			data_html += "<tr>";
			for(var j = 0;j<data_name_index;j++){

				if(data_name[j] == "checkbox"){
					data_html += "<td><input type='checkbox' class='child_checkbox' data-index='"+ i +"' /></td>";
					continue;
				}

				item = data[i][data_name[j]];

				if(typeof(item) == "undefined")
					item = " - ";

				if(typeof(data_function[j]) == "undefined"){
					data_html += "<td>"+ item +"</td>";
				}else{
					data_html += "<td>"+ eval(data_function[j] + "('"+ item +"');") +"</td>";
				}
			}
			data_html += "</tr>";
			data[i]["index"] = i;
		}
		
		table_data.append(data_html);
		loading.hide();
	}
}

//更新表
function updateTable(){
	clearTable();
	Table(url,data_extra_param);
}


//解析接口json数据 并刷新表
function Table(url,data_extra_param){
	if(typeof(data_extra_param) !="undefined" && data_extra_param.length !=0){
		data_extra_param = "&" + data_extra_param;
	}else{
		data_extra_param = "&data_extra_param=null";
	}

	api_url = url;
	loading.show().text("正在加载数据..");
	$.getJSON(url+"?limit="+ page_limit +"&"+ page_name +"="+page+"&random="+Math.random()+data_extra_param,function(json,status){
		data = json["rows"];
		page_count = json["total"];

		//初始化分页控件
		if(data_count == 0){
			 $("#pager").createPage({  
				pageCount:page_count,//总页数  
				current:page,//当前页  
				backFn:function(p){ 
					page = p;
					clearTable();
					Table(url,data_extra_param);
				}  
			});
		}
		refreshTable();
	});
}

//全选
$("#table_header th:eq(0)").click(function(){
	var t = $(this).attr("data-name");

	if(t == "checkbox"){
		var parent = $("#parent_checkbox");
		var child = $(".child_checkbox");
		
		if(parent.prop("checked")){
			all_check = false;
		}else{
			all_check = true;
		}

		if(all_check){
			child.removeAttr("checked");
			all_check = false;
		}else{
			child.attr("checked","true");
			all_check = true;
		}	
	}
});

//获取表格选中数据
function getSelectedTableData(){
	var row_data = Array();
	var row_data_index = 0;
	$(".child_checkbox:checked").each(function(){
		var index = $(this).attr("data-index");
		row_data[row_data_index] = data[index];
		row_data_index++;
	});
	return row_data;
}

//取出选中json对像中某个字段 返回 数组或 数组字符串
function getSelectedTableField(data,field,flag){
	var data_out = Array();

	for(var i = 0;i<data.length;i++){
		data_out[i] = data[i][field];
	}

	if(flag)
		return data_out.join();
	else
		return data_out;
}

//删除表中数据
function removeSelectedTableData(d){
	if(d.length > 0){
		clearTable();
		Table(api_url,data_extra_param);
	}
}

