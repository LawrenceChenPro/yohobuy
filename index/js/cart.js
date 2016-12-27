 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
    var $ = require("jq");
    var cookie = require("cookie");
    cookie($);
    
    $(function(){
        //回到顶部
        new returnTop();
        //检测是否为登录状态
        new login();
        //显示购物车商品
        new clickArr();
       
    })
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
   function login(){
        var _this = this;
        var cookie = $.cookie("user");
        if(cookie){
             $(".header-tool li").eq(0).html("<span>Hi~ "+cookie+' &nbsp;</span><span class="tuichu" style=\"cursor:pointer;\">[退出]</span>')
        }
       $(".header-tool li").eq(0).on("click",".tuichu",_this.loginyes)
    }
    login.prototype.loginyes = function(){
        $.cookie("user",null);
        $(".header-tool li").eq(0).html('Hi~[<a href="login.html" class="login">请登录</a>][<a href="register.html" class="register">免费注册</a>]')
    }
    
    
    
   
   function clickArr(){
       var _this = this;
       $(".again").on("click",function(){
           window.location.href = "details.html"
       });
       var cookies = $.cookie("goodsDetails");
       if(cookies!=null){
           var arr = cookies.split("#");
           arr.pop();
           //获取每段商品的全部信息；
           var arr2=[];
           for(var j = 0;j<arr.length;j++){
               var a = arr[j].split("|");
               arr2.push(a);
           }
       }else{
           var arr = [];
           var arr2=[];
       }
       
       //拼接
       if(arr.length != 0){
           var html="";
           for(var i=0;i<arr2.length;i++){
               var price = "¥"+(parseInt(_this.number(arr2[i][4]))/100*arr2[i][3])
                html+='<tr class="common-sell-box">'
                html+='<td>'
                html+='<div class="pay-pro">'
                html+='<input type="checkbox" id="" class="cart-item-check" checked="checked">'
                html+='<a href="javascript:;" class="pay-pro-icon ">'
                html+='<img src="' +arr2[i][1]+ '" alt="">'
                html+='</a>'
                html+='<p class="pay-pro-info">'
                html+='<a href="javascript:;">'
                html+=arr2[i][0]
                html+='<br>'
                html+='</a>'
                html+='<span>'
                html+='尺码：<i>'+arr2[i][2]+'</i>'
                html+='</span>'
                html+='</p>'
                html+='</div>'
                html+='</td>'
                html+='<td>'
                html+='<span class="productPrice">'+arr2[i][4]+'</span>'
                html+='</td>'
                html+='<td>0个</td>'
                html+='<td class="adjust-cart-num">'
                html+='<span class="minus">-</span>'
                html+='<input type="text" id="goods-num" value="'+arr2[i][3]+'">'
                html+='<span class="plus">+</span>'
                html+='</td>'
                html+='<td class="sub-total">'
                html+=price
                html+='</td>'
                html+='<td class="cart-operation">'
                html+='<a href="javascript:;" class="cart-del-btn">删除</a>'
                html+='</td>'
                html+='</tr>'
           }
           $(".pay-wapper tbody")[0].innerHTML+=html; 
       }  
       /*商品数量的加减*/
       $(".adjust-cart-num .minus").on("click",_this.minusClick)
       $(".adjust-cart-num .plus").on("click",_this.plusClick);
       /*判断商品总价*/
       this.addPrice();
       /*select切换*/
       $(".cart-item-check").change(_this.checkChange);
       $("#allS").change(_this.allSchange);
       $("#tipsbox a").click(function(){
           $(this).parent().hide(300);
       })
       
       
       
       
   }
   clickArr.prototype.minusClick = function(){
       var _this = this;
       var sib = $(this).parent().find("input").val();
           var goodsNum = parseInt(sib);
           var pri = $(this).parent().parent().find(".productPrice").html();
           if(goodsNum>1){
               goodsNum--;
               var price = "¥"+(parseInt( clickArr.prototype.number(pri)/100*goodsNum))
               $(this).parent().find("input").val(goodsNum);
               $(this).parent().parent().find(".sub-total").html(price);
               clickArr.prototype.addPrice();
           }
   }
     clickArr.prototype.plusClick = function(){
          var _this = this;
          var sib = $(this).parent().find("input").val();
            var goodsNum = parseInt(sib);
            var pri = $(this).parent().parent().find(".productPrice").html();
            goodsNum++;
           var price = "¥"+(parseInt( clickArr.prototype.number(pri)/100*goodsNum))
            $(this).parent().find("input").val(goodsNum);
           $(this).parent().parent().find(".sub-total").html(price);
           clickArr.prototype.addPrice();
     }
    clickArr.prototype.checkChange = function(){
        var _this = this;
        if(!$(this).prop("checked")){
                $(this).prop("checked", false)
           }else{
               $(this).prop("checked", true)
           }
            clickArr.prototype.addPrice();
    }
    
   clickArr.prototype.allSchange = function(){
        if(!$(this).prop("checked")){
            $(this).prop("checked", false);
            $(".cart-item-check").prop("checked", false);
            clickArr.prototype.addPrice();
       }else{
           $(this).prop("checked", true);
           $(".cart-item-check").prop("checked", true);
            clickArr.prototype.addPrice();
       }  
   }
    //获取字符串中的数字
    clickArr.prototype.number = function(text){
        var value = text.replace(/[^0-9]/ig,""); 
        return value;
    } 
    //计算商品总价
     clickArr.prototype.addPrice = function(){
         var _this = this;
         var allPrice = 0;
           $(".pay-wapper .cart-item-check").each(function(){
               if($(this).prop("checked")){
                   var price = $(this).parent().parent().parent().find(".sub-total").html();
                   allPrice+=parseInt(_this.number(price))
               }
           })
           $(".cartnew-sum strong").html("¥"+allPrice+".00")
     }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







