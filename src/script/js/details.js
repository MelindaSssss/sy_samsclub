//width() : width
//innerWidth() : width + padding
//outerWidth() : width + padding + border
//outerWidth(true) : width + padding + border + margin
//css(name|pro|[,val|fn])访问匹配元素的样式属性。
//$("p").css({ "color": "#ff0011", "width":200 });
//$("p").css("width","200px");
// ;
// ! function() {
//     class scale {
//         constructor() {
//             this.wrap = $('.wrap');
//             this.spic = $('#spic');
//             this.bpic = $('#bpic');
//             this.sf = $('#sf');
//             this.bf = $('#bf');
//             this.list = $('#list li');
//             this.ul = $('#list ul');
//             this.left = $('#left');
//             this.right = $('#right');
//         }
//         init() {
//             let _this = this;
//             this.spic.hover(function() {
//                 _this.over();
//             }, function() {
//                 _this.out();
//             });

//             this.list.on('click', function() {
//                 _this.liclick(this); //this:当前操作的li元素
//             });

//             // //计算ul的宽度
//             // this.liwidth = this.list.outerWidth(true);
//             // this.ul.width(this.list.length * this.liwidth);

//             // //给左右箭头添加点击事件
//             // this.showlength = 6;

//             // if (this.list.length < this.showlength) {
//             //     this.right.css('color', '#fff');
//             // }

//             // this.right.on('click', function() {
//             //     _this.rightclick();
//             // });

//             // this.left.on('click', function() {
//             //     _this.leftclick();
//             // });

//         }
//         over() {
//             let _this = this;
//             this.sf.css('visibility', 'visible');
//             this.bf.css('visibility', 'visible');
//             //计算小放的尺寸和比例
//             this.sf.width(this.spic.width() * this.bf.width() / this.bpic.width());
//             this.sf.height(this.spic.height() * this.bf.height() / this.bpic.height());
//             this.bili = this.bpic.width() / this.spic.width();
//             this.spic.on('mousemove', function(e) {
//                 _this.move(e);
//             });
//         }
//         out() {
//             this.sf.css('visibility', 'hidden');
//             this.bf.css('visibility', 'hidden');
//         }
//         move(e) {
//             let l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
//             let t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
//             if (l <= 0) {
//                 l = 0
//             } else if (l >= this.spic.width() - this.sf.width()) {
//                 l = this.spic.width() - this.sf.width()
//             }

//             if (t <= 0) {
//                 t = 0
//             } else if (t >= this.spic.height() - this.sf.height()) {
//                 t = this.spic.height() - this.sf.height()
//             }
//             this.sf.css({
//                 left: l,
//                 top: t
//             });

//             this.bpic.css({
//                 left: -this.bili * l,
//                 top: -this.bili * t
//             })
//         }
//         liclick(li) {
//                 let $imgurl = $(li).find('img').attr('src');
//                 this.spic.find('img').attr('src', $imgurl);
//                 this.bpic.attr('src', $imgurl);
//             }
//             // rightclick() {
//             //     if (this.list.length > this.showlength) {
//             //         this.showlength++;
//             //         this.left.css('color', '#333');
//             //         if (this.list.length == this.showlength) {
//             //             this.right.css('color', '#fff');
//             //         }
//             //     }
//             //     this.ul.animate({
//             //         left: -(this.showlength - 6) * this.liwidth
//             //     });
//             // }
//             // leftclick() {
//             //     if (this.showlength > 6) {
//             //         this.showlength--;
//             //         this.right.css('color', '#333');
//             //         if (this.showlength == 6) {
//             //             this.left.css('color', '#fff');
//             //         }
//             //     }
//             //     this.ul.animate({
//             //         left: -(this.showlength - 6) * this.liwidth
//             //     });
//             // }
//     }

//     new scale().init();
// }();


