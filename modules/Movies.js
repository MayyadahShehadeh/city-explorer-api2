const axios = require("axios");


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

  class movieObje {
    constructor(item) {
      (this.title = item.title),
       (this.overview = item.overview);
      this.imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      this.totalVotes = item.vote_count;
  
    }
  }

  module.exports = getMoviesData;