# express-jwt-joi-sequelize
市场上node后端解决方案大多比较重。当然，对于一个健壮的项目很有必要，然而，大多项目其实并不需要。往往一个简单的项目，以来就高达一个G，实在不能忍，所以搭建了这个项目。
#### 介绍
一套Node极简后端解决方案，快速开发，虽然简单但可以随意拓展。

#### 软件架构
软件架构说明
框架：express
鉴权：jwt
参数校验：joi
数据库ORM：sequelize
模版引擎：nunjucks

#### 安装教程

```js
npm install
```

#### 使用说明
 参照demo
 1.  路由： 
 路由管理 - router
 挂载 - app.use('/api', 路由对象)
 2.  业务逻辑
 app>control（抽离业务逻辑请分离server、model）
 3.  参数校验
app>scheme
 使用：见express-joi文档
 4.  数据库
 ORM： sequelize
 5.  模版引擎
 在views目录下心间html文件，并使用res.render()方法引用。

 ```js
 // 启动
 npm run dev

 // 发布
 依赖与开发环境一致
 进程守护请自行配置
```
