const mongoose = require('mongoose');

const uri = "mongodb+srv://dbWeather:weatherPassword@cluster0-crvvd.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  dbName: 'weather'
}).catch(error => handleError(error));