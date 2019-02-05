const fileSizeParser = require('filesize-parser')

// TODO change this to actual logger
exports.log = (...args) =>
    console.log(`${new Date().toISOString()} ${args.join('')}`)

// DEPRECATED
exports.err = (...args) =>
    console.trace(`${new Date().toISOString()} ${args.join('')}`)

// genQuery :: (String, String) -> String
const genQuery = (key, value) => `&${key}=${value}`

// genQuery :: (String, String) -> String
const startQuery = (key, value) => `?${key}=${value}`

// addQuery :: Object -> String
exports.addQuery = obj => {
    let result = ''
    for (const prop in obj) {
        if (result === '') result = startQuery(prop, obj[prop])
        else result = result + genQuery(prop, obj[prop])
    }
    return result
}

// parseAttachmentInfo :: String -> Object
exports.parseAttachmentInfo = input => {
    const regex = /\<img.*alt\=\"file icon: (.*)\"\>\s*([0-9]+\.[0-9]*\s[a-zA-Z]{2})/gms
    let m

    while ((m = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }

        let item = {
            mimeType: m[1],
            fileSize: m[2]
        }

        return item
    }
}

// 450,9 kB  -> to bytes
// size :: String -> Int
exports.sizeParse = size => {
    return fileSizeParser(size.replace(' ', '').toUpperCase())
}
