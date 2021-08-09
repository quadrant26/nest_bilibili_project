import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('regist')
  @ApiOperation({ summary: '用户注册' })
  async registerUser(@Body() userDto: User) {
    return await this.userService.register(userDto);
  }
}
