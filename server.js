'use strict';

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


app.get('/api/:id', (request, response) => {
  let transactions = pullTransactionHistory(request.params.id);
  response.send({ data: transactions });
});

const pullTransactionHistory = (user) => {
  return user;
};

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;





// app.get('/', (request, response) => {
//   fs.readFile(`${__dirname}/public/index.html`, (err, file) => {
//     response.send(file);
//   });
// });
//
// app.get('/test/', (request, response) => {
//   fs.readFile(`${__dirname}/public/index.html`, (err, file) => {
//     response.send(file);
//   });
// });
