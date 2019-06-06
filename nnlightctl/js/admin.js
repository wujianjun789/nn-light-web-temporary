
var num = 0, oUl = $("#min_title_list"), hide_nav = $("#Hui-tabNav");

/*获取顶部选项卡总长度*/
function tabNavallwidth () {
  var taballwidth = 0,
  $tabNav = hide_nav.find(".acrossTab"),
  $tabNavWp = hide_nav.find(".Hui-tabNav-wp"),
  $tabNavitem = hide_nav.find(".acrossTab li"),
  $tabNavmore = hide_nav.find(".Hui-tabNav-more");
  if (!$tabNav[0]) {
    return
  }
  $tabNavitem.each(function (index, element) {
    taballwidth += Number(parseFloat($(this).width() + 60))
  });
  $tabNav.width(taballwidth + 25);
  var w = $tabNavWp.width();
  if (taballwidth + 25 > w) {
    $tabNavmore.show()
  } else {
    $tabNavmore.hide();
    $tabNav.css({left: 0});
  }
}

/*左侧菜单响应式*/
function Huiasidedisplay () {
  if ($(window).width() >= 768) {
    $(".Hui-aside").show();
  }
}

/*菜单导航*/
function Hui_admin_tab (obj) {
  var bStop = false,
  bStopIndex = 0,
  href = $(obj).attr('data-href'),
  title = $(obj).attr("data-title"),
  topWindow = $(window.parent.document),
  show_navLi = topWindow.find("#min_title_list li"),
  iframe_box = topWindow.find("#iframe_box");
  //console.log(topWindow);
  if (!href || href == "") {
    alert("data-href不存在，请改为data-href属性");
    return false;
  }
  if (!title) {
    alert("使用data-title属性");
    return false;
  }
  if (title == "") {
    alert("data-title属性不能为空");
    return false;
  }
  show_navLi.each(function () {
    if ($(this).find('span').attr("data-href") == href) {
      bStop = true;
      bStopIndex = show_navLi.index($(this));
      return false;
    }
  });
  if (!bStop) {
    creatIframe(href, title);
    min_titleList();
  } else {
    show_navLi.removeClass("active").eq(bStopIndex).addClass("active");
    iframe_box.find(".show_iframe").hide().eq(bStopIndex).show().find("iframe").attr("src", href);
  }
}

/*最新tab标题栏列表*/
function min_titleList () {
  var topWindow = $(window.parent.document),
  show_nav = topWindow.find("#min_title_list"),
  aLi = show_nav.find("li");
}

/*创建iframe*/
function creatIframe (href, titleName) {
  var topWindow = $(window.parent.document),
  show_nav = topWindow.find('#min_title_list'),
  iframe_box = topWindow.find('#iframe_box'),
  iframeBox = iframe_box.find('.show_iframe'),
  $tabNav = topWindow.find(".acrossTab"),
  $tabNavWp = topWindow.find(".Hui-tabNav-wp"),
  $tabNavmore = topWindow.find(".Hui-tabNav-more");
  var taballwidth = 0;

  show_nav.find('li').removeClass("active");
  show_nav.append('<li class="active"><span data-href="' + href + '">' + titleName + '</span><i></i><em></em></li>');
  if ('function' == typeof $('#min_title_list li').contextMenu) {
    $("#min_title_list li").contextMenu('Huiadminmenu', {
      bindings: {
        'closethis': function (t) {
          var $t = $(t);
          if ($t.find("i")) {
            $t.find("i").trigger("click");
          }
        },
        'closeall': function (t) {
          $("#min_title_list li i").trigger("click");
        },
      }
    });
  } else {

  }
  var $tabNavitem = topWindow.find(".acrossTab li");
  if (!$tabNav[0]) {
    return
  }
  $tabNavitem.each(function (index, element) {
    taballwidth += Number(parseFloat($(this).width() + 60))
  });
  $tabNav.width(taballwidth + 25);
  var w = $tabNavWp.width();
  if (taballwidth + 25 > w) {
    $tabNavmore.show()
  } else {
    $tabNavmore.hide();
    $tabNav.css({left: 0})
  }
  iframeBox.hide();
  iframe_box.append('<div class="show_iframe"><div class="loading"></div><iframe frameborder="0" src=' + href + '></iframe></div>');
  var showBox = iframe_box.find('.show_iframe:visible');
  showBox.find('iframe').load(function () {
    showBox.find('.loading').hide();
  });
}


