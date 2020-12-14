$(function () {
  getUserData()
  var layer = layui.layer

  $('#sign_out').click(function () {
    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = "/login.html"
      layer.close(index);
    });
  })
})

function getUserData() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      console.log(res.data);
      renderAvatar(res.data)
    }
  })
}

function renderAvatar(user) {
  var name = user.nickname || user.username
  $('.welcome').html('欢迎您&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text_hp').hide()
  } else {
    var frist = user.username[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text_hp').html(frist).show()
  }
}