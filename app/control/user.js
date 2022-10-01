const bcrypt = require('bcryptjs') // 加密
const db = require('../../config/db')
const { creatJwtSignature } = require('../../utils/jwt')

// 注册
exports.regUser = (req, res) => {
  const body = req.body
  const { username, password } = body

  // 查询用户是否存在
  const sqlSelect = 'select * from user where username=?'
  db.query(sqlSelect, username, (err, result) => {
    if (err) return res.errMsg(err.message, 401)
    if (result.length > 0) return res.errMsg('用户已存在', 401)

    // 加密密码
    const hash = bcrypt.hashSync(password, 10);
    // 插入新用户
    const user = {
      username, 
      password: hash
    }
    const sqlInsert = 'insert into user set ?'
    db.query(sqlInsert, user, function(err, result) {
      if (err) return res.errMsg(err.message, 401)
      if (result.affectedRows !== 1) return res.errMsg('用户注册失败，清稍后重试！', 401)

      res.errMsg('注册成功', 200)
    })
  })
}

// 登陆
exports.login = (req, res) => {
  const body = req.body
  const { username, password } = body

  // 查询用户是否存在
  const sqlSelect = 'select * from user where username=?'
  db.query(sqlSelect, username, (err, result) => {
    if (err) return res.errMsg(err.message, 401)
    if (result.length < 1) return res.errMsg('用户不存在', 500)

    const user = result[0]
    
    // 比对密码是否一致： 参数1: 用户输入明文密码， 参数2: 数据库加密密码
    let comparePwd = bcrypt.compareSync(password, user.password) 
    if (!comparePwd) return res.errMsg('登陆失败，请稍后重试！', 401)

    const token = creatJwtSignature({
      id: user.id,
      username: user.username,
			status: user.status,
    })

    res.successMsg({token: 'Bearer ' + token}, '登陆成功')
  })
}

// 查询 - 用户信息
exports.getUserInfo = (req, res) => {
  const { id } = req.auth

  const sql = 'select id, username, status, nickname from user where id=?'
  db.query(sql, id, (err, results) => {
    if (err) return res.errMsg(err)
    if (results.length < 1) return res.errMsg('获取用户信息失败')

    res.successMsg(results[0])
  })
}

// 更新 - 重置密码
exports.updateUserPwd = (req, res) => {
  const { oldPwd, newPwd } = req.body
  const { id } = req.auth

  const sql = 'select id, password from user where id=?'
  db.query(sql, id, (err, results) => {
    if (err) return res.errMsg(err)
    if (results.length < 1) return res.errMsg('用户不存在')

    // 比对密码是否一致： 参数1: 用户输入明文密码， 参数2: 数据库加密密码
    let comparePwd = bcrypt.compareSync(oldPwd, results[0].password) 
    if (!comparePwd) return res.errMsg('原密码错误', 401)

    // 更新用户信息
    const updateSql = 'update user set password=? where id=?'
    const newPwdHash = bcrypt.hashSync(newPwd, 10);
    db.query(updateSql, [newPwdHash, id], (err, results) => {
      if (err) return res.errMsg(err)
      if (results.affectedRows !== 1) return res.errMsg('更新密码失败')
  
  
      res.successMsg(null, '更新密码成功')
    })
  })
}

// 更新 - 头像
exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body
  const { id } = req.auth

  // 更新用户信息
  const updateSql = 'update user set avatar=? where id=?'
  db.query(updateSql, [avatar, id], (err, results) => {
    if (err) return res.errMsg(err)
    if (results.affectedRows !== 1) return res.errMsg('更新头像失败')


    res.successMsg(null, '更新头像成功')
  })
}