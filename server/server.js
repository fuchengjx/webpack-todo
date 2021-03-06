const Koa = require('koa')
const app = new Koa()

const pageRouter = require('./routers/dev-ssr')

const isDev = process.env.NODE_ENT === 'development'

app.use(async (ctx, next) => {  // 简单的koa中间件 用来记录所有请求的路径 和错误
  try {
    console.log('request with path ${ctx.path}')  // 将所有请求的路径打印记录出来
    await next()
  } catch (err) {
    console.log(err)  // 出现任何错误都打印出来
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, ()=> [
  console.log(`server is listening on ${HOST}:${PORT}`)
])