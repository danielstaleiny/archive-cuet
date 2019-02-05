const { log, err, addQuery } = require('./helpers')
const cheerio = require('cheerio')
const rp = require('request-promise-native')

const getLinks = page => {
    const $ = cheerio.load(page)
    return $('div.resultItem', 'div.searchWrapper')
        .map((i, el) => {
            return {
                link: $(el)
                    .find('a', '.button')
                    .attr('href')
            }
        })
        .get()
}

const scrapeAllLinks = async (uri, options = {}) => {
    console.log(uri)
    const url = `${uri}${addQuery(options)}`
    const html = await rp(url)
    const $ = cheerio.load(html)
    log($('p', '.searchPage').text())

    const pager = $('.pager.searchPage')
        .find('a')
        .text()

    let data = []
    if (pager === '') {
        data = getLinks(html)
    } else {
        const pages = Array.from(pager.slice(0, -1))
        console.log('Pages:', pages.join())
        data = getLinks(html)
        const pData = await Promise.all(
            pages.map(async pageNum => {
                const page = await rp(
                    uri + addQuery({ ...options, page: pageNum })
                )
                return getLinks(page)
            })
        )
        data = [...data, ...pData.reduce((acc, val) => acc.concat(val), [])]
    }
    console.log(data)
    console.log(data.length)
}

module.exports = scrapeAllLinks
