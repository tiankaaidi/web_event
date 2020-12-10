$(function () {
  var layer = layui.layer
  var form = layui.form
  getArtData()
  function getArtData() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        var htmlStr = template('tpl-table', res)
        $('#tbody').html(htmlStr)
      }
    });
  }
  var flag = null
  $('.add-art').click(function () {
    flag = layer.open({
      title: '添加文章分类',
      type: 1,
      area: ['500px', '250px'],
      content: $('#dialog-add').html()
    });
  })

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增文章分类失败！")
        }
        layer.msg("新增文章分类成功！")
        getArtData()
        layer.close(flag)
      }
    });
  })

  $('tbody').on('click', '#art-edit', function () {
    layer.open({
      title: '添加文章分类',
      type: 1,
      area: ['500px', '250px'],
      content: $('#dialog-edit').html()
    });
    var id = $(this).attr('data-id')
    var name = $(this).attr('data-name')
    var alias = $(this).attr('data-alias')
    form.val('form-edit', {
      Id: id,
      name: name,
      alias: alias
    })
  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改文章分类失败！')
        }
        layer.msg('修改文章分类成功！')
        layer.closeAll()
        getArtData()
      }
    })
  })

  $('tbody').on('click', '#art-del', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除文章分类失败！')
          }
          layer.msg('删除文章分类成功！')
          layer.closeAll()
          getArtData()
        }
      })

      layer.close(index);
    });

  })
})