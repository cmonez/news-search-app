var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var API_KEY = require('../newsApiKey');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var db = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

// Get articles and send them to the client for initial state
app.get('/articles', function (req, res) {

  fetch("https://newsapi.org/v2/top-headlines?country=us", { method: 'GET', headers: { "X-Api-Key": API_KEY } })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      res.send(json.articles)
    });
});

// Get search term from the client and, use News api to  get articles
app.post('/searchTerm', function (req, res) {

  console.log('In post', req.body.searched)
  fetch(`https://newsapi.org/v2/top-headlines?q=${req.body.searched}`, { method: 'GET', headers: { "X-Api-Key": API_KEY } })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log('Getting articles', json.articles)
      res.send(json.articles)
    });
});


// Save an article to the mongoDB when the Save button clicked client-side
app.post('/saveArticle', function (req, res) {

  db.Article.create(req.body.article).then(() => {
    console.log('Saved')
    res.send('Saved')
  })
    .catch((error) => {
      console.log('Error in saving item', error)
      res.send('Didnt work')
    })
});


// Grab the saved articles from the mongoDB to send to the client when on Saved tab
app.get('/grabArticles', function (req, res) {

  db.selectAll((err, data) => {
    if (err) console.log('Error', err)
    let arraryOfArticles = [];
    data.forEach((article) => {
      arraryOfArticles.push(article['_doc'])
    })
    res.send(arraryOfArticles)
  })
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

