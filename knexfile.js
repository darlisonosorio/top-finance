// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_URL || 'db',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'db_finance',
      user:     process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_URL || 'db',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'db_finance',
      user:     process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }


};
