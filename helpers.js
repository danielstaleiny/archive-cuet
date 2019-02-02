exports.log = (...args) =>
    console.log(`${new Date().toISOString()} ${args.join('')}`)

exports.err = (...args) =>
    console.trace(`${new Date().toISOString()} ${args.join('')}`)

// genQuery :: (String, String) => String
const genQuery = (key, value) => `&${key}=${value}`

// genQuery :: (String, String) => String
const startQuery = (key, value) => `?${key}=${value}`

// addQuery :: Object => String
exports.addQuery = obj => {
    let result = ''
    for (const prop in obj) {
        if (result === '') result = startQuery(prop, obj[prop])
        else result = result + genQuery(prop, obj[prop])
    }
    return result
}
