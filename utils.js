const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER || 'api-tweet',
  host: process.env.DB_HOST || '51.159.26.223',
  database: process.env.DB_DATABASE || 'tweet',
  password: process.env.DB_PASSWORD || ']qm1U\|QWZu0)\"\'A4izk#',
  port: process.env.DB_PORT || 44539,
})
module.exports = {
    pool
}