const cache = require('../src/cache')
const arg = process.argv[2]
if (!arg) return console.error('please specify cache id!')
cache.invalidateCache(arg).then(() => console.log(`done, cache '${arg}' has been invalidated.`))
