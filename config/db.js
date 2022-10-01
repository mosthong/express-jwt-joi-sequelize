var mysql = require('mysql');

const host = '数据库地址'
const user = '用户名'
const password = '密码'
const database = '数据库名'

var db = mysql.createPool({
    host,
    user,
    password,
    database
})

module.exports = db
