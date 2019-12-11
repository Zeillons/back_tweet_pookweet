const Utils = require('../utils');
const jwt = require('jsonwebtoken');
const format = require('pg-format');
const pool = Utils.pool;
var axios = require('axios');
const URL = 'http://api.profil.yann-cloarec.ninja/api-profile/v1/followers/';

const getTimelineTweetIdFromXToY = (request, response) => {
  const id_user = jwt.decode(request.headers.authorization.split(' ')[1]).sub;
  const token = request.headers.authorization.split(' ')[1];
  const finalUrl = URL + id_user;
  //TEST , sinon : https://stackoverflow.com/questions/44245588/how-to-send-authorization-header-with-axios
  axios({
    method: 'get',
    url: finalUrl,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(
    responseFollow => {
      var id_users = responseFollow.data.followers.map(result => result.follower);
      id_users.push(id_user);
      const from = parseInt(request.params.from);
      const to = parseInt(request.params.to);
      const numberOfTweets = to - from;
      if (id_users === null || id_users === '' || id_users === undefined) {
        console.log('Id null');
        response.status(400).json({
          message: "The user ids can't be null or empty"
        });
        return;
      }
      if (numberOfTweets <= 0) {
        console.log('numberOfTweets <= 0');
        response.status(400).json({
          message: 'The number of requested tweets is incorrect or below 0'
        });
        return;
      }
      const sql = format(
        'SELECT * FROM tweets where id_user IN (%L) ' +
          ' ORDER BY creation_date DESC LIMIT %L OFFSET %L',
        id_users,
        numberOfTweets,
        from
      );
      console.log(sql);
      pool.query(sql, (error, results) => {
        if (error) {
          sendErrorResponse(response, error);
          return;
        }
        response.status(200).json(results.rows);
      });
    },
    error => {
      response.status(500).json({
        message: "Erreur lors de la connection a l'api follow : " + error
      });
      return;
    }
  );
};

const sendErrorResponse = (response, error) => {
  if (error.code === 'ETIMEDOUT') {
    response.status(504).json({
      message: 'Database connection timed out'
    });
    return;
  }

  response.status(500).json({
    message: 'Erreur lors de la connection a la base de donnée : ' + error
  });
};

module.exports = {
  getTimelineTweetIdFromXToY //Get tweets ids and date of creation from a timeline (list of followers) withing a range, ex: from the 2nd to the 11st most recent tweet
};
