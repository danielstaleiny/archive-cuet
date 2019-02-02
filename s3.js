require('dotenv').config() // load .env
const { log, err, addQuery } = require('./helpers')
const S3 = require('aws-sdk/clients/s3')
const request = require('request')
const stream = require('stream')

// Get the env variables
const { AWS_USER_KEY, AWS_USER_SECRET, AWS_BUCKET_NAME } = process.env
if (!AWS_USER_KEY || !AWS_USER_SECRET || !AWS_BUCKET_NAME)
    throw new Error("AWS ENV is not define, don't know what to scrape.")

const s3bucket = new S3({
    accessKeyId: AWS_USER_KEY,
    secretAccessKey: AWS_USER_SECRET
})

function uploadFromStream(url) {
    const body = new stream.PassThrough()
    const key = url.slice(url.lastIndexOf('/') + 1)
    let mine = null
    switch (url.slice(url.lastIndexOf('.'))) {
        case '.png':
            mine = 'image/png'
            break
        case '.jpg':
        case '.jpeg':
            mine = 'image/jpeg'
            break
        case '.pdf':
            mine = 'application/pdf'
            break
        case '.doc':
        case '.dot':
            mine = 'application/msword'
            break

        case '.docx':
        case '.dotx':
            mine =
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            break
        case '.docm':
        case '.dotm':
            mine = 'application/vnd.ms-word.document.macroEnabled.12'
            break
        case '.xls':
        case '.xlt':
        case '.xla':
            mine = 'application/vnd.ms-excel'
            break
        case '.xlsx':
            mine =
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            break
        case '.xltx':
            mine =
                'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
            break
        case '.xlsm':
            mine = 'application/vnd.ms-excel.sheet.macroEnabled.12'
            break
        case '.xltm':
            mine = 'application/vnd.ms-excel.template.macroEnabled.12'
            break
        case '.xlam':
            mine = 'application/vnd.ms-excel.addin.macroEnabled.12'
            break
        case '.xlsb':
            mine = 'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
            break
        case '.ppt':
        case '.pot':
        case '.pps':
        case '.ppa':
            mine = 'application/vnd.ms-powerpoint'
            break
        case '.pptx':
            mine =
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            break
        case '.potx':
            mine =
                'application/vnd.openxmlformats-officedocument.presentationml.template'
            break
        case '.ppsx':
            mine =
                'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
            break
        case '.ppam':
            mine = 'application/vnd.ms-powerpoint.addin.macroEnabled.12'
            break
        case '.pptm':
            mine = 'application/vnd.ms-powerpoint.presentation.macroEnabled.12'
            break
        case '.potm':
            mine = 'application/vnd.ms-powerpoint.template.macroEnabled.12'
            break
        case '.ppsm':
            mine = 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
            break
        case '.mdb':
            mine = 'application/vnd.ms-access'
            break
        default:
    }

    var params = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: mine
    }
    s3bucket.upload(params, (err, done) => {
        if (err) console.trace(err)
        // else console.log(done) // for debugging, will return the image detail
    })
    return body
}

exports.fetchAndUpload = url => {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .on('error', function(err) {
                reject(err)
            })
            .pipe(uploadFromStream(url))
            .on('end', function(res) {
                resolve('done')
            })
    })
}
