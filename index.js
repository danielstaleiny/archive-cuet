require('dotenv').config() // load .env
const cheerio = require('cheerio')
const rp = require('request-promise-native')
const help = require('./helpers')

const https = `https://`

const { URL } = process.env
if (!URL) throw new Error("URL is not define, don't know what to scrape.")

help.log('Scraping domain: ', URL)

const run = async () => {
    const res = await rp(`${https}${URL}`)
    help.log(res)
}

run().catch(help.err)
