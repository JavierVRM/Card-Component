const express = require('express');
const app = express();
const path = require("path");

app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/src/index.js'));
});

app.get('/player-card/playerCard.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/src/player-card/playerCard.js'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('LISTENING'))


