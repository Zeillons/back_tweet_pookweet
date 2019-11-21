const Utils = require('../utils')
const jwt = require('jsonwebtoken');
const format = require('pg-format')
const pool = Utils.pool

const getTimelineTweetIdFromXToY = (request, response) => {
  /// (test) GET CURRENT USER ID
  var decoded = jwt.decode(request.headers.authorization, {
    complete: true
  });
  response.status(200).json(request.headers.authorization)
  ////////

  const {
    id_users
  } = request.body
  const from = parseInt(request.params.from)
  const to = parseInt(request.params.to)
  const numberOfTweets = to - from
  if (id_users === null || id_users === '' || id_users === undefined) {
    console.log('Id null')
    response.status(400).json({
      'message': 'The user ids can\'t be null or empty'
    })
    return
  }
  if (numberOfTweets <= 0) {
    console.log('numberOfTweets <= 0')
    response.status(400).json({
      'message': 'The number of requested tweets is incorrect or below 0'
    })
    return
  }
  console.log(id_users)
  const sql = format('SELECT id_post, creation_date FROM tweets where id_user IN (%L) ' +
    ' ORDER BY creation_date ASC LIMIT %L OFFSET %L', id_users, numberOfTweets, from)
  pool.query(sql, (error, results) => {
    if (error) {
      sendErrorResponse(response, error)
      return
    }
    response.status(200).json(results.rows)
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
    'message': 'Erreur lors de la connection a la base de donnée : ' + error
  })
}

module.exports = {
  getTimelineTweetIdFromXToY, //Get tweets ids and date of creation from a timeline (list of followers) withing a range, ex: from the 2nd to the 11st most recent tweet
}