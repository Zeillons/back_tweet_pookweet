require('dotenv').config();
const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router').router;
const app = express();
const version = 'v1';
const swagger_gen = require('./config/swagger');

if (process.env.NODE_ENV === 'development') {
    swagger_gen.swagger(app);
}
////////////////////////

app.use(bodyParser.json())
app.use( 
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/'+version+'', router());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});