// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./tweet-queries')
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/tweets', db.getTweets)
app.get('/tweets/:id', db.getTweetById)
app.post('/tweets', db.createTweet)
app.put('/tweets/:id', db.updateTweet)
app.delete('/tweets/:id', db.deleteTweet)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});