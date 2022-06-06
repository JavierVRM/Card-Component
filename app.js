const express = require('express');
const app = express();
const path = require("path");

// Get main html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

// Get main js
app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/index.js'));
});

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname + '/data/player-stats.json'));
})

// Get styles and scripts
app.get('/player-card/playerCard.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/player-card/playerCard.js'));
});
app.get('/global-methods/globalMethods.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/global-methods/globalMethods.js'));
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/player-card/css/style.css'));
});

app.listen(process.env.PORT || 3000, () => console.log('LISTENING'))


