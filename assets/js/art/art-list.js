$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage;
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  getArtList()
  function getArtList() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        let artList = template('cateList', res)
        $('tbody').html(artList)
        renderPage(res.total)
      }
    });
  }

  template.defaults.imports.dataFormat = function (data) {
    var dt = new Date(data)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  getArtCate()
  function getArtCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章分类失败！')
        }

        var htmlStr = template('tpl-cate', res)
        $('#cate_id').html(htmlStr)
        form.render()
      }
    })
  }

  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    // 获取表单中选中项的值
    var cate_id = $('#cate_id').val()
    console.log(cate_id);
    var state = $('[name=state]').val()
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id
    q.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    getArtList()
  })

  function renderPage(total) {
    laypage.render({
      elem: 'pageBox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      limits: [2, 4, 6, 10],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, frist) {
        q.pagesize = obj.limit
        q.pagenum = obj.curr
        if (!frist) {
          getArtList()
        }
      }
    })
  }

  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    var len = $('.btn-delete').length
    console.log(id);
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          if (len === 1) {
            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          getArtList()
        }
      })

      layer.close(index);
    });

  })
})