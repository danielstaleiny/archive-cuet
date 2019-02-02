require('dotenv').config() // load .env
const cheerio = require('cheerio')
const rp = require('request-promise-native')
const { log, err, addQuery } = require('./helpers')
const run = require('./scrape.js')
const s3 = require('./s3')

const https = `https://`

const { URL } = process.env
if (!URL) throw new Error("URL is not define, don't know what to scrape.")

log('Scraping domain: ', URL)

const options = {
    DocumentPublishedFrom: '01.02.2019',
    AlternativePublicationCheck: false,
    AlternativeTypeCode: '',
    DocumentTypeCode: ''
}

log('starting S3')
s3.fetchAndUpload('dsa')
log('End S3')

const uri = `${https}${URL}${addQuery(options)}`
run(uri).catch(err)
