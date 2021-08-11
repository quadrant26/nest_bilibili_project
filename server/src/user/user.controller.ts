import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  SetMetadata,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { UserService } from './user.service';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  // @SetMetadata('roles', ['admin']) // 设置元数据， 设置接口的权限
  @Role('admin') // 自定义装饰器
  // @UseGuards(AuthGuard('jwt'))
  hello() {
    return 'hello world';
  }
}
