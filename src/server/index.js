const express = require('express');
const os = require('os');
const app = express();
var cors = require('cors');

app.use(cors());

var request = require('request');

app.get('/api/auth', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    var url = 'https://accounts.spotify.com/en/authorize?client_id='+process.env.SPOTIPY_CLIENT_ID+'&response_type=code&redirect_uri=http:%2F%2F0.0.0.0:9000%2F&scope=user-read-private%20user-read-email'
    res.redirect(url)
});

app.use((req, res, next) => {


  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: 'whatever'}));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
