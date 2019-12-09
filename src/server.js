// Listen to the App Engine-specified port, or 8080 otherwise
require('dotenv').config({
  path: './dot.env'
});
const PORT = process.env.PORT || 8081;
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router').router;
const app = express();
const cors = require('cors');
const request = require('request');
const boarder = require('body-parser');
const api_name = 'api-tweet';
const version = 'v1';
const swagger_gen = require('./config/swagger');
var dev = false

if (process.env.NODE_ENV === 'development') {
  swagger_gen.swagger(app);
  dev = true;
}
////////////////////////

const corsOptions = {
  origin: ['http://localhost:4200', 'http://pookweet.social', 'https://pookweet.social'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const keycloakHost = process.env.KEYCLOAK_HOST;
const keycloakPort = process.env.KEYCLOAK_PORT;
const realmName = process.env.KEYCLOAK_REALM;

if (!dev) {
  // check each request for a valid bearer token
  app.use((req, res, next) => {
    // assumes bearer token is passed as an authorization header
    if (req.headers.authorization) {
      // configure the request to your keycloak server
      const options = {
        method: 'GET',
        url: `http://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
        headers: {
          // add the token you received to the userinfo request, sent to keycloak
          Authorization: req.headers.authorization
        }
      };

      // send a request to the userinfo endpoint on keycloak
      request(options, (error, response, body) => {
        if (error) throw new Error(error);

        // if the request status isn't "OK", the token is invalid
        if (response.statusCode !== 200) {
          res.status(401).json({
            error: `unauthorized`
          });
        }
        // the token is valid pass request onto your next function
        else {
          next();
        }
      });
    } else {
      // there is no token, don't process request further
      res.status(401).json({
        error: `unauthorized`
      });
    }
  });
}

app.use(
  boarder.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(boarder.json());

app.use('/' + api_name + '/' + version + '', router());

app.listen(PORT, () => {
  console.log('/' + api_name + '/' + version + '');
  console.log(`Server listening on port ${PORT}...`);
});