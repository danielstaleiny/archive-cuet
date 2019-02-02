require('dotenv').config() // load .env
const { log, err, addQuery } = require('./helpers')
const AWS = require('aws-sdk')
const request = require('request')
const PassThroughStream = require('stream').PassThrough

// Get the env variables
const { AWS_USER_KEY, AWS_USER_SECRET, AWS_BUCKET_NAME } = process.env
if (!AWS_USER_KEY || !AWS_USER_SECRET || !AWS_BUCKET_NAME)
    throw new Error("URL is not define, don't know what to scrape.")

const s3bucket = new AWS.S3({
    accessKeyId: AWS_USER_KEY,
    secretAccessKey: AWS_USER_SECRET,
    Bucket: AWS_BUCKET_NAME
})

const uploadToS3 = () => {
    var params = {
        Bucket: AWS_BUCKET_NAME,
        Key: 'daco.txt',
        Body: 'dadas'
    }
    s3bucket.upload(params, function(err, data) {
        if (err) {
            log('error in callback')
            log(err)
        }
        log('success')
        log(data.ETag)
    })
}

function uploadFromStream(pass) {
    var params = { Bucket: AWS_BUCKET_NAME, Key: 'logo.png', Body: pass }
    s3bucket.upload(params, function(err, data) {
        log(err, data)
    })
}

exports.fetchAndUpload = url => {
    request(
        'http://nextweek.cz/front-assets/images/logo-250-gradient.png',
        function(error, response, body) {
            console.log('error:', error) // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
            // console.log('body:', body) // Print the HTML for the Google homepage.
            uploadFromStream(body)
        }
    )
    uploadToS3()
}
