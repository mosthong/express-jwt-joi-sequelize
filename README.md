# express-jwt-joi-sequelize

#### 介绍
一套简单的整和方案，极简快速开发，但可以随意拓展。
express
jwt
joi
sequelize

#### 软件架构
软件架构说明
框架：express
鉴权：jwt
参数校验：joi
数据库ORM：sequelize

#### 安装教程

```js
npm install
```

#### 使用说明

1.  路由： 
 路由管理 - router
 挂载 - app.use('/api', 路由)
2.  业务逻辑
 app>control（抽离业务逻辑请分离server、model）
3.  参数校验
app>scheme
 使用：见express-joi文档
4.  数据库
 ORM： sequelize

 ```js
 启动
 npm run dev
 发布
 开发与生产环境一致
 进程守护请自行使用
```

#### 参与贡献

1.  hong 提交代码
