const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER ||'postgres',
  host: process.env.DB_HOST ||'51.15.215.253',
  database: process.env.DB_DATABASE ||'database',
  password: process.env.DB_PASSWORD ||'postgres',
  port: process.env.DB_PORT || 5432,
})

const getTweets = (request, response) => {
  pool.query('SELECT * FROM tweets ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getTweetById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tweets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTweet = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO tweets (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Tweet added with ID: ${result.insertId}`)
  })
}

const updateTweet = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE tweets SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Tweet modified with ID: ${id}`)
    }
  )
}
const deleteTweet = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM tweets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Tweet deleted with ID: ${id}`)
  })
}
module.exports = {
  getTweets,
  getTweetById,
  createTweet,
  updateTweet,
  deleteTweet,
}