import * as Redis from 'ioredis';
import config from '../../config/db';

let n: number = 0;
const redisIndex = [];
const redisList = [];

export class RedisInstance {
  static async initRedis(method: string, db: number = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      console.log(
        `[Redis ${db} 来自 ${method} 方法调用， Redis 实例化了 ${n++} 次]`,
      );
      redisList[db] = new Redis({ ...config, db });
      redisIndex.push(db);
    } else {
      console.log(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }
}
