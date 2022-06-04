const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.get('/', async (req, res) => {
    res.send(await readFile('./index.html', 'utf8'))
})

app.listen(process.env.PORT || 3000, () => console.log('LISTENING'))