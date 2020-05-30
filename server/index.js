var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var API_KEY = require('../newsApiKey');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var db = require('../database-mongo');
var toneAnalyzer = require('./toneAnalyzer')
var app = express();
const cheerio = require('cheerio');
const axios = require('axios')

// UNCOMMENT FOR REACT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

// Get articles and send them to the client for initial state
app.get('/articles', (req, res) => {

  fetch("https://newsapi.org/v2/top-headlines?country=us", { method: 'GET', headers: { "X-Api-Key": API_KEY } })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      res.send(json.articles)
    });
});

// Get search term from the client and, use News api to  get articles
app.post('/searchTerm', (req, res) => {

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
app.post('/saveArticle', (req, res) => {

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
app.get('/grabArticles', (req, res) => {

  db.selectAll((err, data) => {
    if (err) console.log('Error', err)
    let arraryOfArticles = [];
    data.forEach((article) => {
      arraryOfArticles.push(article['_doc'])
    })
    res.send(arraryOfArticles)
  })
});

// Endpoint to delete articles from mongoDB when requested
app.delete('/deleteArticle', (req, res) => {

  db.deleteArticle(req.body).then(() => {
    res.send('Article was deleted!')
  }).catch((err) => {
    console.log('There was an error with deletion', err)
    res.send(err)
  })

})



app.post('/tone', (req, res) => {

  // console.log(req.body)
  return axios.get(req.body.url)
    .then(({ data }) => {
      const $ = cheerio.load(data)
      let articleInformation = ''
      $('p').each((i, element) => {
        articleInformation += element.children[0].data
      })
      // console.log(articleInformation)
      if (articleInformation.length < req.body.description) {
        throw new Error('Go into catch block')
      }
      // return articleInformation
      console.log('Got article')
      return toneAnalyzer.tone(
        {
          toneInput: articleInformation,
          contentType: 'text/plain'
        })
        .then(({ result }) => {
          var toneArray = result.document_tone['tones'].map((tone) => {
            return [tone.tone_name, tone.score]
          })
          res.send(toneArray)
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(() => {
      console.log('Got an error: In body descrption')
      return toneAnalyzer.tone(
        {
          toneInput: req.body.description,
          contentType: 'text/plain'
        })
        .then(({ result }) => {
          var toneArray = result.document_tone['tones'].map((tone) => {
            return [tone.tone_name, tone.score]
          })
          console.log('tone', toneArray)
          res.send(toneArray)
        })
        .catch(err => {
          console.log(err);
        })
    })


})

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

