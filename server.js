'use strict';
const axios = require('axios');
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('express-cors');
const bodyParser = require('body-parser');

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

app.get('/api/:id', (request, response) => {
  pullTransactionHistory('1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F')
    .then(r => response.send({data: r.data}))
    .catch(err => console.log(err));
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
