import { Injectable } from '@nestjs/common';
import { User } from 'src/interface/user.interface';
import { UserService } from '../user/user.service';
import { IResponse } from '../interface/response.interface';
import { encript } from 'src/utils/Encription';

@Injectable()
export class AuthService {
  private response: IResponse;

  constructor(private readonly userService: UserService) {}

  // 用户登录验证
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return await this.userService
      .findOneByPhone(phone)
      .then((res) => {
        if (res.length === 0) {
          this.response = {
            code: 3,
            msg: '用户未注册',
          };
          throw this.response;
        }

        const dbUser: User = res[0];
        return dbUser;
      })
      .then((dbUser: User) => {
        const pass = encript(password, dbUser.salt);

        if (pass === dbUser.password) {
          return (this.response = {
            code: 0,
            msg: '登录成功',
          });
        } else {
          this.response = {
            code: 4,
            msg: '密码错误',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  public async login(user: User) {
    return await this.validateUser(user);
  }
}
