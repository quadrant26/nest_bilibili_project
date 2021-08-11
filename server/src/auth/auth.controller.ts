import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户登录验证')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async userLogin(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }

  @Post('regist')
  @ApiOperation({ summary: '用户注册' })
  async registUser(@Body() userDto: User) {
    return await this.authService.register(userDto);
  }

  @Post('alter')
  @ApiOperation({ summary: '修改密码' })
  async alterUser(@Body() userDto: User) {
    return await this.authService.alter(userDto);
  }
}
