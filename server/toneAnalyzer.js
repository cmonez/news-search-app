const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const Keys = require('../toneAnalyzerApiKey')


const toneAnalyzer = new ToneAnalyzerV3({
  version: '2020-05-28',
  authenticator: new IamAuthenticator({
    apikey: Keys.API_KEY,
  }),
  url: Keys.ANALYZER_URL,
});

module.exports = toneAnalyzer