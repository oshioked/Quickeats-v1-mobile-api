
const knex = require('knex');

// CONNECT TO DATABASE
const database = knex({
    client: 'pg',
    connection: {
      host: 'ec2-3-222-30-53.compute-1.amazonaws.com',
      user: 'qxmnpoizlvrhgv',
      password: '065ba4e64d6495f34163fa7939b6699e04446404041a93d28bcd319e5dcfb32e',
      database: 'd6lslbhp97q0o6',
      ssl: true
    }
})

module.exports = database;