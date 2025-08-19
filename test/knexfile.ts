import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_URL || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'db_finance',
    },
    migrations: {
      directory: 'migrations',
    },
    seeds: {
      directory: 'seeds'
    }
  },
};

export default config;