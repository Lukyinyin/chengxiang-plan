/**
 * Created by L on 2018/10/4.
 */
$(function () {
    // header里面的日期
    var arr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var date = new Date();
    $("#date span").eq(0).html("今天是" + date.getFullYear() + "年" + (date.getMonth()+1)+"月"
        +date.getDate()+"日").next("span").html(arr[date.getDay()])

    // header里面的天气

    $.ajax({
        type:"get",
        url:"http://v.juhe.cn/weather/index?format=2&cityname=%E6%BF%AE%E9%98%B3&key=fff0bdee00eb52b0fca4bfec672cce06",
        dataType:"jsonp",
        success: function (data) {
            if(data.resultcode == 200){
                $("#date span").eq(2).html("天气:"+ data.result.today.weather);
                $("#date span").eq(3).html("温度:"+ data.result.today.temperature + "℃");
            }
        },
        error: function () {
            $("#data span").eq(2).html("错误");
            $("#data span").eq(3).html("错误");
        }
    })

    // tab栏切换
    $(".tab").on("mouseenter","span" ,function () {
        var $this = $(this);
        var index = $this.index();
        $(this).addClass("active").siblings("span").removeClass("active");
        $(".details div").eq(index).addClass("selected").siblings("div").removeClass("selected").end().children("a").last().css("border-right","none");
    })


    // 轮播图
    var swiper = new Swiper('.swiper-container', {
        autoplay:{
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
    });

    // 图片新闻里面的tab栏切
    $(".new-tab").on("mouseenter","span" ,function () {
        console.log(11);
        var $this = $(this);
        var index = $this.index();
        $(this).addClass("news-active").siblings("span").removeClass("news-active");
        $(".new-content").eq(index).addClass("news-selected").siblings("div").removeClass("news-selected");
    })

    // 政府信息公开里面的日期,规划公示里面的信息
    function getPublicityDate(){
        var publicitydate = new Date();
        var y = publicitydate.getFullYear();
        var m = publicitydate.getMonth() + 1;
        var d = publicitydate.getDate();
        m < 10 ? m = "0" + m : m;
        d < 10 ? d = "0" + d : d;
        $(".content-publicity .date").html(y+"-"+ m + "-" + d);
        $(".content-plan-publicity .date").html(y+"-"+ m + "-" + d);

    }
   getPublicityDate();

    // 政府公开指南里面的tab栏目,规划信息里面的tab栏
    $(".tab-publicity").on("mouseenter","span", function () {
        var $this = $(this);
        var index = $this.index();
        $this.addClass("publicity-active").siblings("span").removeClass("publicity-active");
        $(".content-publicity").eq(index).addClass("content-publicity-selected").siblings(".content-publicity")
            .removeClass("content-publicity-selected");
    })

    $(".tab-plan").on("mouseenter","span", function () {
        var $this = $(this);
        var index = $this.index();
        $this.addClass("plan-active").siblings("span").removeClass("plan-active");
        $(".content-plan-publicity").eq(index).addClass("content-plan-selected").siblings(".content-plan-publicity")
            .removeClass("content-plan-selected");
    })





})