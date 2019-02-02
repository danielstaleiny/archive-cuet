const { log, err, addQuery } = require('./helpers')
const cheerio = require('cheerio')
const rp = require('request-promise-native')

const run = async uri => {
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
    const data = $('div.resultItem', 'div.searchWrapper').map(el =>
        $(el)
            .find('a', '.button')
            .attr('href')
    )
    console.log(data)
}

module.exports = run
