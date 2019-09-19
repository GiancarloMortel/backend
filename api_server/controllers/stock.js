const axios = require('axios');
const stockKeys = require('../../apikeys/stock');

const getStockInfo = (ticker, callback) => {

  // request info
  const apikey = stockKeys.apikey;
  const query = `query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&apikey=${apikey}`;
  const url = `https://www.alphavantage.co/${query}`;

  // make request
  axios.get(url)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(-1);
    })
    .finally((res) => {
      callback(res);
    });
};

const stockPromise = (ticker) => {
  return new Promise((resolve, reject) => {
    getStockInfo(ticker, (res) => {
      if (res) {
        resolve(res.data);
      }
      else {
        reject(res);
      }
    });
  });
};

module.exports = {
  stockPromise
}