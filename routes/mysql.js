const router = require('koa-router')()
const conmysql = require('../bin/conmysql');


router.get('/mysql',async (ctx,next) => {
  let activesql = new conmysql()

  let test = await activesql.ls("select * from users")
  //console.log(test)

  ctx.body = test

})






module.exports = router
