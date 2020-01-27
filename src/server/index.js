const express = require('express');
const os = require('os');
const dotenv = require('dotenv')
var SpotifyWebApi = require('spotify-web-api-node');
var bodyParser = require('body-parser');


const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();

});
// create application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var request = require('request');

var scopes = ['user-read-private', 'user-read-email']
var redirectUri = process.env.SPOTIPY_REDIRECT_URI
var clientId = process.env.SPOTIPY_CLIENT_ID

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL



app.get('/api/auth', function(req, res, next) {
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, '');
  res.redirect(authorizeURL)
});

app.post('/set/auth',  function(req, res, next) {
  spotifyApi.setAccessToken(req.body.token)
})


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
