import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelloMiddleware } from '../middleware/hello.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply 关联中间件
    // forRoutes 只关联 user 模块
    consumer.apply(HelloMiddleware).forRoutes('user');
    // throw new Error('Method not implemented.');
  }
}
