$(function () {
  //给昵称自定义
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (nickname.length > 6) {
        return '不多于6个字符'
      }

    }
  })
  initUserInfo()
  //初始化表单
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return '获取用户信息失败'
        }
          // 调用 form.val() 快速为表单赋值
          form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    //引用初始化表单
    initUserInfo()

  })
 



  // 监听表单的提交事件
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if(res.status!==0){
          return '更新表单失败'
        }
        layer.msg('更新成功')
        //调用父节点的获取的用户基本信息
        window.parent.getUserInfo()
      }
    })
  })


})