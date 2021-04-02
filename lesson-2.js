import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
    ctx.body = 'hello GET request'
})

router.get('/list', async ctx => {
    ctx.body = [1, 2, 3]
})

router.post('/list', async ctx => {
    ctx.body = {
        code: 0,
        list: [1, 3, 5]
    }
})

router.get('/list/:name', async ctx => {
    ctx.body = {
        name: ctx.params.name,
        time: Date.now()
    }
})

const proxy = new Router()

proxy.get('/find', async ctx => {
    ctx.body = {
        "name": "John",
        "sex": "male",
        "age": '19'
    }
})

const group = new Router({
    prefix: '/group'
})

group.get('/', async ctx => {
    ctx.body = 'group'
})

group.get('/list', async ctx => {
    ctx.body = [3, 6, 9]
})

group.get('/address', async ctx => {
    ctx.body = {
        name: 'PartIII, Luosifu Road',
        number: 46
    }
})

const sub = new Router({
    prefix: '/sub'
})

sub.get('/froms/:uid', async ctx => {
    ctx.body = {
        code: 0,
        uid: ctx.params.uid,
        time: Date.now()
    }
})

sub.get('/froms', async ctx => {
    ctx.body = {
        code: 0,
        forms: true
    }
})

const nest = new Router()
nest.use('/nest', sub.routes())

const db = new Router()
// 连续处理3个中间件
db.get('/db/:id',async (ctx, next) => {
    // mongoose 查库
    ctx.user = 'test_user'
    next()
}, async (ctx, next) => {
    // 打日志
    ctx.time = Date.now()
    next()
}, async ctx => {
    // 输出
    ctx.body = {
        user: ctx.user,
        time: ctx.time
    }
})

// 接口重定向
proxy.get('/broken', async ctx => {
    ctx.redirect('/find')
})

app.use(router.routes()).use(router.allowedMethods())   // 写这个后缀会先处理option预请求
app.use(proxy.routes())
app.use(group.routes())
app.use(nest.routes())
app.use(db.routes())
app.listen(3000)
