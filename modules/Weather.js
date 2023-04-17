const axios = require("axios");
const Cache = require('./Cashe');

let cache = new Cache();
cache['timesmap'] = Date.now();

function getWeatherData(req, res) {
  let CitySearchQuery = req.query.searchQuery;
  
  // console.log('city',weatherSearchQuery);

  // http://localhost:3001/weather?searchQuery=amman
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${CitySearchQuery}`;

  if (cache[CitySearchQuery] !== undefined) {
    console.log('cashe hit');
    // console.log(cache);
    res.send(cache[CitySearchQuery]);

  } else {
    try {
      axios.get(url).then((weatherData) => {
        let weatherArray = weatherData.data.data.map((item) => {
          return new forCast(item);
        });
        console.log('cashe miss');
        cache[CitySearchQuery];
        cache[CitySearchQuery] = weatherArray;

        res.send(weatherArray);
      })
      // .catch(error=>{
      //   console.log(error);
      //   res.send(error);
      // })
    } catch (error) {
      res.send(error);
    }
  }
}

class forCast {
  constructor(item) {
    this.description = item.weather.description,
    this.date = item.datetime
  }
}

module.exports = getWeatherData;