$(function () {
  var layer = layui.layer
  //调用获取的用户基本信息
  getUserInfo()
  //点击按钮，实现退出功能
$('#btnLogout').on('click',function(){
console.log('ok');
layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
  //do something
  localStorage.removeItem('token')
  location.href='/login.html'
  layer.close(index);
});
})
})
  //获取用户的基本信息
  var layer = layui.layer
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      //请求的配置对象
      //以 /my 开头的请求路径，
      //需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
      // header]: {
      //   Authorization: localStorage.getItem('token') || ''
      // },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取信息失败')
        }
        //调用renderAvatar渲染用户的头像
        renderAvatar(res.data)

      },
      //不论成功还是失败最后都会调用complete函数
      complete:function(res){

        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      if(res.responseJSON.status ===1&&res.responseJSON.message === '身份认证失败！'){
        localStorage.removeItem('token')
        location.href='/login.html'
      }
      }
    })
  }
  //渲染用户的头像
  // function renderAvatar(user) {
  //   var name = user.nickname || user.username
  //   $('#welcome').html('欢迎 &nbsp;&nbsp;'+name)
  //   //按需渲染用户的头像
  //   if (user.user_pic !== null) {
  //     // 3.1 渲染图片头像
  //     $('.layui-nav-img')
  //       .attr('src', user.user_pic)
  //       .show()
  //     $('.text-avatar').hide()
  //   } else {
  //     // 3.2 渲染文本头像
  //     $('.layui-nav-img').hide()
  //     var first = name[0].toUpperCase()
  //     $('.text-avatar')
  //       .html(first)
  //       .show()
  //   }
  // }
  function renderAvatar(user){
    var name = user.nickname||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp'+name)
    if(user.user_pic!==null){
      $('.layui-nav-img').attr('src',user.user_pic).show()
      $('.text-avatar').hide()
    }else{
      var first = name[0].toUpperCase()
      $('.layui-nav-img').hide()
      $('.text-avatar').html(first).show()
    }

  }







