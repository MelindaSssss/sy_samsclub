/* 
插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
插件需具备默认设置参数；
插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果；
插件支持链式调用。
*/

// alert('b');
;
(function(window) {

    function Tab(option) {
        this.setting = { //默认参数
            id: '#tab',
            etype: 'onclick', //切换的事件类型
            tabtimer: false, //自动切换
            invoke: 2 //默认从哪项开始
        };
        this.option = option; //配置参数
        this.init();
    }

    // alert(1);
    Tab.prototype.init = function() {
        //配置参数覆盖默认参数
        Object.assign(this.setting, this.option);
        this.tab = document.querySelector(this.setting.id);
        console.log(this.tab);
        this.tabtitle = document.querySelectorAll('#tab .tab_title li');
        this.tabcontent = document.querySelectorAll('.tab_content .item');
        this.num = 0; //存放当前点击标题的索引
        this.timer = null; //鼠标移入移出的返回值
        this.autotimer = null; //自动轮播的返回值
        var _this = this;
        // alert('a');
        console.log(this.tabtitle);
        for (var i = 0; i < this.tabtitle.length; i++) {
            this.tabtitle[i].index = i;
            if (this.setting.etype == 'onclick' || this.setting.etype != 'onmouseover') {
                this.tabtitle[i].onclick = function() {
                    _this.num = this.index;
                    _this.tabswitch();
                }
            } else {
                //防止tab切换频繁触发。
                this.tabtitle[i][this.setting.etype] = function() {
                    _this.num = this.index;
                    _this.timer = setTimeout(function() {
                        _this.tabswitch();
                    }, 400);
                };
                this.tabtitle[i].onmouseout = function() {
                    clearTimeout(_this.timer);
                }
            }
        }
        //判断是否自动切换
        if (this.setting.tabtimer) {
            this.autoplay();
            this.tab.onmouseover = function() {
                clearInterval(_this.autotimer);
            };
            this.tab.onmouseout = function() {
                _this.autoplay();
            }
        }
        //默认从哪项开始
        if (this.setting.invoke && this.setting.invoke > 0 && this.setting.invoke <= this.tabtitle.length) {
            this.num = this.setting.invoke - 1;
            this.tabswitch();
        } else {
            this.num = 0;
        }

    }

    //切换过程
    Tab.prototype.tabswitch = function() {
        for (var i = 0; i < this.tabtitle.length; i++) {
            this.tabtitle[i].className = '';
            this.tabcontent[i].className = 'item';
        }
        this.tabtitle[this.num].className = 'active';
        this.tabcontent[this.num].className = 'item show';
    }

    //自动切换
    Tab.prototype.autoplay = function() {
        var _this = this;
        this.autotimer = setInterval(function() {
            _this.num++;
            if (_this.num > _this.tabtitle.length - 1) {
                _this.num = 0;
            }
            _this.tabswitch();
        }, 3000);
    }


    window.Tab = Tab; //将构造函数暴露出来
})(window);


! function() {
    new Tab();

    new Tab({
        id: '#tab1',
        etype: 'onclick',
        tabtimer: false,
        //invoke: 2,
    });
}();


// the validation of the form register


