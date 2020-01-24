const express = require('express');
const os = require('os');

const app = express();
var request = require('request');

app.get('/api/auth', function(req, res) {
    var url = 'https://accounts.spotify.com/en/authorize?client_id=8a859eb596cd41cd9a1266058e095af3&response_type=code&redirect_uri=http:%2F%2F0.0.0.0:9000%2F&scope=user-read-private%20user-read-email'
    res.redirect('https://accounts.spotify.com/en/authorize?client_id=8a859eb596cd41cd9a1266058e095af3&response_type=code&redirect_uri=http:%2F%2F0.0.0.0:9000%2F&scope=user-read-private%20user-read-email')
});

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: 'whatever'}));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
