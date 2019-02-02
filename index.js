require('dotenv').config() // load .env
const { log, err, addQuery } = require('./helpers')
const scrapeAllLinks = require('./scrape.js')
const scrapePage = require('./scrape-page.js')
const s3 = require('./s3')
const client = require('./init-db')
const { test } = require('./db')

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

// s3.fetchAndUpload(
//     'http://nextweek.cz/front-assets/images/logo-250-gradient.png'
// )

const uri = `${https}${URL}`
// scrapeAllLinks(uri, options)
const daco = scrapePage(
    uri + '/sk/dokument/94f4b382-fae6-4380-9672-51ddd96978dd'
).catch(err)

console.log(daco)
test()
