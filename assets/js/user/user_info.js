$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间'
      }
    }
  })

  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return '获取用户信息失败！'
        }
        console.log(res);
        form.val('formUserInfo', res.data)
      }
    });
  }

  $('#btnReset').click(function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('提交用户信息失败！')
        }
        layer.msg('提交用户信息成功！')
        window.parent.getUserData()
      }
    })
  })
})