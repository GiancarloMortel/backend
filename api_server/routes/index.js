const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');
const cors = require('cors');

// allows client to access weather api
const corsWeatherOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

// used for weather app
router.get('/city/:city', cors(corsWeatherOptions), ctrlApi.cityList);
router.get('/weather/:cityid', cors(corsWeatherOptions), ctrlApi.weatherDay);

// allows client to access stock api
const corsStockOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

// used for stock app
router.get('/stock/:ticker', cors(corsStockOptions), ctrlApi.stockInfo);

module.exports = router;
