import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { addSalt, encript } from '../utils/Encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    // 对用户密码进行加密
    if (userPassword) {
      const salt = addSalt();
      userPassword = encript(userPassword, addSalt());
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    console.log(req.body);
    next();
  }
}
