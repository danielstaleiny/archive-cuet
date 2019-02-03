const { log, parseAttachmentInfo, sizeParse } = require('./helpers')
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
    const info = parseDocumentInfo($)

    // Fetch all document attachments.
    info.attachments = parseAttachments($)

    return info
}

const parseDocumentInfo = $ => {
    const result = {}

    const items = $('.metadataDocumentName').parent()
    items.map((i, elm) => {
        item = $(elm).html()
        const fetched = parseItem(item, $)

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

const parseAttachments = $ => {
    const attachmets = []

    const attachmetsHTML = $('.attachmentWrapper')

    // Iterate over the attachmets.
    attachmetsHTML.map((i, attachWrap) => {
        buttons = $(attachWrap).find('a')

        const attachment = {}

        // Iterate over the attachment buttons
        buttons.map((i, elmBtn) => {
            const btn = $(elmBtn).html()
            let label = camelCase(btn.trim()) // Camelcase of button text.

            // Link to download attachment and fetch attachment info
            if (label === 'saveAttachment') {
                attachment.path = $(elmBtn).attr('href') // Path to download an attachment.

                // Parse attachment info.
                let appachmentWrap = $(elmBtn)
                    .parent()
                    .parent()
                    .find('.metadataDocumentName')
                    .parent()

                appachmentWrap.map((i, elm) => {
                    item = $(elm).html()
                    const fetched = parseItem(item, $)

                    if (fetched.lable == 'attachmentName') {
                        attachment.name = fetched.value
                    }
                    if (fetched.lable == 'typeAndSize') {
                        const attachInfo = parseAttachmentInfo(fetched.value)
                        attachment.fileSize = sizeParse(attachInfo.fileSize)
                        attachment.mimeType = attachInfo.mimeType
                    }
                })
            }

            // Path to original attachment if exists.
            if (label === 'saveOriginalAttachment') {
                attachment.pathOrig = $(elmBtn).attr('href')
            }
        })

        attachmets.push(attachment)
    })

    return attachmets
}

const parseItem = (input, $) => {
    const regex = /\<div class=\"metadataDocumentName\"\>(.*):\<\/div\>(.*)/gms
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
