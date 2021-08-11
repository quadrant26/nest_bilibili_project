import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/interface/user.interface';
import { UserService } from '../user/user.service';
import { IResponse } from '../interface/response.interface';
import { encript } from 'src/utils/Encription';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const logger = new Logger('user.service');

@Injectable()
export class AuthService {
  private response: IResponse;

  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

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

  // 用户注册方法
  async register(user: User) {
    return this.userService
      .findOneByPhone(user.phone)
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 1,
            msg: '该手机号已经注册',
          };
          // console.log('该用户已经注册');
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = {
            code: 0,
            msg: '注册成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户注册失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(this.response.msg);
        console.log(`发生问题${JSON.stringify(err)}`);
        // throw this.response;
        return err;
      })
      .finally(() => {
        // console.log(this.response);
      });
  }
}
