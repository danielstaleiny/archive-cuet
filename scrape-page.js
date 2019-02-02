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
    console.log(page)
    const html = await rp(page)
    const $ = cheerio.load(html)
    const board = $('.metadataDocumentName', 'div.item3')
        .parent()
        .html()
    // const board2 = $('div.item3')
    //     .find('.metadataDocumentName')
    //     .text()
    console.log(board)
    // console.log(board2)
}

module.exports = scrapePage
