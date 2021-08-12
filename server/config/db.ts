const productConfig = {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: 'abc123456',
  },
};

const localConfig = {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: 'abc123456',
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
