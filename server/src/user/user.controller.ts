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
import { AuthGuard } from '../guards/auth.guard';
import { Role } from 'src/role/role.decorator';

@Controller('user')
@ApiTags('用户模块')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('regist')
  @ApiOperation({ summary: '用户注册' })
  async registerUser(@Body() userDto: User) {
    return await this.userService.register(userDto);
  }

  @Get('hello')
  // @SetMetadata('roles', ['admin']) // 设置元数据， 设置接口的权限
  @Role('admin') // 自定义装饰器
  hello() {
    return 'hello world';
  }
}
