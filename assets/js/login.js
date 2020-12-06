$(function () {
    $('#toReg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#toLogin').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
})