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
  
```
