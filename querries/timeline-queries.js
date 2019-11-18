const Utils = require('../utils')
const pool = Utils.pool

const getTimelineTweetIdFromXToY = (request, response) => {
    const {
        id_users
      } = request.body
    const from = parseInt(request.params.from)
    const to = parseInt(request.params.to)
    const numberOfTweets = to - from
    if (id_users === null || id_users === '' || id_users  === undefined) {
      console.log('Id null')
      response.status(400).json({
        'message': 'The user ids can\'t be null or empty'
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
        pool.query('( '+
        'SELECT id_post, creation_date FROM tweets where id_user IN ( $1 ) '+
        ' ORDER BY creation_date ASC LIMIT $2 OFFSET $3', [id_users,numberOfTweets,from], (error, results) => {
      if (error) {
        sendErrorResponse(response, error)
        return
      }
      response.status(200).json(results.rows)
    })
  }
  module.exports = {
    getTimelineTweetIdFromXToY, //Get tweets ids and date of creation from a timeline (list of followers) withing a range, ex: from the 2nd to the 11st most recent tweet
  }