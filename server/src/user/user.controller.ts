import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { UserService } from './user.service';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

import { RedisInstance } from '../database/redis';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  // @SetMetadata('roles', ['admin']) // 设置元数据， 设置接口的权限
  @Role('admin') // 自定义装饰器
  async hello() {
    try {
      // 实例化 redis
      const redis = await RedisInstance.initRedis('auth.certificate', 0);
      // 将信息存入 redis，并设置失效时间，语法：[key, seconds, value]
      await redis.setex(`hello`, 300, `world`);
    } catch (error) {
      return {
        code: 1,
        msg: error,
      };
    }
    return 'hello world';
  }
}
