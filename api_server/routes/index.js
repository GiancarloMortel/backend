const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');
const cors = require('cors');

// allows client to access api
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

router.get('/city/:city', cors(corsOptions), ctrlApi.cityList);
router.get('/weather/:cityid', cors(corsOptions), ctrlApi.weatherDay);

module.exports = router;
