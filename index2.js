const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()
home.get('/', async (ctx) => {
  console.log('我打开了页面')
  let html = `<div>
  I am / page
  </div>`
  ctx.body = html
})

let page = new Router()

page.get('/404', async (ctx) => {
  ctx.body = '404.page'
}).get('/helloword', async (ctx) => {
  ctx.body = 'hello page'
})
// koa-router 的allowedMethods 方法
/**
 * koa-router 的源码显示的业务逻辑：
 * 当所有路由中间件执行完成之后，若ctx.status 为空或者404的时候，
 * 丰富  response 对象 的header头
 * 
 * 如果我们不设置router.allowedMethosd()，在表现上除了ctx.status不会自动设置，以及response header中
 * 不会加上Allow之外，不会造成其他影响。
 * 
 */



/* 装载所有子路由 */
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())

router.use('/page', page.routes(), page.allowedMethods())


//加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("running")
})



