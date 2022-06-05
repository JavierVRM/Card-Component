const express = require('express');
const { readFile } = require('fs').promises;
const app = express();
const path = require("path");

app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.js'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});



// app.get('/', async (req, res) => {
//     res.send(await readFile('../client/index.html', 'utf8'))
// })

// app.use(express.static(path.join(__dirname, "server")));

// app.use('../client', express.static(path.join(__dirname, 'client')));

app.listen(process.env.PORT || 3000, () => console.log('LISTENING'))