/*关闭iframe*/
function removeIframe () {
  var topWindow = $(window.parent.document),
  iframe = topWindow.find('#iframe_box .show_iframe'),
  tab = topWindow.find(".acrossTab li"),
  showTab = topWindow.find(".acrossTab li.active"),
  showBox = topWindow.find('.show_iframe:visible'),
  i = showTab.index();
  tab.eq(i - 1).addClass("active");
  tab.eq(i).remove();
  iframe.eq(i - 1).show();
  iframe.eq(i).remove();
}

/*关闭所有iframe*/
function removeIframeAll () {
  var topWindow = $(window.parent.document),
  iframe = topWindow.find('#iframe_box .show_iframe'),
  tab = topWindow.find(".acrossTab li");
  for (var i = 0; i < tab.length; i++) {
    if (tab.eq(i).find("i").length > 0) {
      tab.eq(i).remove();
      iframe.eq(i).remove();
    }
  }
}

/*弹出层*/
function layer_show () {
  var title = arguments[0];
  var url = arguments[1];
  var w = arguments[2];
  var h = arguments[3];
  if (title == null || title == '') {
    title = false;
  }
  if (url == null || url == '') {
    url = "404.html";
  }
  if (w == null || w == '') {
    w = 800;
  }
  if (h == null || h == '') {
    h = ($(window).height() - 50);
  }

  switch (arguments.length) {
    case 4:
      layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: false,
        shade: [0.8, '#393D49'],
        moveOut: true,
        title: title,
        content: url
      });break;
    case 5:
      var callbackfun = arguments[4];
      layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: false,
        shade: [0.8, '#393D49'],
        moveOut: true,
        title: title,
        content: url,
        btn: ['确定', '关闭'],
        yes: function (index,layero) {
          //当点击‘确定’按钮的时候，获取弹出层返回的值
          var res = window["layui-layer-iframe" + index].getData();
          if(!(res == null || res == "")){
            callbackfun(res);
            //最后关闭弹出层
            layer.close(index);
          }
        },
        cancel: function () {
          //右上角关闭回调
        }
      });
      break;
    case 6:
      var addUrl = arguments[5];
      layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: false,
        shade: [0.8, '#393D49'],
        moveOut: true,
        title: title,
        content: url,
        btn: ['确定', '关闭'],
        yes: function (index,layero) {
          //当点击‘确定’按钮的时候，获取弹出层返回的值
          var res = window["layui-layer-iframe" + index].getData();
          console.log(res);
          var body = layer.getChildFrame('body', index);
          var isJsonList = $(body).find("#dataList").attr("data");
          var jsonList = isJsonList instanceof String ?JSON.parse($(body).find("#dataList").attr("data")): isJsonList;
          document.write('<script language=javascript src="../js/api/ajaxScript.js"></script>');//引入封装的ajax
          ajaxRequest("post",addUrl,jsonList,function(data){
            console.log(data);
            callbackfun(jsonList);
          });
          //最后关闭弹出层
          layer.close(index);
        },
        cancel: function () {
          //右上角关闭回调
        }
      });
      break;
  }
}

/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
*/
// function layer_show(title,url,w,h){
// 	if (title == null || title == '') {
// 		title=false;
// 	};
// 	if (url == null || url == '') {
// 		url="404.html";
// 	};
// 	if (w == null || w == '') {
// 		w=800;
// 	};
// 	if (h == null || h == '') {
// 		h=($(window).height() - 50);
// 	};
// 	layer.open({
// 		type: 2,
// 		area: [w+'px', h +'px'],
// 		fix: false, //不固定
// 		maxmin: true,
// 		shade:0.4,
// 		title: title,
// 		content: url
// 	});
// }

/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
	callbackfun 回调函数
