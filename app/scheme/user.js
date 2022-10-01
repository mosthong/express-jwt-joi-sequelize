const Joi = require('joi')

// 2. 定义验证规则
// 注意：如果客户端提交的某些参数项未在 schema 中定义，
// 此时，这些多余的参数项默认会被忽略掉
// const userSchema = {
  // 2.1 校验 req.body 中的数据
  // body: {
  //   username: Joi.string().alphanum().min(3).max(12).required(),
  //   password: Joi.string().pattern(/^[\S]{6,15}$/).required(),
  //   repassword: Joi.ref('password')
  // },
  // 2.2 校验 req.query 中的数据
  // query: {
  //   name: Joi.string().alphanum().min(3).required(),
  //   age: Joi.number().integer().min(1).max(100).required()
  // },
  // 2.3 校验 req.params 中的数据
  // params: {
  //   id: Joi.number().integer().min(0).required()
  // }
// }
const username = Joi.string().alphanum().min(3).max(12).required()
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()
const repassword = Joi.ref('password')

const oldPwd = password
const newPwd = Joi.not(Joi.ref('oldPwd')).concat(password)

const avatar = Joi.string().required()


// 注册/登陆
exports.user_register_schema = {
  body: {
    username,
    password,
    repassword
  }
}
// 密码
exports.user_updatepwd_schema = {
  body: {
    oldPwd,
    newPwd
  }
}
// 头像
exports.user_updatepwd_avatar = {
  body: {
    avatar
  }
}