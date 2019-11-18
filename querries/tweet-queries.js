const Utils = require('../utils')
const pool = Utils.pool


const getTweetsUser = (request, response) => {
  const id_user = request.params.id_user
  if (id_user === null || id_user === '' || id_user === undefined) {
    console.log('Id null')
    response.status(400).json({
      'message': 'The user id can\'t be null or empty'
    })
    return
  }
  pool.query('SELECT * FROM tweets where id_user = $1', [id], (error, results) => {
    if (error) {
      sendErrorResponse(response, error)
      return
    }
    response.status(200).json(results.rows)
  })
}

const getTweetsUserFromXToY = (request, response) => {
  const id_user = request.params.id_user
  const from = parseInt(request.params.from)
  const to = parseInt(request.params.to)
  const numberOfTweets = to - from
  if (id_user === null || id_user === '' || id_user  === undefined) {
    console.log('Id null')
    response.status(400).json({
      'message': 'The user id can\'t be null or empty'
    })
    return
  }
  if(numberOfTweets <= 0){
    console.log('numberOfTweets <= 0')
    response.status(400).json({
      'message': 'The number of requested tweets is incorrect or below 0'
    })
    return
  }
  pool.query('SELECT * FROM tweets where id_user = $1 ORDER BY creation_date ASC LIMIT $2 OFFSET $3', [id_user,numberOfTweets,from], (error, results) => {
    if (error) {
      sendErrorResponse(response, error)
      return
    }
    response.status(200).json(results.rows)
  })
}

const getTweetById = (request, response) => {
  const id = request.params.id
  if (id === null || id === '' || id === undefined) {
    console.log('Id null')
    response.status(400).json({

      'message': 'The id can\'t be null or empty'
    })
    return
  }

  console.log("id : "+id)

  pool.query('SELECT * FROM tweets WHERE id_post = $1',
   [id], (error, results) => {
    if (error) {
      sendErrorResponse(response, error)
      return
    }
    response.status(200).json(results.rows)
  })
}

const createTweet = (request, response) => {
  const {
    media_url,
    id_user,
    creation_date,
    message,
    id_parent
  } = request.body
  modified = false

  console.log(request.body)
  if (id_user === null || id_user === '' || id_user === undefined || message === null || message === '' || message === undefined) {
    console.log('Id null')
    response.status(400).json({
      'message': 'The user id and the message can\'t be null or empty'
    })
    return
  }
   //RETWEET
    pool.query('INSERT INTO tweets (media_url, id_user,creation_date,modified,message,id_parent) VALUES ($1,$2,$3,$4,$5,$6)RETURNING id_post',
      [media_url, id_user, creation_date, modified, message, id_parent], (error, results) => {
        if (error) {
          sendErrorResponse(response, error)
          return
        }
        response.status(201).json(results.rows)
      })
    return;
  

}

const updateTweet = (request, response) => {
  const id = request.params.id
  const {
    media_url,
    id_user,
    creation_date,
    message,
    id_parent
  } = request.body
  if (id === null || id === '' || id === undefined || id_user === null || id_user === '' || id_user === undefined || message === null || message === '' || message  === undefined) {
    console.log('Id null')
    response.status(400).json({
      'message': 'The tweet id, the user id and the message can\'t be null or empty'
    })
    return
  }

    pool.query(
      'UPDATE tweets SET media_url = $1, id_user = $2,creation_date = $3,modified = true,message = $5 WHERE id_post = $6',
      [media_url, id_user, creation_date, modified, message, id],
      (error, results) => {
        if (error) {
          sendErrorResponse(response, error)
          return
        }
        response.status(200).json({
          'message': `Retweet modified with ID: ${id}`
        })
      }
    )
}

const deleteTweet = (request, response) => {
  const id = request.params.id
  if (id === null || id === '') {
    console.log('Id null')
    response.status(400).json({
      'message': 'The id can\'t be null or empty'
    })
    return
  }
  pool.query('DELETE FROM tweets WHERE id_post = $1', [id], (error, results) => {
    if (error) {
      sendErrorResponse(response, error)
      return
    }
      response.status(200).json({
        'message': `Tweet or retweet deleted with ID: ${id}`
      })
    })
}

const sendErrorResponse = (response, error) => {
  if (error.code === 'ETIMEDOUT') {
    response.status(504).json({
      'message': 'Database connection timed out'
    })
    return
  }
  response.status(500).json({
    'message': 'Erreur lors de la connection a la base de donnée : '+ error
  })
}
module.exports = {
  getTweetsUser, //Get all tweets of an user
  getTweetsUserFromXToY, //Get tweets of an user withing a range, ex: from the 2nd to the 11st most recent tweet
  getTweetById, //Get a tweet from its ID
  createTweet, //Post a tweet or a retweet
  updateTweet, //Edit a tweet or a retweet
  deleteTweet, //Delete a tweet or a retweet from its ID
}