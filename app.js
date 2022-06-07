const express = require('express');
const app = express();
const path = require("path");

// main html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

// main js
app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/index.js'));
});

// database
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname + '/data/player-stats.json'));
})

// styles and scripts
app.get('/player-card/playerCard.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/player-card/playerCard.js'));
});
app.get('/global-methods/globalMethods.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/global-methods/globalMethods.js'));
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/player-card/css/style.css'));
});

app.listen(3000, () => console.log('LISTENING'))


