import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class UserService {
  private response: IResponse;

  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  // 根据用户手机号查询记录
  async findOneByPhone(phone: string) {
    return await this.userModel.find({
      phone,
    });
  }

  async hello() {
    return {
      code: 0,
      msg: 'hello world',
    };
  }
}
