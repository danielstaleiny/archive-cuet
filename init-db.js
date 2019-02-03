require('dotenv').config() // load .env
const { DB_USER, DB_HOST, DB_NAME, DB_PASS, DB_PORT } = process.env

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME
    }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