! function() {
    //1.获取sid
    var picid = location.search.substring(1).split('=')[1];
    // console.log(picid)

    //2.将当前的id传给后端获取对应的数据
    $.ajax({

        // ../php/detail.php
        url: 'http://10.31.163.172/Samsclub/php/taobaodata.php',
        data: {
            sid: picid
        },
        dataType: 'json'
    }).done(function(data) { //data:后端返回的和id对应的数据
        console.log(data[picid - 1]);
        console.log(data[picid - 1].url);
        $('#smallpic').attr('src', data[picid - 1].url);
        $('#bpic').attr('src', data[picid - 1].url);
        $('#smallpic').attr('sid', data[picid - 1].sid);
        $('.loadtitle').html(data[picid - 1].titile);
        $('.loadpcp').html(data[picid - 1].price);
        var arr = data[picid - 1].urls.split(',');
        console.log(arr);
        var str = '';
        $.each(arr, function(index, value) {
            str += '<li><img src="' + value + '"/></li>';
        });
        $('#list ul').html(str);

    });

    //3.放大镜效果
    ! function() {

        $('#sf').width($('#spic').width() * $('#bf').width() / $('#bpic').width());
        $('#sf').height($('#spic').height() * $('#bf').height() / $('#bpic').height());
        var bili = $('#bpic').width() / $('#spic').width();
        $('#spic').hover(function() {
            $('#sf').css('visibility', 'visible');
            $('#bf').css('visibility', 'visible');
            $(this).on('mousemove', function(ev) {
                var $left = ev.pageX - $('.goodsinfo').offset().left - $('#sf').width() / 2;
                var $top = ev.pageY - $('.goodsinfo').offset().top - $('#sf').height() / 2;
                if ($left < 0) {
                    $left = 0;
                } else if ($left >= $('#spic').width() - $('#sf').width()) {
                    $left = $('#spic').width() - $('#sf').width();
                }
                if ($top < 0) {
                    $top = 0;
                } else if ($top >= $('#spic').height() - $('#sf').height()) {
                    $top = $('#spic').height() - $('#sf').height();
                }
                $('#sf').css('left', $left);
                $('#sf').css('top', $top);
                $('#bpic').css('left', -$left * bili);
                $('#bpic').css('top', -$top * bili);
            });
        }, function() {
            $('#sf').css('visibility', 'hidden');
            $('#bf').css('visibility', 'hidden');
        });

        //点击小图切换
        $('#list ul').on('click', 'li', function() {
            var $imgurl = $(this).find('img').attr('src');
            $('#smallpic').attr('src', $imgurl);
            $('#bpic').attr('src', $imgurl);
        });

        //点击箭头进行切换
        var $num = 6; //放大镜显示6张。
        $('#right').on('click', function() {
            var $list = $('#list ul li'); //8
            if ($list.length > $num) {
                $num++;
                $('#left').css('color', '#333');
                if ($list.length == $num) {
                    $('#right').css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $list.eq(0).innerWidth()
                })
            }
        });

        $('#left').on('click', function() {
            var $list = $('#list ul li'); //8
            if ($num > 6) {
                $num--;
                $('#right').css('color', '#333');
                if ($num <= 6) {
                    $('#left').css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $list.eq(0).innerWidth()
                })
            }
        });
    }();

    //购物车的思路
    //存放商品的sid和商品的数量--数组实现。
    //如果商品第一次存购物车，存放的是商品的sid和商品的数量。
    //如果是第二次购买商品，从第二次开始改变数量。

    //疑问：判断商品是第一次存还是多次存储。

    //1.解决方式：提前获取cookie里面id和num
    //点击按钮将商品的数量和id存放cookie中
    var arrsid = []; //商品的sid
    var arrnum = []; //商品的数量
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    }

    //2.有了上面的方法，可以点击加入购物车按钮判断商品是否是第一次还是多次。

    $('.p-btn a').on('click', function() { //点击加入购物车按钮。

        //判断当前的商品sid是否存在购物车(cookie)
        //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较

        //获取当前的按钮对应的商品的sid
        var $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
        cookietoarray(); //获取已经存在的cookie值。

        if ($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
            //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
            var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
            arrnum[$.inArray($sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie

        } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
            arrsid.push($sid); //将当前的id存入数组
            addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
            arrnum.push($('#count').val());
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
        }
    });


    // ;
    // ! function() {
    //     $('#header').load('commonheader.html');
    // }();

}();