const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  console.log('aaaaaa')
  ctx.body = {
    errno: 0,
    data: ['获取博客列表'],
    query: ctx.query
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
