$(function () {
  $('#toReg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })

  $('#toLogin').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })

  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      let pwd = $('.reg_box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入不一致！'
      }
    }
  })


  $('#form_reg').submit(function (e) {
    e.preventDefault();
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',
      data, function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        $('#toLogin').click()
      })
  });

  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: '/api/login',
      data: $(this).serialize(),

      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return '登录失败！'
        }
        layer.msg('登录成功！')
        localStorage.setItem('token', res.token)
        location = 'index.html'
      }
    });
  })
})