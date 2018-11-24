$(function () {
    var currentPage = 1;
    var size = 2;
    //1、 渲染页面
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: size
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var str = template("tmp", res);
                $("tbody").html(str);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page, //当前页
                    totalPages: Math.ceil(res.total / res.size), //总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();
    // 2、显示模态框
    $("#addProduct").on("click", function () {
        $("#addModal").modal("show");
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var str = template("tmp1", res);
                $(".dropdown-menu").html(str);
            }
        });
    });

    // 3、给模板里的a添加点击事件
    $(".dropdown-menu").on("click", "a", function () {
        $(".modal-body .txt").text($(this).text());
        $('[name = "brandId"]').val($(this).data("id"));
        $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID')
    });

    // 4、图片地址
    var picarr = [];
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            picarr.unshift(data.result);
            var picUrl = data.result.picAddr;
            $('#imgBox').prepend('<img  src="' + picUrl + '" width="100px" height="100px">');
            if (picarr.length > 3) {
                picarr.pop();
                $('#imgBox img:last-of-type').remove();
            }
            if (picarr.length === 3) {
                $("#form").data('bootstrapValidator').updateStatus('imgStatus', 'VALID')
            }
        }
    });

    // 5、表单校验
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
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d$/,
                        message: '用户名必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是xx-xx的格式, xx是两位数字, 例如: 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品原价'
                    },
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品现价'
                    },
                }
            },
            imgStatus: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品现价'
                    },
                }
            },
        }


    });


    // 6、成功后提交AJAX
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var paramsStr = $('#form').serialize();
        paramsStr += '&picName=' + picarr[0].picName + '$picAddr1=' + picarr[0].picAddr;
        paramsStr += '&picName=' + picarr[1].picName + '$picAddr2=' + picarr[1].picAddr;
        paramsStr += '&picName=' + picarr[2].picName + '$picAddr3=' + picarr[2].picAddr;
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: paramsStr,
            dataType: 'json',
            success: function (res) {
                console.log(res);
                $("#addModal").modal("hide");
                render();
                $('#form').data("bootstrapValidator").resetForm(true);
                $(".modal-body .txt").text('请选择二级分类');
                $('#imgBox img').remove();
                picarr = [];
            }
        })
    });
});