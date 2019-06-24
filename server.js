const express = require('express');
const app = express();
const port = 3000
app.use('/', express.static('.'));
// app.get('/places.json', (req, res) => {
//   res.header('Content-Type', 'application/js');
//   res.sendFile('./scripts/places.json');
// })

app.listen(port, () => console.log(`Microadventure listening on port ${port}!`));
