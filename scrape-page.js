const { log, err, addQuery } = require('./helpers')
const cheerio = require('cheerio')
const rp = require('request-promise-native')

// const getLinks = page => {
//     const $ = cheerio.load(page)
//     return $('div.resultItem', 'div.searchWrapper')
//         .map((i, el) => {
//             return {
//                 link: $(el)
//                     .find('a', '.button')
//                     .attr('href')
//             }
//         })
//         .get()
// }

const scrapePage = async page => {
    log(page)
    const html = await rp(page)
    const result = []
    const $ = cheerio.load(html, {
        decodeEntities: false
    })
    const board = $('div.item3')

    board.map((i, elm) => {
        item = $(elm).html()

        const fetched = cleanText(item)

        result.push({ name: fetched[1], value: fetched[2].trim() })
    })

    return result
}

const cleanText = input => {
    const regex = /\<div class=\"metadataDocumentName\"\>(.*):\<\/div\>(.*)/gms
    let m

    while ((m = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }
        return m
    }
}

module.exports = scrapePage
