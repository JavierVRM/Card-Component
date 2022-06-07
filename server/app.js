const express = require('express');
const app = express();
const path = require("path");

const srcDir = require('path').join(__dirname,'..', '/client/src');
const publicDir = require('path').join(__dirname,'/public');

// main html
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname , '..', '/client/index.html'));
});
// database
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname + '/data/player-stats.json'));
})

app.use(express.static(srcDir)); 

app.use(express.static(publicDir)); 


app.listen(3000, () => console.log('LISTENING'))


