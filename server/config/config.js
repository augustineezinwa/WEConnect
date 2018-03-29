import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: 'process.env.DEV_USER',
    password: 'process.env.DEV_PASS',
    database: 'process.env.DEV_DB',
    host: 'process.env.DEV_HOST',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'inieef',
    database: 'weconnect',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    database: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
