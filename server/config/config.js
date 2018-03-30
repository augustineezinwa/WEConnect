const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT
  },
  test: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT
  },
  production: {
    use_env_variable: 'DB_PROD_URL'

  }
};
