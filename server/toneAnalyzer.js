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

toneAnalyzer.tone(
  {
    toneInput: 'What the hell. Is this actually working? Ok cool it is.',
    contentType: 'text/plain'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });