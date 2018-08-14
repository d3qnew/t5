/*
build by d3qnew 
2018/6/4
*/

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const md5 = require('md5')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const passport = require('./bin/passport')
const session = require('koa-session2')
const fs = require('fs')
const xxtext = require('./bin/xxtext')

const index = require('./routes/index')
const users = require('./routes/users')
//const mysql = require('./routes/mysql')
const loginx = require('./routes/loginx')
const admin = require('./routes/admin')




// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))



app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/dist/public'))

app.use(views(__dirname + '/dist/views', {  extension: 'ejs' }))

app.use(async (ctx,next) =>{
  await xxtext(ctx)
  await next()
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  //console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


//app.keys = ['123456']
app.use(session({
  cookie: {secure: false, maxAge:86400000}
  //store: RedisStore(redisConf.session)
}, app))

//在app中开启koa-passport对session的支持
app.use(passport.initialize())
app.use(passport.session())





var router = require('./routes')




// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
//app.use(mysql.routes(), mysql.allowedMethods())
app.use(loginx.routes(),loginx.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())







router.all('404', ctx => {
  ctx.status = 404
  ctx.body = '404'
})



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});










module.exports = app
