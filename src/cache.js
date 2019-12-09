// middlewares/cache.js

const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({
  stdTTL: 1 * 60
})

function getUrlFromRequest(req) {
  const url = req.protocol + '://' + req.headers.host + req.originalUrl
  return url
}

function set(req, res, next) {
  const url = getUrlFromRequest(req)
  console.dir(res)
  cache.set(url, res.locals.data)
  return next()
}

function get(req, res, next) {
  const url = getUrlFromRequest(req)
  const content = cache.get(url)
  console.log(content);
  if (content) {
    return res.status(200).send(content)
  }
  return next()
}

module.exports = {
  get,
  set
}