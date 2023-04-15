"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: axios } = require("axios");

const getMoviesData = require('./modules/Movies');
const getWeatherData = require("./modules/Weather");

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



server.listen(PORT, () => {
  console.log(`listning on PORT ${PORT}`);
});
