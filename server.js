"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const weatherData = require("./data/weather.json");
const res = require("express/lib/response");
const { default: axios } = require("axios");

// to use all express methods and properties in my server
const server = express();
const PORT = process.env.PORT;
// cors is to give access to use my server
server.use(cors());

// ROUTES
// home route
server.get("/", (req, res) => {
  res.send("home route");
});

server.get("/weather", getWeatherData);
server.get("/movies", getMoviesData);

// ------------ (*) mean all other routes ----------
server.get("*", (req, res) => {
  res.status(404).send({
    error: "Something went wrong.",
  });
});

// FUNCTION HANDLERS
// weather function
function getWeatherData(req, res) {
  let weatherSearchQuery = req.query.searchQuery;
  // http://localhost:3001/weather?searchQuery=amman
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

// movies function
function getMoviesData(req, res) {
  let moviesSearchQuery = req.query.searchQuery;

  // http://localhost:3001/movies?searchQuery=seattle
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesSearchQuery}`;
  console.log("urll", url);

  try {
    axios.get(url).then((moviesData) => {
      let moviesArray = moviesData.data.results.map((item) => {
        return new movieObje(item);
      });
      res.send(moviesArray);
      console.log(moviesArray);
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
class movieObje {
  constructor(item) {
    (this.title = item.title),
     (this.overview = item.overview);
    this.imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    this.totalVotes = item.total_votes;

  }
}

server.listen(PORT, () => {
  console.log(`listning on PORT ${PORT}`);
});

// ------------- weather route from json file ----------------
// http://localhost:3001/weather?searchQuery=amman
// server.get("/weather", (req, res) => {
//   // --------- to search for the data according to the city then get all data of that city --------
//   let searchQuery = req.query.searchQuery;
//   let weatherInfo = weatherData.find((item) => {
//     return item.city_name.toLowerCase() === searchQuery.toLowerCase()});

//   try {
//     // ------- to loop through the data array of the searched city and take the wanted data then return it as object ------
//     let weatherObject = weatherInfo.data.map((item) => {
//       return new forCast(item)});

//     console.log("weather objjjj", weatherObject);
//     res.send(weatherObject);
//   } catch (error) {
//     res.status(404).send({error: "Something went wrong"});
//   }
// });
// -----------------------------------------------------------
