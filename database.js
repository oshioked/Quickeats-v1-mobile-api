
const knex = require('knex');

// CONNECT TO DATABASE
const database = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'iyogwoyaoshioke',
      password: '',
      database: 'test'
    }
})

module.exports = database;