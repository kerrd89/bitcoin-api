'use strict';
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'shapeshift technical challenge';

const pullTransactionHistory = (user) => {
  if (!user) return null;
  return axios.get(`https://blockchain.info/address/${user}?format=json&limit=5`);
};

app.get('/api/:address', (request, response) => {
  pullTransactionHistory(request.params.address)
    .then(r => response.send({data: r.data}))
    .catch(err => console.log(err));
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
