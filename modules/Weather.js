const axios = require("axios");

function getWeatherData(req, res) {
    let weatherSearchQuery = req.query.searchQuery;
    // http://localhost:3001/weather?searchQuery=amman
    console.log('city:',weatherSearchQuery);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${weatherSearchQuery}`;
    try {
      axios.get(url).then((weatherData) => {
        let weatherArray = weatherData.data.data.map((item) => {
          return new forCast(item);
        });
        res.send(weatherArray);
      });
    } catch (error) {
      res.send(error);
    }
  }

  class forCast {
    constructor(item) {
      (this.description = item.weather.description),
       (this.date = item.datetime)
    }
  }

  module.exports = getWeatherData;