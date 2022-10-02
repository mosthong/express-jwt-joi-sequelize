const path = require('path')
const express = require('express')
const { expressjwt: jwt } = require('express-jwt')
const Joi = require('joi')
const nunjucks = require('nunjucks')
const { JWT_SECRET, BASE_URL, PORT } = require('./config/app')

const app = express()

// 全局中间件 - 数据响应
app.use(function(req, res, next) {
  // 错误信息响应
  res.errMsg = function(err, code = 500) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    })
  }
  // 成功响应
  res.successMsg = function(data, message = 'success', code = 200) {
    res.send({
      code,
      data,
      message
    })
  }

  next()
})

// 托管静态资源 不同文件夹多个调用
// app.use('/public', express.static('./public')) // '/public' 路径前缀 可选

// 解析body参数
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 2.cors 跨域
const cors = require('cors')
app.use(cors())

// 3. token存储方式
// 3.1. session（前后端一体推荐）：设置/读取 req.session.user = ?
// const session = require('express-session')
// app.use(session({
//   secret: 'key123',
//   resave: false,
//   saveUninitialized: true
// }))
// 3.2. express-jwt 解密（前后端分离推荐）
// app.use(jwt(
//   { 
//     secret: JWT_SECRET,
//     algorithms: ["HS256"],
//   })
//   .unless({
//     path: ['/api/login', '/api/reguser']
//   })
// )

// 模版引擎 nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// 4. 路由: '/api' 统一访问前缀 app.use('/api', useRouter)
const useRouter = require('./router/user')
app.use('/api', useRouter)
const demoRouter = require('./router/demo')
app.use(demoRouter)


// fail 错误级别中间件
app.use(function (err, req, res, next) {
  // fail.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError)  return res.errMsg(err.message, 401)
  // fail.2 token校验失败
  if (err.name === 'UnauthorizedError')  return res.errMsg('token 校验失败', 401)


  // 未知错误
  res.errMsg(err.message, 500)
})


app.listen(PORT, () => console.log(`Example app listening on port ${BASE_URL}:${PORT}`))