var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var API_KEY = require('../apiKey');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/items', function (req, res) {
  fetch("https://newsapi.org/v2/top-headlines?q=trump", { method: 'GET', headers: { "X-Api-Key": API_KEY } })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log(json);
      // Do something with the returned data.
    });


});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