*/
// function layer_show(title,url,w,h,callbackfun){
//     if (title == null || title == '') {
//         title=false;
//     };
//     if (url == null || url == '') {
//         url="404.html";
//     };
//     if (w == null || w == '') {
//         w=800;
//     };
//     if (h == null || h == '') {
//         h=($(window).height() - 50);
//     };
//     layer.open({
//         type: 2,
//         area: [w+'px', h +'px'],
//         fix: false, //不固定
//         maxmin: true,
//         shade:0.4,
//         title: title,
//         content: url,
//         btn: ['确定','关闭'],
//         yes: function(index){
//             //当点击‘确定’按钮的时候，获取弹出层返回的值
//             var res = window["layui-layer-iframe" + index].getData();
//             //打印返回的值，看是否有我们想返回的值。
//             console.log(res);
//             callbackfun(res);
//             //最后关闭弹出层
//             layer.close(index);
//         },
//         cancel: function(){
//             //右上角关闭回调
//         }
//     });
// }

/*关闭弹出框口*/
function layer_close () {
  var index = parent.layer.getFrameIndex(window.name);
  parent.layer.close(index);
}

/*时间*/
function getHTMLDate (obj) {
  var d = new Date();
  var weekday = new Array(7);
  var _mm = "";
  var _dd = "";
  var _ww = "";
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  _yy = d.getFullYear();
  _mm = d.getMonth() + 1;
  _dd = d.getDate();
  _ww = weekday[d.getDay()];
  obj.html(_yy + "年" + _mm + "月" + _dd + "日 " + _ww);
};

$(function () {
  getHTMLDate($("#top_time"));
  //layer.config({extend: 'extend/layer.ext.js'});
  Huiasidedisplay();
  var resizeID;
  $(window).resize(function () {
    clearTimeout(resizeID);
    resizeID = setTimeout(function () {
      Huiasidedisplay();
    }, 500);
  });

  $(".nav-toggle").click(function () {
    $(".Hui-aside").slideToggle();
  });
  $(".Hui-aside").on("click", ".menu_dropdown dd li a", function () {
    if ($(window).width() < 768) {
      $(".Hui-aside").slideToggle();
    }
  });
  /*左侧菜单*/
  //$(".Hui-aside").Huifold({
  //	titCell:'.menu_dropdown dl dt',
  //	mainCell:'.menu_dropdown dl dd',
  //});

  /*选项卡导航*/
  $(".Hui-aside").on("click", ".menu_dropdown a", function () {
    Hui_admin_tab(this);
  });

  $(document).on("click", "#min_title_list li", function () {
    var bStopIndex = $(this).index();
    var iframe_box = $("#iframe_box");
    $("#min_title_list li").removeClass("active").eq(bStopIndex).addClass("active");
    iframe_box.find(".show_iframe").hide().eq(bStopIndex).show();
  });
  $(document).on("click", "#min_title_list li i", function () {
    var aCloseIndex = $(this).parents("li").index();
    $(this).parent().remove();
    $('#iframe_box').find('.show_iframe').eq(aCloseIndex).remove();
    num == 0 ? num = 0 : num--;
    tabNavallwidth();
  });
  $(document).on("dblclick", "#min_title_list li", function () {
    var aCloseIndex = $(this).index();
    var iframe_box = $("#iframe_box");
    if (aCloseIndex > 0) {
      $(this).remove();
      $('#iframe_box').find('.show_iframe').eq(aCloseIndex).remove();
      num == 0 ? num = 0 : num--;
      $("#min_title_list li").removeClass("active").eq(aCloseIndex - 1).addClass("active");
      iframe_box.find(".show_iframe").hide().eq(aCloseIndex - 1).show();
      tabNavallwidth();
    } else {
      return false;
    }
  });
  tabNavallwidth();

  $('#js-tabNav-next').click(function () {
    num == oUl.find('li').length - 1 ? num = oUl.find('li').length - 1 : num++;
    toNavPos();
  });
  $('#js-tabNav-prev').click(function () {
    num == 0 ? num = 0 : num--;
    toNavPos();
  });

  function toNavPos () {
    oUl.stop().animate({'left': -num * 100}, 100);
  }

});

//关闭父窗口，并刷新父页面
function ResetWindow () {
  setTimeout(function () {
    window.parent.location.reload();
  }, 500);//0.5秒后强制刷新
}
