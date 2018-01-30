/**
 * Created by Goldencis on 2018/1/30.
 */
$(function() {

    var menubtn = $("#menubtn");// 菜单显示隐藏按钮
    var menus = $("#menus");// 菜单

    var mli0s = $(".mli0");// 一级菜单列表
    var mli1s = $(".mli1");// 二级菜单列表
    var mli2s = $(".mli2");// 三级级菜单列表

    var mul1 = $(".mul1");// 二级菜单容器
    var mul2 = $(".mul2");// 三级菜单容器

    var wcontent = $("#wcontent");// 右侧内容区域
    var leftMargin;
    // 加载状态
    var menushow = 1;// 菜单收起折叠 0 展开 1 收起
    showhidemenu();
    mul2.parent().addClass("havelist");// 加载所有二级菜单有子菜单的标志

    // 菜单切换按钮事件
    menubtn.click(function() {

        showhidemenu();

    });

    // 一级菜单单击
    mli0s.click(function() {

        //$(this).find(".ma0").addClass("listclick");
        //$(this).siblings().find(".ma0").removeClass("listclick");

    });


    // 没级菜单根据地址栏判断 当前栏目 并增加当前栏目在菜单上的标志
    $(".mli0 a.ma0").each(function(){
        if($(this)[0].href==String(window.location)){
            $(this).addClass("listclick");
            $(document).attr("title",$(this).text());
        }
    });

    $(".mli1 a.ma1").each(function(){
        if($(this)[0].href==String(window.location)){
            $(this).parent().parent().prev(".ma0").addClass("listclick");
            $(this).addClass("listclick_noicon");
            $(document).attr("title",$(this).html());
        }
    });
    $(".mli2 a.ma2").each(function(){
        if($(this)[0].href==String(window.location)){
            $(this).parent().parent().parent().parent().prev(".ma0").addClass("listclick");
            $(this).parent().parent().prev(".ma1").addClass("listclick_noicon");
            $(this).addClass("listclick_noicon");
            $(document).attr("title",$(this).html());
        }
    });


    // 一级菜单悬停
    mli0s.hover(function() {

        $(this).find(".mul1").show();
        $(this).addClass("li_on");

    }, function() {

        $(this).find(".mul1").hide();
        $(this).removeClass("li_on");

    });

    // 二级菜单悬停
    mli1s.hover(function() {

        $(this).find(".mul2").show();
        $(this).addClass("li_on1");

    }, function() {

        $(this).find(".mul2").hide();
        $(this).removeClass("li_on1");

    });

    // 三级菜单悬停
    mli2s.hover(function() {

        $(this).addClass("li_on1");

    }, function() {

        $(this).removeClass("li_on1");

    });
    // 菜单 END



    /*
    * showhidemenu
    * 显示菜单隐藏按钮
    * */
    function showhidemenu() {

        if (menushow == 0) {
            leftMargin = 240;
            // 展开
            menus.width(leftMargin);
            wcontent.css("left", leftMargin + "px");
            mul1.parent().addClass("havelist");
            menushow = 1;

            $(".namehide").removeClass("namehide").addClass("nameshow");

        } else {
            leftMargin = 52;
            // 隐藏
            menus.width(leftMargin);
            wcontent.css("left", leftMargin + "px");
            mul1.parent().removeClass("havelist");
            menushow = 0;

            $(".nameshow").removeClass("nameshow").addClass("namehide");

        }



    }

})

    /*
    *  对悬浮菜单的样式进行控制
    *
    *
    * */
$(function(){

    /*
    *
    * 摘自screen.js
    *
    * */
    var noc = {
        width: "100%",
        height: "100%"
    }

    noc.width = $(window).width();
    noc.height = $(window).height();

    $(window).resize(function(){

        noc.width = $(window).width();
        noc.height = $(window).height();

    });

    var navSysLen=$("#systemnavlength").val();
    if(navSysLen==undefined){
        console.log("the nav is not exit");
    }else{

        leftmenuposition(navSysLen);
        $(window).resize(function(){
            leftmenuposition(navSysLen);
        });
    }
    function leftmenuposition(navSysLen){

        if(navSysLen == 6 ){

            if(noc.height < 750){
                $('.mul1:last').css("top","-210px");
                $('.mul1:last .listhover').css("top","227px");
            }else{
                $('.mul1:last').css("top","0px");
                $('.mul1:last .listhover').css("top","19px");
            }

        }else if(navSysLen == 5){

            if(noc.height < 750){
                $('.mul1:last').css("top","-165px");
                $('.mul1:last .listhover').css("top","182px");
            }else{
                $('.mul1:last').css("top","0px");
                $('.mul1:last .listhover').css("top","19px");
            }

        }else if(navSysLen == 4){

            if(noc.height < 750){
                $('.mul1:last').css("top","-120px");
                $('.mul1:last .listhover').css("top","137px");
            }else{
                $('.mul1:last').css("top","0px");
                $('.mul1:last .listhover').css("top","19px");
            }

        }else if(navSysLen <= 3){

            if(noc.height < 570){
                $('.mul1:last').css("top","-75px");
                $('.mul1:last .listhover').css("top","93px");
            }else{
                $('.mul1:last').css("top","0px");
                $('.mul1:last .listhover').css("top","19px");
            }

        }

    }

})