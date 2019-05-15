// banner 轮播图 通过定位和图片的透明度来实现
;
!(function() {
    // var $box = $('.mainpic');
    var $btns = $('.maintext a');
    var $pics = $('.mainpic a');
    // var $timer = null;
    var $autoplaytimer = null;
    var $num = 0;

    var $autoplaytimer = setInterval(function() {
        $num++;
        if ($num > 6) {
            $num = 0;
        }
        change();
        // console.log($num);
    }, 2000);

    $btns.hover(function() {
        $num = $(this).index(); //当前的索引
        // $timer = setInterval(function() {
        //     change();
        // }, 1000)
        clearInterval($autoplaytimer);
        change();
    }, function() {
        setInterval(function() {
            $num++;
            if ($num > 6) {
                $num = 0;
            }
            change();
            // console.log($num);
        }, 2000);
        // change();
    });


    function change() {
        $pics.eq($num).animate({
            opacity: 1
        }).siblings('a').animate({
            opacity: 0
        });
        $btns.eq($num).addClass('active').siblings('a').removeClass('active');
    }
    // change();
    // $box.hover(function() {
    //     clearInterval($autoplaytimer);
    // }, function() {
    //     // $num++;
    //     // if ($num == 7) {
    //     //     $num = 0;
    //     // }
    //     // setInterval(function() {
    //     //     $pics.eq($num).animate({
    //     //         opacity: 1
    //     //     }).siblings('a').animate({
    //     //         opacity: 0
    //     //     });
    //     // }, 1000);
    // });
})();




! function() {
    //1.拼接数据
    $.ajax({
        // ../php/taobaodata.php
        url: 'http://10.31.163.172/Samsclub/php/taobaodata.php',
        dataType: 'json',
    }).done(function(data) {
        var $html = '<ul>';
        console.log(data);
        $.each(data, function(index, value) {
            $html += `
				<li>
					<a href="details.html?sid=${value.sid}" target="_blank">
						<img src="${value.url}" />
						<h4>${value.titile}</h4>
						<p>¥${value.price}</p>
                    </a>
                    <div class="recommendtext">
                    <span>${value.description}</span>
                    <div>
				</li>
			`;
        });
        $html += '</ul>';
        $('.goodslist').html($html);
    });
}();





































// 这是主页里需要渲染的数据部分
// ;
// ! function() {
//     var ajax = new XMLHttpRequest();
//     ajax.open('get', 'http://localhost/Samsclub\php\conn.php', true);
//     ajax.send();
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState == 4) {
//             // console.log(ajax.responseText);//输出像对象数据的字符串
//             console.log(JSON.parse(ajax.responseText)); //输出JSON格式的字符串
//             var picarr = JSON.parse(ajax.responseText); //存入一个对象数组里
//             var oUl = document.querySelector('ul');
//             var str = '';
//             for (var i = 0; i < picarr.length; i++) {
//                 str += `
//                     <li>
//                         <img src="${picarr[i].url}" alt="">
//                         <p>${picarr[i].title}</p>
//                         <span>￥:${picarr[i].price}</span>
//                         <i>${picarr[i].description}</i>
//                     </li>
//                     `;
//             }
//             oUl.innerHTML = str;
//         }

//     }
// }()