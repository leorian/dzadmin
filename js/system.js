var DocumentHeight = null;//获取文档的高度
var DocumentWidth = null;//获取文档的宽度

//预加载文件
$(document).ready(function(){
    DocumentHeight = $(document).height();
    DocumentWidth = $(document).width();
	 $('#top').click(function(){
           backTop();
	 });

	 $("#back").click(function(){
		back(-1);
	 });

	 $(".window_close").click(function(){
		CloseWindow();
	 });
});
//当前浏览器类型
  function browser() {
      var type = "";
      if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
          type = 'I';
      } else if (navigator.userAgent.indexOf('Firefox') >= 0) {
          type = 'F';
      } else if (navigator.userAgent.indexOf('Opera') >= 0) {
          type = 'O';
      } else {
          type = 'C';
      }
      return type;
  }
//=======================
//分界线
//=======================

//自己定义获取js对象
   function $$(id){
  	  var tag = id.substr(0,1);
		if(tag=="#"){
		    return document.getElementById(id.substring(1));
		}else if(tag=="."){
            return document.getElementsByClassName(id.substring(1));
		}else{
            return document.getElementsByTagName(id);
		}
}
//=================================
			
//收藏栏
   function addToFavorite(){    
		   var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
    try{
        if (document.all) { //IE类浏览器
            try {
                window.external.toString(); //360浏览器不支持window.external，无法收藏
                window.alert("国内开发的360浏览器等不支持主动加入收藏。\n您可以尝试通过浏览器菜单栏 或快捷键 ctrl+D 试试。");
            }
            catch (e){
                try{
                    window.external.addFavorite(window.location, document.title);
                }
                catch (e){
                    window.external.addToFavoritesBar(window.location, document.title);  //IE8
                }
            }
        }
        else if (window.sidebar) { //firfox等浏览器
            window.sidebar.addPanel(document.title, window.location, "");
        }
        else {
            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~');
        }
    }
    catch (e){
        window.alert("添加收藏失败,Ctrl+D加入收藏夹");
    }
}

//jb51.net函数
   function doCopy2(id){
    if(document.all){
    textRange=$$(id).createTextRange();textRange.execCommand("Copy");
      alert("\u590d\u5236\u6210\u529f")
   }else{
    alert("\u6b64\u529f\u80fd\u53ea\u80fd\u5728IE\u4e0a\u6709\u6548")
   }
}

//是否是IE浏览器
function isIE(){
	if(window.navigator.userAgent.indexOf("MSIE")>=1){
		return true
	} else{
		return false
	}
}

//====================
//优先加载
//====================
function position(elem,l,t){
	var isIE6 = !-[1,] && !window.XMLHttpRequest;
	if(isIE6){
		var style = elem.style,
		dom  = '(document.documentElement)',
        left = l - document.documentElement.scrollLeft,
        top  = t - document.documentElement.scrollTop;
		style.position = 'absolute';
		style.removeExpression('left');
		style.removeExpression('top');
		style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + left + ') + "px"');
		style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + top + ') + "px"');
	}else{
		elem.style.position = 'fixed';
	}
}		
function InfoAlert(msg,sign,ok,can){
	var c_=false;//是否已经关闭窗口，解决自动关闭与手动关闭冲突
	sign=sign||"";
	var s="<div id='mask_layer'></div><div id='scs_alert'><div id='alert_top'></div><div id='alert_bg'><table width='260' align='center' border='0' cellspacing='0' cellpadding='1'><tr>";
	if (sign!="")s+="<td width='45'><div id='inco_"+sign+"'></div></td>";
	s+="<td id='alert_txt'>"+msg+"</td></tr></table>";
	if (sign=="confirm"){
		s+="<a href='javascript:void(0)' id='confirm_ok'>确 定</a><a href='javascript:void(0)' id='confirm_cancel'>取 消</a>";
	}else{
		s+="<a href='javascript:void(0)' id='alert_ok'>确 定</a>"
	}
	s+="</div><div id='alert_foot'></div></div>";
	$("body").append(s);
	$("#scs_alert").css("margin-top",-($("#scs_alert").height()/2)+"px"); //使其垂直居中
	$("#scs_alert").focus(); //获取焦点，以防回车后无法触发函数
	position(document.getElementById('mask_layer'),0,0);
	position(document.getElementById('scs_alert'),$(window).width()/2,$(window).height()/2);
	if (typeof can == "number"){
	//定时关闭提示
		setTimeout(function(){
			close_info();
		},can*1000);
	}
	function close_info(){
	//关闭提示窗口
		if(!c_){
		$("#mask_layer").fadeOut("fast",function(){
			$("#scs_alert").remove();
			$(this).remove();
		});
		c_=true;
		}
	}
	$("#alert_ok").click(function(){
		close_info();
		if(typeof(ok)=="function")ok();
	});
	$("#confirm_ok").click(function(){
		close_info();
		if(typeof(ok)=="function")ok();
	});
	$("#confirm_cancel").click(function(){
		close_info();
		if(typeof(can)=="function")can();
	});
	function modal_key(e){	
		e = e||event;
		close_info();
		var code = e.which||event.keyCode;
		if (code == 13 || code == 32){if(typeof(ok)=="function")ok()}
		if (code == 27){if(typeof(can)=="function")can()}		
	}
	//绑定回车与ESC键
	if (document.attachEvent)
		document.attachEvent("onkeydown", modal_key);
	else
		document.addEventListener("keydown", modal_key, true);
}

