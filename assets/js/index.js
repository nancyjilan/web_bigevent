$(function () {
    getUserInfo();


function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
               return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },

        //执行complete函数  无论成功或者失败都会调用
       complete: function(res) {
           console.log('执行了complet函数');
           console.log(res); //responseJSON: {status: 1, message: '身份认证失败！'}
           if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
               //1.清空localStorage 里面的数据
               localStorage.removeItem('token')
               //2.强制返回登陆页面
               location.href = '/login.html'
           }  
    }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    //渲染welcom
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    //渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();
   }
    }
    var layer = layui.layer;
    //点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        //console.log('ok');

        layer.confirm('确定退出登陆', {icon: 3, title:'提示'}, function(index){
            //console.log('ok');
            //将localStorage 里面的token清除
            localStorage.removeItem('token')
            //自动跳转到登陆页面
            location.href='/login.html'
            layer.close(index);
          });
    })
})