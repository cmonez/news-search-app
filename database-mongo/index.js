var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var articleSchema = mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: { type: String, unique: true }
});

var Article = mongoose.model('Article', articleSchema);

var selectAll = function (callback) {
  Article.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var deleteArticle = function ({ parameter, data }) {
  return Article.deleteOne({ parameter: data })

}

module.exports = {
  selectAll,
  Article,
  deleteArticle,
};


