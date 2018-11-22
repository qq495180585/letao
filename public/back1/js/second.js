$(function () {
    var currentPage = 1;
    var size = 5;

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: size
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                var str = template('tmp2', res);
                $('tbody').html(str);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(res.total / size), //总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });

            }
        })
    }
    render();

    // 添加分类

    $('.btn-add').on('click', function () {
        $('#secondModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (res) {
                var str = template('tmp', res);
                $('.dropdown-menu').html(str);
            }
        })
        // 1、获取id
        $('.dropdown-menu').on('click', 'a', function () {
            $('.txt').text($(this).text());
            $('[name = "categoryId"]').val($(this).data('id'));
            $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
        })
        // 2、获取图片地址
        $("#fileupload").fileupload({
            dataType: "json",
            //e：事件对象
            //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
            done: function (e, data) {
                console.log(data);
                $('#img').attr('src', data.result.picAddr);
                $('[name = "brandLogo"]').val(data.result.picAddr);
                $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
            }
        });


        // 3、表单校验
        $('#form').bootstrapValidator({
            excluded: [],
            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //3. 指定校验字段
            fields: {
                //校验用户名，对应name表单的name属性
                categoryId: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请选择一级分类'
                        },
                    }
                },
                brandLogo: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请选择图片'
                        },
                    }
                },
                brandName: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请选择二级分类'
                        },
                    }
                },
            }

        });
    })
})