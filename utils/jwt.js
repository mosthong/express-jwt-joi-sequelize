// jwt
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/app')

// 生成jwt
const creatJwtSignature = function(payload) {
  // 加密内容，密钥，配置对象（如有效期）
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: '24h'
    }
  )
}

module.exports = {
  creatJwtSignature
}