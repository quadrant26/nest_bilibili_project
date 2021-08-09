# nest_bilibili_project
Nestjs In Bilibili Study

## 初始化项目

```
  nest new server
```

### nest 命令

```
  // 创建一个 module
  nest g module|mo name

  // 创建一个 controller
  nest g controller|co name

  // 创建一个服务
  nest g service|s name

  // 创建 依赖lib
  nest g library|lib name // rename
```


### swagger 接口文档

```
  // 安装依赖包
  yarn add @nestjs/swagger swagger-ui-express
  // main.ts
  // 使用 swagger
  const config = new DocumentBuilder()
    .setTitle('Nestjs BiliBili')
    .setDescription('The Nestjs API description')
    .setVersion('1.0')
    .addTag('Nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  // 常用 swagger 方法
  @ApiTags('控制器接口说明');
  @ApiOperation({ summary: "接口名称"})
  @ApiProperty() 接口参数说明

```
### mongodb

+ 使用

  [adminMongo 本地运行访问地址](http://127.0.0.1:1234)
  ```
    // web mongodb 工具
    // git 地址 https://github.com/mrvautin/adminMongo.git
    // one step 安装依赖
    yarn || npm install
    // 启动
    npm start
    // 访问地址
    [访问地址](http://127.0.0.1:1234)
    // 连接MongoDB
    mongodb://127.0.0.1:27017

  ```

+ nest 使用 mongose

```
  // 安装依赖
  npm install --save @nestjs/mongoose mongoose

  // 创建 db 模块
  nest g mo db
  // 连接数据库
  // db/db.module.ts
  import { Module } from '@nestjs/common';
  import { MongooseModule } from '@nestjs/mongoose';

  @Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_bilibili')],
  })
  export class DbModule {}
```