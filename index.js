require('dotenv').config() // load .env
const { log, err, addQuery } = require('./helpers')
const scrapeAllLinks = require('./scrape.js')
const scrapePage = require('./scrape-page.js')
const s3 = require('./s3')
const db = require('./db')

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
s3.fetchAndUpload(
    'http://nextweek.cz/front-assets/images/logo-250-gradient.png'
)
log('End S3')

const uri = `${https}${URL}`
// scrapeAllLinks(uri, options)
// scrapePage(uri + '/sk/dokument/1b3c89ad-46f4-4a5e-80d8-08a5187dfcd3').catch(err)
