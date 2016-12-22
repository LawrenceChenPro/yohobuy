 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require("jQuery"); 
    $(function(){
        new topNav();//顶部导航栏
        new wrapNav();//内容区导航
        new returnTop();//回到顶部
        new menu();//三级菜单
        new section();//商品筛选
    })
    //顶部导航栏
    function topNav(){
        var _this = this;
        this.arr = ["集团官网","男生潮流","女生潮流","物趣分享","潮流嘉年华"];
        this.arr2 = ["YOHO!","BOYSYOHO!","GIRLSYOHO!","YOHO!SHOW","YO'HOOD"];
        $("#topNavLeft").mouseenter(function(){
            $(this).css("background","#dcdcdc");
            $(".groupList").show();
        }).mouseleave(function(){
            $(this).css("background","#f4f4f4");
            $(".groupList").hide();
        })

        $(".groupList li").each(function(index){
            $(".groupList li").eq(index).mousemove(function(){
                $(this).html(_this.arr[index])
            }).mouseout(function(){
                $(this).html(_this.arr2[index])
            })    
        })
         $("#topNavRight .bgNone").on("mousemove",function(){
             $(this).find(".appDownload").show();
         }).on("mouseout",function(){
             $(this).find(".appDownload").hide();
         })
         $(".headNav li").click(function(){
            $(".headNav li").removeClass("cure");
            $(this).addClass("cure");
        })
    }
    //内容区导航
    function wrapNav(){
        $("#wrapNavContent li").mouseenter(function(){
            $("#wrapNavContent li a").css("border-bottom","0");
            $(this).find(".borderBottom").css("border-bottom","2px solid #fff");
            $(this).find(".third").show();
        }).mouseleave(function(){
            $("#wrapNavContent li a").css("border-bottom","0");
            $(this).find(".third").hide();
        });
        $(".third dd a").hover(function(){
            $(this).css("text-decoration","underline").siblings().css("text-decoration","none");
        },function(){
            $(this).css("text-decoration","none");
        }) 
    }
    /*回到顶部*/
    function returnTop(){
        var _this = this;
        var Height = document.body.scrollTop || document.documentElement.scrollTop;
        //console.log(Height)
        if(Height >= 100){
                $("#return-top").fadeIn();
            }else{
                $("#return-top").fadeOut();
            }
         
        $(window).on("scroll",_this.windowScroll);
        
        $("#return-top").click(function(){
             $('body,html').animate({ scrollTop: 0 },300);
        })
    }
    returnTop.prototype.windowScroll = function(){
        var height = document.body.scrollTop || document.documentElement.scrollTop;
        if(height >= 100){
            $("#return-top").fadeIn();
        }else{
            $("#return-top").fadeOut();
        }
    }
    
    /*三级菜单*/
    
    function menu(){
        /*点击选中菜单*/
        $(".product-list-nav .sort-child-list li").on("click",function(){
            $(".product-list-nav .sort-child-list li").removeClass("active");
            $(this).addClass("active");
        });
        $(".product-list-nav h3").on("click",function(){
            $(this).siblings().slideToggle();
            //$(this).find("span").css({"transition":"all .5s","transform":"rotate(90deg)"});
            $(this).find("span").toggleClass("rotate");
        })
    }
    /*夹克筛选*/
    var storage=window.sessionStorage;
    var sessionNum = storage.getItem("number") == null?0:parseInt(storage.getItem("number"));
    function section(){
        var _this = this;
        $(".ud-price-range .limit").on("keyup",_this.choicePrice);
        $(".sort-pager .checks").on("click",_this.choiceType);
        /*选择商品排序方式*/
        this.selectMaxIndex();
        $(".sort-type").on("click",_this.typeClick);
        $("#count-per-page").click(function(){
            $(this).siblings().slideToggle(200);
            //$(".page-count ul").show();
        });
        $(".page-count ul li").hover(function(){
            $(this).css("background","#1580fd");
        },function(){
             $(this).css("background","#fff");
        });
        $(".page-count ul li").click(function(){
            $(".page-count ul").hide();
            //此处将页数改为分页/每页显示的数字
        })
    }

    /*正则判断输入价格是否合适*/
   section.prototype.choicePrice = function(){
       var reg = /^\d{1,5}$/;
        var val = $(this).val();
        if(!reg.test(val)){
            $(".ud-price-range .limit").val("");
            $(".price-sure").hide();
        }else{
            $(".price-sure").show();
        }
   } 
   /*选择商品排列类型*/
    section.prototype.choiceType = function(){
        $(".sort-pager .checks").removeClass("checked");
        $(".sort-pager .checks span").html("&#xe646;");
        $(this).addClass("checked");
        $(this).find("span").html("&#xe653;");
    }
    /*选择要显示的当前选择*/
    section.prototype.selectMaxIndex = function(){
        var storage=window.sessionStorage;
        var arr = [];
        var arrNum = [];
        var arrShow = [];
        
        for(var i=0;i<storage.length;i++){
            var key=storage.key(i);//使用key()方法，向其中出入索引即可获取对应的键
            var value=storage.getItem(key);
            var arr2 = value.split("|");
            arr.push(key);
            arr.push(arr2);
            arrNum.push(parseInt(arr2[1]));
            arrShow.push(arr2[0])
        } 
        arrNum.pop();  //把最后一个undefinde删掉
       
        arrNum.sort(function(a,b){
            return b-a;
        });
        //var showIndex = arr.indexOf(arrNum[0]);//得到要显示的下标
        //console.log(arr);
        var showIndex = 0;
        for(var j = 0;j<arr.length;j++){
            if(j%2 != 0){
                if(arr[j].indexOf(arrNum[0]+"") != -1){
                    showIndex = j
                    //console.log(showIndex,arr[showIndex-1]);//上次最后点的是下标为3的span
                    break;
                }
            }
        }
        var thisIndex = isNaN(parseInt(arr[showIndex-1]))?0:parseInt(arr[showIndex-1]);
        
        //console.log(thisIndex);//得到要显示的位置
        if(thisIndex != 0){
            $(".sort-type span").eq(thisIndex).attr("id",arr[showIndex][0]);
            $(".sort-type").removeClass("active");
            $(".sort-type").eq(thisIndex).addClass("active") 
            var spanId = $(".sort-type span").eq(thisIndex).attr('id');
            //console.log(spanId)
            if(spanId == ""){
                $(".sort-type span").eq(thisIndex).html("");
            }else if(spanId == "xia"){
                $(".sort-type span").eq(thisIndex).html("&#xe6e5;");
            }else if(spanId == "shang"){
                $(".sort-type span").eq(thisIndex).html("&#xe609;");
            } 
        }
    }
    /*切换选择*/
    section.prototype.typeClick = function(){
        sessionNum++;
        storage.setItem("number",sessionNum);
        $(".sort-type").removeClass("active");
        $(this).addClass("active");  
        var spanHtml = $(this).find("span").html();
        var spanId = $(this).find("span").attr('id');
        var Index = $(this).index();
        /*改变元素的id*/
        if(spanHtml != ""){/*排除掉第一个span元素*/
            if(spanId == ""){
                $(this).find("span").attr('id','xia');
                $(".sort-type span").html("&#xe610;");
                $(this).find("span").html("&#xe6e5;");
                $(".sort-type span").eq(0).html("");
            }else if(spanId == "xia"){
                $(this).find("span").attr('id','shang');
                $(".sort-type span").html("&#xe610;");
                $(this).find("span").html("&#xe609;");
                $(".sort-type span").eq(0).html("");
            }else if(spanId == "shang"){
                $(this).find("span").attr('id','xia');
                $(".sort-type span").html("&#xe610;");
                $(this).find("span").html("&#xe6e5;");
                $(".sort-type span").eq(0).html("");
            }   
        }else{
            $(".sort-type span").attr('id',"");
            $(".sort-type span").html("&#xe610;");
            $(".sort-type span").eq(0).html("");
        }
         /*写入storage*/
        var id = $(this).find("span").attr('id');
        storage.setItem(Index,id+"|"+sessionNum); 
    }
    
    
    
    
    
    
    
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







