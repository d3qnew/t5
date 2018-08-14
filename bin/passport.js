// passport.js
const passport = require('koa-passport')
const md5 = require('md5')
const Consql = require('../bin/conmysql')
const consql = new Consql()
var LocalStrategy = require('passport-local').Strategy




// 提交数据(策略)1
passport.use(new LocalStrategy(async function(username, password, done) {
  //console.log('LocalStrategy', username, password)
    let pass = md5(md5(password))                           //2次md5加密
    let name = username
    console.log()
    let u = await consql.ls('select * from users where username = "'+name+'"')
    //console.log(u)
    if( u.length != 0 && pass === u[0]['password']){
      var user = {id: u['id'], username: name, password: pass}
      return done(null, user)
    }else {
      return done(null,false,{'message':'name error'})              //返回消息用json传递键名message
    }

  // done(err, user, info)
}))


// 序列化ctx.login()触发2
// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(async function(user, done) {
  done(null, user)
})


// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(async function(user, done) {
  done(null,user)
})


module.exports = passport