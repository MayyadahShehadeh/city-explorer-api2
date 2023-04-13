"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const weatherData = require("./data/weather.json");
const res = require("express/lib/response");
// to use all express methods and properties in my server
const server = express();
const PORT = process.env.PORT;
// cors is to give access to use my server
server.use(cors());

// home route
server.get("/", (req, res) => {
  res.send("home route");
});

// weather route
// http://localhost:3001/weather?searchQuery=amman
server.get("/weather", (req, res) => {
  // --------- to search for the data according to the city then get all data of that city --------
  let searchQuery = req.query.searchQuery;
  let weatherInfo = weatherData.find((item) => {
    return item.city_name.toLowerCase() === searchQuery.toLowerCase();
  });

  try {
    // ------- to loop through the data array of the searched city and take the wanted data then return it as object ------
    let weatherObject = weatherInfo.data.map((item) => {
      return new forCast(item);
    });

    console.log("weather objjjj", weatherObject);
    res.send(weatherObject);
  } catch (error) {
    res.status(404).send({
      error: "Something went wrong",
    });
  }
});

class forCast {
  constructor(item) {
    (this.description = item.weather.description), (this.date = item.datetime);
  }
}
// ------------ (*) mean all other routes ----------
// server.get('*', (req,res)=>{
//     res.status(404).send({
//         "error": "Something went wrong."
//     })
// })

server.listen(PORT, () => {
  console.log(`listning on PORT ${PORT}`);
});
