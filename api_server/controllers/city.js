const modelCity = require('../models/city');
const ctrlGeocode = require('./geocode.js');

const updateState = (id, stateName) => {
  modelCity.City
    .findByIdAndUpdate(id, {state: `${stateName}`}, (err, res) => {
      if (err) throw err;
    });
};

const formatCityQuery = (cityName) => {
  return cityName
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// gets a list of cities
// will also update and insert state if state is not specified
const getCityListUpdateState = (cityName, countryName, callback) => {

  // capitalize only the first letter
  cityName = formatCityQuery(cityName);

  // get list of cities
  modelCity.City
    .find({
      name: `${cityName}`,
      country: `${countryName}`
    })
    .exec(async (err, cities) => {
      if (err) {
        console.log(err);
        callback(null);
      }
      else {
        // insert state if not in database
        let list = [];
        for (let i in cities) {
          if (!cities[i].state) {
            // update state
            let state = await ctrlGeocode.locationPromise(cities[i].coord.lat, cities[i].coord.lon);
            updateState(cities[i]._id, state.state_code);

            // put state into list
            let listItem = cities[i];
            listItem.state = state.state_code;
            list.push(listItem);
          } else {
            // put state into list
            list.push(cities[i]);
          }
        }

        // return list
        if (list.length > 0) {
          callback(list);
        } else {
          callback(null);
        }
      }
    });
};

// gets a list of cities
const getCityPromise = (cityName, countryName) => {
  return new Promise((resolve, reject) => {
    getCityListUpdateState(cityName, countryName, (res) => {
      if (res) {
        resolve(res);
      } 
      else {
        reject(res);
      }
    });
  });
};

module.exports = {
  getCityPromise
};