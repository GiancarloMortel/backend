const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  coord: {
    lon: Number,
    lat: Number
  },
  state: String
}, { strict: false });

const City = mongoose.model('cities', citySchema);

module.exports = {
  City
};