//=======================
//函数结束
//======================

function BoxClick(){
     Operable();
	 $('#BoxWindow').remove();
}
	  
	  
function NotificationClose(){
    $('#notification').slideUp(5000);
}

function tishiIshide(type){
//var type=Math.floor(Math.random()*((3-1)+1))+1;
if(type==1){
         $('#tishi').slideUp(1000);
		 }else if(type==2){
		  $('#tishi').fadeOut(1000);
		 
		 }else if(type==3){
		     $('#tishi').animate({'left':'12%'},500).animate({'top':'60%'},500).animate({'left':'58%'},500).animate({'top':'30%'},500).animate({'left':'35%'},500).fadeOut(100);
			 $('#tishi').slideUp(1);
		 }else if(type==4){
		    $('#tishi').animate({'left':'12%'},200).animate({'left':'58%'},500).animate({'left':'12%'},500).animate({'left':'58%'},500).animate({'left':'35%'},500).fadeOut(100);
			 $('#tishi').slideUp(1);
		 
		 }
       Operable();
	   //$('#tishi').remove();
   }
   //显示弹窗
   function popupWindow(myText,Time,Type){
        $(document).ready(function(){
        $('body').append("<div id='tishi'></div>");
       $('#tishi').show().text(myText);
	   no_Operable();
       setTimeout("tishiIshide("+Type+")",Time*1000);
       });
   
   }
   
   function BoxWindow(title,Content,Time){
         
       $(document).ready(function(){
        $('body').append("<div id='BoxWindow'><h1>"+title+"</h1>"+Content+"<span>提示:窗口将在<b>"+Time+"</b>秒后关闭!</span></div>");
        no_Operable();
       $('#BoxWindow').css('height',150).show();
	 
	     var box=setInterval(function(){
		      var time=$('#BoxWindow b').text();
			  time--;
			  $('#BoxWindow b').text(time);
			  if(time==0){
			      clearInterval(box);
			  }
		 },1000);
       setTimeout("BoxClick()",Time*1000);
       });
   
   }
   //清除弹窗
   function removeAlert(){
     $('#alert').remove();
   }
//弹出窗口  auto:是否自动关闭 time：时间M
function popupAlert(text,auto,time){
    $('body').append('<div id="alert"></div>');
	$('#alert').text(text);
	if(auto){
       setTimeout("removeAlert()",time*1000);
	}
}
    //使用方法setTimeout("LinkTo('../../index.php')",5000);
    function LinkTo(Url,Time){
	var stop;
	//alert(Time);
	if(Time==0){
	     clearTimeout(stop);
		 document.location.href=Url;
	}
	    Time--;
	     stop=setTimeout("LinkTo('"+Url+"',"+Time+");",1000);
	}
	
	function NotificationWindow(title,Content,Time){
	//alert('ok');
       $(document).ready(function(){
        $('body').append("<div id='notification'><h1>"+title+"<span id='notificationClose'>关闭</span></h1>"+Content+"</div>");
       $('#notification').show();
	    $('#notificationClose').click(function(){
	          $('#notification').remove();
			  //alert('ok');
	   });
	   });
   setTimeout("NotificationClose()",Time*1000);
   }
