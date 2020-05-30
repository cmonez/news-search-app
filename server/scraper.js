const cheerio = require('cheerio');
const axios = require('axios');

axios.get('https://www.tmz.com/2020/05/29/justin-hartley-kisses-new-woman-divorce-chrishell-stause/')
  .then(({ data }) => {
    const $ = cheerio.load(data)
    let articleInformation = ''
    $('p').each((i, element) => {
      articleInformation += element.children[0].data
    })
    console.log(articleInformation)
  })