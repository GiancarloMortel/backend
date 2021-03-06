const axios = require('axios');

const ctrlWeather = require('./weather');
const ctrlCity = require('./city');
const ctrlStock = require('./stock');

// get list of cities
const cityList = async (req, res) => {
  const cities = await ctrlCity.getCityPromise(req.params.city, 'US');

  if (cities === -1) {
    res
      .status(404)
      .json({message: 'no cities found'});
  } else {
    res
      .status(200)
      .json(cities);
  }
};

// gets daily forecast in a city
const weatherDay = async (req, res) => {
  const weather = await ctrlWeather.weatherPromise(req.params.cityid);

  if (weather === -1) {
    res
      .status(404)
      .json({message: 'error in getting weather'});
  } else {
    res
      .status(200)
      .json(weather);
  }
};

// gets daily stock information for a company
const stockInfo = async (req, res) => {
  const stock = await ctrlStock.stockPromise(req.params.ticker);

  if (stock === -1) {
    res
      .status(404)
      .json({message: 'error in getting stock'});
  } else {
    res
      .status(200)
      .json(stock);
  }
};

module.exports = {
  cityList,
  weatherDay,
  stockInfo
};