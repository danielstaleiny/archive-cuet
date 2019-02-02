exports.log = (...args) =>
    console.log(`${new Date().toISOString()} ${args.join('')}`)

exports.err = (...args) =>
    console.trace(`${new Date().toISOString()} ${args.join('')}`)
