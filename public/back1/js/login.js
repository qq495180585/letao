$(function () {
    $("#form").bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2到6之间"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "用户名长度必须在6到12之间"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    location.href = "index.html";
                }
                if (res.error === 1000) {
                    var validator = $("#form").data("bootstrapValidator");
                    validator.updateStatus("username", "INVALID", 'callback');
                }
                if (res.error === 1001) {
                    var validator = $("#form").data("bootstrapValidator");
                    validator.updateStatus("password", "INVALID", 'callback');
                }
            }
        });
    });
    $('button[type = "reset"]').on("click", function () {
        var validator = $("#form").data("bootstrapValidator");
        console.log(validator);
        validator.resetForm(true);
    });
});