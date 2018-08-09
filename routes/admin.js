const router = require('koa-router')()


router.get('/admin', async (ctx, next) => {
  await ctx.render('admin', {
    title: 'admin'
  })
})



module.exports = router
