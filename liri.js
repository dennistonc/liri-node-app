require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');



// Bands in Town

var moment = require('moment');
moment().format();
var artist = (process.argv[2]).replace(" ", "+");

function concertThis(artist) {

var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios
  .get(URL)
  .then(function(err, response) {
    if (err) {
      console.log("\r\n\r\n");
      console.log("Error.");
      console.log("\r\n\r\n");
      return;
    }
    var concertInfo =
    `${console.log(response.data.venue.name)};
    ${console.log(response.data.venue.country)};
      ${console.log(moment(response.data.datetime).format('MM-DD-YYYY'))}`;
    return (concertInfo);
  });
};

concertThis(artist);




// Spotify This Song

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});