const express = require('express')
const expressJoi = require('@escook/express-joi')
const user = require('../app/control/user')
const { user_register_schema, user_updatepwd_schema, user_updatepwd_avatar } = require('../app/scheme/user')

const router = express.Router()

// 注册
router.post('/reguser', expressJoi(user_register_schema), user.regUser)
// 登陆
router.post('/login', expressJoi(user_register_schema),user.login)
// 查询 - 用户信息
router.get('/getUserInfo', user.getUserInfo)
// 更新 - 重置密码
router.post('/update/password', expressJoi(user_updatepwd_schema),user.updateUserPwd)
// 更新 - 头像
router.post('/update/avatar', expressJoi(user_updatepwd_avatar),user.updateUserAvatar)

module.exports = router