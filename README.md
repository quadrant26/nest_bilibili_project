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

  * 安装依赖

    ```
      // 安装依赖
      npm install --save @nestjs/mongoose mongoose
    ```

  * 连接数据库

    ```
      // 创建 db 模块
      nest g mo db
      // 连接数据库
      // db/db.module.ts
      import { Module } from '@nestjs/common';
      import { MongooseModule } from '@nestjs/mongoose';

      @Module({
        imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_bilibili', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        })],
      })
      export class DbModule {}
    ```

  * 导入数据库模块

    ```
      // 在 app.module.ts 使用
      @Module({
        imports: [DbModule, UserModule],
        controllers: [AppController],
        providers: [AppService],
      })
      export class AppModule {}
    ```

  * 设计表模型 Schema

    ```
      // user.interface.ts
      @Schema()
      export class User extends Document {
        @Prop()
        @ApiProperty({ description: '手机号', example: '18688924563' })
        readonly phone: string;

        @Prop()
        @ApiProperty({ description: '密码', example: '132456' })
        readonly password: string;
      }
    ```

  * 使用表模型

    ```
      // db/Schema/user.sachema.ts
      export const UserSchema = SchemaFactory.createForClass(User);

      // db/db.module.ts
      import { MongooseModule } from '@nestjs/mongoose';
      import { UserSchema } from './Schema/user.schema';

      const MONGO_MODELS = MongooseModule.forFeature([
        {
          name: 'USER_MODEL',
          schema: UserSchema,
          collection: 'user',
        },
      ]);

      // 注册 
      @Global()
      @Module({
        imports: [
          // ...
          MONGO_MODELS
        ]
      })
    ```

### log4js 日志文件


  * 安装

    ```
      yarn add @nestx-log4js/core
    ```

  * 使用
  ```
    // app.module.ts
    import { Log4jsModule } from '@nestx-log4js/core';

    @Module({
      imports: [
        Log4jsModule.forRoot()
      ]
    })
    export class AppModule {}

    // main.ts
    import { Log4jsLogger } from '@nestx-log4js/core';
    app.useLogger(app.get(Log4jsLogger));

  ```
### 中间件

  ```
    // hello.middleware.ts
    @Injectable()
    export class HelloMiddleware implements NestMiddleware {
      use(req: Request, res: Response, next: NextFunction) {
        // console.log(req.body);
        next();
      }
    }

    // 在 user.module.ts 中使用
    export class UserModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        // apply 关联中间件
        // forRoutes 只关联 user 模块
        consumer.apply(HelloMiddleware).forRoutes('user');
      }
    }
  ```
### crypto

  * 安装

    `yarn add crypto`

  * 使用

    ```
      // hashPassword.middleware.ts
      import * as crypto from 'crypto'

      // 生成 salt
      crypto.randomBytes(3).toString('base64')

      // 加密
      // 第一个参数： 需要加密的字符串
      // 第二个参数： 盐
      // 第三个参数： 迭代次数
      // 第四个参数： 返回的字符串长度
      // 第四个参数： 加密方式
      crypto.pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256').toString('base64');
    ```

### Guard

  * 创建一个 守卫

  ```
    nest g gu auth
  ```

  * 使用守卫

    ```
      // 导入守卫文件
      // *.modules.ts
      @Module({
        providers: [
          UserService,
          {
            provide: APP_GUARD,
            useClass: AuthGuard,
          },
        ],
        controllers: [UserController],
      })
      export class UserModule implements NestModule {}

      
      // 全局使用
      // *.controller.ts
      @UseGuards(AuthGuard)
      export class UserController {
        
        @Get('hello')
        // 设置元数据
        @SetMetadata("role", ['admin']) // 设置元数据， 设置接口的权限
        @Role('admin') // 自定义装饰器
        hello() {
          return 'hello world';
        }

      }


      
    ```

### jwt 用户鉴权

  * 依赖

    ```
      npm install --save @nestjs/jwt passport-jwt @nestjs/passport
      npm install --save-dev @types/passport-jwt
    ```

  * 创建 auth

    ```
      nest g module auth
      nest g service auth
      nest g controller auth
    ```

  * jwt 设置

    ```
      // jwt.constans.ts
      export const JWT_CONSTANT = {
        secret: 'king_bilibili',
      };
      // jwt.strategy.ts jwt 策略
      import { ExtractJwt, Strategy } from 'passport-jwt';
      import { PassportStrategy } from '@nestjs/passport';
      import { Injectable } from '@nestjs/common';
      import { JWT_CONSTANT } from './jwt.constants';
      import { User } from 'src/interface/user.interface';

      @Injectable()
      export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor() {
          super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANT.secret,
          });
        }

        async validate(payload: User) {
          return { userId: payload._id };
        }
      }

      // jwt 生成 token
      constructor(
        @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
      ) {}

      // 创建 token
      private async createToToken(user: User) {
        return await this.jwtService.sign(user);
      }

      // main.ts
      // swagger
      const config = new DocumentBuilder().addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'jwt',
      )

      // 页面定义jwt
      @ApiBearerAuth('jwt')
      @UseGuards(AuthGuard('jwt')) // 在控制器上定义表示这个模块内的方法需要 token, 在单个方法上定义只有该方法需要 jwt 鉴权

    ```