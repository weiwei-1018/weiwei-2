$(function () {
  // 注册链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 登录链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  //  自定义密码
  var form = layui.form
  // 弹出框
  var layer = layui.layer
 
  form.verify({
    //自定义密码
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //重复密码
    repwd: function (val) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== val) {
        return '两次密码不一致'
      }
    }
  })

  $('#form_reg').submit(function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功')
      // 手动点击事件
      $('#link_login').click()

    })
  })

    $('#form_login').on('submit',function (e) {
      e.preventDefault()
      var data = $(this).serialize()
      $.post('/api/login', data, function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        console.log(res.token);
        layer.msg('登录成功')
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      
      })
    })













})