//图片预览器函数
   function imageView(img){
	  $("#"+img).mouseover(function(){
                   var path=$(this).attr('src');
				   $('body').append("<div id='imageView'></div>");
				   $('#imageView').append("<img src='"+path+"'>");
				});

				$(img).mouseout(function(){
                    $('#imageView').remove();
				});
   }

   

   //返回顶部
   function backTop(){
         $('body,html').animate({scrollTop:'0px'},1000);
   }
   //返回上级
   function back(type){
         window.history.go(type);
   }

//鼠标拖拽事件

function divMove(id){
    var _move=false;//移动标记
	var _x,_y;//鼠标离控件左上角的相对位置
    $("#"+id).click(function(){
        //alert("click");//点击（松开后触发）
        }).mousedown(function(e){
        _move=true;
        _x=e.pageX-parseInt($("#"+id).css("left"));
        _y=e.pageY-parseInt($("#"+id).css("top"));
        //$("#"+id).fadeTo(20, 0.25);//点击后开始拖动并透明显示
    }).mousemove(function(e){
        if(_move){
            var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
            var y=e.pageY-_y;
            $("#"+id).css({top:y,left:x});//控件新位置
        }
    }).mouseup(function(){
    _move=false;
    $("#"+id).fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
  });
}

/*
使用时新建一个fun函数
fun=function(){

}
*/

function MyPrompt(title,tishi,fun,canshu){
	   no_Operable();
	  var html='<h1>'+title+'</h1><textarea id="text001" placeholder='+tishi+'></textarea><br/><span>取消</span><span>确认</span>';
	    $('body').append("<div id='prompt'></div>");
		$('#prompt').html(html);
         $('#prompt span:eq(1)').click(function(){
             obj=$('#text001');
			  fun(obj,canshu);
			  Operable();
			 $('#prompt').remove();
			 
		 });
         $('#prompt span:eq(0)').click(function(){
              Operable();
			  $('#prompt').remove();
		 });

		
		
}

//判断是否是电脑访问
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod","UCBrowser"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

  
//去空格
function trim(str){ 
	//过滤IE浏览器
	if(browser()=="I"){
         return str;
	}else{
		var newStr = str.trim(); 
	}
	return newStr;
}
//验证英文
function checkisEnglish(str)   
{   
//如果值为空，通过校验   
if   (str=="")   
return false;   
var pattern = /^([u4e00-u9fa5]|[ufe30-uffa0])*$/gi;   
if(pattern.test(str)){  
return true;   
}else{ 
return false;   
}

}

//验证特殊字符
function checkSymbol(str){
   if(/[~#^$@%&!*,<>\.]/gi.test(str)){
       return false;
 }else{
         return true;
 }
}

//验证数字
function checknum(n){
     if(/^[0-9]+$/gi.test(n)){
          return true;
	 }else{
          return false;
	 }
}

//验证手机
function checkmobile(n){
     if(/^1\d{10}$/gi.test(n)){
          return true;
	 }else{
          return false;
	 }
}

//验证邮箱
function checkMail(str){   
    var strReg="";                   
    var r;   
    var strText=str;   
    strReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;                
    r=strText.search(strReg);
    if(r==-1) {  
		return false;
    }else{
		return true;
	}
}

//随机数
function random(m,n){
    //返回指定范围的随机数(m-n之间)的公式1-3
   return Math.floor(Math.random()*((n-m)+m))+1;
}

//不可操作
function no_Operable(){
     $('body').append("<div id='Boxstyle'></div>");
	 $('#Boxstyle').css('height',DocumentHeight).show();
}
//可操作
function Operable(){
      $('#Boxstyle').remove();
}

//关闭窗口
function CloseWindow(){
	$(".window").hide();
	Operable();
}

function MyWindow(tag){
	var o = $('#'+tag);
	o.show();
	no_Operable();
}