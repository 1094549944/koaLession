const Koa = require('koa')
const fs = require('fs')
const app = new Koa()


/**
 * 使用promise 封装异步读取文件方法
 */
function render (page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据url获取html内容
 * 
 * 
 */

async function route (url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render(view)
  return html
}

app.use(async (ctx) => {
  let url = ctx.request.url
  //console.log()
  let html = await route(url)
  ctx.body = html
  //ctx.body = 'hello koa2'
})
app.listen(3000)
console.log('程序已启动')


