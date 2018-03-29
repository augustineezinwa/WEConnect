import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT
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
