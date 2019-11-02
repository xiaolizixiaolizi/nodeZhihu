const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const cors = require('koa-cors')
const koaStatic = require('koa-static')
const db = require('./db')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const path = require('path')
  ; (async () => {
    // 等待数据库连接成功
    await db
    app.use(error({ //错误处理中间件
      postFormat(err, { stack, ...rest }) {
        // 生产环境=上线环境
        return process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
      }
    }))
    // 允许跨域
    app.use(cors())
    // koaStatic开放静态资源通常写在前面
    app.use(koaStatic(path.join(__dirname, 'public')))
    app.use(koaBody({
      multipart: true, //支持文件格式 
      formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true,
      }
    })) //post参数解析
    app.use(parameter(app)) //参数检验
    require('./routes/api/index')(app) // 批量注册路由注册路由

  })()
let port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) {
    return console.log('服务器启动错误', err)
  }
  console.log(`服务器正常启动在${port}`)
})