const axios = require('axios');
const weatherKeys = require('../../apikeys/weather');

const getWeather = (id, callback) => {

  // daily weather
  const apiKey = weatherKeys.apikey;
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&appid=${apiKey}`;
  
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

const weatherPromise = (city) => {
  return new Promise((resolve, reject) => {
    getWeather(city, (res) => {
      if (res)
        resolve(res.data);
      else
        reject(res);
    });
  });
};

module.exports = {
  getWeather,
  weatherPromise
};