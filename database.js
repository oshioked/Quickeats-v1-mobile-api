
const knex = require('knex');

// CONNECT TO DATABASE
const database = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL ? true : false
    }
})

module.exports = database;