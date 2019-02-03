const { log, parseAttachmentInfo } = require('./helpers')
const cheerio = require('cheerio')
const rp = require('request-promise-native')
const camelCase = require('camelcase')

const scrapePage = async page => {
    log('fetching page: ', page)
    const html = await rp(page)

    // Parse html from fetched page.
    const $ = cheerio.load(html, {
        decodeEntities: false
    })

    // Fetch document info.
    const info = findItems($)

    const attachments = findAttachments($)
    info.attachments = attachments

    return info
}

const findItems = $ => {
    const result = {}

    const items = $('.metadataDocumentName').parent()
    items.map((i, elm) => {
        item = $(elm).html()
        const fetched = cleanText(item, $)

        // Ignore attachments info.
        if (
            fetched.lable == 'attachmentName' ||
            fetched.lable == 'typeAndSize' ||
            fetched.lable == undefined
        ) {
            return
        }

        result[fetched.lable] = fetched.value
    })
    return result
}

const findAttachments = $ => {
    const attachmets = []

    const attachmetsTemp = $('.attachmentWrapper')

    // Iterate over attachmets.
    attachmetsTemp.map((i, attachWrap) => {
        buttons = $(attachWrap).find('a')

        let attachment = {
            name: null,
            fileSize: null,
            mimeType: null,
            path: null,
            pathOrig: null
        }

        buttons.map((i, elmBtn) => {
            const btn = $(elmBtn).html()
            let label = camelCase(btn.trim())

            // Link to download attachment and fetch attachment info
            if (label === 'saveAttachment') {
                attachment.path = $(elmBtn).attr('href')

                let appachmentsWrap = $(elmBtn)
                    .parent()
                    .parent()
                    .find('.metadataDocumentName')
                    .parent()

                appachmentsWrap.map((i, elm) => {
                    item = $(elm).html()
                    const fetched = cleanText(item, $)

                    if (fetched.lable == 'attachmentName') {
                        attachment.name = fetched.value
                    }
                    if (fetched.lable == 'typeAndSize') {
                        const attachInfo = parseAttachmentInfo(fetched.value)
                        attachment.fileSize = attachInfo.fileSize
                        attachment.mimeType = attachInfo.mimeType
                    }
                })
            }

            // Link to original attachment
            if (label === 'saveOriginalAttachment') {
                attachment.pathOrig = $(elmBtn).attr('href')
            }
        })

        attachmets.push(attachment)
    })

    return attachmets
}

const cleanText = (input, $) => {
    const regex = /\<div class=\"metadataDocumentName\"\>(.*):\<\/div\>(.*)/gms // TODO: upravid regex s $ a ^ pre zaciatok a koniec stringu
    let m

    while ((m = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }

        const label = camelCase(m[1])
        const value = m[2].trim()

        let item = {
            lable: label,
            value: value
        }

        return item
    }
    return []
}

module.exports = scrapePage
