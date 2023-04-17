const axios = require("axios");
const Cache = require("./Cashe");

let cache = new Cache();
cache['timesmap']=Date.now();

function getMoviesData(req, res) {
    let moviesSearchQuery = req.query.searchQuery;
  
    // http://localhost:3001/movies?searchQuery=seattle
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesSearchQuery}`;

    if ((cache[moviesSearchQuery] && (Date.now() - cache[moviesSearchQuery].timestamp < 50000)) !== undefined){
    console.log('cashe hit');
    console.log(cache['timesmap']);
    
    res.send(cache[moviesSearchQuery]);
  }else{
    
    try {
      axios.get(url).then((moviesData) => {
        let moviesArray = moviesData.data.results.map((item) => {
          return new movieObje(item);
        });
        console.log('cashe miss');
        cache[moviesSearchQuery];
        cache[moviesSearchQuery] = moviesArray;
        console.log('timestamp 222222',cache['timesmap']);

        res.send(moviesArray);
      });
    } catch (error) {
      res.send(error);
    }
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