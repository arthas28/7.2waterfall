/**
 * Created by YANG on 15/10/14.
 */
//模拟加载图片数据
var dateImg = {'date':[{'src':'d1.jpg'},{'src':'d2.jpg'},{'src':'d3.jpg'},{'src':'d4.jpg'},{'src':'d5.jpg'},
    {'src':'d6.jpg'},{'src':'d7.jpg'},{'src':'d8.jpg'},{'src':'d9.jpg'},{'src':'d10.jpg'}]}
$(document).ready(function(){

    //滚动监听函数
    $(window).on('load',function(){
        imgLocation();
        window.onscroll = function(){
            if(scrollState()){
                $.each(dateImg.date,function(index,value){
                    //添加div和img函数
                    var content = $('<div>').addClass('imgBox').appendTo($('.articleBody'));
                    $('<img>').attr('src','../images/'+$(value).attr('src')).appendTo(content);
                });
            }
            //重新定位图片位置，实现瀑布流效果
            imgLocation();
        };
    });

    //瀑布流图片位置定位函数
    function imgLocation(){
        var imgBox = $('.imgBox');
        var imgBoxWidth = imgBox.eq(0).outerWidth(true);
        var num = Math.floor($('.articleBody').width()/imgBoxWidth);
        var imgArr = [];
        imgBox.each(function(index,value){
            var imgBoxHeight = imgBox.eq(index).outerHeight(true);
            if(index<num){
                imgArr[index] = imgBoxHeight;
            }else{
                var minImgBoxHeight = Math.min.apply(null,imgArr);
                var minImgBoxIndex = $.inArray(minImgBoxHeight,imgArr);
                $(value).css({
                    position:'absolute',
                    top:minImgBoxHeight,
                    left:imgBox.eq(minImgBoxIndex).position().left
                });
                imgArr[minImgBoxIndex] += imgBox.eq(index).outerHeight(true);
            }
        });
        //让footer区块定位在瀑布流之后
        $('.footer').css({
            'margin-top':Math.max.apply(null,imgArr)-250
        });
    }

    //图片滚动加载判断函数
    function scrollState(){
        var imgBox = $('.imgBox');
        var lastBoxHeight = imgBox.last().get(0).offsetTop + Math.floor(imgBox.last().outerHeight(true)/2);
        return (lastBoxHeight<$(document).width()/3 + $(window).scrollTop())?true:false;
    }

    //导航菜单遍历选项背景改变效果
    $('.headerNav li a').each(function(){
        $('.headerNav li a').unbind('click').click(function(){
            $('.x-forcus').removeClass('x-forcus');
            $(this).addClass('x-forcus');
        });
    });

    //遍历选项背景改变效果
    $('.articleNav li a').each(function(){
        $('.articleNav li a').unbind('click').click(function(){
            $('.c-forcus').removeClass('c-forcus');
            $(this).addClass('c-forcus');
        });
    });
});