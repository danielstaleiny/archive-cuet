require('dotenv').config() // load .env
const cheerio = require('cheerio')
const rp = require('request-promise-native')

const https = `https://`

const { URL } = process.env
if (!URL) throw new Error("URL is not define, don't know what to scrape.")

const log = (...args) =>
    console.log(`${new Date().toISOString()} ${args.join('')}`)

const err = (...args) =>
    console.trace(`${new Date().toISOString()} ${args.join('')}`)

log('Scraping domain: ', URL)

const run = async () => {
    const res = await rp(`${https}${URL}`)
    log(res)
}

run().catch(err)
