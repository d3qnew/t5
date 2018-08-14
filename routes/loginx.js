const router = require('koa-router')();
const passport = require('../bin/passport');
const consql = require('../bin/conmysql');
let reqname = '';
let backurl = '';                             //登录来源页

/** * 认证登录 */
router.post('/loginx', async (ctx, next) => {

  reqname = await ctx.request.body.username;

  return passport.authenticate('local',
      async function(err, user, info, status) {

        //console.log(user)
        //修饰登录错误信息
        let miss = '';
        if(typeof (info)!='undefined'){
          switch (info['message']) {
            case 'Missing credentials':
              miss = '信息不完整';
              break;
            case 'name error':
              miss = '用户名或密码错误';
              break;
            default:
              miss = '一般错误';
              break;
          }
        }


        if (user) {

          if (backurl != '') {
            //ctx.body = '<script>window.location.href="'+backurl+'"</script>';
            await ctx.redirect('back', backurl);                               //redirect 重定向地址 'back' 关键字定义刷新,可以省略

          } else {
            await ctx.redirect('back', '/');
          }

          return ctx.login(user);                             //验证成功
        } else {
          await ctx.render('loginx', {err: miss, title: 'loginx'});      //info 接收验证错误信息
        }

      })(ctx);

});

//登出
router.post('/logout', async (ctx, next) => {
  ctx.logout();
  //ctx.body = {auth: ctx.isAuthenticated(), user: ctx.state.user};
  ctx.redirect('back', backurl);
});

router.get('/loginx', async (ctx, next) => {
  await ctx.render('loginx', {
    title: 'loginx',
  });
});

// 以下为自定义需要身份认证的路由

router.get('/admin', async function(ctx, next) {
  //console.log(ctx.isAuthenticated())
  if (ctx.isAuthenticated()) {

    let u = await consql.ls('select class from users where username = \'' + reqname + '\'');
    //console.log(u)
    if (u[0]['class'] === 'admin') {
      await ctx.render('admin', {
        title: 'admin',
      });
    } else {
      ctx.body = '非法访问';
      ctx.logout();
    }
  }
  else {
    if (ctx._matchedRoute != '/loginx' && ctx._matchedRoute != '') {         //如果来源页是登录页,转到首页
      backurl = ctx._matchedRoute;
    } else {
      backurl = '/';
    }

    await ctx.render('loginx', {
      title: '',
      backurl: backurl,          //上一页rul
    });
  }
});

///////////////////////////////////////////////////////////
module.exports = router;

