const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, './../build')));



app.get('/add', function (req, res) {
  var good = 'dd'
  res.json({ data: good })
})



app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../build/index.html'));
});

app.listen(8080, function () {
  console.log('listening on 8080')
});

