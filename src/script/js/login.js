;
! function() {
    var login = document.querySelector('.login');
    var user = document.querySelector('.username');
    var pass = document.querySelector('.password');
    login.onclick = function() {
        ajax({
            type: 'post',
            url: 'http://10.31.163.172/Samsclub/php/login.php',
            data: {
                username: user.value,
                password: pass.value
            },
            success: function(data) {
                if (!data) {
                    alert('用户名或者密码错误');
                    pass.value = '';
                } else {
                    location.href = "http://10.31.163.172/Samsclub/src/index123.html";
                    localStorage.setItem('userid', user.value);
                }
            }
        });
    }
}();