require('dotenv').config() // load .env
const { log } = require('./helpers')
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

// scrapePage(uri + '/en/dokument/c48d9381-0a2b-4402-9628-fb981a6bed0f') // jedno PDF
// scrapePage(uri + '/en/dokument/c1b3a1ab-8d73-46be-950e-50836a886df9') // jeden doc
scrapePage(uri + '/en/dokument/ec0e256b-65f3-4191-b6ad-924117c4ea5d') // tri PDF
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
