import Koa from 'koa'
import Router from 'koa-router'
// import bodyParser from 'koa-bodyparser'
import body from 'koa-better-body' // 这个中间件能支持form-data的post请求

const app = new Koa()
const router = new Router()

// 加入bodyParser中间件 拿request的参数
// app.use(bodyParser())
app.use(body())

// GET请求拿query
// router.get('/from', async ctx => {
//     ctx.body = ctx.query
// })

// // POST(x-www-unlencoded)请求拿request.body
// router.post('/from', async ctx => {
//     ctx.body = ctx.request.body
// })

router.post('/from', async ctx => {
    ctx.body = ctx.request.fields
})

router.get('/from', async ctx => {
    ctx.body = ctx.query
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)