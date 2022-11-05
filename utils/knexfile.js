const { loadEnvConfig } = require('@next/env')

const dev = process.env.NODE_ENV !== 'production'
const path = process.cwd();
const { DB_USER, DB_PASSWORD } = loadEnvConfig(path, dev).combinedEnv;

module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
        port: 5432,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_USER
  },
  migrations: {
    directory: './knex/migrations',
  },
  seeds: {
    directory: './knex/seeds',
  },
}
