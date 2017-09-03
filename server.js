const fs = require('fs');
const csv = require('csv-stream');
const express = require('express');
const ecstatic = require('ecstatic');
const http = require('http');
const app = express();

app.use(ecstatic({
  root: __dirname,
}));

app.get('/cards', getCards);

function getCards(req, res){
  var csvStream = csv.createStream();
  var starters = [];
  var talents = [];

  csvStream.on('data', function(data){
    if (data['deck'] == 'starter'){
      starters.push(data);
    } else {
      talents.push(data);
    }
  });

  csvStream.on('end', function(){
    return res.status(200).json(starters);
  });

  fs.createReadStream(__dirname + '/artifacts/cards.csv').pipe(csvStream);
}

http.createServer(app).listen(8080, '192.168.0.14');
