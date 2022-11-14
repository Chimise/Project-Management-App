const { loadEnvConfig } = require('@next/env')
const path = require('path');

const dev = process.env.NODE_ENV !== 'production'

const { DB_USER, DB_PASSWORD, DB_NAME } = loadEnvConfig(path.resolve('../'), dev).combinedEnv;

module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
        port: 5432,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
  },
  migrations: {
    directory: '../knex/migrations',
  },
  seeds: {
    directory: '../knex/seeds',
  },
}
