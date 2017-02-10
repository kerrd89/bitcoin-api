'use strict';
const axios = require('axios');
const fs = require('fs');
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

app.get(['/'], (request, response) => {
  fs.readFile(`${__dirname}/public/index.html`, (err, file) => {
    response.send(file);
  });
});

app.get('/:token', (request, response) => {
  fs.readFile(`${__dirname}/public/index.html`, 'utf8', (err, file) => {
    response.send(file);
  });
});

app.get('/api/:address', (request, response) => {
  pullTransactionHistory(request.params.address)
    .then(r => response.send({ txs: r.data }))
    .catch(err => console.log(err));
});

app.get('/api/rates/all', (request, response) => {
  axios.get('https://blockchain.info/ticker')
    .then(r => response.send({ rates: r.data }))
    .catch(err => console.log(err));
});


if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
