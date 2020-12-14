$(function () {
  var layer = layui.layer
  var form = layui.form
  initEditor()
  initArtData()
  function initArtData() {
    $.ajax({
      method: "",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章分类失败！')
        }
        var coverStr = template('tel-cover', res)
        $('[name=cate_id]').html(coverStr)
        form.render()
      }
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  $('.cho-cover').click(function () {
    $('#coverFile').click()
  })
  $('#coverFile').on('change', function (e) {
    var files = e.target.files
    if (files.length === 0) {
      return
    }
    var newUrl = URL.createObjectURL(files[0])
    console.log(newUrl);
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  var flag = '已发布'
  $('#add-draft').click(function () {
    flag = '草稿'
  })
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()

    var fd = new FormData($(this)[0])
    fd.append('state', flag)
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        pubArtData(fd)
      })

  })

  function pubArtData(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        location.href = '/art/art-list.html';
      }
    })
  }
})