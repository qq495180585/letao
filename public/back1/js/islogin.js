$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (res) {
        if (res.success) {
            console.log('该用户已登录');
        }
        if (res.error === 400) {
            location.href = 'login.html';
        }

    }
});