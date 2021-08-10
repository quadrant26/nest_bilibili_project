import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';
import { IResponse } from 'src/interface/response.interface';

const logger = new Logger('user.service');

@Injectable()
export class UserService {
  private response: IResponse;

  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  // 用户注册方法
  async register(user: User) {
    return this.findOneByPhone(user.phone)
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
      })
      .finally(() => {
        // console.log(this.response);
      });
  }

  // 根据用户手机号查询记录
  async findOneByPhone(phone: string) {
    return await this.userModel.find({
      phone,
    });
  }
}
