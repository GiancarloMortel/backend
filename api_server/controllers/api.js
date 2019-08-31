const axios = require('axios');

const ctrlWeather = require('./weather');
const ctrlCity = require('./city');

// get list of cities
const cityList = async (req, res) => {
  const cities = await ctrlCity.getCityPromise(req.params.city, 'US');

  if (cities) {
    res
      .status(200)
      .json(cities);
  } else {
    res
      .status(404)
      .json({message: 'no cities found'});
  }
};

// gets daily forecast in a city
const weatherDay = async (req, res) => {
  const weather = await ctrlWeather.weatherPromise(req.params.cityid);

  if (weather) {
    res
      .status(200)
      .json(weather);
  } else {
    res
      .status(404)
      .json({message: 'error in getting weather'});
  }
};

module.exports = {
  cityList,
  weatherDay
};