const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
	  "slug" : "bitcoin",
	  "convert" : "USD"
    
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'a247aff8-bbd9-4be6-bc57-d27202dd38d0'
  },
  json: true,
  gzip: true
};

var price;
rp(requestOptions).then(response => {
  price = response['data']['1']['quote']['USD']['price'] 
  console.log(price);
}).catch((err) => {
  console.log('API call error:', err.message);
});
