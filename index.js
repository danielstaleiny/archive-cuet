require('dotenv').config() // load .env
const { log, err, addQuery } = require('./helpers')
const scrapeAllLinks = require('./scrape.js')
const scrapePage = require('./scrape-page.js')
const s3 = require('./s3')
// const client = require('./init-db')
// const { Document, Attachment, test } = require('./db')

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

const uri = `${https}${URL}`

// s3.fetchAndUpload(uri + '/en/priloha/uloz/d09e122b-addf-457e-8ba5-66893b0687af')
// scrapeAllLinks(uri, options)
// scrapePage(uri + '/en/dokument/94f4b382-fae6-4380-9672-51ddd96978dd')
// .then(array => {
// console.log(array)
// })
// .catch(err)
