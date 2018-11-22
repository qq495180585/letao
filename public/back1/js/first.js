$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                var str = template('tmp1', res);
                $('tbody').html(str);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page, //当前页
                    totalPages: Math.ceil(res.total / res.size), //总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render()
                    }
                });
            }
        })

    }
    render();
    // 添加分类
    $('.btn-first').on('click', function () {
        $('#firstModal').modal('show');
        $('#form').bootstrapValidator({

            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //3. 指定校验字段
            fields: {
                //校验用户名，对应name表单的name属性
                categoryName: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '不能为空'
                        },
                    }
                },
            }
        });
        $("#form").on('success.form.bv', function (e) {
            e.preventDefault();
            //使用ajax提交逻辑
            $.ajax({
                type: 'post',
                url: '/category/addTopCategory',
                data: $('#form').serialize(),
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                    if (res.success) {
                        $('#firstModal').modal('hide');
                        currentPage = 1;
                        render();
                        $("#form").data('bootstrapValidator').resetForm(true);
                    }
                }
            })
        });
    })
})