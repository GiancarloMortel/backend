const axios = require('axios');
const geocodeKeys = require('../../apikeys/geocode');

const getLocation = (lat, lon, callback) => {

  // reverse geocoding
  const apiKey = geocodeKeys.apikey;
  const query = `${lat}+${lon}`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&pretty=1`;

  // make request
  axios.get(url)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
      callback(null);
    })
    .finally((res) => {
      callback(res);
    });
};

const locationPromise = (lat, lon) => {
  return new Promise((resolve, reject) => {
    getLocation(lat, lon, (res) => {
      if (res) {
        resolve(res.data.results[0].components);
      }
      else {
        reject(res);
      }
    });
  });
};

module.exports = {
  getLocation,
  locationPromise
};