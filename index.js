require('dotenv').config() // load .env
const cheerio = require('cheerio')
const rp = require('request-promise-native')
const { log, err } = require('./helpers')

const https = `https://`

const { URL } = process.env
if (!URL) throw new Error("URL is not define, don't know what to scrape.")

log('Scraping domain: ', URL)

// genQuery :: (String, String) => String
const genQuery = (key, value) => `&${key}=${value}`

// genQuery :: (String, String) => String
const startQuery = (key, value) => `?${key}=${value}`

// addQuery :: Object => String
const addQuery = obj => {
    let result = ''
    for (const prop in obj) {
        if (result === '') result = startQuery(prop, obj[prop])
        else result = result + genQuery(prop, obj[prop])
    }
    return result
}

const options = {
    DocumentPublishedFrom: '01.02.2019',
    AlternativePublicationCheck: false,
    AlternativeTypeCode: '',
    DocumentTypeCode: ''
}

const run = async () => {
    const uri = `${https}${URL}${addQuery(options)}`
    console.log(uri)
    const html = await rp(uri)
    const $ = cheerio.load(html)
    log($('p', '.searchPage').text())
    // const data = $('div.searchWrapper', '.grid')
    //     .map(elem => {
    //         return $(elem)
    //             .find('a', '.button')
    //             .map(item => $(item).attr('href'))
    //     })
    //     .get()
    const data = $('div.searchWrapper', '.grid')
    console.log(data)
}

run().catch(err)
