const client = require('./init-db')

exports.test = () => {
    client.query('SELECT * FROM crut', (err, res) => {
        if (err) return console.trace(err)
        console.log(res.rows)
        return client.end()
    })
}
