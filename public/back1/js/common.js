$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    NProgress.done();
})




$(function () {
    // 左侧二级切换功能
    $('.lt-aside .nav ul li .category').on('click', function () {
        $('.lt-aside .nav ul li .classify').stop().slideToggle();
    })
    // 右上左按钮
    $('.lt-main .lt-topbar .pull-left').on('click', function () {
        $('.lt-aside').toggleClass('hidemenu');
        $('.lt-main .lt-topbar').toggleClass('hidemenu');
        $('.lt-main').toggleClass('hidemenu');
    })
    // 退出登录功能
    $('.lt-main .lt-topbar .pull-right').on('click', function () {
        $('#myModal').modal('show');
    })
    $('.btn-out').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    location.href = 'login.html';
                }
                if (res.error) {
                    console.log('操作失败');
                }

            }
        })
    })
})