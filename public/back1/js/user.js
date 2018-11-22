$(function () {
    var currentPage = 1;
    var size = 5;

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: size
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var str = template('tmp', res);
                $('tbody').html(str);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(res.total / res.size), //总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        render();
                    }
                });

            }
        })
    }
    render();
    $('tbody').on('click', '.btn', function () {
        var id = $(this).parent().data('id');
        var isDelete = $(this).text() === '禁用' ? 1 : 0;
        $('#btnModal').modal('show');
        $('.btn-confirm').on('click', function () {
            $('#btnModal').modal('hide');
            $.ajax({
                type: 'post',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                dataType: 'json',
                url: '/user/updateUser',
                success: function (res) {
                    if (res.success) {
                        render();
                    }
                }
            })
        })

    })
})