;
! function() {

    class formValidation {
        constructor() {

            // get all elements in this part
            this.btnl = $('#tab_title_left');
            this.btnr = $('#tab_title_right');
            this.vipnum = $('#vipnum');
            this.viptip = $('#vipnumtip');
            this.emailr = $('#emailright');
            this.emailt = $('#emailtext');
            this.snian = $('#year')
            this.syue = $('#month')
            this.sri = $('#day')
            this.setpwd = $('#setpwd');
            this.pwdtip = $('#setpwdtip')
            this.checkpwd = $('#checkpwd');
            this.checkpwdtip = $('#checkpwdtip')
            this.telr = $('#telr');
            this.checktelr = $('#checktelr');
            this.subscribe = $('#subscribe')
            this.agreement = $('#agreement');
            this.submitr = $('#submit1');
            this.vipnumstop = false;
            this.emailstop = false;
            this.pwdstop = false;
            this.checkswitchstop = false;
            this.telrstop = false;
        }
        init() {
            let _this = this;
            this.verification();
            this.submitr.on('click', function() {
                _this.submitrInformation();
            })
        };
        verification() {
            let _this = this;

            // 验证会员卡号 若满足则验证通过 会员卡号开关开
            this.vipnum.focus(function() {
                _this.viptip.html('若忘记会员卡号，请联系售后');
                _this.viptip.css('color', 'green');
                $(this).attr('placeholder', '请输入16位会员卡号')
            });
            this.vipnum.blur(function() {
                // console.log($(this).val());
                if (_this.vipnum.val() != '') {
                    if (/^\d{16}$/.test(_this.vipnum.val())) {
                        console.log('验证通过')
                            // _this.viptip.html('验证通过');
                        _this.vipnumstop = true;
                        _this.viptip.html('欢迎光临山姆会员！');
                    } else {
                        _this.viptip.html('会员卡号格式错误,请重新输入');
                        _this.viptip.css('color', 'red');
                    };
                } else {
                    _this.viptip.html('请输入会员卡号');
                    _this.viptip.css('color', 'red');
                };
            });


            // 验证邮箱 若验证通过  则邮箱开关开

            this.emailr.focus(function() {
                _this.emailt.html('支持163，QQ，Foxmail及其他电子邮箱');
                _this.emailt.css('color', 'green');
                $(this).attr('placeholder', '请输入邮箱地址')
            });
            this.emailr.blur(function() {
                // console.log($(this).val());
                if (_this.emailr.val() != '') {
                    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(_this.emailr.val())) {
                        console.log('验证通过')
                            // _this.viptip.html('验证通过');
                        _this.emailstop = true;
                        _this.emailt.html('欢迎光临山姆会员！');
                    } else {
                        _this.emailt.html('电子邮箱格式错误,请重新输入');
                        _this.emailt.css('color', 'red');
                    };
                } else {
                    _this.emailt.html('请输入电子邮箱');
                    _this.emailt.css('color', 'red');
                };
            });



            // alert('2')
            // 验证是否选择select里的注册时间


            // 验证设置密码  6-20位字符，可由大小写英文、数字或符号“-”“_”组成
            // 首先设置密码
            this.setpwd.focus(function() {
                // console.log(1111)
                _this.pwdtip.html('请输入您的密码！');
                _this.pwdtip.css('color', "green");
            });

            this.setpwd.blur(function() {
                if (_this.setpwd.val() != '') {
                    // console.log('OK');
                    if (/(?!^[0-9]{6,24}$)^[0-9A-Za-z\u0020-\u007e]{6,24}$/.test(_this.setpwd.val())) {
                        _this.pwdtip.html('请继续验证密码');
                        _this.pwdtip.css('color', "orange");
                        this.pwdstop = true;
                    } else {
                        // console.log('密码格式错误')
                        if (_this.setpwd.val().split('').length < 6) {
                            _this.pwdtip.html('密码过短，最短支持6个字符');
                            _this.pwdtip.css('color', '#e02f2f');
                        } else if (_this.setpwd.val().split('').length > 24) {
                            _this.pwdtip.html('密码过长，最长支持24个字符');
                            _this.pwdtip.css('color', '#e02f2f');
                        } else {
                            _this.pwdtip.html('密码应为字母、数字或半角符号的组合');
                            _this.pwdtip.css('color', '#e02f2f');
                        };
                    };
                } else {
                    _this.pwdtip.html('密码不能为空');
                    _this.pwdtip.css('color', "red");
                };
            });


            //再次验证密码
            this.checkpwd.focus(function() {
                _this.checkpwdtip.html('请再次输入您的密码');
                _this.checkpwdtip.css('color', 'green');
            });

            this.checkpwd.blur(function() {
                // console.log(_this.checkpwd.val())
                if (_this.checkpwd.val() != '') {
                    if (_this.checkpwd.val() == _this.setpwd.val()) {
                        _this.checkpwdtip.html('欢迎光临山姆会员！');
                        _this.checkswitchstop = true;
                    } else {
                        _this.checkpwdtip.html('两次密码输入不一致');
                        _this.checkpwdtip.css('color', '#e02f2f');
                    }
                } else {
                    _this.checkpwdtip.html('确认密码不能为空');
                    _this.checkpwdtip.css('color', 'red');
                }
            });



            // 验证手机号

            this.telr.focus(function() {
                _this.checktelr.html('为了您的账号安全，请填写常用手机号');
                _this.checktelr.css('color', 'green');
            });

            this.telr.blur(function() {
                // console.log(_this.input.eq(0).val())
                if (_this.telr.val() != '') {
                    if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(_this.telr.val())) {
                        _this.checktelr.html('');
                        _this.telrstop = true;

                    } else {
                        _this.checktelr.html('手机号码格式错误');
                        _this.checktelr.css('color', '#e02f2f');
                    }
                } else {
                    _this.checktelr.html('请输入手机号码');
                    _this.checktelr.css('color', '#e02f2f');
                }
            });

        };


        submitrInformation() {
            let _this = this;
            if (this.checkbox.get(0).checked) {
                if (this.vipnumstop == true && this.pwdstop == true && this.emailstop == true && this.checkswitchstop == true && this.telrstop == true) {
                    $.ajax({
                        url: "http://10.31.163.172/Samsclub/php/registor.php",
                        type: "POST",
                        data: {
                            usertel: _this.input.eq(0).val(),
                            password: _this.input.eq(1).val(),
                        },
                        success: function(data) {
                            console.log(data)
                            if (data == 'true') {
                                window.location.href = 'http://10.31.163.172/Samsclub/src/login.html';
                            } else {
                                _this.label.eq(0).html('用户名已存在，<a href="http://10.31.163.172/Samsclub/src/login.html">去登录</a>');
                                _this.label.eq(0).css('color', '#e02f2f');
                            }
                        }
                    })
                }
            }
        }

    };



    new formValidation().init();
}();