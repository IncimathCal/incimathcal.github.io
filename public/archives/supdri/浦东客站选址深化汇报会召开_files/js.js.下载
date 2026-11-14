$(function(){
	$("li.menu").hover(function(){
		$(this).children('a').toggleClass("hover");
	 	$(this).children('ul').toggleClass("hover");
	});
	$(".gotoapp").hover(function(){
		$(this).toggleClass("gotoappline1");
		$(this).children('div.iconhoverb').toggleClass("iconhover");
	});
	$(".historymaga a").click(function(){
		var obj = $(this);
		var majorhref = "/pdf/supdri_reader.php?id=" + obj.data('id') + "&type=major";
		var supplementhref = "/pdf/supdri_reader.php?id=" + obj.data('id') + "&type=supplement";
		$('.listmain .lastMagaMain').attr('href',majorhref);
		$('.listmain .lastMagaMain img').attr('src',obj.data('majorpic'));
		$('.listmain .in').html(obj.attr('title') + "    本期主题：" + obj.data('topic'));
		$('.listmain .lastMagaSecond').attr('href',supplementhref);
		$('.listmain .lastMagaSecond img').attr('src',obj.data('supplementpic'));
		
	});

	//漂浮广告
	$.fn.floatAd = function(options){
		var defaults = {
			imgSrc : "", //漂浮图片路径
			url : "", //图片点击跳转页
			openStyle : 1, //跳转页打开方式 1为新页面打开  0为当前页打开
			speed : 20 //漂浮速度 单位毫秒
		};
		var options = $.extend(defaults,options);
		var _target = options.openStyle == 1 ?  "target='_blank'" : '' ;
		var html = "<div id='float_ad' style='position:fixed;_position:absolute;left:0px;top:0px;z-index:1000000;cleat:both;'>";
            html += "  <a href='" + options.url + "' " + _target + "><img src='" + options.imgSrc + "' border='0' class='float_ad_img'/></a> <a href='javascript:;' id='close_float_ad' style=''>x</a>";
            html += "</div>";

        $('body').append(html);

		function init(){
			var x = 0,y = 0 
			var xin = true, yin = true 
			var step = 1 
			var delay = 10 
			var obj=$("#float_ad") 
			obj.find('img.float_ad_img').load(function(){
				var float = function(){
				    var L = T = 0;
					var OW = obj.width();//当前广告的宽
					var OH = obj.height();//高
					var DW = $(window).width(); //浏览器窗口的宽
					var DH = $(window).height(); 

 				    x = x + step *( xin ? 1 : -1 ); 
					if (x < L) { 
						xin = true; x = L
					} 
					if (x > DW-OW-1){//-1为了ie
						xin = false; x = DW-OW-1
					} 

					y = y + step * ( yin ? 1 : -1 ); 
					if (y > DH-OH-1) { 

						yin = false; y = DH-OH-1 ;
					}
					if (y < T) {
						yin = true; y = T
					} 

					var left = x ; 
					var top = y; 

					obj.css({'top':top,'left':left});
				}
				var itl = setInterval(float,options.speed);
				$('#float_ad').mouseover(function(){clearInterval(itl)}); 
				$('#float_ad').mouseout(function(){itl=setInterval(float, options.speed)} )
			});
			// 点击关闭
			$('body').on('click', '#close_float_ad', function(){
			    $('#float_ad').hide();
			});
		}

	   init();

	}; //floatAd
})

function ajax_comment(id,molds,aid,page,template){
	$.ajax({
		url: site_dir+'index.php?c=ajax&a=comment',type: 'post',
		cache: false,
		data: "id="+id+"&template="+template+"&molds="+molds+"&aid="+aid+"&comment_page="+page,
		success: function(html){
			$("#"+id).html(html);
		}
	});
}
function ajax_record(id,aid,page,template){
	$.ajax({
		url: site_dir+'index.php?c=ajax&a=record',type: 'post',
		cache: false,
		data: "template="+template+"&aid="+aid+"&record_page="+page,
		success: function(html){
			$("#"+id).html(html);
		}
	});
}

function check() {
    if (document.form_wm.usr.value == "") {
        alert("用户名不能为空！\r\r请重新填写！");
        document.form_wm.usr.focus();
        return false;
    }
    if (document.form_wm.domain.value == "") {
        alert("域名不能为空！\r\r请重新填写！");
        document.form_wm.domain.focus();
        return false;
    }
    if (document.form_wm.pass.value == "") {
        alert("密码不能为空！\r\r请重新填写！");
        document.form_wm.pass.focus();
        return false;
    }

    document.form_wm.action = "https://smail2.263xmail.com/xmweb";

    document.form_wm.submit();
    document.form_wm.pass.value = "";
    document.form_wm.usr.value = "";
    return false;
}
