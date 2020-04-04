require("dotenv").config();

var axios = require("axios");
var fs = require("fs");

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var defaultMov = "Mr. Nobody";
var defaultSong = "The Sign";

var command = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");




// RUN LIRI

function runLiri (command, userSearch) {
  switch (command) {
    case "concert-this":
        concertThis(userSearch);
        break;
    case "spotify-this-song":
        spotifyThis(userSearch);
        break;
    case "movie-this":
        movieThis(userSearch);
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Use one of the following commands: 'spotify-this-song', 'concert-this', 'movie-this','do-what-it-says'");
        break;
    }
};




// CONCERT THIS -- Bands in Town
var moment = require('moment');

function concertThis(artist) {
  
  var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios
    .get(bandURL).then(function(response) {
      `${console.log('\nArtist Name: ' + response.data[0].artist.name)};
       ${console.log('Venue Name: ' + response.data[0].venue.name)};
       ${console.log('Venue Location: ' + response.data[0].venue.country)};
       ${console.log('Event Date: ' + (moment(response.data[0].datetime).format('MM-DD-YYYY')))}`;

       var concertInfo = '\nArtist Name: ' + response.data[0].artist.name + '\nVenue Name: ' + response.data[0].venue.name + '\nVenue Location: ' + response.data[0].venue.country + '\nEvent Date: ' + (moment(response.data[0].datetime).format('MM-DD-YYYY') + "\n");

      fs.appendFile("log.txt", concertInfo, function(err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Bands in Town Content Added!");
        }
      });
    });
  };




// SPOTIFY THIS -- Spotify
function spotifyThis(songTitle) {
  if (!songTitle) {
    songTitle = defaultSong;
  };

  spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  `${console.log('\nArtist: ' + data.tracks.items[0].album.artists[0].name)};
   ${console.log('Song Name: ' + songTitle)};
   ${console.log('Album Name: ' + data.tracks.items[0].album.name)};
   ${console.log('Song Preview: ' + data.tracks.items[0].album.artists[0].external_urls.spotify)}`;

   var spotifyInfo = '\nArtist: ' + data.tracks.items[0].album.artists[0].name + '\nSong Name: ' + songTitle + '\nAlbum Name: ' + data.tracks.items[0].album.name + '\nSong Preview: ' + data.tracks.items[0].album.artists[0].href + "\n";

  fs.appendFile("log.txt", spotifyInfo, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Spotify Content Added!");
      }
    });
  });
};




// MOVIE THIS -- OMDB
function movieThis(movieTitle) {
  
  var omdbURL = "https://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

  if (!movieTitle) {
      movieTitle = defaultMov;
         console.log(`If you haven't watched '${defaultMov}', then you should: <http://www.imdb.com/title/tt0485947/>`);
         console.log("It's on Netflix!");
      }

  axios
    .get(omdbURL).then(function(response) {
      `${console.log('\nTitle: ' + response.data.Title)};
       ${console.log('Year: ' + response.data.Year)};
       ${console.log('IMDB Rating: ' + response.data.Ratings[0].Value)};
       ${console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value)};
       ${console.log('Country of Production: ' + response.data.Country)};
       ${console.log('Language: ' + response.data.Language)};
       ${console.log('Plot: ' + response.data.Plot)};
       ${console.log('Actors: ' + response.data.Actors)};`;

       var movieInfo = '\nTitle: ' + response.data.Title + '\nYear: ' + response.data.Year + '\nIMDB Rating: ' + response.data.Ratings[0].Value + '\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value + '\nCountry of Production: ' + response.data.Country + '\nLanguage: ' + response.data.Language + '\nPlot: ' + response.data.Plot + '\nActors: ' + response.data.Actors + "\n";

      fs.appendFile("log.txt", movieInfo, function(err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("OMDB Content Added!");
        }
      });

    });
  };




// DO WHAT IT SAYS

function doThis () {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    
    var newData = data.split(",");
    var command = newData[0];
    var userSearch = newData[1];

    runLiri(command, userSearch);    
        
    });
};

runLiri (command, userSearch);