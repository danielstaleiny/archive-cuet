require('dotenv').config() // load .env
const { Pool, Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})
